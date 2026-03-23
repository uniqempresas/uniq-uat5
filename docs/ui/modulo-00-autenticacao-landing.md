# 🎯 UNIQ Empresas - Documentação de UI/UX
## Módulo 00: Autenticação e Landing Page

**Versão:** 1.0  
**Última atualização:** 12/03/2026  
**Módulo:** 00 - Autenticação e Landing Page  
**Total de Telas:** 5 telas  
**Tema:** Modo Claro (Light Mode)

---

## 📋 Sumário

1. [Tela 1: Landing Page](#tela-1-landing-page)
2. [Tela 2: Login](#tela-2-login)
3. [Tela 3: Cadastro - Etapa 1: Conta](#tela-3-cadastro-etapa-1-conta)
4. [Tela 4: Cadastro - Etapa 2: Empresa](#tela-4-cadastro-etapa-2-empresa)
5. [Tela 5: Cadastro - Etapa 3: Configuração](#tela-5-cadastro-etapa-3-configuracao)

---

## 🎨 Design System UNIQ - Modo Claro

### Paleta de Cores

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| **Fundo Principal** | Platinum | `#efefef` | Área de conteúdo principal |
| **Fundo Cards** | Branco | `#ffffff` | Cards, formulários, modais |
| **Sidebar** | Jet Black | `#1f2937` | Barra lateral (sempre escura) |
| **Botões Primários** | Dark Slate Grey | `#3e5653` | Ações principais |
| **Botões Hover** | Jet Black | `#1f2937` | Hover dos botões primários |
| **Accent/Detalhes** | Emerald | `#86cb92` | Ícones, bordas, destaques sutis |
| **Texto Principal** | Jet Black | `#1f2937` | Títulos, textos importantes |
| **Texto Secundário** | Dim Grey | `#627271` | Descrições, labels, placeholders |
| **Bordas** | Gray-200 | `#e5e7eb` | Bordas de inputs e cards |
| **Erro** | Red | `#dc2626` | Estados de erro |
| **Sucesso** | Green | `#16a34a` | Estados de sucesso |
| **Alerta** | Amber | `#f59e0b` | Avisos |

### Tipografia

- **Fonte:** Poppins (Google Fonts)
- **Importação:** `https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap`
- **Tailwind Config:**
```javascript
fontFamily: {
  poppins: ['Poppins', 'sans-serif'],
}
```

**Hierarquia:**
| Elemento | Tamanho | Peso | Cor |
|----------|---------|------|-----|
| H1 | `text-4xl md:text-5xl` | `font-bold` (700) | `#1f2937` |
| H2 | `text-3xl md:text-4xl` | `font-bold` (700) | `#1f2937` |
| H3 | `text-2xl` | `font-semibold` (600) | `#1f2937` |
| H4 | `text-xl` | `font-semibold` (600) | `#1f2937` |
| Body | `text-base` | `font-normal` (400) | `#627271` |
| Small | `text-sm` | `font-normal` (400) | `#627271` |
| Caption | `text-xs` | `font-medium` (500) | `#627271` |

### Layout Patterns

**Container Principal:**
```
Desktop (>=1024px):
┌─────────────────────────────────────────────────────┐
│  SIDEBAR              │    CONTEÚDO                 │
│  bg-[#1f2937]         │    bg-[#efefef]             │
│  w-80 (320px)         │    flex-1                   │
│  h-screen fixed       │    min-h-screen             │
│                       │                             │
│  • Logo UNIQ          │    Card Branco              │
│  • Ilustração         │    • Formulário             │
│  • Testimonial        │    • Campos                 │
│  • Progresso Steps    │    • Botões                 │
└─────────────────────────────────────────────────────┘
```

**Card Pattern:**
- Fundo: `bg-white`
- Borda: `border border-[#e5e7eb]`
- Borda-radius: `rounded-2xl` (16px)
- Sombra: `shadow-lg` ou `shadow-xl`
- Padding: `p-8` (32px)

**Input Pattern:**
- Fundo: `bg-white`
- Borda: `border border-[#e5e7eb]`
- Borda-radius: `rounded-lg` (8px)
- Padding: `py-3 px-4`
- Focus: `focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92]`
- Ícone esquerda: `text-[#627271]`

**Botão Primário:**
- Fundo: `bg-[#3e5653]`
- Texto: `text-white`
- Hover: `hover:bg-[#1f2937]`
- Padding: `py-3 px-6`
- Borda-radius: `rounded-lg` (8px)
- Fonte: `font-semibold`

**Botão Secundário:**
- Fundo: `bg-white`
- Borda: `border border-[#3e5653]`
- Texto: `text-[#3e5653]`
- Hover: `hover:bg-[#3e5653] hover:text-white`

### Ícones

- **Biblioteca:** Lucide React (`lucide-react`)
- **Tamanho padrão:** 20px (`w-5 h-5`)
- **Tamanho grande:** 24px (`w-6 h-6`)
- **Cor padrão:** `#627271` ou `#86cb92` para destaques

---

## Tela 1: Landing Page

**Rota:** `/`  
**Objetivo:** Apresentar a UNIQ Empresas, converter visitantes em leads/usuários  
**Módulo:** Autenticação e Landing Page  
**Tipo:** Página pública (não requer autenticação)

### Layout

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Estrutura:** Seções verticais empilhadas (full-width)
- **Background Principal:** `#efefef`

### Componentes

#### 1. Header/Navbar
- **Tipo:** Header fixo com glassmorphism
- **Position:** `fixed top-0 left-0 right-0 z-50`
- **Conteúdo:**
  - **Logo:** Ícone `Building2` + texto "UNIQ" em `text-2xl font-bold text-[#1f2937]`
  - **Tagline:** "Empresas" em `text-sm text-[#627271] ml-1`
  - **Links de navegação (desktop):** "Como Funciona", "Módulos", "Preço", "Depoimentos"
  - **Botões de ação:** "Entrar" (secundário) + "Começar Grátis" (primário)
- **Estilos:**
  - Fundo inicial: `bg-transparent`
  - Fundo após scroll: `bg-white/90 backdrop-blur-md shadow-sm`
  - Altura: `h-20`
  - Padding: `py-4`
  - Transição: `transition-all duration-300`
- **Links de navegação:**
  - Classes: `text-[#627271] hover:text-[#1f2937] font-medium transition-colors`
  - Scroll suave para âncoras
- **Botão "Entrar":**
  - Classes: `px-6 py-2 text-[#3e5653] font-medium hover:text-[#1f2937] transition-colors`
- **Botão "Começar Grátis":**
  - Classes: `px-6 py-2 bg-[#3e5653] text-white font-medium rounded-lg hover:bg-[#1f2937] transition-all duration-200 shadow-md hover:shadow-lg`

#### 2. Hero Section
- **Tipo:** Seção hero com CTA
- **Background:** `#efefef`
- **Padding:** `pt-32 pb-20` (compensar header fixo)
- **Conteúdo:**
  - **Tagline:** "SISTEMA DE GESTÃO COMPLETO" - `text-sm font-bold text-[#86cb92] uppercase tracking-wider`
  - **Título principal:** "Gerencie sua empresa de forma inteligente" - `text-4xl md:text-5xl lg:text-6xl font-bold text-[#1f2937] leading-tight`
  - **Subtítulo:** "A UNIQ Empresas oferece todas as ferramentas que você precisa para organizar processos, gerenciar equipes e fazer sua empresa crescer." - `text-lg md:text-xl text-[#627271] max-w-2xl`
  - **CTA Principal:** "Começar Gratuitamente" - `ArrowRight` - botão grande primário
  - **CTA Secundário:** "Agendar Demonstração" - `Calendar` - botão outline
- **Grid de ilustração (lateral direita em desktop):**
  - Dashboard mockup em perspective
  - Cards flutuantes mostrando features
  - Badge "Grátis para começar" flutuante com `bg-[#86cb92] text-[#1f2937]`
- **Estilos dos botões:**
  - **Primário:** `bg-[#3e5653] hover:bg-[#1f2937] text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2`
  - **Secundário:** `bg-white border-2 border-[#3e5653] text-[#3e5653] hover:bg-[#3e5653] hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center gap-2`

#### 3. Seção "Como Funciona"
- **Tipo:** Grid de 4 passos
- **Background:** `#ffffff`
- **Padding:** `py-20`
- **Conteúdo:**
  - **Título:** "Como a UNIQ funciona" - `text-3xl md:text-4xl font-bold text-[#1f2937] text-center`
  - **Subtítulo:** "Quatro passos simples para transformar a gestão da sua empresa" - `text-lg text-[#627271] text-center max-w-2xl mx-auto`
- **Cards de Passos (grid 1 col mobile, 2 cols tablet, 4 cols desktop):**

**Passo 1: Cadastre sua Empresa**
- **Ícone:** `Building2` em círculo `w-16 h-16 rounded-full bg-[#3e5653]/10 flex items-center justify-center`
- **Ícone cor:** `text-[#3e5653] w-8 h-8`
- **Título:** "1. Cadastre sua Empresa" - `text-xl font-semibold text-[#1f2937] mt-6`
- **Descrição:** "Crie sua conta em minutos e configure os dados da sua empresa." - `text-[#627271] mt-2`
- **Badge número:** `absolute -top-2 -right-2 w-8 h-8 bg-[#86cb92] text-[#1f2937] rounded-full flex items-center justify-center font-bold text-sm`

**Passo 2: Convide sua Equipe**
- **Ícone:** `Users` em círculo `bg-[#86cb92]/20`
- **Ícone cor:** `text-[#3e5653]`
- **Título:** "2. Convide sua Equipe"
- **Descrição:** "Adicione colaboradores e defina permissões de acesso."

**Passo 3: Organize Processos**
- **Ícone:** `Workflow` em círculo `bg-[#3e5653]/10`
- **Ícone cor:** `text-[#3e5653]`
- **Título:** "3. Organize Processos"
- **Descrição:** "Use nossos módulos para estruturar suas operações."

**Passo 4: Acompanhe Resultados**
- **Ícone:** `TrendingUp` em círculo `bg-[#86cb92]/20`
- **Ícone cor:** `text-[#3e5653]`
- **Título:** "4. Acompanhe Resultados"
- **Descrição:** "Monitore indicadores e tome decisões baseadas em dados."

- **Estilos dos cards:**
  - Container: `bg-white rounded-2xl p-8 border border-[#e5e7eb] hover:shadow-lg transition-all duration-300 relative`
  - Posição: `text-center`
  - Hover: `hover:-translate-y-1`

#### 4. Seção "Módulos" (9 Cards)
- **Tipo:** Grid de módulos/features
- **Background:** `#efefef`
- **Padding:** `py-20`
- **Conteúdo:**
  - **Título:** "Tudo que você precisa em um só lugar" - `text-3xl md:text-4xl font-bold text-[#1f2937] text-center`
  - **Subtítulo:** "9 módulos integrados para gerenciar todos os aspectos do seu negócio" - `text-lg text-[#627271] text-center`

**Grid de Módulos (3x3 em desktop, 2 cols tablet, 1 col mobile):**
- **Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

**Card de Módulo Padrão:**
- **Ícone:** 40px circular com cor de fundo do módulo
- **Título:** Nome do módulo - `text-lg font-semibold text-[#1f2937]`
- **Descrição:** Breve descrição - `text-sm text-[#627271]`
- **Link:** "Saiba mais →"
- **Estilos:**
  - Card: `bg-white rounded-xl p-6 border border-[#e5e7eb] hover:shadow-lg hover:border-[#86cb92] transition-all duration-300`
  - Ícone container: `w-12 h-12 rounded-xl flex items-center justify-center mb-4`

**Módulo 1: Gestão de Pessoas**
- Ícone: `Users`
- Cor: `bg-[#3e5653]/10 text-[#3e5653]`
- Descrição: "Controle completo de funcionários, cargos e departamentos."

**Módulo 2: Financeiro**
- Ícone: `Wallet`
- Cor: `bg-green-100 text-green-600`
- Descrição: "Gestão de receitas, despesas e fluxo de caixa."

**Módulo 3: CRM**
- Ícone: `HeartHandshake`
- Cor: `bg-red-100 text-red-600`
- Descrição: "Relacionamento com clientes e gestão de vendas."

**Módulo 4: Contratos**
- Ícone: `FileText`
- Cor: `bg-blue-100 text-blue-600`
- Descrição: "Controle de contratos, renovações e documentos."

**Módulo 5: Marketing**
- Ícone: `Megaphone`
- Cor: `bg-purple-100 text-purple-600`
- Descrição: "Campanhas, métricas e gestão de leads."

**Módulo 6: Estoque**
- Ícone: `Package`
- Cor: `bg-orange-100 text-orange-600`
- Descrição: "Controle de produtos, entradas e saídas."

**Módulo 7: Tarefas**
- Ícone: `CheckSquare`
- Cor: `bg-[#86cb92]/20 text-[#3e5653]`
- Descrição: "Gestão de projetos e acompanhamento de atividades."

**Módulo 8: BI/Analytics**
- Ícone: `BarChart3`
- Cor: `bg-indigo-100 text-indigo-600`
- Descrição: "Dashboards e relatórios inteligentes."

**Módulo 9: Documentos**
- Ícone: `FolderOpen`
- Cor: `bg-gray-100 text-gray-600`
- Descrição: "Gestão documental e versionamento."

#### 5. Seção "Preço"
- **Tipo:** Cards de planos
- **Background:** `#ffffff`
- **Padding:** `py-20`
- **Conteúdo:**
  - **Título:** "Planos simples e transparentes" - `text-3xl md:text-4xl font-bold text-[#1f2937] text-center`
  - **Subtítulo:** "Escolha o plano ideal para o tamanho da sua empresa" - `text-lg text-[#627271] text-center`

**Cards de Preço (3 cards):**
- **Grid:** `grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto`

**Plano Gratuito:**
- **Nome:** "Iniciante" - `text-xl font-semibold text-[#1f2937]`
- **Preço:** "Grátis" - `text-4xl font-bold text-[#1f2937]`
- **Período:** "/para sempre" - `text-[#627271]`
- **Features:**
  - `Check` "Até 3 usuários"
  - `Check` "3 módulos básicos"
  - `Check` "1GB de armazenamento"
  - `X` "Suporte prioritário"
- **Botão:** "Começar Grátis" - `bg-[#efefef] text-[#1f2937] hover:bg-[#e5e7eb]`

**Plano Pro (Destaque):**
- **Badge:** "MAIS POPULAR" - `absolute -top-4 left-1/2 -translate-x-1/2 bg-[#86cb92] text-[#1f2937] px-4 py-1 rounded-full text-xs font-bold`
- **Nome:** "Profissional"
- **Preço:** "R$ 97" - `text-4xl font-bold text-[#1f2937]`
- **Período:** "/mês" - `text-[#627271]`
- **Features:**
  - `Check` "Até 15 usuários"
  - `Check` "Todos os 9 módulos"
  - `Check` "50GB de armazenamento"
  - `Check` "Suporte prioritário"
- **Botão:** "Escolher Pro" - `bg-[#3e5653] text-white hover:bg-[#1f2937]`
- **Estilos extras:** `border-2 border-[#86cb92] shadow-xl scale-105 relative`

**Plano Enterprise:**
- **Nome:** "Empresarial"
- **Preço:** "Personalizado" - `text-4xl font-bold text-[#1f2937]`
- **Período:** "Fale conosco" - `text-[#627271]`
- **Features:**
  - `Check` "Usuários ilimitados"
  - `Check" "Módulos personalizados`
  - `Check` "Armazenamento ilimitado"
  - `Check` "Suporte 24/7 dedicado"
- **Botão:** "Falar com Vendas" - `bg-[#efefef] text-[#1f2937] hover:bg-[#e5e7eb]`

**Card de Preço - Estilos:**
- Container: `bg-white rounded-2xl p-8 border border-[#e5e7eb]`
- Feature item: `flex items-center gap-3 py-2`
- Check: `w-5 h-5 text-[#86cb92]`
- X: `w-5 h-5 text-[#627271]`

#### 6. Seção "Depoimentos"
- **Tipo:** Carousel/Slider de depoimentos
- **Background:** `#efefef`
- **Padding:** `py-20`
- **Conteúdo:**
  - **Título:** "O que nossos clientes dizem" - `text-3xl md:text-4xl font-bold text-[#1f2937] text-center`

**Cards de Depoimento:**
- **Grid:** `grid grid-cols-1 md:grid-cols-3 gap-6`
- **Avatar:** Círculo 64px com foto ou iniciais - `w-16 h-16 rounded-full bg-[#3e5653] text-white flex items-center justify-center text-xl font-bold`
- **Nome:** `font-semibold text-[#1f2937]`
- **Cargo/Empresa:** `text-sm text-[#627271]`
- **Estrelas:** 5 estrelas `Star` preenchidas - `text-yellow-400 w-4 h-4`
- **Depoimento:** `text-[#627271] italic` - "A UNIQ transformou completamente nossa gestão. Conseguimos reduzir em 40% o tempo gasto em tarefas administrativas."
- **Card estilos:**
  - Container: `bg-white rounded-2xl p-8 shadow-md border border-[#e5e7eb]`
  - Aspas decorativas: `text-[#86cb92] text-4xl font-serif absolute top-4 right-4 opacity-30`

#### 7. Seção CTA Final
- **Tipo:** Call-to-action final destacado
- **Background:** `#1f2937`
- **Padding:** `py-20`
- **Conteúdo:**
  - **Título:** "Pronto para transformar sua empresa?" - `text-3xl md:text-4xl font-bold text-white text-center`
  - **Subtítulo:** "Junte-se a milhares de empresas que já usam a UNIQ para crescer." - `text-lg text-white/80 text-center max-w-2xl mx-auto`
  - **Botão principal:** "Criar Conta Grátis" - `ArrowRight` - `bg-[#86cb92] text-[#1f2937]`
  - **Texto secundário:** "Não precisa de cartão de crédito"
- **Estilos do botão:**
  - `bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#1f2937] font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200`

#### 8. Footer
- **Tipo:** Footer completo
- **Background:** `#1f2937`
- **Padding:** `py-16`
- **Border-top:** `border-t border-white/10`
- **Conteúdo:**
  - **Logo:** Ícone `Building2` + "UNIQ Empresas" - `text-2xl font-bold text-white`
  - **Descrição:** "Sistema completo de gestão empresarial para empresas que querem crescer." - `text-white/60 max-w-sm`
  - **Links organizados em colunas:**
    - **Produto:** Funcionalidades, Preços, Integrações, Atualizações
    - **Empresa:** Sobre nós, Blog, Carreiras, Contato
    - **Legal:** Termos de Uso, Privacidade, Cookies, LGPD
  - **Redes sociais:** Ícones `Linkedin`, `Instagram`, `Twitter`, `Youtube` - `w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#86cb92] transition-colors`
  - **Copyright:** "© 2026 UNIQ Empresas. Todos os direitos reservados." - `text-white/40 text-sm text-center mt-12 pt-8 border-t border-white/10`

**Link estilos:**
- `text-white/60 hover:text-[#86cb92] transition-colors text-sm`

### Estados

**Estado Inicial:**
- Header transparente
- Animação suave no hero (fade in + translate-y)
- Cards com hover effects

**Estado Scroll:**
- Header ganha fundo branco com blur após 50px de scroll
- `bg-white/90 backdrop-blur-md shadow-sm`

**Estado Carregando:**
- Skeleton para imagens: `bg-gray-200 animate-pulse rounded-lg`
- Botão CTA com spinner durante navegação

**Estado Mobile:**
- Menu hambúrguer (ícone `Menu`) em vez de links
- Drawer lateral com navegação
- Hero com texto centralizado
- Grid de módulos 1 coluna

**Estado Hover (Cards):**
- `hover:shadow-lg hover:-translate-y-1 transition-all duration-300`

### Navegação

- **Entrada:** Acesso direto, links externos, busca orgânica
- **Saída principal:** Botão "Começar Grátis" → /cadastro/etapa-1
- **Saída secundária:** Link "Entrar" → /login
- **Âncoras:** Links internos suaves para seções (#como-funciona, #modulos, #preco, #depoimentos)

### Regras de Negócio

- **RN-LP-001:** Landing page é pública, não requer autenticação
- **RN-LP-002:** Usuários autenticados são redirecionados para /dashboard
- **RN-LP-003:** Scroll suave para âncoras internas
- **RN-LP-004:** Analytics deve rastrear cliques nos CTAs
- **RN-LP-005:** Formulário de newsletter opcional no footer

---

## Tela 2: Login

**Rota:** `/login`  
**Objetivo:** Autenticar usuário existente  
**Módulo:** Autenticação e Landing Page  
**Layout:** Split screen (sidebar escura + formulário)

### Layout

- **Container:** `min-h-screen flex`
- **Estrutura:**
  - Desktop: Sidebar 320px fixa + Conteúdo flexível
  - Mobile: Apenas formulário (sem sidebar)

### Componentes

#### 1. Sidebar Esquerda (Desktop >= 1024px)
- **Tipo:** Barra lateral escura fixa
- **Width:** `w-80` (320px)
- **Height:** `h-screen fixed left-0 top-0`
- **Background:** `bg-[#1f2937]`
- **Padding:** `p-8`
- **Conteúdo:**
  - **Logo:** Ícone `Building2` + "UNIQ" - `text-3xl font-bold text-white`
  - **Tagline:** "Empresas" - `text-white/60`
  - **Ilustração:** SVG/Imagem decorativa centralizada - `opacity-80`
  - **Headline:** "Bem-vindo de volta" - `text-2xl font-bold text-white mt-12`
  - **Subheadline:** "Acesse sua conta e continue gerenciando sua empresa com eficiência." - `text-white/70 mt-4`
  - **Testimonial card:**
    - Quote: "A UNIQ reduziu nosso tempo de gestão em 50%" - `text-white/90 italic`
    - Autor: "Maria Santos, CEO da TechStart" - `text-white/60 text-sm mt-4`
    - Estrelas: 5x `Star` - `text-[#86cb92] w-4 h-4`
- **Decorative elements:**
  - Círculos absolutos com blur: `absolute top-20 right-0 w-64 h-64 bg-[#86cb92]/10 rounded-full blur-3xl`
  - Círculo inferior: `absolute bottom-0 left-0 w-96 h-96 bg-[#3e5653]/20 rounded-full blur-3xl`

#### 2. Área de Conteúdo (Direita)
- **Background:** `bg-[#efefef]`
- **Layout:** `flex-1 flex items-center justify-center min-h-screen p-4 lg:p-8`

#### 3. Card de Login
- **Tipo:** Container do formulário
- **Width:** `w-full max-w-md`
- **Background:** `bg-white`
- **Borda:** `border border-[#e5e7eb]`
- **Borda-radius:** `rounded-2xl`
- **Sombra:** `shadow-xl`
- **Padding:** `p-8`
- **Conteúdo:**
  - **Header:**
    - **Título:** "Entrar na sua conta" - `text-2xl font-bold text-[#1f2937]`
    - **Subtítulo:** "Digite suas credenciais para continuar" - `text-[#627271] mt-2`
  - **Ícone decorativo:** `LogIn` - `w-12 h-12 text-[#86cb92] mb-6`

#### 4. Formulário de Login
- **Tipo:** Formulário de autenticação
- **Gap entre campos:** `space-y-5`

**Campo 1: Email**
- Tipo: `email`
- Label: "Email" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "seu@email.com"
- Ícone (esquerda): `Mail` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Validação: Formato de email válido
- Erro: "Por favor, insira um email válido"
- Container: `relative`
- Input classes: `w-full pl-10 pr-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all duration-200`
- Estado erro: `border-red-500 focus:ring-red-500 focus:border-red-500`

**Campo 2: Senha**
- Tipo: `password` (toggle para `text`)
- Label: "Senha" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "••••••••"
- Ícone (esquerda): `Lock` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Ícone (direita - botão): `Eye` / `EyeOff` - `absolute right-3 top-1/2 -translate-y-1/2 text-[#627271] hover:text-[#1f2937] w-5 h-5 cursor-pointer transition-colors`
- Obrigatório: Sim
- Validação: Mínimo 8 caracteres
- Erro: "Senha deve ter pelo menos 8 caracteres"
- Input classes: `w-full pl-10 pr-12 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all duration-200`

**Linha de Ações (Lembrar-me + Esqueci):**
- Layout: `flex items-center justify-between mt-4`

**Checkbox: Lembrar-me**
- Tipo: `checkbox`
- Label: "Lembrar-me por 30 dias"
- Classes do checkbox: `w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92] focus:ring-offset-0`
- Label classes: `ml-2 text-sm text-[#627271]`

**Link: Esqueci minha senha**
- Texto: "Esqueci minha senha"
- Classes: `text-sm text-[#3e5653] hover:text-[#1f2937] font-medium transition-colors`
- Ação: Navega para /recuperar-senha

#### 5. Botão de Submit
- **Tipo:** Botão primário
- **Conteúdo:** "Entrar" + Ícone `ArrowRight`
- **Classes:** `w-full bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-6`
- **Disabled:** `opacity-50 cursor-not-allowed` quando form inválido
- **Loading state:**
  - Spinner: `Loader2` animado - `animate-spin w-5 h-5`
  - Texto: "Entrando..."
  - Classes: `w-full bg-[#3e5653]/80 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed`

#### 6. Separador
- **Tipo:** Linha com texto
- **Conteúdo:** "ou continue com"
- **Classes:**
  - Container: `relative flex items-center gap-4 my-6`
  - Linhas: `flex-1 h-px bg-[#e5e7eb]`
  - Texto: `text-sm text-[#627271] font-medium`

#### 7. Botão Google
- **Tipo:** Botão de login social
- **Conteúdo:** Ícone Google (SVG) + "Google"
- **Classes:** `w-full bg-white border border-[#e5e7eb] text-[#1f2937] font-medium py-3 px-6 rounded-lg hover:bg-[#efefef] transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md`
- **Ícone Google:** SVG oficial, 20px

#### 8. Link de Cadastro
- **Tipo:** Texto com link
- **Conteúdo:** "Não tem uma conta?" + "Cadastre-se grátis"
- **Classes:**
  - Container: `text-center mt-6`
  - Texto: `text-[#627271]`
  - Link: `text-[#3e5653] hover:text-[#1f2937] font-semibold transition-colors`

### Estados

**Estado Inicial:**
- Campos vazios
- Botão habilitado (validação em tempo real ou no submit)
- Ícone de senha: `Eye`

**Estado Digitando:**
- Validação em tempo real (opcional)
- Remove mensagem de erro quando usuário começa a digitar

**Estado Carregando:**
- Botão mostra spinner `Loader2` animado com `animate-spin`
- Campos desabilitados: `disabled:opacity-50 disabled:cursor-not-allowed`
- Overlay opcional no card: `bg-white/50 backdrop-blur-sm`

**Estado Erro (Autenticação):**
- Alerta no topo do card:
  - Container: `bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 mb-4`
  - Ícone: `AlertCircle` - `w-5 h-5 text-red-600`
  - Título: "Erro ao entrar" - `text-sm font-semibold text-red-800`
  - Mensagem: "Email ou senha incorretos. Verifique suas credenciais." - `text-sm text-red-600`

**Estado Erro (Validação):**
- Borda vermelha nos campos inválidos: `border-red-500 focus:ring-red-500`
- Mensagem abaixo do campo: `text-sm text-red-600 mt-1 flex items-center gap-1`
- Ícone de erro: `AlertCircle` - `w-4 h-4`

**Estado Sucesso:**
- Toast de boas-vindas: `bg-green-50 border border-green-200 rounded-lg p-4`
- Ícone: `CheckCircle2` - `w-5 h-5 text-green-600`
- Mensagem: "Bem-vindo de volta!"
- Redirecionamento automático para /dashboard

**Estado Toggle Senha:**
- Ícone alterna entre `Eye` e `EyeOff`
- Tipo do input alterna entre `password` e `text`
- Transição suave

### Navegação

- **Entrada:** Landing page (/), links diretos
- **Saída sucesso:** /dashboard
- **Saída cadastro:** /cadastro/etapa-1
- **Saída recuperar senha:** /recuperar-senha

### Regras de Negócio

- **RN-LOGIN-001:** Email e senha obrigatórios
- **RN-LOGIN-002:** Validação de formato de email antes do submit (regex)
- **RN-LOGIN-003:** Senha nunca exibida em texto claro por padrão
- **RN-LOGIN-004:** Token JWT armazenado em cookie httpOnly
- **RN-LOGIN-005:** Opção "Lembrar-me" estende duração do token para 30 dias
- **RN-LOGIN-006:** Máximo de 5 tentativas falhas antes de bloqueio temporário (5 minutos)
- **RN-LOGIN-007:** Após 3 tentativas falhas, mostrar CAPTCHA

---

## Tela 3: Cadastro - Etapa 1: Conta

**Rota:** `/cadastro/etapa-1`  
**Objetivo:** Coletar dados pessoais do usuário  
**Módulo:** Autenticação e Landing Page  
**Layout:** Split screen com progresso no sidebar

### Layout

- **Container:** `min-h-screen flex`
- **Estrutura:**
  - Desktop: Sidebar 320px com progresso + Conteúdo com formulário
  - Mobile: Header com progresso + Formulário

### Componentes

#### 1. Sidebar Esquerda (Desktop >= 1024px)
- **Background:** `bg-[#1f2937]`
- **Width:** `w-80 fixed`
- **Padding:** `p-8`
- **Conteúdo:**
  - **Logo:** Ícone `Building2` + "UNIQ" - `text-3xl font-bold text-white`
  - **Passos de Progresso:**
    - **Título:** "Progresso do cadastro" - `text-sm font-medium text-white/60 uppercase tracking-wider mb-6`
    - **Passo 1 (Ativo):**
      - Círculo: `w-8 h-8 rounded-full bg-[#86cb92] text-[#1f2937] flex items-center justify-center font-bold`
      - Texto: "Dados pessoais" - `text-white font-medium`
      - Subtexto: "Etapa atual" - `text-white/60 text-sm`
      - Linha conectora: `w-px h-8 bg-[#86cb92] ml-4`
    - **Passo 2 (Pendente):**
      - Círculo: `w-8 h-8 rounded-full border-2 border-white/30 text-white/60 flex items-center justify-center font-medium`
      - Texto: "Dados da empresa" - `text-white/60`
      - Linha conectora: `w-px h-8 bg-white/30 ml-4`
    - **Passo 3 (Pendente):**
      - Círculo: `w-8 h-8 rounded-full border-2 border-white/30 text-white/60 flex items-center justify-center font-medium`
      - Texto: "Configuração" - `text-white/60`

  - **Benefícios lista:**
    - Item: `flex items-center gap-3 text-white/80`
    - Ícone: `Check` - `w-5 h-5 text-[#86cb92]`
    - Textos:
      - "Cadastro gratuito"
      - "Sem necessidade de cartão"
      - "Cancele quando quiser"

#### 2. Mobile Progress Header
- **Visible:** `< lg`
- **Background:** `bg-white border-b border-[#e5e7eb]`
- **Padding:** `p-4`
- **Conteúdo:**
  - **Barra de progresso:**
    - Container: `w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden`
    - Preenchido: `w-1/3 h-full bg-[#86cb92] rounded-full transition-all duration-500`
  - **Texto:** "Etapa 1 de 3" - `text-sm text-[#627271] text-center mt-2`

#### 3. Área de Conteúdo
- **Background:** `bg-[#efefef]`
- **Layout:** `flex-1 flex items-center justify-center min-h-screen p-4 lg:p-8 lg:ml-80`

#### 4. Card de Cadastro
- **Width:** `w-full max-w-lg`
- **Background:** `bg-white`
- **Borda:** `border border-[#e5e7eb]`
- **Borda-radius:** `rounded-2xl`
- **Sombra:** `shadow-xl`
- **Padding:** `p-8`
- **Conteúdo:**
  - **Header:**
    - **Título:** "Crie sua conta" - `text-2xl font-bold text-[#1f2937]`
    - **Subtítulo:** "Comece preenchendo seus dados pessoais" - `text-[#627271] mt-2`
  - **Step indicator:** "Etapa 1/3" - `text-sm font-medium text-[#86cb92] bg-[#86cb92]/10 px-3 py-1 rounded-full inline-block mt-4`

#### 5. Formulário Etapa 1
- **Gap:** `space-y-5`
- **Grid para campos lado a lado:** `grid grid-cols-1 md:grid-cols-2 gap-5`

**Campo 1: Nome Completo**
- Tipo: `text`
- Label: "Nome completo" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "João Silva"
- Ícone (esquerda): `User` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Validação: Mínimo 3 caracteres, máximo 100
- Erro: "Nome deve ter pelo menos 3 caracteres"
- Classes input: `w-full pl-10 pr-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all duration-200`
- Grid: `col-span-2` (ocupa largura total)

**Campo 2: Email**
- Tipo: `email`
- Label: "Email" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "joao@empresa.com"
- Ícone (esquerda): `Mail` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Validação: Formato de email válido e único
- Erro: "Email inválido" / "Este email já está cadastrado"
- Ajuda: `text-xs text-[#627271] mt-1` - "Você usará este email para acessar o sistema"
- Grid: `col-span-2`

**Campo 3: CPF**
- Tipo: `text` (com máscara)
- Label: "CPF" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "000.000.000-00"
- Ícone (esquerda): `CreditCard` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Validação: CPF válido (11 dígitos, máscara automática)
- Erro: "CPF inválido"
- Grid: `col-span-1`

**Campo 4: Telefone**
- Tipo: `tel` (com máscara)
- Label: "Telefone" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "(00) 00000-0000"
- Ícone (esquerda): `Phone` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Validação: Telefone válido (mínimo 10 dígitos)
- Grid: `col-span-1`

**Campo 5: Senha**
- Tipo: `password` (toggle)
- Label: "Senha" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "••••••••"
- Ícone (esquerda): `Lock` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Ícone (direita): `Eye` / `EyeOff`
- Obrigatório: Sim
- Grid: `col-span-2`

**Indicador de Força da Senha:**
- Container: `mt-3`
- Label: "Força da senha:"
- **Barra de progresso:**
  - Container: `w-full h-2 bg-[#e5e7eb] rounded-full overflow-hidden mt-1`
  - Preenchido: `h-full rounded-full transition-all duration-300` (cor varia)
- **Cores por nível:**
  - Fraca (< 8 chars): `w-1/4 bg-red-500`
  - Regular (8+ chars): `w-2/4 bg-yellow-500`
  - Boa (8+ + maiúscula + número): `w-3/4 bg-blue-500`
  - Forte (todos os requisitos): `w-full bg-[#86cb92]`
- **Texto do nível:** `text-xs font-medium` (cor correspondente)

**Requisitos de Senha (Lista com checkboxes dinâmicos):**
- Container: `mt-3 space-y-2`
- Item: `flex items-center gap-2 text-sm`
- Ícone check: `Check` - `w-4 h-4 text-[#86cb92]` (quando atendido) / `X` - `w-4 h-4 text-[#627271]` (quando não)
- Requisitos:
  1. "Mínimo 8 caracteres"
  2. "Pelo menos uma letra maiúscula"
  3. "Pelo menos um número"
  4. "Pelo menos um símbolo especial (!@#$%)"

**Campo 6: Confirmar Senha**
- Tipo: `password`
- Label: "Confirmar senha" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "••••••••"
- Ícone (esquerda): `Lock` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Validação: Deve ser igual ao campo senha
- Erro: "As senhas não coincidem"
- Grid: `col-span-2`

#### 6. Botão de Ação
- **Tipo:** Botão primário
- **Conteúdo:** "Próximo Passo" + Ícone `ArrowRight`
- **Classes:** `w-full bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-6`
- **Disabled:** Quando campos obrigatórios não preenchidos ou senha fraca

#### 7. Link para Login
- **Tipo:** Texto com link
- **Conteúdo:** "Já tem uma conta?" + "Entrar"
- **Classes:**
  - Container: `text-center mt-6`
  - Texto: `text-[#627271]`
  - Link: `text-[#3e5653] hover:text-[#1f2937] font-semibold transition-colors`

### Estados

**Estado Inicial:**
- Campos vazios
- Indicador de força em 0%
- Requisitos todos não atendidos (X cinza)
- Botão desabilitado

**Estado Digitando (Senha):**
- Indicador de força atualiza em tempo real
- Requisitos vão ficando verdes conforme atendidos
- Ícone muda de `X` para `Check`

**Estado Erro (Validação):**
- Borda vermelha nos campos inválidos: `border-red-500`
- Mensagem abaixo do campo: `text-sm text-red-600 mt-1`
- Ícone de erro: `AlertCircle` - `w-4 h-4`

**Estado Erro (Email existente):**
- Alert no topo: `bg-yellow-50 border border-yellow-200 rounded-lg p-4`
- Ícone: `AlertTriangle` - `w-5 h-5 text-yellow-600`
- Mensagem: "Este email já está cadastrado." + link "Entrar"

**Estado Sucesso (Validação):**
- Todos os campos válidos
- Botão habilitado
- Próximo para etapa 2

### Navegação

- **Entrada:** Landing page (/), link "Cadastre-se" do login
- **Saída próxima etapa:** /cadastro/etapa-2
- **Saída login:** /login
- **Voltar:** Landing page (seta no mobile)

### Regras de Negócio

- **RN-CAD1-001:** Todos os campos são obrigatórios
- **RN-CAD1-002:** Email deve ser único no sistema (validação async)
- **RN-CAD1-003:** CPF deve ser válido (algoritmo de validação)
- **RN-CAD1-004:** Senha deve atender a todos os requisitos de segurança
- **RN-CAD1-005:** Telefone deve aceitar formato brasileiro com DDD
- **RN-CAD1-006:** Dados armazenados temporariamente até finalização do cadastro

---

## Tela 4: Cadastro - Etapa 2: Empresa

**Rota:** `/cadastro/etapa-2`  
**Objetivo:** Coletar dados da empresa  
**Módulo:** Autenticação e Landing Page  
**Layout:** Split screen com progresso atualizado no sidebar

### Layout

- **Container:** `min-h-screen flex`
- **Estrutura:** Mesmo da etapa 1, com progresso atualizado

### Componentes

#### 1. Sidebar - Progresso Atualizado
- **Passo 1 (Concluído):**
  - Círculo: `w-8 h-8 rounded-full bg-[#86cb92] text-[#1f2937] flex items-center justify-center`
  - Ícone: `Check` - `w-5 h-5` (em vez de número)
  - Texto: "Dados pessoais" - `text-white/80`
  - Linha: `w-px h-8 bg-[#86cb92] ml-4`

- **Passo 2 (Ativo):**
  - Círculo: `w-8 h-8 rounded-full bg-[#86cb92] text-[#1f2937] flex items-center justify-center font-bold`
  - Texto: "Dados da empresa" - `text-white font-medium`
  - Subtexto: "Etapa atual" - `text-white/60 text-sm`
  - Linha: `w-px h-8 bg-white/30 ml-4`

- **Passo 3 (Pendente):**
  - Círculo: `w-8 h-8 rounded-full border-2 border-white/30 text-white/60 flex items-center justify-center font-medium`
  - Texto: "Configuração" - `text-white/60`

#### 2. Mobile Progress Header
- **Barra de progresso:** `w-2/3 h-full bg-[#86cb92]`
- **Texto:** "Etapa 2 de 3"

#### 3. Card de Cadastro
- **Título:** "Dados da empresa"
- **Subtítulo:** "Conte-nos sobre o seu negócio"
- **Step indicator:** "Etapa 2/3"

#### 4. Formulário Etapa 2
- **Gap:** `space-y-5`
- **Grid:** `grid grid-cols-1 md:grid-cols-2 gap-5`

**Campo 1: Nome da Empresa**
- Tipo: `text`
- Label: "Nome da empresa" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "Empresa XYZ Ltda"
- Ícone (esquerda): `Building2` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Validação: Mínimo 3 caracteres
- Grid: `col-span-2`

**Campo 2: CNPJ**
- Tipo: `text` (com máscara)
- Label: "CNPJ" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "00.000.000/0000-00"
- Ícone (esquerda): `CreditCard` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Validação: CNPJ válido (14 dígitos, máscara automática)
- Erro: "CNPJ inválido"
- **Autocomplete:** Busca dados na API da Receita (opcional)
- Grid: `col-span-1`

**Campo 3: Telefone da Empresa**
- Tipo: `tel` (com máscara)
- Label: "Telefone comercial" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "(00) 0000-0000"
- Ícone (esquerda): `Phone` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Grid: `col-span-1`

**Campo 4: Ramo de Atividade**
- Tipo: `select` (dropdown)
- Label: "Ramo de atividade" - `block text-sm font-medium text-[#1f2937] mb-1`
- Ícone (esquerda): `Briefcase` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Ícone (direita): `ChevronDown` - `absolute right-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5 pointer-events-none`
- Obrigatório: Sim
- Opções:
  - "Tecnologia e Software"
  - "Comércio e Varejo"
  - "Indústria e Manufatura"
  - "Serviços e Consultoria"
  - "Saúde e Bem-estar"
  - "Educação e Treinamento"
  - "Construção e Engenharia"
  - "Alimentação e Bebidas"
  - "Outro"
- Grid: `col-span-1`
- **Select classes:** `w-full pl-10 pr-10 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] appearance-none cursor-pointer`

**Campo 5: Quantidade de Funcionários**
- Tipo: `select` (dropdown)
- Label: "Quantidade de funcionários" - `block text-sm font-medium text-[#1f2937] mb-1`
- Ícone (esquerda): `Users` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- Opções:
  - "1-5 funcionários"
  - "6-15 funcionários"
  - "16-50 funcionários"
  - "51-100 funcionários"
  - "101-500 funcionários"
  - "Mais de 500 funcionários"
- Grid: `col-span-1`

**Campo 6: CEP**
- Tipo: `text` (com máscara)
- Label: "CEP" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "00000-000"
- Ícone (esquerda): `MapPin` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Ícone (direita - loading): `Loader2` - `w-5 h-5 text-[#86cb92] animate-spin` (quando buscando)
- Obrigatório: Sim
- Validação: CEP válido (8 dígitos)
- **Autocomplete:** Busca endereço via API ViaCEP ou similar
- **On blur:** Preenche campos de endereço automaticamente
- Grid: `col-span-1`

**Campo 7: Logradouro**
- Tipo: `text`
- Label: "Endereço" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "Rua, Avenida, etc."
- Ícone (esquerda): `Home` - `absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] w-5 h-5`
- Obrigatório: Sim
- **Autopreenchido via CEP**
- Grid: `col-span-2`

**Campo 8: Número**
- Tipo: `text`
- Label: "Número" - `block text-sm font-medium text-[#1f2937] mb-1`
- Placeholder: "123"
- Obrigatório: Sim
- Grid: `col-span-1`

**Campo 9: Complemento**
- Tipo: `text`
- Label: "Complemento (opcional)" - `block text-sm font-medium text-[#627271] mb-1`
- Placeholder: "Sala 101, 2º andar"
- Obrigatório: Não
- Grid: `col-span-1`

**Campo 10: Bairro**
- Tipo: `text`
- Label: "Bairro" - `block text-sm font-medium text-[#1f2937] mb-1`
- **Autopreenchido via CEP**
- Grid: `col-span-1`

**Campo 11: Cidade**
- Tipo: `text`
- Label: "Cidade" - `block text-sm font-medium text-[#1f2937] mb-1`
- **Autopreenchido via CEP**
- Grid: `col-span-1`

**Campo 12: Estado**
- Tipo: `select` (dropdown de UF)
- Label: "Estado" - `block text-sm font-medium text-[#1f2937] mb-1`
- **Autopreenchido via CEP**
- Grid: `col-span-1`
- Opções: Lista de UFs (AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO)

#### 5. Botões de Navegação
- **Layout:** `flex gap-4 mt-8`

**Botão Voltar:**
- Tipo: Botão secundário/outline
- Conteúdo: `ArrowLeft` + "Voltar"
- Classes: `flex-1 bg-white border-2 border-[#e5e7eb] text-[#627271] font-semibold py-3 px-6 rounded-lg hover:border-[#3e5653] hover:text-[#3e5653] transition-all duration-200 flex items-center justify-center gap-2`
- Ação: Volta para etapa 1

**Botão Próximo:**
- Tipo: Botão primário
- Conteúdo: "Próximo Passo" + `ArrowRight`
- Classes: `flex-1 bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2`

### Estados

**Estado CEP Buscando:**
- Ícone `Loader2` animado no campo CEP
- Campos de endereço desabilitados: `disabled:bg-[#efefef] disabled:cursor-not-allowed`
- Texto: "Buscando endereço..."

**Estado CEP Encontrado:**
- Campos preenchidos automaticamente
- Foco no campo Número para complementar
- Mensagem: `text-xs text-[#86cb92] mt-1` - "Endereço encontrado!"

**Estado CEP Não Encontrado:**
- Alert: `bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-700`
- Mensagem: "CEP não encontrado. Por favor, preencha manualmente."
- Campos liberados para edição

**Estado Erro (CNPJ inválido):**
- Borda vermelha no campo CNPJ
- Mensagem: "CNPJ inválido. Verifique os dígitos."

### Navegação

- **Entrada:** Etapa 1 (/cadastro/etapa-1)
- **Saída voltar:** /cadastro/etapa-1
- **Saída próximo:** /cadastro/etapa-3

### Regras de Negócio

- **RN-CAD2-001:** CNPJ deve ser válido (algoritmo de validação)
- **RN-CAD2-002:** CEP deve buscar endereço automaticamente
- **RN-CAD2-003:** Ramo de atividade obrigatório para personalização do dashboard
- **RN-CAD2-004:** Dados da empresa vinculados ao usuário criado

---

## Tela 5: Cadastro - Etapa 3: Configuração

**Rota:** `/cadastro/etapa-3`  
**Objetivo:** Revisar dados e aceitar termos para finalizar cadastro  
**Módulo:** Autenticação e Landing Page  
**Layout:** Split screen com progresso completo

### Layout

- **Container:** `min-h-screen flex`
- **Estrutura:** Mesmo das etapas anteriores, com progresso completo

### Componentes

#### 1. Sidebar - Progresso Completo
- **Passo 1 (Concluído):**
  - Círculo: `w-8 h-8 rounded-full bg-[#86cb92] text-[#1f2937] flex items-center justify-center`
  - Ícone: `Check` - `w-5 h-5`
  - Texto: "Dados pessoais" - `text-white/80`
  - Linha: `w-px h-8 bg-[#86cb92] ml-4`

- **Passo 2 (Concluído):**
  - Círculo: `w-8 h-8 rounded-full bg-[#86cb92] text-[#1f2937] flex items-center justify-center`
  - Ícone: `Check` - `w-5 h-5`
  - Texto: "Dados da empresa" - `text-white/80`
  - Linha: `w-px h-8 bg-[#86cb92] ml-4`

- **Passo 3 (Ativo):**
  - Círculo: `w-8 h-8 rounded-full bg-[#86cb92] text-[#1f2937] flex items-center justify-center font-bold`
  - Texto: "Configuração" - `text-white font-medium`
  - Subtexto: "Etapa atual" - `text-white/60 text-sm`

#### 2. Mobile Progress Header
- **Barra de progresso:** `w-full h-full bg-[#86cb92]` (100%)
- **Texto:** "Etapa 3 de 3"

#### 3. Card de Cadastro
- **Width:** `w-full max-w-2xl` (mais largo para acomodar resumo)
- **Título:** "Revisar e finalizar"
- **Subtítulo:** "Confira seus dados antes de criar sua conta"
- **Step indicator:** "Etapa 3/3" - `bg-green-100 text-green-700`

#### 4. Resumo do Cadastro

**Seção: Dados Pessoais**
- Header: `flex items-center justify-between mb-4`
- Título: "Dados Pessoais" - `text-lg font-semibold text-[#1f2937] flex items-center gap-2`
- Ícone: `User` - `w-5 h-5 text-[#86cb92]`
- Botão editar: `text-sm text-[#3e5653] hover:text-[#1f2937] font-medium` - "Editar"

**Card de resumo (dados pessoais):**
- Container: `bg-[#efefef] rounded-xl p-5 border border-[#e5e7eb]`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-4`
- Item: 
  - Label: `text-xs text-[#627271] uppercase tracking-wide` - "Nome"
  - Valor: `text-sm font-medium text-[#1f2937]` - "João Silva"
- Campos:
  - Nome completo
  - Email
  - CPF
  - Telefone

**Seção: Dados da Empresa**
- Título: "Dados da Empresa" - `text-lg font-semibold text-[#1f2937] flex items-center gap-2`
- Ícone: `Building2` - `w-5 h-5 text-[#86cb92]`
- Botão editar: Link para etapa 2

**Card de resumo (empresa):**
- Container: `bg-[#efefef] rounded-xl p-5 border border-[#e5e7eb]`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-4`
- Campos:
  - Nome da empresa
  - CNPJ
  - Ramo de atividade
  - Quantidade de funcionários
  - Endereço completo (Logradouro, Número, Bairro, Cidade/UF, CEP)

#### 5. Termos e Condições

**Checkbox Principal (Obrigatório):**
- Layout: `flex items-start gap-3 mt-6`
- Checkbox: `w-5 h-5 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92] mt-0.5`
- Label: `text-sm text-[#627271]`
- Texto: "Li e aceito os" 
- Links: 
  - "Termos de Uso" - `text-[#3e5653] hover:text-[#1f2937] underline font-medium`
  - "e"
  - "Política de Privacidade" - `text-[#3e5653] hover:text-[#1f2937] underline font-medium`
- Texto complementar: "*"

**Checkbox Secundário (Opcional):**
- Layout: `flex items-start gap-3 mt-4`
- Checkbox: `w-5 h-5 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92] mt-0.5`
- Label: `text-sm text-[#627271]`
- Texto: "Aceito receber comunicações e novidades da UNIQ por email"

#### 6. Botões de Navegação
- **Layout:** `flex gap-4 mt-8`

**Botão Voltar:**
- Conteúdo: `ArrowLeft` + "Voltar"
- Classes: `flex-1 bg-white border-2 border-[#e5e7eb] text-[#627271] font-semibold py-3 px-6 rounded-lg hover:border-[#3e5653] hover:text-[#3e5653] transition-all duration-200 flex items-center justify-center gap-2`

**Botão Finalizar:**
- Conteúdo: "Finalizar Cadastro" + `CheckCircle2`
- Classes: `flex-1 bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2`
- **Disabled:** Quando checkbox de termos não marcado

### Estados

**Estado Checkbox Não Marcado:**
- Botão finalizar desabilitado: `opacity-50 cursor-not-allowed`
- Tooltip opcional: "Você precisa aceitar os termos para continuar"

**Estado Checkbox Marcado:**
- Botão habilitado
- Cor do checkbox: `bg-[#3e5653]`

**Estado Carregando (Submit):**
- Botão: `bg-[#3e5653]/80 cursor-not-allowed`
- Spinner: `Loader2` animado
- Texto: "Criando sua conta..."
- Overlay no card opcional

**Estado Sucesso:**
- Confetti animation (opcional)
- Toast: `bg-green-50 border border-green-200 rounded-lg p-4`
- Ícone: `PartyPopper` - `w-6 h-6 text-green-600`
- Título: "Cadastro realizado com sucesso!"
- Mensagem: "Redirecionando para o dashboard..."
- Redirecionamento automático para /dashboard após 2-3 segundos

**Estado Erro (API):**
- Alert: `bg-red-50 border border-red-200 rounded-lg p-4`
- Ícone: `AlertCircle` - `w-5 h-5 text-red-600`
- Mensagem: "Erro ao criar conta. Tente novamente."
- Botão "Tentar novamente"

### Navegação

- **Entrada:** Etapa 2 (/cadastro/etapa-2)
- **Saída voltar:** /cadastro/etapa-2
- **Saída sucesso:** /dashboard (com mensagem de boas-vindas)

### Regras de Negócio

- **RN-CAD3-001:** Termos de uso são obrigatórios para finalização
- **RN-CAD3-002:** Newsletter é opcional (default: false)
- **RN-CAD3-003:** Ao finalizar, criar:
  - Usuário com perfil ADMIN
  - Empresa vinculada
  - Relação usuário-empresa
  - Dashboard inicial personalizado
- **RN-CAD3-004:** Enviar email de boas-vindas (não bloqueante)
- **RN-CAD3-005:** Criar notificações de onboarding no dashboard
- **RN-CAD3-006:** Redirecionar para /dashboard com tutorial de primeiro acesso

---

## 📱 Responsividade por Tela

### Landing Page
| Breakpoint | Layout |
|------------|--------|
| **Mobile (< 640px)** | Single column, texto centralizado, menu hambúrguer, cards empilhados |
| **Tablet (640px - 1023px)** | Grid 2 colunas para módulos, hero reduzido |
| **Desktop (>= 1024px)** | Full layout, grid 3 colunas módulos, sidebar hero |

### Login / Cadastro
| Breakpoint | Layout |
|------------|--------|
| **Mobile (< 1024px)** | Apenas formulário, sem sidebar, header com progresso |
| **Desktop (>= 1024px)** | Sidebar 320px fixa + Conteúdo flexível |

**Breakpoints Tailwind:**
- `sm:` >= 640px
- `md:` >= 768px
- `lg:` >= 1024px
- `xl:` >= 1280px

---

## 🔗 Navegação entre Telas

```
[LANDING PAGE (/)] 
    ↓ "Começar Grátis"
[CADASTRO ETAPA 1] ←→ [LOGIN]
    ↓
[CADASTRO ETAPA 2]
    ↓
[CADASTRO ETAPA 3]
    ↓
[DASHBOARD (/dashboard)]
```

**Fluxo Principal:**
1. Visitante acessa Landing Page
2. Clica "Começar Grátis" → Cadastro Etapa 1
3. Preenche dados pessoais → Etapa 2
4. Preenche dados empresa → Etapa 3
5. Revisa e aceita termos → Dashboard

**Fluxo Alternativo (Login):**
1. Visitante acessa Landing Page
2. Clica "Entrar" → Login
3. Autentica → Dashboard

---

## ✅ Checklist de Implementação

### Landing Page
- [ ] Header fixo com glassmorphism e transição no scroll
- [ ] Hero section com gradiente sutil e CTAs
- [ ] Seção "Como Funciona" com 4 cards
- [ ] Seção "Módulos" com 9 cards em grid responsivo
- [ ] Seção "Preço" com 3 planos (destaque no Pro)
- [ ] Seção "Depoimentos" com cards
- [ ] CTA final com fundo #1f2937
- [ ] Footer completo
- [ ] Menu mobile hambúrguer
- [ ] Animações de entrada

### Login
- [ ] Sidebar escura com ilustração (desktop)
- [ ] Card branco com formulário
- [ ] Campos: Email, Senha (com toggle)
- [ ] Checkbox "Lembrar-me"
- [ ] Link "Esqueci minha senha"
- [ ] Botão "Entrar" na cor #3e5653
- [ ] Botão Google
- [ ] Link para cadastro
- [ ] Estados: loading, erro, sucesso
- [ ] Validações em tempo real

### Cadastro Etapa 1: Conta
- [ ] Sidebar com progresso dos 3 passos
- [ ] Card com formulário de dados pessoais
- [ ] Campos: Nome, Email, CPF, Telefone, Senha, Confirmar Senha
- [ ] Indicador de força de senha
- [ ] Lista de requisitos com check dinâmico
- [ ] Validações de CPF e email
- [ ] Botão "Próximo Passo"

### Cadastro Etapa 2: Empresa
- [ ] Sidebar com progresso atualizado (passo 2 ativo)
- [ ] Campos: Nome Empresa, CNPJ, Telefone, Ramo, Funcionários
- [ ] Campo CEP com autocomplete
- [ ] Campos de endereço (autopreenchidos ou manuais)
- [ ] Estados de busca CEP (loading, sucesso, erro)
- [ ] Botões "Voltar" e "Próximo"

### Cadastro Etapa 3: Configuração
- [ ] Sidebar com progresso completo
- [ ] Resumo dos dados pessoais (editável)
- [ ] Resumo dos dados da empresa (editável)
- [ ] Checkbox de termos obrigatório
- [ ] Checkbox de newsletter opcional
- [ ] Links para Termos e Privacidade
- [ ] Botões "Voltar" e "Finalizar Cadastro"
- [ ] Estado de sucesso com confetti

### Geral
- [ ] Fonte Poppins aplicada globalmente
- [ ] Todas as cores da paleta aplicadas
- [ ] Responsividade testada em mobile, tablet e desktop
- [ ] Animações e transições suaves
- [ ] Estados de loading implementados
- [ ] Tratamento de erros completo
- [ ] Ícones Lucide React em todos os lugares
- [ ] Navegação fluida entre telas
- [ ] Integração com API de autenticação

---

## 🎨 Anexos

### Cores Tailwind Customizadas
```javascript
// tailwind.config.js
colors: {
  uniq: {
    platinum: '#efefef',
    white: '#ffffff',
    sidebar: '#1f2937',
    primary: '#3e5653',
    hover: '#1f2937',
    accent: '#86cb92',
    text: '#1f2937',
    muted: '#627271',
    border: '#e5e7eb',
  }
}
```

### Fonte Poppins
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Ícones Utilizados (Lucide React)
- `Building2` - Logo e empresa
- `User` - Usuário
- `Mail` - Email
- `Lock` - Senha
- `Eye` / `EyeOff` - Toggle senha
- `Phone` - Telefone
- `CreditCard` - CPF/CNPJ
- `MapPin` / `Home` - Endereço
- `Briefcase` - Ramo
- `Users` - Funcionários
- `Check` / `CheckCircle2` - Checkboxes
- `X` / `AlertCircle` / `AlertTriangle` - Erros
- `ArrowRight` / `ArrowLeft` - Navegação
- `Loader2` - Loading
- `Star` - Avaliações
- `TrendingUp` - Crescimento
- `Wallet` - Financeiro
- `HeartHandshake` - CRM
- `FileText` - Contratos
- `Megaphone` - Marketing
- `Package` - Estoque
- `CheckSquare` - Tarefas
- `BarChart3` - BI
- `FolderOpen` - Documentos
- `Menu` - Mobile menu
- `ChevronDown` - Dropdown
- `PartyPopper` - Sucesso

---

**Fim da Documentação**
