// ============================================
// COMPONENT: SupplierForm - Formulário Completo de Fornecedor
// ============================================

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Save, 
  Building2 
} from 'lucide-react';
import { SupplierFormProps, SupplierFormData, Supplier } from '@/app/types/suppliers';
import { SupplierRating } from './SupplierRating';
import { CEPSearch } from './CEPSearch';
import { ContactList } from './ContactList';
import { BankAccountList } from './BankAccountList';
import { categoryOptions, paymentTermsOptions } from '@/app/lib/mocks/suppliers';
import { brazilianStates } from '@/app/lib/mocks/cep';
import { maskDocument, maskPhone } from '@/app/lib/utils/masks';
import { Contact, BankAccount, Address } from '@/app/types/suppliers';

export function SupplierForm({ 
  initialData, 
  onSubmit, 
  onCancel,
  loading = false 
}: SupplierFormProps) {
  const [activeTab, setActiveTab] = useState('basic');
  
  // Initialize form with default values or initial data
  const defaultValues: SupplierFormData = initialData || {
    name: '',
    legalName: '',
    document: '',
    documentType: 'cnpj',
    category: '',
    rating: 0,
    status: 'active',
    email: '',
    phone: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
    contacts: [],
    bankAccounts: [],
    paymentTerms: '',
    notes: '',
    logo: null,
  };

  const form = useForm<SupplierFormData>({
    defaultValues,
    mode: 'onChange',
  });

  const { setValue, watch, handleSubmit, formState: { errors } } = form;
  
  const documentType = watch('documentType');
  const contacts = watch('contacts') || [];
  const bankAccounts = watch('bankAccounts') || [];
  const address = watch('address') || {
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  };

  // Handle CEP search result
  const handleCEPFound = (newAddress: Address) => {
    setValue('address', newAddress, { shouldValidate: true });
  };

  // Handle contact operations
  const handleAddContact = () => {
    const newContact: Contact = {
      id: `cont-${Date.now()}`,
      name: '',
      role: '',
      email: '',
      phone: '',
      mobile: '',
      isPrimary: contacts.length === 0,
    };
    setValue('contacts', [...contacts, newContact]);
  };

  const handleRemoveContact = (id: string) => {
    setValue('contacts', contacts.filter(c => c.id !== id));
  };

  const handleSetPrimaryContact = (id: string) => {
    setValue('contacts', contacts.map(c => ({
      ...c,
      isPrimary: c.id === id,
    })));
  };

  // Handle bank account operations
  const handleAddBankAccount = () => {
    const newAccount: BankAccount = {
      id: `bank-${Date.now()}`,
      bank: '',
      bankName: '',
      agency: '',
      account: '',
      accountType: 'checking',
      pixKey: '',
      pixType: undefined,
      isPrimary: bankAccounts.length === 0,
    };
    setValue('bankAccounts', [...bankAccounts, newAccount]);
  };

  const handleRemoveBankAccount = (id: string) => {
    setValue('bankAccounts', bankAccounts.filter(a => a.id !== id));
  };

  const handleSetPrimaryBankAccount = (id: string) => {
    setValue('bankAccounts', bankAccounts.map(a => ({
      ...a,
      isPrimary: a.id === id,
    })));
  };

  const handleFormSubmit = (data: SupplierFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
            <TabsTrigger value="address">Endereço</TabsTrigger>
            <TabsTrigger value="contacts">Contatos</TabsTrigger>
            <TabsTrigger value="bank">Dados Bancários</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Tab: Dados Básicos */}
          <TabsContent value="basic" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações Principais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tipo de Pessoa */}
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tipo de Pessoa *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="cnpj" />
                            </FormControl>
                            <FormLabel className="font-normal">Pessoa Jurídica (CNPJ)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="cpf" />
                            </FormControl>
                            <FormLabel className="font-normal">Pessoa Física (CPF)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* CNPJ/CPF */}
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {documentType === 'cnpj' ? 'CNPJ *' : 'CPF *'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(maskDocument(e.target.value, documentType))}
                          placeholder={documentType === 'cnpj' ? '00.000.000/0001-00' : '000.000.000-00'}
                          maxLength={documentType === 'cnpj' ? 18 : 14}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Razão Social */}
                <FormField
                  control={form.control}
                  name="legalName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Razão Social *</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ''} placeholder="Nome completo da empresa" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Nome Fantasia */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Fantasia *</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ''} placeholder="Nome de exibição" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Categoria */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Rating */}
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avaliação</FormLabel>
                      <FormControl>
                        <SupplierRating
                          value={field.value || 0}
                          onChange={(value) => field.onChange(value)}
                          size="lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          {...field} 
                          value={field.value || ''} 
                          placeholder="email@empresa.com.br" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(maskPhone(e.target.value))}
                          placeholder="(00) 0000-0000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Endereço */}
          <TabsContent value="address" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Endereço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="address.cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP *</FormLabel>
                      <FormControl>
                        <CEPSearch
                          value={field.value || ''}
                          onChange={field.onChange}
                          onAddressFound={handleCEPFound}
                          onError={() => {}}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logradouro *</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ''} placeholder="Rua, Avenida, etc." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número *</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ''} placeholder="123" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address.complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ''} placeholder="Sala, Suite, Andar, etc." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address.neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro *</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ''} placeholder="Bairro" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ''} placeholder="Cidade" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado *</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="UF" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brazilianStates.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.value} - {state.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Contatos */}
          <TabsContent value="contacts" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contatos</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactList
                  contacts={contacts}
                  onAdd={handleAddContact}
                  onRemove={handleRemoveContact}
                  onEdit={() => {}}
                  onSetPrimary={handleSetPrimaryContact}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Dados Bancários */}
          <TabsContent value="bank" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dados Bancários</CardTitle>
              </CardHeader>
              <CardContent>
                <BankAccountList
                  accounts={bankAccounts}
                  onAdd={handleAddBankAccount}
                  onRemove={handleRemoveBankAccount}
                  onEdit={() => {}}
                  onSetPrimary={handleSetPrimaryBankAccount}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Configurações */}
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condição de Pagamento</FormLabel>
                      <Select
                        value={field.value || ''}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentTermsOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                          <SelectItem value="pending">Em Análise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações Internas</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={field.value || ''}
                          placeholder="Notas sobre o fornecedor..."
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Fornecedor'}
          </Button>
        </div>
      </form>
    </Form>
  );
}