import React from 'react';

interface LeaderboardRowProps {
  rank: number;
  name: string;
  subtitle: string;
  value: string;
  icon?: string;
  isCurrentUser?: boolean;
  variant?: 'default' | 'dark';
  className?: string;
}

export function LeaderboardRow({ 
  rank, 
  name, 
  subtitle, 
  value, 
  icon,
  isCurrentUser = false,
  variant = 'default',
  className = '' 
}: LeaderboardRowProps) {
  const isDark = variant === 'dark';
  const isYou = name === 'You';
  const actuallyCurrentUser = isCurrentUser || isYou;

  const getRankBadge = (rank: number) => {
    if (icon) return icon;
    if (rank === 1) return '🏆';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank.toString();
  };

  const getInitials = (name: string) => {
    if (name === 'You') return 'Y';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const bgClass = actuallyCurrentUser 
    ? isDark 
      ? 'bg-[#1a1a1d] border-[#00ff88]' 
      : 'bg-green-50 border-[#2E7D32]'
    : isDark
      ? 'bg-[#111113] border-[#262626] hover:border-[#3a3a3d]'
      : 'bg-gray-50 border-gray-200 hover:border-gray-300';

  const textPrimaryClass = actuallyCurrentUser
    ? isDark ? 'text-[#00ff88]' : 'text-[#2E7D32]'
    : isDark ? 'text-[#f8fafc]' : 'text-gray-900';

  const textSecondaryClass = isDark ? 'text-[#64748b]' : 'text-gray-600';
  const avatarBgClass = isDark ? 'bg-[#262626]' : 'bg-gray-300';
  const avatarTextClass = isDark ? 'text-[#f8fafc]' : 'text-gray-700';

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${bgClass} ${className}`}>
      <div className="flex items-center space-x-4 flex-1">
        {/* Rank */}
        <div className="w-8 h-8 flex items-center justify-center">
          {rank <= 3 || icon ? (
            <span className="text-lg">{getRankBadge(rank)}</span>
          ) : (
            <span className={`text-sm font-semibold ${textSecondaryClass}`}>{rank}</span>
          )}
        </div>

        {/* Avatar */}
        <div className={`w-10 h-10 ${avatarBgClass} rounded-full flex items-center justify-center`}>
          <span className={`text-sm font-semibold ${avatarTextClass}`}>{getInitials(name)}</span>
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className={`font-medium ${textPrimaryClass}`}>
            {name} {isYou && '(You)'}
          </p>
          <p className={`text-sm ${textSecondaryClass}`}>{subtitle}</p>
        </div>
      </div>

      {/* Metric */}
      <div className="text-right">
        <p className={`text-sm font-semibold ${textPrimaryClass}`}>{value}</p>
      </div>
    </div>
  );
}