import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useGameGuide } from '../context/GameGuideContext';
import { useAuth } from '../context/AuthContext';
import { GuideCategory, GuideDifficulty } from '../types';
import { 
  PlusCircle, 
  Trash2, 
  Lightbulb, 
  Scroll, 
  AlertCircle,
  ArrowLeft,
  Feather
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
  const [estimatedReadTime, setEstimatedReadTime] = useState('6 min de leitura');
  const [summary, setSummary] = useState('');
  const [intro, setIntro] = useState('');
  const [tags, setTags] = useState('');
  const [authorName, setAuthorName] = useState(user?.name || 'Mestre Estrategista');

  const [sections, setSections] = useState<SectionState[]>([
    {
      title: 'Fase 1: Preparação Arcana e Equipamentos',
      content: 'Detalhe os itens consumíveis, talismãs e armaduras mandatórias antes de avançar...',
      tip: 'Mantenha frascos de estus ou cura rápida alocados no primeiro slot do cinto.',
    },
    {
      title: 'Fase 2: Padrões de Ataque e Janelas de Golpe',
      content: 'Instrua o leitor sobre os momentos ideais para rolar e desferir contra-ataques...',
      tip: '',
    },
  ]);

  const [error, setError] = useState<string | null>(null);

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        title: `Fase ${prev.length + 1}: Nova Etapa`,
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
      setError('Por favor, informe o título do manuscrito.');
      return;
    }
    if (!summary.trim()) {
      setError('Por favor, preencha o resumo da publicação.');
      return;
    }
    if (!intro.trim()) {
      setError('Por favor, preencha o preâmbulo da estratégia.');
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
      name: authorName.trim() || 'Aventureiro Sem Nome',
      avatar: user?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=scribe',
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

    navigate(`/guides/${newGuide.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Retorno */}
      <Link
        to="/guides"
        className="inline-flex items-center gap-1.5 text-xs font-cinzel text-[#8c8577] hover:text-fantasy-goldLight transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-fantasy-gold" />
        <span>Voltar aos Manuscritos</span>
      </Link>

      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-fantasy-gold text-xs font-bold font-cinzel uppercase tracking-widest">
          <Feather className="w-3.5 h-3.5 text-fantasy-gold" />
          <span>Ateliê de Escritura</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-cinzel text-[#f7eee1]">
          Publicar Novo Manuscrito
        </h1>
        <p className="text-xs sm:text-sm text-[#8c8577] font-serif max-w-2xl leading-relaxed">
          Compartilhe suas táticas com a irmandade. Seu guia será anexado imediatamente ao jogo correspondente e liberado para consagração por estrelas.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded bg-[#240d12] border border-[#661b29] flex items-center gap-2.5 text-[#e57d90] text-xs font-cinzel">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bloco 1: Informações Gerais */}
        <div className="bg-[#10131c] border border-[#232938] rounded-lg p-5 sm:p-7 space-y-4 shadow-steam-card">
          <h2 className="text-base font-bold font-cinzel text-fantasy-goldLight flex items-center gap-2 border-b border-[#1e2432] pb-2">
            <Scroll className="w-4 h-4 text-fantasy-gold" />
            <span>1. Informações Básicas do Manuscrito</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Jogo Vinculado */}
            <div className="space-y-1">
              <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
                Jogo Correspondente <span className="text-fantasy-gold">*</span>
              </label>
              <select
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full p-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] text-xs focus:outline-none focus:border-fantasy-gold font-cinzel"
              >
                {games.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Categoria */}
            <div className="space-y-1">
              <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
                Categoria da Estratégia <span className="text-fantasy-gold">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GuideCategory)}
                className="w-full p-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] text-xs focus:outline-none focus:border-fantasy-gold font-cinzel"
              >
                <option value="Detonado Completo">Detonado Completo</option>
                <option value="Builds & Equipamentos">Builds & Equipamentos</option>
                <option value="Chefes & Bosses">Chefes & Bosses</option>
                <option value="Dicas & Truques">Dicas & Truques</option>
                <option value="Segredos & Conquistas">Segredos & Conquistas</option>
              </select>
            </div>

            {/* Dificuldade */}
            <div className="space-y-1">
              <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
                Nível de Exigência
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as GuideDifficulty)}
                className="w-full p-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] text-xs focus:outline-none focus:border-fantasy-gold font-cinzel"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>

            {/* Tempo de Leitura */}
            <div className="space-y-1">
              <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
                Tempo Estimado
              </label>
              <input
                type="text"
                value={estimatedReadTime}
                onChange={(e) => setEstimatedReadTime(e.target.value)}
                placeholder="Ex: 7 min de leitura"
                className="w-full p-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] text-xs focus:outline-none focus:border-fantasy-gold font-cinzel"
              />
            </div>
          </div>

          {/* Título do Guia */}
          <div className="space-y-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              Título Honroso da Publicação <span className="text-fantasy-gold">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Como Superar o Rei Sem Nome com Armadura Leve"
              className="w-full p-2.5 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs sm:text-sm focus:outline-none focus:border-fantasy-gold font-cinzel"
            />
          </div>

          {/* Resumo */}
          <div className="space-y-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              Resumo / Sinopse do Manuscrito <span className="text-fantasy-gold">*</span>
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Breve síntese em 1 ou 2 frases sobre os ensinamentos deste guia..."
              rows={2}
              className="w-full p-2.5 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs focus:outline-none focus:border-fantasy-gold font-serif"
            />
          </div>

          {/* Autor */}
          <div className="space-y-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              Nome do Autor / Título Nobiliárquico
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Sua alcunha de guerreiro"
              className="w-full p-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] text-xs focus:outline-none focus:border-fantasy-gold font-cinzel"
            />
          </div>
        </div>

        {/* Bloco 2: Conteúdo Estruturado */}
        <div className="bg-[#10131c] border border-[#232938] rounded-lg p-5 sm:p-7 space-y-4 shadow-steam-card">
          <h2 className="text-base font-bold font-cinzel text-fantasy-goldLight flex items-center gap-2 border-b border-[#1e2432] pb-2">
            <Feather className="w-4 h-4 text-fantasy-gold" />
            <span>2. Conteúdo & Táticas Detalhadas</span>
          </h2>

          {/* Introdução */}
          <div className="space-y-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              Preâmbulo da Estratégia <span className="text-fantasy-gold">*</span>
            </label>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="Apresente os perigos do desafio, contexto do confronto e vantagens desta rota..."
              rows={3}
              className="w-full p-2.5 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] placeholder-[#665f53] text-xs focus:outline-none focus:border-fantasy-gold font-serif"
            />
          </div>

          {/* Seções Dinâmicas */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold font-cinzel text-fantasy-goldLight uppercase tracking-wide">
                Fases do Guia ({sections.length})
              </label>
              <button
                type="button"
                onClick={handleAddSection}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2b2214] border border-[#5f4924] text-fantasy-goldLight text-[11px] font-cinzel font-semibold transition-all hover:bg-[#382b18]"
              >
                <PlusCircle className="w-3 h-3 text-fantasy-gold" />
                <span>Adicionar Fase</span>
              </button>
            </div>

            {sections.map((section, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#0a0d14] border border-[#1e2432] space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold font-cinzel text-fantasy-gold uppercase tracking-wider">
                    Fase #{idx + 1}
                  </span>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      className="text-xs text-rose-400 hover:text-rose-300 p-0.5 flex items-center gap-1 font-cinzel"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Excluir</span>
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleSectionChange(idx, 'title', e.target.value)}
                  placeholder="Título da fase (ex: Esquivas do Ataque Saltado)"
                  className="w-full p-2 rounded bg-[#10131c] border border-[#262e40] text-[#eee7da] text-xs focus:outline-none focus:border-fantasy-gold font-cinzel"
                />

                <textarea
                  value={section.content}
                  onChange={(e) => handleSectionChange(idx, 'content', e.target.value)}
                  placeholder="Descreva minuciosamente os movimentos e posicionamentos..."
                  rows={2}
                  className="w-full p-2 rounded bg-[#10131c] border border-[#262e40] text-[#eee7da] text-xs focus:outline-none focus:border-fantasy-gold font-serif"
                />

                <div className="relative">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={section.tip}
                    onChange={(e) => handleSectionChange(idx, 'tip', e.target.value)}
                    placeholder="Dica Pro de mestre (opcional)"
                    className="w-full pl-8 pr-3 py-1.5 rounded bg-[#14120a] border border-[#4d3a1c] text-[11px] text-[#baa990] focus:outline-none focus:border-fantasy-gold font-serif"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="space-y-1 pt-1">
            <label className="text-[11px] font-cinzel font-semibold text-[#8c8577]">
              Palavras-chave (separadas por vírgula)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex: Boss Fight, No-Damage, Sangramento, Elden Ring"
              className="w-full p-2 rounded bg-[#0a0d14] border border-[#262e40] text-[#eee7da] text-xs focus:outline-none focus:border-fantasy-gold font-cinzel"
            />
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="flex items-center justify-end gap-3">
          <Link
            to="/guides"
            className="px-4 py-2 rounded text-[#8c8577] hover:text-white text-xs font-cinzel transition-colors"
          >
            Descartar
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#2b2214] hover:bg-[#382b18] text-fantasy-goldLight font-cinzel font-bold text-xs border border-[#6b5228] shadow-glow-gold transition-all"
          >
            <Feather className="w-3.5 h-3.5 text-fantasy-gold" />
            <span>Consagrar Manuscrito</span>
          </button>
        </div>
      </form>
    </div>
  );
};
