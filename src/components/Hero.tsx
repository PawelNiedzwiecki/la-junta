import { DiamondsFour } from "@phosphor-icons/react/dist/ssr";
import Eyebrow from "./Eyebrow";
import PergolaIllustration from "./PergolaIllustration";
import type { DictType } from "@/app/[lang]/dictionaries";

export default function Hero({ dict }: { dict: DictType["hero"] }) {
	return (
		<section
			id="top"
			className="relative bg-cream paper-grain px-6 pt-20 pb-24 sm:pt-24 sm:pb-28"
		>
			<div className="mx-auto max-w-[900px] flex flex-col items-center text-center gap-8">
				<Eyebrow>{dict.eyebrow}</Eyebrow>

				<PergolaIllustration className="w-full max-w-[520px] h-auto" />

				<h1 className="tracking-tight leading-[0.95] text-[4.5rem] sm:text-[6rem] md:text-[7.5rem]">
					<span className="text-dark font-medium">La </span>
					<span className="text-amber italic font-medium">Junta</span>
				</h1>

				<div className="hairline-amber hairline w-full max-w-[420px]">
					<DiamondsFour size={16} weight="duotone" className="text-amber" aria-hidden />
				</div>

				<p className="text-2xl sm:text-[1.7rem] leading-snug text-dark max-w-[640px]">
					{dict.subPre}
					<span className="font-semibold text-amber">{dict.subEmphasis}</span>
				</p>

				<p className="italic text-lg sm:text-xl text-muted/90 max-w-[560px]">
					{dict.tagline}
				</p>
			</div>
		</section>
	);
}
