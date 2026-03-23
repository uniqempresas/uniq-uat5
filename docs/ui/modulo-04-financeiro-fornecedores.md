# Módulo 04: Financeiro - CRUD Fornecedores

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Financeiro |
| **Submódulo** | Fornecedores |
| **Código** | MOD-FIN-FOR-001 |
| **Versão** | 1.0.0 |
| **Status** | Especificação |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |
| **Dependências** | MOD-FIN-001 |

---

## 1. Design System

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal |
| `--bg-card` | `#ffffff` | Fundo de cards |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--accent` | `#86cb92` | Destaques |
| `--status-active` | `#22c55e` | Fornecedor ativo |
| `--status-inactive` | `#ef4444` | Fornecedor inativo |
| `--rating-gold` | `#fbbf24` | Avaliação/estrelas |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário |

### 1.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px | 700 | `#1f2937` |
| Nome Fornecedor | Poppins | 16px | 600 | `#1f2937` |
| Dados | Poppins | 14px | 400 | `#627271` |
| Label | Poppins | 12px | 500 | `#627271` |

---

## 2. Tela: Listagem de Fornecedores (/financeiro/fornecedores)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Fornecedores                          [+ Novo Fornecedor]              │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabs: Todos | Ativos | Inativos | Em Análise]                                 │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros]                                                                       │ │
│ │ [Buscar 🔍] [Categoria: Todas ▼] [Status: Todos ▼] [Avaliação: ★★★★★ ▼]        │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Grid de Fornecedores]                                                          │ │
│ │ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐              │ │
│ │ │ [🏢]              │ │ [🏢]              │ │ [🏢]              │              │ │
│ │ │ Papelaria ABC     │ │ Tech Solutions    │ │ Transportes XYZ   │              │ │
│ │ │ ⭐⭐⭐⭐☆ 4.5      │ │ ⭐⭐⭐⭐⭐ 5.0     │ │ ⭐⭐⭐☆☆ 3.0      │              │ │
│ │ │                   │ │                   │ │                   │              │ │
│ │ │ CNPJ: 12.345...   │ │ CNPJ: 98.765...   │ │ CNPJ: 11.222...   │              │ │
│ │ │ Materiais         │ │ Tecnologia        │ │ Logística         │              │ │
│ │ │                   │ │                   │ │                   │              │ │
│ │ │ 💰 R$ 125.000/ano │ │ 💰 R$ 450.000/ano │ │ 💰 R$ 89.000/ano  │              │ │
│ │ │ 📋 45 compras     │ │ 📋 12 compras     │ │ 📋 89 entregas    │              │ │
│ │ │                   │ │                   │ │                   │              │ │
│ │ │ [Ativo 🟢]        │ │ [Ativo 🟢]        │ │ [Em Análise 🟡]   │              │ │
│ │ │                   │ │                   │ │                   │              │ │
│ │ │ [Ver] [Editar] [🗑]│ │ [Ver] [Editar] [🗑]│ │ [Ver] [Editar] [🗑]│              │ │
│ │ └───────────────────┘ └───────────────────┘ └───────────────────┘              │ │
│ │                                                                                 │ │
│ │ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐              │ │
│ │ │ [🏢]              │ │ [🏢]              │ │ [🏢]              │              │ │
│ │ │ Fornecedor D      │ │ Fornecedor E      │ │ Fornecedor F      │              │ │
│ │ │ ...               │ │ ...               │ │ ...               │              │ │
│ │ └───────────────────┘ └───────────────────┘ └───────────────────┘              │ │
│ │                                                                                 │ │
│ │ [← 1 2 3 ... 10 →]                                           Exibindo 1-9      │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Header da Página

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Fornecedores</h1>
      <p class="text-sm text-[#627271]">Gerencie seus fornecedores e parceiros comerciais</p>
    </div>
    <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
      <Plus class="w-4 h-4" />
      Novo Fornecedor
    </button>
  </div>
</header>
```

#### 2.2.2 Tabs

```html
<div class="bg-white border-b border-gray-200 px-6">
  <div class="flex gap-1">
    <button class="tab-active px-4 py-3 text-sm font-medium text-[#3e5653] border-b-2 border-[#3e5653]">
      Todos
      <span class="ml-1.5 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">45</span>
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      <div class="w-2 h-2 rounded-full bg-green-500 inline-block mr-1"></div>
      Ativos
      <span class="ml-1.5 px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-xs">38</span>
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      <div class="w-2 h-2 rounded-full bg-red-500 inline-block mr-1"></div>
      Inativos
      <span class="ml-1.5 px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-xs">4</span>
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      <div class="w-2 h-2 rounded-full bg-yellow-500 inline-block mr-1"></div>
      Em Análise
      <span class="ml-1.5 px-1.5 py-0.5 bg-yellow-100 text-yellow-600 rounded text-xs">3</span>
    </button>
  </div>
</div>
```

#### 2.2.3 Barra de Filtros

```html
<div class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center gap-3">
    <!-- Busca -->
    <div class="relative flex-1 max-w-sm">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input 
        type="text" 
        placeholder="Buscar por nome, CNPJ ou categoria..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]"
      />
    </div>
    
    <!-- Categoria -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
      <option value="">Todas as categorias</option>
      <option value="materiais">Materiais</option>
      <option value="tecnologia">Tecnologia</option>
      <option value="logistica">Logística</option>
      <option value="servicos">Serviços</option>
    </select>
    
    <!-- Status -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
      <option value="">Todos os status</option>
      <option value="active">Ativo</option>
      <option value="inactive">Inativo</option>
      <option value="pending">Em Análise</option>
    </select>
    
    <!-- Avaliação -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
      <option value="">Todas as avaliações</option>
      <option value="5">⭐⭐⭐⭐⭐ 5 estrelas</option>
      <option value="4">⭐⭐⭐⭐ 4+ estrelas</option>
      <option value="3">⭐⭐⭐ 3+ estrelas</option>
    </select>
  </div>
</div>
```

#### 2.2.4 Card de Fornecedor

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
  <!-- Header -->
  <div class="flex items-start justify-between mb-4">
    <div class="flex items-center gap-3">
      <div class="w-14 h-14 rounded-xl bg-[#3e5653] flex items-center justify-center">
        <Building2 class="w-7 h-7 text-white" />
      </div>
      <div>
        <h3 class="font-semibold text-[#1f2937]">Papelaria ABC Ltda</h3>
        <div class="flex items-center gap-1 mt-1">
          <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <Star class="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <Star class="w-3 h-3 text-gray-300" />
          <span class="text-xs text-[#627271] ml-1">4.5</span>
        </div>
      </div>
    </div>
    <button class="text-gray-400 hover:text-gray-600">
      <MoreVertical class="w-5 h-5" />
    </button>
  </div>
  
  <!-- Dados -->
  <div class="space-y-2 mb-4">
    <div class="flex items-center gap-2 text-sm">
      <Building class="w-4 h-4 text-[#627271]" />
      <span class="text-[#627271]">CNPJ:</span>
      <span class="text-[#1f2937]">12.345.678/0001-90</span>
    </div>
    <div class="flex items-center gap-2 text-sm">
      <Tag class="w-4 h-4 text-[#627271]" />
      <span class="text-[#627271]">Categoria:</span>
      <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Materiais</span>
    </div>
  </div>
  
  <!-- Estatísticas -->
  <div class="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100">
    <div>
      <div class="flex items-center gap-1 text-sm text-[#627271]">
        <DollarSign class="w-4 h-4" />
        <span>Total Anual</span>
      </div>
      <p class="text-lg font-semibold text-[#1f2937] mt-1">R$ 125.000,00</p>
    </div>
    <div>
      <div class="flex items-center gap-1 text-sm text-[#627271]">
        <ShoppingCart class="w-4 h-4" />
        <span>Compras</span>
      </div>
      <p class="text-lg font-semibold text-[#1f2937] mt-1">45</p>
    </div>
  </div>
  
  <!-- Status e Ações -->
  <div class="flex items-center justify-between mt-4">
    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
      <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
      Ativo
    </span>
    
    <div class="flex items-center gap-2">
      <button class="text-sm text-[#3e5653] hover:underline">Ver detalhes</button>
      <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
        <Edit class="w-4 h-4" />
      </button>
      <button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
        <Trash2 class="w-4 h-4" />
      </button>
    </div>
  </div>
</div>
```

---

## 3. Modal: Novo/Editar Fornecedor

### 3.1 Estrutura do Modal

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Novo Fornecedor                                                   [X]        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Tabs: Dados Cadastrais | Endereço | Dados Bancários | Configurações]      │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Tipo *                                 CNPJ *                               │
│  ┌──────────────────────────┐          ┌──────────────────────────────────┐ │
│  │ Pessoa Jurídica      ▼   │          │ 12.345.678/0001-90               │ │
│  └──────────────────────────┘          └──────────────────────────────────┘ │
│                                                                              │
│  Razão Social *                         Nome Fantasia                        │
│  ┌──────────────────────────┐          ┌──────────────────────────────────┐ │
│  │ Papelaria ABC Ltda       │          │ Papelaria ABC                    │ │
│  └──────────────────────────┘          └──────────────────────────────────┘ │
│                                                                              │
│  Categoria *                            Avaliação                            │
│  ┌──────────────────────────┐          ┌──────────────────────────────────┐ │
│  │ Materiais              ▼ │          │ ⭐⭐⭐⭐⭐                      │ │
│  └──────────────────────────┘          └──────────────────────────────────┘ │
│                                                                              │
│  Contato Principal                                                           │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Nome: João Silva                                        Cargo: Gerente│   │
│  │ Email: joao@papelariaabc.com.br        Tel: (11) 3456-7890            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Observações                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Fornecedor principal de material de escritório...                    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ☑ Fornecedor ativo                                                          │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                     [Cancelar]  [Salvar Fornecedor]          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Componente do Modal

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
      <h3 class="text-lg font-semibold text-[#1f2937]">Novo Fornecedor</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Tabs -->
    <div class="bg-white border-b border-gray-200 px-6">
      <div class="flex gap-1">
        <button class="tab-active px-4 py-3 text-sm font-medium text-[#3e5653] border-b-2 border-[#3e5653]">
          Dados Cadastrais
        </button>
        <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937]">
          Endereço
        </button>
        <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937]">
          Dados Bancários
        </button>
        <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937]">
          Configurações
        </button>
      </div>
    </div>
    
    <!-- Form -->
    <form class="p-6 space-y-5">
      <!-- Tipo e CNPJ -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Tipo <span class="text-red-500">*</span>
          </label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
            <option value="pj">Pessoa Jurídica</option>
            <option value="pf">Pessoa Física</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            CNPJ <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="00.000.000/0000-00"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
      </div>
      
      <!-- Razão Social e Nome Fantasia -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Razão Social <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="Razão Social"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Nome Fantasia
          </label>
          <input 
            type="text" 
            placeholder="Nome Fantasia"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
      </div>
      
      <!-- Categoria e Avaliação -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Categoria <span class="text-red-500">*</span>
          </label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
            <option value="">Selecione...</option>
            <option value="materiais">Materiais</option>
            <option value="tecnologia">Tecnologia</option>
            <option value="logistica">Logística</option>
            <option value="servicos">Serviços</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Avaliação</label>
          <div class="flex items-center gap-1 pt-2">
            <button type="button" class="star-btn">
              <Star class="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </button>
            <button type="button" class="star-btn">
              <Star class="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </button>
            <button type="button" class="star-btn">
              <Star class="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </button>
            <button type="button" class="star-btn">
              <Star class="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </button>
            <button type="button" class="star-btn">
              <Star class="w-6 h-6 text-gray-300" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Contato -->
      <div class="bg-gray-50 rounded-lg p-4">
        <p class="text-sm font-medium text-[#1f2937] mb-3">Contato Principal</p>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs text-[#627271] mb-1">Nome</label>
            <input 
              type="text" 
              placeholder="Nome do contato"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label class="block text-xs text-[#627271] mb-1">Cargo</label>
            <input 
              type="text" 
              placeholder="Cargo"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label class="block text-xs text-[#627271] mb-1">Email</label>
            <input 
              type="email" 
              placeholder="email@empresa.com"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label class="block text-xs text-[#627271] mb-1">Telefone</label>
            <input 
              type="text" 
              placeholder="(00) 0000-0000"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>
      
      <!-- Observações -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Observações</label>
        <textarea 
          rows="3"
          placeholder="Adicione observações sobre o fornecedor..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] resize-none"
        ></textarea>
      </div>
      
      <!-- Status -->
      <div class="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="ativo"
          checked
          class="w-4 h-4 text-[#3e5653] rounded"
        />
        <label for="ativo" class="text-sm text-[#1f2937]">Fornecedor ativo</label>
      </div>
    </form>
    
    <!-- Footer -->
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937]">
        Salvar Fornecedor
      </button>
    </div>
  </div>
</div>
```

---

## 4. Formulários

### 4.1 Tabela de Campos

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| Tipo | Select | Sim | pj/pf | PJ ou PF |
| CNPJ/CPF | Text | Sim | Formato válido, único | Documento |
| Razão Social | Text | Sim | 3-100 caracteres | Nome oficial |
| Nome Fantasia | Text | Não | 3-100 caracteres | Nome comercial |
| Categoria | Select | Sim | ID válido | Categoria do fornecedor |
| Avaliação | Number | Não | 1-5 | Classificação |
| Email | Email | Não | Formato válido | Contato |
| Telefone | Text | Não | Formato válido | Contato |
| Status | Checkbox | Não | Boolean | Ativo/Inativo |

### 4.2 Validações

```typescript
const schema = z.object({
  tipo: z.enum(['pj', 'pf']),
  
  documento: z.string()
    .refine(val => isValidCNPJ(val) || isValidCPF(val), 'Documento inválido')
    .refine(val => isUnique(val), 'Documento já cadastrado'),
  
  razaoSocial: z.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  
  nomeFantasia: z.string().max(100).optional(),
  
  categoriaId: z.string().uuid('Selecione uma categoria'),
  
  avaliacao: z.number().min(1).max(5).optional(),
  
  contato: z.object({
    nome: z.string().optional(),
    cargo: z.string().optional(),
    email: z.string().email('Email inválido').optional(),
    telefone: z.string().optional()
  }),
  
  ativo: z.boolean().default(true)
});
```

---

## 5. Regras de Negócio

| Código | Descrição | Severidade |
|--------|-----------|------------|
| **RN-FOR-001** | CNPJ/CPF deve ser único no sistema | Alta |
| **RN-FOR-002** | Fornecedores com compras não podem ser excluídos (apenas inativados) | Alta |
| **RN-FOR-003** | Histórico de compras mantido mesmo após inativação | Média |
| **RN-FOR-004** | Avaliação calculada automaticamente baseada em performance | Baixa |
| **RN-FOR-005** | Categorização obrigatória para relatórios | Média |

---

## 6. Checklist

- [ ] Listagem em grid
- [ ] Filtros por categoria e status
- [ ] Busca por nome/documento
- [ ] CRUD completo
- [ ] Sistema de avaliação por estrelas
- [ ] Abas de informações (endereço, banco, config)
- [ ] Validação de CNPJ/CPF
- [ ] Estados: loading, empty, error
