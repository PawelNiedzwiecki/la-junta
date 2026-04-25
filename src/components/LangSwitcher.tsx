"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitcher({
	currentLang,
	label,
	className,
}: {
	currentLang: string;
	label: string;
	className?: string;
}) {
	const pathname = usePathname();
	const targetLang = currentLang === "es" ? "en" : "es";
	const targetPath = pathname.replace(`/${currentLang}`, `/${targetLang}`);

	return (
		<Link href={targetPath} className={className}>
			{label}
		</Link>
	);
}
