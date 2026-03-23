# 📋 PRD - SPRINT_01: Design System

---

## 1. Resumo Executivo

### 1.1 Contexto do Projeto
O **UNIQ Empresas** é uma plataforma SaaS modular que combina Consultoria de Growth + Ferramentas de Gestão + Métricas para pequenos e médios empreendedores. O sistema segue a abordagem **Frontend First** (Interface primeiro, Backend depois), permitindo validação rápida com stakeholders antes de investir em backend.

### 1.2 Objetivo Desta Sprint
A SPRINT_01 tem como objetivo estabelecer uma **base visual sólida** através de:
- Consolidação de Design Tokens (cores, tipografia, espaçamento)
- Finalização dos componentes base do Design System
- Documentação dos componentes existentes
- Criação do layout base responsivo (App Shell)
- Implementação de estados de loading e erro visuais

### 1.3 Escopo da Sprint

**✅ Incluído nesta Sprint:**
- Análise e consolidação de Design Tokens
- Componentes base (Button, Card, Badge, Avatar, Input, etc.)
- Layout base (App Shell, Sidebar, Header)
- Responsividade mobile (hamburger menu)
- Estados visuais (hover, focus, disabled, loading)
- Documentação dos componentes

**❌ NÃO Incluído nesta Sprint:**
- Integração com backend (dados reais)
- Autenticação funcional
- Storybook completo (apenas documentação MD)
- Testes automatizados de UI

### 1.4 Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Framework | Next.js | 14.2.5 |
| Linguagem | TypeScript | 5.4.5 |
| UI Library | React | 18.3.1 |
| Estilização | Tailwind CSS | 3.4.4 |
| Componentes | shadcn/ui | v4.0.5 |
| Ícones | Lucide React | 0.400.0 |
| Build | Static Export | - |

---

## 2. Estado Atual (Análise do Código)

### 2.1 Componentes Existentes

#### ✅ Componentes Já Implementados e Funcionais

| Componente | Arquivo | Status | Qualidade | Observações |
|------------|---------|--------|-----------|-------------|
| **Button** | `components/ui/button.tsx` | ✅ Funcional | 🟢 Alta | 6 variantes (default, destructive, outline, secondary, ghost, link), 4 tamanhos (default, sm, lg, icon), integração com Radix Slot para composição |
| **Card** | `components/ui/card.tsx` | ✅ Funcional | 🟢 Alta | Estrutura completa (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter), bordas arredondadas, sombra consistente |
| **Badge** | `components/ui/badge.tsx` | ✅ Funcional | 🟢 Alta | 8 variantes (default, secondary, destructive, outline, success, warning, info, accent), formato rounded-full |
| **Avatar** | `components/ui/avatar.tsx` | ✅ Funcional | 🟢 Alta | Integração com Radix UI, fallback automático com iniciais, bordas arredondadas |
| **DropdownMenu** | `components/ui/dropdown-menu.tsx` | ✅ Funcional | 🟢 Alta | Componente complexo com Radix UI, animações, checkbox items, radio items, submenus |
| **Sidebar** | `components/sidebar.tsx` | ✅ Funcional | 🟢 Alta | Navegação lateral completa, menu mobile com overlay, seções organizadas (Principal, Módulos), user profile footer |
| **Header** | `components/header.tsx` | ✅ Funcional | 🟢 Alta | Barra superior com breadcrumbs, search central, notificações, dropdown de usuário |
| **MetricCard** | `components/metric-card.tsx` | ✅ Funcional | 🟢 Alta | Card de métricas com ícone, trend (positivo/negativo), subtitle, alerta, 4 variantes pré-configuradas |

#### 🟡 Componentes que Precisam de Ajustes

| Componente | Arquivo | Status | Ajustes Necessários |
|------------|---------|--------|---------------------|
| **Input** | Não existe | 🟡 Criar | Componente base de input para formulários |
| **Checkbox** | Não existe | 🟡 Criar | Checkbox estilizado com label |
| **Select** | Não existe | 🟡 Criar | Dropdown de seleção com opções |
| **Textarea** | Não existe | 🟡 Criar | Área de texto multiline |

#### 🔴 Componentes que Precisam Ser Criados

| Componente | Prioridade | Complexidade | Uso Principal |
|------------|------------|--------------|---------------|
| **Dialog/Modal** | Alta | Média | Confirmações, formulários em modal |
| **Table** | Alta | Média | Listagens de dados (vendas, produtos, clientes) |
| **Toast** | Alta | Baixa | Notificações de sucesso/erro |
| **Skeleton** | Alta | Baixa | Estados de loading |
| **Label** | Média | Baixa | Labels de formulários |
| **Form** | Média | Alta | Wrapper de formulários com validação |
| **Tabs** | Média | Média | Navegação por abas |
| **Tooltip** | Baixa | Baixa | Dicas contextuais |
| **Switch** | Baixa | Baixa | Toggle on/off |
| **Separator** | Baixa | Baixa | Divisores visuais |
| **ScrollArea** | Baixa | Média | Scroll customizado |
| **Sheet** | Baixa | Média | Slide-out panels (carrinho, filtros) |

### 2.2 Design Tokens Configurados

#### ✅ Cores UNIQ (Já Configuradas)

**Arquivo:** `tailwind.config.ts` (linhas 12-24)

| Token | Valor | Uso |
|-------|-------|-----|
| `uniq.platinum` | `#efefef` | Background principal |
| `uniq.white` | `#ffffff` | Cards, conteúdo |
| `uniq.sidebar` | `#1f2937` | Sidebar background |
| `uniq.primary` | `#3e5653` | Botões primários, CTAs |
| `uniq.hover` | `#1f2937` | Hover states |
| `uniq.accent` | `#86cb92` | Destaques, ícones, indicadores |
| `uniq.text` | `#1f2937` | Texto principal |
| `uniq.muted` | `#627271` | Texto secundário |
| `uniq.border` | `#e5e7eb` | Bordas, divisores |

#### ✅ CSS Variables (Shadcn/ui)

**Arquivo:** `app/globals.css` (linhas 8-28)

| Variável | Valor Light | Valor Dark | Uso |
|----------|-------------|------------|-----|
| `--background` | `0 0% 100%` | `222.2 84% 4.9%` | Fundo da página |
| `--foreground` | `222.2 84% 4.9%` | `210 40% 98%` | Texto principal |
| `--primary` | `160 16% 29%` | `130 40% 67%` | Cor primária |
| `--primary-foreground` | `0 0% 100%` | `222.2 47.4% 11.2%` | Texto sobre primária |
| `--secondary` | `210 40% 96.1%` | `217.2 32.6% 17.5%` | Cor secundária |
| `--muted` | `210 40% 96.1%` | `217.2 32.6% 17.5%` | Elementos muted |
| `--accent` | `130 40% 67%` | `130 40% 67%` | Cor de destaque |
| `--destructive` | `0 84.2% 60.2%` | `0 62.8% 30.6%` | Erros, perigo |
| `--border` | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` | Bordas |
| `--radius` | `0.75rem` | - | Border radius global |

#### ✅ Tipografia

**Arquivo:** `app/globals.css` (linha 5)
- **Fonte Principal:** Poppins (Google Fonts)
- **Pesos Disponíveis:** 300, 400, 500, 600, 700
- **Fonte Body:** `font-poppins` aplicada em `body`

#### ✅ Border Radius

| Token | Valor |
|-------|-------|
| `--radius` | `0.75rem` (12px) |
| `lg` | `var(--radius)` |
| `md` | `calc(var(--radius) - 2px)` (10px) |
| `sm` | `calc(var(--radius) - 4px)` (8px) |

#### ✅ Breakpoints (Tailwind Padrão)

| Breakpoint | Valor | Descrição |
|------------|-------|-----------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop pequeno |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Desktop grande |

### 2.3 Gaps Identificados

#### Design Tokens
- 🔴 **Animações/Durações:** Não há tokens padronizados para transições
- 🔴 **Sombras:** Apenas shadow-sm do Tailwind, sem escala customizada
- 🔴 **Z-Index:** Não há escala padronizada

#### Componentes
- 🔴 **Loading States:** Não há componente Skeleton
- 🔴 **Notificações:** Não há sistema de Toast
- 🔴 **Modais:** Não há componente Dialog
- 🔴 **Tabelas:** Não há componente Table reutilizável
- 🔴 **Formulários:** Faltam inputs, selects, textareas

#### Layout
- 🟡 **Mobile:** Sidebar mobile implementado, mas precisa de refinamento
- 🟡 **Responsividade:** Dashboard usa grid responsivo, mas pode ser otimizado

---

## 3. Requisitos Funcionais

### 3.1 Design Tokens (RF-01 a RF-05)

#### RF-01: Paleta de Cores Completa
**Prioridade:** Alta | **Status:** 🟡 Parcial

| Categoria | Token | Valor | Status |
|-----------|-------|-------|--------|
| **Primária** | `uniq.primary` | `#3e5653` | ✅ |
| | `uniq.primary-hover` | `#1f2937` | ✅ |
| | `uniq.primary-foreground` | `#ffffff` | ✅ |
| **Accent** | `uniq.accent` | `#86cb92` | ✅ |
| | `uniq.accent-foreground` | `#1f2937` | 🟡 (adicionar) |
| **Semântica** | `destructive` | `#dc2626` | ✅ |
| | `success` | `#22c55e` | ✅ |
| | `warning` | `#f59e0b` | ✅ |
| | `info` | `#3b82f6` | ✅ |
| **Neutras** | `uniq.platinum` | `#efefef` | ✅ |
| | `uniq.white` | `#ffffff` | ✅ |
| | `uniq.text` | `#1f2937` | ✅ |
| | `uniq.muted` | `#627271` | ✅ |
| | `uniq.border` | `#e5e7eb` | ✅ |

**Critérios de Aceitação:**
- [x] Cores UNIQ aplicadas no Tailwind config
- [ ] Variáveis CSS para dark mode (opcional nesta sprint)
- [x] Cores semânticas definidas (destructive, success, warning)

#### RF-02: Sistema Tipográfico
**Prioridade:** Alta | **Status:** ✅ Completo

| Elemento | Fonte | Tamanho | Peso | Uso |
|----------|-------|---------|------|-----|
| **Body** | Poppins | 16px (base) | 400 | Texto padrão |
| **H1** | Poppins | 2rem (32px) | 700 | Títulos de página |
| **H2** | Poppins | 1.5rem (24px) | 600 | Seções |
| **H3** | Poppins | 1.25rem (20px) | 600 | Cards |
| **H4** | Poppins | 1.125rem (18px) | 500 | Subseções |
| **Small** | Poppins | 0.875rem (14px) | 400 | Descrições |
| **Caption** | Poppins | 0.75rem (12px) | 400 | Labels, metadados |

**Critérios de Aceitação:**
- [x] Fonte Poppins configurada
- [x] Pesos 300-700 disponíveis
- [x] Hierarquia visual consistente

#### RF-03: Espaçamento
**Prioridade:** Média | **Status:** ✅ Completo (Tailwind)

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1` | 4px | Microespaçamentos |
| `space-2` | 8px | Ícones, badges |
| `space-3` | 12px | Padding interno |
| `space-4` | 16px | Cards, seções |
| `space-6` | 24px | Containers |
| `space-8` | 32px | Seções grandes |
| `space-12` | 48px | Layout major |

**Critérios de Aceitação:**
- [x] Sistema 4px/8px grid
- [x] Consistência em paddings e margins

#### RF-04: Breakpoints Responsivos
**Prioridade:** Alta | **Status:** ✅ Completo

| Breakpoint | Valor | Uso Principal |
|------------|-------|---------------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop (sidebar fixa) |
| `xl` | 1280px | Desktop expandido |

**Critérios de Aceitação:**
- [x] Sidebar colapsa em < lg
- [x] Grid de métricas: 1 coluna (mobile) → 2 colunas (sm) → 4 colunas (lg)
- [x] Tabelas com scroll horizontal em mobile

#### RF-05: Sombras e Efeitos Visuais
**Prioridade:** Média | **Status:** 🟡 Parcial

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-sm` | Tailwind padrão | Cards padrão |
| `shadow-md` | Tailwind padrão | Hover em cards |
| `shadow-lg` | Tailwind padrão | Modais, dropdowns |
| `ring-primary` | `2px solid #3e5653` | Focus states |
| `ring-accent` | `2px solid #86cb92` | Focus em inputs |

**Critérios de Aceitação:**
- [ ] Escala de sombras customizada (adicionar no Tailwind)
- [x] Estados de focus visíveis
- [ ] Transições padronizadas (adicionar)

---

### 3.2 Componentes Base (RF-06 a RF-17)

#### RF-06: Button
**Prioridade:** Alta | **Status:** ✅ Completo | **Arquivo:** `components/ui/button.tsx`

**API/Props:**
```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean; // Permite usar como wrapper
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

**Estados:**
| Estado | Estilo |
|--------|--------|
| Default | `bg-uniq-primary text-white` |
| Hover | `hover:bg-uniq-hover` |
| Focus | `focus-visible:ring-2 focus-visible:ring-ring` |
| Disabled | `disabled:opacity-50 disabled:pointer-events-none` |
| Loading | 🟡 Adicionar spinner interno |

**Variações:**
- Primary (default): Fundo verde escuro, texto branco
- Destructive: Fundo vermelho, texto branco
- Outline: Borda cinza, fundo transparente
- Secondary: Fundo platinum
- Ghost: Transparente, fundo no hover
- Link: Estilo link, underline no hover

**Critérios de Aceitação:**
- [x] 6 variantes visuais
- [x] 4 tamanhos
- [x] Estados de disabled
- [ ] Estado de loading (adicionar)
- [x] Integração com Radix Slot
- [x] Acessibilidade (focus visible)

---

#### RF-07: Input
**Prioridade:** Alta | **Status:** 🔴 Não Existe | **Arquivo:** `components/ui/input.tsx` (criar)

**Descrição:** Campo de texto para formulários com estilos consistentes.

**API/Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
```

**Estados:**
| Estado | Estilo |
|--------|--------|
| Default | `border-uniq-border bg-[#f9fafb]` |
| Focus | `ring-2 ring-uniq-accent border-uniq-accent` |
| Error | `border-red-500 ring-red-200` |
| Disabled | `opacity-50 cursor-not-allowed` |

**Variações:**
- Default: Input padrão
- With Icon: Input com ícone à esquerda ou direita
- Error: Borda vermelha, opcional mensagem de erro
- Search: Variante otimizada para busca

**Exemplo de Uso:**
```tsx
<Input placeholder="Nome completo" />
<Input icon={<Search />} iconPosition="left" placeholder="Buscar..." />
<Input error placeholder="Campo obrigatório" />
```

**Critérios de Aceitação:**
- [ ] Componente criado
- [ ] Estados default, focus, error, disabled
- [ ] Suporte a ícones
- [ ] Integração com Label (opcional)

---

#### RF-08: Card
**Prioridade:** Alta | **Status:** ✅ Completo | **Arquivo:** `components/ui/card.tsx`

**API/Props:**
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// Sub-componentes
CardHeader, CardTitle, CardDescription, CardContent, CardFooter
```

**Estilos:**
- Background: `bg-uniq-white`
- Borda: `border border-uniq-border`
- Bordas arredondadas: `rounded-xl`
- Sombra: `shadow-sm`
- Hover: `hover:shadow-md` (quando aplicável)

**Exemplo de Uso:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição opcional</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo principal</CardContent>
  <CardFooter>Ações</CardFooter>
</Card>
```

**Critérios de Aceitação:**
- [x] Estrutura completa com sub-componentes
- [x] Estilos consistentes
- [x] Flexibilidade de conteúdo

---

#### RF-09: Badge
**Prioridade:** Alta | **Status:** ✅ Completo | **Arquivo:** `components/ui/badge.tsx`

**API/Props:**
```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 
            'success' | 'warning' | 'info' | 'accent';
}
```

**Variações:**
| Variante | Uso | Estilo |
|----------|-----|--------|
| default | Status padrão | `bg-uniq-primary text-white` |
| secondary | Informações | `bg-uniq-platinum text-uniq-text` |
| destructive | Erros | `bg-red-100 text-red-700` |
| success | Sucesso | `bg-green-100 text-green-700` |
| warning | Atenção | `bg-yellow-100 text-yellow-700` |
| info | Informação | `bg-blue-100 text-blue-700` |
| accent | Destaque UNIQ | `bg-uniq-accent/20 text-uniq-accent` |
| outline | Borda apenas | `border text-uniq-text` |

**Critérios de Aceitação:**
- [x] 8 variantes visuais
- [x] Formato rounded-full
- [x] Tamanhos consistentes

---

#### RF-10: Avatar
**Prioridade:** Alta | **Status:** ✅ Completo | **Arquivo:** `components/ui/avatar.tsx`

**API/Props:**
```typescript
interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string; // Texto exibido quando não há imagem
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

// Sub-componentes
Avatar, AvatarImage, AvatarFallback
```

**Tamanhos:**
| Tamanho | Valor |
|---------|-------|
| sm | 24px |
| default | 40px |
| lg | 48px |
| xl | 64px |

**Critérios de Aceitação:**
- [x] Integração com Radix UI
- [x] Fallback automático
- [x] Bordas arredondadas
- [ ] Tamanhos configuráveis (adicionar)

---

#### RF-11: Dialog/Modal
**Prioridade:** Alta | **Status:** 🔴 Não Existe | **Arquivo:** `components/ui/dialog.tsx` (criar)

**Descrição:** Componente de diálogo/modal para confirmações e formulários.

**API/Props:**
```typescript
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

// Sub-componentes
Dialog, DialogTrigger, DialogContent, DialogHeader, 
DialogTitle, DialogDescription, DialogFooter, DialogClose
```

**Funcionalidades:**
- Overlay escuro com blur
- Animações de entrada/saída
- Fechar com ESC ou click fora
- Foco automático no primeiro elemento
- Scroll lock no body

**Estados:**
- Closed: Não visível
- Open: Visível com overlay

**Exemplo de Uso:**
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar ação</DialogTitle>
      <DialogDescription>Esta ação não pode ser desfeita.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
      <Button variant="destructive">Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Critérios de Aceitação:**
- [ ] Componente criado com Radix Dialog
- [ ] Overlay com backdrop-blur
- [ ] Animações suaves
- [ ] Acessibilidade (ARIA, ESC, focus trap)

---

#### RF-12: Table
**Prioridade:** Alta | **Status:** 🔴 Não Existe | **Arquivo:** `components/ui/table.tsx` (criar)

**Descrição:** Componente de tabela para listagens de dados.

**API/Props:**
```typescript
// Sub-componentes
Table, TableHeader, TableBody, TableFooter, 
TableRow, TableHead, TableCell, TableCaption

interface TableProps {
  children: React.ReactNode;
  className?: string;
}
```

**Funcionalidades:**
- Cabeçalho fixo (opcional)
- Linhas com hover
- Bordas sutis
- Scroll horizontal em mobile
- Estados empty e loading

**Estilos:**
- Header: `bg-[#f9fafb] font-medium`
- Row: `border-b border-uniq-border hover:bg-gray-50`
- Cell: `px-6 py-4`

**Exemplo de Uso:**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Cliente</TableHead>
      <TableHead>Valor</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.value}</TableCell>
        <TableCell><Badge>{item.status}</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Critérios de Aceitação:**
- [ ] Componente criado
- [ ] Sub-componentes organizados
- [ ] Responsividade (scroll horizontal)
- [ ] Estados de loading e empty

---

#### RF-13: Toast/Notification
**Prioridade:** Alta | **Status:** 🔴 Não Existe | **Arquivo:** `components/ui/toast.tsx` e `components/ui/toaster.tsx`

**Descrição:** Sistema de notificações toast.

**API/Props:**
```typescript
interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Hook para usar
const { toast } = useToast();
```

**Uso:**
```typescript
toast({
  title: "Sucesso!",
  description: "Cliente cadastrado com sucesso.",
  variant: "success",
});
```

**Funcionalidades:**
- Auto-dismiss após duração
- Stack de múltiplos toasts
- Posicionamento (top-right, bottom-right, etc.)
- Animações de entrada/saída

**Critérios de Aceitação:**
- [ ] Componente criado
- [ ] Hook useToast implementado
- [ ] 4 variantes visuais
- [ ] Auto-dismiss configurável

---

#### RF-14: Skeleton
**Prioridade:** Alta | **Status:** 🔴 Não Existe | **Arquivo:** `components/ui/skeleton.tsx`

**Descrição:** Placeholder animado para estados de loading.

**API/Props:**
```typescript
interface SkeletonProps {
  className?: string;
}
```

**Variações (por uso):**
- SkeletonCard: Para cards
- SkeletonText: Para textos
- SkeletonAvatar: Para avatares
- SkeletonTable: Para tabelas

**Exemplo de Uso:**
```tsx
// Card loading
<div className="space-y-4">
  <Skeleton className="h-4 w-1/3" />
  <Skeleton className="h-8 w-full" />
  <Skeleton className="h-8 w-full" />
</div>
```

**Critérios de Aceitação:**
- [ ] Componente base criado
- [ ] Animação pulse
- [ ] Variações comuns documentadas

---

#### RF-15: Select
**Prioridade:** Média | **Status:** 🔴 Não Existe | **Arquivo:** `components/ui/select.tsx`

**Descrição:** Dropdown de seleção.

**API/Props:**
```typescript
interface SelectProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
```

**Funcionalidades:**
- Placeholder
- Opções com labels
- Estados disabled
- Scroll em listas longas

**Critérios de Aceitação:**
- [ ] Componente criado com Radix Select
- [ ] Placeholder funcional
- [ ] Estados disabled
- [ ] Acessibilidade

---

#### RF-16: Label
**Prioridade:** Média | **Status:** 🔴 Não Existe | **Arquivo:** `components/ui/label.tsx`

**Descrição:** Label para formulários.

**API/Props:**
```typescript
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: boolean;
}
```

**Estilos:**
- Default: `text-sm font-medium text-uniq-text`
- Required: Indicador asterisco vermelho
- Error: `text-red-600`

**Critérios de Aceitação:**
- [ ] Componente criado
- [ ] Suporte a required
- [ ] Estado de erro

---

#### RF-17: Checkbox
**Prioridade:** Média | **Status:** 🔴 Não Existe | **Arquivo:** `components/ui/checkbox.tsx`

**Descrição:** Caixa de seleção.

**API/Props:**
```typescript
interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}
```

**Estados:**
- Unchecked: Caixa vazia
- Checked: Caixa com check
- Indeterminate: Caixa com traço (para grupos)
- Disabled: Opacidade reduzida

**Critérios de Aceitação:**
- [ ] Componente criado com Radix Checkbox
- [ ] Estados checked/unchecked
- [ ] Estado indeterminate
- [ ] Integração com label

---

### 3.3 Layout Base (RF-18 a RF-21)

#### RF-18: App Shell
**Prioridade:** Alta | **Status:** ✅ Completo

**Descrição:** Estrutura principal da aplicação com sidebar, header e área de conteúdo.

**Estrutura:**
```
┌─────────────────────────────────────────────────────┐
│ Sidebar │ Header                                    │
│ (fixed) │ (fixed, left offset)                      │
├─────────┼───────────────────────────────────────────┤
│         │                                           │
│  Menu   │         Main Content                      │
│ Lateral │         (scrollable)                      │
│         │                                           │
│         │                                           │
└─────────┴───────────────────────────────────────────┘
```

**Implementação Atual:**
- Sidebar: Fixo à esquerda, 256px (`w-64`)
- Header: Fixo no topo, altura 64px (`h-16`)
- Content: `ml-0 lg:ml-64 pt-16 p-6`

**Arquivos:**
- Layout: `app/layout.tsx`
- Dashboard: `app/dashboard/page.tsx`

**Critérios de Aceitação:**
- [x] Sidebar fixo à esquerda
- [x] Header fixo no topo
- [x] Área de conteúdo scrollável
- [x] Offset correto para não sobrepor elementos

---

#### RF-19: Sidebar Navigation
**Prioridade:** Alta | **Status:** ✅ Completo | **Arquivo:** `components/sidebar.tsx`

**Funcionalidades:**
- Seções organizadas (Principal, Módulos)
- Menu mobile com overlay
- Indicador de item ativo
- Badges de notificação
- User profile footer

**Menu Items:**
| Seção | Itens |
|-------|-------|
| Principal | Dashboard, Minha Empresa, Meus Módulos |
| Módulos | CRM, Financeiro, Estoque, Vendas, Loja Virtual, Agendamentos, MEL |
| Footer | Configurações, Sair |

**Mobile:**
- Botão hamburger no header mobile
- Sidebar desliza da esquerda
- Overlay escuro ao abrir
- Botão fechar (X) dentro do sidebar

**Critérios de Aceitação:**
- [x] Navegação organizada por seções
- [x] Estado ativo visual
- [x] Versão mobile com drawer
- [x] User profile no footer

---

#### RF-20: Header
**Prioridade:** Alta | **Status:** ✅ Completo | **Arquivo:** `components/header.tsx`

**Funcionalidades:**
- Título da página com breadcrumbs
- Barra de busca central
- Notificações (badge)
- Dropdown de usuário
- Atalho de teclado (⌘K) na busca

**Estrutura:**
```
┌──────────────────────────────────────────────────────────────┐
│ 🍞 Breadcrumbs │    🔍 Search    │ 🔔 👤 │
└──────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface HeaderProps {
  pageTitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}
```

**Critérios de Aceitação:**
- [x] Breadcrumbs dinâmicos
- [x] Search bar com atalho ⌘K
- [x] Notificações com badge
- [x] Dropdown de usuário

---

#### RF-21: Mobile Layout
**Prioridade:** Alta | **Status:** 🟡 Parcial

**Descrição:** Adaptações para dispositivos móveis.

**Implementações Atuais:**
- ✅ Sidebar vira drawer em < lg
- ✅ Hamburger menu visível
- ✅ Grid de métricas: 1 coluna → 2 colunas → 4 colunas
- ✅ Tabelas com overflow-x-auto

**Melhorias Necessárias:**
- 🔴 Bottom navigation para mobile (opcional)
- 🔴 Touch targets maiores em elementos interativos
- 🟡 Otimização de espaçamento em telas pequenas

**Critérios de Aceitação:**
- [x] Sidebar responsivo
- [x] Grids adaptativos
- [ ] Bottom nav (opcional)
- [ ] Touch targets >= 44px

---

## 4. Requisitos Não-Funcionais

### 4.1 Performance
| Requisito | Critério | Status |
|-----------|----------|--------|
| **First Contentful Paint** | < 1.5s | 🟡 Analisar |
| **Time to Interactive** | < 3s | 🟡 Analisar |
| **Lighthouse Performance** | > 90 | 🟡 Analisar |
| **Bundle Size** | < 200KB (gzip) | 🟡 Analisar |
| **Imagens** | Otimizadas, lazy loading | ✅ Static export |

### 4.2 Acessibilidade
| Requisito | Critério | Status |
|-----------|----------|--------|
| **ARIA Labels** | Todos os elementos interativos | 🟡 Parcial |
| **Keyboard Navigation** | Tab order lógico, focus visível | 🟡 Parcial |
| **Color Contrast** | WCAG AA (4.5:1) | 🟡 Verificar |
| **Screen Readers** | Testado com NVDA/VoiceOver | 🔴 Não testado |
| **Reduced Motion** | Respeitar preferência do usuário | 🔴 Não implementado |

### 4.3 Responsividade
| Breakpoint | Ajustes |
|------------|---------|
| **Mobile (< 640px)** | Sidebar drawer, 1 coluna grids, scroll tables |
| **Tablet (640-1024px)** | Sidebar fixo se landscape, 2 colunas grids |
| **Desktop (> 1024px)** | Sidebar fixo, 3-4 colunas grids, espaçamento maior |

### 4.4 Compatibilidade de Browsers
| Navegador | Versão Mínima |
|-----------|---------------|
| Chrome | Últimas 2 versões |
| Firefox | Últimas 2 versões |
| Safari | 14+ |
| Edge | Últimas 2 versões |

---

## 5. Dependências

### 5.1 Já Instaladas

| Pacote | Versão | Uso |
|--------|--------|-----|
| next | 14.2.5 | Framework React |
| react | 18.3.1 | UI Library |
| typescript | 5.4.5 | Tipagem |
| tailwindcss | 3.4.4 | Estilização |
| @radix-ui/react-avatar | 1.0.4 | Componente Avatar |
| @radix-ui/react-dropdown-menu | 2.0.6 | Dropdown menu |
| @radix-ui/react-slot | 1.0.2 | Composição de componentes |
| class-variance-authority | 0.7.0 | Variantes de componentes |
| clsx | 2.1.1 | Concatenação de classes |
| tailwind-merge | 2.3.0 | Merge de classes Tailwind |
| tailwindcss-animate | 1.0.7 | Animações CSS |
| lucide-react | 0.400.0 | Ícones |
| shadcn | 4.0.5 | CLI do shadcn/ui |

### 5.2 Necessárias (Instalar)

| Pacote | Uso | Prioridade |
|--------|-----|------------|
| @radix-ui/react-dialog | Componente Dialog/Modal | Alta |
| @radix-ui/react-select | Componente Select | Alta |
| @radix-ui/react-toast | Sistema de Toast | Alta |
| @radix-ui/react-checkbox | Checkbox | Média |
| @radix-ui/react-label | Labels | Média |
| @radix-ui/react-tabs | Tabs | Baixa |
| @radix-ui/react-tooltip | Tooltips | Baixa |

### 5.3 Opcionais (Futuro)

| Pacote | Uso |
|--------|-----|
| recharts | Gráficos e visualizações |
| date-fns | Manipulação de datas |
| react-hook-form | Formulários com validação |
| zod | Validação de schemas |
| @tanstack/react-table | Tabelas avançadas |

---

## 6. Plano de Implementação

### 6.1 Semana 1 - Cronograma Dia a Dia

#### 📅 Dia 1-2: Análise e Setup (18-19/03/2026)

| Tarefa | Prioridade | Estimativa | Responsável |
|--------|------------|------------|-------------|
| Análise completa dos componentes existentes | Alta | 2h | @vibe-implementer |
| Revisar tailwind.config.ts e globals.css | Alta | 1h | @vibe-implementer |
| Identificar gaps e criar lista de componentes | Alta | 1h | @vibe-implementer |
| Instalar dependências necessárias | Alta | 30min | @vibe-implementer |
| Configurar estrutura de pastas se necessário | Média | 30min | @vibe-implementer |

**Entregável:** Lista final de componentes a serem criados/atualizados

---

#### 📅 Dia 3-4: Novos Componentes (20-21/03/2026)

| Componente | Prioridade | Complexidade | Estimativa |
|------------|------------|--------------|------------|
| Dialog/Modal | Alta | Média | 2h |
| Table | Alta | Média | 2h |
| Toast + Toaster | Alta | Baixa | 1.5h |
| Skeleton | Alta | Baixa | 1h |
| Input | Alta | Baixa | 1h |
| Label | Média | Baixa | 30min |
| Select | Média | Média | 1.5h |
| Checkbox | Média | Baixa | 1h |
| Textarea | Média | Baixa | 30min |

**Entregável:** Todos os componentes base criados e funcionando

---

#### 📅 Dia 5-6: Layout e Responsividade (22-23/03/2026)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Revisar responsividade do Sidebar mobile | Alta | 2h |
| Implementar melhorias de touch targets | Média | 1h |
| Testar em 3 breakpoints (mobile, tablet, desktop) | Alta | 2h |
| Ajustar espaçamentos e tipografia mobile | Média | 1h |
| Implementar bottom navigation (opcional) | Baixa | 2h |

**Entregável:** Layout responsivo testado e otimizado

---

#### 📅 Dia 7: Documentação e Testes (24/03/2026)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Documentar todos os componentes criados | Alta | 2h |
| Criar página de showcase/storybook simples | Média | 2h |
| Testar todos os estados (hover, focus, disabled, loading) | Alta | 1h |
| Revisar acessibilidade (ARIA labels, keyboard) | Alta | 1h |
| Atualizar TRACKING.md com progresso | Média | 30min |

**Entregável:** Documentação completa, página de showcase

---

### 6.2 Priorização MoSCoW

#### 🔴 Must Have (Crítico - Sprint deve ter)

| Item | Justificativa |
|------|---------------|
| Design Tokens consolidados | Base para todo o sistema visual |
| Button, Card, Badge, Avatar | Componentes já existentes, validar |
| Input, Label, Select | Essenciais para formulários |
| Dialog/Modal | Necessário para confirmações e forms |
| Table | Essencial para listagens (vendas, clientes) |
| Toast | Feedback para usuário essencial |
| Skeleton | Loading states obrigatórios |
| Sidebar e Header | Layout base já funcional |
| Responsividade mobile | Requisito de UX |

#### 🟡 Should Have (Importante - Ter se der tempo)

| Item | Justificativa |
|------|---------------|
| Checkbox | Formulários avançados |
| Textarea | Descrições longas |
| Página de documentação | Facilita desenvolvimento futuro |
| Tooltips | UX adicional |
| Tabs | Navegação interna |

#### 🟢 Could Have (Desejável - Se sobrar tempo)

| Item | Justificativa |
|------|---------------|
| Bottom navigation mobile | Alternativa ao hamburger |
| Switch | Toggle on/off |
| Separator | Divisores elegantes |
| ScrollArea | Scroll customizado |
| Sheet | Slide-out panels |

#### ⚫ Won't Have (Fora do escopo desta sprint)

| Item | Motivo |
|------|--------|
| Storybook completo | Prioridade baixa, documentação MD suficiente |
| Testes automatizados de UI | Serão feitos em sprints futuras |
| Animações complexas | Fora do escopo do MVP |
| Dark mode completo | Feature futura |

---

## 7. Critérios de Aceitação (Definition of Done)

### 7.1 Componentes
- [x] **Button:** 6 variantes, 4 tamanhos, estados hover/focus/disabled
- [ ] **Input:** Criado com estados default, focus, error, disabled
- [x] **Card:** Estrutura completa, sub-componentes funcionando
- [x] **Badge:** 8 variantes visuais
- [x] **Avatar:** Integração Radix, fallback funcionando
- [ ] **Dialog:** Criado com Radix, overlay, animações
- [ ] **Table:** Criado com estrutura completa, responsivo
- [ ] **Toast:** Sistema criado, hook useToast implementado
- [ ] **Skeleton:** Criado com animação pulse
- [ ] **Select:** Criado com Radix, opções funcionando
- [ ] **Label:** Criado com suporte a required/error
- [ ] **Checkbox:** Criado com estados checked/unchecked

### 7.2 Design Tokens
- [x] Paleta de cores UNIQ configurada
- [x] Fonte Poppins aplicada
- [x] Espaçamento consistente (4px/8px grid)
- [x] Border radius padronizado (0.75rem)
- [ ] Animações/durações padronizadas (adicionar)
- [ ] Sombras customizadas (adicionar)

### 7.3 Layout
- [x] App Shell funcionando (Sidebar + Header + Content)
- [x] Sidebar responsivo (mobile drawer)
- [x] Header com busca e notificações
- [x] Offset correto para conteúdo
- [ ] Mobile refinado (touch targets, espaçamentos)

### 7.4 Responsividade
- [x] Testado em mobile (< 640px)
- [x] Testado em tablet (640-1024px)
- [x] Testado em desktop (> 1024px)
- [x] Grids adaptativos
- [x] Tabelas com scroll horizontal

### 7.5 Acessibilidade
- [x] Focus states visíveis
- [ ] ARIA labels em componentes interativos
- [ ] Keyboard navigation funcional
- [ ] Contraste de cores adequado (WCAG AA)

### 7.6 Documentação
- [ ] Inventário de componentes atualizado
- [ ] Props documentadas
- [ ] Exemplos de uso criados
- [ ] Página de showcase funcional

---

## 8. Riscos e Mitigações

### Risco 1: Complexidade dos Componentes Radix
**Descrição:** Componentes como Dialog, Select e Toast usam Radix UI que pode ser complexo.
**Impacto:** Alto | **Probabilidade:** Média
**Mitigação:** Usar templates do shadcn/ui como referência, documentação do Radix.

### Risco 2: Inconsistência Visual
**Descrição:** Novos componentes podem não seguir exatamente o estilo existente.
**Impacto:** Médio | **Probabilidade:** Média
**Mitigação:** Revisar todos os componentes no final, criar checklist de estilos.

### Risco 3: Problemas de Responsividade
**Descrição:** Mobile pode ter comportamentos inesperados.
**Impacto:** Médio | **Probabilidade:** Média
**Mitigação:** Testar em dispositivos reais ou emuladores, usar Chrome DevTools.

### Risco 4: Sobrecarga da Sprint
**Descrição:** Muitos componentes para criar em uma semana.
**Impacto:** Alto | **Probabilidade:** Média
**Mitigação:** Priorização MoSCoW, focar em Must Have primeiro.

### Risco 5: Dependências Quebradas
**Descrição:** Novas dependências do Radix podem conflitar.
**Impacto:** Baixo | **Probabilidade:** Baixa
**Mitigação:** Testar instalação gradual, manter package.json versionado.

---

## 9. Referências

### Documentação Oficial
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/primitives)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

### Design Systems de Referência
- [Material Design](https://m3.material.io/)
- [Ant Design](https://ant.design/)
- [Chakra UI](https://chakra-ui.com/)
- [Radix UI Themes](https://www.radix-ui.com/themes/docs/overview/getting-started)

### Inspirações UI
- [Tailwind UI](https://tailwindui.com/)
- [shadcn/ui Examples](https://ui.shadcn.com/examples/dashboard)
- [Figma Community - Dashboard Kits](https://www.figma.com/community)

### Ferramentas
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)

---

## 10. Anexos

### Anexo A: Inventário de Componentes

| Nome | Tipo | Status | Prioridade | Complexidade | Arquivo |
|------|------|--------|------------|--------------|---------|
| Button | UI | ✅ Pronto | Alta | Baixa | `components/ui/button.tsx` |
| Card | UI | ✅ Pronto | Alta | Baixa | `components/ui/card.tsx` |
| Badge | UI | ✅ Pronto | Alta | Baixa | `components/ui/badge.tsx` |
| Avatar | UI | ✅ Pronto | Alta | Baixa | `components/ui/avatar.tsx` |
| DropdownMenu | UI | ✅ Pronto | Alta | Média | `components/ui/dropdown-menu.tsx` |
| MetricCard | UNIQ | ✅ Pronto | Alta | Média | `components/metric-card.tsx` |
| Sidebar | Layout | ✅ Pronto | Alta | Média | `components/sidebar.tsx` |
| Header | Layout | ✅ Pronto | Alta | Média | `components/header.tsx` |
| Dialog | UI | 🔴 Faltando | Alta | Média | `components/ui/dialog.tsx` |
| Table | UI | 🔴 Faltando | Alta | Média | `components/ui/table.tsx` |
| Toast | UI | 🔴 Faltando | Alta | Baixa | `components/ui/toast.tsx` |
| Skeleton | UI | 🔴 Faltando | Alta | Baixa | `components/ui/skeleton.tsx` |
| Input | UI | 🔴 Faltando | Alta | Baixa | `components/ui/input.tsx` |
| Label | UI | 🔴 Faltando | Média | Baixa | `components/ui/label.tsx` |
| Select | UI | 🔴 Faltando | Média | Média | `components/ui/select.tsx` |
| Checkbox | UI | 🔴 Faltando | Média | Baixa | `components/ui/checkbox.tsx` |
| Textarea | UI | 🔴 Faltando | Média | Baixa | `components/ui/textarea.tsx` |
| Tabs | UI | 🔴 Faltando | Baixa | Média | `components/ui/tabs.tsx` |
| Tooltip | UI | 🔴 Faltando | Baixa | Baixa | `components/ui/tooltip.tsx` |
| Switch | UI | 🔴 Faltando | Baixa | Baixa | `components/ui/switch.tsx` |
| Separator | UI | 🔴 Faltando | Baixa | Baixa | `components/ui/separator.tsx` |

**Legenda:**
- **UI:** Componente genérico do Design System
- **UNIQ:** Componente específico do UNIQ Empresas
- **Layout:** Componente estrutural

---

### Anexo B: Mock Data Sugerido

#### B.1 Dados de Usuário
```typescript
// lib/mocks/user.ts
export const mockUser = {
  id: "1",
  name: "Carlos Silva",
  email: "carlos@techsolutions.com.br",
  company: "Tech Solutions Ltda",
  avatar: null,
  role: "admin",
  plan: "pro",
};
```

#### B.2 Dados de Dashboard
```typescript
// lib/mocks/dashboard.ts
export const mockStats = {
  sales: { value: 12450.00, change: 15, trend: 'up' as const },
  orders: { value: 23, change: 5, trend: 'up' as const, subtitle: '8 em processamento' },
  customers: { value: 156, change: 5, trend: 'up' as const, label: 'esta semana' },
  inventory: { value: 4, change: 0, trend: 'neutral' as const, alert: 'Ação necessária' },
};

export const mockRecentSales = [
  { id: "#12345", client: "Maria Oliveira", date: "12/03/2026", value: 299.90, status: "Concluído" },
  { id: "#12344", client: "João Silva", date: "12/03/2026", value: 150.00, status: "Processando" },
  { id: "#12343", client: "Ana Paula", date: "11/03/2026", value: 450.00, status: "Pendente" },
  { id: "#12342", client: "Carlos Mendes", date: "11/03/2026", value: 1250.00, status: "Concluído" },
];

export const mockTopProducts = [
  { name: "Notebook Dell Inspiron", sold: 45, percent: 85 },
  { name: "Mouse Sem Fio Logitech", sold: 32, percent: 65 },
  { name: "Teclado Mecânico RGB", sold: 28, percent: 55 },
  { name: "Monitor 24\" Full HD", sold: 22, percent: 45 },
];

export const mockAppointments = [
  { time: "14:00", client: "João Pedro", service: "Corte de cabelo" },
  { time: "15:30", client: "Maria Clara", service: "Manicure" },
  { time: "16:45", client: "Ana Paula", service: "Pedicure" },
];

export const mockMELMessages = [
  { id: 1, text: "Bom dia! Você tem 4 pedidos para processar hoje.", time: "10:30", sender: "bot" },
];
```

#### B.3 Dados de Módulos
```typescript
// lib/mocks/modules.ts
export const mockModules = [
  { id: 'crm', name: 'CRM', icon: 'Users', path: '/crm', color: 'blue', description: 'Gestão de clientes e pipeline' },
  { id: 'finance', name: 'Financeiro', icon: 'DollarSign', path: '/financeiro', color: 'green', description: 'Contas a pagar e receber' },
  { id: 'store', name: 'Loja Virtual', icon: 'Store', path: '/loja', color: 'purple', description: 'Sua loja online' },
  { id: 'stock', name: 'Estoque', icon: 'Package', path: '/estoque', color: 'orange', description: 'Controle de produtos' },
  { id: 'pdv', name: 'Vendas PDV', icon: 'ShoppingCart', path: '/pdv', color: 'pink', description: 'Ponto de venda' },
  { id: 'services', name: 'Serviços', icon: 'Scissors', path: '/servicos', color: 'cyan', description: 'Agenda de serviços' },
  { id: 'schedule', name: 'Agendamentos', icon: 'Calendar', path: '/agendamentos', color: 'indigo', description: 'Reservas de horários' },
];
```

#### B.4 Dados para Teste de Componentes
```typescript
// lib/mocks/component-data.ts
export const mockTableData = [
  { id: 1, name: "João Silva", email: "joao@email.com", status: "active", role: "Admin" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", status: "active", role: "User" },
  { id: 3, name: "Pedro Costa", email: "pedro@email.com", status: "inactive", role: "User" },
];

export const mockSelectOptions = [
  { value: "option1", label: "Opção 1" },
  { value: "option2", label: "Opção 2" },
  { value: "option3", label: "Opção 3", disabled: true },
];
```

---

### Anexo C: Árvore de Componentes

```
📦 components/
├── 📁 ui/                          # Componentes base do Design System
│   ├── button.tsx                  # ✅ Botões com variantes
│   ├── card.tsx                    # ✅ Containers de conteúdo
│   ├── badge.tsx                   # ✅ Tags e status
│   ├── avatar.tsx                  # ✅ Fotos de perfil
│   ├── dropdown-menu.tsx           # ✅ Menus dropdown
│   ├── input.tsx                   # 🔴 Campo de texto
│   ├── label.tsx                   # 🔴 Labels de formulário
│   ├── select.tsx                  # 🔴 Dropdown de seleção
│   ├── checkbox.tsx                # 🔴 Caixas de seleção
│   ├── textarea.tsx                # 🔴 Área de texto
│   ├── dialog.tsx                  # 🔴 Modais e diálogos
│   ├── table.tsx                   # 🔴 Tabelas de dados
│   ├── toast.tsx                   # 🔴 Notificações
│   ├── toaster.tsx                 # 🔴 Container de toasts
│   ├── skeleton.tsx                # 🔴 Loading placeholders
│   ├── tabs.tsx                    # 🔴 Abas de navegação
│   ├── tooltip.tsx                 # 🔴 Dicas contextuais
│   ├── switch.tsx                  # 🔴 Toggle on/off
│   └── separator.tsx               # 🔴 Divisores
│
├── 📁 layout/                      # Componentes de layout (futuro)
│   ├── app-shell.tsx               # 🔴 Wrapper principal
│   ├── page-container.tsx          # 🔴 Container de página
│   └── grid.tsx                    # 🔴 Grids customizados
│
├── sidebar.tsx                     # ✅ Navegação lateral
├── header.tsx                      # ✅ Cabeçalho
├── metric-card.tsx                 # ✅ Cards de métricas
├── sales-table.tsx                 # 🔴 Tabela de vendas
├── top-products.tsx                # 🔴 Lista de produtos
├── agenda-widget.tsx               # 🔴 Widget de agenda
└── mel-widget.tsx                  # 🔴 Widget do consultor IA
```

---

### Anexo D: Estrutura de Cores

```
┌─────────────────────────────────────────────────────────────┐
│                    PALETA UNIQ EMPRESAS                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PRIMÁRIA                                                   │
│  ┌──────────┬──────────┬──────────┐                        │
│  │ #3e5653  │ #1f2937  │ #ffffff  │                        │
│  │ Primary  │ Hover    │ Text     │                        │
│  └──────────┴──────────┴──────────┘                        │
│                                                             │
│  ACCENT                                                     │
│  ┌───────────────────────────────┐                         │
│  │ #86cb92                       │                         │
│  │ Verde lima - Destaques        │                         │
│  └───────────────────────────────┘                         │
│                                                             │
│  NEUTRAS                                                    │
│  ┌──────────┬──────────┬──────────┬──────────┐             │
│  │ #ffffff  │ #efefef  │ #e5e7eb  │ #1f2937  │             │
│  │ White    │ Platinum │ Border   │ Text     │             │
│  └──────────┴──────────┴──────────┴──────────┘             │
│  ┌──────────┐                                              │
│  │ #627271  │                                              │
│  │ Muted    │                                              │
│  └──────────┘                                              │
│                                                             │
│  SEMÂNTICAS                                                 │
│  ┌──────────┬──────────┬──────────┬──────────┐             │
│  │ #dc2626  │ #22c55e  │ #f59e0b  │ #3b82f6  │             │
│  │ Destruct │ Success  │ Warning  │ Info     │             │
│  └──────────┴──────────┴──────────┴──────────┘             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Anexo E: Checklist de Review

#### Antes de iniciar implementação:
- [x] Analisar todos os arquivos existentes
- [x] Identificar gaps e necessidades
- [x] Criar lista priorizada de componentes
- [ ] Revisar PRD com stakeholders

#### Durante implementação:
- [ ] Seguir padrão de nomenclatura
- [ ] Documentar props com JSDoc
- [ ] Testar estados (default, hover, focus, disabled)
- [ ] Verificar responsividade
- [ ] Validar contraste de cores

#### Após implementação:
- [ ] Revisar código
- [ ] Testar em múltiplos navegadores
- [ ] Atualizar documentação
- [ ] Atualizar TRACKING.md
- [ ] Preparar handoff para próxima sprint

---

**Documento gerado em:** 18/03/2026  
**Pesquisador:** @vibe-researcher  
**Fase:** FASE 01 - Research (SDD)  
**Próxima Fase:** FASE 02 - Planning (@vibe-planner)

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação de produto (PRD). Não contém código implementado. A implementação será realizada na FASE 03 por @vibe-implementer baseado na SPEC técnica que será gerada na FASE 02.
