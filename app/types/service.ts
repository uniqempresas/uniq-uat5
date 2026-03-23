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
