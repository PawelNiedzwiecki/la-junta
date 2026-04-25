import Image from "next/image";

type Props = { className?: string };

export default function PergolaIllustration({ className = "" }: Props) {
	return (
		<Image
			src="/images/kitchen.png"
			alt="La Junta kitchen"
			width={520}
			height={390}
			className={className}
			style={{ height: "auto" }}
			priority
		/>
	);
}
