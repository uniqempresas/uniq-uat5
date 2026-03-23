"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCompany, brazilianStates } from "@/lib/mocks/company";
import { Building2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CompanyForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(mockCompany);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Dados salvos!",
      description: "As informações da empresa foram atualizadas.",
    });

    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.replace("address.", "");
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4">
        <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
          <Building2 className="w-5 h-5 text-uniq-accent" />
          Dados da Empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-uniq-muted uppercase tracking-wider">
              Dados Básicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Empresa *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Ex: Tech Solutions Ltda"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => handleChange("cnpj", e.target.value)}
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="contato@empresa.com.br"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="space-y-4 pt-4 border-t border-uniq-border">
            <h3 className="text-sm font-medium text-uniq-muted uppercase tracking-wider">
              Endereço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={formData.address.cep}
                  onChange={(e) => handleChange("address.cep", e.target.value)}
                  placeholder="00000-000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => handleChange("address.street", e.target.value)}
                  placeholder="Rua, Avenida, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  value={formData.address.number}
                  onChange={(e) => handleChange("address.number", e.target.value)}
                  placeholder="123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={formData.address.complement}
                  onChange={(e) => handleChange("address.complement", e.target.value)}
                  placeholder="Sala, Andar, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  value={formData.address.neighborhood}
                  onChange={(e) => handleChange("address.neighborhood", e.target.value)}
                  placeholder="Bairro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleChange("address.city", e.target.value)}
                  placeholder="Cidade"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select
                  value={formData.address.state}
                  onValueChange={(value) => handleChange("address.state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label} ({state.value})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-uniq-border flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-uniq-primary hover:bg-uniq-hover text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
