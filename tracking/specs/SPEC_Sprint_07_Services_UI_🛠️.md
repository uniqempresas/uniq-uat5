# SPEC - Sprint 07: Services UI 🛠️

## Overview Técnico

- **Stack:** React 18.3 + TypeScript 5.4 + Next.js 14.2 (App Router) + Tailwind CSS 3.4 + shadcn/ui
- **Padrão:** Componentes funcionais com hooks
- **Estado:** useState/useReducer locais (mock data)
- **Validação:** React Hook Form + Zod
- **Data:** date-fns para manipulação de datas

**Data da SPEC:** 20/03/2026  
**Baseada no PRD:** `tracking/plans/PRD_Sprint_07_Services_UI_🛠️.md`

---

## Estrutura de Arquivos

```
app/
├── servicos/
│   ├── page.tsx                          # Lista de serviços (Tela 7.1)
│   ├── layout.tsx                        # Layout específico do módulo
│   ├── novo/
│   │   └── page.tsx                      # Cadastro de novo serviço
│   ├── [id]/
│   │   └── page.tsx                      # Edição de serviço existente
│   ├── catalogo/
│   │   └── page.tsx                      # Preview do catálogo público
│   └── components/
│       ├── service-card.tsx              # Card de serviço (admin)
│       ├── service-grid.tsx              # Grid responsivo de cards
│       ├── service-skeleton.tsx          # Loading skeleton
│       ├── search-bar.tsx                # Campo de busca com debounce
│       ├── filters.tsx                   # Filtros por categoria/preço
│       ├── empty-state.tsx               # Estado vazio
│       ├── service-form.tsx              # Formulário principal
│       ├── service-form-tabs.tsx         # Tabs do formulário
│       ├── price-section.tsx             # Seção de preço e variações
│       ├── price-variation-row.tsx       # Linha de variação de preço
│       ├── availability-section.tsx      # Configuração de disponibilidade
│       ├── image-uploader.tsx            # Upload de imagens com preview
│       ├── image-preview.tsx             # Preview individual de imagem
│       ├── catalog-card.tsx              # Card do catálogo (visual loja)
│       └── service-detail-modal.tsx      # Modal de detalhes do serviço
├── hooks/
│   └── use-services.ts                   # Hook de gestão de serviços
├── types/
│   └── service.ts                        # Tipos TypeScript
├── lib/
│   ├── utils.ts                          # Utilitários existentes
│   └── mocks/
│       ├── services.ts                   # Mock data de serviços
│       └── categories.ts                 # Mock de categorias
└── schemas/
    └── service.ts                        # Schemas Zod para validação
```

---

## Tipos TypeScript

### Arquivo: `app/types/service.ts`

```typescript
// ============================================
// ENTIDADES PRINCIPAIS
// ============================================

export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: number; // minutos
  category: string;
  active: boolean;
  images: string[];
  variations: PriceVariation[];
  availability: AvailabilitySchedule;
  createdAt: string;
  updatedAt: string;
}

export interface PriceVariation {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface AvailabilitySchedule {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
  lunchBreak?: {
    start: string;
    end: string;
    enabled: boolean;
  };
}

export interface DayAvailability {
  active: boolean;
  start: string;
  end: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  color: string;
  count: number;
}

// ============================================
// TIPOS DE FORMULÁRIO
// ============================================

export interface ServiceFormData {
  name: string;
  description?: string;
  price: number;
  duration: number;
  category: string;
  active: boolean;
  images: string[];
  variations: PriceVariation[];
  availability: AvailabilitySchedule;
}

// ============================================
// TIPOS DE FILTROS
// ============================================

export interface ServiceFilters {
  search: string;
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  status: 'all' | 'active' | 'inactive';
}

// ============================================
// PROPS DOS COMPONENTES
// ============================================

export interface ServiceCardProps {
  service: Service;
  onEdit: (id: number) => void;
  onToggleActive: (id: number, active: boolean) => void;
  view?: 'admin' | 'catalog';
}

export interface ServiceGridProps {
  services: Service[];
  loading?: boolean;
  onEdit: (id: number) => void;
  onToggleActive: (id: number, active: boolean) => void;
}

export interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export interface PriceSectionProps {
  basePrice: number;
  variations: PriceVariation[];
  onBasePriceChange: (price: number) => void;
  onVariationsChange: (variations: PriceVariation[]) => void;
}

export interface AvailabilitySectionProps {
  schedule: AvailabilitySchedule;
  onChange: (schedule: AvailabilitySchedule) => void;
}

export interface CatalogCardProps {
  service: Service;
  onViewDetails: (service: Service) => void;
  onSchedule: (serviceId: number) => void;
}

export interface ServiceDetailModalProps {
  service: Service | null;
  open: boolean;
  onClose: () => void;
  onSchedule: (serviceId: number) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
}

export interface FiltersProps {
  filters: ServiceFilters;
  onChange: (filters: ServiceFilters) => void;
  categories: ServiceCategory[];
}
```

---

## Schemas Zod para Validação

### Arquivo: `app/schemas/service.ts`

```typescript
import { z } from 'zod';

// Schema para variação de preço
export const priceVariationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome da variação é obrigatório'),
  price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
  duration: z.number().min(5, 'Duração mínima é 5 minutos').max(480, 'Duração máxima é 8 horas'),
});

// Schema para disponibilidade de um dia
export const dayAvailabilitySchema = z.object({
  active: z.boolean(),
  start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido (HH:MM)'),
  end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido (HH:MM)'),
});

// Schema para disponibilidade completa
export const availabilityScheduleSchema = z.object({
  monday: dayAvailabilitySchema,
  tuesday: dayAvailabilitySchema,
  wednesday: dayAvailabilitySchema,
  thursday: dayAvailabilitySchema,
  friday: dayAvailabilitySchema,
  saturday: dayAvailabilitySchema,
  sunday: dayAvailabilitySchema,
  lunchBreak: z.object({
    start: z.string(),
    end: z.string(),
    enabled: z.boolean(),
  }).optional(),
});

// Schema principal do serviço
export const serviceSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome muito longo'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
  price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
  duration: z.number().min(5, 'Duração mínima é 5 minutos').max(480, 'Duração máxima é 8 horas'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  active: z.boolean().default(true),
  images: z.array(z.string()).max(5, 'Máximo de 5 imagens'),
  variations: z.array(priceVariationSchema).default([]),
  availability: availabilityScheduleSchema,
});

// Tipo inferido do schema
export type ServiceFormValues = z.infer<typeof serviceSchema>;
```

---

## Mock Data Implementável

### Arquivo: `app/lib/mocks/services.ts`

```typescript
import type { Service, ServiceCategory } from '@/app/types/service';

export const mockServices: Service[] = [
  {
    id: 1,
    name: "Corte de Cabelo Masculino",
    description: "Corte moderno com acabamento na navalha. Inclui lavagem e finalização.",
    price: 45.00,
    duration: 30,
    category: "Cabelo",
    active: true,
    images: ["/images/corte-masculino.jpg"],
    variations: [
      { id: "v1", name: "Corte + Barba", price: 65.00, duration: 45 },
      { id: "v2", name: "Corte Infantil", price: 35.00, duration: 20 },
    ],
    availability: {
      monday: { active: true, start: "09:00", end: "18:00" },
      tuesday: { active: true, start: "09:00", end: "18:00" },
      wednesday: { active: true, start: "09:00", end: "18:00" },
      thursday: { active: true, start: "09:00", end: "18:00" },
      friday: { active: true, start: "09:00", end: "19:00" },
      saturday: { active: true, start: "09:00", end: "14:00" },
      sunday: { active: false, start: "", end: "" },
      lunchBreak: { start: "12:00", end: "13:00", enabled: true },
    },
    createdAt: "2026-03-15T10:00:00Z",
    updatedAt: "2026-03-18T14:30:00Z",
  },
  {
    id: 2,
    name: "Manicure",
    description: "Cutilagem, esmaltação e hidratação das mãos.",
    price: 35.00,
    duration: 45,
    category: "Unhas",
    active: true,
    images: ["/images/manicure.jpg"],
    variations: [],
    availability: {
      monday: { active: true, start: "10:00", end: "18:00" },
      tuesday: { active: true, start: "10:00", end: "18:00" },
      wednesday: { active: true, start: "10:00", end: "18:00" },
      thursday: { active: true, start: "10:00", end: "18:00" },
      friday: { active: true, start: "10:00", end: "19:00" },
      saturday: { active: true, start: "10:00", end: "16:00" },
      sunday: { active: false, start: "", end: "" },
    },
    createdAt: "2026-03-16T09:00:00Z",
    updatedAt: "2026-03-16T09:00:00Z",
  },
  {
    id: 3,
    name: "Pedicure",
    description: "Cutilagem, esmaltação e hidratação dos pés.",
    price: 40.00,
    duration: 50,
    category: "Unhas",
    active: true,
    images: [],
    variations: [],
    availability: {
      monday: { active: true, start: "10:00", end: "18:00" },
      tuesday: { active: true, start: "10:00", end: "18:00" },
      wednesday: { active: true, start: "10:00", end: "18:00" },
      thursday: { active: true, start: "10:00", end: "18:00" },
      friday: { active: true, start: "10:00", end: "19:00" },
      saturday: { active: true, start: "10:00", end: "16:00" },
      sunday: { active: false, start: "", end: "" },
    },
    createdAt: "2026-03-16T10:00:00Z",
    updatedAt: "2026-03-16T10:00:00Z",
  },
  {
    id: 4,
    name: "Hidratação Capilar",
    description: "Tratamento profundo para cabelos ressecados.",
    price: 60.00,
    duration: 60,
    category: "Cabelo",
    active: false,
    images: ["/images/hidratacao.jpg"],
    variations: [
      { id: "v3", name: "Hidratação + Corte", price: 95.00, duration: 90 },
    ],
    availability: {
      monday: { active: true, start: "09:00", end: "17:00" },
      tuesday: { active: true, start: "09:00", end: "17:00" },
      wednesday: { active: true, start: "09:00", end: "17:00" },
      thursday: { active: true, start: "09:00", end: "17:00" },
      friday: { active: true, start: "09:00", end: "17:00" },
      saturday: { active: false, start: "", end: "" },
      sunday: { active: false, start: "", end: "" },
    },
    createdAt: "2026-03-17T08:00:00Z",
    updatedAt: "2026-03-19T16:00:00Z",
  },
  {
    id: 5,
    name: "Barba Completa",
    description: "Aparação, modelagem e hidratação da barba.",
    price: 30.00,
    duration: 25,
    category: "Barba",
    active: true,
    images: [],
    variations: [],
    availability: {
      monday: { active: true, start: "09:00", end: "18:00" },
      tuesday: { active: true, start: "09:00", end: "18:00" },
      wednesday: { active: true, start: "09:00", end: "18:00" },
      thursday: { active: true, start: "09:00", end: "18:00" },
      friday: { active: true, start: "09:00", end: "19:00" },
      saturday: { active: true, start: "09:00", end: "14:00" },
      sunday: { active: false, start: "", end: "" },
    },
    createdAt: "2026-03-18T11:00:00Z",
    updatedAt: "2026-03-18T11:00:00Z",
  },
  {
    id: 6,
    name: "Massagem Relaxante",
    description: "Massagem corporal completa para relaxamento.",
    price: 120.00,
    duration: 60,
    category: "Massagem",
    active: true,
    images: ["/images/massagem.jpg"],
    variations: [
      { id: "v4", name: "Massagem 30min", price: 70.00, duration: 30 },
      { id: "v5", name: "Massagem 90min", price: 170.00, duration: 90 },
    ],
    availability: {
      monday: { active: true, start: "10:00", end: "18:00" },
      tuesday: { active: true, start: "10:00", end: "18:00" },
      wednesday: { active: true, start: "10:00", end: "18:00" },
      thursday: { active: true, start: "10:00", end: "18:00" },
      friday: { active: true, start: "10:00", end: "19:00" },
      saturday: { active: true, start: "10:00", end: "15:00" },
      sunday: { active: false, start: "", end: "" },
    },
    createdAt: "2026-03-19T09:00:00Z",
    updatedAt: "2026-03-19T09:00:00Z",
  },
];

export const mockServiceCategories: ServiceCategory[] = [
  { id: 1, name: "Cabelo", color: "#3b82f6", count: 5 },
  { id: 2, name: "Unhas", color: "#ec4899", count: 3 },
  { id: 3, name: "Barba", color: "#8b5cf6", count: 2 },
  { id: 4, name: "Estética", color: "#10b981", count: 4 },
  { id: 5, name: "Massagem", color: "#f59e0b", count: 2 },
];

// Helper functions
export const getActiveServices = () => mockServices.filter(s => s.active);
export const getServicesByCategory = (category: string) => 
  mockServices.filter(s => s.category === category);
export const getServiceById = (id: number) => 
  mockServices.find(s => s.id === id);
export const getMinMaxPrices = () => ({
  min: Math.min(...mockServices.map(s => s.price)),
  max: Math.max(...mockServices.map(s => s.price)),
});
```

---

## Componentes Detalhados

### 1. ServiceCard (Card de Serviço - Admin)

**Arquivo:** `app/servicos/components/service-card.tsx`

```typescript
"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Scissors, Clock, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceCardProps } from "@/app/types/service";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function ServiceCard({ 
  service, 
  onEdit, 
  onToggleActive,
  view = 'admin' 
}: ServiceCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md",
        !service.active && view === 'admin' && 'opacity-70'
      )}
    >
      {/* Imagem ou placeholder */}
      <div className="h-40 bg-uniq-platinum flex items-center justify-center overflow-hidden">
        {service.images?.[0] ? (
          <img 
            src={service.images[0]} 
            alt={service.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <Scissors className="w-12 h-12 text-uniq-muted" />
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-uniq-text line-clamp-1">
          {service.name}
        </h3>
        <p className="text-xl font-bold text-uniq-accent mt-1">
          {formatCurrency(service.price)}
        </p>
        <div className="flex items-center gap-2 mt-2 text-sm text-uniq-muted">
          <Clock className="w-4 h-4" />
          {service.duration} min
        </div>
        <Badge 
          variant="secondary" 
          className="mt-2"
          style={{ 
            backgroundColor: `${getCategoryColor(service.category)}20`,
            color: getCategoryColor(service.category),
            borderColor: getCategoryColor(service.category)
          }}
        >
          {service.category}
        </Badge>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Switch
            checked={service.active}
            onCheckedChange={(checked) => onToggleActive(service.id, checked)}
          />
          <span className="text-sm text-uniq-muted">
            {service.active ? 'Ativo' : 'Inativo'}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onEdit(service.id)}
          className="hover:bg-uniq-platinum"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Cabelo': '#3b82f6',
    'Unhas': '#ec4899',
    'Barba': '#8b5cf6',
    'Estética': '#10b981',
    'Massagem': '#f59e0b',
  };
  return colors[category] || '#627271';
}
```

---

### 2. ServiceGrid (Grid de Serviços)

**Arquivo:** `app/servicos/components/service-grid.tsx`

```typescript
"use client";

import { ServiceCard } from "./service-card";
import { ServiceSkeleton } from "./service-skeleton";
import { EmptyState } from "./empty-state";
import type { ServiceGridProps } from "@/app/types/service";

interface ExtendedServiceGridProps extends ServiceGridProps {
  onAddNew: () => void;
}

export function ServiceGrid({ 
  services, 
  loading = false, 
  onEdit, 
  onToggleActive,
  onAddNew 
}: ExtendedServiceGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return <EmptyState onAddNew={onAddNew} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onEdit={onEdit}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}
```

---

### 3. ServiceSkeleton (Loading State)

**Arquivo:** `app/servicos/components/service-skeleton.tsx`

```typescript
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ServiceSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-5 w-20" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-8 rounded" />
      </CardFooter>
    </Card>
  );
}
```

---

### 4. SearchBar (Busca com Debounce)

**Arquivo:** `app/servicos/components/search-bar.tsx`

```typescript
"use client";

import { useState, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchBarProps } from "@/app/types/service";

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Buscar serviço...",
  loading = false 
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce de 300ms
  const debouncedOnChange = useCallback(
    debounce((val: string) => onChange(val), 300),
    [onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-uniq-muted" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-10 py-2.5 rounded-lg border bg-uniq-white text-sm text-uniq-text placeholder-uniq-muted focus:outline-none transition-all",
          isFocused
            ? "ring-2 ring-uniq-accent border-uniq-accent"
            : "border-uniq-border"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-uniq-muted animate-spin" />
      )}
    </div>
  );
}

// Utility debounce function
function debounce<T extends (...args: string[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

---

### 5. Filters (Filtros)

**Arquivo:** `app/servicos/components/filters.tsx`

```typescript
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { FiltersProps } from "@/app/types/service";

export function Filters({ filters, onChange, categories }: FiltersProps) {
  const activeFiltersCount = [
    filters.category,
    filters.minPrice !== null,
    filters.maxPrice !== null,
    filters.status !== 'all'
  ].filter(Boolean).length;

  const clearFilters = () => {
    onChange({
      search: filters.search,
      category: null,
      minPrice: null,
      maxPrice: null,
      status: 'all',
    });
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Select
        value={filters.category || 'all'}
        onValueChange={(value) => 
          onChange({ ...filters, category: value === 'all' ? null : value })
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas categorias</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value: 'all' | 'active' | 'inactive') => 
          onChange({ ...filters, status: value })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="active">Ativos</SelectItem>
          <SelectItem value="inactive">Inativos</SelectItem>
        </SelectContent>
      </Select>

      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-sm text-uniq-muted hover:text-uniq-text transition-colors"
        >
          <X className="w-4 h-4" />
          Limpar filtros
          <Badge variant="secondary" className="ml-1 text-xs">
            {activeFiltersCount}
          </Badge>
        </button>
      )}
    </div>
  );
}
```

---

### 6. EmptyState (Estado Vazio)

**Arquivo:** `app/servicos/components/empty-state.tsx`

```typescript
import { Scissors, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddNew: () => void;
}

export function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-uniq-platinum flex items-center justify-center mb-4">
        <Scissors className="w-10 h-10 text-uniq-muted" />
      </div>
      <h3 className="text-lg font-semibold text-uniq-text mb-2">
        Nenhum serviço cadastrado
      </h3>
      <p className="text-sm text-uniq-muted max-w-sm mb-6">
        Comece cadastrando seu primeiro serviço para disponibilizá-lo no catálogo.
      </p>
      <Button onClick={onAddNew} className="gap-2">
        <Plus className="w-4 h-4" />
        Cadastrar primeiro serviço
      </Button>
    </div>
  );
}
```

---

### 7. ImageUploader (Upload com Preview)

**Arquivo:** `app/servicos/components/image-uploader.tsx`

```typescript
"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ImageUploaderProps } from "@/app/types/service";

export function ImageUploader({ 
  images, 
  onChange, 
  maxImages = 5 
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Verifica limite
    if (images.length + files.length > maxImages) {
      alert(`Máximo de ${maxImages} imagens permitidas`);
      return;
    }

    setUploading(true);

    try {
      // Converte files para base64 (preview)
      const newImages: string[] = [];
      
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue;
        
        const base64 = await fileToBase64(file);
        newImages.push(base64);
      }

      onChange([...images, ...newImages]);
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [images, onChange, maxImages]);

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-uniq-text">
        Imagens do Serviço
        <span className="text-uniq-muted font-normal ml-1">
          ({images.length}/{maxImages})
        </span>
      </label>

      <div className="flex flex-wrap gap-3">
        {/* Imagens existentes */}
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative w-24 h-24 rounded-lg border border-uniq-border overflow-hidden group"
          >
            <img 
              src={image} 
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Botão de adicionar */}
        {canAddMore && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "w-24 h-24 rounded-lg border-2 border-dashed border-uniq-border flex flex-col items-center justify-center gap-2 transition-colors",
              "hover:border-uniq-accent hover:bg-uniq-accent/5",
              uploading && "opacity-50 cursor-not-allowed"
            )}
            type="button"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 text-uniq-muted animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-uniq-muted" />
                <span className="text-xs text-uniq-muted">Adicionar</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      <p className="text-xs text-uniq-muted">
        Clique na caixa pontilhada para adicionar imagens. Máximo {maxImages} imagens.
      </p>
    </div>
  );
}

// Helper: File to Base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

---

### 8. PriceSection (Seção de Preço)

**Arquivo:** `app/servicos/components/price-section.tsx`

```typescript
"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PriceSectionProps, PriceVariation } from "@/app/types/service";

export function PriceSection({ 
  basePrice, 
  variations, 
  onBasePriceChange, 
  onVariationsChange 
}: PriceSectionProps) {
  const handleAddVariation = () => {
    const newVariation: PriceVariation = {
      id: crypto.randomUUID(),
      name: '',
      price: basePrice,
      duration: 30,
    };
    onVariationsChange([...variations, newVariation]);
  };

  const handleRemoveVariation = (id: string) => {
    onVariationsChange(variations.filter(v => v.id !== id));
  };

  const handleVariationChange = (id: string, field: keyof PriceVariation, value: string | number) => {
    onVariationsChange(
      variations.map(v => 
        v.id === id ? { ...v, [field]: value } : v
      )
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const parseCurrency = (value: string) => {
    const numeric = value.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numeric) || 0;
  };

  return (
    <div className="space-y-6">
      {/* Preço Base */}
      <div className="space-y-2">
        <Label htmlFor="base-price">Preço Base *</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-uniq-muted">
            R$
          </span>
          <Input
            id="base-price"
            type="text"
            value={formatCurrency(basePrice).replace('R$ ', '')}
            onChange={(e) => onBasePriceChange(parseCurrency(e.target.value))}
            className="pl-10"
            placeholder="0,00"
          />
        </div>
      </div>

      {/* Variações */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Variações de Preço</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddVariation}
            className="gap-1"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>

        {variations.length === 0 && (
          <p className="text-sm text-uniq-muted">
            Nenhuma variação cadastrada. Adicione variações como &quot;Corte + Barba&quot; ou &quot;Corte Infantil&quot;.
          </p>
        )}

        {variations.map((variation, index) => (
          <div 
            key={variation.id}
            className="grid grid-cols-12 gap-3 items-start p-3 border border-uniq-border rounded-lg bg-uniq-platinum/30"
          >
            <div className="col-span-5">
              <Input
                placeholder="Nome da variação"
                value={variation.name}
                onChange={(e) => handleVariationChange(variation.id, 'name', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-uniq-muted text-sm">
                  R$
                </span>
                <Input
                  type="text"
                  value={formatCurrency(variation.price).replace('R$ ', '')}
                  onChange={(e) => handleVariationChange(variation.id, 'price', parseCurrency(e.target.value))}
                  className="pl-8"
                  placeholder="0,00"
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="relative">
                <Input
                  type="number"
                  value={variation.duration}
                  onChange={(e) => handleVariationChange(variation.id, 'duration', parseInt(e.target.value) || 0)}
                  className="pr-10"
                  min={5}
                  max={480}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-uniq-muted text-sm">
                  min
                </span>
              </div>
            </div>
            <div className="col-span-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveVariation(variation.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### 9. AvailabilitySection (Disponibilidade)

**Arquivo:** `app/servicos/components/availability-section.tsx`

```typescript
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { AvailabilitySectionProps, DayAvailability, AvailabilitySchedule } from "@/app/types/service";

const DAYS = [
  { key: 'monday', label: 'Seg' },
  { key: 'tuesday', label: 'Ter' },
  { key: 'wednesday', label: 'Qua' },
  { key: 'thursday', label: 'Qui' },
  { key: 'friday', label: 'Sex' },
  { key: 'saturday', label: 'Sáb' },
  { key: 'sunday', label: 'Dom' },
] as const;

export function AvailabilitySection({ schedule, onChange }: AvailabilitySectionProps) {
  const handleDayToggle = (day: keyof AvailabilitySchedule, checked: boolean) => {
    onChange({
      ...schedule,
      [day]: {
        ...schedule[day as keyof Omit<AvailabilitySchedule, 'lunchBreak'>],
        active: checked,
      },
    });
  };

  const handleTimeChange = (
    day: keyof AvailabilitySchedule,
    field: 'start' | 'end',
    value: string
  ) => {
    onChange({
      ...schedule,
      [day]: {
        ...schedule[day as keyof Omit<AvailabilitySchedule, 'lunchBreak'>],
        [field]: value,
      },
    });
  };

  const handleLunchToggle = (enabled: boolean) => {
    onChange({
      ...schedule,
      lunchBreak: {
        ...schedule.lunchBreak,
        start: schedule.lunchBreak?.start || '12:00',
        end: schedule.lunchBreak?.end || '13:00',
        enabled,
      },
    });
  };

  const handleLunchTimeChange = (field: 'start' | 'end', value: string) => {
    onChange({
      ...schedule,
      lunchBreak: {
        ...schedule.lunchBreak,
        start: schedule.lunchBreak?.start || '12:00',
        end: schedule.lunchBreak?.end || '13:00',
        enabled: schedule.lunchBreak?.enabled || false,
        [field]: value,
      },
    });
  };

  const allActive = DAYS.every(day => schedule[day.key].active);
  const allSameTime = DAYS.every(day => 
    schedule[day.key].start === schedule.monday.start && 
    schedule[day.key].end === schedule.monday.end
  );

  const applyToAll = (start: string, end: string) => {
    const newSchedule = { ...schedule };
    DAYS.forEach(day => {
      if (newSchedule[day.key].active) {
        newSchedule[day.key] = {
          ...newSchedule[day.key],
          start,
          end,
        };
      }
    });
    onChange(newSchedule);
  };

  return (
    <div className="space-y-6">
      {/* Dias da Semana */}
      <div className="space-y-3">
        <Label>Dias de Atendimento</Label>
        <div className="flex flex-wrap gap-3">
          {DAYS.map((day) => (
            <label
              key={day.key}
              className="flex items-center gap-2 px-3 py-2 border border-uniq-border rounded-lg cursor-pointer hover:bg-uniq-platinum/50 transition-colors"
            >
              <Checkbox
                checked={schedule[day.key].active}
                onCheckedChange={(checked) => 
                  handleDayToggle(day.key, checked as boolean)
                }
              />
              <span className="text-sm font-medium">{day.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Horários */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Horários de Atendimento</Label>
          {allActive && allSameTime && (
            <span className="text-xs text-uniq-accent bg-uniq-accent/10 px-2 py-1 rounded">
              Mesmo horário todos os dias
            </span>
          )}
        </div>

        {DAYS.map((day) => {
          const daySchedule = schedule[day.key] as DayAvailability;
          if (!daySchedule.active) return null;

          return (
            <div 
              key={day.key}
              className="grid grid-cols-12 gap-3 items-center p-3 border border-uniq-border rounded-lg"
            >
              <div className="col-span-2">
                <span className="text-sm font-medium">{day.label}</span>
              </div>
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-uniq-muted">Das</span>
                  <Input
                    type="time"
                    value={daySchedule.start}
                    onChange={(e) => handleTimeChange(day.key, 'start', e.target.value)}
                    className="w-28"
                  />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-uniq-muted">às</span>
                  <Input
                    type="time"
                    value={daySchedule.end}
                    onChange={(e) => handleTimeChange(day.key, 'end', e.target.value)}
                    className="w-28"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pausa para Almoço */}
      <div className="space-y-3 p-4 border border-uniq-border rounded-lg bg-uniq-platinum/20">
        <div className="flex items-center justify-between">
          <Label>Pausa para Almoço</Label>
          <Switch
            checked={schedule.lunchBreak?.enabled || false}
            onCheckedChange={handleLunchToggle}
          />
        </div>

        {schedule.lunchBreak?.enabled && (
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-uniq-muted">Das</span>
              <Input
                type="time"
                value={schedule.lunchBreak.start}
                onChange={(e) => handleLunchTimeChange('start', e.target.value)}
                className="w-28"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-uniq-muted">às</span>
              <Input
                type="time"
                value={schedule.lunchBreak.end}
                onChange={(e) => handleLunchTimeChange('end', e.target.value)}
                className="w-28"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### 10. ServiceForm (Formulário Principal)

**Arquivo:** `app/servicos/components/service-form.tsx`

```typescript
"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { PriceSection } from "./price-section";
import { AvailabilitySection } from "./availability-section";
import { serviceSchema, type ServiceFormValues } from "@/app/schemas/service";
import { mockServiceCategories } from "@/lib/mocks/services";
import type { ServiceFormProps } from "@/app/types/service";

const defaultAvailability = {
  monday: { active: true, start: "09:00", end: "18:00" },
  tuesday: { active: true, start: "09:00", end: "18:00" },
  wednesday: { active: true, start: "09:00", end: "18:00" },
  thursday: { active: true, start: "09:00", end: "18:00" },
  friday: { active: true, start: "09:00", end: "18:00" },
  saturday: { active: false, start: "", end: "" },
  sunday: { active: false, start: "", end: "" },
  lunchBreak: { start: "12:00", end: "13:00", enabled: true },
};

export function ServiceForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading = false 
}: ServiceFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const router = useRouter();

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      duration: 30,
      category: '',
      active: true,
      images: [],
      variations: [],
      availability: defaultAvailability,
    },
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue } = form;

  const handleFormSubmit = (data: ServiceFormValues) => {
    onSubmit(data);
  };

  const price = watch('price');
  const variations = watch('variations');
  const availability = watch('availability');
  const images = watch('images');

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
            <TabsTrigger value="price">Preço</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          </TabsList>

          {/* Aba: Dados Básicos */}
          <TabsContent value="basic" className="space-y-6">
            <div className="bg-uniq-white rounded-xl border border-uniq-border p-6 space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome do Serviço *
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Ex: Corte de Cabelo Masculino"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Descreva o serviço..."
                  rows={4}
                />
              </div>

              {/* Categoria e Duração */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Categoria *
                  </Label>
                  <Select
                    value={watch('category')}
                    onValueChange={(value) => setValue('category', value)}
                  >
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockServiceCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Duração (min) *
                  </Label>
                  <div className="relative">
                    <Input
                      id="duration"
                      type="number"
                      {...register('duration', { valueAsNumber: true })}
                      min={5}
                      max={480}
                      step={5}
                      className={errors.duration ? "border-red-500 pr-12" : "pr-12"}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-uniq-muted text-sm">
                      min
                    </span>
                  </div>
                  {errors.duration && (
                    <p className="text-sm text-red-500">{errors.duration.message}</p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 p-4 border border-uniq-border rounded-lg">
                <Switch
                  checked={watch('active')}
                  onCheckedChange={(checked) => setValue('active', checked)}
                />
                <div>
                  <Label className="cursor-pointer">
                    Serviço Ativo
                  </Label>
                  <p className="text-sm text-uniq-muted">
                    Serviços inativos não aparecem no catálogo
                  </p>
                </div>
              </div>

              {/* Upload de Imagens */}
              <ImageUploader
                images={images}
                onChange={(newImages) => setValue('images', newImages)}
                maxImages={5}
              />
            </div>
          </TabsContent>

          {/* Aba: Preço */}
          <TabsContent value="price">
            <div className="bg-uniq-white rounded-xl border border-uniq-border p-6">
              <PriceSection
                basePrice={price}
                variations={variations}
                onBasePriceChange={(newPrice) => setValue('price', newPrice)}
                onVariationsChange={(newVariations) => setValue('variations', newVariations)}
              />
            </div>
          </TabsContent>

          {/* Aba: Disponibilidade */}
          <TabsContent value="availability">
            <div className="bg-uniq-white rounded-xl border border-uniq-border p-6">
              <AvailabilitySection
                schedule={availability}
                onChange={(newSchedule) => setValue('availability', newSchedule)}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Ações */}
        <div className="flex items-center justify-between pt-4 border-t border-uniq-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="gap-2 bg-uniq-primary hover:bg-uniq-hover"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar Serviço
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
```

---

### 11. CatalogCard (Card do Catálogo)

**Arquivo:** `app/servicos/components/catalog-card.tsx`

```typescript
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogCardProps } from "@/app/types/service";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function CatalogCard({ 
  service, 
  onViewDetails, 
  onSchedule 
}: CatalogCardProps) {
  const hasVariations = service.variations && service.variations.length > 0;
  const minPrice = hasVariations 
    ? Math.min(service.price, ...service.variations.map(v => v.price))
    : service.price;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      {/* Imagem */}
      <div className="h-48 bg-uniq-platinum flex items-center justify-center overflow-hidden relative">
        {service.images?.[0] ? (
          <>
            <img 
              src={service.images[0]} 
              alt={service.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          <Scissors className="w-16 h-16 text-uniq-muted/50" />
        )}
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Categoria */}
        <Badge 
          variant="secondary" 
          className="text-xs"
          style={{ 
            backgroundColor: `${getCategoryColor(service.category)}15`,
            color: getCategoryColor(service.category),
          }}
        >
          {service.category}
        </Badge>

        {/* Nome */}
        <h3 className="text-lg font-semibold text-uniq-text line-clamp-2">
          {service.name}
        </h3>

        {/* Preço */}
        <div className="space-y-1">
          {hasVariations && (
            <span className="text-xs text-uniq-muted">A partir de</span>
          )}
          <p className="text-2xl font-bold text-uniq-accent">
            {formatCurrency(minPrice)}
          </p>
        </div>

        {/* Duração */}
        <div className="flex items-center gap-2 text-sm text-uniq-muted">
          <Clock className="w-4 h-4" />
          {service.duration} minutos
        </div>

        {/* Ações */}
        <div className="pt-2 space-y-2">
          <Button 
            className="w-full bg-uniq-primary hover:bg-uniq-hover"
            onClick={() => onSchedule(service.id)}
          >
            Agendar
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-uniq-muted hover:text-uniq-text"
            onClick={() => onViewDetails(service)}
          >
            Ver Detalhes
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Cabelo': '#3b82f6',
    'Unhas': '#ec4899',
    'Barba': '#8b5cf6',
    'Estética': '#10b981',
    'Massagem': '#f59e0b',
  };
  return colors[category] || '#627271';
}
```

---

### 12. ServiceDetailModal (Modal de Detalhes)

**Arquivo:** `app/servicos/components/service-detail-modal.tsx`

```typescript
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scissors, Clock, Calendar, X } from "lucide-react";
import type { ServiceDetailModalProps } from "@/app/types/service";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function ServiceDetailModal({ 
  service, 
  open, 
  onClose, 
  onSchedule 
}: ServiceDetailModalProps) {
  if (!service) return null;

  const hasVariations = service.variations && service.variations.length > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] p-0 overflow-hidden">
        {/* Imagem Header */}
        <div className="h-48 bg-uniq-platinum flex items-center justify-center relative">
          {service.images?.[0] ? (
            <img 
              src={service.images[0]} 
              alt={service.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Scissors className="w-16 h-16 text-uniq-muted" />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScrollArea className="max-h-[calc(90vh-12rem)]">
          <div className="p-6 space-y-6">
            {/* Header Info */}
            <div>
              <Badge 
                variant="secondary"
                className="mb-2"
                style={{ 
                  backgroundColor: `${getCategoryColor(service.category)}20`,
                  color: getCategoryColor(service.category),
                }}
              >
                {service.category}
              </Badge>
              <DialogTitle className="text-2xl font-bold text-uniq-text">
                {service.name}
              </DialogTitle>
            </div>

            {/* Descrição */}
            {service.description && (
              <p className="text-uniq-muted leading-relaxed">
                {service.description}
              </p>
            )}

            {/* Preços */}
            <div className="space-y-3">
              <h4 className="font-semibold text-uniq-text">Preços</h4>
              
              {/* Preço Base */}
              <div className="flex items-center justify-between p-3 bg-uniq-platinum/50 rounded-lg">
                <span className="text-uniq-text">Serviço Padrão</span>
                <span className="font-bold text-uniq-accent">
                  {formatCurrency(service.price)}
                </span>
              </div>

              {/* Variações */}
              {hasVariations && (
                <div className="space-y-2">
                  {service.variations.map((variation) => (
                    <div 
                      key={variation.id}
                      className="flex items-center justify-between p-3 border border-uniq-border rounded-lg"
                    >
                      <div>
                        <span className="text-uniq-text">{variation.name}</span>
                        <span className="text-xs text-uniq-muted ml-2">
                          ({variation.duration} min)
                        </span>
                      </div>
                      <span className="font-bold text-uniq-accent">
                        {formatCurrency(variation.price)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Duração */}
            <div className="flex items-center gap-3 text-uniq-muted">
              <Clock className="w-5 h-5" />
              <span>Duração estimada: <strong className="text-uniq-text">{service.duration} minutos</strong></span>
            </div>

            {/* Disponibilidade */}
            <div className="space-y-2">
              <h4 className="font-semibold text-uniq-text flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Disponibilidade
              </h4>
              <div className="flex flex-wrap gap-2">
                {getActiveDays(service.availability).map((day) => (
                  <Badge key={day} variant="outline" className="text-xs">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Fixo */}
        <div className="p-4 border-t border-uniq-border bg-uniq-white">
          <Button 
            className="w-full bg-uniq-primary hover:bg-uniq-hover"
            onClick={() => {
              onSchedule(service.id);
              onClose();
            }}
          >
            Agendar Agora
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Cabelo': '#3b82f6',
    'Unhas': '#ec4899',
    'Barba': '#8b5cf6',
    'Estética': '#10b981',
    'Massagem': '#f59e0b',
  };
  return colors[category] || '#627271';
}

function getActiveDays(availability: Service['availability']): string[] {
  const days = [];
  const dayNames: Record<string, string> = {
    monday: 'Seg',
    tuesday: 'Ter',
    wednesday: 'Qua',
    thursday: 'Qui',
    friday: 'Sex',
    saturday: 'Sáb',
    sunday: 'Dom',
  };

  Object.entries(availability).forEach(([key, value]) => {
    if (key !== 'lunchBreak' && value.active) {
      days.push(dayNames[key]);
    }
  });

  return days;
}
```

---

## Hook Customizado: useServices

**Arquivo:** `app/hooks/use-services.ts`

```typescript
"use client";

import { useState, useMemo, useCallback } from "react";
import { mockServices, mockServiceCategories } from "@/lib/mocks/services";
import type { Service, ServiceFilters, ServiceFormData } from "@/app/types/service";

interface UseServicesReturn {
  // Estado
  services: Service[];
  loading: boolean;
  error: string | null;
  
  // Filtros
  filters: ServiceFilters;
  setFilters: (filters: ServiceFilters) => void;
  filteredServices: Service[];
  
  // Ações
  toggleServiceActive: (id: number, active: boolean) => void;
  createService: (data: ServiceFormData) => Promise<Service>;
  updateService: (id: number, data: ServiceFormData) => Promise<Service>;
  deleteService: (id: number) => Promise<void>;
  
  // Dados auxiliares
  categories: typeof mockServiceCategories;
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ServiceFilters>({
    search: '',
    category: null,
    minPrice: null,
    maxPrice: null,
    status: 'all',
  });

  // Filtrar serviços
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Filtro de busca
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          service.name.toLowerCase().includes(searchLower) ||
          service.description?.toLowerCase().includes(searchLower) ||
          service.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Filtro de categoria
      if (filters.category && service.category !== filters.category) {
        return false;
      }

      // Filtro de preço
      if (filters.minPrice !== null && service.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== null && service.price > filters.maxPrice) {
        return false;
      }

      // Filtro de status
      if (filters.status === 'active' && !service.active) {
        return false;
      }
      if (filters.status === 'inactive' && service.active) {
        return false;
      }

      return true;
    });
  }, [services, filters]);

  // Toggle ativo/inativo
  const toggleServiceActive = useCallback((id: number, active: boolean) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, active } : service
      )
    );
  }, []);

  // Criar serviço
  const createService = useCallback(async (data: ServiceFormData): Promise<Service> => {
    setLoading(true);
    
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newService: Service = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setServices((prev) => [...prev, newService]);
    setLoading(false);
    return newService;
  }, []);

  // Atualizar serviço
  const updateService = useCallback(async (id: number, data: ServiceFormData): Promise<Service> => {
    setLoading(true);
    
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedService: Service = {
      ...data,
      id,
      createdAt: services.find((s) => s.id === id)?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setServices((prev) =>
      prev.map((service) => (service.id === id ? updatedService : service))
    );
    setLoading(false);
    return updatedService;
  }, [services]);

  // Deletar serviço
  const deleteService = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 300));

    setServices((prev) => prev.filter((service) => service.id !== id));
    setLoading(false);
  }, []);

  return {
    services,
    loading,
    error,
    filters,
    setFilters,
    filteredServices,
    toggleServiceActive,
    createService,
    updateService,
    deleteService,
    categories: mockServiceCategories,
  };
}
```

---

## Páginas

### 1. Lista de Serviços

**Arquivo:** `app/servicos/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ServiceGrid } from "./components/service-grid";
import { SearchBar } from "./components/search-bar";
import { Filters } from "./components/filters";
import { useServices } from "@/app/hooks/use-services";

export default function ServicesPage() {
  const router = useRouter();
  const {
    filteredServices,
    loading,
    filters,
    setFilters,
    toggleServiceActive,
    categories,
  } = useServices();

  const handleEdit = (id: number) => {
    router.push(`/servicos/${id}`);
  };

  const handleAddNew = () => {
    router.push('/servicos/novo');
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Serviços"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Serviços" },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-6 min-h-[calc(100vh-64px)]">
        {/* Barra de Ações */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SearchBar
              value={filters.search}
              onChange={(value) => setFilters({ ...filters, search: value })}
              placeholder="Buscar serviço..."
              loading={loading}
            />
            <div className="hidden sm:block">
              <Filters
                filters={filters}
                onChange={setFilters}
                categories={categories}
              />
            </div>
          </div>
          <Button 
            onClick={handleAddNew}
            className="gap-2 bg-uniq-primary hover:bg-uniq-hover"
          >
            <Plus className="w-4 h-4" />
            Novo Serviço
          </Button>
        </div>

        {/* Filtros Mobile */}
        <div className="sm:hidden mb-6">
          <Filters
            filters={filters}
            onChange={setFilters}
            categories={categories}
          />
        </div>

        {/* Grid de Serviços */}
        <ServiceGrid
          services={filteredServices}
          loading={loading}
          onEdit={handleEdit}
          onToggleActive={toggleServiceActive}
          onAddNew={handleAddNew}
        />
      </main>
    </div>
  );
}
```

---

### 2. Cadastro de Serviço

**Arquivo:** `app/servicos/novo/page.tsx`

```typescript
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ServiceForm } from "../components/service-form";
import { useServices } from "@/app/hooks/use-services";
import type { ServiceFormData } from "@/app/types/service";

export default function NewServicePage() {
  const router = useRouter();
  const { createService, loading } = useServices();

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      await createService(data);
      toast.success("Serviço criado com sucesso!");
      router.push('/servicos');
    } catch (error) {
      toast.error("Erro ao criar serviço. Tente novamente.");
    }
  };

  const handleCancel = () => {
    router.push('/servicos');
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Novo Serviço"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Serviços", href: "/servicos" },
          { label: "Novo" },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-6 min-h-[calc(100vh-64px)]">
        <div className="max-w-3xl mx-auto">
          <ServiceForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}
```

---

### 3. Edição de Serviço

**Arquivo:** `app/servicos/[id]/page.tsx`

```typescript
"use client";

import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ServiceForm } from "../components/service-form";
import { useServices } from "@/app/hooks/use-services";
import { ServiceSkeleton } from "../components/service-skeleton";
import type { ServiceFormData } from "@/app/types/service";
import { useEffect, useState } from "react";
import { getServiceById } from "@/lib/mocks/services";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const { updateService, loading: saving } = useServices();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const serviceId = parseInt(params.id as string);

  useEffect(() => {
    // Simula busca do serviço
    const found = getServiceById(serviceId);
    if (found) {
      setService(found);
    } else {
      toast.error("Serviço não encontrado");
      router.push('/servicos');
    }
    setLoading(false);
  }, [serviceId, router]);

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      await updateService(serviceId, data);
      toast.success("Serviço atualizado com sucesso!");
      router.push('/servicos');
    } catch (error) {
      toast.error("Erro ao atualizar serviço. Tente novamente.");
    }
  };

  const handleCancel = () => {
    router.push('/servicos');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-uniq-platinum">
        <Sidebar />
        <Header pageTitle="Editar Serviço" />
        <main className="ml-0 lg:ml-64 pt-16 p-6">
          <div className="max-w-3xl mx-auto">
            <ServiceSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Editar Serviço"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Serviços", href: "/servicos" },
          { label: service.name },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-6 min-h-[calc(100vh-64px)]">
        <div className="max-w-3xl mx-auto">
          <ServiceForm
            initialData={service}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={saving}
          />
        </div>
      </main>
    </div>
  );
}
```

---

### 4. Catálogo de Serviços (Preview)

**Arquivo:** `app/servicos/catalogo/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { CatalogCard } from "../components/catalog-card";
import { ServiceDetailModal } from "../components/service-detail-modal";
import { useServices } from "@/app/hooks/use-services";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import type { Service } from "@/app/types/service";

export default function CatalogPage() {
  const { filteredServices, filters, setFilters, categories, loading } = useServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const activeServices = filteredServices.filter((s) => s.active);

  const handleSchedule = (serviceId: number) => {
    // TODO: Implementar agendamento
    console.log('Agendar serviço:', serviceId);
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Catálogo de Serviços"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Serviços", href: "/servicos" },
          { label: "Catálogo" },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-6 min-h-[calc(100vh-64px)]">
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-uniq-accent/10 border border-uniq-accent/20 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-uniq-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-uniq-text">Preview da Loja Virtual</h4>
            <p className="text-sm text-uniq-muted">
              Esta é uma prévia de como seus serviços aparecem para os clientes na loja virtual.
              Apenas serviços ativos são exibidos.
            </p>
          </div>
        </div>

        {/* Filtros por Categoria */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilters({ ...filters, category: null })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !filters.category
                ? 'bg-uniq-primary text-white'
                : 'bg-uniq-white text-uniq-text hover:bg-uniq-platinum'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters({ ...filters, category: cat.name })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.category === cat.name
                  ? 'text-white'
                  : 'bg-uniq-white text-uniq-text hover:bg-uniq-platinum'
              }`}
              style={{
                backgroundColor: filters.category === cat.name ? cat.color : undefined,
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid do Catálogo */}
        {activeServices.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-uniq-muted">
              Nenhum serviço ativo no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeServices.map((service) => (
              <CatalogCard
                key={service.id}
                service={service}
                onViewDetails={setSelectedService}
                onSchedule={handleSchedule}
              />
            ))}
          </div>
        )}

        {/* Modal de Detalhes */}
        <ServiceDetailModal
          service={selectedService}
          open={!!selectedService}
          onClose={() => setSelectedService(null)}
          onSchedule={handleSchedule}
        />
      </main>
    </div>
  );
}
```

---

## Upload de Imagens - Lógica Detalhada

### Implementação do FileReader

```typescript
// Arquivo: app/servicos/components/image-uploader.tsx

/**
 * Lógica de Upload de Imagens
 * 
 * 1. O usuário clica na área de upload ou arrasta arquivos
 * 2. Os arquivos são validados (tipo, tamanho, quantidade)
 * 3. Cada arquivo é convertido para Base64 usando FileReader
 * 4. O preview é exibido imediatamente
 * 5. O estado é atualizado com as novas imagens
 * 
 * NOTA: Como não há backend nesta sprint, as imagens são
 * armazenadas apenas como Base64 no estado local.
 */

// Função principal de conversão
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    // Lê o arquivo como Data URL (Base64)
    reader.readAsDataURL(file);
  });
}

// Validações recomendadas
const VALIDATIONS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxImages: 5,
};

// Exemplo de uso no componente
async function handleFileSelect(files: FileList) {
  const validFiles = Array.from(files).filter(file => {
    // Valida tipo
    if (!VALIDATIONS.allowedTypes.includes(file.type)) {
      toast.error(`${file.name}: Tipo de arquivo não suportado`);
      return false;
    }
    // Valida tamanho
    if (file.size > VALIDATIONS.maxFileSize) {
      toast.error(`${file.name}: Arquivo muito grande (máx 5MB)`);
      return false;
    }
    return true;
  });

  // Converte para base64
  const base64Images = await Promise.all(
    validFiles.map(file => fileToBase64(file))
  );

  // Atualiza estado
  setImages(prev => [...prev, ...base64Images]);
}
```

---

## Estados e Interações

### Diagrama de Estados - Lista de Serviços

```
┌─────────────────────────────────────────────────────────────┐
│                    SERVICE LIST STATES                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INITIAL ─────► LOADING ─────► LOADED                       │
│     │                             │                         │
│     │                             ▼                         │
│     │                        ┌─────────┐                    │
│     │                        │  EMPTY  │                    │
│     │                        │ services│                    │
│     │                        │ = []    │                    │
│     │                        └─────────┘                    │
│     │                             │                         │
│     ▼                             ▼                         │
│  ┌─────────┐                ┌─────────┐                    │
│  │ FILTER  │◄──────────────►│  DATA   │                    │
│  │ CHANGE  │                │ LOADED  │                    │
│  └─────────┘                └─────────┘                    │
│       │                           │                         │
│       ▼                           ▼                         │
│  ┌─────────┐                ┌─────────┐                    │
│  │ FILTERED│                │ TOGGLE  │                    │
│  │ RESULTS │                │ ACTIVE  │                    │
│  └─────────┘                └─────────┘                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Diagrama de Estados - Formulário

```
┌─────────────────────────────────────────────────────────────┐
│                    FORM STATES                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐                                            │
│  │    IDLE     │                                            │
│  │  (pristine) │                                            │
│  └──────┬──────┘                                            │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────┐     Validation      ┌─────────────┐       │
│  │   DIRTY     │────────────────────►│   INVALID   │       │
│  │  (changed)  │◄────────────────────│   (errors)  │       │
│  └──────┬──────┘     Fix errors      └─────────────┘       │
│         │                                                   │
│         │ Valid                                             │
│         ▼                                                   │
│  ┌─────────────┐                                            │
│  │   VALID     │                                            │
│  │  (can save) │                                            │
│  └──────┬──────┘                                            │
│         │                                                   │
│         ▼                                                   │
│  ┌─────────────┐     Success       ┌─────────────┐         │
│  │  SUBMITTING │──────────────────►│   SAVED     │         │
│  │  (loading)  │                   │  (success)  │         │
│  └──────┬──────┘                   └─────────────┘         │
│         │                                                   │
│         │ Error                                             │
│         ▼                                                   │
│  ┌─────────────┐                                            │
│  │    ERROR    │                                            │
│  │  (submit    │                                            │
│  │   failed)   │                                            │
│  └─────────────┘                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Handlers Principais

```typescript
// Lista de Serviços
const handlers = {
  // Busca com debounce
  handleSearch: (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  },

  // Toggle ativo/inativo
  handleToggleActive: (id: number, active: boolean) => {
    toggleServiceActive(id, active);
    toast.success(active ? 'Serviço ativado' : 'Serviço desativado');
  },

  // Navegação para edição
  handleEdit: (id: number) => {
    router.push(`/servicos/${id}`);
  },

  // Filtro por categoria
  handleCategoryChange: (category: string | null) => {
    setFilters(prev => ({ ...prev, category }));
  },
};

// Formulário
const formHandlers = {
  // Submit
  handleSubmit: async (data: ServiceFormData) => {
    try {
      if (isEditing) {
        await updateService(id, data);
        toast.success('Serviço atualizado!');
      } else {
        await createService(data);
        toast.success('Serviço criado!');
      }
      router.push('/servicos');
    } catch {
      toast.error('Erro ao salvar');
    }
  },

  // Upload de imagem
  handleImageUpload: async (files: FileList) => {
    const base64Images = await Promise.all(
      Array.from(files).map(fileToBase64)
    );
    form.setValue('images', [...currentImages, ...base64Images]);
  },

  // Remover imagem
  handleRemoveImage: (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    form.setValue('images', newImages);
  },

  // Adicionar variação
  handleAddVariation: () => {
    const newVariation = {
      id: crypto.randomUUID(),
      name: '',
      price: basePrice,
      duration: 30,
    };
    form.setValue('variations', [...variations, newVariation]);
  },
};
```

---

## Dependências

### Já Instaladas (do projeto)

```bash
# Componentes shadcn/ui
- @radix-ui/react-dialog      # Modais
- @radix-ui/react-select      # Dropdowns
- @radix-ui/react-switch      # Toggles
- @radix-ui/react-checkbox    # Checkboxes
- @radix-ui/react-label       # Labels
- @radix-ui/react-tabs        # Abas
- @radix-ui/react-toast       # Notificações
- lucide-react                # Ícones

# Utilitários
- tailwindcss                 # CSS
- clsx, tailwind-merge        # Classes condicionais
- date-fns                    # Datas
```

### Necessárias (já instaladas no package.json)

```bash
# Validação e Formulários
npm install react-hook-form zod @hookform/resolvers

# Já presentes no package.json:
# - react-hook-form: ^7.71.2
# - zod: ^4.3.6
# - @hookform/resolvers: ^5.2.2
```

---

## Critérios de Aceitação Técnicos

### Funcionalidades da Lista (SERV-01 a SERV-05)

- [ ] **SERV-01:** Grid de serviços em cards responsivo
  - 1 coluna em mobile (< 640px)
  - 2 colunas em tablet (640px - 1024px)
  - 3 colunas em desktop (> 1024px)
  
- [ ] **SERV-02:** Campo de busca com debounce de 300ms
  - Implementado via hook useDebounce
  - Loading indicator durante busca
  
- [ ] **SERV-03:** Filtros funcionando corretamente
  - Filtro por categoria (dropdown)
  - Filtro por status (todos/ativos/inativos)
  - Contador de filtros ativos
  - Botão para limpar filtros
  
- [ ] **SERV-04:** Toggle ativo/inativo
  - Switch component do shadcn/ui
  - Feedback visual imediato (opacidade do card)
  - Toast de confirmação
  
- [ ] **SERV-05:** Empty state implementado
  - Ilustração/ícone centralizado
  - Texto explicativo
  - CTA para cadastrar primeiro serviço

### Funcionalidades do Formulário (SERV-FORM-01 a SERV-FORM-06)

- [ ] **SERV-FORM-01:** Validação de campos obrigatórios
  - Nome: mínimo 3 caracteres
  - Categoria: obrigatória
  - Duração: entre 5 e 480 minutos
  - Integração com React Hook Form + Zod
  
- [ ] **SERV-FORM-02:** Preço e variações
  - Formato de moeda brasileira (R$)
  - Parsing de input currency
  - Adicionar/remover variações dinamicamente
  
- [ ] **SERV-FORM-03:** Duração
  - Input number com step de 5
  - Validação min/max
  - Sufixo "min" no input
  
- [ ] **SERV-FORM-04:** Categoria
  - Select dropdown com categorias mock
  - Badge colorida por categoria
  
- [ ] **SERV-FORM-05:** Upload de imagens
  - Preview imediato com FileReader
  - Limite de 5 imagens
  - Botão de remover por imagem
  - Validação de tipo (jpg, png, webp)
  
- [ ] **SERV-FORM-06:** Disponibilidade
  - Checkboxes para cada dia
  - Time inputs para horários
  - Validação: início < fim
  - Opção de pausa para almoço

### Funcionalidades do Catálogo (CAT-01 a CAT-04)

- [ ] **CAT-01:** Visual de loja
  - Cards mais limpos e focados em conversão
  - Badge de categoria estilizado
  - "A partir de" quando há variações
  
- [ ] **CAT-02:** Modal de detalhes
  - Abre ao clicar "Ver Detalhes"
  - Scroll interno para conteúdo longo
  - Lista de preços/variações
  
- [ ] **CAT-03:** CTA Agendar
  - Botão primário em todos os cards
  - Botão fixo no modal
  
- [ ] **CAT-04:** Preview realista
  - Apenas serviços ativos
  - Filtros por categoria visíveis
  - Banner informativo

### UX e Performance

- [ ] **LOADING:** Estados de loading
  - Skeleton cards na lista
  - Spinner no botão de submit
  - Loading no input de busca
  
- [ ] **ERROR:** Estados de erro
  - Toast de erro em todas as operações
  - Mensagens de validação nos campos
  - Fallback para serviço não encontrado
  
- [ ] **TRANSITIONS:** Animações suaves
  - Card hover: scale(1.02) + shadow
  - Modal: fade + slide
  - Toast: slide from right
  
- [ ] **RESPONSIVE:** Responsividade
  - Testado em 320px, 768px, 1024px, 1440px
  - Sidebar colapsa em mobile
  - Filtros adaptam layout
  
- [ ] **A11Y:** Acessibilidade
  - Focus visível em todos os elementos interativos
  - Labels associados aos inputs
  - ARIA labels onde necessário
  - Navegação por teclado funcional

### Design System

- [ ] **COLORS:** Cores UNIQ aplicadas
  - `uniq-primary` (#3e5653): botões primários
  - `uniq-accent` (#86cb92): preços, destaques
  - `uniq-text` (#1f2937): texto principal
  - `uniq-muted` (#627271): textos secundários
  - `uniq-platinum` (#efefef): backgrounds
  - `uniq-border` (#e5e7eb): bordas
  
- [ ] **TYPOGRAPHY:** Tipografia Poppins
  - Títulos: semibold (600)
  - Preços: bold (700)
  - Corpo: regular (400)
  
- [ ] **SPACING:** Espaçamento consistente
  - Grid base 4px/8px
  - Cards: padding 16px
  - Página: padding 24px
  - Gap grid: 24px
  
- [ ] **COMPONENTS:** Componentes reutilizáveis
  - ServiceCard (admin + catalog views)
  - ServiceForm (create + edit)
  - ImageUploader
  - PriceSection
  - AvailabilitySection

---

## Notas para o Implementador (@vibe-implementer)

### Checklist Antes de Começar

1. ✅ **Verifique as dependências:**
   ```bash
   npm list react-hook-form zod @hookform/resolvers
   ```

2. ✅ **Confirme a estrutura de pastas:**
   - Crie os diretórios se não existirem
   - Mantenha a organização conforme especificado

3. ✅ **Revise os componentes existentes:**
   - Todos os componentes shadcn/ui já estão em `components/ui/`
   - Sidebar e Header já existem e funcionam

### Ordem de Implementação Recomendada

1. **Tipos e Mocks** (`types/service.ts`, `lib/mocks/services.ts`)
2. **Hook** (`hooks/use-services.ts`)
3. **Componentes de UI Base:**
   - ServiceCard
   - ServiceGrid
   - ServiceSkeleton
   - SearchBar
   - Filters
   - EmptyState
4. **Página de Lista** (`app/servicos/page.tsx`)
5. **Upload de Imagens** (`image-uploader.tsx`)
6. **Seção de Preço** (`price-section.tsx`)
7. **Seção de Disponibilidade** (`availability-section.tsx`)
8. **Formulário Completo** (`service-form.tsx`)
9. **Páginas de Cadastro/Edição**
10. **Componentes do Catálogo** (`catalog-card.tsx`, `service-detail-modal.tsx`)
11. **Página do Catálogo**

### Dicas Importantes

- **Sempre use `cn()`** para classes condicionais
- **Mantenha consistência** com o padrão de cores UNIQ
- **Teste em mobile** - muitos usuários usam smartphones
- **Adicione loading states** - melhora muito a UX
- **Use toast para feedback** - sucesso/erro em todas as ações

### Testes Manuais Necessários

```markdown
1. Criar novo serviço com todos os campos
2. Editar serviço existente
3. Toggle ativar/desativar na lista
4. Busca com debounce
5. Filtros combinados
6. Upload de múltiplas imagens
7. Adicionar/remover variações de preço
8. Configurar disponibilidade
9. Visualizar catálogo
10. Abrir modal de detalhes
```

---

**Documento gerado em:** 20/03/2026  
**Planejador:** @vibe-planner  
**Fase:** FASE 02 - Planning (SDD)  
**Próxima Fase:** FASE 03 - Implementation (@vibe-implementer)

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação técnica (SPEC). Contém código detalhado e exemplos implementáveis. O @vibe-implementer deve usar este documento como guia para implementar a Sprint 07.
