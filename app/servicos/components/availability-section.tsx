"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { AvailabilitySectionProps, DayAvailability, AvailabilitySchedule } from "@/app/types/service";

const DAYS = [
  { key: 'monday', label: 'Seg' },
  { key: 'tuesday', label: 'Ter' },
  { key: 'wednesday', label: 'Qua' },
  { key: 'thursday', label: 'Qui' },
  { key: 'friday', label: 'Sex' },
  { key: 'saturday', label: 'Sáb' },
  { key: 'sunday', label: 'Dom' },
] as const;

export function AvailabilitySection({ schedule, onChange }: AvailabilitySectionProps) {
  const handleDayToggle = (day: keyof AvailabilitySchedule, checked: boolean) => {
    onChange({
      ...schedule,
      [day]: {
        ...schedule[day as keyof Omit<AvailabilitySchedule, 'lunchBreak'>],
        active: checked,
      },
    });
  };

  const handleTimeChange = (
    day: keyof AvailabilitySchedule,
    field: 'start' | 'end',
    value: string
  ) => {
    onChange({
      ...schedule,
      [day]: {
        ...schedule[day as keyof Omit<AvailabilitySchedule, 'lunchBreak'>],
        [field]: value,
      },
    });
  };

  const handleLunchToggle = (enabled: boolean) => {
    onChange({
      ...schedule,
      lunchBreak: {
        ...schedule.lunchBreak,
        start: schedule.lunchBreak?.start || '12:00',
        end: schedule.lunchBreak?.end || '13:00',
        enabled,
      },
    });
  };

  const handleLunchTimeChange = (field: 'start' | 'end', value: string) => {
    onChange({
      ...schedule,
      lunchBreak: {
        ...schedule.lunchBreak,
        start: schedule.lunchBreak?.start || '12:00',
        end: schedule.lunchBreak?.end || '13:00',
        enabled: schedule.lunchBreak?.enabled || false,
        [field]: value,
      },
    });
  };

  const allActive = DAYS.every(day => schedule[day.key].active);
  const allSameTime = DAYS.every(day => 
    schedule[day.key].start === schedule.monday.start && 
    schedule[day.key].end === schedule.monday.end
  );

  return (
    <div className="space-y-6">
      {/* Dias da Semana */}
      <div className="space-y-3">
        <Label>Dias de Atendimento</Label>
        <div className="flex flex-wrap gap-3">
          {DAYS.map((day) => (
            <label
              key={day.key}
              className="flex items-center gap-2 px-3 py-2 border border-uniq-border rounded-lg cursor-pointer hover:bg-uniq-platinum/50 transition-colors"
            >
              <Checkbox
                checked={schedule[day.key].active}
                onCheckedChange={(checked) => 
                  handleDayToggle(day.key, checked as boolean)
                }
              />
              <span className="text-sm font-medium">{day.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Horários */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Horários de Atendimento</Label>
          {allActive && allSameTime && (
            <span className="text-xs text-uniq-accent bg-uniq-accent/10 px-2 py-1 rounded">
              Mesmo horário todos os dias
            </span>
          )}
        </div>

        {DAYS.map((day) => {
          const daySchedule = schedule[day.key] as DayAvailability;
          if (!daySchedule.active) return null;

          return (
            <div 
              key={day.key}
              className="grid grid-cols-12 gap-3 items-center p-3 border border-uniq-border rounded-lg"
            >
              <div className="col-span-2">
                <span className="text-sm font-medium">{day.label}</span>
              </div>
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-uniq-muted">Das</span>
                  <Input
                    type="time"
                    value={daySchedule.start}
                    onChange={(e) => handleTimeChange(day.key, 'start', e.target.value)}
                    className="w-28"
                  />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-uniq-muted">às</span>
                  <Input
                    type="time"
                    value={daySchedule.end}
                    onChange={(e) => handleTimeChange(day.key, 'end', e.target.value)}
                    className="w-28"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pausa para Almoço */}
      <div className="space-y-3 p-4 border border-uniq-border rounded-lg bg-uniq-platinum/20">
        <div className="flex items-center justify-between">
          <Label>Pausa para Almoço</Label>
          <Switch
            checked={schedule.lunchBreak?.enabled || false}
            onCheckedChange={handleLunchToggle}
          />
        </div>

        {schedule.lunchBreak?.enabled && (
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-uniq-muted">Das</span>
              <Input
                type="time"
                value={schedule.lunchBreak.start}
                onChange={(e) => handleLunchTimeChange('start', e.target.value)}
                className="w-28"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-uniq-muted">às</span>
              <Input
                type="time"
                value={schedule.lunchBreak.end}
                onChange={(e) => handleLunchTimeChange('end', e.target.value)}
                className="w-28"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
