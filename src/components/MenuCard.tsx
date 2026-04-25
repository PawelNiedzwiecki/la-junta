export default function MenuCard() {
  return (
    <section
      id="menu"
      className="relative bg-dark text-cream px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[900px]">
        <div className="rounded-2xl bg-dark-card border border-amber/15 px-6 sm:px-12 py-14 sm:py-16 flex flex-col items-center text-center gap-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
          <span className="diamond text-base">♦</span>

          <p className="eyebrow text-amber">Nuestro Menú</p>

          <h2 className="font-serif text-cream text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.1] tracking-tight font-medium max-w-[760px]">
            La junta del 9 de Mayo ya se está cocinando
          </h2>

          <div className="mt-2 inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 rounded-full border border-amber/40 bg-amber/10 px-6 py-3 text-[0.85rem] sm:text-[0.9rem] text-cream/90 max-w-full">
            <span className="font-medium tracking-wide">
              <span className="text-amber">⌚</span> 14:00 · cerca de London
              Bridge
            </span>
            <span className="hidden sm:inline text-cream/40">·</span>
            <span className="italic text-cream/75">
              recuerda elegir tu opción de menú
            </span>
          </div>

          <p className="font-serif italic text-[1.1rem] sm:text-[1.2rem] leading-[1.7] text-cream/85 max-w-[640px] mt-2">
            <span className="not-italic font-semibold text-amber">
              ¿Qué nos trae este mes?
            </span>{" "}
            un pisco sour de bienvenida, sabores de costa y campo en un mismo
            plato, choclo cocinado despacio sobre brasa, hierbas criollas,
            vino tinto y un postre que sabe a domingo. Una mesa larga, una
            tarde lenta, y todo el tiempo del mundo para conversar.
          </p>

          <a
            href="#reserva"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-amber hover:bg-amber-warm text-white text-[0.78rem] sm:text-[0.82rem] tracking-[0.2em] uppercase font-medium px-8 sm:px-10 py-4 transition-colors"
          >
            Revisa nuestra mesa de Mayo
          </a>

          <a
            href="#reserva"
            className="text-cream/85 hover:text-amber italic font-serif text-[1.05rem] underline underline-offset-4 decoration-cream/40 transition-colors"
          >
            ¿Te apuntas?
          </a>
        </div>
      </div>
    </section>
  );
}
