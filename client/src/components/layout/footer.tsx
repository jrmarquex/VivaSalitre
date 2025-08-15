import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Settings } from "lucide-react";

export default function Footer() {
  return (
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
              <Link href="/">
                <span className="block hover:text-golden-sand transition-colors cursor-pointer">
                  Início
                </span>
              </Link>
              <Link href="/admin">
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
            <Link href="/admin">
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
  );
}