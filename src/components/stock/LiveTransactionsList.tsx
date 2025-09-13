import React from 'react';
import { Pause, Filter } from 'lucide-react';

interface Transaction {
  id: string;
  time: string;
  neighbor: string;
  side: 'BUY' | 'SELL';
  quantity: string;
  price: string;
  status: 'EXECUTING' | 'SETTLED' | 'PENDING';
}

interface LiveTransactionsListProps {
  transactions: Transaction[];
  filter: 'ALL' | 'EXECUTING' | 'SETTLED';
  onFilterChange: (filter: 'ALL' | 'EXECUTING' | 'SETTLED') => void;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
  className?: string;
}

export function LiveTransactionsList({ 
  transactions, 
  filter,
  onFilterChange,
  variant = 'v1',
  className = '' 
}: LiveTransactionsListProps) {
  const filters = ['ALL', 'EXECUTING', 'SETTLED'] as const;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EXECUTING': return 'bg-[#fbbf24] text-[#0a0a0b]';
      case 'SETTLED': return 'bg-[#00ff88] text-[#0a0a0b]';
      case 'PENDING': return 'bg-[#64748b] text-[#f8fafc]';
      default: return 'bg-[#64748b] text-[#f8fafc]';
    }
  };

  const getSideColor = (side: string) => {
    return side === 'BUY' ? 'text-[#00ff88]' : 'text-[#ef4444]';
  };

  return (
    <div className={`bg-[#111113] border border-[#262626] rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#f8fafc]">Live Transactions</h3>
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-[#1a1a1d] rounded-lg transition-colors">
            <Pause className="w-4 h-4 text-[#64748b]" />
          </button>
          <Filter className="w-4 h-4 text-[#64748b]" />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-1 mb-4 bg-[#1a1a1d] rounded-lg p-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
              filter === f
                ? 'bg-[#262626] text-[#f8fafc]'
                : 'text-[#64748b] hover:text-[#f8fafc]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transactions list */}
      <div className="space-y-2">
        {transactions.map((transaction, index) => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-[#1a1a1d] rounded-lg border border-[#262626] hover:border-[#3a3a3d] transition-colors"
          >
            <div className="flex items-center space-x-4 flex-1">
              <span className="text-xs text-[#64748b] w-12">{transaction.time}</span>
              <span className="text-sm text-[#f8fafc] w-24 truncate">{transaction.neighbor}</span>
              <span className={`text-sm font-semibold w-12 ${getSideColor(transaction.side)}`}>
                {transaction.side}
              </span>
              <span className="text-sm text-[#f8fafc] w-16">{transaction.quantity}</span>
              <span className="text-sm text-[#f8fafc] w-20">{transaction.price}</span>
            </div>
            <div className="flex-shrink-0">
              <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}