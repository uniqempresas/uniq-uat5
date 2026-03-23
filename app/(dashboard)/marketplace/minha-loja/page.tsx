// app/(dashboard)/marketplace/minha-loja/page.tsx - My store dashboard
import dynamic from 'next/dynamic';

const MinhaLojaClient = dynamic(
  () => import('@/app/(dashboard)/marketplace/minha-loja/minha-loja-client').then((mod) => mod.MinhaLojaClient),
  { ssr: false }
);

export default function MinhaLojaPage() {
  return <MinhaLojaClient />;
}
