"use client";

import {
	ArrowCounterClockwiseIcon,
	DiamondsFourIcon,
	FilePdfIcon,
	UploadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";

type HistoryEntry = {
	url: string;
	pathname: string;
	uploadedAt: string;
};

function filename(pathname: string) {
	const parts = pathname.split("/").pop() ?? pathname;
	// strip leading timestamp prefix: 2026-04-29T12-34-56-789Z-
	return parts.replace(/^\d{4}-\d{2}-\d{2}T[\d-]+Z-/, "");
}

function formatDate(iso: string) {
	return new Date(iso).toLocaleString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export default function AdminMenuPage() {
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState<
		"idle" | "uploading" | "success" | "error" | "wrong-password"
	>("idle");
	const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
	const [dragOver, setDragOver] = useState(false);
	const [fileName, setFileName] = useState<string | null>(null);
	const [history, setHistory] = useState<HistoryEntry[]>([]);
	const [restoringUrl, setRestoringUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	async function fetchHistory(pw: string) {
		if (!pw) return;
		const res = await fetch("/api/menu", {
			headers: { "x-admin-password": pw },
		});
		if (!res.ok) return;
		const data = await res.json();
		setHistory(data.history ?? []);
	}

	useEffect(() => {
		if (password.length <= 3) return;
		let cancelled = false;
		fetch("/api/menu", { headers: { "x-admin-password": password } })
			.then((r) => (r.ok ? r.json() : null))
			.then((data) => {
				if (!cancelled && data) setHistory(data.history ?? []);
			});
		return () => { cancelled = true; };
	}, [password]);

	async function upload(file: File) {
		if (!password) {
			setStatus("wrong-password");
			return;
		}
		if (file.type !== "application/pdf") {
			setStatus("error");
			return;
		}

		setFileName(file.name);
		setStatus("uploading");

		const formData = new FormData();
		formData.append("file", file);

		const res = await fetch("/api/menu", {
			method: "POST",
			headers: { "x-admin-password": password },
			body: formData,
		});

		if (res.status === 401) {
			setStatus("wrong-password");
			return;
		}
		if (!res.ok) {
			setStatus("error");
			return;
		}

		const data = await res.json();
		setUploadedUrl(data.url);
		setStatus("success");
		fetchHistory(password);
	}

	async function restore(url: string) {
		setRestoringUrl(url);
		const res = await fetch("/api/menu/restore", {
			method: "POST",
			headers: {
				"x-admin-password": password,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ url }),
		});
		setRestoringUrl(null);
		if (res.ok) {
			const data = await res.json();
			setUploadedUrl(data.url);
			setStatus("success");
			fetchHistory(password);
		}
	}

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) upload(file);
	}

	function handleDrop(e: React.DragEvent) {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files?.[0];
		if (file) upload(file);
	}

	return (
		<div
			className="min-h-screen flex items-center justify-center p-6"
			style={{ background: "var(--color-cream)" }}
		>
			<div className="w-full max-w-105 flex flex-col gap-4">
				{/* Ticket card */}
				<div
					className="rounded-2xl overflow-visible relative"
					style={{
						boxShadow:
							"0 4px 6px -1px rgba(44,36,22,0.08), 0 20px 60px -10px rgba(44,36,22,0.18)",
					}}
				>
					{/* Top zone — dark */}
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
								Drop a new PDF below — the menu button on the site updates
								instantly.
							</p>
						</div>
					</div>

					{/* Perforation divider */}
					<div
						className="relative"
						style={{
							borderTop: "2px dashed rgba(250,245,236,0.25)",
							background: "#3f3525",
						}}
					/>

					{/* Bottom zone — warm brown */}
					<div
						className="rounded-b-2xl px-10 pt-10 pb-10 flex flex-col gap-5"
						style={{ background: "#3f3525" }}
					>
						{/* Password field */}
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
									setPassword(e.target.value);
									if (status === "wrong-password") setStatus("idle");
								}}
								placeholder="Enter admin password"
								className="w-full rounded-lg px-4 py-3 text-[0.9rem] transition-colors font-[inherit] outline-none"
								style={{
									background: "rgba(250,245,236,0.06)",
									border: `1px solid ${status === "wrong-password" ? "rgba(248,113,113,0.5)" : "rgba(250,245,236,0.12)"}`,
									color: "var(--color-cream)",
								}}
								onFocus={(e) => {
									e.currentTarget.style.borderColor = "rgba(139,69,19,0.6)";
								}}
								onBlur={(e) => {
									e.currentTarget.style.borderColor =
										status === "wrong-password"
											? "rgba(248,113,113,0.5)"
											: "rgba(250,245,236,0.12)";
								}}
							/>
							{status === "wrong-password" && (
								<p
									className="text-[0.78rem]"
									style={{ color: "rgb(248,113,113)" }}
								>
									Wrong password.
								</p>
							)}
						</div>

						{/* Drop zone */}
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							onDragOver={(e) => {
								e.preventDefault();
								setDragOver(true);
							}}
							onDragLeave={() => setDragOver(false)}
							onDrop={handleDrop}
							disabled={status === "uploading"}
							className="w-full rounded-xl flex flex-col items-center gap-3 py-10 px-6 transition-all"
							style={{
								border: `2px dashed ${dragOver ? "var(--color-amber)" : "rgba(250,245,236,0.18)"}`,
								background: dragOver
									? "rgba(139,69,19,0.08)"
									: "rgba(250,245,236,0.03)",
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
									<p
										className="text-[0.85rem]"
										style={{ color: "rgba(250,245,236,0.5)" }}
									>
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
										<p
											className="text-[0.88rem] font-medium"
											style={{ color: "rgba(250,245,236,0.75)" }}
										>
											Drop PDF here
										</p>
										<p
											className="text-[0.78rem] mt-0.5"
											style={{ color: "rgba(250,245,236,0.3)" }}
										>
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
							onChange={handleFileChange}
						/>

						{/* Feedback */}
						{status === "success" && uploadedUrl && (
							<div
								className="rounded-lg px-4 py-3 flex flex-col gap-1"
								style={{
									background: "rgba(34,197,94,0.08)",
									border: "1px solid rgba(34,197,94,0.2)",
								}}
							>
								<p
									className="text-[0.85rem] font-medium"
									style={{ color: "rgb(134,239,172)" }}
								>
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
								style={{
									background: "rgba(239,68,68,0.08)",
									border: "1px solid rgba(239,68,68,0.2)",
								}}
							>
								<p
									className="text-[0.85rem]"
									style={{ color: "rgb(252,165,165)" }}
								>
									Upload failed. File must be a PDF.
								</p>
							</div>
						)}
					</div>
				</div>

				{/* History panel */}
				{history.length > 0 && (
					<div
						className="rounded-2xl px-6 py-5 flex flex-col gap-3"
						style={{
							background: "#3f3525",
							boxShadow:
								"0 4px 6px -1px rgba(44,36,22,0.08), 0 10px 30px -5px rgba(44,36,22,0.12)",
						}}
					>
						<p
							className="text-[0.68rem] font-medium tracking-[0.18em] uppercase"
							style={{ color: "rgba(250,245,236,0.35)" }}
						>
							Upload history
						</p>
						<ul className="flex flex-col gap-2">
							{history.map((entry) => (
								<li
									key={entry.url}
									className="flex items-center justify-between gap-3"
								>
									<div className="flex flex-col gap-0.5 min-w-0">
										<a
											href={entry.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[0.82rem] font-medium truncate underline underline-offset-2"
											style={{ color: "rgba(250,245,236,0.7)" }}
										>
											{filename(entry.pathname)}
										</a>
										<span
											className="text-[0.72rem]"
											style={{ color: "rgba(250,245,236,0.3)" }}
										>
											{formatDate(entry.uploadedAt)}
										</span>
									</div>
									<button
										type="button"
										onClick={() => restore(entry.url)}
										disabled={restoringUrl === entry.url}
										title="Restore this version"
										className="shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.75rem] font-medium transition-opacity"
										style={{
											background: "rgba(250,245,236,0.08)",
											color: "rgba(250,245,236,0.55)",
											opacity: restoringUrl === entry.url ? 0.5 : 1,
										}}
									>
										<ArrowCounterClockwiseIcon size={13} weight="bold" aria-hidden />
										{restoringUrl === entry.url ? "Restoring…" : "Restore"}
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
