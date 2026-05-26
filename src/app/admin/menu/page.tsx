"use client";

import {
	CalendarIcon,
	DownloadSimpleIcon,
	NotePencilIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { type HistoryEntry, HistoryPanel } from "./HistoryPanel";
import { UploadCard } from "./UploadCard";

type UploadStatus =
	| "idle"
	| "uploading"
	| "success"
	| "error"
	| "wrong-password";
type DateSaveStatus = "idle" | "saving" | "success" | "error";
type DescSaveStatus = "idle" | "saving" | "success" | "error";

export default function AdminMenuPage() {
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState<UploadStatus>("idle");
	const [unlocked, setUnlocked] = useState(false);
	const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const [history, setHistory] = useState<HistoryEntry[]>([]);
	const [restoringUrl, setRestoringUrl] = useState<string | null>(null);
	const [downloading, setDownloading] = useState(false);

	const [currentIsoDate, setCurrentIsoDate] = useState<string | null>(null);
	const [dateInput, setDateInput] = useState("");
	const [dateSaveStatus, setDateSaveStatus] = useState<DateSaveStatus>("idle");

	const [descriptionEs, setDescriptionEs] = useState("");
	const [descriptionEn, setDescriptionEn] = useState("");
	const [savedDescriptionEs, setSavedDescriptionEs] = useState("");
	const [savedDescriptionEn, setSavedDescriptionEn] = useState("");
	const [descSaveStatus, setDescSaveStatus] = useState<DescSaveStatus>("idle");

	function handlePasswordChange(value: string) {
		setPassword(value);
		if (value.length <= 3) setUnlocked(false);
	}

	useEffect(() => {
		if (password.length <= 3) {
			return;
		}
		let cancelled = false;
		Promise.all([
			fetch("/api/menu", { headers: { "x-admin-password": password } }),
			fetch("/api/event", { headers: { "x-admin-password": password } }),
		]).then(async ([menuRes, eventRes]) => {
			if (cancelled) return;
			if (!menuRes.ok) {
				setUnlocked(false);
				return;
			}
			const menuData = await menuRes.json();
			setHistory(menuData.history ?? []);
			setUnlocked(true);
			if (eventRes.ok) {
				const eventData = await eventRes.json();
				const iso = eventData.isoDate ?? new Date().toISOString().slice(0, 10);
				setCurrentIsoDate(iso);
				setDateInput(iso);
				const es = eventData.description ?? "";
				const en = eventData.descriptionEn ?? "";
				setDescriptionEs(es);
				setDescriptionEn(en);
				setSavedDescriptionEs(es);
				setSavedDescriptionEn(en);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [password]);

	async function refreshHistory() {
		const res = await fetch("/api/menu", {
			headers: { "x-admin-password": password },
		});
		if (res.ok) setHistory((await res.json()).history ?? []);
	}

	async function saveEventDate() {
		if (!dateInput) return;
		setDateSaveStatus("saving");
		const res = await fetch("/api/event", {
			method: "POST",
			headers: {
				"x-admin-password": password,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ isoDate: dateInput }),
		});
		if (res.ok) {
			setCurrentIsoDate(dateInput);
			setDateSaveStatus("success");
			setTimeout(() => setDateSaveStatus("idle"), 3000);
		} else {
			setDateSaveStatus("error");
			setTimeout(() => setDateSaveStatus("idle"), 3000);
		}
	}

	async function saveDescription() {
		if (!dateInput) return;
		setDescSaveStatus("saving");
		const res = await fetch("/api/event", {
			method: "POST",
			headers: {
				"x-admin-password": password,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				isoDate: currentIsoDate ?? dateInput,
				description: descriptionEs,
				descriptionEn: descriptionEn,
			}),
		});
		if (res.ok) {
			setSavedDescriptionEs(descriptionEs);
			setSavedDescriptionEn(descriptionEn);
			setDescSaveStatus("success");
			setTimeout(() => setDescSaveStatus("idle"), 3000);
		} else {
			setDescSaveStatus("error");
			setTimeout(() => setDescSaveStatus("idle"), 3000);
		}
	}

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

		setUploadedUrl((await res.json()).url);
		setStatus("success");
		refreshHistory();
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
			setUploadedUrl((await res.json()).url);
			setStatus("success");
			refreshHistory();
		}
	}

	async function downloadCsv() {
		setDownloading(true);
		const res = await fetch("/api/bookings", {
			headers: { "x-admin-password": password },
		});
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
		<div
			className="min-h-screen flex items-center justify-center p-6"
			style={{ background: "var(--color-cream)" }}
		>
			<div className="w-full max-w-105 flex flex-col gap-4">
				<UploadCard
					password={password}
					onPasswordChange={handlePasswordChange}
					status={status}
					onStatusChange={setStatus}
					fileName={fileName}
					uploadedUrl={uploadedUrl}
					onUpload={upload}
					unlocked={unlocked}
				/>

				{unlocked && (
					<HistoryPanel
						history={history}
						restoringUrl={restoringUrl}
						onRestore={restore}
					/>
				)}

				{unlocked && (
					<div
						className="rounded-2xl px-6 py-5 flex flex-col gap-4"
						style={{
							background: "#3f3525",
							boxShadow:
								"0 4px 6px -1px rgba(44,36,22,0.08), 0 10px 30px -5px rgba(44,36,22,0.12)",
						}}
					>
						<div className="flex items-center gap-2">
							<CalendarIcon
								size={14}
								weight="duotone"
								style={{ color: "var(--color-amber)" }}
								aria-hidden
							/>
							<p
								className="text-[0.68rem] font-medium tracking-[0.18em] uppercase"
								style={{ color: "rgba(250,245,236,0.35)" }}
							>
								Event date
							</p>
						</div>

						{currentIsoDate && (
							<p
								className="text-[0.8rem]"
								style={{ color: "rgba(250,245,236,0.45)" }}
							>
								Currently set to{" "}
								<span
									className="font-medium"
									style={{ color: "rgba(250,245,236,0.75)" }}
								>
									{currentIsoDate}
								</span>
							</p>
						)}

						<div className="flex items-center gap-3">
							<input
								type="date"
								value={dateInput}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setDateInput(e.target.value);
									setDateSaveStatus("idle");
								}}
								className="flex-1 rounded-lg px-4 py-2.5 text-[0.88rem] font-[inherit] outline-none transition-colors"
								style={{
									background: "rgba(250,245,236,0.06)",
									border: "1px solid rgba(250,245,236,0.12)",
									color: "var(--color-cream)",
									colorScheme: "dark",
								}}
							/>
							<button
								type="button"
								onClick={saveEventDate}
								disabled={
									dateSaveStatus === "saving" ||
									!dateInput ||
									dateInput === currentIsoDate
								}
								className="shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-[0.82rem] font-medium transition-opacity"
								style={{
									background: "var(--color-amber)",
									color: "var(--color-dark-card)",
									opacity:
										dateSaveStatus === "saving" ||
										!dateInput ||
										dateInput === currentIsoDate
											? 0.5
											: 1,
								}}
							>
								{dateSaveStatus === "saving" ? "Saving…" : "Save"}
							</button>
						</div>

						{dateSaveStatus === "success" && (
							<p
								className="text-[0.8rem]"
								style={{ color: "rgb(134,239,172)" }}
							>
								Event date updated — the website will reflect the new date
								immediately.
							</p>
						)}
						{dateSaveStatus === "error" && (
							<p
								className="text-[0.8rem]"
								style={{ color: "rgb(252,165,165)" }}
							>
								Failed to save. Please try again.
							</p>
						)}
					</div>
				)}

				{unlocked && (
					<div
						className="rounded-2xl px-6 py-5 flex flex-col gap-4"
						style={{
							background: "#3f3525",
							boxShadow:
								"0 4px 6px -1px rgba(44,36,22,0.08), 0 10px 30px -5px rgba(44,36,22,0.12)",
						}}
					>
						<div className="flex items-center gap-2">
							<NotePencilIcon
								size={14}
								weight="duotone"
								style={{ color: "var(--color-amber)" }}
								aria-hidden
							/>
							<p
								className="text-[0.68rem] font-medium tracking-[0.18em] uppercase"
								style={{ color: "rgba(250,245,236,0.35)" }}
							>
								Menu description
							</p>
						</div>

						<p
							className="text-[0.78rem]"
							style={{ color: "rgba(250,245,236,0.4)" }}
						>
							Shown below the menu card. Leave blank to use the default text.
						</p>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="desc-es"
								className="text-[0.72rem] font-medium tracking-[0.12em] uppercase"
								style={{ color: "rgba(250,245,236,0.35)" }}
							>
								Spanish (ES)
							</label>
							<textarea
								id="desc-es"
								rows={4}
								value={descriptionEs}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
									setDescriptionEs(e.target.value);
									setDescSaveStatus("idle");
								}}
								placeholder="Descripción del menú este mes…"
								className="w-full rounded-lg px-4 py-3 text-[0.88rem] font-[inherit] outline-none transition-colors resize-y"
								style={{
									background: "rgba(250,245,236,0.06)",
									border: "1px solid rgba(250,245,236,0.12)",
									color: "var(--color-cream)",
								}}
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label
								htmlFor="desc-en"
								className="text-[0.72rem] font-medium tracking-[0.12em] uppercase"
								style={{ color: "rgba(250,245,236,0.35)" }}
							>
								English (EN)
							</label>
							<textarea
								id="desc-en"
								rows={4}
								value={descriptionEn}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
									setDescriptionEn(e.target.value);
									setDescSaveStatus("idle");
								}}
								placeholder="Description of this month's menu…"
								className="w-full rounded-lg px-4 py-3 text-[0.88rem] font-[inherit] outline-none transition-colors resize-y"
								style={{
									background: "rgba(250,245,236,0.06)",
									border: "1px solid rgba(250,245,236,0.12)",
									color: "var(--color-cream)",
								}}
							/>
						</div>

						<button
							type="button"
							onClick={saveDescription}
							disabled={
								descSaveStatus === "saving" ||
								(descriptionEs === savedDescriptionEs &&
									descriptionEn === savedDescriptionEn)
							}
							className="self-end shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-[0.82rem] font-medium transition-opacity"
							style={{
								background: "var(--color-amber)",
								color: "var(--color-dark-card)",
								opacity:
									descSaveStatus === "saving" ||
									(descriptionEs === savedDescriptionEs &&
										descriptionEn === savedDescriptionEn)
										? 0.5
										: 1,
							}}
						>
							{descSaveStatus === "saving" ? "Saving…" : "Save description"}
						</button>

						{descSaveStatus === "success" && (
							<p
								className="text-[0.8rem]"
								style={{ color: "rgb(134,239,172)" }}
							>
								Description updated — the website will reflect it immediately.
							</p>
						)}
						{descSaveStatus === "error" && (
							<p
								className="text-[0.8rem]"
								style={{ color: "rgb(252,165,165)" }}
							>
								Failed to save. Please try again.
							</p>
						)}
					</div>
				)}

				{unlocked && (
					<div
						className="rounded-2xl px-6 py-5 flex items-center justify-between gap-4"
						style={{
							background: "#3f3525",
							boxShadow:
								"0 4px 6px -1px rgba(44,36,22,0.08), 0 10px 30px -5px rgba(44,36,22,0.12)",
						}}
					>
						<div className="flex flex-col gap-0.5">
							<p
								className="text-[0.88rem] font-medium"
								style={{ color: "rgba(250,245,236,0.75)" }}
							>
								Export bookings
							</p>
							<p
								className="text-[0.75rem]"
								style={{ color: "rgba(250,245,236,0.3)" }}
							>
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
