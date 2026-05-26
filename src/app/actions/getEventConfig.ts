"use server";

import { list } from "@vercel/blob";
import { EVENT } from "@/config/event";

export type EventConfig = {
	isoDate: string;
	date: string;
	dateEn: string;
	description?: string;
	descriptionEn?: string;
};

export async function getEventConfig(): Promise<EventConfig> {
	try {
		const { blobs } = await list({ prefix: "event/config.json" });
		if (!blobs.length) return fallback();
		const res = await fetch(blobs[0].url, { cache: "no-store" });
		if (!res.ok) return fallback();
		const data = await res.json() as Record<string, string | undefined>;
		const { isoDate, description, descriptionEn } = data;
		if (!isoDate) return fallback();
		return {
			isoDate,
			...formatDates(isoDate),
			...(description?.trim() ? { description } : {}),
			...(descriptionEn?.trim() ? { descriptionEn } : {}),
		};
	} catch {
		return fallback();
	}
}

function fallback(): EventConfig {
	const isoDate = new Date().toISOString().slice(0, 10);
	return { isoDate, date: EVENT.date, dateEn: EVENT.dateEn };
}

function formatDates(isoDate: string): { date: string; dateEn: string } {
	const d = new Date(`${isoDate}T12:00:00`);

	// Spanish: "16 de Mayo de 2026" — capitalize the month name
	const dateEs = d
		.toLocaleDateString("es-ES", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})
		.replace(/de (\w)/, (_, c: string) => `de ${c.toUpperCase()}`);

	// English: "16th May 2026" with ordinal suffix
	const day = d.getDate();
	const suffix =
		day >= 11 && day <= 13
			? "th"
			: (["th", "st", "nd", "rd", "th"][Math.min(day % 10, 4)] ?? "th");
	const month = d.toLocaleDateString("en-GB", { month: "long" });
	const dateEn = `${day}${suffix} ${month} ${d.getFullYear()}`;

	return { date: dateEs, dateEn };
}
