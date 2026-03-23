'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { mockStoreConfig } from '@/lib/mocks/storefront';

export function StoreFooter() {
  const { address, social, email, phone, name } = mockStoreConfig;
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Store Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{name}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {mockStoreConfig.description}
            </p>
            <div className="flex gap-3">
              {social.instagram && (
                <a
                  href={`https://instagram.com/${social.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {social.facebook && (
                <a
                  href={`https://facebook.com${social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {social.whatsapp && (
                <a
                  href={`https://wa.me/${social.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-primary transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  {address.street}, {address.number}<br />
                  {address.neighborhood} - {address.city}/{address.state}<br />
                  CEP: {address.zipCode}
                </span>
              </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Horário de Funcionamento</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Seg - Sex</span>
                <span>09:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado</span>
                <span>09:00 - 13:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span>Fechado</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
