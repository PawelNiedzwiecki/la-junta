"use server";

import { list } from "@vercel/blob";

export async function getMenuUrl(lang: string): Promise<string | null> {
	const pointer = `menu/pointer-${lang}.json`;
	try {
		const { blobs } = await list({ prefix: pointer });
		const pointerUrl = blobs.find((b) => b.pathname === pointer)?.url;
		if (!pointerUrl) return null;
		const res = await fetch(pointerUrl, { cache: "no-store" });
		if (!res.ok) return null;
		const { url } = await res.json();
		return url ?? null;
	} catch {
		return null;
	}
}
