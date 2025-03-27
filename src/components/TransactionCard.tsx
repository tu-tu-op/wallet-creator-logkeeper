
import React from 'react';
import { Transaction, formatAddress, getFormattedDate, getNetworkColor, getStatusColor } from '@/utils/transactionUtils';
import { scaleIn } from '@/lib/animations';

interface TransactionCardProps {
  transaction: Transaction;
  index: number;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, index }) => {
  const { amount, receiver, date, status, networkType, contractType, gasFee } = transaction;
  const formattedDate = getFormattedDate(date);
  const networkColorClass = getNetworkColor(networkType);
  const statusColorClass = getStatusColor(status);

  return (
    <div className={scaleIn({ index, className: "transaction-card"})}>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-medium">{amount} ETH</span>
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${networkColorClass}`}>
            {networkType}
          </span>
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
            {contractType}
          </span>
        </div>
        <span className="text-sm text-wallet-muted">To: {formatAddress(receiver)}</span>
        {gasFee && (
          <span className="text-xs text-wallet-muted">Gas: {gasFee} gwei</span>
        )}
        <span className="text-xs text-wallet-muted mt-1">{formattedDate}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className={`text-sm font-medium ${statusColorClass}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default TransactionCard;
