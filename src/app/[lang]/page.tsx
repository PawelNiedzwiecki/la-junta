import { notFound } from "next/navigation";
import ReservaForm from "@/components/forms/ReservaForm";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Community from "@/components/sections/Community";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import History from "@/components/sections/History";
import Kitchen from "@/components/sections/Kitchen";
import Process from "@/components/sections/Process";
import MenuCard from "@/components/ui/MenuCard";
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
				<History dict={dict.historia} />
				<Kitchen dict={dict.cocina} />
				<Community dict={dict.comunidad} />
				<MenuCard dict={dict.menuCard} />
				<Process dict={dict.proceso} />
				<ReservaForm dict={dict.reserva} />
				<Faq dict={dict.faq} />
			</main>
			<Footer dict={dict.footer} />
		</>
	);
}
