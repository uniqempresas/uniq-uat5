# SPEC Técnica - SPRINT_01: Design System

## UNIQ Empresas - FASE 02: Planning (SDD)

**Documento:** SPEC_SPRINT_01_Design_System.md  
**Data:** 19/03/2026  
**Versão:** 1.0  
**Plataforma:** Next.js 14 + React 18 + TypeScript + Tailwind CSS + shadcn/ui  
**Autor:** @vibe-planner  

---

## 1. Resumo Executivo

### 1.1 Contexto
Esta SPEC detalha a implementação técnica de 14 componentes novos para o Design System do UNIQ Empresas, seguindo rigorosamente os padrões shadcn/ui e Radix UI.

### 1.2 Componentes a Implementar

| # | Componente | Prioridade | Complexidade | Arquivo |
|---|------------|------------|--------------|---------|
| 1 | **Dialog** | Alta | Média | `components/ui/dialog.tsx` |
| 2 | **Table** | Alta | Média | `components/ui/table.tsx` |
| 3 | **Toast** | Alta | Baixa | `components/ui/toast.tsx` |
| 4 | **Toaster** | Alta | Baixa | `components/ui/toaster.tsx` |
| 5 | **Skeleton** | Alta | Baixa | `components/ui/skeleton.tsx` |
| 6 | **Input** | Alta | Baixa | `components/ui/input.tsx` |
| 7 | **Label** | Alta | Baixa | `components/ui/label.tsx` |
| 8 | **Select** | Alta | Média | `components/ui/select.tsx` |
| 9 | **Checkbox** | Média | Baixa | `components/ui/checkbox.tsx` |
| 10 | **Textarea** | Média | Baixa | `components/ui/textarea.tsx` |
| 11 | **Tabs** | Média | Média | `components/ui/tabs.tsx` |
| 12 | **Tooltip** | Baixa | Baixa | `components/ui/tooltip.tsx` |
| 13 | **Switch** | Baixa | Baixa | `components/ui/switch.tsx` |
| 14 | **Separator** | Baixa | Baixa | `components/ui/separator.tsx` |

### 1.3 Componentes Existentes (Referência)

| Componente | Arquivo | Status |
|------------|---------|--------|
| Button | `components/ui/button.tsx` | ✅ Implementado |
| Card | `components/ui/card.tsx` | ✅ Implementado |
| Badge | `components/ui/badge.tsx` | ✅ Implementado |
| Avatar | `components/ui/avatar.tsx` | ✅ Implementado |
| DropdownMenu | `components/ui/dropdown-menu.tsx` | ✅ Implementado |
| Sidebar | `components/sidebar.tsx` | ✅ Implementado |
| Header | `components/header.tsx` | ✅ Implementado |
| MetricCard | `components/metric-card.tsx` | ✅ Implementado |

---

## 2. Arquitetura de Componentes

### 2.1 Estrutura de Pastas

```
📦 uniq-empresas/
├── 📁 app/
│   ├── 📁 dashboard/
│   │   └── page.tsx
│   ├── 📁 showcase/              # [NOVO] Página de testes visuais
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
│
├── 📁 components/
│   ├── 📁 ui/                    # Componentes base do Design System
│   │   ├── button.tsx            # ✅ Implementado
│   │   ├── card.tsx              # ✅ Implementado
│   │   ├── badge.tsx             # ✅ Implementado
│   │   ├── avatar.tsx            # ✅ Implementado
│   │   ├── dropdown-menu.tsx     # ✅ Implementado
│   │   ├── dialog.tsx            # 🔴 CRIAR
│   │   ├── table.tsx             # 🔴 CRIAR
│   │   ├── toast.tsx             # 🔴 CRIAR
│   │   ├── toaster.tsx           # 🔴 CRIAR
│   │   ├── skeleton.tsx          # 🔴 CRIAR
│   │   ├── input.tsx             # 🔴 CRIAR
│   │   ├── label.tsx             # 🔴 CRIAR
│   │   ├── select.tsx            # 🔴 CRIAR
│   │   ├── checkbox.tsx          # 🔴 CRIAR
│   │   ├── textarea.tsx          # 🔴 CRIAR
│   │   ├── tabs.tsx              # 🔴 CRIAR
│   │   ├── tooltip.tsx           # 🔴 CRIAR
│   │   ├── switch.tsx            # 🔴 CRIAR
│   │   └── separator.tsx         # 🔴 CRIAR
│   │
│   ├── sidebar.tsx               # ✅ Implementado
│   ├── header.tsx                # ✅ Implementado
│   └── metric-card.tsx           # ✅ Implementado
│
├── 📁 hooks/                     # [NOVO] Custom hooks
│   └── use-toast.ts              # Hook para Toast
│
├── 📁 lib/
│   ├── utils.ts                  # Função cn() utilitária
│   └── mocks/                    # [NOVO] Dados mock
│       ├── user.ts
│       ├── dashboard.ts
│       ├── modules.ts
│       └── component-data.ts
│
├── 📁 tracking/
│   ├── 📁 plans/
│   │   └── PRD_SPRINT_01_Design_System.md
│   └── 📁 specs/
│       └── SPEC_SPRINT_01_Design_System.md  # Este documento
│
├── components.json               # Config shadcn/ui
├── tailwind.config.ts            # Config Tailwind + Design Tokens
├── tsconfig.json
└── package.json
```

### 2.2 Organização dos Componentes

#### Categorias por Funcionalidade

| Categoria | Componentes | Uso Principal |
|-----------|-------------|---------------|
| **Form Controls** | Input, Label, Select, Checkbox, Textarea | Formulários e inputs |
| **Overlay** | Dialog, Tooltip | Modais e tooltips |
| **Feedback** | Toast, Skeleton | Notificações e loading |
| **Data Display** | Table, Tabs | Listagens e navegação |
| **Layout** | Separator | Divisores visuais |
| **Toggle** | Switch | On/Off states |

#### Hierarquia de Dependências

```
Componentes Independentes (criar primeiro):
├── Separator
├── Skeleton
├── Label
├── Tooltip
├── Switch
│
Componentes com Dependências Simples:
├── Input (depende de Label - opcional)
├── Textarea (depende de Label - opcional)
├── Checkbox (pode usar Label)
│
Componentes Complexos (criar depois):
├── Select (depende de Radix Select)
├── Tabs (depende de Radix Tabs)
├── Dialog (depende de Radix Dialog)
├── Table (estrutura complexa)
├── Toast (depende de Radix Toast + Hook)
└── Toaster (depende de Toast)
```

---

## 3. Especificação Técnica de Cada Componente

### 3.1 Dialog (Modal)

**Arquivo:** `components/ui/dialog.tsx`

#### Props Interface

```typescript
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

// Dialog Root - Controle de estado
interface DialogProps extends DialogPrimitive.DialogProps {
  children: React.ReactNode;
}

// DialogTrigger - Elemento que abre o dialog
interface DialogTriggerProps extends DialogPrimitive.DialogTriggerProps {}

// DialogContent - Conteúdo do modal
interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  children: React.ReactNode;
  className?: string;
}

// DialogHeader - Cabeçalho do dialog
interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

// DialogTitle - Título do dialog
interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  className?: string;
}

// DialogDescription - Descrição do dialog
interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  className?: string;
}

// DialogFooter - Rodapé com ações
interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

// DialogClose - Botão de fechar
interface DialogCloseProps extends DialogPrimitive.DialogCloseProps {}
```

#### Estados

| Estado | Descrição | Implementação |
|--------|-----------|---------------|
| **Closed** | Dialog fechado, não visível | `open={false}` |
| **Open** | Dialog visível com overlay | `open={true}` |
| **Closing** | Animação de saída | Via Radix + CSS |
| **Opening** | Animação de entrada | Via Radix + CSS |

#### Variantes

```typescript
// Sem variantes - estilo único padronizado
// Customização via className
```

#### Dependências

```bash
npm install @radix-ui/react-dialog
```

#### Estilos Tailwind Necessários

```css
/* Overlay */
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0

/* Content */
fixed z-50 grid w-full max-w-lg gap-4 border bg-white p-6 shadow-lg
duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
sm:rounded-lg
```

#### Exemplo de Uso

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Faça alterações no seu perfil aqui. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Form content */}
        </div>
        <DialogFooter>
          <Button type="submit">Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

### 3.2 Table

**Arquivo:** `components/ui/table.tsx`

#### Props Interface

```typescript
import * as React from "react";

// Table - Container principal
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  className?: string;
}

// TableHeader - Cabeçalho da tabela
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
  className?: string;
}

// TableBody - Corpo da tabela
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
  className?: string;
}

// TableFooter - Rodapé da tabela
interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
  className?: string;
}

// TableRow - Linha da tabela
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  className?: string;
  "data-state"?: "selected" | string;
}

// TableHead - Célula de cabeçalho
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
  className?: string;
}

// TableCell - Célula de dados
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
  className?: string;
}

// TableCaption - Legenda da tabela
interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode;
  className?: string;
}
```

#### Estados

| Estado | Descrição | Estilo |
|--------|-----------|--------|
| **Default** | Linha normal | `border-b border-uniq-border` |
| **Hover** | Mouse sobre linha | `hover:bg-uniq-platinum/50` |
| **Selected** | Linha selecionada | `data-[state=selected]:bg-uniq-accent/10` |

#### Variantes

```typescript
// Sem variantes - estilização via sub-componentes
// Opções de uso:
// - Com cabeçalho fixo (opcional, via CSS)
// - Com linhas zebradas (via className em TableRow)
// - Compacta vs Confortável (via padding)
```

#### Dependências

```bash
# Sem dependências Radix - HTML nativo
```

#### Estilos Tailwind Necessários

```css
/* Table */
w-full caption-bottom text-sm

/* TableHeader */
[&_tr]:border-b

/* TableBody */
[&_tr:last-child]:border-0

/* TableFooter */
border-t bg-uniq-platinum/50 font-medium [&_tr]:last:border-b-0

/* TableRow */
border-b border-uniq-border transition-colors
hover:bg-uniq-platinum/50 data-[state=selected]:bg-uniq-accent/10

/* TableHead */
h-12 px-4 text-left align-middle font-medium text-uniq-muted
[&_tr]:first:rounded-tl-lg [&_tr]:last:rounded-tr-lg

/* TableCell */
p-4 align-middle [&_tr]:first:rounded-bl-lg [&_tr]:last:rounded-br-lg

/* TableCaption */
mt-4 text-sm text-uniq-muted
```

#### Exemplo de Uso

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const invoices = [
  { id: "#001", client: "João Silva", amount: "R$ 250,00", status: "Pago" },
  { id: "#002", client: "Maria Santos", amount: "R$ 150,00", status: "Pendente" },
];

export function ExampleTable() {
  return (
    <div className="rounded-xl border border-uniq-border overflow-hidden">
      <Table>
        <TableCaption>Lista de faturas recentes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <Badge variant={invoice.status === "Pago" ? "success" : "warning"}>
                  {invoice.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

---

### 3.3 Toast (Sistema de Notificações)

**Arquivos:**
- `components/ui/toast.tsx` - Componente Toast individual
- `hooks/use-toast.ts` - Hook para controle
- `components/ui/toaster.tsx` - Container de toasts

#### Props Interface - Toast

```typescript
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

// Toast Provider - Provider do Radix
const ToastProvider = ToastPrimitives.Provider;

// Toast Viewport - Container onde os toasts aparecem
interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {
  className?: string;
}

// Toast - Notificação individual
interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  className?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
}

// Toast Action - Ação no toast (botão)
interface ToastActionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> {
  className?: string;
  altText: string;
}

// Toast Close - Botão fechar
interface ToastCloseProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> {
  className?: string;
}

// Toast Title - Título
interface ToastTitleProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> {
  className?: string;
}

// Toast Description - Descrição
interface ToastDescriptionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> {
  className?: string;
}
```

#### Props Interface - Hook useToast

```typescript
// Tipo para nova notificação
interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number; // ms, default: 5000
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Hook retorna
interface UseToastReturn {
  toast: (options: ToastOptions) => void;
  dismiss: (toastId?: string) => void;
  toasts: ToastItem[];
}

interface ToastItem extends ToastOptions {
  id: string;
  open: boolean;
}
```

#### Estados

| Estado | Descrição | Implementação |
|--------|-----------|---------------|
| **Visible** | Toast aparecendo/visível | `open={true}` |
| **Hiding** | Toast sendo fechado | `open={false}` + animação |
| **Stacked** | Múltiplos toasts empilhados | Array de toasts |

#### Variantes

```typescript
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-6 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border-uniq-border bg-white text-uniq-text",
        success: "border-green-200 bg-green-50 text-green-900",
        error: "border-red-200 bg-red-50 text-red-900",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
        info: "border-blue-200 bg-blue-50 text-blue-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
```

#### Dependências

```bash
npm install @radix-ui/react-toast
```

#### Estilos Tailwind Necessários

```css
/* Toast Viewport */
fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4
sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]

/* Toast */
data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[swipe=end]:animate-out data-[state=closed]:fade-out-80
data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full
data-[state=open]:sm:slide-in-from-bottom-full

/* Toast Action */
inline-flex h-8 shrink-0 items-center justify-center rounded-md border
bg-transparent px-3 text-sm font-medium ring-offset-background
transition-colors hover:bg-secondary focus:outline-none
focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none
disabled:opacity-50 group-[.destructive]:border-muted/40
group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive
group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive

/* Toast Close */
absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity
hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2
group-hover:opacity-100 group-[.destructive]:text-red-300
group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400
group-[.destructive]:focus:ring-offset-red-600
```

#### Exemplo de Uso

```tsx
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function ExampleToast() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Sucesso!",
          description: "Cliente cadastrado com sucesso.",
          variant: "success",
        });
      }}
    >
      Mostrar Toast
    </Button>
  );
}

// No layout principal (app/layout.tsx):
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

---

### 3.4 Skeleton

**Arquivo:** `components/ui/skeleton.tsx`

#### Props Interface

```typescript
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
```

#### Estados

| Estado | Descrição | Estilo |
|--------|-----------|--------|
| **Loading** | Animação ativa | `animate-pulse` |
| **Static** | Sem animação (opcional) | Sem `animate-pulse` |

#### Variantes

```typescript
// Variações por uso (não é variant no CVA, mas padrões recomendados):
// - Texto: h-4 w-[200px]
// - Título: h-6 w-[300px]
// - Avatar: h-10 w-10 rounded-full
// - Card: h-[200px] w-full rounded-lg
// - Circle: h-12 w-12 rounded-full
```

#### Dependências

```bash
# Sem dependências Radix
```

#### Estilos Tailwind Necessários

```css
/* Base */
animate-pulse rounded-md bg-uniq-platinum
```

#### Exemplo de Uso

```tsx
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton de card
export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}

// Skeleton de tabela
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

// Skeleton de perfil
export function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}
```

---

### 3.5 Input

**Arquivo:** `components/ui/input.tsx`

#### Props Interface

```typescript
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}
```

#### Estados

| Estado | Descrição | Estilo |
|--------|-----------|--------|
| **Default** | Estado normal | `border-uniq-border bg-[#f9fafb]` |
| **Focus** | Input focado | `ring-2 ring-uniq-accent border-uniq-accent` |
| **Error** | Estado de erro | `border-red-500 ring-red-200` |
| **Disabled** | Desabilitado | `opacity-50 cursor-not-allowed` |
| **With Icon** | Com ícone | Padding ajustado |

#### Variantes

```typescript
// Variações por tipo de input (não CVA, mas padrões):
// - Text: input padrão
// - Search: com ícone de busca
// - Password: com toggle de visibilidade
// - Number: com controles de incremento
```

#### Dependências

```bash
# Sem dependências Radix
```

#### Estilos Tailwind Necessários

```css
/* Input Base */
flex h-10 w-full rounded-lg border border-uniq-border bg-[#f9fafb] px-3 py-2
text-sm ring-offset-background file:border-0 file:bg-transparent
file:text-sm file:font-medium placeholder:text-uniq-muted
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uniq-accent
focus-visible:ring-offset-2 focus-visible:border-uniq-accent
disabled:cursor-not-allowed disabled:opacity-50

/* Input com Erro */
border-red-500 focus-visible:ring-red-200

/* Input com Ícone (esquerda) */
pl-10

/* Input com Ícone (direita) */
pr-10
```

#### Exemplo de Uso

```tsx
import { Input } from "@/components/ui/input";
import { Search, Mail } from "lucide-react";

// Input básico
<Input placeholder="Digite seu nome" />

// Input com erro
<Input error placeholder="Campo obrigatório" />

// Input de busca
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-uniq-muted" />
  <Input className="pl-10" placeholder="Buscar..." />
</div>

// Input com ícone direito
<div className="relative">
  <Input className="pr-10" placeholder="Email" />
  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-uniq-muted" />
</div>

// Input desabilitado
<Input disabled value="Valor fixo" />

// Input numérico
<Input type="number" placeholder="Quantidade" min={0} />

// Input de data
<Input type="date" />
```

---

### 3.6 Label

**Arquivo:** `components/ui/label.tsx`

#### Props Interface

```typescript
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  error?: boolean;
  children: React.ReactNode;
}
```

#### Estados

| Estado | Descrição | Estilo |
|--------|-----------|--------|
| **Default** | Label normal | `text-uniq-text` |
| **Required** | Campo obrigatório | Asterisco vermelho |
| **Error** | Estado de erro | `text-red-600` |
| **Disabled** | Associado a input disabled | `opacity-70` |

#### Variantes

```typescript
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-uniq-text",
        error: "text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
```

#### Dependências

```bash
npm install @radix-ui/react-label
```

#### Estilos Tailwind Necessários

```css
/* Label Base */
text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70

/* Label com Erro */
text-red-600

/* Asterisco de required */
text-red-500 ml-1
```

#### Exemplo de Uso

```tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Label básico
<Label htmlFor="email">Email</Label>
<Input id="email" placeholder="seu@email.com" />

// Label com required
<div className="space-y-2">
  <Label htmlFor="nome" required>Nome completo</Label>
  <Input id="nome" placeholder="Digite seu nome" />
</div>

// Label com erro
<div className="space-y-2">
  <Label htmlFor="email" error>Email</Label>
  <Input id="email" error placeholder="Email inválido" />
  <p className="text-sm text-red-500">Email é obrigatório</p>
</div>

// Label com Checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Aceito os termos de uso</Label>
</div>
```

---

### 3.7 Select

**Arquivo:** `components/ui/select.tsx`

#### Props Interface

```typescript
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

// Select Root
interface SelectProps extends SelectPrimitive.SelectProps {
  children: React.ReactNode;
}

// Select Group
interface SelectGroupProps extends SelectPrimitive.SelectGroupProps {
  children: React.ReactNode;
}

// Select Value (placeholder/valor selecionado)
interface SelectValueProps extends SelectPrimitive.SelectValueProps {}

// Select Trigger (botão que abre o dropdown)
interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  className?: string;
  children?: React.ReactNode;
}

// Select Content (container das opções)
interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  className?: string;
  children?: React.ReactNode;
  position?: "popper" | "item-aligned";
}

// Select Label (título de grupo)
interface SelectLabelProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {
  className?: string;
}

// Select Item (opção individual)
interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  className?: string;
  children?: React.ReactNode;
}

// Select Separator (divisor)
interface SelectSeparatorProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {
  className?: string;
}
```

#### Estados

| Estado | Descrição | Implementação |
|--------|-----------|---------------|
| **Closed** | Dropdown fechado | Estado default |
| **Open** | Dropdown aberto | `open={true}` |
| **Selected** | Item selecionado | Checkmark visível |
| **Disabled** | Item desabilitado | `disabled` no Item |
| **Focused** | Item com foco | Highlight visual |

#### Variantes

```typescript
// Sem variantes principais - estilização consistente
// Customização via className no Trigger
```

#### Dependências

```bash
npm install @radix-ui/react-select
```

#### Estilos Tailwind Necessários

```css
/* Select Trigger */
flex h-10 w-full items-center justify-between rounded-lg border
border-uniq-border bg-[#f9fafb] px-3 py-2 text-sm ring-offset-background
placeholder:text-uniq-muted focus:outline-none focus:ring-2
focus:ring-uniq-accent focus:ring-offset-2 focus:border-uniq-accent
disabled:cursor-not-allowed disabled:opacity-50 [&_span]:line-clamp-1

/* Select Content */
relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border
bg-white text-uniq-text shadow-md data-[state=open]:animate-in
data-[state=closed]:animate-out data-[state=closed]:fade-out-0
data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2

/* Select Content (popper) */
data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1
data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1

/* Select Viewport */
h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]

/* Select Item */
relative flex w-full cursor-default select-none items-center rounded-sm
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-uniq-platinum
focus:text-uniq-text data-[disabled]:pointer-events-none data-[disabled]:opacity-50

/* Select Item Indicator */
absolute left-2 flex h-3.5 w-3.5 items-center justify-center

/* Select Label */
py-1.5 pl-8 pr-2 text-sm font-semibold

/* Select Separator */
-mx-1 my-1 h-px bg-uniq-border

/* Select ScrollUp/DownButton */
flex cursor-default items-center justify-center py-1
```

#### Exemplo de Uso

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Select básico
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Selecione um módulo" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="crm">CRM</SelectItem>
    <SelectItem value="finance">Financeiro</SelectItem>
    <SelectItem value="stock">Estoque</SelectItem>
  </SelectContent>
</Select>

// Select com grupos
<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Selecione um produto" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Eletrônicos</SelectLabel>
      <SelectItem value="notebook">Notebook</SelectItem>
      <SelectItem value="mouse">Mouse</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Acessórios</SelectLabel>
      <SelectItem value="bag">Mochila</SelectItem>
      <SelectItem value="stand" disabled>Stand (indisponível)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

// Select controlado
const [value, setValue] = React.useState("");

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Opção 1</SelectItem>
    <SelectItem value="option2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

---

### 3.8 Checkbox

**Arquivo:** `components/ui/checkbox.tsx`

#### Props Interface

```typescript
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string;
}
```

#### Estados

| Estado | Descrição | Visual |
|--------|-----------|--------|
| **Unchecked** | Não marcado | Caixa vazia |
| **Checked** | Marcado | Check visível |
| **Indeterminate** | Indeterminado | Traço horizontal |
| **Disabled** | Desabilitado | Opacidade reduzida |
| **Focused** | Com foco | Ring visível |

#### Variantes

```typescript
// Sem variantes - estilo único
// Estados controlados via data-state do Radix
```

#### Dependências

```bash
npm install @radix-ui/react-checkbox
```

#### Estilos Tailwind Necessários

```css
/* Checkbox Root */
peer h-4 w-4 shrink-0 rounded-sm border border-uniq-primary ring-offset-background
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uniq-accent
focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
data-[state=checked]:bg-uniq-primary data-[state=checked]:text-white
data-[state=indeterminate]:bg-uniq-primary data-[state=indeterminate]:text-white

/* Checkbox Indicator */
flex items-center justify-center text-current
```

#### Exemplo de Uso

```tsx
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Checkbox básico
<Checkbox />

// Checkbox com label
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Aceito os termos de uso</Label>
</div>

// Checkbox controlado
const [checked, setChecked] = React.useState(false);

<Checkbox checked={checked} onCheckedChange={setChecked} />

// Checkbox indeterminado (para grupos)
const [checked, setChecked] = React.useState("indeterminate");

<Checkbox
  checked={checked}
  onCheckedChange={setChecked}
/>

// Checkbox desabilitado
<Checkbox disabled />
<Checkbox checked disabled />

// Checkbox com descrição
<div className="items-top flex space-x-2">
  <Checkbox id="newsletter" />
  <div className="grid gap-1.5 leading-none">
    <Label htmlFor="newsletter">Receber newsletter</Label>
    <p className="text-sm text-uniq-muted">
      Você pode cancelar a qualquer momento.
    </p>
  </div>
</div>
```

---

### 3.9 Textarea

**Arquivo:** `components/ui/textarea.tsx`

#### Props Interface

```typescript
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
```

#### Estados

| Estado | Descrição | Estilo |
|--------|-----------|--------|
| **Default** | Estado normal | `border-uniq-border bg-[#f9fafb]` |
| **Focus** | Focado | `ring-2 ring-uniq-accent border-uniq-accent` |
| **Error** | Estado de erro | `border-red-500 ring-red-200` |
| **Disabled** | Desabilitado | `opacity-50 cursor-not-allowed` |

#### Variantes

```typescript
// Sem variantes principais
// Redimensionamento controlado via resize-none, resize-y, etc.
```

#### Dependências

```bash
# Sem dependências Radix
```

#### Estilos Tailwind Necessários

```css
/* Textarea Base */
flex min-h-[80px] w-full rounded-lg border border-uniq-border bg-[#f9fafb]
px-3 py-2 text-sm ring-offset-background placeholder:text-uniq-muted
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uniq-accent
focus-visible:ring-offset-2 focus-visible:border-uniq-accent
disabled:cursor-not-allowed disabled:opacity-50

/* Textarea com Erro */
border-red-500 focus-visible:ring-red-200
```

#### Exemplo de Uso

```tsx
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Textarea básico
<Textarea placeholder="Digite sua mensagem..." />

// Textarea com label
<div className="space-y-2">
  <Label htmlFor="description">Descrição</Label>
  <Textarea
    id="description"
    placeholder="Descreva o produto..."
    className="min-h-[120px]"
  />
</div>

// Textarea com erro
<div className="space-y-2">
  <Label htmlFor="observation" error>Observação</Label>
  <Textarea id="observation" error placeholder="Obrigatório" />
  <p className="text-sm text-red-500">Este campo é obrigatório</p>
</div>

// Textarea desabilitado
<Textarea disabled placeholder="Campo desabilitado" />

// Textarea sem redimensionamento
<Textarea className="resize-none" placeholder="Sem resize..." />

// Textarea com limitação de caracteres
const [value, setValue] = React.useState("");
const maxLength = 500;

<div className="space-y-2">
  <Textarea
    value={value}
    onChange={(e) => setValue(e.target.value)}
    maxLength={maxLength}
    placeholder="Máximo 500 caracteres..."
    className="min-h-[100px]"
  />
  <p className="text-sm text-uniq-muted text-right">
    {value.length}/{maxLength}
  </p>
</div>
```

---

### 3.10 Tabs

**Arquivo:** `components/ui/tabs.tsx`

#### Props Interface

```typescript
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

// Tabs Root
interface TabsProps extends TabsPrimitive.TabsProps {
  children: React.ReactNode;
  className?: string;
}

// Tabs List - Container das abas
interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  className?: string;
  children: React.ReactNode;
}

// Tabs Trigger - Botão de aba individual
interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  className?: string;
  children: React.ReactNode;
}

// Tabs Content - Conteúdo da aba
interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  className?: string;
  children: React.ReactNode;
}
```

#### Estados

| Estado | Descrição | Estilo |
|--------|-----------|--------|
| **Inactive** | Aba não selecionada | `text-uniq-muted hover:text-uniq-text` |
| **Active** | Aba selecionada | `bg-white text-uniq-text shadow-sm` |
| **Disabled** | Aba desabilitada | `disabled:opacity-50` |
| **Focused** | Com foco | `focus-visible:ring-2` |

#### Variantes

```typescript
// Variações de orientação e estilo:
// - Horizontal (default): Tabs lado a lado
// - Vertical: Tabs uma abaixo da outra (com flex-col)
// - Pills: Aba ativa com fundo colorido
// - Underline: Aba ativa com underline
```

#### Dependências

```bash
npm install @radix-ui/react-tabs
```

#### Estilos Tailwind Necessários

```css
/* Tabs List */
inline-flex h-10 items-center justify-center rounded-lg bg-uniq-platinum p-1
text-uniq-muted

/* Tabs Trigger */
inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5
text-sm font-medium ring-offset-background transition-all
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uniq-accent
focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
data-[state=active]:bg-white data-[state=active]:text-uniq-text
data-[state=active]:shadow-sm

/* Tabs Content */
mt-2 ring-offset-background focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-uniq-accent focus-visible:ring-offset-2
```

#### Exemplo de Uso

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Tabs básico
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Conta</TabsTrigger>
    <TabsTrigger value="password">Senha</TabsTrigger>
    <TabsTrigger value="settings">Configurações</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>Conta</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Configurações da conta...</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    <Card>
      <CardHeader>
        <CardTitle>Senha</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Alterar senha...</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>

// Tabs controlado
const [activeTab, setActiveTab] = React.useState("overview");

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Relatórios</TabsTrigger>
  </TabsList>
  {/* TabsContent... */}
</Tabs>

// Tabs com ícones
<Tabs defaultValue="list">
  <TabsList>
    <TabsTrigger value="list" className="flex items-center gap-2">
      <List className="h-4 w-4" />
      Lista
    </TabsTrigger>
    <TabsTrigger value="grid" className="flex items-center gap-2">
      <Grid className="h-4 w-4" />
      Grade
    </TabsTrigger>
  </TabsList>
</Tabs>
```

---

### 3.11 Tooltip

**Arquivo:** `components/ui/tooltip.tsx`

#### Props Interface

```typescript
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Tooltip Provider - Provider do Radix
const TooltipProvider = TooltipPrimitive.Provider;

// Tooltip Root
interface TooltipProps extends TooltipPrimitive.TooltipProps {
  children: React.ReactNode;
}

// Tooltip Trigger - Elemento que ativa o tooltip
interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {
  children: React.ReactNode;
  asChild?: boolean;
}

// Tooltip Content - Conteúdo do tooltip
interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  className?: string;
  children?: React.ReactNode;
  sideOffset?: number;
}
```

#### Estados

| Estado | Descrição | Implementação |
|--------|-----------|---------------|
| **Closed** | Tooltip não visível | Estado default |
| **Open** | Tooltip visível | Hover ou focus no trigger |
| **Delayed Open** | Tooltip com delay | Via delayDuration no Provider |

#### Variantes

```typescript
// Sem variantes principais
// Posicionamento via side (top, bottom, left, right)
// e align (start, center, end)
```

#### Dependências

```bash
npm install @radix-ui/react-tooltip
```

#### Estilos Tailwind Necessários

```css
/* Tooltip Content */
z-50 overflow-hidden rounded-lg border bg-uniq-sidebar px-3 py-1.5 text-sm
text-white shadow-md animate-in fade-in-0 zoom-in-95
data-[state=closed]:animate-out data-[state=closed]:fade-out-0
data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2
```

#### Exemplo de Uso

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

// Tooltip básico
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Excluir item</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Tooltip com delay customizado
<TooltipProvider delayDuration={100}>
  <Tooltip>
    <TooltipTrigger>Hover aqui</TooltipTrigger>
    <TooltipContent>
      <p>Aparece mais rápido!</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Tooltip com posicionamento
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">
    <p>Aparece abaixo</p>
  </TooltipContent>
</Tooltip>

// Tooltip em ícone de informação
<Tooltip>
  <TooltipTrigger asChild>
    <Info className="h-4 w-4 text-uniq-muted cursor-help" />
  </TooltipTrigger>
  <TooltipContent className="max-w-xs">
    <p>Esta informação ajuda a entender melhor o contexto do campo.</p>
  </TooltipContent>
</Tooltip>
```

---

### 3.12 Switch

**Arquivo:** `components/ui/switch.tsx`

#### Props Interface

```typescript
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  className?: string;
}
```

#### Estados

| Estado | Descrição | Visual |
|--------|-----------|--------|
| **Unchecked** | Desligado | Fundo cinza, thumb à esquerda |
| **Checked** | Ligado | Fundo verde, thumb à direita |
| **Disabled** | Desabilitado | Opacidade reduzida |
| **Focused** | Com foco | Ring visível |

#### Variantes

```typescript
// Sem variantes - estilo único
// Cores fixas baseadas nos Design Tokens
```

#### Dependências

```bash
npm install @radix-ui/react-switch
```

#### Estilos Tailwind Necessários

```css
/* Switch Root */
peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full
border-2 border-transparent transition-colors focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-uniq-accent focus-visible:ring-offset-2
disabled:cursor-not-allowed disabled:opacity-50
data-[state=checked]:bg-uniq-accent data-[state=unchecked]:bg-uniq-border

/* Switch Thumb */
pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0
transition-transform data-[state=checked]:translate-x-5
data-[state=unchecked]:translate-x-0
```

#### Exemplo de Uso

```tsx
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Switch básico
<Switch />

// Switch com label
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Modo avião</Label>
</div>

// Switch controlado
const [checked, setChecked] = React.useState(false);

<Switch checked={checked} onCheckedChange={setChecked} />

// Switch desabilitado
<Switch disabled />
<Switch checked disabled />

// Switch com label e descrição
<div className="rounded-lg border p-4 space-y-3">
  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      <Label htmlFor="notifications">Notificações</Label>
      <p className="text-sm text-uniq-muted">Receber notificações por email</p>
    </div>
    <Switch id="notifications" />
  </div>
</div>
```

---

### 3.13 Separator

**Arquivo:** `components/ui/separator.tsx`

#### Props Interface

```typescript
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  className?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}
```

#### Estados

| Estado | Descrição | Estilo |
|--------|-----------|--------|
| **Horizontal** | Divisor horizontal | `h-[1px] w-full` |
| **Vertical** | Divisor vertical | `h-full w-[1px]` |

#### Variantes

```typescript
// Sem variantes - apenas orientação
// Padrão: horizontal
```

#### Dependências

```bash
npm install @radix-ui/react-separator
```

#### Estilos Tailwind Necessários

```css
/* Separator */
shrink-0 bg-uniq-border

/* Horizontal (default) */
h-[1px] w-full

/* Vertical */
h-full w-[1px]
```

#### Exemplo de Uso

```tsx
import { Separator } from "@/components/ui/separator";

// Horizontal (padrão)
<div className="space-y-1">
  <h4 className="text-sm font-medium">Seção A</h4>
  <p className="text-sm text-uniq-muted">Conteúdo da seção A</p>
  <Separator className="my-4" />
  <h4 className="text-sm font-medium">Seção B</h4>
  <p className="text-sm text-uniq-muted">Conteúdo da seção B</p>
</div>

// Vertical
<div className="flex h-5 items-center space-x-4 text-sm">
  <div>Item 1</div>
  <Separator orientation="vertical" />
  <div>Item 2</div>
  <Separator orientation="vertical" />
  <div>Item 3</div>
</div>

// Com label (padrão comum)
<div className="relative">
  <div className="absolute inset-0 flex items-center">
    <Separator className="w-full" />
  </div>
  <div className="relative flex justify-center text-xs uppercase">
    <span className="bg-uniq-platinum px-2 text-uniq-muted">Ou</span>
  </div>
</div>
```

---

## 4. Estratégia de Implementação

### 4.1 Ordem de Criação (Prioridade)

#### Fase 1: Componentes Base (Dia 1 - Manhã)

| Ordem | Componente | Tempo Est. | Justificativa |
|-------|------------|------------|---------------|
| 1 | **Separator** | 15 min | Simples, sem dependências |
| 2 | **Skeleton** | 15 min | Simples, usado em loading |
| 3 | **Label** | 20 min | Radix Label, usado em forms |
| 4 | **Input** | 30 min | Base para forms |
| 5 | **Textarea** | 20 min | Similar ao Input |

**Total Fase 1:** ~1h 40min

#### Fase 2: Componentes de Formulário (Dia 1 - Tarde)

| Ordem | Componente | Tempo Est. | Justificativa |
|-------|------------|------------|---------------|
| 6 | **Checkbox** | 30 min | Radix Checkbox |
| 7 | **Select** | 45 min | Radix Select, complexo |
| 8 | **Switch** | 20 min | Radix Switch |
| 9 | **Tooltip** | 20 min | Radix Tooltip |

**Total Fase 2:** ~1h 55min

#### Fase 3: Componentes Complexos (Dia 2)

| Ordem | Componente | Tempo Est. | Justificativa |
|-------|------------|------------|---------------|
| 10 | **Dialog** | 45 min | Radix Dialog, complexo |
| 11 | **Table** | 40 min | HTML + estilização |
| 12 | **Tabs** | 30 min | Radix Tabs |

**Total Fase 3:** ~1h 55min

#### Fase 4: Sistema Toast (Dia 2 - Tarde)

| Ordem | Componente | Tempo Est. | Justificativa |
|-------|------------|------------|---------------|
| 13 | **Toast** | 40 min | Radix Toast + CVA |
| 14 | **useToast Hook** | 30 min | Hook customizado |
| 15 | **Toaster** | 20 min | Container de toasts |

**Total Fase 4:** ~1h 30min

### 4.2 Agrupamento Lógico

```
📦 Grupo 1: Layout Elements (Simples)
   ├── Separator
   └── Skeleton

📦 Grupo 2: Form Controls Básicos
   ├── Label
   ├── Input
   └── Textarea

📦 Grupo 3: Form Controls Avançados
   ├── Checkbox
   ├── Select
   └── Switch

📦 Grupo 4: Overlay & Feedback
   ├── Tooltip
   ├── Dialog
   └── Toast + Toaster

📦 Grupo 5: Data Display
   ├── Table
   └── Tabs
```

### 4.3 Justificativa da Ordem

1. **Componentes sem dependências primeiro:** Separator, Skeleton (permite uso imediato)
2. **Form controls básicos:** Label, Input, Textarea (base para formulários)
3. **Form controls avançados:** Checkbox, Select, Switch (complementam forms)
4. **Overlay:** Tooltip, Dialog (dependem menos, usados em muitos lugares)
5. **Feedback:** Toast (sistema completo, mais complexo)
6. **Data display:** Table, Tabs (estruturas maiores)

---

## 5. Padrões de Código

### 5.1 Nomenclatura de Arquivos

```
✅ CORRETO:
- components/ui/button.tsx
- components/ui/dropdown-menu.tsx
- hooks/use-toast.ts
- lib/utils.ts

❌ INCORRETO:
- components/ui/Button.tsx          (maiúsculo)
- components/ui/dropdownMenu.tsx    (camelCase)
- hooks/useToast.ts                 (camelCase)
- lib/Utils.ts                      (maiúsculo)
```

**Regras:**
- Componentes: `kebab-case.tsx`
- Hooks: `use-kebab-case.ts`
- Utilitários: `kebab-case.ts`
- Mocks: `kebab-case.ts`

### 5.2 Nomenclatura de Componentes

```typescript
// ✅ CORRETO: PascalCase para componentes
export function Button() { }
export const Dialog = React.forwardRef<...>
export function Input() { }

// ❌ INCORRETO: camelCase
export function myComponent() { }
export const button = () => { }

// ✅ CORRETO: Sub-componentes compostos
DialogContent
DialogHeader
DialogTitle

// ❌ INCORRETO
Dialog_Content
Dialog_Content_Component
```

### 5.3 Organização de Imports

```typescript
// 1. React e bibliotecas externas
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

// 2. Ícones
import { X } from "lucide-react";

// 3. Utilitários internos
import { cn } from "@/lib/utils";

// 4. Componentes internos (se houver)
import { Button } from "@/components/ui/button";
```

### 5.4 Padrão de Exportação

```typescript
// ✅ CORRETO: Named exports
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // ...
);
Button.displayName = "Button";

export { Button, buttonVariants };

// Para múltiplos sub-componentes
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

### 5.5 Estrutura Interna do Componente

```typescript
// 1. Imports
import * as React from "react";
// ...

// 2. Definição de variantes (se usar CVA)
const componentVariants = cva(
  "base-styles",
  {
    variants: {
      variant: { /* ... */ },
      size: { /* ... */ },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 3. Definição da interface de props
export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // props adicionais
}

// 4. Implementação do componente
const Component = React.forwardRef<Element, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Element
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Component.displayName = "Component";

// 5. Exportações
export { Component, componentVariants };
```

---

## 6. Estratégia de Testes Visuais

### 6.1 Página de Showcase

**Arquivo:** `app/showcase/page.tsx`

```typescript
// Estrutura da página de testes
export default function ShowcasePage() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <h1 className="text-3xl font-bold">UNIQ Design System - Showcase</h1>
      
      {/* Seção por categoria */}
      <ShowcaseSection title="Buttons">
        {/* Todas as variantes de Button */}
      </ShowcaseSection>
      
      <ShowcaseSection title="Forms">
        {/* Input, Textarea, Select, Checkbox, etc. */}
      </ShowcaseSection>
      
      <ShowcaseSection title="Feedback">
        {/* Toast, Skeleton */}
      </ShowcaseSection>
      
      {/* ... mais seções */}
    </div>
  );
}
```

### 6.2 Casos de Teste por Componente

#### Button
- [ ] Variante default
- [ ] Variante destructive
- [ ] Variante outline
- [ ] Variante secondary
- [ ] Variante ghost
- [ ] Variante link
- [ ] Tamanho default
- [ ] Tamanho sm
- [ ] Tamanho lg
- [ ] Tamanho icon
- [ ] Estado hover
- [ ] Estado focus
- [ ] Estado disabled
- [ ] Estado active/pressed
- [ ] Com ícone + texto
- [ ] Ícone apenas

#### Input
- [ ] Estado default
- [ ] Estado focus
- [ ] Estado error
- [ ] Estado disabled
- [ ] Com ícone esquerdo
- [ ] Com ícone direito
- [ ] Com label
- [ ] Placeholder
- [ ] Valor preenchido
- [ ] Type password
- [ ] Type number
- [ ] Type date

#### Dialog
- [ ] Abertura/fechamento
- [ ] Overlay visível
- [ ] Animação de entrada
- [ ] Animação de saída
- [ ] Fechar com ESC
- [ ] Fechar click fora
- [ ] Tamanhos diferentes (sm, md, lg)
- [ ] Com header
- [ ] Com footer
- [ ] Com formulário

#### Toast
- [ ] Variante default
- [ ] Variante success
- [ ] Variante error
- [ ] Variante warning
- [ ] Com título apenas
- [ ] Com descrição apenas
- [ ] Com título + descrição
- [ ] Com action button
- [ ] Auto-dismiss
- [ ] Múltiplos toasts
- [ ] Swipe para fechar

#### Table
- [ ] Cabeçalho estilizado
- [ ] Linhas alternadas (zebra)
- [ ] Hover nas linhas
- [ ] Linha selecionada
- [ ] Célula com Badge
- [ ] Célula com Button
- [ ] Scroll horizontal
- [ ] Estado empty
- [ ] Com caption
- [ ] Com footer

#### Select
- [ ] Estado closed
- [ ] Estado open
- [ ] Placeholder
- [ ] Valor selecionado
- [ ] Grupos de opções
- [ ] Separador entre grupos
- [ ] Opção disabled
- [ ] Scroll interno
- [ ] Posicionamento (top/bottom)

#### Checkbox
- [ ] Unchecked
- [ ] Checked
- [ ] Indeterminate
- [ ] Disabled unchecked
- [ ] Disabled checked
- [ ] Com label
- [ ] Focus state

#### Tabs
- [ ] Tab ativa
- [ ] Tab inativa
- [ ] Tab disabled
- [ ] Troca de conteúdo
- [ ] Focus state
- [ ] Com ícones

### 6.3 Checklist de Validação Visual

#### Cores
- [ ] Todos os componentes usam as cores UNIQ
- [ ] Estados de erro usam vermelho correto
- [ ] Estados de sucesso usam verde correto
- [ ] Cores de texto têm contraste adequado

#### Tipografia
- [ ] Fonte Poppins aplicada em todos os componentes
- [ ] Tamanhos de texto consistentes
- [ ] Pesos de fonte adequados

#### Espaçamento
- [ ] Padding interno consistente
- [ ] Margens entre elementos
- [ ] Alinhamento correto

#### Estados Interativos
- [ ] Hover visível em todos os elementos clicáveis
- [ ] Focus ring visível e consistente
- [ ] Disabled com opacidade reduzida
- [ ] Active/pressed state

#### Responsividade
- [ ] Testar em 320px (mobile pequeno)
- [ ] Testar em 768px (tablet)
- [ ] Testar em 1440px (desktop)

---

## 7. Dependências Exatas

### 7.1 Dependências a Instalar

```bash
# Radix UI Primitives
npm install @radix-ui/react-dialog@^1.0.5
npm install @radix-ui/react-select@^2.0.0
npm install @radix-ui/react-toast@^1.1.5
npm install @radix-ui/react-checkbox@^1.0.4
npm install @radix-ui/react-label@^2.0.2
npm install @radix-ui/react-tabs@^1.0.4
npm install @radix-ui/react-tooltip@^1.0.7
npm install @radix-ui/react-switch@^1.0.3
npm install @radix-ui/react-separator@^1.0.3
```

### 7.2 Instalação em Lote

```bash
npm install @radix-ui/react-dialog@^1.0.5 \
  @radix-ui/react-select@^2.0.0 \
  @radix-ui/react-toast@^1.1.5 \
  @radix-ui/react-checkbox@^1.0.4 \
  @radix-ui/react-label@^2.0.2 \
  @radix-ui/react-tabs@^1.0.4 \
  @radix-ui/react-tooltip@^1.0.7 \
  @radix-ui/react-switch@^1.0.3 \
  @radix-ui/react-separator@^1.0.3
```

### 7.3 Verificação de Instalação

```bash
# Verificar se todos foram instalados
npm list | grep @radix-ui/react-

# Deve mostrar:
# @radix-ui/react-dialog@1.0.5
# @radix-ui/react-select@2.0.0
# @radix-ui/react-toast@1.1.5
# ... etc
```

### 7.4 Dependências Indiretas (Já Instaladas)

```json
{
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.3.0",
  "tailwindcss-animate": "^1.0.7",
  "lucide-react": "^0.400.0"
}
```

---

## 8. Checklist de Implementação Detalhado

### 8.1 Checklist por Componente

#### Separator
- [ ] Criar arquivo `components/ui/separator.tsx`
- [ ] Implementar com Radix Separator
- [ ] Estilos horizontal e vertical
- [ ] Testar visualmente

#### Skeleton
- [ ] Criar arquivo `components/ui/skeleton.tsx`
- [ ] Implementar div com animate-pulse
- [ ] Aceitar className customizado
- [ ] Criar variações: Card, Text, Avatar, Table

#### Label
- [ ] Instalar `@radix-ui/react-label`
- [ ] Criar arquivo `components/ui/label.tsx`
- [ ] Implementar com CVA para variants
- [ ] Suportar prop `required`
- [ ] Suportar prop `error`
- [ ] Integração com Checkbox

#### Input
- [ ] Criar arquivo `components/ui/input.tsx`
- [ ] Extender HTMLInputElement
- [ ] Estados: default, focus, error, disabled
- [ ] Suporte a ícone (via wrapper externo)
- [ ] Integração com Label

#### Textarea
- [ ] Criar arquivo `components/ui/textarea.tsx`
- [ ] Extender HTMLTextAreaElement
- [ ] Estados: default, focus, error, disabled
- [ ] min-h padrão de 80px
- [ ] Integração com Label

#### Checkbox
- [ ] Instalar `@radix-ui/react-checkbox`
- [ ] Criar arquivo `components/ui/checkbox.tsx`
- [ ] Estados: unchecked, checked, indeterminate
- [ ] Ícone Check do Lucide
- [ ] Estado disabled
- [ ] Integração com Label

#### Select
- [ ] Instalar `@radix-ui/react-select`
- [ ] Criar arquivo `components/ui/select.tsx`
- [ ] Sub-componentes: Trigger, Content, Item, Label, Separator
- [ ] Ícones: Check, ChevronDown, ChevronUp
- [ ] Estados: closed, open, selected, disabled
- [ ] Animações de entrada/saída
- [ ] Scroll para listas longas

#### Switch
- [ ] Instalar `@radix-ui/react-switch`
- [ ] Criar arquivo `components/ui/switch.tsx`
- [ ] Estados: unchecked, checked, disabled
- [ ] Animação de transição
- [ ] Cores UNIQ (accent para checked)
- [ ] Integração com Label

#### Tooltip
- [ ] Instalar `@radix-ui/react-tooltip`
- [ ] Criar arquivo `components/ui/tooltip.tsx`
- [ ] Provider, Root, Trigger, Content
- [ ] Estilos escuros (bg-uniq-sidebar)
- [ ] Animações
- [ ] Posicionamento flexível

#### Dialog
- [ ] Instalar `@radix-ui/react-dialog`
- [ ] Criar arquivo `components/ui/dialog.tsx`
- [ ] Sub-componentes: Trigger, Content, Header, Footer, Title, Description, Close
- [ ] Overlay com backdrop-blur
- [ ] Animações de entrada/saída
- [ ] Ícone X para fechar
- [ ] Acessibilidade (ESC, focus trap)

#### Table
- [ ] Criar arquivo `components/ui/table.tsx`
- [ ] Sub-componentes: Header, Body, Footer, Row, Head, Cell, Caption
- [ ] Estilos de cabeçalho
- [ ] Hover nas linhas
- [ ] Responsividade (scroll)
- [ ] Integração com Badge

#### Tabs
- [ ] Instalar `@radix-ui/react-tabs`
- [ ] Criar arquivo `components/ui/tabs.tsx`
- [ ] Sub-componentes: List, Trigger, Content
- [ ] Estilos: List (bg-platinum), Trigger (estado ativo/inativo)
- [ ] Animação de transição
- [ ] Integração com Card

#### Toast
- [ ] Instalar `@radix-ui/react-toast`
- [ ] Criar arquivo `components/ui/toast.tsx`
- [ ] Variantes: default, success, error, warning, info
- [ ] Provider, Viewport, Root, Title, Description, Action, Close
- [ ] Animações de entrada/saída
- [ ] Swipe para fechar
- [ ] Auto-dismiss

#### useToast Hook
- [ ] Criar arquivo `hooks/use-toast.ts`
- [ ] Estado global de toasts
- [ ] Função toast()
- [ ] Função dismiss()
- [ ] Limite máximo de toasts (5)

#### Toaster
- [ ] Criar arquivo `components/ui/toaster.tsx`
- [ ] Usar useToast hook
- [ ] Renderizar lista de toasts
- [ ] Posicionamento fixo
- [ ] Adicionar ao layout principal

### 8.2 Checklist de Validação

- [ ] Todos os 14 componentes criados
- [ ] Sem erros de TypeScript
- [ ] Sem warnings no console
- [ ] Todos os imports funcionando
- [ ] Estilos aplicados corretamente
- [ ] Estados interativos funcionando
- [ ] Responsividade testada
- [ ] Acessibilidade básica (focus, ARIA)

### 8.3 Checklist de Integração

- [ ] Toaster adicionado ao layout.tsx
- [ ] Fonte Poppins carregando corretamente
- [ ] Tailwind config sem erros
- [ ] Variáveis CSS funcionando
- [ ] Componentes exportados corretamente
- [ ] Página de showcase criada
- [ ] Documentação atualizada

---

## 9. Exemplos de Código

### 9.1 Template Base de Componente shadcn/ui

```typescript
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ============================================
// 1. DEFINIÇÃO DE VARIANTES (se necessário)
// ============================================
const exampleVariants = cva(
  // Estilos base
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-uniq-primary text-white hover:bg-uniq-hover",
        secondary: "bg-uniq-platinum text-uniq-text hover:bg-uniq-border",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ============================================
// 2. INTERFACE DE PROPS
// ============================================
export interface ExampleProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof exampleVariants> {
  // Props adicionais específicas
  asChild?: boolean;
}

// ============================================
// 3. IMPLEMENTAÇÃO DO COMPONENTE
// ============================================
const Example = React.forwardRef<HTMLElement, ExampleProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Lógica do componente
    const Comp = asChild ? React.Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(exampleVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

// ============================================
// 4. DISPLAY NAME (para debugging)
// ============================================
Example.displayName = "Example";

// ============================================
// 5. EXPORTAÇÕES
// ============================================
export { Example, exampleVariants };
```

### 9.2 Exemplo Completo - Dialog

```typescript
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-uniq-border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-uniq-accent focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-uniq-accent data-[state=open]:text-white">
        <X className="h-4 w-4" />
        <span className="sr-only">Fechar</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-uniq-text",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-uniq-muted", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

### 9.3 Exemplo Completo - Select

```typescript
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-lg border border-uniq-border bg-[#f9fafb] px-3 py-2 text-sm ring-offset-background placeholder:text-uniq-muted focus:outline-none focus:ring-2 focus:ring-uniq-accent focus:ring-offset-2 focus:border-uniq-accent disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border bg-white text-uniq-text shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-uniq-platinum focus:text-uniq-text data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-uniq-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
```

### 9.4 Exemplo Completo - Toast

```typescript
"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-uniq-border bg-white text-uniq-text",
        success:
          "border-green-200 bg-green-50 text-green-900",
        error:
          "border-red-200 bg-red-50 text-red-900",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-900",
        info: "border-blue-200 bg-blue-50 text-blue-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
```

---

## 10. Considerações Técnicas

### 10.1 Performance

#### Memoization

```typescript
// Usar React.memo para componentes que recebem props complexas
export const Button = React.memo(React.forwardRef<...>(
  // ...
));

// Use useMemo para cálculos custosos
const processedData = React.useMemo(() => {
  return data.map(item => expensiveOperation(item));
}, [data]);

// Use useCallback para funções passadas como props
const handleClick = React.useCallback(() => {
  onClick(id);
}, [onClick, id]);
```

#### Lazy Loading (se necessário)

```typescript
// Componentes pesados podem ser lazy loaded
const Dialog = React.lazy(() => import('@/components/ui/dialog'));

// Uso com Suspense
<Suspense fallback={<Skeleton className="h-20" />}>
  <Dialog />
</Suspense>
```

### 10.2 Acessibilidade

#### ARIA Labels

```typescript
// Sempre incluir aria-label quando não houver texto visível
<Button aria-label="Fechar modal">
  <X className="h-4 w-4" />
</Button>

// Usar aria-describedby para descrições
<Input
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
<span id="email-error" role="alert">
  {errorMessage}
</span>

// Usar aria-expanded para elementos colapsáveis
<Button aria-expanded={isOpen}>
  {isOpen ? 'Fechar' : 'Abrir'}
</Button>
```

#### Keyboard Navigation

```typescript
// Tab order lógico
// Focus trap em modais (Radix já faz isso)
// ESC para fechar modais e dropdowns (Radix já faz isso)
// Arrow keys em Select e menus (Radix já faz isso)

// Para componentes customizados:
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      onClose();
      break;
    case 'Enter':
    case ' ':
      onSelect();
      break;
  }
};
```

### 10.3 Responsividade

#### Mobile-First

```typescript
// Sempre mobile-first
// Componente base = mobile
// Adicionar breakpoints para telas maiores

<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Mobile: 100%, Tablet: 50%, Desktop: 33% */}
</div>
```

#### Touch Targets

```typescript
// Mínimo 44x44px para elementos touch
<button className="min-h-[44px] min-w-[44px]">
  {/* ... */}
</button>

// Inputs com padding adequado
<input className="h-10 px-3" />
```

### 10.4 SSR Compatibility (Next.js 14)

#### "use client" Directive

```typescript
// Todos os componentes interativos precisam de "use client"
"use client";

import * as React from "react";
// ...

// Componentes que NÃO precisam (Server Components):
// - Skeleton (apenas HTML)
// - Separator (apenas HTML)
// - Table (apenas HTML)

// Componentes que PRECISAM:
// - Button (event handlers)
// - Dialog (Radix primitives)
// - Select (Radix primitives)
// - Toast (Radix primitives)
// - etc.
```

#### Hydration Considerations

```typescript
// Evitar mismatch entre server e client
// Solução 1: useEffect para renderização client-only
const [mounted, setMounted] = React.useState(false);

React.useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <Skeleton />;
}

// Solução 2: Suppress hydration warning
<div suppressHydrationWarning>
  {/* conteúdo dinâmico */}
</div>
```

### 10.5 Compatibilidade com shadcn/ui CLI

```bash
# Se necessário adicionar componentes via CLI no futuro:
npx shadcn add dialog

# Nossa implementação deve ser compatível com:
# - Estrutura de arquivos
# - Padrões de nomenclatura
# - Uso do cn() utilitário
# - class-variance-authority para variantes
```

---

## 11. Resumo da Implementação

### 11.1 Prioridades

```
🔴 CRÍTICO (Must Have):
├── Input, Label, Select
├── Dialog, Table
├── Toast, Skeleton
└── Checkbox, Textarea

🟡 IMPORTANTE (Should Have):
├── Tabs
└── Tooltip

🟢 OPCIONAL (Could Have):
├── Switch
└── Separator
```

### 11.2 Estimativa de Tempo Total

| Fase | Componentes | Tempo Estimado |
|------|-------------|----------------|
| Fase 1 | Separator, Skeleton, Label, Input, Textarea | 2h |
| Fase 2 | Checkbox, Select, Switch, Tooltip | 2h |
| Fase 3 | Dialog, Table, Tabs | 2h |
| Fase 4 | Toast, useToast, Toaster | 1.5h |
| Testes | Showcase, validação, documentação | 2h |
| **TOTAL** | | **~9.5h** |

### 11.3 Próximos Passos

1. **FASE 03: Implementation** (@vibe-implementer)
   - Seguir esta SPEC rigorosamente
   - Implementar componentes na ordem definida
   - Testar cada componente na página showcase
   - Documentar qualquer desvio necessário

2. **Handoff Checklist:**
   - [ ] Todos os arquivos criados
   - [ ] Sem erros TypeScript
   - [ ] Página showcase funcional
   - [ ] Documentação atualizada
   - [ ] TRACKING.md atualizado

---

## 12. Referências

### Documentação Oficial
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [class-variance-authority](https://cva.style/docs)

### Inspiração de Implementação
- [shadcn/ui GitHub](https://github.com/shadcn-ui/ui)
- [Radix UI Examples](https://www.radix-ui.com/primitives/docs/overview/introduction)

### Ferramentas de Teste
- [WAVE Accessibility](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse)

---

**Documento Finalizado em:** 19/03/2026  
**Status:** ✅ Pronto para Implementação (FASE 03)  
**Próxima Etapa:** @vibe-implementer - Implementação dos componentes  

---

> ⚠️ **IMPORTANTE:** Esta SPEC deve ser seguida rigorosamente durante a implementação. Qualquer mudança significativa deve ser documentada e comunicada.
