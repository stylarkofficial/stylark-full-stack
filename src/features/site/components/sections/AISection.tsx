import { useScrollReveal } from "../../../../hooks/useScrollReveal";
import type { FxProfile } from "../../types/fx";

const aiCapabilities = [
  { title: "AI-Enhanced Websites", desc: "Web experiences with practical AI features such as smart content, recommendations, and assisted user flows." },
  { title: "Automation Workflows", desc: "Task automation that reduces manual effort and increases consistency across business operations." },
  { title: "Data Pipelines", desc: "Reliable data ingestion and transformation flows for analytics and model-backed features." },
  { title: "Security-Aware AI Usage", desc: "Applied experience from utility and security products like file and APK risk-analysis workflows." },
  { title: "Upcoming AI/ML Product", desc: "Dedicated space for your next AI/ML integrated website currently under active development." },
];

export function AISection({ fxProfile }: { fxProfile: FxProfile }) {
  const ref = useScrollReveal();
  const nodes = [
    { x: 8, y: 18 }, { x: 24, y: 32 }, { x: 38, y: 20 }, { x: 55, y: 36 },
    { x: 72, y: 22 }, { x: 88, y: 34 }, { x: 20, y: 62 }, { x: 42, y: 58 },
    { x: 64, y: 64 }, { x: 84, y: 56 },
  ];
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [1, 6], [2, 7], [3, 8], [4, 9], [6, 7], [7, 8], [8, 9],
  ] as const;

  return (
    <section
      id="ai"
      ref={ref}
      className="px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "#0E0E0E", paddingTop: "160px", paddingBottom: "160px", position: "relative" }}
    >
      {fxProfile.liteFx ? (
        <div className="ai-mobile-waves" />
      ) : (
        <div className="ai-neural-bg">
          {links.map(([from, to], index) => {
            const a = nodes[from];
            const b = nodes[to];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            return (
              <span
                key={`link-${index}`}
                className="ai-link"
                style={{
                  left: `${a.x}%`,
                  top: `${a.y}%`,
                  width: `${length}%`,
                  transform: `rotate(${angle}deg)`,
                  animationDelay: `${(index % 6) * 0.35}s`,
                }}
              />
            );
          })}
          {nodes.map((node, index) => (
            <span
              key={`node-${index}`}
              className="ai-node"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                animationDelay: `${(index % 5) * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        <p className="reveal" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          fontWeight: 400,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#C9A962",
          marginBottom: "32px",
        }}>
          AI & Engineering
        </p>
        <h2 className="reveal reveal-delay-1 section-heading" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "#FFFFFF",
          marginBottom: "32px",
        }}>
          AI Features That Solve<br />Real Problems.
        </h2>
        <p className="reveal reveal-delay-2" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "17px",
          fontWeight: 300,
          lineHeight: 1.85,
          color: "#888888",
          marginBottom: "80px",
          maxWidth: "520px",
        }}>
          We integrate AI where it creates measurable value: better UX,
          faster workflows, and smarter decisions. No hype layers, only useful
          implementation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "#222" }}>
          {aiCapabilities.map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${i + 1}`}
              style={{ backgroundColor: "#0E0E0E", padding: "48px 36px" }}
            >
              <div style={{ width: "32px", height: "2px", backgroundColor: "#C9A962", marginBottom: "28px" }} />
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "#FFFFFF",
                marginBottom: "16px",
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "#777777",
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
