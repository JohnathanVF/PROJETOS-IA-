import { Game, Guide, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-default',
    name: 'GamerZero',
    email: 'player@gameguide.io',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
    bio: 'Explorador de RPGs e caçador de platinas em Soulslikes.',
    role: 'Guia Mestre',
    joinedDate: 'Janeiro de 2024',
  },
  {
    id: 'user-valkyrie',
    name: 'ValkyrieQueen',
    email: 'valk@gameguide.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Especialista em chefes e no-hit runs.',
    role: 'Estrategista',
    joinedDate: 'Fevereiro de 2024',
  },
  {
    id: 'user-cyber',
    name: 'NeoSamurai',
    email: 'samurai@gameguide.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Otimizador de builds cyberpunk e mundos abertos.',
    role: 'Membro',
    joinedDate: 'Março de 2024',
  }
];

export const INITIAL_GAMES: Game[] = [
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    slug: 'elden-ring',
    description: 'Levante-se, Maculado, e seja guiado pela graça para brandir o poder do Anel Prístino e se tornar um Lorde Prístino nas Terras Intermédias. Um RPG de ação lendário da FromSoftware e George R. R. Martin.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2022,
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    genres: ['RPG de Ação', 'Soulslike', 'Mundo Aberto', 'Fantasia Sombria'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    metacriticScore: 96,
    userRating: 4.9,
    featured: true,
  },
  {
    id: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    slug: 'baldurs-gate-3',
    description: 'Reúna seu grupo e retorne aos Reinos Esquecidos em uma história épica de companheirismo e traição, sacrifício e sobrevivência, e a atração pelo poder supremo moldada pelo universo de D&D.',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2023,
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    genres: ['RPG Clássico', 'Estratégia por Turnos', 'Aventura', 'Fantasia'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    metacriticScore: 96,
    userRating: 4.9,
    featured: true,
  },
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077: Phantom Liberty',
    slug: 'cyberpunk-2077',
    description: 'Mergulhe em Night City como V, um mercenário cibernético envolvido em uma teia de intrigas de espionagem, corporações predatórias e a luta incansável pela própria sobrevivência.',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2023,
    developer: 'CD PROJEKT RED',
    publisher: 'CD PROJEKT RED',
    genres: ['RPG de Ação', 'Cyberpunk', 'Ficção Científica', 'Mundo Aberto'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    metacriticScore: 89,
    userRating: 4.7,
    featured: true,
  },
  {
    id: 'hollow-knight',
    title: 'Hollow Knight',
    slug: 'hollow-knight',
    description: 'Forje seu próprio caminho através de Hallownest, um vasto reino arruinado repleto de insetos e heróis esquecidos. Explore cavernas sinuosas e enfrente criaturas corrompidas neste clássico metroidvania.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2017,
    developer: 'Team Cherry',
    publisher: 'Team Cherry',
    genres: ['Metroidvania', 'Plataforma', 'Ação', 'Indie'],
    platforms: ['PC', 'Nintendo Switch', 'PlayStation 5', 'Xbox Series X/S'],
    metacriticScore: 90,
    userRating: 4.9,
    featured: false,
  },
  {
    id: 'god-of-war-ragnarok',
    title: 'God of War Ragnarök',
    slug: 'god-of-war-ragnarok',
    description: 'Kratos e Atreus embarcam em uma jornada mítica pelos Nove Reinos em busca de respostas, enquanto as forças de Asgard se preparam para uma batalha profetizada que acabará com o mundo.',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2022,
    developer: 'Santa Monica Studio',
    publisher: 'PlayStation Publishing LLC',
    genres: ['Ação e Aventura', 'Hack and Slash', 'Mitologia Nórdica'],
    platforms: ['PlayStation 5', 'PC'],
    metacriticScore: 94,
    userRating: 4.8,
    featured: true,
  },
  {
    id: 'the-witcher-3',
    title: 'The Witcher 3: Wild Hunt',
    slug: 'the-witcher-3',
    description: 'Você é Geralt de Rívia, mercenário matador de monstros. Em um continente devastado pela guerra e infestado de feras, sua missão atual é rastrear Ciri, a Criança da Profecia.',
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    releaseYear: 2015,
    developer: 'CD PROJEKT RED',
    publisher: 'CD PROJEKT RED',
    genres: ['RPG de Ação', 'Mundo Aberto', 'Fantasia Medieval'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'],
    metacriticScore: 93,
    userRating: 4.9,
    featured: false,
  }
];

export const INITIAL_GUIDES: Guide[] = [
  {
    id: 'guide-malenia-defeat',
    gameId: 'elden-ring',
    gameTitle: 'Elden Ring',
    gameCover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    title: 'Como Derrotar Malenia, a Espada de Miquella sem Tomar Dano',
    slug: 'como-derrotar-malenia-sem-tomar-dano',
    summary: 'Análise detalhada de cada fase, padrões de ataque do Waterfowl Dance e equipamentos recomendados para quebrar a postura do chefe mais difícil de Elden Ring.',
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
      intro: 'Malenia é considerada o ápice dos desafios em Elden Ring. Seu golpe emblemático "Dança das Aves Aquáticas" pune qualquer erro de posicionamento. Neste guia, destrinchamos a esquiva milimétrica e os melhores counter-attacks.',
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
        userName: 'GamerZero',
        userAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80',
        content: 'A dica do pote de gelo congelado salvou minha sanidade! Cancelei o ataque 3 vezes e passei de primeira com esse macete.',
        createdAt: '14 de Outubro de 2024'
      },
      {
        id: 'c2',
        userId: 'user-cyber',
        userName: 'NeoSamurai',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        content: 'Guia perfeito, visual e direto ao ponto. Cinco estrelas merecidíssimas!',
        createdAt: '15 de Outubro de 2024'
      }
    ]
  },
  {
    id: 'guide-bg3-bard-paladin',
    gameId: 'baldurs-gate-3',
    gameTitle: "Baldur's Gate 3",
    gameCover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    title: 'A Build Mais Quebrada: Paladino / Bardo da Espada (Smite Supremo)',
    slug: 'build-paladino-bardo-espada-smite-supremo',
    summary: 'Aprenda a criar o guerreiro híbrido definitivo capaz de causar mais de 200 de dano crítico por turno e dominar todos os testes de diálogo com carisma maximo.',
    category: 'Builds & Equipamentos',
    difficulty: 'Intermediário',
    estimatedReadTime: '6 min de leitura',
    author: {
      id: 'user-default',
      name: 'GamerZero',
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
      intro: 'Combinar a versatilidade de magias de alto nível do Bardo do Colégio das Espadas com a destruição pura dos Golpes Divinos (Divine Smites) do Paladino cria o personagem mais completo do jogo.',
      sections: [
        {
          title: '1. Distribuição de Classes (10 Bardo / 2 Paladino)',
          content: 'Comece com 1 nível de Paladino para proficiência em armaduras pesadas e armas marciais. Suba até o nível 6 de Bardo para garantir Ataque Extra e Florescer Defensivo.',
          tips: [
            'Atributos ideais: 16 Força (ou use Poções de Força do Gigante), 16 Carisma, 14 Constituição.',
            'O Florescer Defensivo adiciona +4 à sua Classe de Armadura enquanto ataca!'
          ]
        },
        {
          title: '2. Equipamentos Mandatórios no Ato 2 e 3',
          content: 'Equipe o Anel do Bandido Místico (Cast de ilusões como Ação Bônus após acertar ataques) e o Elmo da Acuidade Arcana para elevar sua DC mágica a níveis intransponíveis.',
          tips: [
            'Use "Hold Person" ou "Hold Monster" com 100% de chance de acerto e combe com Golpes Críticos automáticos garantidos.'
          ]
        }
      ]
    },
    comments: [
      {
        id: 'c3',
        userId: 'user-valkyrie',
        userName: 'ValkyrieQueen',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        content: 'Derrubei o Raphael no Ato 3 no modo Honra em apenas dois turnos com essa build. Insano!',
        createdAt: '19 de Outubro de 2024'
      }
    ]
  },
  {
    id: 'guide-cyberpunk-netrunner',
    gameId: 'cyberpunk-2077',
    gameTitle: 'Cyberpunk 2077: Phantom Liberty',
    gameCover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    title: 'Guia Definitivo do Netrunner Fantasma: Elimine Prédios Inteiros Sem Entrar',
    slug: 'guia-netrunner-fantasma-phantom-liberty',
    summary: 'A sinergia entre o Cyberdeck Militech Canto Mk.6, Overclock e infecções cibernéticas em cadeia para limpar bases inimigas através de câmeras de segurança.',
    category: 'Builds & Equipamentos',
    difficulty: 'Intermediário',
    estimatedReadTime: '7 min de leitura',
    author: {
      id: 'user-cyber',
      name: 'NeoSamurai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: 'Netrunner Prime',
    },
    createdAt: '22 de Outubro de 2024',
    ratings: {
      average: 4.7,
      totalVotes: 21,
      userVotes: {},
    },
    views: 1950,
    tags: ['Netrunner', 'Quickhacks', 'Dogtown', 'Phantom Liberty'],
    content: {
      intro: 'No update 2.0 e na expansão Phantom Liberty, a árvore de Inteligência foi reestruturada para premiar sequências devastadoras de quickhacks e manipulação de saúde via Overclock.',
      sections: [
        {
          title: '1. O Combo Fundamental de Quickhacks',
          content: 'Nunca dispare dano cru direto. Inicie sempre com "Cyberware Malfunction" seguido por "Short Circuit" ou "Synapse Burnout". O dano escala exponencialmente para cada debuff ativo no alvo.',
          tips: [
            'Use "Contagion" + quickhack de calor ou explosão para detonar salas inteiras simultaneamente.'
          ]
        },
        {
          title: '2. Gerenciamento de RAM e Vida com Overclock',
          content: 'Quando sua memória RAM esgotar, o Overclock drena sua barra de vida para continuar conjurando hacks. Use o implante Blood Pump e Biomonitor para autocura instantânea sem apertar botões.',
          tips: [
            'A habilidade Sublimation restaura RAM a cada segundo do Overclock ativo.'
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
    summary: 'Guia de sobrevivência para a maior prova de resistência de Hollow Knight: combinações de amuletos entre bancos, técnicas contra Pure Vessel e Absolute Radiance.',
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
        'user-cyber': 5,
      },
    },
    views: 4120,
    tags: ['Pantheon 5', 'Absolute Radiance', 'Pure Vessel', 'Charms'],
    content: {
      intro: 'O Panteão de Hallownest reúne todos os 42 chefes do jogo de forma ininterrupta. Dominar as transições de amuletos nos bancos de descanso é essencial para alcançar o final verdadeiro.',
      sections: [
        {
          title: '1. O Conjunto de Amuletos Padrão',
          content: 'Força Inquebrável + Ferrão Rápido + Pedra do Xamã + Glória do Mestre do Ferrão formam a espinha dorsal de DPS físico e mágico equilibrado.',
          tips: [
            'Nos bancos anteriores à Nightmare King Grimm e Pure Vessel, você pode trocar a Glória pelo Apanhador de Almas se preferir foco em cura.'
          ]
        },
        {
          title: '2. A Fase Final da Absolute Radiance',
          content: 'Na subida final, desvie dos feixes verticais antes de saltar. Nunca salte às cegas. Na fase das duas plataformas, fique na plataforma mais baixa e espere ela teleportar até você.',
          tips: [
            'Pule e lance Abyssal Shriek direto por baixo dela para derreter a vida em segundos.'
          ]
        }
      ]
    },
    comments: []
  }
];
