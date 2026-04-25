import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Historia from "@/components/Historia";
import Cocina from "@/components/Cocina";
import Comunidad from "@/components/Comunidad";
import MenuCard from "@/components/MenuCard";
import CtaBanner from "@/components/CtaBanner";
import Proceso from "@/components/Proceso";
import ReservaForm from "@/components/ReservaForm";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Historia />
        <Cocina />
        <Comunidad />
        <MenuCard />
        <CtaBanner />
        <Proceso />
        <ReservaForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
