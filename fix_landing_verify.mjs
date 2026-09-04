import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

const oldVerify = `  const verifyProof = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyStatus('verifying');
    
    // Fake verification
    setTimeout(() => {
      if (verifyHash.length > 20 && verifyHash.startsWith('0x')) {
        setVerifyStatus('valid');
      } else {
        setVerifyStatus('invalid');
      }
    }, 2000);
  };`;

const newVerify = `  const verifyProof = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyStatus('verifying');
    
    try {
      const response = await fetch('/api/proofs/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hash: verifyHash.trim() })
      });
      const data = await response.json();
      
      if (data.valid) {
        setVerifyStatus('valid');
      } else {
        setVerifyStatus('invalid');
      }
    } catch (err) {
      setVerifyStatus('invalid');
    }
  };`;

content = content.replace(oldVerify, newVerify);
fs.writeFileSync('src/views/LandingPageView.tsx', content);
