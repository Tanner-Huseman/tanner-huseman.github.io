import React, { useState, useRef, useEffect } from 'react';
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
  photo: { src: string };
  photoAlt: string;
  photoPosition: string;
}

const phases: Phase[] = [
  {
    id: 'stage',
    label: '01 — Stage',
    period: '2014 – 2020',
    heading: 'The Performer',
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
    heading: 'The Closer',
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
    heading: 'The Builder',
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
    heading: 'The Architect',
    body: 'Promoted again to L4 Manager-level IC. Leading V3 of the DaaS platform across AWS, BigQuery, dbt, Airflow, and Kubernetes. Building for scale, governance, and the engineers who depend on the platform every day.',
    accent: '#4facfe',
    photo: whiteboardImg,
    photoAlt: 'Tanner Huseman at a whiteboard',
    photoPosition: 'object-center',
  },
];

export default function StoryTimeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const hasHover = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hasHover.current = window.matchMedia('(hover: hover)').matches;
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set('.timeline-item', { opacity: 1, y: 0 });
      gsap.set('.timeline-line', { scaleY: 1 });
      return;
    }

    const items = gsap.utils.toArray<HTMLElement>('.timeline-item');
    const triggers: ScrollTrigger[] = [];

    // Animate the vertical line growing downward
    const lineTween = gsap.from('.timeline-line', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.timeline-line',
        start: 'top 85%',
      },
    });
    if (lineTween.scrollTrigger) triggers.push(lineTween.scrollTrigger);

    // Stagger-reveal each timeline item
    items.forEach((item) => {
      const tween = gsap.from(item, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleClick = (id: string) => {
    if (!hasHover.current) {
      setExpandedId((prev) => (prev === id ? null : id));
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical timeline line */}
      <div
        className="timeline-line absolute left-[7px] md:left-[15px] top-0 bottom-0 w-px"
        style={{ background: 'var(--color-border)' }}
      />

      {/* Timeline items */}
      {phases.map((phase, i) => {
        const isHovered = hoveredId === phase.id;
        const isExpanded = expandedId === phase.id;
        const isLast = i === phases.length - 1;

        return (
          <div
            key={phase.id}
            className={`timeline-item relative pl-8 md:pl-12 ${isLast ? '' : 'pb-8 md:pb-12'}`}
          >
            {/* Timeline dot */}
            <div
              className="absolute left-0 md:left-[8px] top-[10px] w-[15px] h-[15px] rounded-full border-2 -translate-x-1/2 transition-all duration-300 z-10"
              style={{
                borderColor: phase.accent,
                backgroundColor: isHovered || isExpanded ? phase.accent : 'var(--color-bg)',
                boxShadow: isHovered || isExpanded ? `0 0 16px ${phase.accent}50` : 'none',
              }}
            />

            {/* Card */}
            <div
              className="group relative rounded-[14px] border overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                borderColor: isHovered || isExpanded
                  ? `${phase.accent}66`
                  : 'var(--color-border)',
                background: 'var(--color-surface)',
                boxShadow: isHovered ? `0 0 40px ${phase.accent}12` : 'none',
              }}
              onMouseEnter={() => {
                if (hasHover.current) setHoveredId(phase.id);
              }}
              onMouseLeave={() => {
                if (hasHover.current) setHoveredId(null);
              }}
              onClick={() => handleClick(phase.id)}
            >
              {/* Photo wash — desktop hover */}
              <div
                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                style={{ opacity: isHovered ? 0.12 : 0 }}
              >
                <img
                  src={phase.photo.src}
                  alt=""
                  aria-hidden="true"
                  className={`w-full h-full object-cover ${phase.photoPosition}`}
                  loading="eager"
                />
              </div>

              {/* Mobile expanded photo strip */}
              {isExpanded && !hasHover.current && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={phase.photo.src}
                    alt={phase.photoAlt}
                    className={`w-full h-full object-cover ${phase.photoPosition}`}
                    style={{ filter: 'saturate(0.7) brightness(0.6)' }}
                  />
                </div>
              )}

              {/* Card content */}
              <div className="relative z-10 p-5 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p
                      className="font-mono text-xs tracking-widest uppercase mb-2"
                      style={{ color: phase.accent }}
                    >
                      {phase.label}&ensp;&middot;&ensp;{phase.period}
                    </p>

                    <h3
                      className="font-display text-xl md:text-2xl mb-3 transition-colors duration-300"
                      style={{ color: isHovered || isExpanded ? phase.accent : 'var(--color-text)' }}
                    >
                      {phase.heading}
                    </h3>

                    <p
                      className="font-body text-sm md:text-base leading-relaxed max-w-xl"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {phase.body}
                    </p>
                  </div>

                  {/* Mobile expand indicator */}
                  <div className="md:hidden flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        color: 'var(--color-muted)',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom accent bar — scales in on hover/expand */}
              <div
                className="absolute bottom-0 left-0 w-full h-[2px] transition-transform duration-500"
                style={{
                  background: phase.accent,
                  transform: isHovered || isExpanded ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
