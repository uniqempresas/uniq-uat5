'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Clock, Zap, Bell } from 'lucide-react';

export function BehaviorSettings() {
  return (
    <Card className="border-[#e5e7eb]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#86cb92]" />
          Comportamento
        </CardTitle>
        <CardDescription>
          Configure como a MEL interage com os clientes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Horário de funcionamento */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#1f2937]">
            <Clock className="w-4 h-4 text-[#86cb92]" />
            Horário de Funcionamento
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[12px] text-[#627271]">Abertura</Label>
              <Input type="time" defaultValue="09:00" />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] text-[#627271]">Fechamento</Label>
              <Input type="time" defaultValue="18:00" />
            </div>
          </div>
        </div>
        
        {/* Tempo de resposta */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#1f2937]">
            <Zap className="w-4 h-4 text-[#86cb92]" />
            Tempo de Resposta
          </div>
          
          <div className="space-y-2">
            <Label className="text-[12px] text-[#627271]">Simular digitação por</Label>
            <Select defaultValue="2000">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1000">1 segundo</SelectItem>
                <SelectItem value="2000">2 segundos</SelectItem>
                <SelectItem value="3000">3 segundos</SelectItem>
                <SelectItem value="5000">5 segundos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Notificações */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#1f2937]">
            <Bell className="w-4 h-4 text-[#86cb92]" />
            Notificações
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-[#1f2937]">Notificar novas mensagens</p>
                <p className="text-[12px] text-[#627271]">Receba alertas quando houver novas mensagens</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-[#1f2937]">Som de notificação</p>
                <p className="text-[12px] text-[#627271]">Reproduzir som ao receber mensagens</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-[#1f2937]">Encerramento automático</p>
                <p className="text-[12px] text-[#627271]">Encerrar conversas após 24h de inatividade</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
