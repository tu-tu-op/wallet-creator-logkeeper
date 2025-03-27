
export type Transaction = {
  id: string;
  date: string;
  amount: string;
  receiver: string;
  status: 'completed' | 'pending' | 'failed';
  networkType: string;
  contractType: 'normal' | 'efficient';
  gasFee?: string;
};

export const generateMockTransactions = (): Transaction[] => {
  return [
    {
      id: 'tx-001',
      date: '2023-10-15T14:30:25',
      amount: '0.25',
      receiver: '0xd914...3a91',
      status: 'completed',
      networkType: 'Ethereum',
      contractType: 'normal',
      gasFee: '0.003',
    },
    {
      id: 'tx-002',
      date: '2023-10-12T10:15:40',
      amount: '0.5',
      receiver: '0x71a2...b921',
      status: 'completed',
      networkType: 'Ethereum',
      contractType: 'efficient',
      gasFee: '0.0015',
    },
    {
      id: 'tx-003',
      date: '2023-10-08T16:45:10',
      amount: '0.1',
      receiver: '0xe341...9c23',
      status: 'completed',
      networkType: 'Polygon',
      contractType: 'normal',
      gasFee: '0.002',
    },
  ];
};

export const formatAddress = (address: string): string => {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const generateWalletAddress = (network: string): string => {
  // This is a mock function - in a real app, this would connect to a blockchain API
  const chars = '0123456789abcdef';
  let result = '0x';
  
  // Generate a random 40-character hex string (Ethereum-like address)
  for (let i = 0; i < 40; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

export const isValidAddress = (address: string): boolean => {
  // Mock implementation of the web3.utils.isAddress function
  // In a real app, this would use web3.js
  if (!address) return false;
  
  // Simple validation - check if it starts with 0x and is the right length for an Ethereum address
  return address.startsWith('0x') && address.length === 42 && /^0x[0-9a-fA-F]{40}$/.test(address);
};

export const calculateGasFee = (amount: string, contractType: string): string => {
  // Mock function to calculate gas fee
  const amountNum = parseFloat(amount) || 0;
  const baseGasFee = amountNum * (contractType === 'efficient' ? 0.003 : 0.006);
  return baseGasFee.toFixed(4);
};

export const saveTransaction = (transaction: Omit<Transaction, 'id' | 'date'>): Transaction => {
  // In a real app, this would save to a blockchain or backend
  // For our demo, we'll just create a transaction object with an ID
  const gasFee = calculateGasFee(transaction.amount, transaction.contractType);
  
  const newTransaction: Transaction = {
    ...transaction,
    id: `tx-${Date.now().toString(36)}`,
    date: new Date().toISOString(),
    gasFee,
  };
  
  // In a production app, we'd persist this transaction data
  // Mock the logTransaction function described in the requirements
  console.log(`logTransaction(${newTransaction.receiver}, ${newTransaction.amount}, ${newTransaction.date})`);
  
  return newTransaction;
};

export const getFormattedDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const getNetworkColor = (network: string): string => {
  switch (network.toLowerCase()) {
    case 'ethereum':
      return 'bg-blue-100 text-blue-800';
    case 'bitcoin':
      return 'bg-orange-100 text-orange-800';
    case 'polygon':
      return 'bg-purple-100 text-purple-800';
    case 'solana':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'text-green-600';
    case 'pending':
      return 'text-yellow-600';
    case 'failed':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};
