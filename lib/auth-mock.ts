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
  logo?: string;
}

// Simula login
export const mockLogin = async (
  email: string,
  password: string
): Promise<MockUser> => {
  await mockDelay(1500);

  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    const user = MOCK_USERS.find((u) => u.email === email);
    if (user) {
      if (typeof window !== "undefined") {
        localStorage.setItem("mock_session", JSON.stringify(user));
      }
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

// Define mock session
export const setMockSession = (user: MockUser): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("mock_session", JSON.stringify(user));
};
