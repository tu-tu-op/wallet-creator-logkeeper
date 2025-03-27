
import React, { useState } from 'react';
import { Transaction } from '@/utils/transactionUtils';
import TransactionCard from './TransactionCard';
import { History } from 'lucide-react';
import { slideUp } from '@/lib/animations';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={slideUp({ index: 3 })}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <History size={16} className="text-wallet-muted mr-2" />
          <h3 className="text-lg font-medium">Transaction History</h3>
        </div>
        {transactions.length > 3 && (
          <button 
            className="text-sm text-wallet-accent hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Show all'}
          </button>
        )}
      </div>
      
      <div className="max-h-[400px] overflow-y-auto pr-2">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-wallet-muted">
            <p>No transactions yet</p>
          </div>
        ) : (
          <>
            {(isExpanded ? transactions : transactions.slice(0, 3)).map((transaction, index) => (
              <TransactionCard 
                key={transaction.id} 
                transaction={transaction}
                index={index}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
