'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomerData } from '@/types/checkout';

interface CheckoutFormProps {
  data: CustomerData;
  onChange: (data: CustomerData) => void;
  errors?: Partial<Record<keyof CustomerData, string>>;
}

export function CheckoutForm({ data, onChange, errors }: CheckoutFormProps) {
  const handleChange = (field: keyof CustomerData, value: string) => {
    onChange({ ...data, [field]: value });
  };
  
  // Máscara de telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo *</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Digite seu nome completo"
          className={errors?.name ? 'border-red-500' : ''}
        />
        {errors?.name && (
          <p className="text-sm text-red-500">{errors.name}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="seu@email.com"
          className={errors?.email ? 'border-red-500' : ''}
        />
        {errors?.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone/Celular *</Label>
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
          placeholder="(11) 99999-9999"
          className={errors?.phone ? 'border-red-500' : ''}
        />
        {errors?.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>
    </div>
  );
}
