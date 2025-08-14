import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Article } from "@shared/schema";

export default function Gastronomia() {
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles?section=gastronomia&published=true"],
  });

  const pratos = [
    {
      name: "Farinha da Terra",
      description: "Produzida artesanalmente nas casas de farinha tradicionais",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      name: "Pratos Típicos",
      description: "Receitas passadas de geração em geração",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      name: "Doces Regionais",
      description: "Sabores únicos da tradição salitrense",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  return (
    <section id="gastronomia" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sertao-brown mb-6">
            Gastronomia Tradicional
          </h2>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <p className="text-xl text-sertao-medium max-w-3xl mx-auto leading-relaxed">
            Sabores autênticos que contam a história do sertão em cada prato
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pratos.map((prato, index) => (
            <div key={index} className="text-center">
              <img
                src={prato.image}
                alt={prato.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-serif font-semibold text-sertao-brown mb-2">
                {prato.name}
              </h3>
              <p className="text-sertao-medium">{prato.description}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Articles */}
        {articles.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-serif font-semibold text-sertao-brown text-center mb-8">
              Sabores e Tradições
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any) => (
                <Card key={article.id} className="cultural-card">
                  <CardContent className="p-6">
                    {article.featuredImage && (
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h4 className="text-xl font-serif font-semibold text-sertao-brown mb-3">
                      {article.title}
                    </h4>
                    {article.summary && (
                      <p className="text-sertao-medium leading-relaxed">
                        {article.summary}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
