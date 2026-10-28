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
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const labels: Record<number, string> = {
    1: 'Muito Fraco (1★)',
    2: 'Razoável (2★)',
    3: 'Bom (3★)',
    4: 'Muito Bom (4★)',
    5: 'Excelente / Obra-prima (5★)',
  };

  const currentDisplay = hoverRating !== null ? hoverRating : (interactive ? userVote || value : value);

  return (
    <div className="flex flex-col gap-1">
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
                title={interactive ? `Avaliar com ${star} estrela(s)` : undefined}
              >
                <Star
                  className={`${starSizes[size]} ${
                    isFilled
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                      : isHalf
                      ? 'text-amber-400 fill-amber-400/50'
                      : 'text-slate-600 fill-slate-800/40'
                  } transition-colors`}
                />
              </button>
            );
          })}
        </div>

        {showNumber && (
          <span className="text-sm font-bold text-amber-400 ml-1">
            {value > 0 ? value.toFixed(1) : 'Novo'}
          </span>
        )}

        {totalVotes !== undefined && (
          <span className="text-xs text-slate-400">
            ({totalVotes} {totalVotes === 1 ? 'voto' : 'votos'})
          </span>
        )}
      </div>

      {interactive && (
        <div className="text-xs font-medium text-slate-400 h-4">
          {hoverRating ? (
            <span className="text-purple-400 font-semibold">{labels[hoverRating]}</span>
          ) : userVote > 0 ? (
            <span className="text-emerald-400">Sua avaliação: {userVote} estrela{userVote > 1 ? 's' : ''} ★</span>
          ) : (
            <span className="text-slate-500">Clique para avaliar esta publicação</span>
          )}
        </div>
      )}
    </div>
  );
};
