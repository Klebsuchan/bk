import fs from 'fs';
let content = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');

// Replace the handleTestConnection mock logic with a real backend call
const oldMock = `const handleTestConnection = (connector: Connector) => {
    setTestingId(connector.id);
    setTestStatus('running');
    setTestLogs([\`> Initiating secure handshake with \${connector.name}...\`]);

    // Simulate terminal connection flow
    setTimeout(() => {
      setTestLogs(prev => [...prev, \`> Resolving endpoint for \${connector.type} driver... [OK]\`]);
      setTimeout(() => {
        setTestLogs(prev => [...prev, \`> Negotiating TLS 1.3 encryption... [OK]\`]);
        setTimeout(() => {
          setTestLogs(prev => [...prev, \`> Authenticating via IAM role... [OK]\`]);
          setTimeout(() => {
            setTestLogs(prev => [...prev, \`> Pinging database... Latency: \${Math.floor(Math.random() * 20 + 5)}ms\`]);
            setTimeout(() => {
              setTestLogs(prev => [...prev, \`> Connection established successfully.\`]);
              setTestStatus('success');
            }, 800);
          }, 600);
        }, 800);
      }, 700);
    }, 600);
  };`;

const newCode = `const handleTestConnection = async (connector: Connector) => {
    setTestingId(connector.id);
    setTestStatus('running');
    setTestLogs([\`> Initiating secure handshake with \${connector.name}...\`]);

    try {
      setTestLogs(prev => [...prev, \`> Requesting cryptographic token from server...\`]);
      
      const response = await fetch(\`/api/connectors/\${connector.id}/test\`, { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        setTestLogs(prev => [
          ...prev, 
          \`> TLS 1.3 encryption negotiated.\`,
          \`> Received Access Token: \${data.token}\`,
          \`> Connection established successfully at \${new Date(data.timestamp).toLocaleTimeString()}.\`
        ]);
        setTestStatus('success');
        
        // Refresh connector list locally to show updated 'lastSync'
        setConnectors(connectors.map(c => c.id === connector.id ? { ...c, status: 'connected', lastSync: new Date(data.timestamp).toLocaleTimeString() } : c));
      } else {
        setTestLogs(prev => [...prev, \`> Connection rejected by server.\`]);
        setTestStatus('error');
      }
    } catch (err) {
      setTestLogs(prev => [...prev, \`> Network error during handshake.\`]);
      setTestStatus('error');
    }
  };`;

content = content.replace(oldMock, newCode);
fs.writeFileSync('src/views/ConnectorsView.tsx', content);
