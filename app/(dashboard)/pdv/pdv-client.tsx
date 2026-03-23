'use client';

import { useState, useEffect } from 'react';

export default function PDVPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PDV - Ponto de Venda</h1>
      <p className="text-gray-600">Página em desenvolvimento</p>
    </div>
  );
}
