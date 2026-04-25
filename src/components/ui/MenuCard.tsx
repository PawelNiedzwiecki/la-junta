import {
	Clock,
	DiamondsFour,
	ForkKnife,
	MapPin,
} from "@phosphor-icons/react/dist/ssr";
import type { DictType } from "@/app/[lang]/dictionaries";

export default function MenuCard({ dict }: { dict: DictType["menuCard"] }) {
	return (
		<section
			id="menu"
			className="relative bg-cream paper-grain px-4 sm:px-6 py-24 sm:py-28"
		>
			<div className="relative mx-auto max-w-215 pt-10 sm:pt-0">
				{/* Date stamp */}
				<div
					className="absolute right-6 sm:right-10 top-0 sm:-top-4 z-10 rotate-12
						w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber
						flex flex-col items-center justify-center
						border-[3px] border-amber-warm/30
						shadow-[0_6px_20px_-6px_rgba(139,94,60,0.6),inset_0_0_0_1px_rgba(255,255,255,0.08)]"
					aria-label={`${dict.dateDay} de ${dict.dateMonthLong}, ${dict.time}`}
					role="img"
				>
					<div className="absolute inset-[5px] rounded-full border border-cream/15 pointer-events-none" />
					<span className="text-cream text-[1.75rem] sm:text-[2rem] font-black leading-none tracking-tighter">
						{dict.dateDay}
					</span>
					<span className="font-black text-cream text-[0.55rem] sm:text-[0.6rem] mt-0.5">
						{dict.dateMonthShort}
					</span>
				</div>

				{/* Card */}
				<div className="rounded-2xl overflow-hidden ">
					{/* Zone A — stub */}
					<div className="bg-dark-card px-6 sm:px-12 pt-12 pb-10 flex flex-col items-center text-center gap-6">
						<div className="eyebrow text-amber flex items-center gap-3">
							<DiamondsFour size={14} weight="duotone" aria-hidden />
							<span>{dict.eyebrow}</span>
							<DiamondsFour size={14} weight="duotone" aria-hidden />
						</div>

						<h2 className="text-cream text-[1.9rem] sm:text-4xl md:text-[3.25rem] leading-[1.05] tracking-tight font-semibold max-w-170">
							{dict.heading}
						</h2>

						{/* Ticket detail row */}
						<div className="flex items-center justify-center gap-6 mt-2 text-[0.88rem] sm:text-[0.92rem]">
							<span className="flex items-center gap-2 text-cream/90">
								<Clock
									size={15}
									weight="duotone"
									className="text-amber shrink-0"
									aria-hidden
								/>
								<span className="font-medium tracking-wide">{dict.time}</span>
							</span>
							<span className="text-amber/40" aria-hidden>
								|
							</span>
							<span className="flex items-center gap-2 text-cream/90">
								<MapPin
									size={15}
									weight="duotone"
									className="text-amber shrink-0"
									aria-hidden
								/>
								<span>{dict.location}</span>
							</span>
						</div>
						<p className="italic text-cream/50 text-[0.8rem]">
							{dict.reminder}
						</p>
					</div>

					{/* Perforation divider — top half dark-card, bottom half zone-B colour */}
					<div className="relative h-8">
						<div className="absolute inset-x-0 top-0 h-1/2 bg-dark-card" />
						<div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#3f3525]" />
						<div className="absolute inset-x-0 top-1/2 -translate-y-px border-t border-dashed border-amber/20" />
						<div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cream" aria-hidden />
						<div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-cream" aria-hidden />
					</div>

					{/* Zone B — body stub */}
					<div className="bg-[#3f3525] px-6 sm:px-12 pt-8 pb-12 flex flex-col items-center text-center gap-6">
						<div className="hairline hairline-amber w-full max-w-xs">
							<ForkKnife
								size={15}
								weight="duotone"
								className="text-amber/70"
								aria-hidden
							/>
						</div>

						<p className="eyebrow text-amber">{dict.descriptionLabel}</p>

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
							className="text-cream/80 hover:text-amber italic text-[1.05rem] underline underline-offset-4 decoration-cream/30 transition-colors"
						>
							{dict.ctaSecondary}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
