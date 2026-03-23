// components/marketplace/image-upload.tsx - Image upload for logo/banner
'use client';

import * as React from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
  label?: string;
  aspectRatio?: 'square' | 'banner';
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  accept = 'image/*',
  maxSize = 5,
  className = '',
  label,
  aspectRatio = 'square',
  placeholder = 'Arraste uma imagem ou clique para selecionar',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const aspectRatioClass = aspectRatio === 'banner' ? 'aspect-[3/1]' : 'aspect-square';

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    setError(null);

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem.');
      return false;
    }

    // Check file size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSize) {
      setError(`A imagem deve ter no máximo ${maxSize}MB.`);
      return false;
    }

    return true;
  };

  const handleFile = React.useCallback(async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);

    try {
      // Simulate upload - in real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo, create a local URL or use Unsplash
      const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`;
      
      // In production, this would be the uploaded URL
      if (onChange) {
        onChange(mockUrl);
      }
    } catch (err) {
      setError('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  }, [onChange, maxSize]);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    if (onChange) {
      onChange('');
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-uniq-text mb-2">
          {label}
        </label>
      )}
      
      <div
        className={`
          relative ${aspectRatioClass} rounded-xl border-2 border-dashed transition-all cursor-pointer
          ${isDragging 
            ? 'border-uniq-accent bg-uniq-accent/5' 
            : error 
              ? 'border-red-400 bg-red-50' 
              : 'border-uniq-border bg-uniq-platinum hover:border-uniq-accent/50 hover:bg-uniq-platinum/80'
          }
          ${value ? 'border-solid' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {isUploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-uniq-muted">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span className="text-sm">Enviando...</span>
          </div>
        ) : value ? (
          <>
            <img
              src={value}
              alt="Upload preview"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-uniq-text/80 text-uniq-white hover:bg-uniq-text transition-colors"
              aria-label="Remover imagem"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-uniq-muted">
            {isDragging ? (
              <Upload className="w-10 h-10 mb-2 text-uniq-accent" />
            ) : (
              <ImageIcon className="w-10 h-10 mb-2" />
            )}
            <span className="text-sm text-center px-4">
              {isDragging ? 'Solte para enviar' : placeholder}
            </span>
            <span className="text-xs mt-1 opacity-70">
              PNG, JPG ou WEBP (máx. {maxSize}MB)
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
