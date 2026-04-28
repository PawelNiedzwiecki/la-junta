import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
});

export default function AdminLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" className={montserrat.variable}>
			<body className="bg-cream text-dark min-h-screen antialiased">
				{children}
			</body>
		</html>
	);
}
