import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Cross, Heart, Moon } from "lucide-react";
import type { Article } from "@shared/schema";

export default function Religiosidade() {
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles?section=religiosidade&published=true"],
  });

  return (
    <section id="religiosidade" className="py-20 bg-warm-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sertao-brown mb-6">
            Religiosidade
          </h2>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <p className="text-xl text-sertao-medium max-w-3xl mx-auto leading-relaxed">
            Diversidade de fé que entrelaça tradições e fortalece a comunidade
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Catholic faith */}
          <Card className="bg-white text-center p-8">
            <CardContent className="p-0">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
                alt="Procissões e festas católicas"
                className="w-full h-40 object-cover rounded-lg mb-6"
              />
              <Cross className="h-8 w-8 text-sertao-brown mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-sertao-brown mb-3">
                Fé Católica
              </h3>
              <p className="text-sertao-medium">
                Procissões e festas que unem a comunidade em devoção e tradição.
              </p>
            </CardContent>
          </Card>

          {/* Evangelical expressions */}
          <Card className="bg-white text-center p-8">
            <CardContent className="p-0">
              <img
                src="https://images.unsplash.com/photo-1438032005730-c779502df39b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
                alt="Expressões evangélicas comunitárias"
                className="w-full h-40 object-cover rounded-lg mb-6"
              />
              <Heart className="h-8 w-8 text-sertao-brown mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-sertao-brown mb-3">
                Expressões Evangélicas
              </h3>
              <p className="text-sertao-medium">
                Louvor e comunidade que fortalecem os laços fraternais.
              </p>
            </CardContent>
          </Card>

          {/* African matrix traditions */}
          <Card className="bg-white text-center p-8">
            <CardContent className="p-0">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
                alt="Tradições de matriz africana"
                className="w-full h-40 object-cover rounded-lg mb-6"
              />
              <Moon className="h-8 w-8 text-sertao-brown mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-sertao-brown mb-3">
                Tradições Africanas
              </h3>
              <p className="text-sertao-medium">
                Umbanda e espiritualidade que honram os ancestrais.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white p-8 md:p-12 mb-8">
          <CardContent className="p-0">
            <blockquote className="text-center">
              <p className="text-2xl font-accent text-sertao-brown italic leading-relaxed mb-6">
                "Essa herança se entrelaça com uma diversidade religiosa marcante: a fé católica, as expressões evangélicas e as tradições de matriz africana, mantendo viva a espiritualidade e o respeito aos ancestrais."
              </p>
            </blockquote>
          </CardContent>
        </Card>

        {/* Dynamic Articles */}
        {articles.length > 0 && (
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
        )}
      </div>
    </section>
  );
}
