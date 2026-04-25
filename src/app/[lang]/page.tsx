import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Historia from "@/components/sections/Historia";
import Cocina from "@/components/sections/Cocina";
import Comunidad from "@/components/sections/Comunidad";
import MenuCard from "@/components/ui/MenuCard";
import CtaBanner from "@/components/sections/CtaBanner";
import Proceso from "@/components/sections/Proceso";
import ReservaForm from "@/components/forms/ReservaForm";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/layout/Footer";
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
