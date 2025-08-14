import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Home, FileText, Users, Palette, Route, UtensilsCrossed, Church } from "lucide-react";
import type { Article } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLocation("/admin");
    }
  }, [setLocation]);

  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    meta: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const sections = [
    { id: "historia", name: "História & Tradições", icon: FileText, color: "bg-blue-100 text-blue-800" },
    { id: "quilombolas", name: "Comunidades Quilombolas", icon: Users, color: "bg-green-100 text-green-800" },
    { id: "cultura", name: "Cultura & Folclore", icon: Palette, color: "bg-purple-100 text-purple-800" },
    { id: "rotas", name: "Rotas Turísticas", icon: Route, color: "bg-orange-100 text-orange-800" },
    { id: "gastronomia", name: "Gastronomia", icon: UtensilsCrossed, color: "bg-red-100 text-red-800" },
    { id: "religiosidade", name: "Religiosidade", icon: Church, color: "bg-indigo-100 text-indigo-800" },
  ];

  const getArticlesBySection = (sectionId: string) => {
    return articles.filter((article: any) => article.section === sectionId);
  };

  return (
    <div className="min-h-screen bg-warm-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif font-bold text-sertao-brown">
                Painel Administrativo
              </h1>
              <p className="text-sertao-medium">Gestão de Conteúdo - Salitre</p>
            </div>
            <div className="flex gap-2">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Ver Site
                </Button>
              </Link>
              <Link to="/admin/content/new">
                <Button
                  data-testid="button-new-content"
                  className="bg-sertao-brown hover:bg-terra-cotta"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Conteúdo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-sertao-medium">
                Total de Artigos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sertao-brown">{articles.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-sertao-medium">
                Publicados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {articles.filter((a: any) => a.published).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-sertao-medium">
                Rascunhos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {articles.filter((a: any) => !a.published).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-sertao-medium">
                Seções
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sertao-brown">{sections.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section) => {
            const sectionArticles = getArticlesBySection(section.id);
            const Icon = section.icon;

            return (
              <Card key={section.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-sertao-brown" />
                      <div>
                        <CardTitle className="text-lg">{section.name}</CardTitle>
                        <CardDescription>
                          {sectionArticles.length} artigo(s)
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={section.color}>
                      {sectionArticles.filter((a: any) => a.published).length} publicados
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sectionArticles.slice(0, 3).map((article: any) => (
                      <div
                        key={article.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-sm truncate">{article.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={article.published ? "default" : "secondary"}>
                            {article.published ? "Publicado" : "Rascunho"}
                          </Badge>
                          <Link to={`/admin/content/${article.id}`}>
                            <Button
                              data-testid={`button-edit-${article.id}`}
                              variant="ghost"
                              size="sm"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                    {sectionArticles.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Nenhum artigo nesta seção
                      </p>
                    )}
                    <Link to="/admin/content/new">
                      <Button
                        data-testid={`button-add-${section.id}`}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar em {section.name}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
