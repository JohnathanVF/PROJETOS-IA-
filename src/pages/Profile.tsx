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
  Feather,
  Scroll
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
        <UserIcon className="w-14 h-14 text-[#544d3f] mx-auto" />
        <h1 className="text-2xl font-bold font-cinzel text-white">Nenhum membro identificado</h1>
        <p className="text-xs text-[#8c8577] font-serif">Faça login para ter acesso aos seus registros e manuscritos.</p>
        <Link
          to="/login"
          className="inline-flex px-4 py-2 rounded bg-[#2b2214] border border-[#5f4924] text-fantasy-goldLight text-xs font-cinzel font-bold shadow-glow-gold"
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  const userGuides = guides.filter(
    (g) => g.author.id === user.id || g.author.name.toLowerCase() === user.name.toLowerCase()
  );

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Cartão de Perfil Dark Fantasy */}
      <div className="relative rounded-lg overflow-hidden bg-[#10131c] border border-[#232938] p-5 sm:p-7 shadow-steam-card">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-fantasy-gold/50 shadow-glow-gold object-cover"
            />
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-[#1e170c] text-fantasy-goldLight border border-[#523d1d] text-[9px] font-cinzel font-bold">
              {user.role}
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-3xl font-black font-cinzel text-[#f7eee1]">
                  {user.name}
                </h1>
                <p className="text-xs text-[#8c8577] font-mono mt-0.5">{user.email}</p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Link
                  to="/create-guide"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight text-xs font-cinzel font-bold border border-[#5f4924] shadow-glow-gold transition-all"
                >
                  <Feather className="w-3.5 h-3.5 text-fantasy-gold" />
                  <span>Novo Manuscrito</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#151922] hover:bg-rose-950/40 hover:text-rose-400 border border-[#232938] text-xs font-cinzel text-[#8c8577] transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Desconectar</span>
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="pt-1">
              {isEditingBio ? (
                <div className="space-y-2 max-w-xl">
                  <textarea
                    value={bioText}
                    onChange={(e) => setBioText(e.target.value)}
                    rows={2}
                    placeholder="Escreva algo sobre sua jornada..."
                    className="w-full p-2 rounded bg-[#0a0d14] border border-fantasy-gold/50 text-xs text-[#ded8cc] font-serif focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveBio}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-800 text-white text-[11px] font-cinzel font-bold"
                    >
                      <Check className="w-3 h-3" /> Salvar
                    </button>
                    <button
                      onClick={() => setIsEditingBio(false)}
                      className="px-2.5 py-1 rounded bg-[#1e2432] text-[#8c8577] text-[11px] font-cinzel"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-xs text-[#a8a192] italic font-serif">
                    "{user.bio || 'Nenhuma biografia registrada ainda.'}"
                  </p>
                  <button
                    onClick={() => {
                      setBioText(user.bio || '');
                      setIsEditingBio(true);
                    }}
                    className="text-[#736d62] hover:text-fantasy-gold transition-colors"
                    title="Editar biografia"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Data de adesão */}
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[10px] text-[#787265] pt-0.5 font-cinzel">
              <Calendar className="w-3 h-3 text-fantasy-gold" />
              <span>Irmão de guilda desde {user.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Estatísticas do Perfil */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-[#1e2432]">
          <div className="bg-[#0a0d14] p-3 rounded border border-[#1e2432]">
            <span className="text-lg sm:text-xl font-black font-cinzel text-fantasy-gold">
              {userGuides.length}
            </span>
            <p className="text-[10px] text-[#7d786d] font-cinzel mt-0.5">Manuscritos Escritos</p>
          </div>

          <div className="bg-[#0a0d14] p-3 rounded border border-[#1e2432]">
            <span className="text-lg sm:text-xl font-black font-cinzel text-amber-400 flex items-center gap-1">
              <span>{averageRatingReceived}</span>
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </span>
            <p className="text-[10px] text-[#7d786d] font-cinzel mt-0.5">Média Recebida</p>
          </div>

          <div className="bg-[#0a0d14] p-3 rounded border border-[#1e2432]">
            <span className="text-lg sm:text-xl font-black font-cinzel text-fantasy-goldLight">
              {totalVotesReceived}
            </span>
            <p className="text-[10px] text-[#7d786d] font-cinzel mt-0.5">Votos Recebidos</p>
          </div>

          <div className="bg-[#0a0d14] p-3 rounded border border-[#1e2432]">
            <span className="text-lg sm:text-xl font-black font-cinzel text-emerald-400">
              {user.role}
            </span>
            <p className="text-[10px] text-[#7d786d] font-cinzel mt-0.5">Grau na Guilda</p>
          </div>
        </div>
      </div>

      {/* Guias do Usuário */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#232938] pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-fantasy-gold text-[11px] font-bold font-cinzel uppercase tracking-widest mb-0.5">
              <BookOpen className="w-3.5 h-3.5 text-fantasy-gold" />
              <span>Arquivo Pessoal</span>
            </div>
            <h2 className="text-xl font-bold font-cinzel text-[#f7eee1]">
              Manuscritos de {user.name} ({userGuides.length})
            </h2>
          </div>

          <Link
            to="/create-guide"
            className="text-xs font-bold font-cinzel text-fantasy-gold hover:text-fantasy-goldLight flex items-center gap-1"
          >
            <Feather className="w-3 h-3" />
            <span>Redigir Novo</span>
          </Link>
        </div>

        {userGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#10131c] border border-[#232938] rounded-lg p-6 space-y-3">
            <Scroll className="w-10 h-10 text-fantasy-gold mx-auto" />
            <h3 className="text-lg font-bold font-cinzel text-[#ede4d3]">
              Você ainda não publicou nenhum manuscrito
            </h3>
            <p className="text-xs text-[#8c8577] font-serif max-w-sm mx-auto">
              Compartilhe seu primeiro detonado ou dica de chefe e comece a receber avaliações por estrelas da irmandade!
            </p>
            <Link
              to="/create-guide"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight text-xs font-cinzel font-bold border border-[#5f4924] shadow-glow-gold"
            >
              <Feather className="w-3.5 h-3.5" />
              <span>Escrever Primeiro Guia</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
