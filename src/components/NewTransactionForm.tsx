
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

  // Update gas fee estimate when amount or contract type changes
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
    
    // Validate input
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // If receiver is provided but invalid, show error
    if (receiver && !isValidAddress(receiver)) {
      toast({
        title: "Invalid address",
        description: "The receiver address format is invalid",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // If receiver is empty, generate a new address
    const finalReceiver = receiver || generateWalletAddress(network);

    // Create transaction object
    setTimeout(() => {
      const transaction = saveTransaction({
        amount,
        receiver: finalReceiver,
        status: 'completed',
        networkType: network,
        contractType: contractType as 'normal' | 'efficient',
      });

      // Reset form
      setAmount('');
      setReceiver('');
      
      // Show success toast
      toast({
        title: "Transaction successful",
        description: receiver 
          ? `Sent ${amount} to ${finalReceiver.substring(0, 6)}...` 
          : `Sent ${amount} to newly generated address`,
      });
      
      // Call the callback with the new transaction
      onTransactionComplete(transaction);
      setIsSubmitting(false);
    }, 1500); // Simulate network delay
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className={fadeIn({ index: 0, className: "wallet-card p-6 mb-4" })}>
        <div className="wallet-segmented-control">
          <div 
            className={`wallet-segmented-option ${contractType === 'normal' ? 'active' : ''}`}
            onClick={() => setContractType('normal')}
          >
            Normal
          </div>
          <div 
            className={`wallet-segmented-option ${contractType === 'efficient' ? 'active' : ''}`}
            onClick={() => setContractType('efficient')}
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
