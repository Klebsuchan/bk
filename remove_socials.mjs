import fs from 'fs';

let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

// 1. Remove from imports
content = content.replace("Instagram, ", "");
content = content.replace("Github, Twitter, ", "");

// 2. Remove the social links block
const socialTarget = `            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"><Twitter className="w-4 h-4" /></div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"><Github className="w-4 h-4" /></div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"><Instagram className="w-4 h-4" /></div>
            </div>`;
content = content.replace(socialTarget, "");

fs.writeFileSync('src/views/LandingPageView.tsx', content);
console.log('Socials removed');
