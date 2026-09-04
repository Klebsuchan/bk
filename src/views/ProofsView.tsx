import { useI18n } from '../i18n';
import { useState, useEffect } from 'react';
import { ShieldCheck, ExternalLink, Download, FileText, AlertCircle, Fingerprint } from 'lucide-react';
import { Proof } from '../types';
import jsPDF from 'jspdf';

export function ProofsView() {
  const { t } = useI18n();
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loading, setLoading] = useState(true);
  const [mintingId, setMintingId] = useState<string | null>(null);

  const fetchProofs = () => {
    fetch('/api/proofs')
      .then(res => res.json())
      .then(data => {
        setProofs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching proofs:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProofs();
  }, []);

  const handleMintSBT = async (proof: Proof) => {
    if (!proof.walletAddress) return alert('Wallet connection required to mint SBT.');
    
    setMintingId(proof.id);
    try {
      // Simulate blockchain tx delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const res = await fetch(`/api/proofs/${proof.id}/mint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: proof.walletAddress })
      });
      
      if (res.ok) {
        fetchProofs(); // Refresh to show as minted
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMintingId(null);
    }
  };

  const downloadCertificate = (proof: Proof) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(5, 5, 5);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(153, 255, 102); // Emerald/Green accent
    doc.setFontSize(24);
    doc.text('bk.auditor', 20, 25);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('Cryptographic Audit Certificate', 100, 25);
    
    // Body
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('Zero-Knowledge Proof Record', 20, 60);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Certificate ID: ${proof.id}`, 20, 75);
    doc.text(`Policy Validated: ${proof.policyName}`, 20, 85);
    doc.text(`Verification Status: ${proof.status.toUpperCase()}`, 20, 95);
    doc.text(`Timestamp: ${new Date(proof.timestamp).toLocaleString()}`, 20, 105);
    if (proof.walletAddress) {
      doc.text(`Auditor Wallet: ${proof.walletAddress}`, 20, 115);
    }
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 125, 190, 125);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('On-Chain Anchor Data', 20, 140);
    
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const hashLines = doc.splitTextToSize(`Transaction Hash: ${proof.hash}`, 170);
    doc.text(hashLines, 20, 150);
    
    doc.text(`Explorer URL: ${proof.explorerUrl}`, 20, 170);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('This certificate is cryptographically verifiable and mathematically proves', 20, 270);
    doc.text('adherence to the stated policy without revealing underlying raw data.', 20, 275);
    
    doc.save(`audit_certificate_${proof.id}.pdf`);
  };

  if (loading) {
    return <div className="p-8 text-white/50 font-mono tracking-widest text-xs uppercase">Loading proofs...</div>;
  }

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{t('Immutable Audit Seals', 'Selos de Auditoria Imutáveis')}</h1>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest">Verifiable ZK-SNARK proofs anchored on-chain for regulator access.</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-white/50 text-[10px] font-mono tracking-widest uppercase">
              <th className="p-4 font-bold">Proof ID</th>
              <th className="p-4 font-bold">Policy Validated</th>
              <th className="p-4 font-bold">{t('Status', 'Status')}</th>
              <th className="p-4 font-bold">{t('Auditor', 'Auditor')}</th>
              <th className="p-4 font-bold">Timestamp</th>
              <th className="p-4 font-bold">On-Chain Hash</th>
              <th className="p-4 font-bold text-right">{t('Actions', 'Ações')}</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {proofs.map((proof, i) => (
              <tr key={proof.id} className={`border-white/5 hover:bg-white/5 transition-colors ${i !== proofs.length - 1 ? 'border-b' : ''}`}>
                <td className="p-4"> 
                  <span className="font-mono text-white/70 text-xs">{proof.id.substring(0, 8)}...</span>
                </td>
                <td className="p-4 text-white font-bold uppercase tracking-tight text-xs">{proof.policyName}</td>
                <td className="p-4">
                  {proof.status === 'failed' ? (
                    <span className="inline-flex items-center px-2 py-0.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-[10px] font-mono uppercase tracking-widest">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Failed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 bg-[#99ff66]/10 text-[#99ff66] border border-[#99ff66]/20 rounded-full text-[10px] font-mono uppercase tracking-widest">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </td>
                <td className="p-4 text-white/50 text-xs">
                  {proof.walletAddress ? (
                    <span className="font-mono text-[10px] px-2 py-1 bg-[#050505] rounded-sm border border-white/10">
                      {proof.walletAddress.substring(0, 6)}...
                    </span>
                  ) : (
                    <span className="text-white/30 font-mono tracking-widest uppercase text-[10px]">System</span>
                  )}
                </td>
                <td className="p-4 text-white/50 text-xs font-mono">{new Date(proof.timestamp).toLocaleString()}</td>
                <td className="p-4">
                  <code className="text-[10px] text-white/30 font-mono bg-[#050505] border border-white/10 px-2 py-1 rounded-sm">
                    {proof.hash.substring(0, 16)}...
                  </code>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-3">
                    {proof.status === 'verified' && (
                      <>
                        <button 
                          onClick={() => handleMintSBT(proof)}
                          disabled={proof.isMinted || mintingId === proof.id || !proof.walletAddress}
                          className={`flex items-center px-2 py-1 text-[10px] font-mono tracking-widest uppercase rounded-sm border transition-colors ${
                            proof.isMinted 
                              ? 'bg-[#99ff66]/10 text-[#99ff66] border-[#99ff66]/20 cursor-default'
                              : 'bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10'
                          } disabled:opacity-50`}
                          title={!proof.walletAddress ? t("Wallet required", "Carteira obrigatória") : t("Mint as Soulbound Token", "Emitir como Token Soulbound")}
                        >
                          <Fingerprint className={`w-3 h-3 ${proof.isMinted ? 'mr-1' : ''}`} />
                          {proof.isMinted ? t('Minted', 'Emitido') : mintingId === proof.id ? '...' : ''}
                        </button>
                        <button 
                          onClick={() => downloadCertificate(proof)}
                          className="text-white/40 hover:text-white transition-colors"
                          title={t("Download Certificate PDF", "Baixar Certificado PDF")}
                        >
                           <FileText className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <a href={proof.explorerUrl} target="_blank" rel="noopener noreferrer" className={`${proof.status === 'failed' ? 'text-rose-500 hover:text-rose-400' : 'text-[#99ff66] hover:text-white'} flex items-center text-[10px] font-mono uppercase tracking-widest transition-colors`}>
                       Verify
                       <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
