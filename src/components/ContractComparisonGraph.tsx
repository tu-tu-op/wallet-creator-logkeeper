
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Transaction } from "@/utils/transactionUtils";
import { BarChart as BarChartIcon } from "lucide-react";

interface ContractComparisonGraphProps {
  transactions: Transaction[];
}

const ContractComparisonGraph: React.FC<ContractComparisonGraphProps> = ({ transactions }) => {
  // Aggregate transaction count and total gas fee by contractType
  const summary = transactions.reduce<{ [type: string]: { count: number, gas: number } }>((acc, tx) => {
    const t = tx.contractType || 'normal';
    acc[t] = acc[t] || { count: 0, gas: 0 };
    acc[t].count += 1;
    acc[t].gas += tx.gasFee ? parseFloat(tx.gasFee) : 0;
    return acc;
  }, {});

  const data = [
    { name: 'Normal', Transactions: summary.normal?.count || 0, Gas: summary.normal?.gas || 0 },
    { name: 'Efficient', Transactions: summary.efficient?.count || 0, Gas: summary.efficient?.gas || 0 },
  ];

  return (
    <div className="wallet-card p-5 mt-6 mb-2">
      <div className="flex items-center mb-2">
        <BarChartIcon className="text-wallet-muted mr-2" size={18} />
        <span className="font-medium">Smart Contract Comparison</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number, name: string) => name === "Gas" ? `${value} gwei` : value} />
          <Legend />
          <Bar dataKey="Gas" fill="#86EFAC" radius={[5, 5, 0, 0]} />
          <Bar dataKey="Transactions" fill="#3B82F6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContractComparisonGraph;
