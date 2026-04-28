"use client";

import { Leaf } from "@phosphor-icons/react/dist/ssr";
import { useCallback, useState, useTransition } from "react";
import type { DictType } from "@/app/[lang]/dictionaries";
import Eyebrow from "../ui/Eyebrow";
import { submitBooking } from "@/app/actions/submitBooking";

const SELECT_STYLE = {
	backgroundImage:
		"url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22 stroke=%22%232d2416%22 stroke-width=%221.5%22><polyline points=%223 5 6 8 9 5%22/></svg>')",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "right 1rem center",
	paddingRight: "2.5rem",
} as const;

export default function BookingForm({ dict }: { dict: DictType["reserva"] }) {
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState(false);
	const [accepted, setAccepted] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [fields, setFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	});
	const [extraGuestsCount, setExtraGuestsCount] = useState(0);
	const [guests, setGuests] = useState<
		Array<{ name: string; allergies: string[]; otherAllergy: string }>
	>(() =>
		Array.from({ length: 5 }, () => ({
			name: "",
			allergies: [],
			otherAllergy: "",
		})),
	);

	const totalGuests = extraGuestsCount + 1;

	const allValid = guests
		.slice(0, totalGuests)
		.every(
			(g, i) =>
				(i === 0 || g.name.trim() !== "") &&
				(!g.allergies.includes("otra") || g.otherAllergy.trim() !== ""),
		);

	const canSubmit =
		accepted &&
		fields.firstName.trim() !== "" &&
		fields.lastName.trim() !== "" &&
		fields.email.trim() !== "" &&
		fields.phone.trim() !== "" &&
		allValid;

	const toggleGuestAllergy = useCallback(
		(guestIdx: number, key: string) =>
			setGuests((prev) =>
				prev.map((g, i) =>
					i !== guestIdx
						? g
						: {
								...g,
								allergies: g.allergies.includes(key)
									? g.allergies.filter((k) => k !== key)
									: [...g.allergies, key],
							},
				),
			),
		[],
	);

	const setGuestOtherAllergy = useCallback(
		(guestIdx: number, value: string) =>
			setGuests((prev) =>
				prev.map((g, i) =>
					i !== guestIdx ? g : { ...g, otherAllergy: value },
				),
			),
		[],
	);

	const setGuestName = useCallback(
		(guestIdx: number, value: string) =>
			setGuests((prev) =>
				prev.map((g, i) => (i !== guestIdx ? g : { ...g, name: value })),
			),
		[],
	);

	const handleField =
		(key: keyof typeof fields) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
			setFields((prev) => ({ ...prev, [key]: e.target.value }));

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!canSubmit || isPending) return;
		const honeypot =
			(e.currentTarget.elements.namedItem("website") as HTMLInputElement)
				?.value ?? "";

		setSubmitError(false);
		startTransition(async () => {
			const result = await submitBooking({
				firstName: fields.firstName,
				lastName: fields.lastName,
				email: fields.email,
				phone: fields.phone,
				guests: guests.slice(0, totalGuests).map((g, i) => ({
					name:
						i === 0
							? `${fields.firstName} ${fields.lastName}`
							: g.name,
					allergies: g.allergies,
					otherAllergy: g.otherAllergy,
				})),
				honeypot,
			});
			if (result.ok) {
				setSubmitted(true);
			} else {
				setSubmitError(true);
			}
		});
	};

	return (
		<section id="reserva" className="bg-sand px-6 py-16 sm:py-20 paper-grain">
			<div className="mx-auto max-w-205 flex flex-col items-center gap-8 text-center">
				<Eyebrow withDiamond>{dict.eyebrow}</Eyebrow>

				<h2 className="text-3xl sm:text-4xl md:text-[3.25rem] leading-[1.1] tracking-tight font-semibold text-dark">
					{dict.heading}
				</h2>

				<p className="italic text-[1.05rem] sm:text-[1.15rem] text-dark/80 max-w-140">
					{dict.subtext}
				</p>

				{submitted ? (
					<div className="mt-6 w-full rounded-xl bg-cream/70 border border-dark/15 px-8 py-10 text-dark">
						<p className="text-2xl mb-2 flex items-center justify-center gap-2 font-semibold">
							<Leaf
								size={22}
								weight="duotone"
								className="text-amber"
								aria-hidden
							/>
							{dict.successTitle}
						</p>
						<p className="text-[1.05rem] text-dark/85">{dict.successBody}</p>
					</div>
				) : (
					<form
						onSubmit={handleSubmit}
						className="mt-6 w-full text-left"
						noValidate
					>
						{/* Honeypot — hidden from real users, catches bots that fill all fields */}
						<input
							type="text"
							name="website"
							tabIndex={-1}
							autoComplete="off"
							aria-hidden="true"
							style={{ display: "none" }}
						/>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
							<div>
								<label className="field-label" htmlFor="firstName">
									{dict.fields.nombre}{" "}
									<span className="req">{dict.fields.required}</span>
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									required
									autoComplete="given-name"
									placeholder={dict.placeholders.nombre}
									className="field"
									value={fields.firstName}
									onChange={handleField("firstName")}
								/>
							</div>
							<div>
								<label className="field-label" htmlFor="lastName">
									{dict.fields.apellido}{" "}
									<span className="req">{dict.fields.required}</span>
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									required
									autoComplete="family-name"
									placeholder={dict.placeholders.apellido}
									className="field"
									value={fields.lastName}
									onChange={handleField("lastName")}
								/>
							</div>

							<div className="sm:col-span-2">
								<label className="field-label" htmlFor="email">
									{dict.fields.email}{" "}
									<span className="req">{dict.fields.required}</span>
								</label>
								<input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									placeholder={dict.placeholders.email}
									className="field"
									value={fields.email}
									onChange={handleField("email")}
								/>
							</div>

							<div className="sm:col-span-2">
								<label className="field-label" htmlFor="phone">
									{dict.fields.celular}{" "}
									<span className="req">{dict.fields.required}</span>
								</label>
								<input
									id="phone"
									name="phone"
									type="tel"
									required
									inputMode="tel"
									autoComplete="tel"
									placeholder={dict.placeholders.celular}
									className="field"
									value={fields.phone}
									onChange={handleField("phone")}
								/>
							</div>

							<div className="sm:col-span-2">
								<label className="field-label" htmlFor="extraGuests">
									{dict.fields.extras}
								</label>
								<select
									id="extraGuests"
									name="extraGuests"
									value={String(extraGuestsCount)}
									onChange={(e) =>
										setExtraGuestsCount(Number(e.target.value))
									}
									className="field appearance-none"
									style={SELECT_STYLE}
								>
									<option value="0">{dict.extrasOptions.solo}</option>
									<option value="1">{dict.extrasOptions.mas1}</option>
									<option value="2">{dict.extrasOptions.mas2}</option>
									<option value="3">{dict.extrasOptions.mas3}</option>
									<option value="4">{dict.extrasOptions.mas4}</option>
								</select>
							</div>

							<div className="sm:col-span-2 flex flex-col gap-4 mt-2">
								<p className="field-label">{dict.fields.alergiaHeading}</p>
								<p className="text-[0.8rem] text-dark/55 -mt-2">{dict.fields.alergiaHint}</p>
								{guests.slice(0, totalGuests).map((guest, i) => (
									<details
										key={i}
										open
										className="rounded-lg border border-dark/15 bg-[#f0e6d3]"
									>
										<summary className="flex items-center justify-between gap-3 px-4 py-3 text-[0.85rem] font-medium text-dark cursor-pointer select-none">
											{i === 0
												? dict.fields.alergiaYo
												: `${dict.fields.guestLabel} ${i + 1}`}
											<span
												className="accordion-icon text-dark/50"
												aria-hidden
											/>
										</summary>
										<div className="px-4 pb-4 pt-1 flex flex-col gap-3">
											{i > 0 && (
												<div>
													<label
														className="field-label"
														htmlFor={`guest-name-${i}`}
													>
														{dict.fields.guestName}{" "}
														<span className="req">
															{dict.fields.required}
														</span>
													</label>
													<input
														id={`guest-name-${i}`}
														type="text"
														placeholder={dict.placeholders.guestName}
														className="field"
														value={guest.name}
														onChange={(e) => setGuestName(i, e.target.value)}
														required
													/>
												</div>
											)}
											<div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
												{(
													Object.entries(dict.alergiaOptions) as [
														string,
														string,
													][]
												).map(([key, label]) => (
													<label
														key={key}
														className="flex items-center gap-2.5 cursor-pointer text-[0.9rem] text-dark/85 leading-snug select-none"
													>
														<input
															type="checkbox"
															name={`allergy-${i}`}
															value={key}
															checked={guest.allergies.includes(key)}
															onChange={() => toggleGuestAllergy(i, key)}
															className="w-4 h-4 shrink-0 accent-amber"
														/>
														{label}
													</label>
												))}
											</div>
											{guest.allergies.includes("otra") && (
												<input
													type="text"
													placeholder={dict.fields.alergiaOtra}
													className="field mt-3"
													value={guest.otherAllergy}
													onChange={(e) =>
														setGuestOtherAllergy(i, e.target.value)
													}
												/>
											)}
										</div>
									</details>
								))}
							</div>

							<label className="sm:col-span-2 mt-2 flex items-start gap-3 cursor-pointer text-[0.95rem] text-dark/85 leading-snug">
								<input
									type="checkbox"
									required
									checked={accepted}
									onChange={(e) => setAccepted(e.target.checked)}
									className="mt-1 w-4 h-4 accent-amber"
								/>
								<span>
									{dict.consent.pre}
									<a
										href="#faq"
										className="text-dark hover:text-amber underline underline-offset-2 transition-colors"
									>
										{dict.consent.linkLabel}
									</a>
									{dict.consent.post}
								</span>
							</label>

							{submitError && (
								<p className="sm:col-span-2 text-sm text-red-600 text-center">
									{dict.submitError}
								</p>
							)}

							<button
								type="submit"
								disabled={!canSubmit || isPending}
								className="sm:col-span-2 mt-4 mx-auto inline-flex items-center justify-center rounded-full bg-dark hover:bg-[#1f190f] disabled:bg-dark/30 disabled:text-dark/40 disabled:cursor-not-allowed text-cream text-[0.78rem] sm:text-[0.85rem] tracking-[0.22em] uppercase font-semibold px-12 py-4 transition-colors"
							>
								{isPending ? dict.submitting : dict.submit}
							</button>
						</div>
					</form>
				)}
			</div>
		</section>
	);
}
