# Módulo 06: Vendas - Devolução/Estorno - UI/UX Documentation

## 📋 Metadados do Documento

| Campo | Valor |
|-------|-------|
| **Módulo** | Vendas & PDV - Devolução/Estorno |
| **Código** | MOD-VEN-DEV-001 |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Prioridade** | MUST HAVE (MVP) |
| **Autor** | UNIQ Design Team |
| **Data de Criação** | 2024-03-12 |
| **Última Atualização** | 2024-03-12 |
| **Stack** | Next.js 14 + React 18 + TypeScript + Tailwind CSS + Lucide React |

---

## 🎨 Design System

### Paleta de Cores UNIQ

```css
:root {
  /* Cores Primárias */
  --jet-black: #1f2937;        /* Sidebar, textos principais */
  --dark-slate: #3e5653;       /* Botões primários, ações */
  --dim-grey: #627271;         /* Textos secundários, ícones */
  
  /* Cores de Apoio */
  --platinum: #efefef;         /* Background principal */
  --emerald: #86cb92;          /* Sucesso */
  --white: #ffffff;            /* Cards, superfícies */
  
  /* Cores de Status - Devolução */
  --warning: #f59e0b;          /* Alerta, pendente aprovação */
  --error: #ef4444;            /* Rejeitado, cancelado */
  --info: #3b82f6;             /* Em análise */
  
  /* Cores Específicas Devolução */
  --devolucao-pendente: #f59e0b;
  --devolucao-aprovada: #86cb92;
  --devolucao-rejeitada: #ef4444;
  --devolucao-parcial: #3b82f6;
  
  /* Bordas */
  --border: #e5e7eb;
  --border-light: #f3f4f6;
}
```

### Ícones (Lucide React)

```typescript
import {
  RotateCcw,
  Undo2,
  AlertTriangle,
  Check,
  X,
  Clock,
  FileText,
  Search,
  Package,
  DollarSign,
  CreditCard,
  Banknote,
  Smartphone,
  Printer,
  Eye,
  ChevronRight,
  Calendar,
  User,
  Shield,
  MessageSquare,
  History,
  ArrowRight,
  Percent,
  Trash2,
  RefreshCw
} from 'lucide-react';
```

---

## 🖥️ Tela 1: Iniciar Devolução

### URL
`/vendas/devolucao/nova`

### Descrição
Interface para iniciar o processo de devolução, buscando a venda original e selecionando os itens a serem devolvidos.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER (64px)                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ↩️ Nova Devolução/Estorno                                          │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ PASSO 1: LOCALIZAR VENDA                                           │   │
│  │                                                                    │   │
│  │  Informe o número da venda ou busque pelo cliente:                │   │
│  │                                                                    │   │
│  │  ┌────────────────────────────────────────────────────────────┐   │   │
│  │  │ 🔍 Nº da Venda ou CPF/CNPJ do Cliente                       │   │   │
│  │  │ [1234                                    ] [Buscar Venda]   │   │   │
│  │  └────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  Ou selecione uma venda recente:                                  │   │
│  │                                                                    │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐      │   │
│  │  │ #1024      │ │ #1023      │ │ #1022      │ │ #1021      │      │   │
│  │  │ R$ 156,90  │ │ R$ 89,50   │ │ R$ 45,00   │ │ R$ 234,00  │      │   │
│  │  │ 12/03 14:30│ │ 12/03 11:15│ │ 11/03 16:45│ │ 11/03 10:20│      │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ PASSO 2: SELECIONAR ITENS                                          │   │
│  │                                                                    │   │
│  │  Venda #1024 - João Silva - 12/03/2024 às 14:30                   │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ ☑️ Produto                    Qtd   Devolver   Preço   Total │   │   │
│  │  │ ─────────────────────────────────────────────────────────── │   │   │
│  │  │ ☑️ Arroz Integral 5kg          2   [2    ]   R$29,90  R$59,80│   │   │
│  │  │ ☐ Óleo de Soja 900ml           1   [0    ]   R$9,90   R$ 0,00│   │   │
│  │  │ ☑️ Café Pilão 500g             1   [1    ]   R$19,90  R$19,90│   │   │
│  │  │ ☐ Feijão Carioca 1kg           3   [0    ]   R$8,50   R$ 0,00│   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  Valor total a devolver: R$ 79,70                                 │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ PASSO 3: MOTIVO E CONFIRMAÇÃO                                      │   │
│  │                                                                    │   │
│  │  Motivo da devolução:                                             │   │
│  │  ┌────────────────────────────────────────────────────────────┐   │   │
│  │  │ [Produto com defeito -------------------------------- ▼]  │   │   │
│  │  │  • Produto com defeito                                      │   │   │
│  │  │  • Produto diferente do pedido                              │   │   │
│  │  │  • Arrependimento/Desistência                               │   │   │
│  │  │  • Erro no pedido (operador)                                │   │   │
│  │  │  • Outros                                                   │   │   │
│  │  └────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  Observações:                                                     │   │
│  │  ┌────────────────────────────────────────────────────────────┐   │   │
│  │  │ Cliente relatou que o arroz estava com insetos            │   │   │
│  │  └────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  Tipo de estorno:                                                 │   │
│  │  (•) Dinheiro    ( ) Crédito em conta    ( ) Trocar produto     │   │
│  │                                                                    │   │
│  │  ⚠️ Esta devolução exige aprovação de supervisor                 │   │
│  │      (valor acima de R$ 50,00 ou fora do prazo)                 │   │
│  │                                                                    │   │
│  │  [  ↩️ SOLICITAR DEVOLUÇÃO  ]                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 2: Fluxo de Aprovação

### URL
`/vendas/devolucao/aprovacao`

### Descrição
Interface para supervisores analisarem e aprovarem/rejeitarem solicitações de devolução pendentes.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ✓ Aprovação de Devoluções           [📋 Minha Fila: 3 pendentes]       │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ FILTROS DE DEVOLUÇÕES                                              │   │
│  │ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │   │
│  │ │ 📅 De:    │ │ 📅 Até:   │ │ 🚦 Status │ │ 🔍 Buscar │        │   │
│  │ │ 01/03/2024│ │12/03/2024 │ │[Pendente▼]│ │[        ] │        │   │
│  │ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ DEVOLUÇÕES PENDENTES                                               │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ 🟡 DEV-2024-0015                                           │   │   │
│  │  │                                                              │   │   │
│  │  │  Venda: #1024    Cliente: João Silva    Data: 12/03 14:30   │   │   │
│  │  │  Solicitante: Maria (Operador)    Há 15 minutos             │   │   │
│  │  │                                                              │   │   │
│  │  │  Itens:                                                      │   │   │
│  │  │  • Arroz Integral 5kg - Qtd: 2 - R$ 59,80                   │   │   │
│  │  │  • Café Pilão 500g - Qtd: 1 - R$ 19,90                      │   │   │
│  │  │                                                              │   │   │
│  │  │  Motivo: Produto com defeito                                 │   │   │
│  │  │  Observação: Cliente relatou que o arroz estava com insetos │   │   │
│  │  │                                                              │   │   │
│  │  │  Valor: R$ 79,70   Estorno: Dinheiro                        │   │   │
│  │  │                                                              │   │   │
│  │  │  [✓ Aprovar]  [✗ Rejeitar]  [👁️ Ver Venda]                │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ 🟡 DEV-2024-0014                                           │   │   │
│  │  │                                                              │   │   │
│  │  │  Venda: #1020    Cliente: Ana Costa    Data: 10/03 17:00    │   │   │
│  │  │  Solicitante: José (Operador)    Há 1 hora                  │   │   │
│  │  │                                                              │   │   │
│  │  │  ...                                                         │   │   │
│  │  │                                                              │   │   │
│  │  │  [✓ Aprovar]  [✗ Rejeitar]  [👁️ Ver Venda]                │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 3: Modal de Aprovação

### URL
Modal

### Descrição
Modal para o supervisor aprovar ou rejeitar a devolução, com possibilidade de ajustar valores ou itens.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ ✓ ANÁLISE DE DEVOLUÇÃO                                             │    │
│  │ DEV-2024-0015                                                      │    │
│  │                                                                    │    │
│  │  ┌─────────────────────────────────────────────────────────────┐   │    │
│  │  │ DADOS DA SOLICITAÇÃO                                        │   │    │
│  │  │                                                              │   │    │
│  │  │  Venda Original: #1024                                       │   │    │
│  │  │  Cliente: João Silva | CPF: 123.456.789-00                   │   │    │
│  │  │  Data da venda: 12/03/2024 às 14:30                         │   │    │
│  │  │  Data da solicitação: 12/03/2024 às 16:45                   │   │    │
│  │  │  Solicitante: Maria (Operador)                              │   │    │
│  │  └─────────────────────────────────────────────────────────────┘   │    │
│  │                                                                    │    │
│  │  ┌─────────────────────────────────────────────────────────────┐   │    │
│  │  │ ITENS SOLICITADOS                                           │   │    │
│  │  │                                                              │   │    │
│  │  │  ☑️ Arroz Integral 5kg    Qtd: 2    Valor: R$ 59,80        │   │    │
│  │  │  ☑️ Café Pilão 500g       Qtd: 1    Valor: R$ 19,90        │   │    │
│  │  │                                                              │   │    │
│  │  │  Valor total solicitado: R$ 79,70                           │   │    │
│  │  └─────────────────────────────────────────────────────────────┘   │    │
│  │                                                                    │    │
│  │  ┌─────────────────────────────────────────────────────────────┐   │    │
│  │  │ DECISÃO DO SUPERVISOR                                       │   │    │
│  │  │                                                              │   │    │
│  │  │  Aprovar:  (•) Total    ( ) Parcial    ( ) Rejeitar         │   │    │
│  │  │                                                              │   │    │
│  │  │  Se aprovado parcial, informe o valor aprovado:             │   │    │
│  │  │  [R$ 79,70                                    ]              │   │    │
│  │  │                                                              │   │    │
│  │  │  Observação interna (não aparece para o cliente):           │   │    │
│  │  │  ┌────────────────────────────────────────────────────────┐ │   │    │
│  │  │  │                                                        │ │   │    │
│  │  │  └────────────────────────────────────────────────────────┘ │   │    │
│  │  │                                                              │   │    │
│  │  │  [✓ CONFIRMAR APROVAÇÃO]  [✗ REJEITAR]  [Cancelar]         │   │    │
│  │  └─────────────────────────────────────────────────────────────┘   │    │
│  │                                                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 4: Histórico de Devoluções

### URL
`/vendas/devolucao/historico`

### Descrição
Lista completa de todas as devoluções realizadas, com filtros e status de cada solicitação.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 📋 Histórico de Devoluções                                           │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ FILTROS                                                            │   │
│  │ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ [🔍]   │   │
│  │ │ 📅 De:    │ │ 📅 Até:   │ │ 🚦 Status │ │ 👤 Oper.  │ [Limpar]│   │
│  │ │01/03/2024 │ │31/03/2024 │ │ [Todas ▼] │ │ [Todos ▼] │        │   │
│  │ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ RESUMO DO PERÍODO                                                  │   │
│  │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │   │
│  │ │ 🟡 Pendentes │ │ 🟢 Aprovadas │ │ 🔴 Rejeitadas│ │ 💰 Total     │ │   │
│  │ │      3       │ │     24       │ │      2       │ │ R$ 3.450,00  │ │   │
│  │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ TABELA DE DEVOLUÇÕES                                               │   │
│  │                                                                    │   │
│  │  Nº        Data       Cliente      Valor    Status      Ações     │   │
│  │ ─────────────────────────────────────────────────────────────────  │   │
│  │  DEV-015  12/03 16:45 João Silva   R$ 79,70 🟡 Pendente  [👁️]     │   │
│  │  DEV-014  12/03 15:30 Ana Costa    R$ 45,00 🟢 Aprovada  [👁️][🖨️] │   │
│  │  DEV-013  11/03 11:20 Pedro Santos R$120,00 🟢 Aprovada  [👁️][🖨️] │   │
│  │  DEV-012  10/03 17:00 Maria Souza  R$ 89,50 🔴 Rejeitada [👁️]     │   │
│  │  DEV-011  10/03 14:15 Carlos Lima  R$156,00 🟢 Aprovada  [👁️][🖨️] │   │
│  │  ...                                                               │   │
│  │                                                                    │   │
│  │                                            [<] 1 2 3 ... 5 [>]     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 5: Detalhes da Devolução

### URL
`/vendas/devolucao/:id`

### Descrição
Visualização completa de uma devolução específica com timeline de aprovação e todos os detalhes.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ← DEV-2024-0015                    [🖨️ Imprimir] [📄 PDF]              │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STATUS ATUAL                                                       │   │
│  │                                                                    │   │
│  │  🟡 DEVOLUÇÃO PENDENTE DE APROVAÇÃO                               │   │
│  │                                                                    │   │
│  │  Solicitada em 12/03/2024 às 16:45 por Maria (Operador)           │   │
│  │  Aguardando análise do supervisor                                  │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ TIMELINE DE APROVAÇÃO                                              │   │
│  │                                                                    │   │
│  │  🟢 12/03 14:30 ── Venda #1024 realizada                          │   │
│  │       R$ 156,90 - João Silva                                       │   │
│  │                                                                    │   │
│  │  🟡 12/03 16:45 ── Solicitação de devolução criada                │   │
│  │       Maria (Operador) - Valor: R$ 79,70                          │   │
│  │       Motivo: Produto com defeito                                  │   │
│  │                                                                    │   │
│  │  ⚪ 12/03 16:45 ── Aguardando aprovação do supervisor             │   │
│  │                                                                    │   │
│  │  ⏳ Estorno: Dinheiro                                              │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ITENS DA DEVOLUÇÃO                                                 │   │
│  │                                                                    │   │
│  │  Produto                    Qtd Original  Qtd Devolvida   Valor    │   │
│  │ ─────────────────────────────────────────────────────────────────  │   │
│  │  Arroz Integral 5kg              2             2         R$ 59,80 │   │
│  │  Café Pilão 500g                 1             1         R$ 19,90 │   │
│  │                                                                    │   │
│  │                                          Total:        R$ 79,70   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ DADOS DA VENDA ORIGINAL                                            │   │
│  │                                                                    │   │
│  │  Nº: #1024    Data: 12/03/2024 às 14:30    Total: R$ 156,90       │   │
│  │  Cliente: João Silva                                               │   │
│  │  [Ver venda completa →]                                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Componentes Detalhados

### Componente: Card de Devolução

```tsx
interface DevolucaoCardProps {
  devolucao: {
    id: string;
    numero: string;
    venda: {
      id: string;
      numero: string;
      cliente: string;
      data: string;
    };
    solicitante: string;
    dataSolicitacao: string;
    valor: number;
    status: 'pendente' | 'aprovada' | 'rejeitada' | 'parcial';
    itens: Array<{
      produto: string;
      quantidade: number;
      valor: number;
    }>;
  };
  onApprove: () => void;
  onReject: () => void;
  onView: () => void;
}

export function DevolucaoCard({ devolucao, onApprove, onReject, onView }: DevolucaoCardProps) {
  const statusConfig = {
    pendente: { color: 'bg-amber-100 text-amber-700', label: 'Pendente', icon: Clock },
    aprovada: { color: 'bg-emerald-100 text-emerald-700', label: 'Aprovada', icon: Check },
    rejeitada: { color: 'bg-red-100 text-red-700', label: 'Rejeitada', icon: X },
    parcial: { color: 'bg-blue-100 text-blue-700', label: 'Parcial', icon: Percent }
  };

  const config = statusConfig[devolucao.status];
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${config.color}`}>
            <Icon className="w-3.5 h-3.5" />
            {config.label}
          </div>
          <span className="text-sm font-medium text-[#1f2937]">{devolucao.numero}</span>
        </div>
        <span className="text-xs text-[#627271]">{devolucao.dataSolicitacao}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-[#627271] mb-1">Venda Original</p>
          <p className="text-sm font-medium text-[#1f2937]">
            #{devolucao.venda.numero} - {devolucao.venda.cliente}
          </p>
          <p className="text-xs text-[#627271]">{devolucao.venda.data}</p>
        </div>
        <div>
          <p className="text-xs text-[#627271] mb-1">Solicitante</p>
          <p className="text-sm font-medium text-[#1f2937]">{devolucao.solicitante}</p>
        </div>
      </div>

      <div className="border-t border-[#e5e7eb] pt-4 mb-4">
        <p className="text-xs text-[#627271] mb-2">Itens ({devolucao.itens.length}):</p>
        <div className="space-y-1">
          {devolucao.itens.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-[#1f2937]">{item.produto}</span>
              <span className="text-[#627271]">{item.quantidade}x {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
        <p className="text-lg font-bold text-[#1f2937]">
          {devolucao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        
        <div className="flex gap-2">
          {devolucao.status === 'pendente' ? (
            <>
              <button
                onClick={onReject}
                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Rejeitar
              </button>
              <button
                onClick={onApprove}
                className="px-4 py-2 bg-[#86cb92] hover:bg-[#86cb92]/90 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Aprovar
              </button>
            </>
          ) : (
            <button
              onClick={onView}
              className="px-4 py-2 bg-[#efefef] hover:bg-[#e5e7eb] text-[#627271] text-sm font-medium rounded-lg transition-colors"
            >
              Ver Detalhes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Componente: Timeline de Aprovação

```tsx
interface TimelineItem {
  status: 'completed' | 'current' | 'pending';
  date: string;
  title: string;
  description: string;
}

interface DevolucaoTimelineProps {
  items: TimelineItem[];
}

export function DevolucaoTimeline({ items }: DevolucaoTimelineProps) {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4 pb-8 last:pb-0">
          <div className="flex flex-col items-center">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 
                item.status === 'current' ? 'bg-amber-100 text-amber-600' : 
                'bg-[#efefef] text-[#627271]'}
            `}>
              {item.status === 'completed' ? (
                <Check className="w-5 h-5" />
              ) : item.status === 'current' ? (
                <Clock className="w-5 h-5" />
              ) : (
                <div className="w-3 h-3 bg-[#627271] rounded-full" />
              )}
            </div>
            {index < items.length - 1 && (
              <div className={`
                w-0.5 flex-1 mt-2
                ${item.status === 'completed' ? 'bg-emerald-200' : 'bg-[#e5e7eb]'}
              `} />
            )}
          </div>
          
          <div className="flex-1 pb-4">
            <p className="text-xs text-[#627271] mb-1">{item.date}</p>
            <p className="font-medium text-[#1f2937] mb-1">{item.title}</p>
            <p className="text-sm text-[#627271]">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Componente: Seleção de Itens para Devolução

```tsx
interface ItemDevolucao {
  id: string;
  nome: string;
  quantidadeOriginal: number;
  quantidadeDevolver: number;
  precoUnitario: number;
  selecionado: boolean;
}

interface ItensDevolucaoProps {
  itens: ItemDevolucao[];
  onItemChange: (id: string, changes: Partial<ItemDevolucao>) => void;
}

export function ItensDevolucao({ itens, onItemChange }: ItensDevolucaoProps) {
  const totalDevolucao = itens
    .filter(i => i.selecionado)
    .reduce((sum, i) => sum + (i.quantidadeDevolver * i.precoUnitario), 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#efefef]/50">
        <h3 className="font-semibold text-[#1f2937]">Selecionar Itens para Devolução</h3>
      </div>
      
      <div className="divide-y divide-[#e5e7eb]">
        {itens.map((item) => (
          <div key={item.id} className="p-4 flex items-center gap-4">
            <input
              type="checkbox"
              checked={item.selecionado}
              onChange={(e) => onItemChange(item.id, { selecionado: e.target.checked })}
              className="w-5 h-5 rounded border-[#e5e7eb] text-[#86cb92] focus:ring-[#86cb92]"
            />
            
            <div className="flex-1">
              <p className="font-medium text-[#1f2937]">{item.nome}</p>
              <p className="text-sm text-[#627271]">
                Qtd original: {item.quantidadeOriginal} × {item.precoUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            
            {item.selecionado && (
              <div className="flex items-center gap-3">
                <label className="text-sm text-[#627271]">Devolver:</label>
                <input
                  type="number"
                  min={1}
                  max={item.quantidadeOriginal}
                  value={item.quantidadeDevolver}
                  onChange={(e) => onItemChange(item.id, { 
                    quantidadeDevolver: parseInt(e.target.value) || 0 
                  })}
                  className="w-20 px-3 py-2 bg-[#efefef] border border-transparent rounded-lg text-center text-[#1f2937] focus:outline-none focus:border-[#86cb92]"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 bg-[#efefef]/50 border-t border-[#e5e7eb]">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#627271]">
            {itens.filter(i => i.selecionado).length} de {itens.length} itens selecionados
          </span>
          <p className="text-xl font-bold text-[#1f2937]">
            Total: {totalDevolucao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## 📋 Formulários

### Formulário: Solicitação de Devolução

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| `venda_id` | Text | Sim | UUID válido | ID da venda original |
| `itens` | Array | Sim | Min 1 item | Itens a serem devolvidos |
| `itens[].produto_id` | Text | Sim | UUID válido | ID do produto |
| `itens[].quantidade` | Number | Sim | `1 <= qtd <= original` | Quantidade a devolver |
| `motivo` | Select | Sim | Not null | Motivo da devolução |
| `observacoes` | Textarea | Não | Max 500 chars | Detalhes adicionais |
| `tipo_estorno` | Select | Sim | Not null | Forma de reembolso |
| `operador_id` | Text | Auto | - | ID do operador logado |
| `supervisor_id` | Text | Condicional | Required if `> R$ 50` | Autorização |

### Opções de Motivo

| Valor | Label | Descrição |
|-------|-------|-----------|
| `defeito` | Produto com defeito | Produto danificado ou vencido |
| `diferente` | Produto diferente do pedido | Entrega errada |
| `arrependimento` | Arrependimento/Desistência | Cliente desistiu |
| `erro_operador` | Erro no pedido (operador) | Erro de digitação |
| `outros` | Outros | Especificar em observações |

### Opções de Tipo de Estorno

| Valor | Label | Condições |
|-------|-------|-----------|
| `dinheiro` | Dinheiro | Apenas se venda foi em dinheiro |
| `credito` | Crédito em conta | Cliente cadastrado |
| `trocar` | Troca por produto | Disponibilidade em estoque |
| `pix` | Devolução via PIX | Venda em PIX ou cartão |
| `estorno_cartao` | Estorno no cartão | Venda em cartão (3-30 dias) |

---

## 🎭 Estados da Interface

### Estado: Sucesso na Solicitação

```tsx
export function DevolucaoSucesso({ 
  numero, 
  status, 
  onNova, 
  onVer 
}: { 
  numero: string;
  status: 'aprovada' | 'pendente';
  onNova: () => void;
  onVer: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className={`
        w-20 h-20 rounded-full flex items-center justify-center mb-4
        ${status === 'aprovada' ? 'bg-emerald-100' : 'bg-amber-100'}
      `}>
        <Check className={`w-10 h-10 ${
          status === 'aprovada' ? 'text-emerald-600' : 'text-amber-600'
        }`} />
      </div>
      
      <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
        {status === 'aprovada' ? 'Devolução Aprovada!' : 'Solicitação Enviada!'}
      </h3>
      
      <p className="text-sm text-[#627271] mb-2">
        Número: <span className="font-medium text-[#1f2937]">{numero}</span>
      </p>
      
      {status === 'pendente' && (
        <p className="text-sm text-amber-600 mb-6">
          Aguardando aprovação do supervisor
        </p>
      )}
      
      <div className="flex gap-3">
        <button
          onClick={onNova}
          className="px-6 py-3 bg-[#efefef] text-[#627271] rounded-xl font-medium hover:bg-[#e5e7eb] transition-colors"
        >
          Nova Devolução
        </button>
        <button
          onClick={onVer}
          className="px-6 py-3 bg-[#86cb92] text-white rounded-xl font-medium hover:bg-[#86cb92]/90 transition-colors"
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
```

---

## 📜 Regras de Negócio

### RN-DEV-001: Prazo de Devolução
Devoluções devem ser solicitadas em até 7 dias corridos após a data da venda. Após esse prazo, exige aprovação de supervisor.

### RN-DEV-002: Limite para Aprovação
Devoluções com valor superior a R$ 50,00 ou fora do prazo de 7 dias exigem aprovação de supervisor.

### RN-DEV-003: Estado do Produto
Produtos devolvidos por defeito devem ser separados para análise e não retornam ao estoque imediatamente.

### RN-DEV-004: Estorno de Cartão
Estornos em cartão de crédito podem levar 3 a 30 dias úteis para compensação, dependendo da operadora.

### RN-DEV-005: Estoque
Produtos devolvidos retornam ao estoque automaticamente, exceto quando motivo for "defeito".

### RN-DEV-006: Imutabilidade
Uma vez aprovada, a devolução não pode ser cancelada. Erros devem ser corrigidos com nova venda.

### RN-DEV-007: Auditoria
Todas as devoluções são registradas em log de auditoria com IP, timestamp e usuário.

### RN-DEV-008: Comissão
Devoluções aprovadas devem recalcular a comissão do vendedor no período correspondente.

### RN-DEV-009: Cupom Fiscal
Em ambientes com NFC-e, devoluções devem gerar cupom fiscal de devolução separado.

### RN-DEV-010: Cliente
Devoluções só podem ser solicitadas pelo mesmo operador da venda ou supervisor.

---

## ✅ Checklist de Implementação

### Estrutura
- [ ] Criar página `/vendas/devolucao/nova`
- [ ] Criar página `/vendas/devolucao/aprovacao`
- [ ] Criar página `/vendas/devolucao/historico`
- [ ] Criar página `/vendas/devolucao/:id`
- [ ] Implementar modal de aprovação

### Componentes
- [ ] Componente `DevolucaoCard` - Card de devolução
- [ ] Componente `DevolucaoTimeline` - Timeline de status
- [ ] Componente `ItensDevolucao` - Seleção de itens
- [ ] Componente `AprovacaoModal` - Modal de aprovação
- [ ] Componente `MotivoSelect` - Seleção de motivo
- [ ] Componente `TipoEstornoSelect` - Tipo de reembolso

### Integrações
- [ ] API GET `/api/vendas/:id` - Buscar venda original
- [ ] API POST `/api/devolucoes` - Criar devolução
- [ ] API PUT `/api/devolucoes/:id/aprovar` - Aprovar devolução
- [ ] API PUT `/api/devolucoes/:id/rejeitar` - Rejeitar devolução
- [ ] API GET `/api/devolucoes` - Listar devoluções
- [ ] API POST `/api/estoque/devolucao` - Retornar ao estoque

### Estados
- [ ] Estado de busca de venda
- [ ] Estado de seleção de itens
- [ ] Estado de sucesso (aprovada)
- [ ] Estado de sucesso (pendente)
- [ ] Estado de rejeição

### Validações
- [ ] Validação de prazo (7 dias)
- [ ] Validação de valor para aprovação
- [ ] Validação de quantidade (<= original)
- [ ] Validação de estoque para trocas
- [ ] Verificação de permissões

### Testes
- [ ] Teste de devolução total
- [ ] Teste de devolução parcial
- [ ] Teste de fluxo de aprovação
- [ ] Teste de rejeição
- [ ] Teste de estoque
- [ ] Teste de estorno em cartão

---

## 📝 Notas de Implementação

### Performance
- Cache dos dados da venda original por 10 minutos
- Debounce de 500ms na busca de vendas
- Lazy loading do histórico

### UX
- Confirmar antes de sair com devolução em andamento
- Atalho de teclado: F9 para nova devolução
- Feedback visual imediato em ações

### Segurança
- Sempre validar permissões no backend
- Log de todas as aprovações/rejeições
- Sanitizar observações
