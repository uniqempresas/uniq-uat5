"use client";

import { useState } from "react";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { PriceSection } from "./price-section";
import { AvailabilitySection } from "./availability-section";
import { serviceSchema } from "@/app/schemas/service";
import { mockServiceCategories } from "@/lib/mocks/services";
import type { ServiceFormProps, ServiceFormData } from "@/app/types/service";

const defaultAvailability = {
  monday: { active: true, start: "09:00", end: "18:00" },
  tuesday: { active: true, start: "09:00", end: "18:00" },
  wednesday: { active: true, start: "09:00", end: "18:00" },
  thursday: { active: true, start: "09:00", end: "18:00" },
  friday: { active: true, start: "09:00", end: "19:00" },
  saturday: { active: false, start: "", end: "" },
  sunday: { active: false, start: "", end: "" },
  lunchBreak: { start: "12:00", end: "13:00", enabled: true },
};

const defaultValues: ServiceFormData = {
  name: '',
  description: '',
  price: 0,
  duration: 30,
  category: '',
  active: true,
  images: [],
  variations: [],
  availability: defaultAvailability,
};

export function ServiceForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading = false 
}: ServiceFormProps) {
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema) as any,
    defaultValues: initialData || defaultValues,
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue } = form;

  const handleFormSubmit: SubmitHandler<ServiceFormData> = (data) => {
    onSubmit(data);
  };

  const price = watch('price');
  const variations = watch('variations');
  const availability = watch('availability');
  const images = watch('images');

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
            <TabsTrigger value="price">Preço</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          </TabsList>

          {/* Aba: Dados Básicos */}
          <TabsContent value="basic" className="space-y-6">
            <div className="bg-uniq-white rounded-xl border border-uniq-border p-6 space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome do Serviço *
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Ex: Corte de Cabelo Masculino"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Descreva o serviço..."
                  rows={4}
                />
              </div>

              {/* Categoria e Duração */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Categoria *
                  </Label>
                  <Select
                    value={watch('category')}
                    onValueChange={(value) => setValue('category', value)}
                  >
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockServiceCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">
                    Duração (min) *
                  </Label>
                  <div className="relative">
                    <Input
                      id="duration"
                      type="number"
                      {...register('duration', { valueAsNumber: true })}
                      min={5}
                      max={480}
                      step={5}
                      className={errors.duration ? "border-red-500 pr-12" : "pr-12"}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-uniq-muted text-sm">
                      min
                    </span>
                  </div>
                  {errors.duration && (
                    <p className="text-sm text-red-500">{errors.duration.message}</p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 p-4 border border-uniq-border rounded-lg">
                <Switch
                  checked={watch('active')}
                  onCheckedChange={(checked) => setValue('active', checked)}
                />
                <div>
                  <Label className="cursor-pointer">
                    Serviço Ativo
                  </Label>
                  <p className="text-sm text-uniq-muted">
                    Serviços inativos não aparecem no catálogo
                  </p>
                </div>
              </div>

              {/* Upload de Imagens */}
              <ImageUploader
                images={images}
                onChange={(newImages) => setValue('images', newImages)}
                maxImages={5}
              />
            </div>
          </TabsContent>

          {/* Aba: Preço */}
          <TabsContent value="price">
            <div className="bg-uniq-white rounded-xl border border-uniq-border p-6">
              <PriceSection
                basePrice={price}
                variations={variations}
                onBasePriceChange={(newPrice) => setValue('price', newPrice)}
                onVariationsChange={(newVariations) => setValue('variations', newVariations)}
              />
            </div>
          </TabsContent>

          {/* Aba: Disponibilidade */}
          <TabsContent value="availability">
            <div className="bg-uniq-white rounded-xl border border-uniq-border p-6">
              <AvailabilitySection
                schedule={availability}
                onChange={(newSchedule) => setValue('availability', newSchedule)}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Ações */}
        <div className="flex items-center justify-between pt-4 border-t border-uniq-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="gap-2 bg-uniq-primary hover:bg-uniq-hover"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar Serviço
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
