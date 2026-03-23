# 👥 UNIQ Empresas - Documentação de UI/UX
## Módulo 09: Colaboradores

**Versão:** 1.0  
**Última atualização:** 21/03/2026  
**Responsável:** @frontend-specialist  
**Módulo:** 09 - Colaboradores  
**Total de Telas:** 3 telas + 1 modal  
**Tema:** Modo Claro (Light Mode)

---

## 📋 Sumário

1. [Visão Geral](#visão-geral)
2. [Tela 1: Lista de Colaboradores](#tela-1-lista-de-colaboradores)
3. [Tela 2: Cadastro de Colaborador](#tela-2-cadastro-de-colaborador)
4. [Tela 3: Permissões e Papéis](#tela-3-permissões-e-papéis)
5. [Mock Data](#mock-data-typescript)
6. [Checklist de Implementação](#checklist-de-implementação)

---

## Visão Geral

### Descrição do Módulo

O módulo de **Colaboradores** permite a gestão de membros da equipe e seus níveis de acesso dentro da plataforma UNIQ. Este módulo é essencial para empresas que precisam controlar quem pode acessar e manipular diferentes áreas do sistema.

### Funcionalidades Principais

- **Lista de Colaboradores:** Visualização em cards ou tabela com foto, cargo, status e permissões
- **Cadastro de Colaborador:** Formulário completo para adicionar novos membros
- **Gestão de Permissões:** Matriz visual de permissões por módulo e ação
- **Edição e Exclusão:** Gerenciamento completo do ciclo de vida do colaborador

### Requisitos de Negócio

- **RN-COL-001:** Apenas o dono da empresa (admin) pode gerenciar colaboradores
- **RN-COL-002:** Um colaborador pode ter apenas um papel por vez
- **RN-COL-003:** O papel "Proprietário" não pode ser removido ou alterado
- **RN-COL-004:** Convites de colaboradores expiram em 7 dias
- **RN-COL-005:** Máximo de 20 colaboradores por empresa (limitação MVP)

---

## 🎨 Design System UNIQ (Referência)

Consulte `modulo-01-dashboard.md` para o Design System completo.

### Paleta de Cores

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| **Fundo Principal** | Platinum | `#efefef` | Área de conteúdo |
| **Fundo Cards** | Branco | `#ffffff` | Cards, formulários |
| **Sidebar** | Jet Black | `#1f2937` | Barra lateral |
| **Botões Primários** | Dark Slate Grey | `#3e5653` | Ações principais |
| **Accent** | Emerald | `#86cb92` | Destaques, ícones |
| **Texto Principal** | Jet Black | `#1f2937` | Títulos |
| **Texto Secundário** | Dim Grey | `#627271` | Descrições |

---

## Tela 1: Lista de Colaboradores

**Rota:** `/configuracoes/colaboradores`  
**Objetivo:** Visualizar e gerenciar todos os colaboradores da empresa  
**Módulo:** Configurações > Colaboradores  
**Tipo:** Página autenticada (requer permissão admin)

### Layout

- **Container:** `min-h-screen bg-[#efefef] ml-64 pt-16 p-6`
- **Max-width:** `max-w-6xl mx-auto`
- **Estrutura:** Header + Filtros + Grid de Cards + Tabela Toggle

### Componentes

#### 1. Header da Página

**Container:**
- **Layout:** `flex items-center justify-between mb-6`
- **Info:**
  - Título: "Colaboradores" - `text-3xl font-bold text-[#1f2937] flex items-center gap-3`
    - Ícone: `Users` - `w-8 h-8 text-[#86cb92]`
    - Badge contador: `px-2.5 py-0.5 bg-[#efefef] text-[#627271] text-sm font-medium rounded-full` - "5 de 20"
  - Subtítulo: `text-[#627271] mt-1` - "Gerencie membros da sua equipe e permissões"

**Ações:**
- Botão primário: `px-4 py-2.5 bg-[#3e5653] text-white text-sm font-medium rounded-lg hover:bg-[#1f2937] flex items-center gap-2 transition-all`
  - Ícone: `UserPlus` - `w-5 h-5`
  - Texto: "Novo Colaborador"

#### 2. Filtros e Visualização

**Container:**
- **Layout:** `flex items-center justify-between mb-6 flex-wrap gap-4`
- **Filtros (esquerda):**
  - Container: `flex items-center gap-3`
  - **Campo busca:**
    - Wrapper: `relative`
    - Ícone: `Search` - `absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]`
    - Input: `pl-10 pr-4 py-2 w-64 rounded-lg border border-[#e5e7eb] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92]`
    - Placeholder: "Buscar colaborador..."

  - **Select Status:**
    - Container: `relative`
    - Select: `appearance-none pl-4 pr-10 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] cursor-pointer`
    - Ícone: `ChevronDown` - `absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none`
    - Options: "Todos", "Ativos", "Inativos", "Pendentes"

  - **Select Papel:**
    - Similar ao Select Status
    - Options: "Todos os papéis", "Administrador", "Gerente", "Vendedor", "Visualizador"

- **Toggle Visualização (direita):**
  - Container: `flex items-center gap-1 p-1 bg-[#efefef] rounded-lg`
  - Botão Card: `p-2 rounded-md transition-colors`
    - Ativo: `bg-white shadow-sm text-[#1f2937]`
    - Inativo: `text-[#627271] hover:text-[#1f2937]`
    - Ícone: `LayoutGrid` - `w-5 h-5`
  - Botão Tabela: `p-2 rounded-md transition-colors`
    - Ativo: `bg-white shadow-sm text-[#1f2937]`
    - Inativo: `text-[#627271] hover:text-[#1f2937]`
    - Ícone: `List` - `w-5 h-5`

#### 3. Visualização em Cards (Grid)

**Container:**
- **Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`

**Card de Colaborador:**
- Container: `bg-white rounded-xl border border-[#e5e7eb] p-5 hover:shadow-md transition-all cursor-pointer`
- **Header card:**
  - Layout: `flex items-start gap-4 mb-4`
  - **Avatar:**
    - Com foto: `w-14 h-14 rounded-full object-cover`
    - Sem foto: `w-14 h-14 rounded-full bg-[#3e5653] flex items-center justify-center text-white text-lg font-bold`
    - Badge status: `absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white`
      - Ativo: `bg-green-500`
      - Inativo: `bg-gray-400`
      - Pendente: `bg-amber-500`
  - **Info:**
    - Nome: `text-base font-semibold text-[#1f2937]` - "Maria Silva"
    - Email: `text-sm text-[#627271] truncate max-w-[180px]` - "maria@empresa.com"
  - **Menu dropdown:**
    - Container: `ml-auto p-1 rounded-lg hover:bg-[#efefef] transition-colors`
    - Ícone: `MoreVertical` - `w-5 h-5 text-[#627271]`
    - **Dropdown menu:**
      - Container: `absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-[#e5e7eb] py-1 z-50`
      - Item: `px-4 py-2.5 hover:bg-[#efefef] flex items-center gap-3 text-sm text-[#1f2937] transition-colors`
        - Editar: `Pencil` - `w-4 h-4 text-[#627271]`
        - Permissões: `Shield` - `w-4 h-4 text-[#627271]`
        - Enviar convite: `Mail` - `w-4 h-4 text-[#627271]`
        - Divisor: `border-t border-[#e5e7eb] my-1`
        - Desativar/Ativar: `UserX` / `UserCheck` - `w-4 h-4 text-amber-600`
        - Excluir: `Trash2` - `w-4 h-4 text-red-600`

- **Badge Papel:**
  - Container: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3`
  - Cores por papel:
    - Proprietário: `bg-purple-100 text-purple-700`
    - Administrador: `bg-blue-100 text-blue-700`
    - Gerente: `bg-green-100 text-green-700`
    - Vendedor: `bg-amber-100 text-amber-700`
    - Visualizador: `bg-gray-100 text-gray-700`
  - Ícone: `Shield` - `w-3 h-3`
  - Texto: "Administrador"

- **Tags de Permissões:**
  - Container: `flex flex-wrap gap-1.5`
  - Tag: `px-2 py-0.5 bg-[#efefef] text-[#627271] text-xs rounded-md`
  - Tags exemplo: "CRM", "Financeiro", "Vendas"

- **Footer card:**
  - Layout: `flex items-center justify-between pt-3 border-t border-[#e5e7eb] mt-3`
  - **Último acesso:**
    - Ícone: `Clock` - `w-3.5 h-3.5 text-[#627271]`
    - Texto: `text-xs text-[#627271]` - "Último acesso: há 2 horas"
  - **Status badge:**
    - Ativo: `px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full` - "Ativo"
    - Inativo: `px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full` - "Inativo"
    - Pendente: `px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full` - "Pendente"

#### 4. Visualização em Tabela

**Container:**
- `bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden`

**Tabela:**
- Container: `overflow-x-auto`
- Table: `w-full`
- Header: `bg-[#f9fafb] border-b border-[#e5e7eb]`
  - Row: `border-b border-[#e5e7eb]`
  - Cell: `px-4 py-3.5 text-left text-xs font-medium text-[#627271] uppercase tracking-wider`
  - Colunas: "Colaborador", "Cargo/Função", "Papel", "Módulos", "Último Acesso", "Status", "Ações"

**Linhas da tabela:**
- Row: `border-b border-[#e5e7eb] hover:bg-gray-50 transition-colors`
- Cell: `px-4 py-4`

**Colunas:**
1. **Colaborador:**
   - Layout: `flex items-center gap-3`
   - Avatar: `w-10 h-10 rounded-full bg-[#3e5653] flex items-center justify-center text-white text-sm font-bold` (ou foto)
   - Info stack:
     - Nome: `text-sm font-medium text-[#1f2937]` - "João Santos"
     - Email: `text-xs text-[#627271]` - "joao@empresa.com"

2. **Cargo/Função:**
   - Texto: `text-sm text-[#1f2937]` - "Gerente de Vendas"

3. **Papel:**
   - Badge: (mesmo padrão do card)
   - Texto: "Gerente"

4. **Módulos:**
   - Container: `flex -space-x-2` (overlap)
   - Badges módulos: `w-6 h-6 rounded-full bg-[#86cb92]/20 text-[#86cb92] flex items-center justify-center text-[10px] font-bold border-2 border-white`

5. **Último Acesso:**
   - Texto: `text-sm text-[#627271]` - "Há 2 horas"
   - Variantes: "Nunca", "Há 3 dias", "Há 1 semana"

6. **Status:**
   - Badge: `px-2.5 py-1 rounded-full text-xs font-medium`
   - Ativo: `bg-green-100 text-green-700`
   - Inativo: `bg-gray-100 text-gray-700`
   - Pendente: `bg-amber-100 text-amber-700`

7. **Ações:**
   - Layout: `flex items-center gap-1`
   - Botão: `p-2 rounded-lg hover:bg-[#e5e7eb] transition-colors`
   - Ícone: `MoreHorizontal` - `w-4 h-4 text-[#627271]`
   - Dropdown: (mesmo do card)

#### 5. Estado Vazio

**Container:**
- **Layout:** `py-16 text-center bg-white rounded-xl border border-[#e5e7eb]`
- **Ícone:** `Users` - `w-16 h-16 text-[#e5e7eb] mx-auto mb-4`
- **Título:** `text-lg font-semibold text-[#1f2937]` - "Nenhum colaborador encontrado"
- **Descrição:** `text-sm text-[#627271] max-w-sm mx-auto` - "Adicione membros à sua equipe para começar a gerenciar permissões e acessos."
- **Botão:**
  - `px-6 py-3 bg-[#3e5653] text-white font-medium rounded-lg hover:bg-[#1f2937] flex items-center gap-2 mx-auto mt-6 transition-all`
  - Ícone: `UserPlus` - `w-5 h-5`
  - Texto: "Adicionar Primeiro Colaborador"

#### 6. Estado Carregando (Skeleton)

**Cards skeleton:**
- Container: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
- Card skeleton:
  - Container: `bg-white rounded-xl border border-[#e5e7eb] p-5`
  - Header: `flex items-start gap-4 mb-4`
  - Avatar: `w-14 h-14 rounded-full bg-gray-200 animate-pulse`
  - Info: `flex-1`
  - Linhas: `h-4 bg-gray-200 rounded animate-pulse mb-2` (x2)
  - Badge: `w-24 h-6 bg-gray-200 rounded-full animate-pulse`

**Tabela skeleton:**
- Linhas: `h-16 border-b border-[#e5e7eb]`
- Cells: `px-4 py-4`
- Avatar: `w-10 h-10 rounded-full bg-gray-200 animate-pulse`
- Linhas de texto: `h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4`

### Responsividade

| Breakpoint | Layout |
|------------|--------|
| **Mobile (< 768px)** | Cards 1 coluna, filtros empilhados, tabela esconde colunas secundárias |
| **Tablet (768px - 1023px)** | Cards 2 colunas, tabela com scroll horizontal |
| **Desktop (>= 1024px)** | Cards 3 colunas ou tabela completa |

### Regras de Negócio

- **RN-COL-006:** Busca filtra por nome e email (case insensitive)
- **RN-COL-007:** Filtros são aplicados instantaneamente (sem botão)
- **RN-COL-008:** Toggle de visualização é persistido no localStorage
- **RN-COL-009:** Máximo 50 colaboradores exibidos por página
- **RN-COL-010:** Convites pendentes aparecem com badge "Pendente" e opção de reenviar

---

## Tela 2: Cadastro de Colaborador

**Rota:** `/configuracoes/colaboradores/novo` ou modal  
**Objetivo:** Cadastrar um novo colaborador na empresa  
**Módulo:** Configurações > Colaboradores  
**Tipo:** Página ou Modal

### Layout

**Opção A - Página:**
- Container: `min-h-screen bg-[#efefef] ml-64 pt-16 p-6`
- Max-width: `max-w-3xl mx-auto`

**Opção B - Modal:**
- Overlay: `fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4`
- Modal: `w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto`
- Header: `sticky top-0 bg-white border-b border-[#e5e7eb] px-6 py-4 flex items-center justify-between`
  - Título: `text-xl font-bold text-[#1f2937]` - "Novo Colaborador"
  - Botão fechar: `p-2 rounded-lg hover:bg-[#efefef] transition-colors`
    - Ícone: `X` - `w-5 h-5 text-[#627271]`

### Componentes

#### 1. Formulário

**Container:**
- `p-6 space-y-6`

**Seção: Dados Pessoais**
- Título: `text-lg font-semibold text-[#1f2937] mb-4 flex items-center gap-2`
  - Ícone: `User` - `w-5 h-5 text-[#86cb92]`
  - Texto: "Dados Pessoais"

**Grid de campos:** `grid grid-cols-1 md:grid-cols-2 gap-4`

**Campo: Nome Completo**
- Label: `block text-sm font-medium text-[#1f2937] mb-1.5` - "Nome completo *"
- Input: `w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all placeholder-[#627271]/50`
- Placeholder: "Digite o nome completo"
- Obrigatório: Sim

**Campo: Email**
- Label: "Email *"
- Input: `type="email"`
- Placeholder: "email@empresa.com"
- Help text: `text-xs text-[#627271] mt-1` - "Convite será enviado para este email"

**Campo: Telefone**
- Label: "Telefone"
- Input: `type="tel"` (máscara: `(00) 00000-0000`)
- Placeholder: "(00) 00000-0000"
- Ícone: `Phone` - `absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]`
- Wrapper: `relative`

**Campo: Cargo/Função**
- Label: "Cargo / Função"
- Input: `type="text"`
- Placeholder: "Ex: Gerente de Vendas, Atendente"

**Seção: Permissões**
- Título: `text-lg font-semibold text-[#1f2937] mt-8 mb-4 flex items-center gap-2`
  - Ícone: `Shield` - `w-5 h-5 text-[#86cb92]`
  - Texto: "Permissões"

**Select Papel:**
- Label: "Papel do colaborador *"
- Container: `bg-[#f9fafb] rounded-xl border border-[#e5e7eb] p-4`
- **Opções de papel:**
  - Container: `space-y-3`
  
  **Opção papel:**
  - Container: `flex items-start gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:border-[#86cb92] cursor-pointer transition-colors`
  - Radio: `w-4 h-4 mt-1 rounded-full border-2 border-[#e5e7eb] flex items-center justify-center`
    - Selecionado: `border-[#86cb92]` + círculo interno `w-2 h-2 rounded-full bg-[#86cb92]`
  - **Info:**
    - Título: `text-sm font-medium text-[#1f2937]` - "Administrador"
    - Descrição: `text-xs text-[#627271] mt-0.5` - "Acesso completo a todos os módulos e configurações"
  - Badge recomendado: `ml-auto px-2 py-0.5 bg-[#86cb92]/20 text-[#86cb92] text-xs font-medium rounded-full` (para Administrador)

**Papéis disponíveis:**

| Papel | Descrição | Permissões |
|-------|-----------|------------|
| **Administrador** | Acesso completo | Todos os módulos, configurações, colaboradores |
| **Gerente** | Gestão de equipe | CRM, Vendas, Estoque, Financeiro (sem configurações) |
| **Vendedor** | Operações básicas | CRM (leitura/escrita), Vendas |
| **Visualizador** | Apenas leitura | Todos os módulos (somente leitura) |

**Módulos (checkboxes):**
- Label: "Módulos acessíveis"
- Container: `mt-4 grid grid-cols-2 gap-3`
- **Checkbox item:**
  - Container: `flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] cursor-pointer transition-colors`
  - Checkbox: `w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92] cursor-pointer`
  - Ícone do módulo: `w-5 h-5 text-[#627271]`
  - Label: `text-sm text-[#1f2937]` - "CRM", "Financeiro", "Estoque", "Vendas", "Agendamentos", "Loja Virtual"

**Seção: Configurações Adicionais**
- Título: `text-lg font-semibold text-[#1f2937] mt-8 mb-4 flex items-center gap-2`
  - Ícone: `Settings` - `w-5 h-5 text-[#86cb92]`
  - Texto: "Configurações Adicionais"

**Toggle: Notificações por Email**
- Container: `flex items-center justify-between py-3 border-b border-[#e5e7eb]`
- Info:
  - Título: `text-sm font-medium text-[#1f2937]` - "Notificações por email"
  - Descrição: `text-xs text-[#627271] mt-0.5` - "Enviar resumo de atividades por email"
- Toggle: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors`
  - Ativo: `bg-[#3e5653]`
  - Inativo: `bg-gray-200`
  - Bolinha: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6` (ativo) / `translate-x-1` (inativo)

**Toggle: Acesso ao WhatsApp Business**
- Similar ao anterior
- Título: "Acesso ao WhatsApp Business"
- Descrição: "Permitir uso da integração WhatsApp"

**Ações do formulário:**
- Container: `flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[#e5e7eb]`
- Botão secundário: `px-5 py-2.5 border border-[#e5e7eb] text-[#627271] font-medium rounded-lg hover:bg-[#efefef] flex items-center gap-2 transition-colors`
  - Ícone: `X` - `w-4 h-4`
  - Texto: "Cancelar"
- Botão primário: `px-5 py-2.5 bg-[#3e5653] text-white font-medium rounded-lg hover:bg-[#1f2937] flex items-center gap-2 transition-colors`
  - Ícone: `UserPlus` - `w-4 h-4`
  - Texto: "Adicionar Colaborador"

### Estados

**Estado Carregando:**
- Skeleton nos campos: `h-12 bg-gray-200 rounded-lg animate-pulse`
- Botão: `opacity-70 cursor-not-allowed` + spinner `Loader2 animate-spin`

**Estado Enviando:**
- Botão primário: desabilitado com spinner
- Campos: `disabled:opacity-50`

**Estado Sucesso:**
- Toast: `fixed top-20 right-6 bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg flex items-center gap-3 z-50`
  - Ícone: `CheckCircle2` - `w-5 h-5 text-green-600`
  - Texto: "Colaborador adicionado com sucesso! Convite enviado."
- Redirect ou fechar modal após 2 segundos

**Estado Erro (Validação):**
- Campo com erro: `border-red-500 focus:ring-red-500 focus:border-red-500`
- Mensagem: `text-sm text-red-600 mt-1 flex items-center gap-1`
  - Ícone: `AlertCircle` - `w-4 h-4`
  - Texto: "Mensagem de erro específica"

**Estado Erro (API):**
- Alert: `mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3`
- Ícone: `AlertCircle` - `w-5 h-5 text-red-600`
- Texto: "Erro ao adicionar colaborador. Tente novamente."

### Regras de Negócio

- **RN-COL-011:** Email deve ser único no sistema
- **RN-COL-012:** Ao criar, um email de convite é enviado automaticamente
- **RN-COL-013:** Se papel for "Visualizador", todos os módulos vêm marcados por padrão
- **RN-COL-014:** Se papel for "Administrador", todos os módulos vêm marcados e desabilitados
- **RN-COL-015:** Campos obrigatórios: Nome e Email
- **RN-COL-016:** Convites expirados podem ser reenviados

---

## Tela 3: Permissões e Papéis

**Rota:** `/configuracoes/colaboradores/[id]/permissoes` ou modal  
**Objetivo:** Gerenciar permissões granulares de um colaborador  
**Módulo:** Configurações > Colaboradores > Permissões  
**Tipo:** Página ou Modal

### Layout

**Estrutura similar ao Cadastro, com foco na matriz de permissões**

### Componentes

#### 1. Header

**Container:**
- Layout: `flex items-center gap-4 mb-6`
- **Avatar do colaborador:**
  - `w-16 h-16 rounded-full bg-[#3e5653] flex items-center justify-center text-white text-xl font-bold`
- **Info:**
  - Nome: `text-xl font-bold text-[#1f2937]` - "Maria Silva"
  - Badge papel: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 mt-1`
    - Ícone: `Shield` - `w-3 h-3`
    - Texto: "Administrador"

#### 2. Matriz de Permissões

**Container:**
- `bg-[#f9fafb] rounded-xl border border-[#e5e7eb] overflow-hidden`

**Tabela de permissões:**
- Container: `overflow-x-auto`
- Table: `w-full min-w-[800px]`

**Header da tabela:**
- Row: `bg-[#e5e7eb]`
- Cell: `px-4 py-3 text-left text-xs font-semibold text-[#1f2937] uppercase tracking-wider`
- Coluna "Módulo/Ação": `w-48`
- Colunas de ações: `text-center w-24` cada

**Legenda de ações:**
- Container: `flex items-center justify-center gap-6 py-3 bg-white border-b border-[#e5e7eb]`
- Item: `flex items-center gap-2 text-xs text-[#627271]`
- Indicadores:
  - Ver: `w-3 h-3 rounded bg-blue-500`
  - Criar/Editar: `w-3 h-3 rounded bg-green-500`
  - Excluir: `w-3 h-3 rounded bg-red-500`

**Linhas da tabela:**
- Row: `border-b border-[#e5e7eb] hover:bg-white transition-colors`
- Cell módulo: `px-4 py-3.5`
- Cell ação: `px-2 py-3.5 text-center`

**Coluna Módulo:**
- Layout: `flex items-center gap-3`
- Ícone: `w-5 h-5 text-[#86cb92]`
- Nome: `text-sm font-medium text-[#1f2937]` - "CRM", "Financeiro", etc.
- Badge contagem: `ml-auto px-2 py-0.5 bg-[#efefef] text-[#627271] text-xs rounded` - "3/4"

**Células de permissão (Toggle):**
- Container: `flex items-center justify-center`
- Toggle pequeno:
  - Container: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer`
  - Ativo: `bg-[#86cb92]`
  - Inativo: `bg-gray-200`
  - Bolinha: `h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6` (ativo)
  - Disabled: `opacity-50 cursor-not-allowed`

**Seções de módulos:**

1. **CRM**
   - Ícone: `Users` - `w-5 h-5 text-[#86cb92]`
   - Ações: Ver, Criar, Editar, Excluir

2. **Financeiro**
   - Ícone: `Wallet` - `w-5 h-5 text-[#86cb92]`
   - Ações: Ver, Criar, Editar, Excluir

3. **Estoque**
   - Ícone: `Package` - `w-5 h-5 text-[#86cb92]`
   - Ações: Ver, Criar, Editar, Excluir

4. **Vendas**
   - Ícone: `ShoppingCart` - `w-5 h-5 text-[#86cb92]`
   - Ações: Ver, Criar, Editar, Excluir

5. **Loja Virtual**
   - Ícone: `Store` - `w-5 h-5 text-[#86cb92]`
   - Ações: Ver, Criar, Editar, Excluir

6. **Agendamentos**
   - Ícone: `Calendar` - `w-5 h-5 text-[#86cb92]`
   - Ações: Ver, Criar, Editar, Excluir

7. **Configurações**
   - Ícone: `Settings` - `w-5 h-5 text-[#86cb92]`
   - Ações: Ver, Criar, Editar, Excluir
   - Badge: `px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded ml-2` - "Admin"

#### 3. Botões de Ação Rápida

**Container:**
- `flex items-center gap-3 mt-6 p-4 bg-white rounded-xl border border-[#e5e7eb]`

**Botões:**
1. **Selecionar Tudo:**
   - `px-4 py-2 text-sm font-medium text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors`
   - Ícone: `CheckCheck` - `w-4 h-4`
   - Texto: "Selecionar tudo"

2. **Limpar Tudo:**
   - Similar ao anterior
   - Ícone: `X` - `w-4 h-4`
   - Texto: "Limpar tudo"

3. **Restaurar Padrão:**
   - Similar
   - Ícone: `RotateCcw` - `w-4 h-4`
   - Texto: "Restaurar padrão do papel"

#### 4. Ações Finais

**Container:**
- `flex items-center justify-between mt-6 pt-6 border-t border-[#e5e7eb]`

**Info:**
- `text-sm text-[#627271]` - "As alterações são salvas automaticamente"

**Botões:**
- Secundário: `Voltar` - `px-4 py-2 border border-[#e5e7eb] text-[#627271] font-medium rounded-lg hover:bg-[#efefef]`
- Primário: `Salvar Alterações` - `px-5 py-2.5 bg-[#3e5653] text-white font-medium rounded-lg hover:bg-[#1f2937] flex items-center gap-2`
  - Ícone: `Save` - `w-4 h-4`

### Estados

**Estado Carregando:**
- Skeleton na matriz: `h-12 bg-gray-100 animate-pulse border-b border-[#e5e7eb]`

**Estado Salvando:**
- Botão: spinner + "Salvando..."
- Toggle: desabilitado durante save

**Estado Sucesso:**
- Toast: "Permissões atualizadas com sucesso!"
- Badge papel pode ser atualizado

**Estado Sem Permissão:**
- Se colaborador é Proprietário:
  - Container: `bg-amber-50 border border-amber-200 rounded-xl p-6 text-center`
  - Ícone: `ShieldAlert` - `w-12 h-12 text-amber-500 mx-auto mb-3`
  - Título: `text-lg font-semibold text-[#1f2937]` - "Permissões do Proprietário"
  - Descrição: `text-sm text-[#627271]` - "O papel de Proprietário não pode ter suas permissões alteradas."

### Regras de Negócio

- **RN-COL-017:** Proprietário sempre tem todas as permissões (não editável)
- **RN-COL-018:** Alterações em permissões afetam imediatamente o acesso do colaborador
- **RN-COL-019:** Se papel for alterado, permissões são resetadas para o padrão do novo papel
- **RN-COL-020:** Toggle "Ver" desabilitado se o módulo não está ativo na empresa
- **RN-COL-021:** Permissão de "Excluir" implica em "Editar" e "Criar"
- **RN-COL-022:** Log de alterações de permissão é mantido (quem alterou, quando)

---

## Mock Data (TypeScript)

```typescript
// types/employee.ts

export type EmployeeStatus = 'active' | 'inactive' | 'pending';
export type EmployeeRole = 'owner' | 'admin' | 'manager' | 'seller' | 'viewer';
export type ModulePermission = 'view' | 'create' | 'edit' | 'delete';
export type ModuleType = 'crm' | 'finance' | 'inventory' | 'sales' | 'store' | 'appointments' | 'settings';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: EmployeeRole;
  position?: string;
  avatar?: string;
  status: EmployeeStatus;
  lastAccess?: Date;
  modules: ModuleAccess[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ModuleAccess {
  module: ModuleType;
  permissions: ModulePermission[];
}

export interface Role {
  id: string;
  name: EmployeeRole;
  label: string;
  description: string;
  defaultModules: ModuleType[];
  isSystem: boolean; // true for owner, admin, viewer
}

// Mock Data
export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    email: 'carlos@empresa.com',
    phone: '(11) 98765-4321',
    role: 'owner',
    position: 'Proprietário',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
    lastAccess: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    modules: [
      { module: 'crm', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'finance', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'inventory', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'sales', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'store', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'appointments', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'settings', permissions: ['view', 'create', 'edit', 'delete'] },
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@empresa.com',
    phone: '(11) 98765-1234',
    role: 'admin',
    position: 'Gerente Administrativa',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    lastAccess: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    modules: [
      { module: 'crm', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'finance', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'inventory', permissions: ['view', 'create', 'edit'] },
      { module: 'sales', permissions: ['view', 'create', 'edit'] },
      { module: 'appointments', permissions: ['view', 'create', 'edit'] },
    ],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-06-20'),
  },
  {
    id: '3',
    name: 'João Santos',
    email: 'joao@empresa.com',
    role: 'manager',
    position: 'Gerente de Vendas',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=joao',
    lastAccess: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    modules: [
      { module: 'crm', permissions: ['view', 'create', 'edit'] },
      { module: 'sales', permissions: ['view', 'create', 'edit'] },
      { module: 'inventory', permissions: ['view'] },
    ],
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-07-01'),
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@empresa.com',
    role: 'seller',
    position: 'Vendedora',
    status: 'active',
    lastAccess: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    modules: [
      { module: 'crm', permissions: ['view', 'create', 'edit'] },
      { module: 'sales', permissions: ['view', 'create'] },
    ],
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-08-15'),
  },
  {
    id: '5',
    name: 'Pedro Lima',
    email: 'pedro@empresa.com',
    role: 'viewer',
    position: 'Contador',
    status: 'pending',
    lastAccess: undefined,
    modules: [
      { module: 'finance', permissions: ['view'] },
      { module: 'sales', permissions: ['view'] },
    ],
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01'),
  },
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'owner',
    label: 'Proprietário',
    description: 'Acesso completo a todos os recursos e configurações da empresa',
    defaultModules: ['crm', 'finance', 'inventory', 'sales', 'store', 'appointments', 'settings'],
    isSystem: true,
  },
  {
    id: '2',
    name: 'admin',
    label: 'Administrador',
    description: 'Acesso completo a todos os módulos, exceto configurações críticas',
    defaultModules: ['crm', 'finance', 'inventory', 'sales', 'store', 'appointments'],
    isSystem: true,
  },
  {
    id: '3',
    name: 'manager',
    label: 'Gerente',
    description: 'Gestão de equipe e operações do dia a dia',
    defaultModules: ['crm', 'sales', 'inventory'],
    isSystem: false,
  },
  {
    id: '4',
    name: 'seller',
    label: 'Vendedor',
    description: 'Operações básicas de vendas e atendimento',
    defaultModules: ['crm', 'sales'],
    isSystem: false,
  },
  {
    id: '5',
    name: 'viewer',
    label: 'Visualizador',
    description: 'Acesso apenas para visualização (somente leitura)',
    defaultModules: ['crm', 'finance', 'inventory', 'sales', 'appointments'],
    isSystem: true,
  },
];

export const mockModules = [
  { id: 'crm', name: 'CRM', icon: 'Users' },
  { id: 'finance', name: 'Financeiro', icon: 'Wallet' },
  { id: 'inventory', name: 'Estoque', icon: 'Package' },
  { id: 'sales', name: 'Vendas', icon: 'ShoppingCart' },
  { id: 'store', name: 'Loja Virtual', icon: 'Store' },
  { id: 'appointments', name: 'Agendamentos', icon: 'Calendar' },
  { id: 'settings', name: 'Configurações', icon: 'Settings' },
];

// Status color mapping
export const statusColors = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  inactive: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
  },
  pending: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
  },
};

// Role color mapping
export const roleColors = {
  owner: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
  },
  admin: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  manager: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  seller: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
  },
  viewer: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
  },
};
```

---

## Checklist de Implementação

### Lista de Colaboradores
- [ ] Header com título, contador e botão "Novo Colaborador"
- [ ] Campo de busca com ícone
- [ ] Select de filtro por status (Todos, Ativos, Inativos, Pendentes)
- [ ] Select de filtro por papel
- [ ] Toggle de visualização (Cards/Tabela)
- [ ] Visualização em cards com avatar, nome, email, papel, permissões
- [ ] Badge de status no avatar (ativo/inativo/pendente)
- [ ] Dropdown menu com ações (Editar, Permissões, etc.)
- [ ] Visualização em tabela com todas as colunas
- [ ] Badges de módulos na tabela
- [ ] Estado vazio com ilustração
- [ ] Estado de carregamento (skeleton)
- [ ] Responsividade mobile

### Cadastro de Colaborador
- [ ] Modal ou página de cadastro
- [ ] Campos: Nome, Email, Telefone, Cargo
- [ ] Seleção de papel com cards
- [ ] Descrição de cada papel
- [ ] Checkboxes de módulos
- [ ] Toggles de configurações (notificações)
- [ ] Validação de campos obrigatórios
- [ ] Validação de email único
- [ ] Estado de envio com loading
- [ ] Toast de sucesso
- [ ] Tratamento de erros

### Permissões e Papéis
- [ ] Header com avatar e info do colaborador
- [ ] Matriz de permissões por módulo
- [ ] Legenda de ações (Ver, Criar, Editar, Excluir)
- [ ] Toggles de permissão funcionais
- [ ] Botões de ação rápida (Selecionar tudo, Limpar)
- [ ] Restaurar padrão do papel
- [ ] Proteção para Proprietário
- [ ] Auto-save ou salvar manual
- [ ] Toast de sucesso

### Geral
- [ ] Fonte Poppins aplicada globalmente
- [ ] Cores UNIQ em todos os componentes
- [ ] Ícones Lucide React
- [ ] Animações e transições suaves
- [ ] Estados de loading implementados
- [ ] Tratamento de erros completo
- [ ] Navegação funcional
- [ ] Responsividade mobile-first
- [ ] Acessibilidade (labels, focus, aria)

---

## 🔗 Documentos Relacionados

- [modulo-01-dashboard.md](./modulo-01-dashboard.md) - Design System UNIQ
- [ROADMAP.md](../ROADMAP.md) - Sprint 09 details
- [database_schema.md](../database_schema.md) - Tabelas de colaboradores

---

**Última atualização:** 21/03/2026  
**Versão:** 1.0
