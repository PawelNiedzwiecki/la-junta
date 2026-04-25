"use client";

import { useState } from "react";
import { Leaf } from "@phosphor-icons/react";
import Eyebrow from "../ui/Eyebrow";
import type { DictType } from "@/app/[lang]/dictionaries";

const DIAL_CODES = [
	{ code: "+44", flag: "🇬🇧", label: "Reino Unido" },
	{ code: "+34", flag: "🇪🇸", label: "España" },
	{ code: "+51", flag: "🇵🇪", label: "Perú" },
	{ code: "+56", flag: "🇨🇱", label: "Chile" },
	{ code: "+57", flag: "🇨🇴", label: "Colombia" },
	{ code: "+52", flag: "🇲🇽", label: "México" },
	{ code: "+54", flag: "🇦🇷", label: "Argentina" },
	{ code: "+1",  flag: "🇺🇸", label: "EE.UU." },
];

export default function ReservaForm({ dict }: { dict: DictType["reserva"] }) {
	const [submitted, setSubmitted] = useState(false);
	const [accepted, setAccepted] = useState(false);
	const [dialCode, setDialCode] = useState("+44");
	const [fields, setFields] = useState({
		nombre: "",
		apellido: "",
		email: "",
		celular: "",
	});
	const [extrasCount, setExtrasCount] = useState(0);
	const [guests, setGuests] = useState<Array<{ alergias: string[]; alergiaOtra: string }>>(
		() => Array.from({ length: 5 }, () => ({ alergias: [], alergiaOtra: "" }))
	);

	const totalGuests = extrasCount + 1;

	const allValid = guests
		.slice(0, totalGuests)
		.every((g) => !g.alergias.includes("otra") || g.alergiaOtra.trim() !== "");

	const canSubmit =
		accepted &&
		fields.nombre.trim() !== "" &&
		fields.apellido.trim() !== "" &&
		fields.email.trim() !== "" &&
		fields.celular.trim() !== "" &&
		allValid;

	const toggleGuestAlergia = (guestIdx: number, key: string) =>
		setGuests((prev) =>
			prev.map((g, i) =>
				i !== guestIdx
					? g
					: {
							...g,
							alergias: g.alergias.includes(key)
								? g.alergias.filter((k) => k !== key)
								: [...g.alergias, key],
					  }
			)
		);

	const setGuestAlergiaOtra = (guestIdx: number, value: string) =>
		setGuests((prev) =>
			prev.map((g, i) => (i !== guestIdx ? g : { ...g, alergiaOtra: value }))
		);

	const handleField =
		(key: keyof typeof fields) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
			setFields((prev) => ({ ...prev, [key]: e.target.value }));

	return (
		<section
			id="reserva"
			className="bg-sand px-6 py-24 sm:py-28 paper-grain"
			style={{ background: "#d4c4a0" }}
		>
			<div className="mx-auto max-w-[820px] flex flex-col items-center gap-8 text-center">
				<Eyebrow withDiamond>{dict.eyebrow}</Eyebrow>

				<h2 className="text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.05] tracking-tight font-semibold text-dark">
					{dict.heading}
				</h2>

				<p className="italic text-[1.05rem] sm:text-[1.15rem] text-dark/80 max-w-[560px]">
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
						onSubmit={(e) => {
							e.preventDefault();
							setSubmitted(true);
						}}
						className="mt-6 w-full text-left"
						noValidate
					>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
							<div>
								<label className="field-label" htmlFor="nombre">
									{dict.fields.nombre}{" "}
									<span className="req">{dict.fields.required}</span>
								</label>
								<input
									id="nombre"
									name="nombre"
									type="text"
									required
									autoComplete="given-name"
									placeholder={dict.placeholders.nombre}
									className="field"
									value={fields.nombre}
									onChange={handleField("nombre")}
								/>
							</div>
							<div>
								<label className="field-label" htmlFor="apellido">
									{dict.fields.apellido}{" "}
									<span className="req">{dict.fields.required}</span>
								</label>
								<input
									id="apellido"
									name="apellido"
									type="text"
									required
									autoComplete="family-name"
									placeholder={dict.placeholders.apellido}
									className="field"
									value={fields.apellido}
									onChange={handleField("apellido")}
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
								<label className="field-label" htmlFor="celular">
									{dict.fields.celular}{" "}
									<span className="req">{dict.fields.required}</span>
								</label>
								<div className="flex items-stretch gap-2">
									<select
										aria-label="Prefijo internacional"
										value={dialCode}
										onChange={(e) => setDialCode(e.target.value)}
										className="field appearance-none cursor-pointer shrink-0 px-2 pr-6 text-[0.85rem]"
										style={{
											width: "5.5rem",
											backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22 stroke=%22%232d2416%22 stroke-width=%221.5%22><polyline points=%223 5 6 8 9 5%22/></svg>')",
											backgroundRepeat: "no-repeat",
											backgroundPosition: "right 0.4rem center",
										}}
									>
										{DIAL_CODES.map((d) => (
											<option key={d.code} value={d.code}>
												{d.flag} {d.code}
											</option>
										))}
									</select>
									<input
										id="celular"
										name="celular"
										type="tel"
										required
										inputMode="tel"
										autoComplete="tel-national"
										placeholder={dict.placeholders.celular}
										className="field flex-1"
										value={fields.celular}
										onChange={handleField("celular")}
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label className="field-label" htmlFor="extras">
									{dict.fields.extras}
								</label>
								<select
									id="extras"
									name="extras"
									value={String(extrasCount)}
									onChange={(e) => setExtrasCount(Number(e.target.value))}
									className="field appearance-none"
									style={{
										backgroundImage:
											"url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22 stroke=%22%232d2416%22 stroke-width=%221.5%22><polyline points=%223 5 6 8 9 5%22/></svg>')",
										backgroundRepeat: "no-repeat",
										backgroundPosition: "right 1rem center",
										paddingRight: "2.5rem",
									}}
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
								{guests.slice(0, totalGuests).map((guest, i) => (
									<details key={i} open className="rounded-lg border border-dark/10 bg-cream/40">
										<summary className="flex items-center justify-between gap-3 px-4 py-3 text-[0.85rem] font-medium text-dark cursor-pointer select-none">
											{i === 0 ? dict.fields.alergiaYo : `${dict.fields.guestLabel} ${i + 1}`}
											<span className="accordion-icon text-dark/50" aria-hidden />
										</summary>
										<div className="px-4 pb-4 pt-1">
											<div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
												{(Object.entries(dict.alergiaOptions) as [string, string][]).map(([key, label]) => (
													<label key={key} className="flex items-center gap-2.5 cursor-pointer text-[0.9rem] text-dark/85 leading-snug select-none">
														<input
															type="checkbox"
															name={`alergia-${i}`}
															value={key}
															checked={guest.alergias.includes(key)}
															onChange={() => toggleGuestAlergia(i, key)}
															className="w-4 h-4 shrink-0 accent-[#8b5e3c]"
														/>
														{label}
													</label>
												))}
											</div>
											{guest.alergias.includes("otra") && (
												<input
													type="text"
													placeholder={dict.fields.alergiaOtra}
													className="field mt-3"
													value={guest.alergiaOtra}
													onChange={(e) => setGuestAlergiaOtra(i, e.target.value)}
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
									className="mt-1 w-4 h-4 accent-[#8b5e3c]"
								/>
								<span>
									{dict.consent.pre}
									<a
										href="#faq"
										className="text-amber underline underline-offset-2"
									>
										{dict.consent.linkLabel}
									</a>
									{dict.consent.post}
								</span>
							</label>

							<button
								type="submit"
								disabled={!canSubmit}
								className="sm:col-span-2 mt-4 w-full inline-flex items-center justify-center rounded-full bg-dark hover:bg-[#1f190f] disabled:opacity-60 disabled:cursor-not-allowed text-amber text-[0.78rem] sm:text-[0.85rem] tracking-[0.22em] uppercase font-semibold px-10 py-5 transition-colors"
							>
								{dict.submit}
							</button>
						</div>
					</form>
				)}
			</div>
		</section>
	);
}
