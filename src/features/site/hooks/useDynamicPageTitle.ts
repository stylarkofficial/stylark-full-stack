import { useEffect, useRef } from "react";

export function useDynamicPageTitle(activeSection: string) {
  const pageTitles: Record<string, string> = {
    hero: "StylarkX — Engineering Digital Authority",
    about: "StylarkX — About Us",
    stats: "StylarkX — Our Impact",
    services: "StylarkX — Capabilities",
    work: "StylarkX — Selected Work",
    ai: "StylarkX — AI & Intelligence",
    philosophy: "StylarkX — Philosophy",
    contact: "StylarkX — Get in Touch",
  };

  const currentTitleRef = useRef(pageTitles.hero);

  useEffect(() => {
    if (pageTitles[activeSection]) {
      currentTitleRef.current = pageTitles[activeSection];
      if (!document.hidden) {
        document.title = currentTitleRef.current;
      }
    }
  }, [activeSection]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back → StylarkX";
      } else {
        document.title = currentTitleRef.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return currentTitleRef.current;
}
