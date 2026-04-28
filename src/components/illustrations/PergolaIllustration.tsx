import Image from "next/image";

export default function PergolaIllustration() {
	return (
		<Image
			src="/images/logo.png"
			alt="La Junta logo"
			width={520}
			height={390}
			className="w-full max-w-225 h-auto object-contain"
			priority
		/>
	);
}
