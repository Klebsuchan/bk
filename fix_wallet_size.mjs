import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

content = content.replace(
  "<wallet.Icon className={`w-5 h-5 ${wallet.color}`} />",
  "<wallet.Icon className={`w-8 h-8 ${wallet.color}`} />"
);

fs.writeFileSync('src/views/LandingPageView.tsx', content);
