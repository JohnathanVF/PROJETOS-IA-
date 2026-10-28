import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Gamepad2, Mail, Lock, LogIn, Sparkles, ShieldCheck } from 'lucide-react';
import { INITIAL_USERS } from '../data/mockData';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('player@gameguide.io');
  const [password, setPassword] = useState('******');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError('Informe um e-mail válido.');
      return;
    }

    const success = await login(email.trim(), password);
    if (success) {
      navigate('/profile');
    } else {
      setError('Falha ao autenticar. Verifique suas credenciais.');
    }
  };

  const handleQuickLogin = (testEmail: string) => {
    setEmail(testEmail);
    login(testEmail).then(() => navigate('/profile'));
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      {/* Cabeçalho */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-glow-purple">
          <div className="w-full h-full bg-[#0d121f] rounded-[14px] flex items-center justify-center">
            <Gamepad2 className="w-7 h-7 text-purple-400" />
          </div>
        </div>
        <h1 className="text-3xl font-black font-gamer text-white tracking-wide">
          Acesse sua Conta
        </h1>
        <p className="text-xs text-slate-400">
          Entre para publicar guias, avaliar publicações e salvar suas estratégias favoritas.
        </p>
      </div>

      {/* Formulário */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              E-mail Gamer
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Senha de Acesso
              </label>
              <span className="text-[11px] text-purple-400 hover:text-purple-300 cursor-pointer">
                Esqueceu a senha?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow-purple transition-all transform hover:-translate-y-0.5"
          >
            <LogIn className="w-4 h-4" />
            <span>Entrar no GameGuide</span>
          </button>
        </form>

        {/* Atalho para teste rápido com contas mockadas */}
        <div className="pt-4 border-t border-slate-800 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Acesso Rápido para Demonstração:</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {INITIAL_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleQuickLogin(u.email)}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/50 text-xs text-slate-300 hover:text-white transition-all text-left"
              >
                <div className="flex items-center gap-2">
                  <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full" />
                  <span className="font-semibold">{u.name}</span>
                </div>
                <span className="text-[10px] text-purple-400 font-medium">{u.role}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Não tem uma conta gamer?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-bold">
              Cadastre-se grátis
            </Link>
          </p>
        </div>
      </div>

      {/* Nota de arquitetura */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-300">Modo Standalone:</strong> Sessão mantida localmente em seu navegador.
          Para produção, conecte a uma API REST com JWT, Supabase Auth ou Firebase.
        </p>
      </div>
    </div>
  );
};
