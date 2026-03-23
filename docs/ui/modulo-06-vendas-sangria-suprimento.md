# Módulo 06: Vendas - Sangria e Suprimento - UI/UX Documentation

## 📋 Metadados do Documento

| Campo | Valor |
|-------|-------|
| **Módulo** | Vendas & PDV - Sangria e Suprimento |
| **Código** | MOD-VEN-CAIXA-001 |
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
  --emerald: #86cb92;          /* Sucesso, sangria (retirada) */
  --white: #ffffff;            /* Cards, superfícies */
  
  /* Cores de Status */
  --success: #86cb92;
  --warning: #f59e0b;          /* Suprimento (entrada) */
  --error: #ef4444;
  --info: #3b82f6;
  
  /* Bordas */
  --border: #e5e7eb;
  --border-light: #f3f4f6;
}
```

### Tipografia

```css
/* Fonte Principal */
font-family: 'Poppins', sans-serif;

/* Escalas */
--text-xs: 0.75rem;    /* 12px - Badges, tags */
--text-sm: 0.875rem;   /* 14px - Labels, captions */
--text-base: 1rem;     /* 16px - Corpo */
--text-lg: 1.125rem;   /* 18px - Subtítulos */
--text-xl: 1.25rem;    /* 20px - Títulos pequenos */
--text-2xl: 1.5rem;    /* 24px - Títulos médios */
```

### Ícones (Lucide React)

```typescript
import {
  ArrowDownLeft,
  ArrowUpRight,
  DollarSign,
  Lock,
  User,
  FileText,
  Printer,
  History,
  AlertTriangle,
  Check,
  X,
  Calculator,
  Banknote,
  Coins,
  Wallet,
  Shield,
  Eye,
  EyeOff,
  ChevronRight,
  Calendar,
  Clock,
  Search
} from 'lucide-react';
```

---

## 🖥️ Tela 1: Sangria de Caixa (Retirada)

### URL
`/vendas/caixa/sangria`

### Descrição
Interface para retirada de valores do caixa. Requer autenticação de supervisor. Registra motivo da retirada e atualiza saldo em tempo real.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER (64px)                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ↓ Sangria de Caixa                   Caixa: #01 | Operador: José       │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STATUS DO CAIXA                                                    │   │
│  │                                                                    │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │   │
│  │  │ 💰 Saldo     │ │ 💵 Dinheiro  │ │ 💳 Cartão    │ │ 📱 PIX     │ │   │
│  │  │ R$ 2.450,00  │ │ R$ 1.250,00  │ │ R$ 850,00    │ │ R$ 350,00  │ │   │
│  │  └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────┐  ┌────────────────────────────┐ │
│  │ FORMULÁRIO DE SANGRIA                  │  │ HISTÓRICO RECENTE          │ │
│  │                                        │  │                            │ │
│  │  ┌──────────────────────────────────┐  │  │  Últimas Sangrias:         │ │
│  │  │ VALOR DA RETIRADA                │  │  │                            │ │
│  │  │                                  │  │  │  ↓ R$ 200,00    10:30     │ │
│  │  │           R$ [    500,00    ]    │  │  │  Caixa alto               │ │
│  │  │                                  │  │  │                            │ │
│  │  │  [R$ 50] [R$ 100] [R$ 200]       │  │  │  ↓ R$ 150,00    Ontem     │ │
│  │  │  [R$ 500] [R$ 1000] [Outro]      │  │  │  Depósito bancário        │ │
│  │  └──────────────────────────────────┘  │  │                            │ │
│  │                                        │  │  ↓ R$ 300,00    2 dias    │ │
│  │  Motivo da retirada:                   │  │  Pagamento fornecedor     │ │
│  │  ┌──────────────────────────────────┐  │  │                            │ │
│  │  │ [Caixa alto                     ▼]│  │  [Ver histórico completo]  │ │
│  │  │  • Caixa alto                    │  │  │                            │ │
│  │  │  • Pagamento fornecedor          │  │  └────────────────────────────┘ │
│  │  │  • Depósito bancário             │  │                                │
│  │  │  • Outros                        │  │                                │
│  │  └──────────────────────────────────┘  │                                │
│  │                                        │                                │
│  │  Observações (opcional):               │                                │
│  │  ┌──────────────────────────────────┐  │                                │
│  │  │                                  │  │                                │
│  │  │                                  │  │                                │
│  │  └──────────────────────────────────┘  │                                │
│  │                                        │                                │
│  │  ⚠️ Após a sangria, o saldo será:      │                                │
│  │     R$ 1.950,00                        │                                │
│  │                                        │                                │
│  │  [  🔒 CONFIRMAR SANGRIA  ]            │                                │
│  │                                        │                                │
│  └────────────────────────────────────────┘  └────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 2: Suprimento de Caixa (Entrada)

### URL
`/vendas/caixa/suprimento`

### Descrição
Interface para adicionar valores ao caixa. Usado para troco adicional, reforço de caixa ou abertura. Atualiza saldo em tempo real.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER (64px)                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ↑ Suprimento de Caixa                Caixa: #01 | Operador: José       │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ STATUS DO CAIXA                                                    │   │
│  │                                                                    │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │   │
│  │  │ 💰 Saldo     │ │ 💵 Dinheiro  │ │ 💳 Cartão    │ │ 📱 PIX     │ │   │
│  │  │ R$ 245,00    │ │ R$ 45,00     │ │ R$ 150,00    │ │ R$ 50,00   │ │   │
│  │  │ ⚠️ Baixo     │ │              │ │              │ │            │ │   │
│  │  └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌────────────────────────────────────────┐  ┌────────────────────────────┐ │
│  │ FORMULÁRIO DE SUPRIMENTO               │  │ HISTÓRICO RECENTE          │ │
│  │                                        │  │                            │ │
│  │  ┌──────────────────────────────────┐  │  │  Últimos Suprimentos:      │ │
│  │  │ VALOR DA ENTRADA                 │  │  │                            │ │
│  │  │                                  │  │  │  ↑ R$ 500,00    09:00     │ │
│  │  │           R$ [    500,00    ]    │  │  │  Abertura de caixa        │ │
│  │  │                                  │  │  │                            │ │
│  │  │  [R$ 50] [R$ 100] [R$ 200]       │  │  │  ↑ R$ 200,00    Ontem     │ │
│  │  │  [R$ 500] [R$ 1000] [Outro]      │  │  │  Troco adicional          │ │
│  │  └──────────────────────────────────┘  │  │                            │ │
│  │                                        │  │  ↑ R$ 100,00    2 dias    │ │
│  │  Motivo da entrada:                    │  │  Reforço de caixa         │ │
│  │  ┌──────────────────────────────────┐  │  │                            │ │
│  │  │ [Abertura de caixa              ▼]│  │  [Ver histórico completo]  │ │
│  │  │  • Abertura de caixa             │  │  │                            │ │
│  │  │  • Reforço de caixa              │  │  └────────────────────────────┘ │
│  │  │  • Troco adicional               │  │                                │
│  │  │  • Recebimento de dívida         │  │                                │
│  │  │  • Outros                        │  │                                │
│  │  └──────────────────────────────────┘  │                                │
│  │                                        │                                │
│  │  Observações (opcional):               │                                │
│  │  ┌──────────────────────────────────┐  │                                │
│  │  │                                  │  │                                │
│  │  │                                  │  │                                │
│  │  └──────────────────────────────────┘  │                                │
│  │                                        │                                │
│  │  ✅ Após o suprimento, o saldo será:   │                                │
│  │     R$ 745,00                          │                                │
│  │                                        │                                │
│  │  [  ↑ CONFIRMAR SUPRIMENTO  ]          │                                │
│  │                                        │                                │
│  └────────────────────────────────────────┘  └────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 3: Autenticação de Supervisor

### URL
Modal/Overlay

### Descrição
Modal de autenticação obrigatória para sangrias acima do limite configurado ou quando exigido por política.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                     ┌─────────────────────────────────┐                     │
│                     │  🔒 AUTENTICAÇÃO NECESSÁRIA     │                     │
│                     │                                 │                     │
│                     │  Esta operação requer           │                     │
│                     │  autorização de supervisor.     │                     │
│                     │                                 │                     │
│                     │  ┌─────────────────────────┐    │                     │
│                     │  │ Usuário Supervisor      │    │                     │
│                     │  │ [admin@empresa.com   ▼]│    │                     │
│                     │  └─────────────────────────┘    │                     │
│                     │                                 │                     │
│                     │  ┌─────────────────────────┐    │                     │
│                     │  │ Senha                   │    │                     │
│                     │  │ [••••••••      ] [👁️]  │    │                     │
│                     │  └─────────────────────────┘    │                     │
│                     │                                 │                     │
│                     │  Valor da operação: R$ 500,00   │                     │
│                     │                                 │                     │
│                     │  ┌──────────┐  ┌──────────┐     │                     │
│                     │  │ Cancelar │  │ Confirmar│     │                     │
│                     │  └──────────┘  └──────────┘     │                     │
│                     │                                 │                     │
│                     └─────────────────────────────────┘                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 4: Histórico de Movimentações

### URL
`/vendas/caixa/movimentacoes`

### Descrição
Lista completa de todas as sangrias e suprimentos realizados, com filtros por período, operador e tipo.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 📋 Movimentações de Caixa           [↓ Sangria] [↑ Suprimento]         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ FILTROS                                                            │   │
│  │ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ [🔍]   │   │
│  │ │ 📅 De:    │ │ 📅 Até:   │ │ 👤 Oper.  │ │ ↕️ Tipo   │        │   │
│  │ │ 01/03/2024│ │ 12/03/2024│ │ [Todos ▼] │ │ [Todos ▼] │ [Limpar]│   │
│  │ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ TABELA DE MOVIMENTAÇÕES                                            │   │
│  │                                                                    │   │
│  │  Tipo    Data/Hora      Operador    Valor     Motivo     Ações    │   │
│  │ ─────────────────────────────────────────────────────────────────  │   │
│  │  ↓       12/03 14:30    José        R$ 500    Caixa alto   [🖨️]    │   │
│  │  ↑       12/03 09:00    José        R$ 200    Abertura     [🖨️]    │   │
│  │  ↓       11/03 17:45    Maria       R$ 300    Depósito     [🖨️]    │   │
│  │  ↑       11/03 08:30    Maria       R$ 500    Abertura     [🖨️]    │   │
│  │  ↓       10/03 16:20    José        R$ 150    Pagamento    [🖨️]    │   │
│  │  ...                                                               │   │
│  │                                                                    │   │
│  │  Resumo:  ↓ Sangrias: R$ 2.850,00  |  ↑ Suprimentos: R$ 3.200,00   │   │
│  │                                                                    │   │
│  │                                            [<] 1 2 3 ... 10 [>]   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Componentes Detalhados

### Componente: Card de Status do Caixa

```tsx
interface CaixaStatusProps {
  saldo: number;
  saldoDinheiro: number;
  saldoCartao: number;
  saldoPix: number;
  status: 'normal' | 'baixo' | 'alto';
}

export function CaixaStatusCard({ saldo, saldoDinheiro, saldoCartao, saldoPix, status }: CaixaStatusProps) {
  const formatCurrency = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const getStatusConfig = () => {
    switch (status) {
      case 'baixo':
        return { color: 'text-amber-500', bg: 'bg-amber-50', label: 'Baixo' };
      case 'alto':
        return { color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Alto' };
      default:
        return { color: 'text-[#627271]', bg: 'bg-white', label: 'Normal' };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
      <h3 className="text-sm font-medium text-[#627271] mb-4">Status do Caixa</h3>
      
      <div className="grid grid-cols-4 gap-4">
        {/* Saldo Total */}
        <div className={`${statusConfig.bg} rounded-lg p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <Wallet className={`w-5 h-5 ${statusConfig.color}`} />
            <span className="text-xs text-[#627271]">Saldo Total</span>
          </div>
          <p className={`text-2xl font-bold ${statusConfig.color}`}>
            {formatCurrency(saldo)}
          </p>
          {status !== 'normal' && (
            <span className="text-xs text-amber-600 font-medium">{statusConfig.label}</span>
          )}
        </div>

        {/* Dinheiro */}
        <div className="bg-[#efefef] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Banknote className="w-5 h-5 text-[#627271]" />
            <span className="text-xs text-[#627271]">Dinheiro</span>
          </div>
          <p className="text-xl font-semibold text-[#1f2937]">
            {formatCurrency(saldoDinheiro)}
          </p>
        </div>

        {/* Cartão */}
        <div className="bg-[#efefef] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5 text-[#627271]" />
            <span className="text-xs text-[#627271]">Cartão</span>
          </div>
          <p className="text-xl font-semibold text-[#1f2937]">
            {formatCurrency(saldoCartao)}
          </p>
        </div>

        {/* PIX */}
        <div className="bg-[#efefef] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-5 h-5 text-[#627271]" />
            <span className="text-xs text-[#627271]">PIX</span>
          </div>
          <p className="text-xl font-semibold text-[#1f2937]">
            {formatCurrency(saldoPix)}
          </p>
        </div>
      </div>
    </div>
  );
}
```

### Componente: Formulário de Movimentação

```tsx
interface MovimentacaoFormProps {
  tipo: 'sangria' | 'suprimento';
  saldoAtual: number;
  onSubmit: (data: MovimentacaoData) => void;
  onCancel: () => void;
}

interface MovimentacaoData {
  valor: number;
  motivo: string;
  observacoes?: string;
}

export function MovimentacaoForm({ tipo, saldoAtual, onSubmit, onCancel }: MovimentacaoFormProps) {
  const [valor, setValor] = useState<number>(0);
  const [motivo, setMotivo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [showAuth, setShowAuth] = useState(false);

  const isSangria = tipo === 'sangria';
  const saldoPrevisto = isSangria ? saldoAtual - valor : saldoAtual + valor;
  
  const motivos = isSangria ? [
    { value: 'caixa_alto', label: 'Caixa alto' },
    { value: 'pagamento_fornecedor', label: 'Pagamento fornecedor' },
    { value: 'deposito_bancario', label: 'Depósito bancário' },
    { value: 'outros', label: 'Outros' }
  ] : [
    { value: 'abertura', label: 'Abertura de caixa' },
    { value: 'reforco', label: 'Reforço de caixa' },
    { value: 'troco_adicional', label: 'Troco adicional' },
    { value: 'recebimento_divida', label: 'Recebimento de dívida' },
    { value: 'outros', label: 'Outros' }
  ];

  const handleSubmit = () => {
    if (valor <= 0) return;
    if (isSangria && valor > saldoAtual) return;
    
    // Verificar se precisa de autenticação de supervisor
    if (valor > 200 || isSangria) {
      setShowAuth(true);
      return;
    }
    
    onSubmit({ valor, motivo, observacoes });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isSangria ? 'bg-red-100' : 'bg-emerald-100'
        }`}>
          {isSangria ? (
            <ArrowDownLeft className="w-6 h-6 text-red-600" />
          ) : (
            <ArrowUpRight className="w-6 h-6 text-emerald-600" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#1f2937]">
            {isSangria ? 'Sangria de Caixa' : 'Suprimento de Caixa'}
          </h2>
          <p className="text-sm text-[#627271]">
            {isSangria ? 'Retirada de valores' : 'Entrada de valores'}
          </p>
        </div>
      </div>

      {/* Valor */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1f2937] mb-2">
          Valor da {isSangria ? 'Retirada' : 'Entrada'}
        </label>
        <div className="relative mb-3">
          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#627271]" />
          <input
            type="number"
            step="0.01"
            min="0"
            max={isSangria ? saldoAtual : undefined}
            value={valor || ''}
            onChange={(e) => setValor(parseFloat(e.target.value) || 0)}
            className="w-full pl-14 pr-4 py-4 bg-[#efefef] border-2 border-transparent rounded-xl text-2xl font-bold text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
            placeholder="0,00"
          />
        </div>
        
        {/* Quick Select Buttons */}
        <div className="flex flex-wrap gap-2">
          {[50, 100, 200, 500, 1000].map((amount) => (
            <button
              key={amount}
              onClick={() => setValor(amount)}
              className="px-4 py-2 bg-[#efefef] hover:bg-[#86cb92]/10 text-[#627271] hover:text-[#3e5653] rounded-lg text-sm font-medium transition-colors"
            >
              R$ {amount}
            </button>
          ))}
          <button
            onClick={() => setValor(isSangria ? saldoAtual : 0)}
            className="px-4 py-2 bg-[#efefef] hover:bg-[#86cb92]/10 text-[#627271] hover:text-[#3e5653] rounded-lg text-sm font-medium transition-colors"
          >
            {isSangria ? 'Total' : 'Outro'}
          </button>
        </div>
      </div>

      {/* Motivo */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1f2937] mb-2">
          Motivo
        </label>
        <select
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="w-full px-4 py-3 bg-[#efefef] border border-transparent rounded-xl text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
        >
          <option value="">Selecione um motivo...</option>
          {motivos.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Observações */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#1f2937] mb-2">
          Observações <span className="text-[#627271] font-normal">(opcional)</span>
        </label>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-[#efefef] border border-transparent rounded-xl text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all resize-none"
          placeholder="Adicione observações se necessário..."
        />
      </div>

      {/* Preview do Saldo */}
      <div className={`p-4 rounded-xl mb-6 ${
        saldoPrevisto < 0 ? 'bg-red-50' : 'bg-[#efefef]'
      }`}>
        <p className="text-sm text-[#627271] mb-1">
          Após a {isSangria ? 'sangria' : 'suprimento'}, o saldo será:
        </p>
        <p className={`text-2xl font-bold ${
          saldoPrevisto < 0 ? 'text-red-600' : isSangria ? 'text-red-600' : 'text-emerald-600'
        }`}>
          {saldoPrevisto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
        {saldoPrevisto < 0 && (
          <p className="text-sm text-red-600 mt-1">
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            Saldo insuficiente para esta operação
          </p>
        )}
      </div>

      {/* Ações */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-4 bg-[#efefef] text-[#627271] rounded-xl font-medium hover:bg-[#e5e7eb] transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={valor <= 0 || (isSangria && valor > saldoAtual) || !motivo}
          className={`flex-[2] px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            isSangria
              ? 'bg-red-500 hover:bg-red-600 text-white disabled:bg-red-200'
              : 'bg-[#86cb92] hover:bg-[#86cb92]/90 text-white disabled:bg-[#e5e7eb] disabled:text-[#627271]'
          }`}
        >
          <Lock className="w-5 h-5" />
          {isSangria ? 'CONFIRMAR SANGRIA' : 'CONFIRMAR SUPRIMENTO'}
        </button>
      </div>

      {/* Modal de Autenticação */}
      {showAuth && (
        <SupervisorAuthModal
          valor={valor}
          onConfirm={(supervisorId) => {
            setShowAuth(false);
            onSubmit({ valor, motivo, observacoes, supervisorId });
          }}
          onCancel={() => setShowAuth(false)}
        />
      )}
    </div>
  );
}
```

### Componente: Modal de Autenticação do Supervisor

```tsx
interface SupervisorAuthModalProps {
  valor: number;
  onConfirm: (supervisorId: string) => void;
  onCancel: () => void;
}

export function SupervisorAuthModal({ valor, onConfirm, onCancel }: SupervisorAuthModalProps) {
  const [supervisor, setSupervisor] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!supervisor || !senha) return;
    
    setLoading(true);
    setError('');
    
    // Simular validação
    try {
      // await validarSupervisor(supervisor, senha);
      onConfirm(supervisor);
    } catch (err) {
      setError('Credenciais inválidas ou usuário sem permissão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-[#1f2937]">
            Autenticação Necessária
          </h3>
          <p className="text-sm text-[#627271] mt-2">
            Esta operação requer autorização de supervisor
          </p>
        </div>

        <div className="bg-[#efefef] rounded-xl p-4 mb-6">
          <p className="text-sm text-[#627271]">Valor da operação:</p>
          <p className="text-2xl font-bold text-[#1f2937]">
            {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-2">
              Supervisor
            </label>
            <select
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              className="w-full px-4 py-3 bg-[#efefef] border border-transparent rounded-xl text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
            >
              <option value="">Selecione o supervisor...</option>
              <option value="admin@empresa.com">Administrador</option>
              <option value="gerente@empresa.com">Gerente</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-2">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-[#efefef] border border-transparent rounded-xl text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#627271]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-[#efefef] text-[#627271] rounded-xl font-medium hover:bg-[#e5e7eb] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!supervisor || !senha || loading}
            className="flex-1 px-6 py-3 bg-[#3e5653] text-white rounded-xl font-medium hover:bg-[#1f2937] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              'Confirmar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 📋 Formulários

### Formulário: Sangria de Caixa

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| `valor` | Moeda | Sim | `> 0` e `<= saldo_atual` | Valor a ser retirado |
| `motivo` | Select | Sim | Not null | Motivo da retirada |
| `observacoes` | Textarea | Não | Max 500 chars | Detalhes adicionais |
| `supervisor_id` | Text | Condicional | Required if `> R$ 200` | Autorização de supervisor |
| `data_hora` | Datetime | Auto | - | Timestamp da operação |
| `operador_id` | Text | Auto | - | ID do operador logado |
| `caixa_id` | Text | Auto | - | ID do caixa aberto |

### Formulário: Suprimento de Caixa

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| `valor` | Moeda | Sim | `> 0` | Valor a ser adicionado |
| `motivo` | Select | Sim | Not null | Motivo da entrada |
| `observacoes` | Textarea | Não | Max 500 chars | Detalhes adicionais |
| `data_hora` | Datetime | Auto | - | Timestamp da operação |
| `operador_id` | Text | Auto | - | ID do operador logado |
| `caixa_id` | Text | Auto | - | ID do caixa aberto |

### Opções de Motivo - Sangria

| Valor | Label | Descrição |
|-------|-------|-----------|
| `caixa_alto` | Caixa alto | Saldo excedeu limite configurado |
| `pagamento_fornecedor` | Pagamento fornecedor | Pagamento direto ao fornecedor |
| `deposito_bancario` | Depósito bancário | Transferência para conta |
| `despesa_operacional` | Despesa operacional | Outras despesas do dia |
| `outros` | Outros | Especificar em observações |

### Opções de Motivo - Suprimento

| Valor | Label | Descrição |
|-------|-------|-----------|
| `abertura` | Abertura de caixa | Valor inicial do dia |
| `reforco` | Reforço de caixa | Troco insuficiente |
| `troco_adicional` | Troco adicional | Aumentar disponibilidade |
| `recebimento_divida` | Recebimento de dívida | Quitação de pendência |
| `outros` | Outros | Especificar em observações |

---

## 🎭 Estados da Interface

### Estado: Carregando

```tsx
export function MovimentacaoLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-[#86cb92] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[#627271]">Carregando dados do caixa...</p>
    </div>
  );
}
```

### Estado: Caixa Fechado

```tsx
export function CaixaFechadoState({ onAbrir }: { onAbrir: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
        <Lock className="w-10 h-10 text-amber-600" />
      </div>
      <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
        Caixa Fechado
      </h3>
      <p className="text-sm text-[#627271] mb-6 max-w-md">
        O caixa está fechado. É necessário realizar a abertura antes de efetuar qualquer movimentação.
      </p>
      <button
        onClick={onAbrir}
        className="px-6 py-3 bg-[#86cb92] text-white rounded-xl font-semibold hover:bg-[#86cb92]/90 transition-colors"
      >
        Abrir Caixa
      </button>
    </div>
  );
}
```

### Estado: Sucesso na Operação

```tsx
export function MovimentacaoSuccess({ 
  tipo, 
  valor, 
  onPrint, 
  onNova 
}: { 
  tipo: 'sangria' | 'suprimento';
  valor: number;
  onPrint: () => void;
  onNova: () => void;
}) {
  const isSangria = tipo === 'sangria';
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
        isSangria ? 'bg-emerald-100' : 'bg-emerald-100'
      }`}>
        <Check className="w-10 h-10 text-emerald-600" />
      </div>
      <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
        {isSangria ? 'Sangria realizada!' : 'Suprimento realizado!'}
      </h3>
      <p className="text-3xl font-bold text-[#1f2937] mb-6">
        {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
      <div className="flex gap-3">
        <button
          onClick={onPrint}
          className="px-6 py-3 bg-[#efefef] text-[#1f2937] rounded-xl font-medium hover:bg-[#e5e7eb] transition-colors flex items-center gap-2"
        >
          <Printer className="w-5 h-5" />
          Imprimir Recibo
        </button>
        <button
          onClick={onNova}
          className="px-6 py-3 bg-[#86cb92] text-white rounded-xl font-medium hover:bg-[#86cb92]/90 transition-colors"
        >
          Nova Movimentação
        </button>
      </div>
    </div>
  );
}
```

---

## 📜 Regras de Negócio

### RN-SAN-001: Valor Máximo de Sangria
A sangria não pode exceder o saldo disponível em dinheiro no caixa. Saldo em cartão e PIX não pode ser retirado via sangria.

### RN-SAN-002: Autenticação de Supervisor
Sangrias com valor superior a R$ 200,00 ou sangrias sem motivo específico exigem autenticação de supervisor (perfil Gerente ou Administrador).

### RN-SAN-003: Sangria Automática
Quando configurado, o sistema deve alertar para sangria quando o saldo em dinheiro exceder o valor configurado nas preferências.

### RN-SUP-001: Suprimento sem Limite
Não há limite máximo para suprimento de caixa, exceto restrições definidas no perfil do operador.

### RN-SUP-002: Motivo Obrigatório
Todo suprimento deve ter um motivo selecionado. "Outros" requer preenchimento do campo observações.

### RN-MOV-001: Registro Imutável
Uma vez registrada, a movimentação não pode ser editada ou excluída. Erros devem ser corrigidos com movimentação inversa.

### RN-MOV-002: Recibo Obrigatório
Toda movimentação deve gerar recibo impresso (se impressora configurada) e registro digital.

### RN-MOV-003: Timestamp
Todas as movimentações registram data/hora exata do servidor, não do cliente, para evitar manipulação.

### RN-MOV-004: Caixa Aberto
Movimentações só podem ser realizadas quando houver caixa aberto para o operador.

### RN-MOV-005: Conciliação
Ao fechar caixa, o total de sangrias e suprimentos deve ser exibido para conferência.

---

## ✅ Checklist de Implementação

### Estrutura
- [ ] Criar página `/vendas/caixa/sangria`
- [ ] Criar página `/vendas/caixa/suprimento`
- [ ] Criar página `/vendas/caixa/movimentacoes`
- [ ] Implementar modal de autenticação de supervisor
- [ ] Criar layout responsivo para tablets

### Componentes
- [ ] Componente `CaixaStatusCard` - Status atual do caixa
- [ ] Componente `MovimentacaoForm` - Formulário de sangria/suprimento
- [ ] Componente `SupervisorAuthModal` - Autenticação
- [ ] Componente `MovimentacaoSuccess` - Estado de sucesso
- [ ] Componente `HistoricoMovimentacoes` - Lista de movimentações

### Integrações
- [ ] API GET `/api/caixa/status` - Status atual do caixa
- [ ] API POST `/api/caixa/sangria` - Registrar sangria
- [ ] API POST `/api/caixa/suprimento` - Registrar suprimento
- [ ] API GET `/api/caixa/movimentacoes` - Listar movimentações
- [ ] API POST `/api/auth/supervisor` - Validar supervisor
- [ ] API POST `/api/caixa/recibo` - Imprimir recibo

### Estados
- [ ] Estado de carregamento inicial
- [ ] Estado de caixa fechado
- [ ] Estado de saldo insuficiente (sangria)
- [ ] Estado de sucesso com recibo
- [ ] Estado de erro na autenticação

### Validações
- [ ] Validação de valor máximo (saldo disponível)
- [ ] Validação de valor mínimo (> 0)
- [ ] Validação de motivo obrigatório
- [ ] Validação de senha de supervisor
- [ ] Verificação de caixa aberto

### Testes
- [ ] Teste de sangria com sucesso
- [ ] Teste de suprimento com sucesso
- [ ] Teste de autenticação de supervisor
- [ ] Teste de recusa de sangria (saldo insuficiente)
- [ ] Teste de impressão de recibo
- [ ] Teste de histórico e filtros

---

## 📝 Notas de Implementação

### Segurança
- Sempre validar supervisor no backend, nunca apenas no frontend
- Log de todas as movimentações com IP e user agent
- Auditoria trail: quem, quando, quanto, porquê
- Criptografia dos dados sensíveis em transit e rest

### UX
- Touch-friendly: botões mínimo 44x44px
- Feedback visual imediato nas ações
- Confirmação antes de operações irreversíveis
- Atalhos de teclado (F5 sangria, F6 suprimento)

### Performance
- Cache do saldo do caixa com refresh a cada 30s
- Lazy load do histórico de movimentações
- Debounce de 300ms em inputs de valor
