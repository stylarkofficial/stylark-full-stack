import { useEffect, useRef, useState } from "react";

export function StatsSection() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const hasAnimatedRef = useRef(false);
  const rafIdsRef = useRef<number[]>([]);
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [completedStats, setCompletedStats] = useState([false, false, false, false]);
  const [countingStats, setCountingStats] = useState([false, false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { target: 4, suffix: "", label: "Products Launched" },
    { target: 1, suffix: "", label: "AI/ML Website In Progress" },
    { target: 100, suffix: "%", label: "Custom-Built Delivery" },
    { target: 3, suffix: "D", label: "Interactive Web Capability" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            setIsStatsVisible(true);

            const startTimeout = setTimeout(() => {
              stats.forEach((stat, index) => {
                const itemTimeout = setTimeout(() => {
                  setCountingStats((prev) => {
                    const ns = [...prev];
                    ns[index] = true;
                    return ns;
                  });

                  const duration = 2000;
                  const startTime = performance.now();
                  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

                  const tick = (currentTime: number) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const value = Math.round(easeOutQuart(progress) * stat.target);

                    setCounts((prev) => {
                      const nc = [...prev];
                      nc[index] = value;
                      return nc;
                    });

                    if (progress < 1) {
                      const rafId = requestAnimationFrame(tick);
                      rafIdsRef.current.push(rafId);
                    } else {
                      setCounts((prev) => {
                        const nc = [...prev];
                        nc[index] = stat.target;
                        return nc;
                      });
                      setCountingStats((prev) => {
                        const ns = [...prev];
                        ns[index] = false;
                        return ns;
                      });
                      setCompletedStats((prev) => {
                        const ns = [...prev];
                        ns[index] = true;
                        return ns;
                      });
                    }
                  };

                  const rafId = requestAnimationFrame(tick);
                  rafIdsRef.current.push(rafId);
                }, index * 200);
                timeoutIdsRef.current.push(itemTimeout);
              });
            }, 350);
            timeoutIdsRef.current.push(startTimeout);

            const finalizeTimeout = setTimeout(() => {
              setCounts(stats.map((s) => s.target));
              setCountingStats([false, false, false, false]);
              setCompletedStats([true, true, true, true]);
            }, 4200);
            timeoutIdsRef.current.push(finalizeTimeout);

            observer.unobserve(section);
          } else if (entry.isIntersecting) {
            setIsStatsVisible(true);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      timeoutIdsRef.current.forEach(clearTimeout);
      rafIdsRef.current.forEach(cancelAnimationFrame);
    };
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{
        padding: "180px 24px",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid rgba(14, 14, 14, 0.04)",
        borderBottom: "1px solid rgba(14, 14, 14, 0.04)",
        overflow: "hidden",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-item stat-card ${isStatsVisible ? "visible" : ""} ${countingStats[i] ? "counting" : ""} ${completedStats[i] ? "complete" : ""}`}
              style={{
                padding: "40px 20px",
                position: "relative",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <div className="stat-bg-number">{stat.target}</div>
              <div className="stat-number-wrapper" style={{ display: "flex", alignItems: "baseline", justifyContent: "center", position: "relative", zIndex: 1, minHeight: "80px" }}>
                <span
                  className={`stat-number ${completedStats[i] ? "complete" : ""}`}
                  data-target={stat.target}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(56px, 8vw, 96px)",
                    fontWeight: 400,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    transition: "text-shadow 0.4s ease",
                  }}
                >
                  {counts[i]}
                </span>
                <span className="stat-suffix" style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  marginLeft: "4px",
                  lineHeight: 1,
                }}>
                  {stat.suffix}
                </span>
              </div>
              <p className="stat-label" style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginTop: "24px",
                position: "relative",
                zIndex: 1,
              }}>
                {stat.label}
              </p>
              <div className="stat-underline" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
