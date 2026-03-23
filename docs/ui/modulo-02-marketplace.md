# Módulo 02: Marketplace (Meus Módulos)

## 📋 Metadados

| Atributo | Valor |
|----------|-------|
| **Código** | MKT |
| **Nome** | Marketplace |
| **Título** | Meus Módulos |
| **Descrição** | Loja de apps da plataforma UNIQ onde usuários exploram, instalam e gerenciam módulos à la carte |
| **URL Base** | `/marketplace` |
| **Permissão** | `module:marketplace:read` / `module:marketplace:install` |
| **Dependências** | `modulo-core-autenticacao`, `modulo-core-sidebar` |
| **Versão** | 1.0.0 |
| **Responsável** | Frontend Team |
| **Status** | ✅ Documentado |

---

## 🎨 Design System UNIQ - Modo Claro

### Paleta de Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-background` | `#efefef` (Platinum) | Fundo principal da área de conteúdo |
| `--color-card` | `#ffffff` (Branco) | Fundo de cards e containers |
| `--color-sidebar` | `#1f2937` (Jet Black) | Sidebar de navegação |
| `--color-primary` | `#3e5653` (Dark Slate Grey) | Botões primários, links |
| `--color-primary-hover` | `#1f2937` (Jet Black) | Hover de botões primários |
| `--color-accent` | `#86cb92` (Emerald) | Detalhes, badges de sucesso, preços |
| `--color-text-primary` | `#1f2937` (Jet Black) | Títulos, texto principal |
| `--color-text-secondary` | `#627271` (Dim Grey) | Subtítulos, descrições |
| `--color-border` | `#e5e7eb` (Gray-200) | Bordas, divisores |
| `--color-success` | `#86cb92` (Emerald) | Estados de sucesso, instalado |
| `--color-warning` | `#f59e0b` (Amber) | Alertas, badges de novo |
| `--color-danger` | `#ef4444` (Red) | Ações destrutivas, desinstalar |
| `--color-info` | `#3b82f6` (Blue) | Informações, badges |

### Tipografia

| Elemento | Configuração |
|----------|--------------|
| **Fonte Principal** | Poppins, sans-serif |
| **Título Página** | `text-2xl font-bold text-[#1f2937]` |
| **Subtítulo** | `text-sm text-[#627271]` |
| **Título Card** | `text-lg font-semibold text-[#1f2937]` |
| **Descrição** | `text-sm text-[#627271]` |
| **Preço** | `text-xl font-bold text-[#3e5653]` |
| **Preço Destaque** | `text-2xl font-bold text-[#86cb92]` |
| **Body** | `text-base text-[#1f2937]` |
| **Small** | `text-xs text-[#627271]` |

### Sistema de Grid

- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Grid Módulos**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **Gap Padrão**: `gap-4` (16px), `gap-6` (24px)
- **Padding Cards**: `p-6`
- **Border Radius**: `rounded-xl` (12px) para cards, `rounded-lg` (8px) para botões

### Efeitos e Estados

**Card Hover:**
```
transition-all duration-300 ease-out
hover:-translate-y-1 hover:shadow-lg hover:border-[#86cb92]
```

**Botão Primário:**
```
bg-[#3e5653] text-white
hover:bg-[#1f2937]
active:scale-[0.98]
transition-all duration-200
```

**Botão Secundário:**
```
bg-white border border-[#e5e7eb] text-[#1f2937]
hover:bg-[#f3f4f6] hover:border-[#d1d5db]
```

---

## 🖥️ Tela 1: Loja de Módulos (/marketplace)

### Layout da Página

```
┌─────────────────────────────────────────────────────────────────────┐
│ [SIDEBAR]                           [HEADER] Meus Módulos           │
│                                     Gerencie seus módulos...        │
│                                     [Todos][Meus][Recomendados]     │
├───────────┬─────────────────────────────────────────────────────────┤
│           │                                                         │
│           │  ┌─────────────────────────────────────────────────┐   │
│           │  │ [BANNER] Complete seu pacote!                   │   │
│           │  │ Adicione mais módulos por apenas R$ 69 cada     │   │
│           │  │                              [Ver Módulos]      │   │
│           │  └─────────────────────────────────────────────────┘   │
│           │                                                         │
│           │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│           │  │  [IC]   │ │  [IC]   │ │  [IC]   │ │  [IC]   │       │
│           │  │ CRM     │ │Financeiro│ │ Estoque │ │  Vendas │       │
│           │  │ Gerencie│ │ Controle │ │ Gestão  │ │ Vendas  │       │
│           │  │ clientes│ │financeiro│ │ produtos│ │ online  │       │
│           │  │ ✓ Cli...│ │ ✓ Lan... │ │ ✓ Esto..│ │ ✓ PDV   │       │
│           │  │         │ │         │ │         │ │         │       │
│           │  │ R$ 69   │ │ R$ 69   │ │ R$ 69   │ │ R$ 69   │       │
│           │  │[Instalar]│ │[Instalar]│ │[Instalar]│ │[Instalar]│       │
│           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│           │                                                         │
│           │  ┌─────────┐ ┌─────────┐ ┌─────────┐                   │
│           │  │  [IC]   │ │  [IC]   │ │  [IC]   │                   │
│           │  │  Loja   │ │Agendamen.│ │   MEL   │                   │
│           │  │ Virtual │ │         │ │    AI   │                   │
│           │  │         │ │         │ │         │                   │
│           │  └─────────┘ └─────────┘ └─────────┘                   │
│           │                                                         │
└───────────┴─────────────────────────────────────────────────────────┘
```

### Componentes

#### 1. Header da Página

**Container:**
```html
<div class="bg-white border-b border-[#e5e7eb] px-6 py-4">
  <div class="max-w-7xl mx-auto">
    <!-- Título e Subtítulo -->
    <!-- Tabs -->
  </div>
</div>
```

**Título e Subtítulo:**
```html
<div class="mb-4">
  <h1 class="text-2xl font-bold text-[#1f2937]">Meus Módulos</h1>
  <p class="text-sm text-[#627271] mt-1">
    Gerencie seus módulos e adicione novos para expandir sua gestão
  </p>
</div>
```

**Tabs de Navegação:**
```html
<div class="flex space-x-1 bg-[#f3f4f6] p-1 rounded-lg w-fit">
  <button class="px-4 py-2 text-sm font-medium rounded-md bg-white text-[#1f2937] shadow-sm transition-all">
    Todos os Módulos
  </button>
  <button class="px-4 py-2 text-sm font-medium rounded-md text-[#627271] hover:text-[#1f2937] transition-all">
    Meus Módulos
  </button>
  <button class="px-4 py-2 text-sm font-medium rounded-md text-[#627271] hover:text-[#1f2937] transition-all">
    Recomendados
    <span class="ml-1.5 px-1.5 py-0.5 text-xs bg-[#86cb92] text-white rounded-full">3</span>
  </button>
</div>
```

**Estados dos Tabs:**
- **Ativo:** `bg-white text-[#1f2937] shadow-sm`
- **Inativo:** `text-[#627271] hover:text-[#1f2937]`
- **Hover Inativo:** `bg-[#e5e7eb]/50`

---

#### 2. Banner Destaque (Opcional)

**Container:**
```html
<div class="bg-gradient-to-r from-[#3e5653] to-[#627271] rounded-xl p-6 mb-6 text-white">
  <div class="flex items-center justify-between">
    <!-- Conteúdo -->
  </div>
</div>
```

**Conteúdo:**
```html
<div class="flex-1">
  <div class="flex items-center gap-2 mb-2">
    <Sparkles class="w-5 h-5 text-[#86cb92]" />
    <span class="text-xs font-semibold uppercase tracking-wider text-[#86cb92]">Oferta Especial</span>
  </div>
  <h2 class="text-xl font-bold mb-1">Complete seu pacote!</h2>
  <p class="text-white/80 text-sm">Adicione mais módulos por apenas R$ 69 cada e otimize sua gestão</p>
</div>
<div class="flex items-center">
  <button class="bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#1f2937] font-semibold px-5 py-2.5 rounded-lg transition-all">
    Ver Módulos
  </button>
</div>
```

**Estados:**
- **Default:** Gradient visível, botão primário
- **Hover Botão:** `hover:bg-[#86cb92]/90`

---

#### 3. Grid de Módulos

**Container do Grid:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards de Módulos -->
</div>
```

---

#### 4. Card de Módulo

**Container:**
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-[#86cb92] cursor-pointer group">
  <!-- Header -->
  <!-- Conteúdo -->
  <!-- Footer -->
</div>
```

**Header do Card:**
```html
<div class="flex items-start justify-between mb-4">
  <div class="w-12 h-12 rounded-xl bg-[#86cb92]/10 flex items-center justify-center">
    <Users class="w-6 h-6 text-[#86cb92]" /> <!-- Ícone dinâmico -->
  </div>
  <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#86cb92]/10 text-[#86cb92]">
    Instalado
  </span>
</div>
```

**Badges de Status:**
| Status | Classes |
|--------|---------|
| **Instalado** | `bg-[#86cb92]/10 text-[#86cb92]` |
| **Novo** | `bg-blue-100 text-blue-700` |
| **Popular** | `bg-amber-100 text-amber-700` |
| **Sem badge** | Hidden |

**Conteúdo do Card:**
```html
<div class="mb-4">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-1 group-hover:text-[#3e5653] transition-colors">
    CRM
  </h3>
  <p class="text-sm text-[#627271] line-clamp-2">
    Gerencie clientes e vendas de forma inteligente
  </p>
</div>

<ul class="space-y-2 mb-5">
  <li class="flex items-center gap-2 text-sm text-[#627271]">
    <Check class="w-4 h-4 text-[#86cb92] flex-shrink-0" />
    <span>Clientes ilimitados</span>
  </li>
  <li class="flex items-center gap-2 text-sm text-[#627271]">
    <Check class="w-4 h-4 text-[#86cb92] flex-shrink-0" />
    <span>Pipeline de vendas</span>
  </li>
  <li class="flex items-center gap-2 text-sm text-[#627271]">
    <Check class="w-4 h-4 text-[#86cb92] flex-shrink-0" />
    <span>Relatórios avançados</span>
  </li>
</ul>
```

**Footer do Card:**
```html
<div class="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
  <div>
    <span class="text-xs text-[#627271]">A partir de</span>
    <div class="text-xl font-bold text-[#3e5653]">R$ 69<span class="text-sm font-normal text-[#627271]">/mês</span></div>
  </div>
  <button class="bg-[#3e5653] hover:bg-[#1f2937] text-white font-medium px-4 py-2 rounded-lg transition-all active:scale-[0.98]">
    Instalar
  </button>
</div>
```

**Variações do Botão:**
| Estado | Classes | Texto |
|--------|---------|-------|
| **Instalar** | `bg-[#3e5653] hover:bg-[#1f2937] text-white` | Instalar |
| **Instalado** | `bg-[#86cb92]/10 text-[#86cb92] cursor-default` | Instalado |
| **Configurar** | `bg-white border border-[#e5e7eb] text-[#1f2937] hover:bg-[#f3f4f6]` | Configurar |

**Módulos a Listar:**

| Módulo | Ícone | Descrição | Features |
|--------|-------|-----------|----------|
| **CRM** | `Users` | Gerencie clientes e vendas | Clientes ilimitados, Pipeline, Relatórios |
| **Financeiro** | `Wallet` | Controle financeiro completo | Fluxo de caixa, Conciliação, DRE |
| **Estoque** | `Package` | Gestão de produtos | Controle de estoque, Alertas, Código de barras |
| **Vendas & PDV** | `ShoppingCart` | Vendas online e presenciais | PDV offline, Vendas online, Cupom fiscal |
| **Loja Virtual** | `Store` | Sua loja online profissional | Site profissional, Checkout, Frete |
| **Agendamentos** | `Calendar` | Reservas de horários | Agenda online, Lembretes, Pagamento |
| **MEL** | `Sparkles` | Inteligência artificial proativa | Previsões, Insights, Automações |

---

#### 5. Card: Seu Pacote Atual

**Container (Sidebar/Topo):**
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6 lg:sticky lg:top-6">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-4">Seu Pacote Atual</h3>
  
  <!-- Lista de Módulos -->
  <div class="space-y-3 mb-4">
    <div class="flex items-center gap-3 p-2 rounded-lg bg-[#86cb92]/5">
      <Check class="w-4 h-4 text-[#86cb92]" />
      <span class="text-sm text-[#1f2937]">CRM</span>
    </div>
    <div class="flex items-center gap-3 p-2 rounded-lg bg-[#86cb92]/5">
      <Check class="w-4 h-4 text-[#86cb92]" />
      <span class="text-sm text-[#1f2937]">Financeiro</span>
    </div>
  </div>
  
  <!-- Total -->
  <div class="pt-4 border-t border-[#e5e7eb]">
    <div class="flex items-center justify-between mb-1">
      <span class="text-sm text-[#627271]">Total mensal</span>
      <span class="text-xl font-bold text-[#3e5653]">R$ 138</span>
    </div>
    <p class="text-xs text-[#627271]">Próxima cobrança: 15/02/2026</p>
  </div>
  
  <!-- CTA -->
  <button class="w-full mt-4 bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#1f2937] font-semibold py-2.5 rounded-lg transition-all">
    Adicionar Módulos
  </button>
</div>
```

---

#### 6. Modal de Detalhes do Módulo

**Overlay:**
```html
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    <!-- Modal Content -->
  </div>
</div>
```

**Header do Modal:**
```html
<div class="sticky top-0 bg-white border-b border-[#e5e7eb] px-6 py-4 flex items-center justify-between">
  <div class="flex items-center gap-4">
    <div class="w-14 h-14 rounded-xl bg-[#86cb92]/10 flex items-center justify-center">
      <Users class="w-7 h-7 text-[#86cb92]" />
    </div>
    <div>
      <h2 class="text-xl font-bold text-[#1f2937]">CRM</h2>
      <p class="text-sm text-[#627271]">Gerenciamento de clientes e vendas</p>
    </div>
  </div>
  <button class="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors">
    <X class="w-5 h-5 text-[#627271]" />
  </button>
</div>
```

**Corpo do Modal:**
```html
<div class="p-6">
  <!-- Descrição -->
  <p class="text-[#1f2937] mb-6 leading-relaxed">
    O módulo CRM da UNIQ é a solução completa para gerenciar seus clientes, 
    acompanhar oportunidades de negócio e aumentar suas vendas com inteligência.
  </p>
  
  <!-- Screenshots -->
  <div class="mb-6">
    <h3 class="text-sm font-semibold text-[#1f2937] mb-3">Visualização</h3>
    <div class="grid grid-cols-3 gap-3">
      <div class="aspect-video bg-[#f3f4f6] rounded-lg overflow-hidden">
        <img src="/screenshots/crm-1.png" alt="Dashboard CRM" class="w-full h-full object-cover" />
      </div>
      <!-- ... -->
    </div>
  </div>
  
  <!-- Funcionalidades -->
  <div class="mb-6">
    <h3 class="text-sm font-semibold text-[#1f2937] mb-3">Funcionalidades</h3>
    <div class="grid grid-cols-2 gap-3">
      <div class="flex items-center gap-2">
        <CheckCircle class="w-5 h-5 text-[#86cb92]" />
        <span class="text-sm text-[#627271]">Cadastro ilimitado de clientes</span>
      </div>
      <!-- ... -->
    </div>
  </div>
  
  <!-- Preço e CTA -->
  <div class="bg-[#f3f4f6] rounded-xl p-4 flex items-center justify-between">
    <div>
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-bold text-[#3e5653]">R$ 69</span>
        <span class="text-[#627271]">/mês</span>
      </div>
      <p class="text-sm text-[#86cb92] font-medium">Primeiro mês grátis!</p>
    </div>
    <button class="bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold px-6 py-3 rounded-xl transition-all active:scale-[0.98]">
      Instalar Agora
    </button>
  </div>
</div>
```

---

## 🖥️ Tela 2: Meus Módulos Instalados (/marketplace/meus-modulos)

### Layout da Página

```
┌─────────────────────────────────────────────────────────────────────┐
│ [SIDEBAR]                           [HEADER] Meus Módulos           │
│                                     [Todos][Meus][Recomendados]     │
├───────────┬─────────────────────────────────────────────────────────┤
│           │                                                         │
│           │  ┌─────────────────────────────────────────────────┐   │
│           │  │ [IC] CRM                                    Ativo│   │
│           │  │      Instalado em 10/01/2026                    │   │
│           │  │      Próxima cobrança: 10/02/2026               │   │
│           │  │                              [Abrir][Conf][Des]│   │
│           │  └─────────────────────────────────────────────────┘   │
│           │                                                         │
│           │  ┌─────────────────────────────────────────────────┐   │
│           │  │ [IC] Financeiro                             Ativo│   │
│           │  │      Instalado em 15/01/2026                    │   │
│           │  │      Próxima cobrança: 15/02/2026               │   │
│           │  │                              [Abrir][Conf][Des]│   │
│           │  └─────────────────────────────────────────────────┘   │
│           │                                                         │
└───────────┴─────────────────────────────────────────────────────────┘
```

### Componentes

#### 1. Card de Módulo Instalado (Lista)

**Container:**
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6 transition-all hover:shadow-md">
  <div class="flex items-center justify-between">
    <!-- Info -->
    <!-- Ações -->
  </div>
</div>
```

**Informações:**
```html
<div class="flex items-center gap-4">
  <div class="w-12 h-12 rounded-xl bg-[#86cb92]/10 flex items-center justify-center">
    <Users class="w-6 h-6 text-[#86cb92]" />
  </div>
  <div>
    <div class="flex items-center gap-2">
      <h3 class="text-lg font-semibold text-[#1f2937]">CRM</h3>
      <span class="px-2 py-0.5 text-xs font-semibold bg-[#86cb92]/10 text-[#86cb92] rounded-full">
        Ativo
      </span>
    </div>
    <div class="flex items-center gap-4 text-sm text-[#627271] mt-1">
      <span>Instalado em 10/01/2026</span>
      <span class="w-1 h-1 bg-[#627271] rounded-full"></span>
      <span>Próxima cobrança: 10/02/2026</span>
    </div>
  </div>
</div>
```

**Ações:**
```html
<div class="flex items-center gap-2">
  <button class="bg-[#3e5653] hover:bg-[#1f2937] text-white font-medium px-4 py-2 rounded-lg transition-all">
    Abrir Módulo
  </button>
  <button class="bg-white border border-[#e5e7eb] hover:bg-[#f3f4f6] text-[#1f2937] font-medium px-4 py-2 rounded-lg transition-all">
    Configurar
  </button>
  <button class="p-2 text-[#ef4444] hover:bg-red-50 rounded-lg transition-all" title="Desinstalar">
    <Trash2 class="w-5 h-5" />
  </button>
</div>
```

---

#### 2. Modal de Confirmação de Desinstalação

**Container:**
```html
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl max-w-md w-full p-6 text-center">
    <!-- Icon -->
    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <AlertTriangle class="w-8 h-8 text-[#ef4444]" />
    </div>
    
    <!-- Content -->
    <h3 class="text-xl font-bold text-[#1f2937] mb-2">Desinstalar módulo?</h3>
    <p class="text-[#627271] mb-2">
      Tem certeza que deseja desinstalar o módulo <strong>CRM</strong>?
    </p>
    <p class="text-sm text-[#627271] mb-6">
      Seus dados serão preservados por 12 meses. Você pode reinstalar a qualquer momento.
    </p>
    
    <!-- Actions -->
    <div class="flex gap-3">
      <button class="flex-1 bg-white border border-[#e5e7eb] hover:bg-[#f3f4f6] text-[#1f2937] font-medium py-2.5 rounded-lg transition-all">
        Cancelar
      </button>
      <button class="flex-1 bg-[#ef4444] hover:bg-red-600 text-white font-medium py-2.5 rounded-lg transition-all">
        Sim, desinstalar
      </button>
    </div>
  </div>
</div>
```

---

## 🖥️ Tela 3: Checkout de Módulo (/marketplace/checkout)

### Layout por Etapas

#### Etapa 1: Seleção do Módulo

```
┌─────────────────────────────────────────────────────────────────────┐
│ [SIDEBAR]                           Checkout                        │
├───────────┬─────────────────────────────────────────────────────────┤
│           │  [1]----[2]----[3]----[4]  (Stepper)                    │
│           │                                                         │
│           │  ┌─────────────────────────┐ ┌──────────────────────┐  │
│           │  │ MÓDULO SELECIONADO      │ │ RESUMO               │  │
│           │  │                         │ │                      │  │
│           │  │  [IC] CRM               │ │ CRM              R$69│  │
│           │  │  Gerencie clientes...   │ │                      │  │
│           │  │                         │ │ Subtotal         R$69│  │
│           │  │  R$ 69/mês              │ │                      │  │
│           │  │  ✓ Primeiro mês grátis  │ │ Total mensal     R$69│  │
│           │  │                         │ │                      │  │
│           │  │ ─────────────────────── │ │ [Continuar]          │  │
│           │  │                         │ │                      │  │
│           │  │ DESCONTO PROGRESSIVO    │ └──────────────────────┘  │
│           │  │                         │                           │
│           │  │ 2 módulos   -10%        │                           │
│           │  │ 3 módulos   -15%        │                           │
│           │  │ 4+ módulos  -20%        │                           │
│           │  │                         │                           │
│           │  │ [Adicionar mais módulos]│                           │
│           │  └─────────────────────────┘                           │
│           │                                                         │
└───────────┴─────────────────────────────────────────────────────────┘
```

**Stepper de Progresso:**
```html
<div class="flex items-center justify-center mb-8">
  <div class="flex items-center">
    <!-- Step 1 - Ativo -->
    <div class="flex items-center">
      <div class="w-8 h-8 rounded-full bg-[#3e5653] text-white flex items-center justify-center text-sm font-semibold">
        1
      </div>
      <span class="ml-2 text-sm font-medium text-[#1f2937]">Módulo</span>
    </div>
    <div class="w-16 h-0.5 bg-[#3e5653] mx-2"></div>
    
    <!-- Step 2 - Inativo -->
    <div class="flex items-center">
      <div class="w-8 h-8 rounded-full bg-[#e5e7eb] text-[#627271] flex items-center justify-center text-sm font-semibold">
        2
      </div>
      <span class="ml-2 text-sm font-medium text-[#627271]">Resumo</span>
    </div>
    <!-- ... -->
  </div>
</div>
```

**Card de Módulo Selecionado:**
```html
<div class="bg-white rounded-xl border-2 border-[#86cb92] p-6">
  <div class="flex items-start gap-4 mb-4">
    <div class="w-14 h-14 rounded-xl bg-[#86cb92]/10 flex items-center justify-center">
      <Users class="w-7 h-7 text-[#86cb92]" />
    </div>
    <div>
      <h3 class="text-xl font-semibold text-[#1f2937]">CRM</h3>
      <p class="text-[#627271]">Gerencie clientes e vendas de forma inteligente</p>
    </div>
  </div>
  
  <div class="flex items-baseline gap-2 mb-2">
    <span class="text-3xl font-bold text-[#3e5653]">R$ 69</span>
    <span class="text-[#627271]">/mês</span>
  </div>
  
  <div class="flex items-center gap-2 text-[#86cb92]">
    <Gift class="w-4 h-4" />
    <span class="text-sm font-medium">Primeiro mês grátis!</span>
  </div>
</div>
```

**Tabela de Descontos:**
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6 mt-6">
  <h4 class="font-semibold text-[#1f2937] mb-4">Desconto Progressivo</h4>
  <div class="space-y-3">
    <div class="flex items-center justify-between p-3 rounded-lg bg-[#86cb92]/5">
      <span class="text-[#1f2937]">2 módulos</span>
      <span class="font-semibold text-[#86cb92]">-10%</span>
    </div>
    <div class="flex items-center justify-between p-3 rounded-lg bg-[#f3f4f6]">
      <span class="text-[#627271]">3 módulos</span>
      <span class="font-semibold text-[#627271]">-15%</span>
    </div>
    <div class="flex items-center justify-between p-3 rounded-lg bg-[#f3f4f6]">
      <span class="text-[#627271]">4+ módulos</span>
      <span class="font-semibold text-[#627271]">-20%</span>
    </div>
  </div>
  
  <button class="w-full mt-4 text-[#3e5653] font-medium hover:underline">
    + Adicionar mais módulos
  </button>
</div>
```

---

#### Etapa 2: Resumo da Compra

```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6">
  <h4 class="font-semibold text-[#1f2937] mb-4">Resumo da Assinatura</h4>
  
  <div class="space-y-3 mb-4">
    <div class="flex justify-between text-sm">
      <span class="text-[#627271]">CRM</span>
      <span class="text-[#1f2937]">R$ 69,00</span>
    </div>
    <div class="flex justify-between text-sm">
      <span class="text-[#627271]">Financeiro</span>
      <span class="text-[#1f2937]">R$ 69,00</span>
    </div>
  </div>
  
  <div class="border-t border-[#e5e7eb] pt-3 mb-4">
    <div class="flex justify-between text-sm mb-1">
      <span class="text-[#627271]">Subtotal</span>
      <span class="text-[#1f2937]">R$ 138,00</span>
    </div>
    <div class="flex justify-between text-sm text-[#86cb92]">
      <span>Desconto (2 módulos -10%)</span>
      <span>- R$ 13,80</span>
    </div>
  </div>
  
  <div class="border-t border-[#e5e7eb] pt-4">
    <div class="flex justify-between items-baseline mb-2">
      <span class="font-semibold text-[#1f2937]">Total mensal</span>
      <span class="text-2xl font-bold text-[#3e5653]">R$ 124,20</span>
    </div>
    <p class="text-xs text-[#627271]">
      Próxima cobrança: 15/02/2026
    </p>
    <p class="text-xs text-[#86cb92] font-medium mt-1">
      Você economiza R$ 13,80 por mês!
    </p>
  </div>
</div>
```

---

#### Etapa 3: Pagamento

```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6">
  <h4 class="font-semibold text-[#1f2937] mb-4">Forma de Pagamento</h4>
  
  <!-- Métodos -->
  <div class="space-y-3 mb-6">
    <label class="flex items-center p-4 border-2 border-[#3e5653] rounded-xl cursor-pointer bg-[#3e5653]/5">
      <input type="radio" name="payment" value="card" checked class="w-4 h-4 text-[#3e5653]" />
      <CreditCard class="w-5 h-5 ml-3 text-[#3e5653]" />
      <span class="ml-3 font-medium text-[#1f2937]">Cartão de Crédito</span>
    </label>
    
    <label class="flex items-center p-4 border border-[#e5e7eb] rounded-xl cursor-pointer hover:bg-[#f3f4f6]">
      <input type="radio" name="payment" value="pix" class="w-4 h-4 text-[#3e5653]" />
      <span class="ml-3 font-medium text-[#1f2937]">PIX</span>
    </label>
    
    <label class="flex items-center p-4 border border-[#e5e7eb] rounded-xl cursor-pointer hover:bg-[#f3f4f6]">
      <input type="radio" name="payment" value="boleto" class="w-4 h-4 text-[#3e5653]" />
      <span class="ml-3 font-medium text-[#1f2937]">Boleto Bancário</span>
    </label>
  </div>
  
  <!-- Cartão Salvo -->
  <div class="bg-[#f3f4f6] rounded-xl p-4 mb-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-6 bg-[#1f2937] rounded flex items-center justify-center">
          <span class="text-white text-xs font-bold">VISA</span>
        </div>
        <div>
          <p class="text-sm font-medium text-[#1f2937]">•••• •••• •••• 4242</p>
          <p class="text-xs text-[#627271]">Expira 12/27</p>
        </div>
      </div>
      <span class="text-xs text-[#86cb92] font-medium">Padrão</span>
    </div>
  </div>
  
  <button class="w-full bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98]">
    Confirmar Assinatura
  </button>
</div>
```

---

#### Etapa 4: Confirmação

```html
<div class="text-center py-12">
  <div class="w-20 h-20 bg-[#86cb92] rounded-full flex items-center justify-center mx-auto mb-6">
    <CheckCircle class="w-10 h-10 text-white" />
  </div>
  
  <h2 class="text-2xl font-bold text-[#1f2937] mb-2">Módulo adicionado com sucesso!</h2>
  <p class="text-[#627271] mb-8 max-w-md mx-auto">
    O módulo CRM foi adicionado ao seu pacote. Você já pode começar a usá-lo agora mesmo.
  </p>
  
  <div class="bg-[#86cb92]/10 rounded-xl p-4 max-w-sm mx-auto mb-8">
    <p class="text-sm text-[#627271]">Valor adicionado à sua assinatura</p>
    <p class="text-2xl font-bold text-[#3e5653]">+ R$ 69,00/mês</p>
  </div>
  
  <div class="flex gap-3 justify-center">
    <button class="bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold px-6 py-3 rounded-xl transition-all">
      Começar a Usar
    </button>
    <button class="bg-white border border-[#e5e7eb] hover:bg-[#f3f4f6] text-[#1f2937] font-semibold px-6 py-3 rounded-xl transition-all">
      Ver Meus Módulos
    </button>
  </div>
</div>
```

---

## 🖥️ Tela 4: Calculadora de Preço (/marketplace/calculadora)

### Layout da Página

```
┌─────────────────────────────────────────────────────────────────────┐
│ [SIDEBAR]                           Calculadora de Preços           │
├───────────┬─────────────────────────────────────────────────────────┤
│           │                                                         │
│           │  ┌─────────────────────┐ ┌──────────────────────────┐  │
│           │  │ SELECIONE OS        │ │ RESUMO                   │  │
│           │  │ MÓDULOS             │ │                          │  │
│           │  │                     │ │  3 módulos selecionados  │  │
│           │  │  ☑ [IC] CRM    R$69 │ │                          │  │
│           │  │  ☑ [IC] Finan  R$69 │ │  Subtotal        R$ 207  │  │
│           │  │  ☑ [IC] Estoq  R$69 │ │  Desconto -15%   -R$31   │  │
│           │  │  ☐ [IC] Vendas R$69 │ │                          │  │
│           │  │  ☐ [IC] Loja   R$69 │ │  ─────────────────────── │  │
│           │  │  ☐ [IC] Agend  R$69 │ │                          │  │
│           │  │  ☐ [IC] MEL    R$69 │ │  TOTAL MENSAL            │  │
│           │  │                     │ │      R$ 175,95           │  │
│           │  │                     │ │                          │  │
│           │  │                     │ │  Você economiza          │  │
│           │  │                     │ │  R$ 31,05/mês            │  │
│           │  │                     │ │                          │  │
│           │  │                     │ │  [Assinar Módulos]       │  │
│           │  └─────────────────────┘ └──────────────────────────┘  │
│           │                                                         │
└───────────┴─────────────────────────────────────────────────────────┘
```

### Componentes

#### 1. Lista de Módulos (Sidebar)

```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6">
  <h3 class="font-semibold text-[#1f2937] mb-4">Selecione os Módulos</h3>
  
  <div class="space-y-3">
    <label class="flex items-center p-3 rounded-lg border border-[#86cb92] bg-[#86cb92]/5 cursor-pointer">
      <input type="checkbox" checked class="w-5 h-5 text-[#3e5653] rounded focus:ring-[#3e5653]" />
      <div class="w-10 h-10 rounded-lg bg-[#86cb92]/10 flex items-center justify-center ml-3">
        <Users class="w-5 h-5 text-[#86cb92]" />
      </div>
      <div class="ml-3 flex-1">
        <span class="font-medium text-[#1f2937]">CRM</span>
      </div>
      <span class="font-semibold text-[#3e5653]">R$ 69</span>
    </label>
    
    <label class="flex items-center p-3 rounded-lg border border-[#e5e7eb] cursor-pointer hover:bg-[#f3f4f6]">
      <input type="checkbox" class="w-5 h-5 text-[#3e5653] rounded focus:ring-[#3e5653]" />
      <div class="w-10 h-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center ml-3">
        <Wallet class="w-5 h-5 text-[#627271]" />
      </div>
      <div class="ml-3 flex-1">
        <span class="font-medium text-[#1f2937]">Financeiro</span>
      </div>
      <span class="font-semibold text-[#3e5653]">R$ 69</span>
    </label>
    <!-- ... -->
  </div>
</div>
```

**Estados dos Checkboxes:**
| Estado | Card | Checkbox |
|--------|------|----------|
| **Selecionado** | `border-[#86cb92] bg-[#86cb92]/5` | `checked` |
| **Não Selecionado** | `border-[#e5e7eb] hover:bg-[#f3f4f6]` | `unchecked` |

---

#### 2. Resumo Dinâmico

```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6 lg:sticky lg:top-6">
  <h3 class="font-semibold text-[#1f2937] mb-4">Resumo</h3>
  
  <!-- Contador -->
  <div class="flex items-center gap-2 mb-4 text-[#627271]">
    <Layers class="w-4 h-4" />
    <span class="text-sm">3 módulos selecionados</span>
  </div>
  
  <!-- Cálculos -->
  <div class="space-y-2 mb-4">
    <div class="flex justify-between text-sm">
      <span class="text-[#627271]">Subtotal</span>
      <span class="text-[#1f2937]">R$ 207,00</span>
    </div>
    <div class="flex justify-between text-sm text-[#86cb92]">
      <span>Desconto (15%)</span>
      <span>- R$ 31,05</span>
    </div>
  </div>
  
  <!-- Total -->
  <div class="border-t-2 border-[#e5e7eb] pt-4 mb-4">
    <p class="text-sm text-[#627271] mb-1">Total mensal</p>
    <p class="text-4xl font-bold text-[#3e5653]">R$ 175,95</p>
  </div>
  
  <!-- Economia -->
  <div class="bg-[#86cb92]/10 rounded-lg p-3 mb-4">
    <p class="text-sm text-[#627271]">Você economiza</p>
    <p class="text-lg font-bold text-[#86cb92]">R$ 31,05/mês</p>
    <p class="text-xs text-[#627271]">R$ 372,60/ano</p>
  </div>
  
  <button class="w-full bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold py-3 rounded-xl transition-all active:scale-[0.98]">
    Assinar Módulos Selecionados
  </button>
</div>
```

---

## 🎯 Estados e Interações

### Estados dos Cards

#### Default
```
bg-white
border border-[#e5e7eb]
transition-all duration-300 ease-out
```

#### Hover
```
hover:-translate-y-1
hover:shadow-lg
hover:border-[#86cb92]
cursor-pointer
```

#### Instalado
```
border-2 border-[#86cb92]
bg-white
```

#### Loading (Skeleton)
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6 animate-pulse">
  <div class="flex items-start justify-between mb-4">
    <div class="w-12 h-12 rounded-xl bg-[#e5e7eb]"></div>
    <div class="w-16 h-6 rounded-full bg-[#e5e7eb]"></div>
  </div>
  <div class="h-6 bg-[#e5e7eb] rounded mb-2 w-3/4"></div>
  <div class="h-4 bg-[#e5e7eb] rounded mb-4 w-full"></div>
  <div class="space-y-2 mb-5">
    <div class="h-4 bg-[#e5e7eb] rounded w-2/3"></div>
    <div class="h-4 bg-[#e5e7eb] rounded w-1/2"></div>
  </div>
  <div class="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
    <div class="h-8 bg-[#e5e7eb] rounded w-20"></div>
    <div class="h-10 bg-[#e5e7eb] rounded w-24"></div>
  </div>
</div>
```

#### Loading (Botão)
```html
<button class="bg-[#3e5653] text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2" disabled>
  <Loader2 class="w-4 h-4 animate-spin" />
  Instalando...
</button>
```

### Estado Vazio

```html
<div class="text-center py-16">
  <div class="w-24 h-24 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
    <PackageOpen class="w-12 h-12 text-[#627271]" />
  </div>
  <h3 class="text-xl font-semibold text-[#1f2937] mb-2">Você ainda não tem módulos instalados</h3>
  <p class="text-[#627271] mb-6 max-w-md mx-auto">
    Explore nossa loja de módulos e escolha as ferramentas ideais para sua gestão.
  </p>
  <button class="bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold px-6 py-3 rounded-xl transition-all">
    Explorar Módulos
  </button>
</div>
```

---

## 📱 Responsividade

### Breakpoints

| Breakpoint | Grid | Layout |
|------------|------|--------|
| **Mobile** (< 768px) | `grid-cols-1` | Stack vertical, sidebar collapsed |
| **Tablet** (768px - 1024px) | `grid-cols-2` | Sidebar opcional |
| **Desktop** (> 1024px) | `grid-cols-3` | Sidebar fixa |

### Mobile Adaptations

```css
/* Container */
.max-w-7xl mx-auto px-4 sm:px-6 lg:px-8

/* Grid */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

/* Card no mobile */
@media (max-width: 768px) {
  .module-card {
    @apply p-4;
  }
  
  .module-icon {
    @apply w-10 h-10;
  }
  
  .module-title {
    @apply text-base;
  }
}
```

### Tablet Adaptations

```css
/* Grid de 2 colunas */
@media (min-width: 768px) and (max-width: 1024px) {
  .modules-grid {
    @apply grid-cols-2;
  }
}
```

---

## 🧭 Navegação e URLs

### Rotas

| Rota | Título | Descrição |
|------|--------|-----------|
| `/marketplace` | Loja de Módulos | Todos os módulos disponíveis |
| `/marketplace/meus-modulos` | Meus Módulos | Módulos instalados pelo usuário |
| `/marketplace/recomendados` | Recomendados | Sugestões baseadas no perfil |
| `/marketplace/checkout` | Checkout | Fluxo de assinatura de módulo |
| `/marketplace/calculadora` | Calculadora | Simulador de preços |

### Fluxo de Navegação

```
┌─────────────────┐
│   /marketplace  │
│   (Loja)        │
└────────┬────────┘
         │
    ┌────┴────┬────────────┐
    │         │            │
    ▼         ▼            ▼
┌────────┐ ┌──────────┐ ┌──────────────┐
│Detalhes│ │ Checkout │ │ Meus Módulos │
│(Modal) │ │  (Fluxo) │ │   (Lista)    │
└────┬───┘ └────┬─────┘ └──────┬───────┘
     │          │              │
     └──────────┼──────────────┘
                │
                ▼
        ┌──────────────┐
        │  Confirmação │
        │   (Sucesso)  │
        └──────────────┘
```

### Menu Sidebar

```javascript
{
  id: 'marketplace',
  label: 'Meus Módulos',
  icon: 'LayoutGrid',
  href: '/marketplace',
  badge: null,
  active: true
}
```

---

## ⚙️ Regras de Negócio

### RN-MKT-001: Preço Base
- **Regra:** Cada módulo custa R$ 69,00/mês
- **Validação:** Preço deve ser exibido com formatação brasileira (R$ 69,00)
- **Exceção:** Módulos com promoção podem ter preço diferente

### RN-MKT-002: Desconto Progressivo
- **Regra:** Desconto aplicado baseado na quantidade de módulos ativos
  - 2 módulos: 10% de desconto no total
  - 3 módulos: 15% de desconto no total
  - 4+ módulos: 20% de desconto no total
- **Cálculo:** Desconto aplicado sobre o subtotal mensal
- **Validação:** Desconto deve ser exibido em verde (#86cb92)

### RN-MKT-003: Período de Teste
- **Regra:** Primeiro mês gratuito para novos módulos
- **Validação:** Badge "Primeiro mês grátis" deve aparecer no checkout
- **Condição:** Aplicável apenas para primeira instalação do módulo

### RN-MKT-004: Preservação de Dados
- **Regra:** Ao desinstalar, dados são preservados por 12 meses
- **Validação:** Modal de confirmação deve informar o período de preservação
- **Ação:** Reinstalação recupera dados automaticamente

### RN-MKT-005: Cobrança Pró-rata
- **Regra:** Nova assinatura é cobrada proporcional aos dias restantes do ciclo
- **Cálculo:** (Preço / 30) * dias restantes
- **Exibição:** Mostrar "Próxima cobrança: DD/MM/YYYY" em todas as telas

### RN-MKT-006: Dependências de Módulos
- **Regra:** Alguns módulos requerem outros para funcionar
- **Exemplo:** Vendas & PDV requer Estoque
- **Ação:** Ao instalar, verificar e sugerir instalação de dependências

### RN-MKT-007: Limite de Módulos
- **Regra:** Plano gratuito permite máximo 1 módulo
- **Validação:** Se usuário já tem 1 módulo, exibir upgrade necessário
- **Mensagem:** "Para adicionar mais módulos, faça upgrade do seu plano"

### RN-MKT-008: Módulos Obrigatórios
- **Regra:** Módulo "Core" é obrigatório e não pode ser desinstalado
- **Validação:** Botão de desinstalação desabilitado para módulos obrigatórios
- **Badge:** "Obrigatório" no lugar do botão

### RN-MKT-009: Ordenação de Módulos
- **Regra:** Módulos já instalados aparecem primeiro na lista
- **Ordenação secundária:** Por popularidade (mais instalados)
- **Ordenação terciária:** Alfabética

### RN-MKT-010: Notificação de Novos Módulos
- **Regra:** Badge "Novo" aparece em módulos lançados há menos de 30 dias
- **Cálculo:** Data atual - Data de lançamento <= 30 dias
- **Exibição:** Badge azul (blue-100) no canto do card

---

## 🔧 Componentes Reutilizáveis

### ModuleCard

```typescript
interface ModuleCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  price: number;
  status: 'available' | 'installed' | 'new';
  features: string[];
  onInstall?: () => void;
  onConfigure?: () => void;
  onClick?: () => void;
}
```

### ModuleIcon

```typescript
interface ModuleIconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'colored' | 'subtle';
}
```

### PriceDisplay

```typescript
interface PriceDisplayProps {
  amount: number;
  period?: 'month' | 'year';
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  originalAmount?: number;
}
```

### StatusBadge

```typescript
interface StatusBadgeProps {
  status: 'installed' | 'new' | 'popular' | 'active' | 'pending';
  text?: string;
}
```

---

## 📊 Checklist de Implementação

### Estrutura Base
- [ ] Criar diretório `app/(dashboard)/marketplace/`
- [ ] Configurar layout com sidebar e header
- [ ] Criar arquivo `page.tsx` (Loja de Módulos)
- [ ] Criar arquivo `meus-modulos/page.tsx`
- [ ] Criar arquivo `checkout/page.tsx`
- [ ] Criar arquivo `calculadora/page.tsx`

### Componentes
- [ ] Criar `ModuleCard.tsx`
- [ ] Criar `ModuleIcon.tsx`
- [ ] Criar `ModuleGrid.tsx`
- [ ] Criar `ModuleDetailModal.tsx`
- [ ] Criar `PriceCalculator.tsx`
- [ ] Criar `CheckoutStepper.tsx`
- [ ] Criar `PackageSummary.tsx`
- [ ] Criar `StatusBadge.tsx`

### Estados
- [ ] Implementar estado `loading` com skeleton
- [ ] Implementar estado `empty` para sem módulos
- [ ] Implementar estado `error` para falhas de carregamento
- [ ] Implementar estado `installing` no botão

### Integrações
- [ ] Criar hook `useModules()` para listar módulos
- [ ] Criar hook `useUserModules()` para módulos do usuário
- [ ] Criar hook `useInstallModule()` para instalação
- [ ] Criar hook `useUninstallModule()` para desinstalação
- [ ] Integrar com API de pagamentos

### Testes
- [ ] Testar renderização de cards
- [ ] Testar hover effects
- [ ] Testar modal de detalhes
- [ ] Testar fluxo de checkout
- [ ] Testar responsividade mobile
- [ ] Testar estado vazio
- [ ] Testar cálculo de descontos

### Acessibilidade
- [ ] Adicionar `aria-label` em botões
- [ ] Garantir foco visível em elementos interativos
- [ ] Implementar navegação por teclado no modal
- [ ] Adicionar roles ARIA apropriados
- [ ] Testar com leitor de tela

### Performance
- [ ] Implementar lazy loading de imagens
- [ ] Usar `React.memo` em cards
- [ ] Implementar virtualização se lista for grande
- [ ] Otimizar bundle size

---

## 📎 Anexos

### Ícones por Módulo

| Módulo | Ícone Lucide | Categoria |
|--------|--------------|-----------|
| CRM | `Users` | Comunicação |
| Financeiro | `Wallet` | Finanças |
| Estoque | `Package` | Logística |
| Vendas & PDV | `ShoppingCart` | Vendas |
| Loja Virtual | `Store` | E-commerce |
| Agendamentos | `Calendar` | Organização |
| MEL | `Sparkles` | IA/Automação |

### Mock Data

```typescript
const modules = [
  {
    id: 'crm',
    name: 'CRM',
    description: 'Gerencie clientes e vendas de forma inteligente',
    icon: 'Users',
    price: 69,
    status: 'installed',
    features: ['Clientes ilimitados', 'Pipeline de vendas', 'Relatórios avançados'],
    installedAt: '2026-01-10',
    nextBilling: '2026-02-10'
  },
  // ...
];
```

### Variáveis de Estilo

```css
:root {
  /* Cores */
  --color-primary: #3e5653;
  --color-primary-hover: #1f2937;
  --color-accent: #86cb92;
  --color-background: #efefef;
  --color-card: #ffffff;
  --color-text: #1f2937;
  --color-text-secondary: #627271;
  --color-border: #e5e7eb;
  
  /* Espaçamento */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Bordas */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  
  /* Transições */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease-out;
}
```

---

## 📝 Changelog

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0.0 | 2026-03-12 | Frontend Team | Documentação inicial do Módulo Marketplace |

---

**Documento gerado para Google Stitch - UNIQ Empresas**
