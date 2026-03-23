# 📋 PRD - SPRINT_06: Finance UI 💰 (Frontend Only)

---

## 1. Visão Geral da Sprint

### 1.1 Contexto do Projeto
O **UNIQ Empresas** é uma plataforma SaaS modular que combina Consultoria de Growth + Ferramentas de Gestão + Métricas para pequenos e médios empreendedores. O sistema segue a abordagem **Frontend First** (Interface primeiro, Backend depois), permitindo validação rápida com stakeholders antes de investir em backend.

### 1.2 Objetivo Desta Sprint
A **SPRINT_06** tem como objetivo desenvolver a **interface completa do módulo Financeiro**, incluindo:
- Dashboard financeiro com cards de métricas e gráfico de fluxo
- Lista de contas a receber com filtros e ações
- Lista de contas a pagar com categorias
- Fluxo de caixa com visualização mensal
- Todos os modais de ação (novo pagamento, recebimento, etc.)

### 1.3 Escopo da Sprint

**✅ Incluído nesta Sprint:**
- Dashboard financeiro com cards (saldo, a receber, a pagar, fluxo)
- Gráfico de fluxo de caixa (entradas vs saídas - linha)
- Lista de contas próximas do vencimento
- Lista de contas a receber com filtros
- Lista de contas a pagar com filtros e categorias
- Modais de cadastro rápido (nova conta a receber/pagar)
- Modais de marcação como recebido/pago
- Fluxo de caixa com tabela mensal e projeção
- Empty states e loading states para todas as telas
- Mock data completo para testes visuais

**❌ NÃO Incluído nesta Sprint:**
- Integração com backend real (API)
- Persistência de dados no banco
- Autenticação funcional
- Geração real de PDF/Excel
- Conciliação bancária automática

### 1.4 Stack Tecnológica

| Camada | Tecnologia | Versão | Uso |
|--------|------------|--------|-----|
| Framework | Next.js | 14.2.5 | App Router, Server Components |
| Linguagem | TypeScript | 5.4.5 | Tipagem estática |
| UI Library | React | 18.3.1 | Componentes funcionais |
| Estilização | Tailwind CSS | 3.4.4 | Utility-first CSS |
| Componentes | shadcn/ui | v4.0.5 | Design System base |
| Ícones | Lucide React | 0.400.0 | Ícones consistentes |
| Gráficos | Recharts | - | Gráfico de fluxo de caixa |
| Formatação | date-fns | - | Manipulação de datas |

---

## 2. Análise do Codebase

### 2.1 Componentes do Design System Disponíveis

#### ✅ Componentes Já Implementados (Sprints Anteriores)

| Componente | Arquivo | Status | Uso no Financeiro |
|------------|---------|--------|-------------------|
| **Button** | `components/ui/button.tsx` | ✅ Funcional | Ações, CTAs |
| **Card** | `components/ui/card.tsx` | ✅ Funcional | Cards de métricas |
| **Badge** | `components/ui/badge.tsx` | ✅ Funcional | Status (pending/paid/overdue) |
| **Avatar** | `components/ui/avatar.tsx` | ✅ Funcional | Fotos de clientes/fornecedores |
| **Dialog** | `components/ui/dialog.tsx` | ✅ Funcional | Modais de cadastro |
| **Table** | `components/ui/table.tsx` | ✅ Funcional | Listas de contas |
| **Input** | `components/ui/input.tsx` | ✅ Funcional | Formulários |
| **Select** | `components/ui/select.tsx` | ✅ Funcional | Filtros |
| **Tabs** | `components/ui/tabs.tsx` | ✅ Funcional | Navegação interna |
| **Skeleton** | `components/ui/skeleton.tsx` | ✅ Funcional | Loading states |
| **Toast** | `components/ui/toast.tsx` | ✅ Funcional | Notificações |
| **Textarea** | `components/ui/textarea.tsx` | ✅ Funcional | Observações |
| **Checkbox** | `components/ui/checkbox.tsx` | ✅ Funcional | Seleção múltipla |
| **Switch** | `components/ui/switch.tsx` | ✅ Funcional | Toggles |
| **Tooltip** | `components/ui/tooltip.tsx` | ✅ Funcional | Dicas contextuais |

### 2.2 Design Tokens Configurados

**Arquivo:** `tailwind.config.ts` (cores UNIQ)

| Token | Valor | Uso no Financeiro |
|-------|-------|-------------------|
| `uniq.primary` | `#3e5653` | Botões primários, header |
| `uniq.accent` | `#86cb92` | Receitas, saldo positivo |
| `uniq.text` | `#1f2937` | Texto principal |
| `uniq.muted` | `#627271` | Texto secundário |
| `uniq.border` | `#e5e7eb` | Bordas, divisores |
| `destructive` | `#dc2626` | Despesas, contas vencidas |
| `success` | `#22c55e` | Pago, recebido |
| `warning` | `#f59e0b` | Pendente, alertas |
| `info` | `#3b82f6` | Agendado |

### 2.3 Cores Semânticas do Financeiro

| Status | Cor | Uso |
|--------|-----|-----|
| **Receita** | `#86cb92` (verde) | Entradas, saldo positivo |
| **Despesa** | `#ef4444` (vermelho) | Saídas, contas a pagar |
| **Pendente** | `#f59e0b` (amarelo) | Aguardando pagamento/recebimento |
| **Pago** | `#22c55e` (verde) | Contas quitadas |
| **Vencido** | `#dc2626` (vermelho escuro) | Contas em atraso |
| **Agendado** | `#3b82f6` (azul) | Pagamentos programados |

---

## 3. Telas/Componentes

### 3.1 Dashboard Financeiro (`/financeiro`)

#### Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937 - Financeiro destacado]                                            │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Financeiro - Dashboard                    [Período ▼]  [Atualizar]     │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Cards de Métricas - Grid 4 colunas]                                            │ │
│ │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │ │
│ │ │ [Wallet]         │ │ [ArrowDownLeft]  │ │ [ArrowUpRight]   │ │ [TrendingUp] │ │ │
│ │ │ R$ 15.420,50     │ │ R$ 8.500,00      │ │ R$ 3.200,00      │ │ [Mini Chart] │ │ │
│ │ │ Saldo em Contas  │ │ A Receber        │ │ A Pagar          │ │ +R$ 11.780   │ │ │
│ │ │ +12% vs mês ant. │ │ 5 títulos       │ │ 8 títulos ⚠️    │ │ Fluxo do Mês │ │ │
│ │ └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Gráfico de Fluxo de Caixa]              │ [Contas Próximas do Vencimento]    │ │
│ │                                          │                                    │ │
│ │  [Filtro: 7d │ 30d │ 3m │ 6m │ 1a]      │  • Despesa X - R$ 1.200 - 2 dias   │ │
│ │                                          │  • Receita Y - R$ 3.400 - 3 dias   │ │
│ │      Receitas (verde)                    │  • Despesa Z - R$ 890 - 5 dias     │ │
│ │     ╱                                    │  [Ver todas →]                     │ │
│ │    ╱  Despesas (vermelho)                │                                    │ │
│ │   ╱╲                                     │                                    │ │
│ │  ╱  ╲                                    │                                    │ │
│ │ ╱    ╲____                               │                                    │ │
│ │                                          │                                    │ │
│ └─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Ações Rápidas]                                                                 │ │
│ │ [+ Nova Receita] [+ Nova Despesa] [↔ Transferência] [☰ Conciliar]              │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

#### Componentes do Dashboard

**FIN-DASH-01: Cards Principais**

| Card | Valor | Ícone | Cor |
|------|-------|-------|-----|
| Saldo em Contas | R$ 15.420,50 | Wallet | `#86cb92` |
| A Receber | R$ 8.500,00 | ArrowDownLeft | Blue |
| A Pagar | R$ 3.200,00 | ArrowUpRight | Red |
| Fluxo do Mês | +R$ 11.780,00 | TrendingUp | `#86cb92` |

**FIN-DASH-02: Gráfico de Fluxo**
- Tipo: Linha (LineChart do Recharts)
- Duas linhas: Receitas (verde) e Despesas (vermelho)
- Filtros: 7 dias, 30 dias, 3 meses, 6 meses, 1 ano
- Tooltip hover mostrando valores

**FIN-DASH-03: Contas Vencendo (Próximos 7 dias)**
- Lista vertical com scroll
- Ícone de tipo (entrada/saída)
- Nome da conta
- Valor (colorido por tipo)
- Dias até vencimento

**FIN-DASH-04: Acesso Rápido**
- Botão "Nova Receita" (verde `#86cb92`)
- Botão "Nova Despesa" (vermelho `#ef4444`)
- Botão "Transferência" (outline)
- Botão "Conciliar" (outline)

---

### 3.2 Contas a Receber (`/financeiro/receber`)

#### Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Contas a Receber                        [+ Nova Receita]               │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros]                                                                       │ │
│ │ [Período: ▼] [Status: Todas ▼] [Categoria: Todas ▼] [Cliente: 🔍] [Filtrar]   │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabela de Recebíveis]                                                          │ │
│ │ ┌───────────────────────────────────────────────────────────────────────────┐   │ │
│ │ │ ☐ Descrição      Cliente        Venc.    Valor    Status    Ações        │   │ │
│ │ │ ☐ Venda #1234    ABC Ltda      15/03   R$ 5.000  [Pend]   👁 ✏️ 🗑 💰 📧│   │ │
│ │ │ ☐ Serviço X      Cliente B     20/03   R$ 2.500  [Pend]   👁 ✏️ 🗑 💰 📧│   │ │
│ │ │ ☐ Venda #1230    XYZ Corp      05/03   R$ 1.200  [Pago]   👁 ✏️ 🗑      │   │ │
│ │ │ ☐ Consultoria    Empresa C     01/03   R$ 3.000  [Atras]  👁 ✏️ 🗑 💰 📧│   │ │
│ │ └───────────────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                                 │ │
│ │ [Resumo Lateral]                                                                │ │
│ │ ┌───────────────┐                                                               │ │
│ │ │ Total:        │                                                               │ │
│ │ │ R$ 32.150,00 │                                                               │ │
│ │ │               │                                                               │ │
│ │ │ A Receber:   │                                                               │ │
│ │ │ R$ 12.300,00 │                                                               │ │
│ │ │               │                                                               │ │
│ │ │ Recebido:    │                                                               │ │
│ │ │ R$ 19.850,00 │                                                               │ │
│ │ │               │                                                               │ │
│ │ │ Em Atraso:   │                                                               │ │
│ │ │ R$ 3.000,00  │                                                               │ │
│ │ └───────────────┘                                                               │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

#### Funcionalidades

**REC-01: Lista de Contas**
- Tabela com colunas: Checkbox, Descrição, Cliente, Vencimento, Valor, Status, Ações
- Status: Pendente (amarelo), Pago (verde), Em Atraso (vermelho)
- Ações: Ver (👁), Editar (✏️), Excluir (🗑), Receber (💰), Enviar Cobrança (📧)

**REC-02: Filtros**
- Por período (seletor de data)
- Por status (Todas, Pendentes, Pagas, Vencidas)
- Por categoria (Todas, Vendas, Serviços, etc.)
- Por cliente (busca com autocomplete)

**REC-03: Marcar como Recebido**
- Checkbox que abre modal
- Data de recebimento (default: hoje)
- Forma de pagamento (select)
- Conta bancária de destino
- Desconto/juros (opcional)

**REC-04: Cadastro Rápido (Modal)**
```typescript
interface ReceivableFormData {
  description: string;      // Descrição
  client: string;          // Cliente (select/busca)
  amount: number;          // Valor
  dueDate: Date;          // Data de vencimento
  category: string;       // Categoria
  notes?: string;         // Observações
}
```

**REC-05: Empty State**
- Ilustração/ícone
- Texto: "Nenhuma conta a receber"
- CTA: "Cadastrar primeira conta"

---

### 3.3 Contas a Pagar (`/financeiro/pagar`)

#### Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Contas a Pagar                           [+ Nova Despesa]              │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros]                                                                       │ │
│ │ [Período: ▼] [Status: Todas ▼] [Categoria: Todas ▼] [Fornecedor: 🔍] [Filtrar]│ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Ações em Massa - aparece ao selecionar]                                        │ │
│ │ [Marcar como Paga] [Excluir] [Exportar]                    [Selecionados: 3]    │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabela de Contas]                                          [Resumo Lateral]    │ │
│ │ ┌───────────────────────────────────────────────────────────┐ ┌───────────────┐ │ │
│ │ │ ☐ Descrição      Categoria  Fornecedor  Venc.  Valor   Status  Ações      │ │ │
│ │ │ ☐ Aluguel        Imóvel     Imobiliaria 12/03  2.500  [Pend]  👁 ✏️ 🗑 💰 │ │ │
│ │ │ ☐ Energia        Serviços   CEMIG       15/03   890   [Pend]  👁 ✏️ 🗑 💰 │ │ │
│ │ │ ☐ Internet       Serviços   Vivo        20/03   299   [Paga]  👁 ✏️ 🗑    │ │ │
│ │ │ ☐ Fornecedor X   Compras    XYZ Ltda    10/03  1.200  [Venc]  👁 ✏️ 🗑 💰 │ │ │
│ │ └───────────────────────────────────────────────────────────┘ │ Total:        │ │ │
│ │                                                              │ R$ 24.567,00 │ │ │
│ │                                                              │              │ │ │
│ │                                                              │ Pendentes:   │ │ │
│ │                                                              │ R$ 8.450,00  │ │ │
│ │                                                              │              │ │ │
│ │                                                              │ Vencidas:    │ │ │
│ │                                                              │ R$ 2.100,00  │ │ │
│ │                                                              └───────────────┘ │ │
│ │ [← 1 2 3 ... 10 →]                                              Exibindo 1-10 │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

#### Funcionalidades

**PAY-01: Lista de Contas**
- Tabela similar à Contas a Receber
- Ícone de categoria em cada linha
- Status: Pendente (amarelo), Paga (verde), Vencida (vermelho)

**PAY-02: Filtros**
- Por período
- Por status
- Por categoria (Todas, Fornecedores, Funcionários, Impostos, Aluguel, Marketing)
- Por fornecedor

**PAY-03: Marcar como Pago**
- Checkbox que abre modal de pagamento
- Data do pagamento
- Forma de pagamento (Dinheiro, Cartão, PIX, Boleto, Transferência)
- Conta bancária
- Upload de comprovante (opcional)

**PAY-04: Cadastro Rápido (Modal)**
```typescript
interface PayableFormData {
  description: string;      // Descrição
  supplier: string;        // Fornecedor
  amount: number;          // Valor
  dueDate: Date;          // Data de vencimento
  category: string;       // Categoria
  notes?: string;         // Observações
}
```

**PAY-05: Categorias (Tags)**
- Aluguel (🏠)
- Fornecedor (📦)
- Funcionários (👥)
- Impostos (📄)
- Serviços (⚡)
- Marketing (📢)

---

### 3.4 Fluxo de Caixa (`/financeiro/fluxo`)

#### Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Fluxo de Caixa                                                         │ │
│ │ [Visualização: ● Calendário  ○ Lista]  [Mês: Março 2026 ▼]  [Conta: Todas ▼]   │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Visualização em Calendário]                                                    │ │
│ │ ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐                                     │ │
│ │ │ DOM │ SEG │ TER │ QUA │ QUI │ SEX │ SÁB │                                     │ │
│ │ ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                                     │ │
│ │ │     │  1  │  2  │  3  │  4  │  5  │  6  │                                     │ │
│ │ │     │+5.0 │-800 │+2.3 │-500 │+1.2 │     │                                     │ │
│ │ │     │ 💚  │ 💔  │ 💚  │ 💔  │ 💚  │     │                                     │ │
│ │ ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                                     │ │
│ │ │  7  │  8  │  9  │ 10  │ 11  │ 12  │ 13  │                                     │ │
│ │ │     │-1.2 │+800 │-2.5 │     │ 🔴  │     │                                     │ │
│ │ │     │ 💔  │ 💚  │ 💔  │     │     │     │                                     │ │
│ │ ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                                     │ │
│ │ │ ... │     │     │     │     │     │     │                                     │ │
│ │ └─────┴─────┴─────┴─────┴─────┴─────┴─────┘                                     │ │
│ │                                                                                 │ │
│ │ Legenda: 💚 Entrada  💔 Saída  🔴 Saldo Negativo                                │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

#### Funcionalidades

**CASH-01: Tabela Mensal (Calendário)**
- Grid 7 colunas (Dom-Sáb)
- Cada célula mostra:
  - Número do dia
  - Total de entradas (verde)
  - Total de saídas (vermelho)
  - Saldo do dia
- Hover mostra detalhes
- Click abre modal com transações do dia

**CASH-02: Saldo Acumulado (Gráfico)**
- Gráfico de área mostrando evolução do saldo
- Linha do saldo acumulado
- Linha de projeção (pontilhada)

**CASH-03: Projeção (Próximos 30 dias)**
- Seção destacada com projeção baseada em:
  - Contas a receber programadas
  - Contas a pagar programadas
  - Padrão histórico

**CASH-04: Exportar**
- Botão "Exportar PDF"
- Botão "Exportar Excel"
- (Mock - sem funcionalidade real)

---

## 4. Mock Data

### 4.1 Dados do Dashboard

```typescript
// lib/mocks/finance.ts

export const mockFinanceSummary = {
  balance: 15420.50,
  toReceive: 8500.00,
  toPay: 3200.00,
  projected: 20720.50,
  previousMonthChange: 12.5,
  receivableCount: 5,
  payableCount: 8,
  monthlyFlow: 11780.00
};

export const mockCashFlow = [
  { date: '2026-03-01', income: 3000, expense: 1500 },
  { date: '2026-03-02', income: 2500, expense: 800 },
  { date: '2026-03-03', income: 1800, expense: 1200 },
  { date: '2026-03-04', income: 4200, expense: 900 },
  { date: '2026-03-05', income: 1500, expense: 2000 },
  { date: '2026-03-06', income: 3800, expense: 1100 },
  { date: '2026-03-07', income: 2200, expense: 1400 },
  // ... 30 dias
];

export const mockReceivables = [
  {
    id: 1,
    description: 'Venda #1234',
    client: 'João Silva',
    amount: 1200,
    dueDate: '2026-03-20',
    status: 'pending',
    category: 'Vendas'
  },
  {
    id: 2,
    description: 'Serviço de Consultoria',
    client: 'Maria Santos',
    amount: 800,
    dueDate: '2026-03-18',
    status: 'paid',
    paidDate: '2026-03-15',
    category: 'Serviços'
  },
  {
    id: 3,
    description: 'Projeto Website',
    client: 'Empresa ABC Ltda',
    amount: 5000,
    dueDate: '2026-03-10',
    status: 'overdue',
    category: 'Serviços'
  },
  {
    id: 4,
    description: 'Mensalidade - Março',
    client: 'Cliente Recorrente',
    amount: 350,
    dueDate: '2026-03-25',
    status: 'pending',
    category: 'Assinatura'
  },
  {
    id: 5,
    description: 'Venda Produtos',
    client: 'Carlos Mendes',
    amount: 950,
    dueDate: '2026-03-22',
    status: 'pending',
    category: 'Vendas'
  }
];

export const mockPayables = [
  {
    id: 1,
    description: 'Aluguel Escritório',
    supplier: 'Imobiliária Central',
    amount: 2500,
    dueDate: '2026-03-12',
    category: 'Aluguel',
    status: 'pending'
  },
  {
    id: 2,
    description: 'Energia Elétrica',
    supplier: 'CEMIG',
    amount: 890,
    dueDate: '2026-03-15',
    category: 'Serviços',
    status: 'pending'
  },
  {
    id: 3,
    description: 'Internet Empresarial',
    supplier: 'Vivo Empresas',
    amount: 299,
    dueDate: '2026-03-20',
    category: 'Serviços',
    status: 'paid',
    paidDate: '2026-03-18'
  },
  {
    id: 4,
    description: 'Material de Escritório',
    supplier: 'Papelaria XYZ',
    amount: 450,
    dueDate: '2026-03-10',
    category: 'Compras',
    status: 'overdue'
  },
  {
    id: 5,
    description: 'Fornecedor Produtos',
    supplier: 'Distribuidora ABC',
    amount: 1500,
    dueDate: '2026-03-25',
    category: 'Fornecedor',
    status: 'pending'
  }
];

export const mockUpcomingBills = [
  {
    id: 1,
    type: 'expense',
    description: 'Aluguel Escritório',
    category: 'Imóvel',
    amount: 2500,
    dueIn: '2 dias',
    isUrgent: true
  },
  {
    id: 2,
    type: 'income',
    description: 'ABC Ltda',
    category: 'Venda #1234',
    amount: 3400,
    dueIn: '3 dias',
    isUrgent: false
  },
  {
    id: 3,
    type: 'expense',
    description: 'Fornecedor XYZ',
    category: 'Compra de materiais',
    amount: 890,
    dueIn: '5 dias',
    isUrgent: false
  }
];

export const mockCategories = {
  income: [
    { id: 1, name: 'Vendas', color: '#86cb92', icon: 'ShoppingBag' },
    { id: 2, name: 'Serviços', color: '#3b82f6', icon: 'Briefcase' },
    { id: 3, name: 'Consultoria', color: '#8b5cf6', icon: 'Users' },
    { id: 4, name: 'Outros', color: '#627271', icon: 'MoreHorizontal' }
  ],
  expense: [
    { id: 1, name: 'Aluguel', color: '#ef4444', icon: 'Home' },
    { id: 2, name: 'Fornecedores', color: '#f97316', icon: 'Package' },
    { id: 3, name: 'Serviços', color: '#3b82f6', icon: 'Zap' },
    { id: 4, name: 'Funcionários', color: '#8b5cf6', icon: 'Users' },
    { id: 5, name: 'Impostos', color: '#dc2626', icon: 'FileText' },
    { id: 6, name: 'Marketing', color: '#ec4899', icon: 'Megaphone' }
  ]
};
```

---

## 5. Interações e Estados

### 5.1 Estados de Loading

**Dashboard:**
- Cards: Skeleton com pulse animation
- Gráfico: Skeleton com altura fixa
- Lista: 3 items skeleton

**Tabelas:**
- Header visível com opacidade reduzida
- 5 linhas skeleton
- Texto cinza animado

**Modais:**
- Spinner no botão de submit
- Overlay de loading (opcional)

### 5.2 Estados de Erro

**Tabelas:**
- Toast de erro na parte inferior
- Botão "Tentar novamente"

**Formulários:**
- Borda vermelha em campos inválidos
- Mensagem de erro abaixo do campo
- Ícone de alerta

### 5.3 Transições

| Elemento | Transição | Duração |
|----------|-----------|---------|
| Cards | hover:shadow-md | 200ms |
| Botões | hover:bg | 150ms |
| Modais | fade-in + scale | 200ms |
| Tabela rows | hover:bg | 150ms |
| Toast | slide-in | 300ms |

### 5.4 Hover/Focus Effects

**Cards de Métricas:**
- Hover: shadow-md
- Transform: translateY(-2px)

**Botões:**
- Hover: brightness ou cor mais escura
- Focus: ring-2 ring-uniq-accent

**Tabela:**
- Row hover: bg-gray-50
- Ações: opacity-0 → opacity-100 no hover da row

---

## 6. Design System Aplicado

### 6.1 Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal |
| `--bg-card` | `#ffffff` | Fundo de cards |
| `--sidebar-bg` | `#1f2937` | Fundo da sidebar |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--btn-primary-hover` | `#1f2937` | Hover primário |
| `--accent` | `#86cb92` | Destaques, receitas |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário |
| `--border` | `#e5e7eb` | Bordas |
| `--status-income` | `#86cb92` | Receita |
| `--status-expense` | `#ef4444` | Despesa |
| `--status-pending` | `#f59e0b` | Pendente |
| `--status-paid` | `#22c55e` | Pago |
| `--status-overdue` | `#dc2626` | Vencido |

### 6.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px (text-2xl) | 700 (bold) | `#1f2937` |
| Subtítulo | Poppins | 14px (text-sm) | 400 | `#627271` |
| Card Título | Poppins | 14px (text-sm) | 500 | `#627271` |
| Card Valor | Poppins | 24px (text-2xl) | 700 | `#1f2937` |
| Card Valor Positivo | Poppins | 24px (text-2xl) | 700 | `#86cb92` |
| Card Valor Negativo | Poppins | 24px (text-2xl) | 700 | `#ef4444` |
| Body | Poppins | 14px (text-sm) | 400 | `#1f2937` |
| Tabela Header | Poppins | 12px (text-xs) | 500 | `#627271` |
| Badge | Poppins | 12px (text-xs) | 500 | Variável |

### 6.3 Espaçamentos

| Elemento | Valor Tailwind |
|----------|----------------|
| Container padding | `p-6` |
| Card padding | `p-5` |
| Card gap | `gap-4` |
| Grid gap métricas | `gap-4` |
| Section margin | `mb-6` |
| Button padding | `px-4 py-2` |
| Input padding | `px-3 py-2` |
| Tabela cell padding | `px-4 py-3` |

### 6.4 Componentes Reutilizáveis

**FinanceCard (Card de Métrica):**
```typescript
interface FinanceCardProps {
  title: string;
  value: number;
  currency?: boolean;
  icon: React.ComponentType;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  subtitle?: string;
  alert?: string;
}
```

**StatusBadge:**
```typescript
interface StatusBadgeProps {
  status: 'pending' | 'paid' | 'overdue' | 'scheduled';
  label?: string;
}
```

**TransactionTable:**
```typescript
interface TransactionTableProps {
  data: Transaction[];
  type: 'receivable' | 'payable';
  onReceive?: (id: number) => void;
  onPay?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}
```

---

## 7. Critérios de Aceitação

### 7.1 Checklist de Telas

#### Dashboard Financeiro
- [ ] FIN-DASH-01: Cards principais visíveis (Saldo, a receber, a pagar, fluxo)
- [ ] FIN-DASH-02: Gráfico de fluxo renderizando com dados mock
- [ ] FIN-DASH-03: Lista de contas próximas do vencimento (7 dias)
- [ ] FIN-DASH-04: Botões de acesso rápido funcionando (abrem modais)

#### Contas a Receber
- [ ] REC-01: Tabela lista todas as contas com colunas completas
- [ ] REC-02: Filtros funcionando (status, data, cliente)
- [ ] REC-03: Marcar como recebido abre modal com data de recebimento
- [ ] REC-04: Modal de cadastro rápido funcional
- [ ] REC-05: Empty state exibido quando não há dados

#### Contas a Pagar
- [ ] PAY-01: Tabela lista todas as contas com colunas completas
- [ ] PAY-02: Filtros funcionando (status, categoria, fornecedor)
- [ ] PAY-03: Marcar como pago abre modal com data de pagamento
- [ ] PAY-04: Modal de cadastro rápido funcional
- [ ] PAY-05: Categorias visíveis com ícones/tags

#### Fluxo de Caixa
- [ ] CASH-01: Calendário mensal renderizando com dados
- [ ] CASH-02: Saldo acumulado exibido
- [ ] CASH-03: Projeção para próximos 30 dias
- [ ] CASH-04: Botões de exportar (mock)

### 7.2 Checklist de Design

- [ ] Cores semânticas aplicadas (verde=entrada, vermelho=saída)
- [ ] Status badges com cores corretas
- [ ] Layout responsivo (mobile, tablet, desktop)
- [ ] Estados de loading implementados (skeletons)
- [ ] Estados de empty implementados
- [ ] Hover effects em cards e tabela
- [ ] Modais com animações suaves
- [ ] Tipografia consistente
- [ ] Ícones do Lucide React
- [ ] Componentes do Design System reutilizados

### 7.3 Checklist Técnico

- [ ] Mock data estruturado e tipado
- [ ] Componentes funcionais com TypeScript
- [ ] Props tipadas corretamente
- [ ] Gráfico renderizando (Recharts)
- [ ] Filtros aplicando no mock data
- [ ] Modais abrindo/fechando corretamente
- [ ] Formulários com validação visual
- [ ] Toast notifications funcionando
- [ ] Navegação entre telas funcionando
- [ ] Responsive design testado

---

## 8. Dependências

### 8.1 Dependências Existentes

```json
{
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-checkbox": "^1.3.3",
  "lucide-react": "^0.400.0",
  "recharts": "^2.x",
  "date-fns": "^3.x"
}
```

### 8.2 Instalação de Novas Dependências

```bash
# Gráficos
npm install recharts

# Datas
npm install date-fns
```

### 8.3 Componentes do Design System a Reutilizar

| Componente | Arquivo | Uso |
|------------|---------|-----|
| Button | `components/ui/button.tsx` | Ações |
| Card | `components/ui/card.tsx` | Containers |
| Badge | `components/ui/badge.tsx` | Status |
| Table | `components/ui/table.tsx` | Listas |
| Dialog | `components/ui/dialog.tsx` | Modais |
| Input | `components/ui/input.tsx` | Formulários |
| Select | `components/ui/select.tsx` | Filtros |
| Tabs | `components/ui/tabs.tsx` | Navegação |
| Checkbox | `components/ui/checkbox.tsx` | Seleção |
| Toast | `components/ui/toast.tsx` | Notificações |
| Skeleton | `components/ui/skeleton.tsx` | Loading |

---

## 9. Notas de Implementação

### 9.1 Estrutura de Arquivos

```
📁 app/
├── 📁 financeiro/
│   ├── page.tsx                 # Dashboard Financeiro
│   ├── 📁 receber/
│   │   └── page.tsx             # Contas a Receber
│   ├── 📁 pagar/
│   │   └── page.tsx             # Contas a Pagar
│   └── 📁 fluxo/
│       └── page.tsx             # Fluxo de Caixa

📁 components/
├── 📁 finance/
│   ├── 📁 dashboard/
│   │   ├── finance-card.tsx     # Card de métrica
│   │   ├── cash-flow-chart.tsx  # Gráfico de fluxo
│   │   └── upcoming-bills.tsx   # Contas próximas
│   ├── 📁 receivables/
│   │   ├── receivables-table.tsx
│   │   ├── receivable-form.tsx
│   │   └── receive-modal.tsx
│   ├── 📁 payables/
│   │   ├── payables-table.tsx
│   │   ├── payable-form.tsx
│   │   └── pay-modal.tsx
│   └── 📁 shared/
│       ├── status-badge.tsx
│       ├── category-badge.tsx
│       └── transaction-filters.tsx

📁 lib/
├── 📁 mocks/
│   └── finance.ts              # Mock data completo
├── 📁 hooks/
│   └── use-finance.ts          # Hook de dados (mock)
└── 📁 utils/
    └── currency.ts             # Formatação de moeda
```

### 9.2 Padrões de Código

**Formatação de Moeda:**
```typescript
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
```

**Formatação de Data:**
```typescript
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: string): string => {
  return format(parseISO(date), 'dd/MM/yyyy', { locale: ptBR });
};
```

**Status Colors:**
```typescript
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-green-100 text-green-700',
  overdue: 'bg-red-100 text-red-700',
  scheduled: 'bg-blue-100 text-blue-700'
};
```

### 9.3 Dicas para o Implementador

1. **Dashboard:**
   - Usar componente MetricCard existente como base
   - Recharts LineChart para o gráfico de fluxo
   - Grid responsivo: 1 coluna mobile, 2 tablet, 4 desktop

2. **Tabelas:**
   - Reutilizar componente Table do shadcn
   - Adicionar hover effects nas rows
   - Botões de ação aparecem no hover

3. **Modais:**
   - Usar Dialog do shadcn como base
   - Formulários com validação visual simples
   - Focus no primeiro input ao abrir

4. **Gráficos:**
   - Configurar cores: receita `#86cb92`, despesa `#ef4444`
   - Tooltip customizado com formatação de moeda
   - Legendas explicativas

5. **Responsividade:**
   - Sidebar colapsa em mobile
   - Tabelas com scroll horizontal em telas pequenas
   - Cards empilhados em mobile

6. **Mock Data:**
   - Criar dados variados (status diferentes)
   - Incluir casos de edge (valores altos, datas próximas)
   - Datas dinâmicas baseadas na data atual

---

## 10. Referências

### 10.1 Documentação do Projeto
- [PRD Sprint 01 - Design System](./PRD_SPRINT_01_Design_System.md)
- [PRD Sprint 04 - CRM UI](./PRD_SPRINT_04_CRM_UI.md)
- [ROADMAP Completo](../docs/ROADMAP.md)
- [TRACKING.md](../tracking/TRACKING.md)

### 10.2 Documentação do Módulo Financeiro
- [Módulo Financeiro - UI](../docs/ui/modulo-04-financeiro.md)
- [Módulo Financeiro - Contas Bancárias](../docs/ui/modulo-04-financeiro-contas-bancarias.md)
- [Módulo Financeiro - Relatórios](../docs/ui/modulo-04-financeiro-relatorio-fluxo.md)

### 10.3 Bibliotecas e Recursos
- [Recharts Documentation](https://recharts.org/en-US)
- [date-fns Documentation](https://date-fns.org/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Lucide Icons](https://lucide.dev/icons/)

### 10.4 Inspirações UI
- [Conta Azul](https://contaazul.com/) - Gestão financeira
- [Omie](https://omie.com.br/) - Contas a pagar/receber
- [Agilize](https://agilize.com.br/) - Fluxo de caixa
- [QuickBooks](https://quickbooks.intuit.com/) - Dashboard financeiro

---

**Documento gerado em:** 20/03/2026  
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
