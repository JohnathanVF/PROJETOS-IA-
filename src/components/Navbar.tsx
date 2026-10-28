import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Gamepad2, 
  BookOpen, 
  Compass, 
  PlusCircle, 
  LogOut, 
  Menu, 
  X,
  Sparkles
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
    { label: 'Início', path: '/', icon: Sparkles },
    { label: 'Catálogo de Jogos', path: '/games', icon: Compass },
    { label: 'Guias & Fórum', path: '/guides', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0d14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-glow-purple group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0d121f] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-purple-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black font-gamer tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400">
                GAMEGUIDE
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase -mt-1 font-semibold">
                Biblioteca & Fórum
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-purple-600 text-white shadow-glow-purple'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User actions / CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/create-guide"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-glow-purple transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Guia</span>
            </Link>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 group hover:opacity-90"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full border-2 border-purple-500/60 object-cover"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-purple-400 font-medium">
                      {user.role}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={logout}
                  title="Sair"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-bold bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/40 px-4 py-2 rounded-xl transition-all"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0d121f]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                    active ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <Link
              to="/create-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-2.5 rounded-xl shadow-glow-purple"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Guia</span>
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
                    className="w-8 h-8 rounded-full border border-purple-500"
                  />
                  <span className="text-sm font-bold text-slate-200">{user.name}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs text-rose-400 px-3 py-1.5 rounded-lg bg-rose-950/40"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold rounded-lg bg-slate-800 text-white"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-bold rounded-lg bg-purple-600 text-white"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
