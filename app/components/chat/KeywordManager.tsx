'use client';

import { KeywordMapping } from '@/types/chat';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Tag, ArrowUpDown } from 'lucide-react';

const mockKeywords: KeywordMapping[] = [
  { id: 'kw-1', keyword: 'horário', autoMessageId: 'auto-1', priority: 1 },
  { id: 'kw-2', keyword: 'funcionamento', autoMessageId: 'auto-1', priority: 2 },
  { id: 'kw-3', keyword: 'entrega', autoMessageId: 'auto-3', priority: 1 },
  { id: 'kw-4', keyword: 'pedido', autoMessageId: 'auto-3', priority: 1 },
  { id: 'kw-5', keyword: 'rastrear', autoMessageId: 'auto-3', priority: 2 },
];

export function KeywordManager() {
  return (
    <Card className="border-[#e5e7eb]">
      <CardHeader className="border-b border-[#e5e7eb] flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#86cb92]" />
            Palavras-chave
          </CardTitle>
          <p className="text-[13px] text-[#627271] mt-1">
            Configure palavras-chave para acionar respostas automáticas
          </p>
        </div>
        <Button className="bg-[#86cb92] hover:bg-[#5fb86e]">
          <Plus className="w-4 h-4 mr-2" />
          Nova Palavra-chave
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#e5e7eb]">
          {mockKeywords.map((keyword) => (
            <div
              key={keyword.id}
              className="px-6 py-4 hover:bg-[#f9fafb] transition-colors group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="px-3 py-1 text-[13px] font-medium">
                  {keyword.keyword}
                </Badge>
                <span className="text-[12px] text-[#627271]">
                  → Mensagem #{keyword.autoMessageId.split('-')[1]}
                </span>
                <div className="flex items-center gap-1 text-[12px] text-[#627271]">
                  <ArrowUpDown className="w-3 h-3" />
                  Prioridade: {keyword.priority}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
