// components/marketplace/pagination.tsx
'use client';

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className,
}: PaginationProps) {
  const getVisiblePages = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];
    const halfVisible = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('ellipsis');
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Paginação"
    >
      {/* First Page */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="w-9 h-9 p-0"
        aria-label="Primeira página"
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>

      {/* Previous Page */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 p-0"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 py-1 text-uniq-muted"
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "ghost"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={cn(
              "w-9 h-9 p-0 font-medium",
              page === currentPage && "bg-uniq-primary text-white hover:bg-uniq-hover"
            )}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Button>
        )
      )}

      {/* Next Page */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 p-0"
        aria-label="Próxima página"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Last Page */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 p-0"
        aria-label="Última página"
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}
