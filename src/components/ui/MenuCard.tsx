import {
	Clock,
	DiamondsFour,
	ForkKnife,
	Info,
	MapPin,
} from "@phosphor-icons/react/dist/ssr";
import type { DictType } from "@/app/[lang]/dictionaries";

export default function MenuCard({ dict }: { dict: DictType["menuCard"] }) {
	return (
		<section
			id="menu"
			className="relative bg-cream paper-grain px-4 sm:px-6 py-16 sm:py-20"
		>
			<div className="relative mx-auto max-w-215">
				{/* Card */}
				<div className="rounded-2xl border-2 border-dashed border-cream/20">
					{/* Zone A — stub */}
					<div className="bg-dark-card rounded-t-[14px] px-6 sm:px-10 pt-12 pb-10 flex flex-col items-center text-center gap-6">
						<div className="eyebrow text-amber flex items-center gap-3">
							<DiamondsFour size={14} weight="duotone" aria-hidden />
							<span>{dict.eyebrow}</span>
							<DiamondsFour size={14} weight="duotone" aria-hidden />
						</div>

						<h2 className="text-cream text-[1.9rem] sm:text-4xl md:text-4xl leading-[1.05] tracking-tight font-semibold max-w-170">
							{dict.heading}
						</h2>

						{/* Ticket detail row */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 mt-2 text-[0.88rem] sm:text-[0.92rem] sm:bg-[#3f3525] sm:rounded-full sm:px-4 sm:py-2">
							<span className="flex items-center justify-center gap-2 text-cream/90 bg-[#3f3525] sm:bg-transparent rounded-full px-4 py-2 w-full sm:w-auto">
								<Clock
									size={16}
									weight="duotone"
									className="text-cream shrink-0"
									aria-hidden
								/>
								<span className="font-semibold tracking-wide">{dict.time}</span>
							</span>
							<span className="text-amber/40 hidden sm:inline" aria-hidden>|</span>
							<span className="flex items-center justify-center gap-2 text-cream/90 bg-[#3f3525] sm:bg-transparent rounded-full px-4 py-2 w-full sm:w-auto">
								<MapPin
									size={16}
									weight="duotone"
									className="text-cream shrink-0"
									aria-hidden
								/>
								<span className="font-semibold tracking-wide">{dict.location}</span>
							</span>
						</div>
						<p className="flex items-center gap-1.5 italic text-cream/50 text-[0.8rem] bg-cream/5 border border-cream/10 rounded-full px-3 py-1.5">
							<Info
								size={13}
								weight="duotone"
								className="shrink-0"
								aria-hidden
							/>
							{dict.reminder}
						</p>
					</div>

					{/* Perforation divider — top half dark-card, bottom half zone-B colour */}
					<div className="relative h-8">
						<div className="absolute inset-x-0 top-0 h-1/2 bg-dark-card" />
						<div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#3f3525]" />
						<div className="absolute inset-x-0 top-1/2 -translate-y-px border-t-2 border-dashed border-cream/50" />
						<div
							className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cream"
							aria-hidden
						/>
						<div
							className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cream"
							aria-hidden
						/>
					</div>

					{/* Zone B — body stub */}
					<div className="bg-[#3f3525] rounded-b-[14px] px-6 sm:px-12 pt-8 pb-12 flex flex-col items-center text-center gap-6">
						<div className="hairline hairline-amber w-full max-w-xs">
							<ForkKnife
								size={20}
								weight="duotone"
								className="text-cream/50"
								aria-hidden
							/>
						</div>

						<p className="eyebrow text-cream/50">{dict.descriptionLabel}</p>

						<p className="italic text-[1.1rem] sm:text-[1.2rem] leading-[1.85] text-cream/90 max-w-140">
							{dict.description}
						</p>

						<div className="w-16 border-t border-amber/20" />

						<a
							href="/menu/menu_may.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center gap-2 rounded-full bg-amber hover:bg-amber-warm text-white text-[0.78rem] sm:text-[0.82rem] tracking-[0.2em] uppercase font-medium px-8 sm:px-10 py-4 transition-colors"
						>
							{dict.ctaPrimary}
							<span aria-hidden>→</span>
						</a>

						<a
							href="#reserva"
							className="text-cream/80 hover:text-cream italic text-[1.05rem] underline underline-offset-4 decoration-cream/30 transition-colors"
						>
							{dict.ctaSecondary}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
