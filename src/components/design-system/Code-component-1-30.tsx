import React from 'react';
import { Card } from '../ui/card';
import { cn } from '../ui/utils';

interface MetricCardProps {
  title: string;
  value: string;
  sparkline?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, sparkline, className }: MetricCardProps) {
  return (
    <Card className={cn("p-4 shadow-sm border border-gray-200", className)}>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">{title}</p>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-semibold text-gray-900">{value}</span>
          {sparkline && (
            <div className="w-16 h-8">
              {sparkline}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}