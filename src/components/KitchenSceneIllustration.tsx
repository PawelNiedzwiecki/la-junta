type Props = { className?: string };

export default function KitchenSceneIllustration({ className = "" }: Props) {
	return (
		<div
			className={`flex items-center justify-center bg-amber/10 border border-amber/20 text-muted/60 ${className}`}
			style={{ aspectRatio: "16 / 7" }}
			role="img"
		aria-label="Kitchen scene illustration placeholder"
		>
			<span className="font-sans text-xs tracking-widest uppercase">
				Illustration · Kitchen Scene
			</span>
		</div>
	);
}
