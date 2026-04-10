/**
 * StoryTimeline — React island
 *
 * Scroll-triggered career timeline morphing through four phases:
 *   Stage → Real Estate → Code → Data Architecture
 *
 * Each phase:
 *   - Pins while active
 *   - Shows a large background photo (parallax)
 *   - Animates in a headline, date range, and description
 *   - Transitions to the next phase on scroll
 *
 * The OrbitingLogos scene lives in a separate island below this section.
 *
 * TODO: Implement with GSAP ScrollTrigger pinning + R3F for the orbit scene.
 *       Phases data is defined below — just needs the animation layer.
 */

import React from 'react';

const phases = [
  {
    id: 'stage',
    label: '01 — Stage',
    period: '2014 – 2020',
    heading: 'The Performer',
    body: 'Metropolitan Opera. The Phantom of the Opera on Broadway. Limón Dance Company. Six years performing at the highest level taught me what precision, collaboration under pressure, and public communication actually look like.',
    accent: '#6c5ce7',
    // photo: import('@assets/images/met-opera-1.jpg') — add when photos are ready
  },
  {
    id: 'realestate',
    label: '02 — Real Estate',
    period: '2020 – 2021',
    heading: 'The Closer',
    body: 'Licensed PA realtor at RE/MAX Main Line. Sold 10 homes in ~6 months. Cold-started a pipeline from zero, learned to move fast with imperfect information, and discovered I was good at figuring out complex systems quickly.',
    accent: '#f5a623',
  },
  {
    id: 'engineer',
    label: '03 — Engineer',
    period: '2021 – 2023',
    heading: 'The Builder',
    body: 'Joined Macquarie as L2. Earned MS Computer Science at Merrimack while working full-time. Promoted to L3 within 18 months. Built production data pipelines, tooling, and the foundations of a Data-as-a-Service platform.',
    accent: '#00d2a0',
  },
  {
    id: 'architect',
    label: '04 — Data Platform',
    period: '2023 – Present',
    heading: 'The Architect',
    body: 'Promoted again to L4 Manager-level IC. Leading V3 of the DaaS platform across AWS, BigQuery, dbt, Airflow, and Kubernetes. Building for scale, governance, and the engineers who depend on the platform every day.',
    accent: '#4facfe',
  },
];

export default function StoryTimeline() {
  return (
    <div className="relative">
      {/* TODO: Replace with GSAP ScrollTrigger pinned timeline */}
      {phases.map((phase) => (
        <div
          key={phase.id}
          className="min-h-screen flex items-center px-6 md:px-16 py-32"
          style={{ borderLeft: `2px solid ${phase.accent}33` }}
        >
          <div className="max-w-2xl">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: phase.accent }}
            >
              {phase.label} &nbsp;·&nbsp; {phase.period}
            </p>
            <h3 className="font-display text-5xl md:text-6xl text-text mb-6">
              {phase.heading}
            </h3>
            <p className="font-body text-lg text-muted leading-relaxed">
              {phase.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
