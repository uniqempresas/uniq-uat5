'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Eye, 
  ShoppingCart, 
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ExternalLink,
  Settings,
  Palette,
  ImageIcon,
  Globe,
  CheckCircle2,
  Smartphone,
  Monitor
} from 'lucide-react';
import Link from 'next/link';
import { mockProducts, mockStoreConfig } from '@/lib/mocks/storefront';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

export default function LojaDashboardPage() {
  const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop');
  
  // Métricas mockadas
  const metrics = {
    activeProducts: mockProducts.filter(p => p.stock > 0).length,
    totalVisits: 1234,
    totalOrders: 45,
    conversionRate: 3.2
  };

  // Status da loja
  const storeStatus = {
    isActive: true,
    domain: 'otica-visao.uniq.store',
    template: 'Modern',
    hasLogo: !!mockStoreConfig.logo
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Loja Virtual"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Loja Virtual' }
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        {/* Header com status e ações */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-uniq-text">{mockStoreConfig.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={storeStatus.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  <span className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${storeStatus.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                    {storeStatus.isActive ? 'Loja Ativa' : 'Loja Inativa'}
                  </span>
                </Badge>
                <span className="text-sm text-uniq-muted">https://{storeStatus.domain}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/loja/configuracoes">
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Configurações
              </Button>
            </Link>
            <a href={`https://${storeStatus.domain}`} target="_blank" rel="noopener noreferrer">
              <Button className="bg-uniq-primary hover:bg-uniq-hover gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver Loja
              </Button>
            </a>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda - Preview e Métricas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview da Loja */}
            <Card className="border-uniq-border shadow-sm overflow-hidden">
              <CardHeader className="border-b border-uniq-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-uniq-text">Visualização ao Vivo</CardTitle>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveView('desktop')}
                      className={`p-2 rounded-lg transition-colors ${activeView === 'desktop' ? 'bg-uniq-platinum' : 'hover:bg-uniq-platinum'}`}
                    >
                      <Monitor className={`w-5 h-5 ${activeView === 'desktop' ? 'text-uniq-primary' : 'text-uniq-muted'}`} />
                    </button>
                    <button
                      onClick={() => setActiveView('mobile')}
                      className={`p-2 rounded-lg transition-colors ${activeView === 'mobile' ? 'bg-uniq-platinum' : 'hover:bg-uniq-platinum'}`}
                    >
                      <Smartphone className={`w-5 h-5 ${activeView === 'mobile' ? 'text-uniq-primary' : 'text-uniq-muted'}`} />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-[#efefef] p-4">
                  {/* Browser Chrome Mockup */}
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-auto transition-all duration-300"
                    style={{ maxWidth: activeView === 'mobile' ? '375px' : '100%' }}
                  >
                    {/* Browser Header */}
                    <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-uniq-muted text-center">
                        {storeStatus.domain}
                      </div>
                    </div>
                    
                    {/* Preview Content */}
                    <div className="h-64 overflow-hidden">
                      <div className="bg-uniq-primary text-white p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="font-bold text-lg">{mockStoreConfig.name}</div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>Início</span>
                            <span>Produtos</span>
                            <span>Sobre</span>
                          </div>
                        </div>
                        <div className="text-center py-4">
                          <h2 className="text-xl font-bold mb-2">Bem-vindo à nossa loja!</h2>
                          <p className="text-sm opacity-90">Encontre os melhores produtos</p>
                          <button className="mt-3 px-4 py-2 bg-uniq-accent text-uniq-text rounded-lg text-sm font-medium">
                            Ver Produtos
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex gap-2 mb-4 overflow-x-auto">
                          <span className="px-3 py-1 bg-uniq-primary text-white rounded-full text-xs">Todos</span>
                          <span className="px-3 py-1 bg-gray-100 text-uniq-text rounded-full text-xs">Óculos</span>
                          <span className="px-3 py-1 bg-gray-100 text-uniq-text rounded-full text-xs">Armações</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {mockProducts.slice(0, 2).map((product) => (
                            <div key={product.id} className="border rounded-lg overflow-hidden">
                              <div className="aspect-square bg-gray-100" />
                              <div className="p-2">
                                <p className="text-xs font-medium truncate">{product.name}</p>
                                <p className="text-sm font-bold text-uniq-primary">{formatCurrency(product.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Produtos Ativos */}
              <Card className="border-uniq-border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-uniq-muted uppercase tracking-wide">Produtos Ativos</p>
                      <p className="text-2xl font-bold text-uniq-text mt-1">{metrics.activeProducts}</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +3 novos
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-uniq-accent/10 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-uniq-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visitas */}
              <Card className="border-uniq-border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-uniq-muted uppercase tracking-wide">Visitas (7d)</p>
                      <p className="text-2xl font-bold text-uniq-text mt-1">{metrics.totalVisits}</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +23%
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-uniq-primary/10 rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-uniq-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pedidos */}
              <Card className="border-uniq-border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-uniq-muted uppercase tracking-wide">Pedidos</p>
                      <p className="text-2xl font-bold text-uniq-text mt-1">{metrics.totalOrders}</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +8%
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Taxa de Conversão */}
              <Card className="border-uniq-border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-uniq-muted uppercase tracking-wide">Conversão</p>
                      <p className="text-2xl font-bold text-uniq-text mt-1">{metrics.conversionRate}%</p>
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        -0.5%
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Coluna Direita - Ações e Status */}
          <div className="space-y-6">
            {/* Acesso Rápido */}
            <Card className="border-uniq-border shadow-sm">
              <CardHeader className="border-b border-uniq-border px-6 py-4">
                <CardTitle className="text-lg font-semibold text-uniq-text">Acesso Rápido</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Link href="/dashboard/loja/configuracoes">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-uniq-border hover:border-uniq-primary hover:bg-uniq-primary/5 transition-all cursor-pointer group">
                      <div className="w-10 h-10 bg-uniq-primary/10 rounded-lg flex items-center justify-center group-hover:bg-uniq-primary/20">
                        <Palette className="w-5 h-5 text-uniq-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-uniq-text">Aparência</p>
                        <p className="text-xs text-uniq-muted">Personalizar tema e cores</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-uniq-muted group-hover:text-uniq-primary" />
                    </div>
                  </Link>

                  <Link href="/estoque">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-uniq-border hover:border-uniq-primary hover:bg-uniq-primary/5 transition-all cursor-pointer group">
                      <div className="w-10 h-10 bg-uniq-accent/10 rounded-lg flex items-center justify-center group-hover:bg-uniq-accent/20">
                        <Package className="w-5 h-5 text-uniq-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-uniq-text">Produtos</p>
                        <p className="text-xs text-uniq-muted">{metrics.activeProducts} ativos no estoque</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-uniq-muted group-hover:text-uniq-primary" />
                    </div>
                  </Link>

                  <a href={`https://${storeStatus.domain}`} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-uniq-border hover:border-uniq-primary hover:bg-uniq-primary/5 transition-all cursor-pointer group">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
                        <Globe className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-uniq-text">Ver Loja Pública</p>
                        <p className="text-xs text-uniq-muted">{storeStatus.domain}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-uniq-muted group-hover:text-uniq-primary" />
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Checklist de Configuração */}
            <Card className="border-uniq-border shadow-sm">
              <CardHeader className="border-b border-uniq-border px-6 py-4">
                <CardTitle className="text-lg font-semibold text-uniq-text">Checklist</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-uniq-text">Nome da loja configurado</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-uniq-text">Template selecionado</span>
                  </div>
                  
                  <div className={`flex items-center gap-3 ${storeStatus.hasLogo ? '' : 'opacity-50'}`}>
                    {storeStatus.hasLogo ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-uniq-text">Logo enviado</span>
                      </>
                    ) : (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-uniq-border" />
                        <span className="text-sm text-uniq-muted">Enviar logo</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-uniq-text">Cores personalizadas</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-uniq-text">Produtos cadastrados</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-uniq-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-uniq-muted">Progresso</span>
                    <span className="text-sm font-medium text-uniq-text">100%</span>
                  </div>
                  <div className="h-2 bg-uniq-border rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-uniq-accent rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações da Loja */}
            <Card className="border-uniq-border shadow-sm">
              <CardHeader className="border-b border-uniq-border px-6 py-4">
                <CardTitle className="text-lg font-semibold text-uniq-text">Informações</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-uniq-muted mb-1">Template</p>
                    <p className="text-sm font-medium text-uniq-text">{storeStatus.template}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-uniq-muted mb-1">Domínio UNIQ</p>
                    <p className="text-sm font-medium text-uniq-text">{storeStatus.domain}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-uniq-muted mb-1">WhatsApp</p>
                    <p className="text-sm font-medium text-uniq-text">{mockStoreConfig.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-uniq-muted mb-1">Criada em</p>
                    <p className="text-sm font-medium text-uniq-text">15/03/2026</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
