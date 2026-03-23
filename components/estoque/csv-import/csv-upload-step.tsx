'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, X, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/estoque/utils';

interface CSVUploadStepProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export function CSVUploadStep({ file, onFileSelect, onRemove }: CSVUploadStepProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {!file && (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all',
            isDragActive
              ? 'border-[#86cb92] bg-[#86cb92]/5'
              : 'border-gray-300 hover:border-[#86cb92] hover:bg-gray-50'
          )}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-[#1f2937] mb-1">
            {isDragActive ? 'Solte o arquivo aqui' : 'Arraste seu arquivo aqui'}
          </p>
          <p className="text-sm text-[#627271] mb-4">
            ou clique para selecionar
          </p>
          <p className="text-xs text-[#627271]">
            CSV, XLS, XLSX até 10MB
          </p>
        </div>
      )}

      {/* Selected File */}
      {file && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#1f2937] truncate">{file.name}</p>
              <p className="text-sm text-[#627271]">{formatFileSize(file.size)}</p>
            </div>
            <button
              onClick={onRemove}
              className="p-2 text-[#627271] hover:text-red-600 hover:bg-red-50 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-medium text-[#1f2937] mb-2">Formato esperado:</h4>
        <ul className="text-sm text-[#627271] space-y-1">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            Coluna A: SKU do produto (obrigatório)
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            Coluna B: Quantidade (obrigatório)
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            Coluna C: Custo unitário (opcional)
          </li>
          <li className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            Máximo de 10.000 linhas por arquivo
          </li>
        </ul>
      </div>

      {/* Template Download */}
      <div className="text-center">
        <a
          href="/templates/importar-estoque.csv"
          download
          className="text-sm text-[#3e5653] hover:underline"
        >
          Baixar modelo de arquivo CSV
        </a>
      </div>
    </div>
  );
}
