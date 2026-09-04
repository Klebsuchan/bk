export type Tab = 'dashboard' | 'connectors' | 'policies' | 'proofs' | 'settings';

export interface Connector {
  id: string;
  name: string;
  type: 'postgres' | 'oracle' | 'sqlserver' | 'mongodb';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  query: string;
  status: 'active' | 'inactive';
  lastProofDate?: string;
  schedule?: 'manual' | 'daily' | 'weekly' | 'monthly';
}

export interface Proof {
  id: string;
  policyId: string;
  policyName: string;
  status: 'verified' | 'generating' | 'failed';
  timestamp: string;
  hash: string;
  explorerUrl: string;
  walletAddress?: string;
  isMinted?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  read: boolean;
  timestamp: string;
}

declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
    solflare?: any;
    backpack?: any;
    glow?: any;
    braveSolana?: any;
    phantom?: {
      solana?: any;
      ethereum?: any;
    };
  }
}
