import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { useAuth } from '../context/AuthContext';
import { GuideCategory, GuideDifficulty } from '../types';
import { 
  PlusCircle, 
  Trash2, 
  Lightbulb, 
  Gamepad2, 
  BookOpen, 
  Sparkles, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

interface SectionState {
  title: string;
  content: string;
  tip: string;
}

export const CreateGuide: React.FC = () => {
  const { games, addGuide } = useGameGuide();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultGameId = searchParams.get('gameId') || (games[0]?.id ?? '');

  const [gameId, setGameId] = useState(defaultGameId);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GuideCategory>('Detonado Completo');
  const [difficulty, setDifficulty] = useState<GuideDifficulty>('Intermediário');
  const [estimatedReadTime, setEstimatedReadTime] = useState('5 min de leitura');
  const [summary, setSummary] = useState('');
  const [intro, setIntro] = useState('');
  const [tags, setTags] = useState('');
  const [authorName, setAuthorName] = useState(user?.name || 'Gamer Estrategista');

  const [sections, setSections] = useState<SectionState[]>([
    {
      title: 'Passo 1: Preparação e Equipamentos',
      content: 'Explique o que o jogador deve coletar antes de iniciar o desafio...',
      tip: 'Mantenha consumíveis de cura à mão na barra rápida.',
    },
    {
      title: 'Passo 2: Execução da Estratégia',
      content: 'Descreva a movimentação, fraquezas do inimigo ou escolhas de rota...',
      tip: '',
    },
  ]);

  const [error, setError] = useState<string | null>(null);

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        title: `Passo ${prev.length + 1}: Novo Tópico`,
        content: '',
        tip: '',
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    if (sections.length <= 1) return;
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSectionChange = (index: number, field: keyof SectionState, value: string) => {
    setSections((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Por favor, informe o título do guia.');
      return;
    }
    if (!summary.trim()) {
      setError('Por favor, preencha o resumo do guia.');
      return;
    }
    if (!intro.trim()) {
      setError('Por favor, preencha a introdução da estratégia.');
      return;
    }

    const processedSections = sections.map((sec) => ({
      title: sec.title.trim() || 'Etapa',
      content: sec.content.trim() || 'Sem detalhes.',
      tips: sec.tip.trim() ? [sec.tip.trim()] : undefined,
    }));

    const tagsArray = tags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const author = {
      id: user?.id || `user-anon-${Date.now()}`,
      name: authorName.trim() || 'Gamer Anônimo',
      avatar: user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=creator',
      badge: user?.role || 'Membro',
    };

    const newGuide = addGuide({
      gameId,
      title: title.trim(),
      summary: summary.trim(),
      category,
      difficulty,
      estimatedReadTime,
      tags: tagsArray,
      content: {
        intro: intro.trim(),
        sections: processedSections,
      },
      author,
    });

    // Redireciona para o guia recém-criado
    navigate(`/guides/${newGuide.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Retorno */}
      <Link
        to="/guides"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-purple-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar aos Guias</span>
      </Link>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Editor Comunitário</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-gamer text-white">
          Publicar Novo Guia de Jogo
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Compartilhe suas táticas, rotas e builds. Seu guia será exibido imediatamente na biblioteca, 
          vinculado ao jogo escolhido e aberto para avaliações de 1 a 5 estrelas.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/50 flex items-center gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Bloco 1: Informações Gerais */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
          <h2 className="text-xl font-bold font-gamer text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <span>1. Informações Básicas</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Jogo Vinculado */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Jogo Vinculado <span className="text-purple-400">*</span>
              </label>
              <select
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                {games.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Categoria do Guia <span className="text-purple-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GuideCategory)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="Detonado Completo">Detonado Completo</option>
                <option value="Builds & Equipamentos">Builds & Equipamentos</option>
                <option value="Chefes & Bosses">Chefes & Bosses</option>
                <option value="Dicas & Truques">Dicas & Truques</option>
                <option value="Segredos & Conquistas">Segredos & Conquistas</option>
              </select>
            </div>

            {/* Dificuldade */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Dificuldade Estimada
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as GuideDifficulty)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>

            {/* Tempo de Leitura */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Tempo Estimado de Leitura
              </label>
              <input
                type="text"
                value={estimatedReadTime}
                onChange={(e) => setEstimatedReadTime(e.target.value)}
                placeholder="Ex: 6 min de leitura"
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Título do Guia */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Título Chamativo do Guia <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Guia Completo para Vencer o Chefe Final sem Armadura"
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Resumo */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Resumo / Sinopse Rápida <span className="text-purple-400">*</span>
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Breve descrição em 1 ou 2 frases sobre o que o leitor vai aprender neste guia..."
              rows={2}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Autor */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Nome de Autor / Gamertag
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Seu nome ou apelido gamer"
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Bloco 2: Conteúdo Estruturado */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-md">
          <h2 className="text-xl font-bold font-gamer text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>2. Conteúdo e Estratégia</span>
          </h2>

          {/* Introdução */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Introdução do Guia <span className="text-purple-400">*</span>
            </label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="Apresente o contexto do guia, pré-requisitos e principais vantagens..."
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Seções Dinâmicas */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold font-gamer text-purple-300 uppercase tracking-wide">
                Seções do Guia ({sections.length})
              </label>
              <button
                type="button"
                onClick={handleAddSection}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-900/80 text-xs font-semibold transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Adicionar Seção</span>
              </button>
            </div>

            {sections.map((section, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4 relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Seção #{idx + 1}
                  </span>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      className="text-xs text-rose-400 hover:text-rose-300 p-1 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover</span>
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleSectionChange(idx, 'title', e.target.value)}
                  placeholder="Título da seção (ex: Fraquezas e Padrões de Ataque)"
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />

                <textarea
                  value={section.content}
                  onChange={(e) => handleSectionChange(idx, 'content', e.target.value)}
                  placeholder="Descreva as instruções detalhadas desta etapa..."
                  rows={3}
                  className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />

                <div className="relative">
                  <Lightbulb className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={section.tip}
                    onChange={(e) => handleSectionChange(idx, 'tip', e.target.value)}
                    placeholder="Dica Pro opcional (ex: utilize o item de gelo para cortar o salto do boss)"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-purple-500/20 text-xs text-slate-300 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-slate-300">
              Tags / Palavras-chave (separadas por vírgula)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex: Boss Fight, No-Damage, Sangramento, Elden Ring"
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="flex items-center justify-end gap-4">
          <Link
            to="/guides"
            className="px-5 py-3 rounded-xl text-slate-400 hover:text-white text-sm font-semibold transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow-purple transition-all transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar Guia Agora</span>
          </button>
        </div>
      </form>
    </div>
  );
};
