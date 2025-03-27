
import React from 'react';
import { Wallet } from 'lucide-react';
import { slideUp } from '@/lib/animations';

const WalletHeader: React.FC = () => {
  return (
    <div className={slideUp({ className: "mb-8" })}>
      <div className="flex items-center justify-center mb-2">
        <div className="h-12 w-12 rounded-full bg-wallet-accent flex items-center justify-center shadow-lg">
          <Wallet className="text-white" size={24} />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center mb-1 text-white drop-shadow-md">Web3 Wallet</h1>
      <p className="text-white text-center opacity-90">Send crypto and manage your transactions</p>
    </div>
  );
};

export default WalletHeader;
