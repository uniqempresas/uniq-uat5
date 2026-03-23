---
date: 2026-03-21T18:00:00-03:00
researcher: vibe-researcher
git_commit: 
branch: master
repository: uniq-empresas
topic: "Sprint 10: Chatbot UI (MEL) - Painel Completo de Conversas"
tags: [sprint, frontend, chatbot, mel, conversations, whatsapp, react, typescript]
status: complete
ui_spec: docs/ui/modulo-10-chatbot.md
mel_context: docs/ui/modulo-09-mel.md
roadmap_ref: docs/ROADMAP.md Sprint 10
---

# PRD - Sprint 10: Chatbot UI (MEL) 🤖

**Projeto:** UNIQ Empresas  
**Tipo:** Frontend (UI + Mock Data)  
**Data de Criação:** 2026-03-21  
**Responsável:** Frontend Team  
**Referência UI:** `docs/ui/modulo-10-chatbot.md`  
**Referência MEL:** `docs/ui/modulo-09-mel.md`  
**Referência Roadmap:** `docs/ROADMAP.md` (Sprint 10)

---

## 1. Resumo Executivo

### 1.1 Objetivo

Desenvolver o painel completo de chatbot da UNIQ Empresas com interface estilo WhatsApp para gerenciamento de conversas com clientes, integrado com o Consultor Ativo MEL (Máquina de Expertize Learning). O módulo permite que o empreendedor visualize, gerencie e configure conversas automatizadas e de atendimento humano.

### 1.2 Escopo desta Sprint

**Incluído:**
- ✅ Tela 1: Painel de Conversas (lista estilo WhatsApp)
- ✅ Tela 2: Janela de Conversa (chat completo com cliente)
- ✅ Tela 3: Configuração do Chatbot (mensagens automáticas, FAQ, palavras-chave)
- ✅ Integração visual com Design System UNIQ
- ✅ Integração com MEL (indicadores visuais)
- ✅ Mock data para demonstração completa

**Excluído (Sprints futuras):**
- ❌ Backend/API real para mensagens
- ❌ Integração com WhatsApp Business API
- ❌ Machine Learning para respostas inteligentes
- ❌ WebSocket para tempo real

### 1.3 Diferencial Competitivo

O painel de chatbot MEL posiciona a UNIQ como plataforma "proativa" — diferente de ERPs reativos onde o cliente precisa buscar informações, a MEL envia insights e alertas automaticamente. Este painel dá visibilidade ao empreendedor sobre todas as interações.

### 1.4 Stakeholders

- Donos de pequenos negócios (varejo, serviços)
- Equipe de atendimento ao cliente
- Administradores da plataforma

---

## 2. Design System - Especificações Visuais

### 2.1 Paleta de Cores (Tema Chatbot)

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| **Fundo Principal** | Platinum | `#f9fafb` | Área de chat |
| **Fundo Cards** | Branco | `#ffffff` | Cards, mensagens, modais |
| **Sidebar Chat** | Jet Black | `#1f2937` | Barra lateral de conversas |
| **Bubble Usuário** | Emerald | `#86cb92` | Mensagens enviadas pelo usuário |
| **Bubble Bot** | Branco | `#ffffff` | Mensagens do chatbot MEL |
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

### 2.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| H1 (Header Conv.) | Inter | 16px | 600 | `#ffffff` |
| H2 (Nome Cliente) | Inter | 16px | 600 | `#1f2937` |
| H3 (Preview Mens.) | Inter | 14px | 500 | `#1f2937` |
| Body | Inter | 14px | 400 | `#1f2937` |
| Timestamp | Inter | 11-12px | 400 | `#627271` |
| Mensagem Chat | Inter | 15px | 400 | `#1f2937` / `#ffffff` |
| Quick Reply | Inter | 13px | 500 | `#86cb92` |

### 2.3 Classes Tailwind Padrão

```tsx
// Sidebar (Dark Theme)
bg-[#1f2937] text-white

// Bubble Usuário (direita)
bg-[#86cb92] text-white rounded-2xl rounded-tr-sm px-4 py-3

// Bubble Bot (esquerda)
bg-white text-[#1f2937] rounded-2xl rounded-tl-sm px-4 py-3 border border-[#e5e7eb]

// Max-width bubbles
max-w-[75%]

// Input mensagem
bg-[#f3f4f6] rounded-2xl focus:ring-2 focus:ring-[#86cb92]/50

// Conversa Item
px-4 py-3 hover:bg-white/5 cursor-pointer

// Conversa Ativa
bg-white/10 border-l-2 border-[#86cb92]

// Avatar Online
w-3.5 h-3.5 bg-[#22c55e] border-2 border-[#1f2937] rounded-full
```

### 2.4 Layout Split-View (Desktop)

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
│  • Search Input        │  │  Cliente + Status + Ações             │  │
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

---

## 3. Estrutura de Componentes

### 3.1 Componentes Principais

| # | Componente | Descrição | Localização |
|---|------------|-----------|-------------|
| 1 | `ConversationsList` | Lista de conversas estilo WhatsApp | `app/components/chat/ConversationsList.tsx` |
| 2 | `ConversationItem` | Item individual de conversa | `app/components/chat/ConversationItem.tsx` |
| 3 | `ConversationHeader` | Header do chat com info do cliente | `app/components/chat/ConversationHeader.tsx` |
| 4 | `MessageBubble` | Balão de mensagem (user/bot) | `app/components/chat/MessageBubble.tsx` |
| 5 | `QuickReplies` | Botões de resposta rápida | `app/components/chat/QuickReplies.tsx` |
| 6 | `TypingIndicator` | Indicador de digitação animado | `app/components/chat/TypingIndicator.tsx` |
| 7 | `MessageInput` | Área de input com anexo | `app/components/chat/MessageInput.tsx` |
| 8 | `ProductCard` | Card de produto no chat | `app/components/chat/ProductCard.tsx` |
| 9 | `AppointmentCard` | Card de agendamento no chat | `app/components/chat/AppointmentCard.tsx` |
| 10 | `DateSeparator` | Separador de data | `app/components/chat/DateSeparator.tsx` |
| 11 | `SystemMessage` | Mensagem de sistema | `app/components/chat/SystemMessage.tsx` |
| 12 | `ChatFilters` | Filtros (Todas, Não Lidas, Abertas) | `app/components/chat/ChatFilters.tsx` |
| 13 | `ChatSearch` | Busca de conversas | `app/components/chat/ChatSearch.tsx` |
| 14 | `MELBadge` | Badge indicativo MEL | `app/components/chat/MELBadge.tsx` |
| 15 | `ConfigDashboard` | Página de configuração do chatbot | `app/chat/configuracoes/page.tsx` |
| 16 | `AutoMessageEditor` | Editor de mensagens automáticas | `app/components/chat/AutoMessageEditor.tsx` |
| 17 | `FAQEditor` | Editor de FAQ | `app/components/chat/FAQEditor.tsx` |
| 18 | `KeywordManager` | Gerenciador de palavras-chave | `app/components/chat/KeywordManager.tsx` |
| 19 | `BehaviorSettings` | Configurações de comportamento | `app/components/chat/BehaviorSettings.tsx` |
| 20 | `StatsCards` | Cards de estatísticas | `app/components/chat/StatsCards.tsx` |

### 3.2 Hooks Customizados

| Hook | Descrição |
|------|-----------|
| `useConversations` | Gerenciamento de lista de conversas |
| `useMessages` | CRUD de mensagens e mock data |
| `useTypingIndicator` | Simulação de digitação |
| `useQuickReplies` | Gerenciamento de respostas rápidas |
| `useChatFilters` | Filtros de conversas |
| `useChatSearch` | Busca em tempo real |
| `useMELConfig` | Configurações do chatbot MEL |
| `useAutoMessages` | Mensagens automáticas |

### 3.3 Utilitários

| Utilitário | Descrição |
|------------|-----------|
| `chatUtils.ts` | Funções auxiliares para chat |
| `messageTypes.ts` | Mapeamento de tipos de mensagem |
| `chatColors.ts` | Cores por tipo de conversa |
| `mockConversations.ts` | Dados mockados de conversas |
| `mockMessages.ts` | Dados mockados de mensagens |

---

## 4. Funcionalidades Detalhadas

### 4.1 Tela 1: Painel de Conversas (/chat/conversas)

**Objetivo:** Listar todas as conversas com clientes em estilo WhatsApp

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ MEL Chatbot                                          [🔔] [+ Nova Conversa] │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 🔍 Buscar conversas...                                                │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ [Todas] [Não Lidas] [Abertas]                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 🟢 Maria Clara Santos                              14:32  🔵2            │ │
│ │ Você: Obrigada pela ajuda! Vou verificar o estoque.                     │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 🟢 João Oliveira                    🤖MEL   13:45                       │ │
│ │ 🤖: Encontrei 3 oportunidades de cross-sell...                         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ◐ Pedro Almeida                                     10:20  [Encerrada]  │ │
│ │ Encerrada automaticamente após 24h de inatividade                        │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 🟡 Ana Silva                                     09:15  [Aguardando]   │ │
│ │ Tem esse produto disponível para retirada amanhã?                        │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ 12 conversas hoje          🟢 8 online                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Funcionalidades:**
- ✅ Lista de conversas ordenadas por última atividade
- ✅ Indicadores visuais: online/offline, MEL handling, status
- ✅ Badge de mensagens não lidas
- ✅ Status de conversa: Ativa, Aguardando, Encerrada
- ✅ Badge especial 🤖 para conversas com MEL
- ✅ Busca de conversas
- ✅ Filtros: Todas, Não Lidas, Abertas
- ✅ Estatísticas no footer

### 4.2 Tela 2: Janela de Conversa (/chat/conversa/:id)

**Objetivo:** Visualizar e gerenciar conversa específica com cliente

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR │ ┌─────────────────────────────────────────────────────────────────┐
│         │ │ Maria Clara Santos           🟢 Online   [📋] [👥] [⚙️]        │
│ (mesma  │ ├─────────────────────────────────────────────────────────────────┤
│ lista)  │ │  Hoje                                                               │
│         │ │                                                                     │
│         │ │                        ┌─────────────────────────────┐             │
│         │ │                        │ Olá! Vi no Instagram que    │      14:28 │
│         │ │                        │ vocês vendem óculos de sol. │      ✓✓     │
│         │ │                        │ Tem algum modelo masculino? │             │
│         │ │                        └─────────────────────────────┘             │
│         │ │                                                                     │
│         │ │ ┌───────────────┐                                                  │
│         │ │ │ 👋 Olá! Sou a  │                                                  │
│         │ │ │ MEL, sua       │   ┌─────────────┐ ┌─────────┐ ┌──────────────┐   │
│         │ │ │ assistente...  │   │Ver modelos  │ │Preços   │ │Forma pagto  │   │
│         │ │ └───────────────┘   └─────────────┘ └─────────┘ └──────────────┘   │
│         │ │                                     14:29                        │
│         │ │                                                                     │
│         │ │                        ┌─────────────────────────────┐             │
│         │ │                        │ Quero ver os modelos!      │      14:30 │
│         │ │                        └─────────────────────────────┘      ✓✓     │
│         │ │                                                                     │
│         │ │ ┌───────────────────────────────────────────────────┐            │
│         │ │ │ 👋 Aqui estão nossos modelos masculino mais       │            │
│         │ │ │ vendidos! 🕶️                                     │    14:31   │
│         │ │ └───────────────────────────────────────────────────┘            │
│         │ │ ┌───────────────────────────────────────────────────┐            │
│         │ │ │ ┌─────┐  Óculos Ray-Ban Aviator                  │            │
│         │ │ │ │ 📷  │  Masculino • Preto • Vintage              │            │
│         │ │ │ └─────┘  R$ 349,90                                │            │
│         │ │ │         ou 3x de R$ 116,63 sem juros              │            │
│         │ │ │                              [Enviar Detalhes]   │            │
│         │ │ └───────────────────────────────────────────────────┘            │
│         │ │  [Ver mais modelos] [Comprar agora]                              │
│         │ │                                                                     │
│         │ │                        ┌─────────────────────────────┐             │
│         │ │                        │ Obrigada pela ajuda! Vou  │      14:32 │
│         │ │                        │ verificar o estoque.       │      ✓✓     │
│         │ │                        └─────────────────────────────┘             │
│         │ │                                                                     │
│         │ │ ┌───────────────┐                                                  │
│         │ │ │ ● ● ●         │  MEL está digitando...                          │
│         │ │ └───────────────┘                                                  │
│         │ ├─────────────────────────────────────────────────────────────────┤
│         │ │ [📎] [😊]  ┌───────────────────────────────────┐  [➤]           │
│         │ │            │ Digite sua mensagem...            │                 │
│         │ │            └───────────────────────────────────┘                 │
│         │ │ #vendas #optica [+ adicionar tag]                                │
│         └─────────────────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────────────────────┘
```

**Funcionalidades:**
- ✅ Mensagens estilo WhatsApp (bubble user/bot)
- ✅ Quick Replies (botões de resposta rápida)
- ✅ Cards de produtos com imagem, preço, botão
- ✅ Cards de agendamento
- ✅ Typing indicator animado
- ✅ Indicador de mensagens lidas (✓✓)
- ✅ Timestamps
- ✅ Separadores de data
- ✅ Área de input com anexo e emoji
- ✅ Tags de configuração
- ✅ Header com info do cliente e ações

### 4.3 Tela 3: Configuração do Chatbot (/chat/configuracoes)

**Objetivo:** Configurar mensagens automáticas, FAQ, palavras-chave e comportamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Configurações do Chatbot                                [👁️ Preview] [🔄]  │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Mensagens Auto] [FAQ] [Palavras-chave] [Comportamento]                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│ │ Mensagens    │ │ Perguntas    │ │ Palavras-    │ │ Taxa de      │        │
│ │ Auto         │ │ FAQ          │ │ chave        │ │ Resolução    │        │
│ │ 12           │ │ 24           │ │ 48           │ │ 78% ↑5%     │        │
│ │ Configuradas │ │ Respondidas   │ │ Mapeadas     │ │ vs mês ant  │        │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Mensagens Automáticas                               [+ Nova Mensagem]    │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ ┌────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ 🔔 Saudação Inicial                              [Ativo] [✏️][📋][🗑️]│ │ │
│ │ │ "Olá! 👋 Sou a MEL, sua assistente virtual. Como posso ajudar?"   │ │ │
│ │ │ Trigger: Horário comercial                                         │ │ │
│ │ └────────────────────────────────────────────────────────────────────┘ │ │
│ │ ┌────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ 🌙 Fora do Horário                            [Ativo] [✏️][📋][🗑️]│ │ │
│ │ │ "Olá! Agora estamos fora do horário de atendimento. Retornam..." │ │ │
│ │ │ Trigger: Fora do horário                                          │ │ │
│ │ └────────────────────────────────────────────────────────────────────┘ │ │
│ │ ┌────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ 📦 Status do Pedido                           [Ativo] [✏️][📋][🗑️]│ │ │
│ │ │ "Seu pedido #123 está a caminho! Previsão: 15 min"                │ │ │
│ │ │ Trigger: Palavra-chave: "pedido", "rastrear"                     │ │ │
│ │ └────────────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Editor de Mensagem                                     [Salvar] [Cancel]│ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ Tipo de Trigger: [Dropdown]                                              │ │
│ │                                                                          │ │
│ │ Mensagem:                                                                │ │
│ │ ┌────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Olá! 👋 Sou a MEL, sua assistente virtual da loja.               │ │ │
│ │ │                                                                  │ │ │
│ │ │ Posso ajudar com:                                                  │ │ │
│ │ │ • Informações sobre produtos                                       │ │ │
│ │ │ • Status de pedidos                                               │ │ │
│ │ │ • Agendamento de serviços                                          │ │ │
│ │ │ • E muito mais!                                                   │ │ │
│ │ │                                                                  │ │ │
│ │ │ Como posso ajudar você hoje? 😊                                   │ │ │
│ │ └────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                          │ │
│ │ Quick Replies:                                                          │ │
│ │ [+ Adicionar Reply]                                                     │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │ │
│ │ │Ver produtos  │ │Meus pedidos  │ │Agendar       │                     │ │
│ │ └──────────────┘ └──────────────┘ └──────────────┘                     │ │
│ │                                                                          │ │
│ │ ☑ Ativo                                                                 │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Funcionalidades:**
- ✅ Dashboard de estatísticas (mensagens, FAQ, palavras-chave, taxa)
- ✅ Gerenciamento de mensagens automáticas (CRUD)
- ✅ Editor visual de mensagens com quick replies
- ✅ Configuração de triggers (horário, palavras-chave)
- ✅ Editor de FAQ com perguntas e respostas
- ✅ Gerenciador de palavras-chave
- ✅ Configurações de comportamento (transferência,下班, etc.)
- ✅ Preview do chatbot
- ✅ Toggle ativo/inativo

---

## 5. Dependências

### 5.1 Bibliotecas Adicionais

```json
{
  "dependencies": {
    "date-fns": "^3.6.0",
    "lucide-react": "^0.400.0",
    "zustand": "^4.5.0"
  }
}
```

| Biblioteca | Versão | Propósito |
|------------|--------|-----------|
| `date-fns` | ^3.6.0 | Manipulação de datas/horas |
| `lucide-react` | ^0.400.0 | Ícones (já incluso no projeto) |
| `zustand` | ^4.5.0 | Estado global simplificado para chat |

### 5.2 Componentes shadcn/ui Necessários

- ✅ `Dialog` - Modais de configuração
- ✅ `Button` - Botões
- ✅ `Input` - Campos de texto
- ✅ `Textarea` - Editor de mensagens
- ✅ `Select` - Dropdowns de trigger
- ✅ `Badge` - Status badges
- ✅ `Avatar` - Fotos de clientes
- ✅ `ScrollArea` - Scroll customizado
- ✅ `Separator` - Divisores
- ✅ `Skeleton` - Loading states
- ✅ `Tabs` - Tabs de navegação
- ✅ `Toggle` - Toggle ativo/inativo
- ✅ `Popover` - Popups
- ✅ `Tooltip` - Tooltips

### 5.3 Componentes Internos Existentes

- ✅ `Sidebar` - Menu lateral (já existente)
- ✅ `Header` - Cabeçalho da página
- ✅ `Card` - Cards base

---

## 6. Mock Data

### 6.1 Conversas

```typescript
const mockConversations = [
  {
    id: 'conv-1',
    client: {
      id: 'cli-1',
      name: 'Maria Clara Santos',
      avatar: null,
      initials: 'MC',
      isOnline: true,
      phone: '(11) 99999-9999',
      color: 'blue'
    },
    lastMessage: {
      text: 'Obrigada pela ajuda! Vou verificar o estoque.',
      sender: 'client',
      timestamp: '2026-03-21T14:32:00'
    },
    unreadCount: 2,
    status: 'active',
    melHandling: false,
    tags: ['vendas', 'optica']
  },
  {
    id: 'conv-2',
    client: {
      id: 'cli-2',
      name: 'João Oliveira',
      avatar: null,
      initials: 'JO',
      isOnline: true,
      phone: '(11) 98888-8888',
      color: 'purple'
    },
    lastMessage: {
      text: '🤖: Encontrei 3 oportunidades de cross-sell...',
      sender: 'bot',
      timestamp: '2026-03-21T13:45:00'
    },
    unreadCount: 0,
    status: 'active',
    melHandling: true,
    tags: ['mel', 'insights']
  },
  {
    id: 'conv-3',
    client: {
      id: 'cli-3',
      name: 'Pedro Almeida',
      avatar: null,
      initials: 'PA',
      isOnline: false,
      phone: '(11) 97777-7777',
      color: 'amber'
    },
    lastMessage: {
      text: 'Encerrada automaticamente após 24h de inatividade',
      sender: 'system',
      timestamp: '2026-03-21T10:20:00'
    },
    unreadCount: 0,
    status: 'closed',
    melHandling: false,
    tags: []
  },
  {
    id: 'conv-4',
    client: {
      id: 'cli-4',
      name: 'Ana Silva',
      avatar: null,
      initials: 'AS',
      isOnline: false,
      isAway: true,
      phone: '(11) 96666-6666',
      color: 'teal'
    },
    lastMessage: {
      text: 'Tem esse produto disponível para retirada amanhã?',
      sender: 'client',
      timestamp: '2026-03-21T09:15:00'
    },
    unreadCount: 0,
    status: 'pending',
    melHandling: false,
    tags: ['retirada']
  }
];
```

### 6.2 Mensagens

```typescript
const mockMessages = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    sender: 'client',
    content: 'Olá! Vi no Instagram que vocês vendem óculos de sol. Tem algum modelo para homens?',
    timestamp: '2026-03-21T14:28:00',
    status: 'read'
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    sender: 'bot',
    content: 'Olá! 👋 Que bom que você nos encontrou! Sim, temos vários modelos de óculos de sol masculino. Posso te mostrar alguns?',
    timestamp: '2026-03-21T14:29:00',
    quickReplies: ['Ver modelos', 'Preços', 'Forma de pagamento']
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    sender: 'client',
    content: 'Quero ver os modelos!',
    timestamp: '2026-03-21T14:30:00',
    status: 'read'
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    sender: 'bot',
    content: 'Aqui estão nossos modelos masculino mais vendidos! 🕶️',
    timestamp: '2026-03-21T14:31:00',
    attachments: [
      {
        type: 'product',
        product: {
          id: 'prod-1',
          name: 'Óculos Ray-Ban Aviator',
          description: 'Masculino • Preto • Vintage',
          price: 349.90,
          image: null
        }
      }
    ],
    quickReplies: ['Ver mais modelos', 'Comprar agora']
  },
  {
    id: 'msg-5',
    conversationId: 'conv-1',
    sender: 'client',
    content: 'Obrigada pela ajuda! Vou verificar o estoque.',
    timestamp: '2026-03-21T14:32:00',
    status: 'read'
  }
];
```

### 6.3 Configurações de Mensagens Automáticas

```typescript
const mockAutoMessages = [
  {
    id: 'auto-1',
    name: 'Saudação Inicial',
    content: 'Olá! 👋 Sou a MEL, sua assistente virtual. Como posso ajudar?',
    trigger: {
      type: 'greeting',
      conditions: ['horario_comercial']
    },
    quickReplies: ['Ver produtos', 'Meus pedidos', 'Agendar', 'Falar com atendente'],
    isActive: true,
    createdAt: '2026-01-15T00:00:00'
  },
  {
    id: 'auto-2',
    name: 'Fora do Horário',
    content: 'Olá! Agora estamos fora do horário de atendimento. Retornaremos às 9h. Você também pode deixar sua mensagem que responderemos assim que possível! 😊',
    trigger: {
      type: 'outside_hours',
      conditions: ['22:00-09:00']
    },
    isActive: true,
    createdAt: '2026-01-15T00:00:00'
  },
  {
    id: 'auto-3',
    name: 'Status do Pedido',
    content: 'Seu pedido está em preparo! Previsão de entrega: 15 minutos. 🚀',
    trigger: {
      type: 'keyword',
      conditions: ['pedido', 'entrega', 'rastrear']
    },
    quickReplies: ['Ver detalhes', 'Outra dúvida'],
    isActive: true,
    createdAt: '2026-01-20T00:00:00'
  }
];
```

### 6.4 FAQ

```typescript
const mockFAQ = [
  {
    id: 'faq-1',
    question: 'Qual o horário de funcionamento?',
    answer: 'Nosso horário de atendimento é de segunda a sexta, das 9h às 18h. Aos sábados, das 9h às 13h.',
    keywords: ['horário', 'funcionamento', 'aberto', 'fecha'],
    isActive: true
  },
  {
    id: 'faq-2',
    question: 'Como faço para rastrear meu pedido?',
    answer: 'Você pode rastrear seu pedido pelo link enviado por WhatsApp ou pelo nosso site na área "Meus Pedidos".',
    keywords: ['rastrear', 'pedido', 'onde está', 'entrega'],
    isActive: true
  },
  {
    id: 'faq-3',
    question: 'Vocês fazem delivery?',
    answer: 'Sim! Fazemos delivery para toda a região. O prazo e valor do frete variam de acordo com sua localização.',
    keywords: ['delivery', 'entrega', 'frete', 'casa'],
    isActive: true
  }
];
```

---

## 7. Estrutura de Arquivos

```
app/
├── chat/
│   ├── page.tsx                           # Redireciona para /conversas
│   ├── conversas/
│   │   └── page.tsx                      # Painel de conversas
│   ├── conversa/
│   │   └── [id]/
│   │       └── page.tsx                  # Janela de conversa específica
│   └── configuracoes/
│       └── page.tsx                      # Configuração do chatbot
│
├── components/
│   └── chat/
│       ├── ConversationsList.tsx         # Lista de conversas
│       ├── ConversationItem.tsx           # Item de conversa
│       ├── ConversationHeader.tsx        # Header do chat
│       ├── MessageBubble.tsx              # Balão de mensagem
│       ├── QuickReplies.tsx              # Respostas rápidas
│       ├── TypingIndicator.tsx          # Indicador de digitação
│       ├── MessageInput.tsx              # Input de mensagem
│       ├── ProductCard.tsx               # Card de produto
│       ├── AppointmentCard.tsx          # Card de agendamento
│       ├── DateSeparator.tsx            # Separador de data
│       ├── SystemMessage.tsx             # Mensagem de sistema
│       ├── ChatFilters.tsx               # Filtros
│       ├── ChatSearch.tsx                # Busca
│       ├── MELBadge.tsx                  # Badge MEL
│       ├── StatsCards.tsx                # Cards de estatísticas
│       ├── AutoMessageEditor.tsx        # Editor de mensagens auto
│       ├── FAQEditor.tsx                 # Editor de FAQ
│       ├── KeywordManager.tsx            # Gerenciador de palavras-chave
│       ├── BehaviorSettings.tsx          # Configurações de comportamento
│       └── index.ts                      # Export barrel
│
├── hooks/
│   ├── useConversations.ts
│   ├── useMessages.ts
│   ├── useTypingIndicator.ts
│   ├── useQuickReplies.ts
│   ├── useChatFilters.ts
│   ├── useChatSearch.ts
│   ├── useMELConfig.ts
│   └── useAutoMessages.ts
│
├── lib/
│   ├── utils/
│   │   ├── chatUtils.ts
│   │   ├── messageTypes.ts
│   │   └── chatColors.ts
│   └── mock/
│       ├── conversations.ts
│       ├── messages.ts
│       ├── autoMessages.ts
│       └── faq.ts
│
└── types/
    └── chat.ts                           # Tipos TypeScript
```

---

## 8. Tipos TypeScript

```typescript
// types/chat.ts

export type MessageSender = 'client' | 'bot' | 'system';
export type ConversationStatus = 'active' | 'pending' | 'closed';
export type MessageStatus = 'sent' | 'delivered' | 'read';
export type TriggerType = 'greeting' | 'keyword' | 'outside_hours' | 'manual';

// Interfaces principais
export interface Client {
  id: string;
  name: string;
  avatar: string | null;
  initials: string;
  isOnline: boolean;
  isAway?: boolean;
  phone: string;
  color: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  status?: MessageStatus;
  quickReplies?: string[];
  attachments?: Attachment[];
}

export interface Attachment {
  type: 'product' | 'appointment' | 'image' | 'document';
  product?: Product;
  appointment?: Appointment;
  imageUrl?: string;
  documentUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  professional?: string;
  location?: string;
}

export interface Conversation {
  id: string;
  client: Client;
  lastMessage: {
    text: string;
    sender: MessageSender;
    timestamp: string;
  };
  unreadCount: number;
  status: ConversationStatus;
  melHandling: boolean;
  tags: string[];
}

export interface AutoMessage {
  id: string;
  name: string;
  content: string;
  trigger: {
    type: TriggerType;
    conditions: string[];
  };
  quickReplies?: string[];
  isActive: boolean;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  isActive: boolean;
}

export interface KeywordMapping {
  id: string;
  keyword: string;
  autoMessageId: string;
  priority: number;
}

export interface ChatStats {
  autoMessagesCount: number;
  faqCount: number;
  keywordsCount: number;
  resolutionRate: number;
  resolutionRateChange: number;
  conversationsToday: number;
  onlineNow: number;
}
```

---

## 9. Regras de Negócio (Frontend)

### 9.1 Status de Conversas

```typescript
const conversationStatusStyles = {
  active: { 
    border: 'border-l-2 border-[#86cb92]',
    bg: 'bg-white/10',
    badge: null
  },
  pending: { 
    border: 'border-l-2 border-transparent',
    bg: 'hover:bg-white/5',
    badge: { text: 'Aguardando', color: 'amber' }
  },
  closed: { 
    border: 'border-l-2 border-transparent',
    bg: 'hover:bg-white/5 opacity-70',
    badge: { text: 'Encerrada', color: 'gray' }
  }
};
```

### 9.2 Indicadores Visuais MEL

- Badge 🤖 ao lado do nome do cliente indica que MEL está envolvida na conversa
- Mensagens de MEL têm avatar especial (ícone de raio)
- Quick Replies verdes (#86cb92)

### 9.3 Tipos de Mensagens

| Tipo | Origem | Estilo |
|------|--------|--------|
| `client` | Cliente | Bubble verde (direita) |
| `bot` | MEL/Chatbot | Bubble branco (esquerda) + avatar |
| `system` | Sistema | Centrado, badge especial |

### 9.4 Validações

- Mensagem não pode estar vazia
- Quick Replies máximo 4 por mensagem
- Timeout de typing indicator: 2-5 segundos (simulado)

---

## 10. Checklist de Implementação

### ✅ Componentes Core
- [ ] `ConversationsList` - Lista estilo WhatsApp
- [ ] `ConversationItem` - Item com avatar, status, preview
- [ ] `ConversationHeader` - Info cliente e ações
- [ ] `MessageBubble` - Balões user/bot
- [ ] `QuickReplies` - Botões de resposta rápida
- [ ] `TypingIndicator` - Animação de digitação
- [ ] `MessageInput` - Input com anexo e emoji
- [ ] `ProductCard` - Card de produto no chat
- [ ] `AppointmentCard` - Card de agendamento
- [ ] `DateSeparator` - Separador de data

### ✅ Páginas
- [ ] `/chat/conversas` - Painel de conversas
- [ ] `/chat/conversa/:id` - Janela de conversa
- [ ] `/chat/configuracoes` - Dashboard de configuração

### ✅ Estados
- [ ] Loading states com skeletons
- [ ] Empty states informativos
- [ ] Error states com retry
- [ ] Offline state visual

### ✅ Funcionalidades
- [ ] Lista de conversas ordenadas
- [ ] Busca de conversas
- [ ] Filtros (Todas, Não Lidas, Abertas)
- [ ] Envio de mensagens
- [ ] Quick Replies funcionais
- [ ] Anexo de imagens
- [ ] Indicador de digitação
- [ ] Badge MEL em conversas
- [ ] CRUD de mensagens automáticas
- [ ] Editor visual de mensagens
- [ ] FAQ com palavras-chave
- [ ] Toggle ativo/inativo

### ✅ Responsividade
- [ ] Desktop: Layout split-view completo
- [ ] Tablet: Sidebar colapsável
- [ ] Mobile: Layout empilhado

### ✅ Acessibilidade
- [ ] Navegação por teclado
- [ ] ARIA labels
- [ ] Contraste adequado
- [ ] Screen reader support

---

## 11. URLs das Telas

| Tela | Rota | Acesso |
|------|------|--------|
| Painel de Conversas | `/chat/conversas` | Admin |
| Conversa Específica | `/chat/conversa/:id` | Admin |
| Configurações | `/chat/configuracoes` | Admin |

---

## 12. Notas de Implementação

### 12.1 Prioridade de Desenvolvimento

1. **Alta:**
   - Layout split-view base
   - Lista de conversas
   - Mensagens e bubbles
   - Input de mensagem

2. **Média:**
   - Quick Replies
   - Cards de produto
   - Busca e filtros
   - Configurações básicas

3. **Baixa:**
   - Editor visual completo
   - FAQ manager
   - Estatísticas avançadas
   - Responsividade mobile

### 12.2 Integração com MEL

O painel de chatbot é o coração da experiência MEL:
- MEL envia mensagens proativas
- MEL sugere quick replies
- MEL detecta intenções
- Badge visual indica envolvimento MEL

### 12.3 Integrações Futuras (Backend)

- Supabase para persistência
- WhatsApp Business API
- WebSocket para tempo real
- NLP para detecção de intenção
- Machine Learning para respostas

---

## 13. Anexos

### 13.1 Comandos de Estrutura

```bash
# Criar estrutura de diretórios
mkdir -p app/chat/conversas
mkdir -p app/chat/conversa/[id]
mkdir -p app/chat/configuracoes
mkdir -p app/components/chat
mkdir -p app/hooks
mkdir -p app/lib/utils
mkdir -p app/lib/mock
mkdir -p app/types
```

### 13.2 Cores de Avatares (Aleatórias)

```typescript
const avatarColors = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-amber-400 to-amber-600',
  'from-teal-400 to-teal-600',
  'from-pink-400 to-pink-600',
  'from-indigo-400 to-indigo-600'
];
```

### 13.3 Referências Visuais

- Design inspirado no WhatsApp Web
- Cores MEL (#86cb92) para identidade
- Dark sidebar (#1f2937) para contraste
- Transições suaves (0.2s-0.3s)

---

**Fim do PRD**

*Documento criado em: 2026-03-21*  
*Baseado em: docs/ui/modulo-10-chatbot.md*  
*Contexto MEL: docs/ui/modulo-09-mel.md*  
*Referência: docs/ROADMAP.md - Sprint 10*
