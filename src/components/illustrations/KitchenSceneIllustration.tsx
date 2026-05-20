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
			sizes="(max-width: 640px) 100vw, (max-width: 960px) 90vw, 900px"
		/>
	);
}
