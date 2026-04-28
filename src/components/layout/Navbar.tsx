import { CalendarCheck, List, X } from "@phosphor-icons/react/dist/ssr";
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
			<div className="mx-auto max-w-300 px-5 lg:px-10">
				{/* ── Desktop top row ── */}
				<div className="hidden md:flex pt-5 pb-3 flex-col items-center gap-1.5">
					<Link
						href="#top"
						className="text-[2rem] tracking-tight leading-none font-bold"
					>
						<span className="text-cream font-extralight">La </span>
						<span className="text-amber">Junta</span>
					</Link>
					<p className="italic text-cream/70 text-[0.85rem]">{dict.tagline}</p>
				</div>

				{/* ── Desktop nav row ── */}
				<div className="hidden md:flex border-t border-white/10 py-3 items-center justify-between gap-4">
					<LangSwitcher
						currentLang={lang}
						label={dict.switchLabel}
						className="w-30 text-cream/60 hover:text-cream text-[0.75rem] tracking-[0.15em] uppercase transition-colors"
					/>
					<nav className="flex-1 flex items-center justify-center gap-x-7 text-[0.82rem] tracking-wide text-cream/85">
						{navLinks.map((l, i) => (
							<span key={l.href} className="flex items-center gap-x-7">
								<a href={l.href} className="hover:text-cream transition-colors">
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
						className="inline-flex items-center justify-center gap-2 rounded-full bg-amber hover:bg-amber-warm text-white text-[0.72rem] tracking-[0.18em] uppercase font-medium px-5 py-2.5 transition-colors whitespace-nowrap"
					>
						<span>{dict.cta}</span>
					</a>
				</div>

				{/* ── Mobile bar ── */}
				<details className="md:hidden group">
					<summary className="flex items-center justify-between py-3.5 list-none cursor-pointer">
						{/* Logo */}
						<Link
							href="#top"
							className="text-[1.45rem] tracking-tight leading-none font-bold"
						>
							<span className="text-white">La </span>
							<span className="text-amber">Junta</span>
						</Link>

						{/* Hamburger / close icons */}
						<span className="text-cream/80" aria-hidden>
							<List size={22} weight="bold" className="group-open:hidden" />
							<X size={22} weight="bold" className="hidden group-open:block" />
						</span>
					</summary>

					{/* Dropdown */}
					<div className="border-t border-white/10 pb-4 pt-2 flex flex-col gap-1">
						{navLinks.map((l) => (
							<a
								key={l.href}
								href={l.href}
								className="px-1 py-2.5 text-[0.95rem] text-cream/85 hover:text-cream transition-colors"
							>
								{l.label}
							</a>
						))}
						<div className="mt-3 flex items-center justify-between gap-3">
							<LangSwitcher
								currentLang={lang}
								label={dict.switchLabel}
								className="text-cream/60 hover:text-cream text-[0.75rem] tracking-[0.15em] uppercase transition-colors"
							/>
							<a
								href="/menu/menu_may.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-full bg-amber hover:bg-amber-warm text-white text-[0.72rem] tracking-[0.18em] uppercase font-medium px-5 py-2.5 transition-colors"
							>
								<CalendarCheck size={13} weight="duotone" aria-hidden />
								<span>{dict.cta}</span>
							</a>
						</div>
					</div>
				</details>
			</div>
		</header>
	);
}
