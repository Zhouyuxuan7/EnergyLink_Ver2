import React, { useState } from 'react';
import { Plus, Minus, Settings } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TradePanelProps {
  role: 'seller' | 'buyer';
  className?: string;
}

export function TradePanel({ role, className = '' }: TradePanelProps) {
  const [activeTab, setActiveTab] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState(10);
  const [limitPrice, setLimitPrice] = useState(0.15);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handlePriceChange = (delta: number) => {
    setLimitPrice(Math.max(0.01, limitPrice + delta));
  };

  const calculateEstimate = () => {
    const total = quantity * limitPrice;
    const retailPrice = 0.20; // Mock retail price
    const exportPrice = 0.08; // Mock export price
    
    if (activeTab === 'BUY') {
      const savings = quantity * (retailPrice - limitPrice);
      return { label: 'Expected Savings', value: `$${savings.toFixed(2)}`, helper: 'vs retail rate' };
    } else {
      const uplift = quantity * (limitPrice - exportPrice);
      return { label: 'Expected Uplift', value: `$${uplift.toFixed(2)}`, helper: 'vs export rate' };
    }
  };

  const handlePlaceOrder = () => {
    toast.success(`${activeTab} order placed successfully!`, {
      description: `${quantity} kWh at $${limitPrice.toFixed(3)}/kWh`
    });
  };

  const estimate = calculateEstimate();
  const isValid = quantity > 0 && limitPrice > 0;

  return (
    <div className={`bg-[#111113] border border-[#262626] rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#f8fafc]">Trade Panel</h3>
        <button className="p-2 hover:bg-[#1a1a1d] rounded-lg transition-colors">
          <Settings className="w-4 h-4 text-[#64748b]" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-[#1a1a1d] rounded-lg p-1">
        {(['BUY', 'SELL'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-semibold rounded transition-colors ${
              activeTab === tab
                ? tab === 'BUY' 
                  ? 'bg-[#00ff88] text-[#0a0a0b]'
                  : 'bg-[#ef4444] text-[#f8fafc]'
                : 'text-[#64748b] hover:text-[#f8fafc]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-[#64748b] mb-2">
            Quantity (kWh)
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2 bg-[#1a1a1d] border border-[#262626] rounded-lg hover:border-[#3a3a3d] transition-colors"
            >
              <Minus className="w-4 h-4 text-[#64748b]" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 bg-[#1a1a1d] border border-[#262626] rounded-lg px-3 py-2 text-[#f8fafc] text-center focus:border-[#00ff88] focus:outline-none"
            />
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 bg-[#1a1a1d] border border-[#262626] rounded-lg hover:border-[#3a3a3d] transition-colors"
            >
              <Plus className="w-4 h-4 text-[#64748b]" />
            </button>
          </div>
        </div>

        {/* Limit Price */}
        <div>
          <label className="block text-sm font-medium text-[#64748b] mb-2">
            Limit Price ($/kWh)
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handlePriceChange(-0.01)}
              className="p-2 bg-[#1a1a1d] border border-[#262626] rounded-lg hover:border-[#3a3a3d] transition-colors"
            >
              <Minus className="w-4 h-4 text-[#64748b]" />
            </button>
            <input
              type="number"
              step="0.001"
              value={limitPrice.toFixed(3)}
              onChange={(e) => setLimitPrice(Math.max(0.001, parseFloat(e.target.value) || 0.001))}
              className="flex-1 bg-[#1a1a1d] border border-[#262626] rounded-lg px-3 py-2 text-[#f8fafc] text-center focus:border-[#00ff88] focus:outline-none"
            />
            <button
              onClick={() => handlePriceChange(0.01)}
              className="p-2 bg-[#1a1a1d] border border-[#262626] rounded-lg hover:border-[#3a3a3d] transition-colors"
            >
              <Plus className="w-4 h-4 text-[#64748b]" />
            </button>
          </div>
        </div>
      </div>

      {/* Estimate */}
      <div className="mb-6 p-4 bg-[#1a1a1d] border border-[#262626] rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#64748b]">{estimate.label}</span>
          <span className="text-lg font-semibold text-[#00ff88]">{estimate.value}</span>
        </div>
        <p className="text-xs text-[#64748b] mt-1">{estimate.helper}</p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handlePlaceOrder}
          disabled={!isValid}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isValid
              ? activeTab === 'BUY'
                ? 'bg-[#00ff88] text-[#0a0a0b] hover:bg-[#00e57a]'
                : 'bg-[#ef4444] text-[#f8fafc] hover:bg-[#dc2626]'
              : 'bg-[#262626] text-[#64748b] cursor-not-allowed'
          }`}
        >
          Place {activeTab} Order
        </button>
        
        <button className="w-full py-2 text-sm text-[#64748b] hover:text-[#f8fafc] transition-colors">
          Edit Preferences
        </button>
      </div>
    </div>
  );
}