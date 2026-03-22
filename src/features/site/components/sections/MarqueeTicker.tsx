export function MarqueeTicker() {
  const items = [
    "FULL-STACK",
    "3D WEB",
    "ECOMMERCE",
    "WEB APPS",
    "AI INTEGRATION",
    "AFFORDABLE",
    "PREMIUM",
    "DEPLOYMENT",
  ];

  return (
    <section style={{ padding: "60px 0", backgroundColor: "#0E0E0E", overflow: "hidden" }}>
      <div className="marquee-track" style={{ display: "flex", alignItems: "center" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                opacity: 0.15,
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </section>
  );
}
