'use client';

import { useState, useEffect } from 'react';
import { AutoMessage } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, X, MessageSquare } from 'lucide-react';

interface AutoMessageEditorProps {
  message?: AutoMessage;
  isOpen: boolean;
  onClose: () => void;
  onSave: (message: AutoMessage) => void;
}

const triggerTypes = [
  { value: 'greeting', label: 'Saudação' },
  { value: 'keyword', label: 'Palavra-chave' },
  { value: 'outside_hours', label: 'Fora do horário' },
  { value: 'manual', label: 'Manual' },
];

export function AutoMessageEditor({ message, isOpen, onClose, onSave }: AutoMessageEditorProps) {
  const [formData, setFormData] = useState<Partial<AutoMessage>>({
    name: '',
    content: '',
    trigger: { type: 'greeting', conditions: [] },
    quickReplies: [],
    isActive: true,
  });
  const [quickReplyInput, setQuickReplyInput] = useState('');
  
  useEffect(() => {
    if (message) {
      setFormData(message);
    } else {
      setFormData({
        name: '',
        content: '',
        trigger: { type: 'greeting', conditions: [] },
        quickReplies: [],
        isActive: true,
      });
    }
  }, [message, isOpen]);
  
  const handleAddQuickReply = () => {
    if (quickReplyInput.trim()) {
      setFormData(prev => ({
        ...prev,
        quickReplies: [...(prev.quickReplies || []), quickReplyInput.trim()]
      }));
      setQuickReplyInput('');
    }
  };
  
  const handleRemoveQuickReply = (index: number) => {
    setFormData(prev => ({
      ...prev,
      quickReplies: prev.quickReplies?.filter((_, i) => i !== index)
    }));
  };
  
  const handleSave = () => {
    if (!formData.name || !formData.content) return;
    
    onSave({
      id: message?.id || `auto-${Date.now()}`,
      name: formData.name || '',
      content: formData.content || '',
      trigger: formData.trigger || { type: 'greeting', conditions: [] },
      quickReplies: formData.quickReplies,
      isActive: formData.isActive ?? true,
      createdAt: message?.createdAt || new Date().toISOString(),
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#86cb92]" />
            {message ? 'Editar Mensagem' : 'Nova Mensagem Automática'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label className="text-[13px] font-medium text-[#1f2937] mb-1.5 block">
              Nome da Mensagem
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Saudação Inicial"
            />
          </div>
          
          <div>
            <label className="text-[13px] font-medium text-[#1f2937] mb-1.5 block">
              Tipo de Gatilho
            </label>
            <Select
              value={formData.trigger?.type}
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                trigger: { ...prev.trigger!, type: value as AutoMessage['trigger']['type'] }
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {triggerTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-[13px] font-medium text-[#1f2937] mb-1.5 block">
              Mensagem
            </label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Digite a mensagem que será enviada..."
              rows={4}
              className="resize-none"
            />
          </div>
          
          <div>
            <label className="text-[13px] font-medium text-[#1f2937] mb-1.5 block">
              Respostas Rápidas (opcional)
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={quickReplyInput}
                onChange={(e) => setQuickReplyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddQuickReply())}
                placeholder="Adicionar resposta rápida..."
              />
              <Button onClick={handleAddQuickReply} size="sm" className="bg-[#86cb92] hover:bg-[#5fb86e]">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.quickReplies && formData.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.quickReplies.map((reply, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[12px]"
                  >
                    {reply}
                    <button onClick={() => handleRemoveQuickReply(idx)} className="hover:text-[#dc2626]">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-[#86cb92] hover:bg-[#5fb86e]"
            disabled={!formData.name || !formData.content}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
