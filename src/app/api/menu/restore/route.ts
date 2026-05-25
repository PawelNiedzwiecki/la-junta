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

	// Restrict fetches to Vercel Blob public storage to prevent SSRF
	const VERCEL_BLOB_RE = /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//;
	if (!VERCEL_BLOB_RE.test(url)) {
		return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
	}

	const res = await fetch(url);
	if (!res.ok) {
		return NextResponse.json({ error: "Failed to fetch blob" }, { status: 502 });
	}

	const blob = await put("menu/current.pdf", res.body!, {
		access: "public",
		allowOverwrite: true,
		contentType: "application/pdf",
	});

	return NextResponse.json({ url: blob.url });
}
