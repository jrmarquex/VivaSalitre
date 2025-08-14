import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertArticleSchema, type InsertArticle, type Article } from "@shared/schema";
import RichTextEditor from "@/components/admin/rich-text-editor";
import ImageUpload from "@/components/admin/image-upload";
import { ArrowLeft, Save } from "lucide-react";

const articleSchema = insertArticleSchema.extend({
  summary: insertArticleSchema.shape.summary.optional(),
});

type ArticleFormData = {
  title: string;
  content: string;
  summary?: string;
  section: "historia" | "quilombolas" | "cultura" | "rotas" | "gastronomia" | "religiosidade";
  featuredImage?: string;
  published: boolean;
};

export default function ContentEditor() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  const isEditing = Boolean(params.id);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const { data: article } = useQuery<Article>({
    queryKey: ["/api/articles", params.id],
    enabled: isEditing,
    meta: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      summary: "",
      section: "historia",
      featuredImage: "",
      published: false,
    },
  });

  useEffect(() => {
    if (article) {
      form.reset({
        title: article.title,
        content: article.content,
        summary: article.summary || "",
        section: article.section,
        featuredImage: article.featuredImage || "",
        published: article.published,
      });
      setContent(article.content);
      setFeaturedImage(article.featuredImage || "");
    }
  }, [article, form]);

  const createMutation = useMutation({
    mutationFn: async (data: ArticleFormData) => {
      const response = await apiRequest("POST", "/api/articles", {
        ...data,
        content,
        featuredImage,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Artigo criado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      setLocation("/admin/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar artigo",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ArticleFormData) => {
      const response = await apiRequest("PUT", `/api/articles/${params.id}`, {
        ...data,
        content,
        featuredImage,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Artigo atualizado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      setLocation("/admin/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar artigo",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ArticleFormData) => {
    const formData = {
      ...data,
      content,
      featuredImage,
    };

    if (isEditing) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const sections = [
    { value: "historia", label: "História & Tradições" },
    { value: "quilombolas", label: "Comunidades Quilombolas" },
    { value: "cultura", label: "Cultura & Folclore" },
    { value: "rotas", label: "Rotas Turísticas" },
    { value: "gastronomia", label: "Gastronomia Tradicional" },
    { value: "religiosidade", label: "Religiosidade" },
  ];

  return (
    <div className="min-h-screen bg-warm-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setLocation("/admin/dashboard")}
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-serif font-bold text-sertao-brown">
                  {isEditing ? "Editar Artigo" : "Novo Artigo"}
                </h1>
                <p className="text-sertao-medium">
                  {isEditing ? "Edite as informações do artigo" : "Crie um novo conteúdo"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Artigo</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-title"
                            placeholder="Digite o título do artigo"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="section"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seção</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-section">
                              <SelectValue placeholder="Selecione uma seção" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sections.map((section) => (
                              <SelectItem key={section.value} value={section.value}>
                                {section.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resumo (opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          data-testid="input-summary"
                          placeholder="Digite um breve resumo do artigo"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Imagem Destacada
                  </label>
                  <ImageUpload
                    value={featuredImage}
                    onChange={setFeaturedImage}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Conteúdo
                  </label>
                  <RichTextEditor
                    value={content}
                    onChange={setContent}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Publicar Artigo</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          O artigo ficará visível no site quando publicado
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          data-testid="switch-published"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setLocation("/admin/dashboard")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    data-testid="button-save"
                    type="submit"
                    className="bg-sertao-brown hover:bg-terra-cotta"
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {createMutation.isPending || updateMutation.isPending
                      ? "Salvando..."
                      : isEditing
                      ? "Atualizar"
                      : "Criar Artigo"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
