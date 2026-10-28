import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGameGuide } from '../context/GameGuideContext';
import { GuideCard } from '../components/GuideCard';
import { 
  User as UserIcon, 
  BookOpen, 
  Star, 
  Calendar, 
  Edit3, 
  Check, 
  LogOut, 
  PlusCircle,
  Sparkles
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout, updateBio } = useAuth();
  const { guides } = useGameGuide();
  const navigate = useNavigate();

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(user?.bio || '');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <UserIcon className="w-16 h-16 text-slate-600 mx-auto" />
        <h1 className="text-2xl font-bold font-gamer text-white">Nenhum usuário conectado</h1>
        <p className="text-xs text-slate-400">Faça login para acessar o perfil e gerenciar seus guias.</p>
        <Link
          to="/login"
          className="inline-flex px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-glow-purple"
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  // Guias criados pelo usuário logado
  const userGuides = guides.filter(
    (g) => g.author.id === user.id || g.author.name.toLowerCase() === user.name.toLowerCase()
  );

  // Média de avaliação dos guias do usuário
  const totalVotesReceived = userGuides.reduce((acc, g) => acc + g.ratings.totalVotes, 0);
  const averageRatingReceived =
    userGuides.length > 0
      ? (
          userGuides.reduce((acc, g) => acc + g.ratings.average * g.ratings.totalVotes, 0) /
          (totalVotesReceived || 1)
        ).toFixed(1)
      : '5.0';

  const handleSaveBio = () => {
    updateBio(bioText);
    setIsEditingBio(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Cartão de Perfil do Gamer */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-purple-500/60 shadow-glow-purple object-cover"
            />
            <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-purple-900 text-purple-300 border border-purple-500/40 text-[10px] font-bold">
              {user.role}
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-gamer text-white">
                  {user.name}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Link
                  to="/create-guide"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-purple transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Novo Guia</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700/60 text-xs font-semibold text-slate-300 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair</span>
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="pt-2">
              {isEditingBio ? (
                <div className="space-y-2 max-w-xl">
                  <textarea
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    rows={2}
                    placeholder="Escreva algo sobre você..."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-purple-500/40 text-xs text-slate-200 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveBio}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                    >
                      <Check className="w-3 h-3" /> Salvar
                    </button>
                    <button
                      onClick={() => setIsEditingBio(false)}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-xs text-slate-300 italic">
                    "{user.bio || 'Nenhuma biografia adicionada ainda.'}"
                  </p>
                  <button
                    onClick={() => {
                      setBioText(user.bio || '');
                      setIsEditingBio(true);
                    }}
                    className="text-slate-400 hover:text-purple-400 transition-colors"
                    title="Editar biografia"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Data de adesão */}
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-slate-500 pt-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Membro desde {user.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Estatísticas do Perfil */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
            <span className="text-xl sm:text-2xl font-black font-gamer text-purple-400">
              {userGuides.length}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Guias Publicados</p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
            <span className="text-xl sm:text-2xl font-black font-gamer text-amber-400 flex items-center gap-1">
              <span>{averageRatingReceived}</span>
              <Star className="w-4 h-4 fill-amber-400" />
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Média Recebida</p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
            <span className="text-xl sm:text-2xl font-black font-gamer text-cyan-400">
              {totalVotesReceived}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Votos Recebidos</p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
            <span className="text-xl sm:text-2xl font-black font-gamer text-emerald-400">
              {user.role}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">Rank na Comunidade</p>
          </div>
        </div>
      </div>

      {/* Guias do Usuário */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Minhas Contribuições</span>
            </div>
            <h2 className="text-2xl font-bold font-gamer text-white">
              Publicações de {user.name} ({userGuides.length})
            </h2>
          </div>

          <Link
            to="/create-guide"
            className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Adicionar Novo</span>
          </Link>
        </div>

        {userGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-4">
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto" />
            <h3 className="text-xl font-bold font-gamer text-white">
              Você ainda não publicou nenhum guia
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Compartilhe seu primeiro detonado, dica de chefe ou recomendação de equipamentos e comece a receber avaliações por estrelas da comunidade!
            </p>
            <Link
              to="/create-guide"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-purple transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Criar Meu Primeiro Guia</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
