// app/(dashboard)/marketplace/lojista/[slug]/page.tsx - Seller profile page
import { mockSellers } from "@/lib/mocks/marketplace";
import { LojistaPageClient } from "./lojista-client";

// Gerar páginas estáticas para cada lojista
export function generateStaticParams() {
  return mockSellers.map((seller) => ({
    slug: seller.slug,
  }));
}

export default function SellerProfilePage() {
  return <LojistaPageClient />;
}
