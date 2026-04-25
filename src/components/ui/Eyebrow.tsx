import { DiamondsFour } from "@phosphor-icons/react/dist/ssr";

type Props = {
	children: React.ReactNode;
	withDiamond?: boolean;
	className?: string;
	tone?: "muted" | "amber";
};

export default function Eyebrow({
	children,
	withDiamond = false,
	className = "",
	tone = "muted",
}: Props) {
	const color = tone === "amber" ? "text-amber" : "text-muted";
	return (
		<div
			className={`eyebrow ${color} flex items-center justify-center gap-3 ${className}`}
		>
			{withDiamond && (
				<DiamondsFour size={14} weight="duotone" aria-hidden />
			)}
			<span>{children}</span>
			{withDiamond && (
				<DiamondsFour size={14} weight="duotone" aria-hidden />
			)}
		</div>
	);
}
