'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Settings, Plus, Eye } from 'lucide-react';
import { StatsCards } from '@/components/chat/StatsCards';
import { AutoMessageEditor } from '@/components/chat/AutoMessageEditor';
import { FAQEditor } from '@/components/chat/FAQEditor';
import { KeywordManager } from '@/components/chat/KeywordManager';
import { BehaviorSettings } from '@/components/chat/BehaviorSettings';
import { useChatStore } from '@/hooks/useChatStore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AutoMessage, FAQ } from '@/types/chat';
import { Edit, Trash2, MessageSquare, HelpCircle } from 'lucide-react';

export default function ConfiguracoesPage() {
  const { autoMessages, faqs, addAutoMessage, updateAutoMessage, deleteAutoMessage, addFAQ, updateFAQ, deleteFAQ } = useChatStore();
  const [autoEditorOpen, setAutoEditorOpen] = useState(false);
  const [faqEditorOpen, setFaqEditorOpen] = useState(false);
  const [editingAuto, setEditingAuto] = useState<AutoMessage | undefined>();
  const [editingFaq, setEditingFaq] = useState<FAQ | undefined>();
  
  const stats = {
    autoMessagesCount: autoMessages.length,
    faqCount: faqs.length,
    keywordsCount: 48,
    resolutionRate: 78,
    resolutionRateChange: 5,
    conversationsToday: 12,
    onlineNow: 8
  };
  
  const handleSaveAuto = (msg: AutoMessage) => {
    if (editingAuto) {
      updateAutoMessage(msg.id, msg);
    } else {
      addAutoMessage(msg);
    }
    setAutoEditorOpen(false);
    setEditingAuto(undefined);
  };
  
  const handleSaveFaq = (faq: FAQ) => {
    if (editingFaq) {
      updateFAQ(faq.id, faq);
    } else {
      addFAQ(faq);
    }
    setFaqEditorOpen(false);
    setEditingFaq(undefined);
  };
  
  const handleEditAuto = (msg: AutoMessage) => {
    setEditingAuto(msg);
    setAutoEditorOpen(true);
  };
  
  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq(faq);
    setFaqEditorOpen(true);
  };
  
  const handleNewAuto = () => {
    setEditingAuto(undefined);
    setAutoEditorOpen(true);
  };
  
  const handleNewFaq = () => {
    setEditingFaq(undefined);
    setFaqEditorOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/chat"
                className="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#627271]" />
              </Link>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#86cb92] to-[#5fb86e] 
                              flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-[20px] font-semibold text-[#1f2937]">Configurações do Chatbot</h1>
                <p className="text-[14px] text-[#627271]">Personalize o comportamento e respostas da MEL</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button className="bg-[#86cb92] hover:bg-[#5fb86e] gap-2">
                <Zap className="w-4 h-4" />
                Sincronizar
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-6">
        {/* Stats */}
        <StatsCards stats={stats} />
        
        {/* Tabs */}
        <Tabs defaultValue="auto" className="mt-6">
          <TabsList className="bg-white p-1 rounded-xl border border-[#e5e7eb] w-fit">
            <TabsTrigger value="auto" className="gap-2 data-[state=active]:bg-[#86cb92] data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4" />
              Mensagens Auto
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2 data-[state=active]:bg-[#86cb92] data-[state=active]:text-white">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="keywords" className="gap-2 data-[state=active]:bg-[#86cb92] data-[state=active]:text-white">
              Palavras-chave
            </TabsTrigger>
            <TabsTrigger value="behavior" className="gap-2 data-[state=active]:bg-[#86cb92] data-[state=active]:text-white">
              <Settings className="w-4 h-4" />
              Comportamento
            </TabsTrigger>
          </TabsList>
          
          {/* Auto Messages Tab */}
          <TabsContent value="auto" className="mt-6">
            <Card className="border-[#e5e7eb]">
              <CardHeader className="border-b border-[#e5e7eb] flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#86cb92]" />
                    Mensagens Automáticas
                  </CardTitle>
                  <p className="text-[13px] text-[#627271] mt-1">
                    Respostas enviadas automaticamente em situações específicas
                  </p>
                </div>
                <Button className="bg-[#86cb92] hover:bg-[#5fb86e]" onClick={handleNewAuto}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Mensagem
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-[#e5e7eb]">
                  {autoMessages.map(message => (
                    <div
                      key={message.id}
                      className="px-6 py-4 hover:bg-[#f9fafb] transition-colors group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#86cb92]/10 rounded-xl flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-[#86cb92]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-[14px] font-semibold text-[#1f2937]">{message.name}</h3>
                            {message.isActive && (
                              <Badge className="bg-green-100 text-green-700">Ativo</Badge>
                            )}
                          </div>
                          <p className="text-[12px] text-[#627271] truncate max-w-md">
                            &quot;{message.content}&quot;
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] text-[#627271]">
                          {message.trigger.type === 'greeting' && '👋 Saudação'}
                          {message.trigger.type === 'keyword' && '🔑 Palavra-chave'}
                          {message.trigger.type === 'outside_hours' && '🌙 Fora do horário'}
                          {message.trigger.type === 'manual' && '📝 Manual'}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" onClick={() => handleEditAuto(message)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteAutoMessage(message.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {autoMessages.length === 0 && (
                    <div className="px-6 py-12 text-center">
                      <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-[14px] text-[#627271]">Nenhuma mensagem automática cadastrada</p>
                      <Button className="mt-4 bg-[#86cb92] hover:bg-[#5fb86e]" onClick={handleNewAuto}>
                        <Plus className="w-4 h-4 mr-2" />
                        Criar primeira mensagem
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-6">
            <Card className="border-[#e5e7eb]">
              <CardHeader className="border-b border-[#e5e7eb] flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#86cb92]" />
                    Perguntas Frequentes
                  </CardTitle>
                  <p className="text-[13px] text-[#627271] mt-1">
                    Configure as perguntas e respostas mais frequentes
                  </p>
                </div>
                <Button className="bg-[#86cb92] hover:bg-[#5fb86e]" onClick={handleNewFaq}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova FAQ
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-[#e5e7eb]">
                  {faqs.map(faq => (
                    <div
                      key={faq.id}
                      className="px-6 py-4 hover:bg-[#f9fafb] transition-colors group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-[14px] font-semibold text-[#1f2937] mb-1">{faq.question}</h3>
                          <p className="text-[12px] text-[#627271] mb-2">{faq.answer}</p>
                          <div className="flex flex-wrap gap-1">
                            {faq.keywords.map((keyword, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-[11px]">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                          <Button variant="ghost" size="sm" onClick={() => handleEditFaq(faq)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteFAQ(faq.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {faqs.length === 0 && (
                    <div className="px-6 py-12 text-center">
                      <HelpCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-[14px] text-[#627271]">Nenhuma FAQ cadastrada</p>
                      <Button className="mt-4 bg-[#86cb92] hover:bg-[#5fb86e]" onClick={handleNewFaq}>
                        <Plus className="w-4 h-4 mr-2" />
                        Criar primeira FAQ
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Keywords Tab */}
          <TabsContent value="keywords" className="mt-6">
            <KeywordManager />
          </TabsContent>
          
          {/* Behavior Tab */}
          <TabsContent value="behavior" className="mt-6">
            <BehaviorSettings />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Editors */}
      <AutoMessageEditor
        message={editingAuto}
        isOpen={autoEditorOpen}
        onClose={() => {
          setAutoEditorOpen(false);
          setEditingAuto(undefined);
        }}
        onSave={handleSaveAuto}
      />
      
      <FAQEditor
        faq={editingFaq}
        isOpen={faqEditorOpen}
        onClose={() => {
          setFaqEditorOpen(false);
          setEditingFaq(undefined);
        }}
        onSave={handleSaveFaq}
      />
    </div>
  );
}
