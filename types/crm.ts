// 📁 types/crm.ts

// ============================================
// CUSTOMER TYPES
// ============================================

export interface Contact {
  id: string;
  type: 'phone' | 'email' | 'whatsapp';
  value: string;
  primary: boolean;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string | null;
  address?: Address;
  contacts: Contact[];
  tags: Tag[];
  lastPurchase?: string | null;
  totalSpent: number;
  totalOrders: number;
  notes?: string;
  createdAt: string;
  interactions: CustomerInteraction[];
}

export interface CustomerInteraction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'purchase' | 'note' | 'visit';
  date: string;
  description: string;
  user: string;
}

// ============================================
// PIPELINE TYPES
// ============================================

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
  count: number;
  total: number;
}

export interface Opportunity {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string | null;
  title: string;
  value: number;
  probability: number;
  stage: string;
  lastContact?: string | null;
  nextFollowUp?: string | null;
  createdAt: string;
  interactions: OpportunityInteraction[];
  status: 'open' | 'won' | 'lost';
  lostReason?: string;
  actualValue?: number;
}

export interface OpportunityInteraction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'proposal' | 'note';
  date: string;
  description: string;
  user: string;
}

// ============================================
// FILTER TYPES
// ============================================

export interface CustomerFilters {
  search: string;
  lastPurchaseDate: {
    from: Date | null;
    to: Date | null;
  };
  totalSpent: {
    min: number | null;
    max: number | null;
  };
  tags: string[];
  hasPurchase: 'all' | 'yes' | 'no';
}

export interface SortConfig {
  key: keyof Customer | null;
  direction: 'asc' | 'desc';
}

// ============================================
// KANBAN TYPES
// ============================================

export interface KanbanColumnType {
  id: string;
  stage: PipelineStage;
  opportunities: Opportunity[];
}

export interface DragItem {
  id: string;
  type: 'column' | 'opportunity';
}
