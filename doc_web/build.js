import fs from 'fs-extra';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
    rootDir: path.resolve(__dirname, '..'), // Parent dir (where notes are)
    outDir: path.resolve(__dirname, 'dist'),
    templatePath: path.resolve(__dirname, 'templates/layout.html'),
    publicDir: path.resolve(__dirname, 'public'),
    imageSourceDir: path.resolve(__dirname, '../image'),
    imageOutDir: path.resolve(__dirname, 'dist/image')
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
            return `<div class="mermaid">${text}</div>`;
        }
        return `<pre><code class="language-${cleanLang}">${text}</code></pre>`;
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
    await fs.emptyDir(CONFIG.outDir);
    console.log('✅ Cleaned dist folder');

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

        // Inject into Template
        const finalHtml = template
            .replace('{{title}}', title)
            .replace('{{sidebar}}', sidebarHtml)
            .replace('{{content}}', htmlContent);

        // Write to Dist
        await fs.outputFile(path.join(CONFIG.outDir, outFilename), finalHtml);
        console.log(`  📝 Generated: ${outFilename}`);
    }

    console.log('🎉 Build Complete! Output is in doc_web/dist');
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
