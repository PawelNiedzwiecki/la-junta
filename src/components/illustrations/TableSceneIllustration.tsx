import Image from "next/image";

type Props = { className?: string };

export default function TableSceneIllustration({ className = "" }: Props) {
	return (
		<Image
			src="/images/table.png"
			alt="Mesa chilena con platos típicos"
			width={1340}
			height={860}
			className={className}
			sizes="(max-width: 640px) 100vw, (max-width: 960px) 90vw, 900px"
		/>
	);
}
