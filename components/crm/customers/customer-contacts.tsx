'use client';

import React from 'react';
import { Control, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { X } from 'lucide-react';

interface ContactInputProps {
  index: number;
  control: Control<any>;
  onRemove: () => void;
}

export function ContactInput({ index, control, onRemove }: ContactInputProps) {
  return (
    <div className="flex items-start gap-2 p-3 border rounded-lg bg-muted/30">
      <div className="grid grid-cols-3 gap-2 flex-1">
        <FormField
          control={control}
          name={`contacts.${index}.type`}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`contacts.${index}.value`}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Input placeholder="Valor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={onRemove}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
