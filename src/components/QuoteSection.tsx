import MobileText from "./MobileText";

interface QuoteSectionProps {
  quote: string;
  author?: string;
  className?: string;
}

export default function QuoteSection({
  quote,
  author,
  className = "",
}: QuoteSectionProps) {
  return (
    <div
      className={`p-4 border-2 border-[#DAA520] rounded-md bg-[rgba(212,175,55,0.05)] ${className}`}
    >
      <MobileText variant="quote" className="italic text-center">
        "{quote}"
      </MobileText>
      {author && (
        <MobileText
          variant="small"
          className="text-center mt-3 text-[#8b7355]"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          — {author}
        </MobileText>
      )}
    </div>
  );
}
