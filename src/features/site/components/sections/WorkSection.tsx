import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../../../../hooks/useScrollReveal";
import { projects } from "../../data/projects";

type WorkSectionProps = {
  enableFloatingPreview: boolean;
};

export function WorkSection({ enableFloatingPreview }: WorkSectionProps) {
  const ref = useScrollReveal();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const hoveredProject = hoveredIndex !== null ? projects[hoveredIndex] : null;

  useEffect(() => {
    if (!enableFloatingPreview) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (hoveredIndex !== null && previewRef.current) {
        const offsetX = window.innerWidth / 2 > targetX ? 40 : -390;
        previewRef.current.style.left = `${currentX + offsetX}px`;
        previewRef.current.style.top = `${currentY - 225}px`;

        const deltaX = targetX - currentX;
        const rotation = deltaX * 0.02;
        const media = previewRef.current.querySelector(".work-image-reveal-media") as HTMLElement | null;
        if (media) {
          media.style.transform = `rotate(${rotation}deg)`;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [hoveredIndex, enableFloatingPreview]);

  return (
    <section
      id="work"
      ref={ref}
      className="px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "#FFFFFF", paddingTop: "160px", paddingBottom: "160px" }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="reveal"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A962",
            marginBottom: "32px",
          }}
        >
          Selected Work
        </p>
        <h2
          className="reveal reveal-delay-1 section-heading"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: "#0E0E0E",
            marginBottom: "80px",
          }}
        >
          Portfolio
        </h2>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <a
              key={p.title}
              href={p.url || "#contact"}
              className={`reveal reveal-delay-${i + 1} work-item`}
              style={{
                display: "block",
                borderTop: "1px solid rgba(14, 14, 14, 0.08)",
                padding: "48px 0",
                textDecoration: "none",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              target={p.url ? "_blank" : undefined}
              rel={p.url ? "noreferrer" : undefined}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="work-item-line" />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto minmax(0, 1fr) auto",
                  alignItems: "center",
                  gap: "32px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#C9A962",
                    letterSpacing: "0.05em",
                    opacity: hoveredIndex === i ? 1 : 0.7,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ minWidth: 0 }}>
                  <h3
                    className="work-title"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(28px, 5vw, 56px)",
                      fontWeight: 400,
                      color: "#0E0E0E",
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                      transition: "letter-spacing 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease",
                    }}
                  >
                    {p.title}
                  </h3>
                  <div
                    className="md:hidden"
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      alignItems: "center",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#6E6E6E",
                    }}
                  >
                    <span>{p.category}</span>
                    <span style={{ color: "#C9A962" }}>•</span>
                    <span>{p.year}</span>
                    <span style={{ color: "#C9A962" }}>•</span>
                    <span style={{ color: "#B8860B" }}>{p.status}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <span
                    className="hidden md:inline"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: hoveredIndex === i ? "#0E0E0E" : "#6E6E6E",
                      whiteSpace: "nowrap",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {p.category}
                  </span>
                  <span
                    className="hidden md:inline"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "#AAAAAA",
                    }}
                  >
                    {p.year}
                  </span>
                  <span
                    className="hidden md:inline"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "#B8860B",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.status}
                  </span>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: hoveredIndex === i ? "#C9A962" : "transparent",
                      border: `1px solid ${hoveredIndex === i ? "#C9A962" : "rgba(14, 14, 14, 0.1)"}`,
                      borderRadius: "50%",
                      opacity: hoveredIndex === i ? 1 : 0,
                      transform: hoveredIndex === i ? "translateX(0) rotate(0deg)" : "translateX(-20px) rotate(-45deg)",
                      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={hoveredIndex === i ? "#FFFFFF" : "#0E0E0E"}
                      strokeWidth="2"
                      style={{ width: "18px", height: "18px" }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
          <div style={{ borderTop: "1px solid rgba(14, 14, 14, 0.08)" }} />
        </div>
      </div>

      {enableFloatingPreview && (
        <div
          ref={previewRef}
          className={`work-image-reveal ${hoveredProject ? "visible" : ""}`}
          style={{
            background: hoveredProject?.color || "#1a1a2e",
            width: "520px",
            height: "320px",
            aspectRatio: "16/10",
            borderRadius: "18px",
          }}
        >
          {hoveredProject?.previewImage ? (
            <img
              src={hoveredProject.previewImage}
              alt={`${hoveredProject.title} preview`}
              className="work-image-reveal-media"
              style={{
                width: "100%",
                height: "100%",
                objectFit: hoveredProject.previewFit || "contain",
                objectPosition: hoveredProject.previewPosition || "center",
              }}
            />
          ) : (
            <div className="work-image-reveal-inner">{hoveredProject?.initials || ""}</div>
          )}
        </div>
      )}
    </section>
  );
}


