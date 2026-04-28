import { DiamondsFour } from "@phosphor-icons/react/dist/ssr";

type Props = {
	children: React.ReactNode;
	withDiamond?: boolean;
	className?: string;
};

export default function Eyebrow({
	children,
	withDiamond = false,
	className = "",
}: Props) {
	return (
		<div
			className={`eyebrow text-muted flex items-center justify-center gap-3 ${className}`}
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
