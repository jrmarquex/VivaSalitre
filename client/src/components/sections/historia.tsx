import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Factory } from "lucide-react";
import type { Article } from "@shared/schema";

export default function Historia() {
  const { data: articles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles?section=historia&published=true"],
  });

  return (
    <section id="historia" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sertao-brown mb-6">
            História & Tradições
          </h2>
          <div className="section-divider w-24 mx-auto mb-8"></div>
          <p className="text-xl text-sertao-medium max-w-3xl mx-auto leading-relaxed">
            Séculos de história preservados nas tradições que ecoam pelo sertão
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Cultivo tradicional de mandioca no sertão"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-sertao-dark">
              <span className="font-accent text-xl text-sertao-brown font-semibold">"</span>
              No extremo sul do Ceará, no coração do sertão, está Salitre, município que orgulhosamente carrega o título de Capital da Mandioca. Mais do que um produto, a mandioca aqui é história, identidade e sustento.
              <span className="font-accent text-xl text-sertao-brown font-semibold">"</span>
            </p>
            <p className="text-lg leading-relaxed text-sertao-medium">
              Presente desde o cultivo nas pequenas roças até o trabalho artesanal nas tradicionais fábricas de farinha, onde o aroma e o sabor contam séculos de tradição que passam de geração em geração.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <Card className="text-center p-6 bg-warm-beige">
                <CardContent className="p-0">
                  <Sprout className="h-8 w-8 text-sertao-brown mx-auto mb-3" />
                  <h4 className="font-serif font-semibold text-sertao-brown mb-2">Cultivo Ancestral</h4>
                  <p className="text-sm text-sertao-medium">Técnicas tradicionais preservadas</p>
                </CardContent>
              </Card>
              <Card className="text-center p-6 bg-warm-beige">
                <CardContent className="p-0">
                  <Factory className="h-8 w-8 text-sertao-brown mx-auto mb-3" />
                  <h4 className="font-serif font-semibold text-sertao-brown mb-2">Fábricas Artesanais</h4>
                  <p className="text-sm text-sertao-medium">Produção de farinha tradicional</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Dynamic Articles */}
        {articles.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-serif font-semibold text-sertao-brown text-center mb-8">
              Mais sobre Nossa História
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
