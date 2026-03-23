"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { Upload, X, Building2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LogoUploadProps {
  currentLogo?: string | null;
  onUpload?: (file: File) => void;
}

export function LogoUpload({ currentLogo, onUpload }: LogoUploadProps) {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(currentLogo || null);
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validação de tamanho (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O logo deve ter no máximo 2MB.",
          variant: "error",
        });
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      onUpload?.(file);

      toast({
        title: "Logo carregado!",
        description: "O logo foi atualizado com sucesso.",
      });
    },
    [onUpload, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  const handleRemove = () => {
    setPreview(null);
    toast({
      title: "Logo removido",
      description: "O logo foi removido. Faça upload de um novo.",
    });
  };

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4">
        <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-uniq-accent" />
          Logo da Empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Preview */}
          {preview ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-xl border-2 border-uniq-border overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={preview}
                  alt="Logo preview"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Remover logo
              </Button>
            </div>
          ) : (
            /* Dropzone */
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
                isDragActive || isDragging
                  ? "border-uniq-accent bg-uniq-accent/5"
                  : "border-uniq-border hover:border-uniq-accent/50 hover:bg-uniq-platinum/50"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-uniq-platinum flex items-center justify-center">
                  <Upload className="w-8 h-8 text-uniq-muted" />
                </div>
                <div>
                  <p className="text-sm font-medium text-uniq-text">
                    {isDragActive ? "Solte o arquivo aqui" : "Arraste o logo aqui"}
                  </p>
                  <p className="text-xs text-uniq-muted mt-1">ou clique para selecionar</p>
                </div>
                <p className="text-xs text-uniq-muted">
                  PNG, JPG ou SVG (máx. 2MB)
                </p>
              </div>
            </div>
          )}

          {/* Placeholder Info */}
          {!preview && (
            <div className="flex items-center gap-3 p-3 bg-uniq-platinum/50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-uniq-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-uniq-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-uniq-text">Sem logo</p>
                <p className="text-xs text-uniq-muted">
                  Um logo padrão será usado na loja
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
