# 📋 Product Requirements Document (PRD) - UNIQ Empresas

**Versão:** 1.0 | **Data:** 12/03/2026  
**Status:** MVP em Desenvolvimento  
**Autor:** Product Manager UNIQ  
**Stakeholders:** Founder, Beta Testers, Future Team

---

## 📑 Índice

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Módulos e Funcionalidades (9 Módulos)](#2-módulos-e-funcionalidades-mvp)
   - 2.1 Minha Empresa (Core)
   - 2.2 Marketplace
   - 2.3 CRM
   - 2.4 Financeiro
   - 2.5 Estoque
   - 2.6 Vendas & PDV
   - 2.7 Loja Virtual
   - 2.8 Agendamentos
   - 2.9 MEL
3. [Fluxos de Usuário Principais](#3-fluxos-de-usuário-principais)
4. [Regras de Negócio](#4-regras-de-negócio-rn-xxx)
5. [Priorização MoSCoW](#5-priorização-moscow)
6. [Métricas de Sucesso](#6-métricas-de-sucesso)
7. [Riscos e Mitigações](#7-riscos-e-mitigações)
8. [Checklist de Implementação](#8-checklist-de-implementação-mvp)

---

## 1. 🎯 Visão Geral do Produto

### 1.1 Problema que Resolve

O pequeno empresário brasileiro (MEI a R$ 30k/mês) enfrenta uma realidade caótica:

| Problema | Severidade | Evidência |
|----------|------------|-----------|
| **Falta de tempo para aprender tecnologia** | 🔴 Crítica | "Tô ocupado demais produzindo, não tenho tempo pra estudar" |
| **Múltiplas ferramentas desconectadas** | 🔴 Crítica | Usam WhatsApp + Excel + Instagram + caderninho separados |
| **Dificuldade em vender/divulgar online** | 🟡 Alta | "Quero loja online mas não sei por onde começar" |
| **Perder vendas por não ter loja online** | 🔴 Crítica | "Cliente perguntou se vendo online e eu disse que não" |
| **Preso no WhatsApp o dia todo** | 🔴 Crítica | "Respondo a mesma pergunta 20x por dia" |

### 1.2 Solução Proposta

> **UNIQ é o "Parceiro Digital" de pequenos negócios.**

**Conceito:** Plataforma SaaS modular que combina:
- ✅ **Loja online pronta em 1-2 dias** (setup done-for-you)
- ✅ **IA proativa (MEL)** que atende clientes e envia relatórios pelo WhatsApp
- ✅ **Gestão completa** (CRM, Financeiro, Estoque, Agendamentos) integrada
- ✅ **Sem curva de aprendizado** - quem não entende de tecnologia consegue usar

### 1.3 Diferenciais Competitivos

| Diferencial | Descrição | Vantagem Competitiva |
|-------------|-----------|---------------------|
| **🤖 MEL - IA Proativa** | Assistente digital que envia relatórios, alertas e sugere ações proativamente via WhatsApp | Nenhum concorrente oferece (Blue Ocean) |
| **⚡ Setup Done-For-You** | Loja pronta em 24-48h, não semanas ou meses | Agências cobram R$ 3-15k pelo mesmo serviço |
| **🔌 Tudo Integrado** | CRM + Financeiro + Loja + Agendamentos num lugar só | Elimina fragmentação de 5-7 apps |
| **💬 Suporte via WhatsApp** | Atendimento humano + MEL no canal que cliente já usa | vs. Ticket system dos concorrentes |
| **🧠 Simplicidade Anti-ERP** | Foco em vender, não em burocracia fiscal | 3/4 beta testers priorizam vendas > fiscal |

### 1.4 Público-Alvo: "O Empreendedor na Correria"

**👤 Perfil Demográfico:**
- Negócio: Pequeno comércio ou serviço local
- Tamanho: 1-3 funcionários (solopreneur ou micro)
- Faturamento: R$ 8k-30k/mês
- Localização: Presencial (não e-commerce nativo)
- Maturidade Digital: Usa WhatsApp + Instagram, mas não tem loja online

**💭 Perfil Psicográfico:**
- Já tentou vender online e desistiu (ou não começou)
- Sente que está perdendo vendas por não ter presença digital
- Tem disposição para pagar por praticidade (não preço)
- Valoriza relacionamento humano (não quer ser "mais um número")
- Aberto a tecnologia se for simples

**🎯 Jobs-to-be-Done:**
1. "Quero vender online sem aprender tecnologia"
2. "Quero automatizar atendimento repetitivo"
3. "Quero entender meu negócio melhor (números)"
4. "Quero parecer mais profissional digitalmente"

---

## 2. 🧩 Módulos e Funcionalidades (MVP)

### 2.1 🏢 Módulo: Minha Empresa (Core)

**Objetivo:** Hub central de cadastros base e configurações da conta. Sempre presente, independente de outros módulos.

#### Funcionalidades Principais (MVP):

| Funcionalidade | Descrição | User Story |
|----------------|-----------|------------|
| **Cadastro de Empresa** | Dados fiscais, endereço, logo, cores da marca | Como dono do negócio, quero cadastrar os dados da minha empresa, para que minha loja e documentos tenham minha marca. |
| **Cadastro de Produtos** | Nome, descrição, preço, estoque inicial, fotos | Como vendedor, quero cadastrar meus produtos, para que apareçam na loja virtual. |
| **Cadastro de Serviços** | Nome, descrição, preço, duração (se aplicável) | Como prestador de serviço, quero cadastrar meus serviços, para que clientes possam contratar online. |
| **Cadastro de Clientes** | Nome, contatos, endereço, aniversário, observações | Como empresário, quero ter uma base de clientes organizada, para não perder contato com quem já comprou. |
| **Cadastro de Fornecedores** | Nome, contatos, produtos fornecidos | Como comprador, quero cadastrar meus fornecedores, para facilitar novos pedidos. |
| **Cadastro de Colaboradores** | Nome, cargo, permissões de acesso | Como gestor, quero cadastrar meus colaboradores, para que possam ajudar no atendimento. |
| **Cadastro de Prestadores** | Profissionais externos, comissões | Como gestor de serviços, quero cadastrar prestadores (ex: cabeleireiros), para controle de agenda e comissões. |
| **Horários de Funcionamento** | Dias e horários de atendimento | Como empresário, quero definir meus horários de funcionamento, para que clientes saibam quando posso atender. |
| **Configurações da Conta** | Dados de login, notificações, preferências | Como usuário, quero configurar minha conta, para personalizar minha experiência. |

#### Funcionalidades Futuras (Pós-MVP):
- Importação em massa de produtos (Excel/CSV)
- Categorias e subcategorias de produtos
- Variações de produtos (tamanho, cor)
- Controle de comissões por vendedor
- Integração com emissão de NF-e

---

### 2.2 🛒 Módulo: Marketplace (Meus Módulos)

**Objetivo:** Loja de apps onde usuários instalam módulos à la carte.

#### Funcionalidades Principais (MVP):

| Funcionalidade | Descrição | User Story |
|----------------|-----------|------------|
| **Listagem de Módulos** | Cards com nome, descrição, preço, ícone | Como usuário, quero ver todos os módulos disponíveis, para escolher o que preciso. |
| **Detalhes do Módulo** | Descrição completa, funcionalidades, screenshots | Como interessado, quero ver detalhes de um módulo, para entender se resolve minha necessidade. |
| **Instalação de Módulo** | Ativação com um clique | Como usuário, quero instalar um módulo facilmente, para começar a usar imediatamente. |
| **Desinstalação de Módulo** | Desativação (dados preservados) | Como usuário, quero desinstalar um módulo, caso não precise mais (sem perder meus dados). |
| **Gestão de Assinatura** | Ver módulos ativos, próxima cobrança, cancelamento | Como assinante, quero gerenciar minhas assinaturas, para controlar meus gastos. |
| **Calculadora de Preço** | Simulador de custo baseado nos módulos selecionados | Como interessado, quero calcular quanto vou pagar, para planejar meu orçamento. |

#### Funcionalidades Futuras (Pós-MVP):
- Reviews e avaliações de módulos
- Módulos de terceiros (marketplace aberto)
- Trial de 7 dias para novos módulos
- Bundles de módulos com desconto
- Recomendações personalizadas de módulos

---

### 2.3 👥 Módulo: CRM

**Objetivo:** Gestão de relacionamento com clientes e pipeline de vendas.

#### Funcionalidades Principais (MVP):

| Funcionalidade | Descrição | User Story |
|----------------|-----------|------------|
| **Pipeline de Vendas** | Kanban com etapas (Novo, Contato, Proposta, Negociação, Fechado) | Como vendedor, quero visualizar minhas oportunidades em um pipeline, para saber em que etapa cada negócio está. |
| **Cadastro de Oportunidades** | Valor, probabilidade, data prevista, descrição | Como vendedor, quero cadastrar novas oportunidades, para não perder nenhum negócio. |
| **Histórico de Interações** | Registro de ligações, emails, reuniões, anotações | Como vendedor, quero registrar todas as interações com um cliente, para ter contexto nas próximas conversas. |
| **Segmentação de Clientes** | Filtros por valor, frequência, última compra | Como empresário, quero segmentar meus clientes, para focar nos mais importantes. |
| **Alertas de Follow-up** | Lembretes de retorno para oportunidades paradas | Como vendedor, quero receber alertas de follow-up, para não deixar negociações esfriarem. |
| **Dashboard CRM** | Visão geral: oportunidades no funil, taxa de conversão | Como gestor, quero ver um dashboard do CRM, para acompanhar o desempenho de vendas. |

#### Funcionalidades Futuras (Pós-MVP):
- Automação de fluxos de nutrição
- Integração com email marketing
- Scoring de leads
- Previsão de vendas baseada em ML
- MEL sugere próxima ação para cada oportunidade

---

### 2.4 💰 Módulo: Financeiro

**Objetivo:** Controle de contas a pagar/receber e fluxo de caixa.

#### Funcionalidades Principais (MVP):

| Funcionalidade | Descrição | User Story |
|----------------|-----------|------------|
| **Contas a Pagar** | Cadastro, vencimento, valor, categoria, status | Como gestor financeiro, quero controlar minhas contas a pagar, para não ter surpresas no final do mês. |
| **Contas a Receber** | Cadastro, vencimento, valor, cliente, status | Como gestor financeiro, quero controlar minhas contas a receber, para saber quanto vou entrar. |
| **Fluxo de Caixa** | Entradas e saídas por período, saldo projetado | Como empresário, quero ver meu fluxo de caixa, para saber se vou ter dinheiro para pagar as contas. |
| **Contas Bancárias** | Cadastro de múltiplas contas, saldos | Como empresário, quero cadastrar minhas contas bancárias, para ter visão consolidada. |
| **Categorias Financeiras** | Classificação de receitas e despesas | Como gestor, quero categorizar minhas transações, para entender onde gasto mais. |
| **Relatório de DRE** | Demonstração do Resultado do Exercício simplificada | Como empresário, quero ver meu DRE, para saber se estou lucrando. |

#### Funcionalidades Futuras (Pós-MVP):
- Conciliação bancária automática
- Integração com bancos (Open Banking)
- Emissão de boletos
- Controle de centros de custo
- MEL alerta sobre despesas acima da média

---

### 2.5 📦 Módulo: Estoque

**Objetivo:** Controle de estoque e movimentações.

#### Funcionalidades Principais (MVP):

| Funcionalidade | Descrição | User Story |
|----------------|-----------|------------|
| **Controle de Estoque** | Quantidade atual por produto, localização | Como gestor, quero ver o estoque atual de cada produto, para saber o que tenho disponível. |
| **Movimentações** | Entradas (compras), saídas (vendas), ajustes | Como gestor, quero registrar movimentações de estoque, para manter o controle atualizado. |
| **Alertas de Estoque Baixo** | Notificação quando produto atinge quantidade mínima | Como gestor, quero receber alertas de estoque baixo, para repor antes de acabar. |
| **Histórico de Movimentações** | Registro completo de entradas e saídas | Como gestor, quero ver o histórico de movimentações, para entender a movimentação. |
| **Relatório de Giro** | Produtos mais vendidos, velocidade de saída | Como empresário, quero ver o giro de estoque, para saber o que vende mais. |
| **Contagem de Estoque** | Ajuste periódico do inventário | Como gestor, quero fazer contagens de estoque, para corrigir divergências. |

#### Funcionalidades Futuras (Pós-MVP):
- Múltiplos depósitos/armazéns
- Controle de lotes e validade
- Curva ABC de produtos
- Sugestão automática de compra
- MEL prevê necessidade de reposição

---

### 2.6 🛍️ Módulo: Vendas & PDV

**Objetivo:** Registrar vendas, emitir recibos e controlar o ponto de venda.

#### Funcionalidades Principais (MVP):

| Funcionalidade | Descrição | User Story |
|----------------|-----------|------------|
| **PDV (Ponto de Venda)** | Interface rápida para registrar vendas presenciais | Como vendedor, quero uma tela rápida de PDV, para registrar vendas no balcão sem complicação. |
| **Carrinho de Vendas** | Adicionar produtos, quantidade, calcular total | Como vendedor, quero montar um carrinho de compras, para registrar tudo o que o cliente está levando. |
| **Emissão de Recibo** | Gerar recibo simples em PDF (sem nota fiscal) | Como empresário, quero emitir recibos para meus clientes, para ter comprovação da venda. |
| **Histórico de Vendas** | Listagem de todas as vendas realizadas | Como gestor, quero ver o histórico de vendas, para acompanhar o desempenho. |
| **Cancelamento de Venda** | Estornar venda com motivo | Como gestor, quero cancelar uma venda, para corrigir erros de registro. |
| **Múltiplas Formas de Pagamento** | Dinheiro, PIX, cartão, prazo | Como vendedor, quero registrar diferentes formas de pagamento, para atender às preferências dos clientes. |
| **Vendas por Período** | Filtros por dia, semana, mês | Como gestor, quero ver vendas por período, para analisar minha performance. |

#### Funcionalidades Futuras (Pós-MVP):
- Impressão de recibos em impressora térmica
- Leitura de código de barras
- Controle de caixa (abertura/fechamento)
- Sangria e suprimento de caixa
- Múltiplos vendedores com comissão
- MEL sugere upsell baseado no carrinho

---

### 2.7 🛒 Módulo: Loja Virtual

**Objetivo:** Storefront público para vendas online.

#### Funcionalidades Principais (MVP):

| Funcionalidade | Descrição | User Story |
|----------------|-----------|------------|
| **Temas Personalizáveis** | Escolha de tema, cores, fontes, logo | Como lojista, quero personalizar o visual da minha loja, para que combine com minha marca. |
| **Catálogo Público** | Exibição de produtos com fotos, preços, descrições | Como cliente, quero ver os produtos disponíveis, para escolher o que comprar. |
| **Checkout** | Carrinho, dados do cliente, confirmação de pedido | Como cliente, quero fazer o checkout de forma simples, para finalizar minha compra. |
| **Integração WhatsApp** | Botão "Comprar pelo WhatsApp" nos produtos | Como cliente, quero poder comprar pelo WhatsApp, para ter atendimento personalizado. |
| **Domínio Próprio** | URL personalizada ([empresa].uniq.store) | Como lojista, quero ter um domínio próprio, para passar mais profissionalismo. |
| **Páginas Institucionais** | Sobre, Contato, Política de Privacidade | Como lojista, quero páginas institucionais, para dar credibilidade à minha loja. |

#### Funcionalidades Futuras (Pós-MVP):
- Múltiplas formas de pagamento (cartão, PIX, boleto)
- Cálculo de frete integrado
- Cupons de desconto
- Recuperação de carrinho abandonado
- Integração com Instagram Shopping
- MEL notifica sobre visitas na loja

---

### 2.8 📅 Módulo: Agendamentos

**Objetivo:** Sistema de reservas de horários para serviços.

#### Funcionalidades Principais (MVP):

| Funcionalidade | Descrição | User Story |
|----------------|-----------|------------|
| **Calendário de Agendamentos** | Visão semanal/diária dos horários ocupados | Como prestador de serviço, quero ver meu calendário de agendamentos, para organizar minha semana. |
| **Agendamento Online** | Cliente marca horário sozinho via link público | Como cliente, quero agendar meu horário online, para não precisar ligar ou mandar mensagem. |
| **Bloqueio de Horários** | Indisponibilidade para almoço, reuniões, férias | Como prestador, quero bloquear horários indisponíveis, para não receber agendamentos nesses períodos. |
| **Lembretes Automáticos** | Notificação para cliente antes do agendamento | Como cliente, quero receber lembretes do meu agendamento, para não esquecer. |
| **Lista de Espera** | Cliente entra na fila caso horário esteja ocupado | Como cliente, quero entrar na lista de espera, caso meu horário preferido esteja ocupado. |
| **Histórico de Atendimentos** | Registro de serviços prestados por cliente | Como prestador, quero ver o histórico de atendimentos por cliente, para ter contexto. |

#### Funcionalidades Futuras (Pós-MVP):
- Integração com Google Calendar/Outlook
- Agendamento recorrente
- Múltiplos profissionais com agendas separadas
- Confirmação automática via WhatsApp
- MEL sugere horários baseados em preferências do cliente

---

### 2.9 🤖 Módulo: MEL (Agente de Consultoria)

**Objetivo:** Interface com a IA proativa que auxilia o empresário.

#### Funcionalidades Principais (MVP):

| Funcionalidade | Descrição | User Story |
|----------------|-----------|------------|
| **Chat com MEL** | Interface para conversar com a IA | Como usuário, quero conversar com a MEL, para tirar dúvidas sobre meu negócio. |
| **Relatórios Proativos** | MEL envia resumo diário/semanal de vendas via WhatsApp | Como empresário, quero receber relatórios automáticos, para acompanhar meu negócio sem pedir. |
| **Consultas sobre Dados** | Perguntar "Quanto vendi ontem?", "Qual meu produto mais vendido?" | Como empresário, quero perguntar dados do meu negócio em linguagem natural, para não precisar gerar relatórios. |
| **Sugestões Proativas** | MEL sugere ações baseadas nos dados | Como empresário, quero receber sugestões de ações, para saber o que fazer para melhorar. |
| **Alertas Inteligentes** | Estoque baixo, cliente inativo, oportunidade de venda | Como empresário, quero receber alertas inteligentes, para não perder oportunidades. |
| **Onboarding Guiado** | MEL guia o usuário nos primeiros passos | Como novo usuário, quero ser guiado pela MEL, para aprender a usar o sistema. |

#### Funcionalidades Futuras (Pós-MVP):
- MEL responde perguntas dos clientes finais no WhatsApp
- Sugestão de preços baseada em mercado
- Previsão de vendas e sazonalidade
- Análise de sentimento de clientes
- MEL cria campanhas de marketing automaticamente

---

## 3. 🔄 Fluxos de Usuário Principais

### 3.1 Fluxo: Cadastro e Onboarding

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Landing    │───→│  Pagamento   │───→│  Confirmação │───→│  Dashboard   │
│    Page      │    │   Setup R$   │    │   Email +    │    │   UNIQ com   │
│              │    │   329 + 1º   │    │   WhatsApp   │    │   Checklist  │
│              │    │   Mensal     │    │   MEL        │    │   Ativação   │
└──────────────┘    └──────────────┘    └──────────────┘    └──────┬───────┘
                                                                    │
                    ┌───────────────────────────────────────────────┘
                    ▼
            ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
            │    Day 1:    │───→│   Day 2-7:   │───→│   Day 14:    │
            │  Cadastro    │    │  Personaliz. │    │   Ativo      │
            │  Produtos    │    │  Loja + MEL  │    │   (Meta)     │
            └──────────────┘    └──────────────┘    └──────────────┘
```

**Detalhamento:**

| Dia | Ação Principal | Intervenção MEL | Intervenção Humana |
|-----|----------------|-----------------|-------------------|
| **0** | Pagamento + Criação conta | WhatsApp boas-vindas | - |
| **1** | Primeiro login + Tour | Lembrete se não logou | - |
| **2** | Cadastrar 3 produtos | Incentivo + vídeo tutorial | - |
| **3** | Personalizar loja (cores, logo) | Progresso: 60% pronto | - |
| **4** | Configurar WhatsApp | Parabéns! Loja 80% pronta | - |
| **5** | Publicar loja + Testar | Link público enviado | - |
| **7** | Feedback + Ajustes | Pesquisa NPS | Email pessoal founder |
| **14** | Meta: Cliente ativo | Comemoração ou resgate | Ligação se travado |

---

### 3.2 Fluxo: Instalação do Primeiro Módulo

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Acessar        │───→│  Visualizar     │───→│  Ver Detalhes   │
│  Marketplace    │    │  Lista Módulos  │    │  do Módulo      │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                       │
                    ┌──────────────────────────────────┘
                    ▼
            ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
            │  Calcular       │───→│  Confirmar      │───→│  Módulo         │
            │  Custo Total    │    │  Instalação     │    │  Ativo!         │
            └─────────────────┘    └─────────────────┘    └─────────────────┘
                                                                    │
                    ┌───────────────────────────────────────────────┘
                    ▼
            ┌─────────────────┐    ┌─────────────────┐
            │  Configurar     │───→│  Começar        │
            │  Módulo         │    │  a Usar         │
            └─────────────────┘    └─────────────────┘
```

**User Story:**
```
Como usuário UNIQ,
Quero instalar um novo módulo do marketplace,
Para que eu possa expandir as funcionalidades da minha conta.

Critérios de Aceitação:
1. Visualizar todos os módulos disponíveis com preços claros
2. Ver descrição detalhada de cada módulo
3. Calcular custo total com múltiplos módulos (incluindo descontos)
4. Instalar com um clique
5. Receber confirmação de ativação
6. Ser direcionado para configuração inicial

Prioridade: Must
```

---

### 3.3 Fluxo: Jornada de Vendas (CRM)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Novo Lead      │───→│  Qualificação   │───→│  Proposta       │
│  (Entra no      │    │  (MEL sugere    │    │  (Enviar        │
│   sistema)      │    │   próxima ação) │    │   orçamento)    │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                       │
                    ┌──────────────────────────────────┘
                    ▼
            ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
            │  Negociação     │───→│  Fechamento     │───→│  Pós-Venda      │
            │  (Follow-ups    │    │  (Ganhou ou     │    │  (MEL lembra    │
            │   automáticos)  │    │   Perdeu)       │    │   de manter     │
            └─────────────────┘    └─────────────────┘    │   contato)      │
                                                          └─────────────────┘
```

**User Story:**
```
Como vendedor,
Quero gerenciar minhas oportunidades em um pipeline,
Para que eu não perca nenhum negócio.

Critérios de Aceitação:
1. Visualizar todas as oportunidades em kanban
2. Mover oportunidades entre etapas do funil
3. Registrar valor, probabilidade e data prevista
4. Adicionar notas e histórico de interações
5. Receber alertas de follow-up
6. Ver dashboard com taxa de conversão

Prioridade: Must
```

---

### 3.4 Fluxo: Jornada de Estoque

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Cadastrar      │───→│  Registrar      │───→│  Alerta MEL     │
│  Produto        │    │  Compra         │    │  "Estoque       │
│  (com estoque   │    │  (Entrada)      │    │   Baixo!"       │
│   inicial)      │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                       │
                    ┌──────────────────────────────────┘
                    ▼
            ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
            │  Nova Venda     │───→│  Reposição      │───→│  Contagem       │
            │  (Saída         │    │  (Nova compra   │    │  Periódica      │
            │   automática)   │    │   sugerida)     │    │  (Ajuste)       │
            └─────────────────┘    └─────────────────┘    └─────────────────┘
```

**User Story:**
```
Como gestor de estoque,
Quero controlar as entradas e saídas de produtos,
Para que eu não fique sem mercadoria para vender.

Critérios de Aceitação:
1. Ver quantidade atual de cada produto
2. Registrar entradas (compras) e saídas (vendas)
3. Definir quantidade mínima para alertas
4. Receber notificação quando estiver acabando
5. Ver histórico completo de movimentações
6. Fazer ajustes de inventário

Prioridade: Must
```

---

### 3.5 Fluxo: Jornada de Agendamento

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Configurar     │───→│  Compartilhar   │───→│  Cliente        │
│  Horários       │    │  Link Público   │    │  Agenda Online  │
│  Disponíveis    │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                       │
                    ┌──────────────────────────────────┘
                    ▼
            ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
            │  Confirmação    │───→│  Lembretes      │───→│  Atendimento    │
            │  Automática     │    │  (WhatsApp/     │    │  Realizado      │
            │                 │    │   Email)        │    │  (Histórico)    │
            └─────────────────┘    └─────────────────┘    └─────────────────┘
```

**User Story:**
```
Como prestador de serviço,
Quero permitir que clientes agendem online,
Para que eu não perca tempo respondendo mensagens sobre horários.

Critérios de Aceitação:
1. Definir meus horários de disponibilidade
2. Gerar link público de agendamento
3. Cliente escolhe serviço, data e horário
4. Receber confirmação do agendamento
5. Cliente recebe lembretes automáticos
6. Visualizar agenda no calendário

Prioridade: Should
```

---

## 4. 📜 Regras de Negócio (RN-XXX)

### 4.1 Regras de Cadastro e Conta

| ID | Regra | Impacto |
|----|-------|---------|
| **RN-001** | Todo usuário deve ter CNPJ válido (MEI ou empresa) | Compliance fiscal |
| **RN-002** | Email deve ser único no sistema | Evita duplicidade |
| **RN-003** | Senha mínimo 8 caracteres, com letra e número | Segurança |
| **RN-004** | Conta inativa por 90 dias entra em suspensão | Gestão de recursos |
| **RN-005** | Dados da empresa podem ser editados a qualquer momento | Flexibilidade |

### 4.2 Regras de Módulos e Assinatura

| ID | Regra | Impacto |
|----|-------|---------|
| **RN-006** | Setup inicial inclui até 3 módulos no valor de R$ 329 | Pacote base |
| **RN-007** | Cada módulo adicional custa R$ 69/mês | Pricing modular |
| **RN-008** | Desconto progressivo: 10% (2 módulos), 15% (3), 20% (4+) | Incentivo |
| **RN-009** | Usuário pode desinstalar módulo a qualquer momento | Flexibilidade |
| **RN-010** | Dados permanecem ao desativar módulo (por 12 meses) | Segurança |
| **RN-011** | Módulo pode ser reativado sem perda de dados | Conveniência |
| **RN-012** | Cobrança é mensal, sempre no dia da ativação | Previsibilidade |

### 4.3 Regras da Loja Virtual

| ID | Regra | Impacto |
|----|-------|---------|
| **RN-013** | Subdomínio padrão: [empresa].uniq.store | Branding |
| **RN-014** | Loja só fica pública após ativação explícita pelo usuário | Controle |
| **RN-015** | Mínimo 1 produto cadastrado para ativar loja | Qualidade |
| **RN-016** | Checkout não processa pagamento direto (redireciona WhatsApp) | MVP simplificado |
| **RN-017** | Produtos sem estoque aparecem como "Esgotado" | Transparência |
| **RN-018** | Imagens devem ser JPG/PNG, máx 2MB cada | Performance |

### 4.4 Regras do CRM

| ID | Regra | Impacto |
|----|-------|---------|
| **RN-019** | Oportunidade deve ter valor mínimo de R$ 1 | Validação |
| **RN-020** | Pipeline tem 5 etapas fixas: Novo → Contato → Proposta → Negociação → Fechado | Padronização |
| **RN-021** | Oportunidade "Perdida" deve ter motivo de perda | Analytics |
| **RN-022** | Alerta de follow-up se oportunidade parada por mais de 3 dias | Proatividade |
| **RN-023** | Cliente não pode ser excluído se tiver vendas associadas | Integridade |

### 4.5 Regras Financeiras

| ID | Regra | Impacto |
|----|-------|---------|
| **RN-024** | Conta a pagar não pode ter data retroativa maior que 30 dias | Validação |
| **RN-025** | Conta a receber pode ser marcada como "Paga" manualmente | Flexibilidade |
| **RN-026** | Lançamentos afetam fluxo de caixa na data de vencimento | Regra contábil |
| **RN-027** | Categorização obrigatória para todas as transações | Organização |
| **RN-028** | Exclusão de transação gera log de auditoria | Compliance |

### 4.6 Regras de Estoque

| ID | Regra | Impacto |
|----|-------|---------|
| **RN-029** | Estoque não pode ser negativo (exceto com flag "Permitir negativo") | Controle |
| **RN-030** | Alerta de estoque baixo quando quantidade ≤ quantidade mínima definida | Proatividade |
| **RN-031** | Venda automática gera saída de estoque | Automação |
| **RN-032** | Movimentação deve ter motivo/documento associado | Rastreabilidade |
| **RN-033** | Ajuste de inventário só pode ser feito por usuário com permissão | Segurança |

### 4.7 Regras de Agendamentos

| ID | Regra | Impacto |
|----|-------|---------|
| **RN-034** | Horário só pode ser agendado se estiver dentro do horário de funcionamento | Validação |
| **RN-035** | Não é permitido agendamento duplo no mesmo horário | Prevenção |
| **RN-036** | Cancelamento com menos de 24h gera notificação | Gestão |
| **RN-037** | Lembretes enviados 24h antes do agendamento | Redução no-shows |
| **RN-038** | Cliente pode reagendar via link único do agendamento | Conveniência |

### 4.8 Regras da MEL

| ID | Regra | Impacto |
|----|-------|---------|
| **RN-039** | MEL WhatsApp funciona independente da assinatura do módulo MEL | Diferencial |
| **RN-040** | Relatórios proativos enviados diariamente às 18h (vendas do dia) | Proatividade |
| **RN-041** | Relatório semanal enviado às segundas 9h (resumo semana) | Consistência |
| **RN-042** | MEL responde em até 2 minutos durante horário comercial | SLA |
| **RN-043** | Usuário pode desativar notificações da MEL individualmente | Controle |
| **RN-044** | MEL não tem acesso a dados sensíveis (senhas, dados bancários) | Privacidade |
| **RN-045** | Histórico de conversas com MEL armazenado por 6 meses | Compliance LGPD |

---

## 5. 🎯 Priorização MoSCoW

### 5.1 Must Have (MVP - Obrigatório para lançamento)

#### Core & Infraestrutura
- [ ] Sistema de autenticação (login, cadastro, recuperação senha)
- [ ] Dashboard inicial com navegação
- [ ] Cadastro de empresa (dados básicos)

#### Minha Empresa (Core)
- [ ] Cadastro de produtos (nome, descrição, preço, estoque)
- [ ] Cadastro de serviços
- [ ] Cadastro de clientes
- [ ] Configurações da conta

#### Marketplace
- [ ] Listagem de módulos disponíveis
- [ ] Instalação/desinstalação de módulos
- [ ] Gestão de assinaturas (visualizar, cancelar)

#### CRM
- [ ] Pipeline de vendas básico (Kanban)
- [ ] Cadastro de oportunidades
- [ ] Histórico de interações

#### Financeiro
- [ ] Contas a pagar
- [ ] Contas a receber
- [ ] Fluxo de caixa simplificado

#### Loja Virtual
- [ ] Template básico customizável
- [ ] Catálogo público de produtos
- [ ] Checkout (redireciona WhatsApp)
- [ ] Subdomínio [empresa].uniq.store

#### MEL (IA)
- [ ] Chat básico com MEL
- [ ] Relatório diário de vendas via WhatsApp
- [ ] Alerta de estoque baixo
- [ ] Onboarding guiado (Day 0-7)

### 5.2 Should Have (MVP se der tempo)

#### Minha Empresa
- [ ] Cadastro de fornecedores
- [ ] Cadastro de colaboradores
- [ ] Importação de produtos via Excel

#### CRM
- [ ] Segmentação de clientes
- [ ] Alertas de follow-up automáticos

#### Financeiro
- [ ] Contas bancárias
- [ ] Categorias financeiras
- [ ] DRE simplificada

#### Estoque
- [ ] Movimentações de estoque
- [ ] Alertas de estoque baixo
- [ ] Histórico de movimentações

#### Agendamentos
- [ ] Calendário de agendamentos
- [ ] Agendamento online público
- [ ] Lembretes automáticos

#### MEL
- [ ] Sugestões proativas de ação
- [ ] Alerta de risco de churn

### 5.3 Could Have (Pós-MVP - Mês 2-3)

- [ ] Módulo completo de estoque
- [ ] Loja Virtual com pagamento integrado (PIX, cartão)
- [ ] Múltiplos temas para loja
- [ ] Integração com Instagram Shopping
- [ ] Domínio próprio (não subdomínio)
- [ ] MEL responde clientes finais no WhatsApp
- [ ] Recuperação de carrinho abandonado
- [ ] API pública
- [ ] App mobile (PWA)
- [ ] Gamificação de onboarding
- [ ] Sistema de badges

### 5.4 Won't Have (Fora do escopo por enquanto)

- [ ] Emissão de NF-e (MVP foca em não-fiscal)
- [ ] Conciliação bancária automática
- [ ] App nativo iOS/Android
- [ ] Marketplace de templates de terceiros
- [ ] White-label / revenda
- [ ] Multi-idioma (foco PT-BR)
- [ ] Integração com marketplaces (ML, Shopee)
- [ ] Sistema de comissões complexo
- [ ] Controle de lotes e validade
- [ ] Múltiplas filiais/lojas

---

## 6. 📊 Métricas de Sucesso

### 6.1 Métricas de Aquisição

| Métrica | Target Mês 3 | Target Mês 6 | Target Mês 12 | Como Medir |
|---------|--------------|--------------|---------------|------------|
| **Leads/mês** | 5 | 10 | 20 | Form submissions |
| **Taxa de conversão** | 20% | 25% | 30% | Leads → Clientes |
| **CAC (Custo de Aquisição)** | <R$ 600 | <R$ 600 | <R$ 600 | Total gasto / clientes |
| **Setup pago** | 4 | 10 | 20 | Clientes pagando R$ 329 |

### 6.2 Métricas de Ativação

| Métrica | Target Mês 3 | Target Mês 6 | Target Mês 12 | Como Medir |
|---------|--------------|--------------|---------------|------------|
| **Time to First Value** | <7 dias | <5 dias | <3 dias | Dias até loja pública |
| **Ativação Day 14** | 50% | 70% | 80% | % completam checklist |
| **Primeira venda online** | <21 dias | <14 dias | <10 dias | Dias até 1ª venda |
| **Módulos instalados** | 2 | 3 | 3+ | Média por cliente |

### 6.3 Métricas de Retenção

| Métrica | Target Mês 3 | Target Mês 6 | Target Mês 12 | Como Medir |
|---------|--------------|--------------|---------------|------------|
| **Churn mensal** | <5% | <4% | <3% | % cancelamentos |
| **Churn anual** | <15% | <12% | <10% | % cancelamentos anual |
| **NPS** | >40 | >50 | >60 | Pesquisa mensal |
| **Engagement MEL** | 60% | 70% | 80% | % respondem mensagens |
| **Support tickets/cliente** | <3/mês | <2/mês | <1/mês | Tickets de suporte |

### 6.4 Métricas de Receita

| Métrica | Target Mês 3 | Target Mês 6 | Target Mês 12 | Como Medir |
|---------|--------------|--------------|---------------|------------|
| **MRR** | R$ 400 | R$ 1.000 | R$ 2.000 | Receita mensal recorrente |
| **ARPU** | R$ 109 | R$ 120 | R$ 150 | Receita média por usuário |
| **LTV** | R$ 1.308 | R$ 1.500 | R$ 1.800 | Valor do ciclo de vida |
| **LTV/CAC** | >2x | >3x | >4x | Relação valor/custo |
| **Payback CAC** | <6 meses | <4 meses | <3 meses | Meses para recuperar CAC |
| **Gross Margin** | 80% | 85% | 85% | Margem bruta |

### 6.5 Métricas de Produto

| Métrica | Target Mês 3 | Target Mês 6 | Target Mês 12 | Como Medir |
|---------|--------------|--------------|---------------|------------|
| **Uptime** | 99% | 99.5% | 99.9% | Tempo online |
| **Feature adoption** | 60% | 70% | 80% | % usam 3+ funcionalidades |
| **DAU/MAU** | 30% | 40% | 50% | Usuários ativos diários |
| **Session duration** | 10 min | 15 min | 20 min | Tempo médio de uso |

---

## 7. ⚠️ Riscos e Mitigações

### 7.1 Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Falha no servidor** | Baixa | Alto | Backups diários automáticos; monitoramento 24/7; plano de disaster recovery documentado |
| **Perda de dados** | Baixa | Crítico | Backups redundantes (Supabase + S3); testes de restore mensais |
| **API WhatsApp indisponível** | Média | Alto | Diversificar canais (email, SMS como backup); ter fallback para notificações |
| **Vulnerabilidade de segurança** | Média | Alto | Audits trimestrais; atualizações de segurança automáticas; criptografia de dados sensíveis |
| **Dependência técnica do founder** | Alta | Alto | Documentação completa da arquitetura; runbooks de troubleshooting; contratar dev backup no mês 12 |

### 7.2 Riscos de Negócio

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Churn alto (>20%)** | Média | Alto | Onboarding forte; MEL de retenção; coleta de feedback contínua; intervenção humana proativa |
| **CAC maior que LTV** | Média | Alto | Focar em canais orgânicos (indicações, parcerias); otimizar conversão antes de escalar ads |
| **Clientes não ativam** | Alto | Médio | Checklist gamificado; MEL guiando; suporte humano no Day 3 e Day 7; meta de ativação em 14 dias |
| **Preço muito alto/baixo** | Média | Médio | Testar iterativamente; coletar feedback de preço; ancorar contra valor (agência R$ 3k+) |
| **Burnout do founder** | Média | Crítico | Limitar 16h/semana; automatizar 80%; contratar VA no mês 6; férias programadas |

### 7.3 Riscos de Concorrência

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Concorrente copia MEL** | Média | Alto | Mover rápido (12-18 meses de vantagem); criar network effects; focar em relacionamento (difícil copiar) |
| **Bling/Omie lançam IA** | Média | Alto | Manter simplicidade (diferencial anti-ERP); especializar em nichos; velocidade de execução |
| **Gigante entra no mercado** | Baixa | Crítico | Focar em relacionamento pessoal; ser ágil; especialização vertical; parcerias locais |
| **Guerra de preços** | Média | Médio | Não competir em preço; destacar ROI e valor diferencial; manter margem saudável |

### 7.4 Riscos de Mercado

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Crise econômica/recessão** | Média | Alto | Manter preço acessível (R$ 109); criar plano básico (R$ 99); destacar ROI rápido |
| **Mudanças regulatórias (LGPD)** | Baixa | Médio | Compliance desde o início; consultoria jurídica quando escalar; transparência sobre dados |
| **Mudanças API (WhatsApp/Instagram)** | Média | Alto | Licença oficial WhatsApp Business API; diversificar canais; manter relacionamento com parceiros |
| **Resistência à tecnologia** | Média | Médio | Foco em simplicidade; MEL guiando; vídeos tutoriais; suporte humano inicial |

---

## 8. ✅ Checklist de Implementação MVP

### 8.1 Fase 1: Fundação (Semanas 1-2)

**Infraestrutura:**
- [ ] Ambiente de desenvolvimento configurado
- [ ] Supabase configurado (Auth, Database, Storage)
- [ ] Deploy inicial na Vercel
- [ ] Domínio configurado
- [ ] SSL/HTTPS ativo
- [ ] Variáveis de ambiente configuradas

**Autenticação:**
- [ ] Tela de login
- [ ] Tela de cadastro
- [ ] Recuperação de senha
- [ ] Validação de email

**Core:**
- [ ] Layout base (sidebar + header)
- [ ] Dashboard inicial
- [ ] Navegação entre módulos

### 8.2 Fase 2: Módulos Essenciais (Semanas 3-6)

**Minha Empresa:**
- [ ] Cadastro de empresa
- [ ] Cadastro de produtos (CRUD completo)
- [ ] Cadastro de serviços
- [ ] Cadastro de clientes
- [ ] Upload de imagens

**Marketplace:**
- [ ] Listagem de módulos
- [ ] Página de detalhes
- [ ] Instalação de módulo
- [ ] Gestão de assinaturas

**CRM:**
- [ ] Pipeline Kanban
- [ ] CRUD de oportunidades
- [ ] Histórico de interações

**Financeiro:**
- [ ] Contas a pagar
- [ ] Contas a receber
- [ ] Fluxo de caixa básico

### 8.3 Fase 3: Loja e MEL (Semanas 7-10)

**Loja Virtual:**
- [ ] Template customizável
- [ ] Catálogo público
- [ ] Página de produto
- [ ] Checkout (WhatsApp)
- [ ] Subdomínio dinâmico

**MEL:**
- [ ] Estrutura de chat
- [ ] Integração n8n
- [ ] Relatório diário de vendas
- [ ] Alerta estoque baixo
- [ ] Onboarding Day 0

### 8.4 Fase 4: Polimento (Semanas 11-12)

**Onboarding:**
- [ ] Checklist no dashboard
- [ ] Vídeos tutoriais gravados (5 vídeos)
- [ ] Emails automáticos (Day 0, 3, 7)
- [ ] MEL guia completo

**Qualidade:**
- [ ] Testes em múltiplos dispositivos
- [ ] Testes em múltiplos navegadores
- [ ] Performance otimizada
- [ ] Correção de bugs críticos

**Documentação:**
- [ ] Documentação técnica
- [ ] Guia do usuário básico
- [ ] FAQ inicial

### 8.5 Checkpoints de Go/No-Go

**Checkpoint MVP (Semana 12):**
- [ ] 4 clientes beta ativos
- [ ] Nenhum bug crítico aberto
- [ ] Loja pública funcionando
- [ ] MEL enviando relatórios
- [ ] NPS >40

**Definição de Pronto (Definition of Done):**
- [ ] Funcionalidade implementada
- [ ] Testada em staging
- [ ] Code review aprovado
- [ ] Documentação atualizada
- [ ] Sem bugs críticos
- [ ] Aprovada pelo Product Manager

---

## 📎 Apêndices

### Apêndice A: Glossário

| Termo | Definição |
|-------|-----------|
| **MEL** | Assistente digital inteligente da UNIQ |
| **MRR** | Monthly Recurring Revenue (Receita Mensal Recorrente) |
| **CAC** | Customer Acquisition Cost (Custo de Aquisição de Cliente) |
| **LTV** | Lifetime Value (Valor do Ciclo de Vida do Cliente) |
| **Churn** | Taxa de cancelamento de clientes |
| **NPS** | Net Promoter Score (medida de satisfação) |
| **MVP** | Minimum Viable Product (Produto Mínimo Viável) |
| **Setup** | Configuração inicial feita pela equipe UNIQ |
| **Blue Ocean** | Estratégia de mercado não contestado |
| **MEI** | Microempreendedor Individual |

### Apêndice B: Referências Estratégicas

Este PRD foi baseado nos seguintes documentos estratégicos:
- `LEAN_CANVAS.md` - Modelo de negócio
- `VALUE_PROPOSITION_CANVAS.md` - Proposta de valor
- `ANALISE_CONCORRENCIA.md` - Inteligência competitiva
- `PLANO_ACAO_PRIORITIZADO.md` - Roadmap de execução
- `SWOT_ANALYSIS.md` - Análise estratégica
- `ONBOARDING_AUTOMATION.md` - Automação de onboarding
- `PRICING_STRATEGY.md` - Estratégia de preços

### Apêndice C: Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Estilização** | Tailwind CSS |
| **Fonte** | Poppins |
| **Backend/DB** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Storage** | Supabase Storage |
| **Deploy** | Vercel |
| **Automação** | n8n |
| **WhatsApp** | WhatsApp Business API |

### Apêndice D: Cores do Sistema

| Cor | Hex | Uso |
|-----|-----|-----|
| **Verde Principal** | `#86cb92` | Botões primários, CTAs, destaques |
| **Escuro** | `#1f2937` | Textos, headers, contraste |
| **Cinza** | `#627271` | Textos secundários, ícones |
| **Fundo** | `#efefef` | Background geral |
| **Branco** | `#ffffff` | Cards, conteúdo |

---

**Documento vivo** - Última atualização: 12/03/2026  
**Próxima revisão:** Após lançamento do MVP (previsto: Semana 12)

*Criado seguindo as melhores práticas de Product Management*
