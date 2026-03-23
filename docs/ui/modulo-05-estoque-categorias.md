# 📁 Módulo 05 - Estoque: Categorias de Produtos

## Metadados
| Atributo | Valor |
|----------|-------|
| **Módulo** | Estoque |
| **Sub-módulo** | Categorias de Produtos |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Responsável** | UI/UX Team |
| **Data** | 12/03/2026 |

---

## 🎨 Design System

### Paleta de Cores UNIQ
```scss
// Cores Primárias
$jet-black: #1f2937;          // Textos principais
$dark-slate-grey: #3e5653;    // Headers e navegação
$dim-grey: #627271;           // Textos secundários
$platinum: #efefef;           // Backgrounds

// Cores de Ação
$emerald: #86cb92;            // Destaque, botões primários
$white: #ffffff;              // Superfície

// Status
$status-ok: #22c55e;          // Ativo, sucesso
$status-baixo: #f59e0b;       // Alerta
$status-critico: #ef4444;     // Erro, crítico
$bordas: #e5e7eb;             // Bordas, divisores
```

### Tipografia
| Nível | Fonte | Tamanho | Peso | Uso |
|-------|-------|---------|------|-----|
| H1 | Inter | 24px | 700 | Título da página |
| H2 | Inter | 20px | 600 | Seções |
| H3 | Inter | 16px | 600 | Cards |
| Body | Inter | 14px | 400 | Conteúdo |
| Small | Inter | 12px | 400 | Labels, helper text |

### Espaçamento (8pt Grid)
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

---

## 📱 Tela - Listagem de Categorias

### Layout ASCII

```
+----------------------------------------------------------------------------------------------------------+
|  [LOGO]  UNIQ Empresas                                          [🔍] [🌙] [👤 Admin ▼]                  |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  [🏠] Dashboard    [📦] Estoque    [💰] Financeiro    [👥] CRM    [🛒] Loja    [📅] Agendamentos        |
|                                          ▼                                                               |
|                                    ┌─────────────────────────┐                                             |
|                                    │ • Produtos              │                                             |
|                                    │ • Entrada/Saída         │                                             |
|                                    │ • Movimentações         │                                             |
|                                    │ 📁 Categorias           │                                             |
|                                    │ • Fornecedores          │                                             |
|                                    │ • Etiquetas             │                                             |
|                                    └─────────────────────────┘                                             |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  Categorias de Produtos                                              [+ Nova Categoria]                  |
|  Gerencie a hierarquia de categorias                                                                     |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  [🔍 Buscar categorias...    ]              [Todas ▼]    [Todos os Níveis ▼]    [📋] [⊞]        │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  ÁRVORE DE CATEGORIAS                                                                            │   |
|  │                                                                                                  │   |
|  │  ▼ 📁 Eletrônicos                                                [👁] [✏️] [🗑️]                 │   |
|  │    ├─ ▶ 📂 Celulares e Smartphones                                [👁] [✏️] [🗑️]               │   |
|  │    ├─ ▼ 📂 Computadores                                          [👁] [✏️] [🗑️]                 │   |
|  │    │   ├─ ─ 💻 Notebooks                                          [👁] [✏️] [🗑️]               │   |
|  │    │   ├─ ─ 🖥️ Desktop                                            [👁] [✏️] [🗑️]               │   |
|  │    │   └─ ─ ⌨️ Acessórios                                         [👁] [✏️] [🗑️]               │   |
|  │    └─ ▶ 📂 Áudio e Vídeo                                          [👁] [✏️] [🗑️]               │   |
|  │                                                                                                  │   |
|  │  ▶ 📁 Moda e Acessórios                                          [👁] [✏️] [🗑️]                 │   |
|  │  ▶ 📁 Casa e Decoração                                           [👁] [✏️] [🗑️]                 │   |
|  │  ▶ 📁 Esporte e Lazer                                            [👁] [✏️] [🗑️]                 │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  Total: 12 categorias  |  Página 1 de 1                                         [<] [1] [2] [3] [>]     |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

## 📱 Modal - Nova/Editar Categoria

### Layout ASCII

```
+----------------------------------------------------------+
|  Nova Categoria                                    [✕]   |
+----------------------------------------------------------+
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  INFORMAÇÕES BÁSICAS                               │  |
|  │                                                    │  |
|  │  Nome da Categoria *                               │  |
|  │  [Electrônicos                                      ]│  |
|  │  [> O nome deve ter entre 2 e 100 caracteres        ]│  |
|  │                                                    │  |
|  │  Categoria Pai                                     │  |
|  │  [Selecione uma categoria pai...              ▼]   │  |
|  │  [> Categorias de nível superior                  ]│  |
|  │                                                    │  |
|  │  Descrição                                         │  |
|  │  [Produtos eletrônicos em geral, incluindo         │  |
|  │   smartphones, computadores e acessórios...        │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  IMAGEM DA CATEGORIA                               │  |
|  │                                                    │  |
|  │      ┌─────────────────┐                         │  |
|  │      │                 │                         │  |
|  │      │    [📷]         │  [📁 Selecionar imagem]  │  |
|  │      │                 │  [> Recomendado: 400x400  │  |
|  │      │   200x200px     │          PNG ou JPG      │  |
|  │      │                 │          Máx: 2MB        │  |
|  │      └─────────────────┘                         │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  CONFIGURAÇÕES                                     │  |
|  │                                                    │  |
|  │  ☑ Ativo                                           │  |
|  │  [> A categoria ficará visível para seleção       ]│  |
|  │                                                    │  |
|  │  Ordem de Exibição                                 │  |
|  │  [1    ] [> Define a ordem de exibição no catálogo]│  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  SEO E URL AMIGÁVEL (Opcional)                     │  |
|  │                                                    │  |
|  │  Slug da URL                                       │  |
|  │  [eletronicos                                      ]│  |
|  │  [> https://loja.uniq.com/categoria/eletronicos   ]│  |
|  │                                                    │  |
|  │  Meta Title                                        │  |
|  │  [Eletrônicos | UNIQ Loja                         ]│  |
|  │                                                    │  |
|  │  Meta Description                                  │  |
|  │  [Encontre os melhores produtos eletrônicos...     │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|       [Cancelar]              [Salvar Categoria]         |
|                                                          |
+----------------------------------------------------------+
```

---

## 🔧 Componentes

### Header da Página
```html
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-[#1f2937]">Categorias de Produtos</h1>
    <p class="text-sm text-[#627271]">Gerencie a hierarquia de categorias</p>
  </div>
  <button class="bg-[#3e5653] hover:bg-[#627271] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
    </svg>
    Nova Categoria
  </button>
</div>
```

### Barra de Filtros
```html
<div class="bg-white rounded-lg border border-[#e5e7eb] p-4 mb-4">
  <div class="flex flex-wrap items-center gap-4">
    <div class="flex-1 min-w-[300px]">
      <div class="relative">
        <input 
          type="text" 
          placeholder="Buscar categorias..."
          class="w-full pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
        />
        <svg class="absolute left-3 top-2.5 w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
    </div>
    <select class="px-4 py-2 border border-[#e5e7eb] rounded-lg bg-white focus:ring-2 focus:ring-[#86cb92]">
      <option>Todas as categorias</option>
      <option>Ativas</option>
      <option>Inativas</option>
    </select>
    <select class="px-4 py-2 border border-[#e5e7eb] rounded-lg bg-white focus:ring-2 focus:ring-[#86cb92]">
      <option>Todos os níveis</option>
      <option>Nível 1 (Raiz)</option>
      <option>Nível 2</option>
      <option>Nível 3+</option>
    </select>
    <div class="flex items-center gap-2 border border-[#e5e7eb] rounded-lg p-1">
      <button class="p-2 bg-[#3e5653] text-white rounded">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <button class="p-2 text-[#627271] hover:bg-[#efefef] rounded">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
        </svg>
      </button>
    </div>
  </div>
</div>
```

### Item de Categoria (Árvore)
```html
<!-- Categoria Raiz Expandida -->
<div class="category-item">
  <div class="flex items-center py-3 px-4 hover:bg-[#efefef] rounded-lg group">
    <button class="mr-2 text-[#627271] hover:text-[#3e5653]">
      <svg class="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
    <div class="flex items-center flex-1">
      <div class="w-10 h-10 rounded-lg bg-[#86cb92]/20 flex items-center justify-center mr-3">
        <img src="/icons/category.svg" class="w-6 h-6" alt=""/>
      </div>
      <div>
        <span class="font-medium text-[#1f2937]">Eletrônicos</span>
        <span class="ml-2 px-2 py-0.5 text-xs bg-[#22c55e]/10 text-[#22c55e] rounded-full">Ativo</span>
      </div>
    </div>
    <div class="flex items-center gap-4 text-sm text-[#627271]">
      <span>3 subcategorias</span>
      <span>245 produtos</span>
    </div>
    <div class="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="p-1.5 text-[#627271] hover:text-[#3e5653] hover:bg-[#e5e7eb] rounded" title="Ver produtos">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
      </button>
      <button class="p-1.5 text-[#627271] hover:text-[#3e5653] hover:bg-[#e5e7eb] rounded" title="Editar">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
      </button>
      <button class="p-1.5 text-[#627271] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded" title="Excluir">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      </button>
    </div>
  </div>
  
  <!-- Subcategorias -->
  <div class="ml-8 border-l-2 border-[#e5e7eb]">
    <div class="category-subitem">
      <div class="flex items-center py-2 px-4 hover:bg-[#efefef] rounded-lg group ml-4">
        <button class="mr-2 text-[#627271]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        <span class="text-[#1f2937]">Celulares e Smartphones</span>
        <span class="ml-auto text-sm text-[#627271]">89 produtos</span>
      </div>
    </div>
  </div>
</div>
```

### Upload de Imagem
```html
<div class="border-2 border-dashed border-[#e5e7eb] rounded-lg p-8 text-center hover:border-[#86cb92] transition-colors">
  <div class="w-32 h-32 mx-auto mb-4 rounded-lg bg-[#efefef] flex items-center justify-center">
    <svg class="w-12 h-12 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
  </div>
  <button class="bg-[#3e5653] text-white px-4 py-2 rounded-lg mb-2">
    Selecionar imagem
  </button>
  <p class="text-xs text-[#627271]">
    Recomendado: 400x400px<br/>
    PNG ou JPG, máx. 2MB
  </p>
</div>
```

---

## 📋 Formulários

### Formulário de Categoria

| Campo | Tipo | Obrigatório | Validação | Placeholder |
|-------|------|-------------|-----------|-------------|
| Nome | Text | Sim | 2-100 chars | Eletrônicos |
| Categoria Pai | Select | Não | - | Selecione... |
| Descrição | Textarea | Não | 500 chars max | Descreva a categoria... |
| Imagem | File | Não | JPG/PNG, 2MB | - |
| Ativo | Checkbox | Não | Boolean | ☑ |
| Ordem | Number | Não | 0-999 | 1 |
| Slug | Text | Não | URL-safe | eletronicos |
| Meta Title | Text | Não | 70 chars | Eletrônicos \| UNIQ |
| Meta Description | Textarea | Não | 160 chars | Encontre eletrônicos... |

### Validações

```typescript
interface CategoryFormValidation {
  nome: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[\p{L}\p{N}\s\-&]+$/u,
    message: "Nome deve ter entre 2 e 100 caracteres"
  },
  descricao: {
    maxLength: 500,
    optional: true
  },
  imagem: {
    types: ['image/jpeg', 'image/png'],
    maxSize: 2 * 1024 * 1024, // 2MB
    dimensions: {
      min: { width: 200, height: 200 },
      recommended: { width: 400, height: 400 }
    }
  },
  slug: {
    pattern: /^[a-z0-9-]+$/,
    unique: true,
    autoGenerate: true // from nome
  }
}
```

---

## 🎭 Estados

### Estado Loading (Listagem)
```html
<div class="animate-pulse">
  <div class="h-12 bg-[#efefef] rounded-lg mb-2"></div>
  <div class="h-12 bg-[#efefef] rounded-lg mb-2 ml-8"></div>
  <div class="h-12 bg-[#efefef] rounded-lg mb-2 ml-8"></div>
  <div class="h-12 bg-[#efefef] rounded-lg mb-2"></div>
</div>
```

### Estado Empty
```html
<div class="text-center py-16">
  <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-[#efefef] flex items-center justify-center">
    <svg class="w-12 h-12 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
    </svg>
  </div>
  <h3 class="text-lg font-medium text-[#1f2937] mb-2">Nenhuma categoria encontrada</h3>
  <p class="text-[#627271] mb-4">Crie sua primeira categoria para organizar os produtos</p>
  <button class="bg-[#3e5653] text-white px-4 py-2 rounded-lg">
    Criar Categoria
  </button>
</div>
```

### Estado Erro
```html
<div class="bg-[#ef4444]/10 border border-[#ef4444] rounded-lg p-4 flex items-start gap-3">
  <svg class="w-5 h-5 text-[#ef4444] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <div>
    <h4 class="font-medium text-[#ef4444]">Erro ao carregar categorias</h4>
    <p class="text-sm text-[#ef4444]/80">Não foi possível conectar ao servidor. Tente novamente.</p>
    <button class="mt-2 text-sm text-[#ef4444] underline hover:no-underline">Tentar novamente</button>
  </div>
</div>
```

---

## 📜 Regras de Negócio

### RN-EST-CAT-001 - Hierarquia
- Categorias podem ter até 5 níveis de profundidade
- Uma categoria não pode ser filha de si mesma (prevenir loops)
- Categorias com produtos não podem ser excluídas (apenas inativadas)

### RN-EST-CAT-002 - Slug Único
- Slug deve ser único em toda a hierarquia
- Auto-gerado a partir do nome: "Eletrônicos" → "eletronicos"
- Se já existir, adicionar sufixo numérico: "eletronicos-1", "eletronicos-2"

### RN-EST-CAT-003 - Produtos
- Produto deve estar em exatamente uma categoria (obrigatório)
- Categorias inativas não aparecem nos selects de produto
- Mudança de categoria não altera histórico de movimentações

### RN-EST-CAT-004 - Ordem de Exibição
- Ordem 0 = primeira posição
- Categorias com mesma ordem são ordenadas alfabeticamente
- Subcategorias seguem ordem independente da categoria pai

### RN-EST-CAT-005 - Exclusão
- Categoria com subcategorias: excluir ou mover subcategorias primeiro
- Categoria com produtos: não pode ser excluída, apenas inativada
- Ao excluir, perguntar se move produtos para outra categoria

---

## ✅ Checklist de Implementação

### Estrutura
- [ ] Rota `/estoque/categorias` criada
- [ ] Layout com sidebar de navegação
- [ ] Breadcumbs: Dashboard > Estoque > Categorias
- [ ] Título e metadados da página

### Listagem
- [ ] Tabela/árvore de categorias
- [ ] Filtros funcionais (busca, status, nível)
- [ ] Toggle de visualização (lista/árvore)
- [ ] Paginação ou scroll infinito
- [ ] Ordenação drag-and-drop (opcional)

### CRUD
- [ ] Modal de criação com validação
- [ ] Modal de edição pré-populado
- [ ] Confirmação de exclusão
- [ ] Upload de imagem com preview
- [ ] Select hierárquico de categoria pai

### Validações
- [ ] Validação em tempo real dos campos
- [ ] Prevenção de loops hierárquicos
- [ ] Validação de slug único
- [ ] Validação de imagem (tipo, tamanho, dimensões)

### Estados
- [ ] Loading na listagem
- [ ] Loading no formulário
- [ ] Empty state
- [ ] Error state (listagem e formulário)
- [ ] Toast de sucesso/erro

### Integração
- [ ] API GET /categories (com árvore)
- [ ] API POST /categories
- [ ] API PUT /categories/:id
- [ ] API DELETE /categories/:id
- [ ] Upload para storage (S3/R2)

### Acessibilidade
- [ ] Keyboard navigation na árvore
- [ ] ARIA labels nos controles
- [ ] Contraste adequado
- [ ] Focus visível

---

## 🔄 Fluxos de Interação

### Fluxo 1: Criar Categoria
```
[Clique Nova Categoria] → [Preenche Formulário] → [Valida] → [Salva] → [Toast Sucesso] → [Atualiza Lista]
```

### Fluxo 2: Mover Categoria
```
[Drag categoria] → [Drop na nova posição] → [Confirma] → [Reordena] → [Toast Sucesso]
```

### Fluxo 3: Excluir com Produtos
```
[Clique Excluir] → [Detecta produtos] → [Modal confirmação] → [Opção: mover para...] → [Processa] → [Toast]
```

---

## 📊 Métricas de UX

| Métrica | Alvo | Monitoramento |
|---------|------|---------------|
| Tempo para criar categoria | < 30s | Analytics |
| Taxa de erro no formulário | < 5% | Error tracking |
| Taxa de abandono | < 10% | Analytics |
| Satisfação do usuário | > 4/5 | NPS survey |

---

## 🗂️ Dependências

- Módulo de Produtos (para contagem de produtos por categoria)
- Storage de Imagens (S3/Cloudflare R2)
- Módulo SEO (para slugs e metadados)
