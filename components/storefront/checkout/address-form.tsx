'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AddressData } from '@/types/checkout';

interface AddressFormProps {
  data: AddressData;
  onChange: (data: AddressData) => void;
  errors?: Partial<Record<keyof AddressData, string>>;
}

// Mock de busca de CEP (simulação)
const mockFetchAddress = async (cep: string): Promise<Partial<AddressData> | null> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock para CEP específico
  if (cep === '01001-000') {
    return {
      street: 'Praça da Sé',
      neighborhood: 'Sé',
      city: 'São Paulo',
      state: 'SP'
    };
  }
  
  // Mock genérico
  if (cep.length === 9) {
    return {
      street: 'Rua Exemplo',
      neighborhood: 'Bairro Teste',
      city: 'São Paulo',
      state: 'SP'
    };
  }
  
  return null;
};

export function AddressForm({ data, onChange, errors }: AddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };
  
  useEffect(() => {
    const fetchAddress = async () => {
      const cep = data.zipCode.replace(/\D/g, '');
      if (cep.length === 8) {
        setIsLoading(true);
        try {
          const address = await mockFetchAddress(data.zipCode);
          if (address) {
            onChange({
              ...data,
              ...address
            });
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchAddress();
  }, [data.zipCode]);
  
  const handleChange = (field: keyof AddressData, value: string) => {
    if (field === 'zipCode') {
      value = formatCEP(value);
    }
    onChange({ ...data, [field]: value });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="zipCode">CEP *</Label>
        <Input
          id="zipCode"
          value={data.zipCode}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          placeholder="00000-000"
          maxLength={9}
          className={errors?.zipCode ? 'border-red-500' : ''}
          disabled={isLoading}
        />
        {isLoading && (
          <p className="text-sm text-muted-foreground">Buscando endereço...</p>
        )}
        {errors?.zipCode && (
          <p className="text-sm text-red-500">{errors.zipCode}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="street">Rua *</Label>
        <Input
          id="street"
          value={data.street}
          onChange={(e) => handleChange('street', e.target.value)}
          placeholder="Nome da rua"
          className={errors?.street ? 'border-red-500' : ''}
        />
        {errors?.street && (
          <p className="text-sm text-red-500">{errors.street}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number">Número *</Label>
          <Input
            id="number"
            value={data.number}
            onChange={(e) => handleChange('number', e.target.value)}
            placeholder="123"
            className={errors?.number ? 'border-red-500' : ''}
          />
          {errors?.number && (
            <p className="text-sm text-red-500">{errors.number}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>
          <Input
            id="complement"
            value={data.complement || ''}
            onChange={(e) => handleChange('complement', e.target.value)}
            placeholder="Apto 45"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="neighborhood">Bairro *</Label>
        <Input
          id="neighborhood"
          value={data.neighborhood}
          onChange={(e) => handleChange('neighborhood', e.target.value)}
          placeholder="Nome do bairro"
          className={errors?.neighborhood ? 'border-red-500' : ''}
        />
        {errors?.neighborhood && (
          <p className="text-sm text-red-500">{errors.neighborhood}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade *</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Cidade"
            className={errors?.city ? 'border-red-500' : ''}
          />
          {errors?.city && (
            <p className="text-sm text-red-500">{errors.city}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">Estado *</Label>
          <Input
            id="state"
            value={data.state}
            onChange={(e) => handleChange('state', e.target.value.toUpperCase())}
            placeholder="SP"
            maxLength={2}
            className={errors?.state ? 'border-red-500' : ''}
          />
          {errors?.state && (
            <p className="text-sm text-red-500">{errors.state}</p>
          )}
        </div>
      </div>
    </div>
  );
}
