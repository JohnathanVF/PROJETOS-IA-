import React from 'react';
import { Link } from 'react-router-dom';
import { Guide } from '../types';
import { CategoryBadge, DifficultyBadge } from './Badge';
import { StarRating } from './StarRating';
import { Eye, Clock, MessageSquare, Scroll } from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <article className="group relative flex flex-col bg-[#12151e] border border-[#232a3a] hover:border-fantasy-gold/50 rounded-lg overflow-hidden shadow-steam-card hover:shadow-glow-gold transition-all duration-200 p-4">
      {/* Cabeçalho do Card: Jogo vinculado & badges */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <Link
          to={`/games/${guide.gameId}`}
          className="flex items-center gap-1.5 text-xs font-semibold text-fantasy-gold hover:text-fantasy-goldLight transition-colors"
        >
          <Scroll className="w-3.5 h-3.5 text-fantasy-gold" />
          <span className="truncate max-w-[150px] font-cinzel">{guide.gameTitle}</span>
        </Link>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <DifficultyBadge difficulty={guide.difficulty} />
        </div>
      </div>

      <div className="mb-2">
        <CategoryBadge category={guide.category} />
      </div>

      {/* Título do Guia estilo Grimório */}
      <h3 className="text-sm sm:text-base font-bold font-cinzel text-[#f0eade] group-hover:text-fantasy-goldLight transition-colors line-clamp-2 mt-1">
        <Link to={`/guides/${guide.id}`}>
          {guide.title}
        </Link>
      </h3>

      {/* Resumo */}
      <p className="text-xs text-[#9a9385] font-serif line-clamp-2 mt-2 leading-relaxed flex-1">
        {guide.summary}
      </p>

      {/* Avaliação em Estrelas Vintage */}
      <div className="mt-3 pt-2.5 border-t border-[#1e2535]">
        <StarRating
          value={guide.ratings.average}
          totalVotes={guide.ratings.totalVotes}
          size="sm"
        />
      </div>

      {/* Rodapé: Autor e Estatísticas */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#1a202d] text-xs text-[#7e786b]">
        <div className="flex items-center gap-2">
          <img
            src={guide.author.avatar}
            alt={guide.author.name}
            className="w-5 h-5 rounded-full border border-fantasy-gold/40 object-cover"
          />
          <span className="font-medium text-[#c8c1b2] truncate max-w-[100px] text-[11px]">
            {guide.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2.5 text-[11px] text-[#716b5f]">
          <span className="flex items-center gap-1" title="Tempo estimado">
            <Clock className="w-3 h-3" />
            <span>{guide.estimatedReadTime.split(' ')[0]}m</span>
          </span>
          <span className="flex items-center gap-1" title="Comentários">
            <MessageSquare className="w-3 h-3" />
            <span>{guide.comments.length}</span>
          </span>
          <span className="flex items-center gap-1" title="Visualizações">
            <Eye className="w-3 h-3" />
            <span>{guide.views}</span>
          </span>
        </div>
      </div>
    </article>
  );
};
