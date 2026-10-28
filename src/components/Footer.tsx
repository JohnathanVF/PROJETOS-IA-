import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, Scroll, Heart, Flame } from 'lucide-react';
import { useGameGuide } from '../context/GameGuideContext';

export const Footer: React.FC = () => {
  const { games, guides } = useGameGuide();

  const totalVotes = guides.reduce((acc, g) => acc + g.ratings.totalVotes, 0);

  return (
    <footer className="bg-[#07080c] border-t border-[#261f14] pt-14 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Coluna 1: Sobre */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#16120b] border border-[#5a4625] flex items-center justify-center shadow-glow-gold">
                <Shield className="w-4 h-4 text-fantasy-gold" />
              </div>
              <span className="text-lg font-black font-cinzel tracking-widest text-[#f5ebd7]">
                GAMEGUIDE
              </span>
            </Link>
            <p className="text-xs text-[#8c8577] font-serif leading-relaxed">
              O repositório ancestral de estratégias e sabedoria gamer. Desvende chefes lendários, desmistifique builds complexas e compartilhe seus manuscritos com a irmandade.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-fantasy-gold font-cinzel">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Forjado para bravos exploradores</span>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-fantasy-goldLight mb-3 font-cinzel">
              Navegação
            </h4>
            <ul className="space-y-1.5 text-xs text-[#8c8577]">
              <li>
                <Link to="/games" className="hover:text-fantasy-gold transition-colors">
                  Catálogo de Jogos
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-fantasy-gold transition-colors">
                  Grimórios da Comunidade
                </Link>
              </li>
              <li>
                <Link to="/create-guide" className="hover:text-fantasy-gold transition-colors">
                  Escrever Novo Tomo
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-fantasy-gold transition-colors">
                  Portal dos Membros
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Categorias */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-fantasy-goldLight mb-3 font-cinzel">
              Categorias
            </h4>
            <ul className="space-y-1.5 text-xs text-[#8c8577]">
              <li>
                <span className="hover:text-fantasy-gold cursor-pointer">
                  Detonados Completos
                </span>
              </li>
              <li>
                <span className="hover:text-fantasy-gold cursor-pointer">
                  Builds & Encantamentos
                </span>
              </li>
              <li>
                <span className="hover:text-fantasy-gold cursor-pointer">
                  Estratégias de Chefes
                </span>
              </li>
              <li>
                <span className="hover:text-fantasy-gold cursor-pointer">
                  Segredos Arcanos
                </span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Estatísticas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-fantasy-goldLight mb-3 font-cinzel">
              Registros da Ordem
            </h4>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-[#0f121a] p-2.5 rounded border border-[#212838]">
                <span className="text-lg font-bold font-cinzel text-fantasy-gold">{games.length}</span>
                <p className="text-[10px] text-[#7d786d]">Jogos Registrados</p>
              </div>
              <div className="bg-[#0f121a] p-2.5 rounded border border-[#212838]">
                <span className="text-lg font-bold font-cinzel text-fantasy-gold">{guides.length}</span>
                <p className="text-[10px] text-[#7d786d]">Tomos Escritos</p>
              </div>
              <div className="bg-[#0f121a] p-2 rounded border border-[#212838] col-span-2">
                <span className="text-base font-bold font-cinzel text-amber-400">{totalVotes}</span>
                <p className="text-[10px] text-[#7d786d]">Bênçãos & Votos Conferidos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nota arquitetural */}
        <div className="p-3.5 rounded bg-[#0d1017] border border-[#232938] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#7d786d] mb-6">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-fantasy-gold flex-shrink-0" />
            <span>
              <strong className="text-[#c2baa8] font-cinzel">Armazenamento: </strong>
              Persistência instantânea local via <code>LocalStorage</code>. Pronto para transição a bancos relacionais (PostgreSQL / Supabase / Firebase).
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#696356] flex-shrink-0">
            <Scroll className="w-3.5 h-3.5 text-fantasy-gold" />
            <span>Manuscritos salvos no navegador</span>
          </div>
        </div>

        {/* Linha final */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#615c52] pt-4 border-t border-[#1a1711]">
          <p>© {new Date().getFullYear()} GameGuide. Dedicado a mestres, aventureiros e estrategistas.</p>
          <div className="flex items-center gap-1">
            <span>Desenvolvido sob a luz do fogo com</span>
            <Heart className="w-3 h-3 text-amber-600 fill-amber-600 inline" />
            <span>para a comunidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
