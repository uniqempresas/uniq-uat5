'use client';

import { useState } from 'react';
import { Employee, EmployeeFormData, EmployeeRole, ModuleAccess } from '@/types/employee';
import { FormSection } from './form-section';
import { FormInput } from './form-input';
import { RoleSelector } from './role-selector';
import { ModulesGrid } from './modules-grid';
import { SettingsToggles } from './settings-toggles';
import { FormActions } from './form-actions';
import { formatPhone } from '@/lib/utils/formatters';
import { getDefaultPermissionsForRole } from '@/lib/utils/permissions';
import { User, Shield, Settings } from 'lucide-react';

interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const defaultFormData: EmployeeFormData = {
  name: '',
  email: '',
  phone: '',
  position: '',
  role: 'seller',
  modules: [],
  notifyByEmail: true,
  whatsappAccess: false,
};

export function EmployeeForm({
  initialData,
  onSubmit,
  onCancel,
  loading,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone || '',
        position: initialData.position || '',
        role: initialData.role,
        modules: initialData.modules,
        notifyByEmail: true,
        whatsappAccess: false,
      };
    }
    return defaultFormData;
  });

  const updateField = <K extends keyof EmployeeFormData>(
    field: K,
    value: EmployeeFormData[K]
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // When role changes, update default modules
      if (field === 'role') {
        updated.modules = getDefaultPermissionsForRole(value as EmployeeRole);
      }

      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection title="Dados Pessoais" icon={User}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Nome completo"
            required
            value={formData.name}
            onChange={(v) => updateField('name', v)}
            placeholder="Digite o nome completo"
          />
          <FormInput
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(v) => updateField('email', v)}
            placeholder="email@empresa.com"
            helpText="Convite será enviado para este email"
          />
          <FormInput
            label="Telefone"
            type="tel"
            value={formData.phone}
            onChange={(v) => updateField('phone', formatPhone(v))}
            placeholder="(00) 00000-0000"
          />
          <FormInput
            label="Cargo / Função"
            value={formData.position}
            onChange={(v) => updateField('position', v)}
            placeholder="Ex: Gerente de Vendas"
          />
        </div>
      </FormSection>

      <FormSection title="Permissões" icon={Shield}>
        <RoleSelector
          value={formData.role}
          onChange={(role) => updateField('role', role)}
        />
        <ModulesGrid
          selectedModules={formData.modules}
          onChange={(modules) => updateField('modules', modules)}
          role={formData.role}
        />
      </FormSection>

      <FormSection title="Configurações Adicionais" icon={Settings}>
        <SettingsToggles
          notifyByEmail={formData.notifyByEmail}
          whatsappAccess={formData.whatsappAccess}
          onNotifyChange={(v) => updateField('notifyByEmail', v)}
          onWhatsappChange={(v) => updateField('whatsappAccess', v)}
        />
      </FormSection>

      <FormActions
        onCancel={onCancel}
        loading={loading}
        isEdit={!!initialData}
      />
    </form>
  );
}
