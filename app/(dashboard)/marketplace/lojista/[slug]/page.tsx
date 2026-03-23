// app/(dashboard)/marketplace/lojista/[slug]/page.tsx - Seller profile page
import { LojistaPageClient } from "./lojista-client";

export const dynamic = 'force-dynamic';

export default function SellerProfilePage() {
  return <LojistaPageClient />;
}
