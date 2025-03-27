
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
    },
    {
      id: 'tx-002',
      date: '2023-10-12T10:15:40',
      amount: '0.5',
      receiver: '0x71a2...b921',
      status: 'completed',
      networkType: 'Ethereum',
      contractType: 'efficient',
    },
    {
      id: 'tx-003',
      date: '2023-10-08T16:45:10',
      amount: '0.1',
      receiver: '0xe341...9c23',
      status: 'completed',
      networkType: 'Polygon',
      contractType: 'normal',
    },
  ];
};
