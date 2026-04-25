import { Clock, DiamondsFour, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { DictType } from "@/app/[lang]/dictionaries";

export default function MenuCard({ dict }: { dict: DictType["menuCard"] }) {
	return (
		<section
			id="menu"
			className="relative bg-dark text-cream px-6 py-24 sm:py-28"
		>
			<div className="mx-auto max-w-[900px]">
				<div className="rounded-2xl bg-dark-card border border-amber/15 px-6 sm:px-12 py-14 sm:py-16 flex flex-col items-center text-center gap-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
					<DiamondsFour size={20} weight="duotone" className="text-amber" aria-hidden />

					<p className="eyebrow text-amber">{dict.eyebrow}</p>

					<h2 className="text-cream text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.1] tracking-tight font-semibold max-w-[760px]">
						{dict.heading}
					</h2>

					<div className="mt-2 inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 rounded-full border border-amber/40 bg-amber/10 px-6 py-3 text-[0.85rem] sm:text-[0.9rem] text-cream/90 max-w-full">
						<span className="font-medium tracking-wide flex items-center gap-1.5">
							<Clock size={15} weight="duotone" className="text-amber" aria-hidden />
							{dict.time}
						</span>
						<span className="hidden sm:inline text-cream/40">·</span>
						<span className="flex items-center gap-1.5">
							<MapPin size={15} weight="duotone" className="text-amber" aria-hidden />
							{dict.location}
						</span>
						<span className="hidden sm:inline text-cream/40">·</span>
						<span className="italic text-cream/75">{dict.reminder}</span>
					</div>

					<p className="italic text-[1.1rem] sm:text-[1.2rem] leading-[1.7] text-cream/85 max-w-[640px] mt-2">
						<span className="not-italic font-semibold text-amber">
							{dict.descriptionLabel}
						</span>{" "}
						{dict.description}
					</p>

					<a
						href="/menu/menu_may.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-2 inline-flex items-center justify-center rounded-full bg-amber hover:bg-amber-warm text-white text-[0.78rem] sm:text-[0.82rem] tracking-[0.2em] uppercase font-medium px-8 sm:px-10 py-4 transition-colors"
					>
						{dict.ctaPrimary}
					</a>

					<a
						href="#reserva"
						className="text-cream/85 hover:text-amber italic text-[1.05rem] underline underline-offset-4 decoration-cream/40 transition-colors"
					>
						{dict.ctaSecondary}
					</a>
				</div>
			</div>
		</section>
	);
}
