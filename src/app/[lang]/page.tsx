import { notFound } from "next/navigation";
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
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Home({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const dict = await getDictionary(lang);

	return (
		<>
			<Navbar dict={dict.navbar} lang={lang} />
			<main className="flex-1">
				<Hero dict={dict.hero} />
				<Historia dict={dict.historia} />
				<Cocina dict={dict.cocina} />
				<Comunidad dict={dict.comunidad} />
				<MenuCard dict={dict.menuCard} />
				<CtaBanner dict={dict.ctaBanner} />
				<Proceso dict={dict.proceso} />
				<ReservaForm dict={dict.reserva} />
				<Faq dict={dict.faq} />
			</main>
			<Footer dict={dict.footer} />
		</>
	);
}
