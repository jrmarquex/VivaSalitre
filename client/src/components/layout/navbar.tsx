import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function Navbar() {

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
            <Link href="/">
              <div className="flex-shrink-0 cursor-pointer">
                <h1 className="text-2xl font-serif font-bold text-sertao-brown">
                  Salitre
                  <span className="block text-sm font-sans font-normal text-sertao-medium">
                    Capital da Mandioca
                  </span>
                </h1>
              </div>
            </Link>

            {/* Simple Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/">
                  <button
                    data-testid="nav-link-home"
                    className="nav-link text-sertao-dark hover:text-sertao-brown px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Início
                  </button>
                </Link>
                <Link href="/admin">
                  <button
                    data-testid="nav-link-admin"
                    className="nav-link text-sertao-dark hover:text-sertao-brown px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Admin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
