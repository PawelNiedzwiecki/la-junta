"use server";

import { list } from "@vercel/blob";

export async function getMenuUrl(): Promise<string | null> {
	try {
		const { blobs } = await list({ prefix: "menu/pointer.json" });
		const pointerUrl = blobs.find((b) => b.pathname === "menu/pointer.json")?.url;
		if (!pointerUrl) return null;
		const res = await fetch(pointerUrl, { cache: "no-store" });
		if (!res.ok) return null;
		const { url } = await res.json();
		return url ?? null;
	} catch {
		return null;
	}
}
