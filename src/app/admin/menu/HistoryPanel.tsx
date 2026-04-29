"use client";

import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr";

export type HistoryEntry = {
	url: string;
	pathname: string;
	uploadedAt: string;
};

function filename(pathname: string) {
	const part = pathname.split("/").pop() ?? pathname;
	return part.replace(/^\d{4}-\d{2}-\d{2}T[\d-]+Z-/, "");
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

type Props = {
	history: HistoryEntry[];
	restoringUrl: string | null;
	onRestore: (url: string) => void;
};

export function HistoryPanel({ history, restoringUrl, onRestore }: Props) {
	if (history.length === 0) return null;

	return (
		<div
			className="rounded-2xl px-6 py-5 flex flex-col gap-3"
			style={{
				background: "#3f3525",
				boxShadow: "0 4px 6px -1px rgba(44,36,22,0.08), 0 10px 30px -5px rgba(44,36,22,0.12)",
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
					<li key={entry.url} className="flex items-center justify-between gap-3">
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
							<span className="text-[0.72rem]" style={{ color: "rgba(250,245,236,0.3)" }}>
								{formatDate(entry.uploadedAt)}
							</span>
						</div>
						<button
							type="button"
							onClick={() => onRestore(entry.url)}
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
	);
}
