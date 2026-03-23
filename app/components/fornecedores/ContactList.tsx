// ============================================
// COMPONENT: ContactList - Lista de Contatos do Fornecedor
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
  Mail, 
  Phone,
  Pencil
} from 'lucide-react';
import { Contact, ContactListProps } from '@/app/types/suppliers';

export function ContactList({ 
  contacts, 
  onAdd, 
  onRemove, 
  onEdit,
  onSetPrimary 
}: ContactListProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: '',
    role: '',
    email: '',
    phone: '',
    mobile: '',
    isPrimary: contacts.length === 0,
  });

  const handleAddContact = () => {
    if (!newContact.name) return;
    
    const contact: Contact = {
      id: `cont-${Date.now()}`,
      name: newContact.name,
      role: newContact.role || '',
      email: newContact.email || '',
      phone: newContact.phone || '',
      mobile: newContact.mobile || '',
      isPrimary: newContact.isPrimary || false,
    };
    
    onAdd();
    setIsAddingNew(false);
    setNewContact({
      name: '',
      role: '',
      email: '',
      phone: '',
      mobile: '',
      isPrimary: false,
    });
  };

  return (
    <div className="space-y-4">
      {/* Lista de Contatos */}
      {contacts.length > 0 ? (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <Card key={contact.id} className="border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {contact.isPrimary && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                      <span className="font-medium">{contact.name}</span>
                      {contact.role && (
                        <span className="text-sm text-gray-500">
                          - {contact.role}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      {contact.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{contact.email}</span>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                      {contact.mobile && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>Cel: {contact.mobile}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {!contact.isPrimary && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSetPrimary(contact.id)}
                        className="text-xs"
                      >
                        Definir Principal
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(contact.id)}
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
          Nenhum contato adicionado
        </p>
      )}

      {/* Botão Adicionar */}
      <Button
        variant="outline"
        onClick={() => setIsAddingNew(true)}
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Adicionar Contato
      </Button>

      {/* Dialog de Novo Contato */}
      <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Contato</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome *</label>
              <Input
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="Nome do contato"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Cargo</label>
              <Input
                value={newContact.role}
                onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                placeholder="Ex: Gerente Comercial"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Telefone</label>
                <Input
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="(00) 0000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Celular</label>
                <Input
                  value={newContact.mobile}
                  onChange={(e) => setNewContact({ ...newContact, mobile: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPrimary"
                checked={newContact.isPrimary}
                onChange={(e) => setNewContact({ ...newContact, isPrimary: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="isPrimary" className="text-sm">
                Definir como contato principal
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddContact} disabled={!newContact.name}>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}