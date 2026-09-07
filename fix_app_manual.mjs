import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add ManualView import
content = content.replace("import { LandingPageView } from './views/LandingPageView';", "import { LandingPageView } from './views/LandingPageView';\nimport { ManualView } from './views/ManualView';");

// 2. Add manual route switch
const caseTarget = `      case 'settings':
        return <SettingsView />;`;
const caseReplacement = `      case 'manual':
        return <ManualView />;
      case 'settings':
        return <SettingsView />;`;
content = content.replace(caseTarget, caseReplacement);

fs.writeFileSync('src/App.tsx', content);
console.log('App updated');
