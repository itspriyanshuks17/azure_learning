import fs from 'fs-extra';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
    rootDir: path.resolve(__dirname, '..'), // Parent dir (where notes are)
    outDir: path.resolve(__dirname, 'dist_new'),
    templatePath: path.resolve(__dirname, 'templates/layout.html'),
    publicDir: path.resolve(__dirname, 'public'),
    imageSourceDir: path.resolve(__dirname, '../image'),
    imageOutDir: path.resolve(__dirname, 'dist_new/image')
};

// Markdown Parser Setup
// Markdown Parser Setup
const renderer = {
    code(code, language) {
        let text = '';
        let lang = '';

        // Handle Token Object (marked v17+ potential signature)
        if (typeof code === 'object' && code !== null) {
            text = code.text || '';
            lang = code.lang || '';
        } else {
            // Classic signature
            text = code || '';
            lang = language || '';
        }
        
        // Ensure string
        text = String(text);
        
        const cleanLang = (lang || '').trim();

        // Fallback: Check if content looks like mermaid
        const isMermaidContent = /^(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie|journey|mindmap|timeline)/i.test(text.trim());

        if (cleanLang === 'mermaid' || cleanLang === 'flowchart' || cleanLang === 'graph' || isMermaidContent) {
            // Decode HTML entities (e.g., &quot; -> ", &gt; -> >) so Mermaid can parse it
            const decodedText = text
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');
            
            return `<div class="mermaid">${decodedText}</div>`;
        }
        return `<pre><code class="language-${cleanLang}">${text}</code></pre>`;
    },
    table(token) {
        let header = '';
        let body = '';

        // Generate Header
        let cell = '';
        for (let j = 0; j < token.header.length; j++) {
            cell += `<th align="${token.align[j] || ''}">${this.parser.parseInline(token.header[j].tokens)}</th>`;
        }
        header += `<tr>${cell}</tr>`;

        // Generate Body
        for (let i = 0; i < token.rows.length; i++) {
            const row = token.rows[i];
            cell = '';
            for (let j = 0; j < row.length; j++) {
                cell += `<td align="${token.align[j] || ''}">${this.parser.parseInline(row[j].tokens)}</td>`;
            }
            body += `<tr>${cell}</tr>`;
        }

        return `<div class="table-wrapper">
            <table>
                <thead>${header}</thead>
                <tbody>${body}</tbody>
            </table>
        </div>`;
    }
};

marked.use({ 
    renderer,
    gfm: true,
    breaks: true
});

async function build() {
    console.log('🚀 Starting Build...');

    // 1. Clean & Prepare Output Directory
    // 1. Clean & Prepare Output Directory
    // await fs.emptyDir(CONFIG.outDir); // DISABLED: Avoid EPERM on locked files
    await fs.ensureDir(CONFIG.outDir);   // Just ensure it exists
    console.log('✅ Prepared dist folder (Skipped clean)');

    // 2. Copy Static Assets (CSS/JS)
    if (await fs.pathExists(CONFIG.publicDir)) {
        await fs.copy(CONFIG.publicDir, CONFIG.outDir);
        console.log('✅ Copied public assets');
    }

    // 3. Copy Images
    if (await fs.pathExists(CONFIG.imageSourceDir)) {
        await fs.copy(CONFIG.imageSourceDir, CONFIG.imageOutDir);
        console.log('✅ Copied images');
    }

    // 4. Find Markdown Files
    const files = await fs.readdir(CONFIG.rootDir);
    const mdFiles = files.filter(f => f.endsWith('.md') && !f.startsWith('node_modules'));
    
    console.log(`📄 Found ${mdFiles.length} markdown files`);

    // 5. Generate Sidebar HTML
    const sidebarHtml = generateSidebar(mdFiles);

    // 5.1 Initialize Search Index
    const searchIndex = [];

    // 6. Provide Template
    const template = await fs.readFile(CONFIG.templatePath, 'utf-8');

    // 7. Process Each File
    for (const file of mdFiles) {
        // Determine Output Filename
        const isReadme = file.toLowerCase() === 'readme.md';
        const outFilename = isReadme ? 'index.html' : file.replace('.md', '.html');
        
        // Read Markdown
        const content = await fs.readFile(path.join(CONFIG.rootDir, file), 'utf-8');
        
        // Convert to HTML
        let htmlContent = marked.parse(content);
        
        // Fix relative links (00_foo.md -> 00_foo.html)
        htmlContent = htmlContent.replace(/href="([^"]+)\.md"/g, 'href="$1.html"');

        // Extract Title (Available from filename or first H1)
        const title = formatTitle(file);

        // Add to Search Index
        const plainText = parseContentForSearch(content); // Custom helper
        searchIndex.push({
            title: title,
            url: outFilename,
            content: plainText
        });

        // Inject into Template
        const finalHtml = template
            .replace('{{title}}', title)
            .replace('{{sidebar}}', sidebarHtml)
            .replace('{{content}}', htmlContent);

        // Write to Dist
        await fs.outputFile(path.join(CONFIG.outDir, outFilename), finalHtml);
        console.log(`  📝 Generated: ${outFilename}`);
    }

    // Write Search Index
    await fs.outputJson(path.join(CONFIG.outDir, 'search.json'), searchIndex);
    console.log(`  🔍 Generated values for search.json with ${searchIndex.length} items`);

    console.log('🎉 Build Complete! Output is in doc_web/dist');
}

// Helper to strip markdown for search
function parseContentForSearch(markdown) {
    // Remove headers
    let text = markdown.replace(/^#+\s+(.*)$/gm, '$1');
    // Remove links
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    // Remove code blocks
    text = text.replace(/```[\s\S]*?```/g, '');
    // Remove bold/italic
    text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
    text = text.replace(/(\*|_)(.*?)\1/g, '$2');
    // Remove HTML tags
    text = text.replace(/<[^>]*>/g, '');
    // Trim whitespace
    return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

function generateSidebar(files) {
    // Sort files: README first, then 00_, 01_, etc.
    const sortedFiles = files.sort((a, b) => {
        if (a.toLowerCase() === 'readme.md') return -1;
        if (b.toLowerCase() === 'readme.md') return 1;
        return a.localeCompare(b);
    });

    let html = '';
    
    sortedFiles.forEach(file => {
        if (file.toLowerCase() === 'readme.md') return; // Skip "Home" as it's hardcoded
        
        const link = file.replace('.md', '.html');
        const title = formatTitle(file);
        html += `<a href="${link}">${title}</a>\n`;
    });

    return html;
}

function formatTitle(filename) {
    if (filename.toLowerCase() === 'readme.md') return 'Introduction';
    
    // Remove extension
    let name = filename.replace('.md', '');
    
    // Remove leading numbers (00_, 01_)
    name = name.replace(/^\d+_/, '');
    
    // Replace underscores with spaces
    name = name.replace(/_/g, ' ');
    
    // Title Case
    return name.replace(/\b\w/g, l => l.toUpperCase());
}

build().catch(err => console.error(err));
