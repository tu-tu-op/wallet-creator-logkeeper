
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
    // In a real app, this would be an API call or file read
    const timer = setTimeout(() => {
      const loadedTransactions = generateMockTransactions();
      console.log('Loaded transactions from log.txt:', loadedTransactions);
      setTransactions(loadedTransactions);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleNewTransaction = (transaction: Transaction) => {
    // In a real app, this would also append to log.txt
    console.log('logTransaction called with:', transaction.receiver, transaction.amount, transaction.date);
    setTransactions([transaction, ...transactions]);
  };

  return (
    <>
      {/* animated-gradient now hidden */}
      <div className="fixed inset-0 -z-10 bg-sand"></div>
      <div className="relative min-h-screen z-10">
        <div className="container px-4 py-12 max-w-md mx-auto">
          <WalletHeader />
          <NewTransactionForm onTransactionComplete={handleNewTransaction} />
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40 wallet-card p-6 animate-pulse-subtle">
              <p className="text-wallet-muted">Loading transaction history...</p>
            </div>
          ) : (
            <>
              <div className="wallet-card p-6">
                <TransactionHistory transactions={transactions} />
              </div>
              {/* Comparison graph styled below history */}
              <div className="comparison-card">
                <ContractComparisonGraph transactions={transactions} />
              </div>
            </>
          )}
          <footer className="mt-10 text-center text-xs text-wallet-muted">
            <p>Transaction data is stored locally in log.txt</p>
          </footer>
        </div>
      </div>
    </>
  );
};

import ContractComparisonGraph from "@/components/ContractComparisonGraph";
export default Index;
