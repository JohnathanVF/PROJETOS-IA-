import React, { createContext, useContext, useState, useEffect } from 'react';
import { Game, Guide, GuideComment } from '../types';
import { INITIAL_GAMES, INITIAL_GUIDES } from '../data/mockData';

interface NewGuideInput {
  gameId: string;
  title: string;
  summary: string;
  category: Guide['category'];
  difficulty: Guide['difficulty'];
  estimatedReadTime: string;
  tags: string[];
  content: Guide['content'];
  author: Guide['author'];
}

interface GameGuideContextType {
  games: Game[];
  guides: Guide[];
  getGameById: (id: string) => Game | undefined;
  getGuideById: (id: string) => Guide | undefined;
  getGuidesByGameId: (gameId: string) => Guide[];
  rateGuide: (guideId: string, rating: number, userId: string) => void;
  getUserRatingForGuide: (guideId: string, userId: string) => number;
  addGuide: (guideData: NewGuideInput) => Guide;
  addComment: (guideId: string, commentText: string, user: { id: string; name: string; avatar: string }) => void;
  incrementGuideViews: (guideId: string) => void;
}

const GameGuideContext = createContext<GameGuideContextType | undefined>(undefined);

const STORAGE_KEY_GAMES = 'gameguide_games_data_v1';
const STORAGE_KEY_GUIDES = 'gameguide_guides_data_v1';

export const GameGuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games] = useState<Game[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GAMES);
      return saved ? JSON.parse(saved) : INITIAL_GAMES;
    } catch {
      return INITIAL_GAMES;
    }
  });

  const [guides, setGuides] = useState<Guide[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GUIDES);
      return saved ? JSON.parse(saved) : INITIAL_GUIDES;
    } catch {
      return INITIAL_GUIDES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GUIDES, JSON.stringify(guides));
    } catch (e) {
      console.error('Falha ao persistir guias no localStorage', e);
    }
  }, [guides]);

  const getGameById = (id: string) => {
    return games.find((g) => g.id === id || g.slug === id);
  };

  const getGuideById = (id: string) => {
    return guides.find((g) => g.id === id || g.slug === id);
  };

  const getGuidesByGameId = (gameId: string) => {
    return guides.filter((g) => g.gameId === gameId);
  };

  const getUserRatingForGuide = (guideId: string, userId: string): number => {
    const guide = guides.find((g) => g.id === guideId);
    if (!guide || !guide.ratings.userVotes) return 0;
    return guide.ratings.userVotes[userId] || 0;
  };

  const rateGuide = (guideId: string, rating: number, userId: string) => {
    setGuides((prevGuides) =>
      prevGuides.map((guide) => {
        if (guide.id !== guideId) return guide;

        const currentVotes = { ...(guide.ratings.userVotes || {}) };
        currentVotes[userId] = rating;

        const voteValues = Object.values(currentVotes);
        const totalVotes = voteValues.length;
        const sum = voteValues.reduce((acc, v) => acc + v, 0);
        const average = totalVotes > 0 ? Number((sum / totalVotes).toFixed(1)) : 0;

        return {
          ...guide,
          ratings: {
            average,
            totalVotes,
            userVotes: currentVotes,
          },
        };
      })
    );
  };

  const addGuide = (guideInput: NewGuideInput): Guide => {
    const targetGame = games.find((g) => g.id === guideInput.gameId);
    const newSlug = guideInput.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newGuide: Guide = {
      id: `guide-${Date.now()}`,
      gameId: guideInput.gameId,
      gameTitle: targetGame ? targetGame.title : 'Jogo Desconhecido',
      gameCover: targetGame ? targetGame.coverImage : 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
      title: guideInput.title,
      slug: `${newSlug}-${Date.now().toString().slice(-4)}`,
      summary: guideInput.summary,
      category: guideInput.category,
      difficulty: guideInput.difficulty,
      estimatedReadTime: guideInput.estimatedReadTime || '5 min de leitura',
      author: guideInput.author,
      createdAt: 'Hoje',
      ratings: {
        average: 5.0,
        totalVotes: 1,
        userVotes: {
          [guideInput.author.id]: 5,
        },
      },
      content: guideInput.content,
      tags: guideInput.tags.length > 0 ? guideInput.tags : ['Guia', 'Dicas'],
      views: 1,
      comments: [],
    };

    setGuides((prev) => [newGuide, ...prev]);
    return newGuide;
  };

  const addComment = (
    guideId: string,
    commentText: string,
    user: { id: string; name: string; avatar: string }
  ) => {
    const newComment: GuideComment = {
      id: `comment-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: commentText,
      createdAt: 'Agora mesmo',
    };

    setGuides((prev) =>
      prev.map((guide) => {
        if (guide.id !== guideId) return guide;
        return {
          ...guide,
          comments: [newComment, ...guide.comments],
        };
      })
    );
  };

  const incrementGuideViews = (guideId: string) => {
    setGuides((prev) =>
      prev.map((g) => (g.id === guideId ? { ...g, views: g.views + 1 } : g))
    );
  };

  return (
    <GameGuideContext.Provider
      value={{
        games,
        guides,
        getGameById,
        getGuideById,
        getGuidesByGameId,
        rateGuide,
        getUserRatingForGuide,
        addGuide,
        addComment,
        incrementGuideViews,
      }}
    >
      {children}
    </GameGuideContext.Provider>
  );
};

export const useGameGuide = () => {
  const context = useContext(GameGuideContext);
  if (!context) {
    throw new Error('useGameGuide deve ser utilizado dentro de um GameGuideProvider');
  }
  return context;
};
