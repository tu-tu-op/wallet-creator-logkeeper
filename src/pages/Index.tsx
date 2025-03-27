
import React, { useState, useEffect } from 'react';
import WalletHeader from '@/components/WalletHeader';
import NewTransactionForm from '@/components/NewTransactionForm';
import TransactionHistory from '@/components/TransactionHistory';
import { Transaction, generateMockTransactions } from '@/utils/transactionUtils';

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading transactions from log.txt
    const timer = setTimeout(() => {
      setTransactions(generateMockTransactions());
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleNewTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-wallet-light to-white">
      <div className="container px-4 py-12 max-w-md mx-auto">
        <WalletHeader />
        
        <NewTransactionForm onTransactionComplete={handleNewTransaction} />
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-40 wallet-card p-6 animate-pulse-subtle">
            <p className="text-wallet-muted">Loading transaction history...</p>
          </div>
        ) : (
          <div className="wallet-card p-6">
            <TransactionHistory transactions={transactions} />
          </div>
        )}
        
        <footer className="mt-10 text-center text-xs text-wallet-muted">
          <p>Transaction data is stored locally in log.txt</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
