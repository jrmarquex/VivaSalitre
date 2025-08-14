import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#inicio", label: "Início" },
    { href: "#historia", label: "História & Tradições" },
    { href: "#quilombolas", label: "Comunidades Quilombolas" },
    { href: "#cultura", label: "Cultura & Folclore" },
    { href: "#rotas", label: "Rotas Turísticas" },
    { href: "#gastronomia", label: "Gastronomia" },
    { href: "#religiosidade", label: "Religiosidade" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Admin Access Button */}
      <Link to="/admin">
        <Button
          data-testid="admin-access-button"
          className="fixed bottom-8 right-8 z-50 bg-sertao-brown hover:bg-terra-cotta text-white p-4 rounded-full shadow-lg"
          size="sm"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </Link>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-serif font-bold text-sertao-brown">
                Salitre
                <span className="block text-sm font-sans font-normal text-sertao-medium">
                  Capital da Mandioca
                </span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    data-testid={`nav-link-${item.href.replace("#", "")}`}
                    className="nav-link text-sertao-dark hover:text-sertao-brown px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                data-testid="mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-sertao-dark hover:text-sertao-brown focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-warm-beige">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  data-testid={`mobile-nav-link-${item.href.replace("#", "")}`}
                  className="block px-3 py-2 text-base font-medium text-sertao-dark hover:text-sertao-brown w-full text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
