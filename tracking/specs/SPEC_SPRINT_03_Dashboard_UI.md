# 📘 SPEC TÉCNICA - SPRINT 03: Dashboard UI

**Documento Técnico de Implementação**  
**Gerado em:** 20/03/2026  
**Planejador:** @vibe-planner  
**Fase:** FASE 02 - Planning (SDD)  
**Baseado em:** PRD_SPRINT_03_Dashboard_UI.md

---

## 1. Visão Geral da Implementação

### 1.1 Resumo Técnico

Esta SPEC detalha a implementação técnica da **Sprint 03 - Dashboard UI** do UNIQ Empresas. O objetivo é criar uma dashboard completa com:

- **4 cards de métricas** com indicadores de tendência
- **Gráfico de vendas** interativo usando Recharts
- **Lista de atividades recentes** com scroll
- **Widget MEL** (Consultor Ativo)
- **Sidebar refinada** com navegação completa
- **Tela de Perfil da Empresa** com upload de logo e configurações visuais

### 1.2 Stack e Dependências

| Camada | Tecnologia | Versão | Status |
|--------|------------|--------|--------|
| Framework | Next.js | 14.2.5 | ✅ Instalado |
| Linguagem | TypeScript | 5.4.5 | ✅ Instalado |
| UI Library | React | 18.3.1 | ✅ Instalado |
| Estilização | Tailwind CSS | 3.4.4 | ✅ Instalado |
| Componentes | shadcn/ui | v4.0.5 | ✅ Instalado |
| Ícones | Lucide React | 0.400.0 | ✅ Instalado |
| **Gráficos** | **Recharts** | **^2.12.0** | ⚠️ **INSTALAR** |
| **Upload** | **react-dropzone** | **^14.2.0** | ⚠️ **INSTALAR** |

### 1.3 Novas Dependências (Instalação Obrigatória)

```bash
# Gráficos - ESSENCIAL
npm install recharts

# Upload - RECOMENDADO
npm install react-dropzone
```

### 1.4 Estado Atual do Projeto

**Componentes Já Existentes:**
- ✅ `components/sidebar.tsx` - Sidebar base funcional
- ✅ `components/header.tsx` - Header com search e user dropdown
- ✅ `components/metric-card.tsx` - Cards de métricas reutilizáveis
- ✅ `app/dashboard/page.tsx` - Página dashboard inicial
- ✅ shadcn/ui components (Button, Card, Badge, Avatar, Dialog, Table, Toast, Tabs, Input, Label, Select, etc.)

**Rotas Já Existentes:**
- ✅ `/dashboard` - Página principal
- ✅ Layout base com sidebar e header

---

## 2. Estrutura de Arquivos e Pastas

### 2.1 Estrutura Completa

```
app/
├── dashboard/
│   └── page.tsx                    # Página principal (REFINAR)
├── empresa/
│   └── page.tsx                    # NOVO: Perfil da empresa
├── layout.tsx                      # JÁ EXISTE
├── page.tsx                        # JÁ EXISTE
├── globals.css                     # JÁ EXISTE
├── crm/
│   └── page.tsx                    # NOVO: Placeholder
├── financeiro/
│   └── page.tsx                    # NOVO: Placeholder
├── estoque/
│   └── page.tsx                    # NOVO: Placeholder
├── vendas/
│   └── page.tsx                    # NOVO: Placeholder
├── loja/
│   └── page.tsx                    # NOVO: Placeholder
└── agendamentos/
    └── page.tsx                    # NOVO: Placeholder

components/
├── ui/                             # JÁ EXISTE (shadcn components)
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
│   ├── scroll-area.tsx             # ADICIONAR: shadcn add scroll-area
│   └── ...
├── sidebar.tsx                     # JÁ EXISTE (REFINAR)
├── header.tsx                      # JÁ EXISTE (REFINAR)
├── metric-card.tsx                 # JÁ EXISTE
├── dashboard/                      # NOVA PASTA
│   ├── metrics-section.tsx         # NOVO: Seção de 4 métricas
│   ├── sales-chart.tsx             # NOVO: Gráfico Recharts
│   ├── activities-list.tsx         # NOVO: Lista de atividades
│   ├── quick-modules.tsx           # NOVO: Acesso rápido módulos
│   └── mel-widget.tsx              # NOVO: Widget do MEL
├── empresa/                        # NOVA PASTA
│   ├── company-form.tsx            # NOVO: Formulário dados
│   ├── logo-upload.tsx             # NOVO: Upload drag & drop
│   ├── color-picker.tsx            # NOVO: Seletor de cores
│   └── store-preview.tsx           # NOVO: Preview da loja
└── navigation/                     # NOVA PASTA
    ├── mobile-menu.tsx             # NOVO: Menu mobile
    └── user-menu.tsx               # NOVO: Dropdown usuário (extrair)

lib/
├── mocks/                          # NOVA PASTA
│   ├── dashboard.ts                # NOVO: Mock data dashboard
│   └── company.ts                  # NOVO: Mock data empresa
├── utils.ts                        # JÁ EXISTE
└── ...

hooks/
├── use-toast.ts                    # JÁ EXISTE
└── ...

public/
└── images/
    └── placeholders/
        └── logo-placeholder.svg    # NOVO

types/                              # NOVA PASTA (opcional)
├── dashboard.ts                    # NOVO: Tipos dashboard
└── company.ts                      # NOVO: Tipos empresa
```

### 2.2 Componentes shadcn/ui a Adicionar

```bash
# Adicionar componentes necessários
npx shadcn add scroll-area
```

---

## 3. Componentes Detalhados

### 3.1 Dashboard Components

#### 3.1.1 MetricsSection

**Arquivo:** `components/dashboard/metrics-section.tsx`

```typescript
"use client";

import { MetricCard } from "@/components/metric-card";
import { TrendingUp, ShoppingBag, Users, Target } from "lucide-react";
import { mockDashboardStats } from "@/lib/mocks/dashboard";

export function MetricsSection() {
  const stats = mockDashboardStats;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Vendas */}
      <MetricCard
        title="Vendas (Mês)"
        value={stats.sales.formatted}
        icon={TrendingUp}
        iconBgColor="bg-uniq-accent/20"
        iconColor="text-uniq-accent"
        trend={{
          value: `+${stats.sales.change}%`,
          isPositive: stats.sales.trend === "up",
          label: "vs mês anterior",
        }}
      />

      {/* Clientes */}
      <MetricCard
        title="Clientes Ativos"
        value={stats.customers.value.toString()}
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        trend={{
          value: `+${stats.customers.change}`,
          isPositive: stats.customers.trend === "up",
          label: "esta semana",
        }}
      />

      {/* Pedidos */}
      <MetricCard
        title="Pedidos Hoje"
        value={stats.orders.value.toString()}
        icon={ShoppingBag}
        iconBgColor="bg-uniq-primary/20"
        iconColor="text-uniq-primary"
        subtitle={`${stats.orders.change > 0 ? "+" : ""}${stats.orders.change} em processamento`}
      />

      {/* Conversão */}
      <MetricCard
        title="Taxa de Conversão"
        value={stats.conversion.formatted}
        icon={Target}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
        trend={{
          value: `+${stats.conversion.change}%`,
          isPositive: stats.conversion.trend === "up",
          label: "vs ontem",
        }}
      />
    </section>
  );
}
```

**Classes Tailwind:**
- Container: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6`
- Responsividade: Mobile 1 col, Tablet 2 cols, Desktop 4 cols

---

#### 3.1.2 SalesChart

**Arquivo:** `components/dashboard/sales-chart.tsx`

```typescript
"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockChartData } from "@/lib/mocks/dashboard";
import { formatCurrency } from "@/lib/utils";

 type Period = "7d" | "30d" | "90d";

interface ChartDataPoint {
  date: string;
  sales: number;
  label: string;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-uniq-border rounded-lg shadow-lg">
        <p className="text-sm text-uniq-muted mb-1">{label}</p>
        <p className="text-lg font-bold text-uniq-text">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function SalesChart() {
  const [period, setPeriod] = useState<Period>("7d");
  const data = mockChartData[period];

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-uniq-text">
          Vendas
        </CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <TabsList className="bg-uniq-platinum">
            <TabsTrigger value="7d" className="text-xs data-[state=active]:bg-white">
              7 dias
            </TabsTrigger>
            <TabsTrigger value="30d" className="text-xs data-[state=active]:bg-white">
              30 dias
            </TabsTrigger>
            <TabsTrigger value="90d" className="text-xs data-[state=active]:bg-white">
              90 dias
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3e5653" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3e5653" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#627271", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#627271", fontSize: 12 }}
                tickFormatter={(value) => `R$${value / 1000}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3e5653"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
```

**Configuração Recharts:**
- Tipo: `AreaChart` com gradiente
- Cor da linha: `#3e5653` (uniq-primary)
- Gradient ID: `colorSales`
- Altura: 300px
- Animação: 1000ms

**Classes Tailwind:**
- Container: `h-[300px] w-full`
- Card: `border-uniq-border shadow-sm`
- Header: `border-b border-uniq-border px-6 py-4 flex flex-row items-center justify-between`

---

#### 3.1.3 ActivitiesList

**Arquivo:** `components/dashboard/activities-list.tsx`

```typescript
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockActivities } from "@/lib/mocks/dashboard";
import {
  DollarSign,
  User,
  Package,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const activityConfig = {
  sale: {
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  customer: {
    icon: User,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  product: {
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  alert: {
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  message: {
    icon: MessageCircle,
    color: "text-uniq-accent",
    bgColor: "bg-uniq-accent/20",
  },
};

 type ActivityType = keyof typeof activityConfig;

interface Activity {
  id: number;
  type: ActivityType;
  message: string;
  time: string;
}

export function ActivitiesList() {
  const activities: Activity[] = mockActivities;

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-uniq-text">
          Atividades Recentes
        </CardTitle>
        <Link
          href="/atividades"
          className="text-sm text-uniq-primary hover:text-uniq-hover font-medium flex items-center gap-1"
        >
          Ver todas
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px]">
          <div className="divide-y divide-uniq-border">
            {activities.map((activity) => {
              const config = activityConfig[activity.type];
              const Icon = config.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-4 hover:bg-[#f9fafb] transition-colors"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      config.bgColor
                    )}
                  >
                    <Icon className={cn("w-5 h-5", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-uniq-text">
                      {activity.message}
                    </p>
                    <p className="text-xs text-uniq-muted mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
```

**Classes Tailwind:**
- ScrollArea: `h-[320px]`
- Item: `flex items-start gap-3 p-4 hover:bg-[#f9fafb] transition-colors`
- Ícone container: `w-10 h-10 rounded-lg flex items-center justify-center shrink-0`

---

#### 3.1.4 QuickModules

**Arquivo:** `components/dashboard/quick-modules.tsx`

```typescript
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockQuickModules } from "@/lib/mocks/dashboard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Users,
  Store,
  Wallet,
  Package,
  ShoppingCart,
  Calendar,
} from "lucide-react";

const iconMap = {
  Users,
  Store,
  Wallet,
  Package,
  ShoppingCart,
  Calendar,
};

const colorMap = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    hover: "hover:border-blue-300 hover:bg-blue-50",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    hover: "hover:border-purple-300 hover:bg-purple-50",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    hover: "hover:border-green-300 hover:bg-green-50",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    hover: "hover:border-orange-300 hover:bg-orange-50",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    hover: "hover:border-pink-300 hover:bg-pink-50",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    hover: "hover:border-indigo-300 hover:bg-indigo-50",
  },
};

 type ColorKey = keyof typeof colorMap;

export function QuickModules() {
  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4">
        <CardTitle className="text-lg font-semibold text-uniq-text">
          Acesso Rápido
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {mockQuickModules.map((module) => {
            const Icon = iconMap[module.icon as keyof typeof iconMap];
            const colors = colorMap[module.color as ColorKey];

            return (
              <Link
                key={module.id}
                href={module.route}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-xl border border-uniq-border transition-all duration-200",
                  "hover:shadow-md hover:-translate-y-0.5",
                  colors.hover
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    colors.bg
                  )}
                >
                  <Icon className={cn("w-6 h-6", colors.text)} />
                </div>
                <span className="text-sm font-medium text-uniq-text text-center">
                  {module.name}
                </span>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
```

**Classes Tailwind:**
- Grid: `grid grid-cols-2 sm:grid-cols-3 gap-4`
- Card item: `flex flex-col items-center gap-3 p-4 rounded-xl border border-uniq-border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`

---

#### 3.1.5 MELWidget

**Arquivo:** `components/dashboard/mel-widget.tsx`

```typescript
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockMELData } from "@/lib/mocks/dashboard";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export function MELWidget() {
  const [message, setMessage] = useState("");
  const melData = mockMELData;

  return (
    <Card className="border-uniq-border shadow-sm overflow-hidden">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-uniq-primary/5 to-transparent">
        <div className="relative">
          <Avatar className="w-10 h-10 bg-uniq-accent">
            <AvatarFallback className="bg-uniq-accent text-white">
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
            MEL
            <Sparkles className="w-4 h-4 text-uniq-accent" />
          </CardTitle>
          <p className="text-xs text-uniq-muted">Consultor de Growth IA</p>
        </div>
        <Badge className="bg-green-100 text-green-700 border-green-200">
          Online
        </Badge>
      </CardHeader>

      {/* Messages */}
      <div className="p-4 bg-uniq-accent/5 space-y-4">
        {melData.messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="bg-uniq-accent text-white text-xs">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 p-3 bg-white rounded-xl rounded-tl-none shadow-sm">
              <p className="text-sm text-uniq-text">{msg.text}</p>
              <p className="text-xs text-uniq-muted mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <CardContent className="p-4 space-y-2">
        {melData.quickActions.map((action) => (
          <Button
            key={action.id}
            variant="ghost"
            className="w-full justify-start text-left text-sm text-uniq-text bg-[#f9fafb] hover:bg-uniq-platinum hover:text-uniq-primary rounded-lg py-2.5 px-4 transition-colors"
          >
            {action.label}
          </Button>
        ))}
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t border-uniq-border bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="Pergunte à MEL..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-lg border border-uniq-border bg-[#f9fafb] text-sm text-uniq-text placeholder-uniq-muted focus:outline-none focus:ring-2 focus:ring-uniq-accent focus:border-uniq-accent transition-all"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-uniq-primary text-white rounded-lg hover:bg-uniq-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
```

**Classes Tailwind:**
- Header: `border-b border-uniq-border px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-uniq-primary/5 to-transparent`
- Messages area: `p-4 bg-uniq-accent/5 space-y-4`
- Input: `w-full pl-4 pr-12 py-3 rounded-lg border border-uniq-border bg-[#f9fafb] text-sm text-uniq-text placeholder-uniq-muted focus:outline-none focus:ring-2 focus:ring-uniq-accent focus:border-uniq-accent transition-all`

---

### 3.2 Navigation Components

#### 3.2.1 Refinar Sidebar

**Arquivo:** `components/sidebar.tsx` (ATUALIZAR)

**Alterações necessárias:**
1. Adicionar submenu expansível para Configurações
2. Melhorar indicador de módulo ativo
3. Adicionar animações suaves

```typescript
// ADICIONAR AO EXISTENTE:
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

// ADICIONAR ESTADO:
const [configOpen, setConfigOpen] = useState(false);

// SUBMENU DE CONFIGURAÇÕES:
<div className="px-3 pb-2 space-y-1">
  <button
    onClick={() => setConfigOpen(!configOpen)}
    className="w-full flex items-center justify-between px-3 py-2 mx-1 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
  >
    <div className="flex items-center gap-3">
      <Settings className="w-5 h-5 text-gray-400" />
      <span className="text-sm font-medium">Configurações</span>
    </div>
    {configOpen ? (
      <ChevronUp className="w-4 h-4 text-gray-400" />
    ) : (
      <ChevronDown className="w-4 h-4 text-gray-400" />
    )}
  </button>
  
  {/* Submenu */}
  <div
    className={cn(
      "overflow-hidden transition-all duration-200",
      configOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
    )}
  >
    <div className="pl-11 space-y-1">
      <Link
        href="/configuracoes/geral"
        className="block px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        Geral
      </Link>
      <Link
        href="/configuracoes/notificacoes"
        className="block px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        Notificações
      </Link>
      <Link
        href="/configuracoes/integracoes"
        className="block px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        Integrações
      </Link>
    </div>
  </div>
</div>
```

---

#### 3.2.2 MobileMenu

**Arquivo:** `components/navigation/mobile-menu.tsx`

```typescript
"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/sidebar";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-uniq-primary text-white hover:bg-uniq-hover transition-colors"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 bg-uniq-sidebar">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
```

**Nota:** Requer adicionar shadcn Sheet component:
```bash
npx shadcn add sheet
```

---

### 3.3 Empresa Components

#### 3.3.1 CompanyForm

**Arquivo:** `components/empresa/company-form.tsx`

```typescript
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCompany, brazilianStates } from "@/lib/mocks/company";
import { Building2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CompanyForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(mockCompany);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Dados salvos!",
      description: "As informações da empresa foram atualizadas.",
    });

    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.replace("address.", "");
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4">
        <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
          <Building2 className="w-5 h-5 text-uniq-accent" />
          Dados da Empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-uniq-muted uppercase tracking-wider">
              Dados Básicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Empresa *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Ex: Tech Solutions Ltda"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => handleChange("cnpj", e.target.value)}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="contato@empresa.com.br"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4 pt-4 border-t border-uniq-border">
            <h3 className="text-sm font-medium text-uniq-muted uppercase tracking-wider">
              Endereço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={formData.address.cep}
                  onChange={(e) => handleChange("address.cep", e.target.value)}
                  placeholder="00000-000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => handleChange("address.street", e.target.value)}
                  placeholder="Rua, Avenida, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  value={formData.address.number}
                  onChange={(e) => handleChange("address.number", e.target.value)}
                  placeholder="123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={formData.address.complement}
                  onChange={(e) => handleChange("address.complement", e.target.value)}
                  placeholder="Sala, Andar, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  value={formData.address.neighborhood}
                  onChange={(e) => handleChange("address.neighborhood", e.target.value)}
                  placeholder="Bairro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleChange("address.city", e.target.value)}
                  placeholder="Cidade"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select
                  value={formData.address.state}
                  onValueChange={(value) => handleChange("address.state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label} ({state.value})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-uniq-border flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-uniq-primary hover:bg-uniq-hover text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
```

**Classes Tailwind:**
- Form sections: `space-y-4 pt-4 border-t border-uniq-border`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-4`

---

#### 3.3.2 LogoUpload

**Arquivo:** `components/empresa/logo-upload.tsx`

```typescript
"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { Upload, X, Building2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LogoUploadProps {
  currentLogo?: string | null;
  onUpload?: (file: File) => void;
}

export function LogoUpload({ currentLogo, onUpload }: LogoUploadProps) {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(currentLogo || null);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validação de tamanho (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O logo deve ter no máximo 2MB.",
          variant: "destructive",
        });
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      onUpload?.(file);

      toast({
        title: "Logo carregado!",
        description: "O logo foi atualizado com sucesso.",
      });
    },
    [onUpload, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const handleRemove = () => {
    setPreview(null);
    toast({
      title: "Logo removido",
      description: "O logo foi removido. Faça upload de um novo.",
    });
  };

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4">
        <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-uniq-accent" />
          Logo da Empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Preview */}
          {preview ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-xl border-2 border-uniq-border overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={preview}
                  alt="Logo preview"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Remover logo
              </Button>
            </div>
          ) : (
            /* Dropzone */
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
                isDragActive || isDragging
                  ? "border-uniq-accent bg-uniq-accent/5"
                  : "border-uniq-border hover:border-uniq-accent/50 hover:bg-uniq-platinum/50"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-uniq-platinum flex items-center justify-center">
                  <Upload className="w-8 h-8 text-uniq-muted" />
                </div>
                <div>
                  <p className="text-sm font-medium text-uniq-text">
                    {isDragActive ? "Solte o arquivo aqui" : "Arraste o logo aqui"}
                  </p>
                  <p className="text-xs text-uniq-muted mt-1">ou clique para selecionar</p>
                </div>
                <p className="text-xs text-uniq-muted">
                  PNG, JPG ou SVG (máx. 2MB)
                </p>
              </div>
            </div>
          )}

          {/* Placeholder Info */}
          {!preview && (
            <div className="flex items-center gap-3 p-3 bg-uniq-platinum/50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-uniq-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-uniq-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-uniq-text">Sem logo</p>
                <p className="text-xs text-uniq-muted">
                  Um logo padrão será usado na loja
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

**Classes Tailwind:**
- Dropzone: `border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors`
- Preview: `w-32 h-32 rounded-xl border-2 border-uniq-border overflow-hidden bg-white flex items-center justify-center`

---

#### 3.3.3 ColorPicker

**Arquivo:** `components/empresa/color-picker.tsx`

```typescript
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockCompany } from "@/lib/mocks/company";
import { Palette, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = {
  primary: "#3e5653",
  secondary: "#1f2937",
  accent: "#86cb92",
};

interface ColorConfig {
  key: keyof typeof DEFAULT_COLORS;
  label: string;
  description: string;
}

const colorConfigs: ColorConfig[] = [
  {
    key: "primary",
    label: "Cor Primária",
    description: "Usada em botões, links e elementos principais",
  },
  {
    key: "secondary",
    label: "Cor Secundária",
    description: "Usada em textos e elementos de suporte",
  },
  {
    key: "accent",
    label: "Cor de Destaque",
    description: "Usada em destaques e indicadores",
  },
];

export function ColorPicker() {
  const [colors, setColors] = useState(mockCompany.colors);

  const handleColorChange = (key: keyof typeof DEFAULT_COLORS, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setColors(DEFAULT_COLORS);
  };

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
          <Palette className="w-5 h-5 text-uniq-accent" />
          Cores da Marca
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="text-uniq-muted"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restaurar padrão
        </Button>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {colorConfigs.map((config) => (
          <div key={config.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-uniq-text">
                  {config.label}
                </Label>
                <p className="text-xs text-uniq-muted">{config.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={colors[config.key]}
                  onChange={(e) => handleColorChange(config.key, e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-uniq-border cursor-pointer bg-transparent"
                />
                <code className="px-2 py-1 bg-uniq-platinum rounded text-sm text-uniq-text font-mono">
                  {colors[config.key]}
                </code>
              </div>
            </div>
            {/* Preview bar */}
            <div
              className="h-8 rounded-lg transition-colors"
              style={{ backgroundColor: colors[config.key] }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Helper Label component
function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm font-medium", className)}>{children}</label>
  );
}
```

**Classes Tailwind:**
- Color input: `w-12 h-12 rounded-lg border-2 border-uniq-border cursor-pointer bg-transparent`
- Preview bar: `h-8 rounded-lg transition-colors`

---

#### 3.3.4 StorePreview

**Arquivo:** `components/empresa/store-preview.tsx`

```typescript
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import { mockCompany } from "@/lib/mocks/company";

interface StorePreviewProps {
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo?: string | null;
}

export function StorePreview({ colors = mockCompany.colors, logo }: StorePreviewProps) {
  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
          <Eye className="w-5 h-5 text-uniq-accent" />
          Preview da Loja
        </CardTitle>
        <Button variant="outline" size="sm" className="text-uniq-primary">
          <ExternalLink className="w-4 h-4 mr-2" />
          Abrir Loja
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        {/* Mock Browser */}
        <div className="rounded-lg border border-uniq-border overflow-hidden bg-white">
          {/* Browser Header */}
          <div className="bg-uniq-platinum px-3 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white rounded px-3 py-1 text-xs text-uniq-muted text-center">
                minhaloja.uniq.com.br
              </div>
            </div>
          </div>

          {/* Mock Store Content */}
          <div className="p-4 space-y-4">
            {/* Header */}
            <div
              className="h-12 rounded flex items-center px-4"
              style={{ backgroundColor: colors.primary }}
            >
              {logo ? (
                <img src={logo} alt="Logo" className="h-8 w-auto" />
              ) : (
                <span className="text-white font-bold">SUA LOJA</span>
              )}
            </div>

            {/* Banner */}
            <div
              className="h-24 rounded flex items-center justify-center"
              style={{ backgroundColor: colors.accent + "30" }}
            >
              <span style={{ color: colors.primary }} className="font-semibold">
                Banner Promocional
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div
                    className="aspect-square rounded"
                    style={{ backgroundColor: colors.secondary + "20" }}
                  />
                  <div
                    className="h-3 rounded w-3/4"
                    style={{ backgroundColor: colors.secondary + "40" }}
                  />
                  <div
                    className="h-3 rounded w-1/2"
                    style={{ backgroundColor: colors.accent + "60" }}
                  />
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="w-full py-2 rounded text-white font-medium text-sm"
              style={{ backgroundColor: colors.primary }}
            >
              Ver Produtos
            </button>
          </div>
        </div>

        <p className="text-xs text-uniq-muted text-center mt-4">
          Preview simplificado - Cores aplicadas em tempo real
        </p>
      </CardContent>
    </Card>
  );
}
```

**Classes Tailwind:**
- Browser mock: `rounded-lg border border-uniq-border overflow-hidden bg-white`
- Products grid: `grid grid-cols-3 gap-3`

---

## 4. Mock Data Completo

### 4.1 Dashboard Mocks

**Arquivo:** `lib/mocks/dashboard.ts`

```typescript
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
```

### 4.2 Company Mocks

**Arquivo:** `lib/mocks/company.ts`

```typescript
// lib/mocks/company.ts

export const mockCompany = {
  name: "Tech Solutions Ltda",
  cnpj: "12.345.678/0001-90",
  email: "contato@techsolutions.com.br",
  phone: "(11) 99999-9999",
  logo: null, // ou URL do logo
  address: {
    cep: "01234-567",
    street: "Rua das Flores",
    number: "123",
    complement: "Sala 45",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
  },
  colors: {
    primary: "#3e5653",
    secondary: "#1f2937",
    accent: "#86cb92",
  },
};

export const brazilianStates = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];
```

---

## 5. Páginas

### 5.1 Dashboard Page (Atualizado)

**Arquivo:** `app/dashboard/page.tsx`

```typescript
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MetricsSection } from "@/components/dashboard/metrics-section";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { ActivitiesList } from "@/components/dashboard/activities-list";
import { QuickModules } from "@/components/dashboard/quick-modules";
import { MELWidget } from "@/components/dashboard/mel-widget";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-uniq-platinum">
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header
        pageTitle="Dashboard"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Dashboard" },
        ]}
      />

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        {/* Metrics */}
        <MetricsSection />

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column (2/3) */}
          <div className="xl:col-span-2 space-y-6">
            <SalesChart />
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            <ActivitiesList />
            <QuickModules />
            <MELWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
```

**Classes Tailwind:**
- Layout: `ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]`
- Grid: `grid grid-cols-1 xl:grid-cols-3 gap-6`

---

### 5.2 Empresa Page

**Arquivo:** `app/empresa/page.tsx`

```typescript
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { CompanyForm } from "@/components/empresa/company-form";
import { LogoUpload } from "@/components/empresa/logo-upload";
import { ColorPicker } from "@/components/empresa/color-picker";
import { StorePreview } from "@/components/empresa/store-preview";

export default function EmpresaPage() {
  return (
    <div className="min-h-screen bg-uniq-platinum">
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header
        pageTitle="Minha Empresa"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Minha Empresa" },
        ]}
      />

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column (2/3) */}
          <div className="xl:col-span-2 space-y-6">
            <CompanyForm />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LogoUpload />
              <ColorPicker />
            </div>
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            <StorePreview />
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

### 5.3 Placeholder Pages (Módulos)

**Exemplo para cada módulo:** `app/crm/page.tsx`

```typescript
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header
        pageTitle="CRM"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "CRM" },
        ]}
      />
      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        <Card className="border-uniq-border">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-uniq-accent/20 flex items-center justify-center mb-4">
              <Construction className="w-10 h-10 text-uniq-accent" />
            </div>
            <h2 className="text-xl font-semibold text-uniq-text mb-2">
              Módulo em Desenvolvimento
            </h2>
            <p className="text-uniq-muted text-center max-w-md">
              O módulo CRM está sendo construído e estará disponível em breve.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
```

**Criar para:** `/crm`, `/financeiro`, `/estoque`, `/vendas`, `/loja`, `/agendamentos`

---

## 6. Layouts e Responsividade

### 6.1 App Shell

**Layout Base:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  Sidebar (fixed)  │  Header (fixed)                                  │
│   250px (lg)      │   64px height                                     │
├───────────────────┼──────────────────────────────────────────────────┤
│                   │  ┌──────────────────────────────────────────────┐│
│  [Logo]           │  │                                              ││
│                   │  │           MAIN CONTENT                       ││
│  [Principal]      │  │                                              ││
│   - Dashboard     │  │   ┌────────────────────────────────────┐    ││
│   - Empresa       │  │   │                                    │    ││
│   - Módulos       │  │   │   [Cards, Charts, Lists...]        │    ││
│                   │  │   │                                    │    ││
│  [Módulos]        │  │   └────────────────────────────────────┘    ││
│   - CRM           │  │                                              ││
│   - Financeiro    │  │                                              ││
│   - ...           │  │                                              ││
│                   │  └──────────────────────────────────────────────┘│
│  [Footer]         │                                                  │
└───────────────────┴──────────────────────────────────────────────────┘
```

### 6.2 Breakpoints

| Breakpoint | Largura | Layout |
|------------|---------|--------|
| Mobile | < 640px | Sidebar oculta, 1 coluna, menu hamburger |
| Tablet | 640-1024px | Sidebar fixa, 2 colunas métricas |
| Desktop | > 1024px | Sidebar fixa, 4 colunas métricas, 3 col grid |

### 6.3 Classes Tailwind Responsivas

```typescript
// Sidebar
"fixed left-0 top-0 z-50 h-screen w-64 bg-uniq-sidebar flex flex-col"
"-translate-x-full lg:translate-x-0" // Mobile: hidden, Desktop: visible

// Main Content
"ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]"

// Metrics Grid
"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"

// Main Dashboard Grid
"grid grid-cols-1 xl:grid-cols-3 gap-6"
"xl:col-span-2" // Left column
// Right column: auto 1 col

// Quick Modules Grid
"grid grid-cols-2 sm:grid-cols-3 gap-4"
```

---

## 7. Configuração do Recharts

### 7.1 Instalação

```bash
npm install recharts
```

### 7.2 Tema UNIQ

```typescript
// Cores do tema
const theme = {
  primary: "#3e5653",      // uniq-primary
  accent: "#86cb92",       // uniq-accent
  muted: "#627271",        // uniq-muted
  border: "#e5e7eb",       // uniq-border
  platinum: "#efefef",     // uniq-platinum
};

// Configuração do gráfico
<AreaChart>
  <defs>
    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#3e5653" stopOpacity={0.3} />
      <stop offset="95%" stopColor="#3e5653" stopOpacity={0} />
    </linearGradient>
  </defs>
  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
  <XAxis
    dataKey="label"
    axisLine={false}
    tickLine={false}
    tick={{ fill: "#627271", fontSize: 12 }}
  />
  <YAxis
    axisLine={false}
    tickLine={false}
    tick={{ fill: "#627271", fontSize: 12 }}
    tickFormatter={(value) => `R$${value / 1000}k`}
  />
  <Tooltip content={<CustomTooltip />} />
  <Area
    type="monotone"
    dataKey="sales"
    stroke="#3e5653"
    strokeWidth={2}
    fill="url(#colorSales)"
    animationDuration={1000}
  />
</AreaChart>
```

---

## 8. Implementação do Dropzone

### 8.1 Instalação

```bash
npm install react-dropzone
```

### 8.2 Configuração

```typescript
import { useDropzone } from "react-dropzone";

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: {
    "image/*": [".png", ".jpg", ".jpeg", ".svg"],
  },
  maxFiles: 1,
  maxSize: 2 * 1024 * 1024, // 2MB
  onDragEnter: () => setIsDragging(true),
  onDragLeave: () => setIsDragging(false),
});
```

### 8.3 Validações

- **Tipos aceitos:** PNG, JPG, JPEG, SVG
- **Tamanho máximo:** 2MB
- **Quantidade:** 1 arquivo por vez

---

## 9. Cronograma de Implementação

### 9.1 Dia 1: Setup e Estrutura

| Tarefa | Tempo | Status |
|--------|-------|--------|
| Instalar recharts | 5min | ⬜ |
| Instalar react-dropzone | 5min | ⬜ |
| Adicionar shadcn scroll-area | 5min | ⬜ |
| Criar estrutura de pastas | 10min | ⬜ |
| Criar mock data dashboard | 20min | ⬜ |
| Criar mock data company | 15min | ⬜ |

**Total:** ~1h

### 9.2 Dia 2: Dashboard Components

| Tarefa | Tempo | Status |
|--------|-------|--------|
| MetricsSection component | 30min | ⬜ |
| SalesChart com Recharts | 1.5h | ⬜ |
| ActivitiesList component | 45min | ⬜ |
| Atualizar dashboard/page.tsx | 30min | ⬜ |

**Total:** ~3h

### 9.3 Dia 3: Widgets e Navegação

| Tarefa | Tempo | Status |
|--------|-------|--------|
| QuickModules component | 30min | ⬜ |
| MELWidget component | 45min | ⬜ |
| Refinar sidebar com submenu | 1h | ⬜ |
| Criar placeholder pages | 30min | ⬜ |

**Total:** ~2.5h

### 9.4 Dia 4: Perfil da Empresa

| Tarefa | Tempo | Status |
|--------|-------|--------|
| CompanyForm component | 1.5h | ⬜ |
| LogoUpload com dropzone | 1h | ⬜ |
| ColorPicker component | 30min | ⬜ |
| StorePreview component | 45min | ⬜ |
| Criar empresa/page.tsx | 15min | ⬜ |

**Total:** ~4h

### 9.5 Dia 5: Testes e Refinamento

| Tarefa | Tempo | Status |
|--------|-------|--------|
| Testar responsividade mobile | 1h | ⬜ |
| Testar navegação entre páginas | 30min | ⬜ |
| Verificar Lighthouse scores | 30min | ⬜ |
| Corrigir bugs visuais | 1h | ⬜ |
| Documentação final | 30min | ⬜ |

**Total:** ~3.5h

---

## 10. Checklist de Definition of Done

### 10.1 Dashboard

- [ ] **DASH-01:** Dashboard renderiza com mock data completo
- [ ] **DASH-02:** 4 cards de métricas visíveis e formatados corretamente
- [ ] **DASH-03:** Gráfico de vendas responsivo (Recharts) funcionando
- [ ] **DASH-04:** Tabs de período (7d/30d/90d) alternando dados
- [ ] **DASH-05:** Lista de atividades scrollável com ícones
- [ ] **DASH-06:** Acesso rápido aos módulos navegável
- [ ] **DASH-07:** Widget MEL com mensagens e quick actions

### 10.2 Navegação

- [ ] **NAV-01:** Sidebar com todos os links funcionando
- [ ] **NAV-02:** Indicador de módulo ativo visível
- [ ] **NAV-03:** Menu mobile com hamburger funcionando
- [ ] **NAV-04:** User dropdown com opções renderizadas
- [ ] **NAV-05:** Logo UNIQ visível no topo da sidebar

### 10.3 Perfil da Empresa

- [ ] **PROF-01:** Formulário com todos os campos renderizados
- [ ] **PROF-02:** Validação visual de campos obrigatórios
- [ ] **PROF-03:** Upload de logo com drag & drop
- [ ] **PROF-04:** Preview do logo em tempo real
- [ ] **PROF-05:** Color pickers para cores da marca
- [ ] **PROF-06:** Preview da loja com cores aplicadas
- [ ] **PROF-07:** Botão salvar com estado de loading
- [ ] **PROF-08:** Toast de sucesso ao "salvar" (mock)

### 10.4 Responsividade

- [ ] **RESP-01:** Layout adapta para mobile (< 640px)
- [ ] **RESP-02:** Sidebar vira hamburger menu em mobile
- [ ] **RESP-03:** Métricas em 1 coluna em mobile, 2 em tablet, 4 em desktop
- [ ] **RESP-04:** Gráfico mantém proporção em todas telas

### 10.5 Performance

- [ ] **PERF-01:** Lighthouse Performance > 90
- [ ] **PERF-02:** First Contentful Paint < 1.5s
- [ ] **PERF-03:** Gráfico renderiza em < 500ms

---

## 11. Testes Manuais

### 11.1 Teste de Dashboard

```markdown
1. Acessar /dashboard
2. Verificar 4 cards de métricas com valores e tendências
3. Verificar gráfico de vendas renderizado
4. Clicar nas tabs (7d, 30d, 90d) e verificar mudança de dados
5. Passar mouse sobre o gráfico e verificar tooltip
6. Verificar lista de atividades com scroll
7. Verificar widget MEL com mensagens
8. Clicar em quick actions do MEL
9. Verificar grid de acesso rápido aos módulos
```

### 11.2 Teste de Navegação

```markdown
1. Clicar em cada link do sidebar
2. Verificar indicador de módulo ativo muda
3. Reduzir tela para < 1024px
4. Verificar botão hamburger aparece
5. Clicar no hamburger e verificar menu abre
6. Clicar em um link e verificar menu fecha
7. Clicar no avatar no header
8. Verificar dropdown do usuário abre
```

### 11.3 Teste de Perfil

```markdown
1. Acessar /empresa
2. Verificar formulário com todos os campos
3. Preencher campos e verificar estado
4. Testar upload de logo (arrastar e selecionar)
5. Verificar preview do logo
6. Remover logo e verificar placeholder
7. Alterar cores nos color pickers
8. Verificar preview da loja atualizando
9. Clicar em "Salvar" e verificar toast
10. Clicar em "Restaurar padrão" nas cores
```

### 11.4 Teste Responsivo

```markdown
1. Abrir DevTools
2. Testar em 375px (iPhone SE)
3. Testar em 768px (iPad)
4. Testar em 1440px (Desktop)
5. Verificar métricas em diferentes breakpoints
6. Verificar gráfico mantém proporção
7. Verificar sidebar comportamento
```

---

## 12. Referências

### 12.1 Documentação

- [Recharts Documentation](https://recharts.org/en-US)
- [React Dropzone](https://react-dropzone.js.org/)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [shadcn/ui Components](https://ui.shadcn.com/docs)

### 12.2 Tokens UNIQ (Confirmar em globals.css)

```css
:root {
  --uniq-primary: #3e5653;
  --uniq-accent: #86cb92;
  --uniq-platinum: #efefef;
  --uniq-sidebar: #1f2937;
  --uniq-text: #1f2937;
  --uniq-muted: #627271;
  --uniq-border: #e5e7eb;
}
```

---

## 13. Notas para Implementador

### 13.1 Prioridades

1. **Alta:** Dashboard overview, métricas, gráfico, navegação
2. **Média:** Atividades, MEL widget, perfil formulário
3. **Baixa:** Upload de logo (fallback: input file), preview da loja

### 13.2 Simplificações Permitidas

- Upload de logo pode usar input file nativo se react-dropzone falhar
- Preview da loja pode ser imagem estática
- Animações podem ser simples (Tailwind transitions)

### 13.3 Componentes Existentes (Reutilizar)

- ✅ `MetricCard` - já existe e funciona
- ✅ `Sidebar` - apenas refinar
- ✅ `Header` - apenas refinar
- ✅ `Card`, `Button`, `Badge`, `Avatar` - shadcn/ui

---

**Documento gerado em:** 20/03/2026  
**Planejador:** @vibe-planner  
**Fase:** FASE 02 - Planning (SDD)  
**Sprint:** SPRINT_03 - Dashboard UI  
**Próxima Fase:** FASE 03 - Implementation (@vibe-implementer)

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação técnica (SPEC). Contém código de referência e diretrizes detalhadas para implementação. O @vibe-implementer usará este documento como guia para escrever o código real.

---

**Fim do Documento**
