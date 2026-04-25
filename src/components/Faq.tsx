import SectionHeader from "./SectionHeader";

const items: { q: string; a: React.ReactNode }[] = [
  {
    q: "¿Cuánto cuesta el ticket y dónde se realiza?",
    a: (
      <>
        El ticket de cada junta tiene un valor de £65 por persona e incluye
        el menú completo (entrada, fondo, postre) más un cóctel de
        bienvenida. Los eventos se realizan en una locación cercana a London
        Bridge — la dirección exacta se comparte en el correo de
        confirmación, una vez completado el pago.
      </>
    ),
  },
  {
    q: "¿Tengo que ser Chileno para asistir?",
    a: (
      <>
        Para nada. La Junta está abierta a quien quiera sentarse a la mesa.
        Lo único que pedimos son ganas de compartir, conversar y dejarse
        sorprender por la cocina chilena.
      </>
    ),
  },
  {
    q: "¿Qué tipo de platos sirven?",
    a: (
      <>
        Cocina chilena hecha en Londres, con guiños de costa, campo y ciudad.
        Empanadas, pescados, guisos lentos, choclo, hierbas criollas y
        postres de toda la vida. El menú cambia cada mes según la
        temporada.
      </>
    ),
  },
  {
    q: "¿Qué trae el menú?",
    a: (
      <>
        El menú de cada junta se publica en el correo de confirmación, con
        dos opciones a elegir (una de ellas siempre con alternativa
        vegetariana). Suele incluir entrada, fondo y postre.
      </>
    ),
  },
  {
    q: "¿Qué bebestibles son considerados en el menú?",
    a: (
      <>
        Cada junta incluye un pisco sour de bienvenida y una copa de vino
        chileno seleccionada para acompañar el fondo. Tenemos también agua y
        opciones sin alcohol incluidas.
      </>
    ),
  },
  {
    q: "¿Si quiero beber más de una copa de vino, qué debo hacer?",
    a: (
      <>
        Tendremos botellas adicionales disponibles para quienes quieran
        seguir. Se pagan en el momento, directamente en la mesa.
      </>
    ),
  },
  {
    q: "¿Tienen opciones vegetarianas o sin gluten?",
    a: (
      <>
        Sí. Siempre ofrecemos al menos una opción vegetariana, y podemos
        adaptar el menú a un régimen sin gluten si nos avisas con
        anticipación al reservar.
      </>
    ),
  },
  {
    q: "¿Qué sucede si tengo alergias alimentarias?",
    a: (
      <>
        Indícanoslo en el formulario de reserva y te confirmaremos por
        correo qué adaptaciones podemos hacer. Si la alergia es severa,
        seremos transparentes contigo respecto a la cocina compartida.
      </>
    ),
  },
  {
    q: "¿Con qué frecuencia hacen los eventos?",
    a: (
      <>
        Una vez al mes, generalmente un sábado o domingo de tarde. Puedes
        suscribirte para recibir las fechas con anticipación.
      </>
    ),
  },
  {
    q: "¿Puedo cancelar mi cita una vez que ya he reservado y pagado?",
    a: (
      <>
        Aceptamos cancelaciones con reembolso completo hasta 7 días antes
        del evento. Después de esa fecha, podemos transferir tu lugar a otra
        persona o a la próxima junta, según disponibilidad.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative bg-cream paper-grain px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[860px] flex flex-col items-center gap-10">
        <SectionHeader
          eyebrow="Información"
          heading={<>Políticas y preguntas frecuentes</>}
          withRules
        />

        <div className="w-full mt-6 border-t border-dark/15">
          {items.map((it, i) => (
            <details
              key={i}
              className="group border-b border-dark/15 py-5 sm:py-6"
            >
              <summary className="flex items-center justify-between gap-6 list-none">
                <span className="font-serif text-[1.15rem] sm:text-[1.3rem] text-dark text-left leading-snug pr-4">
                  {it.q}
                </span>
                <span className="text-amber accordion-icon" aria-hidden />
              </summary>
              <div className="mt-4 font-serif text-[1.02rem] sm:text-[1.08rem] leading-[1.75] text-dark/85 max-w-[720px]">
                {it.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
