'use client';

import { useState, useEffect } from 'react';
import { FAQ } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, X, HelpCircle, Tag } from 'lucide-react';

interface FAQEditorProps {
  faq?: FAQ;
  isOpen: boolean;
  onClose: () => void;
  onSave: (faq: FAQ) => void;
}

export function FAQEditor({ faq, isOpen, onClose, onSave }: FAQEditorProps) {
  const [formData, setFormData] = useState<Partial<FAQ>>({
    question: '',
    answer: '',
    keywords: [],
    isActive: true,
  });
  const [keywordInput, setKeywordInput] = useState('');
  
  useEffect(() => {
    if (faq) {
      setFormData(faq);
    } else {
      setFormData({
        question: '',
        answer: '',
        keywords: [],
        isActive: true,
      });
    }
  }, [faq, isOpen]);
  
  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setFormData(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), keywordInput.trim().toLowerCase()]
      }));
      setKeywordInput('');
    }
  };
  
  const handleRemoveKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords?.filter((_, i) => i !== index)
    }));
  };
  
  const handleSave = () => {
    if (!formData.question || !formData.answer) return;
    
    onSave({
      id: faq?.id || `faq-${Date.now()}`,
      question: formData.question || '',
      answer: formData.answer || '',
      keywords: formData.keywords || [],
      isActive: formData.isActive ?? true,
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#86cb92]" />
            {faq ? 'Editar FAQ' : 'Novo FAQ'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label className="text-[13px] font-medium text-[#1f2937] mb-1.5 block">
              Pergunta
            </label>
            <Input
              value={formData.question}
              onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
              placeholder="Ex: Qual o horário de funcionamento?"
            />
          </div>
          
          <div>
            <label className="text-[13px] font-medium text-[#1f2937] mb-1.5 block">
              Resposta
            </label>
            <Textarea
              value={formData.answer}
              onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
              placeholder="Digite a resposta..."
              rows={4}
              className="resize-none"
            />
          </div>
          
          <div>
            <label className="text-[13px] font-medium text-[#1f2937] mb-1.5 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Palavras-chave
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                placeholder="Adicionar palavra-chave..."
              />
              <Button onClick={handleAddKeyword} size="sm" className="bg-[#86cb92] hover:bg-[#5fb86e]">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.keywords && formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[12px]"
                  >
                    {keyword}
                    <button onClick={() => handleRemoveKeyword(idx)} className="hover:text-red-600">
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
            disabled={!formData.question || !formData.answer}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
