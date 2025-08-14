import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Article } from "@shared/schema";

export default function Cultura() {
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles?section=cultura&published=true"],
  });

  const folguedos = [
    {
      name: "Caretas",
      description: "Manifestação folclórica tradicional",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      name: "Reisado",
      description: "Colorido e devoto folguedo religioso",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      name: "Maneiro-Pau",
      description: "Danças animadas tradicionais",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    },
    {
      name: "Pega de Boi",
      description: "Tradição que emociona e resiste",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
    }
  ];

  return (
    <section id="cultura" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sertao-brown mb-6">
            Cultura & Folclore
          </h2>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <p className="text-xl text-sertao-medium max-w-3xl mx-auto leading-relaxed">
            Tradições que pulsam nas ruas e praças, mantendo viva a alma salitrense
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
          {folguedos.map((folguedo, index) => (
            <Card key={index} className="cultural-card text-center p-6">
              <CardContent className="p-0">
                <img
                  src={folguedo.image}
                  alt={`${folguedo.name} - folguedo tradicional`}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-serif font-semibold text-sertao-brown mb-2">
                  {folguedo.name}
                </h3>
                <p className="text-sm text-sertao-medium">{folguedo.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dynamic Articles */}
        {articles.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-serif font-semibold text-sertao-brown text-center mb-8">
              Manifestações Culturais
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
