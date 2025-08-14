import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Historia from "@/components/sections/historia";
import Quilombolas from "@/components/sections/quilombolas";
import Cultura from "@/components/sections/cultura";
import Rotas from "@/components/sections/rotas";
import Gastronomia from "@/components/sections/gastronomia";
import Religiosidade from "@/components/sections/religiosidade";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-beige text-sertao-dark">
      <Navbar />
      <main>
        <Hero />
        <Historia />
        <Quilombolas />
        <Cultura />
        <Rotas />
        <Gastronomia />
        <Religiosidade />
      </main>
      <Footer />
    </div>
  );
}
