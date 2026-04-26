import Image from "next/image";

type Props = { className?: string };

export default function KitchenSceneIllustration({ className = "" }: Props) {
	return (
		<Image
			src="/images/home.png"
			alt="La Junta home"
			width={520}
			height={390}
			className={className}
			priority
		/>
	);
}
