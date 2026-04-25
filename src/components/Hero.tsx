import Eyebrow from "./Eyebrow";
import PergolaIllustration from "./PergolaIllustration";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative bg-cream paper-grain px-6 pt-20 pb-24 sm:pt-24 sm:pb-28"
    >
      <div className="mx-auto max-w-[900px] flex flex-col items-center text-center gap-8">
        <Eyebrow>Experiencia Gastronómica · Londres</Eyebrow>

        <PergolaIllustration className="w-full max-w-[520px] h-auto" />

        <h1 className="font-serif tracking-tight leading-[0.95] text-[4.5rem] sm:text-[6rem] md:text-[7.5rem]">
          <span className="text-dark font-medium">La </span>
          <span className="text-amber italic font-medium">Junta</span>
        </h1>

        <div className="hairline-amber hairline w-full max-w-[420px]">
          <span className="diamond text-base">♦</span>
        </div>

        <p className="font-serif text-2xl sm:text-[1.7rem] leading-snug text-dark max-w-[640px]">
          La mesa en Londres pero{" "}
          <span className="font-semibold text-amber">el alma en Chile</span>
        </p>

        <p className="font-serif italic text-lg sm:text-xl text-muted/90 max-w-[560px]">
          Cada junta un viaje de ida y vuelta al hogar
        </p>
      </div>
    </section>
  );
}
