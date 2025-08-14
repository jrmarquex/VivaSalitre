import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Settings } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { href: "#historia", label: "História & Tradições" },
    { href: "#quilombolas", label: "Comunidades Quilombolas" },
    { href: "#cultura", label: "Cultura & Folclore" },
    { href: "#rotas", label: "Rotas Turísticas" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500"
              alt="Hospitalidade salitrense"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
          <div>
            <h2 className="text-4xl font-serif font-bold text-sertao-brown mb-6">
              Hospitalidade Sertaneja
            </h2>
            <p className="text-xl text-sertao-medium leading-relaxed mb-8">
              <span className="font-accent text-2xl text-sertao-brown">"</span>
              E quando a noite cai, a hospitalidade do povo salitrense brilha: seja numa conversa à sombra de um pé de umbuzeiro, seja no acolhimento caloroso que só o sertão sabe oferecer.
              <span className="font-accent text-2xl text-sertao-brown">"</span>
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-terra-cotta mr-4" />
                <span className="text-sertao-dark">Acolhimento genuíno e caloroso</span>
              </div>
              <div className="flex items-center">
                <TreePine className="h-5 w-5 text-terra-cotta mr-4" />
                <span className="text-sertao-dark">Conversas à sombra dos umbuzeiros</span>
              </div>
              <div className="flex items-center">
                <Moon className="h-5 w-5 text-terra-cotta mr-4" />
                <span className="text-sertao-dark">Noites estreladas no sertão</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-sertao-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-golden-sand mb-6">
                Contato
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-golden-sand mr-3" />
                  <span>Salitre, Ceará - Brasil</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-golden-sand mr-3" />
                  <span>contato@salitre.ce.gov.br</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-golden-sand mr-3" />
                  <span>(88) 3000-0000</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-golden-sand mb-6">
                Links Rápidos
              </h3>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    data-testid={`footer-link-${link.href.replace("#", "")}`}
                    className="block hover:text-golden-sand transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ))}
                <Link to="/admin">
                  <span className="block hover:text-golden-sand transition-colors cursor-pointer">
                    Área Administrativa
                  </span>
                </Link>
              </div>
            </div>

            {/* Admin Panel Info */}
            <div>
              <h3 className="text-2xl font-serif font-bold text-golden-sand mb-6">
                Gestão de Conteúdo
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Acesse a área administrativa para adicionar novos conteúdos, inserir imagens e gerenciar as informações do site.
              </p>
              <Link to="/admin">
                <Button
                  data-testid="button-access-admin"
                  className="bg-golden-sand hover:bg-terra-cotta text-white font-medium"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Acessar Admin
                </Button>
              </Link>
            </div>
          </div>

          <div className="border-t border-sertao-medium pt-8 mt-12 text-center">
            <p className="text-gray-400">
              © 2024 Prefeitura Municipal de Salitre. Todos os direitos reservados. |{" "}
              <span className="text-golden-sand">Capital da Mandioca</span>
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function TreePine({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L8 8h8l-4-6zM12 8L8 14h8l-4-6zM12 14L8 20h8l-4-6zM12 20v2" />
    </svg>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}
