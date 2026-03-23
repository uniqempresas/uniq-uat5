# Módulo 09: MEL - Assistente de Consultoria/IA

## 📋 Metadados

| Campo | Valor |
|-------|-------|
| **Código** | MOD-MEL-001 |
| **Nome** | MEL - Assistente de Consultoria/IA |
| **Versão** | 1.0.0 |
| **Status** | MUST HAVE - Diferencial Competitivo |
| **Prioridade** | P0 - Crítico |
| **Responsável** | UX/UI Team + AI Team |
| **Data Criação** | 2025-01-15 |
| **Última Atualização** | 2025-01-15 |

---

## 🎨 Design System MEL

> 🎨 **DESIGN COMMITMENT:**
> - **Geometry:** Bordas arredondadas (16-24px) para visual amigável e conversacional
> - **Typography:** Inter (moderna, legível) para toda a interface
> - **Palette:** Emerald (#86cb92) primário - identidade da MEL + Jet Black (#1f2937) para textos
> - **Effects/Motion:** Transições suaves (0.2s-0.3s), sombras sutis, animação de digitação (typing dots)
> - **Layout uniqueness:** Interface chat-first com widget flutuante persistente

### Identidade Visual MEL

```css
/* Variáveis CSS - MEL Theme */
:root {
  /* Cores Primárias */
  --mel-emerald: #86cb92;
  --mel-emerald-light: #a8e0b0;
  --mel-emerald-dark: #5fb86e;
  
  /* Cores de Fundo */
  --mel-bg-chat: #f9fafb;
  --mel-bg-user: #86cb92;
  --mel-bg-ai: #ffffff;
  
  /* Cores de Texto */
  --mel-text-primary: #1f2937;
  --mel-text-secondary: #627271;
  --mel-text-user: #ffffff;
  
  /* Estados */
  --mel-typing-dot: #86cb92;
  --mel-loading: rgba(134, 203, 146, 0.3);
  
  /* Widget Flutuante */
  --mel-widget-shadow: 0 8px 32px rgba(134, 203, 146, 0.3);
  --mel-widget-size: 60px;
}
```

### Tipografia MEL

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Mensagem Usuário | Inter | 15px | 400 | #ffffff |
| Mensagem MEL | Inter | 15px | 400 | #1f2937 |
| Timestamp | Inter | 12px | 400 | #627271 |
| Sugestões | Inter | 13px | 500 | #86cb92 |
| Títulos Seções | Inter | 18px | 600 | #1f2937 |
| Headers Cards | Inter | 16px | 600 | #1f2937 |

### Componentes Base MEL

```html
<!-- Balão de Mensagem - Usuário -->
<div class="mel-message-user">
  <div class="flex justify-end mb-4">
    <div class="max-w-[80%] bg-[#86cb92] text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
      <p class="text-[15px] leading-relaxed">Mensagem do usuário</p>
      <span class="text-[11px] opacity-80 mt-1 block text-right">14:32</span>
    </div>
  </div>
</div>

<!-- Balão de Mensagem - MEL -->
<div class="mel-message-ai">
  <div class="flex items-start gap-3 mb-4">
    <div class="w-8 h-8 rounded-full bg-[#86cb92] flex items-center justify-center flex-shrink-0">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </div>
    <div class="max-w-[80%] bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#e5e7eb]">
      <p class="text-[15px] leading-relaxed text-[#1f2937]">Resposta da MEL</p>
      <span class="text-[11px] text-[#627271] mt-1 block">14:32</span>
    </div>
  </div>
</div>

<!-- Indicador de Digitação -->
<div class="mel-typing-indicator">
  <div class="flex items-center gap-3 mb-4">
    <div class="w-8 h-8 rounded-full bg-[#86cb92] flex items-center justify-center flex-shrink-0">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </div>
    <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#e5e7eb]">
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce" style="animation-delay: 0ms"></div>
        <div class="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce" style="animation-delay: 150ms"></div>
        <div class="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce" style="animation-delay: 300ms"></div>
      </div>
    </div>
  </div>
</div>

<!-- Sugestões Rápidas -->
<div class="mel-suggestions">
  <div class="flex flex-wrap gap-2 px-4">
    <button class="px-4 py-2 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium hover:bg-[#86cb92]/20 transition-all border border-[#86cb92]/30">
      Como estão minhas vendas hoje?
    </button>
    <button class="px-4 py-2 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium hover:bg-[#86cb92]/20 transition-all border border-[#86cb92]/30">
      Gere relatório semanal
    </button>
    <button class="px-4 py-2 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium hover:bg-[#86cb92]/20 transition-all border border-[#86cb92]/30">
      Alertas importantes
    </button>
  </div>
</div>
```

---

## 📱 Tela 1: Chat Principal (/mel)

### 1.1 Estrutura da Página

```html
<!-- ========================================================= -->
<!-- TELA 1: CHAT COM MEL - Interface Conversacional           -->
<!-- ========================================================= -->
<div class="mel-chat-page min-h-screen bg-[#f9fafb] flex flex-col">
  
  <!-- Header do Chat -->
  <header class="bg-white border-b border-[#e5e7eb] px-4 py-3 sticky top-0 z-20">
    <div class="flex items-center justify-between max-w-4xl mx-auto">
      <!-- Avatar e Info MEL -->
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#86cb92] border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h1 class="text-[16px] font-semibold text-[#1f2937]">MEL</h1>
          <p class="text-[12px] text-[#627271] flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-[#86cb92] rounded-full animate-pulse"></span>
            Online agora
          </p>
        </div>
      </div>
      
      <!-- Ações do Header -->
      <div class="flex items-center gap-2">
        <button class="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors" title="Histórico">
          <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </button>
        <button class="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors" title="Configurações">
          <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
        <div class="h-6 w-px bg-[#e5e7eb] mx-1"></div>
        <button class="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors">
          <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Área de Mensagens -->
  <main class="flex-1 overflow-y-auto p-4" id="chat-messages">
    <div class="max-w-4xl mx-auto space-y-4">
      
      <!-- Data Separator -->
      <div class="flex items-center justify-center my-6">
        <span class="text-[12px] text-[#627271] bg-[#efefef] px-3 py-1 rounded-full">Hoje</span>
      </div>
      
      <!-- Mensagem de Boas-vindas (Day 0) -->
      <div class="mel-message-ai">
        <div class="flex items-start gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-[#e5e7eb]">
            <p class="text-[15px] leading-relaxed text-[#1f2937] mb-3">
              👋 Olá! Eu sou a <strong class="text-[#86cb92]">MEL</strong>, sua consultora de negócios virtual.
            </p>
            <p class="text-[15px] leading-relaxed text-[#1f2937] mb-3">
              Estou aqui para ajudar você a tomar decisões mais inteligentes baseadas nos dados da sua empresa. Posso:
            </p>
            <ul class="text-[15px] leading-relaxed text-[#1f2937] mb-3 space-y-1 ml-4">
              <li>📊 Analisar suas vendas e indicadores</li>
              <li>📧 Enviar relatórios proativos</li>
              <li>⚡ Alertar sobre oportunidades e riscos</li>
              <li>💡 Dar sugestões personalizadas</li>
            </ul>
            <p class="text-[15px] leading-relaxed text-[#1f2937]">
              Como posso ajudar você hoje? 😊
            </p>
            <span class="text-[11px] text-[#627271] mt-2 block">09:00</span>
          </div>
        </div>
      </div>
      
      <!-- Sugestões Iniciais -->
      <div class="mel-suggestions pl-14">
        <div class="flex flex-wrap gap-2 mb-6">
          <button class="suggestion-chip px-4 py-2.5 bg-white text-[#3e5653] rounded-full text-[13px] font-medium hover:bg-[#86cb92] hover:text-white transition-all border border-[#e5e7eb] shadow-sm">
            📈 Como estão minhas vendas este mês?
          </button>
          <button class="suggestion-chip px-4 py-2.5 bg-white text-[#3e5653] rounded-full text-[13px] font-medium hover:bg-[#86cb92] hover:text-white transition-all border border-[#e5e7eb] shadow-sm">
            🔔 Me mostre alertas importantes
          </button>
          <button class="suggestion-chip px-4 py-2.5 bg-white text-[#3e5653] rounded-full text-[13px] font-medium hover:bg-[#86cb92] hover:text-white transition-all border border-[#e5e7eb] shadow-sm">
            📊 Gerar relatório de performance
          </button>
          <button class="suggestion-chip px-4 py-2.5 bg-white text-[#3e5653] rounded-full text-[13px] font-medium hover:bg-[#86cb92] hover:text-white transition-all border border-[#e5e7eb] shadow-sm">
            💡 O que posso fazer para aumentar vendas?
          </button>
        </div>
      </div>
      
      <!-- Exemplo: Mensagem Usuário -->
      <div class="mel-message-user">
        <div class="flex justify-end mb-4">
          <div class="max-w-[85%] bg-gradient-to-r from-[#86cb92] to-[#5fb86e] text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-md">
            <p class="text-[15px] leading-relaxed">Como estão minhas vendas este mês?</p>
            <div class="flex items-center justify-end gap-1 mt-1">
              <span class="text-[11px] opacity-90">09:05</span>
              <svg class="w-4 h-4 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Exemplo: Resposta MEL com Card de Insight -->
      <div class="mel-message-ai">
        <div class="flex items-start gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="max-w-[90%] space-y-3">
            <!-- Mensagem Texto -->
            <div class="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-[#e5e7eb]">
              <p class="text-[15px] leading-relaxed text-[#1f2937] mb-3">
                📊 Aqui está o resumo das suas vendas de <strong>janeiro/2026</strong>:
              </p>
              <span class="text-[11px] text-[#627271] block">09:06</span>
            </div>
            
            <!-- Card de Insight -->
            <div class="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
              <div class="bg-gradient-to-r from-[#86cb92]/10 to-transparent px-4 py-3 border-b border-[#e5e7eb]">
                <h3 class="text-[14px] font-semibold text-[#1f2937] flex items-center gap-2">
                  <svg class="w-4 h-4 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  Resumo de Vendas
                </h3>
              </div>
              <div class="p-4">
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="text-center p-3 bg-[#f9fafb] rounded-lg">
                    <p class="text-[24px] font-bold text-[#86cb92]">R$ 47.850</p>
                    <p class="text-[12px] text-[#627271]">Total Vendido</p>
                  </div>
                  <div class="text-center p-3 bg-[#f9fafb] rounded-lg">
                    <p class="text-[24px] font-bold text-[#1f2937]">156</p>
                    <p class="text-[12px] text-[#627271]">Pedidos</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-[13px]">
                  <span class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                    +23%
                  </span>
                  <span class="text-[#627271]">vs. dezembro/2025</span>
                </div>
              </div>
              <div class="px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb] flex gap-2">
                <button class="flex-1 py-2 bg-[#86cb92] text-white rounded-lg text-[13px] font-medium hover:bg-[#5fb86e] transition-colors">
                  Ver Detalhes
                </button>
                <button class="flex-1 py-2 bg-white text-[#3e5653] border border-[#e5e7eb] rounded-lg text-[13px] font-medium hover:bg-[#f3f4f6] transition-colors">
                  Exportar PDF
                </button>
              </div>
            </div>
            
            <!-- Sugestão de Follow-up -->
            <div class="flex items-center gap-2">
              <span class="text-[12px] text-[#627271]">Sugerido:</span>
              <button class="px-3 py-1.5 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[12px] hover:bg-[#86cb92]/20 transition-colors">
                Comparar com ano anterior
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Estado: Typing -->
      <div class="mel-typing-indicator">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-[#e5e7eb] min-w-[80px]">
            <div class="flex items-center gap-1.5">
              <div class="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </main>

  <!-- Área de Input -->
  <footer class="bg-white border-t border-[#e5e7eb] px-4 py-4 sticky bottom-0 z-20">
    <div class="max-w-4xl mx-auto">
      <!-- Quick Actions -->
      <div class="flex items-center gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
        <button class="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3f4f6] text-[#627271] rounded-full text-[12px] whitespace-nowrap hover:bg-[#86cb92]/10 hover:text-[#86cb92] transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Relatórios
        </button>
        <button class="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3f4f6] text-[#627271] rounded-full text-[12px] whitespace-nowrap hover:bg-[#86cb92]/10 hover:text-[#86cb92] transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Vendas
        </button>
        <button class="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3f4f6] text-[#627271] rounded-full text-[12px] whitespace-nowrap hover:bg-[#86cb92]/10 hover:text-[#86cb92] transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Clientes
        </button>
        <button class="flex items-center gap-1.5 px-3 py-1.5 bg-[#f3f4f6] text-[#627271] rounded-full text-[12px] whitespace-nowrap hover:bg-[#86cb92]/10 hover:text-[#86cb92] transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Alertas
        </button>
      </div>
      
      <!-- Input Principal -->
      <div class="flex items-end gap-3">
        <button class="p-3 hover:bg-[#f3f4f6] rounded-full transition-colors flex-shrink-0" title="Anexar arquivo">
          <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
          </svg>
        </button>
        
        <div class="flex-1 relative">
          <textarea 
            class="w-full px-4 py-3 pr-12 bg-[#f3f4f6] border-0 rounded-2xl resize-none text-[15px] text-[#1f2937] placeholder-[#627271] focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50 transition-all"
            rows="1"
            placeholder="Digite sua pergunta para a MEL..."
            style="min-height: 48px; max-height: 120px;"
          ></textarea>
          <button class="absolute right-3 bottom-3 p-1.5 hover:bg-[#e5e7eb] rounded-lg transition-colors" title="Emoji">
            <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>
        </div>
        
        <button class="p-3 bg-[#86cb92] hover:bg-[#5fb86e] rounded-full transition-colors shadow-md flex-shrink-0" title="Enviar">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
      <p class="text-[11px] text-[#627271] mt-2 text-center">
        A MEL pode cometer erros. Considere verificar informações importantes.
      </p>
    </div>
  </footer>
</div>
```

### 1.2 Variações de Mensagens

#### Mensagem com Tabela
```html
<!-- Mensagem MEL com Tabela de Dados -->
<div class="mel-message-table">
  <div class="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden mt-3">
    <div class="overflow-x-auto">
      <table class="w-full text-[13px]">
        <thead class="bg-[#f9fafb]">
          <tr>
            <th class="px-4 py-2 text-left font-medium text-[#627271]">Produto</th>
            <th class="px-4 py-2 text-right font-medium text-[#627271]">Qtd</th>
            <th class="px-4 py-2 text-right font-medium text-[#627271]">Total</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#e5e7eb]">
          <tr>
            <td class="px-4 py-2 text-[#1f2937]">Produto A</td>
            <td class="px-4 py-2 text-right text-[#1f2937]">45</td>
            <td class="px-4 py-2 text-right font-medium text-[#86cb92]">R$ 12.450</td>
          </tr>
          <tr>
            <td class="px-4 py-2 text-[#1f2937]">Produto B</td>
            <td class="px-4 py-2 text-right text-[#1f2937]">32</td>
            <td class="px-4 py-2 text-right font-medium text-[#86cb92]">R$ 8.960</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

#### Mensagem com Gráfico
```html
<!-- Mensagem MEL com Mini Gráfico -->
<div class="mel-message-chart">
  <div class="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-4 mt-3">
    <h4 class="text-[13px] font-medium text-[#627271] mb-3">Tendência de Vendas</h4>
    <div class="h-32 flex items-end gap-2">
      <div class="flex-1 bg-[#86cb92]/30 rounded-t" style="height: 40%"></div>
      <div class="flex-1 bg-[#86cb92]/40 rounded-t" style="height: 55%"></div>
      <div class="flex-1 bg-[#86cb92]/50 rounded-t" style="height: 45%"></div>
      <div class="flex-1 bg-[#86cb92]/60 rounded-t" style="height: 70%"></div>
      <div class="flex-1 bg-[#86cb92]/70 rounded-t" style="height: 60%"></div>
      <div class="flex-1 bg-[#86cb92] rounded-t" style="height: 85%"></div>
      <div class="flex-1 bg-[#86cb92] rounded-t" style="height: 100%"></div>
    </div>
    <div class="flex justify-between mt-2 text-[11px] text-[#627271]">
      <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
    </div>
  </div>
</div>
```

#### Mensagem com Lista de Ações
```html
<!-- Mensagem MEL com Lista de Ações -->
<div class="mel-message-actions">
  <div class="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden mt-3">
    <div class="p-4 border-b border-[#e5e7eb]">
      <p class="text-[14px] text-[#1f2937]">Aqui estão as ações recomendadas:</p>
    </div>
    <div class="divide-y divide-[#e5e7eb]">
      <button class="w-full px-4 py-3 flex items-center justify-between hover:bg-[#f9fafb] transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-[#86cb92]/10 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </div>
          <div class="text-left">
            <p class="text-[13px] font-medium text-[#1f2937]">Adicionar produto ao estoque</p>
            <p class="text-[11px] text-[#627271]">Produto A está com baixo estoque</p>
          </div>
        </div>
        <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      <button class="w-full px-4 py-3 flex items-center justify-between hover:bg-[#f9fafb] transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
          </div>
          <div class="text-left">
            <p class="text-[13px] font-medium text-[#1f2937]">Configurar alerta de estoque</p>
            <p class="text-[11px] text-[#627271]">Receber notificações automáticas</p>
          </div>
        </div>
        <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## 📊 Tela 2: Relatórios Proativos (/mel/relatorios)

### 2.1 Estrutura da Página

```html
<!-- ========================================================= -->
<!-- TELA 2: RELATÓRIOS PROATIVOS MEL                          -->
<!-- ========================================================= -->
<div class="mel-reports-page min-h-screen bg-[#f9fafb]">
  
  <!-- Header -->
  <header class="bg-white border-b border-[#e5e7eb] px-6 py-4">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-[20px] font-semibold text-[#1f2937]">Relatórios Proativos</h1>
            <p class="text-[14px] text-[#627271]">Gerencie relatórios automáticos enviados pela MEL</p>
          </div>
        </div>
        <button class="px-4 py-2 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-lg font-medium transition-colors flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Novo Agendamento
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-6 py-6">
    
    <!-- Tabs -->
    <div class="flex items-center gap-1 mb-6 bg-white p-1 rounded-xl border border-[#e5e7eb] w-fit">
      <button class="px-4 py-2 bg-[#86cb92] text-white rounded-lg text-[14px] font-medium transition-all">
        Agendados
      </button>
      <button class="px-4 py-2 text-[#627271] hover:text-[#1f2937] rounded-lg text-[14px] font-medium transition-all">
        Histórico
      </button>
      <button class="px-4 py-2 text-[#627271] hover:text-[#1f2937] rounded-lg text-[14px] font-medium transition-all">
        Templates
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 border border-[#e5e7eb]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] text-[#627271] uppercase font-medium">Relatórios Ativos</span>
          <div class="w-8 h-8 bg-[#86cb92]/10 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-[28px] font-bold text-[#1f2937]">5</p>
        <p class="text-[12px] text-[#627271]">Agendamentos ativos</p>
      </div>
      
      <div class="bg-white rounded-xl p-4 border border-[#e5e7eb]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] text-[#627271] uppercase font-medium">Enviados (Mês)</span>
          <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </div>
        </div>
        <p class="text-[28px] font-bold text-[#1f2937]">23</p>
        <p class="text-[12px] text-green-600 flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
          +15% vs mês anterior
        </p>
      </div>
      
      <div class="bg-white rounded-xl p-4 border border-[#e5e7eb]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] text-[#627271] uppercase font-medium">Taxa de Abertura</span>
          <div class="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
        </div>
        <p class="text-[28px] font-bold text-[#1f2937]">87%</p>
        <p class="text-[12px] text-[#627271]">Média de leitura</p>
      </div>
      
      <div class="bg-white rounded-xl p-4 border border-[#e5e7eb]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[12px] text-[#627271] uppercase font-medium">Próximo Envio</span>
          <div class="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <p class="text-[20px] font-bold text-[#1f2937]">Amanhã</p>
        <p class="text-[12px] text-[#627271]">09:00 - Resumo Diário</p>
      </div>
    </div>

    <!-- Lista de Relatórios Agendados -->
    <div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
      <div class="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
        <h2 class="text-[16px] font-semibold text-[#1f2937]">Relatórios Agendados</h2>
        <div class="flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Buscar relatório..."
            class="px-3 py-1.5 border border-[#e5e7eb] rounded-lg text-[13px] w-48 focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50"
          >
          <button class="p-1.5 hover:bg-[#f3f4f6] rounded-lg transition-colors">
            <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="divide-y divide-[#e5e7eb]">
        <!-- Item 1: Ativo -->
        <div class="px-6 py-4 hover:bg-[#f9fafb] transition-colors group">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-[#86cb92]/10 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-[14px] font-semibold text-[#1f2937]">Resumo Diário de Vendas</h3>
                <p class="text-[12px] text-[#627271]">Todos os dias às 09:00 • WhatsApp + E-mail</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-medium">
                Ativo
              </span>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors" title="Editar">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors" title="Pausar">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
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
        
        <!-- Item 2: Ativo -->
        <div class="px-6 py-4 hover:bg-[#f9fafb] transition-colors group">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-[14px] font-semibold text-[#1f2937]">Relatório Semanal de Performance</h3>
                <p class="text-[12px] text-[#627271]">Toda segunda às 08:00 • E-mail</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-[11px] font-medium">
                Ativo
              </span>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
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
        
        <!-- Item 3: Pausado -->
        <div class="px-6 py-4 hover:bg-[#f9fafb] transition-colors group bg-[#f9fafb]/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-[14px] font-semibold text-[#627271]">Alerta de Estoque Baixo</h3>
                <p class="text-[12px] text-[#627271]">Quando estoque < 10 • WhatsApp</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium">
                Pausado
              </span>
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button class="p-2 hover:bg-[#86cb92]/10 rounded-lg transition-colors" title="Retomar">
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

    <!-- Templates de Relatórios -->
    <div class="mt-6">
      <h2 class="text-[16px] font-semibold text-[#1f2937] mb-4">Templates Disponíveis</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl p-4 border border-[#e5e7eb] hover:border-[#86cb92] hover:shadow-md transition-all cursor-pointer group">
          <div class="w-10 h-10 bg-[#86cb92]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#86cb92] transition-colors">
            <svg class="w-5 h-5 text-[#86cb92] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
          <h3 class="text-[14px] font-semibold text-[#1f2937] mb-1">Análise de Vendas</h3>
          <p class="text-[12px] text-[#627271]">Faturamento, produtos mais vendidos, tendências</p>
        </div>
        
        <div class="bg-white rounded-xl p-4 border border-[#e5e7eb] hover:border-[#86cb92] hover:shadow-md transition-all cursor-pointer group">
          <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors">
            <svg class="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-[14px] font-semibold text-[#1f2937] mb-1">Comportamento de Clientes</h3>
          <p class="text-[12px] text-[#627271]">Novos clientes, recorrência, satisfação</p>
        </div>
        
        <div class="bg-white rounded-xl p-4 border border-[#e5e7eb] hover:border-[#86cb92] hover:shadow-md transition-all cursor-pointer group">
          <div class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-500 transition-colors">
            <svg class="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h3 class="text-[14px] font-semibold text-[#1f2937] mb-1">Estoque e Produtos</h3>
          <p class="text-[12px] text-[#627271]">Giro de estoque, produtos em baixa, recompra</p>
        </div>
      </div>
    </div>
  </main>
</div>
```

---

## ⚙️ Tela 3: Configurações MEL (/mel/dashboard)

### 3.1 Estrutura da Página

```html
<!-- ========================================================= -->
<!-- TELA 3: DASHBOARD E CONFIGURAÇÕES MEL                     -->
<!-- ========================================================= -->
<div class="mel-dashboard-page min-h-screen bg-[#f9fafb]">
  
  <!-- Header -->
  <header class="bg-white border-b border-[#e5e7eb] px-6 py-4">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-[20px] font-semibold text-[#1f2937]">Configurações da MEL</h1>
            <p class="text-[14px] text-[#627271]">Personalize como a MEL interage com você</p>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-6 py-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Coluna Esquerda: Perfil e Status -->
      <div class="space-y-6">
        <!-- Card de Perfil MEL -->
        <div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
          <div class="bg-gradient-to-br from-[#86cb92] to-[#5fb86e] p-6 text-center">
            <div class="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg class="w-10 h-10 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h2 class="text-[18px] font-semibold text-white">MEL</h2>
            <p class="text-[13px] text-white/80">Sua Consultora de Negócios</p>
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-[13px] text-[#627271]">Status</span>
              <span class="flex items-center gap-1.5 text-[13px] text-green-600 font-medium">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Ativa
              </span>
            </div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-[13px] text-[#627271]">Versão</span>
              <span class="text-[13px] text-[#1f2937]">v2.1.0</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[13px] text-[#627271]">Desde</span>
              <span class="text-[13px] text-[#1f2937]">15 Jan, 2026</span>
            </div>
          </div>
        </div>

        <!-- Estatísticas de Uso -->
        <div class="bg-white rounded-xl p-4 border border-[#e5e7eb]">
          <h3 class="text-[14px] font-semibold text-[#1f2937] mb-4">Seu Uso da MEL</h3>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] text-[#627271]">Perguntas Respondidas</span>
                <span class="text-[12px] font-medium text-[#1f2937]">127</span>
              </div>
              <div class="h-2 bg-[#efefef] rounded-full overflow-hidden">
                <div class="h-full w-[75%] bg-[#86cb92] rounded-full"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] text-[#627271]">Relatórios Gerados</span>
                <span class="text-[12px] font-medium text-[#1f2937]">34</span>
              </div>
              <div class="h-2 bg-[#efefef] rounded-full overflow-hidden">
                <div class="h-full w-[45%] bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] text-[#627271]">Insights Recebidos</span>
                <span class="text-[12px] font-medium text-[#1f2937]">18</span>
              </div>
              <div class="h-2 bg-[#efefef] rounded-full overflow-hidden">
                <div class="h-full w-[30%] bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Coluna Central: Preferências -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Preferências de Notificação -->
        <div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
          <div class="px-6 py-4 border-b border-[#e5e7eb]">
            <h3 class="text-[16px] font-semibold text-[#1f2937]">Canais de Comunicação</h3>
            <p class="text-[13px] text-[#627271]">Escolha como a MEL pode entrar em contato</p>
          </div>
          <div class="p-6 space-y-4">
            <!-- WhatsApp -->
            <div class="flex items-center justify-between p-4 bg-[#f9fafb] rounded-xl">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-[14px] font-medium text-[#1f2937]">WhatsApp</p>
                  <p class="text-[12px] text-[#627271]">+55 (11) 98765-4321</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#86cb92]"></div>
              </label>
            </div>
            
            <!-- Email -->
            <div class="flex items-center justify-between p-4 bg-[#f9fafb] rounded-xl">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-[14px] font-medium text-[#1f2937]">E-mail</p>
                  <p class="text-[12px] text-[#627271]">admin@empresa.com</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#86cb92]"></div>
              </label>
            </div>
            
            <!-- Notificações Push -->
            <div class="flex items-center justify-between p-4 bg-[#f9fafb] rounded-xl">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                  </svg>
                </div>
                <div>
                  <p class="text-[14px] font-medium text-[#1f2937]">Notificações no App</p>
                  <p class="text-[12px] text-[#627271]">Alertas dentro da plataforma</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#86cb92]"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Preferências de Frequência -->
        <div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
          <div class="px-6 py-4 border-b border-[#e5e7eb]">
            <h3 class="text-[16px] font-semibold text-[#1f2937]">Frequência de Contato</h3>
            <p class="text-[13px] text-[#627271]">Quão frequente você deseja receber mensagens da MEL</p>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-3 gap-3">
              <label class="cursor-pointer">
                <input type="radio" name="frequency" value="low" class="sr-only peer">
                <div class="p-4 border-2 border-[#e5e7eb] rounded-xl text-center peer-checked:border-[#86cb92] peer-checked:bg-[#86cb92]/5 hover:border-[#86cb92]/50 transition-all">
                  <div class="w-8 h-8 mx-auto mb-2 text-[#627271] peer-checked:text-[#86cb92]">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p class="text-[13px] font-medium text-[#1f2937]">Mínima</p>
                  <p class="text-[11px] text-[#627271]">Apenas alertas importantes</p>
                </div>
              </label>
              
              <label class="cursor-pointer">
                <input type="radio" name="frequency" value="medium" checked class="sr-only peer">
                <div class="p-4 border-2 border-[#e5e7eb] rounded-xl text-center peer-checked:border-[#86cb92] peer-checked:bg-[#86cb92]/5 hover:border-[#86cb92]/50 transition-all">
                  <div class="w-8 h-8 mx-auto mb-2 text-[#627271] peer-checked:text-[#86cb92]">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p class="text-[13px] font-medium text-[#1f2937]">Equilibrada</p>
                  <p class="text-[11px] text-[#627271]">Relatórios diários + alertas</p>
                </div>
              </label>
              
              <label class="cursor-pointer">
                <input type="radio" name="frequency" value="high" class="sr-only peer">
                <div class="p-4 border-2 border-[#e5e7eb] rounded-xl text-center peer-checked:border-[#86cb92] peer-checked:bg-[#86cb92]/5 hover:border-[#86cb92]/50 transition-all">
                  <div class="w-8 h-8 mx-auto mb-2 text-[#627271] peer-checked:text-[#86cb92]">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p class="text-[13px] font-medium text-[#1f2937]">Proativa</p>
                  <p class="text-[11px] text-[#627271]">Máximo de insights</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Tópicos de Interesse -->
        <div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
          <div class="px-6 py-4 border-b border-[#e5e7eb]">
            <h3 class="text-[16px] font-semibold text-[#1f2937]">Tópicos de Interesse</h3>
            <p class="text-[13px] text-[#627271]">Escolha sobre quais assuntos a MEL deve focar</p>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-3">
              <label class="flex items-center gap-3 p-3 border border-[#e5e7eb] rounded-xl cursor-pointer hover:border-[#86cb92]/50 transition-colors">
                <input type="checkbox" checked class="w-4 h-4 text-[#86cb92] border-gray-300 rounded focus:ring-[#86cb92]">
                <div>
                  <p class="text-[13px] font-medium text-[#1f2937]">Vendas</p>
                  <p class="text-[11px] text-[#627271]">Faturamento, pedidos</p>
                </div>
              </label>
              <label class="flex items-center gap-3 p-3 border border-[#e5e7eb] rounded-xl cursor-pointer hover:border-[#86cb92]/50 transition-colors">
                <input type="checkbox" checked class="w-4 h-4 text-[#86cb92] border-gray-300 rounded focus:ring-[#86cb92]">
                <div>
                  <p class="text-[13px] font-medium text-[#1f2937]">Clientes</p>
                  <p class="text-[11px] text-[#627271]">Novos, recorrência</p>
                </div>
              </label>
              <label class="flex items-center gap-3 p-3 border border-[#e5e7eb] rounded-xl cursor-pointer hover:border-[#86cb92]/50 transition-colors">
                <input type="checkbox" checked class="w-4 h-4 text-[#86cb92] border-gray-300 rounded focus:ring-[#86cb92]">
                <div>
                  <p class="text-[13px] font-medium text-[#1f2937]">Estoque</p>
                  <p class="text-[11px] text-[#627271]">Produtos, alertas</p>
                </div>
              </label>
              <label class="flex items-center gap-3 p-3 border border-[#e5e7eb] rounded-xl cursor-pointer hover:border-[#86cb92]/50 transition-colors">
                <input type="checkbox" class="w-4 h-4 text-[#86cb92] border-gray-300 rounded focus:ring-[#86cb92]">
                <div>
                  <p class="text-[13px] font-medium text-[#1f2937]">Financeiro</p>
                  <p class="text-[11px] text-[#627271]">Contas, fluxo</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Horário de Silêncio -->
        <div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
          <div class="px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
            <div>
              <h3 class="text-[16px] font-semibold text-[#1f2937]">Horário de Silêncio</h3>
              <p class="text-[13px] text-[#627271]">A MEL não enviará notificações neste período</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#86cb92]"></div>
            </label>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="text-[12px] text-[#627271] block mb-1">Início</label>
                <input type="time" value="22:00" class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50">
              </div>
              <div class="text-[#627271] pt-6">até</div>
              <div class="flex-1">
                <label class="text-[12px] text-[#627271] block mb-1">Fim</label>
                <input type="time" value="08:00" class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</div>
```

---

## 🤖 Tela 4: Widget Flutuante MEL

### 4.1 Estrutura do Widget

```html
<!-- ========================================================= -->
<!-- TELA 4: WIDGET FLUTUANTE MEL                              -->
<!-- ========================================================= -->

<!-- Widget Fechado -->
<div class="mel-widget-closed fixed bottom-6 right-6 z-50">
  <button class="w-14 h-14 bg-gradient-to-br from-[#86cb92] to-[#5fb86e] rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center group relative">
    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
    
    <!-- Badge de Notificação -->
    <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
      3
    </span>
    
    <!-- Tooltip -->
    <span class="absolute right-full mr-3 px-3 py-1.5 bg-[#1f2937] text-white text-[12px] rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      Falar com MEL
    </span>
  </button>
</div>

<!-- Widget Aberto -->
<div class="mel-widget-open fixed bottom-6 right-6 z-50 w-96">
  <div class="bg-white rounded-2xl shadow-2xl border border-[#e5e7eb] overflow-hidden">
    
    <!-- Header do Widget -->
    <div class="bg-gradient-to-r from-[#86cb92] to-[#5fb86e] px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-[15px] font-semibold text-white">MEL</h3>
          <p class="text-[12px] text-white/80 flex items-center gap-1">
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            Online
          </p>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <button class="p-2 hover:bg-white/20 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
          </svg>
        </button>
        <button class="p-2 hover:bg-white/20 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Área de Mensagens (Compacta) -->
    <div class="h-80 overflow-y-auto p-4 bg-[#f9fafb]">
      
      <!-- Mensagem de Boas-vindas -->
      <div class="flex items-start gap-2 mb-3">
        <div class="w-7 h-7 rounded-full bg-[#86cb92] flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <div class="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm border border-[#e5e7eb] max-w-[80%]">
          <p class="text-[13px] text-[#1f2937]">Olá! 👋 Posso ajudar com algo?</p>
        </div>
      </div>
      
      <!-- Insight Proativo -->
      <div class="mel-widget-insight bg-gradient-to-r from-[#86cb92]/10 to-blue-50 rounded-xl p-3 mb-3 border border-[#86cb92]/20">
        <div class="flex items-start gap-2">
          <div class="w-6 h-6 bg-[#86cb92] rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-[12px] font-medium text-[#1f2937] mb-1">💡 Insight do Dia</p>
            <p class="text-[12px] text-[#627271] leading-relaxed">
              Suas vendas estão 15% acima da média. Ótimo momento para campanha de marketing!
            </p>
            <button class="mt-2 text-[11px] text-[#86cb92] font-medium hover:underline">
              Saiba mais →
            </button>
          </div>
        </div>
      </div>
      
      <!-- Sugestões Rápidas -->
      <div class="flex flex-wrap gap-2 mb-3">
        <button class="px-3 py-1.5 bg-white text-[#86cb92] rounded-full text-[11px] border border-[#86cb92]/30 hover:bg-[#86cb92]/10 transition-colors">
          📊 Vendas hoje
        </button>
        <button class="px-3 py-1.5 bg-white text-[#86cb92] rounded-full text-[11px] border border-[#86cb92]/30 hover:bg-[#86cb92]/10 transition-colors">
          🔔 Ver alertas
        </button>
      </div>
      
    </div>

    <!-- Input do Widget -->
    <div class="p-3 bg-white border-t border-[#e5e7eb]">
      <div class="flex items-center gap-2">
        <input 
          type="text" 
          placeholder="Digite sua pergunta..."
          class="flex-1 px-3 py-2 bg-[#f3f4f6] border-0 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50"
        >
        <button class="p-2 bg-[#86cb92] hover:bg-[#5fb86e] rounded-full transition-colors">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-3 py-2 bg-[#f9fafb] border-t border-[#e5e7eb] flex items-center justify-center">
      <a href="/mel" class="text-[11px] text-[#627271] hover:text-[#86cb92] transition-colors flex items-center gap-1">
        Abrir chat completo
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </svg>
      </a>
    </div>
  </div>
</div>
```

---

## 🚀 Tela 5: Onboarding Guiado (Day 0-7)

### 5.1 Estrutura do Onboarding

```html
<!-- ========================================================= -->
<!-- TELA 5: ONBOARDING GUIADO MEL                             -->
<!-- ========================================================= -->
<div class="mel-onboarding-page min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#86cb92]/10">
  
  <!-- Progress Header -->
  <header class="bg-white/80 backdrop-blur-sm border-b border-[#e5e7eb] px-6 py-4 sticky top-0 z-20">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-[16px] font-semibold text-[#1f2937]">Conhecendo a MEL</h1>
            <p class="text-[12px] text-[#627271]">Passo <span class="current-step">1</span> de 5</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-32 h-2 bg-[#efefef] rounded-full overflow-hidden">
            <div class="progress-bar h-full bg-[#86cb92] rounded-full transition-all" style="width: 20%"></div>
          </div>
          <span class="text-[12px] text-[#627271]">20%</span>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-6 py-8">
    
    <!-- Step 1: Boas-vindas -->
    <div class="onboarding-step active" data-step="1">
      <div class="text-center max-w-2xl mx-auto">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#86cb92] to-[#5fb86e] rounded-full flex items-center justify-center shadow-xl animate-bounce">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <h2 class="text-[28px] font-bold text-[#1f2937] mb-4">
          Bem-vindo! Eu sou a <span class="text-[#86cb92]">MEL</span> 👋
        </h2>
        <p class="text-[16px] text-[#627271] mb-8 leading-relaxed">
          Sua consultora de negócios virtual. Estou aqui para transformar seus dados em decisões inteligentes, 
          enviar insights proativos e ajudar seu negócio a crescer.
        </p>
        
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="bg-white rounded-xl p-4 border border-[#e5e7eb] text-center">
            <div class="w-12 h-12 mx-auto mb-3 bg-[#86cb92]/10 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <p class="text-[14px] font-medium text-[#1f2937]">Análise Inteligente</p>
            <p class="text-[12px] text-[#627271]">Dados em linguagem natural</p>
          </div>
          <div class="bg-white rounded-xl p-4 border border-[#e5e7eb] text-center">
            <div class="w-12 h-12 mx-auto mb-3 bg-blue-50 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </div>
            <p class="text-[14px] font-medium text-[#1f2937]">Alertas Proativos</p>
            <p class="text-[12px] text-[#627271]">Nunca perca oportunidades</p>
          </div>
        </div>
        
        <button class="px-8 py-3 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-xl font-medium transition-colors inline-flex items-center gap-2 next-step">
          Começar Tour
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Step 2: Canal de Comunicação -->
    <div class="onboarding-step hidden" data-step="2">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto mb-4 bg-[#86cb92]/10 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <h2 class="text-[24px] font-bold text-[#1f2937] mb-2">Como prefere receber mensagens?</h2>
          <p class="text-[14px] text-[#627271]">Escolha seu canal principal de comunicação com a MEL</p>
        </div>
        
        <div class="space-y-3 mb-8">
          <label class="flex items-center gap-4 p-4 bg-white border-2 border-[#86cb92] rounded-xl cursor-pointer transition-all">
            <input type="radio" name="channel" value="whatsapp" checked class="sr-only">
            <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-[16px] font-semibold text-[#1f2937]">WhatsApp</p>
              <p class="text-[13px] text-[#627271]">Receba relatórios e alertas no seu celular</p>
            </div>
            <div class="w-6 h-6 rounded-full border-2 border-[#86cb92] flex items-center justify-center">
              <div class="w-3 h-3 bg-[#86cb92] rounded-full"></div>
            </div>
          </label>
          
          <label class="flex items-center gap-4 p-4 bg-white border-2 border-[#e5e7eb] rounded-xl cursor-pointer transition-all hover:border-[#86cb92]/50">
            <input type="radio" name="channel" value="email" class="sr-only">
            <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-[16px] font-semibold text-[#1f2937]">E-mail</p>
              <p class="text-[13px] text-[#627271]">Relatórios detalhados na sua caixa de entrada</p>
            </div>
            <div class="w-6 h-6 rounded-full border-2 border-[#e5e7eb] flex items-center justify-center">
              <div class="w-3 h-3 bg-[#86cb92] rounded-full opacity-0"></div>
            </div>
          </label>
          
          <label class="flex items-center gap-4 p-4 bg-white border-2 border-[#e5e7eb] rounded-xl cursor-pointer transition-all hover:border-[#86cb92]/50">
            <input type="radio" name="channel" value="both" class="sr-only">
            <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-[16px] font-semibold text-[#1f2937]">Ambos</p>
              <p class="text-[13px] text-[#627271]">Nunca perca uma mensagem importante</p>
            </div>
            <div class="w-6 h-6 rounded-full border-2 border-[#e5e7eb] flex items-center justify-center">
              <div class="w-3 h-3 bg-[#86cb92] rounded-full opacity-0"></div>
            </div>
          </label>
        </div>
        
        <div class="flex items-center justify-between">
          <button class="px-6 py-3 text-[#627271] hover:text-[#1f2937] font-medium transition-colors prev-step">
            ← Voltar
          </button>
          <button class="px-8 py-3 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-xl font-medium transition-colors next-step">
            Continuar →
          </button>
        </div>
      </div>
    </div>

    <!-- Step 3: Tópicos de Interesse -->
    <div class="onboarding-step hidden" data-step="3">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto mb-4 bg-[#86cb92]/10 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h2 class="text-[24px] font-bold text-[#1f2937] mb-2">O que é mais importante para você?</h2>
          <p class="text-[14px] text-[#627271]">Selecione os tópicos sobre os quais deseja receber insights</p>
        </div>
        
        <div class="grid grid-cols-2 gap-3 mb-8">
          <label class="p-4 bg-white border-2 border-[#86cb92] rounded-xl cursor-pointer transition-all">
            <input type="checkbox" checked class="sr-only">
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded border-2 border-[#86cb92] bg-[#86cb92] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <p class="text-[14px] font-semibold text-[#1f2937]">📈 Vendas</p>
                <p class="text-[12px] text-[#627271]">Faturamento e tendências</p>
              </div>
            </div>
          </label>
          
          <label class="p-4 bg-white border-2 border-[#86cb92] rounded-xl cursor-pointer transition-all">
            <input type="checkbox" checked class="sr-only">
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded border-2 border-[#86cb92] bg-[#86cb92] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <p class="text-[14px] font-semibold text-[#1f2937]">👥 Clientes</p>
                <p class="text-[12px] text-[#627271]">Novos e recorrência</p>
              </div>
            </div>
          </label>
          
          <label class="p-4 bg-white border-2 border-[#e5e7eb] rounded-xl cursor-pointer transition-all hover:border-[#86cb92]/50">
            <input type="checkbox" class="sr-only">
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded border-2 border-[#e5e7eb] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <p class="text-[14px] font-semibold text-[#1f2937]">📦 Estoque</p>
                <p class="text-[12px] text-[#627271]">Alertas de reposição</p>
              </div>
            </div>
          </label>
          
          <label class="p-4 bg-white border-2 border-[#e5e7eb] rounded-xl cursor-pointer transition-all hover:border-[#86cb92]/50">
            <input type="checkbox" class="sr-only">
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded border-2 border-[#e5e7eb] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <p class="text-[14px] font-semibold text-[#1f2937]">💰 Financeiro</p>
                <p class="text-[12px] text-[#627271]">Contas e fluxo</p>
              </div>
            </div>
          </label>
        </div>
        
        <div class="flex items-center justify-between">
          <button class="px-6 py-3 text-[#627271] hover:text-[#1f2937] font-medium transition-colors prev-step">
            ← Voltar
          </button>
          <button class="px-8 py-3 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-xl font-medium transition-colors next-step">
            Continuar →
          </button>
        </div>
      </div>
    </div>

    <!-- Step 4: Teste o Chat -->
    <div class="onboarding-step hidden" data-step="4">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-6">
          <div class="w-16 h-16 mx-auto mb-4 bg-[#86cb92]/10 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <h2 class="text-[24px] font-bold text-[#1f2937] mb-2">Faça sua primeira pergunta!</h2>
          <p class="text-[14px] text-[#627271]">Teste o chat da MEL com uma pergunta simples</p>
        </div>
        
        <!-- Mini Chat Demo -->
        <div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden mb-6">
          <div class="bg-[#f9fafb] p-4 h-48 overflow-y-auto space-y-3">
            <!-- Mensagem MEL -->
            <div class="flex items-start gap-2">
              <div class="w-7 h-7 rounded-full bg-[#86cb92] flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div class="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm border border-[#e5e7eb] max-w-[85%]">
                <p class="text-[13px] text-[#1f2937]">
                  Olá! 👋 Pronto para começar? Tente perguntar algo como "Como estão minhas vendas?"
                </p>
              </div>
            </div>
            
            <!-- Sugestões -->
            <div class="flex flex-wrap gap-2 pl-9">
              <button class="demo-suggestion px-3 py-1.5 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[12px] hover:bg-[#86cb92] hover:text-white transition-colors">
                Quanto vendi hoje?
              </button>
              <button class="demo-suggestion px-3 py-1.5 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[12px] hover:bg-[#86cb92] hover:text-white transition-colors">
                Produtos mais vendidos
              </button>
            </div>
          </div>
          
          <div class="p-3 border-t border-[#e5e7eb]">
            <div class="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Digite sua pergunta..."
                class="flex-1 px-3 py-2 bg-[#f3f4f6] border-0 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50"
              >
              <button class="p-2 bg-[#86cb92] hover:bg-[#5fb86e] rounded-full transition-colors">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-between">
          <button class="px-6 py-3 text-[#627271] hover:text-[#1f2937] font-medium transition-colors prev-step">
            ← Voltar
          </button>
          <button class="px-8 py-3 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-xl font-medium transition-colors next-step">
            Finalizar →
          </button>
        </div>
      </div>
    </div>

    <!-- Step 5: Conclusão -->
    <div class="onboarding-step hidden" data-step="5">
      <div class="text-center max-w-2xl mx-auto">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#86cb92] to-[#5fb86e] rounded-full flex items-center justify-center shadow-xl">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 class="text-[28px] font-bold text-[#1f2937] mb-4">
          Tudo pronto! 🎉
        </h2>
        <p class="text-[16px] text-[#627271] mb-6 leading-relaxed">
          A MEL já está configurada e pronta para ajudar. Você receberá seu primeiro relatório amanhã de manhã.
        </p>
        
        <div class="bg-white rounded-xl p-6 border border-[#e5e7eb] mb-8">
          <h3 class="text-[14px] font-semibold text-[#1f2937] mb-4">Resumo da Configuração</h3>
          <div class="space-y-3 text-left">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-[14px] text-[#1f2937]">Notificações via WhatsApp</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-[14px] text-[#1f2937]">Foco em Vendas e Clientes</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-[14px] text-[#1f2937]">Relatório diário às 09:00</span>
            </div>
          </div>
        </div>
        
        <a href="/mel" class="px-8 py-3 bg-[#86cb92] hover:bg-[#5fb86e] text-white rounded-xl font-medium transition-colors inline-flex items-center gap-2">
          Ir para o Chat
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </a>
      </div>
    </div>

  </main>
</div>
```

---

## 🧩 Componentes Especiais

### Toast de Notificação MEL

```html
<!-- Toast de Notificação Proativa -->
<div class="mel-toast fixed top-4 right-4 z-50 max-w-sm">
  <div class="bg-white rounded-xl shadow-xl border border-[#86cb92]/30 overflow-hidden animate-slide-in">
    <div class="flex items-start gap-3 p-4">
      <div class="w-10 h-10 bg-gradient-to-br from-[#86cb92] to-[#5fb86e] rounded-full flex items-center justify-center flex-shrink-0">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-[13px] font-semibold text-[#1f2937] mb-1">💡 Insight da MEL</p>
        <p class="text-[12px] text-[#627271] leading-relaxed">
          Você vendeu 40% mais que ontem! Ótimo momento para campanha de marketing.
        </p>
        <div class="flex items-center gap-2 mt-3">
          <button class="px-3 py-1.5 bg-[#86cb92] text-white rounded-lg text-[11px] font-medium hover:bg-[#5fb86e] transition-colors">
            Ver detalhes
          </button>
          <button class="px-3 py-1.5 text-[#627271] hover:text-[#1f2937] rounded-lg text-[11px] transition-colors">
            Ignorar
          </button>
        </div>
      </div>
      <button class="text-[#627271] hover:text-[#1f2937] transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="h-1 bg-[#efefef]">
      <div class="h-full bg-[#86cb92] animate-progress"></div>
    </div>
  </div>
</div>
```

### Card de Insight

```html
<!-- Card de Insight Flutuante -->
<div class="mel-insight-card bg-white rounded-xl shadow-lg border border-[#86cb92]/20 p-4 max-w-xs">
  <div class="flex items-start gap-3">
    <div class="w-8 h-8 bg-[#86cb92]/10 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg class="w-4 h-4 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </div>
    <div>
      <p class="text-[12px] font-medium text-[#86cb92] mb-1">MEL SUGERE</p>
      <p class="text-[13px] text-[#1f2937] leading-snug">
        O produto "XYZ" está esgotando. Reposição recomendada: 50 unidades.
      </p>
    </div>
  </div>
</div>
```

### Indicador de Status MEL

```html
<!-- Badge de Status MEL -->
<div class="mel-status-badge inline-flex items-center gap-2 px-3 py-1.5 bg-[#86cb92]/10 rounded-full">
  <span class="relative flex h-2 w-2">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#86cb92] opacity-75"></span>
    <span class="relative inline-flex rounded-full h-2 w-2 bg-[#86cb92]"></span>
  </span>
  <span class="text-[12px] font-medium text-[#86cb92]">MEL Online</span>
</div>
```

---

## 📋 Regras de Negócio

| ID | Regra | Descrição | Severidade |
|----|-------|-----------|------------|
| **RN-MEL-001** | Autenticação obrigatória | Usuário deve estar logado para acessar qualquer funcionalidade da MEL | Alta |
| **RN-MEL-002** | Dados contextuais | MEL deve acessar dados de TODOS os módulos para contextualizar respostas | Alta |
| **RN-MEL-003** | Privacidade de dados | MEL não expõe dados sensíveis (CPF, valores completos de transações) sem máscara | Crítica |
| **RN-MEL-004** | Horário de silêncio | Notificações não devem ser enviadas no período configurado (default: 22h-08h) | Média |
| **RN-MEL-005** | Rate limiting | Máximo de 100 mensagens por usuário/hora para evitar abuso | Alta |
| **RN-MEL-006** | Histórico persistente | Todas as conversas devem ser armazenadas por 90 dias | Alta |
| **RN-MEL-007** | Fallback humano | Opção de "Falar com humano" deve estar sempre disponível | Alta |
| **RN-MEL-008** | Limite de caracteres | Mensagens do usuário limitadas a 500 caracteres | Média |
| **RN-MEL-009** | Timeout de resposta | Se MEL não responder em 30s, mostrar mensagem de espera | Média |
| **RN-MEL-010** | Onboarding obrigatório | Novos usuários devem completar o onboarding antes de usar o chat completo | Alta |
| **RN-MEL-011** | Confirmação de ações | Ações destrutivas (excluir agendamento) requerem confirmação | Média |
| **RN-MEL-012** | Dados em tempo real | Indicadores mostrados devem refletir dados de no máximo 5 min atrás | Alta |
| **RN-MEL-013** | Multi-idioma | Respostas devem ser no mesmo idioma da pergunta (PT/EN/ES) | Baixa |
| **RN-MEL-014** | Personalização por perfil | Tom da MEL se adapta ao perfil do usuário (técnico vs. simples) | Média |
| **RN-MEL-015** | Feedback loop | Usuários podem avaliar utilidade de cada resposta da MEL | Média |

---

## ✅ Checklist de Implementação

### Estrutura e Layout
- [ ] Header com avatar e status da MEL implementado
- [ ] Área de mensagens scrollável funcional
- [ ] Input de texto com auto-resize implementado
- [ ] Sugestões rápidas clicáveis
- [ ] Widget flutuante visível em todas as telas
- [ ] Responsividade mobile garantida

### Componentes Visuais
- [ ] Balões de mensagem (usuário e MEL) estilizados
- [ ] Indicador de digitação (typing) animado
- [ ] Cards de insight com ações
- [ ] Toast de notificações proativas
- [ ] Badge de status online/offline
- [ ] Date separators entre mensagens

### Estados
- [ ] Estado vazio (primeira conversa)
- [ ] Estado de carregamento (loading)
- [ ] Estado de erro na resposta
- [ ] Estado de digitação (typing dots)
- [ ] Estado offline da MEL
- [ ] Estado de limite de caracteres

### Funcionalidades Chat
- [ ] Envio de mensagem com Enter
- [ ] Auto-scroll para última mensagem
- [ ] Timestamp em cada mensagem
- [ ] Status de leitura/entrega
- [ ] Histórico de conversas acessível
- [ ] Busca no histórico

### Configurações
- [ ] Toggle de canais (WhatsApp/Email/App)
- [ ] Seleção de frequência de contato
- [ ] Checkboxes de tópicos de interesse
- [ ] Configuração de horário de silêncio
- [ ] Estatísticas de uso da MEL

### Onboarding
- [ ] 5 passos do tour implementados
- [ ] Progresso visual funcional
- [ ] Pergunta demo interativa
- [ ] Resumo da configuração no final
- [ ] Opção de pular onboarding

### Relatórios
- [ ] Lista de agendamentos com status
- [ ] Toggle ativar/pausar agendamento
- [ ] Cards de templates disponíveis
- [ ] Estatísticas de envio/abertura
- [ ] Filtros de busca

### Integrações
- [ ] Conexão com API da MEL
- [ ] WebSocket para respostas em tempo real
- [ ] Integração WhatsApp Business
- [ ] Envio de e-mails configurado
- [ ] Notificações push implementadas

---

## 🎯 Animações e Transições

```css
/* Animações CSS - MEL */

/* Typing Indicator */
@keyframes mel-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-4px); }
}

.mel-typing-dot {
  animation: mel-bounce 1.4s infinite ease-in-out both;
}

/* Slide In Toast */
@keyframes mel-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.mel-toast-enter {
  animation: mel-slide-in 0.3s ease-out;
}

/* Pulse Online */
@keyframes mel-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.mel-status-pulse {
  animation: mel-pulse 2s infinite;
}

/* Widget Float */
@keyframes mel-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.mel-widget-bounce:hover {
  animation: mel-float 1s ease-in-out infinite;
}

/* Message Appear */
@keyframes mel-message-appear {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.mel-message-new {
  animation: mel-message-appear 0.2s ease-out;
}

/* Progress Bar */
@keyframes mel-progress {
  from { width: 100%; }
  to { width: 0%; }
}

.mel-progress-bar {
  animation: mel-progress 5s linear forwards;
}
```

---

## 📱 Responsividade

### Breakpoints

| Breakpoint | Largura | Adaptações |
|------------|---------|------------|
| Mobile | < 640px | Chat full-screen, widget menor, input fixo bottom |
| Tablet | 640px - 1024px | Chat com margens laterais |
| Desktop | > 1024px | Layout 2-colunas, sidebar visível |

### Comportamentos Mobile
```css
/* Mobile-first adjustments */
@media (max-width: 640px) {
  .mel-chat-page {
    padding-bottom: env(safe-area-inset-bottom);
  }
  
  .mel-message-user div,
  .mel-message-ai div > div {
    max-width: 90%;
  }
  
  .mel-widget-open {
    width: calc(100vw - 2rem);
    right: 1rem;
    left: 1rem;
  }
}
```

---

## 🔗 Integrações

### Conectores de Dados
- **Módulo Vendas**: Faturamento, pedidos, produtos mais vendidos
- **Módulo Clientes**: Novos cadastros, recorrência, satisfação
- **Módulo Estoque**: Níveis de estoque, giro, alertas
- **Módulo Financeiro**: Contas a pagar/receber, fluxo de caixa
- **Módulo Compras**: Fornecedores, pedidos de compra
- **Módulo Produção**: Ordens, insumos, produtividade

### APIs Externas
- WhatsApp Business API
- OpenAI/Claude (LLM)
- SendGrid/AWS SES (E-mail)
- Firebase Cloud Messaging (Push)

---

**Documento Versionado**  
**Autor:** UX/UI Team UNIQ  
**Review:** AI Team + Product Team  
**Aprovação:** CTO / CPO
