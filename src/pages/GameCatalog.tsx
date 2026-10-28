import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { GameCard } from '../components/GameCard';
import { Search, Filter, SlidersHorizontal, Gamepad2, X } from 'lucide-react';
import { Platform } from '../types';

export const GameCatalog: React.FC = () => {
  const { games, guides } = useGameGuide();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query or local state
  const queryParam = searchParams.get('search') || '';
  const [search, setSearch] = useState(queryParam);
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('Todas');
  const [sortBy, setSortBy] = useState<'rating' | 'title' | 'year'>('rating');

  // Extrair todos os gêneros únicos
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) => g.genres.forEach((genre) => set.add(genre)));
    return ['Todos', ...Array.from(set)];
  }, [games]);

  const allPlatforms = ['Todas', 'PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'];

  // Sincronizar busca se parâmetro de URL mudar
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

  // Filtragem e ordenação
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabeçalho */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Gamepad2 className="w-4 h-4" />
          <span>Biblioteca de Jogos</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-gamer text-white">
          Catálogo Oficial de Jogos
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Navegue por títulos épicos, encontre guias específicos para o seu jogo favorito 
          e descubra novas aventuras com recomendações da comunidade.
        </p>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5 backdrop-blur-md">
        {/* Linha 1: Input de Busca e Ordenação */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar por título, estúdio ou gênero..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            {search && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950/80 border border-slate-700/80 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500"
            >
              <option value="rating">Melhores Avaliados</option>
              <option value="title">Título (A-Z)</option>
              <option value="year">Lançamento Mais Recente</option>
            </select>
          </div>
        </div>

        {/* Linha 2: Filtro por Plataforma */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Plataforma:
          </span>
          {allPlatforms.map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedPlatform === plat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Linha 3: Filtro por Gênero */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-2">Gênero:</span>
          {allGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                selectedGenre === genre
                  ? 'bg-purple-600 text-white shadow-glow-purple'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Indicador de Resultados */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Mostrando <strong className="text-purple-400 font-semibold">{filteredGames.length}</strong> de {games.length} jogos
        </span>
        {(search || selectedGenre !== 'Todos' || selectedPlatform !== 'Todas') && (
          <button
            onClick={clearFilters}
            className="text-purple-400 hover:text-purple-300 underline font-medium"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>

      {/* Grid de Jogos */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => {
            const count = guides.filter((g) => g.gameId === game.id).length;
            return <GameCard key={game.id} game={game} guidesCount={count} />;
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-4">
          <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold font-gamer text-white">
            Nenhum jogo encontrado
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Não encontramos nenhum jogo correspondente aos filtros atuais. Tente buscar por outros termos ou limpe os filtros.
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 shadow-glow-purple transition-all"
          >
            Resetar Filtros
          </button>
        </div>
      )}
    </div>
  );
};
