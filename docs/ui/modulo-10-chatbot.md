# 🎯 UNIQ Empresas - Documentação de UI/UX
## Módulo 10: Chatbot (MEL)

**Versão:** 1.0  
**Última atualização:** 21/03/2026  
**Módulo:** 10 - Chatbot (MEL)  
**Total de Telas:** 3 telas  
**Tema:** Modo Claro (Light Mode)  
**Status:** 🟡 EM DESENVOLVIMENTO (Sprint 10)

---

## 📋 Sumário

1. [Tela 1: Painel de Conversas](#tela-1-painel-de-conversas)
2. [Tela 2: Janela de Conversa](#tela-2-janela-de-conversa)
3. [Tela 3: Configuração do Chatbot](#tela-3-configuração-do-chatbot)

---

## 🎨 Design System Chatbot (MEL)

> 🎨 **DESIGN COMMITMENT:**
> - **Geometry:** Bordas arredondadas (16-24px) para visual amigável e conversacional
> - **Typography:** Inter (moderna, legível) para toda a interface de chat
> - **Palette:** Emerald (#86cb92) primário - identidade da MEL + Jet Black (#1f2937) para textos
> - **Effects/Motion:** Transições suaves (0.2s-0.3s), sombras sutis, animação de digitação (typing dots)
> - **Layout uniqueness:** Interface split-view com lista de conversas (WhatsApp-style) + área de chat

### Paleta de Cores

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| **Fundo Principal** | Platinum | `#f9fafb` | Área de chat |
| **Fundo Cards** | Branco | `#ffffff` | Cards, mensagens, modais |
| **Bubble Usuário** | Emerald | `#86cb92` | Mensagens enviadas pelo usuário |
| **Bubble Bot** | Branco | `#ffffff` | Mensagens do chatbot |
| **Sidebar Chat** | Jet Black | `#1f2937` | Barra lateral de conversas |
| **Accent** | Emerald | `#86cb92` | Ícones, online status, destaques |
| **Texto Principal** | Jet Black | `#1f2937` | Títulos, textos importantes |
| **Texto Secundário** | Dim Grey | `#627271` | Descrições, timestamps |
| **Texto Bubble User** | Branco | `#ffffff` | Texto dentro do bubble do usuário |
| **Bordas** | Gray-200 | `#e5e7eb` | Bordas de inputs e cards |
| **Sucesso** | Green | `#16a34a` | Estados de sucesso |
| **Erro** | Red | `#dc2626` | Estados de erro |
| **Aviso** | Amber | `#f59e0b` | Avisos |
| **Online Status** | Green | `#22c55e` | Indicador de online |
| **Offline Status** | Gray | `#9ca3af` | Indicador de offline |

### Tipografia

- **Fonte:** Inter (Google Fonts)
- **Importação:** `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap`
- **Tailwind Config:**
```javascript
fontFamily: {
  inter: ['Inter', 'sans-serif'],
}
```

**Hierarquia:**
| Elemento | Tamanho | Peso | Cor |
|----------|---------|------|-----|
| H1 (Header Conver.) | `text-lg` | `font-semibold` (600) | `#ffffff` |
| H2 (Nome Cliente) | `text-base` | `font-semibold` (600) | `#1f2937` |
| H3 (Preview Mens.) | `text-sm` | `font-medium` (500) | `#1f2937` |
| Body | `text-sm` | `font-normal` (400) | `#1f2937` |
| Timestamp | `text-xs` | `font-normal` (400) | `#627271` |
| Mensagem Chat | `text-[15px]` | `font-normal` (400) | `#1f2937` / `#ffffff` |
| Quick Reply | `text-[13px]` | `font-medium` (500) | `#86cb92` |

### Layout Patterns

**Container Principal Chat (Split-View):**
```
Desktop (>=1024px):
┌─────────────────────────────────────────────────────────────────────┐
│  SIDEBAR (CONVERSAS)  │  ÁREA DE CHAT                              │
│  bg-[#1f2937]         │  bg-[#f9fafb]                              │
│  w-80 (320px)         │  flex-1                                    │
│  h-screen              │  min-h-screen                              │
│  fixed                 │                                            │
│                        │  ┌─────────────────────────────────────┐  │
│  • Header Sidebar      │  │  HEADER CHAT                         │  │
│  • Search Input        │  │  Cliente + Status + Ações           │  │
│  • Lista Conversas      │  ├─────────────────────────────────────┤  │
│  • Scroll              │  │                                      │  │
│                        │  │  MENSAGENS                           │  │
│                        │  │  (Scroll vertical)                  │  │
│                        │  │                                      │  │
│                        │  │  • Bubble User (direita)            │  │
│                        │  │  • Bubble Bot (esquerda)             │  │
│                        │  │  • Quick Replies                    │  │
│                        │  │  • Cards/Anexos                     │  │
│                        │  │                                      │  │
│                        │  ├─────────────────────────────────────┤  │
│                        │  │  INPUT MENSAGEM                      │  │
│                        │  │  textarea + anexos + enviar         │  │
│                        │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**Bubble Pattern:**
- **Bubble Usuário:** `bg-[#86cb92] text-white rounded-2xl rounded-tr-sm px-4 py-3`
- **Bubble Bot:** `bg-white text-[#1f2937] rounded-2xl rounded-tl-sm px-4 py-3 border border-[#e5e7eb]`
- **Max-width:** `max-w-[75%]`
- **Shadow:** `shadow-sm`

**Input Pattern:**
- Fundo: `bg-[#f3f4f6]`
- Borda-radius: `rounded-2xl`
- Padding: `py-3 px-4`
- Focus: `focus:ring-2 focus:ring-[#86cb92]/50`

**Conversa Item Pattern:**
- Padding: `px-4 py-3`
- Hover: `hover:bg-white/5`
- Active: `bg-white/10 border-l-2 border-[#86cb92]`

---

## 📱 Tela 1: Painel de Conversas

**Rota:** `/chat/conversas`  
**Objetivo:** Listar todas as conversas com clientes em estilo WhatsApp  
**Módulo:** Chatbot (MEL)  
**Tipo:** Página autenticada

### 1.1 Estrutura da Página

```html
<!-- ========================================================= -->
<!-- TELA 1: PAINEL DE CONVERSAS - Lista estilo WhatsApp       -->
<!-- ========================================================= -->
<div class="flex h-screen bg-[#1f2937]">
  
  <!-- Sidebar: Lista de Conversas -->
  <aside class="w-80 flex flex-col border-r border-white/10">
    
    <!-- Header Sidebar -->
    <header class="p-4 border-b border-white/10">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-[16px] font-semibold text-white">MEL Chatbot</h1>
            <p class="text-[12px] text-white/60">Atendimento Automático</p>
          </div>
        </div>
        <button class="p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg class="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </button>
      </div>
      
      <!-- Search -->
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input 
          type="text" 
          placeholder="Buscar conversas..."
          class="w-full pl-10 pr-4 py-2 bg-white/10 border-0 rounded-xl text-[14px] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50"
        >
      </div>
    </header>
    
    <!-- Filtros -->
    <div class="px-4 py-2 border-b border-white/10">
      <div class="flex gap-2">
        <button class="px-3 py-1.5 bg-[#86cb92] text-white rounded-full text-[12px] font-medium">
          Todas
        </button>
        <button class="px-3 py-1.5 bg-white/10 text-white/70 rounded-full text-[12px] font-medium hover:bg-white/20 transition-colors">
          Não Lidas
        </button>
        <button class="px-3 py-1.5 bg-white/10 text-white/70 rounded-full text-[12px] font-medium hover:bg-white/20 transition-colors">
          Abertas
        </button>
      </div>
    </div>
    
    <!-- Lista de Conversas -->
    <div class="flex-1 overflow-y-auto">
      
      <!-- Conversa Item: Ativa -->
      <div class="conversation-item px-4 py-3 border-l-2 border-[#86cb92] bg-white/10 cursor-pointer">
        <div class="flex gap-3">
          <!-- Avatar -->
          <div class="relative flex-shrink-0">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span class="text-[16px] font-semibold text-white">MC</span>
            </div>
            <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#22c55e] border-2 border-[#1f2937] rounded-full"></div>
          </div>
          
          <!-- Conteúdo -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-[14px] font-semibold text-white truncate">Maria Clara Santos</h3>
              <span class="text-[11px] text-[#86cb92]">14:32</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-[13px] text-white/70 truncate">
                <span class="text-[#86cb92]">Você:</span> Obrigada pela ajuda! Vou verificar o estoque.
              </p>
              <span class="flex-shrink-0 w-5 h-5 bg-[#86cb92] rounded-full text-[11px] font-bold text-white flex items-center justify-center">2</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Conversa Item: Com IA handling -->
      <div class="conversation-item px-4 py-3 border-l-2 border-transparent hover:bg-white/5 cursor-pointer transition-colors">
        <div class="flex gap-3">
          <div class="relative flex-shrink-0">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <span class="text-[16px] font-semibold text-white">JO</span>
            </div>
            <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#22c55e] border-2 border-[#1f2937] rounded-full"></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-[14px] font-semibold text-white truncate">
                João Oliveira
                <span class="ml-2 px-1.5 py-0.5 bg-[#86cb92]/20 text-[#86cb92] rounded text-[10px] font-medium">MEL</span>
              </h3>
              <span class="text-[11px] text-white/50">13:45</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-[13px] text-white/70 truncate">
                <span class="text-[#86cb92]">🤖:</span> Encontrei 3 oportunidades de cross-sell...
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Conversa Item: Encerrada -->
      <div class="conversation-item px-4 py-3 border-l-2 border-transparent hover:bg-white/5 cursor-pointer transition-colors opacity-70">
        <div class="flex gap-3">
          <div class="relative flex-shrink-0">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span class="text-[16px] font-semibold text-white">PA</span>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-[14px] font-medium text-white truncate">Pedro Almeida</h3>
              <span class="text-[11px] text-white/50">10:20</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-[13px] text-white/70 truncate">
                Encerrada automaticamente após 24h de inatividade
              </p>
              <span class="flex-shrink-0 px-1.5 py-0.5 bg-white/10 text-white/60 rounded text-[10px]">Encerrada</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Conversa Item: Aguardando Resposta -->
      <div class="conversation-item px-4 py-3 border-l-2 border-transparent hover:bg-white/5 cursor-pointer transition-colors">
        <div class="flex gap-3">
          <div class="relative flex-shrink-0">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <span class="text-[16px] font-semibold text-white">AS</span>
            </div>
            <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-500 border-2 border-[#1f2937] rounded-full"></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-[14px] font-semibold text-white truncate">Ana Silva</h3>
              <span class="text-[11px] text-amber-400">09:15</span>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-[13px] text-white/70 truncate">
                Tem esse produto disponível para retirada amanhã?
              </p>
              <span class="flex-shrink-0 px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded text-[10px]">Aguardando</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    <!-- Footer Stats -->
    <div class="p-4 border-t border-white/10">
      <div class="flex items-center justify-between text-[12px] text-white/60">
        <span>12 conversas hoje</span>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></span>
          8 online
        </span>
      </div>
    </div>
  </aside>
  
  <!-- Área Principal (Placeholder quando não há conversa selecionada) -->
  <main class="flex-1 flex items-center justify-center bg-[#f9fafb]">
    <div class="text-center">
      <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-[#86cb92]/10 flex items-center justify-center">
        <svg class="w-12 h-12 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </div>
      <h2 class="text-[20px] font-semibold text-[#1f2937] mb-2">Selecione uma conversa</h2>
      <p class="text-[14px] text-[#627271]">Escolha uma conversa na lista ao lado para começar</p>
    </div>
  </main>
</div>
```

### 1.2 Estados de Componente

#### Empty State (Sem Conversas)
```html
<div class="flex-1 flex items-center justify-center p-8">
  <div class="text-center max-w-sm">
    <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-[#86cb92]/10 flex items-center justify-center">
      <svg class="w-10 h-10 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    </div>
    <h3 class="text-[16px] font-semibold text-[#1f2937] mb-2">Nenhuma conversa ainda</h3>
    <p class="text-[14px] text-[#627271]">
      Quando seus clientes começarem a interagir com o chatbot, as conversas aparecerão aqui.
    </p>
  </div>
</div>
```

#### Loading State
```html
<div class="flex-1 overflow-y-auto p-4 space-y-4">
  <!-- Skeleton Loading -->
  <div class="flex gap-3 animate-pulse">
    <div class="w-12 h-12 rounded-full bg-gray-200"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-gray-200 rounded w-1/3"></div>
      <div class="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
  <div class="flex gap-3 animate-pulse">
    <div class="w-12 h-12 rounded-full bg-gray-200"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-gray-200 rounded w-1/4"></div>
      <div class="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
  <div class="flex gap-3 animate-pulse">
    <div class="w-12 h-12 rounded-full bg-gray-200"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-gray-200 rounded w-2/5"></div>
      <div class="h-3 bg-gray-200 rounded w-3/4"></div>
    </div>
  </div>
</div>
```

---

## 💬 Tela 2: Janela de Conversa

**Rota:** `/chat/conversa/:id`  
**Objetivo:** Visualizar e gerenciar uma conversa específica com mensagens, quick replies e anexos  
**Módulo:** Chatbot (MEL)  
**Tipo:** Página autenticada

### 2.1 Estrutura da Página

```html
<!-- ========================================================= -->
<!-- TELA 2: JANELA DE CONVERSA - Chat com Cliente             -->
<!-- ========================================================= -->
<div class="flex h-screen bg-[#f9fafb]">
  
  <!-- Sidebar: Lista de Conversas -->
  <aside class="w-80 flex flex-col bg-[#1f2937] border-r border-white/10">
    <!-- (Mesma estrutura da Tela 1) -->
    <!-- ... lista de conversas ... -->
  </aside>
  
  <!-- Área Principal: Chat -->
  <main class="flex-1 flex flex-col">
    
    <!-- Header do Chat -->
    <header class="bg-white border-b border-[#e5e7eb] px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <!-- Avatar e Info Cliente -->
        <div class="relative">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span class="text-[16px] font-semibold text-white">MC</span>
          </div>
          <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#22c55e] border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 class="text-[16px] font-semibold text-[#1f2937]">Maria Clara Santos</h2>
          <p class="text-[12px] text-[#627271] flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse"></span>
            Online agora
          </p>
        </div>
      </div>
      
      <!-- Ações do Header -->
      <div class="flex items-center gap-2">
        <button class="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors" title="Informações do cliente">
          <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </button>
        <button class="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors" title="Transferir para humano">
          <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </button>
        <div class="h-6 w-px bg-[#e5e7eb] mx-1"></div>
        <button class="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors" title="Configurações">
          <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
      </div>
    </header>
    
    <!-- Área de Mensagens -->
    <div class="flex-1 overflow-y-auto p-6 bg-[#f9fafb]" id="chat-messages">
      <div class="max-w-3xl mx-auto space-y-4">
        
        <!-- Date Separator -->
        <div class="flex items-center justify-center my-6">
          <span class="text-[12px] text-[#627271] bg-white px-3 py-1 rounded-full border border-[#e5e7eb]">Hoje</span>
        </div>
        
        <!-- Mensagem do Cliente -->
        <div class="flex justify-end mb-4">
          <div class="max-w-[75%] bg-[#86cb92] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
            <p class="text-[15px] leading-relaxed">Olá! Vi no Instagram que vocês vendem óculos de sol. Tem algum modelo para homens?</p>
            <div class="flex items-center justify-end gap-1 mt-1">
              <span class="text-[11px] opacity-80">14:28</span>
              <svg class="w-4 h-4 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Resposta do Chatbot (MEL) -->
        <div class="flex items-start gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="max-w-[80%] space-y-3">
            <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#e5e7eb]">
              <p class="text-[15px] leading-relaxed text-[#1f2937]">
                Olá! 👋 Que bom que você nos encontrou! Sim, temos vários modelos de óculos de sol masculino. Posso te mostrar alguns?
              </p>
              <span class="text-[11px] text-[#627271] mt-1 block">14:29</span>
            </div>
            
            <!-- Quick Replies -->
            <div class="flex flex-wrap gap-2">
              <button class="px-4 py-2 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium hover:bg-[#86cb92]/20 transition-all border border-[#86cb92]/30">
                Ver modelos
              </button>
              <button class="px-4 py-2 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium hover:bg-[#86cb92]/20 transition-all border border-[#86cb92]/30">
                Preços
              </button>
              <button class="px-4 py-2 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium hover:bg-[#86cb92]/20 transition-all border border-[#86cb92]/30">
                Forma de pagamento
              </button>
            </div>
          </div>
        </div>
        
        <!-- Mensagem do Cliente -->
        <div class="flex justify-end mb-4">
          <div class="max-w-[75%] bg-[#86cb92] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
            <p class="text-[15px] leading-relaxed">Quero ver os modelos!</p>
            <div class="flex items-center justify-end gap-1 mt-1">
              <span class="text-[11px] opacity-80">14:30</span>
              <svg class="w-4 h-4 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Resposta do Chatbot com Card de Produto -->
        <div class="flex items-start gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="max-w-[85%] space-y-3">
            <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#e5e7eb]">
              <p class="text-[15px] leading-relaxed text-[#1f2937]">
                Aqui estão nossos modelos masculino mais vendidos! 🕶️
              </p>
              <span class="text-[11px] text-[#627271] mt-1 block">14:31</span>
            </div>
            
            <!-- Card de Produto -->
            <div class="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
              <div class="flex gap-4 p-4">
                <div class="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-[14px] font-semibold text-[#1f2937]">Óculos Ray-Ban Aviator</h4>
                  <p class="text-[12px] text-[#627271] mb-2">Masculino • Preto • Vintage</p>
                  <p class="text-[18px] font-bold text-[#86cb92]">R$ 349,90</p>
                  <p class="text-[11px] text-[#627271]">ou 3x de R$ 116,63 sem juros</p>
                </div>
              </div>
              <div class="px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
                <button class="w-full py-2 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-lg text-[13px] font-medium transition-colors">
                  Envidar详细信息
                </button>
              </div>
            </div>
            
            <!-- Mais Quick Replies -->
            <div class="flex flex-wrap gap-2">
              <button class="px-4 py-2 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium hover:bg-[#86cb92]/20 transition-all border border-[#86cb92]/30">
                Ver mais modelos
              </button>
              <button class="px-4 py-2 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium hover:bg-[#86cb92]/20 transition-all border border-[#86cb92]/30">
                Comprar agora
              </button>
            </div>
          </div>
        </div>
        
        <!-- Mensagem do Cliente -->
        <div class="flex justify-end mb-4">
          <div class="max-w-[75%] bg-[#86cb92] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
            <p class="text-[15px] leading-relaxed">Obrigada pela ajuda! Vou verificar o estoque.</p>
            <div class="flex items-center justify-end gap-1 mt-1">
              <span class="text-[11px] opacity-80">14:32</span>
              <svg class="w-4 h-4 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Typing Indicator -->
        <div class="flex items-start gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#e5e7eb] min-w-[80px]">
            <div class="flex items-center gap-1.5">
              <div class="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- Área de Input -->
    <footer class="bg-white border-t border-[#e5e7eb] px-6 py-4">
      <div class="max-w-3xl mx-auto">
        
        <!-- Anexos Preview -->
        <div class="flex gap-2 mb-3 overflow-x-auto pb-2">
          <div class="relative flex-shrink-0">
            <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-[#e5e7eb]">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <button class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Input Principal -->
        <div class="flex items-end gap-3">
          <button class="p-3 hover:bg-[#f3f4f6] rounded-full transition-colors flex-shrink-0" title="Anexar arquivo">
            <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
            </svg>
          </button>
          
          <button class="p-3 hover:bg-[#f3f4f6] rounded-full transition-colors flex-shrink-0" title="Enviar emoji">
            <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
          
          <div class="flex-1 relative">
            <textarea 
              class="w-full px-4 py-3 pr-12 bg-[#f3f4f6] border-0 rounded-2xl resize-none text-[15px] text-[#1f2937] placeholder-[#627271] focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50 transition-all"
              rows="1"
              placeholder="Digite sua mensagem..."
              style="min-height: 48px; max-height: 120px;"
            ></textarea>
          </div>
          
          <button class="p-3 bg-[#86cb92] hover:bg-[#5fb86e] rounded-full transition-colors shadow-md flex-shrink-0" title="Enviar mensagem">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </div>
        
        <!-- Tags de Configuração -->
        <div class="flex items-center gap-2 mt-3 text-[11px] text-[#627271]">
          <span class="px-2 py-1 bg-[#f3f4f6] rounded">#vendas</span>
          <span class="px-2 py-1 bg-[#f3f4f6] rounded">#optica</span>
          <span class="text-[#86cb92] cursor-pointer hover:underline">+ adicionar tag</span>
        </div>
      </div>
    </footer>
  </main>
</div>
```

### 2.2 Tipos de Mensagens

#### Mensagem com Anexo (Imagem)
```html
<!-- Mensagem do Cliente com Imagem -->
<div class="flex justify-end mb-4">
  <div class="max-w-[75%] space-y-2">
    <div class="bg-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
      <p class="text-[15px] leading-relaxed text-[#1f2937]">Olha esse modelo que encontrei!</p>
    </div>
    <div class="bg-white rounded-2xl rounded-tr-sm overflow-hidden shadow-sm">
      <img src="/placeholder.jpg" alt="Anexo" class="max-w-full max-h-64 object-cover">
      <div class="p-3 flex items-center justify-between border-t border-[#e5e7eb]">
        <span class="text-[12px] text-[#627271]">modelo_interesse.jpg</span>
        <div class="flex gap-2">
          <button class="p-1 hover:bg-[#f3f4f6] rounded">
            <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <span class="text-[11px] text-[#627271] text-right block">14:35</span>
  </div>
</div>
```

#### Mensagem de Sistema
```html
<!-- Mensagem de Sistema (Transferência, Status, etc) -->
<div class="flex items-center justify-center my-4">
  <div class="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
    </svg>
    <span class="text-[12px] text-blue-700 font-medium">Conversa transferida para atendimento humano</span>
  </div>
</div>
```

#### Card de Agendamento
```html
<!-- Card de Agendamento via Chatbot -->
<div class="flex items-start gap-3 mb-4">
  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center flex-shrink-0">
    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  </div>
  <div class="max-w-[80%] bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
    <div class="p-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-12 h-12 bg-[#86cb92]/10 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <div>
          <h4 class="text-[14px] font-semibold text-[#1f2937]">Agendamento Confirmado</h4>
          <p class="text-[12px] text-[#627271]">Sala de Reunião • 15 Mar, 2026</p>
        </div>
      </div>
      <div class="flex items-center gap-4 text-[13px]">
        <span class="flex items-center gap-1 text-[#627271]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          14:00 - 15:00
        </span>
        <span class="flex items-center gap-1 text-[#627271]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Dr. Carlos
        </span>
      </div>
    </div>
    <div class="px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb] flex gap-2">
      <button class="flex-1 py-2 bg-[#86cb92] text-white rounded-lg text-[13px] font-medium hover:bg-[#5fb86e] transition-colors">
        Confirmar
      </button>
      <button class="flex-1 py-2 bg-white text-[#3e5653] border border-[#e5e7eb] rounded-lg text-[13px] font-medium hover:bg-[#f3f4f6] transition-colors">
        Reprogramar
      </button>
    </div>
  </div>
</div>
```

---

## ⚙️ Tela 3: Configuração do Chatbot

**Rota:** `/chat/configuracoes`  
**Objetivo:** Configurar mensagens automáticas, FAQ, palavras-chave e comportamento do chatbot  
**Módulo:** Chatbot (MEL)  
**Tipo:** Página autenticada (Admin)

### 3.1 Estrutura da Página

```html
<!-- ========================================================= -->
<!-- TELA 3: CONFIGURAÇÃO DO CHATBOT - Dashboard Admin          -->
<!-- ========================================================= -->
<div class="min-h-screen bg-[#f9fafb]">
  
  <!-- Header -->
  <header class="bg-white border-b border-[#e5e7eb] px-6 py-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-[20px] font-semibold text-[#1f2937]">Configurações do Chatbot</h1>
            <p class="text-[14px] text-[#627271]">Personalize o comportamento e respostas da MEL</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 border border-[#e5e7eb] text-[#3e5653] rounded-lg font-medium hover:bg-[#f3f4f6] transition-colors flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            Preview
          </button>
          <button class="px-4 py-2 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-lg font-medium transition-colors flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Sincronizar
          </button>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-6 py-6">
    
    <!-- Tabs de Navegação -->
    <div class="flex items-center gap-1 mb-6 bg-white p-1 rounded-xl border border-[#e5e7eb] w-fit">
      <button class="px-4 py-2 bg-[#86cb92] text-white rounded-lg text-[14px] font-medium transition-all">
        Mensagens Auto
      </button>
      <button class="px-4 py-2 text-[#627271] hover:text-[#1f2937] rounded-lg text-[14px] font-medium transition-all">
        FAQ
      </button>
      <button class="px-4 py-2 text-[#627271] hover:text-[#1f2937] rounded-lg text-[14px] font-medium transition-all">
        Palavras-chave
      </button>
      <button class="px-4 py-2 text-[#627271] hover:text-[#1f2937] rounded-lg text-[14px] font-medium transition-all">
        Comportamento
      </button>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 border border-[#e5e7eb]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] text-[#627271] uppercase font-medium">Mensagens Auto</span>
          <div class="w-8 h-8 bg-[#86cb92]/10 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
            </svg>
          </div>
        </div>
        <p class="text-[28px] font-bold text-[#1f2937]">12</p>
        <p class="text-[12px] text-[#627271]">Configuradas</p>
      </div>
      
      <div class="bg-white rounded-xl p-4 border border-[#e5e7eb]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] text-[#627271] uppercase font-medium">Perguntas FAQ</span>
          <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-[28px] font-bold text-[#1f2937]">24</p>
        <p class="text-[12px] text-[#627271]">Perguntas respondidas</p>
      </div>
      
      <div class="bg-white rounded-xl p-4 border border-[#e5e7eb]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] text-[#627271] uppercase font-medium">Palavras-chave</span>
          <div class="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
        </div>
        <p class="text-[28px] font-bold text-[#1f2937]">48</p>
        <p class="text-[12px] text-[#627271]">Mapeadas</p>
      </div>
      
      <div class="bg-white rounded-xl p-4 border border-[#e5e7eb]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] text-[#627271] uppercase font-medium">Taxa de Resolução</span>
          <div class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-[28px] font-bold text-[#1f2937]">78%</p>
        <p class="text-[12px] text-green-600 flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
          +5% vs mês anterior
        </p>
      </div>
    </div>

    <!-- Seção: Mensagens Automáticas -->
    <div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden mb-6">
      <div class="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
        <div>
          <h2 class="text-[16px] font-semibold text-[#1f2937]">Mensagens Automáticas</h2>
          <p class="text-[13px] text-[#627271]">Respostas enviadas automaticamente em situações específicas</p>
        </div>
        <button class="px-4 py-2 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-lg font-medium transition-colors flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Nova Mensagem
        </button>
      </div>
      
      <div class="divide-y divide-[#e5e7eb]">
        <!-- Mensagem Automática 1: Saudação -->
        <div class="px-6 py-4 hover:bg-[#f9fafb] transition-colors group">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-[#86cb92]/10 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-[14px] font-semibold text-[#1f2937]">Saudação Inicial</h3>
                  <span class="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-medium">Ativo</span>
                </div>
                <p class="text-[12px] text-[#627271] truncate max-w-md">"Olá! 👋 Sou a MEL, sua assistente virtual. Como posso ajudar?"</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[12px] text-[#627271]">Trigger: Horário comercial</span>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors" title="Editar">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors" title="Duplicar">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </button>
                <button class="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                  <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mensagem Automática 2: Fora de Horas -->
        <div class="px-6 py-4 hover:bg-[#f9fafb] transition-colors group">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-[14px] font-semibold text-[#1f2937]">Fora do Horário</h3>
                  <span class="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-medium">Ativo</span>
                </div>
                <p class="text-[12px] text-[#627271] truncate max-w-md">"Olá! Agora estamos fora do horário de atendimento. Retornaremos às 9h."</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[12px] text-[#627271]">Trigger: Fora do horário</span>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </button>
                <button class="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mensagem Automática 3: Pedido de Orçamento -->
        <div class="px-6 py-4 hover:bg-[#f9fafb] transition-colors group">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-[14px] font-semibold text-[#1f2937]">Solicitação de Orçamento</h3>
                  <span class="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[10px] font-medium">Pausado</span>
                </div>
                <p class="text-[12px] text-[#627271] truncate max-w-md">"Para solicitar um orçamento, me envie os produtos de interesse..."</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[12px] text-[#627271]">Trigger: Palavra "orçamento"</span>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button class="p-2 hover:bg-[#86cb92]/10 rounded-lg transition-colors" title="Ativar">
                  <svg class="w-4 h-4 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button class="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção: FAQ Rápido (Accordion) -->
    <div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      <div class="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
        <div>
          <h2 class="text-[16px] font-semibold text-[#1f2937]">Perguntas Frequentes (FAQ)</h2>
          <p class="text-[13px] text-[#627271]">Gerencie as perguntas e respostas mais comuns</p>
        </div>
        <button class="px-4 py-2 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-lg font-medium transition-colors flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Adicionar FAQ
        </button>
      </div>
      
      <!-- FAQ Item 1 -->
      <div class="border-b border-[#e5e7eb] last:border-b-0">
        <details class="group" open>
          <summary class="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-[#f9fafb] transition-colors">
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-6 h-6 bg-[#86cb92]/10 text-[#86cb92] rounded text-[12px] font-bold">1</span>
              <span class="text-[14px] font-medium text-[#1f2937]">Vocês entregam em todo o Brasil?</span>
            </div>
            <svg class="w-5 h-5 text-[#627271] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </summary>
          <div class="px-6 pb-4 pl-14">
            <p class="text-[14px] text-[#627271] mb-3">
              Sim! Fazemos entregas para todo o Brasil via Correios ou transportadora. O prazo e valor variam conforme a região.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-[#f3f4f6] rounded text-[12px] text-[#627271]">#entrega</span>
              <span class="px-2 py-1 bg-[#f3f4f6] rounded text-[12px] text-[#627271]">#frete</span>
              <span class="px-2 py-1 bg-[#f3f4f6] rounded text-[12px] text-[#627271]">#brasil</span>
            </div>
            <div class="flex gap-2 mt-3">
              <button class="px-3 py-1.5 bg-white border border-[#e5e7eb] text-[#3e5653] rounded-lg text-[12px] font-medium hover:bg-[#f3f4f6] transition-colors">
                Editar
              </button>
              <button class="px-3 py-1.5 bg-white border border-[#e5e7eb] text-red-600 rounded-lg text-[12px] font-medium hover:bg-red-50 transition-colors">
                Excluir
              </button>
            </div>
          </div>
        </details>
      </div>
      
      <!-- FAQ Item 2 -->
      <div class="border-b border-[#e5e7eb] last:border-b-0">
        <details class="group">
          <summary class="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-[#f9fafb] transition-colors">
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-6 h-6 bg-[#86cb92]/10 text-[#86cb92] rounded text-[12px] font-bold">2</span>
              <span class="text-[14px] font-medium text-[#1f2937]">Qual o prazo de entrega?</span>
            </div>
            <svg class="w-5 h-5 text-[#627271] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </summary>
          <div class="px-6 pb-4 pl-14">
            <p class="text-[14px] text-[#627271] mb-3">
              O prazo varia de 5 a 15 dias úteis dependendo da região. Para Suzano e região, entregamos em até 3 dias úteis.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-[#f3f4f6] rounded text-[12px] text-[#627271]">#prazo</span>
              <span class="px-2 py-1 bg-[#f3f4f6] rounded text-[12px] text-[#627271]">#entrega</span>
            </div>
            <div class="flex gap-2 mt-3">
              <button class="px-3 py-1.5 bg-white border border-[#e5e7eb] text-[#3e5653] rounded-lg text-[12px] font-medium hover:bg-[#f3f4f6] transition-colors">
                Editar
              </button>
              <button class="px-3 py-1.5 bg-white border border-[#e5e7eb] text-red-600 rounded-lg text-[12px] font-medium hover:bg-red-50 transition-colors">
                Excluir
              </button>
            </div>
          </div>
        </details>
      </div>
      
      <!-- FAQ Item 3 -->
      <div class="border-b border-[#e5e7eb] last:border-b-0">
        <details class="group">
          <summary class="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-[#f9fafb] transition-colors">
            <div class="flex items-center gap-3">
              <span class="flex items-center justify-center w-6 h-6 bg-[#86cb92]/10 text-[#86cb92] rounded text-[12px] font-bold">3</span>
              <span class="text-[14px] font-medium text-[#1f2937]">Vocês têm garantia?</span>
            </div>
            <svg class="w-5 h-5 text-[#627271] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </summary>
          <div class="px-6 pb-4 pl-14">
            <p class="text-[14px] text-[#627271] mb-3">
              Sim! Oferecemos 90 dias de garantia contra defeitos de fabricação. Produtos com nota fiscal têm direito à troca ou reembolso.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-[#f3f4f6] rounded text-[12px] text-[#627271]">#garantia</span>
              <span class="px-2 py-1 bg-[#f3f4f6] rounded text-[12px] text-[#627271]">#troca</span>
            </div>
            <div class="flex gap-2 mt-3">
              <button class="px-3 py-1.5 bg-white border border-[#e5e7eb] text-[#3e5653] rounded-lg text-[12px] font-medium hover:bg-[#f3f4f6] transition-colors">
                Editar
              </button>
              <button class="px-3 py-1.5 bg-white border border-[#e5e7eb] text-red-600 rounded-lg text-[12px] font-medium hover:bg-red-50 transition-colors">
                Excluir
              </button>
            </div>
          </div>
        </details>
      </div>
    </div>

    <!-- Seção: Palavras-chave (Tags) -->
    <div class="mt-6 bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      <div class="px-6 py-4 border-b border-[#e5e7eb]">
        <h2 class="text-[16px] font-semibold text-[#1f2937]">Palavras-chave Mapeadas</h2>
        <p class="text-[13px] text-[#627271]">Palavras que disparam respostas automáticas</p>
      </div>
      <div class="p-6">
        <div class="flex flex-wrap gap-2">
          <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium">
            orçamento
            <button class="hover:text-red-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium">
            preço
            <button class="hover:text-red-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium">
            entrega
            <button class="hover:text-red-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium">
            garantia
            <button class="hover:text-red-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium">
            horário
            <button class="hover:text-red-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium">
            endereço
            <button class="hover:text-red-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </span>
          <button class="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-dashed border-[#86cb92]/50 text-[#86cb92] rounded-full text-[13px] font-medium hover:bg-[#86cb92]/5 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Adicionar
          </button>
        </div>
      </div>
    </div>

  </main>
</div>
```

### 3.2 Modal de Edição de Mensagem Automática

```html
<!-- Modal de Edição de Mensagem Automática -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
    <div class="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
      <h3 class="text-[18px] font-semibold text-[#1f2937]">Editar Mensagem Automática</h3>
      <button class="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors">
        <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <div class="p-6 space-y-4">
      <!-- Nome da Mensagem -->
      <div>
        <label class="block text-[13px] font-medium text-[#1f2937] mb-1.5">Nome da Mensagem</label>
        <input 
          type="text" 
          value="Saudação Inicial"
          class="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50 focus:border-[#86cb92]"
        >
      </div>
      
      <!-- Trigger -->
      <div>
        <label class="block text-[13px] font-medium text-[#1f2937] mb-1.5">Quando enviar?</label>
        <select class="w-full px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50 focus:border-[#86cb92]">
          <option>Cliente envia primeira mensagem</option>
          <option>Horário comercial</option>
          <option>Fora do horário</option>
          <option>Palavras-chave específicas</option>
          <option>Evento específico</option>
        </select>
      </div>
      
      <!-- Mensagem -->
      <div>
        <label class="block text-[13px] font-medium text-[#1f2937] mb-1.5">Mensagem</label>
        <textarea 
          rows="4"
          class="w-full px-4 py-3 border border-[#e5e7eb] rounded-lg text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50 focus:border-[#86cb92]"
        >Olá! 👋 Sou a MEL, sua assistente virtual da UNIQ. Como posso ajudar você hoje?

Posso te ajudar com:
📊 Informações sobre vendas
💰 Consultas financeiras
📦 Gestão de estoque
📅 Agendamentos

Digite sua pergunta ou escolha uma das opções abaixo!</textarea>
        <p class="text-[11px] text-[#627271] mt-1">Você pode usar emojis e quebras de linha.</p>
      </div>
      
      <!-- Quick Replies -->
      <div>
        <label class="block text-[13px] font-medium text-[#1f2937] mb-1.5">Quick Replies (opcional)</label>
        <div class="flex flex-wrap gap-2 p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
          <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#e5e7eb] rounded-full text-[13px]">
            Ver vendas
            <button class="text-[#627271] hover:text-red-500">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </span>
          <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#e5e7eb] rounded-full text-[13px]">
            Financeiro
            <button class="text-[#627271] hover:text-red-500">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </span>
          <button class="px-3 py-1.5 border border-dashed border-[#86cb92]/50 text-[#86cb92] rounded-full text-[13px] hover:bg-[#86cb92]/5 transition-colors">
            + Adicionar
          </button>
        </div>
      </div>
      
      <!-- Status -->
      <div class="flex items-center gap-3">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#86cb92]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#86cb92]"></div>
        </label>
        <span class="text-[14px] text-[#1f2937]">Mensagem ativa</span>
      </div>
    </div>
    
    <div class="px-6 py-4 bg-[#f9fafb] border-t border-[#e5e7eb] flex justify-end gap-3">
      <button class="px-4 py-2 border border-[#e5e7eb] text-[#3e5653] rounded-lg font-medium hover:bg-[#f3f4f6] transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-lg font-medium transition-colors">
        Salvar Alterações
      </button>
    </div>
  </div>
</div>
```

---

## 📊 Fluxo de Usuário

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          FLUXO CHATBOT MEL                              │
└─────────────────────────────────────────────────────────────────────────┘

     CLIENTE                              SISTEMA                           ADMIN
       │                                    │                                │
       │  1. Inicia conversa               │                                │
       │ ─────────────────────────────────► │                                │
       │                                    │                                │
       │                         2. Mostra saudação inicial               │
       │                         3. Exibe quick replies                  │
       │ ◄───────────────────────────────── │                                │
       │                                    │                                │
       │  4. Envia mensagem/seleciona QR    │                                │
       │ ─────────────────────────────────► │                                │
       │                                    │                                │
       │                         5. Analisa intenção                     │
       │                         6. Busca resposta em FAQ                 │
       │                         7. Responde com card/mensagem           │
       │ ◄───────────────────────────────── │                                │
       │                                    │                                │
       │  8. Novas interações...           │                                │
       │ ─────────────────────────────────► │                                │
       │                                    │                                │
       │                         9. Se inatividade > X min               │
       │                            → Encerramento automático              │
       │ ◄───────────────────────────────── │                                │
       │                                    │                                │
       │                                    │                    10. Visualiza │
       │                                    │                    em /chat      │
       │                                    │ ◄──────────────────────────────│
       │                                    │                                │
       │                                    │                    11. Interveem│
       │                                    │                    (transfer)   │
       │ ◄───────────────────────────────── │ ◄──────────────────────────────│
       │                                    │                                │
       
       
┌─────────────────────────────────────────────────────────────────────────┐
│                      TELAS PRINCIPAIS                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  /chat/conversas                                                        │
│  ├── Lista todas as conversas                                           │
│  ├── Filtros: Todas, Não Lidas, Abertas                                │
│  └── Busca por nome/mensagem                                            │
│                                                                         │
│  /chat/conversa/:id                                                      │
│  ├── Header: Cliente + Status + Ações                                   │
│  ├── Área de mensagens (scroll)                                         │
│  │   ├── Bubbles (usuário/bot)                                          │
│  │   ├── Quick Replies                                                  │
│  │   ├── Cards (produto, agendamento, etc)                              │
│  │   └── Anexos (imagens, documentos)                                  │
│  └── Input: textarea + anexos + enviar                                   │
│                                                                         │
│  /chat/configuracoes                                                     │
│  ├── Mensagens Automáticas (CRUD)                                       │
│  ├── FAQ (Accordion com CRUD)                                           │
│  ├── Palavras-chave (Tags)                                              │
│  └── Comportamento (horários, transferências, etc)                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🎭 Estados de Componentes

### Estado: Empty de Conversas
```
┌────────────────────────────────────────┐
│  📭 Nenhuma conversa encontrada         │
│                                        │
│  Quando um cliente inicia uma          │
│  conversa, ela aparecerá aqui.          │
│                                        │
│  [ Configurar Chatbot ]                │
└────────────────────────────────────────┘
```

### Estado: Loading de Mensagens
```
┌────────────────────────────────────────┐
│  [Skeleton Messages]                    │
│  ┌──────────────────────────────────┐  │
│  │ ●●○  Mensagem 1...              │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │         Mensagem 2...  ●●●     │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ ●●○  Mensagem 3...              │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### Estado: Erro de Conexão
```
┌────────────────────────────────────────┐
│  ⚠️  Problema de conexão               │
│                                        │
│  Não foi possível carregar as          │
│  mensagens. Tente novamente.           │
│                                        │
│  [ Tentar Novamente ]                 │
└────────────────────────────────────────┘
```

### Estado: Offline (Cliente)
```
┌────────────────────────────────────────┐
│  🟡 João está offline                  │
│                                        │
│  Última vez online: 14:30              │
│                                        │
│  Mensagem será enviada quando          │
│  ele ficar online.                     │
│                                        │
│  [ Encaminhar para outro atendimento ] │
└────────────────────────────────────────┘
```

---

## 📦 Mock Data (TypeScript)

```typescript
// types/chat.ts

export interface Conversation {
  id: string;
  client: Client;
  status: 'active' | 'pending' | 'closed' | 'ai_handling';
  lastMessage: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: 'client' | 'bot' | 'admin';
  senderId?: string;
  senderName?: string;
  content: string;
  type: 'text' | 'image' | 'card' | 'quick_reply' | 'system';
  metadata?: MessageMetadata;
  timestamp: Date;
  read: boolean;
}

export interface MessageMetadata {
  cardType?: 'product' | 'appointment' | 'action';
  cardData?: ProductCard | AppointmentCard | ActionCard;
  quickReplies?: QuickReply[];
  attachments?: Attachment[];
}

export interface ProductCard {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  link?: string;
}

export interface AppointmentCard {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: number;
  location: string;
  attendees: string[];
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface QuickReply {
  id: string;
  label: string;
  value: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  size: number;
}

export interface AutoMessage {
  id: string;
  name: string;
  content: string;
  trigger: 'first_message' | 'business_hours' | 'after_hours' | 'keyword' | 'event';
  keywords?: string[];
  quickReplies?: QuickReply[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  viewCount: number;
  successRate: number;
  isActive: boolean;
  order: number;
}

// Mock Data
export const mockConversations: Conversation[] = [
  {
    id: 'conv_001',
    client: {
      id: 'cli_001',
      name: 'Maria Clara Santos',
      email: 'maria@email.com',
      phone: '(11) 99999-1234',
      status: 'online',
    },
    status: 'active',
    lastMessage: {
      id: 'msg_001',
      conversationId: 'conv_001',
      sender: 'client',
      content: 'Obrigada pela ajuda! Vou verificar o estoque.',
      type: 'text',
      timestamp: new Date('2026-03-21T14:32:00'),
      read: false,
    },
    unreadCount: 2,
    createdAt: new Date('2026-03-21T14:28:00'),
    updatedAt: new Date('2026-03-21T14:32:00'),
    tags: ['vendas', 'optica'],
  },
  {
    id: 'conv_002',
    client: {
      id: 'cli_002',
      name: 'João Oliveira',
      email: 'joao@email.com',
      status: 'online',
    },
    status: 'ai_handling',
    lastMessage: {
      id: 'msg_002',
      conversationId: 'conv_002',
      sender: 'bot',
      content: 'Encontrei 3 oportunidades de cross-sell...',
      type: 'text',
      timestamp: new Date('2026-03-21T13:45:00'),
      read: true,
    },
    unreadCount: 0,
    createdAt: new Date('2026-03-21T13:40:00'),
    updatedAt: new Date('2026-03-21T13:45:00'),
    tags: ['mel', 'crm'],
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg_001',
    conversationId: 'conv_001',
    sender: 'client',
    senderName: 'Maria Clara',
    content: 'Olá! Vi no Instagram que vocês vendem óculos de sol. Tem algum modelo para homens?',
    type: 'text',
    timestamp: new Date('2026-03-21T14:28:00'),
    read: true,
  },
  {
    id: 'msg_002',
    conversationId: 'conv_001',
    sender: 'bot',
    senderName: 'MEL',
    content: 'Olá! 👋 Que bom que você nos encontrou! Sim, temos vários modelos de óculos de sol masculino. Posso te mostrar alguns?',
    type: 'text',
    metadata: {
      quickReplies: [
        { id: 'qr_1', label: 'Ver modelos', value: 'ver_modelos' },
        { id: 'qr_2', label: 'Preços', value: 'precos' },
        { id: 'qr_3', label: 'Forma de pagamento', value: 'pagamento' },
      ],
    },
    timestamp: new Date('2026-03-21T14:29:00'),
    read: true,
  },
  {
    id: 'msg_003',
    conversationId: 'conv_001',
    sender: 'client',
    senderName: 'Maria Clara',
    content: 'Quero ver os modelos!',
    type: 'text',
    timestamp: new Date('2026-03-21T14:30:00'),
    read: true,
  },
  {
    id: 'msg_004',
    conversationId: 'conv_001',
    sender: 'bot',
    senderName: 'MEL',
    content: 'Aqui estão nossos modelos masculino mais vendidos! 🕶️',
    type: 'card',
    metadata: {
      cardType: 'product',
      cardData: {
        id: 'prod_001',
        name: 'Óculos Ray-Ban Aviator',
        description: 'Masculino • Preto • Vintage',
        price: 349.90,
        image: '/placeholder.jpg',
        link: '/produto/ray-ban-aviator',
      },
    },
    timestamp: new Date('2026-03-21T14:31:00'),
    read: true,
  },
  {
    id: 'msg_005',
    conversationId: 'conv_001',
    sender: 'client',
    senderName: 'Maria Clara',
    content: 'Obrigada pela ajuda! Vou verificar o estoque.',
    type: 'text',
    timestamp: new Date('2026-03-21T14:32:00'),
    read: false,
  },
];

export const mockAutoMessages: AutoMessage[] = [
  {
    id: 'auto_001',
    name: 'Saudação Inicial',
    content: 'Olá! 👋 Sou a MEL, sua assistente virtual. Como posso ajudar?',
    trigger: 'first_message',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-03-15'),
  },
  {
    id: 'auto_002',
    name: 'Fora do Horário',
    content: 'Olá! Agora estamos fora do horário de atendimento (9h-18h). Retornaremos assim que possível.',
    trigger: 'after_hours',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-03-10'),
  },
  {
    id: 'auto_003',
    name: 'Solicitação de Orçamento',
    content: 'Para solicitar um orçamento, me envie os produtos de interesse e a quantidade desejada.',
    trigger: 'keyword',
    keywords: ['orçamento', 'cotação', 'preço bulk'],
    isActive: false,
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-03-18'),
  },
];

export const mockFAQs: FAQ[] = [
  {
    id: 'faq_001',
    question: 'Vocês entregam em todo o Brasil?',
    answer: 'Sim! Fazemos entregas para todo o Brasil via Correios ou transportadora. O prazo e valor variam conforme a região.',
    keywords: ['entrega', 'frete', 'brasil', 'correios'],
    viewCount: 156,
    successRate: 92,
    isActive: true,
    order: 1,
  },
  {
    id: 'faq_002',
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo varia de 5 a 15 dias úteis dependendo da região. Para Suzano e região, entregamos em até 3 dias úteis.',
    keywords: ['prazo', 'dias', 'quando chega'],
    viewCount: 134,
    successRate: 88,
    isActive: true,
    order: 2,
  },
  {
    id: 'faq_003',
    question: 'Vocês têm garantia?',
    answer: 'Sim! Oferecemos 90 dias de garantia contra defeitos de fabricação. Produtos com nota fiscal têm direito à troca ou reembolso.',
    keywords: ['garantia', 'troca', 'reembolso', 'defeito'],
    viewCount: 98,
    successRate: 95,
    isActive: true,
    order: 3,
  },
];
```

---

## ✅ Checklist de Aceitação Visual

### Tela 1: Painel de Conversas
- [ ] Sidebar escura (#1f2937) com largura de 320px
- [ ] Avatar do cliente com indicador de status (verde=online, amarelo=ausente)
- [ ] Badge de mensagens não lidas em verde (#86cb92)
- [ ] Hover state com fundo branco/5%
- [ ] Search input com ícone de lupa
- [ ] Filtros de conversas (Todas, Não Lidas, Abertas)
- [ ] Separador de data no centro
- [ ] Indicador "MEL" quando conversa está sendo handled por IA
- [ ] Placeholder central quando nenhuma conversa selecionada

### Tela 2: Janela de Conversa
- [ ] Header com avatar, nome e status do cliente
- [ ] Botões de ação no header (info, transferir, configurações)
- [ ] Área de mensagens com scroll vertical
- [ ] Bubble do usuário alinhado à direita, cor verde (#86cb92)
- [ ] Bubble do bot alinhado à esquerda, fundo branco
- [ ] Avatar da MEL (ícone de raio) nos mensajes do bot
- [ ] Indicador de typing com 3 dots animados
- [ ] Quick replies como chips clicáveis
- [ ] Cards de produto com imagem, preço e botão de ação
- [ ] Input com textarea expansível
- [ ] Botões de anexar e emoji
- [ ] Botão de enviar em verde (#86cb92)

### Tela 3: Configurações
- [ ] Tabs de navegação (Mensagens Auto, FAQ, Palavras-chave, Comportamento)
- [ ] Cards de estatísticas (total de configs, FAQs, palavras-chave, taxa de resolução)
- [ ] Lista de mensagens automáticas com status (Ativo/Pausado)
- [ ] Botões de ação ao hover (editar, duplicar, excluir)
- [ ] FAQ em formato de accordion expandível
- [ ] Tags de palavras-chave como chips com botão de remover
- [ ] Modal de edição com campos: nome, trigger, mensagem, quick replies
- [ ] Toggle de status ativo/inativo
- [ ] Preview do chatbot em botão separado

### Estados Comuns
- [ ] Empty state com ilustração e CTA
- [ ] Loading state com skeletons
- [ ] Error state com mensagem e botão de retry
- [ ] Offline state com indicador amarelo
- [ ] Transições suaves (200-300ms)
- [ ] Sombras sutis nos cards
- [ ] Bordas arredondadas consistentes (xl para cards, 2xl para bubbles)

### Responsividade
- [ ] Mobile: Layout empilhado (sidebar vira drawer)
- [ ] Tablet: Sidebar colapsável
- [ ] Desktop: Split view completo

### Acessibilidade
- [ ] Contraste adequado (WCAG AA)
- [ ] Focus states visíveis
- [ ] Labels em inputs
- [ ] Alt text em imagens
- [ ] Aria labels em botões de ícone

---

## 📝 Notas de Implementação

### Bibliotecas Recomendadas
- **UI Components:** Radix UI (Dialog, Accordion, Tabs)
- **Chat UI:** react-chat-elements ou custom implementation
- **Date Handling:** date-fns
- **Form Validation:** React Hook Form + Zod
- **Icons:** Lucide React

### Performance Considerations
- Virtualizar lista de conversas se > 100 items
- Lazy load mensagens mais antigas (infinite scroll)
- Debounce search input (300ms)
- Memoizar componentes de mensagem

### Integração com Backend
- WebSocket para mensagens em tempo real
- REST API para CRUD de configurações
- Supabase Realtime para presença online

---

**Documento criado em:** 21/03/2026  
**Última revisão:** 21/03/2026  
**Responsável:** Frontend Team  
**Versão:** 1.0.0
