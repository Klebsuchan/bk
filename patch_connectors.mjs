import fs from 'fs';

let content = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');

const target = `onSuccess={(itemData) => {
            console.log('success', itemData);
            setPluggyToken(null);
            fetch('/api/connectors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: \`Bank - \${itemData?.item?.connector?.name || 'Sandbox'}\`, type: 'open_finance' })
            }).then(() => fetchConnectors());
          }}`;
          
if(content.includes(target)) {
    content = content.replace(target, "onSuccess={handlePluggySuccess}");
    fs.writeFileSync('src/views/ConnectorsView.tsx', content);
    console.log("Success");
} else {
    console.log("Not found exactly");
}
