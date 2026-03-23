'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Check, Palette, Layout, Image as ImageIcon, Type, Save, Eye } from 'lucide-react';
import { mockStoreConfig, mockThemeTemplates } from '@/lib/mocks/storefront';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export default function StoreConfigPage() {
  const [config, setConfig] = useState(mockStoreConfig);
  const [activeTheme, setActiveTheme] = useState<string>(mockStoreConfig.theme.template);
  const [colors, setColors] = useState({
    primary: mockStoreConfig.theme.primaryColor,
    secondary: mockStoreConfig.theme.secondaryColor,
    accent: mockStoreConfig.theme.accentColor,
    background: mockStoreConfig.theme.backgroundColor,
    text: mockStoreConfig.theme.textColor,
  });

  const handleSave = () => {
    // Simula salvamento
    toast({
      title: 'Configurações salvas!',
      description: 'As alterações foram aplicadas à sua loja.',
    });
  };

  const handleColorChange = (colorKey: keyof typeof colors, value: string) => {
    setColors(prev => ({ ...prev, [colorKey]: value }));
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Configurações da Loja"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Loja Virtual', href: '/loja' },
          { label: 'Configurações' },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-uniq-text">Configurações da Loja</h1>
              <p className="text-uniq-muted mt-1">
                Personalize a aparência e o comportamento da sua loja virtual
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href="/" target="_blank">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Loja
                </a>
              </Button>
              <Button onClick={handleSave} className="bg-uniq-primary hover:bg-uniq-hover">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>

          <Tabs defaultValue="template" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-fit">
              <TabsTrigger value="template">
                <Layout className="w-4 h-4 mr-2" />
                Template
              </TabsTrigger>
              <TabsTrigger value="colors">
                <Palette className="w-4 h-4 mr-2" />
                Cores
              </TabsTrigger>
              <TabsTrigger value="branding">
                <ImageIcon className="w-4 h-4 mr-2" />
                Identidade
              </TabsTrigger>
              <TabsTrigger value="seo">
                <Type className="w-4 h-4 mr-2" />
                SEO
              </TabsTrigger>
            </TabsList>

            {/* Template Tab */}
            <TabsContent value="template" className="space-y-6">
              <Card className="border-uniq-border">
                <CardHeader>
                  <CardTitle className="text-uniq-text">Escolha um Template</CardTitle>
                  <CardDescription>
                    Selecione o layout que melhor se adapta ao seu negócio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={activeTheme}
                    onValueChange={setActiveTheme}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {mockThemeTemplates.map((template) => (
                      <div key={template.id}>
                        <RadioGroupItem
                          value={template.id}
                          id={template.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={template.id}
                          className={cn(
                            'flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all',
                            'hover:border-uniq-primary/50 peer-data-[state=checked]:border-uniq-primary peer-data-[state=checked]:bg-uniq-primary/5'
                          )}
                        >
                          <div className="aspect-video bg-uniq-platinum rounded-md mb-4 flex items-center justify-center">
                            <Layout className="w-12 h-12 text-uniq-muted" />
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-uniq-text">{template.name}</h3>
                            {activeTheme === template.id && (
                              <Check className="w-5 h-5 text-uniq-primary" />
                            )}
                          </div>
                          
                          <p className="text-sm text-uniq-muted mb-3">
                            {template.description}
                          </p>
                          
                          <ul className="text-sm space-y-1 text-uniq-text">
                            {template.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-uniq-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-6">
              <Card className="border-uniq-border">
                <CardHeader>
                  <CardTitle className="text-uniq-text">Cores do Tema</CardTitle>
                  <CardDescription>
                    Personalize as cores da sua loja para combinar com sua marca
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'primary', label: 'Cor Primária', description: 'Botões e elementos principais' },
                      { key: 'secondary', label: 'Cor Secundária', description: 'Títulos e destaques' },
                      { key: 'accent', label: 'Cor de Destaque', description: 'Promoções e badges' },
                      { key: 'background', label: 'Cor de Fundo', description: 'Background da página' },
                      { key: 'text', label: 'Cor do Texto', description: 'Texto principal' },
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center gap-4">
                        <div className="relative">
                          <input
                            type="color"
                            value={colors[key as keyof typeof colors]}
                            onChange={(e) => handleColorChange(key as keyof typeof colors, e.target.value)}
                            className="w-16 h-16 rounded-lg cursor-pointer border-2 border-uniq-border"
                          />
                        </div>
                        <div className="flex-1">
                          <Label className="font-medium text-uniq-text">{label}</Label>
                          <p className="text-sm text-uniq-muted">{description}</p>
                          <Input
                            value={colors[key as keyof typeof colors]}
                            onChange={(e) => handleColorChange(key as keyof typeof colors, e.target.value)}
                            className="mt-2 font-mono text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="border-uniq-border">
                <CardHeader>
                  <CardTitle className="text-uniq-text">Preview ao Vivo</CardTitle>
                  <CardDescription>
                    Veja como as cores ficarão na sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="rounded-lg border p-6 space-y-4"
                    style={{ backgroundColor: colors.background }}
                  >
                    <h3 style={{ color: colors.secondary }} className="text-xl font-bold">
                      Nome da Loja
                    </h3>
                    
                    <p style={{ color: colors.text }}>
                      Este é um exemplo de como o texto aparecerá na sua loja.
                    </p>
                    
                    <div className="flex gap-2">
                      <button
                        style={{ backgroundColor: colors.primary }}
                        className="px-4 py-2 rounded-lg text-white"
                      >
                        Botão Primário
                      </button>
                      
                      <span
                        style={{ backgroundColor: colors.accent }}
                        className="px-3 py-1 rounded-full text-sm"
                      >
                        Destaque
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding" className="space-y-6">
              <Card className="border-uniq-border">
                <CardHeader>
                  <CardTitle className="text-uniq-text">Identidade Visual</CardTitle>
                  <CardDescription>
                    Configure nome, logo e informações de contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-uniq-text">Nome da Loja</Label>
                    <Input
                      value={config.name}
                      onChange={(e) => setConfig({ ...config, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-uniq-text">Descrição</Label>
                    <Input
                      value={config.description}
                      onChange={(e) => setConfig({ ...config, description: e.target.value })}
                    />
                  </div>

                  <Separator className="bg-uniq-border" />

                  <div className="space-y-2">
                    <Label className="text-uniq-text">Telefone</Label>
                    <Input
                      value={config.phone}
                      onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-uniq-text">WhatsApp</Label>
                    <Input
                      value={config.whatsapp || ''}
                      onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-uniq-text">E-mail</Label>
                    <Input
                      type="email"
                      value={config.email}
                      onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-6">
              <Card className="border-uniq-border">
                <CardHeader>
                  <CardTitle className="text-uniq-text">SEO & Meta Tags</CardTitle>
                  <CardDescription>
                    Configure títulos e descrições para mecanismos de busca
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-uniq-text">Título da Página (SEO)</Label>
                    <Input
                      value={config.seo.title}
                      onChange={(e) => setConfig({
                        ...config,
                        seo: { ...config.seo, title: e.target.value }
                      })}
                    />
                    <p className="text-sm text-uniq-muted">
                      Recomendado: até 60 caracteres
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-uniq-text">Descrição (SEO)</Label>
                    <textarea
                      value={config.seo.description}
                      onChange={(e) => setConfig({
                        ...config,
                        seo: { ...config.seo, description: e.target.value }
                      })}
                      rows={4}
                      className="w-full px-3 py-2 border border-uniq-border rounded-md bg-white text-uniq-text"
                    />
                    <p className="text-sm text-uniq-muted">
                      Recomendado: até 160 caracteres
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
