"use server";

import { render } from "@react-email/components";
import { google } from "googleapis";
import { createElement } from "react";
import { Resend } from "resend";
import { EVENT } from "@/config/event";
import BookingConfirmation from "@/emails/BookingConfirmation";
import BookingNotification from "@/emails/BookingNotification";

const resend = new Resend(process.env.RESEND_API_KEY);

async function appendToSheet(rows: string[][]) {
	const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);
	const auth = new google.auth.GoogleAuth({
		credentials,
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});
	const sheets = google.sheets({ version: "v4", auth });
	await sheets.spreadsheets.values.append({
		spreadsheetId: process.env.GOOGLE_SHEET_ID!,
		range: "Sheet1!A1",
		valueInputOption: "RAW",
		requestBody: { values: rows },
	});
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

export async function submitBooking(
	payload: BookingPayload,
): Promise<BookingResult> {
	if (payload.honeypot) {
		return { ok: true };
	}

	const { firstName, lastName, email, phone, guests } = payload;
	const bookerName = `${firstName} ${lastName}`;
	const submittedAt = new Date().toISOString();

	const rows: string[][] = guests.map((guest, i) => [
		submittedAt,
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
		await appendToSheet(rows);
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
				submittedAt,
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
