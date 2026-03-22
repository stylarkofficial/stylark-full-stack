import { useEffect, useState } from "react";
import type { FxProfile } from "../types/fx";

function readFxProfile(): FxProfile {
  if (typeof window === "undefined") {
    return { isMobile: false, isTablet: false, isLowPower: false, reduceMotion: false, liteFx: false };
  }

  const width = window.innerWidth;
  const isMobile = width <= 768;
  const isTablet = width > 768 && width <= 1100;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const lowCpu = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  const lowRam = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const saveData = Boolean(nav.connection?.saveData);
  const isLowPower = lowCpu || lowRam || saveData;

  return {
    isMobile,
    isTablet,
    isLowPower,
    reduceMotion,
    liteFx: reduceMotion || isLowPower || isMobile,
  };
}

export function useFxProfile() {
  const [profile, setProfile] = useState<FxProfile>(() => readFxProfile());

  useEffect(() => {
    const applyClasses = (p: FxProfile) => {
      document.body.classList.toggle("device-mobile", p.isMobile);
      document.body.classList.toggle("device-tablet", p.isTablet);
      document.body.classList.toggle("device-lowpower", p.isLowPower);
      document.body.classList.toggle("fx-lite", p.liteFx);
    };

    const update = () => {
      const next = readFxProfile();
      setProfile(next);
      applyClasses(next);
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      document.body.classList.remove("device-mobile", "device-tablet", "device-lowpower", "fx-lite");
    };
  }, []);

  return profile;
}
