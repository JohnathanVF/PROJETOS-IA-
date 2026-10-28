import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { GameCard } from '../components/GameCard';
import { GuideCard } from '../components/GuideCard';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Flame, 
  Gamepad2, 
  Award, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const Home: React.FC = () => {
  const { games, guides } = useGameGuide();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/games?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Jogos em destaque (featured ou top 4)
  const featuredGames = games.slice(0, 4);

  // Guias mais bem avaliados (ordenados por média e número de votos)
  const topRatedGuides = [...guides]
    .sort((a, b) => b.ratings.average - a.ratings.average || b.ratings.totalVotes - a.ratings.totalVotes)
    .slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section Gamer */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Background Gradients & Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md shadow-glow-purple">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Biblioteca Gamer + Fórum Colaborativo de Guias</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-gamer tracking-tight text-white leading-tight">
            Domine Qualquer Jogo com a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(124,58,237,0.35)]">
              Sabedoria da Comunidade
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Descubra os melhores jogos do mercado, encontre soluções para chefes impossíveis, 
            explore builds otimizadas e compartilhe seus próprios detonados com avaliação por estrelas.
          </p>

          {/* Barra de Busca Principal */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto relative flex items-center shadow-2xl"
          >
            <div className="absolute left-4 text-slate-400">
              <Search className="w-5 h-5 text-purple-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busque por um jogo (ex: Elden Ring, Baldur's Gate 3)..."
              className="w-full pl-12 pr-32 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 text-sm backdrop-blur-md transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-glow-purple"
            >
              Pesquisar
            </button>
          </form>

          {/* Quick Badges / Sugestões Rápidas */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Populares agora:</span>
            {['Elden Ring', "Baldur's Gate 3", 'Cyberpunk 2077', 'Hollow Knight'].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/games?search=${encodeURIComponent(tag)}`)}
                className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all text-xs"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Destaques de Recursos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-10 text-left">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-gamer text-white">Catálogo Completo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Títulos detalhados com especificações, plataformas suportadas e páginas exclusivas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-gamer text-white">Guias Especializados</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detonados, builds secretas, estratégias para chefes e tutoriais passo a passo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-gamer text-white">Avaliação 1 a 5 Estrelas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sistema transparente de notas onde a própria comunidade vota e ranqueia as melhores dicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Jogos em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Exploração</span>
            </div>
            <h2 className="text-3xl font-extrabold font-gamer text-white">
              Jogos em Destaque
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Mergulhe nas páginas individuais de cada título e acesse seus guias vinculados.
            </p>
          </div>
          <Link
            to="/games"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span>Ver todo o catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.map((game) => {
            const count = guides.filter((g) => g.gameId === game.id).length;
            return <GameCard key={game.id} game={game} guidesCount={count} />;
          })}
        </div>
      </section>

      {/* Seção: Guias Mais Bem Avaliados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Qualidade Comprovada</span>
            </div>
            <h2 className="text-3xl font-extrabold font-gamer text-white">
              Guias Mais Bem Avaliados
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Estratégias testadas e aprovadas com notas máximas da comunidade.
            </p>
          </div>
          <Link
            to="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Ver todos os guias</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRatedGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      {/* Banner de Chamada para Publicar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/80 border border-purple-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Contribua com a Comunidade</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black font-gamer text-white leading-tight">
              Descobriu um segredo ou venceu um chefe difícil?
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Ajude milhares de jogadores publicando seu próprio detonado, recomendação de build ou macete. 
              Ganhe reconhecimento na comunidade e receba avaliações em estrelas em tempo real.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/create-guide"
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-glow-purple transition-all"
              >
                Escrever um Guia Agora
              </Link>
              <Link
                to="/guides"
                className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
              >
                Explorar Guias Existentes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
