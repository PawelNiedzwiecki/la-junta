import SectionHeader from "./SectionHeader";
import KitchenSceneIllustration from "./KitchenSceneIllustration";

export default function Cocina() {
  return (
    <section
      id="cocina"
      className="relative bg-cream paper-grain px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[900px] flex flex-col items-center gap-10">
        <SectionHeader
          eyebrow="Nuestra Cocina"
          heading={<>Hasta nuestra londinense cocina</>}
        />

        <figure className="w-full mt-4">
          <div className="overflow-hidden rounded-sm border border-amber/15 shadow-[0_30px_60px_-30px_rgba(45,36,22,0.35)]">
            <KitchenSceneIllustration className="w-full h-auto block" />
          </div>
          <figcaption className="eyebrow mt-4 text-center text-muted/80">
            Mesón rústico · cobre, pizarra y producto fresco
          </figcaption>
        </figure>

        <div className="mt-6 flex flex-col gap-6 text-center text-[1.05rem] sm:text-[1.1rem] leading-[1.75] text-dark/90 font-serif">
          <p>
            Recogemos sabores de la costa al campo: pescados que recuerdan al
            mar de Valparaíso, hierbas de huerta, choclo cocido despacio,
            ajíes que despiertan la mesa. Buscamos el ingrediente más humilde
            y le damos el lugar de honor.
          </p>
          <p>
            Cada plato es una historia chica que cuenta una grande: la del
            país que se cocina entero en una olla. No queremos sorprender con
            artificios, queremos volver a ese sabor que uno reconoce sin
            saber por qué — el de la cocina de la abuela, el del puesto de la
            feria, el del fogón de domingo.
          </p>
          <p className="italic font-semibold text-amber">
            En lo simple está la belleza.
          </p>
        </div>
      </div>
    </section>
  );
}
