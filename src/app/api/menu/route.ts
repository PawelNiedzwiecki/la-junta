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

	const lang = request.nextUrl.searchParams.get("lang");
	if (lang !== "es" && lang !== "en") {
		return NextResponse.json({ error: "lang must be es or en" }, { status: 400 });
	}

	const formData = await request.formData();
	const file = formData.get("file");
	if (!(file instanceof File)) {
		return NextResponse.json({ error: "No file provided" }, { status: 400 });
	}
	if (file.type !== "application/pdf") {
		return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
	}
	const MAX_BYTES = 20 * 1024 * 1024;
	if (file.size > MAX_BYTES) {
		return NextResponse.json({ error: "File too large (max 20 MB)" }, { status: 413 });
	}

	const ts = new Date().toISOString().replace(/[:.]/g, "-");
	const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
	const historyPrefix = `menu/history-${lang}/`;

	const [historyBlob, { blobs: existing }] = await Promise.all([
		put(`${historyPrefix}${ts}-${safeName}`, file, { access: "public" }),
		list({ prefix: historyPrefix }),
	]);

	await put(
		`menu/pointer-${lang}.json`,
		JSON.stringify({ url: historyBlob.url }),
		{ access: "public", allowOverwrite: true, contentType: "application/json" },
	);

	const sorted = existing.sort(
		(a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime(),
	);
	const overflow = sorted.slice(0, Math.max(0, sorted.length + 1 - HISTORY_LIMIT));
	if (overflow.length > 0) {
		await Promise.all(overflow.map((b) => del(b.url)));
	}

	return NextResponse.json({ url: historyBlob.url });
}

export async function GET(request: NextRequest) {
	if (!requireAuth(request)) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const [{ blobs: blobsEs }, { blobs: blobsEn }] = await Promise.all([
		list({ prefix: "menu/history-es/" }),
		list({ prefix: "menu/history-en/" }),
	]);

	const sort = (blobs: typeof blobsEs) =>
		blobs
			.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
			.map((b) => ({ url: b.url, pathname: b.pathname, uploadedAt: b.uploadedAt }));

	return NextResponse.json({ historyEs: sort(blobsEs), historyEn: sort(blobsEn) });
}
