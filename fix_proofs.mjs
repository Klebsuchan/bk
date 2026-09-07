import fs from 'fs';

let content = fs.readFileSync('src/views/ProofsView.tsx', 'utf-8');

// 1. Add export function
const fetchProofsCode = `
  const fetchProofs = () => {`;
const exportFunctionsCode = `
  const exportCSV = () => {
    const headers = ['Proof ID', 'Policy Name', 'Status', 'Timestamp', 'Solana Hash', 'Auditor Wallet'];
    const csvContent = [
      headers.join(','),
      ...proofs.map(p => \`\${p.id},"\${p.policyName}",\${p.status},\${new Date(p.timestamp).toLocaleString()},\${p.hash},\${p.walletAddress || 'Guest'}\`)
    ].join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'bk_auditor_proofs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAllPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(5, 5, 5);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(153, 255, 102);
    doc.setFontSize(16);
    doc.text('bk.auditor® - Full Audit Log', 20, 20);
    
    let y = 40;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    proofs.forEach((proof, index) => {
       if (y > 270) {
          doc.addPage();
          y = 20;
       }
       doc.setFont(undefined, 'bold');
       doc.text(\`Proof #\${index + 1}: \${proof.policyName}\`, 20, y);
       doc.setFont(undefined, 'normal');
       doc.text(\`Status: \${proof.status.toUpperCase()}\`, 20, y + 5);
       doc.text(\`Date: \${new Date(proof.timestamp).toLocaleString()}\`, 20, y + 10);
       doc.text(\`Hash: \${proof.hash}\`, 20, y + 15);
       doc.setDrawColor(200, 200, 200);
       doc.line(20, y + 20, 190, y + 20);
       y += 30;
    });
    doc.save('bk_auditor_full_report.pdf');
  };

  const fetchProofs = () => {`;
content = content.replace(fetchProofsCode, exportFunctionsCode);

// 2. Add buttons to header
const headerTarget = `<div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{t('Immutable Audit Seals', 'Selos de Auditoria Imutáveis')}</h1>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest">Verifiable ZK-SNARK proofs anchored on-chain for regulator access.</p>
        </div>
      </div>`;
const headerReplacement = `<div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{t('Immutable Audit Seals', 'Selos de Auditoria Imutáveis')}</h1>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest">{t('Verifiable ZK-SNARK proofs anchored on-chain for regulator access.', 'Provas ZK-SNARK verificáveis na blockchain para acesso do regulador.')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="flex items-center px-4 py-2 border border-white/20 hover:bg-white/10 text-white rounded-sm font-bold uppercase tracking-widest text-[10px] transition-colors">
             <Download className="w-3 h-3 mr-2" />
             Export Excel
          </button>
          <button onClick={exportAllPDF} className="flex items-center px-4 py-2 bg-white hover:bg-[#99ff66] text-black rounded-sm font-bold uppercase tracking-widest text-[10px] transition-colors">
             <FileText className="w-3 h-3 mr-2" />
             Export PDF
          </button>
        </div>
      </div>`;
content = content.replace(headerTarget, headerReplacement);

fs.writeFileSync('src/views/ProofsView.tsx', content);
console.log('ProofsView updated');
