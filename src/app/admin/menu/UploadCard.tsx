"use client";

import {
	DiamondsFourIcon,
	FilePdfIcon,
	UploadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error" | "wrong-password";

type Props = {
	password: string;
	onPasswordChange: (v: string) => void;
	status: UploadStatus;
	onStatusChange: (s: UploadStatus) => void;
	fileName: string | null;
	uploadedUrl: string | null;
	onUpload: (file: File) => void;
};

export function UploadCard({
	password,
	onPasswordChange,
	status,
	onStatusChange,
	fileName,
	uploadedUrl,
	onUpload,
}: Props) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dragOverRef = useRef(false);

	function handleDrop(e: React.DragEvent) {
		e.preventDefault();
		dragOverRef.current = false;
		const file = e.dataTransfer.files?.[0];
		if (file) onUpload(file);
	}

	return (
		<div
			className="rounded-2xl overflow-visible relative"
			style={{
				boxShadow:
					"0 4px 6px -1px rgba(44,36,22,0.08), 0 20px 60px -10px rgba(44,36,22,0.18)",
			}}
		>
			{/* Top zone */}
			<div
				className="rounded-t-2xl px-10 pt-12 pb-8 flex flex-col items-center text-center gap-5"
				style={{ background: "var(--color-dark-card)" }}
			>
				<div
					className="flex items-center gap-3 text-[0.68rem] font-medium tracking-[0.22em] uppercase"
					style={{ color: "var(--color-amber)" }}
				>
					<DiamondsFourIcon size={12} weight="duotone" aria-hidden />
					<span>La Junta</span>
					<DiamondsFourIcon size={12} weight="duotone" aria-hidden />
				</div>
				<div className="flex flex-col gap-2">
					<h1
						className="text-[1.75rem] font-semibold tracking-tight leading-[1.1]"
						style={{ color: "var(--color-cream)" }}
					>
						Update the menu
					</h1>
					<p
						className="text-[0.85rem] leading-relaxed max-w-65 mx-auto"
						style={{ color: "rgba(250,245,236,0.45)" }}
					>
						Drop a new PDF below — the menu button on the site updates instantly.
					</p>
				</div>
			</div>

			{/* Perforation */}
			<div
				className="relative"
				style={{
					borderTop: "2px dashed rgba(250,245,236,0.25)",
					background: "#3f3525",
				}}
			/>

			{/* Bottom zone */}
			<div
				className="rounded-b-2xl px-10 pt-10 pb-10 flex flex-col gap-5"
				style={{ background: "#3f3525" }}
			>
				{/* Password */}
				<div className="flex flex-col gap-2">
					<label
						htmlFor="password"
						className="text-[0.68rem] font-medium tracking-[0.18em] uppercase"
						style={{ color: "rgba(250,245,236,0.45)" }}
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => {
							onPasswordChange(e.target.value);
							if (status === "wrong-password") onStatusChange("idle");
						}}
						placeholder="Enter admin password"
						className="w-full rounded-lg px-4 py-3 text-[0.9rem] transition-colors font-[inherit] outline-none"
						style={{
							background: "rgba(250,245,236,0.06)",
							border: `1px solid ${status === "wrong-password" ? "rgba(248,113,113,0.5)" : "rgba(250,245,236,0.12)"}`,
							color: "var(--color-cream)",
						}}
						onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(139,69,19,0.6)"; }}
						onBlur={(e) => {
							e.currentTarget.style.borderColor =
								status === "wrong-password" ? "rgba(248,113,113,0.5)" : "rgba(250,245,236,0.12)";
						}}
					/>
					{status === "wrong-password" && (
						<p className="text-[0.78rem]" style={{ color: "rgb(248,113,113)" }}>
							Wrong password.
						</p>
					)}
				</div>

				{/* Drop zone */}
				<button
					type="button"
					onClick={() => fileInputRef.current?.click()}
					onDragOver={(e) => { e.preventDefault(); }}
					onDragLeave={() => {}}
					onDrop={handleDrop}
					disabled={status === "uploading"}
					className="w-full rounded-xl flex flex-col items-center gap-3 py-10 px-6 transition-all"
					style={{
						border: "2px dashed rgba(250,245,236,0.18)",
						background: "rgba(250,245,236,0.03)",
						cursor: status === "uploading" ? "not-allowed" : "pointer",
						opacity: status === "uploading" ? 0.6 : 1,
					}}
				>
					{status === "uploading" ? (
						<>
							<UploadSimpleIcon
								size={26}
								weight="duotone"
								className="animate-pulse"
								style={{ color: "var(--color-amber)" }}
								aria-hidden
							/>
							<p className="text-[0.85rem]" style={{ color: "rgba(250,245,236,0.5)" }}>
								Uploading {fileName}…
							</p>
						</>
					) : (
						<>
							<FilePdfIcon
								size={26}
								weight="duotone"
								style={{ color: "var(--color-amber)" }}
								aria-hidden
							/>
							<div className="text-center">
								<p className="text-[0.88rem] font-medium" style={{ color: "rgba(250,245,236,0.75)" }}>
									Drop PDF here
								</p>
								<p className="text-[0.78rem] mt-0.5" style={{ color: "rgba(250,245,236,0.3)" }}>
									or click to browse
								</p>
							</div>
						</>
					)}
				</button>

				<input
					ref={fileInputRef}
					type="file"
					accept="application/pdf"
					className="hidden"
					onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); }}
				/>

				{/* Feedback */}
				{status === "success" && uploadedUrl && (
					<div
						className="rounded-lg px-4 py-3 flex flex-col gap-1"
						style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}
					>
						<p className="text-[0.85rem] font-medium" style={{ color: "rgb(134,239,172)" }}>
							Menu updated successfully.
						</p>
						<a
							href={uploadedUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[0.75rem] underline underline-offset-2 break-all"
							style={{ color: "rgba(134,239,172,0.6)" }}
						>
							View PDF →
						</a>
					</div>
				)}

				{status === "error" && (
					<div
						className="rounded-lg px-4 py-3"
						style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
					>
						<p className="text-[0.85rem]" style={{ color: "rgb(252,165,165)" }}>
							Upload failed. File must be a PDF.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
