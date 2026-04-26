import type { DictType } from "@/app/[lang]/dictionaries";

export default function CtaBanner({ dict }: { dict: DictType["ctaBanner"] }) {
	return (
		<section className="bg-cream paper-grain px-6 py-6">
			<div className="mx-auto max-w-225 flex justify-center">
				<a
					href="#reserva"
					className="inline-flex items-center justify-center rounded-full bg-dark hover:bg-[#1f190f] text-cream text-sm tracking-[0.12em] uppercase font-semibold px-10 py-4 transition-colors"
				>
					{dict.cta}
				</a>
			</div>
		</section>
	);
}
