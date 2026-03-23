import { mockProducts } from '@/lib/mocks/storefront';
import { ProductPageClient } from './product-client';

// Gerar páginas estáticas para cada produto
export function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage() {
  return <ProductPageClient />;
}
