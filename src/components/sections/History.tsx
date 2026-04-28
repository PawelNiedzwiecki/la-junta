import type { DictType } from "@/app/[lang]/dictionaries";
import TableSceneIllustration from "../illustrations/TableSceneIllustration";
import SectionHeader from "../ui/SectionHeader";

export default function History({ dict }: { dict: DictType["historia"] }) {
	return (
		<section
			id="historia"
			className="relative bg-cream paper-grain px-6 py-12 sm:py-16"
		>
			<div className="mx-auto max-w-225 flex flex-col items-center gap-10">
				<SectionHeader eyebrow={dict.eyebrow} heading={dict.heading} />

				<figure className="w-full mt-4">
					<TableSceneIllustration className="w-full h-auto block" />
				</figure>

				<div className="mt-6 flex flex-col gap-6 text-center text-[1.05rem] sm:text-[1.1rem] leading-[1.75] text-dark/90">
					<p>{dict.p1}</p>
					<p>{dict.p2}</p>
				</div>
			</div>
		</section>
	);
}
