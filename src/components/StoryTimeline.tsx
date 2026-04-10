import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import phantomImg from '../assets/images/performance-phantom.jpeg';
import realEstateImg from '../assets/images/real-estate.jpeg';
import workShotImg from '../assets/images/work-shot-sitting.jpeg';
import whiteboardImg from '../assets/images/whiteboard.jpeg';

gsap.registerPlugin(ScrollTrigger);

interface Phase {
  id: string;
  label: string;
  period: string;
  heading: string;
  body: string;
  accent: string;
  photo?: { src: string };
  photoAlt?: string;
  photoPosition?: string;
}

const phases: Phase[] = [
  {
    id: 'stage',
    label: '01 — Stage',
    period: '2014 – 2020',
    heading: 'The\nPerformer',
    body: 'Metropolitan Opera. The Phantom of the Opera on Broadway. Limón Dance Company. Six years performing at the highest level taught me what precision, collaboration under pressure, and public communication actually look like.',
    accent: '#6c5ce7',
    photo: phantomImg,
    photoAlt: 'Tanner Huseman in costume during The Phantom of the Opera',
    photoPosition: 'object-top',
  },
  {
    id: 'realestate',
    label: '02 — Real Estate',
    period: '2020 – 2021',
    heading: 'The\nCloser',
    body: 'Licensed PA realtor at RE/MAX Main Line. Sold 10 homes in ~6 months. Cold-started a pipeline from zero, learned to move fast with imperfect information, and discovered I was good at figuring out complex systems quickly.',
    accent: '#f5a623',
    photo: realEstateImg,
    photoAlt: 'Tanner Huseman at RE/MAX Main Line',
    photoPosition: 'object-center',
  },
  {
    id: 'engineer',
    label: '03 — Engineer',
    period: '2021 – 2023',
    heading: 'The\nBuilder',
    body: 'Joined Macquarie as L2. Earned MS Computer Science at Merrimack while working full time. Promoted to L3 within 18 months. Built production data pipelines, internal tooling, and the foundations of a Data-as-a-Service platform.',
    accent: '#00d2a0',
    photo: workShotImg,
    photoAlt: 'Tanner Huseman working with a colleague',
    photoPosition: 'object-right',
  },
  {
    id: 'architect',
    label: '04 — Data Platform',
    period: '2023 – Present',
    heading: 'The\nArchitect',
    body: 'Promoted again to L4 Manager-level IC. Leading V3 of the DaaS platform across AWS, BigQuery, dbt, Airflow, and Kubernetes. Building for scale, governance, and the engineers who depend on the platform every day.',
    accent: '#4facfe',
    photo: whiteboardImg,
    photoAlt: 'Tanner Huseman at a whiteboard',
    photoPosition: 'object-center',
  },
];

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Show everything statically
      document
        .querySelectorAll('.phase-animate')
        .forEach((el) => ((el as HTMLElement).style.opacity = '1'));
      return;
    }

    const triggers: ScrollTrigger[] = [];

    phases.forEach((phase) => {
      const el = document.getElementById(`phase-${phase.id}`);
      if (!el) return;

      const contentEls = el.querySelectorAll<HTMLElement>('.phase-animate');
      const photoEl = el.querySelector<HTMLElement>('.phase-photo-img');

      // Start content invisible
      gsap.set(contentEls, { opacity: 0, y: 36 });

      // Pin the phase for 600px of scroll distance
      const pin = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: '+=600',
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          gsap.to(contentEls, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          gsap.set(contentEls, { opacity: 0, y: 36 });
        },
      });
      triggers.push(pin);

      // Subtle parallax on the photo while pinned
      if (photoEl) {
        const parallax = ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: '+=600',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(photoEl, { y: self.progress * -60 });
          },
        });
        triggers.push(parallax);
      }
    });

    // Give layout time to settle (Lenis + Astro hydration)
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      {phases.map((phase) => (
        <div
          key={phase.id}
          id={`phase-${phase.id}`}
          className="relative flex items-center min-h-screen overflow-hidden"
          style={{ background: 'var(--color-bg)' }}
        >
          {/* Photo — right half, with gradient mask */}
          {phase.photo && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Photo panel */}
              <div className="absolute right-0 top-0 w-full md:w-[55%] h-full overflow-hidden">
                <img
                  src={phase.photo.src}
                  alt={phase.photoAlt ?? ''}
                  className={`phase-photo-img w-full h-full object-cover ${phase.photoPosition ?? 'object-center'}`}
                  style={{ willChange: 'transform' }}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Gradient: solid bg on left → transparent on right */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, var(--color-bg) 35%, var(--color-bg)/85% 55%, transparent 80%)',
                }}
              />

              {/* Subtle color tint from this phase's accent */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(ellipse at 80% 50%, ${phase.accent}, transparent 70%)`,
                }}
              />
            </div>
          )}

          {/* Left accent bar */}
          <div
            className="absolute left-0 top-0 h-full w-0.5 opacity-30"
            style={{ background: phase.accent }}
            aria-hidden="true"
          />

          {/* Text content */}
          <div className="relative z-10 px-8 md:px-16 max-w-xl py-24">
            {/* Phase label + period */}
            <p
              className="phase-animate font-mono text-xs tracking-widest uppercase mb-5"
              style={{ color: phase.accent }}
            >
              {phase.label}&ensp;·&ensp;{phase.period}
            </p>

            {/* Heading — newlines become visual breaks */}
            <h3 className="phase-animate font-display text-text mb-6 leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
            >
              {phase.heading.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h3>

            {/* Body */}
            <p className="phase-animate font-body text-muted text-lg leading-relaxed max-w-md">
              {phase.body}
            </p>

            {/* Accent rule */}
            <div
              className="phase-animate mt-10 h-px w-16 rounded-full opacity-60"
              style={{ background: phase.accent }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
