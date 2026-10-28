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
  Gamepad2, 
  Calendar, 
  Lightbulb, 
  Share2, 
  MessageSquare, 
  Send, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const GuideDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getGuideById, rateGuide, getUserRatingForGuide, addComment, incrementGuideViews } = useGameGuide();
  const { user } = useAuth();

  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [ratingSuccessMessage, setRatingSuccessMessage] = useState(false);

  const guide = getGuideById(id || '');

  // Incrementar visualização na montagem
  useEffect(() => {
    if (guide) {
      incrementGuideViews(guide.id);
    }
  }, [guide?.id]);

  if (!guide) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Sparkles className="w-16 h-16 text-slate-600 mx-auto" />
        <h1 className="text-3xl font-bold font-gamer text-white">Guia não encontrado</h1>
        <p className="text-sm text-slate-400">
          A publicação solicitada não existe ou foi removida.
        </p>
        <Link
          to="/guides"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-glow-purple"
        >
          <ArrowLeft className="w-4 h-4" />
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
      : { id: 'user-anon', name: 'Gamer Anônimo', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=anon' };

    addComment(guide.id, commentText.trim(), authorData);
    setCommentText('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navegação de Retorno */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/guides"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Feed de Guias</span>
        </Link>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-all"
        >
          <Share2 className="w-3.5 h-3.5 text-purple-400" />
          <span>{copiedLink ? 'Link Copiado!' : 'Compartilhar'}</span>
        </button>
      </div>

      {/* Cartão de Cabeçalho do Guia */}
      <header className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to={`/games/${guide.gameId}`}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-950/80 border border-purple-500/40 text-xs font-bold text-purple-300 hover:bg-purple-900/80 transition-colors"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>{guide.gameTitle}</span>
          </Link>

          <div className="flex items-center gap-2">
            <CategoryBadge category={guide.category} size="md" />
            <DifficultyBadge difficulty={guide.difficulty} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-gamer text-white leading-tight">
          {guide.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic border-l-2 border-purple-500 pl-4 py-1">
          {guide.summary}
        </p>

        {/* Metadados: Autor, Data, Tempo, Views */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <img
              src={guide.author.avatar}
              alt={guide.author.name}
              className="w-10 h-10 rounded-full border border-purple-500/60 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{guide.author.name}</span>
                {guide.author.badge && (
                  <span className="text-[10px] bg-purple-900/70 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/40">
                    {guide.author.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-[11px] mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {guide.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {guide.estimatedReadTime}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1 rounded-lg border border-slate-800">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>{guide.views} leituras</span>
            </div>
          </div>
        </div>
      </header>

      {/* BLOCO DE AVALIAÇÃO DE 1 A 5 ESTRELAS */}
      <section className="bg-gradient-to-r from-amber-950/20 via-slate-900 to-purple-950/20 border border-amber-500/30 rounded-2xl p-6 sm:p-7 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Sistema de Avaliação Comunitária
            </span>
            <h3 className="text-xl font-bold font-gamer text-white">
              Este guia te ajudou a vencer o desafio?
            </h3>
            <p className="text-xs text-slate-400">
              Sua nota de 1 a 5 estrelas ajuda a posicionar os melhores guias no topo do ranking.
            </p>
          </div>

          <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl flex flex-col items-center sm:items-end flex-shrink-0">
            <span className="text-xs text-slate-400 mb-1">Média Geral do Guia</span>
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
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-medium animate-fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Avaliação computada com sucesso! A média foi recalculada em tempo real.</span>
          </div>
        )}
      </section>

      {/* CONTEÚDO DO GUIA */}
      <main className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 backdrop-blur-md">
        {/* Introdução */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold font-gamer text-purple-300">
            Visão Geral da Estratégia
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed">
            {guide.content.intro}
          </p>
        </div>

        {/* Seções Estruturadas */}
        {guide.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 pt-6 border-t border-slate-800/80">
            <h3 className="text-lg sm:text-xl font-bold font-gamer text-white flex items-center gap-2">
              <span className="text-purple-400 font-mono text-base">{idx + 1}.</span>
              <span>{section.title}</span>
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {section.content}
            </p>

            {/* Dicas Pro / Pro-Tips */}
            {section.tips && section.tips.length > 0 && (
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wide">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Dica de Especialista</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {section.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-800">
          <span className="text-xs text-slate-500">Tags:</span>
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
            >
              #{tag}
            </span>
          ))}
        </div>
      </main>

      {/* SEÇÃO DE COMENTÁRIOS E DÚVIDAS DA COMUNIDADE */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold font-gamer text-white">
              Discussão da Comunidade ({guide.comments.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">Fórum aberto</span>
        </div>

        {/* Formulário de Novo Comentário */}
        <form onSubmit={handleAddComment} className="space-y-3">
          <div className="flex items-start gap-3">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'}
              alt="Seu avatar"
              className="w-8 h-8 rounded-full border border-purple-500/50 mt-1"
            />
            <div className="flex-1 space-y-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Tem alguma dúvida ou variação para este guia? Escreva seu comentário..."
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-glow-purple transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Comentário</span>
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Lista de Comentários */}
        <div className="space-y-4 pt-2">
          {guide.comments.length > 0 ? (
            guide.comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3.5"
              >
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-8 h-8 rounded-full border border-purple-500/40 object-cover mt-0.5"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-300">
                      {comment.userName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xs text-slate-500 py-6">
              Nenhum comentário publicado ainda. Seja o primeiro a comentar!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
