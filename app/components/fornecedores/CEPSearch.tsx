// ============================================
// COMPONENT: CEPSearch - Busca de Endereço por CEP
// ============================================

'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { CEPSearchProps } from '@/app/types/suppliers';
import { maskCEP } from '@/app/lib/utils/masks';
import { mockCEPData } from '@/app/lib/mocks/cep';

export function CEPSearch({ 
  value, 
  onChange, 
  onAddressFound, 
  onError 
}: CEPSearchProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!value || value.length < 8) {
      setError('CEP inválido');
      onError('CEP inválido');
      return;
    }

    setLoading(true);
    setError(null);

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    const cleanCEP = value.replace(/\D/g, '');
    const result = mockCEPData[cleanCEP];

    if (result) {
      onAddressFound({
        cep: result.cep,
        street: result.logradouro,
        number: '',
        complement: '',
        neighborhood: result.bairro,
        city: result.cidade,
        state: result.estado,
      });
      setError(null);
    } else {
      setError('CEP não encontrado');
      onError('CEP não encontrado');
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <Input
          value={value}
          onChange={(e) => onChange(maskCEP(e.target.value))}
          onKeyDown={handleKeyDown}
          placeholder="00000-000"
          maxLength={9}
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
      <Button 
        onClick={handleSearch} 
        disabled={loading || !value}
        variant="secondary"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Search className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}