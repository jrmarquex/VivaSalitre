import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight animate-fadeIn">
          Salitre
          <span className="block text-3xl md:text-4xl text-golden-sand font-accent mt-2">
            Capital da Mandioca
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 leading-relaxed font-light animate-fadeIn">
          No coração do sertão cearense, onde história, cultura e tradição se entrelaçam em cada grão de areia
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
          <Button
            onClick={() => scrollToSection("historia")}
            data-testid="button-explore-historia"
            className="bg-golden-sand hover:bg-terra-cotta text-white px-8 py-4 text-lg font-medium"
            size="lg"
          >
            Explore Nossa História
          </Button>
          <Button
            onClick={() => scrollToSection("quilombolas")}
            data-testid="button-explore-quilombolas"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-sertao-dark px-8 py-4 text-lg font-medium"
            size="lg"
          >
            Conheça as Comunidades
          </Button>
        </div>
      </div>
    </section>
  );
}
