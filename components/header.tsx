"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Building2,
  Sun,
  Moon,
  LogOut,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  className?: string;
  pageTitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Header({ className, pageTitle = "Dashboard", breadcrumbs }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 lg:left-64 right-0 z-30 h-16 bg-uniq-white border-b border-uniq-border flex items-center justify-between px-6",
        className
      )}
    >
      {/* Left - Title & Breadcrumbs */}
      <div className="flex items-center gap-4 ml-12 lg:ml-0">
        <div>
          <h1 className="text-xl font-bold text-uniq-text">{pageTitle}</h1>
          {breadcrumbs && (
            <nav className="hidden sm:flex items-center gap-1 text-sm text-uniq-muted">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.label}>
                  {index > 0 && (
                    <span className="text-uniq-muted mx-1">/</span>
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-uniq-text transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-uniq-muted" />
          <input
            type="text"
            placeholder="Buscar produtos, clientes, pedidos..."
            className={cn(
              "w-full pl-10 pr-12 py-2 rounded-lg border bg-[#f9fafb] text-sm text-uniq-text placeholder-uniq-muted focus:outline-none transition-all",
              searchFocused
                ? "ring-2 ring-uniq-accent border-uniq-accent"
                : "border-uniq-border"
            )}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-uniq-border rounded text-xs text-uniq-muted font-medium flex items-center gap-1">
            <span className="text-[10px]">⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative p-2 rounded-lg hover:bg-uniq-platinum transition-colors"
        >
          <Bell className="w-5 h-5 text-uniq-muted" />
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Help */}
        <Button
          variant="ghost"
          size="icon"
          className="p-2 rounded-lg hover:bg-uniq-platinum transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-uniq-muted" />
        </Button>

        {/* Divider */}
        <div className="w-px h-6 bg-uniq-border mx-2" />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-uniq-platinum transition-colors"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="" alt="Carlos Silva" />
                <AvatarFallback className="bg-uniq-primary text-white text-xs font-semibold">
                  CS
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-uniq-muted" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-4 py-3 border-b border-uniq-border mb-1">
              <p className="text-sm font-bold text-uniq-text">Carlos Silva</p>
              <p className="text-xs text-uniq-muted truncate">
                carlos@techsolutions.com.br
              </p>
            </div>
            <DropdownMenuItem className="gap-3">
              <User className="w-5 h-5 text-uniq-primary" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3">
              <Building2 className="w-5 h-5 text-uniq-primary" />
              <span>Configurações da Empresa</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-3">
              <Sun className="w-5 h-5 text-uniq-primary" />
              <span>Tema</span>
              <span className="ml-auto text-xs text-uniq-muted flex items-center gap-1">
                Claro
                <ChevronDown className="w-3 h-3" />
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-5 h-5 text-red-600" />
              <span className="font-medium">Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
