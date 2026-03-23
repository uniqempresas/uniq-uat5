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
