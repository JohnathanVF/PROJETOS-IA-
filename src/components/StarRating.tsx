import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number; // 0 to 5
  totalVotes?: number;
  interactive?: boolean;
  userVote?: number;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  totalVotes,
  interactive = false,
  userVote = 0,
  onRate,
  size = 'md',
  showNumber = true,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const labels: Record<number, string> = {
    1: 'Ordinário (1★)',
    2: 'Razoável (2★)',
    3: 'Bom (3★)',
    4: 'Excelente (4★)',
    5: 'Obra-Prima Lendária (5★)',
  };

  const currentDisplay = hoverRating !== null ? hoverRating : (interactive ? userVote || value : value);

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= Math.round(currentDisplay);
            const isHalf = !interactive && star - 0.5 <= value && star > value;

            return (
              <button
                key={star}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && onRate && onRate(star)}
                onMouseEnter={() => interactive && setHoverRating(star)}
                onMouseLeave={() => interactive && setHoverRating(null)}
                className={`transition-all duration-150 ${
                  interactive ? 'cursor-pointer hover:scale-125 p-0.5' : 'cursor-default p-0'
                }`}
                title={interactive ? `Consagrar com ${star} estrela(s)` : undefined}
              >
                <Star
                  className={`${starSizes[size]} ${
                    isFilled
                      ? 'text-fantasy-gold fill-fantasy-gold drop-shadow-[0_0_6px_rgba(197,160,89,0.6)]'
                      : isHalf
                      ? 'text-fantasy-gold fill-fantasy-gold/50'
                      : 'text-[#2b3345] fill-[#141924]'
                  } transition-colors`}
                />
              </button>
            );
          })}
        </div>

        {showNumber && (
          <span className="text-xs font-bold font-mono text-fantasy-goldLight ml-1">
            {value > 0 ? value.toFixed(1) : 'Novo'}
          </span>
        )}

        {totalVotes !== undefined && (
          <span className="text-[11px] text-[#787265]">
            ({totalVotes} {totalVotes === 1 ? 'voto' : 'votos'})
          </span>
        )}
      </div>

      {interactive && (
        <div className="text-[11px] font-medium text-[#8d8677] h-4">
          {hoverRating ? (
            <span className="text-fantasy-gold font-cinzel font-semibold">{labels[hoverRating]}</span>
          ) : userVote > 0 ? (
            <span className="text-emerald-400 font-cinzel">Sua bênção: {userVote} estrela{userVote > 1 ? 's' : ''} ★</span>
          ) : (
            <span className="text-[#696357] italic">Clique para avaliar esta publicação</span>
          )}
        </div>
      )}
    </div>
  );
};
