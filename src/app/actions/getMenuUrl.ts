"use server";

import { list } from "@vercel/blob";

export async function getMenuUrl(): Promise<string | null> {
	try {
		const { blobs } = await list({ prefix: "menu/current.pdf" });
		return blobs[0]?.url ?? null;
	} catch {
		return null;
	}
}
