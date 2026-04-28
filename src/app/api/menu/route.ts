import { put } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const password = request.headers.get("x-admin-password");
	if (password !== process.env.ADMIN_PASSWORD) {
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

	const blob = await put("menu/current.pdf", file, {
		access: "public",
		allowOverwrite: true,
	});

	return NextResponse.json({ url: blob.url });
}
