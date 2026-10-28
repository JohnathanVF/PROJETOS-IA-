import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { GameCatalog } from './pages/GameCatalog';
import { GameDetail } from './pages/GameDetail';
import { GuidesFeed } from './pages/GuidesFeed';
import { GuideDetail } from './pages/GuideDetail';
import { CreateGuide } from './pages/CreateGuide';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Gamepad2, ArrowLeft } from 'lucide-react';

// Scroll to top automatically on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// 404 Gamer Not Found
const NotFound: React.FC = () => (
  <div className="max-w-md mx-auto px-4 py-24 text-center space-y-5">
    <div className="w-16 h-16 rounded-2xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400">
      <Gamepad2 className="w-8 h-8" />
    </div>
    <span className="text-xs font-bold uppercase tracking-widest text-purple-400 font-mono">
      ERRO 404 // GAME OVER
    </span>
    <h1 className="text-3xl font-black font-gamer text-white">
      Fase Não Encontrada
    </h1>
    <p className="text-xs text-slate-400">
      A página ou recurso que você procurava foi movido para outra dimensão ou nunca existiu.
    </p>
    <Link
      to="/"
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-purple transition-all"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Retornar à Base</span>
    </Link>
  </div>
);

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-slate-100 selection:bg-purple-600 selection:text-white">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameCatalog />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/guides" element={<GuidesFeed />} />
          <Route path="/guides/:id" element={<GuideDetail />} />
          <Route path="/create-guide" element={<CreateGuide />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;

