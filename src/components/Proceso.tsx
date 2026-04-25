import {
	NumberCircleOne,
	NumberCircleTwo,
	NumberCircleThree,
	ArrowDown,
	DiamondsFour,
} from "@phosphor-icons/react/dist/ssr";
import SectionHeader from "./SectionHeader";
import type { DictType } from "@/app/[lang]/dictionaries";

const stepIcons = [NumberCircleOne, NumberCircleTwo, NumberCircleThree];

export default function Proceso({ dict }: { dict: DictType["proceso"] }) {
	return (
		<section
			id="proceso"
			className="relative bg-cream paper-grain px-6 py-24 sm:py-28"
		>
			<div className="mx-auto max-w-[1000px] flex flex-col items-center gap-14">
				<SectionHeader eyebrow={dict.eyebrow} heading={<>{dict.heading}</>} />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full mt-4">
					{dict.steps.map((s, i) => {
						const Icon = stepIcons[i];
						return (
							<div
								key={s.title}
								className="flex flex-col items-center text-center gap-5"
							>
								<div className="w-16 h-16 rounded-full bg-amber text-white flex items-center justify-center shadow-[0_15px_25px_-12px_rgba(139,94,60,0.6)]">
									<Icon size={36} weight="duotone" aria-hidden />
								</div>
								<h3 className="text-2xl sm:text-[1.6rem] text-dark font-medium">
									{s.title}
								</h3>
								<p className="text-[1rem] leading-[1.7] text-dark/85 max-w-[260px]">
									{s.body}
								</p>
							</div>
						);
					})}
				</div>

				<div className="hairline-amber hairline w-full max-w-[420px] mt-4">
					<DiamondsFour size={16} weight="duotone" className="text-amber" aria-hidden />
				</div>

				<div className="flex flex-col items-center text-center gap-5 max-w-[380px]">
					<div className="w-16 h-16 rounded-full bg-amber text-white flex items-center justify-center shadow-[0_15px_25px_-12px_rgba(139,94,60,0.6)]">
						<ArrowDown size={28} weight="duotone" aria-hidden />
					</div>
					<h3 className="text-2xl sm:text-[1.6rem] text-dark font-medium">
						{dict.finalTitle}
					</h3>
					<p className="text-[1rem] leading-[1.7] text-dark/85">
						{dict.finalBody}
					</p>
				</div>
			</div>
		</section>
	);
}
