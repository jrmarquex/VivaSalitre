import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Music, Palette } from "lucide-react";
import type { Article } from "@shared/schema";

export default function Quilombolas() {
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles?section=quilombolas&published=true"],
  });

  return (
    <section id="quilombolas" className="py-20 bg-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sertao-brown mb-6">
            Comunidades Quilombolas
          </h2>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <p className="text-xl text-sertao-medium max-w-3xl mx-auto leading-relaxed">
            Nove comunidades que preservam a ancestralidade africana no sertão
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="cultural-card text-center p-8">
            <CardContent className="p-0">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Celebração cultural quilombola"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <Users className="h-10 w-10 text-sertao-brown mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-sertao-brown mb-3">
                Saberes Ancestrais
              </h3>
              <p className="text-sertao-medium leading-relaxed">
                Conhecimentos tradicionais transmitidos através de gerações, preservando a rica herança cultural africana.
              </p>
            </CardContent>
          </Card>

          <Card className="cultural-card text-center p-8">
            <CardContent className="p-0">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Danças tradicionais quilombolas"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <Music className="h-10 w-10 text-sertao-brown mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-sertao-brown mb-3">
                Ritmos & Danças
              </h3>
              <p className="text-sertao-medium leading-relaxed">
                Expressões artísticas que mantêm viva a memória e a identidade cultural das comunidades quilombolas.
              </p>
            </CardContent>
          </Card>

          <Card className="cultural-card text-center p-8">
            <CardContent className="p-0">
              <img
                src="https://images.unsplash.com/photo-1582639510494-c80b5de9f148?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Artesanato quilombola tradicional"
                className="w-full h-48 object-cover rounded-xl mb-6"
              />
              <Palette className="h-10 w-10 text-sertao-brown mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-sertao-brown mb-3">
                Artesanato
              </h3>
              <p className="text-sertao-medium leading-relaxed">
                Criações únicas que contam histórias através do trabalho manual com materiais da região.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white p-8 md:p-12 mb-8">
          <CardContent className="p-0">
            <blockquote className="text-center">
              <p className="text-2xl font-accent text-sertao-brown italic leading-relaxed mb-6">
                "O município é um mosaico cultural e humano. Suas 9 comunidades quilombolas preservam saberes, ritmos, danças, artesanato e histórias que ecoam a ancestralidade africana no sertão."
              </p>
              <footer className="text-sertao-medium font-medium">— Patrimônio Cultural de Salitre</footer>
            </blockquote>
          </CardContent>
        </Card>

        {/* Dynamic Articles */}
        {articles.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
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
        )}
      </div>
    </section>
  );
}
