import React from 'react';
import { Wallet, ShieldCheck } from 'lucide-react';

export const PhantomIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="64" cy="64" r="64" fill="#AB9FF2"/>
    <path d="M96 85.5C96 85.5 96 95 91 95C86 95 86 85.5 86 85.5V64C86 52 76 42 64 42C52 42 42 52 42 64V96.5C42 101.5 37 101.5 37 96.5V64C37 49 49 37 64 37C79 37 96 49 96 64V85.5Z" fill="white"/>
    <circle cx="78" cy="64" r="5" fill="white"/>
    <circle cx="56" cy="64" r="5" fill="white"/>
  </svg>
);

export const SolflareIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="64" cy="64" r="64" fill="#EC5F28"/>
    <path d="M64 24L72 56L104 64L72 72L64 104L56 72L24 64L56 56L64 24Z" fill="white"/>
  </svg>
);

export const BackpackIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="64" cy="64" r="64" fill="#E33E3F"/>
    <rect x="36" y="44" width="56" height="56" rx="12" fill="white"/>
    <path d="M48 44V36C48 27.1634 55.1634 20 64 20C72.8366 20 80 27.1634 80 36V44" stroke="white" strokeWidth="8" strokeLinecap="round"/>
    <rect x="44" y="60" width="40" height="24" rx="6" fill="#E33E3F"/>
  </svg>
);

export const OkxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="64" cy="64" r="64" fill="black"/>
    <text x="64" y="76" fill="white" fontSize="36" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">OKX</text>
  </svg>
);

export const GlowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="64" cy="64" r="64" fill="#1C1C28"/>
    <circle cx="64" cy="64" r="40" stroke="#7A3BFF" strokeWidth="12"/>
    <circle cx="64" cy="64" r="20" fill="#7A3BFF"/>
  </svg>
);

export const BraveIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="64" cy="64" r="64" fill="#FB542B"/>
    <path d="M64 24L96 40V72L64 104L32 72V40L64 24Z" fill="white"/>
    <path d="M64 44L76 52V68L64 76L52 68V52L64 44Z" fill="#FB542B"/>
  </svg>
);

export const TrustIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="64" cy="64" r="64" fill="#3375BB"/>
    <path d="M64 24L96 40V72C96 88 80 96 64 104C48 96 32 88 32 72V40L64 24Z" fill="white"/>
  </svg>
);

export const CoinbaseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="64" cy="64" r="64" fill="#0052FF"/>
    <circle cx="64" cy="64" r="32" stroke="white" strokeWidth="16"/>
  </svg>
);

export const GenericWalletIcon = ({ className }: { className?: string }) => (
  <Wallet className={className} />
);

export const GenericShieldIcon = ({ className }: { className?: string }) => (
  <ShieldCheck className={className} />
);
