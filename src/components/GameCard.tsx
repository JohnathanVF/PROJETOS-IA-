import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../types';
import { Star, FileText, Monitor, Gamepad2 } from 'lucide-react';

interface GameCardProps {
  game: Game;
  guidesCount?: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, guidesCount = 0 }) => {
  return (
    <Link
      to={`/games/${game.id}`}
      className="group relative flex flex-col bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-glow-purple transition-all duration-300 transform hover:-translate-y-1.5"
    >
      {/* Imagem de Capa com Efeito Zoom */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

        {/* Badge de Nota */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{game.userRating.toFixed(1)}</span>
        </div>

        {/* Quantidade de Guias */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-purple-950/80 backdrop-blur-md border border-purple-500/40 px-2.5 py-1 rounded-full text-xs font-semibold text-purple-300">
          <FileText className="w-3.5 h-3.5" />
          <span>{guidesCount} {guidesCount === 1 ? 'guia' : 'guias'}</span>
        </div>
      </div>

      {/* Detalhes do Jogo */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span>{game.developer}</span>
          <span className="text-purple-400 font-medium">{game.releaseYear}</span>
        </div>

        <h3 className="text-xl font-bold font-gamer text-white group-hover:text-purple-300 transition-colors line-clamp-1">
          {game.title}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-2 mt-2 flex-1 leading-relaxed">
          {game.description}
        </p>

        {/* Gêneros */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {game.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="text-[11px] font-medium bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
            >
              {genre}
            </span>
          ))}
          {game.genres.length > 2 && (
            <span className="text-[11px] text-slate-500 py-0.5">
              +{game.genres.length - 2}
            </span>
          )}
        </div>

        {/* Plataformas */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
          </span>
          <span className="truncate">
            {game.platforms.join(', ')}
          </span>
        </div>
      </div>
    </Link>
  );
};
