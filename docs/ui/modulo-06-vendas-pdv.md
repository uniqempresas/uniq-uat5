# Módulo 06: Vendas & PDV - UI/UX Documentation

## 📋 Metadados do Documento

| Campo | Valor |
|-------|-------|
| **Módulo** | Vendas & PDV |
| **Código** | MOD-VEN-001 |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Prioridade** | MUST HAVE (MVP) |
| **Autor** | UNIQ Design Team |
| **Data de Criação** | 2024-03-12 |
| **Última Atualização** | 2024-03-12 |
| **Stack** | Next.js 14 + React 18 + TypeScript + Tailwind CSS + Lucide React |

---

## 🎨 Design System

### Paleta de Cores

```css
:root {
  /* Cores Primárias */
  --jet-black: #1f2937;        /* Sidebar, textos principais */
  --dark-slate: #3e5653;       /* Botões primários, ações */
  --dim-grey: #627271;         /* Textos secundários, ícones */
  
  /* Cores de Apoio */
  --platinum: #efefef;         /* Background principal */
  --emerald: #86cb92;          /* Accent, sucesso, valores positivos */
  --white: #ffffff;            /* Cards, superfícies */
  
  /* Cores de Status */
  --success: #86cb92;
  --warning: #f59e0b;
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
--text-3xl: 1.875rem;  /* 30px - Títulos grandes */
--text-4xl: 2.25rem;   /* 36px - Display */

/* Pesos */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Espaçamentos

```css
/* Grid de 8px */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Sombras e Elevações

```css
/* Sombras */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-focus: 0 0 0 3px rgba(134, 203, 146, 0.3);

/* Border Radius */
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
```

### Ícones (Lucide React)

```typescript
import {
  ShoppingCart,
  Receipt,
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  X,
  Check,
  CreditCard,
  Banknote,
  QrCode,
  Clock,
  Calendar,
  Filter,
  MoreVertical,
  ArrowLeft,
  History,
  AlertCircle,
  Package,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Calculator,
  Percent,
  User,
  Phone,
  MapPin,
  FileText,
  BarChart3,
  RotateCcw,
  Ban,
  Download
} from 'lucide-react';
```

---

## 🖥️ Tela 1: PDV / Ponto de Venda

### URL
`/vendas/pdv`

### Descrição
Interface touch-friendly para vendas rápidas em balcão. Otimizada para tablets e telas touchscreen com teclado numérico integrado, carrinho lateral e múltiplas formas de pagamento.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER (64px)                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 🛒 PDV / Nova Venda              [🔍 Buscar produto    ] [📊] [👤]     │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────┐  ┌────────────────────────────┐ │
│  │ ÁREA DE PRODUTOS (70%)                 │  │ CARRINHO (30%)             │ │
│  │                                        │  │                            │ │
│  │  ┌──────────────────────────────────┐  │  │  🛒 CARRINHO       [🗑️]   │ │
│  │  │ 🔍 Busca Rápida                  │  │  │  ─────────────────────    │ │
│  │  │ Código ou nome do produto...     │  │  │                            │ │
│  │  └──────────────────────────────────┘  │  │  Produto 1        R$ 29,90│ │
│  │                                        │  │  Qtd: 2           [−] [+] │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐      │  │  ─────────────────────    │ │
│  │  │ PROD 1 │ │ PROD 2 │ │ PROD 3 │      │  │  Produto 2        R$ 45,00│ │
│  │  │ R$29,90│ │ R$45,00│ │ R$12,50│      │  │  Qtd: 1           [−] [+] │ │
│  │  └────────┘ └────────┘ └────────┘      │  │  ─────────────────────    │ │
│  │                                        │  │                            │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐      │  │  SUBTOTAL     R$ 104,80   │ │
│  │  │ PROD 4 │ │ PROD 5 │ │ PROD 6 │      │  │  DESCONTO     R$ 0,00     │ │
│  │  │ R$8,99 │ │ R$67,00│ │ R$23,90│      │  │  ─────────────────────    │ │
│  │  └────────┘ └────────┘ └────────┘      │  │  TOTAL        R$ 104,80   │ │
│  │                                        │  │                            │ │
│  │  ┌──────────────────────────────────┐  │  │  [ 💰 FINALIZAR VENDA ]   │ │
│  │  │ Produtos Recentes                │  │  │                            │ │
│  │  │ [Prod A] [Prod B] [Prod C] ...   │  │  └────────────────────────────┘ │
│  │  └──────────────────────────────────┘  │                                │
│  └────────────────────────────────────────┘                                │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ TECLADO NUMÉRICO (Mobile/Tablet)                                            │
│ ┌────┬────┬────┬─────────────────────────────────────────────────────────┐  │
│ │ 7  │ 8  │ 9  │                                         [Limpar]       │  │
│ ├────┼────┼────┼─────────────────────────────────────────────────────────┤  │
│ │ 4  │ 5  │ 6  │                                         [Qtd] [Del]    │  │
│ ├────┼────┼────┼─────────────────────────────────────────────────────────┤  │
│ │ 1  │ 2  │ 3  │                                         [Enter]        │  │
│ ├────┼────┼────┼─────────────────────────────────────────────────────────┤  │
│ │ 0  │ .  │ 00 │                                                        │  │
│ └────┴────┴────┴─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Componentes Detalhados

#### 1.1 Header do PDV

```tsx
// Header PDV Component
export function PDVHeader() {
  return (
    <header className="h-16 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#86cb92]/10 rounded-lg flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-[#86cb92]" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-[#1f2937]">PDV</h1>
          <span className="text-xs text-[#627271]">Nova Venda</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
          <input
            type="text"
            placeholder="Buscar produto (F2)"
            className="w-80 pl-10 pr-4 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] placeholder:text-[#627271] focus:outline-none focus:border-[#86cb92] focus:ring-2 focus:ring-[#86cb92]/20 transition-all"
          />
        </div>
        
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#efefef] transition-colors">
          <BarChart3 className="w-5 h-5 text-[#627271]" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3e5653] text-white hover:bg-[#1f2937] transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
```

#### 1.2 Área de Busca Rápida

```tsx
// Busca Rápida Component
export function BuscaRapida({ onSearch }: { onSearch: (term: string) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-4 mb-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
        <input
          type="text"
          placeholder="Código do produto, nome ou código de barras..."
          className="w-full pl-12 pr-4 py-3 bg-[#efefef] border-2 border-transparent rounded-lg text-base text-[#1f2937] placeholder:text-[#627271] focus:outline-none focus:border-[#86cb92] transition-all"
          onChange={(e) => onSearch(e.target.value)}
          autoFocus
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#627271] bg-white px-2 py-1 rounded border">
          F2
        </span>
      </div>
      
      {/* Produtos Recentes */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-[#627271] mr-2">Recentes:</span>
        {['Arroz 5kg', 'Coca 2L', 'Pão Francês', 'Leite Integral'].map((produto) => (
          <button
            key={produto}
            className="px-3 py-1.5 bg-[#efefef] hover:bg-[#86cb92]/10 hover:text-[#3e5653] rounded-full text-xs text-[#627271] transition-colors border border-[#e5e7eb] hover:border-[#86cb92]"
          >
            {produto}
          </button>
        ))}
      </div>
    </div>
  );
}
```

#### 1.3 Grid de Produtos (Produtos Rápidos)

```tsx
// Produto Card Component
interface ProdutoCardProps {
  id: string;
  nome: string;
  preco: number;
  imagem?: string;
  estoque: number;
  onAdd: (id: string) => void;
}

export function ProdutoCard({ nome, preco, imagem, estoque, onAdd }: ProdutoCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    setIsLoading(true);
    onAdd(id);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={estoque <= 0 || isLoading}
      className={`
        relative w-full bg-white rounded-xl border-2 p-4 text-left transition-all
        ${estoque <= 0 
          ? 'border-[#e5e7eb] opacity-50 cursor-not-allowed' 
          : 'border-[#e5e7eb] hover:border-[#86cb92] hover:shadow-md active:scale-[0.98]'
        }
      `}
    >
      {/* Badge Estoque */}
      {estoque <= 5 && estoque > 0 && (
        <span className="absolute top-2 right-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
          {estoque} un.
        </span>
      )}
      
      {/* Imagem */}
      <div className="w-full h-24 bg-[#efefef] rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        {imagem ? (
          <img src={imagem} alt={nome} className="w-full h-full object-cover" />
        ) : (
          <Package className="w-8 h-8 text-[#627271]" />
        )}
      </div>
      
      {/* Info */}
      <h3 className="text-sm font-medium text-[#1f2937] line-clamp-2 mb-1">{nome}</h3>
      <p className="text-lg font-bold text-[#86cb92]">
        {formatCurrency(preco)}
      </p>
      
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#86cb92] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}

// Grid de Produtos
export function ProdutosGrid({ produtos }: { produtos: Produto[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {produtos.map((produto) => (
        <ProdutoCard key={produto.id} {...produto} />
      ))}
    </div>
  );
}
```

#### 1.4 Carrinho Lateral

```tsx
// Carrinho Item Component
interface CarrinhoItemProps {
  item: {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
    imagem?: string;
  };
  onUpdateQuantidade: (id: string, qtd: number) => void;
  onRemove: (id: string) => void;
}

export function CarrinhoItem({ item, onUpdateQuantidade, onRemove }: CarrinhoItemProps) {
  return (
    <div className="flex gap-3 p-3 bg-[#efefef]/50 rounded-lg group">
      {/* Imagem */}
      <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-[#e5e7eb]">
        {item.imagem ? (
          <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <Package className="w-6 h-6 text-[#627271]" />
        )}
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-[#1f2937] truncate">{item.nome}</h4>
        <p className="text-xs text-[#627271]">
          {formatCurrency(item.preco)} un.
        </p>
        
        {/* Controles de Quantidade */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantidade(item.id, Math.max(0, item.quantidade - 1))}
            className="w-7 h-7 flex items-center justify-center rounded bg-white border border-[#e5e7eb] hover:border-[#86cb92] hover:text-[#86cb92] transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center text-sm font-medium text-[#1f2937]">
            {item.quantidade}
          </span>
          <button
            onClick={() => onUpdateQuantidade(item.id, item.quantidade + 1)}
            className="w-7 h-7 flex items-center justify-center rounded bg-white border border-[#e5e7eb] hover:border-[#86cb92] hover:text-[#86cb92] transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      {/* Total e Remover */}
      <div className="flex flex-col items-end justify-between">
        <span className="text-sm font-semibold text-[#1f2937]">
          {formatCurrency(item.preco * item.quantidade)}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="p-1.5 text-[#627271] hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Carrinho Panel
export function CarrinhoPanel({ 
  itens, 
  subtotal, 
  desconto, 
  total,
  onClear,
  onCheckout
}: CarrinhoPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-[#86cb92]" />
          <h2 className="font-semibold text-[#1f2937]">Carrinho</h2>
          <span className="px-2 py-0.5 bg-[#86cb92]/10 text-[#3e5653] text-xs rounded-full font-medium">
            {itens.length} itens
          </span>
        </div>
        <button
          onClick={onClear}
          disabled={itens.length === 0}
          className="p-2 text-[#627271] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      {/* Lista de Itens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {itens.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <ShoppingCart className="w-12 h-12 text-[#e5e7eb] mb-3" />
            <p className="text-[#627271] text-sm">Carrinho vazio</p>
            <p className="text-xs text-[#627271]/70 mt-1">Adicione produtos para iniciar</p>
          </div>
        ) : (
          itens.map((item) => (
            <CarrinhoItem
              key={item.id}
              item={item}
              onUpdateQuantidade={handleUpdateQuantidade}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>
      
      {/* Resumo */}
      <div className="p-4 border-t border-[#e5e7eb] bg-[#efefef]/30">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#627271]">Subtotal</span>
            <span className="text-[#1f2937]">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#627271]">Desconto</span>
            <div className="flex items-center gap-2">
              <button className="text-xs text-[#86cb92] hover:underline">
                <Percent className="w-3 h-3 inline" /> Aplicar
              </button>
              <span className="text-[#1f2937]">{formatCurrency(desconto)}</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#e5e7eb]">
            <span className="text-[#1f2937]">TOTAL</span>
            <span className="text-[#86cb92]">{formatCurrency(total)}</span>
          </div>
        </div>
        
        {/* Botão Finalizar */}
        <button
          onClick={onCheckout}
          disabled={itens.length === 0}
          className="w-full py-4 bg-[#86cb92] hover:bg-[#86cb92]/90 disabled:bg-[#e5e7eb] disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-[#86cb92]/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          FINALIZAR VENDA
        </button>
      </div>
    </div>
  );
}
```

#### 1.5 Teclado Numérico (Touch)

```tsx
// Teclado Numérico para Tablets/Displays Touch
export function TecladoNumerico({ 
  onKeyPress, 
  onClear, 
  onEnter,
  onQuantity 
}: TecladoNumericoProps) {
  const keys = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', '00']
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-[#e5e7eb] p-4">
      <div className="grid grid-cols-4 gap-2">
        {/* Números */}
        <div className="col-span-3 grid grid-cols-3 gap-2">
          {keys.flat().map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className="h-16 bg-[#efefef] hover:bg-[#e5e7eb] active:bg-[#86cb92] active:text-white rounded-lg text-2xl font-semibold text-[#1f2937] transition-all"
            >
              {key}
            </button>
          ))}
        </div>
        
        {/* Ações Laterais */}
        <div className="flex flex-col gap-2">
          <button
            onClick={onClear}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
          >
            Limpar
          </button>
          <button
            onClick={onQuantity}
            className="flex-1 bg-[#efefef] hover:bg-[#e5e7eb] text-[#1f2937] rounded-lg text-sm font-medium transition-colors"
          >
            Qtd
          </button>
          <button
            onClick={onEnter}
            className="flex-[2] bg-[#86cb92] hover:bg-[#86cb92]/90 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <Check className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🖥️ Tela 2: Histórico de Vendas

### URL
`/vendas`

### Descrição
Lista completa de vendas realizadas com filtros avançados, busca por período, status de pagamento e ações rápidas.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 📊 Histórico de Vendas          [+ Nova Venda]                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ FILTROS                                                            │   │
│  │ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ [🔍]   │   │
│  │ │ 📅 De:    │ │ 📅 Até:   │ │ 💰 Status │ │ 💳 Forma  │ [Limpar]│   │
│  │ │ 01/03/2024│ │ 12/03/2024│ │ [Todas ▼] │ │ [Todas ▼] │        │   │
│  │ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ RESUMO DO PERÍODO                                                  │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │   │
│  │ │ 💰 Total    │ │ 🛒 Vendas   │ │ 📈 Ticket   │ │ 🎯 Meta     │    │   │
│  │ │ R$ 45.890   │ │    234      │ │   R$ 196    │ │   92%       │    │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ TABELA DE VENDAS                                                   │   │
│  │                                                                    │   │
│  │  Nº      Data        Cliente        Valor    Pagamento  Status   │   │
│  │ ───────────────────────────────────────────────────────────────── │   │
│  │  #1024   12/03 14:30 João Silva    R$ 156,90  PIX        ✓ Paga   │   │
│  │  #1023   12/03 11:15 Maria Souza   R$ 89,50   Cartão     ✓ Paga   │   │
│  │  #1022   11/03 16:45 -             R$ 45,00   Dinheiro   ✓ Paga   │   │
│  │  #1021   11/03 10:20 Pedro Santos  R$ 234,00  Prazo      ⏳ Pend.  │   │
│  │  #1020   10/03 17:00 Ana Costa     R$ 67,80   PIX        ✓ Paga   │   │
│  │  ...                                                               │   │
│  │                                                                    │   │
│  │                                            [<] 1 2 3 ... 10 [>]   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Componentes Detalhados

#### 2.1 Filtros de Período

```tsx
// Filtros Component
export function VendasFiltros({ 
  filtros, 
  onChange,
  onClear 
}: FiltrosProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-4">
      <div className="flex flex-wrap items-end gap-4">
        {/* Data Início */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-[#627271] mb-1.5">
            De
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
            <input
              type="date"
              value={filtros.dataInicio}
              onChange={(e) => onChange('dataInicio', e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
            />
          </div>
        </div>
        
        {/* Data Fim */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-[#627271] mb-1.5">
            Até
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
            <input
              type="date"
              value={filtros.dataFim}
              onChange={(e) => onChange('dataFim', e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
            />
          </div>
        </div>
        
        {/* Status */}
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs font-medium text-[#627271] mb-1.5">
            Status
          </label>
          <select
            value={filtros.status}
            onChange={(e) => onChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all appearance-none cursor-pointer"
          >
            <option value="">Todas</option>
            <option value="paga">Paga</option>
            <option value="pendente">Pendente</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
        
        {/* Forma de Pagamento */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-[#627271] mb-1.5">
            Pagamento
          </label>
          <select
            value={filtros.formaPagamento}
            onChange={(e) => onChange('formaPagamento', e.target.value)}
            className="w-full px-3 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all appearance-none cursor-pointer"
          >
            <option value="">Todas</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">PIX</option>
            <option value="cartao_credito">Cartão Crédito</option>
            <option value="cartao_debito">Cartão Débito</option>
            <option value="prazo">A Prazo</option>
          </select>
        </div>
        
        {/* Ações */}
        <div className="flex gap-2">
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors"
          >
            Limpar
          </button>
          <button
            onClick={onSearch}
            className="px-4 py-2 bg-[#3e5653] hover:bg-[#1f2937] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
        </div>
      </div>
      
      {/* Atalhos de Período */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-[#e5e7eb]">
        <span className="text-xs text-[#627271] mr-2">Período rápido:</span>
        {[
          { label: 'Hoje', value: 'today' },
          { label: 'Ontem', value: 'yesterday' },
          { label: 'Últimos 7 dias', value: 'last7' },
          { label: 'Este mês', value: 'thisMonth' },
          { label: 'Mês passado', value: 'lastMonth' }
        ].map((periodo) => (
          <button
            key={periodo.value}
            onClick={() => onPeriodoRapido(periodo.value)}
            className="px-3 py-1 text-xs bg-[#efefef] hover:bg-[#86cb92]/10 text-[#627271] hover:text-[#3e5653] rounded-full transition-colors"
          >
            {periodo.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

#### 2.2 Cards de Resumo

```tsx
// Resumo Cards
export function VendasResumo({ dados }: { dados: ResumoVendas }) {
  const cards = [
    {
      icon: TrendingUp,
      label: 'Total em Vendas',
      value: formatCurrency(dados.total),
      trend: dados.trendTotal,
      color: 'emerald'
    },
    {
      icon: ShoppingCart,
      label: 'Total de Vendas',
      value: dados.quantidade.toString(),
      trend: dados.trendQuantidade,
      color: 'blue'
    },
    {
      icon: Receipt,
      label: 'Ticket Médio',
      value: formatCurrency(dados.ticketMedio),
      trend: dados.trendTicket,
      color: 'purple'
    },
    {
      icon: Target,
      label: 'Meta do Mês',
      value: `${dados.meta}%`,
      progress: dados.meta,
      color: 'amber'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg bg-${card.color}-100 flex items-center justify-center`}>
              <card.icon className={`w-5 h-5 text-${card.color}-600`} />
            </div>
            {card.trend && (
              <span className={`text-xs font-medium ${card.trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {card.trend > 0 ? '+' : ''}{card.trend}%
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-[#1f2937]">{card.value}</p>
          <p className="text-sm text-[#627271]">{card.label}</p>
          {card.progress !== undefined && (
            <div className="mt-3">
              <div className="h-2 bg-[#efefef] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#86cb92] rounded-full transition-all"
                  style={{ width: `${Math.min(card.progress, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

#### 2.3 Tabela de Vendas

```tsx
// Tabela de Vendas
export function VendasTabela({ 
  vendas, 
  onView, 
  onCancel,
  onPrint,
  loading 
}: VendasTabelaProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#efefef]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#627271] uppercase tracking-wider">
                Nº Venda
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#627271] uppercase tracking-wider">
                Data/Hora
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#627271] uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-[#627271] uppercase tracking-wider">
                Valor
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#627271] uppercase tracking-wider">
                Pagamento
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-[#627271] uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-[#627271] uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb]">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center gap-2 text-[#627271]">
                    <div className="w-5 h-5 border-2 border-[#86cb92] border-t-transparent rounded-full animate-spin" />
                    Carregando...
                  </div>
                </td>
              </tr>
            ) : vendas.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <Receipt className="w-12 h-12 text-[#e5e7eb] mb-3" />
                    <p className="text-[#627271] font-medium">Nenhuma venda encontrada</p>
                    <p className="text-sm text-[#627271]/70 mt-1">
                      Tente ajustar os filtros ou período
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              vendas.map((venda) => (
                <tr
                  key={venda.id}
                  className="hover:bg-[#efefef]/50 transition-colors group"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-[#1f2937]">
                      #{venda.numero}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-[#1f2937]">
                      <Calendar className="w-4 h-4 text-[#627271]" />
                      {formatDate(venda.data)}
                    </div>
                    <span className="text-xs text-[#627271] ml-6">
                      {formatTime(venda.data)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#1f2937]">
                      {venda.cliente?.nome || 'Cliente não identificado'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <span className="text-sm font-semibold text-[#1f2937]">
                      {formatCurrency(venda.total)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#efefef] text-[#627271]">
                      {getPagamentoIcon(venda.formaPagamento)}
                      {formatPagamento(venda.formaPagamento)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <StatusBadge status={venda.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onView(venda.id)}
                        className="p-1.5 text-[#627271] hover:text-[#3e5653] hover:bg-[#86cb92]/10 rounded transition-colors"
                        title="Ver detalhes"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onPrint(venda.id)}
                        className="p-1.5 text-[#627271] hover:text-[#3e5653] hover:bg-[#86cb92]/10 rounded transition-colors"
                        title="Reimprimir recibo"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      {venda.status !== 'cancelada' && (
                        <button
                          onClick={() => onCancel(venda.id)}
                          className="p-1.5 text-[#627271] hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Cancelar venda"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Paginação */}
      <div className="px-4 py-3 border-t border-[#e5e7eb] flex items-center justify-between">
        <span className="text-sm text-[#627271]">
          Mostrando {vendas.length} de {totalRegistros} vendas
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={pagina === 1}
            onClick={() => onPageChange(pagina - 1)}
            className="p-2 text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {getPaginationRange().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                w-9 h-9 rounded-lg text-sm font-medium transition-colors
                ${pagina === page 
                  ? 'bg-[#3e5653] text-white' 
                  : 'text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef]'
                }
              `}
            >
              {page}
            </button>
          ))}
          <button
            disabled={pagina === totalPaginas}
            onClick={() => onPageChange(pagina + 1)}
            className="p-2 text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Status Badge
function StatusBadge({ status }: { status: string }) {
  const config = {
    paga: {
      icon: Check,
      label: 'Paga',
      className: 'bg-emerald-100 text-emerald-700'
    },
    pendente: {
      icon: Clock,
      label: 'Pendente',
      className: 'bg-amber-100 text-amber-700'
    },
    cancelada: {
      icon: Ban,
      label: 'Cancelada',
      className: 'bg-red-100 text-red-700'
    }
  };

  const { icon: Icon, label, className } = config[status] || config.pendente;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
```

---

## 🖥️ Tela 3: Detalhes da Venda

### URL
`/vendas/:id`

### Descrição
Visualização completa de uma venda específica com todos os itens, informações de pagamento, cliente e ações disponíveis.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ← Voltar        Venda #1024                    [🖨️] [⚙️]              │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────┐  ┌────────────────────────────┐ │
│  │ STATUS BAR                             │  │ RESUMO RÁPIDO              │ │
│  │ ┌──────────────────────────────────┐   │  │                            │ │
│  │ │ ✓ Venda Concluída em 12/03/2024  │   │  │  💰 Total:    R$ 156,90   │ │
│  │ │    às 14:30 por José (Operador)  │   │  │  💳 Pagto:    PIX         │ │
│  │ └──────────────────────────────────┘   │  │  📅 Data:     12/03/2024  │ │
│  └────────────────────────────────────────┘  │  ⏰ Hora:      14:30       │ │
│                                              └────────────────────────────┘ │
│  ┌────────────────────────────────────────┐  ┌────────────────────────────┐ │
│  │ INFORMAÇÕES DO CLIENTE                 │  │ PAGAMENTO                  │ │
│  │                                        │  │                            │ │
│  │  👤 João Silva                         │  │  Forma: PIX               │ │
│  │  📱 (11) 98765-4321                    │  │  Status: ✓ Confirmado     │ │
│  │  📧 joao@email.com                     │  │  ID Tx: 1234567890        │ │
│  │  📍 Rua das Flores, 123                │  │                            │ │
│  │                                        │  │  [Ver Comprovante]        │ │
│  └────────────────────────────────────────┘  └────────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ITENS DA VENDA                                                     │   │
│  │                                                                    │   │
│  │  #  Produto                    Qtd    Preço Un.    Total            │   │
│  │ ─────────────────────────────────────────────────────────────────  │   │
│  │  1  Arroz Integral 5kg          1     R$ 29,90     R$ 29,90        │   │
│  │  2  Feijão Carioca 1kg          2     R$ 8,50      R$ 17,00        │   │
│  │  3  Óleo de Soja 900ml          1     R$ 9,90      R$ 9,90         │   │
│  │  4  Açúcar Refinado 1kg         3     R$ 5,50      R$ 16,50        │   │
│  │     ...                                                           │   │
│  │                                                                    │   │
│  │                                          SUBTOTAL:    R$ 156,90   │   │
│  │                                          DESCONTO:    R$ 0,00     │   │
│  │                                          TOTAL:       R$ 156,90   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ AÇÕES                                                              │   │
│  │                                                                    │   │
│  │  [🖨️ Reimprimir Recibo]  [⬇️ Baixar PDF]  [🚫 Cancelar Venda]     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Componentes Detalhados

#### 3.1 Header de Detalhes

```tsx
// Venda Detalhes Header
export function VendaDetalhesHeader({ venda, onBack }: { venda: Venda; onBack: () => void }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#e5e7eb] hover:bg-[#efefef] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#627271]" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1f2937]">
            Venda #{venda.numero}
          </h1>
          <p className="text-sm text-[#627271]">
            Realizada por {venda.operador.nome}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPrint(venda.id)}
          className="px-4 py-2 text-sm font-medium text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Imprimir
        </button>
        <button
          onClick={() => onDownload(venda.id)}
          className="px-4 py-2 text-sm font-medium text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          PDF
        </button>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {/* Dropdown Menu */}
        </div>
      </div>
    </header>
  );
}
```

#### 3.2 Status Timeline

```tsx
// Venda Status Timeline
export function VendaStatusTimeline({ venda }: { venda: Venda }) {
  const steps = [
    {
      status: 'iniciada',
      label: 'Venda Iniciada',
      timestamp: venda.dataInicio,
      icon: ShoppingCart,
      completed: true
    },
    {
      status: 'processando',
      label: 'Processando',
      timestamp: venda.dataPagamento,
      icon: CreditCard,
      completed: venda.status !== 'pendente'
    },
    {
      status: 'concluida',
      label: 'Concluída',
      timestamp: venda.dataConclusao,
      icon: Check,
      completed: venda.status === 'paga'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.status} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${step.completed 
                    ? 'bg-[#86cb92] text-white' 
                    : 'bg-[#efefef] text-[#627271]'
                  }
                `}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className="mt-2 text-sm font-medium text-[#1f2937]">
                {step.label}
              </span>
              {step.timestamp && (
                <span className="text-xs text-[#627271]">
                  {formatDateTime(step.timestamp)}
                </span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-0.5 mx-4
                  ${step.completed ? 'bg-[#86cb92]' : 'bg-[#e5e7eb]'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### 3.3 Itens da Venda

```tsx
// Itens da Venda Table
export function VendaItens({ itens }: { itens: ItemVenda[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#e5e7eb]">
        <h3 className="font-semibold text-[#1f2937]">Itens da Venda</h3>
        <p className="text-sm text-[#627271]">
          {itens.length} {itens.length === 1 ? 'item' : 'itens'} no total
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#efefef]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#627271] uppercase">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#627271] uppercase">
                Produto
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#627271] uppercase">
                Qtd
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-[#627271] uppercase">
                Preço Un.
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-[#627271] uppercase">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb]">
            {itens.map((item, index) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm text-[#627271]">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#efefef] rounded-lg flex items-center justify-center">
                      {item.produto.imagem ? (
                        <img 
                          src={item.produto.imagem} 
                          alt={item.produto.nome}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="w-5 h-5 text-[#627271]" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1f2937]">
                        {item.produto.nome}
                      </p>
                      <p className="text-xs text-[#627271]">
                        Código: {item.produto.codigo}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm text-[#1f2937]">
                  {item.quantidade}
                </td>
                <td className="px-6 py-4 text-right text-sm text-[#1f2937]">
                  {formatCurrency(item.precoUnitario)}
                </td>
                <td className="px-6 py-4 text-right text-sm font-semibold text-[#1f2937]">
                  {formatCurrency(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[#efefef]">
            <tr>
              <td colSpan={4} className="px-6 py-3 text-right text-sm text-[#627271]">
                Subtotal
              </td>
              <td className="px-6 py-3 text-right text-sm font-medium text-[#1f2937]">
                {formatCurrency(subtotal)}
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="px-6 py-3 text-right text-sm text-[#627271]">
                Desconto
              </td>
              <td className="px-6 py-3 text-right text-sm font-medium text-[#1f2937]">
                {formatCurrency(desconto)}
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="px-6 py-4 text-right text-base font-semibold text-[#1f2937]">
                TOTAL
              </td>
              <td className="px-6 py-4 text-right text-lg font-bold text-[#86cb92]">
                {formatCurrency(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
```

#### 3.4 Informações do Cliente

```tsx
// Cliente Info Card
export function VendaClienteInfo({ cliente }: { cliente?: Cliente }) {
  if (!cliente) {
    return (
      <div className="bg-[#efefef] rounded-xl border border-dashed border-[#e5e7eb] p-6 text-center">
        <User className="w-10 h-10 text-[#627271] mx-auto mb-2" />
        <p className="text-sm text-[#627271]">Cliente não identificado</p>
        <p className="text-xs text-[#627271]/70 mt-1">Venda realizada sem cadastro</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
      <h3 className="font-semibold text-[#1f2937] mb-4">Informações do Cliente</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#86cb92]/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[#86cb92]" />
          </div>
          <div>
            <p className="font-medium text-[#1f2937]">{cliente.nome}</p>
            <p className="text-xs text-[#627271]">{cliente.tipoDocumento}: {cliente.documento}</p>
          </div>
        </div>
        
        <div className="space-y-2 pt-4 border-t border-[#e5e7eb]">
          {cliente.telefone && (
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-[#627271]" />
              <span className="text-[#1f2937]">{cliente.telefone}</span>
            </div>
          )}
          {cliente.email && (
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-[#627271]" />
              <span className="text-[#1f2937]">{cliente.email}</span>
            </div>
          )}
          {cliente.endereco && (
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-[#627271] mt-0.5" />
              <span className="text-[#1f2937]">{formatEndereco(cliente.endereco)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 🖥️ Tela 4: Modal de Pagamento

### URL
`Modal overlay em /vendas/pdv`

### Descrição
Modal para seleção de forma de pagamento, processamento e finalização da venda.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ MODAL: FINALIZAR VENDA                              [X]            │   │
│   │                                                                     │   │
│   │  ┌───────────────────────────────────────────────────────────────┐ │   │
│   │  │ RESUMO                                                        │ │   │
│   │  │  Total da Venda:                     R$ 156,90                │ │   │
│   │  └───────────────────────────────────────────────────────────────┘ │   │
│   │                                                                     │   │
│   │  ┌───────────────────────────────────────────────────────────────┐ │   │
│   │  │ FORMA DE PAGAMENTO                                             │ │   │
│   │  │                                                                │ │   │
│   │  │  [💵] [💳] [📱] [📝]                                          │ │   │
│   │  │  Din  Crt   PIX  Prazo                                         │ │   │
│   │  │                                                                │ │   │
│   │  │  ┌─────────────────────────────────────────────────────────┐   │ │   │
│   │  │  │ DETALHES DO PAGAMENTO (PIX Selecionado)                 │   │ │   │
│   │  │  │                                                         │   │ │   │
│   │  │  │  [QR Code exibido aqui]                                 │   │ │   │
│   │  │  │                                                         │   │ │   │
│   │  │  │  Chave PIX:                                             │   │ │   │
│   │  │  │  empresa@email.com                                      │   │ │   │
│   │  │  │                                                         │   │ │   │
│   │  │  │  Valor:                    R$ 156,90                    │   │ │   │
│   │  │  │                                                         │   │ │   │
│   │  │  │  [Aguardando pagamento...]                              │   │ │   │
│   │  │  └─────────────────────────────────────────────────────────┘   │ │   │
│   │  └───────────────────────────────────────────────────────────────┘ │   │
│   │                                                                     │   │
│   │  ┌───────────────────────────────────────────────────────────────┐ │   │
│   │  │ DIVISÃO DE PAGAMENTO (Opcional)                               │ │   │
│   │  │                                                                │ │   │
│   │  │  [+ Adicionar Forma de Pagamento]                             │ │   │
│   │  └───────────────────────────────────────────────────────────────┘ │   │
│   │                                                                     │   │
│   │              [Cancelar]      [Confirmar Pagamento]                 │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Componentes Detalhados

#### 4.1 Modal de Pagamento

```tsx
// Payment Modal
export function PaymentModal({ 
  isOpen, 
  onClose, 
  total, 
  onConfirm 
}: PaymentModalProps) {
  const [formaPagamento, setFormaPagamento] = useState<string>('pix');
  const [parcelas, setParcelas] = useState(1);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const formasPagamento = [
    { id: 'dinheiro', label: 'Dinheiro', icon: Banknote },
    { id: 'cartao_credito', label: 'Crédito', icon: CreditCard },
    { id: 'cartao_debito', label: 'Débito', icon: CreditCard },
    { id: 'pix', label: 'PIX', icon: QrCode },
    { id: 'prazo', label: 'A Prazo', icon: Clock }
  ];

  const valorRestante = total - pagamentos.reduce((acc, p) => acc + p.valor, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#86cb92]/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#86cb92]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1f2937]">Finalizar Venda</h2>
              <p className="text-sm text-[#627271]">Selecione a forma de pagamento</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumo */}
        <div className="bg-[#86cb92]/10 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-[#627271]">Total da Venda</span>
            <span className="text-2xl font-bold text-[#86cb92]">
              {formatCurrency(total)}
            </span>
          </div>
          {valorRestante > 0 && pagamentos.length > 0 && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#86cb92]/20">
              <span className="text-sm text-[#627271]">Restante</span>
              <span className="text-lg font-semibold text-amber-600">
                {formatCurrency(valorRestante)}
              </span>
            </div>
          )}
        </div>

        {/* Formas de Pagamento */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#627271] mb-3">
            Forma de Pagamento
          </label>
          <div className="grid grid-cols-5 gap-3">
            {formasPagamento.map((forma) => (
              <button
                key={forma.id}
                onClick={() => setFormaPagamento(forma.id)}
                className={`
                  p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                  ${formaPagamento === forma.id
                    ? 'border-[#86cb92] bg-[#86cb92]/10 text-[#3e5653]'
                    : 'border-[#e5e7eb] hover:border-[#86cb92]/50 text-[#627271]'
                  }
                `}
              >
                <forma.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{forma.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detalhes do Pagamento Selecionado */}
        <div className="bg-[#efefef] rounded-xl p-4 mb-6">
          {formaPagamento === 'pix' && <PixPayment valor={valorRestante} />}
          {formaPagamento === 'dinheiro' && <DinheiroPayment valor={valorRestante} />}
          {formaPagamento.includes('cartao') && (
            <CartaoPayment 
              valor={valorRestante} 
              tipo={formaPagamento}
              parcelas={parcelas}
              onParcelasChange={setParcelas}
            />
          )}
          {formaPagamento === 'prazo' && <PrazoPayment valor={valorRestante} />}
        </div>

        {/* Pagamentos Adicionados */}
        {pagamentos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#627271] mb-3">
              Pagamentos Adicionados
            </h3>
            <div className="space-y-2">
              {pagamentos.map((pagamento, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#e5e7eb]"
                >
                  <div className="flex items-center gap-3">
                    {getPagamentoIcon(pagamento.forma)}
                    <span className="text-sm text-[#1f2937]">
                      {formatPagamento(pagamento.forma)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-[#1f2937]">
                      {formatCurrency(pagamento.valor)}
                    </span>
                    <button
                      onClick={() => removePagamento(index)}
                      className="p-1 text-[#627271] hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {valorRestante > 0 && (
              <button
                onClick={adicionarPagamento}
                className="mt-3 w-full py-2 text-sm text-[#86cb92] hover:text-[#3e5653] border border-dashed border-[#86cb92] hover:border-[#3e5653] rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar outra forma de pagamento
              </button>
            )}
          </div>
        )}

        {/* Ações */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={valorRestante > 0 || isProcessing}
            className="flex-[2] py-3 bg-[#86cb92] hover:bg-[#86cb92]/90 disabled:bg-[#e5e7eb] disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-[#86cb92]/30 transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Confirmar Pagamento
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// PIX Payment Component
function PixPayment({ valor }: { valor: number }) {
  const [qrCode, setQrCode] = useState<string>();
  const [status, setStatus] = useState<'waiting' | 'scanning' | 'confirmed'>('waiting');

  return (
    <div className="text-center">
      <div className="w-48 h-48 mx-auto bg-white rounded-lg p-4 mb-4">
        {qrCode ? (
          <img src={qrCode} alt="QR Code PIX" className="w-full h-full" />
        ) : (
          <div className="w-full h-full bg-[#efefef] rounded flex items-center justify-center">
            <QrCode className="w-16 h-16 text-[#627271]" />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-[#627271]">Chave PIX:</p>
        <code className="block px-4 py-2 bg-white rounded text-sm text-[#1f2937] font-mono">
          empresa@email.com
        </code>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
        <span className="text-sm text-amber-600">Aguardando pagamento...</span>
      </div>
    </div>
  );
}

// Dinheiro Payment Component
function DinheiroPayment({ valor }: { valor: number }) {
  const [recebido, setRecebido] = useState('');
  const troco = Number(recebido) - valor;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#627271] mb-2">
          Valor Recebido
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#627271]">R$</span>
          <input
            type="number"
            step="0.01"
            value={recebido}
            onChange={(e) => setRecebido(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-transparent rounded-lg text-lg text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
            placeholder="0,00"
            autoFocus
          />
        </div>
      </div>
      
      {Number(recebido) > 0 && (
        <div className={`p-4 rounded-lg ${troco >= 0 ? 'bg-emerald-100' : 'bg-red-100'}`}>
          <div className="flex items-center justify-between">
            <span className={`font-medium ${troco >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
              {troco >= 0 ? 'Troco' : 'Faltante'}
            </span>
            <span className={`text-xl font-bold ${troco >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
              {formatCurrency(Math.abs(troco))}
            </span>
          </div>
        </div>
      )}
      
      {/* Atalhos rápidos */}
      <div className="flex gap-2 flex-wrap">
        {[5, 10, 20, 50, 100, 200].map((valorAtalho) => (
          <button
            key={valorAtalho}
            onClick={() => setRecebido(valorAtalho.toString())}
            className="px-3 py-1.5 bg-white border border-[#e5e7eb] rounded-lg text-sm text-[#627271] hover:border-[#86cb92] hover:text-[#3e5653] transition-colors"
          >
            R$ {valorAtalho}
          </button>
        ))}
        <button
          onClick={() => setRecebido(valor.toString())}
          className="px-3 py-1.5 bg-[#86cb92]/10 border border-[#86cb92] rounded-lg text-sm text-[#3e5653] hover:bg-[#86cb92]/20 transition-colors"
        >
          Exato
        </button>
      </div>
    </div>
  );
}

// Cartão Payment Component
function CartaoPayment({ valor, tipo, parcelas, onParcelasChange }: CartaoProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#627271] mb-2">
          Valor
        </label>
        <div className="px-4 py-3 bg-white rounded-lg text-lg font-semibold text-[#1f2937]">
          {formatCurrency(valor)}
        </div>
      </div>
      
      {tipo === 'cartao_credito' && (
        <div>
          <label className="block text-sm font-medium text-[#627271] mb-2">
            Parcelas
          </label>
          <select
            value={parcelas}
            onChange={(e) => onParcelasChange(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white border border-transparent rounded-lg text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <option key={num} value={num}>
                {num}x de {formatCurrency(valor / num)} {num === 1 ? '' : '(sem juros)'}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Aguardando confirmação da máquina
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Peça ao cliente para inserir ou aproximar o cartão na máquina de cartão
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🖥️ Tela 5: Modal de Cancelamento

### URL
`Modal overlay em /vendas/:id`

### Descrição
Modal de confirmação para cancelamento de venda com solicitação de motivo e senha de administrador.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ ⚠️ CANCELAR VENDA                                   [X]            │   │
│   │                                                                     │   │
│   │  ┌───────────────────────────────────────────────────────────────┐ │   │
│   │  │ ⚠️ ATENÇÃO                                                    │ │   │
│   │  │                                                                │ │   │
│   │  │  Você está prestes a cancelar a venda #1024.                  │ │   │
│   │  │                                                                │ │   │
│   │  │  Esta ação:                                                   │ │   │
│   │  │  • Estornará o pagamento                                      │ │   │
│   │  │  • Devolverá os itens ao estoque                              │ │   │
│   │  │  • Não poderá ser desfeita                                    │ │   │
│   │  └───────────────────────────────────────────────────────────────┘ │   │
│   │                                                                     │   │
│   │  Motivo do Cancelamento *                                         │   │
│   │  ┌───────────────────────────────────────────────────────────────┐ │   │
│   │  │ Erro no lançamento                                            │ │   │
│   │  │                                                               │ │   │
│   │  └───────────────────────────────────────────────────────────────┘ │   │
│   │                                                                     │   │
│   │  Senha do Administrador *                                         │   │
│   │  ┌───────────────────────────────────────────────────────────────┐ │   │
│   │  │ ********                                                      │ │   │
│   │  └───────────────────────────────────────────────────────────────┘ │   │
│   │                                                                     │   │
│   │  [ ] Confirmo que desejo cancelar esta venda permanentemente      │   │
│   │                                                                     │   │
│   │              [Voltar]          [Confirmar Cancelamento]           │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Componentes Detalhados

#### 5.1 Modal de Cancelamento

```tsx
// Cancelamento Modal
export function CancelamentoModal({
  isOpen,
  onClose,
  venda,
  onConfirm
}: CancelamentoModalProps) {
  const [motivo, setMotivo] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const motivosPredefinidos = [
    'Erro no lançamento',
    'Cliente desistiu',
    'Produto com defeito',
    'Preço incorreto',
    'Duplicidade de venda',
    'Outro'
  ];

  const handleConfirm = async () => {
    if (!motivo || !senha) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    if (!confirmado) {
      setError('Confirme que deseja cancelar a venda');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onConfirm({ vendaId: venda.id, motivo, senha });
      onClose();
    } catch (err) {
      setError(err.message || 'Erro ao cancelar venda');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1f2937]">Cancelar Venda</h2>
            <p className="text-sm text-[#627271]">Venda #{venda.numero}</p>
          </div>
        </div>

        {/* Alerta */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-2">Atenção</h3>
          <p className="text-sm text-red-700 mb-3">
            Você está prestes a cancelar esta venda. Esta ação:
          </p>
          <ul className="text-sm text-red-700 space-y-1 ml-4">
            <li>• Estornará o pagamento do cliente</li>
            <li>• Devolverá todos os itens ao estoque</li>
            <li>• <strong>Não poderá ser desfeita</strong></li>
          </ul>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          {/* Motivo */}
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-2">
              Motivo do Cancelamento <span className="text-red-500">*</span>
            </label>
            <select
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full px-4 py-3 bg-[#efefef] border border-transparent rounded-lg text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
            >
              <option value="">Selecione um motivo</option>
              {motivosPredefinidos.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {motivo === 'Outro' && (
              <textarea
                placeholder="Descreva o motivo..."
                className="w-full mt-2 px-4 py-3 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all resize-none"
                rows={3}
              />
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-[#1f2937] mb-2">
              Senha do Administrador <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 bg-[#efefef] border border-transparent rounded-lg text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
                placeholder="Digite sua senha"
              />
            </div>
            <p className="text-xs text-[#627271] mt-1">
              Apenas administradores podem cancelar vendas
            </p>
          </div>

          {/* Confirmação */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmado}
              onChange={(e) => setConfirmado(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-[#e5e7eb] text-[#86cb92] focus:ring-[#86cb92]"
            />
            <span className="text-sm text-[#1f2937]">
              Confirmo que desejo cancelar esta venda permanentemente
            </span>
          </label>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#e5e7eb]">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-xl transition-colors"
          >
            Voltar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Cancelando...
              </>
            ) : (
              <>
                <Ban className="w-5 h-5" />
                Confirmar Cancelamento
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
```

---

## 📋 Regras de Negócio

### RN-VEN-001: Registro de Venda
**Descrição:** Toda venda deve registrar data, hora, operador, itens, valores e forma de pagamento.
**Validação:** Campos obrigatórios não podem estar vazios.
**Status:** ⏳ Pendente

### RN-VEN-002: Baixa Automática de Estoque
**Descrição:** Ao finalizar uma venda, o sistema deve automaticamente debitar a quantidade vendida do estoque de cada produto.
**Validação:** Não permitir venda se estoque insuficiente.
**Status:** ⏳ Pendente

### RN-VEN-003: Múltiplas Formas de Pagamento
**Descrição:** O sistema deve permitir dividir o pagamento entre múltiplas formas (ex: 50% dinheiro, 50% cartão).
**Validação:** Soma dos pagamentos deve igualar o total da venda.
**Status:** ⏳ Pendente

### RN-VEN-004: Processamento PIX
**Descrição:** Pagamentos via PIX devem aguardar confirmação antes de finalizar a venda.
**Validação:** Timeout de 5 minutos para confirmação.
**Status:** ⏳ Pendente

### RN-VEN-005: Controle de Troco
**Descrição:** Para pagamentos em dinheiro, o sistema deve calcular e exibir o valor do troco.
**Validação:** Valor recebido deve ser maior ou igual ao total da venda.
**Status:** ⏳ Pendente

### RN-VEN-006: Parcelamento
**Descrição:** Vendas no cartão de crédito podem ser parceladas em até 12x sem juros.
**Validação:** Valor mínimo por parcela: R$ 5,00.
**Status:** ⏳ Pendente

### RN-VEN-007: Vendas a Prazo
**Descrição:** Permitir vendas a prazo apenas para clientes cadastrados com limite de crédito disponível.
**Validação:** Verificar limite de crédito antes de permitir.
**Status:** ⏳ Pendente

### RN-VEN-008: Cancelamento de Venda
**Descrição:** Vendas podem ser canceladas apenas pelo administrador com senha e motivo.
**Validação:** Vendas com mais de 24 horas não podem ser canceladas.
**Status:** ⏳ Pendente

### RN-VEN-009: Restorno ao Estoque
**Descrição:** Ao cancelar uma venda, todos os itens devem ser devolvidos ao estoque.
**Validação:** Registrar log de restorno para auditoria.
**Status:** ⏳ Pendente

### RN-VEN-010: Emissão de Recibo
**Descrição:** Toda venda finalizada deve gerar um recibo em PDF com número único.
**Validação:** Número da venda deve ser sequencial e único.
**Status:** ⏳ Pendente

### RN-VEN-011: Reimpressão de Recibo
**Descrição:** Permitir reimpressão do recibo com indicação de "CÓPIA" no documento.
**Validação:** Registrar todas as reimpressões no log.
**Status:** ⏳ Pendente

### RN-VEN-012: Histórico de Buscas
**Descrição:** Manter histórico das últimas 10 vendas para acesso rápido no PDV.
**Validação:** Limpar cache ao fazer logout.
**Status:** ⏳ Pendente

### RN-VEN-013: Filtros de Período
**Descrição:** Histórico deve permitir filtro por período máximo de 90 dias.
**Validação:** Data inicial não pode ser maior que data final.
**Status:** ⏳ Pendente

### RN-VEN-014: Integração Financeira
**Descrição:** Vendas finalizadas devem gerar automaticamente receitas no módulo financeiro.
**Validação:** Sincronização em tempo real.
**Status:** ⏳ Pendente

### RN-VEN-015: Auditoria
**Descrição:** Todas as ações (venda, cancelamento, reimpressão) devem ser registradas em log de auditoria.
**Validação:** Logs não podem ser alterados ou excluídos.
**Status:** ⏳ Pendente

---

## ✅ Checklist de Implementação

### Estrutura Base
- [ ] Criar rotas do módulo (`/vendas`, `/vendas/pdv`, `/vendas/:id`)
- [ ] Configurar layout principal do módulo
- [ ] Implementar navegação entre telas
- [ ] Configurar guards de autenticação

### Componentes UI
- [ ] **Tela PDV**
  - [ ] Header do PDV
  - [ ] Busca rápida de produtos
  - [ ] Grid de produtos rápidos
  - [ ] Carrinho lateral com itens
  - [ ] Teclado numérico touch
  - [ ] Modal de finalização
  
- [ ] **Tela Histórico**
  - [ ] Filtros de período
  - [ ] Cards de resumo
  - [ ] Tabela de vendas
  - [ ] Paginação
  - [ ] Ações por venda
  
- [ ] **Tela Detalhes**
  - [ ] Header com informações
  - [ ] Timeline de status
  - [ ] Lista de itens
  - [ ] Informações do cliente
  - [ ] Informações de pagamento
  - [ ] Ações (imprimir, cancelar)
  
- [ ] **Modais**
  - [ ] Modal de pagamento
  - [ ] Modal de PIX com QR Code
  - [ ] Modal de cancelamento
  - [ ] Modal de confirmação

### Estados e Interações
- [ ] Estados de loading
- [ ] Estados de erro
- [ ] Estados empty (vazio)
- [ ] Estados hover e focus
- [ ] Animações de transição
- [ ] Feedback visual (toast/notificações)

### Responsividade
- [ ] Layout desktop (1920px)
- [ ] Layout laptop (1366px)
- [ ] Layout tablet (768px)
- [ ] Layout mobile (360px)
- [ ] Testes em modo touch
- [ ] Testes em modo teclado

### Integrações
- [ ] Integração com API de produtos
- [ ] Integração com API de vendas
- [ ] Integração com API de clientes
- [ ] Integração com módulo de estoque
- [ ] Integração com módulo financeiro
- [ ] Integração com serviço de PIX
- [ ] Integração com impressora/recibo

### Funcionalidades
- [ ] Busca de produtos por código/nome
- [ ] Adição/remoção de itens do carrinho
- [ ] Cálculo de subtotal, desconto e total
- [ ] Aplicação de desconto (valor/%)
- [ ] Seleção de forma de pagamento
- [ ] Pagamento múltiplo
- [ ] Geração de QR Code PIX
- [ ] Cálculo de troco (dinheiro)
- [ ] Parcelamento em cartão
- [ ] Finalização de venda
- [ ] Geração de recibo PDF
- [ ] Listagem de vendas com filtros
- [ ] Visualização de detalhes
- [ ] Reimpressão de recibo
- [ ] Cancelamento de venda

### Testes
- [ ] Testes unitários (Vitest)
- [ ] Testes de integração
- [ ] Testes de usabilidade
- [ ] Testes de acessibilidade (a11y)
- [ ] Testes de performance
- [ ] Testes em dispositivos reais

### Documentação
- [ ] Documentação dos componentes (Storybook)
- [ ] Guia de uso do PDV
- [ ] Manual de troubleshooting
- [ ] Documentação de API
- [ ] Changelog

---

## 🎨 Design Commitment

> 🎨 **DESIGN COMMITMENT:**
> - **Geometry:** Bordas arredondadas (8-16px) para interface amigável e touch-friendly
> - **Typography:** Poppins em toda a interface - semibold para títulos, regular para corpo
> - **Palette:** 
>   - Primary: `#3e5653` (Dark Slate Grey) - botões e ações principais
>   - Accent: `#86cb92` (Emerald) - valores, sucesso, destaques
>   - Background: `#efefef` (Platinum) - fundo limpo
>   - Text: `#1f2937` (Jet Black) - legibilidade máxima
>   - Secondary: `#627271` (Dim Grey) - textos auxiliares
>   - NO PURPLE - Ban ✅
> - **Effects/Motion:** 
>   - Sombras sutis (`shadow-sm` a `shadow-lg`)
>   - Transições suaves (150-300ms, ease-out)
>   - Feedback tátil em botões (scale 0.98 no active)
>   - Loading states com spinners
> - **Layout uniqueness:** 
>   - PDV com carrinho lateral fixo (30% width)
>   - Área de produtos responsiva em grid
>   - Teclado numérico para tablets integrado
>   - Cores de status claras (emerald=pago, amber=pendente, red=cancelado)

---

## 📱 Responsividade

### Breakpoints

```css
/* Mobile First */
sm: 640px   /* Tablets pequenos */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Telas grandes */
```

### Comportamento por Tela

#### PDV (Touch Interface)
- **Mobile (< 768px):** Layout empilhado, carrinho em modal inferior
- **Tablet (768px - 1024px):** Layout split 60/40, teclado numérico visível
- **Desktop (> 1024px):** Layout split 70/30, busca por atalho de teclado

#### Histórico
- **Mobile:** Cards em vez de tabela, filtros em accordion
- **Tablet/ Desktop:** Tabela completa com colunas responsivas

#### Detalhes
- **Mobile:** Seções em accordion, ações em FAB (Floating Action Button)
- **Desktop:** Layout em grid 2 colunas, todas as informações visíveis

---

## 🔐 Acessibilidade (a11y)

### Requisitos Implementados
- [ ] Navegação por teclado completa
- [ ] Atalhos de teclado documentados (F2 para busca, F4 para pagamento)
- [ ] Contraste mínimo 4.5:1 para textos
- [ ] Estados de foco visíveis (ring-2 ring-[#86cb92])
- [ ] Labels semânticos em todos os inputs
- [ ] Roles ARIA em componentes complexos
- [ ] Skip links para navegação rápida
- [ ] Anúncios de leitura de tela para ações importantes

---

## 📊 Métricas de Sucesso

### KPIs
- Tempo médio de venda no PDV: < 2 minutos
- Taxa de erro no lançamento: < 1%
- Taxa de cancelamento: < 3%
- Satisfação do usuário: > 4.5/5

### Performance
- First Contentful Paint (FCP): < 1.5s
- Time to Interactive (TTI): < 3s
- Bundle size: < 200KB (lazy loaded)
- API response time: < 500ms

---

**Documento Version:** 1.0.0  
**Last Updated:** 2024-03-12  
**Author:** UNIQ Design Team  
**Reviewers:** [A definir]
