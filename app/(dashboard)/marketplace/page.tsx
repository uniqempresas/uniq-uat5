// app/(dashboard)/marketplace/page.tsx - Marketplace listing page
import dynamic from 'next/dynamic';

const MarketplaceClient = dynamic(
  () => import('@/app/(dashboard)/marketplace/marketplace-client').then((mod) => mod.MarketplaceClient),
  { ssr: false }
);

export default function MarketplacePage() {
  return <MarketplaceClient />;
}
