import Image from "next/image";

export default function PergolaIllustration() {
	return (
		<Image
			src="/images/kitchen.png"
			alt="La Junta kitchen"
			width={520}
			height={390}
			style={{ width: "100%", maxWidth: 520, height: "auto" }}
			priority
		/>
	);
}
