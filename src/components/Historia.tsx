import SectionHeader from "./SectionHeader";
import TableSceneIllustration from "./TableSceneIllustration";

export default function Historia() {
  return (
    <section
      id="historia"
      className="relative bg-cream paper-grain px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[900px] flex flex-col items-center gap-10">
        <SectionHeader
          eyebrow="Nuestra Historia"
          heading={<>Desde el campo de flores bordado…</>}
        />

        <figure className="w-full mt-4">
          <div className="overflow-hidden rounded-sm border border-amber/15 shadow-[0_30px_60px_-30px_rgba(45,36,22,0.35)]">
            <TableSceneIllustration className="w-full h-auto block" />
          </div>
          <figcaption className="eyebrow mt-4 text-center text-muted/80">
            Una mesa larga, vino y los nuestros · santiago / londres
          </figcaption>
        </figure>

        <div className="mt-6 flex flex-col gap-6 text-center text-[1.05rem] sm:text-[1.1rem] leading-[1.75] text-dark/90 font-serif">
          <p>
            Crecimos entre manteles bordados con flores, ollas que hervían
            despacio toda la tarde y conversaciones que se quedaban hasta que
            el último vaso de tinto se vaciaba. La mesa nunca fue solo mesa:
            era el lugar donde se contaban los días, se reían las penas y se
            recibía a quien llegara con hambre o con noticias.
          </p>
          <p>
            Hoy, a miles de kilómetros, esa costumbre nos sigue. Trajimos a
            Londres el sabor del campo, la ciudad y la costa, y los pusimos
            sobre un mismo mantel para compartirlos con quien quiera sentarse
            con nosotros.
          </p>
          <p>
            <span className="font-semibold">
              …hasta nuestra londinense cocina.
            </span>{" "}
            Cocinamos con paciencia, con memoria, y con eso que se hereda más
            que se aprende: el gesto de quien sirve un plato pensando en el
            que lo va a recibir.
          </p>
        </div>
      </div>
    </section>
  );
}
