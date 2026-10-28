import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  Scroll, 
  Compass, 
  Feather, 
  LogOut, 
  Menu, 
  X,
  Flame
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Início', path: '/', icon: Flame },
    { label: 'Catálogo de Jogos', path: '/games', icon: Compass },
    { label: 'Grimórios & Guias', path: '/guides', icon: Scroll },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090b0f]/95 backdrop-blur-md border-b border-[#2b2416]/80 shadow-vintage-inset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo Dark Fantasy */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-[#16120b] border border-[#5a4625] flex items-center justify-center shadow-glow-gold group-hover:border-fantasy-gold transition-colors">
              <Shield className="w-5 h-5 text-fantasy-gold group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black font-cinzel tracking-widest text-[#f5ebd7] group-hover:text-fantasy-goldLight transition-colors">
                GAMEGUIDE
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#8c826e] uppercase -mt-1 font-semibold">
                Biblioteca & Grimório
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121620]/90 px-3 py-1.5 rounded border border-[#232a3a]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-cinzel font-semibold tracking-wider transition-all duration-200 ${
                    active
                      ? 'bg-[#2b2214] text-fantasy-goldLight border border-[#5f4924] shadow-sm'
                      : 'text-[#9c9586] hover:text-[#f3ede1] hover:bg-[#1a202e]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User actions / CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/create-guide"
              className="flex items-center gap-2 bg-[#1f1910] hover:bg-[#2b2214] text-fantasy-goldLight border border-[#6b5228] text-xs font-cinzel font-bold px-3.5 py-2 rounded shadow-glow-gold hover:border-fantasy-gold transition-all duration-200"
            >
              <Feather className="w-3.5 h-3.5 text-fantasy-gold" />
              <span>Escrever Guia</span>
            </Link>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-[#242b3b]">
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 group hover:opacity-90"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-fantasy-gold/50 object-cover"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-[#e8dfcf] group-hover:text-fantasy-goldLight font-cinzel">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-fantasy-gold font-mono">
                      {user.role}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={logout}
                  title="Abandonar sessão"
                  className="p-1.5 text-[#736c5f] hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2">
                <Link
                  to="/login"
                  className="text-xs font-cinzel font-semibold text-[#a69e8f] hover:text-white px-3 py-1.5 rounded hover:bg-[#151a24] transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-cinzel font-bold bg-[#1e2535] hover:bg-[#263045] text-fantasy-goldLight border border-[#374461] px-3 py-1.5 rounded transition-all"
                >
                  Inscrever-se
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#a69e8f] hover:text-white rounded bg-[#131720] border border-[#232a3a]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#2b2416] bg-[#0c0f16]/98 px-4 pt-3 pb-6 space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs font-cinzel font-semibold ${
                    active ? 'bg-[#2b2214] text-fantasy-goldLight border border-[#5f4924]' : 'text-[#a69e8f] hover:bg-[#151a24]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#1e2535] space-y-2">
            <Link
              to="/create-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#2b2214] text-fantasy-goldLight border border-[#5f4924] font-cinzel font-bold py-2 rounded text-xs"
            >
              <Feather className="w-3.5 h-3.5 text-fantasy-gold" />
              <span>Escrever Guia</span>
            </Link>

            {isAuthenticated && user ? (
              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full border border-fantasy-gold"
                  />
                  <span className="text-xs font-cinzel font-bold text-[#e8dfcf]">{user.name}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs text-rose-400 px-2 py-1 rounded bg-rose-950/40"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-cinzel font-semibold rounded bg-[#151a24] text-white"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-cinzel font-bold rounded bg-[#2b2214] border border-[#5f4924] text-fantasy-goldLight"
                >
                  Inscrever-se
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
