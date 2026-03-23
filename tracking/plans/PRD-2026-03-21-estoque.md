# PRD: Sprint 12 - Módulo Estoque

**Data:** 21/03/2026 14:30:00-03:00  
**Researcher:** Vibe Researcher Agent  
**Topic:** Sprint 12 - Interface de Gestão de Estoque Completa  
**Tags:** estoque, produtos, inventory, movements, labels, categories  
**Status:** complete  
**Last Updated:** 2026-03-21  
**Last Updated By:** Vibe Researcher Agent  

---

## Problema

O entrepreneur brasileiro (público-alvo da UNIQ) enfrenta diariamente o desafio de gerenciar seu estoque de forma eficiente, muitas vezes sem ferramentas adequadas. As dores específicas identificadas são:

1. **Desorganização de inventário:** Não saber exatamente quantos produtos tem em estoque
2. **Perda de vendas por falta de controle:** Produto acaba e o cliente vai para o concorrente
3. **Dificuldade em precificar:** Não saber se está tendo lucro ou prejuízo por produto
4. **Processos manuais demorados:** Contagem física, entrada manual, etiquetação uma a uma
5. **Falta de visibilidade:** Não saber quais produtos vendem mais ou estão parados

### Contexto UNIQ

Conforme documentado em `docs/CONTEXTO_PROJETO.md`:
- **Anti-ERP:** O módulo de Estoque não emite NF (sem módulo fiscal no MVP)
- **Integração PDV:** Planejado para Sprint 13, onde o Estoque será alimentado automaticamente
- **Público:** "Empreendedor na correria" - precisa de algo simples e rápido

---

## Solução

Implementar uma **interface completa de gestão de estoque** que permita ao entrepreneur:

1. **Visualizar** o estado atual do estoque em tempo real
2. **Cadastrar** produtos com variações, imagens e preços
3. **Controlar** entradas e saídas com histórico completo
4. **Alertar** sobre estoque baixo automaticamente
5. **Gerar** etiquetas com códigos de barras para organização
6. **Categorizar** produtos de forma hierárquica

### Escopo da Sprint 12 (UI)

| Funcionalidade | Prioridade | Status |
|---------------|-----------|--------|
| Dashboard de Estoque | 🔴 CRÍTICA | Implementar |
| Lista de Produtos (grid/lista) | 🔴 CRÍTICA | Implementar |
| Cadastro de Produto | 🔴 CRÍTICA | Implementar |
| Entrada/Saída Manual | 🟡 ALTA | Implementar |
| Entrada em Massa (CSV) | 🟡 ALTA | Implementar |
| Categorias Hierárquicas | 🟡 ALTA | Implementar |
| Gerador de Etiquetas | 🟢 MÉDIA | Implementar |
| Movimentações/Histórico | 🟡 ALTA | Implementar |

---

## Personas

### Maria - Dona de Loja de Óculos
- **Perfil:** 42 anos, loja física há 8 anos
- **Dores:** Não sabe quantos óculos tem de cada modelo, perde tempo procurando
- **Neces
sita:** Cadastrar produtos com variações (cor, tamanho), imprimir etiquetas
- **Fluxo:** Cadastra produto → Entra mercadoria → Gera etiquetas para prateleiras

### João - Proprietário de Gráfica
- **Perfil:** 35 anos, gráfica pequeno porte
- **Dores:** Trabalho sob encomenda, dificuldade em controlar papel e tinta
- **Neces
sita:** Controlar matéria-prima, alertas de reposição
- **Fluxo:** Recebe pedido → Baixa do estoque → Alerta quando material está acabando

### Ana - Empreendedora de E-commerce
- **Perfil:** 28 anos, vende moda online via Instagram
- **Dores:** Vende e só depois descobre que não tem em estoque
- **Neces
sita:** Sincronizar estoque com vendas, Shopify/Instagram integração
- **Fluxo:**PDV conecta com Estoque → Venda desconta automaticamente

---

## Funcionalidades

### 1. Dashboard de Estoque (`/estoque`)

**Objetivo:** Visão panorâmica do estado do estoque com métricas e alertas

#### Cards de Métricas (Grid 4 colunas)

| Card | Ícone | Cor | Conteúdo |
|------|-------|-----|----------|
| Total de Produtos | `Package` | `#86cb92` (accent) | Quantidade total cadastrada |
| Valor em Estoque | `DollarSign` | `#3e5653` (primary) | Somatório (quantidade × custo) |
| Estoque Baixo | `AlertTriangle` | `#f59e0b` (warning) | Quantidade abaixo do mínimo |
| Sem Estoque | `XCircle` | `#ef4444` (error) | Produtos esgotados |

#### Lista de Alertas
- Ordenada por criticidade: Crítico > Baixo > OK
- Mostra: imagem, nome, SKU, estoque atual, estoque mínimo, status badge
- Ação rápida: botão "Comprar" (gera sugestão de ordem de compra futura)

#### Gráfico de Giro
- Top 5 produtos mais vendidos no período
- Filtros: 7 dias, 30 dias, 3 meses
- Barras horizontais com percentage

#### Ações Rápidas
- Novo Produto
- Entrada em Massa (CSV)
- Inventário
- Relatórios

### 2. Lista de Produtos (`/estoque/produtos`)

**Objetivo:** Visualizar, buscar e gerenciar todos os produtos

#### Barra de Busca e Filtros
- Busca em tempo real: nome, SKU, código de barras
- Filtros: Categoria, Status (Ativo/Inativo), Estoque (OK/Baixo/Crítico/Esgotado)
- Toggle: Grid View / Lista View

#### Grid View
- Cards com: imagem, badge de estoque, nome, SKU, quantidade, preço
- Hover: shadow + translate-y, aparece botão de ações
- 24 produtos por página

#### Lista View
- Tabela com: produto, SKU, estoque (badge colorido), preço, status, ações
- Ações: Editar, Visualizar, Excluir
- Paginação

#### Estados
- Loading: skeleton com pulse animation
- Vazio: ilustração + CTA "Cadastre seu primeiro produto"
- Erro: mensagem + botão retry

### 3. Cadastro de Produto (`/estoque/produtos/novo`, `/estoque/produtos/:id`)

**Objetivo:** Cadastrar produto completo com todas as informações

#### Abas do Formulário

**Informações:**
- Nome (obrigatório)
- SKU (auto-gerado ou manual, único)
- Categoria (select hierárquico)
- Descrição
- Upload de imagens (até 5, drag-drop, preview)

**Estoque:**
- Quantidade inicial
- Estoque mínimo (para alerta)
- Estoque máximo
- Unidade de medida (un, kg, L, m, caixa, par)

**Preços:**
- Custo (obrigatório)
- Preço de venda (obrigatório)
- Margem calculada automaticamente: `(preço - custo) / preço × 100`
- Preço promocional (opcional, deve ser menor)

**Variações:**
- Combinações de atributos (cor, tamanho, etc.)
- Cada variação: SKU próprio, estoque próprio, preço próprio

**Adicionais:**
- Código de barras (EAN-13 auto-gerado se vazio)
- Peso, dimensões
- Observações

### 4. Entrada de Estoque (`/estoque/entrada`)

**Objetivo:** Registrar entradas de mercadorias

#### Entrada Manual
- Buscar produto
- Quantidade
- Custo unitário (atualiza custo médio ponderado)
- Motivo: Compra, Devolução, Transferência, Ajuste
- Dados da nota fiscal (opcional)
- Observações

#### Entrada em Massa (Wizard 4 etapas)

| Etapa | Descrição |
|-------|-----------|
| 1. Upload | Arrastar CSV/XLS/XLSX, máximo 10.000 linhas |
| 2. Validação | Mapear colunas, mostrar erros, permitir correção |
| 3. Preview | Mostrar impacto no estoque, configurações |
| 4. Confirmação | Processar, mostrar resultado, comprovante |

### 5. Saída de Estoque (`/estoque/saida`)

**Objetivo:** Registrar saídas e vendas (integração futura com PDV)

- Buscar produto
- Quantidade
- Motivo: Venda, Devolução, Amostra, Perda
- Referência (número do pedido, quando integrado)

### 6. Movimentações (`/estoque/movimentacoes`)

**Objetivo:** Histórico completo de todas as movimentações

- Lista com filtros: tipo (entrada/saída/ajuste), período, produto
- Cada registro: data, produto, tipo (badge colorido), quantidade, saldo anterior → novo
- Imutável: não permite edição após criação

### 7. Categorias (`/estoque/categorias`)

**Objetivo:** Organizar produtos em categorias hierárquicas

#### Árvore de Categorias
- Visualização em árvore com expand/collapse
- Ícone de pasta para cada categoria
- Indicadores: número de subcategorias, quantidade de produtos
- Ações: Ver, Editar, Excluir

#### CRUD de Categoria
- Nome
- Slug (auto-gerado)
- Categoria pai (select hierárquico, máximo 5 níveis)
- Imagem (opcional)
- Status: Ativo/Inativo

**Regras:**
- Máximo 5 níveis de profundidade
- Categoria com produtos não pode ser excluída (apenas inativada)

### 8. Gerador de Etiquetas (`/estoque/etiquetas`)

**Objetivo:** Imprimir etiquetas para produtos e prateleiras

#### Seleção de Produtos
- Modo: Por Produto, Por Categoria, Importar Lista
- Quantidade de etiquetas por produto

#### Templates de Etiqueta
- Dimensões: 40x30mm, 60x40mm, Térmica, 50x30mm, 30x20mm
- Informações: Código de barras, Nome, SKU, Preço

#### Formato do Código
- EAN-13 (padrão brasileiro)
- CODE128
- QR Code

#### Impressão
- Prévia em tempo real
- Exportar PDF
- Impressão direta (suporte a Zebra ZPL)

### 9. Inventário (`/estoque/inventario`)

**Objetivo:** Contagem física do estoque para conciliar com o sistema

- Progresso da contagem (x de y produtos)
- Divergências encontradas
- Scanner de código de barras (mobile)
- Salvar parcialmente (em andamento / finalizado)
- Ao finalizar: gera ajustes automaticamente

### 10. Relatórios (`/estoque/relatorios`)

**Objetivo:** Análise e inteligência do estoque

#### Tipos de Relatório
1. **Posição de Estoque:** Valor total por produto e categoria
2. **Curva ABC:** Classificação por importância (80/15/5)
3. **Produtos Parados:** Sem venda há 90 dias
4. **Giro de Estoque:** Vendas / Estoque médio mensal

#### Exportação
- PDF
- Excel (XLSX)

---

## Fluxo de Usuário

### Fluxo 1: Cadastrar e Etiquetar

```
Início → Dashboard Estoque
    │
    ├── [+ Novo Produto]
    │       │
    │       ├── Aba: Informações (nome, SKU, categoria)
    │       ├── Aba: Estoque (quantidade, mínimo)
    │       ├── Aba: Preços (custo, venda)
    │       └── Salvar
    │
    └── [Gerar Etiquetas]
            │
            ├── Selecionar produto(s)
            ├── Escolher template
            ├── Prévia
            └── Imprimir
```

### Fluxo 2: Repor Estoque

```
Dashboard Estoque
    │
    └── Ver alerta "Estoque Baixo"
            │
            ├── [Comprar] → futuros: gerar ordem de compra
            │
            └── [Entrada de Estoque]
                    │
                    ├── Buscar produto
                    ├── Informar quantidade e custo
                    ├── Motivo: Compra
                    └── Salvar
```

### Fluxo 3: Inventário

```
Dashboard Estoque
    │
    └── [Inventário]
            │
            ├── Iniciar contagem
            │
            ├── Listar produtos
            │       ├── Contar fisicamente
            │       └── Scanner código de barras
            │
            ├── Progresso (x%)
            └── Finalizar
                    │
                    └── Sistema gera ajustes automáticos
```

---

## Wireframes Descritivos

### Wireframe 1: Dashboard de Estoque

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (#1f2937)                    │ HEADER: Estoque - Dashboard           │
│                                      │ [+ Novo Produto ▼]                    │
│ • Dashboard ← ATIVO                  ├──────────────────────────────────────┤
│ • Produtos                          │                                       │
│ • Entrada/Saída                     │ [Cards Métricas - 4 colunas]           │
│ • Movimentações                     │ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│ • Categorias                        │ │Total    │ │Valor    │ │Baixo    │  │
│ • Etiquetas                         │ │124 prod │ │R$ 45K   │ │8 prod   │  │
│ • Relatórios                        │ │[Package]│ │[$]      │ │[!]      │  │
│                                      │ └─────────┘ └─────────┘ └─────────┘  │
│                                      │                                       │
│                                      │ [Alertas de Estoque]                  │
│                                      │ ┌────────────────────────────────┐   │
│                                      │ │ 📷 Teclado RGB     5/10  [⚠️]  │   │
│                                      │ │ 📷 Mouse Gamer     2/15  [🚨]  │   │
│                                      │ └────────────────────────────────┘   │
│                                      │                                       │
│                                      │ [Giro 7d▼]    │ [Ações Rápidas]        │
│                                      │ ████ Prod X   │ [+ Novo]              │
│                                      │ ███ Prod Y    │ [CSV] [📋] [📊]       │
│                                      └──────────────────────────────────────┘
```

### Wireframe 2: Lista de Produtos (Grid)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Produtos                               [+ Novo] [Filtros] [Grid] [📋]│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ [🔍 Buscar...                    ] [Categoria ▼] [Status ▼] [Mais filtros]   │
│                                                                              │
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐        │
│ │ ┌────────────────┐ │ │ ┌────────────────┐ │ │ ┌────────────────┐ │        │
│ │ │   [IMAGEM]     │ │ │ │   [IMAGEM]     │ │ │ │   [IMAGEM]     │ │        │
│ │ │                │ │ │ │                │ │ │ │                │ │        │
│ │ │  [🟢 OK]       │ │ │ │  [🟡 BAIXO]    │ │ │ │  [🔴 ESGOTADO] │ │        │
│ │ └────────────────┘ │ │ └────────────────┘ │ │ └────────────────┘ │        │
│ │                    │ │                    │ │                    │        │
│ │ Teclado RGB        │ │ Mouse Gamer        │ │ Monitor 24"       │        │
│ │ SKU: TEC-001       │ │ SKU: MOU-002       │ │ SKU: MON-003       │        │
│ │ 📦 45 un           │ │ 📦 8 un ⚠️        │ │ 📦 0 un 🔴        │        │
│ │ R$ 299,00          │ │ R$ 199,00         │ │ R$ 1.299,00       │        │
│ │                    │ │                    │ │                    │        │
│ │ [Editar] [👁]     │ │ [Editar] [👁]     │ │ [Editar] [👁]     │        │
│ └────────────────────┘ └────────────────────┘ └────────────────────┘        │
│                                                                              │
│ Mostrando 1-24 de 124        [<] [1] [2] [3] ... [6] [>]                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Wireframe 3: Formulário de Produto (Cadastro)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Novo Produto                                          [Salvar] [Cancel]│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ [Informações] [Estoque] [Preços] [Variações] [Adicionais]                     │
│ ─────────────────────────────────────────────────────────────────────────── │
│                                                                              │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  INFORMAÇÕES BÁSICAS                                                    │ │
│ │                                                                         │ │
│ │  Nome do Produto *                                                      │ │
│ │  [Teclado Mecânico RGB                                    ]              │ │
│ │                                                                         │ │
│ │  SKU / Código                                                           │ │
│ │  [TEC-RGB-001                    ] [🔄 Gerar]                          │ │
│ │                                                                         │ │
│ │  Categoria *                                                             │ │
│ │  [Eletrônicos → Periféricos                           ▼]                │ │
│ │                                                                         │ │
│ │  Descrição                                                              │ │
│ │  [Teclado mecânico com switches azul...                        ]        │ │
│ │                                                                         │ │
│ │  Imagens                                                                │ │
│ │  ┌───────────────────────────────────────────────────────────────┐     │ │
│ │  │                                                               │     │ │
│ │  │         📁 Arraste imagens aqui ou clique para upload         │     │ │
│ │  │                                                               │     │ │
│ │  │              Formatos: JPG, PNG, WEBP | Máx: 5MB              │     │ │
│ │  └───────────────────────────────────────────────────────────────┘     │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Wireframe 4: Wizard de Entrada em Massa

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Entrada em Massa via CSV                              [?] [Baixar]  │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ●────────○────────○────────○                                               │
│   1        2        3        4                                               │
│ Upload  Valida  Preview  Confirma                                            │
│                                                                              │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  ETAPA 1: UPLOAD DO ARQUIVO                                             │ │
│ │                                                                         │ │
│ │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│ │  │                                                                 │   │ │
│ │  │                    ┌─────────────────┐                          │   │ │
│ │  │                    │                 │                          │   │ │
│ │  │                    │       📁        │                          │   │ │
│ │  │                    │                 │                          │   │ │
│ │  │                    │   Arraste seu   │                          │   │ │
│ │  │                    │   arquivo aqui  │                          │   │ │
│ │  │                    │                 │                          │   │ │
│ │  │                    └─────────────────┘                          │   │ │
│ │  │                                                                 │   │ │
│ │  │         CSV, XLS, XLSX até 10MB                                 │   │ │
│ │  └─────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                         │ │
│ │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│ │  │  📄 entrada_march.xlsx    2.4 MB    [✕]                        │   │ │
│ │  │  ✅ 1.247 produtos detectados                                     │   │ │
│ │  └─────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                         │ │
│ │                                              [Voltar]  [Validar →]       │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Mock Data

### Produtos (TypeScript)

```typescript
interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  category: Category;
  stock: number;
  minStock: number;
  maxStock?: number;
  cost: number;
  price: number;
  images: string[];
  status: 'active' | 'inactive';
  stockStatus: 'ok' | 'low' | 'critical' | 'out';
  variations?: ProductVariation[];
  createdAt: string;
  updatedAt: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Teclado Mecânico RGB',
    sku: 'TEC-RGB-001',
    barcode: '7891234567890',
    category: { id: '1', name: 'Periféricos', slug: 'perifericos', productCount: 45, isActive: true },
    stock: 45,
    minStock: 10,
    cost: 180,
    price: 299,
    images: ['/products/teclado-1.jpg'],
    status: 'active',
    stockStatus: 'ok',
    createdAt: '2026-01-15T10:30:00Z',
    updatedAt: '2026-03-20T14:22:00Z',
  },
  {
    id: '2',
    name: 'Mouse Gamer Pro',
    sku: 'MOU-PRO-002',
    barcode: '7891234567891',
    category: { id: '1', name: 'Periféricos', slug: 'perifericos', productCount: 45, isActive: true },
    stock: 8,
    minStock: 15,
    cost: 120,
    price: 199,
    images: ['/products/mouse-1.jpg'],
    status: 'active',
    stockStatus: 'low',
    createdAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-03-18T11:45:00Z',
  },
  {
    id: '3',
    name: 'Monitor 24" Full HD',
    sku: 'MON-24-003',
    barcode: '7891234567892',
    category: { id: '2', name: 'Monitores', slug: 'monitores', productCount: 23, isActive: true },
    stock: 0,
    minStock: 5,
    cost: 850,
    price: 1299,
    images: ['/products/monitor-1.jpg'],
    status: 'inactive',
    stockStatus: 'out',
    createdAt: '2026-01-05T08:15:00Z',
    updatedAt: '2026-03-15T16:30:00Z',
  },
  {
    id: '4',
    name: 'Webcam HD 1080p',
    sku: 'WEB-HD-004',
    barcode: '7891234567893',
    category: { id: '3', name: 'Câmeras', slug: 'cameras', productCount: 12, isActive: true },
    stock: 2,
    minStock: 10,
    cost: 150,
    price: 299,
    images: ['/products/webcam-1.jpg'],
    status: 'active',
    stockStatus: 'critical',
    createdAt: '2026-02-01T14:00:00Z',
    updatedAt: '2026-03-19T09:10:00Z',
  },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  image?: string;
  productCount: number;
  children?: Category[];
  isActive: boolean;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Eletrônicos',
    slug: 'eletronicos',
    productCount: 245,
    isActive: true,
    children: [
      { id: '1-1', name: 'Celulares', slug: 'celulares', parentId: '1', productCount: 89, isActive: true },
      { id: '1-2', name: 'Computadores', slug: 'computadores', parentId: '1', productCount: 156, isActive: true },
    ],
  },
  {
    id: '2',
    name: 'Periféricos',
    slug: 'perifericos',
    productCount: 45,
    isActive: true,
  },
  {
    id: '3',
    name: 'Acessórios',
    slug: 'acessorios',
    productCount: 78,
    isActive: true,
  },
];

interface StockMovement {
  id: string;
  productId: string;
  variationId?: string;
  type: 'entry' | 'exit' | 'adjustment';
  quantity: number;
  cost: number;
  reason: string;
  reference?: string;
  notes?: string;
  userId: string;
  createdAt: string;
}

interface StockMetrics {
  totalProducts: number;
  totalValue: number;
  lowStock: number;
  outOfStock: number;
  entriesThisMonth: number;
  exitsThisMonth: number;
  topProducts: Array<{ id: string; name: string; sold: number }>;
}
```

---

## Dependências

### Internas

| Dependência | Descrição | Status |
|-------------|-----------|--------|
| **Design System UNIQ** | Componentes base, cores, tipografia | ✅ Implementado |
| **Sidebar** | Navegação do módulo | ✅ Implementado |
| **Header** | Breadcrumbs e ações | ✅ Implementado |
| **UI Components** | Card, Button, Input, etc. | ✅ Implementado |
| **Lucide React** | Ícones | ✅ Instalado |
| **React Hook Form** | Formulários | ✅ Instalado |
| **Zod** | Validação | ✅ Instalado |

### Externas

| Dependência | Descrição | Sprint |
|-------------|-----------|--------|
| **Supabase Tables** | products, categories, stock_movements | Sprint 11 |
| **PDV Integration** | Vendas desconectam estoque | Sprint 13 |
| **MEL Alerts** | IA envia alertas de estoque baixo | Sprint 13+ |

### Estrutura de Rotas Planejada

```
app/(dashboard)/
├── estoque/
│   ├── page.tsx                    # Dashboard (EXISTE - placeholder)
│   ├── produtos/
│   │   ├── page.tsx               # Lista de produtos
│   │   ├── novo/
│   │   │   └── page.tsx          # Novo produto
│   │   └── [id]/
│   │       └── page.tsx          # Detalhes/Editar produto
│   ├── entrada/
│   │   ├── page.tsx              # Entrada manual
│   │   └── massa/page.tsx        # Entrada em massa
│   ├── saida/
│   │   └── page.tsx              # Saída manual
│   ├── movimentacoes/
│   │   └── page.tsx              # Histórico
│   ├── categorias/
│   │   └── page.tsx              # Gerenciar categorias
│   ├── etiquetas/
│   │   └── page.tsx              # Gerador de etiquetas
│   ├── inventario/
│   │   └── page.tsx              # Contagem física
│   └── relatorios/
│       └── page.tsx              # Relatórios
```

---

## Critérios de Aceitação

### Dashboard de Estoque
- [ ] Cards de métricas exibem valores corretos com ícones coloridos
- [ ] Card "Estoque Baixo" usa cor amarela (#f59e0b)
- [ ] Card "Sem Estoque" usa cor vermelha (#ef4444) com borda esquerda
- [ ] Lista de alertas ordenados por criticidade (Crítico > Baixo > OK)
- [ ] Gráfico de giro com filtros de período funcionais
- [ ] Botões de ações rápidas com ícones Lucide
- [ ] Responsividade mobile (cards empilhados em <1024px)
- [ ] Skeleton de loading nos cards

### Lista de Produtos
- [ ] Busca em tempo real com debounce 300ms
- [ ] Filtros funcionais (categoria, status, estoque)
- [ ] Toggle entre Grid View e Lista View
- [ ] Badges de status de estoque coloridos
- [ ] Hover effect nos cards (shadow + translate-y)
- [ ] Paginação funcional (24 por página)
- [ ] Estado vazio quando não há produtos

### Cadastro de Produto
- [ ] Abas de navegação funcionais
- [ ] Campos obrigatórios validados
- [ ] SKU único verificado
- [ ] Upload de imagens com preview
- [ ] Margem calculada automaticamente
- [ ] Select hierárquico de categorias
- [ ] Cores de erro e sucesso apropriadas

### Entrada de Estoque
- [ ] Formulário de entrada manual com validações
- [ ] Cálculo automático do total (quantidade × custo)
- [ ] Wizard de entrada CSV com 4 etapas
- [ ] Upload de arquivo com drag-and-drop
- [ ] Preview de validação com erros destacados
- [ ] Indicador de progresso visual
- [ ] Toast de sucesso/erro

### Categorias
- [ ] Árvore hierárquica com expand/collapse
- [ ] Indicadores de subcategorias e contagem de produtos
- [ ] Modal de criação com validações
- [ ] Upload de imagem com preview
- [ ] Select hierárquico de categoria pai
- [ ] Máximo 5 níveis de profundidade

### Gerador de Etiquetas
- [ ] Seleção de produtos com quantidade
- [ ] Templates visuais de etiquetas
- [ ] Preview em tempo real
- [ ] Suporte a EAN-13, CODE128 e QR Code
- [ ] Configuração de impressora
- [ ] Exportação para PDF

### Estados Gerais
- [ ] Loading skeleton em todas as telas
- [ ] Estado vazio com ilustração e CTA
- [ ] Erro state com mensagem e retry
- [ ] Toast notifications para feedback
- [ ] Confirmação para ações destrutivas (excluir)

### Responsividade
| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | 1 coluna, drawer sidebar, cards empilhados |
| Tablet (640-1024px) | 2 colunas, sidebar colapsada |
| Desktop (>1024px) | Layout completo, 4 colunas métricas |

---

## Design Tokens

### Cores (CSS Custom Properties)

```css
:root {
  /* Background */
  --bg-primary: #efefef;      /* Fundo principal */
  --bg-card: #ffffff;          /* Cards e modais */
  
  /* Sidebar */
  --sidebar-bg: #1f2937;       /* Sidebar escura */
  
  /* Botões */
  --btn-primary: #3e5653;      /* Botões primários */
  --btn-primary-hover: #1f2937; /* Hover */
  
  /* Accent */
  --accent: #86cb92;           /* Verde esmeralda - destaque */
  
  /* Texto */
  --text-primary: #1f2937;     /* Texto principal */
  --text-secondary: #627271;   /* Texto secundário */
  
  /* Borders */
  --border: #e5e7eb;
  
  /* Status de Estoque */
  --stock-ok: #86cb92;         /* Verde - OK */
  --stock-low: #f59e0b;        /* Amarelo - Baixo */
  --stock-critical: #ef4444;   /* Vermelho - Crítico */
  --stock-out: #dc2626;       /* Vermelho escuro - Esgotado */
  
  /* Status de Movimentação */
  --stock-in: #22c55e;         /* Verde - Entrada */
  --stock-out-move: #3b82f6;   /* Azul - Saída */
  --stock-adjust: #627271;     /* Cinza - Ajuste */
}
```

### Tipografia

```css
/* Importação: Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Classes Tailwind */
.text-uniq-primary    { color: #3e5653; }
.text-uniq-accent     { color: #86cb92; }
.text-uniq-text       { color: #1f2937; }
.text-uniq-muted      { color: #627271; }
.bg-uniq-platinum     { background-color: #efefef; }
.bg-uniq-sidebar      { background-color: #1f2937; }
.border-uniq-border   { border-color: #e5e7eb; }
```

### Espaçamentos (8pt Grid)

| Elemento | Tailwind |
|----------|----------|
| Container padding | `p-6` |
| Card padding | `p-5` |
| Card gap | `gap-4` |
| Section gap | `gap-6` |
| Button padding | `px-4 py-2` |
| Input padding | `px-3 py-2` |
| Tabela cell | `px-4 py-3` |

### Sombras

```css
/* Card padrão */
.card { 
  @apply bg-white rounded-xl shadow-sm border border-gray-200; 
}

/* Card com hover */
.card-hover { 
  @apply hover:shadow-md transition-shadow duration-200; 
}

/* Botão primário */
.btn-primary {
  @apply bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors;
}

/* Badge OK */
.badge-ok {
  @apply bg-green-100 text-green-700;
}

/* Badge Warning */
.badge-warning {
  @apply bg-yellow-100 text-yellow-700;
}

/* Badge Critical */
.badge-critical {
  @apply bg-red-100 text-red-700;
}
```

---

## Ícones (Lucide React)

```tsx
import {
  Package,           // Produtos, estoque
  DollarSign,        // Preços, valores
  AlertTriangle,     // Estoque baixo
  AlertOctagon,      // Estoque crítico
  XCircle,           // Sem estoque
  CheckCircle,       // Estoque OK
  ArrowDownLeft,     // Entrada
  ArrowUpRight,      // Saída
  RefreshCw,         // Ajuste, atualizar
  Plus,              // Adicionar
  Search,            // Busca
  Edit,              // Editar
  Eye,               // Visualizar
  Trash2,            // Excluir
  BarChart3,          // Relatórios
  ClipboardList,      // Inventário
  Upload,            // Upload CSV
  Download,          // Download
  MoreHorizontal,     // Menu
  Settings,          // Config
  Printer,           // Imprimir
  FileText,          // PDF
  QrCode,            // QR Code
  ChevronRight,      // Expandir
  ScanLine,          // Scanner
  Construction,      // Placeholder
} from 'lucide-react';
```

---

## Histórico de Versões

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0.0 | 21/03/2026 | Versão inicial do PRD |
| - | - | - |

---

## Documentos Relacionados

### Contexto do Projeto
- `docs/CONTEXTO_PROJETO.md` - Contexto estratégico UNIQ
- `docs/Metodologia_vibe-coding.md` - Metodologia SDD

### Documentação UI
- `docs/ui/modulo-12-estoque.md` - Wireframes e componentes
- `docs/ui/modulo-05-estoque.md` - Especificações detalhadas
- `docs/ui/modulo-05-estoque-variacoes.md` - Variações de produto
- `docs/ui/modulo-05-estoque-entrada-massa.md` - Entrada CSV
- `docs/ui/modulo-05-estoque-etiquetas.md` - Gerador de etiquetas
- `docs/ui/modulo-05-estoque-categorias.md` - Categorias
- `docs/ui/modulo-05-estoque-fornecedores.md` - Fornecedores

### Código Existente
- `app/(dashboard)/estoque/page.tsx` - Placeholder atual
- `app/(dashboard)/pdv/page.tsx` - PDV (futura integração)

---

**Fim do Documento**
