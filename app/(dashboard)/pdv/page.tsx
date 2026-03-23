// app/(dashboard)/pdv/page.tsx
import dynamic from 'next/dynamic';

const PDVPage = dynamic(
  () => import('./pdv-client').then((mod) => mod.PDVPage),
  { ssr: false }
);

export default function PDVPageWrapper() {
  return <PDVPage />;
}
