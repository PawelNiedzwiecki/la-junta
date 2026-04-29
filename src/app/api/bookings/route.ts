import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

const supabase = createClient(
	process.env.SUPABASE_URL as string,
	process.env.SUPABASE_SERVICE_ROLE_KEY as string,
);

const COLUMNS = [
	"submitted_at",
	"booker_name",
	"email",
	"phone",
	"guest_role",
	"guest_name",
	"allergies",
	"other_allergy",
	"total_guests",
	"event_name",
	"event_date",
];

function toCsv(rows: Record<string, unknown>[]): string {
	const escapeCell = (v: unknown) => {
		const s = v == null ? "" : String(v);
		return s.includes(",") || s.includes('"') || s.includes("\n")
			? `"${s.replace(/"/g, '""')}"`
			: s;
	};
	const header = COLUMNS.join(",");
	const body = rows.map((r) => COLUMNS.map((c) => escapeCell(r[c])).join(",")).join("\n");
	return `${header}\n${body}`;
}

export async function GET(request: NextRequest) {
	const password = request.headers.get("x-admin-password");
	if (password !== process.env.ADMIN_PASSWORD) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { data, error } = await supabase
		.from("bookings")
		.select("*")
		.order("submitted_at", { ascending: true });

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const csv = toCsv(data ?? []);
	const date = new Date().toISOString().slice(0, 10);

	return new NextResponse(csv, {
		headers: {
			"Content-Type": "text/csv",
			"Content-Disposition": `attachment; filename="bookings-${date}.csv"`,
		},
	});
}
