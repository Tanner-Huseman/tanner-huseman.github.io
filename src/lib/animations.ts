/**
 * animations.ts — GSAP ScrollTrigger configurations
 *
 * Centralizes reusable animation patterns so component-level scripts
 * stay thin. Import and call these from component <script> blocks.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Check once at module load time — components can import this constant. */
export const prefersReducedMotion = (() => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
})();

/**
 * Fade + slide-up reveal for a set of elements as they enter the viewport.
 *
 * @param selector — CSS selector for elements to animate
 * @param options  — overrides for gsap.from() and ScrollTrigger
 */
export function revealOnScroll(
  selector: string,
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  if (prefersReducedMotion) {
    gsap.set(selector, { opacity: 1, y: 0 });
    return;
  }

  const { y = 40, duration = 0.7, stagger = 0.1, start = 'top 80%' } = options;

  gsap.from(selector, {
    opacity: 0,
    y,
    duration,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: selector,
      start,
    },
  });
}

/**
 * Horizontal scroll pin for the skills carousel.
 *
 * Pins the section container and tweens the inner track horizontally
 * as the user scrolls vertically. Call this after the component mounts.
 *
 * @param containerSelector — the pinned outer wrapper
 * @param trackSelector     — the horizontally-moving inner element
 */
export function initSkillsCarousel(
  containerSelector: string = '#skills-section',
  trackSelector: string = '#skills-track'
) {
  if (prefersReducedMotion) return;

  const container = document.querySelector(containerSelector);
  const track = document.querySelector<HTMLElement>(trackSelector);
  if (!container || !track) return;

  // On mobile, skip horizontal scroll — CSS handles vertical stack
  if (window.innerWidth < 768) return;

  // Padding keeps the last card from butting against the viewport edge
  const PADDING = 96;
  const trackWidth = track.scrollWidth;
  const viewportWidth = window.innerWidth;
  const scrollDistance = trackWidth - viewportWidth + PADDING;

  if (scrollDistance <= 0) return; // all cards already fit — no pin needed

  const tween = gsap.to(track, {
    x: -scrollDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: containerSelector,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true, // recalculate on window resize
    },
  });

  return tween;
}

/**
 * Staggered section header reveal — eyebrow label + h2.
 *
 * @param sectionId — the section element id (without #)
 */
export function revealSectionHeader(sectionId: string) {
  if (prefersReducedMotion) return;

  gsap.from(`#${sectionId} .section-label, #${sectionId} h2`, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: `#${sectionId}`,
      start: 'top 75%',
    },
  });
}
