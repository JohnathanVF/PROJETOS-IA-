import { Game, Guide, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-default',
    name: 'GrimórioZero',
    email: 'player@gameguide.io',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
    bio: 'Caçador de cinzas, errante das Terras Intermédias e colecionador de segredos arcanos.',
    role: 'Guia Mestre',
    joinedDate: 'Janeiro de 2024',
  },
  {
    id: 'user-valkyrie',
    name: 'ValkyrieQueen',
    email: 'valk@gameguide.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Especialista em chefes sombrios, parry perfeito e no-hit runs.',
    role: 'Estrategista',
    joinedDate: 'Fevereiro de 2024',
  },
  {
    id: 'user-cyber',
    name: 'LordSombrio',
    email: 'samurai@gameguide.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Forjador de builds arcanas, feitiçarias proibidas e relíquias ocultas.',
    role: 'Membro',
    joinedDate: 'Março de 2024',
  }
];

export const INITIAL_GAMES: Game[] = [
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    slug: 'elden-ring',
    description: 'Levante-se, Maculado, e seja guiado pela graça para brandir o poder do Anel Prístino e se tornar um Lorde Prístino nas Terras Intermédias. Um épico de fantasia sombria da FromSoftware e George R. R. Martin.',
    // Authentic Elden Ring capsule art (Erdtree and Tarnished)
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2022,
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    genres: ['RPG de Ação', 'Soulslike', 'Dark Fantasy', 'Mundo Aberto'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    metacriticScore: 96,
    userRating: 4.9,
    featured: true,
  },
  {
    id: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    slug: 'baldurs-gate-3',
    description: 'Reúna seu grupo e retorne aos Reinos Esquecidos em uma narrativa épica de poder arcano, pactos profanos e sobrevivência moldada pelas regras canônicas de D&D.',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2023,
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    genres: ['RPG Clássico', 'Fantasia Medieval', 'Turnos', 'Estratégia'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    metacriticScore: 96,
    userRating: 4.9,
    featured: true,
  },
  {
    id: 'dark-souls-3',
    title: 'Dark Souls III',
    slug: 'dark-souls-3',
    description: 'Enquanto os fogos diminuem e o mundo cai em ruínas, viaje por Lothric enfrentando Lordes das Cinzas colossais em combates intensos com estética gótica e melancólica.',
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2016,
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    genres: ['Soulslike', 'Dark Fantasy', 'RPG de Ação', 'Gótico'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    metacriticScore: 89,
    userRating: 4.9,
    featured: true,
  },
  {
    id: 'the-witcher-3',
    title: 'The Witcher 3: Wild Hunt',
    slug: 'the-witcher-3',
    description: 'Encarnando Geralt de Rívia, um bruxo caçador de monstros profissionais, atravesse reinos devastados pela guerra em busca da Criança da Profecia em um mundo sombrio repleto de folclore eslavo.',
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2015,
    developer: 'CD PROJEKT RED',
    publisher: 'CD PROJEKT RED',
    genres: ['RPG de Ação', 'Fantasia Sombria', 'Mundo Aberto', 'Medieval'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'],
    metacriticScore: 93,
    userRating: 4.9,
    featured: true,
  },
  {
    id: 'hollow-knight',
    title: 'Hollow Knight',
    slug: 'hollow-knight',
    description: 'Desça até as profundezas de Hallownest, um reino de insetos subterrâneo esquecido pelo tempo. Desvende mistérios ancestrais, empunhe seu ferrão e enfrente a infecção radiante.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2017,
    developer: 'Team Cherry',
    publisher: 'Team Cherry',
    genres: ['Metroidvania', 'Gótico Sombrio', 'Plataforma', 'Indie'],
    platforms: ['PC', 'Nintendo Switch', 'PlayStation 5', 'Xbox Series X/S'],
    metacriticScore: 90,
    userRating: 4.9,
    featured: false,
  },
  {
    id: 'god-of-war-ragnarok',
    title: 'God of War Ragnarök',
    slug: 'god-of-war-ragnarok',
    description: 'Kratos e Atreus viajam pelos Nove Reinos nórdicos em meio ao Fimbulwinter, desafiando o destino e enfrentando deuses ferozes no prenúncio do fim dos tempos.',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2022,
    developer: 'Santa Monica Studio',
    publisher: 'PlayStation Publishing LLC',
    genres: ['Ação e Aventura', 'Mitologia Nórdica', 'Hack and Slash'],
    platforms: ['PlayStation 5', 'PC'],
    metacriticScore: 94,
    userRating: 4.8,
    featured: false,
  }
];

export const INITIAL_GUIDES: Guide[] = [
  {
    id: 'guide-malenia-defeat',
    gameId: 'elden-ring',
    gameTitle: 'Elden Ring',
    gameCover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    title: 'Como Derrotar Malenia, a Espada de Miquella sem Tomar Dano',
    slug: 'como-derrotar-malenia-sem-tomar-dano',
    summary: 'Análise detalhada de cada fase, padrões de ataque do Waterfowl Dance e equipamentos recomendados para quebrar a postura do chefe mais temido das Terras Intermédias.',
    category: 'Chefes & Bosses',
    difficulty: 'Avançado',
    estimatedReadTime: '8 min de leitura',
    author: {
      id: 'user-valkyrie',
      name: 'ValkyrieQueen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'No-Hit Master',
    },
    createdAt: '12 de Outubro de 2024',
    ratings: {
      average: 4.9,
      totalVotes: 48,
      userVotes: {
        'user-default': 5,
        'user-cyber': 5,
      },
    },
    views: 3420,
    tags: ['Malenia', 'Boss Fight', 'Waterfowl Dance', 'Haligtree'],
    content: {
      intro: 'Malenia é considerada o ápice dos desafios em Elden Ring. Seu golpe emblemático "Dança das Aves Aquáticas" pune qualquer erro de posicionamento. Neste grimório, destrinchamos a esquiva milimétrica e os melhores counter-attacks.',
      sections: [
        {
          title: '1. Preparação e Armamento Recomendado',
          content: 'Utilize armas com acúmulo de Sangramento (Bleed) ou Congelamento (Frostbite). Armas colossais com a Cinza de Guerra "Lion\'s Claw" conseguem desestabilizar Malenia com frequência.',
          tips: [
            'O Talismã de Escudo de Dragão Sagrado reduz drasticamente o dano físico sofrido.',
            'Traga potes de gelo congelado: jogar um pote de gelo enquanto ela salta no ar para o Waterfowl cancela a animação imediatamente!'
          ]
        },
        {
          title: '2. Sobrevivendo à Dança das Aves Aquáticas (Waterfowl Dance)',
          content: 'Quando Malenia subir no ar e congelar por 1 segundo, você tem 3 janelas: correr para longe no primeiro flurry, rolar para frente no segundo e circular no terceiro.',
          tips: [
            'Se estiver colado nela: trave a mira, dê meia volta correndo ao redor dela no sentido horário e role no último milissegundo.',
            'Não use escudo a menos que seja 100% necessário, pois os ataques dela curam mesmo bloqueados!'
          ]
        },
        {
          title: '3. Segunda Fase: Deusa da Podridão',
          content: 'No início da Fase 2, ela despenca como uma flor de lótus explosiva. Corra direto por baixo dela e saia do raio da flor. Espere a poeira tóxica baixar antes de avançar.',
          tips: [
            'Seus clones espectrais atacam em sequência ritmada: conte mentalmente 1, 2, 3 com esquivas alternadas.'
          ]
        }
      ]
    },
    comments: [
      {
        id: 'c1',
        userId: 'user-default',
        userName: 'GrimórioZero',
        userAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
        content: 'A dica do pote de gelo congelado salvou minha jornada! Cancelei o ataque 3 vezes e passei de primeira com esse macete.',
        createdAt: '14 de Outubro de 2024'
      }
    ]
  },
  {
    id: 'guide-ds3-nameless-king',
    gameId: 'dark-souls-3',
    gameTitle: 'Dark Souls III',
    gameCover: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    title: 'Guia do Rei Sem Nome: Domando a Tempestade e o Trovejante',
    slug: 'guia-rei-sem-nome-dark-souls-3',
    summary: 'Como contornar a câmera problemática no Rei das Tempestades e dominar o ritmo dos golpes atrasados do Rei Sem Nome no Pico do Arquidragão.',
    category: 'Chefes & Bosses',
    difficulty: 'Avançado',
    estimatedReadTime: '7 min de leitura',
    author: {
      id: 'user-valkyrie',
      name: 'ValkyrieQueen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'No-Hit Master',
    },
    createdAt: '16 de Outubro de 2024',
    ratings: {
      average: 5.0,
      totalVotes: 39,
      userVotes: {},
    },
    views: 2980,
    tags: ['Dark Souls 3', 'Nameless King', 'Dragon', 'Archdragon Peak'],
    content: {
      intro: 'O Rei Sem Nome pune jogadores impacientes que esquivam por reflexo. Seus ataques têm um ligeiro atraso (delayed swings) desenhado especificamente para pegar o fim da sua rolagem.',
      sections: [
        {
          title: '1. Fase 1: Rei das Tempestades (Wyvern)',
          content: 'Não trave a mira no pássaro! Trave a mira apenas na cabeça dele quando ele aterrissar. Golpear as pernas causa dano ínfimo.',
          tips: [
            'Use armas infundidas com Raio ou Resina de Pinho Dourada na primeira fase: o Wyvern é extremamente fraco a dano elétrico.'
          ]
        },
        {
          title: '2. Fase 2: O Combate Solo',
          content: 'Na segunda fase, ele passa a absorver raio e ganha fraqueza severa a Fogo e Trevas (Dark). Espere o final da animação de cada estocada antes de esquivar.',
          tips: [
            'Mantenha sempre distância média para forçar o ataque saltado dele, que oferece a maior janela de punição segura do jogo.'
          ]
        }
      ]
    },
    comments: []
  },
  {
    id: 'guide-bg3-bard-paladin',
    gameId: 'baldurs-gate-3',
    gameTitle: "Baldur's Gate 3",
    gameCover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
    title: 'A Build Mais Quebrada: Paladino / Bardo da Espada (Smite Divino Supremo)',
    slug: 'build-paladino-bardo-espada-smite-supremo',
    summary: 'Aprenda a forjar o guerreiro híbrido definitivo capaz de desferir mais de 200 de dano crítico por turno e dominar todos os testes de diálogo com carisma absoluto.',
    category: 'Builds & Equipamentos',
    difficulty: 'Intermediário',
    estimatedReadTime: '6 min de leitura',
    author: {
      id: 'user-default',
      name: 'GrimórioZero',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
      badge: 'Guia Mestre',
    },
    createdAt: '18 de Outubro de 2024',
    ratings: {
      average: 4.8,
      totalVotes: 32,
      userVotes: {
        'user-valkyrie': 5,
      },
    },
    views: 2890,
    tags: ['Multiclasse', 'Bardo', 'Paladino', 'Smite', 'Build Op'],
    content: {
      intro: 'Combinar os slots mágicos de alto círculo do Bardo das Espadas com a destruição pura dos Golpes Divinos (Divine Smites) do Paladino cria o personagem mais equilibrado e letal de Faerûn.',
      sections: [
        {
          title: '1. Progressão de Níveis (10 Bardo / 2 Paladino)',
          content: 'Inicie com 2 níveis de Paladino para garantir proficiência em armaduras pesadas e acesso ao Divine Smite. Prossiga com Bardo até o nível 10 para obter Ataque Extra e Segredos Mágicos.',
          tips: [
            'Atributos ideais: 16 Força, 16 Carisma, 14 Constituição.',
            'O Florescer Defensivo confere +4 de CA imediatamente enquanto ataca!'
          ]
        }
      ]
    },
    comments: []
  },
  {
    id: 'guide-hollow-knight-pantheon',
    gameId: 'hollow-knight',
    gameTitle: 'Hollow Knight',
    gameCover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    title: 'Estratégias para Conquistar o Panteão de Hallownest (P5)',
    slug: 'estrategias-panteao-de-hallownest-p5',
    summary: 'Guia de sobrevivência para a maior prova de resistência de Hallownest: combinações de amuletos entre bancos, técnicas contra Pure Vessel e Absolute Radiance.',
    category: 'Detonado Completo',
    difficulty: 'Avançado',
    estimatedReadTime: '10 min de leitura',
    author: {
      id: 'user-valkyrie',
      name: 'ValkyrieQueen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'No-Hit Master',
    },
    createdAt: '24 de Outubro de 2024',
    ratings: {
      average: 5.0,
      totalVotes: 64,
      userVotes: {
        'user-default': 5,
      },
    },
    views: 4120,
    tags: ['Pantheon 5', 'Absolute Radiance', 'Pure Vessel', 'Charms'],
    content: {
      intro: 'O Panteão de Hallownest reúne todos os 42 chefes de forma ininterrupta. Dominar as transições de amuletos nos bancos de descanso é essencial para alcançar o final verdadeiro.',
      sections: [
        {
          title: '1. O Conjunto de Amuletos Padrão',
          content: 'Força Inquebrável + Ferrão Rápido + Pedra do Xamã + Glória do Mestre do Ferrão formam a espinha dorsal de DPS físico e mágico equilibrado.',
          tips: [
            'Use Abyssal Shriek direto por baixo da Radiance para derreter a vida em poucos segundos.'
          ]
        }
      ]
    },
    comments: []
  }
];
