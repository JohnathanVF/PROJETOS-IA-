import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock, User, UserPlus, Database } from 'lucide-react';

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
      setError('Por favor, informe seu nome de guerreiro.');
      return;
    }
    if (!email.trim()) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setError('A palavra-passe deve conter ao menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As palavras-passe não coincidem.');
      return;
    }

    const success = await register(name.trim(), email.trim(), password);
    if (success) {
      navigate('/profile');
    } else {
      setError('Erro ao registrar membro. Tente novamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14 space-y-6">
      {/* Cabeçalho */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded bg-[#16120b] border border-[#5a4625] flex items-center justify-center shadow-glow-gold">
          <Shield className="w-6 h-6 text-fantasy-gold" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-cinzel text-[#f7eee1] tracking-wide">
          Inscrever-se na Guilda
        </h1>
        <p className="text-xs text-[#8c8577] font-serif">
          Junte-se aos guardiões da sabedoria e compartilhe suas estratégias arcanas.
        </p>
      </div>

      {/* Formulário */}
      <div className="bg-[#10131c] border border-[#232938] rounded-lg p-5 sm:p-7 space-y-4 shadow-steam-card">
        {error && (
          <div className="p-2.5 rounded bg-[#240d12] border border-[#661b29] text-[#e57d90] text-xs font-cinzel">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              Nome de Cavaleiro / Gamertag
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 text-fantasy-gold absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Artorias, Solaire, Geralt"
                required
                className="w-full pl-9 pr-3 py-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs focus:outline-none focus:border-fantasy-gold font-cinzel"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              E-mail
            </label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-fantasy-gold absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="w-full pl-9 pr-3 py-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs focus:outline-none focus:border-fantasy-gold font-serif"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              Palavra-Passe (mínimo 6 caracteres)
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-fantasy-gold absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs focus:outline-none focus:border-fantasy-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              Confirmar Palavra-Passe
            </label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-fantasy-gold absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs focus:outline-none focus:border-fantasy-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight font-cinzel font-bold text-xs border border-[#6b5228] shadow-glow-gold transition-all"
          >
            <UserPlus className="w-3.5 h-3.5 text-fantasy-gold" />
            <span>Fazer Juramento & Cadastrar</span>
          </button>
        </form>

        <div className="text-center pt-1">
          <p className="text-xs text-[#8c8577] font-serif">
            Já possui assento na guilda?{' '}
            <Link to="/login" className="text-fantasy-gold hover:text-fantasy-goldLight font-cinzel font-bold">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      {/* Nota técnica */}
      <div className="flex items-start gap-2 p-3 rounded bg-[#0d1017] border border-[#212838] text-xs text-[#7d786d]">
        <Database className="w-3.5 h-3.5 text-fantasy-gold flex-shrink-0 mt-0.5" />
        <p className="font-serif">
          Os dados cadastrados persistem em seu navegador via <code>LocalStorage</code>.
        </p>
      </div>
    </div>
  );
};
