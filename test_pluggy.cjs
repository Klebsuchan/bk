require('dotenv').config();
const { PluggyClient } = require('pluggy-sdk');

async function test() {
  try {
    const client = new PluggyClient({
      clientId: process.env.PLUGGY_CLIENT_ID,
      clientSecret: process.env.PLUGGY_CLIENT_SECRET,
    });
    
    const token = await client.createConnectToken();
    console.log("Token:", token.accessToken);
  } catch(e) {
    console.error("Error:", e.message);
  }
}
test();
