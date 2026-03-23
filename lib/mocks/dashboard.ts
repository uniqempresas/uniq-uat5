// lib/mocks/dashboard.ts

export const mockDashboardStats = {
  sales: {
    value: 12450.0,
    change: 15,
    trend: "up" as const,
    formatted: "R$ 12.450,00",
  },
  customers: {
    value: 156,
    change: 5,
    trend: "up" as const,
    label: "esta semana",
  },
  orders: {
    value: 23,
    change: -2,
    trend: "down" as const,
    subtitle: "8 em processamento",
  },
  conversion: {
    value: 3.2,
    change: 0.5,
    trend: "up" as const,
    formatted: "3.2%",
  },
};

export const mockChartData = {
  "7d": [
    { date: "2026-03-13", sales: 1500, label: "13/03" },
    { date: "2026-03-14", sales: 2300, label: "14/03" },
    { date: "2026-03-15", sales: 1800, label: "15/03" },
    { date: "2026-03-16", sales: 3200, label: "16/03" },
    { date: "2026-03-17", sales: 2900, label: "17/03" },
    { date: "2026-03-18", sales: 3500, label: "18/03" },
    { date: "2026-03-19", sales: 4100, label: "Hoje" },
  ],
  "30d": Array.from({ length: 30 }, (_, i) => ({
    date: `2026-03-${String(i + 1).padStart(2, "0")}`,
    sales: Math.floor(Math.random() * 3000) + 1000,
    label: i % 5 === 0 ? `${String(i + 1).padStart(2, "0")}/03` : "",
  })),
  "90d": Array.from({ length: 12 }, (_, i) => ({
    date: `2026-Semana ${i + 1}`,
    sales: Math.floor(Math.random() * 20000) + 10000,
    label: `Sem ${i + 1}`,
  })),
};

export const mockActivities = [
  {
    id: 1,
    type: "sale" as const,
    message: "Nova venda #1234 - R$ 299,90",
    time: "2 min atrás",
  },
  {
    id: 2,
    type: "customer" as const,
    message: "João Silva foi cadastrado",
    time: "15 min atrás",
  },
  {
    id: 3,
    type: "product" as const,
    message: 'Produto "Óculos Ray-Ban" adicionado',
    time: "1h atrás",
  },
  {
    id: 4,
    type: "alert" as const,
    message: "Estoque baixo: Armação Titanium",
    time: "2h atrás",
  },
  {
    id: 5,
    type: "message" as const,
    message: "MEL: Vendas em alta hoje!",
    time: "3h atrás",
  },
  {
    id: 6,
    type: "sale" as const,
    message: "Nova venda #1233 - R$ 450,00",
    time: "4h atrás",
  },
  {
    id: 7,
    type: "customer" as const,
    message: "Maria Santos foi cadastrada",
    time: "5h atrás",
  },
];

export const mockQuickModules = [
  { id: "crm", name: "CRM", icon: "Users", color: "blue", route: "/crm" },
  {
    id: "store",
    name: "Loja Virtual",
    icon: "Store",
    color: "purple",
    route: "/loja",
  },
  {
    id: "finance",
    name: "Financeiro",
    icon: "Wallet",
    color: "green",
    route: "/financeiro",
  },
  {
    id: "stock",
    name: "Estoque",
    icon: "Package",
    color: "orange",
    route: "/estoque",
  },
  {
    id: "sales",
    name: "Vendas",
    icon: "ShoppingCart",
    color: "pink",
    route: "/vendas",
  },
  {
    id: "services",
    name: "Serviços",
    icon: "Wrench",
    color: "red",
    route: "/servicos",
  },
  {
    id: "schedule",
    name: "Agendamentos",
    icon: "Calendar",
    color: "indigo",
    route: "/agendamentos",
  },
];

export const mockMELData = {
  status: "online",
  messages: [
    {
      id: 1,
      type: "bot",
      text: "Bom dia! Você vendeu 30% mais que ontem. 🎉",
      time: "09:00",
    },
    {
      id: 2,
      type: "bot",
      text: "Você tem 4 pedidos pendentes para processar.",
      time: "10:30",
    },
  ],
  quickActions: [
    { id: 1, label: "Ver relatório de vendas", action: "sales_report" },
    { id: 2, label: "Cadastrar novo produto", action: "add_product" },
    { id: 3, label: "Ver estoque baixo", action: "low_stock" },
  ],
  unreadCount: 2,
};
