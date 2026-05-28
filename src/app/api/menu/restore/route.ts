import { put } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const password = request.headers.get("x-admin-password");
	if (password !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { url } = await request.json();
	if (!url || typeof url !== "string") {
		return NextResponse.json({ error: "No url provided" }, { status: 400 });
	}

	// Restrict to Vercel Blob public storage to prevent SSRF
	const VERCEL_BLOB_RE = /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//;
	if (!VERCEL_BLOB_RE.test(url)) {
		return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
	}

	await put(
		"menu/pointer.json",
		JSON.stringify({ url }),
		{ access: "public", allowOverwrite: true, contentType: "application/json" },
	);

	return NextResponse.json({ url });
}
