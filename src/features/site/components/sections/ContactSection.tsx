import type { CSSProperties } from "react";
import { useScrollReveal } from "../../../../hooks/useScrollReveal";

const contactDetails = [
  {
    label: "Email",
    value: "stylarkofficial@gmail.com",
    href: "mailto:stylarkofficial@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 7598704942",
    href: "tel:+917598704942",
  },
  {
    label: "Phone",
    value: "+91 8754595300",
    href: "tel:+918754595300",
  },
];

export function ContactSection() {
  const ref = useScrollReveal();

  const detailCardStyle: CSSProperties = {
    display: "block",
    padding: "28px 0",
    borderTop: "1px solid rgba(14, 14, 14, 0.08)",
    textDecoration: "none",
    transition: "border-color 0.35s ease, transform 0.35s ease",
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "clamp(112px, 11vw, 160px)", paddingBottom: "clamp(112px, 11vw, 160px)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="reveal" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C9A962",
              marginBottom: "32px",
            }}>
              Contact
            </p>
            <h2 className="reveal reveal-delay-1 section-heading" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "#0E0E0E",
              marginBottom: "32px",
            }}>
              Let's Build<br />Together.
            </h2>
            <p className="reveal reveal-delay-2" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "#6E6E6E",
            }}>
              Reach out directly and we'll take it from there.
            </p>
          </div>

          <div className="flex flex-col">
            {contactDetails.map((detail, index) => (
              <a
                key={`${detail.label}-${detail.value}`}
                href={detail.href}
                className={`reveal reveal-delay-${index + 2} contact-detail-link`}
                style={detailCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopColor = "rgba(201, 169, 98, 0.55)";
                  e.currentTarget.style.transform = "translateX(8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = "rgba(14, 14, 14, 0.08)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#C9A962",
                  marginBottom: "12px",
                }}>
                  {detail.label}
                </span>
                <span style={{
                  display: "block",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#0E0E0E",
                  wordBreak: "break-word",
                }}>
                  {detail.value}
                </span>
              </a>
            ))}
            <div style={{ borderTop: "1px solid rgba(14, 14, 14, 0.08)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
