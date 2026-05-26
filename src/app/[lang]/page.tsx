import { notFound } from "next/navigation";
import { getEventConfig } from "@/app/actions/getEventConfig";
import { getMenuUrl } from "@/app/actions/getMenuUrl";
import BookingForm from "@/components/forms/BookingForm";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Community from "@/components/sections/Community";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import History from "@/components/sections/History";
import Kitchen from "@/components/sections/Kitchen";
import Process from "@/components/sections/Process";
import MenuCard from "@/components/ui/MenuCard";
import { type DictType, getDictionary, hasLocale } from "./dictionaries";

export const dynamic = "force-dynamic";

function applyEventConfig(
	dict: DictType,
	dateStr: string,
	description?: string,
): DictType {
	const replace = (s: string) => s.replace("{eventDate}", dateStr);
	return {
		...dict,
		menuCard: {
			...dict.menuCard,
			heading: replace(dict.menuCard.heading),
			...(description?.trim() ? { description } : {}),
		},
		reserva: { ...dict.reserva, heading: replace(dict.reserva.heading) },
	};
}

export default async function Home({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!hasLocale(lang)) notFound();
	const [dict, menuUrl, eventConfig] = await Promise.all([
		getDictionary(lang),
		getMenuUrl(),
		getEventConfig(),
	]);

	const resolvedDict = applyEventConfig(
		dict,
		lang === "es" ? eventConfig.date : eventConfig.dateEn,
		lang === "es" ? eventConfig.description : eventConfig.descriptionEn,
	);

	return (
		<>
			<Navbar dict={resolvedDict.navbar} lang={lang} menuUrl={menuUrl} />
			<main className="flex-1">
				<Hero dict={resolvedDict.hero} />
				<History dict={resolvedDict.historia} />
				<Kitchen dict={resolvedDict.cocina} />
				<Community dict={resolvedDict.comunidad} />
				<MenuCard dict={resolvedDict.menuCard} menuUrl={menuUrl} />
				<Process dict={resolvedDict.proceso} />
				<BookingForm dict={resolvedDict.reserva} />
				<Faq dict={resolvedDict.faq} />
			</main>
			<Footer dict={resolvedDict.footer} />
		</>
	);
}
