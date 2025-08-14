import { useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import type { Image } from "@shared/schema";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: images = [] } = useQuery<Image[]>({
    queryKey: ["/api/images"],
    meta: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      return response.json();
    },
    onSuccess: (data) => {
      onChange(data.url);
      toast({
        title: "Imagem enviada com sucesso",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar imagem",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione apenas arquivos de imagem",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    uploadMutation.mutate(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (imageUrl: string) => {
    onChange(imageUrl);
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-4">
      {/* Current Image */}
      {value && (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={value}
                alt="Imagem selecionada"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
                data-testid="button-remove-image"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Section */}
      <div className="space-y-4">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            data-testid="file-input"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleUploadClick}
            disabled={isUploading}
            className="w-full"
            data-testid="button-upload"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Enviando..." : "Enviar Nova Imagem"}
          </Button>
        </div>

        {/* Image Gallery */}
        {images.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Imagens Disponíveis</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
              {images.map((image: any) => (
                <div
                  key={image.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                    value === image.url
                      ? "border-sertao-brown"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleImageSelect(image.url)}
                  data-testid={`image-option-${image.id}`}
                >
                  <img
                    src={image.url}
                    alt={image.originalName}
                    className="w-full h-20 object-cover"
                  />
                  {value === image.url && (
                    <div className="absolute inset-0 bg-sertao-brown bg-opacity-20 flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
