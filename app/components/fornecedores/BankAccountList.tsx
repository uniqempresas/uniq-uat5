// ============================================
// COMPONENT: BankAccountList - Lista de Contas Bancárias
// ============================================

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Plus, 
  Trash2, 
  Star,
  Building2
} from 'lucide-react';
import { BankAccount, BankAccountListProps } from '@/app/types/suppliers';
import { bankOptions } from '@/app/lib/mocks/suppliers';

export function BankAccountList({ 
  accounts, 
  onAdd, 
  onRemove, 
  onEdit,
  onSetPrimary 
}: BankAccountListProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<BankAccount>>({
    bank: '',
    bankName: '',
    agency: '',
    account: '',
    accountType: 'checking',
    pixKey: '',
    pixType: undefined,
    isPrimary: accounts.length === 0,
  });

  const handleAddAccount = () => {
    if (!newAccount.bank || !newAccount.agency || !newAccount.account) return;
    
    const bankOption = bankOptions.find(b => b.value === newAccount.bank);
    
    const account: BankAccount = {
      id: `bank-${Date.now()}`,
      bank: newAccount.bank,
      bankName: bankOption?.label.replace(/^\d+ - /, '') || '',
      agency: newAccount.agency,
      account: newAccount.account,
      accountType: newAccount.accountType || 'checking',
      pixKey: newAccount.pixKey || '',
      pixType: newAccount.pixType,
      isPrimary: newAccount.isPrimary || false,
    };
    
    onAdd();
    setIsAddingNew(false);
    setNewAccount({
      bank: '',
      bankName: '',
      agency: '',
      account: '',
      accountType: 'checking',
      pixKey: '',
      pixType: undefined,
      isPrimary: false,
    });
  };

  return (
    <div className="space-y-4">
      {/* Lista de Contas */}
      {accounts.length > 0 ? (
        <div className="space-y-3">
          {accounts.map((account) => (
            <Card key={account.id} className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {account.isPrimary && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">
                        {account.bankName || `Banco ${account.bank}`}
                      </span>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-500 space-y-1">
                      <div>Agência: {account.agency}</div>
                      <div>Conta: {account.account}</div>
                      <div className="capitalize">
                        Tipo: {account.accountType === 'checking' ? 'Corrente' : 'Poupança'}
                      </div>
                      {account.pixKey && account.pixType && (
                        <div>
                          PIX: {account.pixType.toUpperCase()} - {account.pixKey}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {!account.isPrimary && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSetPrimary(account.id)}
                        className="text-xs"
                      >
                        Definir Principal
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(account.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">
          Nenhuma conta bancária adicionada
        </p>
      )}

      {/* Botão Adicionar */}
      <Button
        variant="outline"
        onClick={() => setIsAddingNew(true)}
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Adicionar Conta Bancária
      </Button>

      {/* Dialog de Nova Conta */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nova Conta Bancária</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Banco *</label>
              <Select
                value={newAccount.bank}
                onValueChange={(value) => setNewAccount({ ...newAccount, bank: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o banco" />
                </SelectTrigger>
                <SelectContent>
                  {bankOptions.map((bank) => (
                    <SelectItem key={bank.value} value={bank.value}>
                      {bank.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Agência *</label>
                <Input
                  value={newAccount.agency}
                  onChange={(e) => setNewAccount({ ...newAccount, agency: e.target.value })}
                  placeholder="0000-0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Conta *</label>
                <Input
                  value={newAccount.account}
                  onChange={(e) => setNewAccount({ ...newAccount, account: e.target.value })}
                  placeholder="00000-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Conta</label>
              <Select
                value={newAccount.accountType}
                onValueChange={(value) => setNewAccount({ 
                  ...newAccount, 
                  accountType: value as 'checking' | 'savings' 
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checking">Conta Corrente</SelectItem>
                  <SelectItem value="savings">Conta Poupança</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-3">Dados do PIX (opcional)</h4>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Chave PIX</label>
                <Select
                  value={newAccount.pixType || ''}
                  onValueChange={(value) => setNewAccount({ 
                    ...newAccount, 
                    pixType: value as 'cnpj' | 'cpf' | 'email' | 'phone' | 'random'
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cnpj">CNPJ</SelectItem>
                    <SelectItem value="cpf">CPF</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Celular</SelectItem>
                    <SelectItem value="random">Chave Aleatória</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newAccount.pixType && (
                <div className="space-y-2 mt-3">
                  <label className="text-sm font-medium">Chave PIX</label>
                  <Input
                    value={newAccount.pixKey}
                    onChange={(e) => setNewAccount({ ...newAccount, pixKey: e.target.value })}
                    placeholder="Sua chave PIX"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="accountIsPrimary"
                checked={newAccount.isPrimary}
                onChange={(e) => setNewAccount({ ...newAccount, isPrimary: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="accountIsPrimary" className="text-sm">
                Definir como conta principal
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAddAccount} 
              disabled={!newAccount.bank || !newAccount.agency || !newAccount.account}
            >
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}