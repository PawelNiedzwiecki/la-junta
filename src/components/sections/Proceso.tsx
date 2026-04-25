import { Wine, DiamondsFour } from "@phosphor-icons/react/dist/ssr";
import SectionHeader from "../ui/SectionHeader";
import type { DictType } from "@/app/[lang]/dictionaries";

export default function Proceso({ dict }: { dict: DictType["proceso"] }) {
	return (
		<section
			id="proceso"
			className="relative bg-cream paper-grain px-6 py-20 sm:py-28"
		>
			<div className="mx-auto max-w-xl flex flex-col items-center gap-12">
				<SectionHeader eyebrow={dict.eyebrow} heading={<>{dict.heading}</>} />

				<ol className="w-full flex flex-col gap-0">
					{dict.steps.map((s, i) => (
						<li key={s.title}>
							<div className="flex items-start gap-5">
								<div className="relative flex-shrink-0 w-14 flex items-center justify-center">
									<span
										className="absolute -left-1 text-[6rem] font-black text-amber/15 leading-none select-none pointer-events-none"
										aria-hidden
									>
										{i + 1}
									</span>
									<div className="relative z-10 w-8 h-8 rounded-full bg-amber flex items-center justify-center shadow-[0_6px_16px_-4px_rgba(139,94,60,0.45)]">
										<span className="text-cream text-xs font-bold">{i + 1}</span>
									</div>
								</div>
								<div className="pt-1">
									<h3 className="text-base font-semibold text-dark leading-snug">
										{s.title}
									</h3>
									<p className="mt-1 text-sm leading-relaxed text-muted">
										{s.body}
									</p>
								</div>
							</div>
							{i < dict.steps.length - 1 && (
								<div className="ml-[1.175rem] h-7 border-l border-amber/25" />
							)}
						</li>
					))}
				</ol>

				<div className="hairline-amber hairline w-full max-w-xs">
					<DiamondsFour size={14} weight="duotone" className="text-amber" aria-hidden />
				</div>

				<div className="w-full bg-dark-card rounded-2xl px-6 py-8 flex flex-col gap-4">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
							<Wine size={16} weight="duotone" className="text-amber" aria-hidden />
						</div>
						<h3 className="text-lg font-semibold text-cream">
							{dict.finalTitle}
						</h3>
					</div>
					<p className="text-sm leading-relaxed text-cream/70">
						{dict.finalBody}
					</p>
					<a
						href="#reserva"
						className="mt-2 w-full sm:w-auto self-start inline-block text-center bg-amber hover:bg-amber-warm transition-colors text-cream text-sm font-semibold rounded-full py-3 px-8"
					>
						Reserva tu lugar →
					</a>
				</div>
			</div>
		</section>
	);
}
