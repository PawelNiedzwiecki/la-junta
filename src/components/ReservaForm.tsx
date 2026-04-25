"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";

export default function ReservaForm() {
  const [submitted, setSubmitted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  return (
    <section
      id="reserva"
      className="bg-sand px-6 py-24 sm:py-28 paper-grain"
      style={{ background: "#d4c4a0" }}
    >
      <div className="mx-auto max-w-[820px] flex flex-col items-center gap-8 text-center">
        <Eyebrow withDiamond>Únete</Eyebrow>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.05] tracking-tight font-semibold text-dark">
          Reserva tu lugar para el 6 de Mayo
        </h2>

        <p className="font-serif italic text-[1.05rem] sm:text-[1.15rem] text-dark/80 max-w-[560px]">
          Compártenos tu información para asistir a la próxima junta.
        </p>

        {submitted ? (
          <div className="mt-6 w-full rounded-xl bg-cream/70 border border-dark/15 px-8 py-10 text-dark">
            <p className="font-serif text-2xl mb-2">¡Gracias! 🌾</p>
            <p className="font-serif text-[1.05rem] text-dark/85">
              Hemos recibido tu información. Te enviaremos un correo de
              confirmación con las opciones de menú a la brevedad.
            </p>
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
                  Nombre <span className="req">(Requerido)</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Tu nombre"
                  className="field"
                />
              </div>
              <div>
                <label className="field-label" htmlFor="apellido">
                  Apellido <span className="req">(Requerido)</span>
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  required
                  autoComplete="family-name"
                  placeholder="Tu apellido"
                  className="field"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="email">
                  Email <span className="req">(Requerido)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  className="field"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="celular">
                  Celular <span className="req">(Requerido)</span>
                </label>
                <div className="flex items-stretch gap-2">
                  <span className="inline-flex items-center gap-2 px-3 rounded-md bg-[#f0e6d3] border border-dark/15 text-[0.95rem] text-dark whitespace-nowrap">
                    <span aria-hidden>🇬🇧</span>
                    <span className="font-medium">+44</span>
                    <svg
                      className="w-3 h-3 text-dark/60"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <polyline points="3 5 6 8 9 5" />
                    </svg>
                  </span>
                  <input
                    id="celular"
                    name="celular"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="7700 900 000"
                    className="field flex-1"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="alergia">
                  ¿Tienes alergia alimenticia?{" "}
                  <span className="req">(Requerido)</span>
                </label>
                <select
                  id="alergia"
                  name="alergia"
                  required
                  defaultValue=""
                  className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22 stroke=%22%232d2416%22 stroke-width=%221.5%22><polyline points=%223 5 6 8 9 5%22/></svg>')] bg-no-repeat"
                  style={{
                    backgroundPosition: "right 1rem center",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="ninguna">No, ninguna</option>
                  <option value="gluten">Gluten</option>
                  <option value="lactosa">Lactosa</option>
                  <option value="frutos-secos">Frutos secos</option>
                  <option value="mariscos">Mariscos</option>
                  <option value="otra">Otra (lo detallo en el correo)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="extras">
                  ¿Quieres registrar a más personas?
                </label>
                <select
                  id="extras"
                  name="extras"
                  defaultValue="0"
                  className="field appearance-none"
                  style={{
                    backgroundImage:
                      "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22 fill=%22none%22 stroke=%22%232d2416%22 stroke-width=%221.5%22><polyline points=%223 5 6 8 9 5%22/></svg>')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="0">No, solo yo</option>
                  <option value="1">Sí, 1 persona más</option>
                  <option value="2">Sí, 2 personas más</option>
                  <option value="3">Sí, 3 personas más</option>
                  <option value="4">Sí, 4 personas más</option>
                </select>
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
                  Acepto la{" "}
                  <a
                    href="#faq"
                    className="text-amber underline underline-offset-2"
                  >
                    política de cancelación
                  </a>{" "}
                  y autorizo a La Junta a contactarme con detalles del menú,
                  fecha y ubicación del evento.
                </span>
              </label>

              <button
                type="submit"
                disabled={!accepted}
                className="sm:col-span-2 mt-4 w-full inline-flex items-center justify-center rounded-full bg-dark hover:bg-[#1f190f] disabled:opacity-60 disabled:cursor-not-allowed text-amber text-[0.78rem] sm:text-[0.85rem] tracking-[0.22em] uppercase font-semibold px-10 py-5 transition-colors"
              >
                Enviar información
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
