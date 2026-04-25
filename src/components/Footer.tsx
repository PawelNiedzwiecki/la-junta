export default function Footer() {
  return (
    <footer className="bg-dark text-cream/80 px-6 py-14">
      <div className="mx-auto max-w-[1100px] flex flex-col items-center gap-4 text-center">
        <div className="font-serif text-2xl">
          <span className="text-white">La </span>
          <span className="text-amber italic">Junta</span>
        </div>
        <p className="font-serif italic text-cream/60 text-[0.95rem]">
          Cada junta un viaje de ida y vuelta al hogar
        </p>
        <p className="eyebrow text-cream/45 mt-3">
          Londres · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
