# Módulo 06: Vendas - Relatórios - UI/UX Documentation

## 📋 Metadados do Documento

| Campo | Valor |
|-------|-------|
| **Módulo** | Vendas & PDV - Relatórios |
| **Código** | MOD-VEN-REL-001 |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Prioridade** | MUST HAVE (MVP) |
| **Autor** | UNIQ Design Team |
| **Data de Criação** | 2024-03-12 |
| **Última Atualização** | 2024-03-12 |
| **Stack** | Next.js 14 + React 18 + TypeScript + Tailwind CSS + Lucide React + Recharts |

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
  --emerald: #86cb92;          /* Sucesso, crescimento */
  --white: #ffffff;            /* Cards, superfícies */
  
  /* Cores de Status */
  --success: #86cb92;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
  
  /* Cores de Gráficos */
  --chart-primary: #86cb92;
  --chart-secondary: #3e5653;
  --chart-tertiary: #627271;
  --chart-quaternary: #f59e0b;
  --chart-quinary: #3b82f6;
  
  /* Bordas */
  --border: #e5e7eb;
  --border-light: #f3f4f6;
}
```

### Ícones (Lucide React)

```typescript
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  FileText,
  Printer,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ChevronDown,
  MoreHorizontal,
  Eye,
  FileSpreadsheet,
  FileJson,
  Share2
} from 'lucide-react';
```

---

## 🖥️ Tela 1: Dashboard de Relatórios de Vendas

### URL
`/vendas/relatorios`

### Descrição
Visão geral dos relatórios disponíveis com resumo do período atual e acesso rápido aos relatórios mais utilizados.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER (64px)                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 📊 Relatórios de Vendas                                              │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ RESUMO DO PERÍODO                                                  │   │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │   │
│  │ │ 💰 Total    │ │ 🛒 Vendas   │ │ 📈 Ticket   │ │ 🎯 Meta     │    │   │
│  │ │ R$ 45.890   │ │    234      │ │   R$ 196    │ │   92%       │    │   │
│  │ │ ↑ 12%       │ │ ↑ 8%        │ │ ↑ 3%        │ │ ↑ 5%        │    │   │
│  │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ RELATÓRIOS DISPONÍVEIS                                             │   │
│  │                                                                    │   │
│  │  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐   │   │
│  │  │ 📈 Vendas por    │ │ 👤 Vendas por    │ │ 📦 Vendas por    │   │   │
│  │  │    Período       │ │    Vendedor      │ │    Produto       │   │   │
│  │  │                  │ │                  │ │                  │   │   │
│  │  │  Análise         │ │  Ranking de      │ │  Produtos mais   │   │   │
│  │  │  detalhada por   │ │  vendedores e    │ │  vendidos e      │   │   │
│  │  │  dia, semana,    │ │  comissões       │ │  curva ABC       │   │   │
│  │  │  mês ou ano      │ │                  │ │                  │   │   │
│  │  │                  │ │  [Acessar →]     │ │  [Acessar →]     │   │   │
│  │  │  [Acessar →]     │ │                  │ │                  │   │   │
│  │  └──────────────────┘ └──────────────────┘ └──────────────────┘   │   │
│  │                                                                    │   │
│  │  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐   │   │
│  │  │ 💳 Formas de     │ │ 🕐 Vendas por    │ │ 🏷️ Vendas por    │   │   │
│  │  │    Pagamento     │ │    Hora          │ │    Categoria     │   │   │
│  │  │                  │ │                  │ │                  │   │   │
│  │  │  Distribuição    │ │  Picos de        │ │  Performance     │   │   │
│  │  │  PIX, cartão,    │ │  vendas por      │ │  por categoria   │   │   │
│  │  │  dinheiro, etc   │ │  horário do dia  │ │  de produtos     │   │   │
│  │  │                  │ │                  │ │                  │   │   │
│  │  │  [Acessar →]     │ │  [Acessar →]     │ │  [Acessar →]     │   │   │
│  │  └──────────────────┘ └──────────────────┘ └──────────────────┘   │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ GRÁFICO DE EVOLUÇÃO                                                │   │
│  │                                                                    │   │
│  │  R$ 50k ┤                                    ╭────╮               │   │
│  │         │                              ╭────╯    │               │   │
│  │  R$ 40k ┤                        ╭────╯         ╰──╮            │   │
│  │         │                  ╭────╯                  │            │   │
│  │  R$ 30k ┤            ╭────╯                       ╰──╮         │   │
│  │         │      ╭────╯                               │         │   │
│  │  R$ 20k ┤ ╭────╯                                    ╰────╮    │   │
│  │         │╭╯                                              ╰──╮ │   │
│  │  R$ 10k ┤╯                                                   ╰│   │
│  │         └┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬  │   │
│  │          Jan  Fev  Mar  Abr  Mai  Jun  Jul  Ago  Set  Out     │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 2: Relatório de Vendas por Período

### URL
`/vendas/relatorios/por-periodo`

### Descrição
Relatório detalhado de vendas filtradas por período, com gráficos de evolução, comparação com períodos anteriores e exportação de dados.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ← Vendas por Período                [📥 Exportar] [🖨️ Imprimir]        │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ FILTROS                                                            │   │
│  │ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────────┐   │   │
│  │ │ 📅 De:    │ │ 📅 Até:   │ │ 👤 Vend.  │ │ 📊 Agrupar:     │   │   │
│  │ │01/03/2024 │ │31/03/2024 │ │ [Todos ▼] │ │ [Diário    ▼]   │   │   │
│  │ └────────────┘ └────────────┘ └────────────┘ └──────────────────┘   │   │
│  │                                                                    │   │
│  │ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────────┐   │   │
│  │ │ 🏷️ Cat.   │ │ 💳 Pagto. │ │ 🏪 Loja   │ │ [🔍 Filtrar]    │   │   │
│  │ │ [Todas ▼] │ │ [Todos ▼] │ │ [Todas ▼] │ │ [Limpar]        │   │   │
│  │ └────────────┘ └────────────┘ └────────────┘ └──────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ INDICADORES DO PERÍODO                                             │   │
│  │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │   │
│  │ │ 💰 Receita   │ │ 🛒 Quant.    │ │ 📈 Ticket    │ │ 🔄 Média     │ │   │
│  │ │ R$ 45.890    │ │ 234 vendas   │ │ R$ 196,11    │ │ R$ 1.531/dia │ │   │
│  │ │ ↑ 12% vs mês │ │ ↑ 8% vs mês  │ │ ↑ 3% vs mês  │ │ ↑ 5% vs mês  │ │   │
│  │ │    anterior  │ │    anterior  │ │    anterior  │ │    anterior  │ │   │
│  │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ GRÁFICO DE VENDAS POR DIA                                          │   │
│  │                                                                    │   │
│  │  R$ 3k ┤                                          ╭──╮             │   │
│  │        │                              ╭────────╮ │  │             │   │
│  │  R$ 2k ┤        ╭────╮    ╭────╮     │        │╭╯  ╰╮            │   │
│  │        │  ╭────╯    ╰────╯    ╰─────╯        ╰╯     ╰───        │   │
│  │  R$ 1k ┤──╯                                                       │   │
│  │        └┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬  │   │
│  │         01  02  03  04  05  06  07  08  09  10  11  12  13  14  15 │   │
│  │                                                                    │   │
│  │  ═══════ Receita    ─ ─ ─ Meta                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ TABELA DETALHADA                                                   │   │
│  │                                                                    │   │
│  │  Data       Dia       Vendas    Receita     Ticket    %Meta       │   │
│  │ ─────────────────────────────────────────────────────────────────  │   │
│  │  01/03/2024 Sex      12        R$ 2.450    R$ 204     102%        │   │
│  │  02/03/2024 Sáb      18        R$ 3.890    R$ 216     156%        │   │
│  │  03/03/2024 Dom      15        R$ 2.980    R$ 199     124%        │   │
│  │  04/03/2024 Seg       8        R$ 1.450    R$ 181      73%        │   │
│  │  ...                                                               │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 3: Relatório de Vendas por Produto

### URL
`/vendas/relatorios/por-produto`

### Descrição
Relatório de performance de produtos com ranking de mais vendidos, curva ABC, análise de giro e margem.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ← Vendas por Produto                [📥 Exportar] [🖨️ Imprimir]        │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ FILTROS                                                            │   │
│  │ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────────┐   │   │
│  │ │ 📅 De:    │ │ 📅 Até:   │ │ 🏷️ Cat.   │ │ 📊 Ordenar:     │   │   │
│  │ │01/03/2024 │ │31/03/2024 │ │ [Todas ▼] │ │ [Qtd Vendida ▼] │   │   │
│  │ └────────────┘ └────────────┘ └────────────┘ └──────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ TOP 5 PRODUTOS                                                     │   │
│  │ ┌────────────────────────────────────────────────────────────────┐ │   │
│  │ │                                                                │ │   │
│  │ │  🥇 Arroz Integral 5kg    145 und    R$ 4.336    9.4%        │ │   │
│  │ │     ████████████████████████████████████████                   │ │   │
│  │ │                                                                │ │   │
│  │ │  🥈 Óleo de Soja 900ml    132 und    R$ 1.307    2.8%        │ │   │
│  │ │     █████████████████████████████████                          │ │   │
│  │ │                                                                │ │   │
│  │ │  🥉 Café Pilão 500g       128 und    R$ 2.547    5.5%        │ │   │
│  │ │     ████████████████████████████████                           │ │   │
│  │ │                                                                │ │   │
│  │ │  4. Leite Integral 1L     115 und    R$ 1.149    2.5%        │ │   │
│  │ │     █████████████████████████████                              │ │   │
│  │ │                                                                │ │   │
│  │ │  5. Feijão Carioca 1kg    98 und     R$   833    1.8%        │ │   │
│  │ │     ██████████████████████████                                 │ │   │
│  │ │                                                                │ │   │
│  │ └────────────────────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ CURVA ABC                                                          │   │
│  │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                 │   │
│  │ │ 🅰️ Classe A   │ │ 🅱️ Classe B   │ │ ©️ Classe C   │                 │   │
│  │ │    12 itens  │ │    28 itens  │ │   145 itens  │                 │   │
│  │ │    80% vendas│ │    15% vendas│ │    5% vendas │                 │   │
│  │ │    R$36.712  │ │    R$ 6.884  │ │    R$ 2.294  │                 │   │
│  │ └──────────────┘ └──────────────┘ └──────────────┘                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ TABELA COMPLETA DE PRODUTOS                                        │   │
│  │                                                                    │   │
│  │  Produto              Categoria    Qtd    Receita   Margem  Classe │   │
│  │ ─────────────────────────────────────────────────────────────────  │   │
│  │  Arroz Integral 5kg   Alimentos    145    R$ 4.336   25%    A      │   │
│  │  Óleo de Soja 900ml   Alimentos    132    R$ 1.307   18%    A      │   │
│  │  Café Pilão 500g      Bebidas      128    R$ 2.547   32%    A      │   │
│  │  ...                                                               │   │
│  │                                                                    │   │
│  │                                            [<] 1 2 3 ... 10 [>]   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 4: Relatório de Vendas por Vendedor

### URL
`/vendas/relatorios/por-vendedor`

### Descrição
Ranking de vendedores com análise de performance, comissões, ticket médio e comparativos entre períodos.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                      │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ← Vendas por Vendedor               [📥 Exportar] [🖨️ Imprimir]        │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ PODIUM DOS VENDEDORES                                              │   │
│  │                                                                    │   │
│  │           🥈                      🥇                      🥉       │   │
│  │         ┌────┐                  ┌────┐                  ┌────┐     │   │
│  │         │ 👤 │                  │ 👤 │                  │ 👤 │     │   │
│  │         │Maria│                 │José │                 │Ana  │     │   │
│  │         └────┘                  └────┘                  └────┘     │   │
│  │       R$ 18.450                 R$ 22.890               R$ 15.230  │   │
│  │        89 vendas                112 vendas              76 vendas  │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ COMPARATIVO DE PERFORMANCE                                         │   │
│  │                                                                    │   │
│  │  Vendedor      Vendas    Receita    Ticket    Meta    %Meta       │   │
│  │ ─────────────────────────────────────────────────────────────────  │   │
│  │  🥇 José       112       R$ 22.890  R$ 204   R$20k    114%  ↑     │   │
│  │  🥈 Maria       89       R$ 18.450  R$ 207   R$18k    103%  →     │   │
│  │  🥉 Ana         76       R$ 15.230  R$ 200   R$16k     95%  ↓     │   │
│  │  4. Pedro       64       R$ 12.480  R$ 195   R$14k     89%  ↓     │   │
│  │  5. Carla       58       R$ 10.990  R$ 189   R$12k     92%  →     │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ GRÁFICO: VENDAS POR VENDEDOR                                       │   │
│  │                                                                    │   │
│  │  José    █████████████████████████████████████████████████  22.9k │   │
│  │  Maria   ██████████████████████████████████████████████     18.5k │   │
│  │  Ana     ████████████████████████████████████████           15.2k │   │
│  │  Pedro   ██████████████████████████████████                 12.5k │   │
│  │  Carla   ████████████████████████████████                   11.0k │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ DETALHAMENTO POR VENDEDOR                                          │   │
│  │                                                                    │   │
│  │  [José ▼]                                                          │   │
│  │                                                                    │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐   │   │
│  │  │ Total Vendas │ │ Total Receita│ │ Ticket Médio │ │ Comissão │   │   │
│  │  │     112      │ │  R$ 22.890   │ │   R$ 204,37  │ │ R$ 1.145 │   │   │
│  │  └──────────────┘ └──────────────┘ └──────────────┘ └──────────┘   │   │
│  │                                                                    │   │
│  │  Evolução diária:                                                  │   │
│  │  Seg: R$ 890 | Ter: R$ 1.230 | Qua: R$ 1.450 | Qui: R$ 1.120 | ... │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Componentes Detalhados

### Componente: Card de Relatório

```tsx
interface RelatorioCardProps {
  title: string;
  description: string;
  icon: React.ComponentType;
  href: string;
  badge?: string;
}

export function RelatorioCard({ title, description, icon: Icon, href, badge }: RelatorioCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6 hover:shadow-md hover:border-[#86cb92] transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-[#86cb92]/10 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#86cb92]" />
        </div>
        {badge && (
          <span className="px-2 py-1 bg-[#86cb92]/10 text-[#3e5653] text-xs font-medium rounded-full">
            {badge}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-[#1f2937] mb-2 group-hover:text-[#3e5653] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-[#627271] mb-4">
        {description}
      </p>
      
      <div className="flex items-center text-sm font-medium text-[#86cb92]">
        Acessar
        <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </Link>
  );
}
```

### Componente: Indicador de Performance

```tsx
interface IndicadorCardProps {
  title: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  icon: React.ComponentType;
}

export function IndicadorCard({ title, value, trend, trendLabel, icon: Icon }: IndicadorCardProps) {
  const isPositive = trend && trend >= 0;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-[#86cb92]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#86cb92]" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {isPositive ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      
      <p className="text-2xl font-bold text-[#1f2937] mb-1">{value}</p>
      <p className="text-sm text-[#627271]">{title}</p>
      
      {trendLabel && (
        <p className="text-xs text-[#627271]/70 mt-2">{trendLabel}</p>
      )}
    </div>
  );
}
```

### Componente: Gráfico de Linhas

```tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GraficoVendasProps {
  data: Array<{
    data: string;
    receita: number;
    meta: number;
  }>;
}

export function GraficoVendas({ data }: GraficoVendasProps) {
  const formatCurrency = (value: number) => 
    `R$ ${(value / 1000).toFixed(1)}k`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
      <h3 className="text-lg font-semibold text-[#1f2937] mb-6">
        Evolução de Vendas
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="data" 
              stroke="#627271"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#627271"
              fontSize={12}
              tickLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              formatter={(value: number) => 
                value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px'
              }}
            />
            
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="#86cb92" 
              strokeWidth={3}
              dot={{ fill: '#86cb92', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="meta" 
              stroke="#627271" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-[#86cb92] rounded" />
          <span className="text-sm text-[#627271]">Receita</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-[#627271] border-t border-dashed" />
          <span className="text-sm text-[#627271]">Meta</span>
        </div>
      </div>
    </div>
  );
}
```

### Componente: Filtros de Relatório

```tsx
interface FiltrosRelatorioProps {
  filtros: {
    dataInicio: string;
    dataFim: string;
    vendedor?: string;
    categoria?: string;
    formaPagamento?: string;
    agrupamento: 'diario' | 'semanal' | 'mensal';
  };
  onChange: (filtros: FiltrosRelatorioProps['filtros']) => void;
  onApply: () => void;
  onClear: () => void;
}

export function FiltrosRelatorio({ filtros, onChange, onApply, onClear }: FiltrosRelatorioProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Data Início */}
        <div>
          <label className="block text-xs font-medium text-[#627271] mb-1.5">
            De
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
            <input
              type="date"
              value={filtros.dataInicio}
              onChange={(e) => onChange({ ...filtros, dataInicio: e.target.value })}
              className="w-full pl-10 pr-3 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
            />
          </div>
        </div>

        {/* Data Fim */}
        <div>
          <label className="block text-xs font-medium text-[#627271] mb-1.5">
            Até
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
            <input
              type="date"
              value={filtros.dataFim}
              onChange={(e) => onChange({ ...filtros, dataFim: e.target.value })}
              className="w-full pl-10 pr-3 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
            />
          </div>
        </div>

        {/* Agrupamento */}
        <div>
          <label className="block text-xs font-medium text-[#627271] mb-1.5">
            Agrupar por
          </label>
          <select
            value={filtros.agrupamento}
            onChange={(e) => onChange({ ...filtros, agrupamento: e.target.value as any })}
            className="w-full px-3 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
          </select>
        </div>

        {/* Ações */}
        <div className="flex items-end gap-2">
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors"
          >
            Limpar
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-4 py-2 bg-[#3e5653] hover:bg-[#1f2937] text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
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
          { label: 'Mês passado', value: 'lastMonth' },
          { label: 'Este ano', value: 'thisYear' }
        ].map((periodo) => (
          <button
            key={periodo.value}
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

### Componente: Tabela de Dados com Paginação

```tsx
interface TabelaRelatorioProps<T> {
  columns: Array<{
    key: string;
    title: string;
    align?: 'left' | 'center' | 'right';
    render?: (item: T) => React.ReactNode;
  }>;
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  pagination?: {
    current: number;
    total: number;
    onChange: (page: number) => void;
  };
}

export function TabelaRelatorio<T extends Record<string, any>>({
  columns,
  data,
  loading,
  emptyMessage = 'Nenhum dado encontrado',
  pagination
}: TabelaRelatorioProps<T>) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-12">
        <div className="flex items-center justify-center gap-3 text-[#627271]">
          <div className="w-6 h-6 border-2 border-[#86cb92] border-t-transparent rounded-full animate-spin" />
          Carregando dados...
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-12 text-center">
        <FileText className="w-12 h-12 text-[#e5e7eb] mx-auto mb-3" />
        <p className="text-[#627271]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#efefef]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-semibold text-[#627271] uppercase tracking-wider ${
                    col.align === 'right' ? 'text-right' : 
                    col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#e5e7eb]">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-[#efefef]/50 transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-4 whitespace-nowrap ${
                      col.align === 'right' ? 'text-right' : 
                      col.align === 'center' ? 'text-center' : 'text-left'
                    }`}
                  >
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-4 py-3 border-t border-[#e5e7eb] flex items-center justify-between">
          <span className="text-sm text-[#627271]">
            Página {pagination.current} de {pagination.total}
          </span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onChange(pagination.current - 1)}
              disabled={pagination.current === 1}
              className="p-2 text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors disabled:opacity-50"
            >
              Anterior
            </button>
            
            {Array.from({ length: Math.min(5, pagination.total) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => pagination.onChange(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    pagination.current === page
                      ? 'bg-[#3e5653] text-white'
                      : 'text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef]'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => pagination.onChange(pagination.current + 1)}
              disabled={pagination.current === pagination.total}
              className="p-2 text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef] rounded-lg transition-colors disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 📋 Formulários

### Formulário: Filtros de Período

| Campo | Tipo | Obrigatório | Valor Padrão | Descrição |
|-------|------|-------------|--------------|-----------|
| `data_inicio` | Date | Sim | Início do mês atual | Data inicial do período |
| `data_fim` | Date | Sim | Data atual | Data final do período |
| `vendedor_id` | Select | Não | null | Filtrar por vendedor específico |
| `categoria_id` | Select | Não | null | Filtrar por categoria |
| `forma_pagamento` | Select | Não | null | Filtrar por forma de pagamento |
| `loja_id` | Select | Não | null | Filtrar por loja (multi-loja) |
| `agrupamento` | Select | Sim | `diario` | Agrupamento dos dados |

### Formulário: Filtros por Produto

| Campo | Tipo | Obrigatório | Valor Padrão | Descrição |
|-------|------|-------------|--------------|-----------|
| `data_inicio` | Date | Sim | Início do mês atual | Data inicial do período |
| `data_fim` | Date | Sim | Data atual | Data final do período |
| `categoria_id` | Select | Não | null | Filtrar por categoria |
| `ordenar_por` | Select | Sim | `quantidade` | Ordenação dos resultados |
| `limite` | Number | Sim | `100` | Máximo de produtos |

### Formulário: Filtros por Vendedor

| Campo | Tipo | Obrigatório | Valor Padrão | Descrição |
|-------|------|-------------|--------------|-----------|
| `data_inicio` | Date | Sim | Início do mês atual | Data inicial do período |
| `data_fim` | Date | Sim | Data atual | Data final do período |
| `vendedor_id` | Select | Não | null | Filtrar vendedor específico |
| `incluir_inativos` | Toggle | Não | `false` | Incluir vendedores inativos |

---

## 🎭 Estados da Interface

### Estado: Carregando Dados

```tsx
export function RelatorioLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-[#86cb92] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[#627271]">Gerando relatório...</p>
      <p className="text-xs text-[#627271]/70 mt-1">Isso pode levar alguns segundos</p>
    </div>
  );
}
```

### Estado: Sem Dados

```tsx
export function RelatorioEmptyState({ onAdjustFilters }: { onAdjustFilters: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-[#efefef] rounded-full flex items-center justify-center mb-4">
        <BarChart3 className="w-10 h-10 text-[#627271]" />
      </div>
      <h3 className="text-lg font-semibold text-[#1f2937] mb-2">
        Nenhum dado encontrado
      </h3>
      <p className="text-sm text-[#627271] mb-6 max-w-md">
        Não foram encontrados registros para o período e filtros selecionados. Tente ajustar os filtros.
      </p>
      <button
        onClick={onAdjustFilters}
        className="px-6 py-3 bg-[#3e5653] text-white rounded-xl font-medium hover:bg-[#1f2937] transition-colors"
      >
        Ajustar Filtros
      </button>
    </div>
  );
}
```

---

## 📜 Regras de Negócio

### RN-REL-001: Período Máximo
O período máximo para relatórios é de 12 meses. Períodos maiores devem ser solicitados via exportação.

### RN-REL-002: Permissões
Apenas usuários com perfil "Administrador", "Gerente" ou "Supervisor" podem acessar relatórios de vendas. Vendedores comuns só visualizam seus próprios dados.

### RN-REL-003: Cache de Dados
Relatórios são cacheados por 5 minutos para melhor performance. Dados em tempo real disponíveis apenas no dashboard.

### RN-REL-004: Exportação
Exportações em PDF e Excel disponíveis para todos os relatórios. Limite de 10.000 registros por exportação.

### RN-REL-005: Curva ABC
Cálculo da curva ABC: Classe A (80% do faturamento), Classe B (15%), Classe C (5%).

### RN-REL-006: Ticket Médio
Ticket médio = Total de vendas / Número de vendas. Considera apenas vendas finalizadas.

### RN-REL-007: Comparação de Períodos
Comparações sempre são feitas com o período equivalente anterior (mesmo número de dias).

### RN-REL-008: Metas
Metas de vendas são configuradas por vendedor e por período. Ausência de meta exibe apenas realizado.

---

## ✅ Checklist de Implementação

### Estrutura
- [ ] Criar página `/vendas/relatorios` (dashboard)
- [ ] Criar página `/vendas/relatorios/por-periodo`
- [ ] Criar página `/vendas/relatorios/por-produto`
- [ ] Criar página `/vendas/relatorios/por-vendedor`
- [ ] Criar página `/vendas/relatorios/por-forma-pagamento`
- [ ] Criar página `/vendas/relatorios/por-hora`

### Componentes
- [ ] Componente `RelatorioCard` - Cards de navegação
- [ ] Componente `IndicadorCard` - KPIs de performance
- [ ] Componente `FiltrosRelatorio` - Filtros comuns
- [ ] Componente `GraficoVendas` - Gráfico de linhas
- [ ] Componente `GraficoBarras` - Gráfico de barras
- [ ] Componente `GraficoPizza` - Distribuição
- [ ] Componente `TabelaRelatorio` - Tabela com dados
- [ ] Componente `ExportMenu` - Menu de exportação

### Integrações
- [ ] API GET `/api/relatorios/resumo` - Resumo do período
- [ ] API GET `/api/relatorios/por-periodo` - Vendas por período
- [ ] API GET `/api/relatorios/por-produto` - Vendas por produto
- [ ] API GET `/api/relatorios/por-vendedor` - Vendas por vendedor
- [ ] API GET `/api/relatorios/exportar` - Exportação de dados

### Estados
- [ ] Estado de carregamento inicial
- [ ] Estado de geração de relatório
- [ ] Estado sem dados
- [ ] Estado de erro na API
- [ ] Estado de exportação em progresso

### Validações
- [ ] Validação de período máximo (12 meses)
- [ ] Validação de data início < data fim
- [ ] Validação de permissões do usuário
- [ ] Validação de limite de exportação

### Testes
- [ ] Teste de filtros por período
- [ ] Teste de comparativos
- [ ] Teste de exportação PDF
- [ ] Teste de exportação Excel
- [ ] Teste de performance com grandes volumes

---

## 📝 Notas de Implementação

### Performance
- Usar paginação server-side para tabelas grandes
- Implementar debounce de 500ms nos filtros
- Cache de dados no localStorage por 5 minutos
- Lazy load dos gráficos

### Gráficos
- Biblioteca recomendada: Recharts
- Responsividade automática
- Tooltips customizados com valores formatados
- Opção de download do gráfico como imagem

### Exportação
- PDF: Biblioteca jsPDF ou react-pdf
- Excel: Biblioteca xlsx
- CSV: Geração nativa
- Limitar exportações por minuto por usuário
