import SectionHeader from "./SectionHeader";
import TableSceneIllustration from "./TableSceneIllustration";
import type { DictType } from "@/app/[lang]/dictionaries";

export default function Historia({ dict }: { dict: DictType["historia"] }) {
	return (
		<section
			id="historia"
			className="relative bg-cream paper-grain px-6 py-24 sm:py-28"
		>
			<div className="mx-auto max-w-[900px] flex flex-col items-center gap-10">
				<SectionHeader
					eyebrow={dict.eyebrow}
					heading={<>{dict.heading}</>}
				/>

				<figure className="w-full mt-4">
					<div className="overflow-hidden">
						<TableSceneIllustration className="w-full h-auto block" />
					</div>
					<figcaption className="eyebrow mt-4 text-center text-muted/80">
						{dict.caption}
					</figcaption>
				</figure>

				<div className="mt-6 flex flex-col gap-6 text-center text-[1.05rem] sm:text-[1.1rem] leading-[1.75] text-dark/90">
					<p>{dict.p1}</p>
					<p>{dict.p2}</p>
					<p>
						<span className="font-semibold">{dict.p3Emphasis}</span>{" "}
						{dict.p3Tail}
					</p>
				</div>
			</div>
		</section>
	);
}
