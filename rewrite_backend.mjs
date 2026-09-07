import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf-8');

// The original server.ts has:
// async function startServer() { ... }
// startServer().catch(console.error);

// We want to create api/index.ts that only has the Express part, exported.
const apiIndexContent = content
  .replace(/async function startServer\(\) \{[\s\S]*?const app = express\(\);[\s\S]*?app\.use\(cors\(\)\);[\s\S]*?app\.use\(express\.json\(\)\);/m, 
    "const app = express();\napp.use(cors());\napp.use(express.json());")
  .replace(/\/\/ Vite middleware for development[\s\S]*?\}\n\nstartServer\(\)\.catch\(console\.error\);/m, 
    "export default app;")
  .replace(/import \{ createServer as createViteServer \} from 'vite';/, '')
  .replace(/const PORT = 3000;/, '')
  // Also we need to change how fs.readFileSync reads the config to be resilient to Vercel CWD
  .replace(/fs\.readFileSync\('\.\/firebase-applet-config\.json', 'utf-8'\)/g, "fs.readFileSync(path.join(process.cwd(), 'firebase-applet-config.json'), 'utf-8')");

fs.writeFileSync('api/index.ts', apiIndexContent);

// Now rewrite server.ts
const newServerTs = `import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import apiApp from './api/index';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Mount the API router
  app.use(apiApp);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Server running on port \${PORT}\`);
  });
}

startServer().catch(console.error);
`;

fs.writeFileSync('server.ts', newServerTs);
console.log('Backend split for Vercel');
