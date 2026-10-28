import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { GuideCard } from '../components/GuideCard';
import { 
  Search, 
  BookOpen, 
  SlidersHorizontal, 
  PlusCircle, 
  Filter, 
  Sparkles,
  X
} from 'lucide-react';

export const GuidesFeed: React.FC = () => {
  const { guides, games } = useGameGuide();
  const [search, setSearch] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Todas');
  const [sortBy, setSortBy] = useState<'rating' | 'views' | 'recent'>('rating');

  const categories = [
    'Todas',
    'Detonado Completo',
    'Builds & Equipamentos',
    'Chefes & Bosses',
    'Dicas & Truques',
    'Segredos & Conquistas',
  ];

  const difficulties = ['Todas', 'Iniciante', 'Intermediário', 'Avançado'];

  const filteredGuides = useMemo(() => {
    return guides
      .filter((guide) => {
        const matchesSearch =
          guide.title.toLowerCase().includes(search.toLowerCase()) ||
          guide.gameTitle.toLowerCase().includes(search.toLowerCase()) ||
          guide.summary.toLowerCase().includes(search.toLowerCase()) ||
          guide.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

        const matchesGame =
          selectedGame === 'Todos' || guide.gameId === selectedGame;

        const matchesCategory =
          selectedCategory === 'Todas' || guide.category === selectedCategory;

        const matchesDifficulty =
          selectedDifficulty === 'Todas' || guide.difficulty === selectedDifficulty;

        return matchesSearch && matchesGame && matchesCategory && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.ratings.average - a.ratings.average || b.ratings.totalVotes - a.ratings.totalVotes;
        }
        if (sortBy === 'views') {
          return b.views - a.views;
        }
        // recent
        return 0;
      });
  }, [guides, search, selectedGame, selectedCategory, selectedDifficulty, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedGame('Todos');
    setSelectedCategory('Todas');
    setSelectedDifficulty('Todas');
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Fórum & Central de Conhecimento</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-gamer text-white">
            Guias da Comunidade
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Consulte estratégias criadas por jogadores experientes, avalie as publicações com estrelas 
            e contribua com seus próprios detonados e truques.
          </p>
        </div>

        <Link
          to="/create-guide"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow-purple transition-all flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publicar Novo Guia</span>
        </Link>
      </div>

      {/* Painel de Filtros e Busca */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5 backdrop-blur-md">
        {/* Linha 1: Input de Busca e Ordenação */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por termo, chefe, build ou jogo..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-purple-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filtro por Jogo */}
          <div className="flex items-center gap-2">
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="bg-slate-950/80 border border-slate-700/80 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500"
            >
              <option value="Todos">Todos os Jogos</option>
              {games.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenação */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950/80 border border-slate-700/80 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-purple-500"
            >
              <option value="rating">Melhor Avaliados (★)</option>
              <option value="views">Mais Visualizados</option>
              <option value="recent">Mais Recentes</option>
            </select>
          </div>
        </div>

        {/* Linha 2: Categorias */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-400" /> Categoria:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-glow-purple'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Linha 3: Dificuldade */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-2">Dificuldade:</span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedDifficulty === diff
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-800/40 text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Contador de Resultados */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Exibindo <strong className="text-purple-400">{filteredGuides.length}</strong> publicações encontradas
        </span>
        {(search || selectedGame !== 'Todos' || selectedCategory !== 'Todas' || selectedDifficulty !== 'Todas') && (
          <button
            onClick={clearFilters}
            className="text-purple-400 hover:text-purple-300 underline font-medium"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Grid de Guias */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-4">
          <Sparkles className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold font-gamer text-white">
            Nenhum guia atende aos critérios
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Não encontramos publicações para os filtros selecionados. Tente ajustar a busca ou publique seu próprio conteúdo.
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500"
          >
            Resetar Busca
          </button>
        </div>
      )}
    </div>
  );
};
