import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { GameCard } from '../components/GameCard';
import { GuideCard } from '../components/GuideCard';
import { 
  Search, 
  Flame, 
  Shield, 
  Scroll, 
  Award, 
  ArrowRight,
  Compass
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

  // Jogos em destaque (formato Steam cápsula)
  const featuredGames = games.slice(0, 6);

  // Guias mais bem avaliados (ordenados por média e votos)
  const topRatedGuides = [...guides]
    .sort((a, b) => b.ratings.average - a.ratings.average || b.ratings.totalVotes - a.ratings.totalVotes)
    .slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section Dark Fantasy Vintage */}
      <section className="relative pt-10 pb-20 overflow-hidden">
        {/* Ambient Ember & Gold Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-fantasy-gold/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[350px] h-[250px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-fantasy-grid opacity-30 pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-7">
          {/* Badge Dark Fantasy */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#18130c] border border-[#594522] text-fantasy-goldLight text-xs font-cinzel font-semibold shadow-glow-gold">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Biblioteca de Jogos & Fórum de Guias da Comunidade</span>
          </div>

          {/* Título Vintage Dark Fantasy */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-cinzel tracking-wide text-[#f7eee1] leading-tight drop-shadow-md">
            Domine os Desafios Mais Difíceis com a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fantasy-goldLight via-fantasy-gold to-amber-500">
              Sabedoria dos Mestres
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#a89f8f] font-serif leading-relaxed italic">
            Descubra jogos aclamados, soluções para chefes temidos, segredos ocultos e 
            estratégias forjadas por outros jogadores com avaliações sinceras por estrelas.
          </p>

          {/* Barra de Busca Vintage com borda em bronze/ouro */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto relative flex items-center shadow-steam-card"
          >
            <div className="absolute left-4 text-[#8a806d]">
              <Search className="w-4 h-4 text-fantasy-gold" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por jogo (ex: Elden Ring, Dark Souls, Baldur's Gate 3)..."
              className="w-full pl-11 pr-28 py-3.5 rounded-lg bg-[#11151e] border border-[#2b3345] hover:border-fantasy-gold/60 text-[#f2ebe0] placeholder-[#736c5f] focus:outline-none focus:border-fantasy-gold text-xs sm:text-sm transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-2 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight border border-[#6b5228] text-xs font-cinzel font-bold transition-all shadow-glow-gold"
            >
              Consultar
            </button>
          </form>

          {/* Sugestões Rápidas Vintage */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-xs text-[#7e786b]">
            <span className="font-cinzel text-[11px] text-[#696357]">Destaques:</span>
            {['Elden Ring', 'Dark Souls III', "Baldur's Gate 3", 'The Witcher 3', 'Hollow Knight'].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/games?search=${encodeURIComponent(tag)}`)}
                className="px-2.5 py-0.5 rounded bg-[#131822] hover:bg-[#1c2230] text-[#a9a191] hover:text-[#f2ebe0] border border-[#262e3f] transition-all text-[11px] font-cinzel"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Destaques de Recursos em Estilo Dark Fantasy */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-left">
            <div className="p-4 rounded-lg bg-[#11151e]/80 border border-[#222938] space-y-1.5 shadow">
              <div className="w-8 h-8 rounded bg-[#1a150e] border border-[#523f21] flex items-center justify-center text-fantasy-gold">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-cinzel text-[#ede4d3]">Catálogo em Cápsulas</h3>
              <p className="text-xs text-[#8c8577] font-serif leading-relaxed">
                Títulos organizados em formato minimalista com especificações e guias dedicados.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#11151e]/80 border border-[#222938] space-y-1.5 shadow">
              <div className="w-8 h-8 rounded bg-[#1a150e] border border-[#523f21] flex items-center justify-center text-fantasy-gold">
                <Scroll className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-cinzel text-[#ede4d3]">Grimórios de Ajuda</h3>
              <p className="text-xs text-[#8c8577] font-serif leading-relaxed">
                Detonados, builds secretas, estratégias para chefes e tutoriais passo a passo.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#11151e]/80 border border-[#222938] space-y-1.5 shadow">
              <div className="w-8 h-8 rounded bg-[#1a150e] border border-[#523f21] flex items-center justify-center text-fantasy-gold">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-cinzel text-[#ede4d3]">Avaliação em Estrelas</h3>
              <p className="text-xs text-[#8c8577] font-serif leading-relaxed">
                Sistema transparente de 1 a 5 estrelas onde a comunidade avalia as melhores soluções.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Jogos em Destaque (Estilo Steam Minimalista) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#232a3a] pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-fantasy-gold text-[11px] font-bold font-cinzel uppercase tracking-widest mb-0.5">
              <Shield className="w-3.5 h-3.5 text-fantasy-gold" />
              <span>Cápsulas da Biblioteca</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-[#f7eee1]">
              Jogos em Destaque
            </h2>
            <p className="text-xs text-[#8a8375] font-serif mt-0.5">
              Cards compactos e minimalistas inspirados no formato de biblioteca Steam.
            </p>
          </div>
          <Link
            to="/games"
            className="inline-flex items-center gap-1 text-xs font-cinzel font-semibold text-fantasy-gold hover:text-fantasy-goldLight transition-colors"
          >
            <span>Ver todo o catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid minimalista estilo Steam: 3 colunas em telas médias/grandes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredGames.map((game) => {
            const count = guides.filter((g) => g.gameId === game.id).length;
            return <GameCard key={game.id} game={game} guidesCount={count} />;
          })}
        </div>
      </section>

      {/* Seção: Grimórios Mais Bem Avaliados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#232a3a] pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-fantasy-gold text-[11px] font-bold font-cinzel uppercase tracking-widest mb-0.5">
              <Award className="w-3.5 h-3.5 text-fantasy-gold" />
              <span>Manuscritos Reconhecidos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-[#f7eee1]">
              Guias Mais Bem Avaliados
            </h2>
            <p className="text-xs text-[#8a8375] font-serif mt-0.5">
              Estratégias reverenciadas com notas máximas conferidas pela irmandade.
            </p>
          </div>
          <Link
            to="/guides"
            className="inline-flex items-center gap-1 text-xs font-cinzel font-semibold text-fantasy-gold hover:text-fantasy-goldLight transition-colors"
          >
            <span>Ver todos os grimórios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topRatedGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      {/* Banner de Chamada para Escrever Guia */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#17130c] via-[#10131b] to-[#17130c] border border-[#4a3a1f] p-6 sm:p-10 shadow-steam-card">
          <div className="absolute top-0 right-0 w-80 h-80 bg-fantasy-gold/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#2b2214] border border-[#5f4924] text-fantasy-goldLight text-[11px] font-cinzel font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Contribua com a Ordem</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#f5ebd7] leading-tight">
              Desvendou um chefe ou forjou uma build imbatível?
            </h3>

            <p className="text-xs sm:text-sm text-[#a39b8b] font-serif leading-relaxed">
              Ilumine a trilha de outros viajantes publicando seu próprio manuscrito. 
              Receba avaliações por estrelas e ganhe renome entre os membros da guilda.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/create-guide"
                className="px-5 py-2.5 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight font-cinzel font-bold text-xs border border-[#6b5228] shadow-glow-gold transition-all"
              >
                Escrever Manuscrito
              </Link>
              <Link
                to="/guides"
                className="px-5 py-2.5 rounded bg-[#131720] hover:bg-[#1a202c] text-[#c2baa8] font-cinzel text-xs border border-[#283142] transition-all"
              >
                Explorar Guias
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
