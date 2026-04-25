import { CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { DictType } from "@/app/[lang]/dictionaries";
import LangSwitcher from "./LangSwitcher";

type NavbarDict = DictType["navbar"];

export default function Navbar({
	dict,
	lang,
}: {
	dict: NavbarDict;
	lang: string;
}) {
	const navLinks = [
		{ label: dict.links.nosotros, href: "#historia" },
		{ label: dict.links.experiencia, href: "#comunidad" },
		{ label: dict.links.cocina, href: "#cocina" },
		{ label: dict.links.como_funciona, href: "#proceso" },
		{ label: dict.links.preguntas, href: "#faq" },
	];

	return (
		<header className="sticky top-0 z-50 bg-dark text-cream border-b border-black/30">
			<div className="mx-auto max-w-[1200px] px-6 lg:px-10">
				{/* Top row: logo + tagline, centered */}
				<div className="pt-5 pb-3 flex flex-col items-center gap-1.5">
					<Link
						href="#top"
						className="text-3xl sm:text-[2rem] tracking-tight leading-none font-bold"
					>
						<span className="text-white">La </span>
						<span className="text-amber">Junta</span>
					</Link>
					<p className="italic text-cream/70 text-[0.78rem] sm:text-[0.85rem]">
						{dict.tagline}
					</p>
				</div>

				{/* Bottom row: nav + CTA */}
				<div className="border-t border-white/10 py-3 flex items-center justify-between gap-4">
					<LangSwitcher
						currentLang={lang}
						label={dict.switchLabel}
						className="hidden md:block w-[7.5rem] text-cream/60 hover:text-amber text-[0.75rem] tracking-[0.15em] uppercase transition-colors"
					/>
					<nav className="flex-1 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.82rem] tracking-wide text-cream/85">
						{navLinks.map((l, i) => (
							<span key={l.href} className="flex items-center gap-x-7">
								<a href={l.href} className="hover:text-amber transition-colors">
									{l.label}
								</a>
								{i < navLinks.length - 1 && (
									<span className="text-cream/30 select-none" aria-hidden>
										·
									</span>
								)}
							</span>
						))}
					</nav>
					<a
						href="/menu/menu_may.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-amber hover:bg-amber-warm text-white text-[0.72rem] tracking-[0.18em] uppercase font-medium px-5 py-2.5 transition-colors whitespace-nowrap"
					>
						<CalendarCheck size={14} weight="duotone" aria-hidden />
						<span>{dict.cta}</span>
					</a>
				</div>
			</div>
		</header>
	);
}
