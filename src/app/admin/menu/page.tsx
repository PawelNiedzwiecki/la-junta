"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { type HistoryEntry, HistoryPanel } from "./HistoryPanel";
import { UploadCard } from "./UploadCard";

type UploadStatus = "idle" | "uploading" | "success" | "error" | "wrong-password";

export default function AdminMenuPage() {
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState<UploadStatus>("idle");
	const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const [history, setHistory] = useState<HistoryEntry[]>([]);
	const [restoringUrl, setRestoringUrl] = useState<string | null>(null);
	const [downloading, setDownloading] = useState(false);

	useEffect(() => {
		if (password.length <= 3) return;
		let cancelled = false;
		fetch("/api/menu", { headers: { "x-admin-password": password } })
			.then((r) => (r.ok ? r.json() : null))
			.then((data) => { if (!cancelled && data) setHistory(data.history ?? []); });
		return () => { cancelled = true; };
	}, [password]);

	async function refreshHistory() {
		const res = await fetch("/api/menu", { headers: { "x-admin-password": password } });
		if (res.ok) setHistory((await res.json()).history ?? []);
	}

	async function upload(file: File) {
		if (!password) { setStatus("wrong-password"); return; }
		if (file.type !== "application/pdf") { setStatus("error"); return; }

		setFileName(file.name);
		setStatus("uploading");

		const formData = new FormData();
		formData.append("file", file);

		const res = await fetch("/api/menu", {
			method: "POST",
			headers: { "x-admin-password": password },
			body: formData,
		});

		if (res.status === 401) { setStatus("wrong-password"); return; }
		if (!res.ok) { setStatus("error"); return; }

		setUploadedUrl((await res.json()).url);
		setStatus("success");
		refreshHistory();
	}

	async function restore(url: string) {
		setRestoringUrl(url);
		const res = await fetch("/api/menu/restore", {
			method: "POST",
			headers: { "x-admin-password": password, "Content-Type": "application/json" },
			body: JSON.stringify({ url }),
		});
		setRestoringUrl(null);
		if (res.ok) {
			setUploadedUrl((await res.json()).url);
			setStatus("success");
			refreshHistory();
		}
	}

	async function downloadCsv() {
		setDownloading(true);
		const res = await fetch("/api/bookings", { headers: { "x-admin-password": password } });
		if (res.ok) {
			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `bookings-${new Date().toISOString().slice(0, 10)}.csv`;
			a.click();
			URL.revokeObjectURL(url);
		}
		setDownloading(false);
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--color-cream)" }}>
			<div className="w-full max-w-105 flex flex-col gap-4">
				<UploadCard
					password={password}
					onPasswordChange={setPassword}
					status={status}
					onStatusChange={setStatus}
					fileName={fileName}
					uploadedUrl={uploadedUrl}
					onUpload={upload}
				/>

				<HistoryPanel
					history={history}
					restoringUrl={restoringUrl}
					onRestore={restore}
				/>

				{password.length > 3 && (
					<div
						className="rounded-2xl px-6 py-5 flex items-center justify-between gap-4"
						style={{
							background: "#3f3525",
							boxShadow: "0 4px 6px -1px rgba(44,36,22,0.08), 0 10px 30px -5px rgba(44,36,22,0.12)",
						}}
					>
						<div className="flex flex-col gap-0.5">
							<p className="text-[0.88rem] font-medium" style={{ color: "rgba(250,245,236,0.75)" }}>
								Export bookings
							</p>
							<p className="text-[0.75rem]" style={{ color: "rgba(250,245,236,0.3)" }}>
								Download all registrations as CSV
							</p>
						</div>
						<button
							type="button"
							onClick={downloadCsv}
							disabled={downloading}
							className="shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-[0.82rem] font-medium transition-opacity"
							style={{
								background: "var(--color-amber)",
								color: "var(--color-dark-card)",
								opacity: downloading ? 0.6 : 1,
							}}
						>
							<DownloadSimpleIcon size={15} weight="bold" aria-hidden />
							{downloading ? "Downloading…" : "Download CSV"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
