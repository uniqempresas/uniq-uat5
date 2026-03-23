"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";

interface LogoUploadProps {
  value?: string;
  onChange: (value: string) => void;
}

export function LogoUpload({ value, onChange }: LogoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Validar tamanho (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 2MB");
      return;
    }

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      alert("O arquivo deve ser uma imagem");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Logo preview"
            className="w-24 h-24 object-cover rounded-lg border border-uniq-border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragging 
              ? "border-uniq-accent bg-uniq-accent/5" 
              : "border-uniq-border hover:border-uniq-accent"
            }
          `}
        >
          <Upload className="w-8 h-8 text-uniq-muted mx-auto mb-2" />
          <p className="text-sm text-uniq-muted">
            Clique ou arraste uma imagem
          </p>
          <p className="text-xs text-uniq-muted mt-1">
            JPG, PNG até 2MB
          </p>
        </div>
      )}
    </div>
  );
}
