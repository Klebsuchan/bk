import fs from 'fs';

let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

// Replace WALLETS array
const oldWalletsMatch = content.match(/const WALLETS = \[\s*\{ id: 'phantom'.*?\s*\];/s);
if (oldWalletsMatch) {
  const newWallets = `const WALLETS = [
    { id: 'phantom', name: 'Phantom', color: 'text-purple-400', bg: 'bg-purple-500/20', Icon: Zap },
    { id: 'solflare', name: 'Solflare', color: 'text-orange-400', bg: 'bg-orange-500/20', Icon: Zap },
    { id: 'backpack', name: 'Backpack', color: 'text-red-400', bg: 'bg-red-500/20', Icon: Zap },
    { id: 'magiceden', name: 'Magic Eden Wallet', color: 'text-pink-400', bg: 'bg-pink-500/20', Icon: Zap },
    { id: 'trust', name: 'Trust Wallet', color: 'text-[#3375BB]', bg: 'bg-[#3375BB]/20', Icon: ShieldCheck },
    { id: 'okx', name: 'OKX Wallet', color: 'text-white', bg: 'bg-white/10', Icon: Zap },
    { id: 'coinbase', name: 'Coinbase Wallet', color: 'text-blue-500', bg: 'bg-blue-600/20', Icon: Zap },
    { id: 'bitget', name: 'Bitget Wallet', color: 'text-cyan-400', bg: 'bg-cyan-500/20', Icon: Zap },
    { id: 'exodus', name: 'Exodus', color: 'text-gray-300', bg: 'bg-[#1e2336]/80', Icon: Zap },
    { id: 'nightly', name: 'Nightly', color: 'text-indigo-400', bg: 'bg-indigo-500/20', Icon: Zap },
    { id: 'safepal', name: 'SafePal', color: 'text-gray-400', bg: 'bg-gray-500/20', Icon: ShieldCheck },
    { id: 'math', name: 'MathWallet', color: 'text-slate-400', bg: 'bg-slate-500/20', Icon: Zap },
    { id: 'coin98', name: 'Coin98', color: 'text-yellow-400', bg: 'bg-yellow-500/20', Icon: Zap }
  ];`;
  content = content.replace(oldWalletsMatch[0], newWallets);
}

// Add magiceden to connectWallet
const oldConnect = `} else if (walletType === 'solflare') {
          provider = win.solflare;
        } else if (walletType === 'backpack') {
          provider = win.backpack;`;
const newConnect = `} else if (walletType === 'solflare') {
          provider = win.solflare;
        } else if (walletType === 'backpack') {
          provider = win.backpack;
        } else if (walletType === 'magiceden') {
          provider = win.magicEden?.solana || win.magicEden;`;
content = content.replace(oldConnect, newConnect);

fs.writeFileSync('src/views/LandingPageView.tsx', content);
console.log('Done');
