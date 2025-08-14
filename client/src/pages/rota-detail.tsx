import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const rotasData = {
  mandiocultura: {
    titulo: "Rota da Mandiocultura",
    subtitulo: "Do campo à mesa, o sabor que conta histórias",
    numero: "II",
    conteudo: `Em Salitre, a mandioca é mais que alimento: é símbolo de resistência, identidade e união comunitária. Na Rota da Mandiocultura, o visitante acompanha o ciclo completo dessa raiz que move a economia local: do plantio nas roças familiares ao trabalho artesanal nas fábricas de farinha.

O percurso é um mergulho na cultura sertaneja, com degustação de tapiocas fresquinhas, beiju, bolo de goma e outras delícias típicas. Ao longo do caminho, as histórias dos mangueiros, farinheiras e agricultores revelam a importância desse cultivo para gerações.

É uma rota que desperta sentidos, conecta com a terra e deixa na boca o sabor do sertão.`
  },
  afroturistica: {
    titulo: "Rota Afroturística", 
    subtitulo: "Ancestralidade que vive no presente",
    numero: "I",
    conteudo: `Salitre guarda um tesouro humano e cultural em suas 9 comunidades quilombolas. Na Rota Afroturística, o visitante é recebido de forma calorosa para conhecer tradições, saberes, cantos, danças e artesanato que resistem ao tempo.

Cada comunidade guarda um pedaço da história africana no sertão: da culinária típica às expressões religiosas, do batuque das festas aos folguedos como Reisado, Caretas e dança maneiro-pau.

Aqui, o passado é memória viva, e a visita é um gesto de respeito à força e à herança de um povo que construiu, com fé e trabalho, parte essencial da identidade salitrense.`
  },
  vaqueiro: {
    titulo: "Rota Turística do Vaqueiro",
    subtitulo: "No rastro da bravura sertaneja", 
    numero: "V",
    conteudo: `A Rota dos Vaqueiros conduz o visitante pelos caminhos históricos onde o gado e o homem moldaram juntos o sertão. Entre cercas de madeira e campos de caatinga, ecoam histórias de coragem, habilidade e parceria.

As pegas de boi são momentos de emoção, tradição e prova de destreza, onde o vaqueiro mostra seu vínculo profundo com a terra e os animais.

Nesta rota, o viajante experimenta a hospitalidade sertaneja, ouve causos, prova a culinária do vaqueiro e conhece um modo de vida que continua pulsando com orgulho em Salitre.`
  },
  geodiversidade: {
    titulo: "Rota da Geodiversidade",
    subtitulo: "Milhões de anos sob seus pés",
    numero: "III", 
    conteudo: `Salitre é também um livro aberto da história da Terra. Na Rota da Geodiversidade, formações rochosas, fósseis e paisagens singulares revelam processos que começaram há milhões de anos.

Cada parada é uma aula viva: paredões, vales e afloramentos que narram mudanças climáticas, movimentos geológicos e a evolução da vida no sertão.

A rota une ciência e beleza natural, convidando à contemplação, à fotografia e à reflexão sobre a importância da geoconservação.`
  },
  fe: {
    titulo: "Rota Turística da Fé",
    subtitulo: "Caminhos de devoção, esperança e espiritualidade",
    numero: "IV",
    conteudo: `Em Salitre, a fé é parte viva do dia a dia e molda tanto o calendário de festas quanto a identidade de seu povo. A Rota Turística da Fé leva o visitante a percorrer templos, terreiros, capelas e espaços sagrados que revelam a pluralidade religiosa do município.

A tradição católica se expressa em igrejas centenárias, procissões e festas como as celebrações de padroeiros, marcadas por cânticos, novenas e a hospitalidade típica do sertão. As comunidades evangélicas, com seus cultos e encontros, também abrem as portas para compartilhar momentos de louvor e comunhão.

As tradições de matriz africana, como a Umbanda, oferecem ao visitante a oportunidade de conhecer rituais, pontos cantados e a filosofia de respeito aos ancestrais e à natureza, preservando saberes e práticas que resistem ao tempo.

Essa rota é mais do que um roteiro turístico: é um convite para viver o sertão na sua dimensão espiritual, sentir a energia de cada espaço sagrado e compreender que, em Salitre, a fé não divide, ela une.`
  }
};

export default function RotaDetail() {
  const params = useParams();
  const rotaId = params.id as string;
  const rota = rotasData[rotaId as keyof typeof rotasData];
  
  if (!rota) {
    return (
      <div className="min-h-screen bg-warm-beige text-sertao-dark">
        <Navbar />
        <main className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Rota não encontrada</h1>
            <Link href="/">
              <Button>Voltar ao início</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const allRotas = Object.keys(rotasData);
  const currentIndex = allRotas.indexOf(rotaId);
  const nextRota = allRotas[(currentIndex + 1) % allRotas.length];
  const prevRota = allRotas[(currentIndex - 1 + allRotas.length) % allRotas.length];

  return (
    <div className="min-h-screen bg-warm-beige text-sertao-dark">
      <Navbar />
      <main className="py-12">
        {/* Header */}
        <section className="px-4 mb-12">
          <div className="max-w-7xl mx-auto">
            <Link href="/">
              <Button variant="outline" className="mb-6" data-testid="button-voltar">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </Link>
            
            <div className="text-center">
              <span className="text-4xl font-bold text-orange-900 block mb-2">
                {rota.numero}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-orange-900 mb-4">
                {rota.titulo}
              </h1>
              <p className="text-xl text-orange-800 mb-8">
                {rota.subtitulo}
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Content Column */}
            <div className="lg:col-span-3">
              {/* Main Content */}
              <Card className="mb-8">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    {rota.conteudo.split('\n\n').map((paragrafo, index) => (
                      <p key={index} className="text-gray-700 mb-6 leading-relaxed">
                        {paragrafo}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Partners Section */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-orange-900 mb-6 text-center">
                    Logos dos Parceiros
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((partner) => (
                      <div 
                        key={partner}
                        className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
                      >
                        <span className="text-gray-500 text-sm">Logo {partner}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar with Other Routes */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-orange-900 mb-4">
                    Outras Rotas
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(rotasData)
                      .filter(([id]) => id !== rotaId)
                      .map(([id, rotaInfo]) => (
                      <Link key={id} href={`/rota/${id}`} data-testid={`link-rota-sidebar-${id}`}>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-left h-auto py-3 px-4"
                        >
                          <div>
                            <div className="font-semibold text-sm">
                              {rotaInfo.numero} - {rotaInfo.titulo}
                            </div>
                          </div>
                        </Button>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex gap-2">
                      <Link href={`/rota/${prevRota}`} data-testid="button-rota-anterior">
                        <Button size="sm" variant="outline">
                          <ArrowLeft className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/rota/${nextRota}`} data-testid="button-proxima-rota">
                        <Button size="sm" variant="outline">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}