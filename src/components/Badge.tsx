import React from 'react';
import { GuideCategory, GuideDifficulty } from '../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'amber' | 'crimson' | 'emerald' | 'slate';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'gold', 
  size = 'sm' 
}) => {
  const variantStyles = {
    gold: 'bg-[#1e1a12] text-[#e2cb93] border-[#5e4b28]',
    amber: 'bg-[#21160c] text-[#e9a263] border-[#6b411d]',
    crimson: 'bg-[#240d12] text-[#e57d90] border-[#661b29]',
    emerald: 'bg-[#0f1f16] text-[#7ecba1] border-[#205238]',
    slate: 'bg-[#151a24] text-[#a1a8b8] border-[#293246]',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={`inline-flex items-center font-cinzel font-semibold rounded border tracking-wide ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: GuideCategory; size?: 'sm' | 'md' }> = ({ category, size = 'sm' }) => {
  const getVariant = (): BadgeProps['variant'] => {
    switch (category) {
      case 'Detonado Completo': return 'gold';
      case 'Builds & Equipamentos': return 'amber';
      case 'Chefes & Bosses': return 'crimson';
      case 'Dicas & Truques': return 'emerald';
      case 'Segredos & Conquistas': return 'slate';
      default: return 'slate';
    }
  };

  return <Badge variant={getVariant()} size={size}>{category}</Badge>;
};

export const DifficultyBadge: React.FC<{ difficulty: GuideDifficulty }> = ({ difficulty }) => {
  const styles = {
    'Iniciante': 'text-[#7ecba1] bg-[#0d1c14] border-[#1d4730]',
    'Intermediário': 'text-[#e9a263] bg-[#21160c] border-[#5a3617]',
    'Avançado': 'text-[#e57d90] bg-[#240d12] border-[#5e1927]',
  };

  return (
    <span className={`inline-flex items-center text-[10px] font-cinzel font-bold px-1.5 py-0.5 rounded border ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
};
