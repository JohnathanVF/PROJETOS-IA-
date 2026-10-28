export type Platform = 'PC' | 'PlayStation 5' | 'Xbox Series X/S' | 'Nintendo Switch';

export type GuideCategory = 
  | 'Detonado Completo' 
  | 'Builds & Equipamentos' 
  | 'Dicas & Truques' 
  | 'Chefes & Bosses' 
  | 'Segredos & Conquistas';

export type GuideDifficulty = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  bannerImage: string;
  releaseYear: number;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: Platform[];
  metacriticScore: number;
  userRating: number;
  featured?: boolean;
}

export interface GuideSection {
  title: string;
  content: string;
  tips?: string[];
}

export interface GuideComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface GuideRatingData {
  average: number;
  totalVotes: number;
  userVotes: Record<string, number>; // userId -> rating (1 to 5)
}

export interface Guide {
  id: string;
  gameId: string;
  gameTitle: string;
  gameCover: string;
  title: string;
  slug: string;
  summary: string;
  category: GuideCategory;
  difficulty: GuideDifficulty;
  estimatedReadTime: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    badge?: string;
  };
  createdAt: string;
  ratings: GuideRatingData;
  content: {
    intro: string;
    sections: GuideSection[];
  };
  tags: string[];
  views: number;
  comments: GuideComment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  role: 'Membro' | 'Guia Mestre' | 'Estrategista';
  joinedDate: string;
}
