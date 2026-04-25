import SectionHeader from "./SectionHeader";

const steps = [
  {
    n: 1,
    title: "Regístrate",
    body: "Cada mes te llega el menú, la fecha y el lugar para que llegues preparado y con tiempo de organizar tu agenda.",
  },
  {
    n: 2,
    title: "Reserva tu lugar",
    body: "Asegura tu silla en la mesa: los cupos se llenan rápido. Recibirás un correo con la confirmación de tu reserva.",
  },
  {
    n: 3,
    title: "Confirmamos el menú",
    body: "Eliges entre 2 opciones de menú directo desde el correo de confirmación, y luego completas el pago.",
  },
];

export default function Proceso() {
  return (
    <section
      id="proceso"
      className="relative bg-cream paper-grain px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1000px] flex flex-col items-center gap-14">
        <SectionHeader eyebrow="El Proceso" heading={<>Cómo funciona</>} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full mt-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber text-white font-serif text-3xl flex items-center justify-center shadow-[0_15px_25px_-12px_rgba(139,94,60,0.6)]">
                  {s.n}
                </div>
              </div>
              <h3 className="font-serif text-2xl sm:text-[1.6rem] text-dark font-medium">
                {s.title}
              </h3>
              <p className="font-serif text-[1rem] leading-[1.7] text-dark/85 max-w-[260px]">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="hairline-amber hairline w-full max-w-[420px] mt-4">
          <span className="diamond text-base">♦</span>
        </div>

        <div className="flex flex-col items-center text-center gap-5 max-w-[380px]">
          <div className="w-16 h-16 rounded-full bg-amber text-white flex items-center justify-center shadow-[0_15px_25px_-12px_rgba(139,94,60,0.6)]">
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="6 13 12 19 18 13" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl sm:text-[1.6rem] text-dark font-medium">
            Llega y disfruta
          </h3>
          <p className="font-serif text-[1rem] leading-[1.7] text-dark/85">
            Llega con hambre, con ganas de compartir, y con tiempo para
            quedarte. Del resto nos encargamos nosotros.
          </p>
        </div>
      </div>
    </section>
  );
}
