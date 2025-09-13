import React, { useState, useEffect, useRef } from 'react';
import { Circle } from 'lucide-react';

interface CandlestickData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  title: string;
  timeframe: '24H' | '7D' | '30D';
  onTimeframeChange: (timeframe: '24H' | '7D' | '30D') => void;
  className?: string;
}

export function CandlestickChart({ 
  title, 
  timeframe,
  onTimeframeChange,
  className = '' 
}: CandlestickChartProps) {
  const [candles, setCandles] = useState<CandlestickData[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0.145);
  const [priceChange, setPriceChange] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const timeframes = ['24H', '7D', '30D'] as const;
  const maxCandles = 50;
  const initialCandles = 20;

  // Generate initial historical data
  useEffect(() => {
    const generateInitialCandles = () => {
      const now = Date.now();
      const initialCandlesData: CandlestickData[] = [];
      let lastClose = 0.145; // Starting price
      
      // Generate 20 initial candles representing historical data
      for (let i = initialCandles - 1; i >= 0; i--) {
        const timestamp = now - (i * 2000); // 2 seconds apart
        
        // Generate realistic OHLC data
        const open = lastClose;
        const volatility = 0.005; // 0.5 cent volatility
        const trend = (Math.random() - 0.5) * 0.002; // Slight trend
        
        const high = open + Math.random() * volatility + Math.abs(trend);
        const low = open - Math.random() * volatility - Math.abs(trend);
        const close = low + Math.random() * (high - low);
        
        // Ensure high >= low and proper OHLC relationships
        const sorted = [open, high, low, close].sort((a, b) => a - b);
        const [min, mid1, mid2, max] = sorted;
        
        const candle: CandlestickData = {
          timestamp,
          open,
          high: Math.max(open, high, close),
          low: Math.min(open, low, close),
          close
        };
        
        initialCandlesData.push(candle);
        lastClose = close;
      }
      
      setCandles(initialCandlesData);
      setCurrentPrice(lastClose);
    };

    generateInitialCandles();
  }, []);

  // Real-time candlestick generation
  useEffect(() => {
    if (!isLive || candles.length === 0) return;

    const addNewCandle = () => {
      setCandles(prevCandles => {
        const lastCandle = prevCandles[prevCandles.length - 1];
        const previousClose = lastCandle.close;
        
        // Generate new candle based on previous close
        const open = previousClose;
        const volatility = 0.003; // 0.3 cent volatility for real-time
        const trend = (Math.random() - 0.5) * 0.001; // Small trend
        
        const high = open + Math.random() * volatility + Math.abs(trend);
        const low = open - Math.random() * volatility - Math.abs(trend);
        const close = low + Math.random() * (high - low);
        
        // Ensure proper OHLC relationships
        const newCandle: CandlestickData = {
          timestamp: Date.now(),
          open,
          high: Math.max(open, high, close),
          low: Math.min(open, low, close),
          close
        };
        
        // Keep only the last maxCandles candles
        const updatedCandles = [...prevCandles, newCandle].slice(-maxCandles);
        
        // Update price change calculations
        const newPrice = newCandle.close;
        const oldPrice = prevCandles[prevCandles.length - 1].close;
        const change = newPrice - oldPrice;
        const changePercent = (change / oldPrice) * 100;
        
        setCurrentPrice(newPrice);
        setPriceChange(change);
        setPriceChangePercent(changePercent);
        
        return updatedCandles;
      });
    };

    // Add new candle every 2 seconds
    intervalRef.current = setInterval(addNewCandle, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLive, candles.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Calculate chart dimensions and scaling
  const chartWidth = 800;
  const chartHeight = 300;
  const padding = 60;
  const innerWidth = chartWidth - (padding * 2);
  const innerHeight = chartHeight - (padding * 2);

  const getMinMaxPrice = () => {
    if (candles.length === 0) return { min: 0.14, max: 0.16 };
    const allPrices = candles.flatMap(c => [c.high, c.low]);
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const range = max - min;
    const padding = range * 0.05; // 5% padding
    return { min: min - padding, max: max + padding };
  };

  const { min: minPrice, max: maxPrice } = getMinMaxPrice();

  const scaleX = (index: number) => {
    if (candles.length === 0) return padding;
    return padding + (index / (candles.length - 1)) * innerWidth;
  };

  const scaleY = (price: number) => {
    const priceRange = maxPrice - minPrice;
    if (priceRange === 0) return padding + innerHeight / 2;
    return padding + innerHeight - ((price - minPrice) / priceRange) * innerHeight;
  };

  // Generate grid lines
  const generateGridLines = () => {
    const lines = [];
    
    // Horizontal grid lines (price levels)
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (maxPrice - minPrice) * (i / 5);
      const y = scaleY(price);
      lines.push(
        <line
          key={`h-${i}`}
          x1={padding}
          y1={y}
          x2={padding + innerWidth}
          y2={y}
          stroke="rgba(100, 116, 139, 0.2)"
          strokeWidth="1"
        />
      );
    }
    
    // Vertical grid lines (time)
    for (let i = 0; i <= 4; i++) {
      const x = padding + (innerWidth * i) / 4;
      lines.push(
        <line
          key={`v-${i}`}
          x1={x}
          y1={padding}
          x2={x}
          y2={padding + innerHeight}
          stroke="rgba(100, 116, 139, 0.2)"
          strokeWidth="1"
        />
      );
    }
    
    return lines;
  };

  // Render individual candlestick
  const renderCandlestick = (candle: CandlestickData, index: number) => {
    const x = scaleX(index);
    const candleWidth = Math.max(2, innerWidth / candles.length * 0.6);
    const halfWidth = candleWidth / 2;
    
    const isGreen = candle.close > candle.open;
    const color = isGreen ? '#00FF88' : '#FF4C4C';
    
    const openY = scaleY(candle.open);
    const closeY = scaleY(candle.close);
    const highY = scaleY(candle.high);
    const lowY = scaleY(candle.low);
    
    // Wick (high-low line)
    const wick = (
      <line
        x1={x}
        y1={highY}
        x2={x}
        y2={lowY}
        stroke={color}
        strokeWidth="1"
      />
    );
    
    // Candle body
    const bodyHeight = Math.abs(closeY - openY);
    const bodyY = Math.min(openY, closeY);
    const body = (
      <rect
        x={x - halfWidth}
        y={bodyY}
        width={candleWidth}
        height={Math.max(1, bodyHeight)}
        fill={isGreen ? color : 'transparent'}
        stroke={color}
        strokeWidth="1"
      />
    );
    
    return (
      <g key={index}>
        {wick}
        {body}
      </g>
    );
  };

  const isPositive = priceChange >= 0;
  const changeText = isPositive ? `+$${priceChange.toFixed(3)}` : `-$${Math.abs(priceChange).toFixed(3)}`;
  const changePercentText = isPositive ? `+${priceChangePercent.toFixed(2)}%` : `${priceChangePercent.toFixed(2)}%`;

  return (
    <div className={`bg-[#111113] border border-[#262626] rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-[#f8fafc]">{title}</h3>
          <div className={`flex items-center space-x-1 text-sm ${isLive ? 'text-[#00ff88]' : 'text-[#64748b]'}`}>
            <Circle className={`w-2 h-2 ${isLive ? 'fill-current animate-pulse' : ''}`} />
            <span>{isLive ? 'LIVE' : 'PAUSED'}</span>
          </div>
        </div>
        
        {/* Timeframe selector */}
        <div className="flex items-center space-x-1 bg-[#1a1a1d] rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                timeframe === tf
                  ? 'bg-[#00ff88] text-[#0a0a0b]'
                  : 'text-[#64748b] hover:text-[#f8fafc]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Current Price Panel */}
      <div className="mb-6 p-4 bg-[#1a1a1d] rounded-lg border border-[#262626]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#64748b] mb-1">Current Price</p>
            <p className="text-2xl font-bold text-[#f8fafc]">${currentPrice.toFixed(3)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#64748b] mb-1">Change</p>
            <div className="flex items-baseline space-x-2">
              <span className={`text-lg font-semibold ${isPositive ? 'text-[#00ff88]' : 'text-[#FF4C4C]'}`}>
                {changeText}
              </span>
              <span className={`text-sm ${isPositive ? 'text-[#00ff88]' : 'text-[#FF4C4C]'}`}>
                ({changePercentText})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 relative">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          {generateGridLines()}
          
          {/* Candlesticks */}
          {candles.map((candle, index) => renderCandlestick(candle, index))}
        </svg>
      </div>

      {/* Price range labels */}
      <div className="flex justify-between text-xs text-[#64748b] mt-2">
        <span>${minPrice.toFixed(3)}</span>
        <span>${maxPrice.toFixed(3)}</span>
      </div>
    </div>
  );
}
