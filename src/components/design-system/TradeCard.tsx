import React from 'react';
import { Card } from '../ui/card';
import { StatusPill } from './StatusPill';
import { cn } from '../ui/utils';

interface TradeCardProps {
  seller: string;
  buyer: string;
  kWh: number;
  price: number;
  savings?: number;
  status: 'matched' | 'paused' | 'error' | 'executing';
  onClick?: () => void;
  className?: string;
}

export function TradeCard({ 
  seller, 
  buyer, 
  kWh, 
  price, 
  savings, 
  status, 
  onClick,
  className 
}: TradeCardProps) {
  return (
    <Card 
      className={cn(
        "p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow",
        className
      )}
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">From {seller} to {buyer}</p>
            <p className="text-lg font-semibold">{kWh} kWh @ ${price}/kWh</p>
          </div>
          <StatusPill status={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </StatusPill>
        </div>
        {savings && (
          <p className="text-sm text-green-600 font-medium">
            Saved ${savings.toFixed(2)} vs utility
          </p>
        )}
      </div>
    </Card>
  );
}