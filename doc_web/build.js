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
    },
    image(token) {
        // Marked v12+ passes a generic token object
        let href = token.href || '';
        const title = token.title || null;
        const text = token.text || '';

        // Force relative path for local images if needed
        // But for simplicity, we keep them as is if they are relative. 
        // If the markdown has 'image/...', we want it to be relative to the current page.
        // However, 'image' folder is at root. So we need to prepend ../ if we are deep.
        // ACTUALLY, the best way for the renderer (which doesn't know depth) is to use an absolute path prefix placeholder
        // OR we can just let it be absolute '/' and then replace it in the final HTML processing.
        // Let's stick to the previous absolute logic but ensure it starts with / so the replacement logic works.
        
        if (href && !href.startsWith('http') && !href.startsWith('https') && !href.startsWith('/')) {
            href = '/' + href;
        }
        
        // We will replace 'src="/' with 'src="{relativePrefix}' in the main build loop if we want total relativity.
        // But for now, let's just leave it starting with / and handle it in the file loop globally if possible, 
        // OR trust the user to write relative paths.
        // given the user writes 'image/foo.png', and we are in 'computer_networks/foo.html', we need '../image/foo.png'.
        
        let out = `<img src="${href}" alt="${text}"`;
        if (title) {
            out += ` title="${title}"`;
        }
        out += '>';
        return out;
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
    await fs.ensureDir(CONFIG.outDir);
    console.log('✅ Prepared dist folder');

    // 2. Copy Static Assets
    if (await fs.pathExists(CONFIG.publicDir)) {
        await fs.copy(CONFIG.publicDir, CONFIG.outDir);
    }
    if (await fs.pathExists(CONFIG.imageSourceDir)) {
        await fs.copy(CONFIG.imageSourceDir, CONFIG.imageOutDir);
    }

    // 4. Find Markdown Files (Recursive)
    const allFiles = await getFiles(CONFIG.rootDir);
    const mdFiles = allFiles.filter(f => f.endsWith('.md') && !f.includes('node_modules') && !f.includes('dist') && !f.includes('doc_web') && !f.includes('.git'));

    console.log(`📄 Found ${mdFiles.length} markdown files`);

    // 5. Generate Sidebar HTML
    const sidebarHtml = generateSidebar(mdFiles, CONFIG.rootDir);

    const searchIndex = [];
    // Ensure template exists
    if (!await fs.pathExists(CONFIG.templatePath)) {
        console.error(`❌ Template not found at ${CONFIG.templatePath}`);
        return;
    }
    const template = await fs.readFile(CONFIG.templatePath, 'utf-8');

    for (const file of mdFiles) {
        // Calculate relative path for output
        const relativePath = path.relative(CONFIG.rootDir, file);
        const isReadme = path.basename(file).toLowerCase() === 'readme.md';
        
        // Output path (preserve structure)
        let outRelativePath = relativePath.replace('.md', '.html');
        if (isReadme && path.dirname(relativePath) === '.') {
            outRelativePath = 'index.html';
        }

        const content = await fs.readFile(file, 'utf-8');
        let htmlContent = marked.parse(content);
        
        // Fix relative links (.md -> .html)
        htmlContent = htmlContent.replace(/href="([^"]+)\.md"/g, 'href="$1.html"');

        const title = formatTitle(path.basename(file));
        const plainText = parseContentForSearch(content);
        
        searchIndex.push({
            title: title,
            url: outRelativePath.replace(/\\/g, '/'), // Force forward slashes for URL
            content: plainText
        });

        // Calculate depth for relative assets
        const depth = outRelativePath.split(/[/\\]/).length - 1;
        const relativePrefix = depth > 0 ? '../'.repeat(depth) : './';

        const finalSidebar = sidebarHtml.replace(/href="\//g, `href="${relativePrefix}`);

        const finalHtml = template
            .replace('{{title}}', title)
            .replace('{{sidebar}}', finalSidebar)
            .replace('{{content}}', htmlContent)
            .replace(/href="\/css\/style\.css"/g, `href="${relativePrefix}css/style.css"`)
            .replace(/src="\/js\/script\.js"/g, `src="${relativePrefix}js/script.js"`)
            .replace(/href="\/index\.html"/g, `href="${relativePrefix}index.html"`)
            .replace(/href="\/image\//g, `href="${relativePrefix}image/`)
            .replace(/src="\/(image\/[^"]+)"/g, `src="${relativePrefix}$1"`);

        const outPath = path.join(CONFIG.outDir, outRelativePath);
        await fs.outputFile(outPath, finalHtml);
        console.log(`  📝 Generated: ${outRelativePath}`);
    }

    await fs.outputJson(path.join(CONFIG.outDir, 'search.json'), searchIndex);
    console.log('🎉 Build Complete!');
}

// Recursive File Finder
async function getFiles(dir) {
    const subdirs = await fs.readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
        const res = path.resolve(dir, subdir);
        return (await fs.stat(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
}

function generateSidebar(absFiles, rootDir) {
    const groups = {};
    
    // Group files by directory
    absFiles.forEach(file => {
        const relPath = path.relative(rootDir, file);
        const dir = path.dirname(relPath); // e.g., 'computer_networks' or '.'
        
        if (!groups[dir]) groups[dir] = [];
        groups[dir].push({
            path: relPath.replace('.md', '.html').replace(/\\/g, '/'),
            name: formatTitle(path.basename(file)),
            isReadme: path.basename(file).toLowerCase() === 'readme.md'
        });
    });

    let html = '';

    // Handle Root (INTRODUCTION)
    if (groups['.']) {
        const readme = groups['.'].find(f => f.isReadme);
        if (readme) {
            html += `<a href="/index.html" class="nav-header">🏠 Home</a>\n`;
        }
        groups['.'].filter(f => !f.isReadme).forEach(f => {
             html += `<a href="/${f.path}">${f.name}</a>\n`;
        });
        delete groups['.'];
    }

    // Handle Subdirectories
    Object.keys(groups).sort().forEach(dir => {
        if (dir.includes('node_modules') || dir.startsWith('.')) return;
        
        const title = formatTitle(dir); // "Computer Networks"
        html += `<div class="nav-section">${title}</div>\n`;
        
        groups[dir].sort((a,b) => a.name.localeCompare(b.name)).forEach(f => {
            html += `<a href="/${f.path}">${f.name}</a>\n`;
        });
    });

    return html;
}

function formatTitle(filename) {
    if (filename.toLowerCase() === 'readme.md') return 'Introduction';
    let name = filename.replace('.md', '').replace(/^\d+_/, '').replace(/_/g, ' ');
    return name.replace(/\b\w/g, l => l.toUpperCase());
}

function parseContentForSearch(content) {
    // Simple helper to strip markdown and get plain text
    if (!content) return '';
    return content
        .replace(/#+\s/g, '') // Remove headers
        .replace(/`{1,3}.*?`{1,3}/gs, '') // Remove code blocks
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
        .replace(/[*_]/g, '') // Remove bold/italic
        .replace(/\n/g, ' ') // Collapse newlines
        .substring(0, 500); // Limit length
}

// Execute Build
build().catch(console.error);
