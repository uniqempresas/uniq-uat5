# Módulo 07: Loja Virtual

## Metadados do Documento

| Campo | Valor |
|-------|-------|
| **ID do Módulo** | MOD-LOJ-001 |
| **Nome** | Loja Virtual |
| **Versão** | 1.0.0 |
| **Prioridade** | MUST HAVE (MVP) |
| **Autor** | UNIQ Product Team |
| **Data de Criação** | 2024-01-15 |
| **Status** | Em desenvolvimento |

---

## 1. Visão Geral do Módulo

### 1.1 Propósito
O Módulo de Loja Virtual é o **diferencial principal** da UNIQ Empresas - permite que qualquer empresa tenha uma loja online profissional pronta para operar em 1-2 dias. Este módulo transforma o catálogo de produtos em uma experiência de compra completa, integrada com WhatsApp para conversão rápida.

### 1.2 Objetivos de Negócio
- **Time-to-market**: Loja online em 24-48h após configuração inicial
- **Conversão via WhatsApp**: Checkout simplificado com redirecionamento direto
- **Domínio próprio**: Cada empresa recebe [empresa].uniq.store
- **Personalização completa**: Tema visual sob medida para cada marca

### 1.3 Públicos
- **Administrador**: Equipe da empresa configurando a loja (telas internas)
- **Comprador**: Clientes finais navegando e comprando (telas públicas)

### 1.4 Integrações
| Módulo | Tipo | Descrição |
|--------|------|-----------|
| Estoque (MOD-04) | Leitura | Produtos disponíveis para venda |
| MEL (MOD-08) | Escrita | Notificações de visita na loja |
| WhatsApp Business | Externa | Checkout e comunicação com cliente |

---

## 2. Design System - Loja Virtual

### 2.1 Paleta de Cores Obrigatória

```
Cores da Marca UNIQ:
├── Jet Black:        #1f2937  (Texto principal, headers)
├── Dim Grey:         #627271  (Texto secundário, labels)
├── Dark Slate Grey:  #3e5653  (Elementos de destaque)
├── Platinum:         #efefef  (Backgrounds alternativos)
├── Emerald:          #86cb92  (Ações positivas, CTAs, sucesso)
└── Bordas:           #e5e7eb  (Divisores, borders)
```

### 2.2 Variáveis do Tema Personalizável

Cada loja pode personalizar:

```css
/* Tema Padrão UNIQ */
:root {
  --color-primary: #3e5653;       /* Botões principais */
  --color-secondary: #627271;     /* Botões secundários */
  --color-accent: #86cb92;        /* Destaques, badges */
  --color-background: #ffffff;    /* Fundo principal */
  --color-surface: #efefef;       /* Cards, seções */
  --color-text: #1f2937;          /* Texto principal */
  --color-text-muted: #627271;    /* Texto secundário */
  --border-color: #e5e7eb;        /* Bordas */
}
```

### 2.3 Tipografia

```css
/* Fontes disponíveis */
--font-heading: 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;

/* Tamanhos */
--text-hero: 3rem;        /* 48px - Título principal */
--text-h1: 2.25rem;       /* 36px */
--text-h2: 1.5rem;        /* 24px */
--text-h3: 1.25rem;       /* 20px */
--text-body: 1rem;        /* 16px */
--text-small: 0.875rem;   /* 14px */
--text-xs: 0.75rem;       /* 12px */
```

### 2.4 Espaçamento (8pt Grid)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### 2.5 Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

### 2.6 Componentes Base

#### Botões
```css
/* Botão Primário */
.btn-primary {
  @apply px-6 py-3 bg-[#3e5653] text-white rounded-lg font-medium 
         hover:bg-[#2d403d] transition-colors duration-200;
}

/* Botão Secundário */
.btn-secondary {
  @apply px-6 py-3 bg-white text-[#3e5653] border border-[#e5e7eb] 
         rounded-lg font-medium hover:bg-[#efefef] transition-colors;
}

/* Botão CTA (WhatsApp) */
.btn-whatsapp {
  @apply px-6 py-3 bg-[#25D366] text-white rounded-lg font-medium 
         hover:bg-[#128C7E] transition-colors flex items-center gap-2;
}
```

#### Cards
```css
/* Card de Produto */
.card-product {
  @apply bg-white rounded-xl border border-[#e5e7eb] overflow-hidden
         hover:shadow-lg transition-shadow duration-300;
}

/* Card de Configuração */
.card-config {
  @apply bg-white rounded-lg border border-[#e5e7eb] p-6;
}
```

#### Inputs
```css
.input-field {
  @apply w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
         focus:outline-none focus:ring-2 focus:ring-[#3e5653] focus:border-transparent
         text-[#1f2937] placeholder-[#627271];
}
```

---

## 3. Tela 1: Configuração da Loja

**ID da Tela:** TELA-LOJ-001  
**Tipo:** ADMIN (Sistema Interno)  
**URL:** `/loja/configuracoes`  
**Permissão:** Administrador  

### 3.1 Propósito
Painel administrativo para configurar todas as características visuais e funcionais da loja virtual da empresa.

### 3.2 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Loja Virtual > Configurações                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  VISUALIZAÇÃO AO VIVO                                               │   │
│  │  ┌──────────────┐                                                   │   │
│  │  │              │  Preview da loja em tempo real                     │   │
│  │  │   [PREVIEW]  │  mostrando alterações instantâneas                 │   │
│  │  │              │                                                   │   │
│  │  └──────────────┘                                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │  IDENTIDADE VISUAL              │  │  CONFIGURAÇÕES GERAIS           │  │
│  │                                 │  │                                 │  │
│  │  [LOGO UPLOAD]                  │  │  Nome da Loja *                 │  │
│  │  Clique para enviar logo        │  │  [____________________]         │  │
│  │                                 │  │                                 │  │
│  │  Cor Primária                   │  │  Descrição                      │  │
│  │  [#3e5653] [picker]             │  │  [                        ]     │  │
│  │                                 │  │  [                        ]     │  │
│  │  Cor Secundária                 │  │                                 │  │
│  │  [#86cb92] [picker]             │  │  Telefone WhatsApp *            │  │
│  │                                 │  │  [(__) _____-____]              │  │
│  │  Cor de Destaque                │  │                                 │  │
│  │  [#1f2937] [picker]             │  │  Email de Contato               │  │
│  │                                 │  │  [____________________]         │  │
│  │  Fonte do Título                │  │                                 │  │
│  │  [Inter ▼]                      │  │  [✓] Mostrar preços             │  │
│  │                                 │  │  [✓] Permitir pedidos           │  │
│  │  Fonte do Corpo                 │  │  [ ] Modo manutenção            │  │
│  │  [Inter ▼]                      │  │                                 │  │
│  └─────────────────────────────────┘  └─────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DOMÍNIO                                                            │   │
│  │                                                                     │   │
│  │  Seu domínio UNIQ: https://[minha-empresa      ].uniq.store        │   │
│  │                      [Verificar disponibilidade]                    │   │
│  │                                                                     │   │
│  │  Status: ✓ Disponível    [ ] Usar domínio próprio (Avançado)       │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  HERO BANNER                                                        │   │
│  │                                                                     │   │
│  │  [Imagem/Video upload area]                                         │   │
│  │                                                                     │   │
│  │  Título do Banner: [Bem-vindo à nossa loja!               ]        │   │
│  │  Subtítulo:        [Encontre os melhores produtos...      ]        │   │
│  │                                                                     │   │
│  │  [✓] Mostrar banner na página inicial                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  REDES SOCIAIS                                                      │   │
│  │                                                                     │   │
│  │  Instagram: [@                      ]  Facebook: [              ]   │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│                                [Salvar Alterações]                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Especificações de Design

#### Seção: Identidade Visual
```html
<!-- Card de Identidade Visual -->
<div class="bg-white rounded-lg border border-[#e5e7eb] p-6">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
    <svg class="w-5 h-5 text-[#3e5653]"><!-- palette icon --></svg>
    Identidade Visual
  </h3>
  
  <!-- Logo Upload -->
  <div class="mb-6">
    <label class="block text-sm font-medium text-[#627271] mb-2">Logo da Loja</label>
    <div class="border-2 border-dashed border-[#e5e7eb] rounded-lg p-8 text-center
                hover:border-[#3e5653] transition-colors cursor-pointer group">
      <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-[#efefef] flex items-center justify-center
                  group-hover:bg-[#3e5653]/10">
        <svg class="w-8 h-8 text-[#627271] group-hover:text-[#3e5653]">
          <!-- upload icon -->
        </svg>
      </div>
      <p class="text-sm text-[#627271]">Clique para fazer upload</p>
      <p class="text-xs text-[#627271] mt-1">PNG, JPG ou SVG (max 2MB)</p>
    </div>
  </div>
  
  <!-- Cores -->
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-[#627271] mb-2">Cor Primária</label>
      <div class="flex gap-3">
        <input type="color" value="#3e5653" 
               class="w-12 h-10 rounded border border-[#e5e7eb] cursor-pointer" />
        <input type="text" value="#3e5653" 
               class="flex-1 px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm" />
      </div>
      <p class="text-xs text-[#627271] mt-1">Usada em botões principais e links</p>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#627271] mb-2">Cor Secundária</label>
      <div class="flex gap-3">
        <input type="color" value="#86cb92" 
               class="w-12 h-10 rounded border border-[#e5e7eb] cursor-pointer" />
        <input type="text" value="#86cb92" 
               class="flex-1 px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm" />
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#627271] mb-2">Cor de Destaque</label>
      <div class="flex gap-3">
        <input type="color" value="#1f2937" 
               class="w-12 h-10 rounded border border-[#e5e7eb] cursor-pointer" />
        <input type="text" value="#1f2937" 
               class="flex-1 px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm" />
      </div>
    </div>
  </div>
  
  <!-- Fontes -->
  <div class="mt-6 space-y-4">
    <div>
      <label class="block text-sm font-medium text-[#627271] mb-2">Fonte dos Títulos</label>
      <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg bg-white">
        <option>Inter</option>
        <option>Poppins</option>
        <option>Roboto</option>
        <option>Montserrat</option>
        <option>Open Sans</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-[#627271] mb-2">Fonte do Corpo</label>
      <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg bg-white">
        <option>Inter</option>
        <option>Poppins</option>
        <option>Roboto</option>
        <option>Open Sans</option>
      </select>
    </div>
  </div>
</div>
```

#### Seção: Configurações Gerais
```html
<!-- Card de Configurações Gerais -->
<div class="bg-white rounded-lg border border-[#e5e7eb] p-6">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
    <svg class="w-5 h-5 text-[#3e5653]"><!-- settings icon --></svg>
    Configurações Gerais
  </h3>
  
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        Nome da Loja <span class="text-red-500">*</span>
      </label>
      <input type="text" placeholder="Ex: Loja da Maria" 
             class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#627271] mb-1">Descrição</label>
      <textarea rows="3" placeholder="Descreva sua loja..."
                class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#3e5653] resize-none"></textarea>
      <p class="text-xs text-[#627271] mt-1">Aparece nos resultados de busca</p>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        WhatsApp de Atendimento <span class="text-red-500">*</span>
      </label>
      <input type="tel" placeholder="(00) 00000-0000"
             class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
      <p class="text-xs text-[#627271] mt-1">Número que receberá os pedidos</p>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#627271] mb-1">Email de Contato</label>
      <input type="email" placeholder="contato@suaempresa.com"
             class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
    </div>
  </div>
  
  <!-- Toggles -->
  <div class="mt-6 space-y-3 pt-6 border-t border-[#e5e7eb]">
    <label class="flex items-center justify-between cursor-pointer">
      <span class="text-sm text-[#1f2937]">Mostrar preços dos produtos</span>
      <div class="relative">
        <input type="checkbox" checked class="sr-only peer" />
        <div class="w-11 h-6 bg-[#e5e7eb] rounded-full peer peer-checked:bg-[#86cb92]
                    peer-checked:after:translate-x-full after:content-[''] 
                    after:absolute after:top-0.5 after:left-0.5 after:bg-white 
                    after:border after:rounded-full after:h-5 after:w-5 
                    after:transition-all"></div>
      </div>
    </label>
    
    <label class="flex items-center justify-between cursor-pointer">
      <span class="text-sm text-[#1f2937]">Aceitar novos pedidos</span>
      <div class="relative">
        <input type="checkbox" checked class="sr-only peer" />
        <div class="w-11 h-6 bg-[#e5e7eb] rounded-full peer peer-checked:bg-[#86cb92]
                    peer-checked:after:translate-x-full after:content-[''] 
                    after:absolute after:top-0.5 after:left-0.5 after:bg-white 
                    after:border after:rounded-full after:h-5 after:w-5 
                    after:transition-all"></div>
      </div>
    </label>
    
    <label class="flex items-center justify-between cursor-pointer">
      <span class="text-sm text-[#1f2937]">Modo manutenção</span>
      <div class="relative">
        <input type="checkbox" class="sr-only peer" />
        <div class="w-11 h-6 bg-[#e5e7eb] rounded-full peer peer-checked:bg-[#1f2937]
                    peer-checked:after:translate-x-full after:content-[''] 
                    after:absolute after:top-0.5 after:left-0.5 after:bg-white 
                    after:border after:rounded-full after:h-5 after:w-5 
                    after:transition-all"></div>
      </div>
    </label>
  </div>
</div>
```

#### Seção: Domínio
```html
<!-- Card de Domínio -->
<div class="bg-white rounded-lg border border-[#e5e7eb] p-6">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
    <svg class="w-5 h-5 text-[#3e5653]"><!-- globe icon --></svg>
    Domínio da Loja
  </h3>
  
  <div class="bg-[#efefef] rounded-lg p-4 mb-4">
    <p class="text-sm text-[#627271] mb-2">URL da sua loja:</p>
    <div class="flex gap-2">
      <span class="text-[#627271] py-2">https://</span>
      <input type="text" placeholder="minha-empresa" 
             class="flex-1 px-3 py-2 border border-[#e5e7eb] rounded-lg font-mono text-sm" />
      <span class="text-[#627271] py-2">.uniq.store</span>
    </div>
  </div>
  
  <!-- Status do domínio -->
  <div class="flex items-center gap-2 mb-4">
    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-[#86cb92]/10 text-[#3e5653]">
      <svg class="w-4 h-4"><!-- check icon --></svg>
      Disponível
    </span>
    <!-- ou -->
    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 hidden">
      <svg class="w-4 h-4"><!-- x icon --></svg>
      Indisponível
    </span>
  </div>
  
  <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg text-sm font-medium
                 hover:bg-[#2d403d] transition-colors">
    Verificar Disponibilidade
  </button>
  
  <!-- Domínio próprio (avançado) -->
  <div class="mt-6 pt-6 border-t border-[#e5e7eb]">
    <label class="flex items-start gap-3 cursor-pointer">
      <input type="checkbox" class="mt-0.5 w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653]" />
      <div>
        <span class="text-sm font-medium text-[#1f2937]">Usar domínio próprio</span>
        <p class="text-xs text-[#627271] mt-1">Configure seu próprio domínio (ex: loja.minhaempresa.com)</p>
      </div>
    </label>
  </div>
</div>
```

#### Preview ao Vivo
```html
<!-- Preview Panel -->
<div class="bg-white rounded-lg border border-[#e5e7eb] p-6">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-[#1f2937]">Visualização ao Vivo</h3>
    <a href="#" target="_blank" 
       class="text-sm text-[#3e5653] hover:underline flex items-center gap-1">
      Abrir loja
      <svg class="w-4 h-4"><!-- external link icon --></svg>
    </a>
  </div>
  
  <!-- Browser mockup -->
  <div class="border border-[#e5e7eb] rounded-lg overflow-hidden">
    <!-- Browser chrome -->
    <div class="bg-[#efefef] px-4 py-2 flex items-center gap-2 border-b border-[#e5e7eb]">
      <div class="flex gap-1.5">
        <div class="w-3 h-3 rounded-full bg-red-400"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div class="w-3 h-3 rounded-full bg-green-400"></div>
      </div>
      <div class="flex-1 bg-white rounded px-3 py-1 text-xs text-[#627271] text-center">
        minha-empresa.uniq.store
      </div>
    </div>
    
    <!-- Preview content -->
    <div class="h-96 bg-white overflow-hidden">
      <iframe src="/preview/loja" class="w-full h-full border-0"></iframe>
    </div>
  </div>
  
  <div class="flex justify-center gap-2 mt-4">
    <button class="p-2 rounded-lg bg-[#efefef] hover:bg-[#e5e7eb] transition-colors">
      <svg class="w-5 h-5 text-[#627271]"><!-- desktop icon --></svg>
    </button>
    <button class="p-2 rounded-lg hover:bg-[#efefef] transition-colors">
      <svg class="w-5 h-5 text-[#627271]"><!-- tablet icon --></svg>
    </button>
    <button class="p-2 rounded-lg hover:bg-[#efefef] transition-colors">
      <svg class="w-5 h-5 text-[#627271]"><!-- mobile icon --></svg>
    </button>
  </div>
</div>
```

### 3.4 Estados

#### Estado: Loading
```html
<div class="animate-pulse space-y-6">
  <!-- Header skeleton -->
  <div class="h-8 bg-[#efefef] rounded w-1/3"></div>
  
  <!-- Cards skeleton -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="h-96 bg-[#efefef] rounded-lg"></div>
    <div class="h-96 bg-[#efefef] rounded-lg"></div>
  </div>
  
  <div class="h-64 bg-[#efefef] rounded-lg"></div>
</div>
```

#### Estado: Sucesso ao Salvar
```html
<div class="fixed bottom-6 right-6 bg-[#86cb92] text-white px-6 py-4 rounded-lg shadow-lg
            flex items-center gap-3 animate-in slide-in-from-bottom">
  <svg class="w-6 h-6"><!-- check-circle icon --></svg>
  <div>
    <p class="font-medium">Configurações salvas!</p>
    <p class="text-sm text-white/80">Sua loja foi atualizada com sucesso.</p>
  </div>
</div>
```

### 3.5 Interações

| Ação | Comportamento |
|------|---------------|
| Alterar cor | Preview atualiza em tempo real |
| Upload de logo | Preview mostra logo imediatamente |
| Verificar domínio | Valida disponibilidade via API |
| Salvar | Valida todos os campos obrigatórios |
| Preview | Abre loja em nova aba com configurações atuais |

---

## 4. Tela 2: Catálogo de Produtos na Loja

**ID da Tela:** TELA-LOJ-002  
**Tipo:** ADMIN (Sistema Interno)  
**URL:** `/loja/produtos`  
**Permissão:** Administrador, Gerente  

### 4.1 Propósito
Gerenciar quais produtos do estoque aparecem na loja virtual, com controle de visibilidade e ordenação.

### 4.2 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Loja Virtual > Produtos                                [+ Adicionar]│
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  [🔍 Buscar produtos...          ]  [Todos ▼]  [Ativos ▼]          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  PRODUTOS NA LOJA (12)                                              │   │
│  │                                                                     │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │   │
│  │  │ [IMG]      │ │ [IMG]      │ │ [IMG]      │ │ [IMG]      │       │   │
│  │  │            │ │   🏷️       │ │            │ │   🏷️       │       │   │
│  │  │ Nome do    │ │ Nome do    │ │ Nome do    │ │ Nome do    │       │   │
│  │  │ Produto 1  │ │ Produto 2  │ │ Produto 3  │ │ Produto 4  │       │   │
│  │  │            │ │            │ │            │ │            │       │   │
│  │  │ R$ 99,90   │ │ R$ 149,90  │ │ R$ 79,90   │ │ R$ 199,90  │       │   │
│  │  │            │ │            │ │            │ │            │       │   │
│  │  │ [🟢] [👁] [✏]│ │ [🟢] [👁] [✏]│ │ [🔴] [👁] [✏]│ │ [🟢] [👁] [✏]│       │   │
│  │  │ Ativo Vis  │ │ Ativo Vis  │ │ Inat  Vis  │ │ Ativo Vis  │       │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘       │   │
│  │                                                                     │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │   │
│  │  │ [IMG]      │ │ [IMG]      │ │ [IMG]      │ │     +      │       │   │
│  │  │            │ │            │ │            │ │  Adicionar │       │   │
│  │  │ Nome do    │ │ Nome do    │ │ Nome do    │ │   produto  │       │   │
│  │  │ Produto 5  │ │ Produto 6  │ │ Produto 7  │ │   do       │       │   │
│  │  │            │ │            │ │            │ │   estoque  │       │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘       │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Dica: Arraste os produtos para reorganizar a ordem de exibição na loja    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Especificações de Design

#### Grid de Produtos
```html
<!-- Container -->
<div class="bg-white rounded-lg border border-[#e5e7eb]">
  <div class="p-6 border-b border-[#e5e7eb]">
    <h3 class="text-lg font-semibold text-[#1f2937]">Produtos na Loja</h3>
    <p class="text-sm text-[#627271]">Gerencie quais produtos aparecem para seus clientes</p>
  </div>
  
  <!-- Filtros -->
  <div class="p-4 border-b border-[#e5e7eb] flex flex-wrap gap-3">
    <div class="relative flex-1 min-w-64">
      <svg class="w-5 h-5 text-[#627271] absolute left-3 top-1/2 -translate-y-1/2">
        <!-- search icon -->
      </svg>
      <input type="text" placeholder="Buscar produtos..."
             class="w-full pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
    </div>
    <select class="px-4 py-2 border border-[#e5e7eb] rounded-lg bg-white text-sm">
      <option>Todos os produtos</option>
      <option>Com estoque</option>
      <option>Sem estoque</option>
    </select>
    <select class="px-4 py-2 border border-[#e5e7eb] rounded-lg bg-white text-sm">
      <option>Todos os status</option>
      <option>Ativos na loja</option>
      <option>Inativos</option>
    </select>
  </div>
  
  <!-- Grid -->
  <div class="p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <!-- Product Card -->
      <div class="group bg-white border border-[#e5e7eb] rounded-lg overflow-hidden
                  hover:shadow-lg transition-shadow cursor-move">
        <!-- Image -->
        <div class="aspect-square bg-[#efefef] relative">
          <img src="/produto.jpg" alt="Produto" 
               class="w-full h-full object-cover" />
          
          <!-- Badge de destaque -->
          <span class="absolute top-2 right-2 px-2 py-1 bg-[#86cb92] text-white 
                       text-xs font-medium rounded">
            Destaque
          </span>
          
          <!-- Overlay de ações -->
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                      transition-opacity flex items-center justify-center gap-2">
            <button class="p-2 bg-white rounded-full hover:bg-[#efefef]"
                    title="Visualizar na loja">
              <svg class="w-5 h-5 text-[#1f2937]"><!-- eye icon --></svg>
            </button>
            <button class="p-2 bg-white rounded-full hover:bg-[#efefef]"
                    title="Editar">
              <svg class="w-5 h-5 text-[#1f2937]"><!-- edit icon --></svg>
            </button>
          </div>
        </div>
        
        <!-- Info -->
        <div class="p-4">
          <h4 class="font-medium text-[#1f2937] truncate">Nome do Produto</h4>
          <p class="text-lg font-semibold text-[#3e5653] mt-1">R$ 99,90</p>
          
          <!-- Status e estoque -->
          <div class="flex items-center gap-2 mt-2">
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
                         bg-[#86cb92]/10 text-[#3e5653]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#86cb92]"></span>
              Ativo
            </span>
            <span class="text-xs text-[#627271]">Estoque: 15</span>
          </div>
          
          <!-- Toggle visibilidade -->
          <label class="flex items-center justify-between mt-3 pt-3 border-t border-[#e5e7eb]">
            <span class="text-xs text-[#627271]">Mostrar na loja</span>
            <div class="relative">
              <input type="checkbox" checked class="sr-only peer" />
              <div class="w-9 h-5 bg-[#e5e7eb] rounded-full peer peer-checked:bg-[#86cb92]
                          peer-checked:after:translate-x-full after:content-[''] 
                          after:absolute after:top-0.5 after:left-0.5 after:bg-white 
                          after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            </div>
          </label>
        </div>
      </div>
      
      <!-- Add Product Card -->
      <button class="border-2 border-dashed border-[#e5e7eb] rounded-lg p-6 flex flex-col
                     items-center justify-center gap-3 hover:border-[#3e5653] 
                     hover:bg-[#3e5653]/5 transition-colors min-h-[280px]">
        <div class="w-14 h-14 rounded-full bg-[#efefef] flex items-center justify-center">
          <svg class="w-7 h-7 text-[#627271]"><!-- plus icon --></svg>
        </div>
        <div class="text-center">
          <p class="font-medium text-[#1f2937]">Adicionar produto</p>
          <p class="text-sm text-[#627271]">do estoque</p>
        </div>
      </button>
    </div>
  </div>
</div>
```

#### Modal: Adicionar Produto
```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
  <div class="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
    <!-- Header -->
    <div class="p-6 border-b border-[#e5e7eb] flex items-center justify-between">
      <h3 class="text-xl font-semibold text-[#1f2937]">Adicionar Produto à Loja</h3>
      <button class="text-[#627271] hover:text-[#1f2937]">
        <svg class="w-6 h-6"><!-- x icon --></svg>
      </button>
    </div>
    
    <!-- Search -->
    <div class="p-4 border-b border-[#e5e7eb]">
      <div class="relative">
        <svg class="w-5 h-5 text-[#627271] absolute left-3 top-1/2 -translate-y-1/2">
          <!-- search icon -->
        </svg>
        <input type="text" placeholder="Buscar no estoque..."
               class="w-full pl-10 pr-4 py-3 border border-[#e5e7eb] rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
      </div>
    </div>
    
    <!-- Lista de produtos -->
    <div class="flex-1 overflow-y-auto p-4">
      <div class="space-y-2">
        <!-- Produto disponível -->
        <label class="flex items-center gap-4 p-3 rounded-lg border border-[#e5e7eb] 
                      hover:border-[#3e5653] cursor-pointer transition-colors">
          <input type="checkbox" class="w-5 h-5 rounded border-[#e5e7eb] text-[#3e5653]" />
          <img src="/produto.jpg" class="w-14 h-14 rounded-lg object-cover bg-[#efefef]" />
          <div class="flex-1">
            <p class="font-medium text-[#1f2937]">Nome do Produto</p>
            <p class="text-sm text-[#627271]">Estoque: 25 unidades</p>
          </div>
          <p class="font-semibold text-[#3e5653]">R$ 99,90</p>
        </label>
        
        <!-- Produto já na loja (desabilitado) -->
        <label class="flex items-center gap-4 p-3 rounded-lg border border-[#e5e7eb] 
                      bg-[#efefef] opacity-60 cursor-not-allowed">
          <input type="checkbox" checked disabled class="w-5 h-5 rounded border-[#e5e7eb]" />
          <img src="/produto.jpg" class="w-14 h-14 rounded-lg object-cover" />
          <div class="flex-1">
            <p class="font-medium text-[#1f2937]">Outro Produto</p>
            <p class="text-sm text-[#627271]">Já adicionado à loja</p>
          </div>
          <span class="text-xs text-[#627271]">Adicionado</span>
        </label>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="p-4 border-t border-[#e5e7eb] flex justify-end gap-3">
      <button class="px-4 py-2 text-[#627271] hover:text-[#1f2937]">Cancelar</button>
      <button class="px-6 py-2 bg-[#3e5653] text-white rounded-lg font-medium
                     hover:bg-[#2d403d] transition-colors">
        Adicionar Selecionados (2)
      </button>
    </div>
  </div>
</div>
```

### 4.4 Estados

#### Estado: Empty (Sem produtos na loja)
```html
<div class="text-center py-16">
  <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-[#efefef] flex items-center justify-center">
    <svg class="w-12 h-12 text-[#627271]"><!-- package icon --></svg>
  </div>
  <h3 class="text-xl font-semibold text-[#1f2937] mb-2">Nenhum produto na loja</h3>
  <p class="text-[#627271] mb-6 max-w-md mx-auto">
    Adicione produtos do seu estoque para começar a vender online.
  </p>
  <button class="px-6 py-3 bg-[#3e5653] text-white rounded-lg font-medium
                 hover:bg-[#2d403d] transition-colors inline-flex items-center gap-2">
    <svg class="w-5 h-5"><!-- plus icon --></svg>
    Adicionar Primeiro Produto
  </button>
</div>
```

#### Estado: Empty State (Estoque vazio)
```html
<div class="text-center py-16">
  <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-[#efefef] flex items-center justify-center">
    <svg class="w-12 h-12 text-[#627271]"><!-- boxes icon --></svg>
  </div>
  <h3 class="text-xl font-semibold text-[#1f2937] mb-2">Seu estoque está vazio</h3>
  <p class="text-[#627271] mb-6">
    Cadastre produtos no módulo de Estoque primeiro.
  </p>
  <a href="/estoque/produtos" 
     class="px-6 py-3 bg-[#3e5653] text-white rounded-lg font-medium
            hover:bg-[#2d403d] transition-colors inline-flex items-center gap-2">
    Ir para Estoque
    <svg class="w-5 h-5"><!-- arrow-right icon --></svg>
  </a>
</div>
```

### 4.5 Regras de Interface

- **Drag & Drop**: Produtos podem ser reordenados arrastando
- **Toggle rápido**: Click no switch ativa/desativa visibilidade
- **Badge "Destaque"**: Máximo 4 produtos podem ser destacados
- **Ordenação**: Produtos destacados aparecem primeiro

---

## 5. Tela 3: Página Inicial da Loja (Pública)

**ID da Tela:** TELA-LOJ-003  
**Tipo:** PÚBLICA (Loja Virtual)  
**URL:** `[empresa].uniq.store`  
**Permissão:** Público  

### 5.1 Propósito
Landing page da loja virtual, apresentando a marca e os produtos disponíveis para compra.

### 5.2 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]                    Início  Produtos  Sobre  Contato    [🔍] [🛒(2)]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ╔═══════════════════════════════════════════════════════════════════════╗ │
│  ║                                                                       ║ │
│  ║                    [HERO BANNER IMAGE]                                ║ │
│  ║                                                                       ║ │
│  ║     TÍTULO DO BANNER                                                  ║ │
│  ║     Subtítulo chamativo da loja                                       ║ │
│  ║                                                                       ║ │
│  ║              [Ver Produtos]                                           ║ │
│  ║                                                                       ║ │
│  ╚═══════════════════════════════════════════════════════════════════════╝ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  CATEGORIAS                                                         │   │
│  │  [Todas] [Categoria 1] [Categoria 2] [Categoria 3] ...              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DESTAQUES                                                          │   │
│  │                                                                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │   │
│  │  │ 🏷️       │ │ 🏷️       │ │ 🏷️       │ │ 🏷️       │               │   │
│  │  │ [IMG]    │ │ [IMG]    │ │ [IMG]    │ │ [IMG]    │               │   │
│  │  │          │ │          │ │          │ │          │               │   │
│  │  │ Produto 1│ │ Produto 2│ │ Produto 3│ │ Produto 4│               │   │
│  │  │ R$ 99,90 │ │ R$149,90 │ │ R$ 79,90 │ │ R$199,90 │               │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  TODOS OS PRODUTOS                              [Mais vendidos ▼]   │   │
│  │                                                                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │   │
│  │  │ [IMG]    │ │ [IMG]    │ │ [IMG]    │ │ [IMG]    │               │   │
│  │  │          │ │          │ │   🏷️     │ │          │               │   │
│  │  │ Produto 5│ │ Produto 6│ │ Produto 7│ │ Produto 8│               │   │
│  │  │ R$ 59,90 │ │ R$129,90 │ │ R$ 89,90 │ │ R$249,90 │               │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │   │
│  │                                                                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │   │
│  │  │ [IMG]    │ │ [IMG]    │ │ [IMG]    │ │ [IMG]    │               │   │
│  │  │ Produto 9│ │ Produto10│ │ Produto11│ │ Produto12│               │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │   │
│  │                                                                     │   │
│  │                    [Carregar Mais Produtos]                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SOBRE NÓS                                                          │   │
│  │                                                                     │   │
│  │  [Imagem]    Texto descritivo sobre a empresa...                    │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  CONTATO                                                            │   │
│  │                                                                     │   │
│  │  📱 WhatsApp: (00) 00000-0000                                       │   │
│  │  📧 Email: contato@empresa.com                                      │   │
│  │  📍 Endereço: Rua Exemplo, 123                                      │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                                     │
│  [LOGO]                                                                     │
│  Links úteis     Redes Sociais     Formas de Pagamento                      │
│  - Início        - Instagram       [Visa] [Master] [Pix]                    │
│  - Produtos      - Facebook                                                 │
│  - Sobre         - WhatsApp        © 2024 [Empresa]. Todos os direitos.    │
│  - Contato                                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Especificações de Design

#### Header (Sticky)
```html
<header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e5e7eb]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center">
        <img src="/logo.png" alt="Logo" class="h-8 w-auto" />
      </a>
      
      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <a href="/" class="text-[#1f2937] hover:text-[#3e5653] font-medium">Início</a>
        <a href="/produtos" class="text-[#627271] hover:text-[#3e5653]">Produtos</a>
        <a href="/sobre" class="text-[#627271] hover:text-[#3e5653]">Sobre</a>
        <a href="/contato" class="text-[#627271] hover:text-[#3e5653]">Contato</a>
      </nav>
      
      <!-- Actions -->
      <div class="flex items-center gap-4">
        <button class="p-2 text-[#627271] hover:text-[#1f2937]">
          <svg class="w-5 h-5"><!-- search icon --></svg>
        </button>
        <a href="/carrinho" class="relative p-2 text-[#627271] hover:text-[#1f2937]">
          <svg class="w-5 h-5"><!-- shopping-cart icon --></svg>
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-[#86cb92] text-white 
                       text-xs font-medium rounded-full flex items-center justify-center">
            2
          </span>
        </a>
        <!-- Mobile menu button -->
        <button class="md:hidden p-2 text-[#627271]">
          <svg class="w-6 h-6"><!-- menu icon --></svg>
        </button>
      </div>
    </div>
  </div>
</header>
```

#### Hero Banner
```html
<section class="relative bg-[#3e5653] text-white overflow-hidden">
  <!-- Background image with overlay -->
  <div class="absolute inset-0">
    <img src="/banner.jpg" alt="" class="w-full h-full object-cover opacity-40" />
    <div class="absolute inset-0 bg-gradient-to-r from-[#3e5653]/90 to-transparent"></div>
  </div>
  
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
    <div class="max-w-xl">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        Bem-vindo à Nossa Loja
      </h1>
      <p class="text-xl text-white/80 mb-8">
        Encontre os melhores produtos com qualidade garantida e preços especiais.
      </p>
      <a href="#produtos" 
         class="inline-flex items-center gap-2 px-8 py-4 bg-[#86cb92] text-white 
                rounded-lg font-semibold hover:bg-[#75ba82] transition-colors">
        Ver Produtos
        <svg class="w-5 h-5"><!-- arrow-down icon --></svg>
      </a>
    </div>
  </div>
</section>
```

#### Grid de Produtos
```html
<section id="produtos" class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <h2 class="text-2xl font-bold text-[#1f2937]">Nossos Produtos</h2>
      <select class="px-4 py-2 border border-[#e5e7eb] rounded-lg bg-white text-sm">
        <option>Mais vendidos</option>
        <option>Menor preço</option>
        <option>Maior preço</option>
        <option>Novidades</option>
      </select>
    </div>
    
    <!-- Categorias -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-full text-sm font-medium">
        Todos
      </button>
      <button class="px-4 py-2 bg-[#efefef] text-[#627271] rounded-full text-sm font-medium
                     hover:bg-[#e5e7eb] transition-colors">
        Categoria 1
      </button>
      <button class="px-4 py-2 bg-[#efefef] text-[#627271] rounded-full text-sm font-medium
                     hover:bg-[#e5e7eb] transition-colors">
        Categoria 2
      </button>
    </div>
    
    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Product Card -->
      <a href="/produto/slug-do-produto" 
         class="group bg-white rounded-xl border border-[#e5e7eb] overflow-hidden
                hover:shadow-xl hover:border-[#3e5653]/20 transition-all duration-300">
        <!-- Image -->
        <div class="aspect-square bg-[#efefef] relative overflow-hidden">
          <img src="/produto.jpg" alt="Produto" 
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          
          <!-- Badge destaque -->
          <span class="absolute top-3 left-3 px-3 py-1 bg-[#86cb92] text-white 
                       text-xs font-semibold rounded-full">
            Destaque
          </span>
        </div>
        
        <!-- Info -->
        <div class="p-4">
          <h3 class="font-semibold text-[#1f2937] group-hover:text-[#3e5653] 
                     transition-colors line-clamp-2">
            Nome do Produto
          </h3>
          <p class="text-sm text-[#627271] mt-1 line-clamp-1">Categoria</p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-xl font-bold text-[#3e5653]">R$ 99,90</span>
            <span class="text-xs text-[#627271]">à vista</span>
          </div>
        </div>
      </a>
    </div>
    
    <!-- Load more -->
    <div class="text-center mt-12">
      <button class="px-8 py-3 border border-[#3e5653] text-[#3e5653] rounded-lg font-medium
                     hover:bg-[#3e5653] hover:text-white transition-colors">
        Carregar Mais Produtos
      </button>
    </div>
  </div>
</section>
```

#### Seção Sobre
```html
<section class="py-16 bg-[#efefef]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <div class="relative">
        <img src="/sobre.jpg" alt="Sobre nós" 
             class="rounded-2xl shadow-lg" />
        <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-[#86cb92] rounded-2xl 
                    flex items-center justify-center text-white">
          <div class="text-center">
            <span class="text-3xl font-bold">+5</span>
            <span class="block text-sm">anos de<br/>experiência</span>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-3xl font-bold text-[#1f2937] mb-4">Sobre Nossa Empresa</h2>
        <p class="text-[#627271] mb-6 leading-relaxed">
          Texto descritivo sobre a empresa, sua história, valores e compromisso com os clientes.
        </p>
        <a href="/sobre" class="inline-flex items-center gap-2 text-[#3e5653] font-medium
                                hover:gap-3 transition-all">
          Conheça mais
          <svg class="w-5 h-5"><!-- arrow-right icon --></svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

#### Footer
```html
<footer class="bg-[#1f2937] text-white py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <!-- Brand -->
      <div class="md:col-span-1">
        <img src="/logo-white.png" alt="Logo" class="h-8 mb-4" />
        <p class="text-white/60 text-sm">
          Sua loja online completa com os melhores produtos.
        </p>
      </div>
      
      <!-- Links -->
      <div>
        <h4 class="font-semibold mb-4">Links Úteis</h4>
        <ul class="space-y-2 text-white/60">
          <li><a href="/" class="hover:text-white transition-colors">Início</a></li>
          <li><a href="/produtos" class="hover:text-white transition-colors">Produtos</a></li>
          <li><a href="/sobre" class="hover:text-white transition-colors">Sobre</a></li>
          <li><a href="/contato" class="hover:text-white transition-colors">Contato</a></li>
        </ul>
      </div>
      
      <!-- Social -->
      <div>
        <h4 class="font-semibold mb-4">Redes Sociais</h4>
        <div class="flex gap-4">
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                            hover:bg-[#86cb92] transition-colors">
            <svg class="w-5 h-5"><!-- instagram icon --></svg>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                            hover:bg-[#86cb92] transition-colors">
            <svg class="w-5 h-5"><!-- facebook icon --></svg>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                            hover:bg-[#86cb92] transition-colors">
            <svg class="w-5 h-5"><!-- whatsapp icon --></svg>
          </a>
        </div>
      </div>
      
      <!-- Contato -->
      <div>
        <h4 class="font-semibold mb-4">Contato</h4>
        <ul class="space-y-2 text-white/60 text-sm">
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4"><!-- phone icon --></svg>
            (00) 00000-0000
          </li>
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4"><!-- email icon --></svg>
            contato@empresa.com
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Bottom -->
    <div class="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
      © 2024 [Nome da Empresa]. Todos os direitos reservados.
      <span class="block mt-2">Feito com ❤️ na UNIQ</span>
    </div>
  </div>
</footer>
```

### 5.4 Estados

#### Estado: Loading (Skeleton)
```html
<!-- Header Skeleton -->
<div class="h-16 bg-white border-b border-[#e5e7eb]">
  <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
    <div class="w-32 h-8 bg-[#efefef] rounded animate-pulse"></div>
    <div class="hidden md:flex gap-8">
      <div class="w-16 h-4 bg-[#efefef] rounded animate-pulse"></div>
      <div class="w-16 h-4 bg-[#efefef] rounded animate-pulse"></div>
      <div class="w-16 h-4 bg-[#efefef] rounded animate-pulse"></div>
    </div>
    <div class="w-20 h-8 bg-[#efefef] rounded animate-pulse"></div>
  </div>
</div>

<!-- Hero Skeleton -->
<div class="h-96 bg-[#efefef] animate-pulse"></div>

<!-- Products Skeleton -->
<div class="max-w-7xl mx-auto px-4 py-16">
  <div class="w-48 h-8 bg-[#efefef] rounded mb-8 animate-pulse"></div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="h-80 bg-[#efefef] rounded-xl animate-pulse"></div>
    <div class="h-80 bg-[#efefef] rounded-xl animate-pulse"></div>
    <div class="h-80 bg-[#efefef] rounded-xl animate-pulse"></div>
    <div class="h-80 bg-[#efefef] rounded-xl animate-pulse"></div>
  </div>
</div>
```

#### Estado: Loja em Manutenção
```html
<div class="min-h-screen bg-[#efefef] flex items-center justify-center p-4">
  <div class="text-center max-w-md">
    <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-[#3e5653]/10 flex items-center justify-center">
      <svg class="w-12 h-12 text-[#3e5653]"><!-- wrench icon --></svg>
    </div>
    <h1 class="text-2xl font-bold text-[#1f2937] mb-2">Em Manutenção</h1>
    <p class="text-[#627271] mb-6">
      Estamos trabalhando para melhorar sua experiência. Volte em breve!
    </p>
    <a href="https://wa.me/5500000000000" 
       class="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white 
              rounded-lg font-medium hover:bg-[#128C7E] transition-colors">
      <svg class="w-5 h-5"><!-- whatsapp icon --></svg>
      Falar no WhatsApp
    </a>
  </div>
</div>
```

### 5.5 Interações

| Elemento | Interação | Comportamento |
|----------|-----------|---------------|
| Logo | Click | Volta para página inicial |
| Produto | Click | Navega para página do produto |
| Categoria | Click | Filtra produtos por categoria |
| Carrinho | Click | Abre drawer do carrinho |
| Busca | Submit | Filtra produtos por termo |
| Scroll | Page | Header ganha sombra ao scrollar |

---

## 6. Tela 4: Página do Produto (Pública)

**ID da Tela:** TELA-LOJ-004  
**Tipo:** PÚBLICA (Loja Virtual)  
**URL:** `[empresa].uniq.store/produto/{slug}`  
**Permissão:** Público  

### 6.1 Propósito
Página de detalhes do produto com galeria de imagens, informações completas e call-to-action para compra via WhatsApp.

### 6.2 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]                    Início  Produtos  Sobre  Contato    [🔍] [🛒(2)]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Breadcrumb: Início > Produtos > Categoria > Nome do Produto                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌──────────────────────┐  ┌─────────────────────────────────────┐ │   │
│  │  │                      │  │ Nome Completo do Produto            │ │   │
│  │  │   [IMAGEM            │  │                                     │ │   │
│  │  │    PRINCIPAL]        │  │ Categoria: Nome da Categoria        │ │   │
│  │  │                      │  │                                     │ │   │
│  │  │                      │  │ ⭐⭐⭐⭐⭐ (4.8) 128 avaliações      │ │   │
│  │  │                      │  │                                     │ │   │
│  │  ├──────────────────────┤  │ De: R$ 129,90                       │ │   │
│  │  │ [img1] [img2] [img3] │  │ Por: R$ 99,90                       │ │   │
│  │  │ [img4] [img5]        │  │ ou 3x de R$ 33,30                   │ │   │
│  │  └──────────────────────┘  │                                     │ │   │
│  │                            │ [DESCRIÇÃO DETALHADA DO PRODUTO...] │ │   │
│  │                            │                                     │ │   │
│  │                            │ 📦 Estoque: 15 unidades             │ │   │
│  │                            │ 🚚 Entrega: Consultar               │ │   │
│  │                            │                                     │ │   │
│  │                            │ Quantidade: [-] [ 1 ] [+]           │ │   │
│  │                            │                                     │ │   │
│  │                            │ ┌─────────────────────────────────┐ │ │   │
│  │                            │ │  [📱 COMPRAR PELO WHATSAPP]     │ │ │   │
│  │                            │ └─────────────────────────────────┘ │ │   │
│  │                            │                                     │ │   │
│  │                            │ [♡] Adicionar aos favoritos         │ │   │
│  │                            │                                     │ │   │
│  │                            │ Compartilhar: [📎] [FB] [IG] [WA]   │ │   │
│  │                            └─────────────────────────────────────┘ │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  DESCRIÇÃO COMPLETA                                                 │   │
│  │                                                                     │   │
│  │  [Tabs: Descrição | Especificações | Avaliações]                    │   │
│  │                                                                     │   │
│  │  Conteúudo detalhado do produto com formatação rica...              │   │
│  │                                                                     │   │
│  │  Características:                                                   │   │
│  │  • Item 1                                                           │   │
│  │  • Item 2                                                           │   │
│  │  • Item 3                                                           │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  PRODUTOS RELACIONADOS                                              │   │
│  │                                                                     │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │   │
│  │  │ [IMG]    │ │ [IMG]    │ │ [IMG]    │ │ [IMG]    │               │   │
│  │  │ Produto  │ │ Produto  │ │ Produto  │ │ Produto  │               │   │
│  │  │ R$ 89,90 │ │ R$119,90 │ │ R$ 79,90 │ │ R$149,90 │               │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Especificações de Design

#### Galeria de Imagens
```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <!-- Gallery -->
  <div class="space-y-4">
    <!-- Main Image -->
    <div class="aspect-square bg-[#efefef] rounded-2xl overflow-hidden relative group">
      <img src="/produto-1.jpg" alt="Produto" 
           class="w-full h-full object-cover" id="main-image" />
      
      <!-- Zoom hint -->
      <div class="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 text-white text-sm 
                  rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        Passe o mouse para zoom
      </div>
      
      <!-- Navigation arrows -->
      <button class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full 
                     bg-white/90 flex items-center justify-center shadow-lg
                     opacity-0 group-hover:opacity-100 transition-opacity">
        <svg class="w-5 h-5"><!-- chevron-left icon --></svg>
      </button>
      <button class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full 
                     bg-white/90 flex items-center justify-center shadow-lg
                     opacity-0 group-hover:opacity-100 transition-opacity">
        <svg class="w-5 h-5"><!-- chevron-right icon --></svg>
      </button>
    </div>
    
    <!-- Thumbnails -->
    <div class="flex gap-3 overflow-x-auto pb-2">
      <button class="w-20 h-20 rounded-lg border-2 border-[#3e5653] overflow-hidden flex-shrink-0">
        <img src="/produto-1.jpg" class="w-full h-full object-cover" />
      </button>
      <button class="w-20 h-20 rounded-lg border-2 border-transparent hover:border-[#e5e7eb] 
                     overflow-hidden flex-shrink-0">
        <img src="/produto-2.jpg" class="w-full h-full object-cover" />
      </button>
      <button class="w-20 h-20 rounded-lg border-2 border-transparent hover:border-[#e5e7eb] 
                     overflow-hidden flex-shrink-0">
        <img src="/produto-3.jpg" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
  
  <!-- Product Info -->
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <nav class="text-sm text-[#627271]">
      <a href="/" class="hover:text-[#3e5653]">Início</a>
      <span class="mx-2">/</span>
      <a href="/produtos" class="hover:text-[#3e5653]">Produtos</a>
      <span class="mx-2">/</span>
      <span class="text-[#1f2937]">Nome do Produto</span>
    </nav>
    
    <!-- Title -->
    <div>
      <span class="text-sm text-[#627271]">Categoria</span>
      <h1 class="text-3xl font-bold text-[#1f2937] mt-1">Nome Completo do Produto</h1>
    </div>
    
    <!-- Rating -->
    <div class="flex items-center gap-2">
      <div class="flex text-yellow-400">
        <svg class="w-5 h-5 fill-current"><!-- star icon --></svg>
        <svg class="w-5 h-5 fill-current"><!-- star icon --></svg>
        <svg class="w-5 h-5 fill-current"><!-- star icon --></svg>
        <svg class="w-5 h-5 fill-current"><!-- star icon --></svg>
        <svg class="w-5 h-5 fill-current text-[#e5e7eb]"><!-- star icon --></svg>
      </div>
      <span class="text-sm text-[#627271]">4.8 (128 avaliações)</span>
    </div>
    
    <!-- Price -->
    <div class="space-y-1">
      <p class="text-sm text-[#627271] line-through">De: R$ 129,90</p>
      <div class="flex items-baseline gap-2">
        <span class="text-4xl font-bold text-[#3e5653]">R$ 99,90</span>
        <span class="text-[#86cb92] font-medium">20% OFF</span>
      </div>
      <p class="text-sm text-[#627271]">ou 3x de R$ 33,30 sem juros</p>
    </div>
    
    <!-- Description -->
    <p class="text-[#627271] leading-relaxed">
      Descrição resumida do produto destacando seus principais benefícios e características.
    </p>
    
    <!-- Info badges -->
    <div class="flex flex-wrap gap-4 text-sm">
      <span class="flex items-center gap-1.5 text-[#627271]">
        <svg class="w-4 h-4 text-[#86cb92]"><!-- package icon --></svg>
        Estoque: <strong class="text-[#1f2937]">15 unidades</strong>
      </span>
      <span class="flex items-center gap-1.5 text-[#627271]">
        <svg class="w-4 h-4 text-[#86cb92]"><!-- truck icon --></svg>
        Entrega: Consulte
      </span>
    </div>
    
    <!-- Quantity -->
    <div class="flex items-center gap-4">
      <span class="text-sm font-medium text-[#1f2937]">Quantidade:</span>
      <div class="flex items-center border border-[#e5e7eb] rounded-lg">
        <button class="w-10 h-10 flex items-center justify-center text-[#627271] 
                       hover:bg-[#efefef] transition-colors rounded-l-lg">
          <svg class="w-4 h-4"><!-- minus icon --></svg>
        </button>
        <input type="number" value="1" min="1" max="15"
               class="w-14 h-10 text-center border-x border-[#e5e7eb] focus:outline-none" />
        <button class="w-10 h-10 flex items-center justify-center text-[#627271] 
                       hover:bg-[#efefef] transition-colors rounded-r-lg">
          <svg class="w-4 h-4"><!-- plus icon --></svg>
        </button>
      </div>
    </div>
    
    <!-- CTA Buttons -->
    <div class="space-y-3">
      <a href="https://wa.me/5500000000000?text=Olá! Gostaria de comprar o produto: Nome do Produto"
         target="_blank"
         class="w-full py-4 bg-[#25D366] text-white rounded-xl font-semibold text-lg
                flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-colors shadow-lg">
        <svg class="w-6 h-6"><!-- whatsapp icon --></svg>
        Comprar pelo WhatsApp
      </a>
      
      <button class="w-full py-3 border border-[#e5e7eb] text-[#1f2937] rounded-xl font-medium
                     flex items-center justify-center gap-2 hover:bg-[#efefef] transition-colors">
        <svg class="w-5 h-5"><!-- heart icon --></svg>
        Adicionar aos Favoritos
      </button>
    </div>
    
    <!-- Share -->
    <div class="flex items-center gap-3 pt-4 border-t border-[#e5e7eb]">
      <span class="text-sm text-[#627271]">Compartilhar:</span>
      <div class="flex gap-2">
        <button class="w-9 h-9 rounded-full bg-[#efefef] flex items-center justify-center
                       hover:bg-[#3e5653] hover:text-white transition-colors">
          <svg class="w-4 h-4"><!-- link icon --></svg>
        </button>
        <button class="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center">
          <svg class="w-4 h-4"><!-- facebook icon --></svg>
        </button>
        <button class="w-9 h-9 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] 
                       text-white flex items-center justify-center">
          <svg class="w-4 h-4"><!-- instagram icon --></svg>
        </button>
        <button class="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center">
          <svg class="w-4 h-4"><!-- whatsapp icon --></svg>
        </button>
      </div>
    </div>
  </div>
</div>
```

#### Tabs de Informações
```html
<div class="mt-12">
  <!-- Tab Headers -->
  <div class="border-b border-[#e5e7eb]">
    <nav class="flex gap-8">
      <button class="pb-4 text-[#3e5653] font-medium border-b-2 border-[#3e5653]">
        Descrição
      </button>
      <button class="pb-4 text-[#627271] hover:text-[#1f2937] transition-colors">
        Especificações
      </button>
      <button class="pb-4 text-[#627271] hover:text-[#1f2937] transition-colors">
        Avaliações (128)
      </button>
    </nav>
  </div>
  
  <!-- Tab Content -->
  <div class="py-8">
    <div class="prose max-w-none text-[#627271]">
      <p>Descrição completa e detalhada do produto...</p>
      <h3 class="text-[#1f2937] font-semibold mt-6 mb-3">Características:</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li>Característica 1 do produto</li>
        <li>Característica 2 do produto</li>
        <li>Característica 3 do produto</li>
      </ul>
    </div>
  </div>
</div>
```

### 6.4 Estados

#### Estado: Produto Indisponível
```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <!-- Gallery (grayscale) -->
  <div class="aspect-square bg-[#efefef] rounded-2xl overflow-hidden grayscale opacity-60">
    <img src="/produto.jpg" alt="Produto" class="w-full h-full object-cover" />
  </div>
  
  <!-- Info -->
  <div class="space-y-6">
    <div>
      <span class="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-3">
        Indisponível
      </span>
      <h1 class="text-3xl font-bold text-[#1f2937]">Nome do Produto</h1>
    </div>
    
    <p class="text-[#627271]">Este produto está temporariamente indisponível.</p>
    
    <!-- Notify form -->
    <div class="bg-[#efefef] rounded-xl p-6">
      <h3 class="font-semibold text-[#1f2937] mb-2">Avise-me quando chegar</h3>
      <p class="text-sm text-[#627271] mb-4">Informe seu WhatsApp para receber notificação.</p>
      <div class="flex gap-2">
        <input type="tel" placeholder="(00) 00000-0000"
               class="flex-1 px-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
        <button class="px-6 py-3 bg-[#3e5653] text-white rounded-lg font-medium
                       hover:bg-[#2d403d] transition-colors">
          Notificar
        </button>
      </div>
    </div>
  </div>
</div>
```

#### Estado: Produto Não Encontrado
```html
<div class="min-h-[60vh] flex items-center justify-center">
  <div class="text-center">
    <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-[#efefef] flex items-center justify-center">
      <svg class="w-12 h-12 text-[#627271]"><!-- package-x icon --></svg>
    </div>
    <h1 class="text-2xl font-bold text-[#1f2937] mb-2">Produto não encontrado</h1>
    <p class="text-[#627271] mb-6">O produto que você procura não existe ou foi removido.</p>
    <a href="/produtos" 
       class="px-6 py-3 bg-[#3e5653] text-white rounded-lg font-medium
              hover:bg-[#2d403d] transition-colors inline-flex items-center gap-2">
      <svg class="w-5 h-5"><!-- arrow-left icon --></svg>
      Ver todos os produtos
    </a>
  </div>
</div>
```

---

## 7. Tela 5: Checkout / Carrinho (Pública)

**ID da Tela:** TELA-LOJ-005  
**Tipo:** PÚBLICA (Loja Virtual)  
**URL:** `[empresa].uniq.store/carrinho`  
**Permissão:** Público  

### 7.1 Propósito
Página de carrinho e checkout onde o cliente revisa os itens e finaliza o pedido via WhatsApp.

### 7.2 Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]                    Início  Produtos  Sobre  Contato    [🔍] [🛒(2)]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  SEU CARRINHO (2 itens)                                             │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  [IMG]  Nome do Produto 1                          R$ 99,90 │   │   │
│  │  │         Categoria                               [🗑️]        │   │   │
│  │  │         Quantidade: [-] [ 2 ] [+]               R$ 199,80   │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  [IMG]  Nome do Produto 2                          R$ 149,90│   │   │
│  │  │         Categoria                               [🗑️]        │   │   │
│  │  │         Quantidade: [-] [ 1 ] [+]               R$ 149,90   │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  [Limpar carrinho]                                          Continuar │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │  DADOS PARA ENTREGA             │  │  RESUMO DO PEDIDO               │  │
│  │                                 │  │                                 │  │
│  │  Nome completo *                │  │  Subtotal:           R$ 349,70  │  │
│  │  [____________________]         │  │  Frete:              A calcular │  │
│  │                                 │  │  ─────────────────────────────  │  │
│  │  WhatsApp *                     │  │  Total:              R$ 349,70  │  │
│  │  [(__) _____-____]              │  │                                 │  │
│  │                                 │  │  [📱 FINALIZAR PELO WHATSAPP]   │  │
│  │  CEP *                          │  │                                 │  │
│  │  [_____-___] [🔍 Buscar]        │  │  Ao clicar, você será           │  │
│  │                                 │  │  redirecionado para o WhatsApp  │  │
│  │  Endereço                       │  │  para confirmar seu pedido.     │  │
│  │  [____________________]         │  │                                 │  │
│  │                                 │  │                                 │  │
│  │  Número *    Complemento        │  │                                 │  │
│  │  [____]      [____________]     │  │                                 │  │
│  │                                 │  │                                 │  │
│  │  Bairro        Cidade - UF      │  │                                 │  │
│  │  [__________]  [__________]     │  │                                 │  │
│  │                                 │  │                                 │  │
│  │  Observações                    │  │                                 │  │
│  │  [                        ]     │  │                                 │  │
│  │  [                        ]     │  │                                 │  │
│  │                                 │  │                                 │  │
│  └─────────────────────────────────┘  └─────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Especificações de Design

#### Lista de Itens do Carrinho
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
  <div class="p-6 border-b border-[#e5e7eb]">
    <h2 class="text-xl font-bold text-[#1f2937]">Seu Carrinho (2 itens)</h2>
  </div>
  
  <!-- Items -->
  <div class="divide-y divide-[#e5e7eb]">
    <!-- Item -->
    <div class="p-6 flex gap-4">
      <img src="/produto.jpg" alt="Produto" 
           class="w-24 h-24 rounded-lg object-cover bg-[#efefef]" />
      
      <div class="flex-1">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="font-semibold text-[#1f2937]">Nome do Produto</h3>
            <p class="text-sm text-[#627271]">Categoria</p>
          </div>
          <button class="text-[#627271] hover:text-red-500 transition-colors p-1">
            <svg class="w-5 h-5"><!-- trash icon --></svg>
          </button>
        </div>
        
        <div class="flex items-center justify-between mt-4">
          <!-- Quantity -->
          <div class="flex items-center border border-[#e5e7eb] rounded-lg">
            <button class="w-8 h-8 flex items-center justify-center text-[#627271] 
                           hover:bg-[#efefef] transition-colors rounded-l-lg">
              <svg class="w-4 h-4"><!-- minus icon --></svg>
            </button>
            <input type="number" value="2" min="1" 
                   class="w-12 h-8 text-center border-x border-[#e5e7eb] focus:outline-none" />
            <button class="w-8 h-8 flex items-center justify-center text-[#627271] 
                           hover:bg-[#efefef] transition-colors rounded-r-lg">
              <svg class="w-4 h-4"><!-- plus icon --></svg>
            </button>
          </div>
          
          <!-- Price -->
          <div class="text-right">
            <p class="text-sm text-[#627271]">R$ 99,90 cada</p>
            <p class="text-lg font-bold text-[#3e5653]">R$ 199,80</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Another item... -->
  </div>
  
  <!-- Footer -->
  <div class="p-6 bg-[#efefef] flex items-center justify-between">
    <button class="text-[#627271] hover:text-red-500 text-sm flex items-center gap-1
                   transition-colors">
      <svg class="w-4 h-4"><!-- trash icon --></svg>
      Limpar carrinho
    </button>
    <a href="/produtos" 
       class="text-[#3e5653] hover:underline text-sm flex items-center gap-1">
      Continuar comprando
      <svg class="w-4 h-4"><!-- arrow-right icon --></svg>
    </a>
  </div>
</div>
```

#### Formulário de Entrega
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6">
  <h2 class="text-xl font-bold text-[#1f2937] mb-6">Dados para Entrega</h2>
  
  <form class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        Nome completo <span class="text-red-500">*</span>
      </label>
      <input type="text" required
             class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        WhatsApp <span class="text-red-500">*</span>
      </label>
      <input type="tel" required placeholder="(00) 00000-0000"
             class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
      <p class="text-xs text-[#627271] mt-1">Usaremos para confirmar seu pedido</p>
    </div>
    
    <!-- CEP -->
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        CEP <span class="text-red-500">*</span>
      </label>
      <div class="flex gap-2">
        <input type="text" required placeholder="00000-000"
               class="flex-1 px-4 py-3 border border-[#e5e7eb] rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
        <button type="button" 
                class="px-4 py-3 border border-[#e5e7eb] rounded-lg text-[#627271]
                       hover:bg-[#efefef] transition-colors flex items-center gap-2">
          <svg class="w-4 h-4"><!-- search icon --></svg>
          Buscar
        </button>
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">Endereço</label>
      <input type="text" readonly
             class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg bg-[#efefef]" />
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Número <span class="text-red-500">*</span>
        </label>
        <input type="text" required
               class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
      </div>
      <div>
        <label class="block text-sm font-medium text-[#627271] mb-1">Complemento</label>
        <input type="text" placeholder="Apto, bloco..."
               class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-[#627271] mb-1">Bairro</label>
        <input type="text" readonly
               class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg bg-[#efefef]" />
      </div>
      <div>
        <label class="block text-sm font-medium text-[#627271] mb-1">Cidade - UF</label>
        <input type="text" readonly
               class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg bg-[#efefef]" />
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-[#627271] mb-1">Observações</label>
      <textarea rows="2" placeholder="Instruções de entrega, referências..."
                class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-[#3e5653] resize-none"></textarea>
    </div>
  </form>
</div>
```

#### Resumo do Pedido
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6 sticky top-24">
  <h2 class="text-xl font-bold text-[#1f2937] mb-6">Resumo do Pedido</h2>
  
  <!-- Items summary -->
  <div class="space-y-3 mb-6">
    <div class="flex justify-between text-sm">
      <span class="text-[#627271]">Subtotal (2 itens)</span>
      <span class="text-[#1f2937]">R$ 349,70</span>
    </div>
    <div class="flex justify-between text-sm">
      <span class="text-[#627271]">Frete</span>
      <span class="text-[#86cb92] font-medium">A calcular</span>
    </div>
    <div class="flex justify-between text-sm">
      <span class="text-[#627271]">Desconto</span>
      <span class="text-[#86cb92]">- R$ 0,00</span>
    </div>
  </div>
  
  <!-- Total -->
  <div class="border-t border-[#e5e7eb] pt-4 mb-6">
    <div class="flex justify-between items-baseline">
      <span class="text-lg font-semibold text-[#1f2937]">Total</span>
      <span class="text-3xl font-bold text-[#3e5653]">R$ 349,70</span>
    </div>
    <p class="text-xs text-[#627271] mt-1">em até 3x de R$ 116,57 sem juros</p>
  </div>
  
  <!-- CTA -->
  <a href="https://wa.me/5500000000000?text=PEDIDO:%0ANome:%20...%0AItens:%20..."
     target="_blank"
     class="w-full py-4 bg-[#25D366] text-white rounded-xl font-semibold text-lg
            flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-colors">
    <svg class="w-6 h-6"><!-- whatsapp icon --></svg>
    Finalizar pelo WhatsApp
  </a>
  
  <p class="text-xs text-[#627271] text-center mt-4">
    Ao clicar, você será redirecionado para o WhatsApp para confirmar seu pedido diretamente com o vendedor.
  </p>
  
  <!-- Security badges -->
  <div class="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-[#e5e7eb]">
    <div class="flex items-center gap-1.5 text-xs text-[#627271]">
      <svg class="w-4 h-4 text-[#86cb92]"><!-- shield-check icon --></svg>
      Compra segura
    </div>
    <div class="flex items-center gap-1.5 text-xs text-[#627271]">
      <svg class="w-4 h-4 text-[#86cb92]"><!-- lock icon --></svg>
      Dados protegidos
    </div>
  </div>
</div>
```

### 7.4 Estados

#### Estado: Carrinho Vazio
```html
<div class="min-h-[60vh] flex items-center justify-center">
  <div class="text-center">
    <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-[#efefef] flex items-center justify-center">
      <svg class="w-12 h-12 text-[#627271]"><!-- shopping-cart icon --></svg>
    </div>
    <h1 class="text-2xl font-bold text-[#1f2937] mb-2">Seu carrinho está vazio</h1>
    <p class="text-[#627271] mb-6">Explore nossos produtos e encontre o que você precisa.</p>
    <a href="/produtos" 
       class="px-6 py-3 bg-[#3e5653] text-white rounded-lg font-medium
              hover:bg-[#2d403d] transition-colors inline-flex items-center gap-2">
      <svg class="w-5 h-5"><!-- shopping-bag icon --></svg>
      Ver produtos
    </a>
  </div>
</div>
```

#### Estado: Item Removido (Toast)
```html
<div class="fixed bottom-6 right-6 bg-[#1f2937] text-white px-4 py-3 rounded-lg shadow-lg
            flex items-center gap-3 animate-in slide-in-from-bottom">
  <svg class="w-5 h-5 text-[#86cb92]"><!-- check icon --></svg>
  <span class="text-sm">Item removido do carrinho</span>
  <button class="text-[#86cb92] hover:underline text-sm font-medium ml-2">
    Desfazer
  </button>
</div>
```

---

## 8. Tela 6: Páginas Institucionais (Pública)

**ID da Tela:** TELA-LOJ-006  
**Tipo:** PÚBLICA (Loja Virtual)  
**URL:** `[empresa].uniq.store/sobre`, `/contato`, `/politica-privacidade`  
**Permissão:** Público  

### 8.1 Propósito
Páginas institucionais para informações sobre a empresa, contato e políticas.

### 8.2 Layout - Página Sobre

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]                    Início  Produtos  Sobre  Contato    [🔍] [🛒(2)]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ╔═══════════════════════════════════════════════════════════════════════╗ │
│  ║  SOBRE NÓS                                                            ║ │
│  ║  Conheça nossa história e valores                                     ║ │
│  ╚═══════════════════════════════════════════════════════════════════════╝ │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  ┌────────────────────┐  ┌──────────────────────────────────────┐  │   │
│  │  │                    │  │  NOSSA HISTÓRIA                      │  │   │
│  │  │   [FOTO DA         │  │                                      │  │   │
│  │  │    EMPRESA]        │  │  Texto sobre como a empresa começou, │  │   │
│  │  │                    │  │  sua trajetória e conquistas...      │  │   │
│  │  │                    │  │                                      │  │   │
│  │  │                    │  │  [Saiba mais sobre nossos produtos]  │  │   │
│  │  └────────────────────┘  └──────────────────────────────────────┘  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  NOSSOS VALORES                                                     │   │
│  │                                                                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │    💎    │  │    🤝    │  │    ⚡    │  │    ❤️    │            │   │
│  │  │ Qualidade│  │ Confiança│  │ Agilidade│  │ Paixão   │            │   │
│  │  │          │  │          │  │          │  │          │            │   │
│  │  │ Texto... │  │ Texto... │  │ Texto... │  │ Texto... │            │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  EQUIPE                                                             │   │
│  │                                                                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                          │   │
│  │  │ [FOTO]   │  │ [FOTO]   │  │ [FOTO]   │                          │   │
│  │  │          │  │          │  │          │                          │   │
│  │  │ Nome     │  │ Nome     │  │ Nome     │                          │   │
│  │  │ Cargo    │  │ Cargo    │  │ Cargo    │                          │   │
│  │  └──────────┘  └──────────┘  └──────────┘                          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.3 Layout - Página Contato

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO]                    Início  Produtos  Sobre  Contato    [🔍] [🛒(2)]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ╔═══════════════════════════════════════════════════════════════════════╗ │
│  ║  FALE CONOSCO                                                         ║ │
│  ║  Estamos aqui para ajudar                                             ║ │
│  ╚═══════════════════════════════════════════════════════════════════════╝ │
│                                                                             │
│  ┌─────────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │  INFORMAÇÕES DE CONTATO         │  │  ENVIE UMA MENSAGEM             │  │
│  │                                 │  │                                 │  │
│  │  📍 Endereço                    │  │  Nome *                         │  │
│  │  Rua Exemplo, 123               │  │  [____________________]         │  │
│  │  Bairro - Cidade/UF             │  │                                 │  │
│  │  CEP: 00000-000                 │  │  Email *                        │  │
│  │                                 │  │  [____________________]         │  │
│  │  📱 WhatsApp                    │  │                                 │  │
│  │  (00) 00000-0000                │  │  Telefone                       │  │
│  │                                 │  │  [(__) _____-____]              │  │
│  │  📧 Email                       │  │                                 │  │
│  │  contato@empresa.com            │  │  Assunto *                      │  │
│  │                                 │  │  [Selecione ▼]                  │  │
│  │  ⏰ Horário de Atendimento      │  │                                 │  │
│  │  Seg - Sex: 9h às 18h           │  │  Mensagem *                     │  │
│  │  Sáb: 9h às 13h                 │  │  [                        ]     │  │
│  │                                 │  │  [                        ]     │  │
│  │  [📱 Conversar no WhatsApp]     │  │                                 │  │
│  │                                 │  │              [Enviar Mensagem]  │  │
│  │  🗺️ [MAPA DO GOOGLE MAPS]       │  │                                 │  │
│  │                                 │  │                                 │  │
│  └─────────────────────────────────┘  └─────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.4 Especificações de Design

#### Página Contato
```html
<!-- Hero Section -->
<section class="bg-[#3e5653] text-white py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl font-bold mb-4">Fale Conosco</h1>
    <p class="text-xl text-white/80">Estamos aqui para ajudar você</p>
  </div>
</section>

<!-- Contact Content -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Contact Info -->
      <div class="space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-[#1f2937] mb-6">Informações de Contato</h2>
          
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-[#86cb92]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-[#86cb92]"><!-- map-pin icon --></svg>
              </div>
              <div>
                <h3 class="font-semibold text-[#1f2937]">Endereço</h3>
                <p class="text-[#627271]">Rua Exemplo, 123<br/>Bairro - Cidade/UF<br/>CEP: 00000-000</p>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-[#86cb92]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-[#86cb92]"><!-- phone icon --></svg>
              </div>
              <div>
                <h3 class="font-semibold text-[#1f2937]">WhatsApp</h3>
                <a href="https://wa.me/5500000000000" class="text-[#3e5653] hover:underline">
                  (00) 00000-0000
                </a>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-[#86cb92]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-[#86cb92]"><!-- mail icon --></svg>
              </div>
              <div>
                <h3 class="font-semibold text-[#1f2937]">Email</h3>
                <a href="mailto:contato@empresa.com" class="text-[#3e5653] hover:underline">
                  contato@empresa.com
                </a>
              </div>
            </div>
            
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-[#86cb92]/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-[#86cb92]"><!-- clock icon --></svg>
              </div>
              <div>
                <h3 class="font-semibold text-[#1f2937]">Horário de Atendimento</h3>
                <p class="text-[#627271]">Segunda a Sexta: 9h às 18h<br/>Sábado: 9h às 13h</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- WhatsApp CTA -->
        <a href="https://wa.me/5500000000000" target="_blank"
           class="inline-flex items-center gap-3 px-6 py-4 bg-[#25D366] text-white rounded-xl
                  font-semibold hover:bg-[#128C7E] transition-colors">
          <svg class="w-6 h-6"><!-- whatsapp icon --></svg>
          Conversar no WhatsApp
        </a>
        
        <!-- Map -->
        <div class="aspect-video bg-[#efefef] rounded-xl overflow-hidden">
          <iframe src="https://maps.google.com/maps?q=...&output=embed"
                  class="w-full h-full border-0"></iframe>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="bg-white rounded-xl border border-[#e5e7eb] p-8">
        <h2 class="text-2xl font-bold text-[#1f2937] mb-6">Envie uma Mensagem</h2>
        
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#1f2937] mb-1">Nome *</label>
            <input type="text" required
                   class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#1f2937] mb-1">Email *</label>
            <input type="email" required
                   class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#627271] mb-1">Telefone</label>
            <input type="tel"
                   class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-[#3e5653]" />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#1f2937] mb-1">Assunto *</label>
            <select required
                    class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg bg-white
                           focus:outline-none focus:ring-2 focus:ring-[#3e5653]">
              <option value="">Selecione um assunto</option>
              <option value="duvida">Dúvida sobre produto</option>
              <option value="pedido">Status do pedido</option>
              <option value="sugestao">Sugestão</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-[#1f2937] mb-1">Mensagem *</label>
            <textarea rows="4" required
                      class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-[#3e5653] resize-none"></textarea>
          </div>
          
          <button type="submit" 
                  class="w-full py-4 bg-[#3e5653] text-white rounded-lg font-semibold
                         hover:bg-[#2d403d] transition-colors">
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
```

---

## 9. Regras de Negócio (RN-LOJ)

| ID | Regra | Descrição | Tipo |
|----|-------|-----------|------|
| **RN-LOJ-001** | Domínio Único | Cada empresa recebe um subdomínio único no formato `[empresa].uniq.store`. O slug deve ser único em toda a plataforma. | Obrigatória |
| **RN-LOJ-002** | Preview em Tempo Real | Alterações no tema são refletidas instantaneamente no preview, mas só vão para produção após salvar. | Obrigatória |
| **RN-LOJ-003** | Modo Manutenção | Quando ativado, a loja pública exibe página de manutenção e bloqueia navegação. | Obrigatória |
| **RN-LOJ-004** | Produtos Ativos | Apenas produtos com status "ativo" e estoque > 0 aparecem na loja pública. | Obrigatória |
| **RN-LOJ-005** | Máximo de Destaques | Limite de 4 produtos destacados na página inicial. | Obrigatória |
| **RN-LOJ-006** | Checkout via WhatsApp | O checkout gera mensagem formatada para WhatsApp com todos os dados do pedido. | Obrigatória |
| **RN-LOJ-007** | Carrinho Persistente | Carrinho é mantido no localStorage por 7 dias. | Obrigatória |
| **RN-LOJ-008** | Notificação de Visita | Cada visita na loja registra evento no MEL (Módulo de Eventos e Logs). | Obrigatória |
| **RN-LOJ-009** | Notificação de Produto | Visualização de produto dispara evento "product_view" no MEL. | Obrigatória |
| **RN-LOJ-010** | Slug Automático | Slug do produto é gerado automaticamente a partir do nome (sanitizado). | Obrigatória |
| **RN-LOJ-011** | SEO Automático | Meta tags (title, description, OG) são geradas automaticamente a partir dos dados da loja/produto. | Obrigatória |
| **RN-LOJ-012** | Responsividade | Todas as páginas públicas devem ser 100% responsivas (mobile-first). | Obrigatória |
| **RN-LOJ-013** | Cache de Imagens | Imagens da loja são servidas via CDN com cache de 30 dias. | Obrigatória |
| **RN-LOJ-014** | HTTPS Obrigatório | Todas as lojas são servidas exclusivamente via HTTPS. | Obrigatória |
| **RN-LOJ-015** | Limite de Produtos | MVP: máximo de 100 produtos ativos por loja. | Obrigatória |

---

## 10. Checklist de Implementação

### 10.1 Telas Administrativas

- [ ] TELA-LOJ-001: Configuração da Loja
  - [ ] Upload de logo com preview
  - [ ] Seletores de cor com preview em tempo real
  - [ ] Configuração de fontes
  - [ ] Validação de domínio
  - [ ] Preview ao vivo (desktop/tablet/mobile)
  - [ ] Estados loading/error/empty
  - [ ] Validação de formulário
  
- [ ] TELA-LOJ-002: Gerenciamento de Produtos na Loja
  - [ ] Grid de produtos com thumbnails
  - [ ] Toggle de visibilidade
  - [ ] Badge de destaque
  - [ ] Drag & drop para ordenação
  - [ ] Modal de adicionar produtos do estoque
  - [ ] Estados loading/error/empty
  - [ ] Filtros e busca

### 10.2 Telas Públicas

- [ ] TELA-LOJ-003: Página Inicial da Loja
  - [ ] Header sticky com navegação
  - [ ] Hero banner configurável
  - [ ] Filtro de categorias
  - [ ] Grid de produtos com lazy loading
  - [ ] Produtos relacionados
  - [ ] Footer com informações da empresa
  - [ ] SEO completo (meta tags, OG)
  - [ ] Integração com MEL (visitas)
  
- [ ] TELA-LOJ-004: Página do Produto
  - [ ] Galeria de imagens com zoom
  - [ ] Thumbnails clicáveis
  - [ ] Informações do produto
  - [ ] Badge de destaque
  - [ ] Quantidade configurável
  - [ ] CTA WhatsApp
  - [ ] Compartilhamento social
  - [ ] Produtos relacionados
  - [ ] Integração com MEL (product_view)
  
- [ ] TELA-LOJ-005: Carrinho/Checkout
  - [ ] Lista de itens com quantidade
  - [ ] Remover item (com undo)
  - [ ] Formulário de entrega
  - [ ] Busca de CEP
  - [ ] Cálculo de frete (placeholder)
  - [ ] Resumo do pedido
  - [ ] Geração de link WhatsApp
  - [ ] Persistência no localStorage
  
- [ ] TELA-LOJ-006: Páginas Institucionais
  - [ ] Página Sobre
  - [ ] Página Contato (com formulário)
  - [ ] Página Política de Privacidade
  - [ ] Mapa do Google Maps
  - [ ] Integração WhatsApp

### 10.3 Integrações

- [ ] Integração com Módulo Estoque (MOD-04)
  - [ ] Listagem de produtos disponíveis
  - [ ] Validação de estoque
  - [ ] Sincronização de status
  
- [ ] Integração com Módulo MEL (MOD-08)
  - [ ] Registro de visitas na loja
  - [ ] Registro de visualizações de produto
  - [ ] Registro de eventos de checkout
  
- [ ] Integração WhatsApp Business
  - [ ] Geração de mensagem formatada
  - [ ] Link direto com dados do pedido
  - [ ] Número configurável por loja

### 10.4 Performance & SEO

- [ ] Otimização de imagens (WebP, lazy loading)
- [ ] Meta tags dinâmicas
- [ ] Sitemap XML
- [ ] Robots.txt
- [ ] Structured Data (JSON-LD)
- [ ] Core Web Vitals otimizados

### 10.5 Responsividade

- [ ] Mobile (320px+)
- [ ] Tablet (768px+)
- [ ] Desktop (1024px+)
- [ ] Large Desktop (1280px+)

### 10.6 Acessibilidade

- [ ] Navegação por teclado
- [ ] ARIA labels
- [ ] Contraste adequado
- [ ] Alt text em imagens
- [ ] Focus indicators

---

## 11. Anexos

### 11.1 Estrutura de URLs

```
# Admin (sistema interno)
/loja/configuracoes          → Configuração da loja
/loja/produtos               → Gerenciamento de produtos na loja

# Público (loja virtual)
/[empresa].uniq.store/                    → Página inicial
/[empresa].uniq.store/produtos            → Lista de produtos
/[empresa].uniq.store/produto/{slug}      → Página do produto
/[empresa].uniq.store/carrinho            → Carrinho/checkout
/[empresa].uniq.store/sobre               → Sobre a empresa
/[empresa].uniq.store/contato             → Contato
/[empresa].uniq.store/politica-privacidade → Política de privacidade
```

### 11.2 Exemplo de Mensagem WhatsApp

```
🛒 *NOVO PEDIDO - [NOME DA LOJA]*

*Cliente:*
Nome: João Silva
WhatsApp: (11) 98765-4321

*Itens:*
1x Produto A - R$ 99,90
2x Produto B - R$ 149,90 (R$ 299,80)

*Endereço de Entrega:*
Rua Exemplo, 123 - Apto 45
Bairro - São Paulo/SP
CEP: 01234-567

*Observações:*
Deixar na portaria

*Total do Pedido: R$ 399,70*

---
Pedido gerado em: 15/01/2024 14:30
```

---

## Histórico de Revisões

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0.0 | 2024-01-15 | Product Team | Versão inicial do módulo |

---

**Documento Controlado - UNIQ Empresas**  
*Este documento é confidencial e propriedade da UNIQ Systems.*
