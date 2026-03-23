# 📋 PRD - SPRINT_08: Vendas PDV UI (Ponto de Venda)

---

## 1. Visão Geral da Sprint

### 1.1 Contexto do Projeto
O **UNIQ Empresas** é uma plataforma SaaS modular que combina Consultoria de Growth + Ferramentas de Gestão + Métricas para pequenos e médios empreendedores. O sistema segue a abordagem **Frontend First** (Interface primeiro, Backend depois), permitindo validação rápida com stakeholders antes de investir em backend.

### 1.2 Objetivo Desta Sprint
A **SPRINT_08** tem como objetivo desenvolver a **interface completa do módulo Vendas PDV (Ponto de Venda)**, incluindo:
- Tela principal do PDV com busca rápida e grid de produtos
- Carrinho lateral com controle de quantidades
- Checkout com múltiplas formas de pagamento
- Controle de caixa (abertura, sangria, suprimento, fechamento)
- Relatórios de vendas por período
- Atalhos de teclado (F1-F12) para operações rápidas

### 1.3 Escopo da Sprint

**✅ Incluído nesta Sprint:**
- Interface da tela principal do PDV (/pdv)
- Busca rápida com autocomplete de produtos
- Grid de produtos com foto, nome, preço e estoque
- Categorias com filtro lateral
- Carrinho lateral (itens, quantidade, subtotal)
- Atalhos de teclado (F1-F12)
- Checkout PDV com resumo da venda
- Formas de pagamento (dinheiro, cartão, Pix, misto)
- Cálculo automático de troco
- Busca e vínculo de cliente
- Finalização e impressão de cupom (visual)
- Controle de caixa completo
- Relatórios de vendas com filtros
- Mock data completo para testes visuais

**❌ NÃO Incluído nesta Sprint:**
- Integração com backend real (API)
- Persistência de dados no banco
- Autenticação funcional
- Impressão térmica real (apenas visual)
- Leitor de código de barras físico
- Integração com maquininha de cartão

### 1.4 Stack Tecnológica

| Camada | Tecnologia | Versão | Uso |
|--------|------------|--------|-----|
| Framework | Next.js | 14.2.5 | App Router, Server Components |
| Linguagem | TypeScript | 5.4.5 | Tipagem estática |
| UI Library | React | 18.3.1 | Componentes funcionais |
| Estilização | Tailwind CSS | 3.4.4 | Utility-first CSS |
| Componentes | shadcn/ui | v4.0.5 | Design System base |
| Ícones | Lucide React | 0.400.0 | Ícones consistentes |
| Formulários | React Hook Form | - | Validação e controle |
| Validação | Zod | - | Schema validation |
| Gráficos | Recharts | - | Relatórios visuais |

---

## 2. Estado Atual (Análise do Código)

### 2.1 Componentes do Design System Disponíveis

#### ✅ Componentes Já Implementados (Sprint 01)

| Componente | Arquivo | Status | Uso no PDV |
|------------|---------|--------|------------|
| **Button** | `components/ui/button.tsx` | ✅ Funcional | Ações, CTAs, pagamentos |
| **Card** | `components/ui/card.tsx` | ✅ Funcional | Produtos, resumos |
| **Badge** | `components/ui/badge.tsx` | ✅ Funcional | Status, categorias |
| **Avatar** | `components/ui/avatar.tsx` | ✅ Funcional | Foto do cliente |
| **Dialog** | `components/ui/dialog.tsx` | ✅ Funcional | Modais de checkout |
| **Table** | `components/ui/table.tsx` | ✅ Funcional | Relatórios, histórico |
| **Input** | `components/ui/input.tsx` | ✅ Funcional | Busca, formulários |
| **Select** | `components/ui/select.tsx` | ✅ Funcional | Formas de pagamento |
| **Tabs** | `components/ui/tabs.tsx` | ✅ Funcional | Navegação PDV |
| **Skeleton** | `components/ui/skeleton.tsx` | ✅ Funcional | Loading states |
| **Toast** | `components/ui/toast.tsx` | ✅ Funcional | Notificações |
| **Textarea** | `components/ui/textarea.tsx` | ✅ Funcional | Observações |
| **Checkbox** | `components/ui/checkbox.tsx` | ✅ Funcional | Seleção múltipla |
| **Switch** | `components/ui/switch.tsx` | ✅ Funcional | Ativar/desativar |
| **Tooltip** | `components/ui/tooltip.tsx` | ✅ Funcional | Dicas contextuais |
| **RadioGroup** | `components/ui/radio-group.tsx` | ✅ Funcional | Formas de pagamento |
| **Popover** | `components/ui/popover.tsx` | ✅ Funcional | Autocomplete |
| **Sheet** | `components/ui/sheet.tsx` | ✅ Funcional | Carrinho mobile |
| **ScrollArea** | `components/ui/scroll-area.tsx` | ✅ Funcional | Listas scrolláveis |
| **Slider** | `components/ui/slider.tsx` | ✅ Funcional | Descontos |

### 2.2 Design Tokens Configurados

**Arquivo:** `tailwind.config.ts` (cores UNIQ)

| Token | Valor | Uso no PDV |
|-------|-------|------------|
| `uniq.primary` | `#3e5653` | Header, botões primários |
| `uniq.accent` | `#86cb92` | Valores, totais, sucesso |
| `uniq.text` | `#1f2937` | Texto principal |
| `uniq.muted` | `#627271` | Texto secundário |
| `uniq.border` | `#e5e7eb` | Bordas, divisores |
| `destructive` | `#dc2626` | Cancelamentos, erros |
| `success` | `#22c55e` | Vendas concluídas |
| `warning` | `#f59e0b` | Alertas, estoque baixo |
| `info` | `#3b82f6` | Informações |

### 2.3 Dependências a Instalar

```bash
# Formulários e validação
npm install react-hook-form @hookform/resolvers zod

# Formatação de dados
npm install date-fns

# Números e moeda
npm install react-number-format

# Confetti para celebração
npm install canvas-confetti @types/canvas-confetti
```

---

## 3. User Stories

### 3.1 Tela Principal do PDV

**US-01: Buscar produtos rapidamente**
> Como vendedor, quero buscar produtos por código, nome ou código de barras, para adicionar itens ao carrinho rapidamente.

**Critérios de Aceitação:**
- [ ] Campo de busca com autofocus
- [ ] Autocomplete com sugestões
- [ ] Atalho F2 para focar na busca
- [ ] Highlight do termo buscado
- [ ] Busca em tempo real (debounce 300ms)

**US-02: Visualizar grid de produtos**
> Como vendedor, quero ver os produtos em cards com foto e preço, para encontrar visualmente o que preciso.

**Critérios de Aceitação:**
- [ ] Grid responsivo (2-5 colunas)
- [ ] Cards com imagem, nome, preço
- [ ] Badge de estoque baixo (< 5)
- [ ] Click no card adiciona ao carrinho
- [ ] Animação de feedback ao adicionar

**US-03: Filtrar por categorias**
> Como vendedor, quero filtrar produtos por categoria, para encontrar itens mais rapidamente.

**Critérios de Aceitação:**
- [ ] Lista de categorias lateral
- [ ] Filtro ativo destacado
- [ ] Contador de produtos por categoria
- [ ] Botão "Todas as categorias"

**US-04: Ver produtos recentes**
> Como vendedor, quero ver os últimos produtos vendidos, para acessar rapidamente os mais populares.

**Critérios de Aceitação:**
- [ ] Lista de produtos recentes
- [ ] Máximo 5 produtos
- [ ] Click adiciona direto ao carrinho
- [ ] Atualiza em tempo real

---

### 3.2 Carrinho Lateral

**US-05: Visualizar itens no carrinho**
> Como vendedor, quero ver todos os itens adicionados, para revisar antes de finalizar.

**Critérios de Aceitação:**
- [ ] Lista scrollável de itens
- [ ] Imagem, nome, preço unitário
- [ ] Quantidade e subtotal por item
- [ ] Badge com quantidade total

**US-06: Alterar quantidades**
> Como vendedor, quero aumentar ou diminuir a quantidade de um item, para corrigir erros.

**Critérios de Aceitação:**
- [ ] Botões + e - para cada item
- [ ] Input manual de quantidade
- [ ] Validação de estoque máximo
- [ ] Atualização em tempo real do total

**US-07: Remover itens do carrinho**
> Como vendedor, quero remover itens do carrinho, para corrigir erros de seleção.

**Critérios de Aceitação:**
- [ ] Botão remover em cada item
- [ ] Confirmação antes de remover
- [ ] Animação de saída
- [ ] Atalho Delete com item selecionado

**US-08: Limpar carrinho**
> Como vendedor, quero limpar todo o carrinho, para iniciar uma nova venda.

**Critérios de Aceitação:**
- [ ] Botão "Limpar" no header do carrinho
- [ ] Confirmação antes de limpar
- [ ] Atalho F8 para limpar
- [ ] Toast de confirmação

**US-09: Aplicar desconto**
> Como vendedor, quero aplicar desconto no total da venda, para negociar com o cliente.

**Critérios de Aceitação:**
- [ ] Campo para valor ou percentual
- [ ] Validação de limite máximo
- [ ] Visualização do desconto aplicado
- [ ] Atalho F7 para desconto

---

### 3.3 Checkout PDV

**US-10: Visualizar resumo da venda**
> Como vendedor, quero ver o resumo completo antes de finalizar, para confirmar valores.

**Critérios de Aceitação:**
- [ ] Lista de produtos com quantidades
- [ ] Subtotal, desconto, total
- [ ] Taxa de serviço (opcional)
- [ ] Valor por forma de pagamento

**US-11: Selecionar formas de pagamento**
> Como vendedor, quero escolher entre dinheiro, cartão ou Pix, para atender preferências do cliente.

**Critérios de Aceitação:**
- [ ] Ícones visuais de cada forma
- [ ] Seleção single ou múltipla (pagamento misto)
- [ ] Campos específicos por forma:
  - Dinheiro: valor recebido, troco
  - Cartão: bandeira, parcelas
  - Pix: QR code (placeholder)

**US-12: Calcular troco automaticamente**
> Como vendedor, quero que o sistema calcule o troco, para agilizar pagamentos em dinheiro.

**Critérios de Aceitação:**
- [ ] Input de valor recebido
- [ ] Cálculo automático do troco
- [ ] Validação (não permitir valor menor)
- [ ] Sugestão de valores (próximos)

**US-13: Buscar e vincular cliente**
> Como vendedor, quero buscar e vincular um cliente à venda, para histórico e fidelização.

**Critérios de Aceitação:**
- [ ] Busca por nome, telefone ou CPF
- [ ] Autocomplete com sugestões
- [ ] Botão "Cliente não identificado"
- [ ] Exibição dos dados do cliente selecionado

**US-14: Finalizar venda**
> Como vendedor, quero finalizar a venda e imprimir o cupom, para concluir a transação.

**Critérios de Aceitação:**
- [ ] Validação de todos os campos
- [ ] Confirmação de estoque
- [ ] Animação de sucesso (confetti)
- [ ] Impressão/visualização do cupom
- [ ] Reset do carrinho após finalizar
- [ ] Atalho F12 para finalizar

---

### 3.4 Controle de Caixa

**US-15: Abrir caixa**
> Como operador, quero registrar o valor inicial do caixa, para controle de movimentações.

**Critérios de Aceitação:**
- [ ] Input de valor inicial
- [ ] Campo de observações
- [ ] Registro de data/hora
- [ ] Bloqueio de vendas se caixa fechado

**US-16: Registrar sangria (retirada)**
> Como operador, quero registrar retiradas de dinheiro, para controle de caixa.

**Critérios de Aceitação:**
- [ ] Valor da retirada
- [ ] Motivo obrigatório
- [ ] Senha do supervisor (simulada)
- [ ] Registro no histórico

**US-17: Registrar suprimento (acréscimo)**
> Como operador, quero registrar acréscimos de dinheiro, para controle de caixa.

**Critérios de Aceitação:**
- [ ] Valor do acréscimo
- [ ] Motivo obrigatório
- [ ] Registro no histórico
- [ ] Atualização do saldo

**US-18: Fechar caixa**
> Como operador, quero fechar o caixa e conferir valores, para encerrar o expediente.

**Critérios de Aceitação:**
- [ ] Resumo do dia (vendas, sangrias, suprimentos)
- [ ] Campos para conferência (dinheiro, cartão, Pix)
- [ ] Cálculo de diferença (quebra de caixa)
- [ ] Confirmação com senha
- [ ] Geração de relatório

**US-19: Ver histórico de caixa**
> Como gerente, quero ver o histórico de movimentações, para auditoria.

**Critérios de Aceitação:**
- [ ] Lista de aberturas e fechamentos
- [ ] Filtro por data
- [ ] Detalhe de cada movimentação
- [ ] Exportação (placeholder)

---

### 3.5 Relatórios de Vendas

**US-20: Visualizar vendas por período**
> Como gerente, quero ver as vendas de um período específico, para acompanhar resultados.

**Critérios de Aceitação:**
- [ ] Filtro de data (hoje, ontem, 7 dias, 30 dias, custom)
- [ ] Cards de resumo (total, quantidade, ticket médio)
- [ ] Tabela de vendas detalhadas
- [ ] Paginação

**US-21: Ver produtos mais vendidos**
> Como gerente, quero ver quais produtos mais vendem, para gestão de estoque.

**Critérios de Aceitação:**
- [ ] Ranking de produtos
- [ ] Quantidade e valor vendido
- [ ] Filtro por período
- [ ] Gráfico visual (opcional)

**US-22: Ver vendas por vendedor**
> Como gerente, quero ver a performance da equipe, para incentivos.

**Critérios de Aceitação:**
- [ ] Lista de vendedores
- [ ] Total vendido por vendedor
- [ ] Quantidade de vendas
- [ ] Ticket médio

**US-23: Analisar formas de pagamento**
> Como gerente, quero ver a distribuição de pagamentos, para conciliação.

**Critérios de Aceitação:**
- [ ] Gráfico de pizza/donut
- [ ] Valores por forma de pagamento
- [ ] Percentuais
- [ ] Filtro por período

**US-24: Acompanhar cancelamentos**
> Como gerente, quero ver vendas canceladas, para controle.

**Critérios de Aceitação:**
- [ ] Lista de cancelamentos
- [ ] Motivo do cancelamento
- [ ] Vendedor que cancelou
- [ ] Valor total cancelado

---

## 4. Interface & Fluxos

### 4.1 Arquitetura de Páginas

```
📁 app/
├── 📁 pdv/
│   ├── page.tsx                 # Tela principal do PDV
│   ├── checkout/
│   │   └── page.tsx             # Checkout de vendas
│   ├── caixa/
│   │   └── page.tsx             # Controle de caixa
│   └── relatorios/
│       └── page.tsx             # Relatórios de vendas
```

### 4.2 Componentes PDV Específicos

```
📁 components/
├── 📁 pdv/
│   ├── 📁 main/
│   │   ├── pdv-header.tsx           # Header com busca
│   │   ├── product-grid.tsx         # Grid de produtos
│   │   ├── product-card.tsx         # Card de produto
│   │   ├── category-filter.tsx      # Filtro de categorias
│   │   ├── search-bar.tsx           # Busca rápida
│   │   └── recent-products.tsx      # Produtos recentes
│   ├── 📁 cart/
│   │   ├── cart-panel.tsx           # Painel lateral do carrinho
│   │   ├── cart-item.tsx            # Item do carrinho
│   │   ├── cart-summary.tsx         # Resumo do carrinho
│   │   └── quantity-control.tsx     # Controle de quantidade
│   ├── 📁 checkout/
│   │   ├── checkout-modal.tsx       # Modal de checkout
│   │   ├── payment-methods.tsx      # Formas de pagamento
│   │   ├── cash-payment.tsx         # Pagamento em dinheiro
│   │   ├── card-payment.tsx         # Pagamento em cartão
│   │   ├── pix-payment.tsx          # Pagamento Pix
│   │   ├── customer-search.tsx      # Busca de cliente
│   │   └── sale-summary.tsx         # Resumo da venda
│   ├── 📁 caixa/
│   │   ├── caixa-status.tsx         # Status do caixa
│   │   ├── abertura-form.tsx        # Form de abertura
│   │   ├── sangria-form.tsx         # Form de sangria
│   │   ├── suprimento-form.tsx      # Form de suprimento
│   │   ├── fechamento-form.tsx      # Form de fechamento
│   │   └── historico-list.tsx       # Histórico de caixa
│   └── 📁 relatorios/
│       ├── vendas-filter.tsx        # Filtros de relatório
│       ├── vendas-table.tsx         # Tabela de vendas
│       ├── resumo-cards.tsx         # Cards de resumo
│       ├── produtos-chart.tsx       # Gráfico de produtos
│       └── pagamentos-chart.tsx     # Gráfico de pagamentos
```

### 4.3 Mock Data Estruturado

**Arquivo:** `lib/mocks/pdv.ts`

```typescript
export const mockPDVProducts = [
  {
    id: 1,
    name: 'Óculos Ray-Ban',
    price: 899.90,
    image: '/images/rb.jpg',
    stock: 15,
    category: 'Óculos de Sol',
    barcode: '7891234567890'
  },
  {
    id: 2,
    name: 'Armação Titanium',
    price: 459.90,
    image: '/images/tit.jpg',
    stock: 8,
    category: 'Armações',
    barcode: '7899876543210'
  },
  {
    id: 3,
    name: 'Lente Transitions',
    price: 350.00,
    image: '/images/lente.jpg',
    stock: 20,
    category: 'Lentes',
    barcode: '7894561237890'
  },
  {
    id: 4,
    name: 'Óculos de Sol Oakley',
    price: 1299.00,
    image: '/images/oakley.jpg',
    stock: 5,
    category: 'Óculos de Sol',
    barcode: '7897894561230'
  },
  {
    id: 5,
    name: 'Armação Acetato',
    price: 299.90,
    image: '/images/acetato.jpg',
    stock: 12,
    category: 'Armações',
    barcode: '7893216549870'
  },
  {
    id: 6,
    name: 'Lente Anti Reflexo',
    price: 180.00,
    image: '/images/antireflexo.jpg',
    stock: 25,
    category: 'Lentes',
    barcode: '7896549873210'
  }
];

export const mockCategories = [
  { id: 1, name: 'Óculos de Sol', count: 15 },
  { id: 2, name: 'Armações', count: 32 },
  { id: 3, name: 'Lentes', count: 20 },
  { id: 4, name: 'Acessórios', count: 8 },
  { id: 5, name: 'Estojos', count: 12 }
];

export const mockCartItems = [
  {
    id: 'cart-1',
    productId: 1,
    name: 'Óculos Ray-Ban',
    price: 899.90,
    quantity: 1,
    image: '/images/rb.jpg'
  },
  {
    id: 'cart-2',
    productId: 2,
    name: 'Armação Titanium',
    price: 459.90,
    quantity: 1,
    image: '/images/tit.jpg'
  }
];

export const mockCart = {
  items: mockCartItems,
  subtotal: 1359.80,
  discount: 0,
  total: 1359.80
};

export const mockPaymentMethods = [
  { id: 'dinheiro', name: 'Dinheiro', icon: 'Banknote', color: '#22c55e' },
  { id: 'cartao_credito', name: 'Cartão Crédito', icon: 'CreditCard', color: '#3b82f6' },
  { id: 'cartao_debito', name: 'Cartão Débito', icon: 'CreditCard', color: '#6366f1' },
  { id: 'pix', name: 'PIX', icon: 'QrCode', color: '#06b6d4' }
];

export const mockCashRegister = {
  isOpen: true,
  openingAmount: 200.00,
  currentBalance: 1847.50,
  salesCount: 12,
  lastClosure: '2026-03-13 18:00',
  operator: 'Ana Silva'
};

export const mockSalesHistory = [
  {
    id: 1,
    number: '1024',
    time: '09:30',
    total: 459.90,
    paymentMethod: 'credit_card',
    seller: 'Ana',
    customer: 'João Silva',
    status: 'completed'
  },
  {
    id: 2,
    number: '1023',
    time: '10:15',
    total: 1250.00,
    paymentMethod: 'pix',
    seller: 'Ana',
    customer: 'Maria Santos',
    status: 'completed'
  },
  {
    id: 3,
    number: '1022',
    time: '11:45',
    total: 899.90,
    paymentMethod: 'dinheiro',
    seller: 'Pedro',
    customer: null,
    status: 'completed'
  },
  {
    id: 4,
    number: '1021',
    time: '14:20',
    total: 459.90,
    paymentMethod: 'debit_card',
    seller: 'Ana',
    customer: 'Carlos Oliveira',
    status: 'cancelled'
  }
];

export const mockCaixaMovimentacoes = [
  {
    id: 1,
    type: 'abertura',
    amount: 200.00,
    description: 'Abertura de caixa',
    timestamp: '2026-03-20T08:00:00',
    operator: 'Ana Silva'
  },
  {
    id: 2,
    type: 'sangria',
    amount: -50.00,
    description: 'Retirada para almoço',
    timestamp: '2026-03-20T12:30:00',
    operator: 'Ana Silva'
  },
  {
    id: 3,
    type: 'suprimento',
    amount: 100.00,
    description: 'Troco adicional',
    timestamp: '2026-03-20T15:00:00',
    operator: 'Ana Silva'
  }
];

export const mockVendedores = [
  { id: 1, name: 'Ana Silva', sales: 24, total: 8450.00 },
  { id: 2, name: 'Pedro Santos', sales: 18, total: 6230.00 },
  { id: 3, name: 'Maria Costa', sales: 15, total: 4890.00 }
];
```

---

## 5. Requisitos Funcionais

### 5.1 Tela Principal do PDV (RF-01 a RF-05)

#### RF-01: Busca Rápida de Produtos
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (product: Product) => void;
  products: Product[];
  placeholder?: string;
  autoFocus?: boolean;
}
```

**Features:**
- Autocomplete com lista suspensa
- Highlight do termo buscado
- Navegação por teclado (setas, Enter)
- Ícone de código de barras (visual)

---

#### RF-02: Grid de Produtos
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  loading?: boolean;
  columns?: 2 | 3 | 4 | 5;
}
```

**Features:**
- Layout responsivo (grid-cols-2 a grid-cols-5)
- Cards com hover effect
- Badge de estoque baixo (amarelo se < 5, vermelho se 0)
- Loading skeleton
- Empty state

---

#### RF-03: Carrinho Lateral
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface CartPanelProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: () => void;
  subtotal: number;
  discount: number;
  total: number;
  isOpen?: boolean;
  onClose?: () => void;
}
```

**Features:**
- Scroll interno para lista de itens
- Controles de quantidade (+/-)
- Botão remover (aparece no hover)
- Resumo financeiro no footer
- Botão "Finalizar Venda" destacado

---

#### RF-04: Filtro de Categorias
**Prioridade:** Média | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface CategoryFilterProps {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}
```

**Features:**
- Lista vertical de categorias
- Contador de itens
- Estado ativo destacado
- Scroll se muitas categorias

---

#### RF-05: Atalhos de Teclado
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Mapeamento:**
| Tecla | Ação |
|-------|------|
| F1 | Ajuda/atalhos |
| F2 | Focar busca |
| F3 | Buscar cliente |
| F4 | Aplicar desconto |
| F5 | Atualizar página |
| F6 | Pagamento misto |
| F7 | Desconto rápido |
| F8 | Limpar carrinho |
| F9 | Controle de caixa |
| F10 | Relatórios |
| F11 | Tela cheia |
| F12 | Finalizar venda |

---

### 5.2 Checkout PDV (RF-06 a RF-10)

#### RF-06: Modal de Checkout
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
  onComplete: (sale: Sale) => void;
}
```

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ CHECKOUT                                    [X]            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RESUMO DA VENDA                                            │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Produto 1                      R$ 899,90              │ │
│  │ Produto 2                      R$ 459,90              │ │
│  │                                       ─────────────   │ │
│  │ Subtotal                             R$ 1.359,80      │ │
│  │ Desconto                             R$ 0,00          │ │
│  │ TOTAL                                R$ 1.359,80      │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  FORMAS DE PAGAMENTO                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ 💵       │ │ 💳       │ │ 📱       │ │ 💰       │       │
│  │ Dinheiro │ │ Crédito  │ │ Débito   │ │ PIX      │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                             │
│  [Detalhes do pagamento selecionado]                        │
│                                                             │
│  CLIENTE                                                    │
│  [Buscar cliente...]                                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │           [FINALIZAR VENDA]                           │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

#### RF-07: Pagamento em Dinheiro
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface CashPaymentProps {
  total: number;
  received: number;
  onChangeReceived: (value: number) => void;
  change: number;
}
```

**Features:**
- Input de valor recebido
- Cálculo automático de troco
- Botões de atalho (R$ 10, 20, 50, 100)
- Validação (não permite valor menor que total)

---

#### RF-08: Pagamento em Cartão
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface CardPaymentProps {
  total: number;
  type: 'credit' | 'debit';
  installments: number;
  onChangeType: (type: 'credit' | 'debit') => void;
  onChangeInstallments: (installments: number) => void;
}
```

**Features:**
- Seleção crédito/débito
- Parcelas (1x a 12x para crédito)
- Cálculo de valor por parcela
- Integração visual com bandeiras

---

#### RF-09: Busca de Cliente
**Prioridade:** Média | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface CustomerSearchProps {
  value: Customer | null;
  onChange: (customer: Customer | null) => void;
  customers: Customer[];
}
```

**Features:**
- Autocomplete
- Busca por nome, telefone ou CPF
- Botão "Não identificar"
- Card com dados do cliente selecionado

---

#### RF-10: Finalização com Confetti
**Prioridade:** Média | **Status:** 🔴 Não Implementado

**Features:**
- Animação de sucesso
- Efeito confetti
- Resumo da venda
- Botão "Nova Venda"
- Visualização do cupom

---

### 5.3 Controle de Caixa (RF-11 a RF-15)

#### RF-11: Status do Caixa
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface CaixaStatusProps {
  isOpen: boolean;
  openingAmount: number;
  currentBalance: number;
  operator: string;
  lastClosure?: string;
}
```

**Features:**
- Indicador visual (verde=aberto, vermelho=fechado)
- Valores em destaque
- Botões de ação contextuais

---

#### RF-12: Formulário de Abertura
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Campos:**
```typescript
interface AberturaFormData {
  openingAmount: number;      // Valor inicial
  operatorName: string;       // Nome do operador
  observations?: string;      // Observações
}
```

---

#### RF-13: Formulário de Sangria
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Campos:**
```typescript
interface SangriaFormData {
  amount: number;             // Valor da retirada
  reason: string;             // Motivo (obrigatório)
  supervisorPassword?: string; // Senha do supervisor
}
```

---

#### RF-14: Formulário de Suprimento
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Campos:**
```typescript
interface SuprimentoFormData {
  amount: number;             // Valor do acréscimo
  reason: string;             // Motivo (obrigatório)
}
```

---

#### RF-15: Formulário de Fechamento
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Campos:**
```typescript
interface FechamentoFormData {
  cashAmount: number;         // Dinheiro em caixa
  cardAmount: number;         // Total em cartão
  pixAmount: number;          // Total em Pix
  difference?: number;        // Diferença calculada
  observations?: string;      // Observações
  supervisorPassword?: string; // Senha do supervisor
}
```

---

### 5.4 Relatórios de Vendas (RF-16 a RF-20)

#### RF-16: Filtros de Período
**Prioridade:** Média | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface VendasFilterProps {
  period: {
    from: Date;
    to: Date;
  };
  onChange: (period: { from: Date; to: Date }) => void;
  presets: Array<{ label: string; value: string }>;
}
```

**Presets:**
- Hoje
- Ontem
- Últimos 7 dias
- Este mês
- Mês passado
- Período customizado

---

#### RF-17: Cards de Resumo
**Prioridade:** Média | **Status:** 🔴 Não Implementado

**Métricas:**
- Total em vendas
- Quantidade de vendas
- Ticket médio
- Meta do mês (progress bar)

---

#### RF-18: Tabela de Vendas
**Prioridade:** Média | **Status:** 🔴 Não Implementado

**Colunas:**
| Coluna | Descrição |
|--------|-----------|
| Nº | Número da venda |
| Data/Hora | Data e hora da venda |
| Cliente | Nome do cliente |
| Vendedor | Nome do vendedor |
| Valor | Total da venda |
| Pagamento | Forma de pagamento |
| Status | Badge (Paga, Pendente, Cancelada) |
| Ações | Ver, Imprimir, Cancelar |

---

#### RF-19: Gráfico de Produtos Mais Vendidos
**Prioridade:** Baixa | **Status:** 🔴 Não Implementado

**Tipo:** Bar Chart
**Dados:**
- Nome do produto
- Quantidade vendida
- Valor total

---

#### RF-20: Gráfico de Formas de Pagamento
**Prioridade:** Baixa | **Status:** 🔴 Não Implementado

**Tipo:** Pie/Donut Chart
**Dados:**
- Dinheiro: R$ X (X%)
- Cartão Crédito: R$ X (X%)
- Cartão Débito: R$ X (X%)
- Pix: R$ X (X%)

---

## 6. Requisitos Não-Funcionais

### 6.1 Performance

| Requisito | Critério | Implementação |
|-----------|----------|---------------|
| **Initial Load** | < 2s | Server Components, lazy loading |
| **Busca** | < 100ms | Debounce 300ms, client-side |
| **Add to Cart** | < 50ms | State local, otimista |
| **Checkout** | < 300ms | Optimistic UI, mock delay |
| **Relatórios** | < 1s | Cache de dados mock |

### 6.2 Acessibilidade

| Requisito | Critério | Checklist |
|-----------|----------|-----------|
| **Keyboard Navigation** | Tab order lógico | ✅ Atalhos F1-F12 |
| **Focus Visible** | Ring de 2px | ✅ Tailwind `focus-visible:ring-2` |
| **ARIA Labels** | Descrições claras | ✅ Botões têm aria-label |
| **Color Contrast** | WCAG AA (4.5:1) | ✅ Cores validadas |
| **Screen Readers** | Anúncios corretos | ✅ Live regions |

### 6.3 Responsividade

| Breakpoint | Adaptações |
|------------|------------|
| **Desktop (>1024px)** | Layout completo com sidebar, grid 4-5 colunas |
| **Tablet (768-1024px)** | Carrinho em drawer, grid 3 colunas |
| **Mobile (<768px)** | Layout simplificado, grid 2 colunas, teclado touch |

### 6.4 Estados de UI

**Loading States:**
- Grid: Skeleton cards
- Carrinho: Skeleton items
- Checkout: Spinner no botão
- Relatórios: Skeleton charts

**Empty States:**
- Carrinho: "Carrinho vazio" + ilustração
- Busca: "Nenhum produto encontrado"
- Caixa fechado: "Caixa fechado" + CTA abrir
- Relatórios: "Nenhuma venda no período"

**Error States:**
- Toast notifications
- Validação de formulários
- Estoque insuficiente

---

## 7. Critérios de Aceitação (Definition of Done)

### 7.1 Checklist Geral

- [ ] Tela PDV renderiza com mock data
- [ ] Busca rápida funciona com autocomplete
- [ ] Grid de produtos responsivo
- [ ] Carrinho atualiza em tempo real
- [ ] Controles de quantidade funcionam
- [ ] Atalhos F1-F12 mapeados
- [ ] Checkout modal abre e fecha
- [ ] Formas de pagamento selecionáveis
- [ ] Cálculo de troco automático
- [ ] Busca de cliente funciona
- [ ] Finalização com confetti
- [ ] Controle de caixa (abertura, sangria, suprimento, fechamento)
- [ ] Relatórios de vendas com filtros
- [ ] Gráficos de produtos e pagamentos
- [ ] Estados empty em todas as telas
- [ ] Estados loading implementados
- [ ] Responsividade testada em 3 breakpoints
- [ ] Acessibilidade: atalhos de teclado funcionais

### 7.2 Checklist de Componentes

| Componente | Criado | Testado | Integrado |
|------------|--------|---------|-----------|
| PdvHeader | [ ] | [ ] | [ ] |
| ProductGrid | [ ] | [ ] | [ ] |
| ProductCard | [ ] | [ ] | [ ] |
| CartPanel | [ ] | [ ] | [ ] |
| CartItem | [ ] | [ ] | [ ] |
| CategoryFilter | [ ] | [ ] | [ ] |
| SearchBar | [ ] | [ ] | [ ] |
| CheckoutModal | [ ] | [ ] | [ ] |
| PaymentMethods | [ ] | [ ] | [ ] |
| CashPayment | [ ] | [ ] | [ ] |
| CardPayment | [ ] | [ ] | [ ] |
| CustomerSearch | [ ] | [ ] | [ ] |
| CaixaStatus | [ ] | [ ] | [ ] |
| AberturaForm | [ ] | [ ] | [ ] |
| SangriaForm | [ ] | [ ] | [ ] |
| SuprimentoForm | [ ] | [ ] | [ ] |
| FechamentoForm | [ ] | [ ] | [ ] |
| VendasFilter | [ ] | [ ] | [ ] |
| VendasTable | [ ] | [ ] | [ ] |
| ResumoCards | [ ] | [ ] | [ ] |

---

## 8. Notas de Implementação

### 8.1 Estrutura de Estado (React Hooks)

```typescript
// Hook principal do PDV
export function usePDV() {
  // Carrinho
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Busca
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  // Checkout
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('dinheiro');
  const [customer, setCustomer] = useState<Customer | null>(null);
  
  // Caixa
  const [caixa, setCaixa] = useState<CaixaStatus>(mockCashRegister);
  
  // Ações
  const addToCart = (product: Product) => { ... };
  const updateQuantity = (id: string, quantity: number) => { ... };
  const removeFromCart = (id: string) => { ... };
  const clearCart = () => { ... };
  const completeSale = () => { ... };
  
  return {
    cart, searchTerm, selectedCategory,
    addToCart, updateQuantity, removeFromCart, clearCart,
    isCheckoutOpen, setIsCheckoutOpen,
    paymentMethod, setPaymentMethod,
    customer, setCustomer,
    completeSale, caixa
  };
}
```

### 8.2 Padrão de Formulários

```typescript
// Com React Hook Form + Zod
const checkoutSchema = z.object({
  paymentMethod: z.enum(['dinheiro', 'cartao_credito', 'cartao_debito', 'pix']),
  receivedAmount: z.number().optional(),
  installments: z.number().min(1).max(12).optional(),
  customerId: z.number().optional()
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;
```

### 8.3 Mapeamento de Atalhos (Keyboard)

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'F2':
        e.preventDefault();
        focusSearch();
        break;
      case 'F8':
        e.preventDefault();
        clearCart();
        break;
      case 'F12':
        e.preventDefault();
        openCheckout();
        break;
      // ... outros atalhos
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 8.4 Formatação de Moeda

```typescript
// Utilitário para formatação brasileira
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
```

---

## 9. Riscos e Mitigações

### Risco 1: Complexidade do Checkout
**Descrição:** Múltiplas formas de pagamento e cálculos podem ser complexos.
**Impacto:** Alto | **Probabilidade:** Média
**Mitigação:**
- Implementar uma forma de pagamento por vez
- Validar cálculos com casos de teste
- Usar componentes controlados

### Risco 2: Performance com Muitos Produtos
**Descrição:** Se houver muitos produtos, o grid pode ficar lento.
**Impacto:** Médio | **Probabilidade:** Média
**Mitigação:**
- Implementar paginação ou infinite scroll
- Virtualização se necessário
- Lazy loading de imagens

### Risco 3: Responsividade Complexa
**Descrição:** PDV precisa funcionar em diferentes tamanhos de tela.
**Impacto:** Médio | **Probabilidade:** Alta
**Mitigação:**
- Mobile-first approach
- Testar em múltiplos breakpoints
- Drawer para carrinho em mobile

### Risco 4: UX de Atalhos
**Descrição:** Atalhos de teclado podem conflitar com navegador.
**Impacto:** Baixo | **Probabilidade:** Média
**Mitigação:**
- Usar preventDefault()
- Documentar todos os atalhos
- Permitir desabilitar atalhos

---

## 10. Referências

### 10.1 Documentação do Projeto
- [ROADMAP](../docs/ROADMAP.md) - Seção Sprint 13: Vendas PDV UI
- [Módulo Vendas PDV - UI](../docs/ui/modulo-06-vendas-pdv.md)
- [TRACKING.md](../tracking/TRACKING.md)

### 10.2 Bibliotecas e Recursos
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Recharts](https://recharts.org/)
- [Canvas Confetti](https://github.com/catdad/canvas-confetti)

### 10.3 Inspirações UI
- [iFood PDV](https://www.ifood.com.br/) - Interface touch-friendly
- [Square POS](https://squareup.com/us/en/payments) - Checkout moderno
- [SumUp](https://www.sumup.com/) - Simplicidade
- [Novo PDV](https://novopdv.com.br/) - Fluxo de vendas

### 10.4 Componentes de Referência
- **Grid de Produtos:** Netflix, App Store
- **Carrinho:** Amazon, Mercado Livre
- **Checkout:** Stripe, Paypal
- **Relatórios:** Metabase, Tableau

---

**Documento gerado em:** 21/03/2026  
**Pesquisador:** @vibe-researcher  
**Fase:** FASE 01 - Research (SDD)  
**Próxima Fase:** FASE 02 - Planning (@vibe-planner)  
**Status:** 🟢 PRONTO PARA PLANNING

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação de produto (PRD). Não contém código implementado. A implementação será realizada na FASE 03 por @vibe-implementer baseado na SPEC técnica que será gerada na FASE 02.

> 🎯 **PRÓXIMOS PASSOS:**
> 1. Usuário deve limpar contexto do chat
> 2. Chamar @vibe-planner para gerar SPEC.md
> 3. Aguardar aprovação do SPEC
> 4. Chamar @vibe-implementer para desenvolvimento
