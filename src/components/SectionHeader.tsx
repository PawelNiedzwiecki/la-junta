import Eyebrow from "./Eyebrow";

type Props = {
  eyebrow: string;
  heading: React.ReactNode;
  withRules?: boolean;
  tone?: "light" | "dark";
  italic?: boolean;
};

export default function SectionHeader({
  eyebrow,
  heading,
  withRules = false,
  tone = "light",
  italic = false,
}: Props) {
  const headingColor = tone === "dark" ? "text-cream" : "text-dark";
  return (
    <header className="flex flex-col items-center text-center gap-5">
      {withRules ? (
        <div className="hairline">
          <Eyebrow withDiamond>{eyebrow}</Eyebrow>
        </div>
      ) : (
        <Eyebrow withDiamond>{eyebrow}</Eyebrow>
      )}
      <h2
        className={`font-serif ${headingColor} text-4xl sm:text-5xl md:text-[3.25rem] leading-[1.05] tracking-tight ${
          italic ? "italic font-light" : "font-medium"
        }`}
      >
        {heading}
      </h2>
    </header>
  );
}
