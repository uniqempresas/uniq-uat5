# 📋 PRD - SPRINT_03: Dashboard UI

---

## 1. Visão Geral da Sprint

### 1.1 Contexto do Projeto
O **UNIQ Empresas** é uma plataforma SaaS modular que combina Consultoria de Growth + Ferramentas de Gestão + Métricas para pequenos e médios empreendedores. A Sprint 03 foca na criação do Dashboard principal - a tela central que o usuário vê após o login, servindo como hub para todos os módulos da plataforma.

### 1.2 Objetivo Desta Sprint
A SPRINT_03 tem como objetivo criar uma **Dashboard principal completa e funcional** com:
- Visualização de métricas de negócio em tempo real (mock)
- Gráficos de vendas e desempenho
- Lista de atividades recentes
- Acesso rápido aos módulos principais
- Integração com o Consultor Ativo (MEL)
- Navegação lateral refinada
- Tela de Perfil da Empresa com configurações visuais

### 1.3 Escopo da Sprint

**✅ Incluído nesta Sprint:**
- Dashboard Overview com 4 cards de métricas
- Gráfico de vendas (linha temporal)
- Lista de atividades recentes
- Widget de acesso rápido aos módulos
- Notificações MEL (Consultor Ativo)
- Sidebar com navegação completa
- Header com busca e notificações
- Tela de Perfil da Empresa
- Upload de logo com drag & drop
- Preview visual da loja
- Mock data completo para todos os componentes
- Responsividade mobile (sidebar hamburger)

**❌ NÃO Incluído nesta Sprint:**
- Backend real (APIs, banco de dados)
- Autenticação funcional
- Dados dinâmicos (tudo é mock/fake)
- Gráficos interativos avançados (apenas visualização)
- Upload de arquivos real (apenas preview local)

### 1.4 Stack Tecnológica

| Camada | Tecnologia | Versão | Uso |
|--------|------------|--------|-----|
| Framework | Next.js | 14.2.5 | App Router, rotas |
| Linguagem | TypeScript | 5.4.5 | Tipagem segura |
| UI Library | React | 18.3.1 | Componentes |
| Estilização | Tailwind CSS | 3.4.4 | Estilos utilitários |
| Componentes | shadcn/ui | v4.0.5 | Base de componentes |
| Gráficos | Recharts | ^2.12.0 | Gráficos de vendas |
| Ícones | Lucide React | 0.400.0 | Ícones consistentes |
| Animações | Framer Motion | ^11.0.0 | Transições suaves |

### 1.5 Estado Atual do Projeto

**Sprint 01 (Design System) - ✅ CONCLUÍDA:**
- 19 componentes base implementados (Button, Card, Badge, Avatar, Dialog, Table, Toast, Tabs, etc.)
- Design System com tokens UNIQ configurados
- Layout base App Shell funcional (Sidebar + Header)
- Responsividade mobile implementada

**Sprint 02 (Auth UI) - 🔄 EM PARALELO:**
- Telas de Login, Cadastro e Recuperação de Senha
- Validações visuais
- Fluxo de autenticação (mock)

---

## 2. User Stories

### 2.1 Dashboard Overview

#### US-DASH-01: Visualizar Métricas do Negócio
**Como** empreendedor  
**Quero** ver cards com métricas principais do meu negócio  
**Para** ter uma visão rápida do desempenho

**Critérios de Aceitação:**
- [ ] 4 cards de métricas visíveis: Vendas, Clientes, Pedidos, Conversão
- [ ] Cada card mostra valor atual, variação percentual e tendência
- [ ] Ícones coloridos para cada métrica
- [ ] Layout responsivo: 1 coluna (mobile) → 2 colunas (tablet) → 4 colunas (desktop)
- [ ] Dados mockados renderizando corretamente

#### US-DASH-02: Visualizar Gráfico de Vendas
**Como** empreendedor  
**Quero** ver um gráfico de linha com vendas ao longo do tempo  
**Para** identificar tendências e padrões

**Critérios de Aceitação:**
- [ ] Gráfico de linha temporal mostrando vendas
- [ ] Períodos selecionáveis: 7 dias, 30 dias, 90 dias
- [ ] Tooltip ao passar o mouse mostrando valor do dia
- [ ] Animação suave ao carregar
- [ ] Responsivo (largura 100% do container)

#### US-DASH-03: Ver Atividades Recentes
**Como** empreendedor  
**Quero** ver uma lista das últimas ações no sistema  
**Para** acompanhar o que está acontecendo no negócio

**Critérios de Aceitação:**
- [ ] Lista de atividades com ícone, mensagem e tempo relativo
- [ ] Tipos de atividade: venda, cliente cadastrado, produto adicionado, etc.
- [ ] Scroll vertical se houver muitas atividades
- [ ] Link "Ver todas" para histórico completo (mock)

#### US-DASH-04: Acesso Rápido aos Módulos
**Como** empreendedor  
**Quero** ter botões de acesso rápido aos módulos principais  
**Para** navegar rapidamente para onde preciso

**Critérios de Aceitação:**
- [ ] Grid de 4-6 botões com ícones dos módulos
- [ ] Módulos: CRM, Loja, Financeiro, Estoque, Vendas, Agendamentos
- [ ] Cada botão navega para a rota do módulo (mock)
- [ ] Hover effects visuais

#### US-DASH-05: Receber Notificações do MEL
**Como** empreendedor  
**Quero** ver mensagens do meu consultor virtual (MEL)  
**Para** receber insights e lembretes importantes

**Critérios de Aceitação:**
- [ ] Widget do MEL com avatar e mensagens
- [ ] Badge de mensagens não lidas
- [ ] Preview das últimas mensagens
- [ ] Indicador "Online" do consultor
- [ ] Link para conversa completa

### 2.2 Navegação

#### US-NAV-01: Navegar pelo Menu Principal
**Como** empreendedor  
**Quero** ter um menu lateral com links para todos os módulos  
**Para** acessar facilmente qualquer parte do sistema

**Critérios de Aceitação:**
- [ ] Menu lateral fixo em desktop
- [ ] Seções organizadas: Principal, Módulos
- [ ] Links: Dashboard, Minha Empresa, CRM, Financeiro, Estoque, Vendas, Loja, Agendamentos, MEL
- [ ] Indicador visual do módulo ativo
- [ ] Rolagem suave se menu for maior que a tela

#### US-NAV-02: Usar Menu Mobile
**Como** empreendedor mobile  
**Quero** ter uma navegação adaptada para celular  
**Para** usar o sistema em qualquer dispositivo

**Critérios de Aceitação:**
- [ ] Botão hamburger visível em telas < 1024px
- [ ] Sidebar desliza da esquerda ao clicar
- [ ] Overlay escuro ao abrir o menu
- [ ] Botão fechar (X) dentro do menu
- [ ] Menu fecha ao clicar em um link

#### US-NAV-03: Acessar Menu do Usuário
**Como** empreendedor  
**Quero** ter um dropdown com opções de perfil e logout  
**Para** gerenciar minha conta

**Critérios de Aceitação:**
- [ ] Dropdown no header com avatar do usuário
- [ ] Opções: Meu Perfil, Configurações da Empresa, Tema, Sair
- [ ] Informações do usuário no topo (nome, email)
- [ ] Separador visual entre grupos de opções

### 2.3 Perfil da Empresa

#### US-PROF-01: Editar Dados da Empresa
**Como** empreendedor  
**Quero** editar os dados da minha empresa  
**Para** manter as informações atualizadas

**Critérios de Aceitação:**
- [ ] Formulário com campos: Nome da empresa, CNPJ, Email, Telefone
- [ ] Endereço completo: CEP, Rua, Número, Complemento, Bairro, Cidade, Estado
- [ ] Validação visual de campos obrigatórios
- [ ] Botão "Salvar" com estado de loading
- [ ] Toast de sucesso ao salvar

#### US-PROF-02: Fazer Upload do Logo
**Como** empreendedor  
**Quero** fazer upload do logo da minha empresa  
**Para** personalizar minha identidade visual

**Critérios de Aceitação:**
- [ ] Área de drag & drop para upload
- [ ] Preview do logo atual (ou placeholder)
- [ ] Suporte a formatos: PNG, JPG, SVG
- [ ] Limite de tamanho: 2MB
- [ ] Preview em tempo real após seleção
- [ ] Botão para remover logo

#### US-PROF-03: Configurar Cores da Marca
**Como** empreendedor  
**Quero** escolher as cores da minha marca  
**Para** personalizar a aparência da minha loja

**Critérios de Aceitação:**
- [ ] Input color picker para cor primária
- [ ] Input color picker para cor secundária
- [ ] Input color picker para cor de destaque
- [ ] Preview ao vivo das cores aplicadas
- [ ] Botão "Restaurar padrão" das cores UNIQ

#### US-PROF-04: Preview da Loja
**Como** empreendedor  
**Quero** ver uma prévia de como minha loja ficará  
**Para** validar as configurações visuais

**Critérios de Aceitação:**
- [ ] Miniatura visual da loja (iframe ou mock)
- [ ] Aplicação das cores escolhidas no preview
- [ ] Exibição do logo no preview
- [ ] Botão "Abrir loja" para visualização completa

---

## 3. Interface & Fluxos

### 3.1 Estrutura do Dashboard

```
┌─────────────────────────────────────────────────────────────────────┐
│  Sidebar (fixed)  │  Header (fixed)                                  │
│                   │  [Title]              [Search]    [Notif] [User] │
├───────────────────┼──────────────────────────────────────────────────┤
│                   │                                                  │
│  🏠 Dashboard     │  ┌────────────────────────────────────────────┐  │
│  🏢 Minha Empresa │  │  [Métricas Cards - 4 colunas]                │  │
│  📦 Meus Módulos  │  │  [Vendas] [Clientes] [Pedidos] [Conversão]   │  │
│                   │  └────────────────────────────────────────────┘  │
│  ───────────────  │                                                  │
│                   │  ┌─────────────────────┐ ┌─────────────────────┐ │
│  MÓDULOS          │  │                     │ │                     │ │
│  👥 CRM           │  │   [Gráfico de       │ │  [Atividades        │ │
│  💰 Financeiro    │  │    Vendas]          │ │   Recentes]         │ │
│  📦 Estoque       │  │                     │ │                     │ │
│  🛒 Vendas        │  │                     │ │                     │ │
│  🏪 Loja Virtual  │  │                     │ │                     │ │
│  📅 Agendamentos  │  │                     │ │                     │ │
│  🤖 MEL           │  │                     │ │                     │ │
│                   │  └─────────────────────┘ ├─────────────────────┤ │
│  ───────────────  │                          │  [Acesso Rápido]    │ │
│                   │                          │  [Módulos Grid]     │ │
│  ⚙️ Configurações │                          │                     │ │
│  🚪 Sair          │                          │                     │ │
│                   │                          └─────────────────────┘ │
│  [User Profile]   │                                                  │
└───────────────────┴──────────────────────────────────────────────────┘
```

### 3.2 Fluxo de Navegação

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Login     │────▶│  Dashboard  │────▶│   Módulos   │
│  (Sprint 2) │     │  (Sprint 3) │     │  (Futuro)   │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Perfil    │
                    │  Empresa    │
                    └─────────────┘
```

### 3.3 Fluxo de Configuração do Perfil

```
┌─────────────────┐
│  Perfil Empresa │
└────────┬────────┘
         │
    ┌────┴────┬────────────┬─────────────┐
    ▼         ▼            ▼             ▼
┌───────┐ ┌───────┐  ┌──────────┐ ┌──────────┐
│ Dados │ │ Logo  │  │  Cores   │ │ Preview  │
│ Básicos│ │Upload │  │  Marca   │ │  Loja    │
└───┬───┘ └───┬───┘  └────┬─────┘ └────┬─────┘
    │         │           │            │
    └─────────┴───────────┴────────────┘
                      │
                      ▼
              ┌─────────────┐
              │  Salvar     │
              │  (Mock)     │
              └─────────────┘
```

---

## 4. Requisitos Funcionais

### 4.1 Dashboard Overview (RF-DASH-01 a RF-DASH-05)

#### RF-DASH-01: Cards de Métricas
**ID:** DASH-01  
**Prioridade:** Alta  
**Dependências:** Componente MetricCard (já existe)

**Descrição:** Quatro cards exibindo métricas principais do negócio.

**Especificações:**

| Métrica | Valor | Variação | Tendência | Ícone | Cor |
|---------|-------|----------|-----------|-------|-----|
| Vendas (Mês) | R$ 12.450,00 | +15% | ↑ Up | TrendingUp | Verde |
| Clientes Ativos | 156 | +5 | ↑ Up | Users | Azul |
| Pedidos Hoje | 23 | -2 | ↓ Down | ShoppingBag | Laranja |
| Taxa de Conversão | 3.2% | +0.5% | ↑ Up | Target | Verde |

**Props do Componente:**
```typescript
interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  subtitle?: string;
  alert?: string;
}
```

**Critérios de Aceitação:**
- [ ] Layout grid responsivo
- [ ] Ícones coloridos com fundo suave
- [ ] Variação percentual com seta indicadora
- [ ] Formatação de moeda (R$)
- [ ] Animação suave ao carregar

---

#### RF-DASH-02: Gráfico de Vendas
**ID:** DASH-02  
**Prioridade:** Alta  
**Dependências:** Recharts, Tabs component

**Descrição:** Gráfico de linha mostrando vendas ao longo do tempo com períodos selecionáveis.

**Especificações:**

| Período | Dias | Tipo de Dado |
|---------|------|--------------|
| 7 dias | Últimos 7 dias | Daily |
| 30 dias | Últimos 30 dias | Daily |
| 90 dias | Últimos 90 dias | Weekly aggregated |

**Mock Data:**
```typescript
const mockChartData = {
  '7d': [
    { date: '2026-03-13', sales: 1500 },
    { date: '2026-03-14', sales: 2300 },
    { date: '2026-03-15', sales: 1800 },
    { date: '2026-03-16', sales: 3200 },
    { date: '2026-03-17', sales: 2900 },
    { date: '2026-03-18', sales: 3500 },
    { date: '2026-03-19', sales: 4100 },
  ],
  '30d': [/* 30 pontos */],
  '90d': [/* 12-13 pontos (semanal) */]
};
```

**Design do Gráfico:**
- Tipo: LineChart (Recharts)
- Cor da linha: `uniq-primary` (#3e5653)
- Cor de preenchimento: gradiente suave
- Tooltip customizado com valor formatado
- Grid horizontal leve
- Eixo X: datas formatadas (DD/MM)
- Eixo Y: valores em R$

**Tabs de Período:**
- Estilo: Tabs component (pills)
- Opções: "7 dias" | "30 dias" | "90 dias"
- Estado ativo: fundo branco, sombra
- Estado inativo: fundo transparente

**Critérios de Aceitação:**
- [ ] Gráfico renderiza corretamente com dados mock
- [ ] Tabs alternam entre períodos
- [ ] Tooltip mostra data e valor ao hover
- [ ] Animação suave ao trocar período
- [ ] Responsivo (altura fixa, largura 100%)

---

#### RF-DASH-03: Atividades Recentes
**ID:** DASH-03  
**Prioridade:** Média  
**Dependências:** ScrollArea, ícones Lucide

**Descrição:** Lista scrollável das últimas atividades do sistema.

**Especificações:**

| Tipo | Ícone | Cor | Mensagem Exemplo |
|------|-------|-----|------------------|
| sale | DollarSign | Verde | "Nova venda #1234 - R$ 299,90" |
| customer | User | Azul | "João Silva cadastrado" |
| product | Package | Roxo | "Produto 'Óculos Ray-Ban' adicionado" |
| alert | AlertTriangle | Vermelho | "Estoque baixo: Armação Titanium" |
| message | MessageCircle | Verde | "MEL: Vendas em alta hoje!" |

**Mock Data:**
```typescript
const mockActivities = [
  { id: 1, type: 'sale', message: 'Nova venda #1234 - R$ 299,90', time: '2 min atrás' },
  { id: 2, type: 'customer', message: 'João Silva foi cadastrado', time: '15 min atrás' },
  { id: 3, type: 'product', message: 'Produto "Óculos Ray-Ban" adicionado', time: '1h atrás' },
  { id: 4, type: 'alert', message: 'Estoque baixo: Armação Titanium', time: '2h atrás' },
  { id: 5, type: 'message', message: 'MEL: Vendas em alta hoje!', time: '3h atrás' },
];
```

**Layout:**
- Altura máxima: 320px
- Scroll interno se necessário
- Cada item: ícone + mensagem + tempo
- Divider sutil entre itens
- Hover: background leve

**Critérios de Aceitação:**
- [ ] Lista renderiza com ícones coloridos
- [ ] Tempos relativos formatados
- [ ] Scroll funciona corretamente
- [ ] Link "Ver todas" no footer

---

#### RF-DASH-04: Acesso Rápido
**ID:** DASH-04  
**Prioridade:** Média  
**Dependências:** Grid layout, ícones

**Descrição:** Grid de botões para acesso rápido aos módulos principais.

**Módulos:**

| Módulo | Ícone | Cor | Rota |
|--------|-------|-----|------|
| CRM | Users | Azul | /crm |
| Loja Virtual | Store | Roxo | /loja |
| Financeiro | Wallet | Verde | /financeiro |
| Estoque | Package | Laranja | /estoque |
| Vendas | ShoppingCart | Rosa | /vendas |
| Agendamentos | Calendar | Índigo | /agendamentos |

**Layout:**
- Grid: 3 colunas (mobile: 2 colunas)
- Cada item: ícone grande + label
- Card com borda e hover effect
- Link para rota do módulo

**Critérios de Aceitação:**
- [ ] 6 módulos exibidos
- [ ] Ícones coloridos centralizados
- [ ] Hover: elevação e mudança de cor
- [ ] Navegação para rotas (mock)

---

#### RF-DASH-05: Widget MEL (Consultor Ativo)
**ID:** DASH-05  
**Prioridade:** Média  
**Dependências:** Avatar, Badge, Card components

**Descrição:** Widget do consultor virtual MEL com mensagens recentes.

**Layout:**
```
┌─────────────────────────────────┐
│  🤖 MEL              [Online]   │
├─────────────────────────────────┤
│                                 │
│  ┌─────────┐  ┌──────────────┐  │
│  │ Avatar  │  │ Mensagem     │  │
│  │   🤖    │  │ do MEL...    │  │
│  └─────────┘  └──────────────┘  │
│                                 │
│  [Ver relatório de vendas]      │
│  [Cadastrar novo produto]       │
│                                 │
├─────────────────────────────────┤
│  [Digite sua pergunta...] [➤]  │
└─────────────────────────────────┘
```

**Mock Data:**
```typescript
const mockMELMessages = [
  { id: 1, type: 'bot', text: 'Bom dia! Você vendeu 30% mais que ontem. 🎉', time: '09:00' },
  { id: 2, type: 'bot', text: 'Você tem 4 pedidos pendentes para processar.', time: '10:30' },
];

const mockMELQuickActions = [
  { id: 1, label: 'Ver relatório de vendas', action: 'sales_report' },
  { id: 2, label: 'Cadastrar novo produto', action: 'add_product' },
];
```

**Critérios de Aceitação:**
- [ ] Avatar do MEL com badge "Online"
- [ ] Bolha de mensagem estilo chat
- [ ] Quick actions clicáveis
- [ ] Input de mensagem (visual)
- [ ] Animação de digitação (opcional)

---

### 4.2 Sidebar & Navegação (RF-NAV-01 a RF-NAV-05)

#### RF-NAV-01: Menu Principal
**ID:** NAV-01  
**Prioridade:** Alta  
**Dependências:** Componente Sidebar (já existe)

**Descrição:** Menu lateral com navegação organizada por seções.

**Seções:**

**Principal:**
- Dashboard (/dashboard)
- Minha Empresa (/empresa)
- Meus Módulos (/modulos) [badge: 3]

**Módulos:**
- CRM (/crm)
- Financeiro (/financeiro)
- Estoque (/estoque)
- Vendas (/vendas)
- Loja Virtual (/loja)
- Agendamentos (/agendamentos)
- MEL (/mel) [badge: "Novo"]

**Footer:**
- Configurações (/configuracoes)
- Sair (logout)

**Estados:**
- Item ativo: background `#3e5653`, texto branco
- Item inativo: texto cinza, hover com background sutil
- Ícone ativo: cor `uniq-accent`
- Ícone inativo: cor cinza

**Critérios de Aceitação:**
- [ ] Todos os links renderizados
- [ ] Estado ativo destacado
- [ ] Badges visíveis
- [ ] Rolagem suave para menus longos

---

#### RF-NAV-02: Submenus Expansíveis
**ID:** NAV-02  
**Prioridade:** Baixa  
**Dependências:** Collapsible component

**Descrição:** Submenus expansíveis para Configurações e Perfil.

**Itens:**
- Configurações
  - Geral
  - Notificações
  - Integrações
  - Equipe

**Implementação:**
- Ícone de chevron indicando estado
- Animação suave de expandir/colapsar
- Altura automática

---

#### RF-NAV-03: Indicador de Módulo Ativo
**ID:** NAV-03  
**Prioridade:** Alta  

**Descrição:** Highlight visual indicando qual módulo está ativo.

**Estilo:**
- Background: `#3e5653` (cor primária escura)
- Border-radius: `rounded-lg`
- Padding: `px-3 py-2`
- Ícone: cor `uniq-accent` (#86cb92)
- Texto: branco

**Comportamento:**
- Atualiza baseado na URL atual
- Persiste entre navegações

---

#### RF-NAV-04: Logo e Branding
**ID:** NAV-04  
**Prioridade:** Alta  

**Descrição:** Logo UNIQ no topo da sidebar.

**Layout:**
```
┌─────────────────────┐
│  🏢    UNIQ         │
│   (ícone)  (texto)  │
└─────────────────────┘
```

**Especificações:**
- Ícone: Building2 (Lucide)
- Cor do ícone: `uniq-accent`
- Texto: "UNIQ" em branco, font-bold, text-2xl
- Alinhamento: centralizado verticalmente

---

#### RF-NAV-05: User Menu Dropdown
**ID:** NAV-05  
**Prioridade:** Média  
**Dependências:** DropdownMenu component (já existe)

**Descrição:** Dropdown no header com opções do usuário.

**Layout:**
```
[Avatar] [ChevronDown]

┌──────────────────────────────┐
│ 👤 Carlos Silva              │
│ carlos@techsolutions.com.br  │
├──────────────────────────────┤
│ 👤 Meu Perfil                │
│ 🏢 Configurações da Empresa  │
│ 🌙 Tema              [Claro] │
├──────────────────────────────┤
│ 🚪 Sair                      │
└──────────────────────────────┘
```

**Opções:**
1. Meu Perfil → /perfil
2. Configurações da Empresa → /empresa
3. Tema → Toggle claro/escuro (visual)
4. Sair → logout

**Critérios de Aceitação:**
- [ ] Informações do usuário no topo
- [ ] Separador visual entre grupos
- [ ] Ícones em cada opção
- [ ] Opção Sair em vermelho

---

### 4.3 Perfil da Empresa (RF-PROF-01 a RF-PROF-04)

#### RF-PROF-01: Formulário de Dados
**ID:** PROF-01  
**Prioridade:** Alta  
**Dependências:** Input, Label, Button, Form components

**Descrição:** Formulário completo para dados da empresa.

**Campos:**

| Campo | Tipo | Obrigatório | Máscara/Validação |
|-------|------|-------------|-------------------|
| Nome da Empresa | text | Sim | - |
| CNPJ | text | Não | 00.000.000/0000-00 |
| Email | email | Sim | email válido |
| Telefone | tel | Não | (00) 00000-0000 |
| CEP | text | Não | 00000-000 |
| Rua | text | Não | - |
| Número | text | Não | - |
| Complemento | text | Não | - |
| Bairro | text | Não | - |
| Cidade | text | Não | - |
| Estado | select | Não | UF (SP, RJ, etc) |

**Layout:**
- Seção "Dados Básicos": Nome, CNPJ, Email, Telefone
- Seção "Endereço": CEP, Rua, Número, Complemento, Bairro, Cidade, Estado
- Grid: 2 colunas em desktop, 1 em mobile

**Mock Data:**
```typescript
const mockCompanyData = {
  name: 'Tech Solutions Ltda',
  cnpj: '12.345.678/0001-90',
  email: 'contato@techsolutions.com.br',
  phone: '(11) 99999-9999',
  address: {
    cep: '01234-567',
    street: 'Rua das Flores',
    number: '123',
    complement: 'Sala 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP'
  }
};
```

**Critérios de Aceitação:**
- [ ] Todos os campos renderizados
- [ ] Labels claros
- [ ] Placeholders informativos
- [ ] Validação visual (borda vermelha em erro)
- [ ] Botão "Salvar" com loading state

---

#### RF-PROF-02: Upload de Logo
**ID:** PROF-02  
**Prioridade:** Média  
**Dependências:** Dropzone (react-dropzone ou implementação manual)

**Descrição:** Área de drag & drop para upload de logo.

**Layout:**
```
┌─────────────────────────────────────────┐
│                                         │
│    [Preview do Logo]                    │
│    ou                                   │
│    ┌─────────────────────────────────┐  │
│    │                                 │  │
│    │      📤 Arraste o logo        │  │
│    │         ou clique para        │  │
│    │         fazer upload          │  │
│    │                                 │  │
│    │    PNG, JPG ou SVG (max 2MB)  │  │
│    │                                 │  │
│    └─────────────────────────────────┘  │
│                                         │
│    [🗑️ Remover logo]                    │
│                                         │
└─────────────────────────────────────────┘
```

**Comportamento:**
- Área dropzone com borda tracejada
- Highlight ao arrastar arquivo
- Preview imediato após seleção
- Validação de tipo (image/*)
- Validação de tamanho (max 2MB)
- Botão remover para limpar

**Mock Preview:**
- Se não houver logo: ícone Building2 placeholder
- Se houver logo: imagem em preview

**Critérios de Aceitação:**
- [ ] Área de dropzone funcional
- [ ] Preview em tempo real
- [ ] Validação de tipo e tamanho
- [ ] Mensagem de erro clara
- [ ] Botão remover funcionando

---

#### RF-PROF-03: Configurações Visuais
**ID:** PROF-03  
**Prioridade:** Média  
**Dependências:** Color picker (input type="color")

**Descrição:** Inputs para customização de cores da marca.

**Cores Configuráveis:**

| Cor | Label | Padrão UNIQ |
|-----|-------|-------------|
| Primária | Cor principal | #3e5653 |
| Secundária | Cor secundária | #1f2937 |
| Destaque | Cor de destaque | #86cb92 |

**Layout:**
```
┌─────────────────────────────────────────┐
│  🎨 Cores da Marca                      │
├─────────────────────────────────────────┤
│                                         │
│  Cor Primária                           │
│  ┌──────┐  [#3e5653]                    │
│  │ ████ │                               │
│  └──────┘                               │
│                                         │
│  Cor Secundária                         │
│  ┌──────┐  [#1f2937]                    │
│  │ ████ │                               │
│  └──────┘                               │
│                                         │
│  Cor de Destaque                        │
│  ┌──────┐  [#86cb92]                    │
│  │ ████ │                               │
│  └──────┘                               │
│                                         │
│  [Restaurar Padrão]                     │
│                                         │
└─────────────────────────────────────────┘
```

**Input Color:**
- Type: `input type="color"`
- Exibir valor hexadecimal ao lado
- Preview ao vivo

**Botão Restaurar:**
- Reseta para cores padrão UNIQ
- Confirmação antes de resetar

**Critérios de Aceitação:**
- [ ] 3 inputs color funcionais
- [ ] Valor HEX exibido
- [ ] Preview ao vivo
- [ ] Botão restaurar funcional

---

#### RF-PROF-04: Preview da Loja
**ID:** PROF-04  
**Prioridade:** Baixa  
**Dependências:** Mock visual ou iframe

**Descrição:** Miniatura visual de como a loja ficará com as configurações.

**Layout:**
```
┌─────────────────────────────────────────┐
│  🖥️ Preview da Loja                     │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  [Header com Logo]              │    │
│  │                                 │    │
│  │  [Banner Placeholder]           │    │
│  │                                 │    │
│  │  ┌─────┐ ┌─────┐ ┌─────┐       │    │
│  │  │Prod │ │Prod │ │Prod │       │    │
│  │  └─────┘ └─────┘ └─────┘       │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [🚀 Abrir Loja em Nova Aba]            │
│                                         │
└─────────────────────────────────────────┘
```

**Implementação:**
- Mock visual estático (pode ser uma imagem ou componente simplificado)
- Aplicação das cores selecionadas
- Atualização em tempo real

**Critérios de Aceitação:**
- [ ] Preview visual renderizado
- [ ] Cores aplicadas dinamicamente
- [ ] Botão para abrir loja

---

## 5. Requisitos Não-Funcionais

### 5.1 Performance

| Requisito | Critério | Como Medir |
|-----------|----------|------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| Lighthouse Performance | > 90 | Lighthouse |
| Gráfico renderização | < 500ms | DevTools |
| Transições | 60fps | DevTools |

**Estratégias:**
- Lazy loading de componentes não críticos
- Otimização de imagens (next/image)
- Memoização de cálculos pesados (useMemo)
- Code splitting por rota

### 5.2 Responsividade

| Breakpoint | Largura | Ajustes |
|------------|---------|---------|
| Mobile | < 640px | Sidebar hamburger, 1 coluna métricas, scroll tabelas |
| Tablet | 640-1024px | Sidebar fixo se landscape, 2 colunas métricas |
| Desktop | > 1024px | Sidebar fixo, 4 colunas métricas |

### 5.3 Acessibilidade

| Requisito | Critério | Implementação |
|-----------|----------|---------------|
| Contraste | WCAG AA 4.5:1 | Verificar cores |
| Focus visible | Todos elementos interativos | Ring styles |
| ARIA labels | Componentes complexos | aria-label, aria-describedby |
| Keyboard nav | Tab order lógico | tabindex, focus trap |
| Screen readers | Testado | Role, label |

### 5.4 SEO (Dashboard interno - mínimo)

- Meta title dinâmico por página
- Meta description apropriada
- Lang attribute: pt-BR

### 5.5 Segurança

- Sanitização de inputs (prevenção XSS)
- Validação de tipos de arquivo no upload
- Tamanho máximo de arquivo (2MB)

---

## 6. Mock Data Completo

### 6.1 Dashboard

```typescript
// lib/mocks/dashboard.ts

export const mockDashboardStats = {
  sales: { 
    value: 12450.00, 
    change: 15, 
    trend: 'up' as const,
    formatted: 'R$ 12.450,00'
  },
  customers: { 
    value: 156, 
    change: 5, 
    trend: 'up' as const,
    label: 'esta semana'
  },
  orders: { 
    value: 23, 
    change: -2, 
    trend: 'down' as const,
    subtitle: '8 em processamento'
  },
  conversion: { 
    value: 3.2, 
    change: 0.5, 
    trend: 'up' as const,
    formatted: '3.2%'
  }
};

export const mockChartData = {
  '7d': [
    { date: '2026-03-13', sales: 1500, label: '13/03' },
    { date: '2026-03-14', sales: 2300, label: '14/03' },
    { date: '2026-03-15', sales: 1800, label: '15/03' },
    { date: '2026-03-16', sales: 3200, label: '16/03' },
    { date: '2026-03-17', sales: 2900, label: '17/03' },
    { date: '2026-03-18', sales: 3500, label: '18/03' },
    { date: '2026-03-19', sales: 4100, label: 'Hoje' },
  ],
  '30d': Array.from({ length: 30 }, (_, i) => ({
    date: `2026-03-${String(i + 1).padStart(2, '0')}`,
    sales: Math.floor(Math.random() * 3000) + 1000,
    label: `${String(i + 1).padStart(2, '0')}/03`
  })),
  '90d': Array.from({ length: 12 }, (_, i) => ({
    date: `2026-Semana ${i + 1}`,
    sales: Math.floor(Math.random() * 20000) + 10000,
    label: `Sem ${i + 1}`
  }))
};

export const mockActivities = [
  { id: 1, type: 'sale', message: 'Nova venda #1234 - R$ 299,90', time: '2 min atrás', icon: 'DollarSign' },
  { id: 2, type: 'customer', message: 'João Silva foi cadastrado', time: '15 min atrás', icon: 'User' },
  { id: 3, type: 'product', message: 'Produto "Óculos Ray-Ban" adicionado', time: '1h atrás', icon: 'Package' },
  { id: 4, type: 'alert', message: 'Estoque baixo: Armação Titanium', time: '2h atrás', icon: 'AlertTriangle' },
  { id: 5, type: 'message', message: 'MEL: Vendas em alta hoje!', time: '3h atrás', icon: 'MessageCircle' },
  { id: 6, type: 'sale', message: 'Nova venda #1233 - R$ 450,00', time: '4h atrás', icon: 'DollarSign' },
  { id: 7, type: 'customer', message: 'Maria Santos foi cadastrada', time: '5h atrás', icon: 'User' },
];

export const mockQuickModules = [
  { id: 'crm', name: 'CRM', icon: 'Users', color: 'blue', route: '/crm' },
  { id: 'store', name: 'Loja Virtual', icon: 'Store', color: 'purple', route: '/loja' },
  { id: 'finance', name: 'Financeiro', icon: 'Wallet', color: 'green', route: '/financeiro' },
  { id: 'stock', name: 'Estoque', icon: 'Package', color: 'orange', route: '/estoque' },
  { id: 'sales', name: 'Vendas', icon: 'ShoppingCart', color: 'pink', route: '/vendas' },
  { id: 'schedule', name: 'Agendamentos', icon: 'Calendar', color: 'indigo', route: '/agendamentos' },
];

export const mockMELData = {
  status: 'online',
  messages: [
    { id: 1, type: 'bot', text: 'Bom dia! Você vendeu 30% mais que ontem. 🎉', time: '09:00' },
    { id: 2, type: 'bot', text: 'Você tem 4 pedidos pendentes para processar.', time: '10:30' },
  ],
  quickActions: [
    { id: 1, label: 'Ver relatório de vendas', action: 'sales_report' },
    { id: 2, label: 'Cadastrar novo produto', action: 'add_product' },
    { id: 3, label: 'Ver estoque baixo', action: 'low_stock' },
  ],
  unreadCount: 2
};
```

### 6.2 Perfil da Empresa

```typescript
// lib/mocks/company.ts

export const mockCompany = {
  name: 'Tech Solutions Ltda',
  cnpj: '12.345.678/0001-90',
  email: 'contato@techsolutions.com.br',
  phone: '(11) 99999-9999',
  logo: null, // ou URL do logo
  address: {
    cep: '01234-567',
    street: 'Rua das Flores',
    number: '123',
    complement: 'Sala 45',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP'
  },
  colors: {
    primary: '#3e5653',
    secondary: '#1f2937',
    accent: '#86cb92'
  }
};

export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];
```

---

## 7. Estrutura de Arquivos

```
app/
├── dashboard/
│   └── page.tsx                 # Página principal do dashboard
├── empresa/
│   └── page.tsx                 # Página de perfil da empresa
├── layout.tsx                   # Layout base com providers
├── page.tsx                     # Redirect para /dashboard
├── globals.css                  # Estilos globais
├── crm/
│   └── page.tsx                 # Placeholder (mock)
├── financeiro/
│   └── page.tsx                 # Placeholder (mock)
├── estoque/
│   └── page.tsx                 # Placeholder (mock)
├── vendas/
│   └── page.tsx                 # Placeholder (mock)
├── loja/
│   └── page.tsx                 # Placeholder (mock)
└── agendamentos/
    └── page.tsx                 # Placeholder (mock)

components/
├── ui/                          # Componentes base (já existem)
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── avatar.tsx
│   ├── dialog.tsx
│   ├── table.tsx
│   ├── toast.tsx
│   ├── tabs.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── select.tsx
│   └── ...
├── dashboard/                   # NOVOS: Componentes do Dashboard
│   ├── metrics-section.tsx      # Seção de métricas
│   ├── sales-chart.tsx          # Gráfico de vendas
│   ├── activities-list.tsx      # Lista de atividades
│   ├── quick-modules.tsx        # Acesso rápido aos módulos
│   └── mel-widget.tsx           # Widget do MEL
├── empresa/                     # NOVOS: Componentes do Perfil
│   ├── company-form.tsx         # Formulário de dados
│   ├── logo-upload.tsx          # Upload de logo
│   ├── color-picker.tsx         # Seletor de cores
│   └── store-preview.tsx        # Preview da loja
├── sidebar.tsx                  # JÁ EXISTE
├── header.tsx                   # JÁ EXISTE
└── metric-card.tsx              # JÁ EXISTE

lib/
├── mocks/
│   ├── dashboard.ts             # Mock data do dashboard
│   └── company.ts               # Mock data da empresa
├── utils.ts                     # Utilitários
└── ...

hooks/
├── use-toast.ts                 # JÁ EXISTE
└── ...

public/
└── images/
    └── placeholders/
        └── logo-placeholder.svg
```

---

## 8. Critérios de Aceitação (Definition of Done)

### 8.1 Dashboard
- [ ] **DASH-01:** Dashboard renderiza com mock data completo
- [ ] **DASH-02:** Cards de métricas visíveis e formatados corretamente
- [ ] **DASH-03:** Gráfico de vendas responsivo (Recharts) funcionando
- [ ] **DASH-04:** Tabs de período (7d/30d/90d) alternando dados
- [ ] **DASH-05:** Lista de atividades scrollável com ícones
- [ ] **DASH-06:** Acesso rápido aos módulos navegável
- [ ] **DASH-07:** Widget MEL com mensagens e quick actions

### 8.2 Navegação
- [ ] **NAV-01:** Sidebar com todos os links funcionando
- [ ] **NAV-02:** Indicador de módulo ativo visível
- [ ] **NAV-03:** Menu mobile com hamburger funcionando
- [ ] **NAV-04:** User dropdown com opções renderizadas
- [ ] **NAV-05:** Logo UNIQ visível no topo da sidebar

### 8.3 Perfil da Empresa
- [ ] **PROF-01:** Formulário com todos os campos renderizados
- [ ] **PROF-02:** Validação visual de campos obrigatórios
- [ ] **PROF-03:** Upload de logo com drag & drop
- [ ] **PROF-04:** Preview do logo em tempo real
- [ ] **PROF-05:** Color pickers para cores da marca
- [ ] **PROF-06:** Preview da loja com cores aplicadas
- [ ] **PROF-07:** Botão salvar com estado de loading
- [ ] **PROF-08:** Toast de sucesso ao "salvar" (mock)

### 8.4 Responsividade
- [ ] **RESP-01:** Layout adapta para mobile (< 640px)
- [ ] **RESP-02:** Sidebar vira hamburger menu em mobile
- [ ] **RESP-03:** Métricas em 1 coluna em mobile, 2 em tablet, 4 em desktop
- [ ] **RESP-04:** Gráfico mantém proporção em todas telas

### 8.5 Performance
- [ ] **PERF-01:** Lighthouse Performance > 90
- [ ] **PERF-02:** First Contentful Paint < 1.5s
- [ ] **PERF-03:** Gráfico renderiza em < 500ms

### 8.6 Acessibilidade
- [ ] **A11Y-01:** Focus visible em todos elementos interativos
- [ ] **A11Y-02:** Contraste de cores adequado (WCAG AA)
- [ ] **A11Y-03:** ARIA labels em componentes complexos

---

## 9. Riscos e Mitigações

### Risco 1: Complexidade do Recharts
**Descrição:** Implementação de gráficos pode ser mais complexa que o esperado.  
**Impacto:** Médio | **Probabilidade:** Média  
**Mitigação:** Usar exemplos da documentação do Recharts, começar com gráfico simples.

### Risco 2: Upload de Arquivos
**Descrição:** Drag & drop pode ter comportamentos inesperados entre navegadores.  
**Impacto:** Médio | **Probabilidade:** Média  
**Mitigação:** Testar em múltiplos browsers, usar biblioteca consolidada (react-dropzone) ou implementação simples nativa.

### Risco 3: Sobrecarga da Sprint
**Descrição:** Muitas telas e componentes para uma sprint de 1 semana.  
**Impacto:** Alto | **Probabilidade:** Alta  
**Mitigação:** Priorizar: Dashboard Overview > Navegação > Perfil da Empresa. Perfil pode ser simplificado se necessário.

### Risco 4: Mock Data Extensivo
**Descrição:** Manter consistência nos mocks pode ser trabalhoso.  
**Impacto:** Baixo | **Probabilidade:** Média  
**Mitigação:** Centralizar mocks em arquivos dedicados, usar funções geradoras de dados.

### Risco 5: Responsividade Complexa
**Descrição:** Dashboard tem muitos elementos que precisam se adaptar.  
**Impacto:** Médio | **Probabilidade:** Média  
**Mitigação:** Usar sistema de grid do Tailwind, testar em múltiplos breakpoints desde o início.

---

## 10. Dependências

### 10.1 Já Instaladas (Sprint 01)

| Pacote | Versão | Uso |
|--------|--------|-----|
| next | 14.2.5 | Framework |
| react | 18.3.1 | UI Library |
| typescript | 5.4.5 | Tipagem |
| tailwindcss | 3.4.4 | Estilização |
| @radix-ui/* | várias | Componentes base |
| lucide-react | 0.400.0 | Ícones |
| class-variance-authority | 0.7.0 | Variantes |
| tailwindcss-animate | 1.0.7 | Animações |

### 10.2 Necessárias (Instalar)

| Pacote | Versão | Uso | Prioridade |
|--------|--------|-----|------------|
| recharts | ^2.12.0 | Gráficos de vendas | Alta |
| react-dropzone | ^14.2.0 | Upload drag & drop | Média |
| framer-motion | ^11.0.0 | Animações suaves | Baixa |

### 10.3 Comandos de Instalação

```bash
# Gráficos (essencial)
npm install recharts

# Upload (recomendado)
npm install react-dropzone

# Animações (opcional)
npm install framer-motion
```

---

## 11. Plano de Implementação

### Semana 1 - Cronograma Dia a Dia

#### 📅 Dia 1: Setup e Dashboard Layout (Segunda)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Instalar dependências (recharts, react-dropzone) | Alta | 15min |
| Criar estrutura de pastas | Alta | 15min |
| Refinar página dashboard/page.tsx existente | Alta | 2h |
| Criar componente SalesChart | Alta | 2h |
| Criar mock data do dashboard | Alta | 30min |

**Entregável:** Dashboard com gráfico funcionando

---

#### 📅 Dia 2: Componentes do Dashboard (Terça)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Criar componente MetricsSection | Alta | 1h |
| Criar componente ActivitiesList | Média | 1.5h |
| Criar componente QuickModules | Média | 1h |
| Criar componente MELWidget | Média | 1.5h |
| Integrar todos componentes na página | Alta | 1h |

**Entregável:** Dashboard completo com todos widgets

---

#### 📅 Dia 3: Sidebar e Navegação (Quarta)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Refinar sidebar existente | Média | 1h |
| Adicionar todos links de módulos | Alta | 30min |
| Implementar indicador de ativo | Alta | 1h |
| Refinar header com user dropdown | Média | 1h |
| Testar navegação entre páginas | Alta | 1h |

**Entregável:** Navegação completa funcionando

---

#### 📅 Dia 4: Perfil da Empresa (Quinta)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Criar página /empresa/page.tsx | Alta | 30min |
| Criar componente CompanyForm | Alta | 2h |
| Criar componente LogoUpload | Alta | 1.5h |
| Criar mock data da empresa | Média | 30min |
| Testar formulário visualmente | Alta | 30min |

**Entregável:** Página de perfil com formulário

---

#### 📅 Dia 5: Configurações Visuais (Sexta)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Criar componente ColorPicker | Média | 1h |
| Criar componente StorePreview | Baixa | 1.5h |
| Integrar configurações no perfil | Média | 1h |
| Criar placeholders para rotas de módulos | Baixa | 1h |

**Entregável:** Perfil completo com configurações visuais

---

#### 📅 Dia 6-7: Refinamento e Testes (Fim de Semana)

| Tarefa | Prioridade | Estimativa |
|--------|------------|------------|
| Testar responsividade mobile | Alta | 2h |
| Testar em diferentes navegadores | Média | 1h |
| Otimizar performance (Lighthouse) | Média | 1h |
| Revisar acessibilidade | Média | 1h |
| Documentar componentes criados | Baixa | 1h |
| Atualizar TRACKING.md | Média | 30min |

**Entregável:** Sprint completa, pronta para review

---

## 12. Referências

### Documentação Oficial
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US)
- [Radix UI Documentation](https://www.radix-ui.com/primitives)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)

### Inspiração de Dashboard
- [shadcn/ui Dashboard Example](https://ui.shadcn.com/examples/dashboard)
- [Tailwind UI Dashboard](https://tailwindui.com/components/application-ui/page-examples/home-screens)
- [Vercel Dashboard](https://vercel.com/dashboard)

### Componentes de Referência
- [Recharts Examples](https://recharts.org/en-US/examples)
- [React Dropzone](https://react-dropzone.js.org/)

---

## 13. Anexos

### Anexo A: Checklist Visual

#### Cores UNIQ (Manter consistência)
| Token | Valor | Uso |
|-------|-------|-----|
| uniq-primary | #3e5653 | Botões, links, headers |
| uniq-accent | #86cb92 | Destaques, ícones, indicadores |
| uniq-platinum | #efefef | Background |
| uniq-sidebar | #1f2937 | Sidebar background |
| uniq-text | #1f2937 | Texto principal |
| uniq-muted | #627271 | Texto secundário |
| uniq-border | #e5e7eb | Bordas |

#### Tipografia
- Fonte: Poppins (Google Fonts)
- Títulos: font-semibold (600)
- Texto: font-normal (400)
- Labels: font-medium (500)

### Anexo B: Fluxo de Testes

1. **Teste Dashboard**
   - Acessar /dashboard
   - Verificar 4 cards de métricas
   - Verificar gráfico de vendas
   - Trocar período do gráfico
   - Verificar lista de atividades
   - Verificar widget MEL

2. **Teste Navegação**
   - Clicar em cada link do sidebar
   - Verificar indicador de ativo
   - Testar menu mobile (reduzir tela)
   - Testar dropdown do usuário

3. **Teste Perfil**
   - Acessar /empresa
   - Preencher formulário
   - Testar upload de logo
   - Trocar cores da marca
   - Ver preview da loja
   - Clicar em salvar

4. **Teste Responsividade**
   - Testar em 320px (mobile pequeno)
   - Testar em 768px (tablet)
   - Testar em 1440px (desktop)

### Anexo C: Notas de Implementação

#### Prioridades
1. **Alta:** Dashboard overview, métricas, gráfico, navegação
2. **Média:** Atividades, MEL widget, perfil formulário
3. **Baixa:** Upload de logo, configurações de cor, preview da loja

#### Simplificações Permitidas
- Upload de logo pode ser apenas input file (sem drag & drop) se necessário
- Preview da loja pode ser estático (imagem) ao invés de componente dinâmico
- Animações podem ser simples (Tailwind transitions)

---

**Documento gerado em:** 19/03/2026  
**Pesquisador:** @vibe-researcher  
**Fase:** FASE 01 - Research (SDD)  
**Sprint:** SPRINT_03 - Dashboard UI  
**Próxima Fase:** FASE 02 - Planning (@vibe-planner)

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação de produto (PRD). Não contém código implementado. A implementação será realizada na FASE 03 por @vibe-implementer baseado na SPEC técnica que será gerada na FASE 02.

---

**Fim do Documento**
