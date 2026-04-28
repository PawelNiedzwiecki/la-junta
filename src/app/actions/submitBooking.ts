"use server";

import { Resend } from "resend";
import { google } from "googleapis";
import { EVENT } from "@/config/event";
import { checkBotId } from "botid/server";

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

export type BookingResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitBooking(
  payload: BookingPayload
): Promise<BookingResult> {
  if (payload.honeypot) {
    return { ok: true };
  }

  const bot = await checkBotId();
  if (!bot.isHuman && !bot.bypassed) {
    return { ok: false, error: "bot" };
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

  const allergyRows = guests
    .map((g, i) => {
      const name = i === 0 ? bookerName : g.name || `Guest ${i + 1}`;
      const allergyList =
        g.allergies.length > 0
          ? [...g.allergies.filter((a) => a !== "other"), ...(g.otherAllergy ? [g.otherAllergy] : [])].join(", ")
          : "None";
      return `<tr><td style="padding:6px 12px">${name}</td><td style="padding:6px 12px">${allergyList}</td></tr>`;
    })
    .join("");

  const confirmHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#2d2416;max-width:560px;margin:0 auto;padding:24px">
  <h1 style="font-size:1.4rem;margin-bottom:4px">Thank you, ${firstName}!</h1>
  <p style="color:#666;margin-top:0">We've received your reservation for <strong>${EVENT.name}</strong>.</p>
  <table style="border-collapse:collapse;width:100%;margin:24px 0;background:#f9f4ec;border-radius:8px">
    <tr style="background:#2d2416;color:#f0b429">
      <th style="padding:8px 12px;text-align:left">Date</th>
      <td style="padding:8px 12px">${EVENT.dateEn}</td>
    </tr>
    <tr>
      <th style="padding:8px 12px;text-align:left">Time</th>
      <td style="padding:8px 12px">${EVENT.time}</td>
    </tr>
    <tr style="background:#f0e6d3">
      <th style="padding:8px 12px;text-align:left">Location</th>
      <td style="padding:8px 12px">${EVENT.location} — exact address sent closer to the date</td>
    </tr>
    <tr>
      <th style="padding:8px 12px;text-align:left">Party size</th>
      <td style="padding:8px 12px">${guests.length} ${guests.length === 1 ? "person" : "people"}</td>
    </tr>
  </table>
  <h2 style="font-size:1rem">Dietary requirements</h2>
  <table style="border-collapse:collapse;width:100%;background:#f9f4ec;border-radius:8px">
    <tr style="background:#2d2416;color:#f0b429">
      <th style="padding:8px 12px;text-align:left">Name</th>
      <th style="padding:8px 12px;text-align:left">Allergies</th>
    </tr>
    ${allergyRows}
  </table>
  <p style="margin-top:24px;font-size:0.875rem;color:#666">
    We'll be in touch with menu options and payment details shortly.<br>
    Questions? Reply to this email or write to <a href="mailto:${EVENT.notificationEmail}">${EVENT.notificationEmail}</a>.
  </p>
  <p style="font-size:0.75rem;color:#999;margin-top:32px">La Junta · London</p>
</body>
</html>`;

  const notifyRows = guests
    .map((g, i) => {
      const name = i === 0 ? bookerName : g.name || `Guest ${i + 1}`;
      const role = i === 0 ? "Booker" : `Guest ${i + 1}`;
      const allergyList =
        g.allergies.length > 0
          ? [...g.allergies.filter((a) => a !== "other"), ...(g.otherAllergy ? [g.otherAllergy] : [])].join(", ")
          : "None";
      return `<tr${i % 2 === 0 ? ' style="background:#f0e6d3"' : ""}><td style="padding:6px 12px">${role}</td><td style="padding:6px 12px">${name}</td><td style="padding:6px 12px">${allergyList}</td></tr>`;
    })
    .join("");

  const notifyHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#2d2416;max-width:600px;margin:0 auto;padding:24px">
  <h1 style="font-size:1.2rem">New reservation — ${EVENT.name} ${EVENT.date}</h1>
  <table style="border-collapse:collapse;width:100%;margin:16px 0;background:#f9f4ec">
    <tr><th style="padding:6px 12px;text-align:left">Name</th><td style="padding:6px 12px">${bookerName}</td></tr>
    <tr style="background:#f0e6d3"><th style="padding:6px 12px;text-align:left">Email</th><td style="padding:6px 12px">${email}</td></tr>
    <tr><th style="padding:6px 12px;text-align:left">Phone</th><td style="padding:6px 12px">${phone}</td></tr>
    <tr style="background:#f0e6d3"><th style="padding:6px 12px;text-align:left">Party size</th><td style="padding:6px 12px">${guests.length}</td></tr>
  </table>
  <h2 style="font-size:1rem">Dietary requirements</h2>
  <table style="border-collapse:collapse;width:100%">
    <tr style="background:#2d2416;color:#f0b429">
      <th style="padding:8px 12px;text-align:left">Role</th>
      <th style="padding:8px 12px;text-align:left">Name</th>
      <th style="padding:8px 12px;text-align:left">Allergies</th>
    </tr>
    ${notifyRows}
  </table>
  <p style="font-size:0.75rem;color:#999;margin-top:24px">Submitted: ${submittedAt}</p>
</body>
</html>`;

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
