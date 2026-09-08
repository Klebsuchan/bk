import fs from 'fs';

let content = fs.readFileSync('api/index.ts', 'utf-8');

const pluggyEndpoint = `
  // Pluggy Connect Token Generation
  app.get('/api/pluggy/token', async (req, res) => {
    try {
      const clientId = process.env.PLUGGY_CLIENT_ID;
      const clientSecret = process.env.PLUGGY_CLIENT_SECRET;
      
      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: 'Pluggy credentials not configured' });
      }

      // 1. Get API Key from Pluggy
      const authResponse = await fetch('https://api.pluggy.ai/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          clientId,
          clientSecret
        })
      });

      const authData = await authResponse.json();
      
      if (!authResponse.ok) {
        throw new Error(authData.message || 'Failed to authenticate with Pluggy');
      }

      const apiKey = authData.apiKey;

      // 2. Generate Connect Token
      const tokenResponse = await fetch('https://api.pluggy.ai/connect_tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-API-KEY': apiKey
        }
      });

      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok) {
        throw new Error(tokenData.message || 'Failed to generate connect token');
      }

      res.json({ accessToken: tokenData.accessToken });
    } catch (error) {
      console.error('Pluggy API Error:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });
`;

// Insert it before `export default app;`
content = content.replace('export default app;', pluggyEndpoint + '\nexport default app;');

fs.writeFileSync('api/index.ts', content);
console.log('Added pluggy endpoint');
