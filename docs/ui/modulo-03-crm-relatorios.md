# 📊 Módulo 03: CRM - Relatórios e Dashboards

## Metadados
- **Módulo:** 03 - CRM (Customer Relationship Management)
- **Tópico:** Relatórios e Dashboards
- **Versão:** 1.0
- **Data:** 12/03/2026
- **Status:** Draft

---

## 🎨 Design System - CRM Relatórios

### Paleta de Cores
```css
Jet Black:         #1f2937  /* Textos primários, títulos */
Dim Grey:          #627271  /* Textos secundários, labels */
Dark Slate Grey:   #3e5653  /* Header, bordas de destaque */
Platinum:          #efefef  /* Backgrounds alternados, divisões */
Emerald:           #86cb92  /* Sucesso, crescimento, métricas positivas */
Bordas:            #e5e7eb  /* Cards, divisores */

/* Cores Semânticas para Gráficos */
Azul Primário:     #3b82f6  /* Taxa de Conversão, Pipeline */
Verde:             #10b981  /* Crescimento, Receita */
Amarelo:           #f59e0b  /* Alertas, Oportunidades */
Vermelho:          #ef4444  /* Perdas, Atrasos */
Roxo:              #8b5cf6  /* Previsões, Forecast */
Laranja:           #f97316  /* Velocidade média */
```

### Tipografia
- **Títulos Dashboard:** Inter, 24px, font-weight 700, #1f2937
- **Cards Métricas:** Inter, 14px label, 32px valor, #627271 / #1f2937
- **Gráficos:** Inter, 12px legendas, #627271
- **Tabelas:** Inter, 13px, #1f2937

### Estrutura de Espaçamento
- Container Dashboard: `p-6`, `gap-6`
- Cards: `p-6`, `rounded-lg`, `shadow-sm`
- Grid: 4 colunas (métricas), 2 colunas (gráficos grandes)

---

## 📱 Tela: Dashboard CRM

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                     │
│  [Logo]  CRM Relatórios  [🔍 Buscar]  [🔔]  [👤]                    [⚙️]  │
├─────────────────────────────────────────────────────────────────────────────┤
│  BREADCRUMB: Dashboard > CRM > Relatórios                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [📅 Período: ▼ Últimos 30 dias]  [📊 Tipo: ▼ Todos]  [🔄 Atualizar]       │
│                                                                             │
│  ┌──────────────────┬──────────────────┬──────────────────┬───────────────┐ │
│  │  📈 RECEITA      │  🎯 TAXA         │  ⏱️ VELOCIDADE   │  📊 LEADS     │ │
│  │                  │  CONVERSÃO       │  PIPELINE        │  NOVOS        │ │
│  │  R$ 2.450.000    │  24,5%           │  8,5 dias        │  1.247        │ │
│  │  ↑ +12% vs       │  ↑ +2,3% vs      │  ↓ -1,2 dias vs  │  ↑ +8% vs     │ │
│  │  período ant.    │  período ant.    │  período ant.    │  período ant. │ │
│  └──────────────────┴──────────────────┴──────────────────┴───────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────┬──────────────────────────┐ │
│  │  FUNIL DE VENDAS                            │  CONVERSÃO POR ETAPA     │ │
│  │                                             │                          │ │
│  │         ┌───────────┐                       │  Etapa          Conv.    │ │
│  │         │ Leads     │ 1.247                 │  ──────────────────────  │ │
│  │         └─────┬─────┘                       │  Prospecting    68%  ███ │ │
│  │               ▼                             │  Qualificação   45%  ██  │ │
│  │         ┌───────────┐                       │  Proposta       32%  ██  │ │
│  │         │ Qualified │ 847                   │  Negociação     18%  █   │ │
│  │         └─────┬─────┘                       │  Fechamento     24%  █   │ │
│  │               ▼                             │                          │ │
│  │         ┌───────────┐                       │                          │ │
│  │         │ Proposta  │ 412                   │                          │ │
│  │         └─────┬─────┘                       │                          │ │
│  │               ▼                             │                          │ │
│  │         ┌───────────┐                       │                          │ │
│  │         │ Fechado   │ 305                   │                          │ │
│  │         └───────────┘                       │                          │ │
│  │                                             │                          │ │
│  │  Taxa Global: 24,5%                         │                          │ │
│  └─────────────────────────────────────────────┴──────────────────────────┘ │
│                                                                             │
│  ┌─────────────────────────────────────────────┬──────────────────────────┐ │
│  │  VELOCIDADE DO PIPELINE (dias por etapa)    │  FORECAST                │ │
│  │                                             │                          │ │
│  │  Prospecting  ████████░░ 4,2 dias          │  Mes Atual:              │ │
│  │  Qualificação ██████░░░░ 3,1 dias          │  R$ 1.850.000            │ │
│  │  Proposta     ██████████ 6,8 dias          │                          │ │
│  │  Negociação   ██████████ 7,2 dias          │  Próximos 90 dias:       │ │
│  │  Fechamento   ████░░░░░░ 2,4 dias          │  R$ 3.200.000            │ │
│  │                                             │                          │ │
│  │  TOTAL MÉDIO: 23,7 dias                     │  Confiança: 78%          │ │
│  │                                             │                          │ │
│  └─────────────────────────────────────────────┴──────────────────────────┘ │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  DETALHAMENTO POR VENDEDOR                                             │ │
│  │                                                                         │ │
│  │  Vendedor        | Leads | Convertidos | Taxa  | Média Ticket | Total  │ │
│  │  ─────────────────────────────────────────────────────────────────    │ │
│  │  Ana Silva       |  312  |     89      | 28.5% | R$ 8.500    | 756K   │ │
│  │  Carlos Mendes   |  278  |     71      | 25.5% | R$ 9.200    | 653K   │ │
│  │  Fernanda Lima   |  245  |     61      | 24.9% | R$ 7.800    | 475K   │ │
│  │  [Ver mais...]                                                          │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  [📥 Exportar CSV]  [📥 Exportar PDF]  [📊 Compartilhar]                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Componentes

### 1. Card de Métrica KPI

```html
<div class="bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
  <div class="flex items-center justify-between mb-2">
    <span class="text-sm font-medium text-[#627271]">RECEITA</span>
    <div class="p-2 bg-[#86cb92]/10 rounded-full">
      <svg class="w-5 h-5 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
  </div>
  <div class="text-3xl font-bold text-[#1f2937]">R$ 2.450.000</div>
  <div class="flex items-center mt-2 text-sm">
    <span class="flex items-center text-[#86cb92] font-medium">
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
      +12%
    </span>
    <span class="text-[#627271] ml-2">vs período anterior</span>
  </div>
</div>
```

### 2. Gráfico de Funil de Vendas

```html
<div class="bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-4">Funil de Vendas</h3>
  <div class="space-y-3">
    <!-- Leads -->
    <div class="relative">
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm font-medium text-[#1f2937]">Leads</span>
        <span class="text-sm font-semibold text-[#3b82f6]">1.247</span>
      </div>
      <div class="w-full bg-[#efefef] rounded-full h-8">
        <div class="bg-[#3b82f6] h-8 rounded-full flex items-center justify-end pr-3" style="width: 100%">
          <span class="text-xs text-white font-medium">100%</span>
        </div>
      </div>
    </div>
    <!-- Qualified -->
    <div class="relative px-4">
      <div class="absolute left-0 top-[-8px] bottom-0 w-0.5 bg-[#3b82f6]"></div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm font-medium text-[#1f2937]">Qualificados</span>
        <span class="text-sm font-semibold text-[#8b5cf6]">847</span>
      </div>
      <div class="w-full bg-[#efefef] rounded-full h-8">
        <div class="bg-[#8b5cf6] h-8 rounded-full flex items-center justify-end pr-3" style="width: 68%">
          <span class="text-xs text-white font-medium">68%</span>
        </div>
      </div>
    </div>
    <!-- Proposta -->
    <div class="relative px-8">
      <div class="absolute left-4 top-[-8px] bottom-0 w-0.5 bg-[#8b5cf6]"></div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm font-medium text-[#1f2937]">Proposta Enviada</span>
        <span class="text-sm font-semibold text-[#f59e0b]">412</span>
      </div>
      <div class="w-full bg-[#efefef] rounded-full h-8">
        <div class="bg-[#f59e0b] h-8 rounded-full flex items-center justify-end pr-3" style="width: 33%">
          <span class="text-xs text-white font-medium">33%</span>
        </div>
      </div>
    </div>
    <!-- Fechado -->
    <div class="relative px-12">
      <div class="absolute left-8 top-[-8px] bottom-0 w-0.5 bg-[#f59e0b]"></div>
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm font-medium text-[#1f2937]">Fechado (Ganho)</span>
        <span class="text-sm font-semibold text-[#10b981]">305</span>
      </div>
      <div class="w-full bg-[#efefef] rounded-full h-8">
        <div class="bg-[#10b981] h-8 rounded-full flex items-center justify-end pr-3" style="width: 24%">
          <span class="text-xs text-white font-medium">24%</span>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-6 pt-4 border-t border-[#e5e7eb]">
    <div class="flex justify-between items-center">
      <span class="text-sm text-[#627271]">Taxa de Conversão Global</span>
      <span class="text-xl font-bold text-[#86cb92]">24,5%</span>
    </div>
  </div>
</div>
```

### 3. Tabela de Ranking por Vendedor

```html
<div class="bg-white rounded-lg shadow-sm border border-[#e5e7eb] overflow-hidden">
  <div class="px-6 py-4 border-b border-[#e5e7eb]">
    <h3 class="text-lg font-semibold text-[#1f2937]">Detalhamento por Vendedor</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-[#efefef]">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Vendedor</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-[#627271] uppercase tracking-wider">Leads</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-[#627271] uppercase tracking-wider">Convertidos</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-[#627271] uppercase tracking-wider">Taxa</th>
          <th class="px-6 py-3 text-center text-xs font-medium text-[#627271] uppercase tracking-wider">Ticket Médio</th>
          <th class="px-6 py-3 text-right text-xs font-medium text-[#627271] uppercase tracking-wider">Total</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-[#e5e7eb]">
        <tr class="hover:bg-[#efefef]/50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-[#3e5653] text-white flex items-center justify-center text-sm font-medium">AS</div>
              <div class="ml-3">
                <div class="text-sm font-medium text-[#1f2937]">Ana Silva</div>
                <div class="text-xs text-[#627271]">ana.silva@empresa.com</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-[#1f2937]">312</td>
          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-[#1f2937]">89</td>
          <td class="px-6 py-4 whitespace-nowrap text-center">
            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-[#86cb92]/10 text-[#86cb92]">28.5%</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-[#1f2937]">R$ 8.500</td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-[#1f2937]">R$ 756.500</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## 📋 Formulário: Filtros de Relatório

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Período | Select | Sim | Opções: Hoje, Ontem, Últimos 7 dias, Últimos 30 dias, Este mês, Mês anterior, Período personalizado |
| Data Início | Date | Condicional | Apenas se "Período personalizado" selecionado |
| Data Fim | Date | Condicional | Apenas se "Período personalizado" selecionado |
| Tipo de Relatório | Multi-select | Não | Funil, Conversão, Velocidade, Forecast, Vendedores, Perda |
| Vendedor(es) | Multi-select | Não | Filtrar por vendedor específico |
| Fonte do Lead | Multi-select | Não | Website, Indicação, Redes Sociais, etc. |
| Segmento | Select | Não | Segmento de cliente |

---

## 🔄 Estados

### Estado: Loading

```html
<div class="bg-white p-6 rounded-lg shadow-sm border border-[#e5e7eb]">
  <div class="animate-pulse space-y-4">
    <div class="h-4 bg-[#efefef] rounded w-1/4"></div>
    <div class="space-y-3">
      <div class="h-8 bg-[#efefef] rounded w-full"></div>
      <div class="h-8 bg-[#efefef] rounded w-3/4 mx-auto"></div>
      <div class="h-8 bg-[#efefef] rounded w-1/2 mx-auto"></div>
      <div class="h-8 bg-[#efefef] rounded w-1/4 mx-auto"></div>
    </div>
  </div>
</div>
```

### Estado: Empty (Sem Dados)

```html
<div class="bg-white p-12 rounded-lg shadow-sm border border-[#e5e7eb] text-center">
  <div class="w-16 h-16 mx-auto mb-4 bg-[#efefef] rounded-full flex items-center justify-center">
    <svg class="w-8 h-8 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  </div>
  <h3 class="text-lg font-medium text-[#1f2937] mb-2">Nenhum dado encontrado</h3>
  <p class="text-[#627271] mb-4">Não há dados disponíveis para o período selecionado.</p>
  <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#627271]">
    Ajustar Filtros
  </button>
</div>
```

### Estado: Error

```html
<div class="bg-red-50 p-6 rounded-lg border border-red-200">
  <div class="flex items-start">
    <svg class="w-6 h-6 text-red-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <div>
      <h3 class="text-sm font-medium text-red-800">Erro ao carregar relatório</h3>
      <p class="mt-1 text-sm text-red-700">Não foi possível carregar os dados. Tente novamente em alguns instantes.</p>
      <button class="mt-3 text-sm font-medium text-red-800 hover:text-red-900 underline">
        Tentar novamente
      </button>
    </div>
  </div>
</div>
```

---

## 📜 Regras de Negócio

### RN-CRM-REL-001: Cálculo de Taxa de Conversão
- **Descrição:** Taxa de conversão = (Negócios Fechados / Leads Total) × 100
- **Cálculo:** Considerar apenas leads com data de criação dentro do período filtrado
- **Arredondamento:** 1 casa decimal

### RN-CRM-REL-002: Velocidade do Pipeline
- **Descrição:** Tempo médio em dias que um negócio permanece em cada etapa
- **Cálculo:** Diferença entre data de entrada e saída da etapa
- **Exceção:** Negócios ainda na etapa são ignorados no cálculo

### RN-CRM-REL-003: Forecast de Vendas
- **Descrição:** Previsão de receita baseada em probabilidade de fechamento
- **Cálculo:** Valor do negócio × Probabilidade da etapa
- **Probabilidades:**
  - Prospecção: 10%
  - Qualificação: 25%
  - Proposta: 50%
  - Negociação: 75%
  - Fechamento: 100%

### RN-CRM-REL-004: Período de Análise
- **Descrição:** Limitação de período para relatórios
- **Regra:** Máximo de 12 meses por consulta
- **Histórico:** Dados mantidos por 24 meses

### RN-CRM-REL-005: Atualização em Tempo Real
- **Descrição:** Frequência de atualização dos dados
- **Dashboard:** Atualização automática a cada 5 minutos
- **Exportação:** Dados congelados no momento da exportação

---

## ✅ Checklist de Validação

### Design
- [ ] Cards de KPI alinhados com 8px gap
- [ ] Cores semânticas corretas para métricas positivas/negativas
- [ ] Contraste adequado para leitura (WCAG AA)
- [ ] Layout responsivo (stack em mobile)

### Funcional
- [ ] Filtros de período funcionam corretamente
- [ ] Gráficos atualizam após mudança de filtros
- [ ] Exportação CSV inclui todos os dados filtrados
- [ ] Exportação PDF mantém formatação

### Performance
- [ ] Carregamento inicial < 3 segundos
- [ ] Cache de dados por 5 minutos
- [ ] Lazy loading para tabelas grandes
- [ ] Skeleton loading implementado

### Acessibilidade
- [ ] Todos os gráficos possuem descrição alternativa
- [ ] Tabelas com headers corretamente associados
- [ ] Cores não são único indicador de status
- [ ] Tooltips com valores exatos nos gráficos

### Negócio
- [ ] Cálculos de conversão validados com dados reais
- [ ] Velocidade do pipeline exclui negócios ativos
- [ ] Forecast utiliza probabilidades configuráveis
- [ ] Comparativo com período anterior funciona
