import Link from "next/link";

const navLinks = [
  { label: "Nosotros", href: "#historia" },
  { label: "Experiencia", href: "#comunidad" },
  { label: "Cocina", href: "#cocina" },
  { label: "¿Cómo funciona?", href: "#proceso" },
  { label: "¿Preguntas?", href: "#faq" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-dark text-cream border-b border-black/30">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* Top row: logo + tagline, centered */}
        <div className="pt-5 pb-3 flex flex-col items-center gap-1.5">
          <Link
            href="#top"
            className="font-serif text-3xl sm:text-[2rem] tracking-tight leading-none"
          >
            <span className="text-white">La </span>
            <span className="text-amber italic">Junta</span>
          </Link>
          <p className="font-serif italic text-cream/70 text-[0.78rem] sm:text-[0.85rem]">
            Cada junta un viaje de ida y vuelta al hogar
          </p>
        </div>

        {/* Bottom row: nav + CTA */}
        <div className="border-t border-white/10 py-3 flex items-center justify-between gap-4">
          <span className="hidden md:block w-[7.5rem]" aria-hidden />
          <nav className="flex-1 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.82rem] tracking-wide text-cream/85">
            {navLinks.map((l, i) => (
              <span key={l.href} className="flex items-center gap-x-7">
                <a
                  href={l.href}
                  className="hover:text-amber transition-colors"
                >
                  {l.label}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-cream/30 select-none" aria-hidden>
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>
          <a
            href="#menu"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-amber hover:bg-amber-warm text-white text-[0.72rem] tracking-[0.18em] uppercase font-medium px-5 py-2.5 transition-colors whitespace-nowrap"
          >
            Menú de Mayo
          </a>
        </div>
      </div>
    </header>
  );
}
