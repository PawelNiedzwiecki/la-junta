import SectionHeader from "./SectionHeader";

export default function Comunidad() {
  return (
    <section
      id="comunidad"
      className="relative bg-cream paper-grain px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[820px] flex flex-col items-center gap-10">
        <SectionHeader eyebrow="La Comunidad" heading={<>Quiénes somos</>} />

        <div className="hairline-amber hairline w-full max-w-[300px]">
          <span className="diamond text-base">♦</span>
        </div>

        <div className="mt-2 flex flex-col gap-6 text-center text-[1.05rem] sm:text-[1.1rem] leading-[1.75] text-dark/90 font-serif">
          <p>
            Somos un par de chilenos en Londres a los que, después de varios
            inviernos largos, empezó a faltarnos algo difícil de explicar:
            esa costumbre nuestra de juntarnos a comer sin motivo, de poner
            otro plato si llegaba alguien, de quedarse hasta tarde
            conversando porque la sobremesa también es parte de la receta.
          </p>
          <p>
            Así nació{" "}
            <span className="text-amber font-semibold">La Junta</span>: un
            supper club que se repite mes a mes, una mesa larga abierta a
            quien quiera sentarse, donde la comida chilena es la excusa y la
            comunidad, el plato principal.
          </p>
        </div>
      </div>
    </section>
  );
}
