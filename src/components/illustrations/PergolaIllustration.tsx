import Image from "next/image";

export default function PergolaIllustration() {
	return (
		<Image
			src="/images/kitchen.png"
			alt="La Junta kitchen"
			width={520}
			height={390}
			className="w-full max-w-225 h-auto object-contain"
			priority
		/>
	);
}
