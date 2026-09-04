import fs from 'fs';

let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

// Add imports
const imports = `import { PhantomIcon, SolflareIcon, BackpackIcon, OkxIcon, GlowIcon, BraveIcon, TrustIcon, CoinbaseIcon, GenericWalletIcon, GenericShieldIcon } from '../components/WalletIcons';\n`;

content = content.replace("import { ArrowRight", imports + "import { ArrowRight");

// Replace the WALLETS array
const oldWallets = `  const WALLETS = [
    { id: 'phantom', name: 'Phantom', color: 'text-purple-400', bg: 'bg-purple-500/20', Icon: Zap },
    { id: 'solflare', name: 'Solflare', color: 'text-orange-400', bg: 'bg-orange-500/20', Icon: Zap },
    { id: 'backpack', name: 'Backpack', color: 'text-red-400', bg: 'bg-red-500/20', Icon: Zap },
    { id: 'okx', name: 'OKX Wallet', color: 'text-white', bg: 'bg-white/10', Icon: Zap },
    { id: 'glow', name: 'Glow', color: 'text-blue-400', bg: 'bg-blue-500/20', Icon: Zap },
    { id: 'brave', name: 'Brave', color: 'text-orange-500', bg: 'bg-orange-600/20', Icon: Zap },
    { id: 'trust', name: 'Trust Wallet', color: 'text-[#3375BB]', bg: 'bg-[#3375BB]/20', Icon: ShieldCheck },
    { id: 'coin98', name: 'Coin98', color: 'text-yellow-400', bg: 'bg-yellow-500/20', Icon: Zap },
    { id: 'math', name: 'MathWallet', color: 'text-slate-400', bg: 'bg-slate-500/20', Icon: Zap },
    { id: 'tokenpocket', name: 'TokenPocket', color: 'text-blue-400', bg: 'bg-blue-400/20', Icon: Zap },
    { id: 'safepal', name: 'SafePal', color: 'text-gray-400', bg: 'bg-gray-500/20', Icon: ShieldCheck },
    { id: 'coinbase', name: 'Coinbase Wallet', color: 'text-blue-500', bg: 'bg-blue-600/20', Icon: Zap },
    { id: 'bitget', name: 'Bitget Wallet', color: 'text-cyan-400', bg: 'bg-cyan-500/20', Icon: Zap },
    { id: 'exodus', name: 'Exodus', color: 'text-gray-300', bg: 'bg-[#1e2336]/80', Icon: Zap },
    { id: 'nightly', name: 'Nightly', color: 'text-indigo-400', bg: 'bg-indigo-500/20', Icon: Zap },
    { id: 'solong', name: 'Solong', color: 'text-green-400', bg: 'bg-green-500/20', Icon: Zap },
    { id: 'blocto', name: 'Blocto', color: 'text-blue-300', bg: 'bg-blue-400/20', Icon: Zap },
    { id: 'torus', name: 'Torus', color: 'text-blue-500', bg: 'bg-blue-500/20', Icon: Zap },
    { id: 'frontier', name: 'Frontier', color: 'text-red-500', bg: 'bg-red-500/20', Icon: Zap },
    { id: 'cryptocom', name: 'Crypto.com', color: 'text-blue-600', bg: 'bg-blue-600/20', Icon: ShieldCheck },
    { id: 'nufi', name: 'NuFi', color: 'text-teal-400', bg: 'bg-teal-500/20', Icon: Zap },
  ];`;

const newWallets = `  const WALLETS = [
    { id: 'phantom', name: 'Phantom', color: '', bg: 'bg-transparent', Icon: PhantomIcon },
    { id: 'solflare', name: 'Solflare', color: '', bg: 'bg-transparent', Icon: SolflareIcon },
    { id: 'backpack', name: 'Backpack', color: '', bg: 'bg-transparent', Icon: BackpackIcon },
    { id: 'okx', name: 'OKX Wallet', color: '', bg: 'bg-transparent', Icon: OkxIcon },
    { id: 'glow', name: 'Glow', color: '', bg: 'bg-transparent', Icon: GlowIcon },
    { id: 'brave', name: 'Brave', color: '', bg: 'bg-transparent', Icon: BraveIcon },
    { id: 'trust', name: 'Trust Wallet', color: '', bg: 'bg-transparent', Icon: TrustIcon },
    { id: 'coinbase', name: 'Coinbase Wallet', color: '', bg: 'bg-transparent', Icon: CoinbaseIcon },
    { id: 'coin98', name: 'Coin98', color: 'text-yellow-400', bg: 'bg-yellow-500/20', Icon: GenericWalletIcon },
    { id: 'math', name: 'MathWallet', color: 'text-slate-400', bg: 'bg-slate-500/20', Icon: GenericWalletIcon },
    { id: 'tokenpocket', name: 'TokenPocket', color: 'text-blue-400', bg: 'bg-blue-400/20', Icon: GenericWalletIcon },
    { id: 'safepal', name: 'SafePal', color: 'text-gray-400', bg: 'bg-gray-500/20', Icon: GenericShieldIcon },
    { id: 'bitget', name: 'Bitget Wallet', color: 'text-cyan-400', bg: 'bg-cyan-500/20', Icon: GenericWalletIcon },
    { id: 'exodus', name: 'Exodus', color: 'text-gray-300', bg: 'bg-[#1e2336]/80', Icon: GenericWalletIcon },
    { id: 'nightly', name: 'Nightly', color: 'text-indigo-400', bg: 'bg-indigo-500/20', Icon: GenericWalletIcon },
    { id: 'solong', name: 'Solong', color: 'text-green-400', bg: 'bg-green-500/20', Icon: GenericWalletIcon },
    { id: 'blocto', name: 'Blocto', color: 'text-blue-300', bg: 'bg-blue-400/20', Icon: GenericWalletIcon },
    { id: 'torus', name: 'Torus', color: 'text-blue-500', bg: 'bg-blue-500/20', Icon: GenericWalletIcon },
    { id: 'frontier', name: 'Frontier', color: 'text-red-500', bg: 'bg-red-500/20', Icon: GenericWalletIcon },
    { id: 'cryptocom', name: 'Crypto.com', color: 'text-blue-600', bg: 'bg-blue-600/20', Icon: GenericShieldIcon },
    { id: 'nufi', name: 'NuFi', color: 'text-teal-400', bg: 'bg-teal-500/20', Icon: GenericWalletIcon },
  ];`;

content = content.replace(oldWallets, newWallets);
fs.writeFileSync('src/views/LandingPageView.tsx', content);
