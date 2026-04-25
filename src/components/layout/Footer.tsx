import { MapPin } from "@phosphor-icons/react/dist/ssr";
import type { DictType } from "@/app/[lang]/dictionaries";

export default function Footer({ dict }: { dict: DictType["footer"] }) {
	return (
		<footer className="bg-dark text-cream/80 px-6 py-14">
			<div className="mx-auto max-w-[1100px] flex flex-col items-center gap-4 text-center">
				<div className="text-2xl font-bold">
					<span className="text-white">La </span>
					<span className="text-amber">Junta</span>
				</div>
				<p className="italic text-cream/60 text-[0.95rem]">{dict.tagline}</p>
				<p className="eyebrow text-cream/45 mt-3 flex items-center gap-2">
					<MapPin size={13} weight="duotone" aria-hidden />
					{dict.location} · {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
}
