import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { Star, BookOpen, Monitor } from 'lucide-react';

interface GameCardProps {
  game: Game;
  guidesCount?: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, guidesCount = 0 }) => {
  return (
    <Link
      to={`/games/${game.id}`}
      className="group relative flex flex-col bg-[#12151d] hover:bg-[#181d28] border border-[#232938] hover:border-fantasy-gold/60 rounded-lg overflow-hidden shadow-steam-card transition-all duration-200 transform hover:-translate-y-1"
    >
      {/* Imagem estilo Cápsula Steam (Steam Capsule 460x215 aspect ratio) */}
      <div className="relative aspect-[21/10] sm:aspect-[16/8] w-full overflow-hidden bg-[#0a0c10]">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 filter brightness-95 group-hover:brightness-105"
          loading="lazy"
        />
        {/* Subtle vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151d] via-[#12151d]/20 to-transparent" />

        {/* Badge de Nota estilo Avaliação Steam */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#0b0e14]/90 backdrop-blur-sm border border-fantasy-gold/40 px-2 py-0.5 rounded text-[11px] font-bold text-fantasy-goldLight shadow">
          <Star className="w-3 h-3 fill-fantasy-gold text-fantasy-gold" />
          <span>{game.userRating.toFixed(1)}</span>
        </div>

        {/* Quantidade de Guias - Estilo Steam pill */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-[#090c12]/90 backdrop-blur-sm border border-[#2e374d] px-2 py-0.5 rounded text-[10px] font-semibold text-slate-300">
          <BookOpen className="w-3 h-3 text-fantasy-gold" />
          <span>{guidesCount} {guidesCount === 1 ? 'guia' : 'guias'}</span>
        </div>
      </div>

      {/* Conteúdo Minimalista Inferior (Steam style) */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#8e887d] mb-0.5">
            <span className="truncate max-w-[150px]">{game.developer}</span>
            <span className="text-[#a39d8f] font-mono text-[10px]">{game.releaseYear}</span>
          </div>

          <h3 className="text-sm sm:text-base font-bold font-cinzel text-[#f0eade] group-hover:text-fantasy-goldLight transition-colors truncate">
            {game.title}
          </h3>
        </div>

        {/* Tags estilo Steam & Plataforma */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1e2330] text-[11px]">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {game.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-[10px] bg-[#1a202c] text-[#a9a293] hover:text-white px-1.5 py-0.5 rounded border border-[#2b3345] truncate"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[#787265] group-hover:text-fantasy-gold flex-shrink-0 transition-colors">
            <Monitor className="w-3 h-3" />
            <span className="text-[10px] font-mono">{game.platforms.length} plat.</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
