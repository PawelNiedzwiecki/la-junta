import { DiamondsFourIcon } from "@phosphor-icons/react/dist/ssr";

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
				<DiamondsFourIcon size={14} weight="duotone" aria-hidden />
			)}
			<span>{children}</span>
			{withDiamond && (
				<DiamondsFourIcon size={14} weight="duotone" aria-hidden />
			)}
		</div>
	);
}
