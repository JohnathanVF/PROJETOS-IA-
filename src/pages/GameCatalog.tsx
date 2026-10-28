import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { GameCard } from '../components/GameCard';
import { Search, Filter, SlidersHorizontal, Shield, X } from 'lucide-react';
import { Platform } from '../types';

export const GameCatalog: React.FC = () => {
  const { games, guides } = useGameGuide();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('search') || '';
  const [search, setSearch] = useState(queryParam);
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('Todas');
  const [sortBy, setSortBy] = useState<'rating' | 'title' | 'year'>('rating');

  const allGenres = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) => g.genres.forEach((genre) => set.add(genre)));
    return ['Todos', ...Array.from(set)];
  }, [games]);

  const allPlatforms = ['Todas', 'PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedGenre('Todos');
    setSelectedPlatform('Todas');
    setSortBy('rating');
    setSearchParams({});
  };

  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        const matchesSearch =
          game.title.toLowerCase().includes(search.toLowerCase()) ||
          game.developer.toLowerCase().includes(search.toLowerCase()) ||
          game.genres.some((g) => g.toLowerCase().includes(search.toLowerCase()));

        const matchesGenre =
          selectedGenre === 'Todos' || game.genres.includes(selectedGenre);

        const matchesPlatform =
          selectedPlatform === 'Todas' ||
          game.platforms.includes(selectedPlatform as Platform);

        return matchesSearch && matchesGenre && matchesPlatform;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.userRating - a.userRating;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'year') return b.releaseYear - a.releaseYear;
        return 0;
      });
  }, [games, search, selectedGenre, selectedPlatform, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Cabeçalho Vintage */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-fantasy-gold text-xs font-bold font-cinzel uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5 text-fantasy-gold" />
          <span>Biblioteca de Cápsulas</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-cinzel text-[#f7eee1]">
          Catálogo Oficial de Jogos
        </h1>
        <p className="text-xs sm:text-sm text-[#8c8577] font-serif max-w-2xl leading-relaxed">
          Navegue pelas obras consagradas no formato minimalista de biblioteca, acesse guias dedicados ou descubra novos títulos recomendados pela comunidade.
        </p>
      </div>

      {/* Painel de Filtros e Busca */}
      <div className="bg-[#10131b] border border-[#232938] rounded-lg p-4 space-y-4 shadow-steam-card">
        {/* Linha 1: Input de Busca e Ordenação */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-fantasy-gold absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar por título, estúdio ou gênero..."
              className="w-full pl-9 pr-9 py-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs focus:outline-none focus:border-fantasy-gold"
            />
            {search && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c8577] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8c8577]" />
            <span className="text-xs text-[#8c8577] font-cinzel">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0a0d14] border border-[#262e40] text-[#ded8cc] text-xs rounded px-2.5 py-1.5 focus:outline-none focus:border-fantasy-gold font-cinzel"
            >
              <option value="rating">Melhor Avaliados</option>
              <option value="title">Título (A-Z)</option>
              <option value="year">Lançamento Recente</option>
            </select>
          </div>
        </div>

        {/* Linha 2: Filtro por Plataforma */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#1e2432]">
          <span className="text-[11px] font-cinzel font-semibold text-[#8c8577] mr-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-fantasy-gold" /> Plataforma:
          </span>
          {allPlatforms.map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`text-[11px] px-2.5 py-1 rounded font-cinzel transition-all ${
                selectedPlatform === plat
                  ? 'bg-[#2b2214] text-fantasy-goldLight border border-[#5f4924] shadow-sm font-bold'
                  : 'bg-[#151922] text-[#8c8577] hover:text-white hover:bg-[#1a202c] border border-transparent'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Linha 3: Filtro por Gênero */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-cinzel font-semibold text-[#8c8577] mr-1.5">Gênero:</span>
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`text-[10px] px-2 py-0.5 rounded font-cinzel transition-all ${
                selectedGenre === genre
                  ? 'bg-[#2b2214] text-fantasy-goldLight border border-[#5f4924] font-bold shadow-sm'
                  : 'bg-[#131720] text-[#857e70] hover:text-[#f0eade] hover:bg-[#191f2c] border border-[#232b3b]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Indicador de Resultados */}
      <div className="flex items-center justify-between text-xs text-[#7d786d] px-1 font-cinzel">
        <span>
          Exibindo <strong className="text-fantasy-gold font-mono">{filteredGames.length}</strong> de {games.length} títulos
        </span>
        {(search || selectedGenre !== 'Todos' || selectedPlatform !== 'Todas') && (
          <button
            onClick={clearFilters}
            className="text-fantasy-gold hover:text-fantasy-goldLight underline font-medium"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>

      {/* Grid de Cápsulas Steam */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((game) => {
            const count = guides.filter((g) => g.gameId === game.id).length;
            return <GameCard key={game.id} game={game} guidesCount={count} />;
          })}
        </div>
      ) : (
        <div className="text-center py-14 bg-[#10131b] border border-[#232938] rounded-lg p-6 space-y-3">
          <Shield className="w-10 h-10 text-[#544d3f] mx-auto" />
          <h3 className="text-lg font-bold font-cinzel text-[#ede4d3]">
            Nenhum título localizado
          </h3>
          <p className="text-xs text-[#8c8577] font-serif max-w-sm mx-auto">
            Não encontramos nenhum registro para os filtros atuais. Experimente outros termos ou limpe a busca.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-1.5 rounded bg-[#2b2214] border border-[#5f4924] text-fantasy-goldLight text-xs font-cinzel font-bold shadow-glow-gold"
          >
            Resetar Filtros
          </button>
        </div>
      )}
    </div>
  );
};
