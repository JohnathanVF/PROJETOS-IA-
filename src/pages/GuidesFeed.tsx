import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { GuideCard } from '../components/GuideCard';
import { 
  Search, 
  Scroll, 
  SlidersHorizontal, 
  Feather, 
  Filter, 
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-fantasy-gold text-xs font-bold font-cinzel uppercase tracking-widest">
            <Scroll className="w-3.5 h-3.5 text-fantasy-gold" />
            <span>Grimório Coletivo</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-cinzel text-[#f7eee1]">
            Guias & Estratégias da Comunidade
          </h1>
          <p className="text-xs sm:text-sm text-[#8c8577] font-serif max-w-2xl leading-relaxed">
            Consulte táticas redigidas por veteranos, avalie publicações com estrelas e contribua com seus próprios manuscritos de vitória.
          </p>
        </div>

        <Link
          to="/create-guide"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight font-cinzel font-bold text-xs border border-[#6b5228] shadow-glow-gold transition-all flex-shrink-0"
        >
          <Feather className="w-3.5 h-3.5 text-fantasy-gold" />
          <span>Escrever Guia</span>
        </Link>
      </div>

      {/* Painel de Filtros e Busca */}
      <div className="bg-[#10131b] border border-[#232938] rounded-lg p-4 space-y-4 shadow-steam-card">
        {/* Linha 1 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-fantasy-gold absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por termo, chefe, build ou jogo..."
              className="w-full pl-9 pr-9 py-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs focus:outline-none focus:border-fantasy-gold"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c8577] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="bg-[#0a0d14] border border-[#262e40] text-[#ded8cc] text-xs rounded px-2.5 py-2 focus:outline-none focus:border-fantasy-gold font-cinzel"
            >
              <option value="Todos">Todos os Jogos</option>
              {games.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8c8577]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0a0d14] border border-[#262e40] text-[#ded8cc] text-xs rounded px-2.5 py-2 focus:outline-none focus:border-fantasy-gold font-cinzel"
            >
              <option value="rating">Melhor Avaliados (★)</option>
              <option value="views">Mais Consultados</option>
              <option value="recent">Mais Recentes</option>
            </select>
          </div>
        </div>

        {/* Linha 2: Categorias */}
        <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-[#1e2432]">
          <span className="text-[11px] font-cinzel font-semibold text-[#8c8577] mr-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-fantasy-gold" /> Categoria:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] px-2.5 py-1 rounded font-cinzel transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2b2214] text-fantasy-goldLight border border-[#5f4924] font-bold shadow-sm'
                  : 'bg-[#151922] text-[#8c8577] hover:text-white hover:bg-[#1a202c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Linha 3: Dificuldade */}
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[11px] font-cinzel font-semibold text-[#8c8577] mr-1.5">Dificuldade:</span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`text-[10px] px-2 py-0.5 rounded font-cinzel transition-all ${
                selectedDifficulty === diff
                  ? 'bg-[#21160c] text-[#e9a263] border border-[#6b411d] font-bold'
                  : 'bg-[#131720] text-[#857e70] hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Contador de Resultados */}
      <div className="flex items-center justify-between text-xs text-[#7d786d] px-1 font-cinzel">
        <span>
          Exibindo <strong className="text-fantasy-gold font-mono">{filteredGuides.length}</strong> publicações
        </span>
        {(search || selectedGame !== 'Todos' || selectedCategory !== 'Todas' || selectedDifficulty !== 'Todas') && (
          <button
            onClick={clearFilters}
            className="text-fantasy-gold hover:text-fantasy-goldLight underline font-medium"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Grid de Guias */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="text-center py-14 bg-[#10131b] border border-[#232938] rounded-lg p-6 space-y-3">
          <Scroll className="w-10 h-10 text-[#544d3f] mx-auto" />
          <h3 className="text-lg font-bold font-cinzel text-[#ede4d3]">
            Nenhum manuscrito encontrado
          </h3>
          <p className="text-xs text-[#8c8577] font-serif max-w-sm mx-auto">
            Não encontramos registros para os critérios solicitados.
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
