import Image from "next/image";

type Props = { className?: string };

export default function KitchenSceneIllustration({ className = "" }: Props) {
	return (
		<Image
			src="/images/kitchen.png"
			alt="La Junta kitchen"
			width={520}
			height={390}
			className={className}
			priority
		/>
	);
}
