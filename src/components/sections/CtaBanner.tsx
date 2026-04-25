import type { DictType } from "@/app/[lang]/dictionaries";

export default function CtaBanner({ dict }: { dict: DictType["ctaBanner"] }) {
	return (
		<section className="bg-cream paper-grain px-6 py-20 sm:py-24">
			<div className="mx-auto max-w-[900px] flex justify-center">
				<a
					href="#reserva"
					className="inline-flex items-center justify-center rounded-full bg-dark hover:bg-[#1f190f] text-amber text-[0.85rem] sm:text-[0.95rem] tracking-[0.22em] uppercase font-semibold px-12 sm:px-16 py-5 sm:py-6 transition-colors shadow-[0_20px_40px_-20px_rgba(45,36,22,0.4)]"
				>
					{dict.cta}
				</a>
			</div>
		</section>
	);
}
