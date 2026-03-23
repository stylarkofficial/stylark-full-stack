import { useScrollReveal } from "../../../../hooks/useScrollReveal";

export function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className="px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(120px, 12vw, 180px)", paddingBottom: "clamp(120px, 12vw, 180px)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="reveal" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#B8860B",
              marginBottom: "36px",
            }}>
              About
            </p>
            <h2 className="reveal reveal-delay-1 section-heading" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#0E0E0E",
            }}>
              We Build Premium Websites<br />At Smart Budgets.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="reveal reveal-delay-2" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "#6E6E6E",
              marginBottom: "40px",
            }}>
              Stylark builds full-stack websites, immersive 3D web experiences,
              and AI-integrated platforms for growing brands. We focus on
              affordable execution without compromising quality.
            </p>
            <div className="reveal reveal-delay-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12" style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "#0E0E0E",
                letterSpacing: "0.02em",
              }}>
                {[
                  "Custom full-stack websites",
                  "3D interactive websites",
                  "eCommerce builds (Shopify/custom stack)",
                  "Security and utility web applications",
                  "AI/ML integrations for real workflows",
                  "Deployment, maintenance, and iteration",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 py-3">
                    <span style={{ color: "#B8860B", fontSize: "8px", marginTop: "6px" }}>?</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
