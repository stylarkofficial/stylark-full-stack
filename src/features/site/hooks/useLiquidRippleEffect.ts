import type { MouseEvent } from "react";

export function useLiquidRippleEffect() {
  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const button = e.currentTarget;

    button.querySelectorAll(".ripple-effect, .btn-glow-burst").forEach((el) => el.remove());

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    for (let i = 1; i <= 3; i += 1) {
      const ripple = document.createElement("span");
      ripple.className = `ripple-effect ripple-effect-${i}`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    }

    const glow = document.createElement("span");
    glow.className = "btn-glow-burst";
    button.appendChild(glow);
    glow.addEventListener("animationend", () => glow.remove());

    button.classList.add("clicked");
    setTimeout(() => button.classList.remove("clicked"), 500);
  };

  return handleClick;
}
