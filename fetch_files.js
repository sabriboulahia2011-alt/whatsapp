
const fs = require('fs');
const path = require('path');
const https = require('https');

// Original URLs from sabriboulahia2011-alt
const originalUrls = [
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/components.json',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/eslint.config.mjs',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/middleware.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/next.config.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/package-lock.json',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/package.json',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/postcss.config.mjs',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/README.md',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/REPAIR.md',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/server.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/shell.ps1',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/tailwind.config.mjs',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/text.txt',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/tsconfig.json',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/TUTORIAL.md'
];

// Additional repositories to fetch from
const additionalRepos = [
  // burakorkmez repositories (WhatsApp/chat related)
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/package.json',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/tailwind.config.js',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/next.config.js',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/middleware.ts',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/components.json',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/src/app/layout.tsx',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/src/app/page.tsx',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/src/app/globals.css',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/src/components/ui/button.tsx',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/src/components/ui/input.tsx',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/src/components/ui/card.tsx',
  'https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/src/lib/utils.ts',
  
  // adrianhadjin repositories (UI/auth related)
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/package.json',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/tailwind.config.ts',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/next.config.mjs',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/components.json',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/src/app/layout.tsx',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/src/app/page.tsx',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/src/app/globals.css',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/src/components/auth/login-form.tsx',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/src/components/auth/register-form.tsx',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/src/components/ui/button.tsx',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/src/components/ui/input.tsx',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/src/lib/auth.ts',
  'https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/src/lib/utils.ts',
  
  // AntonioErdeljac repositories (advanced features)
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/package.json',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/tailwind.config.ts',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/next.config.js',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/components.json',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/middleware.ts',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/app/layout.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/app/page.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/app/globals.css',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/app/(auth)/layout.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/app/(auth)/login/page.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/app/(auth)/register/page.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/app/(main)/layout.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/app/(main)/chat/page.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/components/ui/button.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/components/ui/input.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/components/ui/card.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/components/auth/auth-form.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/components/chat/chat-list.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/components/chat/message-list.tsx',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/lib/auth.ts',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/lib/prisma.ts',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/lib/utils.ts',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/lib/socket.ts',
  'https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/prisma/schema.prisma'
];

// Combine all URLs
const urls = [...originalUrls, ...additionalRepos];

async function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${filePath}`);
          resolve();
        });
      } else {
        file.close();
        fs.unlink(filePath, () => {}); // Delete the file if download failed
        console.log(`❌ Failed to download: ${url} (Status: ${response.statusCode})`);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {}); // Delete the file if download failed
      console.log(`❌ Error downloading: ${url} - ${err.message}`);
      reject(err);
    });
  });
}

async function downloadAllFiles() {
  console.log(`Starting download of ${urls.length} files from multiple repositories...`);
  console.log('📦 Repositories: sabriboulahia2011-alt, burakorkmez, adrianhadjin, AntonioErdeljac');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const url of urls) {
    try {
      // Extract file path from URL and determine repo source
      let filePath;
      
      if (url.includes('sabriboulahia2011-alt')) {
        filePath = url.replace('https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/', '');
      } else if (url.includes('burakorkmez')) {
        filePath = 'references/burakorkmez/' + url.replace('https://raw.githubusercontent.com/burakorkmez/whatsapp-clone/main/', '');
      } else if (url.includes('adrianhadjin')) {
        filePath = 'references/adrianhadjin/' + url.replace('https://raw.githubusercontent.com/adrianhadjin/whatsapp-clone/main/', '');
      } else if (url.includes('AntonioErdeljac')) {
        filePath = 'references/AntonioErdeljac/' + url.replace('https://raw.githubusercontent.com/AntonioErdeljac/whatsapp-clone/main/', '');
      }
      
      filePath = filePath.replace(/\\/g, '/'); // Normalize path separators
      
      await downloadFile(url, filePath);
      successCount++;
      
      // Small delay to avoid overwhelming the servers
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      failCount++;
      console.log(`⚠️ Skipping failed download: ${url}`);
    }
  }
  
  console.log(`\n🎉 Download process completed!`);
  console.log(`✅ Successfully downloaded: ${successCount} files`);
  console.log(`❌ Failed downloads: ${failCount} files`);
  console.log(`📁 Files organized in: root (original) + references/ folders`);
}

downloadAllFiles().catch(console.error);
