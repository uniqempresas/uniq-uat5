"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Building2,
  LayoutDashboard,
  ShoppingBag,
  Users,
  Wallet,
  Package,
  ShoppingCart,
  Store,
  Calendar,
  Bot,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Wrench,
  MessageSquare,
  Truck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  className?: string;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
  isNew?: boolean;
  active?: boolean;
}

const mainMenuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Building2, label: "Minha Empresa", href: "/empresa" },
  { icon: ShoppingBag, label: "Meus Módulos", href: "/modulos", badge: 3 },
];

const moduleItems: MenuItem[] = [
  { icon: Users, label: "CRM", href: "/crm" },
  { icon: Wallet, label: "Financeiro", href: "/financeiro" },
  { icon: Package, label: "Estoque", href: "/estoque" },
  { icon: ShoppingCart, label: "Vendas", href: "/vendas" },
  { icon: Store, label: "Loja Virtual", href: "/loja" },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
  { icon: Wrench, label: "Serviços", href: "/servicos" },
  { icon: Calendar, label: "Agendamentos", href: "/agendamentos" },
  { icon: Truck, label: "Fornecedores", href: "/fornecedores" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: Bot, label: "MEL", href: "/mel", isNew: true },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-uniq-primary text-white hover:bg-uniq-hover transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-uniq-sidebar flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-uniq-accent" />
            <span className="text-2xl font-bold text-white">UNIQ</span>
            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden ml-auto p-1 rounded hover:bg-white/10"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Main Menu Section */}
        <div className="px-6 py-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Principal
          </span>
        </div>
        <nav className="px-3 space-y-1">
          {mainMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 mx-1 rounded-lg transition-colors",
                isActive(item.href) || item.active
                  ? "bg-[#3e5653] text-white"
                  : "hover:bg-white/10 text-gray-300"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  isActive(item.href) || item.active
                    ? "text-uniq-accent"
                    : "text-gray-400"
                )}
              />
              <span className="text-sm font-medium">{item.label}</span>
              {item.badge && (
                <Badge className="ml-auto bg-uniq-accent text-uniq-sidebar text-xs font-bold">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4 mx-4" />

        {/* Modules Section */}
        <div className="px-6 py-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Módulos
          </span>
        </div>
        <nav className="px-3 space-y-1 flex-1 overflow-y-auto">
          {moduleItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 mx-1 rounded-lg transition-colors",
                isActive(item.href)
                  ? "bg-[#3e5653] text-white"
                  : "hover:bg-white/10 text-gray-300"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  item.label === "MEL"
                    ? "text-uniq-accent"
                    : isActive(item.href)
                    ? "text-uniq-accent"
                    : "text-gray-400"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  item.label === "MEL" && "text-uniq-accent"
                )}
              >
                {item.label}
              </span>
              {item.isNew && (
                <Badge className="ml-auto bg-uniq-accent/20 text-uniq-accent text-[10px] font-bold px-1.5 py-0.5">
                  Novo
                </Badge>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer Menu */}
        <div className="px-3 pb-4 space-y-1">
          <Link
            href="/configuracoes"
            className="flex items-center gap-3 px-3 py-2 mx-1 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
          >
            <Settings className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium">Configurações</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2 mx-1 rounded-lg hover:bg-red-500/20 transition-colors text-red-400">
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 mx-4 mt-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" alt="Carlos Silva" />
              <AvatarFallback className="bg-uniq-primary text-white text-sm font-semibold">
                CS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Carlos Silva
              </p>
              <p className="text-xs text-gray-400 truncate">
                Tech Solutions Ltda
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
