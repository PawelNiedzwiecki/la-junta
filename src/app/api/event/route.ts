import { list, put } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

function requireAuth(request: NextRequest) {
	const password = request.headers.get("x-admin-password");
	return password === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
	if (!requireAuth(request)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { blobs } = await list({ prefix: "event/config.json" });
		if (!blobs.length) {
			return NextResponse.json({ isoDate: null });
		}
		const res = await fetch(blobs[0].url, { cache: "no-store" });
		if (!res.ok) return NextResponse.json({ isoDate: null });
		const data = await res.json();
		return NextResponse.json(data);
	} catch {
		return NextResponse.json({ isoDate: null });
	}
}

export async function POST(request: NextRequest) {
	if (!requireAuth(request)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await request.json();
	const { isoDate, description, descriptionEn } = body;

	if (typeof isoDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
		return NextResponse.json({ error: "Invalid date format (expected YYYY-MM-DD)" }, { status: 400 });
	}

	// Validate it's an actual date
	const d = new Date(`${isoDate}T12:00:00`);
	if (Number.isNaN(d.getTime())) {
		return NextResponse.json({ error: "Invalid date" }, { status: 400 });
	}

	const payload: Record<string, string> = { isoDate };
	if (typeof description === "string" && description.trim()) {
		payload.description = description.trim();
	}
	if (typeof descriptionEn === "string" && descriptionEn.trim()) {
		payload.descriptionEn = descriptionEn.trim();
	}

	await put(
		"event/config.json",
		JSON.stringify(payload),
		{ access: "public", allowOverwrite: true, contentType: "application/json" },
	);

	return NextResponse.json({ ok: true });
}
