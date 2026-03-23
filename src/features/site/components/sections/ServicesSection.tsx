import { useEffect, useRef } from "react";
import { useScrollReveal } from "../../../../hooks/useScrollReveal";

function ServiceCard({ title, desc, delay }: { title: string; desc: string; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateY = (mouseX / (rect.width / 2)) * 8;
      const rotateX = -(mouseY / (rect.height / 2)) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      if (iconRef.current) iconRef.current.style.transform = `translateZ(30px) translateX(${-mouseX * 0.03}px) translateY(${-mouseY * 0.03}px)`;
      if (titleRef.current) titleRef.current.style.transform = `translateZ(20px) translateX(${-mouseX * 0.02}px) translateY(${-mouseY * 0.02}px)`;
      if (textRef.current) textRef.current.style.transform = `translateZ(10px) translateX(${-mouseX * 0.01}px) translateY(${-mouseY * 0.01}px)`;

      const shadowX = -rotateY * 2;
      const shadowY = rotateX * 2;
      card.style.boxShadow = `
        ${shadowX}px ${20 + shadowY}px 60px rgba(14, 14, 14, 0.1),
        ${shadowX * 0.5}px ${10 + shadowY * 0.5}px 30px rgba(201, 169, 98, 0.08)
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      card.style.boxShadow = "";
      if (iconRef.current) iconRef.current.style.transform = "translateZ(30px)";
      if (titleRef.current) titleRef.current.style.transform = "translateZ(20px)";
      if (textRef.current) textRef.current.style.transform = "translateZ(10px)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`reveal reveal-delay-${delay} service-card`}
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(14, 14, 14, 0.06)",
        borderRadius: "20px",
        padding: "52px 40px",
        overflow: "hidden",
        cursor: "default",
        transformStyle: "preserve-3d",
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease",
        position: "relative",
      }}
    >
      <span
        ref={iconRef}
        style={{
          display: "block",
          width: "32px",
          height: "2px",
          backgroundColor: "#C9A962",
          marginBottom: "28px",
          transform: "translateZ(30px)",
          transition: "transform 0.4s ease",
          position: "relative",
          zIndex: 2,
        }}
      />
      <h3
        ref={titleRef}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "22px",
          fontWeight: 500,
          color: "#0E0E0E",
          marginBottom: "20px",
          lineHeight: 1.3,
          transform: "translateZ(20px)",
          transition: "transform 0.4s ease",
          position: "relative",
          zIndex: 2,
        }}
      >
        {title}
      </h3>
      <p
        ref={textRef}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          fontWeight: 300,
          lineHeight: 1.75,
          color: "#6E6E6E",
          transform: "translateZ(10px)",
          transition: "transform 0.4s ease",
          position: "relative",
          zIndex: 2,
        }}
      >
        {desc}
      </p>
      <div className="service-card-line" />
    </div>
  );
}

const services = [
  { title: "Full-Stack Website Development", desc: "Business-focused websites built end-to-end with modern frontend, backend, and secure deployment workflows." },
  { title: "3D Website Experiences", desc: "Interactive 3D sections and cinematic web experiences that stay fast, responsive, and production-friendly." },
  { title: "eCommerce Development", desc: "Conversion-ready storefronts with robust checkout, product management, and scalable backend architecture." },
  { title: "Custom Web Applications", desc: "Purpose-built platforms like dashboards, utility tools, and process automation products." },
  { title: "AI & ML Integration", desc: "Practical AI integrations for content, workflows, automation, and intelligent product behavior." },
  { title: "Launch, Support, and Growth", desc: "Affordable, premium delivery with deployment, monitoring, and iterative upgrades after launch." },
];

export function ServicesSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="services"
      ref={ref}
      className="px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "#F8F7F4", paddingTop: "clamp(112px, 11vw, 160px)", paddingBottom: "clamp(112px, 11vw, 160px)" }}
    >
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
          Services
        </p>
        <h2 className="reveal reveal-delay-1 section-heading" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "#0E0E0E",
          marginBottom: "80px",
        }}>
          Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} title={s.title} desc={s.desc} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
