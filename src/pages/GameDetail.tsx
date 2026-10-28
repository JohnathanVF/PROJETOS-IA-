import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { GuideCard } from '../components/GuideCard';
import { 
  Star, 
  Monitor, 
  Calendar, 
  Building2, 
  Feather, 
  ArrowLeft, 
  Scroll,
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
        <Scroll className="w-14 h-14 text-[#5e5647] mx-auto" />
        <h1 className="text-2xl font-bold font-cinzel text-white">Título não encontrado</h1>
        <p className="text-xs text-[#8c8577] font-serif">
          O registro solicitado não foi localizado em nosso catálogo.
        </p>
        <Link
          to="/games"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#2b2214] border border-[#5f4924] text-fantasy-goldLight text-xs font-cinzel font-bold shadow-glow-gold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
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
    <div className="space-y-10 pb-16">
      {/* Banner Imersivo Superior Dark Fantasy */}
      <div className="relative h-72 sm:h-88 w-full overflow-hidden">
        <img
          src={game.bannerImage}
          alt={game.title}
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e] via-[#080a0e]/75 to-transparent" />
        <div className="absolute top-5 left-4 sm:left-8 z-10">
          <Link
            to="/games"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0b0e14]/90 hover:bg-[#141924] border border-[#2e374d] text-xs font-cinzel text-[#d2cbbe] hover:text-white backdrop-blur-md transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-fantasy-gold" />
            <span>Voltar ao Catálogo</span>
          </Link>
        </div>
      </div>

      {/* Conteúdo Principal do Jogo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Poster / Capa Estilo Steam Capsule */}
          <div className="w-48 sm:w-60 flex-shrink-0 mx-auto lg:mx-0 rounded-lg overflow-hidden border border-fantasy-gold/50 shadow-steam-card bg-[#0e1118] aspect-[16/10]">
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dados do Jogo */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-0.5 rounded text-[11px] font-cinzel font-semibold bg-[#1a150e] border border-[#523f21] text-fantasy-goldLight"
                >
                  {genre}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-cinzel text-[#f7eee1] tracking-wide">
              {game.title}
            </h1>

            {/* Metadados: Desenvolvedora, Lançamento, Notas */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#9c9484] pt-0.5">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-fantasy-gold" />
                <span>{game.developer}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-fantasy-gold" />
                <span>Lançado em {game.releaseYear}</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#1e170c] border border-[#543f1e] text-fantasy-goldLight font-bold font-mono">
                <Star className="w-3.5 h-3.5 fill-fantasy-gold text-fantasy-gold" />
                <span>{game.userRating.toFixed(1)} / 5.0 (Comunidade)</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#0d1c14] border border-[#1f4730] text-[#7ecba1] font-bold font-mono text-[11px]">
                <span>Metascore: {game.metacriticScore}</span>
              </div>
            </div>

            {/* Sinopse */}
            <p className="text-xs sm:text-sm text-[#b8b0a0] font-serif leading-relaxed max-w-3xl italic">
              {game.description}
            </p>

            {/* Plataformas e CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#1f2533]">
              <div className="flex items-center gap-2 text-xs text-[#8c8577]">
                <Monitor className="w-3.5 h-3.5 text-fantasy-gold" />
                <span>Disponível em: <strong className="text-[#ded6c8]">{game.platforms.join(' • ')}</strong></span>
              </div>

              <Link
                to={`/create-guide?gameId=${game.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight border border-[#6b5228] text-xs font-cinzel font-bold shadow-glow-gold transition-all"
              >
                <Feather className="w-3.5 h-3.5 text-fantasy-gold" />
                <span>Escrever Guia para este Jogo</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Seção de Guias Vinculados ao Jogo */}
        <div className="mt-12 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232a3a] pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-fantasy-gold text-[11px] font-bold font-cinzel uppercase tracking-widest mb-0.5">
                <Scroll className="w-3.5 h-3.5 text-fantasy-gold" />
                <span>Manuscritos & Táticas</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-[#f7eee1]">
                Guias e Estratégias ({gameGuides.length})
              </h2>
            </div>

            {/* Filtro de Categoria dos Guias */}
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[11px] text-[#7d786d] mr-1 flex items-center gap-1 font-cinzel">
                <Filter className="w-3 h-3" /> Filtrar:
              </span>
              {guideCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] px-2 py-0.5 rounded font-cinzel transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#2b2214] text-fantasy-goldLight border border-[#5f4924] font-bold shadow-sm'
                      : 'bg-[#121620] text-[#8c8577] hover:text-white hover:bg-[#181d2a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Guias */}
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#10131b] border border-[#232938] rounded-lg p-6 space-y-3">
              <Scroll className="w-10 h-10 text-fantasy-gold mx-auto" />
              <h3 className="text-lg font-bold font-cinzel text-[#ede4d3]">
                {selectedCategory === 'Todas'
                  ? 'Ainda não há guias registrados para este jogo'
                  : `Nenhum guia na categoria "${selectedCategory}"`}
              </h3>
              <p className="text-xs text-[#8c8577] font-serif max-w-sm mx-auto">
                Seja o primeiro a compartilhar um detonado ou dica e ajude os exploradores do GameGuide.
              </p>
              <Link
                to={`/create-guide?gameId=${game.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight text-xs font-cinzel font-bold border border-[#6b5228] shadow-glow-gold"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Publicar Primeiro Guia</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
