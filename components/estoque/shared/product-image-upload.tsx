'use client';

import { cn } from '@/lib/estoque/utils';
import { Upload, X, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ProductImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

export function ProductImageUpload({
  images,
  onChange,
  maxImages = 5,
  className,
}: ProductImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      alert(`Máximo de ${maxImages} imagens`);
      return;
    }

    setIsUploading(true);

    // Simulate upload - in real app, upload to server/storage
    const newImages = await Promise.all(
      acceptedFiles.map(async (file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            // In production, this would be the URL from the server
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      })
    );

    onChange([...images, ...newImages]);
    setIsUploading(false);
  }, [images, maxImages, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: maxImages - images.length,
  });

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Dropzone */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
            isDragActive
              ? 'border-[#86cb92] bg-[#86cb92]/5'
              : 'border-gray-300 hover:border-[#86cb92] hover:bg-gray-50'
          )}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-[#86cb92] animate-spin" />
              <p className="text-sm text-gray-500">Enviando...</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {isDragActive ? 'Solte as imagens aqui' : 'Arraste imagens aqui ou clique para selecionar'}
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG, WEBP até 5MB • {maxImages - images.length} restante(s)
              </p>
            </>
          )}
        </div>
      )}

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
            >
              <img
                src={image}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
