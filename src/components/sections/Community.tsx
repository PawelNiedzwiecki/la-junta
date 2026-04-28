import { DiamondsFour } from "@phosphor-icons/react/dist/ssr";
import type { DictType } from "@/app/[lang]/dictionaries";
import SectionHeader from "../ui/SectionHeader";

export default function Community({ dict }: { dict: DictType["comunidad"] }) {
	return (
		<section
			id="comunidad"
			className="relative bg-cream paper-grain px-6 py-12 sm:py-16"
		>
			<div className="mx-auto max-w-205 flex flex-col items-center gap-10">
				<SectionHeader eyebrow={dict.eyebrow} heading={dict.heading} />

				<div className="hairline-amber hairline w-full max-w-75">
					<DiamondsFour
						size={16}
						weight="duotone"
						className="text-amber"
						aria-hidden
					/>
				</div>
				<div className="mt-2 flex flex-col gap-6 text-center text-[1.05rem] sm:text-[1.1rem] leading-[1.75] text-dark/90">
					<p>{dict.p1}</p>
					<p>
						{dict.p2Pre}
						<span className="text-amber font-semibold">{dict.p2Emphasis}</span>
						{dict.p2Post}
					</p>
				</div>
			</div>
		</section>
	);
}
