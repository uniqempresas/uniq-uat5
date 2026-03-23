# SPEC Técnico - Sprint 02: Auth UI

**Versão:** 1.0  
**Data:** 20/03/2026  
**Status:** Draft  
**Tipo:** Frontend Only (UI/UX)  
**Duração:** 1 semana  

---

## 1. Visão Geral da Implementação

### 1.1 Resumo do que será construído

Esta sprint implementa o fluxo completo de autenticação da plataforma UNIQ Empresas, incluindo:
- **Tela de Login** com email e senha
- **Cadastro Multi-step** (3 etapas: Dados Pessoais → Empresa → Plano)
- **Recuperação de Senha** (solicitação + nova senha)
- **Verificação de Email** (tela de confirmação)

**Frontend-only**: Toda a lógica será mockada/simulada, sem integração com backend real.

### 1.2 Stack Tecnológica Detalhada

| Categoria | Tecnologia | Versão | Uso |
|-----------|------------|--------|-----|
| Framework | Next.js | 14.2.5 | App Router, Server/Client Components |
| UI Library | React | 18.3.1 | Componentes funcionais, Hooks |
| Language | TypeScript | 5.4.5 | Type safety |
| Styling | Tailwind CSS | 3.4.4 | Utility-first CSS |
| UI Components | Radix UI | Latest | Primitives acessíveis |
| Forms | React Hook Form | Latest | Gerenciamento de formulários |
| Validation | Zod | Latest | Validação de schemas |
| Icons | Lucide React | 0.400.0 | Ícones consistentes |
| Animations | Tailwind Animate | 1.0.7 | Transições e animações |

### 1.3 Dependências a Instalar

```bash
# Formulários e validação
npm install react-hook-form zod @hookform/resolvers

# Máscaras de input
npm install react-input-mask

# Animações (opcional - para transições suaves)
npm install framer-motion
```

---

## 2. Estrutura de Arquivos e Pastas

```
app/
├── (auth)/                         # Grupo de rotas de autenticação
│   ├── layout.tsx                  # Layout compartilhado (sem sidebar, fundo uniq-platinum)
│   ├── login/
│   │   └── page.tsx               # Tela de login
│   ├── cadastro/
│   │   └── page.tsx               # Tela de cadastro multi-step
│   ├── recuperar/
│   │   └── page.tsx               # Tela de recuperação de senha
│   ├── nova-senha/
│   │   └── page.tsx               # Tela de definição de nova senha
│   └── verificar/
│       └── page.tsx               # Tela de confirmação de email
├── dashboard/
│   └── page.tsx                   # Dashboard (já existe - redirecionamento)
├── layout.tsx                     # Layout raiz (já existe)
├── page.tsx                       # Home (redireciona para /dashboard)
└── globals.css                    # Estilos globais (já existe)

components/
├── ui/                            # Componentes base do Design System (já existem)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── badge.tsx
│   ├── dialog.tsx
│   ├── tabs.tsx
│   ├── toast.tsx
│   ├── toaster.tsx
│   ├── select.tsx
│   ├── checkbox.tsx
│   ├── skeleton.tsx
│   └── ...
└── auth/                          # NOVOS: Componentes específicos de auth
    ├── login-form.tsx            # Formulário de login
    ├── register-wizard.tsx       # Wizard de cadastro multi-step
    ├── step-indicator.tsx        # Indicador visual de progresso
    ├── step-personal.tsx         # Step 1: Dados pessoais
    ├── step-company.tsx          # Step 2: Dados da empresa
    ├── step-plan.tsx             # Step 3: Seleção de plano
    ├── plan-card.tsx             # Card de seleção de plano
    ├── logo-upload.tsx           # Componente de upload de logo com preview
    ├── forgot-password-form.tsx  # Formulário de recuperação
    ├── reset-password-form.tsx   # Formulário de nova senha
    ├── password-strength.tsx     # Indicador de força da senha
    └── email-verification.tsx    # Tela de verificação de email

hooks/
├── use-toast.ts                   # Hook de toast (já existe)
└── use-auth-form.ts              # NOVO: Hook para gerenciamento de forms de auth

lib/
├── utils.ts                       # Utilitários (já existe)
├── validations.ts                # NOVO: Schemas de validação Zod
└── auth-mock.ts                  # NOVO: Dados mockados de autenticação

types/
└── auth.ts                       # NOVO: Tipos TypeScript para auth
```

---

## 3. Componentes a Criar

### 3.1 Layout de Autenticação

**Arquivo:** `app/(auth)/layout.tsx`

**Props:** Nenhuma (layout de grupo)

**Descrição:** Layout compartilhado para todas as páginas de autenticação. Remove sidebar e usa fundo uniq-platinum.

**Código:**
```typescript
"use client";

import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-uniq-platinum flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
```

**Classes Tailwind:**
- `min-h-screen`: Altura mínima 100vh
- `bg-uniq-platinum`: Fundo #efefef
- `flex items-center justify-center`: Centralização perfeita
- `p-4`: Padding em todas as direções
- `w-full max-w-md`: Largura total, máximo 448px

---

### 3.2 Login Form

**Arquivo:** `components/auth/login-form.tsx`

**Props Interface:**
```typescript
interface LoginFormProps {
  onSuccess?: () => void;
}
```

**Estados (useState):**
```typescript
const [isLoading, setIsLoading] = useState(false);
```

**Hook Form:**
```typescript
const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});
```

**Handlers:**
```typescript
const onSubmit = async (data: LoginFormData) => {
  setIsLoading(true);
  try {
    await mockLogin(data.email, data.password);
    toast({
      title: "Login realizado!",
      description: "Redirecionando...",
      variant: "success",
    });
    router.push("/dashboard");
  } catch (error) {
    toast({
      title: "Erro no login",
      description: "Email ou senha incorretos",
      variant: "error",
    });
  } finally {
    setIsLoading(false);
  }
};
```

**Estrutura do Componente:**
```tsx
<Card className="w-full">
  <CardHeader className="space-y-1">
    <div className="flex justify-center mb-4">
      {/* Logo UNIQ */}
    </div>
    <CardTitle className="text-2xl font-bold text-center">
      Entrar na sua conta
    </CardTitle>
    <CardDescription className="text-center">
      Digite suas credenciais para continuar
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        {/* Password Field */}
        {/* Submit Button */}
        {/* Links */}
      </form>
    </Form>
  </CardContent>
</Card>
```

**Classes Tailwind:**
- Card: `w-full shadow-lg`
- CardHeader: `space-y-1 pb-6`
- CardTitle: `text-2xl font-bold text-center text-uniq-text`
- CardDescription: `text-center text-uniq-muted`
- Form: `space-y-4`
- Input Group: `space-y-2`
- Label: `text-sm font-medium text-uniq-text`
- Input: `h-11 bg-[#f9fafb] border-uniq-border focus:border-uniq-accent focus:ring-uniq-accent`
- Error message: `text-sm text-red-500 mt-1`
- Submit Button: `w-full h-11 bg-uniq-primary hover:bg-uniq-hover text-white font-medium`
- Links: `text-sm text-uniq-primary hover:underline`

---

### 3.3 Register Wizard (Multi-step)

**Arquivo:** `components/auth/register-wizard.tsx`

**Props Interface:**
```typescript
interface RegisterWizardProps {
  onComplete?: () => void;
}

interface RegisterFormData {
  // Step 1 - Personal
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Step 2 - Company
  companyName: string;
  cnpj: string;
  segment: string;
  logo?: string;
  // Step 3 - Plan
  planId: string;
}
```

**Estados (useState):**
```typescript
const [currentStep, setCurrentStep] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState<Partial<RegisterFormData>>({});
```

**Steps Array:**
```typescript
const steps = [
  { id: 1, title: "Dados Pessoais", description: "Suas informações" },
  { id: 2, title: "Empresa", description: "Dados da empresa" },
  { id: 3, title: "Plano", description: "Escolha seu plano" },
];
```

**Step Indicator Component:**
```typescript
// components/auth/step-indicator.tsx
interface StepIndicatorProps {
  steps: { id: number; title: string; description: string }[];
  currentStep: number;
}
```

**Classes Tailwind para Step Indicator:**
- Container: `flex items-center justify-between mb-8`
- Step Circle (pending): `w-10 h-10 rounded-full border-2 border-uniq-border bg-white text-uniq-muted flex items-center justify-center font-semibold`
- Step Circle (active): `w-10 h-10 rounded-full border-2 border-uniq-primary bg-uniq-primary text-white flex items-center justify-center font-semibold`
- Step Circle (completed): `w-10 h-10 rounded-full border-2 border-uniq-accent bg-uniq-accent text-white flex items-center justify-center font-semibold`
- Connector Line: `flex-1 h-0.5 bg-uniq-border mx-2`
- Connector Line (active): `flex-1 h-0.5 bg-uniq-accent mx-2`
- Step Label: `text-sm font-medium text-uniq-text mt-2`
- Step Description: `text-xs text-uniq-muted`

**Navegação entre Steps:**
```typescript
const handleNext = async () => {
  const isValid = await validateCurrentStep();
  if (isValid) {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  }
};

const handleBack = () => {
  setCurrentStep((prev) => Math.max(prev - 1, 1));
};
```

---

### 3.4 Step Personal (Step 1)

**Arquivo:** `components/auth/step-personal.tsx`

**Props Interface:**
```typescript
interface StepPersonalProps {
  form: UseFormReturn<RegisterFormData>;
}
```

**Campos:**
| Campo | Componente | Classes Tailwind |
|-------|------------|------------------|
| Nome Completo | Input + Label | `space-y-2` container, input `h-11` |
| Email | Input + Label | `type="email"`, validação de formato |
| Telefone | Input + Label | Com máscara `(99) 99999-9999` |
| Senha | Input + Label | `type="password"`, min 6 chars |
| Confirmar Senha | Input + Label | Validação de match com senha |

**Classes Tailwind:**
- Container: `space-y-4`
- Input Group: `space-y-2`
- Label: `text-sm font-medium flex items-center`
- Required Indicator: `text-red-500 ml-1`
- Input: `h-11 bg-[#f9fafb] border-uniq-border rounded-lg focus:border-uniq-accent focus:ring-2 focus:ring-uniq-accent`
- Error: `text-sm text-red-500 mt-1 flex items-center gap-1`

---

### 3.5 Step Company (Step 2)

**Arquivo:** `components/auth/step-company.tsx`

**Props Interface:**
```typescript
interface StepCompanyProps {
  form: UseFormReturn<RegisterFormData>;
}
```

**Campos:**
| Campo | Componente | Classes Tailwind |
|-------|------------|------------------|
| Nome da Empresa | Input + Label | `h-11`, obrigatório |
| CNPJ | Input + Label | Com máscara `99.999.999/9999-99` |
| Segmento | Select + Label | Dropdown com opções |
| Logo | LogoUpload | Componente customizado |

**Segment Options:**
```typescript
const segments = [
  { value: "tech", label: "Tecnologia" },
  { value: "retail", label: "Varejo" },
  { value: "services", label: "Serviços" },
  { value: "industry", label: "Indústria" },
  { value: "health", label: "Saúde" },
  { value: "education", label: "Educação" },
  { value: "other", label: "Outro" },
];
```

**Logo Upload Component:**
```typescript
// components/auth/logo-upload.tsx
interface LogoUploadProps {
  value?: string;
  onChange: (value: string) => void;
}
```

**Classes Tailwind para Logo Upload:**
- Container: `border-2 border-dashed border-uniq-border rounded-lg p-6 text-center hover:border-uniq-accent transition-colors cursor-pointer`
- Preview: `w-24 h-24 mx-auto mb-4 rounded-lg object-cover border border-uniq-border`
- Placeholder Icon: `w-12 h-12 text-uniq-muted mx-auto mb-2`
- Text: `text-sm text-uniq-muted`
- Upload Hint: `text-xs text-uniq-muted mt-1`

---

### 3.6 Step Plan (Step 3)

**Arquivo:** `components/auth/step-plan.tsx`

**Props Interface:**
```typescript
interface StepPlanProps {
  form: UseFormReturn<RegisterFormData>;
}
```

**Plan Card Component:**
```typescript
// components/auth/plan-card.tsx
interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
  isRecommended?: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
}
```

**Classes Tailwind para Plan Card:**
- Container (default): `border border-uniq-border rounded-xl p-6 bg-white hover:border-uniq-primary transition-all cursor-pointer`
- Container (selected): `border-2 border-uniq-primary rounded-xl p-6 bg-white shadow-md ring-2 ring-uniq-primary ring-opacity-20`
- Container (recommended): `border-2 border-uniq-accent rounded-xl p-6 bg-white relative overflow-hidden`
- Recommended Badge: `absolute top-0 right-0 bg-uniq-accent text-white text-xs font-semibold px-3 py-1 rounded-bl-lg`
- Plan Name: `text-xl font-bold text-uniq-text`
- Price: `text-3xl font-bold text-uniq-primary mt-2`
- Period: `text-sm text-uniq-muted`
- Features List: `mt-4 space-y-2`
- Feature Item: `flex items-center gap-2 text-sm text-uniq-text`
- Check Icon: `w-4 h-4 text-uniq-accent flex-shrink-0`
- Select Button: `w-full mt-6 bg-uniq-primary hover:bg-uniq-hover text-white`
- Select Button (selected): `w-full mt-6 bg-uniq-accent hover:bg-uniq-accent/90 text-white`

**Planos:**
```typescript
const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 29",
    period: "/mês",
    features: ["Até 100 clientes", "5GB armazenamento", "Relatórios básicos"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 79",
    period: "/mês",
    features: [
      "Clientes ilimitados",
      "50GB armazenamento",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "R$ 199",
    period: "/mês",
    features: [
      "Tudo do Pro",
      "API access",
      "White label",
      "Suporte 24/7",
    ],
  },
];
```

**Grid de Planos (Desktop):**
- Container: `grid grid-cols-1 md:grid-cols-3 gap-4`

---

### 3.7 Forgot Password Form

**Arquivo:** `components/auth/forgot-password-form.tsx`

**Props Interface:**
```typescript
interface ForgotPasswordFormProps {
  onSuccess?: () => void;
}
```

**Estados:**
```typescript
const [isLoading, setIsLoading] = useState(false);
const [isSent, setIsSent] = useState(false);
```

**Schema:**
```typescript
const forgotPasswordSchema = z.object({
  email: z.string().email("Digite um email válido"),
});
```

**Classes Tailwind:**
- Container: `w-full max-w-md`
- Success State: `text-center py-8`
- Success Icon: `w-16 h-16 mx-auto mb-4 text-uniq-accent bg-uniq-accent/10 rounded-full p-4`
- Success Title: `text-xl font-bold text-uniq-text mb-2`
- Success Message: `text-uniq-muted mb-6`

---

### 3.8 Reset Password Form

**Arquivo:** `components/auth/reset-password-form.tsx`

**Props Interface:**
```typescript
interface ResetPasswordFormProps {
  token?: string;
  onSuccess?: () => void;
}
```

**Password Strength Component:**
```typescript
// components/auth/password-strength.tsx
interface PasswordStrengthProps {
  password: string;
}

type StrengthLevel = "weak" | "medium" | "strong";
```

**Lógica de Força:**
```typescript
const getStrength = (password: string): StrengthLevel => {
  if (password.length < 6) return "weak";
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
    return "medium";
  }
  return "strong";
};
```

**Classes Tailwind para Password Strength:**
- Container: `mt-2 space-y-2`
- Progress Bar Container: `h-1.5 bg-uniq-platinum rounded-full overflow-hidden`
- Progress Bar (weak): `h-full bg-red-500 transition-all duration-300 w-1/3`
- Progress Bar (medium): `h-full bg-yellow-500 transition-all duration-300 w-2/3`
- Progress Bar (strong): `h-full bg-green-500 transition-all duration-300 w-full`
- Label (weak): `text-xs text-red-500 font-medium`
- Label (medium): `text-xs text-yellow-600 font-medium`
- Label (strong): `text-xs text-green-600 font-medium`

---

### 3.9 Email Verification

**Arquivo:** `components/auth/email-verification.tsx`

**Props Interface:**
```typescript
interface EmailVerificationProps {
  email?: string;
}
```

**Classes Tailwind:**
- Container: `text-center py-8`
- Icon Container: `w-20 h-20 mx-auto mb-6 rounded-full bg-uniq-accent/10 flex items-center justify-center`
- Icon: `w-10 h-10 text-uniq-accent`
- Title: `text-2xl font-bold text-uniq-text mb-3`
- Description: `text-uniq-muted mb-2`
- Email Highlight: `text-uniq-primary font-medium`
- Instructions: `text-sm text-uniq-muted mb-8 max-w-sm mx-auto`
- Button: `bg-uniq-primary hover:bg-uniq-hover text-white px-8`

---

## 4. Fluxos de Navegação

### 4.1 Rotas

| Rota | Arquivo | Componente Principal |
|------|---------|---------------------|
| `/login` | `app/(auth)/login/page.tsx` | `LoginForm` |
| `/cadastro` | `app/(auth)/cadastro/page.tsx` | `RegisterWizard` |
| `/recuperar` | `app/(auth)/recuperar/page.tsx` | `ForgotPasswordForm` |
| `/nova-senha` | `app/(auth)/nova-senha/page.tsx` | `ResetPasswordForm` |
| `/verificar` | `app/(auth)/verificar/page.tsx` | `EmailVerification` |

### 4.2 Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────────────────┐
│                         FLUXO DE LOGIN                          │
└─────────────────────────────────────────────────────────────────┘

Usuário acessa /login
    │
    ▼
┌─────────────┐
│ Login Form  │
│  (render)   │
└──────┬──────┘
       │
       │ Preenche email/senha
       ▼
┌─────────────┐
│  Validação  │◄──── Zod Schema
│   (Zod)     │      - Email válido
└──────┬──────┘      - Senha min 6 chars
       │
       │ Submit
       ▼
┌─────────────┐
│   Loading   │◄──── setIsLoading(true)
│   State     │      Button spinner
└──────┬──────┘
       │
       │ API Mock (1.5s delay)
       ▼
┌─────────────┐
│   Success   │────► Toast sucesso
│             │────► Redirect /dashboard
└─────────────┘
       │
       │ Error
       ▼
┌─────────────┐
│    Error    │────► Toast erro
│             │      "Email ou senha incorretos"
└─────────────┘
```

### 4.3 Fluxo de Cadastro Multi-step

```
┌─────────────────────────────────────────────────────────────────┐
│                      FLUXO DE CADASTRO                          │
└─────────────────────────────────────────────────────────────────┘

Usuário acessa /cadastro
    │
    ▼
┌─────────────────────────────────────────┐
│         REGISTER WIZARD                 │
│  ┌─────┐    ┌─────┐    ┌─────┐         │
│  │Step1│───▶│Step2│───▶│Step3│         │
│  │     │◀───│     │◀───│     │         │
│  └─────┘    └─────┘    └─────┘         │
└─────────────────────────────────────────┘

Step 1: Dados Pessoais
├── Nome Completo
├── Email
├── Telefone (com máscara)
├── Senha
└── Confirmar Senha
    │
    │ Validação OK
    ▼
Step 2: Dados da Empresa
├── Nome da Empresa
├── CNPJ (com máscara)
├── Segmento (Select)
└── Logo Upload (preview)
    │
    │ Validação OK
    ▼
Step 3: Seleção de Plano
├── Starter (R$ 29/mês)
├── Pro (R$ 79/mês) [RECOMENDADO]
└── Enterprise (R$ 199/mês)
    │
    │ Plano selecionado
    ▼
┌─────────────┐
│   Submit    │
│  (Loading)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Redirect  │────► /verificar
│             │      "Verifique seu email"
└─────────────┘
```

### 4.4 Fluxo de Recuperação de Senha

```
┌─────────────────────────────────────────────────────────────────┐
│                   FLUXO RECUPERAÇÃO DE SENHA                    │
└─────────────────────────────────────────────────────────────────┘

/recuperar
    │
    ▼
┌─────────────────┐
│ ForgotPassword  │
│    Form         │
│  ┌───────────┐  │
│  │   Email   │  │
│  └───────────┘  │
└────────┬────────┘
         │
         │ Submit
         ▼
┌─────────────────┐
│   Tela Sucesso  │
│  ┌───────────┐  │
│  │  Ícone ✓  │  │
│  │  "Enviamos │  │
│  │ instruções"│  │
│  └───────────┘  │
└────────┬────────┘
         │
         │ (Simulação: link no email)
         ▼
/nova-senha?token=xxx
    │
    ▼
┌─────────────────┐
│ ResetPassword   │
│    Form         │
│  ┌───────────┐  │
│  │Nova Senha │  │◄── Indicador de força
│  │Confirmar  │  │
│  └───────────┘  │
└────────┬────────┘
         │
         │ Submit
         ▼
┌─────────────────┐
│   Tela Sucesso  │────► Redirect /login
│  "Senha alterada"│
└─────────────────┘
```

### 4.5 Proteção de Rotas (Mock)

**Implementação simples com localStorage:**
```typescript
// lib/auth-mock.ts
export const setMockSession = (user: MockUser) => {
  localStorage.setItem("mock_session", JSON.stringify(user));
};

export const getMockSession = (): MockUser | null => {
  const session = localStorage.getItem("mock_session");
  return session ? JSON.parse(session) : null;
};

export const clearMockSession = () => {
  localStorage.removeItem("mock_session");
};
```

---

## 5. Mock Data Detalhado

### 5.1 Arquivo: `lib/auth-mock.ts`

```typescript
// Tipos
export interface MockUser {
  id: string;
  email: string;
  name: string;
  company?: string;
  plan?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
}

// Credenciais válidas para teste
export const VALID_CREDENTIALS = {
  email: "demo@uniq.com",
  password: "123456",
};

// Usuários mockados
export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    email: "demo@uniq.com",
    name: "Usuário Demo",
    company: "Empresa Demo LTDA",
    plan: "pro",
  },
];

// Planos disponíveis
export const MOCK_PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "R$ 29",
    period: "/mês",
    features: ["Até 100 clientes", "5GB armazenamento", "Relatórios básicos"],
    recommended: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 79",
    period: "/mês",
    features: [
      "Clientes ilimitados",
      "50GB armazenamento",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "R$ 199",
    period: "/mês",
    features: [
      "Tudo do Pro",
      "API access",
      "White label",
      "Suporte 24/7",
    ],
    recommended: false,
  },
];

// Segmentos de empresa
export const COMPANY_SEGMENTS = [
  { value: "", label: "Selecione um segmento" },
  { value: "tech", label: "Tecnologia" },
  { value: "retail", label: "Varejo" },
  { value: "services", label: "Serviços" },
  { value: "industry", label: "Indústria" },
  { value: "health", label: "Saúde" },
  { value: "education", label: "Educação" },
  { value: "finance", label: "Financeiro" },
  { value: "food", label: "Alimentação" },
  { value: "other", label: "Outro" },
];

// Utilitário para delay de API
export const mockDelay = (ms: number = 1500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Simula login
export const mockLogin = async (
  email: string,
  password: string
): Promise<MockUser> => {
  await mockDelay(1500);

  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    const user = MOCK_USERS.find((u) => u.email === email);
    if (user) {
      localStorage.setItem("mock_session", JSON.stringify(user));
      return user;
    }
  }

  throw new Error("Email ou senha incorretos");
};

// Simula registro
export const mockRegister = async (
  data: RegisterData
): Promise<MockUser> => {
  await mockDelay(2000);

  const newUser: MockUser = {
    id: Date.now().toString(),
    email: data.email,
    name: data.fullName,
    company: data.companyName,
    plan: data.planId,
  };

  MOCK_USERS.push(newUser);
  return newUser;
};

// Simula recuperação de senha
export const mockForgotPassword = async (email: string): Promise<void> => {
  await mockDelay(1500);

  const user = MOCK_USERS.find((u) => u.email === email);
  if (!user) {
    // Não revelar se email existe ou não (segurança)
    return;
  }

  // Simula envio de email
  console.log(`[MOCK] Email de recuperação enviado para ${email}`);
};

// Simula reset de senha
export const mockResetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  await mockDelay(1500);

  // Em mock, sempre sucesso se token existe
  console.log(`[MOCK] Senha alterada com token ${token}`);
};

// Verifica sessão
export const getMockSession = (): MockUser | null => {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem("mock_session");
  return session ? JSON.parse(session) : null;
};

// Limpa sessão
export const clearMockSession = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("mock_session");
};

// Tipos auxiliares
export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  companyName: string;
  cnpj: string;
  segment: string;
  planId: string;
}
```

---

## 6. Validações (Zod Schemas)

### 6.1 Arquivo: `lib/validations.ts`

```typescript
import { z } from "zod";

// Helper para validação de CNPJ
const isValidCNPJ = (cnpj: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "");
  
  if (cleanCNPJ.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
  
  // Algoritmo de validação de CNPJ
  let sum = 0;
  let weight = 2;
  
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  
  const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(cleanCNPJ.charAt(12)) !== digit1) return false;
  
  sum = 0;
  weight = 2;
  
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  
  const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return parseInt(cleanCNPJ.charAt(13)) === digit2;
};

// Schema de Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Schema de Cadastro - Step 1 (Dados Pessoais)
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(1, "Nome completo é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Telefone inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z
    .string()
    .min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// Schema de Cadastro - Step 2 (Dados da Empresa)
export const companyInfoSchema = z.object({
  companyName: z
    .string()
    .min(1, "Nome da empresa é obrigatório"),
  cnpj: z
    .string()
    .min(1, "CNPJ é obrigatório")
    .refine((val) => isValidCNPJ(val), "CNPJ inválido"),
  segment: z
    .string()
    .min(1, "Selecione um segmento"),
  logo: z
    .string()
    .optional(),
});

export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;

// Schema de Cadastro - Step 3 (Plano)
export const planSelectionSchema = z.object({
  planId: z
    .string()
    .min(1, "Selecione um plano"),
});

export type PlanSelectionFormData = z.infer<typeof planSelectionSchema>;

// Schema completo de Cadastro (todos os steps)
export const registerSchema = z.object({
  // Step 1
  fullName: personalInfoSchema.shape.fullName,
  email: personalInfoSchema.shape.email,
  phone: personalInfoSchema.shape.phone,
  password: personalInfoSchema.shape.password,
  confirmPassword: personalInfoSchema.shape.confirmPassword,
  // Step 2
  companyName: companyInfoSchema.shape.companyName,
  cnpj: companyInfoSchema.shape.cnpj,
  segment: companyInfoSchema.shape.segment,
  logo: companyInfoSchema.shape.logo,
  // Step 3
  planId: planSelectionSchema.shape.planId,
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Schema de Recuperação de Senha
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Schema de Nova Senha
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Nova senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z
    .string()
    .min(1, "Confirmação é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
```

### 6.2 Tipos Adicionais

**Arquivo:** `types/auth.ts`
```typescript
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  plan?: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  companyName: string;
  cnpj: string;
  segment: string;
  logo?: string;
  planId: string;
}
```

---

## 7. Cronograma de Implementação

### 7.1 Dia 1: Estrutura + Login

**Manhã (4h):**
- [ ] Instalar dependências (react-hook-form, zod, @hookform/resolvers)
- [ ] Criar estrutura de pastas `app/(auth)/`
- [ ] Criar `lib/validations.ts` com schemas Zod
- [ ] Criar `lib/auth-mock.ts` com dados mockados
- [ ] Criar `types/auth.ts` com tipos TypeScript

**Tarde (4h):**
- [ ] Criar layout de autenticação `app/(auth)/layout.tsx`
- [ ] Implementar `components/auth/login-form.tsx`
- [ ] Criar página `app/(auth)/login/page.tsx`
- [ ] Testar fluxo de login completo
- [ ] Ajustar responsividade mobile

**Entregáveis:**
- Login funcional com validações
- Redirecionamento para /dashboard
- Toast de erro para credenciais inválidas

---

### 7.2 Dia 2: Cadastro Multi-step

**Manhã (4h):**
- [ ] Criar `components/auth/step-indicator.tsx`
- [ ] Criar `components/auth/step-personal.tsx`
- [ ] Criar `components/auth/step-company.tsx`
- [ ] Criar `components/auth/logo-upload.tsx`
- [ ] Implementar máscaras de input (telefone, CNPJ)

**Tarde (4h):**
- [ ] Criar `components/auth/step-plan.tsx`
- [ ] Criar `components/auth/plan-card.tsx`
- [ ] Criar `components/auth/register-wizard.tsx`
- [ ] Integrar steps no wizard
- [ ] Criar página `app/(auth)/cadastro/page.tsx`
- [ ] Testar fluxo completo de cadastro

**Entregáveis:**
- Cadastro multi-step funcional
- Validações em cada etapa
- Upload de logo com preview
- Cards de plano selecionáveis

---

### 7.3 Dia 3: Recuperação + Verificação

**Manhã (4h):**
- [ ] Criar `components/auth/forgot-password-form.tsx`
- [ ] Criar página `app/(auth)/recuperar/page.tsx`
- [ ] Criar `components/auth/reset-password-form.tsx`
- [ ] Criar `components/auth/password-strength.tsx`
- [ ] Criar página `app/(auth)/nova-senha/page.tsx`

**Tarde (4h):**
- [ ] Criar `components/auth/email-verification.tsx`
- [ ] Criar página `app/(auth)/verificar/page.tsx`
- [ ] Implementar indicador de força de senha
- [ ] Testar fluxo de recuperação completo
- [ ] Ajustar transições e animações

**Entregáveis:**
- Fluxo de recuperação de senha
- Tela de nova senha com indicador de força
- Tela de verificação de email

---

### 7.4 Dia 4: Integração + Testes

**Manhã (4h):**
- [ ] Revisar todas as navegações entre páginas
- [ ] Implementar persistência de sessão (localStorage)
- [ ] Adicionar loading states em todos os botões
- [ ] Revisar responsividade em telas pequenas
- [ ] Ajustar contraste e acessibilidade

**Tarde (4h):**
- [ ] Testar todos os fluxos manualmente
- [ ] Corrigir bugs encontrados
- [ ] Revisar código (clean code, consistência)
- [ ] Documentar mock de dados para equipe
- [ ] Preparar apresentação da sprint

**Entregáveis:**
- Todas as telas integradas
- Testes manuais passando
- Documentação atualizada

---

## 8. Checklist de DoD (Definition of Done)

### 8.1 Funcionalidades

- [ ] **Tela de Login**
  - [ ] Formulário com email e senha
  - [ ] Validação em tempo real (Zod)
  - [ ] Estado de loading no botão submit
  - [ ] Toast de erro para credenciais inválidas
  - [ ] Redirecionamento para /dashboard em caso de sucesso
  - [ ] Link "Esqueci minha senha" funcional
  - [ ] Link "Criar conta" funcional

- [ ] **Tela de Cadastro**
  - [ ] Stepper visual funcional (3 steps)
  - [ ] Step 1: Dados pessoais validados
  - [ ] Step 2: Dados da empresa validados
  - [ ] Upload de logo com preview funcional
  - [ ] Step 3: Cards de plano selecionáveis
  - [ ] Navegação Próximo/Voltar funcionando
  - [ ] Validação de CNPJ (formato)
  - [ ] Máscara de telefone funcionando
  - [ ] Validação de confirmação de senha
  - [ ] Redirecionamento para /verificar após sucesso

- [ ] **Tela de Recuperação de Senha**
  - [ ] Formulário de email
  - [ ] Tela de sucesso "Email enviado"
  - [ ] Tela de nova senha com dois campos
  - [ ] Indicador de força da senha funcionando
  - [ ] Validação de confirmação de senha
  - [ ] Redirecionamento para /login após sucesso

- [ ] **Tela de Verificação de Email**
  - [ ] Tela estática de sucesso
  - [ ] Ícone de email/check
  - [ ] Mensagem informativa
  - [ ] Botão "Ir para o login"

### 8.2 Design System

- [ ] Cores UNIQ aplicadas em todos os componentes
- [ ] Tipografia Poppins consistente
- [ ] Componentes do Design System reutilizados
- [ ] Bordas arredondadas consistentes (rounded-lg)
- [ ] Espaçamento seguindo escala do Tailwind
- [ ] Estados de hover implementados
- [ ] Estados de focus visíveis e acessíveis

### 8.3 UX/UI

- [ ] Feedback visual em menos de 100ms após interação
- [ ] Estados de loading implementados em todos os submits
- [ ] Campos desabilitados durante loading
- [ ] Mensagens de erro claras e específicas
- [ ] Indicação de campos obrigatórios (*)
- [ ] Navegação por teclado funcional (Tab, Enter)
- [ ] Animações suaves (300ms)

### 8.4 Responsividade

- [ ] Layout funciona em 320px+
- [ ] Formulários full-width em mobile
- [ ] Cards empilhados em mobile (step 3)
- [ ] Textos legíveis em todas as telas
- [ ] Stepper adaptativo (se necessário)
- [ ] Padding ajustado para mobile

### 8.5 Acessibilidade

- [ ] Contraste mínimo 4.5:1 para textos
- [ ] Labels associados corretamente aos inputs (htmlFor)
- [ ] Mensagens de erro anunciadas por screen readers
- [ ] Estados de loading anunciados
- [ ] Foco visível em todos elementos interativos

### 8.6 Código

- [ ] Código TypeScript sem erros
- [ ] Componentes bem tipados
- [ ] Hooks customizados reutilizáveis
- [ ] Funções puras onde possível
- [ ] Sem console.logs de debug
- [ ] Código formatado (prettier)
- [ ] Nomenclatura consistente (camelCase, PascalCase)

---

## 9. Testes Manuais a Realizar

### 9.1 Testes de Login

| ID | Cenário | Passos | Resultado Esperado |
|----|---------|--------|-------------------|
| T01 | Login com credenciais válidas | 1. Acessar /login<br>2. Preencher "demo@uniq.com"<br>3. Preencher "123456"<br>4. Clicar em "Entrar" | Redirecionamento para /dashboard |
| T02 | Login com email inválido | 1. Acessar /login<br>2. Preencher "invalido@teste.com"<br>3. Preencher "123456"<br>4. Clicar em "Entrar" | Toast de erro "Email ou senha incorretos" |
| T03 | Login com senha incorreta | 1. Acessar /login<br>2. Preencher "demo@uniq.com"<br>3. Preencher "senhaerrada"<br>4. Clicar em "Entrar" | Toast de erro "Email ou senha incorretos" |
| T04 | Validação de email vazio | 1. Acessar /login<br>2. Clicar em "Entrar" sem preencher | Mensagem "Email é obrigatório" |
| T05 | Validação de senha vazia | 1. Acessar /login<br>2. Preencher email<br>3. Clicar em "Entrar" | Mensagem "Senha é obrigatória" |
| T06 | Formato de email inválido | 1. Acessar /login<br>2. Preencher "emailinvalido"<br>3. Clicar fora do campo | Mensagem "Digite um email válido" |
| T07 | Estado de loading | 1. Acessar /login<br>2. Preencher credenciais válidas<br>3. Clicar em "Entrar" | Botão mostra spinner, campos desabilitados |
| T08 | Navegação para cadastro | 1. Acessar /login<br>2. Clicar em "Criar conta" | Navegação para /cadastro |
| T09 | Navegação para recuperação | 1. Acessar /login<br>2. Clicar em "Esqueci minha senha" | Navegação para /recuperar |

### 9.2 Testes de Cadastro

| ID | Cenário | Passos | Resultado Esperado |
|----|---------|--------|-------------------|
| T10 | Validação step 1 - Nome vazio | 1. Acessar /cadastro<br>2. Clicar "Próximo" sem preencher nome | Mensagem "Nome completo é obrigatório" |
| T11 | Validação step 1 - Email inválido | 1. Acessar /cadastro<br>2. Preencher email inválido<br>3. Clicar "Próximo" | Mensagem "Digite um email válido" |
| T12 | Validação step 1 - Telefone | 1. Acessar /cadastro<br>2. Preencher telefone incompleto | Mensagem "Telefone inválido" |
| T13 | Validação step 1 - Senha curta | 1. Acessar /cadastro<br>2. Preencher senha "123"<br>3. Clicar "Próximo" | Mensagem "Senha deve ter pelo menos 6 caracteres" |
| T14 | Validação step 1 - Senhas diferentes | 1. Acessar /cadastro<br>2. Preencher senha<br>3. Preencher confirmação diferente | Mensagem "As senhas não coincidem" |
| T15 | Navegação step 1 → 2 | 1. Preencher step 1 corretamente<br>2. Clicar "Próximo" | Avança para step 2, indicador atualizado |
| T16 | Validação step 2 - CNPJ | 1. No step 2<br>2. Preencher CNPJ inválido<br>3. Clicar "Próximo" | Mensagem "CNPJ inválido" |
| T17 | Upload de logo | 1. No step 2<br>2. Clicar em upload<br>3. Selecionar imagem | Preview da imagem aparece |
| T18 | Seleção de plano | 1. No step 3<br>2. Clicar em um plano | Card fica destacado como selecionado |
| T19 | Conclusão do cadastro | 1. Preencher todos os steps<br>2. Clicar "Criar conta" | Redirecionamento para /verificar |
| T20 | Navegação voltar | 1. Estar no step 2 ou 3<br>2. Clicar "Voltar" | Retorna ao step anterior |

### 9.3 Testes de Recuperação de Senha

| ID | Cenário | Passos | Resultado Esperado |
|----|---------|--------|-------------------|
| T21 | Solicitação de recuperação | 1. Acessar /recuperar<br>2. Preencher email<br>3. Clicar "Enviar" | Tela de sucesso aparece |
| T22 | Email inválido | 1. Acessar /recuperar<br>2. Preencher "emailinvalido" | Mensagem "Digite um email válido" |
| T23 | Indicador de força - Fraca | 1. Acessar /nova-senha<br>2. Preencher "123" | Barra vermelha, label "Fraca" |
| T24 | Indicador de força - Média | 1. Acessar /nova-senha<br>2. Preencher "123456" | Barra amarela, label "Média" |
| T25 | Indicador de força - Forte | 1. Acessar /nova-senha<br>2. Preencher "SenhaForte123!" | Barra verde, label "Forte" |
| T26 | Confirmação diferente | 1. Em /nova-senha<br>2. Preencher senha<br>3. Preencher confirmação diferente | Mensagem "As senhas não coincidem" |

### 9.4 Testes de Responsividade

| ID | Cenário | Passos | Resultado Esperado |
|----|---------|--------|-------------------|
| T27 | Mobile - Login | 1. Acessar /login em 375px | Formulário centralizado, legível |
| T28 | Mobile - Cadastro | 1. Acessar /cadastro em 375px | Steps visíveis, formulário acessível |
| T29 | Mobile - Planos | 1. Acessar step 3 em 375px | Cards empilhados verticalmente |
| T30 | Tablet - Layout | 1. Acessar em 768px | Layout adaptado, espaçamento adequado |
| T31 | Desktop - Layout | 1. Acessar em 1440px | Layout otimizado, centralizado |

---

## 10. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Complexidade do multi-step** | Média | Alto | Usar react-hook-form com contexto de formulário. Implementar validação step-by-step. Testar cada step isoladamente. |
| **Upload de arquivo no client** | Baixa | Médio | Usar FileReader API apenas para preview. Validar tamanho máximo (2MB) e tipo (jpg, png). Não enviar para servidor (mock). |
| **Validações complexas (CNPJ)** | Baixa | Médio | Implementar regex e algoritmo de validação CNPJ. Testar com CNPJs válidos e inválidos. Usar biblioteca se necessário. |
| **Responsividade em telas pequenas** | Média | Médio | Testar em 320px desde o início. Usar mobile-first approach. Cards de planos devem empilhar em mobile. |
| **Máscaras de input inconsistentes** | Média | Médio | Usar react-input-mask para consistência. Testar comportamento em diferentes navegadores. |
| **Performance de renderização** | Baixa | Médio | Usar React.memo em componentes pesados. Evitar re-renders desnecessários. Lazy load de steps se necessário. |
| **Gerenciamento de estado entre steps** | Média | Alto | Usar react-hook-form com persistência de dados entre steps. Salvar estado no componente pai (wizard). |
| **Acessibilidade negligenciada** | Baixa | Alto | Testar navegação por teclado. Verificar contraste de cores. Usar labels corretamente associados. |

### 10.1 Plano de Contingência

**Se o multi-step ficar muito complexo:**
- Simplificar para um formulário único longo
- Ou usar abas (Tabs) ao invés de wizard

**Se as máscaras derem problemas:**
- Implementar manualmente com onChange
- Ou usar outra biblioteca (react-currency-input-field)

**Se o upload de logo não funcionar bem:**
- Tornar o campo opcional
- Ou remover a funcionalidade da MVP

---

## 11. Referências e Recursos

### 11.1 Documentação Interna
- PRD: `tracking/plans/PRD_SPRINT_02_Auth_UI.md`
- Design System: `components/ui/`
- Cores: `tailwind.config.ts`
- Estilos globais: `app/globals.css`

### 11.2 Documentação Externa
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

### 11.3 Inspiração de UI
- Stripe: Checkout multi-step
- Vercel: Login minimalista
- Linear: Autenticação clean

---

## 12. Apêndice

### 12.1 Snippets de Código Úteis

**Máscara de Telefone:**
```typescript
const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};
```

**Máscara de CNPJ:**
```typescript
const formatCNPJ = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
};
```

**Conversão de arquivo para base64:**
```typescript
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
```

### 12.2 Mensagens de Erro Padronizadas

| Campo | Erro | Mensagem |
|-------|------|----------|
| Email | Obrigatório | "Email é obrigatório" |
| Email | Formato | "Digite um email válido" |
| Senha | Obrigatória | "Senha é obrigatória" |
| Senha | Tamanho | "Senha deve ter pelo menos 6 caracteres" |
| Confirmar Senha | Diferente | "As senhas não coincidem" |
| Nome | Obrigatório | "Nome completo é obrigatório" |
| CNPJ | Formato | "CNPJ inválido" |
| Telefone | Formato | "Telefone inválido" |
| Empresa | Obrigatório | "Nome da empresa é obrigatório" |
| Segmento | Obrigatório | "Selecione um segmento" |
| Plano | Obrigatório | "Selecione um plano" |

---

**Fim do Documento**

*Este SPEC foi gerado como parte do processo de Spec Driven Development (SDD) para a Sprint 02 do projeto UNIQ Empresas.*
