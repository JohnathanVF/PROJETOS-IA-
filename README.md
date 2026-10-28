<div align="center">

# ⚔️ GAMEGUIDE
### *Grimório Gamer & Fórum de Estratégias Comunitárias*

[![Author](https://img.shields.io/badge/Author-JohnathanVF-c5a059?style=for-the-badge&logo=github)](https://github.com/JohnathanVF)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br />

> **Uma plataforma web completa com temática Dark Fantasy Vintage e cards no formato minimalista de cápsulas da Steam, unindo uma biblioteca imersiva de jogos a um fórum comunitário de detonados, builds e soluções com avaliação por estrelas.**

---

</div>

## 🗡️ Visão Geral do Projeto

O **GameGuide** foi forjado para ser o ponto de encontro definitivo entre jogadores apaixonados e mestres estrategistas. A plataforma combina uma estética sombria clássica (inspirada em universos como *Dark Souls, Elden Ring, Baldur's Gate e The Witcher*) com a praticidade e organização visual das bibliotecas digitais modernas.

### 🌟 Principais Destaques

- **🏰 Estética Dark Fantasy Vintage**: Paleta elegante em grafite profundo, ardósia e toques nobres de ouro envelhecido e bronze, com tipografia majestosa nas fontes *Cinzel* e *Crimson Pro*.
- **🎮 Cards de Jogos Estilo Cápsula Steam**: Cards compactos e horizontais inspirados no padrão de storefront da Steam, com artes autênticas de alta definição, etiquetas de gênero e contadores de guias.
- **📜 Grimórios & Guias Estruturados**: Criação e leitura de guias passo a passo, incluindo caixas de destaque para *"Dicas de Especialista"* (*Pro-Tips*).
- **⭐ Sistema de Avaliação Interativo (1 a 5 Estrelas)**: Permite que qualquer membro da guilda vote ou altere sua nota, recalculando a média ponderada e os votos em tempo real.
- **💬 Fórum Comunitário Integrado**: Seção de comentários em tempo real para debate de táticas e esclarecimento de dúvidas.
- **🛡️ Portal do Membro & Perfil**: Sistema de autenticação (com atalhos rápidos de teste para demonstração) e perfil pessoal com histórico de guias e média de notas recebidas.

---

## 🏛️ Arquitetura & Tecnologias

| Tecnologia | Finalidade no Projeto |
| :--- | :--- |
| **React 18** | Arquitetura componentizada, reatividade instantânea e manipulação eficiente do DOM. |
| **TypeScript 5** | Tipagem estrita de modelos de dados (`Game`, `Guide`, `User`, `RatingData`, `Comment`). |
| **Vite 6** | Bundler ultra veloz com suporte a HMR (*Hot Module Replacement*) e compilação otimizada. |
| **Tailwind CSS 3** | Design system customizado com tema Dark Fantasy (sombras glow, bordas em ouro e pergaminho). |
| **Lucide Icons** | Conjunto coeso de ícones medievais e gamers (escudos, pergaminhos, penas, estrelas e chamas). |
| **React Router 6** | Navegação SPA (*Single Page Application*) com rotas dinâmicas e retorno automático ao topo. |
| **Data Engine (LocalStorage)** | Camada de dados persistente no navegador, dispensando configuração de bancos externos para execução imediata. |

---

## 📁 Estrutura de Pastas & Arquivos

```
games_guides/
├── index.html                   # Estrutura HTML com carregamento de fontes clássicas
├── package.json                 # Manifesto de dependências e scripts de execução
├── tsconfig.json                # Configuração de compilação estrita do TypeScript
├── tailwind.config.js           # Design tokens: paleta dark fantasy e efeitos vintage
├── postcss.config.js            # Pré-processamento PostCSS
├── LICENSE                      # Licença de código aberto MIT
├── README.md                    # Documentação técnica e guia do desenvolvedor
└── src/
    ├── main.tsx                 # Ponto de montagem com BrowserRouter e Context Providers
    ├── App.tsx                  # Definição e roteamento das páginas da aplicação
    ├── index.css                # Diretivas Tailwind e estilização de pergaminho/scrollbars
    ├── types/
    │   └── index.ts             # Interfaces TypeScript estritas
    ├── data/
    │   └── mockData.ts          # Dataset inicial com obras aclamadas e manuscritos
    ├── context/
    │   ├── AuthContext.tsx      # Gerenciamento de sessão de usuário com persistência
    │   └── GameGuideContext.tsx # Estado global de jogos, guias, votos de estrelas e comentários
    ├── components/
    │   ├── Navbar.tsx           # Barra de navegação com brasão heráldico e menu responsivo
    │   ├── Footer.tsx           # Rodapé em estilo arquivo ancestral com estatísticas
    │   ├── GameCard.tsx         # Cápsula minimalista de jogo estilo Steam
    │   ├── GuideCard.tsx        # Card de manuscrito com selos de cera e autor
    │   ├── StarRating.tsx       # Componente interativo de consagração de 1 a 5 estrelas
    │   └── Badge.tsx            # Selos de categoria e níveis de exigência
    └── pages/
        ├── Home.tsx             # Salão principal com busca rápida e vitrines
        ├── GameCatalog.tsx      # Catálogo de cápsulas com filtros de gênero e plataforma
        ├── GameDetail.tsx       # Página do jogo com sinopse, especificações e guias dedicados
        ├── GuidesFeed.tsx       # Fórum de manuscritos com filtros por tipo e dificuldade
        ├── GuideDetail.tsx      # Leitura estruturada, avaliação interativa e comentários
        ├── CreateGuide.tsx      # Ateliê de escritura para publicação de novos guias
        ├── Login.tsx            # Portal da guilda com acesso rápido em 1 clique
        ├── Register.tsx         # Cadastro de novo cavaleiro
        └── Profile.tsx          # Perfil do jogador com bio editável e histórico
```

---

## ⚡ Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (ou yarn / pnpm)

### Passo a Passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/JohnathanVF/PROJETOS-IA.git
   cd PROJETOS-IA
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse a aplicação em seu navegador através do endereço: **`http://localhost:5173`**

4. **Gerar o build de produção**:
   ```bash
   npm run build
   ```

5. **Visualizar a versão de produção**:
   ```bash
   npm run preview
   ```

---

## 🗺️ Visão de Futuro: Conexão com Banco de Dados em Produção

O projeto foi intencionalmente construído com uma camada desacoplada via `Context API` e `LocalStorage`, permitindo que qualquer pessoa teste o projeto completo sem precisar configurar credenciais externas.

Para migração a um ambiente de produção multiusuário:
- **Autenticação**: Conectar o [AuthContext.tsx](src/context/AuthContext.tsx) ao **Supabase Auth**, **Firebase** ou backend próprio com JWT.
- **Banco Relacional**: Criar tabelas em **PostgreSQL** correspondentes às interfaces em [src/types/index.ts](src/types/index.ts) (`games`, `guides`, `guide_ratings` com chave única composta `[guide_id, user_id]` e `guide_comments`).
- **Endpoints de API**: Substituir as funções em [GameGuideContext.tsx](src/context/GameGuideContext.tsx) por chamadas assíncronas `fetch` / `axios`.

---

## 👤 Autor

Desenvolvido por **[JohnathanVF](https://github.com/JohnathanVF)**.

---

<div align="center">
  <sub>Forjado sob o fogo da dedicação e da sabedoria gamer. Distribuído sob a licença MIT.</sub>
</div>
