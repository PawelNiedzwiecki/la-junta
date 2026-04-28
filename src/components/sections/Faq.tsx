import SectionHeader from "../ui/SectionHeader";
import type { DictType } from "@/app/[lang]/dictionaries";

export default function Faq({ dict }: { dict: DictType["faq"] }) {
	return (
		<section
			id="faq"
			className="relative bg-cream paper-grain px-6 py-16 sm:py-20"
		>
			<div className="mx-auto max-w-215 flex flex-col items-center gap-10">
				<SectionHeader
					eyebrow={dict.eyebrow}
					heading={<>{dict.heading}</>}
					withRules
				/>

				<div className="w-full mt-6 border-t border-dark/15">
					{dict.items.map((it) => (
						<details
							key={it.q}
							className="group border-b border-dark/15 py-5 sm:py-6"
						>
							<summary className="flex items-center justify-between gap-6 list-none">
								<span className="text-[1.15rem] sm:text-[1.3rem] text-dark text-left leading-snug pr-4 font-bold">
									{it.q}
								</span>
								<span className="text-amber accordion-icon" aria-hidden />
							</summary>
							<div className="mt-4 text-[1.02rem] sm:text-[1.08rem] leading-[1.75] text-dark/85 max-w-180">
								{it.a}
							</div>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
