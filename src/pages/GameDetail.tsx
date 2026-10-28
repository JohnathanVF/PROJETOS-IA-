import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { GuideCard } from '../components/GuideCard';
import { 
  Star, 
  Gamepad2, 
  Monitor, 
  Calendar, 
  Building2, 
  PlusCircle, 
  ArrowLeft, 
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';

export const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getGameById, getGuidesByGameId } = useGameGuide();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const game = getGameById(id || '');
  const gameGuides = game ? getGuidesByGameId(game.id) : [];

  if (!game) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Gamepad2 className="w-16 h-16 text-slate-600 mx-auto" />
        <h1 className="text-3xl font-bold font-gamer text-white">Jogo não encontrado</h1>
        <p className="text-sm text-slate-400">
          O jogo solicitado não foi localizado em nossa biblioteca.
        </p>
        <Link
          to="/games"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-purple"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Catálogo</span>
        </Link>
      </div>
    );
  }

  const filteredGuides = selectedCategory === 'Todas'
    ? gameGuides
    : gameGuides.filter((g) => g.category === selectedCategory);

  const guideCategories = ['Todas', 'Detonado Completo', 'Builds & Equipamentos', 'Chefes & Bosses', 'Dicas & Truques', 'Segredos & Conquistas'];

  return (
    <div className="space-y-12 pb-20">
      {/* Banner Imersivo Superior */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden">
        <img
          src={game.bannerImage}
          alt={game.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/70 to-transparent" />
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-900 border border-slate-700/60 text-xs font-semibold text-slate-300 hover:text-white backdrop-blur-md transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Catálogo</span>
          </Link>
        </div>
      </div>

      {/* Conteúdo Principal do Jogo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-36 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Poster / Capa */}
          <div className="w-48 sm:w-64 flex-shrink-0 mx-auto lg:mx-0 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-glow-purple bg-slate-900 aspect-[3/4]">
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dados do Jogo */}
          <div className="flex-1 space-y-5 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950/80 border border-purple-500/30 text-purple-300"
                >
                  {genre}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-gamer text-white tracking-wide">
              {game.title}
            </h1>

            {/* Metadados: Desenvolvedora, Lançamento, Notas */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>{game.developer}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Lançado em {game.releaseYear}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{game.userRating.toFixed(1)} / 5.0 (Comunidade)</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold">
                <span>Metascore: {game.metacriticScore}</span>
              </div>
            </div>

            {/* Sinopse */}
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {game.description}
            </p>

            {/* Plataformas e CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Monitor className="w-4 h-4 text-cyan-400" />
                <span>Disponível em: <strong className="text-slate-200">{game.platforms.join(' • ')}</strong></span>
              </div>

              <Link
                to={`/create-guide?gameId=${game.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-glow-purple transition-all transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Criar Guia para este Jogo</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Seção de Guias Vinculados ao Jogo */}
        <div className="mt-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Comunidade & Conhecimento</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-gamer text-white">
                Guias e Estratégias ({gameGuides.length})
              </h2>
            </div>

            {/* Filtro de Categoria dos Guias */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filtrar:
              </span>
              {guideCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-glow-purple'
                      : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Guias */}
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-4">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto" />
              <h3 className="text-xl font-bold font-gamer text-white">
                {selectedCategory === 'Todas'
                  ? 'Ainda não há guias cadastrados para este jogo'
                  : `Nenhum guia encontrado na categoria "${selectedCategory}"`}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Seja o pioneiro! Compartilhe o primeiro detonado, dica ou build e ajude a comunidade do GameGuide.
              </p>
              <Link
                to={`/create-guide?gameId=${game.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-purple transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publicar Primeiro Guia</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
