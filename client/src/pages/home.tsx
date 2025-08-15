import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function Home() {
  const rotas = [
    {
      id: "afroturistica",
      nome: "Rota Afroturística",
      numero: "I",
      image: "/api/placeholder/800/400"
    },
    {
      id: "mandiocultura", 
      nome: "Rota da Mandiocultura",
      numero: "II",
      image: "/api/placeholder/800/400"
    },
    {
      id: "geodiversidade",
      nome: "Rota da Geodiversidade", 
      numero: "III",
      image: "/api/placeholder/800/400"
    },
    {
      id: "fe",
      nome: "Rota Turística da Fé",
      numero: "IV", 
      image: "/api/placeholder/800/400"
    },
    {
      id: "vaqueiro",
      nome: "Rota Turística do Vaqueiro",
      numero: "V",
      image: "/api/placeholder/800/400"
    }
  ];

  return (
    <div className="min-h-screen bg-warm-beige text-sertao-dark">
      <Navbar />
      <main>
        {/* Header Section */}
        <section className="relative bg-gradient-to-b from-amber-50 to-orange-50 py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-orange-900 mb-6 leading-tight">
              Salitre, Ceará: A Capital da Mandioca e Terra de Sabores e Tradições!
            </h1>
            <p className="text-xl md:text-2xl text-orange-800 max-w-4xl mx-auto leading-relaxed">
              Em Salitre, cada visitante descobre que a mandioca é apenas o começo. Aqui, cultura, fé, ancestralidade, natureza e tradição se unem para criar um destino inesquecível
            </p>
          </div>
        </section>

        {/* Viva Salitre Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-orange-900 mb-12">
              Viva Salitre!!
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-6">
                No extremo sul do Ceará, no coração do sertão, está Salitre, município que orgulhosamente carrega o título de Capital da Mandioca. Mais do que um produto, a mandioca aqui é história, identidade e sustento, presente desde o cultivo nas pequenas roças até o trabalho artesanal nas tradicionais fábricas de farinha, onde o aroma e o sabor contam séculos de tradição.
              </p>
              
              <p className="text-lg mb-6">
                O município é um mosaico cultural e humano. Suas 9 comunidades quilombolas preservam saberes, ritmos, danças, artesanato e histórias que ecoam a ancestralidade africana no sertão. Essa herança se entrelaça com uma diversidade religiosa marcante: a fé católica, com suas procissões e festas; as expressões evangélicas, que unem louvor e comunidade; e as tradições de matriz africana, como a Umbanda, que mantêm viva a espiritualidade e o respeito aos ancestrais.
              </p>
              
              <p className="text-lg mb-6">
                A cultura salitrense pulsa em suas ruas e praças com folguedos tradicionais como os Caretas, o colorido e devoto Reisado e as animadas danças maneiro-pau, que resgatam a alegria das antigas celebrações. E no sertão, onde o gado é símbolo de bravura e resistência, as pega de boi emocionam e revelam a relação profunda entre o homem, o animal e a caatinga.
              </p>
              
              <p className="text-lg mb-6">
                Salitre também é destino de quem busca se conectar com a história da terra. A Rota dos Vaqueiros revive trajetos históricos do sertão, enquanto a Rota da Geodiversidade revela paisagens imponentes, fósseis e formações rochosas que contam milhões de anos de história natural.
              </p>
              
              <p className="text-xl font-semibold text-center text-orange-900 mt-12">
                Salitre, Ceará. Capital da Mandioca.
              </p>
            </div>
          </div>
        </section>

        {/* Rotas Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-amber-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-900 mb-16">
              Descubra Nossas Rotas Turísticas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {rotas.slice(0, 3).map((rota) => (
                <Link key={rota.id} href={`/rota/${rota.id}`} data-testid={`link-rota-${rota.id}`}>
                  <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden h-80">
                    <div className="relative h-full">
                      {/* Background with gradient overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-orange-200 via-amber-100 to-orange-300 group-hover:from-orange-300 group-hover:to-amber-200 transition-all duration-300"
                      />
                      
                      {/* Content Overlay */}
                      <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 w-full shadow-lg">
                          <span className="text-2xl font-bold text-orange-900 block mb-2">
                            {rota.numero}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800 leading-tight">
                            {rota.nome}
                          </h3>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* Second row with 2 cards centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-8">
              {rotas.slice(3, 5).map((rota) => (
                <Link key={rota.id} href={`/rota/${rota.id}`} data-testid={`link-rota-${rota.id}`}>
                  <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden h-80">
                    <div className="relative h-full">
                      {/* Background with gradient overlay */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-orange-200 via-amber-100 to-orange-300 group-hover:from-orange-300 group-hover:to-amber-200 transition-all duration-300"
                      />
                      
                      {/* Content Overlay */}
                      <CardContent className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 w-full shadow-lg">
                          <span className="text-2xl font-bold text-orange-900 block mb-2">
                            {rota.numero}
                          </span>
                          <h3 className="text-xl font-bold text-gray-800 leading-tight">
                            {rota.nome}
                          </h3>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
