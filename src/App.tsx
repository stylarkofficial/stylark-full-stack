import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useActiveSection } from './hooks/useScrollReveal';
import { WorkSection } from './features/site/components/sections/WorkSection';
import type { FxProfile } from './features/site/types/fx';
import { useFxProfile } from './features/site/hooks/useFxProfile';
import { useDynamicPageTitle } from './features/site/hooks/useDynamicPageTitle';
import { useLiquidRippleEffect } from './features/site/hooks/useLiquidRippleEffect';
import { AISection } from './features/site/components/sections/AISection';
import { ServicesSection } from './features/site/components/sections/ServicesSection';
import { ContactSection } from './features/site/components/sections/ContactSection';
import { AboutSection } from './features/site/components/sections/AboutSection';
import { StatsSection } from './features/site/components/sections/StatsSection';
import { MarqueeTicker } from './features/site/components/sections/MarqueeTicker';
import { PhilosophySection } from './features/site/components/sections/PhilosophySection';
import { Footer } from './features/site/components/layout/Footer';
import { FloatingNav } from './features/site/components/layout/FloatingNav';

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   GLOBAL STYLES COMPONENT - ALL ENHANCEMENTS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function GlobalStyles() {
  return (
    <style>{`
      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 2: REFINED COLOR PALETTE â€” RICHER GOLD + BLACK ACCENTS
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      :root {
        --pearl: #F8F7F4;
        --white: #FFFFFF;
        --primary: #0E0E0E;
        --secondary: #6E6E6E;
        --accent: #2F5BFF;
        /* UPDATED â€” Deeper, richer gold for premium visibility */
        --gold: #B8860B;
        --gold-light: #DAA520;
        --gold-dark: #8B6508;
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 7: GRADIENT GLOW SCROLL PROGRESS
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #2F5BFF, #5B8AFF, #2F5BFF);
        background-size: 200% 100%;
        z-index: 100001;
        pointer-events: none;
        transition: height 0.3s ease;
        animation: scrollProgressGradient 3s linear infinite;
      }

      .scroll-progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: -4px;
        background: inherit;
        filter: blur(6px);
        opacity: 0.5;
        z-index: -1;
      }

      @keyframes scrollProgressGradient {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 1: SMART ADAPTIVE CURSOR â€” BLACK/WHITE INVERSION
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      .cursor-dot {
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, 
                    height 0.3s ease, 
                    background 0.4s ease, 
                    opacity 0.3s ease;
      }

      .cursor-ring {
        position: fixed;
        width: 36px;
        height: 36px;
        border: 1.5px solid var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 99998;
        transform: translate(-50%, -50%);
        transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                    height 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                    border-color 0.4s ease,
                    background 0.4s ease,
                    border-radius 0.4s ease,
                    border-width 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .cursor-ring-text {
        font-family: 'Inter', sans-serif;
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--primary);
        opacity: 0;
        transition: opacity 0.3s ease, color 0.4s ease;
        white-space: nowrap;
      }

      .cursor-trail {
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99997;
        transform: translate(-50%, -50%);
        transition: background 0.4s ease;
      }

      .cursor-aura {
        position: fixed;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99996;
        transform: translate(-50%, -50%) scale(0.9);
        background: radial-gradient(circle, rgba(47, 91, 255, 0.14) 0%, rgba(47, 91, 255, 0.05) 42%, rgba(47, 91, 255, 0) 75%);
        filter: blur(8px);
        opacity: 0;
        transition: opacity 0.2s ease, transform 0.2s ease, background 0.4s ease;
      }

      .cursor-shockwave {
        position: fixed;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid rgba(47, 91, 255, 0.55);
        pointer-events: none;
        z-index: 99995;
        transform: translate(-50%, -50%) scale(0.2);
        opacity: 0;
      }

      .cursor-shockwave.active {
        animation: cursorShockwave 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }

      @keyframes cursorShockwave {
        0% {
          transform: translate(-50%, -50%) scale(0.2);
          opacity: 0.9;
        }
        100% {
          transform: translate(-50%, -50%) scale(8.8);
          opacity: 0;
        }
      }

      /* Default trail colors (dark on light backgrounds) */
      .cursor-trail-1 { width: 5px; height: 5px; background: rgba(14, 14, 14, 0.12); }
      .cursor-trail-2 { width: 4px; height: 4px; background: rgba(14, 14, 14, 0.09); }
      .cursor-trail-3 { width: 3px; height: 3px; background: rgba(14, 14, 14, 0.06); }
      .cursor-trail-4 { width: 3px; height: 3px; background: rgba(14, 14, 14, 0.04); }
      .cursor-trail-5 { width: 2px; height: 2px; background: rgba(14, 14, 14, 0.02); }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ADAPTIVE CURSOR â€” INVERTED (WHITE) MODE FOR DARK BACKGROUNDS
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      body.cursor-inverted .cursor-dot {
        background: #FFFFFF;
      }

      body.cursor-inverted .cursor-ring {
        border-color: #FFFFFF;
      }

      body.cursor-inverted .cursor-ring-text {
        color: #FFFFFF;
      }

      body.cursor-inverted .cursor-trail-1 { background: rgba(255, 255, 255, 0.15); }
      body.cursor-inverted .cursor-trail-2 { background: rgba(255, 255, 255, 0.12); }
      body.cursor-inverted .cursor-trail-3 { background: rgba(255, 255, 255, 0.08); }
      body.cursor-inverted .cursor-trail-4 { background: rgba(255, 255, 255, 0.05); }
      body.cursor-inverted .cursor-trail-5 { background: rgba(255, 255, 255, 0.03); }
      body.cursor-inverted .cursor-aura {
        background: radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.07) 42%, rgba(255, 255, 255, 0) 78%);
      }
      body.cursor-inverted .cursor-shockwave {
        border-color: rgba(255, 255, 255, 0.55);
      }

      /* Hover states - inverted */
      body.cursor-inverted.cursor-hover-link .cursor-ring {
        border-color: #FFFFFF;
        background: rgba(255, 255, 255, 0.1);
      }

      body.cursor-inverted.cursor-hover-link .cursor-dot {
        background: #FFFFFF;
      }

      body.cursor-inverted.cursor-hover-heading .cursor-ring {
        border-color: var(--gold);
      }

      body.cursor-inverted.cursor-hover-heading .cursor-ring-text {
        color: var(--gold);
      }

      body.cursor-inverted.cursor-hover-card .cursor-ring {
        border-color: #FFFFFF;
        background: rgba(255, 255, 255, 0.08);
      }

      /* Standard hover states (light background) */
      body.cursor-hover-link .cursor-ring {
        width: 60px;
        height: 60px;
        background: rgba(47, 91, 255, 0.08);
        border-color: var(--accent);
      }

      body.cursor-hover-link .cursor-dot {
        width: 4px;
        height: 4px;
        background: var(--accent);
      }

      body.cursor-hover-link .cursor-aura {
        opacity: 0.68;
        transform: translate(-50%, -50%) scale(1.2);
      }

      body.cursor-hover-heading .cursor-ring {
        width: 80px;
        height: 80px;
        border-width: 1px;
        border-color: var(--gold);
        background: transparent;
      }

      body.cursor-hover-heading .cursor-ring-text {
        opacity: 1;
        color: var(--gold);
      }

      body.cursor-hover-heading .cursor-dot {
        opacity: 0;
      }

      body.cursor-hover-heading .cursor-aura {
        opacity: 0.54;
        transform: translate(-50%, -50%) scale(1.45);
      }

      body.cursor-hover-card .cursor-ring {
        width: 80px;
        height: 50px;
        border-radius: 12px;
        border-color: var(--accent);
        background: rgba(47, 91, 255, 0.05);
      }

      body.cursor-hover-card .cursor-aura {
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1.32);
      }

      body.cursor-hover-input .cursor-ring {
        width: 56px;
        height: 30px;
        border-radius: 8px;
        border-color: var(--gold);
        background: rgba(184, 134, 11, 0.06);
      }

      body.cursor-hover-input .cursor-aura {
        opacity: 0.5;
        transform: translate(-50%, -50%) scale(1.16);
      }

      body.cursor-fast .cursor-aura {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.35);
      }

      body.cursor-fast .cursor-ring {
        border-width: 2px;
      }

      body.cursor-snap .cursor-ring {
        width: 68px;
        height: 68px;
        border-color: var(--gold);
        background: rgba(184, 134, 11, 0.08);
      }

      body.cursor-snap .cursor-aura {
        opacity: 0.72;
        transform: translate(-50%, -50%) scale(1.38);
      }

      body.cursor-hidden .cursor-dot,
      body.cursor-hidden .cursor-ring,
      body.cursor-hidden .cursor-aura {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
      }

      @media (max-width: 768px) {
        .cursor-dot, .cursor-ring, .cursor-trail, .cursor-aura, .cursor-shockwave {
          display: none !important;
        }
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 3: CINEMATIC HERO
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      .mesh-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        will-change: transform;
        transition: transform 0.5s ease-out;
      }

      .mesh-orb-1 {
        width: 800px;
        height: 800px;
        background: #2F5BFF;
        opacity: 0.04;
        top: -350px;
        right: -250px;
        animation: meshFloat1 25s ease-in-out infinite alternate;
      }

      .mesh-orb-2 {
        width: 600px;
        height: 600px;
        background: #0E0E0E;
        opacity: 0.025;
        bottom: -200px;
        left: -200px;
        animation: meshFloat2 30s ease-in-out infinite alternate;
      }

      .mesh-orb-3 {
        width: 500px;
        height: 500px;
        background: #2F5BFF;
        opacity: 0.02;
        top: 50%;
        left: 40%;
        animation: meshFloat3 35s ease-in-out infinite alternate;
      }

      .mesh-orb-4 {
        width: 400px;
        height: 400px;
        background: #6E6E6E;
        opacity: 0.015;
        top: 20%;
        left: 10%;
        animation: meshFloat4 28s ease-in-out infinite alternate;
      }

      .mesh-orb-5 {
        width: 300px;
        height: 300px;
        background: #2F5BFF;
        opacity: 0.025;
        bottom: 10%;
        right: 20%;
        animation: meshFloat5 32s ease-in-out infinite alternate;
      }

      @keyframes meshFloat1 {
        0% { transform: translate(0, 0) scale(1) rotate(0deg); }
        100% { transform: translate(-120px, 80px) scale(1.2) rotate(15deg); }
      }

      @keyframes meshFloat2 {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(100px, -80px) scale(1.15); }
      }

      @keyframes meshFloat3 {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(-80px, -60px) scale(1.25); }
      }

      @keyframes meshFloat4 {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(60px, 40px) scale(1.1); }
      }

      @keyframes meshFloat5 {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(-40px, -80px) scale(1.2); }
      }

      /* Floating particles */
      .particle {
        position: absolute;
        background: #0E0E0E;
        border-radius: 50%;
        opacity: 0.04;
      }

      .particle:nth-child(odd) {
        animation: particleFloat1 20s ease-in-out infinite;
      }

      .particle:nth-child(even) {
        animation: particleFloat2 25s ease-in-out infinite;
      }

      @keyframes particleFloat1 {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-30px) translateX(15px); }
        50% { transform: translateY(-15px) translateX(-10px); }
        75% { transform: translateY(-40px) translateX(20px); }
      }

      @keyframes particleFloat2 {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(-20px); }
        50% { transform: translateY(-35px) translateX(10px); }
        75% { transform: translateY(-10px) translateX(-15px); }
      }

      /* Hero text glow */
      .hero-headline {
        text-shadow: 0 0 80px rgba(47, 91, 255, 0.08);
        animation: heroTextGlow 10s ease-in-out infinite;
      }

      @keyframes heroTextGlow {
        0%, 100% { text-shadow: 0 0 80px rgba(184, 134, 11, 0.03); }
        50% { text-shadow: 0 0 120px rgba(184, 134, 11, 0.08); }
      }

      @keyframes accentXGlow {
        0%, 100% { text-shadow: 0 0 40px rgba(184, 134, 11, 0.15); }
        50% { text-shadow: 0 0 60px rgba(184, 134, 11, 0.35); }
      }

      /* ENHANCEMENT 8: Intelligent Typed Text */
      .typed-text.blur {
        filter: blur(2px);
        opacity: 0.7;
      }

      .typed-cursor {
        display: inline-block;
        color: var(--gold);
        font-weight: 300;
        font-size: inherit;
        margin-left: 2px;
        width: 2px;
        animation: cursorSmartBlink 1s ease-in-out infinite;
        transition: width 0.2s ease, box-shadow 0.2s ease;
      }

      .typed-cursor.typing {
        width: 3px;
        animation: none;
        opacity: 1;
        box-shadow: 0 0 10px rgba(184, 134, 11, 0.5);
      }

      @keyframes cursorSmartBlink {
        0%, 45% { opacity: 1; }
        50%, 95% { opacity: 0; }
        100% { opacity: 1; }
      }

      /* Scroll indicator */
      .scroll-indicator-line::after {
        content: '';
        width: 1px;
        height: 20px;
        background-color: var(--gold);
        position: absolute;
        top: -20px;
        animation: scrollLine 2s ease-in-out infinite;
      }

      @keyframes scrollLine {
        0% { top: -20px; opacity: 0; }
        30% { opacity: 1; }
        70% { opacity: 1; }
        100% { top: 60px; opacity: 0; }
      }

      .scroll-chevron {
        width: 12px;
        height: 12px;
        border-right: 1px solid var(--gold);
        border-bottom: 1px solid var(--gold);
        transform: rotate(45deg);
        animation: scrollChevronBounce 2s ease-in-out infinite;
      }

      @keyframes scrollChevronBounce {
        0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.5; }
        50% { transform: rotate(45deg) translateY(5px); opacity: 1; }
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 6: LIQUID METAL BUTTON EFFECT
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      .btn-primary.clicked {
        animation: buttonBounce 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes buttonBounce {
        0% { transform: scale(0.97); }
        50% { transform: scale(1.03); }
        100% { transform: scale(1); }
      }

      .ripple-effect {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        z-index: 0;
      }

      .ripple-effect-1 {
        background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%);
        animation: rippleExpand1 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .ripple-effect-2 {
        background: radial-gradient(circle, rgba(47, 91, 255, 0.15) 0%, transparent 70%);
        animation: rippleExpand2 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
      }

      .ripple-effect-3 {
        background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
        animation: rippleExpand3 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
      }

      @keyframes rippleExpand1 {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(4); opacity: 0; }
      }

      @keyframes rippleExpand2 {
        0% { transform: scale(0); opacity: 0.8; }
        100% { transform: scale(5); opacity: 0; }
      }

      @keyframes rippleExpand3 {
        0% { transform: scale(0); opacity: 0.6; }
        100% { transform: scale(6); opacity: 0; }
      }

      .btn-glow-burst {
        position: absolute;
        inset: -10px;
        border-radius: inherit;
        background: transparent;
        box-shadow: 0 0 0 0 rgba(47, 91, 255, 0.4);
        pointer-events: none;
        animation: glowBurst 0.5s ease-out forwards;
      }

      @keyframes glowBurst {
        0% { box-shadow: 0 0 0 0 rgba(47, 91, 255, 0.4); }
        100% { box-shadow: 0 0 30px 15px rgba(47, 91, 255, 0); }
      }

      /* Directional underline - now with gold */
      .btn-text {
        position: relative;
        display: inline-block;
        padding-bottom: 2px;
      }

      .btn-text::after {
        content: '';
        position: absolute;
        bottom: 12px;
        left: 0;
        width: 100%;
        height: 1px;
        background: var(--gold);
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .btn-text:hover::after {
        transform: scaleX(1);
        transform-origin: left center;
      }

      .btn-text:not(:hover)::after {
        transform-origin: right center;
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 4: PREMIUM STATISTICS
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      .stat-item {
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .stat-card {
        opacity: 0;
        transform: translateY(20px) scale(0.985);
      }

      .stat-card.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
        transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .stat-item:hover {
        background: rgba(201, 169, 98, 0.03);
        transform: translateY(-8px);
      }

      .stat-item:hover .stat-number {
        color: var(--gold) !important;
        -webkit-text-fill-color: var(--gold) !important;
        text-shadow: 0 0 40px rgba(184, 134, 11, 0.3);
      }

      .stat-bg-number {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        font-family: 'Playfair Display', serif;
        font-size: clamp(120px, 15vw, 200px);
        font-weight: 400;
        color: #0E0E0E;
        opacity: 0;
        z-index: 0;
        pointer-events: none;
        transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .stat-item.counting .stat-bg-number {
        opacity: 0.03;
        transform: translate(-50%, -50%) scale(1);
      }

      /* COUNTER VISIBILITY FIX: Force stat numbers to always be visible */
      .stat-number {
        color: #0E0E0E !important;
        opacity: 1 !important;
        visibility: visible !important;
        display: inline-block !important;
        min-width: 60px;
        text-align: center;
        -webkit-text-fill-color: #0E0E0E;
      }

      .stat-item .stat-number,
      .stat-item.reveal .stat-number,
      .stat-item.reveal.visible .stat-number,
      .reveal .stat-number,
      .reveal.visible .stat-number,
      .stat-item.counting .stat-number,
      .stat-item.complete .stat-number {
        color: #0E0E0E !important;
        opacity: 1 !important;
        visibility: visible !important;
        -webkit-text-fill-color: #0E0E0E;
      }

      .stat-suffix {
        color: var(--gold) !important;
        opacity: 1 !important;
        visibility: visible !important;
        -webkit-text-fill-color: var(--gold);
      }

      .stat-label {
        opacity: 1 !important;
        visibility: visible !important;
      }

      .stat-number-wrapper {
        min-height: 80px;
      }

      .stat-number.complete {
        animation: statGlow 0.8s ease-out;
      }

      @keyframes statGlow {
        0% { text-shadow: 0 0 30px rgba(184, 134, 11, 0.5); color: #0E0E0E !important; }
        100% { text-shadow: none; color: #0E0E0E !important; }
      }

      .stat-underline {
        width: 40px;
        height: 2px;
        background: linear-gradient(90deg, var(--gold), var(--gold-light));
        margin-top: 20px;
        transform: scaleX(0);
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        border-radius: 2px;
      }

      .stat-item.complete .stat-underline {
        transform: scaleX(1);
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 2: HOLOGRAPHIC SERVICE CARDS - with gold accent line
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      .service-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          105deg,
          transparent 20%,
          rgba(255, 255, 255, 0.1) 35%,
          rgba(47, 91, 255, 0.06) 42%,
          rgba(255, 255, 255, 0.15) 50%,
          rgba(47, 91, 255, 0.06) 58%,
          rgba(255, 255, 255, 0.1) 65%,
          transparent 80%
        );
        transform: translateX(-100%);
        transition: transform 0.8s ease;
        pointer-events: none;
        z-index: 1;
        border-radius: inherit;
      }

      .service-card:hover::before {
        transform: translateX(100%);
      }

      .service-card::after {
        content: '';
        position: absolute;
        inset: -2px;
        background: linear-gradient(135deg, var(--gold), transparent, var(--gold));
        border-radius: 22px;
        z-index: -1;
        opacity: 0;
        filter: blur(8px);
        transition: opacity 0.5s ease;
        animation: cardGlowPulse 3s ease-in-out infinite;
      }

      @keyframes cardGlowPulse {
        0%, 100% { opacity: 0; }
        50% { opacity: 0.15; }
      }

      .service-card:hover::after {
        opacity: 0.25;
      }

      .service-card-line {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--gold), var(--gold-light));
        transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        border-radius: 0 0 20px 20px;
      }

      .service-card:hover .service-card-line {
        width: 100%;
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 5: EDITORIAL WORK SECTION - with gold accents
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      .work-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(184, 134, 11, 0.04), transparent);
        transform: translateX(-100%);
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      }

      .work-item:hover::before {
        transform: translateX(100%);
      }

      .work-item:hover .work-title {
        letter-spacing: 0.03em;
        color: var(--gold) !important;
      }

      .work-item-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 1px;
        background: rgba(184, 134, 11, 0.5);
        transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .work-item.visible .work-item-line {
        width: 100%;
      }

      /* Work image preview */
      .work-image-reveal {
        position: fixed;
        pointer-events: none;
        z-index: 500;
        width: 540px;
        height: 340px;
        border-radius: 18px;
        overflow: hidden;
        opacity: 0;
        transform: scale(0.8) rotate(-3deg);
        transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 25px 80px rgba(14, 14, 14, 0.15);
        border: 2px solid rgba(184, 134, 11, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 16/10;
      }

      .work-image-reveal.visible {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }

      .work-image-reveal-inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Playfair Display', serif;
        font-size: 72px;
        color: rgba(255, 255, 255, 0.9);
        transition: transform 0.2s ease;
      }

      .work-image-reveal-media {
        display: block;
        width: 100%;
        height: 100%;
        transform-origin: center center;
        transition: transform 0.2s ease;
      }

      @media (max-width: 860px) {
        .work-image-reveal {
          display: none;
        }
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 3: ELEGANT MARQUEE â€” with gold vertical line separator
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .marquee-track {
        animation: marquee calc(30s - (var(--scroll-velocity) * 8s)) linear infinite;
      }

      .marquee-dot {
        display: inline-block;
        width: 1px;
        height: 16px;
        background: var(--gold);
        opacity: 0.4;
        margin: 0 40px;
        vertical-align: middle;
        flex-shrink: 0;
      }

      /* Trust divider - gold gradient */
      .trust-divider {
        background: linear-gradient(90deg, transparent, var(--gold), transparent);
        opacity: 0.5;
        height: 1px;
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 4: SMOOTH ELEGANT BUTTONS
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      
      /* Primary Button */
      .btn-primary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 22px 52px !important;
        background: var(--primary);
        color: var(--white);
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.08em;
        border: none;
        border-radius: 60px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 4px 24px rgba(14, 14, 14, 0.12);
      }

      .btn-primary::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--accent);
        border-radius: inherit;
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: -1;
      }

      .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 48px rgba(47, 91, 255, 0.25);
      }

      .btn-primary:hover::before {
        transform: scaleX(1);
      }

      .btn-primary:active {
        transform: translateY(-1px);
        box-shadow: 0 8px 32px rgba(14, 14, 14, 0.15);
      }

      /* Submit Button */
      .btn-submit {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 22px 56px !important;
        background: var(--primary);
        color: var(--white);
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.1em;
        border: none;
        border-radius: 60px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 4px 24px rgba(14, 14, 14, 0.12);
      }

      .btn-submit::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--accent), #1E3FCC);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.6s ease;
        z-index: -1;
      }

      .btn-submit:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 48px rgba(47, 91, 255, 0.3);
      }

      .btn-submit:hover::before {
        opacity: 1;
      }

      .btn-submit:active {
        transform: translateY(-1px);
        box-shadow: 0 8px 32px rgba(47, 91, 255, 0.2);
      }

      /* Nav CTA Button */
      .nav-cta {
        position: relative;
        overflow: hidden;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        box-shadow: 0 4px 20px rgba(47, 91, 255, 0.2);
      }

      .nav-cta::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, #1E3FCC, var(--accent));
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: 0;
      }

      .nav-cta:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 12px 36px rgba(47, 91, 255, 0.35) !important;
      }

      .nav-cta:hover::before {
        opacity: 1;
      }

      /* Scroll to Top Button Enhanced */
      .scroll-to-top-btn {
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }

      .scroll-to-top-btn:hover {
        transform: translateY(-5px) scale(1) !important;
        box-shadow: 0 20px 48px rgba(14, 14, 14, 0.15) !important;
      }

      .scroll-to-top-btn:hover svg {
        transform: translateY(-3px);
      }

      .scroll-to-top-btn:active {
        transform: translateY(-2px) scale(0.98) !important;
      }

      /* Service Card Hover Enhancement */
      .service-card:hover {
        transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-10px) scale(1.01) !important;
        box-shadow: 0 40px 80px rgba(14, 14, 14, 0.08),
                    0 16px 40px rgba(184, 134, 11, 0.06) !important;
        border-color: rgba(184, 134, 11, 0.2) !important;
      }

      /* Work Item Hover Enhancement */
      .work-item {
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
      }

      .work-item:hover {
        padding-left: 32px !important;
        background: rgba(184, 134, 11, 0.02) !important;
      }

      /* Form Inputs Enhanced Focus */
      input:focus,
      textarea:focus,
      select:focus {
        border-bottom-color: var(--gold) !important;
        transition: border-color 0.5s ease !important;
      }

      /* General Smooth Transitions */
      a, button {
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         CINEMATIC HERO ANIMATION â€” INFINITY TO STYLARKX
         SINGLE INFINITY | DOUBLED SIZE | 7-SECOND PREMIUM ANIMATION
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

      /* Hero title container â€” increased height for larger infinity */
      .hero-title-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 250px;
        margin-bottom: 60px;
      }

      /* Infinity SVG wrapper */
      .infinity-stage {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* The infinity SVG itself â€” optimized for smooth animation */
      .infinity-svg-el {
        display: block;
        will-change: transform, opacity;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
      }

      /* The typographic X that appears after infinity morphs */
      .infinity-stage-x {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Playfair Display', serif;
        font-weight: 400;
        color: #B8860B;
        line-height: 1;
        letter-spacing: -0.03em;
        opacity: 0;
        pointer-events: none;
        will-change: transform, opacity;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        text-shadow: 0 0 30px rgba(184, 134, 11, 0.35);
        filter: drop-shadow(0 10px 24px rgba(14, 14, 14, 0.12));
        white-space: nowrap;
      }

      /* StylarkX final title â€” responsive sizing */
      .hero-title-final {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Playfair Display', serif;
        font-weight: 400;
        line-height: 1;
        letter-spacing: 0.08em;
        margin: 0;
        z-index: 5;
        transition: letter-spacing 1.6s cubic-bezier(0.22, 1, 0.36, 1),
                    filter 1.2s ease,
                    opacity 0.8s ease;
      }

      /* Individual letter spans â€” GPU optimized */
      .hero-letter {
        display: inline-block;
        opacity: 0;
        will-change: transform, opacity, color, text-shadow;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }

      /* X accent letter stays gold with pulse */
      .hero-letter-x {
        color: #B8860B;
        text-shadow: 0 0 40px rgba(184, 134, 11, 0.5);
      }

      /* X glow pulse animation â€” runs after animation completes */
      @keyframes xGlowPulse {
        0%, 100% { text-shadow: 0 0 18px rgba(184, 134, 11, 0.26); }
        50%       { text-shadow: 0 0 34px rgba(184, 134, 11, 0.5); }
      }

      .hero-title-final.anim-complete .hero-letter-x {
        animation: xGlowPulse 4s ease-in-out infinite;
      }

      /* Cleanup will-change after animation for performance */
      .hero-title-final.anim-complete .hero-letter {
        will-change: auto;
      }

      /* Responsive adjustments for hero animation */
      @media (max-width: 860px) {
        .hero-title-container {
          min-height: 200px;
          margin-bottom: 48px;
        }
      }

      @media (max-width: 540px) {
        .hero-title-container {
          min-height: 160px;
          margin-bottom: 40px;
        }
      }

      /* Hero section general fade-up used by eyebrow, subtitle, CTAs */
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         ENHANCEMENT 3: FLOATING NAV â€” HIDE AT FOOTER
         â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
      .floating-nav {
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%) translateY(120px);
        z-index: 1000;
        background: var(--white);
        border-radius: 60px;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 8px 40px rgba(14, 14, 14, 0.08), 
                    0 2px 8px rgba(14, 14, 14, 0.04);
        border: 1px solid rgba(14, 14, 14, 0.04);
        opacity: 0;
        visibility: hidden;
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                    opacity 0.6s ease,
                    visibility 0.6s ease;
      }

      .floating-nav.visible {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .floating-nav.hidden-footer {
        transform: translateX(-50%) translateY(120px);
        opacity: 0;
        visibility: hidden;
      }

      /* Magic motion system */
      :root {
        --scroll-velocity: 0;
        --hero-mx: 0;
        --hero-my: 0;
      }

      body.theme-night {
        --accent: #5B8AFF;
        --gold: #C49A2C;
      }

      .hero-camera-pass {
        perspective: 1200px;
        transform-style: preserve-3d;
      }

      .hero-camera-pass .hero-content-shell {
        animation: heroCameraPass 3.2s cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      body.hero-fast-intro .hero-camera-pass .hero-content-shell {
        animation-duration: 2.4s;
      }

      @keyframes heroCameraPass {
        0% { transform: translateZ(-90px) rotateX(8deg) scale(0.965); opacity: 0.72; }
        60% { transform: translateZ(0) rotateX(0deg) scale(1); opacity: 1; }
        100% { transform: translateZ(0) rotateX(0deg) scale(1); opacity: 1; }
      }

      .hero-grain {
        position: absolute;
        inset: -30%;
        pointer-events: none;
        background-image:
          radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0 1px, transparent 1px),
          radial-gradient(circle at 80% 40%, rgba(0,0,0,0.05) 0 1px, transparent 1px);
        background-size: 3px 3px, 4px 4px;
        mix-blend-mode: soft-light;
        opacity: 0.06;
        animation:
          filmGrainRamp 3.4s cubic-bezier(0.22, 1, 0.36, 1) forwards,
          grainShift 7.5s steps(8) infinite 3.4s;
        z-index: 1;
      }

      @keyframes filmGrainRamp {
        0% { opacity: 0; }
        35% { opacity: 0.05; }
        100% { opacity: 0.22; }
      }

      @keyframes grainShift {
        0% { transform: translate(0, 0); }
        25% { transform: translate(-2%, 1%); }
        50% { transform: translate(1%, -2%); }
        75% { transform: translate(-1%, 2%); }
        100% { transform: translate(0, 0); }
      }

      .hero-light-sweep {
        position: absolute;
        inset: -20%;
        pointer-events: none;
        background: linear-gradient(
          115deg,
          transparent 35%,
          rgba(255,255,255,0.26) 45%,
          rgba(196,154,44,0.2) 50%,
          rgba(255,255,255,0.18) 55%,
          transparent 65%
        );
        transform: translateX(-78%) rotate(3deg);
        animation: lightSweep 9s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        z-index: 2;
      }

      @keyframes lightSweep {
        0% { transform: translateX(-78%) rotate(3deg); opacity: 0; }
        24% { opacity: 0.45; }
        56% { transform: translateX(8%) rotate(2deg); opacity: 0.18; }
        78% { opacity: 0.36; }
        100% { transform: translateX(86%) rotate(-1deg); opacity: 0; }
      }

      .hero-title-container::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 8%;
        width: clamp(220px, 42vw, 700px);
        height: 2px;
        transform: translateX(-50%) scaleX(0);
        transform-origin: left center;
        background: linear-gradient(90deg, transparent, rgba(196,154,44,0.9), transparent);
        filter: drop-shadow(0 0 14px rgba(196,154,44,0.55));
        animation: signatureStrokeReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        animation-delay: 6.8s;
        opacity: 0.8;
      }

      @keyframes signatureStrokeReveal {
        0% { transform: translateX(-50%) scaleX(0); opacity: 0; }
        40% { opacity: 1; }
        100% { transform: translateX(-50%) scaleX(1); opacity: 0.55; }
      }

      .hero-burst {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 5;
      }

      .hero-burst-particle {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.88) 0%, rgba(184,134,11,0.62) 52%, transparent 100%);
        opacity: 0;
      }

      .hero-burst.active .hero-burst-particle {
        animation: burstOut 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }

      @keyframes burstOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
        25% { opacity: 0.65; }
        100% {
          opacity: 0;
          transform:
            translate(
              calc(-50% + var(--dx, 0px)),
              calc(-50% + var(--dy, 0px))
            )
            scale(0.22);
        }
      }

      .hero-letter {
        filter: blur(calc(var(--scroll-velocity) * 1.2px));
      }

      .hero-title-final.anim-complete {
        animation: titleIdleFloat 8s ease-in-out infinite;
      }

      @keyframes titleIdleFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }

      .work-item {
        clip-path: inset(0 0 0 0 round 14px);
      }

      .work-item:hover {
        clip-path: inset(0 0 0 0 round 18px);
      }

      .work-item::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(105deg, transparent 35%, rgba(196,154,44,0.16), transparent 65%);
        transform: translateX(-120%);
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      }

      .work-item:hover::after {
        transform: translateX(120%);
      }

      .work-image-reveal::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(255,255,255,0.18), transparent 30%, transparent 70%, rgba(47,91,255,0.22));
        mix-blend-mode: screen;
        opacity: 0.7;
        pointer-events: none;
      }

      .work-image-reveal::after {
        content: '';
        position: absolute;
        inset: 0;
        border: 1px solid rgba(255,255,255,0.24);
        box-shadow: inset 0 0 60px rgba(91,138,255,0.24);
        pointer-events: none;
      }

      .work-image-reveal-inner {
        backdrop-filter: saturate(120%) contrast(110%);
      }

      .ai-neural-bg {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
      }

      .ai-node {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(196,154,44,0.9);
        box-shadow: 0 0 20px rgba(196,154,44,0.6);
        animation: aiNodePulse 3.2s ease-in-out infinite;
      }

      .ai-link {
        position: absolute;
        height: 1px;
        transform-origin: left center;
        background: linear-gradient(90deg, rgba(196,154,44,0.7), rgba(47,91,255,0.35));
        opacity: 0.35;
        animation: aiLinkFlow 4.2s ease-in-out infinite;
      }

      @keyframes aiNodePulse {
        0%, 100% { transform: scale(0.9); opacity: 0.5; }
        50% { transform: scale(1.45); opacity: 1; }
      }

      @keyframes aiLinkFlow {
        0%, 100% { opacity: 0.15; filter: blur(0px); }
        50% { opacity: 0.55; filter: blur(0.2px); }
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-grain,
        .hero-light-sweep,
        .hero-burst,
        .ai-neural-bg {
          display: none !important;
        }
        .hero-title-final.anim-complete .hero-letter-x {
          animation: none !important;
        }
      }

      body.audio-reactive .hero-light-sweep {
        animation-duration: 4s;
        opacity: 0.95;
      }

      body.audio-reactive .hero-letter-x {
        animation-duration: 2.2s !important;
      }

      body.audio-reactive .ai-node {
        animation-duration: 1.6s;
      }

      body.audio-reactive .scroll-progress {
        height: 3px;
      }

      /* Adaptive profiles: keep premium look, reduce heavy GPU work */
      body.fx-lite .hero-grain,
      body.fx-lite .hero-light-sweep,
      body.fx-lite .hero-burst,
      body.fx-lite .ai-neural-bg {
        display: none !important;
      }

      body.fx-lite .mesh-orb {
        filter: blur(75px);
        opacity: 0.018 !important;
      }

      body.device-tablet .mesh-orb {
        filter: blur(82px);
        opacity: 0.02 !important;
      }

      body.device-mobile .mesh-orb-4,
      body.device-mobile .mesh-orb-5 {
        display: none;
      }

      body.device-mobile .particle:nth-child(n + 10) {
        display: none;
      }

      body.device-tablet .particle:nth-child(n + 11) {
        display: none;
      }

      body.fx-lite .hero-title-final.anim-complete {
        animation: none;
      }

      body.fx-lite .hero-letter {
        filter: none;
      }

      body.device-mobile .work-item:hover {
        padding-left: 0 !important;
      }

      body.device-mobile .floating-nav {
        bottom: 18px;
        padding: 10px 12px;
        gap: 4px;
      }

      .hero-mobile-aura {
        position: absolute;
        inset: 16% 10% auto;
        height: 220px;
        border-radius: 999px;
        background: radial-gradient(circle at 50% 50%, rgba(196,154,44,0.16), rgba(47,91,255,0.08), transparent 70%);
        filter: blur(24px);
        pointer-events: none;
        animation: mobileAuraPulse 4.8s ease-in-out infinite;
        z-index: 0;
      }

      @keyframes mobileAuraPulse {
        0%, 100% { opacity: 0.45; transform: scale(1); }
        50% { opacity: 0.72; transform: scale(1.06); }
      }

      .ai-mobile-waves {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(80% 60% at 15% 20%, rgba(196,154,44,0.1), transparent 70%),
          radial-gradient(80% 60% at 85% 70%, rgba(47,91,255,0.09), transparent 70%);
      }

      /* Mobile-first polish: iPhone SE and similar */
      @media (max-width: 375px) {
        #hero {
          min-height: 100svh !important;
        }

        .hero-title-container {
          min-height: 130px !important;
          margin-bottom: 26px !important;
        }

        .hero-title-final {
          font-size: clamp(48px, 18vw, 72px) !important;
          letter-spacing: -0.02em !important;
        }

        .infinity-stage-x {
          font-size: clamp(72px, 19vw, 108px) !important;
        }

        .typed-cursor {
          margin-left: 1px;
        }

        .floating-nav {
          left: 50%;
          right: auto;
          max-width: calc(100vw - 24px);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          bottom: max(10px, env(safe-area-inset-bottom));
        }

        .floating-nav::-webkit-scrollbar {
          display: none;
        }

        .floating-nav a:not(.nav-cta) {
          display: none;
        }

        .floating-nav .nav-cta {
          padding: 11px 20px !important;
          font-size: 12px !important;
        }

        #about,
        #stats,
        #services,
        #work,
        #ai,
        #philosophy,
        #contact {
          padding-top: 104px !important;
          padding-bottom: 104px !important;
        }

        .section-heading {
          font-size: clamp(30px, 10vw, 42px) !important;
          line-height: 1.12 !important;
        }

        .work-item {
          padding-top: 34px !important;
          padding-bottom: 34px !important;
        }

        .work-title {
          font-size: clamp(26px, 8.5vw, 36px) !important;
        }

        .btn-primary,
        .btn-submit {
          width: 100%;
          justify-content: center;
          padding: 16px 24px !important;
        }

        .marquee-dot {
          margin: 0 22px;
        }
      }

      /* Tablet polish: iPad Mini and similar */
      @media (min-width: 376px) and (max-width: 834px) {
        #about,
        #stats,
        #services,
        #work,
        #ai,
        #philosophy,
        #contact {
          padding-top: 124px !important;
          padding-bottom: 124px !important;
        }

        .hero-title-container {
          min-height: 165px !important;
        }

        .hero-title-final {
          font-size: clamp(60px, 12vw, 96px) !important;
        }

        .floating-nav {
          max-width: calc(100vw - 40px);
          bottom: max(14px, env(safe-area-inset-bottom));
          padding: 10px 12px;
        }

        .floating-nav a {
          padding-inline: 14px !important;
          font-size: 12px !important;
        }

        .work-item {
          padding-top: 40px !important;
          padding-bottom: 40px !important;
        }
      }

      /* 1024px tablet/landscape polish */
      @media (min-width: 835px) and (max-width: 1024px) {
        #about,
        #services,
        #work,
        #ai,
        #philosophy,
        #contact {
          padding-top: 136px !important;
          padding-bottom: 136px !important;
        }

        .hero-title-final {
          font-size: clamp(68px, 10vw, 118px) !important;
        }

        .floating-nav {
          bottom: 20px;
        }
      }

      /* Mobile/tablet interaction improvements */
      @media (max-width: 1024px) {
        button,
        a,
        input,
        select,
        textarea {
          touch-action: manipulation;
        }

        .service-card,
        .work-item,
        #about,
        #services,
        #work,
        #ai,
        #philosophy,
        #contact {
          content-visibility: auto;
          contain-intrinsic-size: 1px 900px;
        }

        .service-card {
          transform: none !important;
        }
      }
    `}</style>
  );
}

function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const auraRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches;
    const isSmall = window.innerWidth <= 768;
    const lowPower = (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) ||
      (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4);

    if (isTouch || isSmall || prefersReduced || lowPower) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let auraX = 0;
    let auraY = 0;
    let snapTargetX: number | null = null;
    let snapTargetY: number | null = null;
    const trailPositions = Array(5).fill(null).map(() => ({ x: 0, y: 0 }));
    let animationId: number;
    let isAnimating = false;
    let prevMoveX = 0;
    let prevMoveY = 0;
    let prevMoveT = performance.now();
    let lastSnapCheck = 0;

    const brightnessCache = new WeakMap<Element, number>();
    const getBackgroundBrightness = (element: Element | null): number => {
      if (!element || element === document.documentElement) {
        return 255;
      }

      if (brightnessCache.has(element)) {
        return brightnessCache.get(element)!;
      }

      const computedStyle = window.getComputedStyle(element as HTMLElement);
      const bgColor = computedStyle.backgroundColor;

      if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
        const parentBrightness = getBackgroundBrightness(element.parentElement);
        brightnessCache.set(element, parentBrightness);
        return parentBrightness;
      }

      const rgb = bgColor.match(/\d+/g);
      if (!rgb || rgb.length < 3) {
        return 255;
      }

      const r = parseInt(rgb[0]);
      const g = parseInt(rgb[1]);
      const b = parseInt(rgb[2]);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      brightnessCache.set(element, brightness);
      return brightness;
    };

    let cursorColorTimeout: ReturnType<typeof setTimeout> | null = null;
    const updateCursorColor = (x: number, y: number) => {
      if (cursorColorTimeout) return;

      cursorColorTimeout = setTimeout(() => {
        const elementUnderCursor = document.elementFromPoint(x, y);
        if (elementUnderCursor) {
          const brightness = getBackgroundBrightness(elementUnderCursor);
          if (brightness < 128) {
            document.body.classList.add('cursor-inverted');
          } else {
            document.body.classList.remove('cursor-inverted');
          }
        }

        cursorColorTimeout = null;
      }, 100);
    };

    const linksAndButtons = Array.from(document.querySelectorAll('a, button'));
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, .section-heading, .work-title, .trust-line'));
    const cards = Array.from(document.querySelectorAll('.service-card, .work-item'));
    const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
    const snapCandidates = Array.from(document.querySelectorAll('a, button, .service-card, .work-item, input, textarea, select'));

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top = mouseY + 'px';
      }

      updateCursorColor(e.clientX, e.clientY);

      const now = performance.now();
      const dt = Math.max(1, now - prevMoveT);
      const dx = e.clientX - prevMoveX;
      const dy = e.clientY - prevMoveY;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      document.body.classList.toggle('cursor-fast', speed > 1.5);
      prevMoveX = e.clientX;
      prevMoveY = e.clientY;
      prevMoveT = now;

      if (now - lastSnapCheck > 70) {
        lastSnapCheck = now;
        let nearest: { x: number; y: number; dist: number } | null = null;
        const snapRadius = 120;

        for (const el of snapCandidates) {
          const rect = (el as HTMLElement).getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) continue;
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const d = Math.hypot(mouseX - cx, mouseY - cy);
          if (d > snapRadius) continue;
          if (!nearest || d < nearest.dist) {
            nearest = { x: cx, y: cy, dist: d };
          }
        }

        if (nearest && nearest.dist < 72) {
          snapTargetX = nearest.x;
          snapTargetY = nearest.y;
          document.body.classList.add('cursor-snap');
        } else {
          snapTargetX = null;
          snapTargetY = null;
          document.body.classList.remove('cursor-snap');
        }
      }

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      const targetX = snapTargetX ?? mouseX;
      const targetY = snapTargetY ?? mouseY;

      ringX += (targetX - ringX) * (snapTargetX !== null ? 0.2 : 0.12);
      ringY += (targetY - ringY) * (snapTargetY !== null ? 0.2 : 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }

      auraX += (targetX - auraX) * 0.22;
      auraY += (targetY - auraY) * 0.22;
      if (auraRef.current) {
        auraRef.current.style.left = auraX + 'px';
        auraRef.current.style.top = auraY + 'px';
      }

      let prevX = mouseX, prevY = mouseY;
      trailPositions.forEach((pos, i) => {
        const speed = 0.12 - (i * 0.015);
        pos.x += (prevX - pos.x) * speed;
        pos.y += (prevY - pos.y) * speed;
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.left = pos.x + 'px';
          trailRefs.current[i].style.top = pos.y + 'px';
        }
        prevX = pos.x;
        prevY = pos.y;
      });

      const isMoving = Math.abs(targetX - ringX) > 0.5 || Math.abs(targetY - ringY) > 0.5;
      if (isMoving) {
        animationId = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
      }
    };

    const handleLinkEnter = () => {
      document.body.classList.add('cursor-hover-link');
      document.body.classList.remove('cursor-hover-heading', 'cursor-hover-card', 'cursor-hover-input');
    };
    const handleLinkLeave = () => {
      document.body.classList.remove('cursor-hover-link');
    };
    const handleHeadingEnter = () => {
      document.body.classList.add('cursor-hover-heading');
      document.body.classList.remove('cursor-hover-link', 'cursor-hover-card', 'cursor-hover-input');
    };
    const handleHeadingLeave = () => {
      document.body.classList.remove('cursor-hover-heading');
    };
    const handleCardEnter = () => {
      document.body.classList.add('cursor-hover-card');
      document.body.classList.remove('cursor-hover-link', 'cursor-hover-heading', 'cursor-hover-input');
    };
    const handleCardLeave = () => {
      document.body.classList.remove('cursor-hover-card');
    };
    const handleInputEnter = () => {
      document.body.classList.add('cursor-hover-input');
      document.body.classList.remove('cursor-hover-link', 'cursor-hover-heading', 'cursor-hover-card');
    };
    const handleInputLeave = () => {
      document.body.classList.remove('cursor-hover-input');
    };

    linksAndButtons.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLinkLeave);
    });
    headings.forEach((el) => {
      el.addEventListener('mouseenter', handleHeadingEnter);
      el.addEventListener('mouseleave', handleHeadingLeave);
    });
    cards.forEach((el) => {
      el.addEventListener('mouseenter', handleCardEnter);
      el.addEventListener('mouseleave', handleCardLeave);
    });
    inputs.forEach((el) => {
      el.addEventListener('mouseenter', handleInputEnter);
      el.addEventListener('mouseleave', handleInputLeave);
      el.addEventListener('focus', handleInputEnter);
      el.addEventListener('blur', handleInputLeave);
    });

    const handleClickPulse = (e: MouseEvent) => {
      if (!shockwaveRef.current) return;
      shockwaveRef.current.style.left = `${e.clientX}px`;
      shockwaveRef.current.style.top = `${e.clientY}px`;
      shockwaveRef.current.classList.remove('active');
      void shockwaveRef.current.offsetWidth;
      shockwaveRef.current.classList.add('active');
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleClickPulse, { passive: true });

    const magneticElements = document.querySelectorAll('.btn-primary, .btn-submit, .nav-cta');
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e: Event) => {
        const me = e as MouseEvent;
        const target = el as HTMLElement;
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (me.clientX - centerX) * 0.15;
        const deltaY = (me.clientY - centerY) * 0.15;
        target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
      el.addEventListener('mouseleave', () => {
        const target = el as HTMLElement;
        target.style.transform = 'translate(0, 0)';
        target.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
      el.addEventListener('mouseenter', () => {
        const target = el as HTMLElement;
        target.style.transition = 'transform 0.1s ease';
      });
    });

    const handleMouseLeave = () => document.body.classList.add('cursor-hidden');
    const handleMouseEnter = () => document.body.classList.remove('cursor-hidden');
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleClickPulse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
      if (cursorColorTimeout) clearTimeout(cursorColorTimeout);
      document.body.classList.remove(
        'cursor-fast',
        'cursor-snap',
        'cursor-hover-link',
        'cursor-hover-heading',
        'cursor-hover-card',
        'cursor-hover-input',
        'cursor-inverted',
        'cursor-hidden'
      );
      linksAndButtons.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
      headings.forEach((el) => {
        el.removeEventListener('mouseenter', handleHeadingEnter);
        el.removeEventListener('mouseleave', handleHeadingLeave);
      });
      cards.forEach((el) => {
        el.removeEventListener('mouseenter', handleCardEnter);
        el.removeEventListener('mouseleave', handleCardLeave);
      });
      inputs.forEach((el) => {
        el.removeEventListener('mouseenter', handleInputEnter);
        el.removeEventListener('mouseleave', handleInputLeave);
        el.removeEventListener('focus', handleInputEnter);
        el.removeEventListener('blur', handleInputLeave);
      });
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-ring-text">View</span>
      </div>
      <div ref={auraRef} className="cursor-aura" />
      <div ref={shockwaveRef} className="cursor-shockwave" />
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          ref={el => { if (el) trailRefs.current[i - 1] = el; }}
          className={`cursor-trail cursor-trail-${i}`}
        />
      ))}
    </>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ENHANCEMENT 7: GRADIENT GLOW SCROLL PROGRESS
   ISSUE 3 FIX: Performance optimized with requestAnimationFrame
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (progressRef.current) {
            const scrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollY / documentHeight) * 100;
            
            // ISSUE 3 FIX: Direct DOM manipulation instead of state updates
            progressRef.current.style.width = `${scrollPercent}%`;
            progressRef.current.style.height = `${2 + (scrollPercent / 100) * 2}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={progressRef}
      className="scroll-progress"
      style={{
        width: '0%',
        height: '2px',
      }}
    />
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SCROLL TO TOP BUTTON
   ISSUE 3 FIX: Performance optimized with requestAnimationFrame
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const lastVisibleState = useRef(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
          const shouldBeVisible = scrollPercent > 0.6;
          
          // ISSUE 3 FIX: Only update state if visibility changed
          if (shouldBeVisible !== lastVisibleState.current) {
            lastVisibleState.current = shouldBeVisible;
            setVisible(shouldBeVisible);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="scroll-to-top-btn"
      style={{
        position: 'fixed',
        bottom: '120px',
        right: '40px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#FFFFFF',
        border: '1px solid rgba(14, 14, 14, 0.08)',
        color: '#0E0E0E',
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.9)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 998,
        boxShadow: '0 8px 32px rgba(14, 14, 14, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#0E0E0E';
        e.currentTarget.style.color = '#FFFFFF';
        e.currentTarget.style.borderColor = '#0E0E0E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#FFFFFF';
        e.currentTarget.style.color = '#0E0E0E';
        e.currentTarget.style.borderColor = 'rgba(14, 14, 14, 0.08)';
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DYNAMIC PAGE TITLE HOOK
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ENHANCEMENT 6: LIQUID METAL RIPPLE EFFECT
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CINEMATIC HERO â€” INFINITY TO STYLARKX ANIMATION
   SINGLE INFINITY | DOUBLED SIZE | 7-SECOND PREMIUM ANIMATION
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function Hero({ fxProfile }: { fxProfile: FxProfile }) {
  // Animation phase state (0-6)
  const [animPhase, setAnimPhase] = useState(0);
  const [burstActive, setBurstActive] = useState(false);
  const [fastIntro] = useState(() => {
    try {
      return window.sessionStorage.getItem('stylarkx_hero_seen') === '1';
    } catch {
      return false;
    }
  });
  
  // State for typed subtitle
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });
  const [heroScrollOffset, setHeroScrollOffset] = useState(0);
  const rippleHandler = useLiquidRippleEffect();

  // Refs for the cinematic animation elements
  const infinitySvgRef    = useRef<SVGSVGElement>(null);
  const infinityPathRef   = useRef<SVGPathElement>(null);
  const stageXRef         = useRef<HTMLSpanElement>(null);
  const heroTitleRef      = useRef<HTMLDivElement>(null);
  const letterRefs        = useRef<(HTMLSpanElement | null)[]>([]);
  const letterXRef        = useRef<HTMLSpanElement>(null);
  const stageRef          = useRef<HTMLDivElement>(null);
  const heroSectionRef    = useRef<HTMLElement | null>(null);
  const animStartedRef    = useRef(false);
  const burstParticles = useRef(
    Array.from({ length: 12 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 12;
      const radius = 58 + (i % 4) * 12;
      return {
        id: i,
        dx: Math.cos(angle) * radius,
        dy: Math.sin(angle) * radius,
      };
    })
  ).current;

  // Phrases for typing effect
  const phrases = [
    "Affordable Pricing. Premium Build Quality. Zero Templates.",
    "Full-Stack Websites. 3D Experiences. eCommerce That Converts.",
    "From Concept to Launch. Built for Real Business Growth.",
    "AI-Integrated Products. Fast Delivery. Long-Term Reliability."
  ];

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // CINEMATIC TIMELINE (luxury pacing)
  // Phase 1: Infinity appears
  // Phase 2: Stroke draw
  // Phase 3: Gold illumination
  // Phase 4: Morph to X
  // Phase 5: X settles + letters reveal
  // Phase 6: Complete
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  useEffect(() => {
    if (animStartedRef.current) return;
    animStartedRef.current = true;

    const timeline = fxProfile.liteFx
      ? [
          { phase: 1, delay: 180 },
          { phase: 4, delay: 900 },
          { phase: 6, delay: 1700 },
        ]
      : fastIntro
      ? [
          { phase: 1, delay: 420 },
          { phase: 2, delay: 1500 },
          { phase: 3, delay: 2200 },
          { phase: 4, delay: 3900 },
          { phase: 5, delay: 5100 },
          { phase: 6, delay: 6400 },
        ]
      : [
          { phase: 1, delay: 500 },   // Infinity appears
          { phase: 2, delay: 1700 },  // Infinity draws
          { phase: 3, delay: 2600 },  // Gold fill
          { phase: 4, delay: 4300 },  // Morph to X
          { phase: 5, delay: 5600 },  // X moves + letters
          { phase: 6, delay: 7000 },  // Complete
        ];

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    timeline.forEach(({ phase, delay }) => {
      const timeout = setTimeout(() => setAnimPhase(phase), delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [fxProfile.liteFx, fastIntro]);

  // Hard guard: never let hero stay in a loading phase forever
  useEffect(() => {
    const guard = setTimeout(() => {
      setAnimPhase((prev) => (prev < 6 ? 6 : prev));
    }, fxProfile.liteFx ? 3200 : fastIntro ? 7600 : 8600);
    return () => clearTimeout(guard);
  }, [fxProfile.liteFx, fastIntro]);

  useEffect(() => {
    document.body.classList.toggle('hero-fast-intro', fastIntro);
    return () => document.body.classList.remove('hero-fast-intro');
  }, [fastIntro]);

  useEffect(() => {
    if (animPhase < 6) return;
    try {
      window.sessionStorage.setItem('stylarkx_hero_seen', '1');
    } catch {
      // ignore storage access issues
    }
  }, [animPhase]);

  // Adaptive theme + motion variables (time-of-day + scroll velocity)
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 19 || hour <= 5) {
      document.body.classList.add('theme-night');
    } else {
      document.body.classList.remove('theme-night');
    }

    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const now = performance.now();
        const dy = Math.abs(window.scrollY - lastY);
        const dt = Math.max(now - lastT, 16);
        const velocity = Math.min(1, (dy / dt) * 0.35);
        document.documentElement.style.setProperty('--scroll-velocity', velocity.toFixed(3));
        setHeroScrollOffset(Math.min(120, window.scrollY * 0.12));
        lastY = window.scrollY;
        lastT = now;
        raf = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      document.body.classList.remove('theme-night');
    };
  }, []);

  // Hero mouse parallax for depth
  useEffect(() => {
    if (window.innerWidth < 860) return;
    if (fxProfile.isTablet) return;
    if (fxProfile.liteFx) return;

    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 18;
        const y = (e.clientY / window.innerHeight - 0.5) * 14;
        setHeroParallax({ x, y });
        document.documentElement.style.setProperty('--hero-mx', x.toFixed(2));
        document.documentElement.style.setProperty('--hero-my', y.toFixed(2));
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fxProfile.isTablet, fxProfile.liteFx]);

  // â•â•â•â•â•â•â•â•â•â•â•â•â•
  // PHASE-BASED ANIMATION EFFECTS
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  useEffect(() => {
    const svg = infinitySvgRef.current;
    const path = infinityPathRef.current;
    const stageX = stageXRef.current;
    const title = heroTitleRef.current;
    const stage = stageRef.current;
    const lRefs = letterRefs.current;
    const lX = letterXRef.current;

    if (!svg || !path) return;

    // â”€ PHASE 1: Infinity appears (fade in + scale up) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (animPhase === 1) {
      // Initialize path for drawing
      const pathLen = Math.ceil(path.getTotalLength());
      path.style.strokeDasharray = `${pathLen}`;
      path.style.strokeDashoffset = `${pathLen}`;
      path.style.stroke = '#0E0E0E';
      path.style.filter = 'none';

      // Slow, elegant fade + scale
      svg.style.transition = 'opacity 1.8s cubic-bezier(0.22, 1, 0.36, 1), transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)';
      svg.style.opacity = '1';
      svg.style.transform = 'scale(1)';
    }

    // â”€ PHASE 2: Infinity draws itself â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (animPhase === 2) {
      path.style.transition = 'stroke-dashoffset 1.9s cubic-bezier(0.22, 1, 0.36, 1)';
      path.style.strokeDashoffset = '0';
    }

    // â”€ PHASE 3: Gold fill effect â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (animPhase === 3) {
      path.style.transition = 'stroke 1.05s ease-in-out, filter 1.05s ease-in-out, stroke-width 1s ease';
      path.style.stroke = '#B8860B';
      path.style.strokeWidth = '4.6';
      path.style.filter = 'drop-shadow(0 0 28px rgba(184, 134, 11, 0.45))';
    }

    // â”€ PHASE 4: Morph to X â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (animPhase === 4 && stageX) {
      // Infinity fades out while rotating
      svg.style.transition = 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
      svg.style.opacity = '0';
      svg.style.transform = 'scale(0.9) rotate(10deg)';

      // X appears with restrained cinematic reveal
      setTimeout(() => {
        stageX.style.transition = 'none';
        stageX.style.opacity = '0';
        stageX.style.transform = 'translate(-50%, -50%) rotate(-16deg) scale(0.9)';
        requestAnimationFrame(() => {
          stageX.style.transition = 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
          stageX.style.opacity = '1';
          stageX.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)';
        });
      }, 100);
      setBurstActive(true);
      setTimeout(() => setBurstActive(false), 1300);
    }

    // â”€ PHASE 5: X moves + letters emerge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (animPhase === 5 && title && stage && stageX && lX) {
      // Show the final title container
      title.style.visibility = 'visible';
      title.style.opacity = '1';
      title.style.filter = 'blur(4px)';
      title.style.letterSpacing = '0.08em';

      // Calculate position for X to move to
      const xRect = lX.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const xCenterX = xRect.left + xRect.width / 2;
      const xCenterY = xRect.top + xRect.height / 2;
      const stageLocalX = xCenterX - (stageRect.left + stageRect.width / 2);
      const stageLocalY = xCenterY - (stageRect.top + stageRect.height / 2);

      // Animate X moving to final position
      stageX.style.transition = 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
      stageX.style.transform = `translate(calc(-50% + ${stageLocalX}px), calc(-50% + ${stageLocalY}px)) scale(1) rotate(0deg)`;

      // Emerge letters S t y l a r k from right to left
      const stylarkChars = ['S', 't', 'y', 'l', 'a', 'r', 'k'];
      stylarkChars.slice().reverse().forEach((_char, ri) => {
        const naturalIdx = stylarkChars.length - 1 - ri;
        const delay = ri * 110; // slower stagger

        setTimeout(() => {
          const el = lRefs[naturalIdx];
          if (!el) return;

          // Start state
          el.style.transition = 'none';
          el.style.opacity = '0';
          el.style.color = '#B8860B';
          el.style.textShadow = '0 0 20px rgba(184, 134, 11, 0.35)';
          el.style.transform = 'translateX(56px) scale(0.96)';

          requestAnimationFrame(() => {
            // Animate to final position
            el.style.transition = `
              opacity 1.05s cubic-bezier(0.22, 1, 0.36, 1),
              transform 1.05s cubic-bezier(0.22, 1, 0.36, 1),
              color 0.55s ease 0.38s,
              text-shadow 0.55s ease 0.38s
            `;
            el.style.opacity = '1';
            el.style.transform = 'translateX(0) scale(1)';

            // Transition from gold to black
            setTimeout(() => {
              el.style.color = '#0E0E0E';
              el.style.textShadow = 'none';
            }, 520);
          });
        }, delay);
      });

      // Show final X and hide overlay X
      setTimeout(() => {
        title.style.filter = 'blur(0px)';
        title.style.letterSpacing = '-0.03em';
        lX.style.transition = 'opacity 0.35s ease';
        lX.style.opacity = '1';
        stageX.style.transition = 'opacity 0.35s ease';
        stageX.style.opacity = '0';
      }, stylarkChars.length * 110 + 420);
    }

    // â”€ PHASE 6: Complete â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (animPhase === 6 && stage && title) {
      // Fallback-safe final state so hero never remains blank
      title.style.visibility = 'visible';
      title.style.opacity = '1';
      title.style.filter = 'blur(0px)';
      title.style.letterSpacing = '-0.03em';
      stage.style.display = 'none';
      title.classList.add('anim-complete');
      if (lX) lX.style.opacity = '1';
      if (stageX) stageX.style.opacity = '0';
      lRefs.forEach((el, index) => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'translateX(0) scale(1)';
        if (index < 7) {
          el.style.color = '#0E0E0E';
          el.style.textShadow = 'none';
        }
      });
    }
  }, [animPhase]);

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // TYPING EFFECT â€” Starts when animation completes (phase 6)
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  useEffect(() => {
    if (animPhase < 6) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const getTypingDelay = (char: string) => {
      if (['.', ',', '!', '?'].includes(char)) return 120 + Math.random() * 80;
      return 40 + Math.random() * 30;
    };

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      setIsTyping(!isDeleting && charIndex < currentPhrase.length);

      if (!isDeleting) {
        setTypedText(currentPhrase.substring(0, charIndex + 1));
        setIsBlurred(false);
        charIndex++;

        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          timeout = setTimeout(type, 3000);
          return;
        }
        timeout = setTimeout(type, getTypingDelay(currentPhrase[charIndex - 1]));
      } else {
        if (charIndex === currentPhrase.length) setIsBlurred(true);
        setTypedText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setIsBlurred(false);
          timeout = setTimeout(type, 500);
          return;
        }
        timeout = setTimeout(type, 25);
      }
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, [animPhase]);

  // Hide scroll indicator on scroll
  const scrollIndicatorHiddenRef = useRef(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const shouldHide = window.scrollY > 100;
          if (shouldHide !== scrollIndicatorHiddenRef.current) {
            scrollIndicatorHiddenRef.current = shouldHide;
            setScrollIndicatorHidden(shouldHide);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stable particles array (computed once)
  const particles = useMemo(() => {
    const count = fxProfile.liteFx ? 6 : fxProfile.isMobile ? 8 : fxProfile.isTablet ? 10 : 14;
    return Array(count).fill(null).map((_, i) => ({
      id: i,
      left: `${(i * 5.3 + 7) % 100}%`,
      top: `${(i * 7.7 + 13) % 100}%`,
      size: 2 + (i % 3),
      delay: `${(i * 0.5) % 10}s`,
      duration: `${15 + (i % 15)}s`,
      opacity: 0.02 + (i % 4) * 0.01,
    }));
  }, [fxProfile.isMobile, fxProfile.isTablet, fxProfile.liteFx]);

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="hero-camera-pass"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F7F4',
        overflow: 'hidden',
      }}
    >
      {fxProfile.liteFx && <div className="hero-mobile-aura" />}
      <div className="hero-grain" />
      <div className="hero-light-sweep" />

      {/* Animated Mesh Gradient Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div className="mesh-orb mesh-orb-1" style={{ transform: `translate(${heroParallax.x * 0.35}px, ${heroParallax.y * 0.25}px)` }} />
        <div className="mesh-orb mesh-orb-2" style={{ transform: `translate(${heroParallax.x * -0.28}px, ${heroParallax.y * -0.18}px)` }} />
        <div className="mesh-orb mesh-orb-3" style={{ transform: `translate(${heroParallax.x * 0.22}px, ${heroParallax.y * -0.22}px)` }} />
        <div className="mesh-orb mesh-orb-4" style={{ transform: `translate(${heroParallax.x * -0.18}px, ${heroParallax.y * 0.18}px)` }} />
        <div className="mesh-orb mesh-orb-5" style={{ transform: `translate(${heroParallax.x * 0.14}px, ${heroParallax.y * -0.14}px)` }} />
      </div>

      {/* Floating Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        {particles.map(p => (
          <div key={p.id} className="particle" style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            animationDelay: p.delay, animationDuration: p.duration,
            opacity: p.opacity,
          }} />
        ))}
      </div>

      {/* â”€â”€ Hero Content â”€â”€ */}
      <div className="hero-content-shell" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1200px', padding: '0 40px', textAlign: 'center' }}>

        {/* Eyebrow â€” fades in with animation phase 1 */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#B8860B',
          marginBottom: '40px',
          opacity: animPhase >= 1 ? 0.85 : 0,
          transform: animPhase >= 1 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          Full-Stack & 3D Web Studio
        </p>

        {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
            CINEMATIC TITLE CONTAINER â€” DOUBLED SIZE INFINITY
            â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
        <div
          className="hero-title-container"
          style={{
            minHeight: 'clamp(180px, 25vw, 300px)',
            transform: `translateY(${-heroScrollOffset * 0.2}px)`,
            transition: 'transform 0.25s ease-out',
          }}
        >
          <div className={`hero-burst ${burstActive ? 'active' : ''}`}>
            {burstParticles.map((particle) => (
              <span
                key={particle.id}
                className="hero-burst-particle"
                style={
                  {
                    '--dx': `${particle.dx}px`,
                    '--dy': `${particle.dy}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          {/* Overlay stage: SINGLE infinity SVG + typographic X */}
          <div ref={stageRef} className="infinity-stage">
            {/* 
              SINGLE INFINITY SYMBOL â€” DOUBLED SIZE (400px)
              One continuous figure-8 path, not two separate loops
            */}
            <svg
              ref={infinitySvgRef}
              className="infinity-svg-el"
              viewBox="0 0 200 100"
              preserveAspectRatio="xMidYMid meet"
              style={{
                width: 'clamp(280px, 35vw, 400px)',
                height: 'auto',
                opacity: 0,
                transform: 'scale(0.8)',
                display: 'block',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* SINGLE continuous infinity path (figure-8) */}
              <path
                ref={infinityPathRef}
                d="M46,50
                   C46,30 68,18 88,30
                   C98,36 102,44 105,50
                   C108,56 112,64 122,70
                   C142,82 164,70 164,50
                   C164,30 142,18 122,30
                   C112,36 108,44 105,50
                   C102,56 98,64 88,70
                   C68,82 46,70 46,50"
                fill="none"
                stroke="#0E0E0E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  willChange: 'stroke-dashoffset, stroke, filter',
                }}
              />
            </svg>

            {/* Typographic X overlay (appears when infinity morphs) */}
            <span
              ref={stageXRef}
              className="infinity-stage-x"
              style={{ 
                fontSize: 'clamp(100px, 18vw, 180px)',
                willChange: 'transform, opacity',
              }}
            >
              X
            </span>
          </div>

          {/* Final StylarkX title (invisible until anim phase 5) */}
          <div
            ref={heroTitleRef}
            className={`hero-title-final ${animPhase >= 6 ? 'anim-complete' : ''}`}
            style={{ 
              visibility: 'hidden', 
              opacity: 0,
              fontSize: 'clamp(72px, 14vw, 160px)',
            }}
          >
            {/* S t y l a r k â€” each letter animates individually */}
            {(['S','t','y','l','a','r','k'] as const).map((char, i) => (
              <span
                key={char + i}
                ref={el => { letterRefs.current[i] = el; }}
                className="hero-letter"
                style={{ 
                  willChange: 'transform, opacity, color, text-shadow',
                  backfaceVisibility: 'hidden',
                }}
              >
                {char}
              </span>
            ))}
            {/* X â€” stays gold with glow pulse */}
            <span
              ref={letterXRef}
              className="hero-letter hero-letter-x"
              style={{ 
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            >
              X
            </span>
          </div>
        </div>

        {/* Typed subtitle â€” appears after animation completes */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(13px, 1.4vw, 17px)',
          fontWeight: 300,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#6E6E6E',
          marginBottom: '60px',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: animPhase >= 6 ? 1 : 0,
          transform: animPhase >= 6 ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.1s',
        }}>
          <span className={`typed-text ${isBlurred ? 'blur' : ''}`} style={{ transition: 'filter 0.3s ease' }}>
            {typedText}
          </span>
          <span className={`typed-cursor ${isTyping ? 'typing' : ''}`}>|</span>
        </p>

        {/* CTAs â€” appear after animation completes */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          style={{
            marginBottom: '120px',
            opacity: animPhase >= 6 ? 1 : 0,
            transform: animPhase >= 6 ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.25s',
          }}
        >
          <a
            href="#contact"
            onClick={rippleHandler}
            className="btn-primary"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backgroundColor: '#0E0E0E',
              color: '#FFFFFF',
              padding: '18px 48px',
              textDecoration: 'none',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2F5BFF'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0E0E0E'; }}
          >
            Start a Project
          </a>
          <a
            href="#services"
            className="btn-text"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6E6E6E',
              textDecoration: 'none',
              padding: '18px 0',
              position: 'relative',
              transition: 'color 0.4s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#0E0E0E'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6E6E6E'; }}
          >
            View Capabilities
          </a>
        </div>
      </div>

      {/* Scroll indicator â€” appears after animation completes */}
      <div style={{
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        opacity: animPhase >= 6 && !scrollIndicatorHidden ? 1 : 0,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: animPhase >= 6 ? '0.4s' : '0s',
        zIndex: 10,
        pointerEvents: animPhase >= 6 && !scrollIndicatorHidden ? 'auto' : 'none',
      }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#B8860B',
          opacity: 0.8,
        }}>
          Scroll to explore
        </span>
        <div className="scroll-indicator-line" style={{
          width: '1px',
          height: '60px',
          backgroundColor: 'rgba(184, 134, 11, 0.4)',
          position: 'relative',
          overflow: 'hidden',
        }} />
        <div className="scroll-chevron" />
      </div>
    </section>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ABOUT SECTION
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const fxProfile = useFxProfile();

  const handleSectionChange = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  useActiveSection(
    ['hero', 'about', 'stats', 'services', 'work', 'ai', 'philosophy', 'contact'],
    handleSectionChange
  );

  // Dynamic page title
  useDynamicPageTitle(activeSection);

  useEffect(() => {
    if (activeSection !== 'hero') {
      document.body.classList.add('scene-shift');
    } else {
      document.body.classList.remove('scene-shift');
    }
  }, [activeSection]);

  useEffect(() => {
    let manualOverride = false;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'm') return;
      manualOverride = true;
      document.body.classList.toggle('audio-reactive');
    };

    const interval = window.setInterval(() => {
      if (manualOverride) return;
      const mediaPlaying = Array.from(document.querySelectorAll('audio,video')).some((media) => {
        const m = media as HTMLMediaElement;
        return !m.paused && !m.ended && m.currentTime > 0;
      });
      document.body.classList.toggle('audio-reactive', mediaPlaying);
    }, 1200);

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearInterval(interval);
      document.body.classList.remove('audio-reactive');
    };
  }, []);

  return (
    <div>
      <GlobalStyles />
      {!fxProfile.isMobile && !fxProfile.reduceMotion && <ScrollProgress />}
      {!fxProfile.isMobile && !fxProfile.isTablet && !fxProfile.liteFx && <MagneticCursor />}
      <Hero fxProfile={fxProfile} />
      <AboutSection />
      <StatsSection />
      <MarqueeTicker />
      <ServicesSection />
      <WorkSection enableFloatingPreview={!fxProfile.isMobile && !fxProfile.isTablet && !fxProfile.liteFx} />
      <AISection fxProfile={fxProfile} />
      <PhilosophySection />
      <ContactSection />
      <Footer />
      <FloatingNav activeSection={activeSection} />
      <ScrollToTopButton />
    </div>
  );
}





