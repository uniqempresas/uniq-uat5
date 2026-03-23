'use client';

import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface SettingsTogglesProps {
  notifyByEmail: boolean;
  whatsappAccess: boolean;
  onNotifyChange: (value: boolean) => void;
  onWhatsappChange: (value: boolean) => void;
}

export function SettingsToggles({
  notifyByEmail,
  whatsappAccess,
  onNotifyChange,
  onWhatsappChange,
}: SettingsTogglesProps) {
  return (
    <div className="space-y-0">
      <div className="flex items-center justify-between py-3">
        <div>
          <p className="text-sm font-medium text-[#1f2937]">Notificações por email</p>
          <p className="text-xs text-[#627271] mt-0.5">
            Enviar resumo de atividades por email
          </p>
        </div>
        <Switch
          checked={notifyByEmail}
          onCheckedChange={onNotifyChange}
          className="data-[state=checked]:bg-[#3e5653]"
        />
      </div>

      <Separator className="bg-[#e5e7eb]" />

      <div className="flex items-center justify-between py-3">
        <div>
          <p className="text-sm font-medium text-[#1f2937]">Acesso ao WhatsApp Business</p>
          <p className="text-xs text-[#627271] mt-0.5">
            Permitir uso da integração WhatsApp
          </p>
        </div>
        <Switch
          checked={whatsappAccess}
          onCheckedChange={onWhatsappChange}
          className="data-[state=checked]:bg-[#3e5653]"
        />
      </div>
    </div>
  );
}
