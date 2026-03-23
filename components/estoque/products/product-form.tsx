'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product, Category } from '@/lib/estoque/types';

export interface ProductFormData {
  name: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  description?: string;
  stock: number;
  minStock: number;
  maxStock?: number;
  unit: 'un' | 'kg' | 'L' | 'm' | 'caixa' | 'par';
  location?: string;
  cost: number;
  price: number;
  promotionalPrice?: number;
  status: 'active' | 'inactive';
  notes?: string;
}

interface ProductFormProps {
  initialData?: Product | null;
  categories: Category[];
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const unitOptions = [
  { value: 'un', label: 'Unidade (un)' },
  { value: 'kg', label: 'Quilograma (kg)' },
  { value: 'L', label: 'Litro (L)' },
  { value: 'm', label: 'Metro (m)' },
  { value: 'caixa', label: 'Caixa' },
  { value: 'par', label: 'Par' },
];

const statusOptions = [
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
];

export function ProductForm({
  initialData,
  categories,
  onSubmit,
  onCancel,
  isLoading = false,
}: ProductFormProps) {
  const defaultValues: ProductFormData = initialData
    ? {
        name: initialData.name,
        sku: initialData.sku,
        barcode: initialData.barcode || '',
        categoryId: initialData.categoryId,
        description: initialData.description || '',
        stock: initialData.stock,
        minStock: initialData.minStock,
        maxStock: initialData.maxStock,
        unit: initialData.unit,
        location: initialData.location || '',
        cost: initialData.cost,
        price: initialData.price,
        promotionalPrice: initialData.promotionalPrice,
        status: initialData.status,
        notes: initialData.notes || '',
      }
    : {
        name: '',
        sku: '',
        barcode: '',
        categoryId: '',
        description: '',
        stock: 0,
        minStock: 0,
        maxStock: undefined,
        unit: 'un',
        location: '',
        cost: 0,
        price: 0,
        promotionalPrice: undefined,
        status: 'active',
        notes: '',
      };

  const form = useForm<ProductFormData>({
    defaultValues,
    mode: 'onChange',
  });

  const { handleSubmit, formState: { errors } } = form;

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Dados Básicos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dados Básicos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Nome do Produto */}
            <FormField
              control={form.control}
              name="name"
              rules={{ required: 'Nome é obrigatório' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome do produto" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* SKU */}
            <FormField
              control={form.control}
              name="sku"
              rules={{ required: 'SKU é obrigatório' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="SKU-0001" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Código de Barras */}
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Barras</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="7891234567890" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categoria */}
            <FormField
              control={form.control}
              name="categoryId"
              rules={{ required: 'Categoria é obrigatória' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria *</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Descrição do produto..."
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Estoque */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estoque</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Estoque Atual */}
              <FormField
                control={form.control}
                name="stock"
                rules={{ required: 'Estoque atual é obrigatório' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque Atual *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Estoque Mínimo */}
              <FormField
                control={form.control}
                name="minStock"
                rules={{ required: 'Estoque mínimo é obrigatório' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque Mínimo *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Estoque Máximo */}
              <FormField
                control={form.control}
                name="maxStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque Máximo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Unidade */}
              <FormField
                control={form.control}
                name="unit"
                rules={{ required: 'Unidade é obrigatória' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidade *</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a unidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unitOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Localização */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="A-01-01" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preços */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preços</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Preço de Custo */}
              <FormField
                control={form.control}
                name="cost"
                rules={{ required: 'Preço de custo é obrigatório' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço de Custo *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={0.01}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preço de Venda */}
              <FormField
                control={form.control}
                name="price"
                rules={{ required: 'Preço de venda é obrigatório' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço de Venda *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={0.01}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preço Promocional */}
              <FormField
                control={form.control}
                name="promotionalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Promocional</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step={0.01}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Configurações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Observações */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Observações internas..."
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar Produto'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
