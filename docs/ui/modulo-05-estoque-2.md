#### 2.2.3 Gráfico de Giro de Estoque

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h3 class="font-semibold text-[#1f2937]">Giro de Estoque</h3>
      <p class="text-sm text-[#627271]">Produtos mais vendidos (Top 5)</p>
    </div>
    <div class="flex gap-1 bg-gray-100 rounded-lg p-1">
      <button class="px-3 py-1 text-xs font-medium rounded-md bg-white text-[#1f2937] shadow-sm">7d</button>
      <button class="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">30d</button>
      <button class="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">3m</button>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <span class="w-32 text-sm text-[#627271] truncate">Teclado Mecânico RGB</span>
      <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-[#86cb92] rounded-full" style="width: 92%"></div>
      </div>
      <span class="w-12 text-sm font-medium text-[#1f2937] text-right">92</span>
    </div>
    
    <div class="flex items-center gap-4">
      <span class="w-32 text-sm text-[#627271] truncate">Mouse Gamer Pro</span>
      <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-[#86cb92]/80 rounded-full" style="width: 78%"></div>
      </div>
      <span class="w-12 text-sm font-medium text-[#1f2937] text-right">78</span>
    </div>
  </div>
</div>
```

### 2.3 Regras de Negócio (RN-EST)

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-001 | Cards de métricas devem atualizar em tempo real | WebSocket ou polling a cada 30s |
| RN-EST-002 | Alertas de estoque devem ser ordenados por criticidade | Crítico > Baixo > OK |
| RN-EST-003 | Gráfico de giro mostra apenas produtos com vendas | Filtro: quantidade_vendida > 0 |
| RN-EST-004 | Botão "Comprar" gera sugestão de ordem de compra | Abre modal pré-preenchido |
| RN-EST-005 | Últimas movimentações mostram máximo 5 itens | Limit 5, ordenado por data DESC |

---

## 3. Tela 2: Lista de Produtos (/estoque/produtos)

### 3.1 Estrutura do Layout

Grid de produtos com visualização em cards ou lista, filtros avançados e ações em massa.

### 3.2 Componentes

#### 3.2.1 Barra de Busca e Filtros

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
  <div class="flex flex-wrap items-center gap-3">
    <div class="relative flex-1 min-w-[200px]">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
      <input 
        type="text" 
        placeholder="Buscar por nome, SKU ou código..."
        class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
    </div>
    
    <select class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92] focus:border-transparent">
      <option>Todas as categorias</option>
      <option>Eletrônicos</option>
      <option>Acessórios</option>
    </select>
    
    <button class="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
      <SlidersHorizontal class="w-4 h-4" />
      <span>Filtros</span>
    </button>
  </div>
</div>
```

#### 3.2.2 Card de Produto

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
  <div class="relative aspect-square bg-gray-100 overflow-hidden">
    <img src="/api/placeholder/300/300" alt="Produto" class="w-full h-full object-cover" />
    
    <div class="absolute top-3 right-3">
      <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        <CheckCircle class="w-3 h-3" />
        Em estoque
      </span>
    </div>
  </div>
  
  <div class="p-4">
    <h3 class="font-semibold text-[#1f2937] truncate">Teclado Mecânico RGB</h3>
    <p class="text-xs text-[#627271] mb-2">SKU: TEC-RGB-001</p>
    
    <div class="flex items-center gap-2 mb-3">
      <Package class="w-4 h-4 text-[#627271]" />
      <span class="text-sm font-medium text-[#1f2937]">45 unidades</span>
    </div>
    
    <div class="flex items-center justify-between mb-3">
      <span class="text-lg font-bold text-[#3e5653]">R$ 299,00</span>
    </div>
    
    <div class="flex gap-2">
      <button class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#3e5653] text-white text-sm rounded-lg hover:bg-[#1f2937] transition-colors">
        <Edit class="w-4 h-4" />
        Editar
      </button>
      <button class="flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <Eye class="w-4 h-4 text-[#627271]" />
      </button>
    </div>
  </div>
</div>
```

### 3.3 Regras de Negócio (RN-EST)

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-006 | Grid padrão exibe 24 produtos por página | Paginação com limit 24 |
| RN-EST-007 | Filtros combinam com operador AND | Múltiplos filtros simultâneos |
| RN-EST-008 | Busca busca em nome, SKU e código de barras | Full-text search nos 3 campos |

---

## 4. Tela 3: Cadastro de Produto (/estoque/produtos/novo)

### 4.1 Estrutura do Layout

Formulário multi-step com abas: Informações, Estoque, Preços, Variações e Adicionais.

### 4.2 Componentes

#### 4.2.1 Tabs de Navegação

```html
<div class="border-b border-gray-200 mb-6">
  <nav class="flex gap-6">
    <button class="px-1 py-3 text-sm font-medium text-[#3e5653] border-b-2 border-[#3e5653]">
      Informações
    </button>
    <button class="px-1 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937]">
      Estoque
    </button>
    <button class="px-1 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937]">
      Preços
    </button>
    <button class="px-1 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937]">
      Variações
    </button>
    <button class="px-1 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937]">
      Adicionais
    </button>
  </nav>
</div>
```

#### 4.2.2 Formulário - Informações Básicas

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h2 class="text-lg font-semibold text-[#1f2937] mb-6">Informações Básicas</h2>
  
  <div class="space-y-6">
    <!-- Nome do Produto -->
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">
        Nome do produto <span class="text-red-500">*</span>
      </label>
      <input 
        type="text" 
        placeholder="Digite o nome do produto"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
    </div>
    
    <!-- SKU -->
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">SKU / Código</label>
      <div class="flex gap-2">
        <input 
          type="text" 
          placeholder="TEC-"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent uppercase"
        />
        <button class="px-4 py-2 bg-gray-100 text-[#627271] rounded-lg hover:bg-gray-200 transition-colors text-sm">
          <RefreshCw class="w-4 h-4" />
          Gerar
        </button>
      </div>
    </div>
    
    <!-- Categoria -->
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">
        Categoria <span class="text-red-500">*</span>
      </label>
      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent">
        <option value="">Selecione uma categoria...</option>
        <option value="1">Eletrônicos</option>
        <option value="2">Acessórios</option>
      </select>
    </div>
    
    <!-- Upload de Imagens -->
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">Imagens do produto</label>
      <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-colors cursor-pointer">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon class="w-8 h-8 text-[#627271]" />
        </div>
        <p class="text-sm text-[#1f2937] font-medium mb-1">Arraste imagens aqui</p>
        <p class="text-xs text-[#627271] mb-3">ou clique para fazer upload</p>
        <p class="text-xs text-[#627271]">Formatos: JPG, PNG, WEBP | Máximo: 5MB por imagem</p>
      </div>
    </div>
  </div>
</div>
```

#### 4.2.3 Formulário - Estoque

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h2 class="text-lg font-semibold text-[#1f2937] mb-6">Estoque</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">
        Quantidade Inicial <span class="text-red-500">*</span>
      </label>
      <input 
        type="number" 
        min="0"
        placeholder="0"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">
        Estoque Mínimo <span class="text-red-500">*</span>
      </label>
      <input 
        type="number" 
        min="0"
        placeholder="10"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
      <p class="mt-1 text-xs text-[#627271]">Quantidade para alerta de estoque baixo</p>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">Estoque Máximo</label>
      <input 
        type="number" 
        min="0"
        placeholder="100"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">Unidade de Medida <span class="text-red-500">*</span>
      </label>
      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent">
        <option value="un">Unidade</option>
        <option value="kg">Quilograma (kg)</option>
        <option value="g">Grama (g)</option>
        <option value="l">Litro (L)</option>
        <option value="ml">Mililitro (ml)</option>
        <option value="m">Metro (m)</option>
        <option value="cx">Caixa</option>
        <option value="par">Par</option>
      </select>
    </div>
  </div>
</div>
```

#### 4.2.4 Formulário - Preços

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h2 class="text-lg font-semibold text-[#1f2937] mb-6">Preços</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">
        Custo <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#627271]">R$</span>
        <input 
          type="number" 
          step="0.01"
          min="0"
          placeholder="0,00"
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
        />
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-2">
        Preço de Venda <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#627271]">R$</span>
        <input 
          type="number" 
          step="0.01"
          min="0"
          placeholder="0,00"
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
        />
      </div>
    </div>
    
    <!-- Margem Calculada -->
    <div>
      <label class="block text-sm font-medium text-[#627271] mb-2">Margem</label>
      <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
        <span class="text-[#86cb92] font-semibold">45,5%</span>
        <span class="text-xs text-[#627271]">Lucro: R$ 81,00</span>
      </div>
    </div>
  </div>
</div>
```

### 4.3 Regras de Negócio (RN-EST)

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-009 | SKU deve ser único no sistema | Validação backend + debounce |
| RN-EST-010 | Margem calculada automaticamente | (Preço - Custo) / Preço × 100 |
| RN-EST-011 | Preço promocional deve ser menor que preço normal | Validação no frontend |
| RN-EST-012 | Imagens são otimizadas no upload | Compressão max 5MB, WebP |
| RN-EST-013 | Produto salvo como rascunho não aparece na loja | Status: draft ou published |

---

## 5. Tela 4: Detalhes do Produto (/estoque/produtos/:id)

### 5.1 Estrutura do Layout

Visão completa do produto com galeria de imagens, resumo de estoque e abas de informações.

### 5.2 Componentes

#### 5.2.1 Header do Produto

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <div class="flex flex-col lg:flex-row gap-6">
    <!-- Galeria de Imagens -->
    <div class="lg:w-1/3">
      <div class="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
        <img src="/api/placeholder/400/400" alt="Produto" class="w-full h-full object-cover" />
      </div>
      <div class="flex gap-2">
        <button class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border-2 border-[#3e5653]">
          <img src="/api/placeholder/64/64" alt="" class="w-full h-full object-cover" />
        </button>
        <button class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300">
          <img src="/api/placeholder/64/64" alt="" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>
    
    <!-- Informações -->
    <div class="lg:w-2/3">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold text-[#1f2937] mb-1">Teclado Mecânico RGB</h1>
          <p class="text-sm text-[#627271]">SKU: TEC-RGB-001</p>
        </div>
        <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
          <CheckCircle class="w-4 h-4" />
          Ativo
        </span>
      </div>
      
      <!-- Ações -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
          <Edit class="w-4 h-4" />
          Editar
        </button>
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Copy class="w-4 h-4" />
          Duplicar
        </button>
        <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          <Trash2 class="w-4 h-4" />
          Excluir
        </button>
      </div>
    </div>
  </div>
</div>
```

#### 5.2.2 Cards de Resumo

```html
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Estoque -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <p class="text-sm text-[#627271] mb-1">Estoque Atual</p>
    <p class="text-3xl font-bold text-[#86cb92] mb-2">45 <span class="text-base font-normal">un</span></p>
    <div class="flex items-center gap-1">
      <CheckCircle class="w-4 h-4 text-[#86cb92]" />
      <span class="text-sm text-[#86cb92]">Em estoque</span>
    </div>
  </div>
  
  <!-- Preço -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <p class="text-sm text-[#627271] mb-1">Preço de Venda</p>
    <p class="text-3xl font-bold text-[#1f2937] mb-2">R$ 299,00</p>
    <p class="text-sm text-[#627271]">Custo: R$ 180,00</p>
  </div>
  
  <!-- Valor em Estoque -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <p class="text-sm text-[#627271] mb-1">Valor em Estoque</p>
    <p class="text-3xl font-bold text-[#1f2937] mb-2">R$ 13.455,00</p>
    <p class="text-sm text-[#627271]">45 un × R$ 299,00</p>
  </div>
  
  <!-- Margem -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <p class="text-sm text-[#627271] mb-1">Margem de Lucro</p>
    <p class="text-3xl font-bold text-[#86cb92] mb-2">40%</p>
    <p class="text-sm text-[#627271]">Lucro: R$ 119,00/un</p>
  </div>
</div>
```

### 5.3 Regras de Negócio (RN-EST)

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-014 | Paginação de movimentações em 20 itens | Limit 20 por página |
| RN-EST-015 | Exclusão de produto requer confirmação | Modal com senha do usuário |
| RN-EST-016 | Duplicar produto copia todos os dados exceto SKU | Novo SKU gerado automaticamente |

---

## 6. Tela 5: Movimentações (/estoque/movimentacoes)

### 6.1 Estrutura do Layout

Controle de entradas, saídas e ajustes de estoque com filtros e histórico completo.

### 6.2 Componentes

#### 6.2.1 Modal de Entrada de Estoque

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
    <div class="flex items-center justify-between p-5 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-[#1f2937]">Nova Entrada de Estoque</h3>
      <button class="text-[#627271] hover:text-[#1f2937]">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-5 space-y-4">
      <!-- Produto -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">
          Produto <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
          <input 
            type="text" 
            placeholder="Buscar produto por nome ou SKU..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
          />
        </div>
      </div>
      
      <!-- Quantidade e Custo -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-2">
            Quantidade <span class="text-red-500">*</span>
          </label>
          <input 
            type="number" 
            min="1"
            placeholder="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-2">
            Custo Unitário <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#627271]">R$</span>
            <input 
              type="number" 
              step="0.01"
              min="0"
              placeholder="0,00"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <!-- Motivo -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">
          Motivo <span class="text-red-500">*</span>
        </label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent">
          <option value="">Selecione...</option>
          <option value="compra">Compra</option>
          <option value="devolucao">Devolução</option>
          <option value="transferencia">Transferência</option>
          <option value="outro">Outro</option>
        </select>
      </div>
      
      <!-- Observações -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">Observações</label>
        <textarea 
          rows="3"
          placeholder="Observações adicionais..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent resize-none"
        ></textarea>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-3 p-5 border-t border-gray-200">
      <button class="px-4 py-2 text-[#627271] hover:text-[#1f2937]">Cancelar</button>
      <button class="px-4 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-green-600 transition-colors">
        <ArrowDownLeft class="w-4 h-4 inline mr-2" />
        Registrar Entrada
      </button>
    </div>
  </div>
</div>
```

### 6.3 Regras de Negócio (RN-EST)

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-017 | Movimentações são imutáveis após criação | Sem edição, apenas visualização |
| RN-EST-018 | Entrada atualiza custo médio ponderado | Fórmula: ((EstoqueAtual × CustoAtual) + (Qtd × CustoNovo)) / (EstoqueAtual + Qtd) |
| RN-EST-019 | Ajuste requer motivo obrigatório | Campo motivo é required |

---

## 7. Tela 6: Inventário (/estoque/inventario)

### 7.1 Estrutura do Layout

Contagem física do estoque com progresso, scanner de código de barras e ajustes automáticos.

### 7.2 Componentes

#### 7.2.1 Barra de Progresso

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <div class="flex items-center justify-between mb-3">
    <div>
      <h3 class="font-semibold text-[#1f2937]">Progresso da Contagem</h3>
      <p class="text-sm text-[#627271]">45 de 124 produtos contados (36%)</p>
    </div>
    <div class="text-right">
      <p class="text-sm font-medium text-yellow-600">8 divergências encontradas</p>
      <p class="text-xs text-[#627271]">Valor: R$ 1.245,00</p>
    </div>
  </div>
  
  <!-- Barra de Progresso -->
  <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
    <div class="h-full bg-gradient-to-r from-[#86cb92] to-[#3e5653] rounded-full transition-all duration-500" style="width: 36%"></div>
  </div>
</div>
```

#### 7.2.2 Item de Contagem

```html
<div class="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#86cb92] transition-colors">
  <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-[#3e5653] focus:ring-[#86cb92]" />
  
  <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
    <img src="/api/placeholder/48/48" alt="" class="w-full h-full object-cover" />
  </div>
  
  <div class="flex-1 min-w-0">
    <p class="font-medium text-[#1f2937] truncate">Teclado Mecânico RGB</p>
    <p class="text-xs text-[#627271]">SKU: TEC-RGB-001</p>
  </div>
  
  <div class="text-center w-20">
    <p class="text-lg font-semibold text-[#1f2937]">45</p>
    <p class="text-xs text-[#627271]">Sistema</p>
  </div>
  
  <div class="w-24">
    <input 
      type="number" 
      min="0"
      class="w-full px-2 py-2 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      placeholder="0"
    />
  </div>
  
  <div class="text-center w-20">
    <p class="text-lg font-semibold text-green-600">-</p>
    <p class="text-xs text-[#627271]">Diferença</p>
  </div>
  
  <div class="w-12 text-center">
    <div class="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center">
      <Check class="w-4 h-4 text-gray-300" />
    </div>
  </div>
</div>
```

### 7.3 Regras de Negócio (RN-EST)

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-020 | Inventário pode ser salvo parcialmente | Status: em_andamento ou finalizado |
| RN-EST-021 | Scanner de código de barras acelera contagem | API Web Barcode Detector |
| RN-EST-022 | Divergências geram movimentações de ajuste | Ao finalizar, criar registros |

---

## 8. Tela 7: Relatórios (/estoque/relatorios)

### 8.1 Estrutura do Layout

Dashboard de relatórios com cards de acesso e visualizações detalhadas.

### 8.2 Componentes

#### 8.2.1 Card de Relatório

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group">
  <div class="flex items-start justify-between mb-4">
    <div class="w-12 h-12 bg-[#86cb92]/20 rounded-xl flex items-center justify-center group-hover:bg-[#86cb92] transition-colors">
      <Package class="w-6 h-6 text-[#86cb92] group-hover:text-white transition-colors" />
    </div>
    <ArrowRight class="w-5 h-5 text-[#627271] group-hover:text-[#3e5653] transition-colors" />
  </div>
  <h3 class="font-semibold text-[#1f2937] mb-1">Posição de Estoque</h3>
  <p class="text-sm text-[#627271]">Valor total em estoque por produto e categoria</p>
</div>
```

#### 8.2.2 Relatório: Curva ABC

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200">
  <div class="p-5 border-b border-gray-200">
    <h3 class="font-semibold text-[#1f2937]">Curva ABC - Giro de Produtos</h3>
    <p class="text-sm text-[#627271]">Período: Últimos 30 dias</p>
  </div>
  
  <div class="p-5">
    <!-- Resumo -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="p-4 bg-green-50 rounded-lg border border-green-200">
        <p class="text-xs text-green-700 uppercase font-medium mb-1">Classe A</p>
        <p class="text-2xl font-bold text-green-700">12</p>
        <p class="text-xs text-green-600">produtos (70% do faturamento)</p>
      </div>
      
      <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p class="text-xs text-yellow-700 uppercase font-medium mb-1">Classe B</p>
        <p class="text-2xl font-bold text-yellow-700">28</p>
        <p class="text-xs text-yellow-600">produtos (20% do faturamento)</p>
      </div>
      
      <div class="p-4 bg-gray-100 rounded-lg border border-gray-200">
        <p class="text-xs text-gray-600 uppercase font-medium mb-1">Classe C</p>
        <p class="text-2xl font-bold text-gray-700">84</p>
        <p class="text-xs text-gray-500">produtos (10% do faturamento)</p>
      </div>
    </div>
  </div>
</div>
```

### 8.3 Regras de Negócio (RN-EST)

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-023 | Curva ABC calculada por valor de venda | 80/15/5 regra empírica |
| RN-EST-024 | Produtos parados: sem venda há 90 dias | Filtro last_sale_date |
| RN-EST-025 | Giro de estoque = Vendas / Estoque Médio | Fórmula mensal |
| RN-EST-026 | Todos os relatórios exportáveis em PDF e Excel | jsPDF + SheetJS |

---

## 9. Estados e Interações

### 9.1 Loading States

```html
<!-- Skeleton para Cards -->
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
  <div class="flex items-start justify-between">
    <div class="space-y-2 flex-1">
      <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      <div class="h-8 bg-gray-200 rounded w-1/3"></div>
      <div class="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
    <div class="w-12 h-12 bg-gray-200 rounded-xl"></div>
  </div>
</div>
```

### 9.2 Estados Vazios

```html
<div class="text-center py-12">
  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <Package class="w-8 h-8 text-[#627271]" />
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937] mb-2">Nenhum produto encontrado</h3>
  <p class="text-sm text-[#627271] mb-4">Tente ajustar os filtros ou adicione um novo produto.</p>
  <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
    <Plus class="w-4 h-4 inline mr-2" />
    Novo Produto
  </button>
</div>
```

---

## 10. Responsividade

### 10.1 Breakpoints

| Breakpoint | Largura | Grid Produtos | Sidebar |
|------------|---------|---------------|---------|
| Mobile | < 640px | 1 coluna | Overlay |
| Tablet | 640-1024px | 2-3 colunas | Collapsed |
| Desktop | > 1024px | 3-4 colunas | Expanded |

### 10.2 Mobile Adaptations

```html
<!-- Cards de Métricas - Mobile: 2 colunas, Desktop: 4 -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Cards... -->
</div>

<!-- Scanner de Código - Mobile Only -->
<button class="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#3e5653] text-white rounded-full shadow-lg flex items-center justify-center">
  <ScanLine class="w-6 h-6" />
</button>
```

---

## 11. Ícones (Lucide React)

| Ícone | Componente | Uso |
|-------|------------|-----|
| 📦 | `Package` | Produtos, estoque |
| 💰 | `DollarSign` | Preços, valores |
| ⚠️ | `AlertTriangle` | Estoque baixo, alertas |
| ✗ | `XCircle` | Sem estoque, erro |
| ✓ | `CheckCircle` | Estoque OK, sucesso |
| ↓ | `ArrowDownLeft` | Entrada de estoque |
| ↑ | `ArrowUpRight` | Saída de estoque |
| ↻ | `RefreshCw` | Ajuste, atualizar |
| 🔍 | `Search` | Busca |
| ✏️ | `Edit` | Editar |
| 👁️ | `Eye` | Visualizar |
| 🗑️ | `Trash2` | Excluir |
| ➕ | `Plus` | Adicionar |
| 📊 | `BarChart3` | Relatórios |
| 📋 | `ClipboardList` | Inventário |
| 📷 | `ScanLine` | Scanner |

---

## 12. Checklist de Implementação

### Funcionalidades Essenciais
- [ ] Dashboard com métricas em tempo real
- [ ] Listagem de produtos com grid/lista
- [ ] Cadastro completo de produto (abas)
- [ ] Upload múltiplo de imagens
- [ ] Movimentações (entrada/saída/ajuste)
- [ ] Inventário físico com contagem
- [ ] Relatórios exportáveis
- [ ] Filtros e busca avançada
- [ ] Ações em massa
- [ ] Histórico de movimentações

### UX/UI
- [ ] Estados de loading (skeleton)
- [ ] Estados vazios
- [ ] Confirmações de ações destrutivas
- [ ] Toasts de feedback
- [ ] Responsividade mobile
- [ ] Acessibilidade (ARIA labels)

---

## 13. Glossário

| Termo | Definição |
|-------|-----------|
| **SKU** | Stock Keeping Unit - código único do produto |
| **Giro de Estoque** | Quantidade de vezes que o estoque é renovado em um período |
| **Curva ABC** | Classificação dos produtos por importância no faturamento |
| **Estoque Mínimo** | Quantidade que dispara alerta de reposição |
| **Custo Médio Ponderado** | Média dos custos de aquisição ponderada pela quantidade |
| **Movimentação** | Registro de entrada, saída ou ajuste de estoque |
| **Inventário** | Processo de contagem física do estoque |
| **Variação** | Versões de um produto (cor, tamanho, etc.) |

---

**Documento versionado. Última atualização: 2026-03-12**
