import { mockServices } from '@/lib/mocks/services';
import { EditServicePageClient } from './edit-client';

// Gerar páginas estáticas para cada serviço
export function generateStaticParams() {
  return mockServices.map((service) => ({
    id: service.id.toString(),
  }));
}

export default function EditServicePage() {
  return <EditServicePageClient />;
}
