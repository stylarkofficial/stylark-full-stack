import { useScrollReveal } from "../../../../hooks/useScrollReveal";

export function PhilosophySection() {
  const ref = useScrollReveal();
  const phrases = ["Built with Precision.", "Engineered for Scale.", "Designed for Longevity."];

  return (
    <section
      id="philosophy"
      ref={ref}
      className="px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "#F8F7F4", paddingTop: "clamp(128px, 13vw, 200px)", paddingBottom: "clamp(128px, 13vw, 200px)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {phrases.map((phrase, i) => (
          <div key={phrase}>
            <h2
              className={`reveal reveal-delay-${(i + 1) * 2} trust-line`}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#0E0E0E",
                marginBottom: i < phrases.length - 1 ? "48px" : "0",
                letterSpacing: "-0.01em",
              }}
            >
              {phrase}
            </h2>
            {i < phrases.length - 1 && (
              <div
                className="trust-divider reveal"
                style={{
                  width: "60px",
                  margin: "0 auto 48px auto",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
