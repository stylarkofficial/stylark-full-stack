export function Footer() {
  return (
    <footer
      className="px-6 md:px-16 lg:px-24"
      style={{
        backgroundColor: "#F8F7F4",
        paddingTop: "120px",
        paddingBottom: "120px",
        borderTop: "1px solid #E8E8E6",
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "24px",
          fontWeight: 400,
          color: "#0E0E0E",
          marginBottom: "16px",
          letterSpacing: "0.02em",
        }}>
          Stylark<span style={{ color: "#C9A962" }}>X</span>
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          fontWeight: 300,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#6E6E6E",
          marginBottom: "40px",
        }}>
          Full-Stack Engineering Studio
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          fontWeight: 300,
          color: "#AAAAAA",
          letterSpacing: "0.05em",
        }}>
          Â© 2026 StylarkX
        </p>
      </div>
    </footer>
  );
}
