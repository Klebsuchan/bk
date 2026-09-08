import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(
  "case 'connectors':\n        return <ConnectorsView />;",
  "case 'connectors':\n        return <ConnectorsView onNavigate={setCurrentTab} />;"
);

fs.writeFileSync('src/App.tsx', content);
