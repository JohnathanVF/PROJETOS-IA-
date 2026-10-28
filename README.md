# 🎮 GameGuide — Biblioteca de Jogos & Fórum de Guias da Comunidade

Uma plataforma web moderna com estética gamer escura desenvolvida para que jogadores possam descobrir títulos lendários, dominar desafios complexos e compartilhar estratégias, detonados, builds e soluções avaliadas pela comunidade.

---

## 🚀 Tecnologias Utilizadas & Justificativas

- **React 18 & TypeScript**: Componentização modular, renderização reativa e tipagem estrita para modelos de jogos, publicações, comentários e avaliações.
- **Vite 6**: Ferramenta de build de última geração com inicialização instantânea e Hot Module Replacement (HMR).
- **Tailwind CSS**: Estilização moderna com paleta gamer escura (*deep slate/zinc* com toques de roxo elétrico, ciano neon e esmeralda), efeitos de brilho (*glow*), desfoque translúcido (*glassmorphism*) e responsividade total em desktop e mobile.
- **Lucide React**: Biblioteca de ícones moderna e leve para interfaces gamer (gamepads, espadas, estrelas, troféus, filtros e livros).
- **React Router DOM v6**: Roteamento SPA fluído sem recarregamentos de página.
- **Context API & Data Engine Reativo**: Gerenciamento de estado global com persistência local instantânea via `localStorage`.

---

## 📁 Estrutura do Projeto

```
games_guides/
├── index.html                   # Ponto de entrada HTML com fontes e meta gamer
├── package.json                 # Dependências e scripts de execução
├── tsconfig.json                # Configuração do TypeScript
├── vite.config.ts               # Configuração do Vite com plugin React
├── tailwind.config.js           # Cores customizadas gamer e sombras glow
├── postcss.config.js            # Processamento de estilos PostCSS
├── src/
│   ├── main.tsx                 # Inicialização do React com Providers
│   ├── App.tsx                  # Definição de rotas da aplicação e layout base
│   ├── index.css                # Estilos globais gamer e diretivas Tailwind
│   ├── types/
│   │   └── index.ts             # Interfaces TypeScript (Game, Guide, User, Rating, Comment)
│   ├── data/
│   │   └── mockData.ts          # Dataset inicial com jogos aclamados e guias ricos
│   ├── context/
│   │   ├── AuthContext.tsx      # Gerenciamento de sessão de usuário e persistência
│   │   └── GameGuideContext.tsx # Catálogo de jogos, guias, avaliações 1-5 estrelas e comentários
│   ├── components/
│   │   ├── Navbar.tsx           # Barra de navegação gamer com menu responsivo e status de login
│   │   ├── Footer.tsx           # Rodapé informativo com métricas e transparência arquitetural
│   │   ├── GameCard.tsx         # Card de jogo com capas, plataformas, nota e guias vinculados
│   │   ├── GuideCard.tsx        # Card de guia com autor, categoria, tempo e estrelas
│   │   ├── StarRating.tsx       # Componente interativo de avaliação de 1 a 5 estrelas
│   │   └── Badge.tsx            # Badges coloridos de categoria e dificuldade
│   └── pages/
│       ├── Home.tsx             # Página inicial com hero, busca instantânea e destaques
│       ├── GameCatalog.tsx      # Catálogo com filtros de plataforma, gênero e ordenação
│       ├── GameDetail.tsx       # Página do jogo com sinopse, ficha técnica e guias daquele jogo
│       ├── GuidesFeed.tsx       # Fórum de guias com busca por termos, dificuldade e tipo
│       ├── GuideDetail.tsx      # Leitura estruturada do guia, avaliação interativa e comentários
│       ├── CreateGuide.tsx      # Formulário dinâmico para publicação de novos guias
│       ├── Login.tsx            # Página de login com atalhos de contas de teste
│       ├── Register.tsx         # Cadastro de novo usuário gamer
│       └── Profile.tsx          # Perfil do jogador com bio editável e histórico de guias
```

---

## ⚡ Como Iniciar o Projeto

### Pré-requisitos
- Node.js instalado (v18 ou superior)
- npm ou yarn

### Passos de Instalação e Execução

1. **Instalar as dependências** (caso ainda não tenha feito):
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em: `http://localhost:5173`

3. **Gerar build de produção**:
   ```bash
   npm run build
   ```

4. **Pré-visualizar o build de produção**:
   ```bash
   npm run preview
   ```

---

## ✨ Funcionalidades Prontas e Entregues

1. **Página Inicial Gamer (Home)**:
   - Hero dinâmico com iluminação neon, estatísticas e barra de busca instantânea.
   - Vitrine de jogos em destaque e guias mais bem avaliados pela comunidade.
   - Chamadas diretas para publicação de novos guias.

2. **Catálogo de Jogos com Filtros & Busca**:
   - Busca em tempo real por título, desenvolvedor ou gênero.
   - Filtros por plataformas (PC, PlayStation 5, Xbox Series X/S, Nintendo Switch).
   - Filtros por gêneros e ordenação por nota da comunidade, nome (A-Z) ou ano de lançamento.

3. **Página Exclusiva para Cada Jogo (`/games/:id`)**:
   - Banner cinematográfico, capa em alta resolução e ficha técnica (desenvolvedora, ano, notas Metacritic e de usuários).
   - Sinopse completa do jogo.
   - Aba com todos os guias da comunidade filtrados exclusivamente para aquele título e atalho para criar novo guia.

4. **Fórum Comunitário de Guias (`/guides`)**:
   - Feed completo de guias com filtros cruzados (Jogo, Categoria, Dificuldade e Ordenação por estrelas ou visualizações).
   - Categorias especializadas: *Detonado Completo*, *Builds & Equipamentos*, *Chefes & Bosses*, *Dicas & Truques*, *Segredos & Conquistas*.

5. **Página de Leitura de Guia com Avaliação por Estrelas (`/guides/:id`)**:
   - Conteúdo estruturado por tópicos com blocos de "Dica de Especialista" (*Pro-tips*).
   - **Sistema interativo de avaliação de 1 a 5 estrelas**:
     - O usuário pode votar ou atualizar seu voto com cálculo imediato da nova média ponderada.
     - Indicador da sua nota pessoal e quantidade total de votos.
   - Fórum de comentários integrado para dúvidas e discussões em tempo real.
   - Botão para copiar link de compartilhamento.

6. **Editor e Publicador de Guias (`/create-guide`)**:
   - Seleção do jogo correspondente na biblioteca.
   - Definição de categoria, nível de dificuldade, tempo de leitura e resumo.
   - Adição dinâmica de seções com títulos, instruções e dicas destacadas.
   - Publicação instantânea que fica disponível imediatamente no feed e na página do jogo.

7. **Páginas de Login & Cadastro (`/login` e `/register`)**:
   - Interface gamer estilizada com validação de campos.
   - Seletor de 1 clique para alternar entre contas de teste pré-configuradas (*GamerZero*, *ValkyrieQueen*, *NeoSamurai*).
   - Cadastro de novos membros com geração automática de avatar.

8. **Perfil de Usuário (`/profile`)**:
   - Painel do jogador com bio editável, contagem de guias publicados e média de estrelas recebidas.
   - Lista gerenciável de todas as publicações do usuário logado.

---

## 🔌 Transparência: Camada Local vs. Banco de Dados em Produção

Para que o projeto funcione **100% de forma imediata e sem dependências externas de chaves de API**, todas as operações utilizam uma camada de dados reativa com persistência no `LocalStorage`:
- Autenticação e sessões de usuários;
- Adição de novos guias;
- Votos e cálculo de médias das avaliações de 1 a 5 estrelas;
- Comentários em guias;
- Atualização de biografia do perfil.

### Como conectar a um Banco de Dados Real em Produção:
Quando desejar migrar para produção com backend compartilhado entre múltiplos usuários remotos:
- **Autenticação**: Substituir as chamadas de `AuthContext.tsx` pelo SDK do **Supabase Auth**, **Firebase Authentication** ou sua API REST com tokens JWT.
- **Banco de Dados Relacional**: Criar tabelas correspondentes às interfaces em `src/types/index.ts` em **PostgreSQL / MySQL** (usando Prisma, Drizzle ou Supabase):
  - Tabela `games` (`id`, `title`, `slug`, `cover_image`, `banner_image`, `release_year`, etc.)
  - Tabela `guides` (`id`, `game_id`, `author_id`, `title`, `slug`, `category`, `difficulty`, `content_json`, etc.)
  - Tabela `guide_ratings` (`id`, `guide_id`, `user_id`, `rating`, `created_at` com restrição UNIQUE em `[guide_id, user_id]`)
  - Tabela `guide_comments` (`id`, `guide_id`, `user_id`, `content`, `created_at`)
- **API**: Substituir os métodos de escrita em `GameGuideContext.tsx` por requisições `fetch` / `axios` ou chamadas diretas ao cliente do banco de dados.

