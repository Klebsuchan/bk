import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add import
content = content.replace("import { LandingPageView } from './views/LandingPageView';", "import { LandingPageView } from './views/LandingPageView';\nimport { SettingsView } from './views/SettingsView';");

// Add case in switch
content = content.replace("case 'proofs':\n        return <ProofsView />;", "case 'proofs':\n        return <ProofsView />;\n      case 'settings':\n        return <SettingsView />;");

fs.writeFileSync('src/App.tsx', content);
