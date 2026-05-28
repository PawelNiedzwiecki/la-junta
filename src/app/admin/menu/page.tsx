"use client";

import {
	CalendarIcon,
	CaretDownIcon,
	DownloadSimpleIcon,
	NotePencilIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
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
	const [unlocked, setUnlocked] = useState(false);

	const [statusEs, setStatusEs] = useState<UploadStatus>("idle");
	const [uploadedUrlEs, setUploadedUrlEs] = useState<string | null>(null);
	const [fileNameEs, setFileNameEs] = useState<string | null>(null);
	const [historyEs, setHistoryEs] = useState<HistoryEntry[]>([]);
	const [restoringUrlEs, setRestoringUrlEs] = useState<string | null>(null);

	const [statusEn, setStatusEn] = useState<UploadStatus>("idle");
	const [uploadedUrlEn, setUploadedUrlEn] = useState<string | null>(null);
	const [fileNameEn, setFileNameEn] = useState<string | null>(null);
	const [historyEn, setHistoryEn] = useState<HistoryEntry[]>([]);
	const [restoringUrlEn, setRestoringUrlEn] = useState<string | null>(null);

	const [downloading, setDownloading] = useState(false);

	const [currentIsoDate, setCurrentIsoDate] = useState<string | null>(null);
	const [dateInput, setDateInput] = useState("");
	const [dateSaveStatus, setDateSaveStatus] = useState<DateSaveStatus>("idle");

	const [descriptionEs, setDescriptionEs] = useState("");
	const [descriptionEn, setDescriptionEn] = useState("");
	const [savedDescriptionEs, setSavedDescriptionEs] = useState("");
	const [savedDescriptionEn, setSavedDescriptionEn] = useState("");
	const [descSaveStatus, setDescSaveStatus] = useState<DescSaveStatus>("idle");

	const [dateOpen, setDateOpen] = useState(false);
	const [descOpen, setDescOpen] = useState(false);

	const [loginStatus, setLoginStatus] = useState<"idle" | "loading">("idle");

	function handlePasswordChange(value: string) {
		setPassword(value);
		if (unlocked) setUnlocked(false);
		setStatusEs("idle");
	}

	async function login() {
		if (password.length <= 3) return;
		setLoginStatus("loading");
		const [menuRes, eventRes] = await Promise.all([
			fetch("/api/menu", { headers: { "x-admin-password": password } }),
			fetch("/api/event", { headers: { "x-admin-password": password } }),
		]);
		setLoginStatus("idle");
		if (!menuRes.ok) {
			setStatusEs("wrong-password");
			return;
		}
		const menuData = await menuRes.json();
		setHistoryEs(menuData.historyEs ?? []);
		setHistoryEn(menuData.historyEn ?? []);
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
	}

	async function refreshHistory() {
		const res = await fetch("/api/menu", {
			headers: { "x-admin-password": password },
		});
		if (res.ok) {
			const data = await res.json();
			setHistoryEs(data.historyEs ?? []);
			setHistoryEn(data.historyEn ?? []);
		}
	}

	async function saveEventDate() {
		if (!dateInput) return;
		setDateSaveStatus("saving");
		const res = await fetch("/api/event", {
			method: "POST",
			headers: { "x-admin-password": password, "Content-Type": "application/json" },
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
			headers: { "x-admin-password": password, "Content-Type": "application/json" },
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

	async function upload(lang: "es" | "en", file: File) {
		if (!password) {
			lang === "es" ? setStatusEs("wrong-password") : setStatusEn("wrong-password");
			return;
		}
		if (file.type !== "application/pdf") {
			lang === "es" ? setStatusEs("error") : setStatusEn("error");
			return;
		}

		if (lang === "es") { setFileNameEs(file.name); setStatusEs("uploading"); }
		else { setFileNameEn(file.name); setStatusEn("uploading"); }

		const formData = new FormData();
		formData.append("file", file);

		const res = await fetch(`/api/menu?lang=${lang}`, {
			method: "POST",
			headers: { "x-admin-password": password },
			body: formData,
		});

		if (res.status === 401) {
			lang === "es" ? setStatusEs("wrong-password") : setStatusEn("wrong-password");
			return;
		}
		if (!res.ok) {
			lang === "es" ? setStatusEs("error") : setStatusEn("error");
			return;
		}

		const { url } = await res.json();
		if (lang === "es") { setUploadedUrlEs(url); setStatusEs("success"); }
		else { setUploadedUrlEn(url); setStatusEn("success"); }
		refreshHistory();
	}

	async function restore(lang: "es" | "en", url: string) {
		if (lang === "es") setRestoringUrlEs(url);
		else setRestoringUrlEn(url);

		const res = await fetch("/api/menu/restore", {
			method: "POST",
			headers: { "x-admin-password": password, "Content-Type": "application/json" },
			body: JSON.stringify({ url, lang }),
		});

		if (lang === "es") setRestoringUrlEs(null);
		else setRestoringUrlEn(null);

		if (res.ok) {
			const { url: restoredUrl } = await res.json();
			if (lang === "es") { setUploadedUrlEs(restoredUrl); setStatusEs("success"); }
			else { setUploadedUrlEn(restoredUrl); setStatusEn("success"); }
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

	const panelStyle = {
		background: "#3f3525",
		boxShadow: "0 4px 6px -1px rgba(44,36,22,0.08), 0 10px 30px -5px rgba(44,36,22,0.12)",
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center p-6"
			style={{ background: "var(--color-cream)" }}
		>
			<div className="w-full max-w-220 flex flex-col gap-4">
				{/* Upload cards — side by side when unlocked, single column before */}
				<div className={unlocked ? "grid grid-cols-1 sm:grid-cols-2 gap-4 items-start" : ""}>
					<div className="flex flex-col gap-4">
						<UploadCard
							lang="es"
							password={password}
							onPasswordChange={handlePasswordChange}
							onLogin={login}
							loginLoading={loginStatus === "loading"}
							status={statusEs}
							onStatusChange={setStatusEs}
							fileName={fileNameEs}
							uploadedUrl={uploadedUrlEs}
							onUpload={(f) => upload("es", f)}
							unlocked={unlocked}
							showPasswordField
						/>
						{unlocked && (
							<HistoryPanel
								history={historyEs}
								restoringUrl={restoringUrlEs}
								onRestore={(url) => restore("es", url)}
							/>
						)}
					</div>

					{unlocked && (
						<div className="flex flex-col gap-4">
							<UploadCard
								lang="en"
								password={password}
								status={statusEn}
								onStatusChange={setStatusEn}
								fileName={fileNameEn}
								uploadedUrl={uploadedUrlEn}
								onUpload={(f) => upload("en", f)}
								unlocked={unlocked}
							/>
							<HistoryPanel
								history={historyEn}
								restoringUrl={restoringUrlEn}
								onRestore={(url) => restore("en", url)}
							/>
						</div>
					)}
				</div>

				{/* Event date */}
				{unlocked && (
					<div className="rounded-2xl overflow-hidden" style={panelStyle}>
						<button
							type="button"
							onClick={() => setDateOpen((v) => !v)}
							className="w-full flex items-center justify-between px-6 py-4 transition-opacity hover:opacity-80"
						>
							<div className="flex items-center gap-2">
								<CalendarIcon size={14} weight="duotone" style={{ color: "var(--color-cream)" }} aria-hidden />
								<p className="text-[0.68rem] font-medium tracking-[0.18em] uppercase" style={{ color: "rgba(250,245,236,0.35)" }}>
									Event date{currentIsoDate && !dateOpen ? ` — ${currentIsoDate}` : ""}
								</p>
							</div>
							<CaretDownIcon
								size={14}
								weight="bold"
								style={{ color: "rgba(250,245,236,0.35)", transform: dateOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
								aria-hidden
							/>
						</button>

						{dateOpen && (
							<div className="flex flex-col gap-4 px-6 pb-5">
								{currentIsoDate && (
									<p className="text-[0.8rem]" style={{ color: "rgba(250,245,236,0.45)" }}>
										Currently set to{" "}
										<span className="font-medium" style={{ color: "rgba(250,245,236,0.75)" }}>
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
										disabled={dateSaveStatus === "saving" || !dateInput || dateInput === currentIsoDate}
										className="shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-[0.82rem] font-medium transition-opacity"
										style={{
											background: "var(--color-cream)",
											color: "var(--color-dark-card)",
											opacity: dateSaveStatus === "saving" || !dateInput || dateInput === currentIsoDate ? 0.5 : 1,
										}}
									>
										{dateSaveStatus === "saving" ? "Saving…" : "Save"}
									</button>
								</div>

								{dateSaveStatus === "success" && (
									<p className="text-[0.8rem]" style={{ color: "rgb(134,239,172)" }}>
										Event date updated — the website will reflect the new date immediately.
									</p>
								)}
								{dateSaveStatus === "error" && (
									<p className="text-[0.8rem]" style={{ color: "rgb(252,165,165)" }}>
										Failed to save. Please try again.
									</p>
								)}
							</div>
						)}
					</div>
				)}

				{/* Menu description */}
				{unlocked && (
					<div className="rounded-2xl overflow-hidden" style={panelStyle}>
						<button
							type="button"
							onClick={() => setDescOpen((v) => !v)}
							className="w-full flex items-center justify-between px-6 py-4 transition-opacity hover:opacity-80"
						>
							<div className="flex items-center gap-2">
								<NotePencilIcon size={14} weight="duotone" style={{ color: "var(--color-cream)" }} aria-hidden />
								<p className="text-[0.68rem] font-medium tracking-[0.18em] uppercase" style={{ color: "rgba(250,245,236,0.35)" }}>
									Menu description
								</p>
							</div>
							<CaretDownIcon
								size={14}
								weight="bold"
								style={{ color: "rgba(250,245,236,0.35)", transform: descOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
								aria-hidden
							/>
						</button>

						{descOpen && (
							<div className="flex flex-col gap-4 px-6 pb-5">
								<p className="text-[0.78rem]" style={{ color: "rgba(250,245,236,0.4)" }}>
									Shown below the menu card. Leave blank to use the default text.
								</p>

								<div className="flex flex-col gap-1.5">
									<label htmlFor="desc-es" className="text-[0.72rem] font-medium tracking-[0.12em] uppercase" style={{ color: "rgba(250,245,236,0.35)" }}>
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
									<label htmlFor="desc-en" className="text-[0.72rem] font-medium tracking-[0.12em] uppercase" style={{ color: "rgba(250,245,236,0.35)" }}>
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
										(descriptionEs === savedDescriptionEs && descriptionEn === savedDescriptionEn)
									}
									className="self-end shrink-0 flex items-center gap-2 rounded-lg px-4 py-2.5 text-[0.82rem] font-medium transition-opacity"
									style={{
										background: "var(--color-cream)",
										color: "var(--color-dark-card)",
										opacity:
											descSaveStatus === "saving" ||
											(descriptionEs === savedDescriptionEs && descriptionEn === savedDescriptionEn)
												? 0.5
												: 1,
									}}
								>
									{descSaveStatus === "saving" ? "Saving…" : "Save description"}
								</button>

								{descSaveStatus === "success" && (
									<p className="text-[0.8rem]" style={{ color: "rgb(134,239,172)" }}>
										Description updated — the website will reflect it immediately.
									</p>
								)}
								{descSaveStatus === "error" && (
									<p className="text-[0.8rem]" style={{ color: "rgb(252,165,165)" }}>
										Failed to save. Please try again.
									</p>
								)}
							</div>
						)}
					</div>
				)}

				{/* Export bookings */}
				{unlocked && (
					<div
						className="rounded-2xl px-6 py-5 flex items-center justify-between gap-4"
						style={panelStyle}
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
								background: "var(--color-cream)",
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
