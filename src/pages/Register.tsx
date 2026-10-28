import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Gamepad2, Mail, Lock, User, UserPlus, ShieldCheck } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Por favor, informe seu nome de jogador.');
      return;
    }
    if (!email.trim()) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const success = await register(name.trim(), email.trim(), password);
    if (success) {
      navigate('/profile');
    } else {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      {/* Cabeçalho */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-glow-cyan">
          <div className="w-full h-full bg-[#0d121f] rounded-[14px] flex items-center justify-center">
            <Gamepad2 className="w-7 h-7 text-cyan-400" />
          </div>
        </div>
        <h1 className="text-3xl font-black font-gamer text-white tracking-wide">
          Criar Conta Gamer
        </h1>
        <p className="text-xs text-slate-400">
          Junte-se à maior comunidade de guias, detonados e estratégias de jogos.
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
              Gamertag / Nome de Exibição
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: ShadowHunter, PixelMaster"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Senha (mínimo 6 caracteres)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Confirmar Senha
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-sm shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Criar Minha Conta</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            Já possui cadastro?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      {/* Nota técnica */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
        <p>
          Os dados de cadastro são salvos no <code>LocalStorage</code> para testes imediatos sem necessidade de configurar chaves de API externas.
        </p>
      </div>
    </div>
  );
};
