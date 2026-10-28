import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock, LogIn, Sparkles, Database } from 'lucide-react';
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
      setError('Falha ao autenticar na guilda. Verifique suas credenciais.');
    }
  };

  const handleQuickLogin = (testEmail: string) => {
    setEmail(testEmail);
    login(testEmail).then(() => navigate('/profile'));
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14 space-y-6">
      {/* Cabeçalho Vintage */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded bg-[#16120b] border border-[#5a4625] flex items-center justify-center shadow-glow-gold">
          <Shield className="w-6 h-6 text-fantasy-gold" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-cinzel text-[#f7eee1] tracking-wide">
          Portal da Guilda
        </h1>
        <p className="text-xs text-[#8c8577] font-serif">
          Identifique-se para redigir manuscritos, conferir estrelas e salvar suas estratégias.
        </p>
      </div>

      {/* Formulário */}
      <div className="bg-[#10131c] border border-[#232938] rounded-lg p-5 sm:p-7 space-y-5 shadow-steam-card">
        {error && (
          <div className="p-2.5 rounded bg-[#240d12] border border-[#661b29] text-[#e57d90] text-xs font-cinzel">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              E-mail do Membro
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
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
                Palavra-Passe
              </label>
              <span className="text-[10px] text-fantasy-gold hover:text-fantasy-goldLight cursor-pointer font-cinzel">
                Esqueceu a chave?
              </span>
            </div>
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

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight font-cinzel font-bold text-xs border border-[#6b5228] shadow-glow-gold transition-all"
          >
            <LogIn className="w-3.5 h-3.5 text-fantasy-gold" />
            <span>Adentrar ao Santuário</span>
          </button>
        </form>

        {/* Atalho para teste rápido */}
        <div className="pt-3 border-t border-[#1e2432] space-y-2">
          <div className="flex items-center gap-1 text-[11px] text-[#8c8577] font-cinzel">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Acesso Rápido para Demonstração:</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {INITIAL_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleQuickLogin(u.email)}
                className="flex items-center justify-between p-2 rounded bg-[#0a0d14] border border-[#1e2432] hover:border-fantasy-gold/50 text-xs text-[#a9a192] hover:text-white transition-all text-left"
              >
                <div className="flex items-center gap-2">
                  <img src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full border border-fantasy-gold/40" />
                  <span className="font-cinzel font-semibold text-[11px]">{u.name}</span>
                </div>
                <span className="text-[10px] text-fantasy-gold font-mono">{u.role}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center pt-1">
          <p className="text-xs text-[#8c8577] font-serif">
            Ainda não fez seu juramento?{' '}
            <Link to="/register" className="text-fantasy-gold hover:text-fantasy-goldLight font-cinzel font-bold">
              Inscrever-se
            </Link>
          </p>
        </div>
      </div>

      {/* Nota técnica */}
      <div className="flex items-start gap-2 p-3 rounded bg-[#0d1017] border border-[#212838] text-xs text-[#7d786d]">
        <Database className="w-3.5 h-3.5 text-fantasy-gold flex-shrink-0 mt-0.5" />
        <p className="font-serif">
          Sessão mantida localmente em seu navegador via <code>LocalStorage</code> para demonstração imediata.
        </p>
      </div>
    </div>
  );
};
