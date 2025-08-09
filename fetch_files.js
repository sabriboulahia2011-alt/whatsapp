
const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = [
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
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/TUTORIAL.md',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/.vscode/settings.json',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/prisma/migrations/0001_init.sql',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/public/file.svg',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/public/globe.svg',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/public/next.svg',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/public/vercel.svg',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/public/window.svg',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/public/animations/chat.json',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/globals.css',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/layout.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/page.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/(app)/layout.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/(app)/audio-call/page.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/(app)/chat/page.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/(app)/profile/page.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/(app)/settings/page.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/(app)/video-call/page.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/(auth)/layout.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/(auth)/login/page.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/(auth)/register/page.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/api/auth/login.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/api/auth/me.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/app/api/auth/register.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/BottomNav.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ChatItem.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ChatList.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/Footer.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/GroupChatModal.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/MessageForm.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/MessageInput.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/MessageItem.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/MessageList.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/Navbar.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/README.md',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/Sidebar.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ThemeToggle.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/TypingIndicator.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/UserAvatar.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/alert.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/avatar.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/badge.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/button.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/card.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/dialog.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/input.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/switch.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/textarea.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/components/ui/toast.tsx',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/hooks/README.md',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/hooks/useSession.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/hooks/useSocket.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/lib/api.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/lib/auth.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/lib/prisma.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/lib/README.md',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/lib/signaling.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/lib/socket.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/lib/user.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/lib/utils.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/prisma/schema.prisma',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/store/useChatStore.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/store/usePresenceStore.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/store/useUserStore.ts',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/styles/README.md',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/tests/README.md',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/utils/README.md',
  'https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/src/utils/types.ts'
];

function downloadFile(url, filePath) {
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
        console.log(`❌ Failed to download ${url}: Status ${response.statusCode}`);
        file.close();
        fs.unlinkSync(filePath); // Delete the file
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.log(`❌ Error downloading ${url}: ${err.message}`);
      file.close();
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the file
      }
      reject(err);
    });
  });
}

async function downloadAllFiles() {
  console.log(`Starting download of ${urls.length} files...`);
  
  for (const url of urls) {
    try {
      // Extract file path from URL
      const urlPath = url.replace('https://raw.githubusercontent.com/sabriboulahia2011-alt/whatsapp/refs/heads/main/', '');
      const filePath = urlPath.replace(/\\/g, '/'); // Normalize path separators
      
      await downloadFile(url, filePath);
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.log(`Skipping failed download: ${url}`);
    }
  }
  
  console.log('\n🎉 Download process completed!');
}

downloadAllFiles().catch(console.error);
