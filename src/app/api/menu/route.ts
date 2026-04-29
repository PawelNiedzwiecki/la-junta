import { del, list, put } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

const HISTORY_LIMIT = 10;

function requireAuth(request: NextRequest) {
	const password = request.headers.get("x-admin-password");
	return password === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
	if (!requireAuth(request)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const formData = await request.formData();
	const file = formData.get("file");
	if (!(file instanceof File)) {
		return NextResponse.json({ error: "No file provided" }, { status: 400 });
	}
	if (file.type !== "application/pdf") {
		return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
	}

	const ts = new Date().toISOString().replace(/[:.]/g, "-");
	const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");

	const [blob, , { blobs: existing }] = await Promise.all([
		put("menu/current.pdf", file, { access: "public", allowOverwrite: true }),
		put(`menu/history/${ts}-${safeName}`, file, { access: "public" }),
		list({ prefix: "menu/history/" }),
	]);

	const sorted = existing.sort(
		(a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime(),
	);
	// sorted is pre-new-upload; new entry pushes count to existing.length + 1
	const overflow = sorted.slice(0, Math.max(0, sorted.length + 1 - HISTORY_LIMIT));
	if (overflow.length > 0) {
		await Promise.all(overflow.map((b) => del(b.url)));
	}

	return NextResponse.json({ url: blob.url });
}

export async function GET(request: NextRequest) {
	if (!requireAuth(request)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { blobs } = await list({ prefix: "menu/history/" });
	const history = blobs
		.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
		.map((b) => ({
			url: b.url,
			pathname: b.pathname,
			uploadedAt: b.uploadedAt,
		}));

	return NextResponse.json({ history });
}
