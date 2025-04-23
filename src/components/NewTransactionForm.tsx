import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import AddressInput from './AddressInput';
import { generateWalletAddress, saveTransaction, calculateGasFee, isValidAddress } from '@/utils/transactionUtils';
import { useToast } from "@/hooks/use-toast";
import { blurIn, fadeIn } from '@/lib/animations';

interface NewTransactionFormProps {
  onTransactionComplete: (transaction: any) => void;
}

const NewTransactionForm: React.FC<NewTransactionFormProps> = ({ onTransactionComplete }) => {
  const [amount, setAmount] = useState('');
  const [network, setNetwork] = useState('Ethereum');
  const [receiver, setReceiver] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contractType, setContractType] = useState('normal');
  const [estimatedGasFee, setEstimatedGasFee] = useState('0');
  const { toast } = useToast();

  const networks = ['Ethereum', 'Bitcoin', 'Polygon', 'Solana'];

  useEffect(() => {
    if (amount) {
      setEstimatedGasFee(calculateGasFee(amount, contractType));
    } else {
      setEstimatedGasFee('0');
    }
  }, [amount, contractType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (receiver && !isValidAddress(receiver)) {
      toast({
        title: "Invalid address",
        description: "The receiver address format is invalid",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const finalReceiver = receiver || generateWalletAddress(network);

    setTimeout(() => {
      const transaction = saveTransaction({
        amount,
        receiver: finalReceiver,
        status: 'completed',
        networkType: network,
        contractType: contractType as 'normal' | 'efficient',
      });

      setAmount('');
      setReceiver('');
      
      toast({
        title: "Transaction successful",
        description: receiver 
          ? `Sent ${amount} to ${finalReceiver.substring(0, 6)}...` 
          : `Sent ${amount} to newly generated address`,
      });
      
      onTransactionComplete(transaction);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className={fadeIn({ index: 0, className: "wallet-card p-6 mb-4" })}>
        <div className="wallet-segmented-control relative">
          <div
            className={`wallet-segmented-option ${contractType === 'normal' ? 'active' : ''}`}
            onClick={() => setContractType('normal')}
          >
            Normal
          </div>
          <div
            className={`wallet-segmented-option relative transition-all duration-200 
              ${contractType === 'efficient' ? 'active ring-2 ring-green-300 ring-offset-2 !border-green-400' : ''}`}
            style={{
              boxShadow: contractType === 'efficient'
                ? '0 0 0 2px #C5F2C7'
                : undefined,
            }}
            onClick={() => setContractType('efficient')}
            onMouseEnter={() => {/* Placeholder for percent comparison effect */}}
            onMouseLeave={() => {/* Placeholder for percent comparison effect */}}
          >
            Efficient
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">New Transaction</h2>
        
        <div className={fadeIn({ index: 0, className: "mb-4" })}>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="wallet-input flex items-center">
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="flex-1 bg-transparent outline-none"
              required
            />
            <span className="text-wallet-muted">ETH</span>
          </div>
        </div>
        
        <AddressInput onAddressChange={setReceiver} />
        
        <div className={fadeIn({ index: 2, className: "mb-4" })}>
          <label htmlFor="network" className="block text-sm font-medium text-gray-700 mb-1">
            Network
          </label>
          <select
            id="network"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="wallet-input w-full"
          >
            {networks.map((net) => (
              <option key={net} value={net}>{net}</option>
            ))}
          </select>
        </div>
        
        <div className={fadeIn({ index: 3, className: "mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100" })}>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Estimated Gas Fee:</span>
            <span className="text-sm font-medium">{estimatedGasFee} gwei</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {contractType === 'efficient' ? 'Lower fees with efficient contract' : 'Standard gas fees'}
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`wallet-button w-full flex items-center justify-center ${
            isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="animate-pulse-subtle">Processing...</span>
          ) : (
            <>
              <span>Send Transaction</span>
              <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default NewTransactionForm;
