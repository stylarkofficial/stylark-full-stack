import { useEffect, useRef, useState } from "react";
import { useLiquidRippleEffect } from "../../hooks/useLiquidRippleEffect";

export function FloatingNav({ activeSection }: { activeSection: string }) {
  const navItems = [
    { label: "Services", href: "#services", id: "services" },
    { label: "Work", href: "#work", id: "work" },
    { label: "About", href: "#about", id: "about" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const [visible, setVisible] = useState(false);
  const [hiddenAtFooter, setHiddenAtFooter] = useState(false);
  const rippleHandler = useLiquidRippleEffect();

  const measurementsRef = useRef({
    heroBottom: 0,
    footerTop: 0,
    windowHeight: 0,
    lastVisible: false,
    lastHiddenAtFooter: false,
  });

  useEffect(() => {
    let ticking = false;

    const updateMeasurements = () => {
      const heroSection = document.getElementById("hero");
      const footer = document.querySelector("footer");

      measurementsRef.current.heroBottom = heroSection
        ? heroSection.offsetTop + heroSection.offsetHeight
        : 0;
      measurementsRef.current.footerTop = footer
        ? footer.offsetTop
        : document.body.scrollHeight;
      measurementsRef.current.windowHeight = window.innerHeight;
    };

    updateMeasurements();

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const { heroBottom, footerTop, windowHeight, lastVisible, lastHiddenAtFooter } = measurementsRef.current;
          const scrollY = window.scrollY;

          const pastHero = scrollY > heroBottom - windowHeight * 0.5;
          const atFooter = scrollY + windowHeight > footerTop - 80;

          const shouldBeVisible = pastHero && !atFooter;
          const shouldBeHiddenAtFooter = atFooter;

          if (shouldBeVisible !== lastVisible) {
            measurementsRef.current.lastVisible = shouldBeVisible;
            setVisible(shouldBeVisible);
          }

          if (shouldBeHiddenAtFooter !== lastHiddenAtFooter) {
            measurementsRef.current.lastHiddenAtFooter = shouldBeHiddenAtFooter;
            setHiddenAtFooter(shouldBeHiddenAtFooter);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateMeasurements, 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <nav
      className={`floating-nav ${visible ? "visible" : ""} ${hiddenAtFooter ? "hidden-footer" : ""}`}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        const isPrimary = item.id === "contact";

        if (isPrimary) {
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={rippleHandler}
              className="nav-cta"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                textDecoration: "none",
                padding: "12px 28px",
                borderRadius: "50px",
                backgroundColor: "#2F5BFF",
                color: "#FFFFFF",
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                whiteSpace: "nowrap",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(47, 91, 255, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Start a Project
            </a>
          );
        }

        return (
          <a
            key={item.id}
            href={item.href}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: isActive ? 500 : 400,
              letterSpacing: "0.04em",
              textDecoration: "none",
              padding: "12px 20px",
              borderRadius: "50px",
              color: isActive ? "#0E0E0E" : "#6E6E6E",
              backgroundColor: isActive ? "#F0EFEC" : "transparent",
              transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "#0E0E0E";
                e.currentTarget.style.backgroundColor = "#F8F7F4";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "#6E6E6E";
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
