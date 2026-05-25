import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	style: ["normal", "italic"],
	display: "swap",
});

export async function generateStaticParams() {
	return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}): Promise<Metadata> {
	const { lang } = await params;
	if (!hasLocale(lang)) return {};
	const dict = await getDictionary(lang as Locale);
	return {
		title: dict.meta.title,
		description: dict.meta.description,
	};
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	return (
		<html lang={lang} className={montserrat.variable}>
			<body className="bg-cream text-dark min-h-screen flex flex-col antialiased">
				<a
					href="#top"
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-dark focus:text-cream focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-amber"
				>
					Skip to content
				</a>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
