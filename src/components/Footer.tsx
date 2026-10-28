import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Database, ShieldAlert, Heart, Sparkles } from 'lucide-react';
import { useGameGuide } from '../context/GameGuideContext';

export const Footer: React.FC = () => {
  const { games, guides } = useGameGuide();

  const totalVotes = guides.reduce((acc, g) => acc + g.ratings.totalVotes, 0);

  return (
    <footer className="bg-[#07090f] border-t border-slate-800/80 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Coluna 1: Sobre */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-glow-purple">
                <div className="w-full h-full bg-[#0d121f] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <span className="text-xl font-bold font-gamer tracking-wider text-white">
                GAMEGUIDE
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              O ponto de encontro dos gamers para descobrir títulos lendários, dominar mecânicas complexas e compartilhar estratégias comprovadas pela comunidade.
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-400">
              <Sparkles className="w-4 h-4" />
              <span>Construído para a comunidade gamer</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 font-gamer">
              Explorar
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/games" className="hover:text-purple-400 transition-colors">
                  Catálogo de Jogos
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-purple-400 transition-colors">
                  Guias da Comunidade
                </Link>
              </li>
              <li>
                <Link to="/create-guide" className="hover:text-purple-400 transition-colors">
                  Publicar Novo Guia
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-purple-400 transition-colors">
                  Portal do Membro
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Categorias de Guias */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 font-gamer">
              Categorias Populares
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-slate-400 hover:text-cyan-400 cursor-pointer">
                  Detonados & Walkthroughs
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-purple-400 cursor-pointer">
                  Builds & Min-Maxing
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-rose-400 cursor-pointer">
                  Estratégias para Chefes
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-amber-400 cursor-pointer">
                  Segredos & Caça a Troféus
                </span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Estatísticas em Tempo Real */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 font-gamer">
              Estatísticas da Plataforma
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-xl font-bold font-gamer text-cyan-400">{games.length}</span>
                <p className="text-[11px] text-slate-400">Jogos Catalogados</p>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-xl font-bold font-gamer text-purple-400">{guides.length}</span>
                <p className="text-[11px] text-slate-400">Guias Publicados</p>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 col-span-2">
                <span className="text-xl font-bold font-gamer text-amber-400">{totalVotes}</span>
                <p className="text-[11px] text-slate-400">Avaliações por Estrelas Registradas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nota de transparência sobre arquitetura & banco de dados */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400 mb-8">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div>
              <span className="font-semibold text-slate-200">Arquitetura de Dados: </span>
              <span>
                Execução local instantânea com persistência reativa em <code>LocalStorage</code>. Pronto para plugar em Supabase, PostgreSQL ou Firebase Auth.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500 flex-shrink-0">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Nenhum dado é perdido ao recarregar a página</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-6 border-t border-slate-900">
          <p>© {new Date().getFullYear()} GameGuide. Todos os direitos reservados aos respectivos jogos e autores.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>para gamers e estrategistas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
