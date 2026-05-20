"use server";

import { render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { createElement } from "react";
import { Resend } from "resend";
import { EVENT } from "@/config/event";
import BookingConfirmation from "@/emails/BookingConfirmation";
import BookingNotification from "@/emails/BookingNotification";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
	process.env.SUPABASE_URL as string,
	process.env.SUPABASE_SERVICE_ROLE_KEY as string,
);

async function insertBookings(rows: string[][]) {
	const records = rows.map((r) => ({
		submitted_at: r[0],
		booker_name: r[1],
		email: r[2],
		phone: r[3],
		guest_role: r[4],
		guest_name: r[5],
		allergies: r[6],
		other_allergy: r[7],
		total_guests: Number(r[8]),
		event_name: r[9],
		event_date: r[10],
	}));
	const { error } = await supabase.from("bookings").insert(records);
	if (error) throw error;
}

export type BookingGuest = {
	name: string;
	allergies: string[];
	otherAllergy: string;
};

export type BookingPayload = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	guests: BookingGuest[];
	honeypot: string;
};

export type BookingResult = { ok: true } | { ok: false; error: string };

function validatePayload(payload: BookingPayload): boolean {
	const { firstName, lastName, email, phone, guests } = payload;
	if (!firstName.trim() || firstName.length > 100) return false;
	if (!lastName.trim() || lastName.length > 100) return false;
	if (!email.trim() || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
	if (!phone.trim() || phone.length > 30) return false;
	if (guests.length < 1 || guests.length > 5) return false;
	for (let i = 1; i < guests.length; i++) {
		if (!guests[i].name.trim() || guests[i].name.length > 100) return false;
	}
	for (const g of guests) {
		if (g.otherAllergy.length > 500) return false;
	}
	return true;
}

export async function submitBooking(
	payload: BookingPayload,
): Promise<BookingResult> {
	if (payload.honeypot) {
		return { ok: true };
	}

	if (!validatePayload(payload)) {
		return { ok: false, error: "validation" };
	}

	const { firstName, lastName, email, phone, guests } = payload;
	const bookerName = `${firstName} ${lastName}`;
	const submittedAt = new Date();
	const submittedAtFormatted = submittedAt.toLocaleString("en-GB", {
		timeZone: "Europe/London",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});

	const rows: string[][] = guests.map((guest, i) => [
		submittedAt.toISOString(),
		bookerName,
		email,
		phone,
		i === 0 ? "Booker" : `Guest ${i + 1}`,
		guest.name || bookerName,
		guest.allergies.join(", ") || "None",
		guest.otherAllergy || "",
		String(guests.length),
		EVENT.name,
		EVENT.date,
	]);

	try {
		await insertBookings(rows);
	} catch (err) {
		console.error("Sheet append failed:", err);
		return { ok: false, error: "sheet" };
	}

	const [confirmHtml, notifyHtml] = await Promise.all([
		render(createElement(BookingConfirmation, { firstName, guests })),
		render(
			createElement(BookingNotification, {
				bookerName,
				email,
				phone,
				guests,
				submittedAt: submittedAtFormatted,
			}),
		),
	]);

	try {
		await Promise.all([
			resend.emails.send({
				from: `${EVENT.fromName} <${EVENT.fromEmail}>`,
				to: email,
				subject: `Reservation confirmed — ${EVENT.name}, ${EVENT.dateEn}`,
				html: confirmHtml,
			}),
			resend.emails.send({
				from: `${EVENT.fromName} <${EVENT.fromEmail}>`,
				to: EVENT.notificationEmail,
				subject: `New booking: ${bookerName} (${guests.length} ${guests.length === 1 ? "person" : "people"})`,
				html: notifyHtml,
			}),
		]);
	} catch (err) {
		console.error("Email send failed:", err);
	}

	return { ok: true };
}
