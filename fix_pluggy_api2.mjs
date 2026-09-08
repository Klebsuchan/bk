import fs from 'fs';

let content = fs.readFileSync('api/index.ts', 'utf-8');

const regex = /\/\/ Pluggy Connect Token Generation[\s\S]*?export default app;/g;

const newEndpoint = `  // Pluggy Connect Token Generation
  app.get('/api/pluggy/token', async (req, res) => {
    try {
      const clientId = process.env.PLUGGY_CLIENT_ID;
      const clientSecret = process.env.PLUGGY_CLIENT_SECRET;
      
      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: 'Pluggy credentials not configured' });
      }

      const { PluggyClient } = await import('pluggy-sdk');
      const client = new PluggyClient({
        clientId: clientId,
        clientSecret: clientSecret,
      });

      const connectToken = await client.createConnectToken();
      res.json({ accessToken: connectToken.accessToken });
    } catch (error) {
      console.error('Pluggy API Error:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

export default app;`;

content = content.replace(regex, newEndpoint);

fs.writeFileSync('api/index.ts', content);
console.log('Fixed Pluggy API endpoint');
