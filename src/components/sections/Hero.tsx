import { DiamondsFour } from "@phosphor-icons/react/dist/ssr";
import type { DictType } from "@/app/[lang]/dictionaries";
import PergolaIllustration from "../illustrations/PergolaIllustration";
import Eyebrow from "../ui/Eyebrow";

export default function Hero({ dict }: { dict: DictType["hero"] }) {
	return (
		<section
			id="top"
			className="relative bg-cream paper-grain px-6 pt-10 pb-14 sm:pt-14 sm:pb-18"
		>
			<div className="mx-auto max-w-225 flex flex-col items-center text-center">
				<Eyebrow className="mb-6">{dict.eyebrow}</Eyebrow>

				<h1 className="tracking-tight leading-none mb-2 text-[3rem] sm:text-[4.5rem] md:text-[6rem]">
					<span className="text-dark font-extralight">La </span>
					<span className="text-amber font-bold">Junta</span>
				</h1>

				<div className="hairline-amber hairline w-full max-w-60 mb-6">
					<DiamondsFour
						size={14}
						weight="duotone"
						className="text-amber"
						aria-hidden
					/>
				</div>

				<div className="w-full mb-8">
					<PergolaIllustration />
				</div>

				<p className="text-xl sm:text-2xl leading-snug text-dark max-w-140 mb-4">
					{dict.subPre}
					<span className="font-semibold text-amber">{dict.subEmphasis}</span>
				</p>

				<p className="italic text-base sm:text-lg text-muted/80 max-w-120">
					{dict.tagline}
				</p>
			</div>
		</section>
	);
}
