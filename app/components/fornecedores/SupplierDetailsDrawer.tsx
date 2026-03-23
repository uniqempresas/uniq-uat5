// ============================================
// COMPONENT: SupplierDetailsDrawer - Drawer de Detalhes do Fornecedor
// ============================================

'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Pencil, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  User,
  CreditCard,
  FileText,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { SupplierDetailsDrawerProps } from '@/app/types/suppliers';
import { SupplierRating } from './SupplierRating';
import { SupplierStats } from './SupplierStats';
import { formatCurrency } from '@/app/lib/utils/masks';

const statusStyles = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-red-100 text-red-700 border-red-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

const statusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  pending: 'Em Análise',
};

export function SupplierDetailsDrawer({ 
  supplier, 
  open, 
  onClose,
  onEdit 
}: SupplierDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!supplier) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full md:w-[600px] overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <SheetTitle className="text-xl">{supplier.name}</SheetTitle>
                <p className="text-sm text-gray-500">
                  {supplier.documentType === 'cnpj' ? 'CNPJ' : 'CPF'}: {supplier.document}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        {/* Status e Avaliação */}
        <div className="py-4 flex items-center justify-between">
          <Badge className={statusStyles[supplier.status]}>
            {statusLabels[supplier.status]}
          </Badge>
          <div className="flex items-center gap-2">
            <SupplierRating 
              value={supplier.rating} 
              readonly 
              showValue 
              size="md" 
            />
            <span className="text-sm text-gray-500">
              ({supplier.ratingCount} avaliações)
            </span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Visão Geral</TabsTrigger>
            <TabsTrigger value="contacts" className="flex-1">Contatos</TabsTrigger>
            <TabsTrigger value="bank" className="flex-1">Dados Bancários</TabsTrigger>
          </TabsList>

          {/* Tab: Visão Geral */}
          <TabsContent value="overview" className="mt-4 space-y-4">
            {/* Estatísticas */}
            <SupplierStats supplier={supplier} />
            
            <Separator />

            {/* Informações */}
            <div className="space-y-3">
              <h3 className="font-semibold">Informações</h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Categoria</p>
                  <p className="font-medium capitalize">{supplier.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Condição de Pagamento</p>
                  <p className="font-medium">{supplier.paymentTerms || '-'}</p>
                </div>
              </div>

              {supplier.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{supplier.email}</span>
                </div>
              )}
              
              {supplier.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{supplier.phone}</span>
                </div>
              )}

              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span>
                  {supplier.address.street}, {supplier.address.number}
                  {supplier.address.complement && `, ${supplier.address.complement}`}
                  <br />
                  {supplier.address.neighborhood} - {supplier.address.city}/{supplier.address.state}
                  <br />
                  CEP: {supplier.address.cep}
                </span>
              </div>

              {supplier.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">Observações</span>
                  </div>
                  <p className="text-sm text-gray-600">{supplier.notes}</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Tab: Contatos */}
          <TabsContent value="contacts" className="mt-4 space-y-4">
            {supplier.contacts.length > 0 ? (
              <div className="space-y-3">
                {supplier.contacts.map((contact) => (
                  <Card key={contact.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {contact.isPrimary && (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            )}
                            <span className="font-medium">{contact.name}</span>
                          </div>
                          {contact.role && (
                            <p className="text-sm text-gray-500">{contact.role}</p>
                          )}
                          
                          <div className="mt-2 space-y-1">
                            {contact.email && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span>{contact.email}</span>
                              </div>
                            )}
                            {contact.phone && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>{contact.phone}</span>
                              </div>
                            )}
                            {contact.mobile && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>Cel: {contact.mobile}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhum contato cadastrado</p>
              </div>
            )}
          </TabsContent>

          {/* Tab: Dados Bancários */}
          <TabsContent value="bank" className="mt-4 space-y-4">
            {supplier.bankAccounts.length > 0 ? (
              <div className="space-y-3">
                {supplier.bankAccounts.map((account) => (
                  <Card key={account.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {account.isPrimary && (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            )}
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">
                              {account.bankName || `Banco ${account.bank}`}
                            </span>
                          </div>
                          
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <p>Agência: {account.agency}</p>
                            <p>Conta: {account.account}</p>
                            <p className="capitalize">
                              Tipo: {account.accountType === 'checking' ? 'Corrente' : 'Poupança'}
                            </p>
                            {account.pixKey && (
                              <p>
                                PIX: {account.pixType?.toUpperCase()} - {account.pixKey}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhum dado bancário cadastrado</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Ações */}
        <div className="pt-6 mt-4 border-t flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 gap-2"
            onClick={() => onEdit(supplier.id)}
          >
            <Pencil className="w-4 h-4" />
            Editar
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 gap-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            <AlertTriangle className="w-4 h-4" />
            Inativar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { Card, CardContent } from '@/components/ui/card';