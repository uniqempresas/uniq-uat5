"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageUploaderProps } from "@/app/types/service";

export function ImageUploader({ 
  images, 
  onChange, 
  maxImages = 5 
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Verifica limite
    if (images.length + files.length > maxImages) {
      alert(`Máximo de ${maxImages} imagens permitidas`);
      return;
    }

    setUploading(true);

    try {
      // Converte files para base64 (preview)
      const newImages: string[] = [];
      
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue;
        
        const base64 = await fileToBase64(file);
        newImages.push(base64);
      }

      onChange([...images, ...newImages]);
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [images, onChange, maxImages]);

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-uniq-text">
        Imagens do Serviço
        <span className="text-uniq-muted font-normal ml-1">
          ({images.length}/{maxImages})
        </span>
      </label>

      <div className="flex flex-wrap gap-3">
        {/* Imagens existentes */}
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative w-24 h-24 rounded-lg border border-uniq-border overflow-hidden group"
          >
            <img 
              src={image} 
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Botão de adicionar */}
        {canAddMore && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className={cn(
              "w-24 h-24 rounded-lg border-2 border-dashed border-uniq-border flex flex-col items-center justify-center gap-2 transition-colors",
              "hover:border-uniq-accent hover:bg-uniq-accent/5",
              uploading && "opacity-50 cursor-not-allowed"
            )}
            type="button"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 text-uniq-muted animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-uniq-muted" />
                <span className="text-xs text-uniq-muted">Adicionar</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      <p className="text-xs text-uniq-muted">
        Clique na caixa pontilhada para adicionar imagens. Máximo {maxImages} imagens.
      </p>
    </div>
  );
}

// Helper: File to Base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
