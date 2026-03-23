# PRD - Sprint 02: Auth UI

---

date: 2025-03-19T10:00:00-03:00
researcher: Claude Code (Anthropic)
git_commit: N/A (working directory)
branch: main
repository: uniq-empresas
topic: "Sprint 02 - Auth UI: Telas de Autenticação Frontend-Only"
tags: [sprint, auth, frontend, ui, nextjs, react]
status: draft
last_updated: 2025-03-19
last_updated_by: Claude Code

---

# Product Requirements Document (PRD)
## Sprint 02 - Auth UI

**Versão:** 1.0  
**Data:** 19/03/2026  
**Status:** Draft  
**Tipo:** Frontend Only (UI/UX)  
**Duração:** 1 semana  

---

## 1. Visão Geral da Sprint

### 1.1 Contexto
A Sprint 02 tem como objetivo implementar todas as interfaces visuais do fluxo de autenticação da plataforma UNIQ Empresas. Esta é uma sprint **frontend-only**, ou seja, não haverá integração com backend real - todos os dados serão mockados/simulados.

### 1.2 Objetivos
- Criar interfaces completas de autenticação (Login, Cadastro, Recuperação de Senha)
- Implementar validações visuais de formulários
- Garantir navegabilidade entre telas via rotas mock
- Aplicar o Design System desenvolvido na Sprint 01
- Garantir responsividade mobile-first

### 1.3 Público-Alvo
- Empreendedores e solopreneurs que precisam de uma plataforma simples e profissional
- Usuários que valorizam agilidade e clareza nas interfaces
- Perfil: pouco tempo, necessita de eficiência, prefere interfaces limpas

---

## 2. User Stories

### US-01: Login na Plataforma
**Como** usuário cadastrado  
**Quero** fazer login com email e senha  
**Para** acessar minha conta e gerenciar meu negócio  

**Critérios de Aceitação:**
- Formulário com campos de email e senha
- Validação visual em tempo real
- Estados de loading no botão de submit
- Mensagem de erro clara para credenciais inválidas
- Link para recuperação de senha
- Link para criar nova conta

### US-02: Cadastro de Nova Conta
**Como** novo usuário  
**Quero** criar uma conta na plataforma  
**Para** começar a usar o UNIQ Empresas  

**Critérios de Aceitação:**
- Formulário multi-step (Dados Pessoais → Empresa → Plano)
- Indicador visual de progresso (stepper)
- Validação em cada etapa
- Upload de logo com preview
- Seleção de plano com cards comparativos
- Tela de confirmação de email

### US-03: Recuperação de Senha
**Como** usuário que esqueceu a senha  
**Quero** solicitar uma nova senha  
**Para** recuperar acesso à minha conta  

**Critérios de Aceitação:**
- Formulário com campo de email
- Tela de confirmação de envio
- Tela de definição de nova senha
- Validação de força da senha
- Feedback visual em cada etapa

---

## 3. Interface & Fluxos

### 3.1 Fluxo de Navegação

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Login       │────▶│    Cadastro     │────▶│   Confirmação   │
│   (/login)      │     │  (/cadastro)    │     │   (/verificar)  │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         │         ┌─────────────────┐
         └────────▶│ Recuperar Senha │────▶┌─────────────────┐
                   │  (/recuperar)   │     │  Nova Senha     │
                   └─────────────────┘     │ (/nova-senha)   │
                                           └─────────────────┘
```

### 3.2 Estrutura de Pastas Proposta

```
app/
├── (auth)/                    # Grupo de rotas de autenticação
│   ├── layout.tsx             # Layout compartilhado (sem sidebar)
│   ├── login/
│   │   └── page.tsx           # Tela de login
│   ├── cadastro/
│   │   └── page.tsx           # Tela de cadastro multi-step
│   ├── recuperar/
│   │   └── page.tsx           # Tela de recuperação de senha
│   ├── nova-senha/
│   │   └── page.tsx           # Tela de definição de nova senha
│   └── verificar/
│       └── page.tsx           # Tela de confirmação de email
├── dashboard/
│   └── page.tsx               # Dashboard (já existe)
components/
├── ui/                        # Componentes base (já existem)
├── auth/                      # Componentes específicos de auth
│   ├── login-form.tsx         # Formulário de login
│   ├── register-form.tsx      # Formulário de cadastro
│   ├── forgot-password-form.tsx
│   ├── reset-password-form.tsx
│   ├── step-indicator.tsx     # Indicador de passos
│   ├── plan-card.tsx          # Card de seleção de plano
│   └── logo-upload.tsx        # Componente de upload de logo
hooks/
├── use-auth-form.ts           # Hook para gerenciamento de forms
lib/
├── auth-mock.ts               # Dados mockados de autenticação
├── validations.ts             # Validações de formulário
```

### 3.3 Design das Telas

#### 3.3.1 Tela de Login (/login)

**Layout:**
- Container centralizado com máximo de 420px
- Fundo com cor `uniq-platinum` (#efefef)
- Card branco com sombra suave
- Logo UNIQ no topo
- Ilustração decorativa (opcional)

**Componentes:**
| Elemento | Componente | Props Importantes |
|----------|------------|-------------------|
| Card | `Card` | `className="max-w-md mx-auto"` |
| Título | `CardTitle` | - |
| Input Email | `Input` | `type="email"`, `error` |
| Input Senha | `Input` | `type="password"`, `error` |
| Label | `Label` | `required` |
| Botão Submit | `Button` | `isLoading` state |
| Links | `Link` (Next.js) | - |

**Estados:**
1. **Default:** Formulário vazio, botão habilitado
2. **Validating:** Validação em tempo real dos campos
3. **Submitting:** Loading no botão, campos desabilitados
4. **Error:** Bordas vermelhas, mensagem de erro
5. **Success:** Redirecionamento para dashboard

**Mock Behavior:**
```typescript
// Credenciais válidas mockadas
const VALID_CREDENTIALS = {
  email: "demo@uniq.com",
  password: "123456"
};

// Simula delay de 1.5s
// Sucesso: redireciona para /dashboard
// Erro: exibe toast de erro
```

#### 3.3.2 Tela de Cadastro (/cadastro)

**Layout:**
- Container centralizado com máximo de 600px
- Stepper horizontal no topo do card
- Conteúdo muda conforme o passo atual
- Botões de navegação (Voltar/Próximo)

**Steps:**

**Step 1: Dados Pessoais**
| Campo | Tipo | Validação |
|-------|------|-----------|
| Nome Completo | text | Obrigatório, min 3 chars |
| Email | email | Obrigatório, formato válido |
| Telefone | tel | Obrigatório, formato BR |
| Senha | password | Obrigatório, min 6 chars |
| Confirmar Senha | password | Deve ser igual à senha |

**Step 2: Dados da Empresa**
| Campo | Tipo | Validação |
|-------|------|-----------|
| Nome da Empresa | text | Obrigatório |
| CNPJ | text | Obrigatório, formato válido |
| Segmento | select | Obrigatório |
| Logo | file upload | Opcional, max 2MB |

**Step 3: Seleção de Plano**
- 3 cards de planos lado a lado (grid 3 cols)
- Destaque para plano recomendado
- Botão "Começar" em cada card
- Resumo do plano selecionado

**Planos Mockados:**
```typescript
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 29",
    period: "/mês",
    features: ["Até 100 clientes", "5GB armazenamento", "Relatórios básicos"],
    recommended: false
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 79",
    period: "/mês",
    features: ["Clientes ilimitados", "50GB armazenamento", "Relatórios avançados", "Suporte prioritário"],
    recommended: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "R$ 199",
    period: "/mês",
    features: ["Tudo do Pro", "API access", "White label", "Suporte 24/7"],
    recommended: false
  }
];
```

**Step 4: Confirmação de Email**
- Tela estática de sucesso
- Ícone de email/check
- Mensagem: "Verifique seu email para ativar sua conta"
- Botão: "Ir para o login"

#### 3.3.3 Tela de Recuperação de Senha (/recuperar)

**Layout:**
- Similar ao login (card centralizado)
- Campo único de email
- Botão "Enviar instruções"

**Fluxo:**
1. Usuário preenche email
2. Clica em enviar
3. Simula delay de 2s
4. Mostra tela de sucesso

**Tela de Sucesso:**
- Ícone de email enviado (verde)
- Mensagem: "Enviamos as instruções para seu email"
- Botão: "Voltar para o login"

#### 3.3.4 Tela de Nova Senha (/nova-senha)

**Layout:**
- Card centralizado
- Dois campos de senha
- Indicador de força da senha

**Campos:**
| Campo | Validação |
|-------|-----------|
| Nova Senha | Min 6 chars, força mínima: média |
| Confirmar Nova Senha | Deve ser igual |

**Indicador de Força:**
- Fraca: Vermelho ( menos de 6 chars)
- Média: Amarelo (6-8 chars, sem símbolos)
- Forte: Verde (8+ chars, com símbolos)

---

## 4. Requisitos Funcionais

### 4.1 Requisitos da Tela de Login

| ID | Requisito | Prioridade | Componentes Utilizados |
|----|-----------|------------|------------------------|
| LOGIN-01 | Formulário com campos Email e Senha | Alta | `Input`, `Label`, `Card` |
| LOGIN-02 | Validação visual: borda vermelha e mensagem de erro | Alta | `Input` com prop `error` |
| LOGIN-03 | Link "Esqueci minha senha" | Alta | `Link` (Next.js) |
| LOGIN-04 | Link "Criar conta" | Alta | `Link` (Next.js) |
| LOGIN-05 | Estado de loading no botão durante submit | Alta | `Button` com spinner |
| LOGIN-06 | Toast de erro para credenciais inválidas | Alta | `toast` com variant `error` |
| LOGIN-07 | Redirecionamento para /dashboard em caso de sucesso | Alta | `useRouter` |
| LOGIN-08 | Persistência mock de sessão (localStorage) | Média | - |

### 4.2 Requisitos da Tela de Cadastro

| ID | Requisito | Prioridade | Componentes Utilizados |
|----|-----------|------------|------------------------|
| REG-01 | Formulário multi-step (3 passos) | Alta | Custom stepper |
| REG-02 | Indicador visual de progresso | Alta | `Tabs` ou componente custom |
| REG-03 | Validação em tempo real por campo | Alta | React Hook Form |
| REG-04 | Upload de logo com preview | Média | `Input` type="file" + preview |
| REG-05 | Cards de planos comparativos | Alta | `Card` customizado |
| REG-06 | Tela de confirmação de email | Alta | `Card` + ícone |
| REG-07 | Navegação entre passos (Próximo/Voltar) | Alta | `Button` |
| REG-08 | Validação de CNPJ (formato) | Média | Regex validation |
| REG-09 | Máscara de telefone | Média | Input mask |
| REG-10 | Validação de senha (confirmação) | Alta | - |

### 4.3 Requisitos da Recuperação de Senha

| ID | Requisito | Prioridade | Componentes Utilizados |
|----|-----------|------------|------------------------|
| REC-01 | Formulário com campo de email | Alta | `Input`, `Label` |
| REC-02 | Tela de sucesso "Email enviado" | Alta | `Card` + ícone |
| REC-03 | Tela de nova senha | Alta | `Input` (2x), força visual |
| REC-04 | Indicador de força da senha | Média | Progress bar custom |
| REC-05 | Validação de confirmação de senha | Alta | - |

---

## 5. Requisitos Não-Funcionais

### 5.1 Performance
- **RNF-01:** Time to Interactive (TTI) < 3 segundos
- **RNF-02:** Feedback visual em menos de 100ms após interação
- **RNF-03:** Animações suaves (300ms) sem travamentos

### 5.2 Responsividade
- **RNF-04:** Layout mobile-first (320px base)
- **RNF-05:** Formulários full-width em mobile
- **RNF-06:** Cards de planos em coluna única em mobile
- **RNF-07:** Stepper vertical em mobile (se necessário)

### 5.3 Acessibilidade
- **RNF-08:** Contraste mínimo 4.5:1 para textos
- **RNF-09:** Suporte a navegação por teclado (Tab, Enter)
- **RNF-10:** Labels associados corretamente aos inputs
- **RNF-11:** Mensagens de erro claras e específicas

### 5.4 Segurança (Frontend)
- **RNF-12:** Máscara de senha (dots)
- **RNF-13:** Sanitização básica de inputs
- **RNF-14:** Rate limiting mock (evitar spam de submits)

### 5.5 Design System
- **RNF-15:** Uso estrito das cores do tema UNIQ
- **RNF-16:** Tipografia Poppins em todos os textos
- **RNF-17:** Bordas arredondadas consistentes (rounded-lg)
- **RNF-18:** Espaçamento seguindo escala do Tailwind

---

## 6. Critérios de Aceitação

### Checklist de Entrega

- [ ] **Fluxo Completo Navegável**
  - [ ] Navegação /login ↔ /cadastro
  - [ ] Navegação /login ↔ /recuperar
  - [ ] Navegação /cadastro → /verificar
  - [ ] Navegação /recuperar → /nova-senha (mock)

- [ ] **Tela de Login Implementada**
  - [ ] Formulário com email e senha
  - [ ] Validação visual de campos obrigatórios
  - [ ] Estado de loading no botão
  - [ ] Toast de erro para credenciais inválidas
  - [ ] Redirecionamento para dashboard com sucesso

- [ ] **Tela de Cadastro Implementada**
  - [ ] Stepper funcional (3 passos)
  - [ ] Validação em cada etapa
  - [ ] Upload de logo com preview
  - [ ] Cards de planos selecionáveis
  - [ ] Tela de confirmação de email

- [ ] **Tela de Recuperação Implementada**
  - [ ] Formulário de email
  - [ ] Tela de sucesso
  - [ ] Tela de nova senha
  - [ ] Indicador de força de senha

- [ ] **Validações Visuais**
  - [ ] Borda vermelha em campos inválidos
  - [ ] Mensagens de erro abaixo dos campos
  - [ ] Indicação de campos obrigatórios (*)

- [ ] **Estados de Loading**
  - [ ] Spinner no botão durante submit
  - [ ] Campos desabilitados durante loading
  - [ ] Feedback visual de processamento

- [ ] **Responsividade**
  - [ ] Layout funciona em 320px+
  - [ ] Formulários full-width em mobile
  - [ ] Cards empilhados em mobile
  - [ ] Textos legíveis em todas as telas

- [ ] **Design System**
  - [ ] Cores UNIQ aplicadas corretamente
  - [ ] Componentes do Design System reutilizados
  - [ ] Tipografia Poppins consistente
  - [ ] Espaçamento consistente

---

## 7. Notas de Implementação

### 7.1 Componentes do Design System Disponíveis

A Sprint 01 entregou os seguintes componentes em `components/ui/`:

| Componente | Arquivo | Props Relevantes |
|------------|---------|------------------|
| Button | `button.tsx` | `variant`, `size`, `disabled`, `asChild` |
| Card | `card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` |
| Input | `input.tsx` | `error`, `type`, `placeholder`, `disabled` |
| Label | `label.tsx` | `required`, `error` |
| Badge | `badge.tsx` | `variant` (default, success, warning, error) |
| Avatar | `avatar.tsx` | `Avatar`, `AvatarImage`, `AvatarFallback` |
| Dialog | `dialog.tsx` | Para modais de confirmação |
| Tabs | `tabs.tsx` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| Toast | `toast.tsx` | `variant` (default, success, error, warning, info) |
| Select | `select.tsx` | Para seleção de segmento |
| Checkbox | `checkbox.tsx` | Para termos e condições |
| Switch | `switch.tsx` | Para toggles |
| Skeleton | `skeleton.tsx` | Para estados de loading |
| Separator | `separator.tsx` | Divisores visuais |
| Tooltip | `tooltip.tsx` | Dicas de ajuda |
| Textarea | `textarea.tsx` | Para campos maiores |
| Dropdown Menu | `dropdown-menu.tsx` | Para menus de ação |

### 7.2 Paleta de Cores do Design System

```css
/* Cores UNIQ definidas no tailwind.config.ts */
--uniq-primary: #3e5653;      /* Verde escuro - CTAs primários */
--uniq-hover: #1f2937;        /* Hover de botões */
--uniq-accent: #86cb92;       /* Verde claro - Destaques */
--uniq-text: #1f2937;         /* Texto principal */
--uniq-muted: #627271;        /* Texto secundário */
--uniq-border: #e5e7eb;       /* Bordas */
--uniq-platinum: #efefef;     /* Fundo da página */
--uniq-white: #ffffff;        /* Fundo de cards */
--uniq-sidebar: #1f2937;      /* Fundo sidebar */
```

### 7.3 Bibliotecas Recomendadas

Para esta sprint, recomenda-se instalar:

```bash
# Formulários e validação
npm install react-hook-form zod @hookform/resolvers

# Máscaras de input
npm install react-input-mask

# Ícones (já instalado)
# lucide-react

# Animações (opcional)
npm install framer-motion
```

### 7.4 Estrutura de Mock de Dados

```typescript
// lib/auth-mock.ts

export const MOCK_USERS = [
  {
    id: "1",
    email: "demo@uniq.com",
    password: "123456",
    name: "Usuário Demo",
    company: "Empresa Demo LTDA"
  }
];

export const MOCK_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    features: ["Até 100 clientes", "5GB armazenamento", "Relatórios básicos"]
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    features: ["Clientes ilimitados", "50GB armazenamento", "Relatórios avançados", "Suporte prioritário"],
    recommended: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    features: ["Tudo do Pro", "API access", "White label", "Suporte 24/7"]
  }
];

// Simula delay de API
export const mockDelay = (ms: number = 1500) => 
  new Promise(resolve => setTimeout(resolve, ms));
```

### 7.5 Padrões de Código

**Exemplo de Componente de Formulário:**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validação mock
    await mockDelay();
    
    // Simula login
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Entrar na sua conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos do formulário */}
        </form>
      </CardContent>
    </Card>
  );
}
```

---

## 8. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Complexidade do multi-step** | Média | Alto | Usar biblioteca como react-hook-form com contexto de formulário |
| **Upload de arquivo no client** | Baixa | Médio | Usar FileReader API para preview, validar tamanho e tipo |
| **Validações complexas (CNPJ)** | Baixa | Médio | Usar biblioteca de validação (zod) com regex |
| **Responsividade em telas pequenas** | Média | Médio | Testar em 320px, usar breakpoints do Tailwind |
| **Dependência de componentes externos** | Baixa | Alto | Manter cópias locais ou usar versões fixas no package.json |
| **Performance de renderização** | Baixa | Médio | Usar React.memo onde apropriado, lazy load de steps |

---

## 9. Referências

### 9.1 Documentação Interna
- Design System: `components/ui/` (Sprint 01)
- Cores: `tailwind.config.ts`
- Estilos globais: `app/globals.css`

### 9.2 Documentação Externa
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Radix UI Primitives](https://www.radix-ui.com/)

### 9.3 Inspiração de UI
- Stripe: Checkout multi-step
- Vercel: Login minimalista
- Linear: Autenticação clean

---

## 10. Histórico de Revisões

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0 | 19/03/2026 | Claude Code | Criação inicial do PRD |

---

## 11. Apêndice

### A. Fluxo de Estados de um Campo

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
|   Vazio    |────▶|  Preenchido |────▶|   Válido   |
└─────────────┘     └─────────────┘     └──────┬──────┘
                                                |
                        ┌───────────────────────┘
                        |
                        ▼
                ┌─────────────┐     ┌─────────────┐
                |   Submit    |────▶|   Loading   |
                └─────────────┘     └──────┬──────┘
                                           |
                    ┌──────────────────────┼──────────────────────┐
                    |                      |                      |
                    ▼                      ▼                      ▼
            ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
            |    Erro     |        |   Sucesso   |        |   Erro API  |
            | (Validação) |        |             |        |             |
            └─────────────┘        └─────────────┘        └─────────────┘
```

### B. Mensagens de Erro Padrão

| Campo | Erro | Mensagem |
|-------|------|----------|
| Email | Obrigatório | "Email é obrigatório" |
| Email | Formato | "Digite um email válido" |
| Senha | Obrigatória | "Senha é obrigatória" |
| Senha | Tamanho | "Senha deve ter pelo menos 6 caracteres" |
| Confirmar Senha | Diferente | "As senhas não coincidem" |
| Nome | Obrigatório | "Nome é obrigatório" |
| CNPJ | Formato | "CNPJ inválido" |
| Telefone | Formato | "Telefone inválido" |

### C. Mock de Delay de API

```typescript
// Simular comportamento de API real
const simulateApiCall = async <T,>(
  data: T, 
  shouldFail: boolean = false,
  delay: number = 1500
): Promise<T> => {
  await new Promise(resolve => setTimeout(resolve, delay));
  
  if (shouldFail) {
    throw new Error("Erro simulado da API");
  }
  
  return data;
};
```

---

**Fim do Documento**

*Este PRD foi gerado como parte do processo de Spec Driven Development (SDD) para a Sprint 02 do projeto UNIQ Empresas.*
