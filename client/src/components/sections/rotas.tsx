import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rabbit, Mountain } from "lucide-react";
import type { Article } from "@shared/schema";

export default function Rotas() {
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles?section=rotas&published=true"],
  });

  return (
    <section id="rotas" className="py-20 bg-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sertao-brown mb-6">
            Rotas Turísticas
          </h2>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <p className="text-xl text-sertao-medium max-w-3xl mx-auto leading-relaxed">
            Caminhos que conectam você com a história natural e cultural do sertão
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Rota dos Vaqueiros */}
          <Card className="bg-white p-8 shadow-lg">
            <CardContent className="p-0">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="Rota dos Vaqueiros histórica"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <div className="flex items-center mb-4">
                <Rabbit className="h-6 w-6 text-sertao-brown mr-3" />
                <h3 className="text-2xl font-serif font-semibold text-sertao-brown">
                  Rota dos Vaqueiros
                </h3>
              </div>
              <p className="text-sertao-medium leading-relaxed mb-6">
                Reviva os trajetos históricos do sertão, percorrendo os mesmos caminhos dos antigos vaqueiros que desbravaram essas terras com coragem e determinação.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-sertao-brown text-white">História</Badge>
                <Badge className="bg-terra-cotta text-white">Tradição</Badge>
                <Badge className="bg-golden-sand text-white">Aventura</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Rota da Geodiversidade */}
          <Card className="bg-white p-8 shadow-lg">
            <CardContent className="p-0">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                alt="Formações geológicas e fósseis"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <div className="flex items-center mb-4">
                <Mountain className="h-6 w-6 text-sertao-brown mr-3" />
                <h3 className="text-2xl font-serif font-semibold text-sertao-brown">
                  Rota da Geodiversidade
                </h3>
              </div>
              <p className="text-sertao-medium leading-relaxed mb-6">
                Descubra paisagens imponentes, fósseis milenares e formações rochosas que contam milhões de anos da história natural do planeta Terra.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-sertao-brown text-white">Geologia</Badge>
                <Badge className="bg-terra-cotta text-white">Natureza</Badge>
                <Badge className="bg-golden-sand text-white">Ciência</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Articles */}
        {articles.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-serif font-semibold text-sertao-brown text-center mb-8">
              Mais Rotas e Destinos
            </h3>
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
          </div>
        )}
      </div>
    </section>
  );
}
