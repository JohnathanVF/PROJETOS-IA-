import React from 'react';
import { GuideCategory, GuideDifficulty } from '../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'cyan' | 'green' | 'amber' | 'rose' | 'slate';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'purple', 
  size = 'sm' 
}) => {
  const variantStyles = {
    purple: 'bg-purple-950/70 text-purple-300 border-purple-500/30',
    cyan: 'bg-cyan-950/70 text-cyan-300 border-cyan-500/30',
    green: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-950/70 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-950/70 text-rose-300 border-rose-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/50',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full border backdrop-blur-sm ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: GuideCategory; size?: 'sm' | 'md' }> = ({ category, size = 'sm' }) => {
  const getVariant = (): BadgeProps['variant'] => {
    switch (category) {
      case 'Detonado Completo': return 'cyan';
      case 'Builds & Equipamentos': return 'purple';
      case 'Chefes & Bosses': return 'rose';
      case 'Dicas & Truques': return 'green';
      case 'Segredos & Conquistas': return 'amber';
      default: return 'slate';
    }
  };

  return <Badge variant={getVariant()} size={size}>{category}</Badge>;
};

export const DifficultyBadge: React.FC<{ difficulty: GuideDifficulty }> = ({ difficulty }) => {
  const styles = {
    'Iniciante': 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    'Intermediário': 'text-amber-400 bg-amber-950/40 border-amber-500/30',
    'Avançado': 'text-rose-400 bg-rose-950/40 border-rose-500/30',
  };

  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded border ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
};
