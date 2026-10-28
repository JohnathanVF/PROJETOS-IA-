import React from 'react';
import { Link } from 'react-router-dom';
import { Guide } from '../types';
import { CategoryBadge, DifficultyBadge } from './Badge';
import { StarRating } from './StarRating';
import { Eye, Clock, MessageSquare, Gamepad2 } from 'lucide-react';

interface GuideCardProps {
  guide: Guide;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <article className="group relative flex flex-col bg-slate-900/90 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-glow-purple transition-all duration-300 p-5">
      {/* Cabeçalho do Card: Jogo vinculado & badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <Link
          to={`/games/${guide.gameId}`}
          className="flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span className="truncate max-w-[160px]">{guide.gameTitle}</span>
        </Link>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <DifficultyBadge difficulty={guide.difficulty} />
        </div>
      </div>

      <div className="mb-2">
        <CategoryBadge category={guide.category} />
      </div>

      {/* Título do Guia */}
      <h3 className="text-lg font-bold font-gamer text-white group-hover:text-purple-300 transition-colors line-clamp-2 mt-1">
        <Link to={`/guides/${guide.id}`}>
          {guide.title}
        </Link>
      </h3>

      {/* Resumo */}
      <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed flex-1">
        {guide.summary}
      </p>

      {/* Avaliação em Estrelas */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <StarRating
          value={guide.ratings.average}
          totalVotes={guide.ratings.totalVotes}
          size="sm"
        />
      </div>

      {/* Rodapé: Autor e Estatísticas */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/50 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <img
            src={guide.author.avatar}
            alt={guide.author.name}
            className="w-6 h-6 rounded-full border border-purple-500/40 object-cover"
          />
          <span className="font-medium text-slate-300 truncate max-w-[100px]">
            {guide.author.name}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
          <span className="flex items-center gap-1" title="Tempo estimado">
            <Clock className="w-3.5 h-3.5" />
            <span>{guide.estimatedReadTime.split(' ')[0]}m</span>
          </span>
          <span className="flex items-center gap-1" title="Comentários">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{guide.comments.length}</span>
          </span>
          <span className="flex items-center gap-1" title="Visualizações">
            <Eye className="w-3.5 h-3.5" />
            <span>{guide.views}</span>
          </span>
        </div>
      </div>
    </article>
  );
};
