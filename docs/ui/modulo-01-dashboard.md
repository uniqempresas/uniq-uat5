# 🎯 UNIQ Empresas - Documentação de UI/UX
## Módulo 01: Dashboard (Minha Empresa)

**Versão:** 1.0  
**Última atualização:** 12/03/2026  
**Módulo:** 01 - Dashboard  
**Total de Telas:** 3 telas  
**Tema:** Modo Claro (Light Mode)

---

## 📋 Sumário

1. [Tela 1: Dashboard Principal](#tela-1-dashboard-principal)
2. [Tela 2: Perfil](#tela-2-perfil)
3. [Tela 3: Notificações](#tela-3-notificacoes)

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
| **Texto Sidebar** | Branco/Cinza | `#ffffff` / `#9ca3af` | Textos na sidebar escura |
| **Bordas** | Gray-200 | `#e5e7eb` | Bordas de inputs e cards |
| **Sucesso** | Green | `#16a34a` | Estados de sucesso |
| **Erro** | Red | `#dc2626` | Estados de erro, alertas |
| **Aviso** | Amber | `#f59e0b` | Avisos, atenção |
| **Info** | Blue | `#3b82f6` | Informações |

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
| H1 | `text-3xl md:text-4xl` | `font-bold` (700) | `#1f2937` |
| H2 | `text-2xl md:text-3xl` | `font-bold` (700) | `#1f2937` |
| H3 | `text-xl md:text-2xl` | `font-semibold` (600) | `#1f2937` |
| H4 | `text-lg` | `font-semibold` (600) | `#1f2937` |
| Body | `text-base` | `font-normal` (400) | `#627271` |
| Small | `text-sm` | `font-normal` (400) | `#627271` |
| Caption | `text-xs` | `font-medium` (500) | `#627271` |
| Metric Value | `text-2xl md:text-3xl` | `font-bold` (700) | `#1f2937` |

### Layout Patterns

**Container Principal:**
```
Desktop (>=1024px):
┌──────────────────────────────────────────────────────────────┐
│  SIDEBAR ESCURA     │    HEADER (fixo)                        │
│  bg-[#1f2937]       │    bg-white                             │
│  w-64 (256px)       │    h-16                                 │
│  h-screen fixed     │    border-b border-[#e5e7eb]            │
│                     │                                         │
│  • Logo UNIQ        ├─────────────────────────────────────────┤
│  • Menu Principal   │                                         │
│  • Divisor          │    CONTEÚDO                             │
│  • Módulos          │    bg-[#efefef]                         │
│  • Footer Menu      │    min-h-[calc(100vh-64px)]             │
│  • Perfil Usuário   │    p-6                                  │
│                     │                                         │
│                     │    • Cards Métricas                     │
│                     │    • Grid Conteúdo                      │
│                     │    • Tabelas                            │
└──────────────────────────────────────────────────────────────┘
```

**Card Pattern:**
- Fundo: `bg-white`
- Borda: `border border-[#e5e7eb]`
- Borda-radius: `rounded-xl` (12px)
- Sombra: `shadow-sm` ou `shadow-md`
- Padding: `p-6` (24px)
- Hover: `hover:shadow-md transition-shadow duration-200`

**Input Pattern:**
- Fundo: `bg-white`
- Borda: `border border-[#e5e7eb]`
- Borda-radius: `rounded-lg` (8px)
- Padding: `py-2.5 px-4`
- Focus: `focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92]`

**Botão Primário:**
- Fundo: `bg-[#3e5653]`
- Texto: `text-white`
- Hover: `hover:bg-[#1f2937]`
- Padding: `py-2.5 px-4`
- Borda-radius: `rounded-lg` (8px)
- Fonte: `font-medium`

**Botão Secundário:**
- Fundo: `bg-white`
- Borda: `border border-[#e5e7eb]`
- Texto: `text-[#1f2937]`
- Hover: `hover:bg-[#efefef]`

**Badge Pattern:**
- Borda-radius: `rounded-full`
- Padding: `px-2.5 py-0.5`
- Fonte: `text-xs font-medium`

### Ícones

- **Biblioteca:** Lucide React (`lucide-react`)
- **Tamanho padrão:** 20px (`w-5 h-5`)
- **Tamanho grande:** 24px (`w-6 h-6`)
- **Tamanho métricas:** 24px em círculo 48px
- **Cor padrão:** `#627271`
- **Cor destaque:** `#86cb92`
- **Cor sidebar ativo:** `#86cb92`

---

## Tela 1: Dashboard Principal

**Rota:** `/dashboard`  
**Objetivo:** Visão geral do negócio, métricas principais e ações rápidas  
**Módulo:** Dashboard (Minha Empresa)  
**Tipo:** Página autenticada (requer login)

### Layout

- **Container:** `min-h-screen bg-[#efefef]`
- **Estrutura:** Sidebar fixa + Header fixo + Conteúdo scrollável
- **Background Principal:** `#efefef`

### Componentes

#### 1. Sidebar

**Container:**
- **Tipo:** Barra lateral escura fixa
- **Width:** `w-64` (256px)
- **Height:** `h-screen fixed left-0 top-0 z-40`
- **Background:** `bg-[#1f2937]`
- **Display:** `flex flex-col`

**Header da Sidebar:**
- **Logo UNIQ:**
  - Container: `p-6`
  - Ícone: `Building2` - `w-8 h-8 text-[#86cb92]`
  - Texto: "UNIQ" - `text-2xl font-bold text-white ml-3`
  - Layout: `flex items-center`

**Seção "Principal":**
- **Título da seção:** "Principal" - `px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider`
- **Itens de menu:**

**Item 1: Dashboard (Ativo)**
- Container: `px-3 py-2 mx-4 rounded-lg bg-[#3e5653] flex items-center gap-3`
- Ícone: `LayoutDashboard` - `w-5 h-5 text-[#86cb92]`
- Texto: "Dashboard" - `text-sm font-medium text-white`
- Indicador ativo: Borda esquerda `border-l-2 border-[#86cb92]` ou bg como acima

**Item 2: Minha Empresa**
- Container: `px-3 py-2 mx-4 rounded-lg hover:bg-white/10 flex items-center gap-3 transition-colors`
- Ícone: `Building2` - `w-5 h-5 text-gray-400`
- Texto: "Minha Empresa" - `text-sm font-medium text-gray-300`

**Item 3: Marketplace**
- Container: `px-3 py-2 mx-4 rounded-lg hover:bg-white/10 flex items-center gap-3 transition-colors`
- Ícone: `ShoppingBag` - `w-5 h-5 text-gray-400`
- Texto: "Meus Módulos" - `text-sm font-medium text-gray-300`
- Badge: `px-2 py-0.5 bg-[#86cb92] text-[#1f2937] text-xs font-bold rounded-full ml-auto` com número de módulos

**Divisor:**
- Elemento: `<div class="border-t border-gray-700 my-4 mx-4"></div>`

**Seção "Módulos Instalados" (Dinâmico):**
- **Título:** "Módulos" - `px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider`
- **Lista dinâmica:** Mostra apenas módulos ativos da empresa

**Item: CRM**
- Container: `px-3 py-2 mx-4 rounded-lg hover:bg-white/10 flex items-center gap-3 transition-colors`
- Ícone: `Users` - `w-5 h-5 text-gray-400`
- Texto: "CRM" - `text-sm font-medium text-gray-300`
- Badge notificação (opcional): `w-2 h-2 bg-red-500 rounded-full ml-auto`

**Item: Financeiro**
- Ícone: `Wallet` - `w-5 h-5 text-gray-400`
- Texto: "Financeiro"

**Item: Estoque**
- Ícone: `Package` - `w-5 h-5 text-gray-400`
- Texto: "Estoque"

**Item: Vendas**
- Ícone: `ShoppingCart` - `w-5 h-5 text-gray-400`
- Texto: "Vendas"

**Item: Loja Virtual**
- Ícone: `Store` - `w-5 h-5 text-gray-400`
- Texto: "Loja Virtual"

**Item: Agendamentos**
- Ícone: `Calendar` - `w-5 h-5 text-gray-400`
- Texto: "Agendamentos"

**Item: MEL (Assistente)**
- Ícone: `Bot` - `w-5 h-5 text-[#86cb92]`
- Texto: "MEL" - `text-sm font-medium text-[#86cb92]`
- Badge "Novo": `px-1.5 py-0.5 bg-[#86cb92]/20 text-[#86cb92] text-[10px] font-bold rounded ml-auto`

**Footer da Sidebar:**
- **Posição:** `mt-auto` (empurra para baixo)
- **Seção Configurações:**
  - Container: `px-3 py-2 mx-4 rounded-lg hover:bg-white/10 flex items-center gap-3 transition-colors`
  - Ícone: `Settings` - `w-5 h-5 text-gray-400`
  - Texto: "Configurações" - `text-sm font-medium text-gray-300`

**Seção Sair:**
- Container: `px-3 py-2 mx-4 rounded-lg hover:bg-red-500/20 flex items-center gap-3 transition-colors`
- Ícone: `LogOut` - `w-5 h-5 text-red-400`
- Texto: "Sair" - `text-sm font-medium text-red-400`

**Perfil do Usuário:**
- Container: `p-4 mx-4 mt-4 border-t border-gray-700`
- Layout: `flex items-center gap-3`
- **Avatar:**
  - Variante 1 (com foto): `w-10 h-10 rounded-full object-cover`
  - Variante 2 (iniciais): `w-10 h-10 rounded-full bg-[#3e5653] flex items-center justify-center text-white font-semibold text-sm`
- **Info:**
  - Nome: `text-sm font-medium text-white truncate max-w-[140px]` - "Carlos Silva"
  - Empresa: `text-xs text-gray-400 truncate max-w-[140px]` - "Tech Solutions Ltda"

#### 2. Header Superior

**Container:**
- **Tipo:** Header fixo no topo
- **Position:** `fixed top-0 left-64 right-0 z-30` (left-64 compensa sidebar)
- **Height:** `h-16`
- **Background:** `bg-white`
- **Borda:** `border-b border-[#e5e7eb]`
- **Padding:** `px-6`
- **Layout:** `flex items-center justify-between`

**Lado Esquerdo:**
- **Container:** `flex items-center gap-4`
- **Título da página:** "Dashboard" - `text-xl font-bold text-[#1f2937]`
- **Breadcrumbs:** "Início / Dashboard" - `text-sm text-[#627271]`
  - Separador: `ChevronRight` - `w-4 h-4 text-[#627271] mx-1`

**Centro (Busca):**
- **Container:** `flex-1 max-w-xl mx-8`
- **Wrapper:** `relative`
- **Ícone busca:** `Search` - `absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]`
- **Input:**
  - Classes: `w-full pl-10 pr-12 py-2 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-sm text-[#1f2937] placeholder-[#627271] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all`
  - Placeholder: "Buscar produtos, clientes, pedidos..."
- **Atalho teclado:** `⌘K`
  - Container: `absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[#e5e7eb] rounded text-xs text-[#627271] font-medium`

**Lado Direito:**
- **Container:** `flex items-center gap-3`

**Botão Notificações:**
- Container: `relative p-2 rounded-lg hover:bg-[#efefef] transition-colors`
- Ícone: `Bell` - `w-5 h-5 text-[#627271]`
- Badge (quando houver notificações): `absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center`
- Badge múltiplas: `w-auto px-1.5 min-w-[20px]`

**Botão Ajuda:**
- Container: `p-2 rounded-lg hover:bg-[#efefef] transition-colors`
- Ícone: `HelpCircle` - `w-5 h-5 text-[#627271]`

**Separador:**
- Elemento: `<div class="w-px h-6 bg-[#e5e7eb]"></div>`

**Avatar Usuário (Dropdown):**
- Container: `flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-[#efefef] transition-colors`
- Avatar: `w-8 h-8 rounded-full bg-[#3e5653]` ou foto
- Ícone dropdown: `ChevronDown` - `w-4 h-4 text-[#627271]`
- **Dropdown menu (aberto):**
  - Container: `absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#e5e7eb] py-2 z-50`
  - Item: `px-4 py-2 hover:bg-[#efefef] flex items-center gap-3 text-sm text-[#1f2937]`
  - Items: "Meu Perfil", "Configurações da Empresa", "Tema", "Sair"
  - Divisor: `border-t border-[#e5e7eb] my-2`

#### 3. Área de Conteúdo

**Container:**
- **Margin:** `ml-64 pt-16` (compensa sidebar + header)
- **Padding:** `p-6`
- **Background:** `bg-[#efefef]`
- **Min-height:** `min-h-[calc(100vh-64px)]`

#### 4. Cards de Métricas (Grid 4 colunas)

**Container:**
- **Grid:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6`

**Card 1: Vendas do Mês**
- Container: `bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow`
- Layout: `flex items-start justify-between`
- **Ícone container:** `w-12 h-12 rounded-xl bg-[#86cb92]/20 flex items-center justify-center`
  - Ícone: `TrendingUp` - `w-6 h-6 text-[#86cb92]`
- **Conteúdo:**
  - Valor: `text-2xl font-bold text-[#1f2937]` - "R$ 12.450,00"
  - Label: `text-sm text-[#627271] mt-1` - "Vendas (Mês)"
  - Variação: `flex items-center gap-1 mt-2`
    - Ícone: `ArrowUpRight` - `w-4 h-4 text-green-600`
    - Texto: `text-xs font-medium text-green-600` - "+15% vs mês anterior"

**Card 2: Pedidos Hoje**
- **Ícone container:** `w-12 h-12 rounded-xl bg-[#3e5653]/20 flex items-center justify-center`
  - Ícone: `ShoppingBag` - `w-6 h-6 text-[#3e5653]`
- **Conteúdo:**
  - Valor: `text-2xl font-bold text-[#1f2937]` - "23"
  - Label: `text-sm text-[#627271] mt-1` - "Pedidos Hoje"
  - Status: `text-xs text-[#86cb92] font-medium mt-2` - "8 em processamento"

**Card 3: Clientes Ativos**
- **Ícone container:** `w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center`
  - Ícone: `Users` - `w-6 h-6 text-blue-600`
- **Conteúdo:**
  - Valor: `text-2xl font-bold text-[#1f2937]` - "156"
  - Label: `text-sm text-[#627271] mt-1` - "Clientes Ativos"
  - Novos: `flex items-center gap-1 mt-2`
    - Ícone: `UserPlus` - `w-3 h-3 text-[#86cb92]`
    - Texto: `text-xs text-[#86cb92] font-medium` - "+5 esta semana"

**Card 4: Estoque Crítico**
- **Ícone container:** `w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center`
  - Ícone: `AlertTriangle` - `w-6 h-6 text-red-600`
- **Conteúdo:**
  - Valor: `text-2xl font-bold text-[#1f2937]` - "4 Produtos"
  - Label: `text-sm text-[#627271] mt-1` - "Estoque Crítico"
  - Alerta: `text-xs text-red-600 font-medium mt-2` - "Ação necessária"

#### 5. Grid de Conteúdo (2 colunas)

**Container:**
- **Grid:** `grid grid-cols-1 lg:grid-cols-3 gap-6`

##### Coluna Esquerda (2/3 - lg:col-span-2)

**Card: Vendas Recentes**
- Container: `bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden`
- **Header:**
  - Container: `px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between`
  - Título: `text-lg font-semibold text-[#1f2937] flex items-center gap-2`
    - Ícone: `ShoppingCart` - `w-5 h-5 text-[#86cb92]`
    - Texto: "Vendas Recentes"
  - Link: `text-sm text-[#3e5653] hover:text-[#1f2937] font-medium flex items-center gap-1`
    - Texto: "Ver todas"
    - Ícone: `ArrowRight` - `w-4 h-4`
  - Botão primário (opcional): `px-4 py-2 bg-[#3e5653] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937] flex items-center gap-2`
    - Ícone: `Plus` - `w-4 h-4`
    - Texto: "Nova Venda"

- **Tabela:**
  - Container: `overflow-x-auto`
  - Table: `w-full`
  - Header: `bg-[#f9fafb]`
    - Row: `border-b border-[#e5e7eb]`
    - Cell: `px-6 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider`
    - Colunas: "Pedido", "Cliente", "Data", "Valor", "Status"
  - Body:
    - Row: `border-b border-[#e5e7eb] hover:bg-gray-50 transition-colors`
    - Cell: `px-6 py-4 whitespace-nowrap`
    
  **Colunas da tabela:**
  1. **Pedido:** `text-sm font-medium text-[#1f2937]` - "#12345"
  2. **Cliente:** 
     - Layout: `flex items-center gap-3`
     - Avatar: `w-8 h-8 rounded-full bg-[#3e5653] flex items-center justify-center text-white text-xs font-bold`
     - Nome: `text-sm text-[#1f2937]` - "Maria Oliveira"
  3. **Data:** `text-sm text-[#627271]` - "12/03/2026"
  4. **Valor:** `text-sm font-medium text-[#1f2937]` - "R$ 299,90"
  5. **Status:**
     - Badge: `px-2.5 py-1 rounded-full text-xs font-medium`
     - Cores:
       - Concluído: `bg-green-100 text-green-700`
       - Processando: `bg-yellow-100 text-yellow-700`
       - Cancelado: `bg-red-100 text-red-700`
       - Pendente: `bg-gray-100 text-gray-700`

- **Estado Vazio:**
  - Container: `py-12 text-center`
  - Ícone: `ShoppingCart` - `w-12 h-12 text-[#e5e7eb] mx-auto mb-4`
  - Título: `text-sm font-medium text-[#1f2937]` - "Nenhuma venda recente"
  - Descrição: `text-sm text-[#627271]` - "As vendas aparecerão aqui"
  - Botão: `mt-4 px-4 py-2 bg-[#3e5653] text-white text-sm rounded-lg`

**Card: Produtos Mais Vendidos**
- Container: `bg-white rounded-xl border border-[#e5e7eb] shadow-sm mt-6`
- **Header:**
  - Container: `px-6 py-4 border-b border-[#e5e7eb]`
  - Título: `text-lg font-semibold text-[#1f2937] flex items-center gap-2`
    - Ícone: `Package` - `w-5 h-5 text-[#86cb92]`
    - Texto: "Top Produtos"

- **Lista:**
  - Container: `p-6 space-y-4`
  
  **Item da lista:**
  - Layout: `flex items-center gap-4`
  - **Imagem:** `w-12 h-12 rounded-lg bg-[#efefef] flex items-center justify-center`
    - Placeholder: `Package` - `w-6 h-6 text-[#627271]` ou imagem real
  - **Info:** `flex-1 min-w-0`
    - Nome: `text-sm font-medium text-[#1f2937] truncate` - "Notebook Dell Inspiron"
    - Quantidade: `text-xs text-[#627271]` - "45 vendidos"
  - **Progresso:**
    - Container: `w-24 h-2 bg-[#e5e7eb] rounded-full overflow-hidden`
    - Barra: `h-full bg-[#86cb92] rounded-full` (width conforme percentual)
  - **Percentual:** `text-sm font-medium text-[#1f2937] w-12 text-right` - "85%"

##### Coluna Direita (1/3)

**Card: Próximos Agendamentos** (se módulo ativo)
- Container: `bg-white rounded-xl border border-[#e5e7eb] shadow-sm`
- **Header:**
  - Container: `px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between`
  - Título: `text-lg font-semibold text-[#1f2937] flex items-center gap-2`
    - Ícone: `Calendar` - `w-5 h-5 text-[#86cb92]`
    - Texto: "Hoje"
  - Data: `text-sm text-[#627271]` - "12 de Março"

- **Lista de horários:**
  - Container: `p-4 space-y-3`
  
  **Item de agendamento:**
  - Layout: `flex items-start gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors`
  - **Horário:** 
    - Container: `flex flex-col items-center min-w-[50px]`
    - Hora: `text-sm font-bold text-[#1f2937]` - "14:00"
    - Indicador: `w-2 h-2 rounded-full bg-[#86cb92] mt-1`
  - **Info:** `flex-1 min-w-0`
    - Cliente: `text-sm font-medium text-[#1f2937] truncate` - "João Pedro"
    - Serviço: `text-xs text-[#627271] truncate` - "Corte de cabelo"
  - **Ações:**
    - Botão: `p-1.5 rounded-lg hover:bg-[#e5e7eb] transition-colors`
    - Ícone: `MoreVertical` - `w-4 h-4 text-[#627271]`

- **Ver mais:**
  - Container: `px-6 py-3 border-t border-[#e5e7eb] text-center`
  - Link: `text-sm text-[#3e5653] hover:text-[#1f2937] font-medium`

**Card: MEL - Assistente**
- Container: `bg-white rounded-xl border border-[#e5e7eb] shadow-sm mt-6`
- **Header:**
  - Container: `px-6 py-4 border-b border-[#e5e7eb] flex items-center gap-3`
  - Ícone MEL: `Bot` - `w-6 h-6 text-[#86cb92]`
  - Título: `text-lg font-semibold text-[#1f2937]` - "MEL"
  - Status: `px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full` - "Online"

- **Mensagem:**
  - Container: `p-6 bg-[#86cb92]/5`
  - Layout: `flex gap-3`
  - Avatar MEL: `w-8 h-8 rounded-full bg-[#86cb92] flex items-center justify-center`
    - Ícone: `Bot` - `w-5 h-5 text-white`
  - Balão: `flex-1 p-3 bg-white rounded-xl rounded-tl-none shadow-sm`
    - Texto: `text-sm text-[#1f2937]` - "Bom dia! Você tem 4 pedidos para processar hoje."
    - Hora: `text-xs text-[#627271] mt-1` - "10:30"

- **Sugestões rápidas:**
  - Container: `p-4 space-y-2`
  - Botão sugestão: `w-full px-4 py-2.5 text-left text-sm text-[#1f2937] bg-[#f9fafb] hover:bg-[#efefef] rounded-lg transition-colors flex items-center gap-2`
    - Ícone: `Sparkles` - `w-4 h-4 text-[#86cb92]`
    - Textos: "Ver relatório de vendas", "Cadastrar novo produto", "Configurar lembretes"

- **Input de chat:**
  - Container: `p-4 border-t border-[#e5e7eb]`
  - Wrapper: `relative`
  - Input: `w-full pl-4 pr-12 py-3 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-sm text-[#1f2937] placeholder-[#627271] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92]`
  - Placeholder: "Pergunte à MEL..."
  - Botão enviar: `absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors`
    - Ícone: `Send` - `w-4 h-4`

**Card: Ações Rápidas**
- Container: `bg-white rounded-xl border border-[#e5e7eb] shadow-sm mt-6`
- **Header:**
  - Container: `px-6 py-4 border-b border-[#e5e7eb]`
  - Título: `text-lg font-semibold text-[#1f2937]` - "Ações Rápidas"

- **Grid de botões:**
  - Container: `p-6 grid grid-cols-2 gap-3`
  
  **Botão de ação:**
  - Container: `flex flex-col items-center gap-2 p-4 rounded-xl border border-[#e5e7eb] hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-all cursor-pointer`
  - Ícone container: `w-10 h-10 rounded-lg bg-[#3e5653]/10 flex items-center justify-center`
    - Ícone: `Plus` / `UserPlus` / `PackagePlus` / `ExternalLink` - `w-5 h-5 text-[#3e5653]`
  - Texto: `text-xs font-medium text-[#1f2937] text-center`
  
  **Ações:**
  1. "Nova Venda" - `Plus`
  2. "Novo Cliente" - `UserPlus`
  3. "Cadastrar Produto" - `PackagePlus`
  4. "Ver Loja" - `ExternalLink`

#### 5. Botão Flutuante (FAB)

**Container:**
- **Position:** `fixed bottom-6 right-6 z-40`
- **Layout:** `flex flex-col items-end gap-3`

**Botão principal:**
- Container: `w-14 h-14 bg-[#3e5653] hover:bg-[#1f2937] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 group`
- Ícone: `Plus` - `w-6 h-6 group-hover:rotate-90 transition-transform duration-200`

**Menu rápido (aberto):**
- Container: `flex flex-col items-end gap-2 mb-3`
- **Item do menu:**
  - Layout: `flex items-center gap-3`
  - Label: `px-3 py-1.5 bg-[#1f2937] text-white text-sm rounded-lg shadow-md`
  - Botão: `w-10 h-10 bg-white hover:bg-[#efefef] rounded-full shadow-md flex items-center justify-center transition-colors`
    - Ícones: `Plus`, `UserPlus`, `PackagePlus`, `ExternalLink` - `w-5 h-5 text-[#3e5653]`

#### 6. Sidebar Mobile (Drawer)

**Overlay:**
- Container: `fixed inset-0 bg-black/50 z-40 lg:hidden` (quando aberto)
- Click: Fecha drawer

**Drawer:**
- Container: `fixed left-0 top-0 h-full w-64 bg-[#1f2937] z-50 transform transition-transform duration-300 -translate-x-full lg:hidden lg:translate-x-0`
- Fechar: Botão `X` no header ou swipe

**Botão hambúrguer (Header mobile):**
- Container: `lg:hidden p-2 rounded-lg hover:bg-[#efefef] mr-3`
- Ícone: `Menu` - `w-6 h-6 text-[#1f2937]`

### Estados

**Estado Inicial:**
- Sidebar expandida (desktop) / fechada (mobile)
- Métricas carregadas com dados reais ou "-" enquanto carrega
- MEL mostra saudação personalizada conforme hora do dia
- Notificações mostram badge se houver não lidas

**Estado Carregando (Skeleton):**
- Cards de métricas: `bg-white rounded-xl p-6`
  - Círculo: `w-12 h-12 rounded-xl bg-gray-200 animate-pulse`
  - Linhas: `h-4 bg-gray-200 rounded animate-pulse mt-2`
- Tabela: Linhas com `h-12 bg-gray-100 animate-pulse` intercaladas
- Gráficos: Retângulos `h-32 bg-gray-200 rounded animate-pulse`

**Estado Erro (Carregamento):**
- Alert no topo do conteúdo:
  - Container: `mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3`
  - Ícone: `AlertCircle` - `w-5 h-5 text-red-600`
  - Texto: `text-sm text-red-800` - "Erro ao carregar dados. Tente novamente."
  - Botão: `px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700`

**Estado Vazio (Vendas):**
- Card mostra estado vazio conforme descrito acima

**Estado Hover (Cards):**
- `hover:shadow-md transition-shadow duration-200`
- Cards de métricas: Ícone container `group-hover:scale-110 transition-transform`

**Estado Hover (Tabela):**
- Row: `hover:bg-gray-50 transition-colors`
- Cursor: `cursor-pointer` em toda a row

**Estado Focus (Busca):**
- Input: `focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92]`
- Atalho ⌘K funciona globalmente

**Estado Modal Aberto (Busca Global):**
- Overlay: `fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[20vh]`
- Modal: `w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden`
- Header: Input de busca grande + X para fechar
- Conteúdo: Resultados em tempo real categorizados

### Responsividade

| Breakpoint | Layout |
|------------|--------|
| **Mobile (< 768px)** | Sidebar vira drawer, cards métricas 1 coluna, grid conteúdo empilhado, header sem breadcrumbs |
| **Tablet (768px - 1023px)** | Sidebar colapsada (apenas ícones) ou drawer, cards métricas 2 colunas, grid conteúdo empilhado |
| **Desktop (>= 1024px)** | Layout completo, grid 4 colunas métricas, 2 colunas conteúdo |

**Breakpoints Tailwind:**
- `sm:` >= 640px
- `md:` >= 768px
- `lg:` >= 1024px
- `xl:` >= 1280px

### Regras de Negócio

- **RN-DASH-001:** Dashboard é a primeira tela após login bem-sucedido
- **RN-DASH-002:** Métricas são atualizadas em tempo real (WebSocket) ou a cada 5 minutos
- **RN-DASH-003:** Cards de módulos dinâmicos mostram apenas módulos instalados e ativos
- **RN-DASH-004:** MEL mostra saudação contextual baseada no horário:
  - 05h-12h: "Bom dia!"
  - 12h-18h: "Boa tarde!"
  - 18h-05h: "Boa noite!"
- **RN-DASH-005:** Card "Estoque Crítico" aparece apenas se houver produtos abaixo do mínimo
- **RN-DASH-006:** Card "Próximos Agendamentos" aparece apenas se módulo de agendamentos estiver ativo
- **RN-DASH-007:** Notificações não lidas são persistidas e sincronizadas entre dispositivos
- **RN-DASH-008:** Busca global (⌘K) permite buscar: produtos, clientes, pedidos, relatórios
- **RN-DASH-009:** FAB aparece apenas em mobile e tablet (< 1024px)
- **RN-DASH-010:** Sidebar guarda estado (expandida/colapsada) no localStorage
- **RN-DASH-011:** Tabela de vendas mostra máximo 5 registros no dashboard (ver todas vai para módulo)
- **RN-DASH-012:** Vendas do mês são calculadas do dia 1 até hoje do mês atual

---

## Tela 2: Perfil

**Rota:** `/perfil`  
**Objetivo:** Editar dados do usuário e da empresa  
**Módulo:** Dashboard (Minha Empresa)  
**Tipo:** Página autenticada

### Layout

- **Container:** `min-h-screen bg-[#efefef] ml-64 pt-16 p-6` (desktop)
- **Max-width:** `max-w-5xl mx-auto`
- **Estrutura:** Tabs + Formulários

### Componentes

#### 1. Header da Página

**Container:**
- **Layout:** `mb-8`
- **Título:** "Configurações de Perfil" - `text-3xl font-bold text-[#1f2937]`
- **Subtítulo:** "Gerencie suas informações pessoais e da empresa" - `text-[#627271] mt-2`

#### 2. Tabs

**Container:**
- **Background:** `bg-white rounded-xl border border-[#e5e7eb] shadow-sm`
- **Nav tabs:** `border-b border-[#e5e7eb] flex overflow-x-auto`

**Tab Item:**
- Ativa: `px-6 py-4 text-sm font-medium text-[#3e5653] border-b-2 border-[#3e5653] flex items-center gap-2 whitespace-nowrap`
- Inativa: `px-6 py-4 text-sm font-medium text-[#627271] hover:text-[#1f2937] flex items-center gap-2 whitespace-nowrap transition-colors`

**Tabs:**
1. **Dados Pessoais** - `User`
2. **Dados da Empresa** - `Building2`
3. **Preferências** - `Settings`
4. **Segurança** - `Shield`

#### 3. Tab 1: Dados Pessoais

**Container:** `p-6 md:p-8`

**Seção: Foto de Perfil**
- **Container:** `flex items-center gap-6 mb-8 pb-8 border-b border-[#e5e7eb]`
- **Avatar grande:**
  - Variante 1 (com foto): `w-24 h-24 rounded-full object-cover`
  - Variante 2 (iniciais): `w-24 h-24 rounded-full bg-[#3e5653] flex items-center justify-center text-white text-2xl font-bold`
- **Info:**
  - Título: `text-lg font-semibold text-[#1f2937]` - "Foto de Perfil"
  - Descrição: `text-sm text-[#627271] mt-1` - "Esta foto será exibida no seu perfil"
- **Ações:** `flex gap-3 mt-3`
  - Botão primário: `px-4 py-2 bg-[#3e5653] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937] flex items-center gap-2`
    - Ícone: `Upload` - `w-4 h-4`
    - Texto: "Alterar foto"
  - Botão secundário (quando tem foto): `px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50`
    - Ícone: `Trash2` - `w-4 h-4`
    - Texto: "Remover"
- **Input file:** `hidden` (trigger via botão)

**Grid de Campos:** `grid grid-cols-1 md:grid-cols-2 gap-6`

**Campo: Nome Completo**
- Label: `block text-sm font-medium text-[#1f2937] mb-1` - "Nome completo *"
- Input: `w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all`
- Placeholder: "Seu nome completo"
- Obrigatório: Sim

**Campo: Email**
- Label: "Email *"
- Input: `type="email"`
- Placeholder: "seu@email.com"
- Obrigatório: Sim
- Help text: `text-xs text-[#627271] mt-1` - "Este email será usado para login"

**Campo: Telefone Pessoal**
- Label: "Telefone *"
- Input: `type="tel"` (com máscara)
- Placeholder: "(00) 00000-0000"
- Ícone esquerda: `Phone` - `absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]`
- Classes input: `pl-10`

**Campo: Cargo/Função**
- Label: "Cargo na empresa"
- Input: `type="text"`
- Placeholder: "Ex: Gerente de Vendas"

**Botão Salvar:**
- Container: `mt-8 flex justify-end`
- Botão: `px-6 py-3 bg-[#3e5653] text-white font-semibold rounded-lg hover:bg-[#1f2937] flex items-center gap-2 transition-all`
  - Ícone: `Save` - `w-5 h-5`
  - Texto: "Salvar Alterações"

#### 4. Tab 2: Dados da Empresa

**Container:** `p-6 md:p-8`

**Seção: Logo da Empresa**
- Container igual ao de foto de perfil
- Avatar: `w-24 h-24 rounded-xl bg-[#efefef] flex items-center justify-center` ou logo
- Ícone placeholder: `Building2` - `w-10 h-10 text-[#627271]`

**Grid de Campos:** `grid grid-cols-1 md:grid-cols-2 gap-6`

**Campo: Nome Fantasia**
- Label: "Nome fantasia *"
- Input: `type="text"`
- Placeholder: "Nome da sua empresa"
- Obrigatório: Sim

**Campo: Razão Social**
- Label: "Razão social"
- Input: `type="text"`
- Placeholder: "Razão social completa"

**Campo: CNPJ**
- Label: "CNPJ *"
- Input: `type="text"` (com máscara)
- Placeholder: "00.000.000/0000-00"
- Ícone esquerda: `CreditCard` - `w-5 h-5 text-[#627271]`
- Obrigatório: Sim

**Campo: Telefone Comercial**
- Label: "Telefone comercial *"
- Input: `type="tel"` (com máscara)
- Placeholder: "(00) 0000-0000"

**Seção: Endereço**
- Título: `text-lg font-semibold text-[#1f2937] mt-8 mb-4` - "Endereço"

**Campo: CEP**
- Label: "CEP *"
- Input: `type="text"` (com máscara)
- Placeholder: "00000-000"
- Ícone direita (buscando): `Loader2` - `w-5 h-5 text-[#86cb92] animate-spin`
- Obrigatório: Sim

**Campo: Logradouro**
- Label: "Endereço *"
- Input: `type="text"`
- Placeholder: "Rua, Avenida, etc."
- Grid: `col-span-2`

**Campo: Número**
- Label: "Número *"
- Input: `type="text"`
- Placeholder: "123"

**Campo: Complemento**
- Label: "Complemento"
- Input: `type="text"`
- Placeholder: "Sala, andar, etc."

**Campo: Bairro**
- Label: "Bairro *"
- Input: `type="text"`
- Obrigatório: Sim

**Campo: Cidade**
- Label: "Cidade *"
- Input: `type="text"`
- Obrigatório: Sim

**Campo: Estado**
- Label: "Estado *"
- Select: `w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white focus:outline-none focus:ring-2 focus:ring-[#86cb92]`
- Options: Lista de UFs
- Obrigatório: Sim

**Seção: Horário de Funcionamento**
- Título: `text-lg font-semibold text-[#1f2937] mt-8 mb-4` - "Horário de Funcionamento"
- Grid dias: `grid grid-cols-1 md:grid-cols-2 gap-4`

**Item de dia:**
- Container: `flex items-center gap-4 p-4 border border-[#e5e7eb] rounded-lg`
- Checkbox: `w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92]`
- Label dia: `text-sm font-medium text-[#1f2937] w-24` - "Segunda-feira"
- Inputs horário: `flex items-center gap-2`
  - Input: `w-20 px-2 py-1.5 text-center border border-[#e5e7eb] rounded` (máscara HH:mm)
  - Texto: `text-[#627271]` - "até"
  - Input: `w-20 px-2 py-1.5 text-center border border-[#e5e7eb] rounded`

**Botão Salvar:**
- Igual ao da Tab 1

#### 5. Tab 3: Preferências

**Container:** `p-6 md:p-8`

**Seção: Notificações**
- Título: `text-lg font-semibold text-[#1f2937] mb-4` - "Notificações"

**Item de preferência:**
- Container: `flex items-center justify-between py-4 border-b border-[#e5e7eb]`
- **Info:**
  - Título: `text-sm font-medium text-[#1f2937]` - "Notificações por Email"
  - Descrição: `text-sm text-[#627271] mt-0.5` - "Receba atualizações importantes no seu email"
- **Toggle:**
  - Container: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors`
  - Ativo: `bg-[#3e5653]`
  - Inativo: `bg-gray-200`
  - Bolinha: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6` (ativo) / `translate-x-1` (inativo)

**Preferências:**
1. Notificações por Email
2. Notificações WhatsApp
3. Alertas de Estoque
4. Resumo Diário de Vendas
5. Novidades e Atualizações

**Seção: Aparência**
- Título: `text-lg font-semibold text-[#1f2937] mt-8 mb-4` - "Aparência"

**Tema:**
- Container: `flex items-center justify-between py-4`
- **Info:**
  - Título: "Tema"
  - Descrição: "Escolha entre modo claro ou escuro"
- **Toggle de tema:**
  - Container: `flex items-center gap-3 p-1 bg-[#efefef] rounded-lg`
  - Botão ativo: `px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-[#1f2937] flex items-center gap-2`
    - Ícone: `Sun` - `w-4 h-4`
    - Texto: "Claro"
  - Botão inativo: `px-4 py-2 text-sm font-medium text-[#627271] hover:text-[#1f2937] flex items-center gap-2`
    - Ícone: `Moon` - `w-4 h-4`
    - Texto: "Escuro"

**Idioma:**
- Container: `flex items-center justify-between py-4 border-t border-[#e5e7eb]`
- Label: `text-sm font-medium text-[#1f2937]` - "Idioma"
- Select: `w-48 px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm`
  - Options: "Português (Brasil)", "English", "Español"

**Botão Salvar:**
- Igual aos anteriores

#### 6. Tab 4: Segurança

**Container:** `p-6 md:p-8`

**Seção: Alterar Senha**
- Título: `text-lg font-semibold text-[#1f2937] mb-4` - "Alterar Senha"
- Container: `bg-[#f9fafb] rounded-xl p-6 border border-[#e5e7eb]`

**Campos:**
- **Senha Atual:**
  - Label: "Senha atual *"
  - Input: `type="password"`
  - Ícone esquerda: `Lock` - `w-5 h-5`
  - Ícone direita (toggle): `Eye` / `EyeOff` - `w-5 h-5 text-[#627271] cursor-pointer`

- **Nova Senha:**
  - Label: "Nova senha *"
  - Input: `type="password"`
  - Indicador de força: (igual ao do cadastro)

- **Confirmar Nova Senha:**
  - Label: "Confirmar nova senha *"
  - Input: `type="password"`

**Botão Atualizar Senha:**
- Container: `mt-4`
- Botão: `px-6 py-2.5 bg-[#3e5653] text-white font-medium rounded-lg hover:bg-[#1f2937]`

**Seção: Sessões Ativas**
- Título: `text-lg font-semibold text-[#1f2937] mt-8 mb-4` - "Sessões Ativas"
- Container: `space-y-3`

**Item de sessão:**
- Container: `flex items-center justify-between p-4 border border-[#e5e7eb] rounded-lg`
- **Info:** `flex items-center gap-3`
  - Ícone: `Monitor` / `Smartphone` - `w-5 h-5 text-[#627271]`
  - Detalhes:
    - Dispositivo: `text-sm font-medium text-[#1f2937]` - "Chrome em Windows"
    - Localização: `text-xs text-[#627271]` - "São Paulo, Brasil"
    - Status: `text-xs text-green-600 font-medium` - "Sessão atual" (ou "Ativo há 2 horas")
- **Ação:**
  - Botão (se não for atual): `text-sm text-red-600 hover:text-red-700 font-medium` - "Encerrar"

**Seção: Autenticação de Dois Fatores (2FA)**
- Título: `text-lg font-semibold text-[#1f2937] mt-8 mb-4` - "Autenticação de Dois Fatores"
- Container: `bg-[#f9fafb] rounded-xl p-6 border border-[#e5e7eb]`
- Layout: `flex items-center justify-between`
- **Info:**
  - Título: `text-sm font-medium text-[#1f2937]` - "Ativar 2FA"
  - Descrição: `text-sm text-[#627271] mt-1` - "Adicione uma camada extra de segurança"
- **Toggle:** Toggle switch (igual aos anteriores)

### Estados

**Estado Carregando:**
- Skeleton para foto: `w-24 h-24 rounded-full bg-gray-200 animate-pulse`
- Skeleton para inputs: `h-10 bg-gray-200 rounded-lg animate-pulse`
- Tab desabilitada durante carregamento

**Estado Salvando:**
- Botão: `opacity-70 cursor-not-allowed` com spinner `Loader2 animate-spin`
- Campos: `disabled:opacity-50`

**Estado Sucesso:**
- Toast: `fixed top-20 right-6 bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg flex items-center gap-3 z-50`
  - Ícone: `CheckCircle2` - `w-5 h-5 text-green-600`
  - Texto: "Alterações salvas com sucesso!"
- Toast auto-fecha em 3 segundos

**Estado Erro (Validação):**
- Campo com erro: `border-red-500 focus:ring-red-500 focus:border-red-500`
- Mensagem: `text-sm text-red-600 mt-1 flex items-center gap-1`
  - Ícone: `AlertCircle` - `w-4 h-4`
  - Texto: "Mensagem de erro específica"

**Estado Erro (API):**
- Alert no topo: `mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3`
- Mensagem: "Erro ao salvar. Tente novamente."

**Estado CEP Buscando:**
- Ícone `Loader2` animado no campo
- Campos de endereço desabilitados

### Regras de Negócio

- **RN-PERF-001:** Email não pode ser alterado para um já existente no sistema
- **RN-PERF-002:** CNPJ validado via algoritmo e API da Receita (opcional)
- **RN-PERF-003:** CEP busca endereço automaticamente via API ViaCEP
- **RN-PERF-004:** Upload de foto limitado a 2MB (JPG, PNG)
- **RN-PERF-005:** Alteração de senha requer senha atual correta
- **RN-PERF-006:** Sessões ativas mostram máximo 5 mais recentes
- **RN-PERF-007:** 2FA quando ativado, requer configuração adicional (QR Code)
- **RN-PERF-008:** Preferências são salvas automaticamente (sem botão)
- **RN-PERF-009:** Tema alterna entre claro/escuro em toda a aplicação
- **RN-PERF-010:** Horário de funcionamento usado para calcular SLA de atendimento

---

## Tela 3: Notificações

**Rota:** `/notificacoes`  
**Objetivo:** Central de notificações do sistema  
**Módulo:** Dashboard (Minha Empresa)  
**Tipo:** Página autenticada

### Layout

- **Container:** `min-h-screen bg-[#efefef] ml-64 pt-16 p-6` (desktop)
- **Max-width:** `max-w-4xl mx-auto`
- **Estrutura:** Header + Filtros + Lista de notificações

### Componentes

#### 1. Header da Página

**Container:**
- **Layout:** `mb-6 flex items-center justify-between`
- **Info:**
  - Título: "Notificações" - `text-3xl font-bold text-[#1f2937] flex items-center gap-3`
    - Badge contador: `px-2.5 py-0.5 bg-red-500 text-white text-sm font-bold rounded-full` - "5"
  - Subtítulo: `text-[#627271] mt-1` - "Gerencie suas notificações e alertas"
- **Ações:**
  - Botão: `px-4 py-2 text-sm font-medium text-[#627271] hover:text-[#1f2937] flex items-center gap-2 transition-colors`
    - Ícone: `CheckCheck` - `w-4 h-4`
    - Texto: "Marcar todas como lidas"

#### 2. Filtros

**Container:**
- **Layout:** `flex flex-wrap items-center gap-3 mb-6`
- **Background:** `bg-white p-2 rounded-xl border border-[#e5e7eb] shadow-sm inline-flex`

**Filtro Button:**
- Ativo: `px-4 py-2 bg-[#3e5653] text-white text-sm font-medium rounded-lg flex items-center gap-2`
- Inativo: `px-4 py-2 text-sm font-medium text-[#627271] hover:text-[#1f2937] hover:bg-[#f9fafb] rounded-lg transition-colors flex items-center gap-2`

**Filtros:**
1. **Todas** - `Bell` - Contador total
2. **Não lidas** - `Mail` - Contador não lidas
3. **Sistema** - `Settings` - Notificações do sistema
4. **MEL** - `Bot` - Notificações da assistente
5. **Alertas** - `AlertTriangle` - Alertas importantes

#### 3. Lista de Notificações

**Container:**
- **Background:** `bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden`

**Item de Notificação:**
- Container: `flex items-start gap-4 p-5 border-b border-[#e5e7eb] hover:bg-[#f9fafb] transition-colors cursor-pointer`
- Não lida: `bg-[#86cb92]/5` + indicador
- Lida: `bg-white`

**Estrutura:**
- **Indicador (não lida):** `w-2 h-2 bg-[#86cb92] rounded-full mt-2 shrink-0`
- **Ícone container:** `w-10 h-10 rounded-full flex items-center justify-center shrink-0`
  - Tipos:
    - Sistema: `bg-blue-100 text-blue-600` - Ícone `Settings`
    - MEL: `bg-[#86cb92]/20 text-[#86cb92]` - Ícone `Bot`
    - Alerta: `bg-red-100 text-red-600` - Ícone `AlertTriangle`
    - Sucesso: `bg-green-100 text-green-600` - Ícone `CheckCircle2`
    - Aviso: `bg-yellow-100 text-yellow-600` - Ícone `AlertCircle`
- **Conteúdo:** `flex-1 min-w-0`
  - Header: `flex items-center gap-2 flex-wrap`
    - Título: `text-sm font-semibold text-[#1f2937]` - "Novo pedido recebido"
    - Badge "Novo": `px-1.5 py-0.5 bg-[#86cb92] text-[#1f2937] text-[10px] font-bold rounded` (apenas não lidas)
  - Descrição: `text-sm text-[#627271] mt-1 line-clamp-2` - "O pedido #12345 foi recebido e aguarda processamento..."
  - Footer: `flex items-center gap-3 mt-2`
    - Tempo: `text-xs text-[#627271] flex items-center gap-1`
      - Ícone: `Clock` - `w-3 h-3`
      - Texto: "Há 5 minutos"
    - Categoria: `text-xs text-[#86cb92] font-medium px-2 py-0.5 bg-[#86cb92]/10 rounded-full` - "Vendas"
- **Ações:** `flex items-center gap-1`
  - Botão marcar lida/não lida: `p-2 rounded-lg hover:bg-[#e5e7eb] transition-colors`
    - Ícone: `MailOpen` / `Mail` - `w-4 h-4 text-[#627271]`
  - Botão mais: `p-2 rounded-lg hover:bg-[#e5e7eb] transition-colors`
    - Ícone: `MoreVertical` - `w-4 h-4 text-[#627271]`
    - **Dropdown:**
      - "Marcar como lida"
      - "Arquivar"
      - "Excluir"

**Exemplos de Notificações:**

1. **Novo Pedido**
   - Ícone: `ShoppingCart` - `bg-green-100 text-green-600`
   - Título: "Novo pedido recebido"
   - Descrição: "Pedido #12345 no valor de R$ 299,90 aguarda processamento"
   - Tempo: "Há 5 minutos"
   - Categoria: "Vendas"

2. **Estoque Crítico**
   - Ícone: `AlertTriangle` - `bg-red-100 text-red-600`
   - Título: "Estoque crítico: Notebook Dell"
   - Descrição: "O produto atingiu o estoque mínimo configurado"
   - Tempo: "Há 1 hora"
   - Categoria: "Estoque"

3. **Agendamento Confirmado**
   - Ícone: `Calendar` - `bg-blue-100 text-blue-600`
   - Título: "Agendamento confirmado"
   - Descrição: "Maria Oliveira confirmou o agendamento para 14:00"
   - Tempo: "Hoje, 10:30"
   - Categoria: "Agendamentos"

4. **Mensagem da MEL**
   - Ícone: `Bot` - `bg-[#86cb92]/20 text-[#86cb92]`
   - Título: "Dica da MEL"
   - Descrição: "Você tem 4 produtos sem movimentação há mais de 30 dias"
   - Tempo: "Ontem"
   - Categoria: "MEL"

5. **Atualização do Sistema**
   - Ícone: `Settings` - `bg-gray-100 text-gray-600`
   - Título: "Sistema atualizado"
   - Descrição: "Novas funcionalidades disponíveis no módulo Financeiro"
   - Tempo: "Ontem"
   - Categoria: "Sistema"

#### 4. Estado Vazio

**Container:**
- **Layout:** `py-16 text-center`
- **Ícone:** `Bell` - `w-16 h-16 text-[#e5e7eb] mx-auto mb-4`
- **Título:** `text-lg font-semibold text-[#1f2937]` - "Nenhuma notificação"
- **Descrição:** `text-sm text-[#627271]` - "Você não tem notificações nesta categoria"

#### 5. Paginação

**Container:**
- **Layout:** `flex items-center justify-between mt-6 px-2`
- **Info:** `text-sm text-[#627271]` - "Mostrando 1-10 de 45 notificações"
- **Controles:** `flex items-center gap-2`
  - Botão anterior: `p-2 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] disabled:opacity-50`
    - Ícone: `ChevronLeft` - `w-4 h-4 text-[#627271]`
  - Páginas: `px-3 py-1 text-sm font-medium rounded-lg`
    - Ativa: `bg-[#3e5653] text-white`
    - Inativa: `text-[#627271] hover:bg-[#f9fafb]`
  - Botão próximo: `p-2 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb]`
    - Ícone: `ChevronRight` - `w-4 h-4 text-[#627271]`

### Estados

**Estado Carregando:**
- Skeletons: `h-20 bg-gray-100 animate-pulse border-b border-[#e5e7eb]`
- Quantidade: 5 skeletons

**Estado Erro:**
- Alert: `p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 mb-6`
- Mensagem: "Erro ao carregar notificações"
- Botão: "Tentar novamente"

**Estado Hover (Item):**
- `hover:bg-[#f9fafb] transition-colors`
- Ícones de ação aparecem/ficam mais visíveis

**Estado Click (Item):**
- Marca como lida automaticamente
- Redireciona para contexto da notificação (se aplicável)

**Estado Todas Lidas:**
- Badge contador some do header
- Filtro "Não lidas" mostra estado vazio
- Botão "Marcar todas como lidas" fica desabilitado

### Regras de Negócio

- **RN-NOT-001:** Notificações são ordenadas por data (mais recentes primeiro)
- **RN-NOT-002:** Máximo 50 notificações mantidas no banco por usuário (FIFO)
- **RN-NOT-003:** Notificações não lidas mostram badge vermelho no header
- **RN-NOT-004:** Click na notificação marca como lida automaticamente
- **RN-NOT-005:** Algumas notificações têm link direto para ação (ex: pedido → página do pedido)
- **RN-NOT-006:** Notificações do tipo "Alerta" permanecem até serem vistas
- **RN-NOT-007:** MEL envia no máximo 3 dicas por dia
- **RN-NOT-008:** Push notifications opcionais (configuráveis em preferências)
- **RN-NOT-009:** Notificações arquivadas não aparecem na lista principal
- **RN-NOT-010:** Histórico de notificações mantido por 90 dias

---

## 📱 Responsividade por Tela

### Dashboard Principal
| Breakpoint | Layout |
|------------|--------|
| **Mobile (< 768px)** | Sidebar como drawer, cards métricas 1 coluna, grid conteúdo empilhado, header com hambúrguer, FAB visível |
| **Tablet (768px - 1023px)** | Sidebar colapsada (ícones apenas) ou drawer, cards 2 colunas, grid empilhado |
| **Desktop (>= 1024px)** | Layout completo com sidebar expandida, grid 4 colunas métricas, 2 colunas conteúdo |

### Perfil
| Breakpoint | Layout |
|------------|--------|
| **Mobile (< 768px)** | Tabs scrolláveis horizontalmente, formulário 1 coluna, sidebar drawer |
| **Tablet (768px - 1023px)** | Tabs em grid, formulário 2 colunas, sidebar colapsada |
| **Desktop (>= 1024px)** | Tabs completas, formulário 2 colunas com seções claras |

### Notificações
| Breakpoint | Layout |
|------------|--------|
| **Mobile (< 768px)** | Filtros scrolláveis, lista com ícones menores, ações em dropdown |
| **Tablet (>= 768px)** | Filtros em linha, lista completa com todas as ações visíveis |

**Breakpoints Tailwind:**
- `sm:` >= 640px
- `md:` >= 768px
- `lg:` >= 1024px
- `xl:` >= 1280px

---

## 🔗 Navegação entre Telas

```
[DASHBOARD (/dashboard)]
    │
    ├──→ [PERFIL (/perfil)] ←──────┐
    │       ├── Dados Pessoais     │
    │       ├── Dados da Empresa   │
    │       ├── Preferências       │
    │       └── Segurança          │
    │                              │
    ├──→ [NOTIFICAÇÕES (/notificacoes)]
    │
    └──→ Módulos (dinâmico)
            ├── CRM (/crm)
            ├── Financeiro (/financeiro)
            ├── Estoque (/estoque)
            └── ...
```

**Fluxo Principal:**
1. Usuário logado acessa Dashboard
2. Clica em avatar → Perfil
3. Edita informações e salva
4. Retorna ao Dashboard

**Fluxo Notificações:**
1. Usuário clica no sininho no header
2. Vê preview das últimas notificações
3. Clica "Ver todas" → Página de notificações
4. Gerencia notificações (marcar lida, arquivar)

---

## ✅ Checklist de Implementação

### Dashboard Principal
- [ ] Sidebar fixa com menu principal e módulos dinâmicos
- [ ] Header com busca global (⌘K), notificações e perfil
- [ ] Grid de métricas com 4 cards responsivos
- [ ] Tabela de vendas recentes com badges de status
- [ ] Card de produtos mais vendidos com progress bar
- [ ] Card de agendamentos (condicional)
- [ ] Card MEL com chat integrado
- [ ] Card de ações rápidas
- [ ] FAB para mobile
- [ ] Sidebar mobile como drawer
- [ ] Estados de loading (skeleton)
- [ ] Estados vazios
- [ ] Hover effects em cards e tabela
- [ ] Dropdown de perfil funcional

### Perfil
- [ ] Tabs de navegação (Dados Pessoais, Empresa, Preferências, Segurança)
- [ ] Upload de foto de perfil com preview
- [ ] Upload de logo da empresa
- [ ] Formulário de dados pessoais
- [ ] Formulário de dados da empresa com autocomplete CEP
- [ ] Horário de funcionamento por dia da semana
- [ ] Toggle de preferências (notificações)
- [ ] Toggle de tema (claro/escuro)
- [ ] Alteração de senha com validação
- [ ] Lista de sessões ativas
- [ ] Toggle de 2FA
- [ ] Validações de campos
- [ ] Estados de sucesso/erro

### Notificações
- [ ] Header com contador de não lidas
- [ ] Filtros por categoria
- [ ] Lista de notificações com scroll infinito/paginação
- [ ] Diferentes tipos de ícones por categoria
- [ ] Badge "Novo" para não lidas
- [ ] Ações: marcar lida, arquivar, excluir
- [ ] Botão "Marcar todas como lidas"
- [ ] Estado vazio
- [ ] Paginação
- [ ] Click na notificação marca como lida

### Geral
- [ ] Fonte Poppins aplicada globalmente
- [ ] Todas as cores UNIQ aplicadas (#efefef, #ffffff, #1f2937, #3e5653, #86cb92, #627271)
- [ ] Sidebar sempre escura (#1f2937)
- [ ] Responsividade mobile-first
- [ ] Ícones Lucide React em todos os lugares
- [ ] Animações e transições suaves
- [ ] Estados de loading implementados
- [ ] Tratamento de erros completo
- [ ] Navegação fluida entre telas
- [ ] Atalho de teclado ⌘K para busca
- [ ] Persistência de preferências (tema, sidebar)

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

### Ícones Lucide Utilizados
```javascript
import {
  // Navegação
  LayoutDashboard, Building2, ShoppingBag, Users, Wallet,
  Package, ShoppingCart, Store, Calendar, Bot, Settings,
  LogOut, Menu, X,
  
  // Header
  Search, Bell, HelpCircle, ChevronDown, MoreVertical,
  
  // Métricas
  TrendingUp, ArrowUpRight, UserPlus, AlertTriangle,
  
  // Conteúdo
  Plus, ArrowRight, ExternalLink, UserPlus, PackagePlus,
  Clock, CheckCheck, Mail, MailOpen,
  
  // Perfil
  User, Shield, Upload, Trash2, Save, Eye, EyeOff,
  Lock, Monitor, Smartphone, CheckCircle2, AlertCircle,
  Sun, Moon, Sparkles, Send,
  
  // Estados
  Loader2, PartyPopper
} from 'lucide-react';
```

### Estrutura de Arquivos Sugerida
```
app/
├── dashboard/
│   ├── page.tsx              # Dashboard principal
│   ├── layout.tsx            # Layout com sidebar
│   ├── perfil/
│   │   └── page.tsx          # Página de perfil
│   ├── notificacoes/
│   │   └── page.tsx          # Central de notificações
│   └── components/
│       ├── Sidebar.tsx       # Menu lateral
│       ├── Header.tsx        # Header superior
│       ├── MetricCard.tsx    # Card de métrica
│       ├── SalesTable.tsx    # Tabela de vendas
│       ├── MELChat.tsx       # Componente MEL
│       ├── QuickActions.tsx  # Ações rápidas
│       └── FAB.tsx           # Botão flutuante
components/
├── ui/                       # Componentes reutilizáveis
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   └── Toggle.tsx
```

---

**Documento criado por:** Frontend Specialist  
**Data de criação:** 12/03/2026  
**Status:** Completo - Pronto para implementação
