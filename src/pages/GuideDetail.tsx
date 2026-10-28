import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { useAuth } from '../context/AuthContext';
import { CategoryBadge, DifficultyBadge } from '../components/Badge';
import { StarRating } from '../components/StarRating';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Calendar, 
  Lightbulb, 
  Share2, 
  MessageSquare, 
  Send, 
  CheckCircle,
  Scroll
} from 'lucide-react';

export const GuideDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getGuideById, rateGuide, getUserRatingForGuide, addComment, incrementGuideViews } = useGameGuide();
  const { user } = useAuth();

  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [ratingSuccessMessage, setRatingSuccessMessage] = useState(false);

  const guide = getGuideById(id || '');

  useEffect(() => {
    if (guide) {
      incrementGuideViews(guide.id);
    }
  }, [guide?.id]);

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Scroll className="w-14 h-14 text-[#5e5647] mx-auto" />
        <h1 className="text-2xl font-bold font-cinzel text-white">Manuscrito não encontrado</h1>
        <p className="text-xs text-[#8c8577] font-serif">
          A publicação solicitada não existe ou foi consumida pelo tempo.
        </p>
        <Link
          to="/guides"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#2b2214] border border-[#5f4924] text-fantasy-goldLight text-xs font-cinzel font-bold shadow-glow-gold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar aos Guias</span>
        </Link>
      </div>
    );
  }

  const currentUserId = user?.id || 'user-anonymous';
  const currentUserVote = getUserRatingForGuide(guide.id, currentUserId);

  const handleRate = (rating: number) => {
    rateGuide(guide.id, rating, currentUserId);
    setRatingSuccessMessage(true);
    setTimeout(() => setRatingSuccessMessage(false), 4000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const authorData = user
      ? { id: user.id, name: user.name, avatar: user.avatar }
      : { id: 'user-anon', name: 'Viajante Desconhecido', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=anon' };

    addComment(guide.id, commentText.trim(), authorData);
    setCommentText('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Navegação de Retorno */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-cinzel text-[#8c8577] hover:text-fantasy-goldLight transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-fantasy-gold" />
          <span>Voltar aos Manuscritos</span>
        </Link>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#10131b] border border-[#232938] text-xs font-cinzel text-[#a8a192] hover:text-white hover:border-fantasy-gold/50 transition-all"
        >
          <Share2 className="w-3.5 h-3.5 text-fantasy-gold" />
          <span>{copiedLink ? 'Link Copiado!' : 'Compartilhar'}</span>
        </button>
      </div>

      {/* Cartão de Cabeçalho do Guia */}
      <header className="bg-[#10131c] border border-[#282f42] rounded-lg p-5 sm:p-7 space-y-4 shadow-steam-card">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <Link
            to={`/games/${guide.gameId}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e170c] border border-[#523d1d] text-xs font-cinzel font-bold text-fantasy-goldLight hover:bg-[#2b2214] transition-colors"
          >
            <Scroll className="w-3.5 h-3.5 text-fantasy-gold" />
            <span>{guide.gameTitle}</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <CategoryBadge category={guide.category} size="md" />
            <DifficultyBadge difficulty={guide.difficulty} />
          </div>
        </div>

        <h1 className="text-xl sm:text-3xl font-black font-cinzel text-[#f7eee1] leading-snug">
          {guide.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#baa990] font-serif leading-relaxed italic border-l-2 border-fantasy-gold pl-3 py-0.5">
          {guide.summary}
        </p>

        {/* Metadados: Autor, Data, Tempo, Views */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1e2432] text-xs text-[#8c8577]">
          <div className="flex items-center gap-2.5">
            <img
              src={guide.author.avatar}
              alt={guide.author.name}
              className="w-8 h-8 rounded-full border border-fantasy-gold/50 object-cover"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#e6ded0] text-xs font-cinzel">{guide.author.name}</span>
                {guide.author.badge && (
                  <span className="text-[9px] bg-[#1a140d] text-fantasy-gold px-1.5 py-0.2 rounded border border-[#4d3b1e] font-cinzel">
                    {guide.author.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2.5 text-[#736d62] text-[10px] mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5" />
                  {guide.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {guide.estimatedReadTime}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#090c12] px-2.5 py-1 rounded border border-[#1e2432] text-[11px] text-[#8c8577]">
              <Eye className="w-3 h-3 text-fantasy-gold" />
              <span>{guide.views} consultas</span>
            </div>
          </div>
        </div>
      </header>

      {/* BLOCO DE AVALIAÇÃO DE 1 A 5 ESTRELAS */}
      <section className="bg-gradient-to-r from-[#17130b] via-[#10131c] to-[#17130b] border border-[#574322] rounded-lg p-5 space-y-3 shadow-steam-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold font-cinzel uppercase tracking-widest text-fantasy-goldLight">
              Consagração Comunitária
            </span>
            <h3 className="text-base sm:text-lg font-bold font-cinzel text-[#f7eee1]">
              Este manuscrito iluminou sua jornada?
            </h3>
            <p className="text-xs text-[#8c8577] font-serif">
              Sua avaliação de 1 a 5 estrelas eleva as melhores estratégias no ranking da guilda.
            </p>
          </div>

          <div className="bg-[#0b0e14] border border-[#2b3345] p-3 rounded flex flex-col items-center sm:items-end flex-shrink-0">
            <span className="text-[10px] text-[#787265] font-cinzel mb-0.5">Nota Média do Guia</span>
            <StarRating
              value={guide.ratings.average}
              totalVotes={guide.ratings.totalVotes}
              interactive={true}
              userVote={currentUserVote}
              onRate={handleRate}
              size="lg"
            />
          </div>
        </div>

        {ratingSuccessMessage && (
          <div className="flex items-center gap-1.5 p-2.5 rounded bg-[#0f2117] border border-[#23573a] text-[#7ecba1] text-xs font-cinzel">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>Avaliação computada com louvor! A média foi atualizada em tempo real.</span>
          </div>
        )}
      </section>

      {/* CONTEÚDO DO GUIA */}
      <main className="bg-[#10131c] border border-[#232938] rounded-lg p-5 sm:p-8 space-y-6 shadow-steam-card">
        {/* Introdução */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold font-cinzel text-fantasy-goldLight border-b border-[#232938] pb-1.5">
            I. Preâmbulo da Estratégia
          </h2>
          <p className="text-xs sm:text-sm text-[#d4cbbe] font-serif leading-relaxed">
            {guide.content.intro}
          </p>
        </div>

        {/* Seções Estruturadas */}
        {guide.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-3 pt-4 border-t border-[#1e2432]">
            <h3 className="text-sm sm:text-base font-bold font-cinzel text-[#f5ebd7] flex items-center gap-2">
              <span className="text-fantasy-gold font-mono text-sm">{idx + 1}.</span>
              <span>{section.title}</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#b8b0a0] font-serif leading-relaxed whitespace-pre-line">
              {section.content}
            </p>

            {/* Dicas Pro / Pro-Tips Vintage */}
            {section.tips && section.tips.length > 0 && (
              <div className="p-3 rounded bg-[#17130b] border border-[#4f3b1e] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold font-cinzel text-fantasy-goldLight uppercase tracking-wide">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Dica de Especialista</span>
                </div>
                <ul className="space-y-1 text-xs text-[#baa990] font-serif">
                  {section.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-start gap-1.5">
                      <span className="text-fantasy-gold font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-[#1e2432]">
          <span className="text-[10px] text-[#736d62] font-cinzel">Palavras-chave:</span>
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded bg-[#161a24] text-[#a19a8c] border border-[#2b3345] font-cinzel"
            >
              #{tag}
            </span>
          ))}
        </div>
      </main>

      {/* SEÇÃO DE COMENTÁRIOS */}
      <section className="bg-[#10131c] border border-[#232938] rounded-lg p-5 sm:p-7 space-y-5 shadow-steam-card">
        <div className="flex items-center justify-between gap-4 border-b border-[#1e2432] pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-fantasy-gold" />
            <h3 className="text-base sm:text-lg font-bold font-cinzel text-[#f7eee1]">
              Discussão da Guilda ({guide.comments.length})
            </h3>
          </div>
          <span className="text-[11px] text-[#736d62] font-cinzel">Fórum Aberto</span>
        </div>

        {/* Formulário de Novo Comentário */}
        <form onSubmit={handleAddComment} className="space-y-2.5">
          <div className="flex items-start gap-2.5">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'}
              alt="Avatar"
              className="w-7 h-7 rounded-full border border-fantasy-gold/50 mt-1"
            />
            <div className="flex-1 space-y-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Compartilhe uma dúvida, conselho ou variação para este guia..."
                rows={2}
                className="w-full p-2.5 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs focus:outline-none focus:border-fantasy-gold font-serif"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#2b2214] hover:bg-[#382b18] disabled:opacity-40 disabled:cursor-not-allowed text-fantasy-goldLight text-xs font-cinzel font-bold border border-[#5f4924] shadow-glow-gold transition-all"
                >
                  <Send className="w-3 h-3" />
                  <span>Publicar Mensagem</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Lista de Comentários */}
        <div className="space-y-3 pt-1">
          {guide.comments.length > 0 ? (
            guide.comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 rounded bg-[#0a0d14] border border-[#1e2432] flex items-start gap-3"
              >
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-7 h-7 rounded-full border border-fantasy-gold/40 object-cover mt-0.5"
                />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-cinzel text-fantasy-gold">
                      {comment.userName}
                    </span>
                    <span className="text-[10px] text-[#696356] font-mono">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="text-xs text-[#b0a89a] font-serif leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-[#696356] font-serif py-4 italic">
              Nenhuma mensagem gravada ainda. Seja o primeiro a registrar seu comentário!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
