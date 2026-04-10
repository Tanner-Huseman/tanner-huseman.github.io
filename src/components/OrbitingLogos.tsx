/**
 * OrbitingLogos — React island (Three.js / React Three Fiber)
 *
 * Tanner's headshot centered in a Three.js canvas, with tech stack logos
 * orbiting in 3D around it. Responds to cursor movement.
 *
 * Desktop: full 3D Three.js scene
 * Mobile: gracefully degrades to a static 2D logo grid
 *
 * TODO: Replace the placeholder grid with the actual R3F scene.
 *       Logo assets go in src/assets/logos/ as SVG or PNG sprites.
 *       Headshot goes in src/assets/images/headshot.jpg.
 */

import React from 'react';
import headshotImg from '../assets/images/headshot.jpeg';

const logos = [
  { name: 'AWS', color: '#FF9900' },
  { name: 'dbt', color: '#FF694A' },
  { name: 'Kubernetes', color: '#326CE5' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Airflow', color: '#017CEE' },
  { name: 'Python', color: '#3776AB' },
  { name: 'BigQuery', color: '#4285F4' },
  { name: 'Snowflake', color: '#29B5E8' },
  { name: 'SQL', color: '#00d2a0' },
];

export default function OrbitingLogos() {
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="grid grid-cols-3 gap-4 py-12">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex flex-col items-center gap-2 p-4 rounded-card border border-border"
          >
            <div
              className="w-8 h-8 rounded-full"
              style={{ background: logo.color }}
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-muted">{logo.name}</span>
          </div>
        ))}
      </div>
    );
  }

  // TODO: Replace with React Three Fiber scene
  // The R3F scene should:
  //   1. Load headshot.jpg as a circular sprite at center
  //   2. Load each logo SVG as a sprite
  //   3. Orbit logos on elliptical paths at different speeds/radii
  //   4. Apply subtle rim light to the headshot sphere
  //   5. Respond to mouse movement (tilt the orbit plane)
  //   6. Use useFrame for animation loop
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: 500 }}
      aria-label="Tech stack orbit visualization — coming soon"
    >
      {/* Placeholder until R3F scene is built */}
      <div className="relative w-40 h-40 rounded-full border-2 border-accent/30 flex items-center justify-center"
        style={{ boxShadow: '0 0 40px rgba(108,92,231,0.25)' }}>
        <img
          src={headshotImg.src}
          alt="Tanner Huseman"
          className="w-36 h-36 rounded-full object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Orbit ring (CSS, will be replaced by Three.js) */}
      {logos.map((logo, i) => {
        const angle = (i / logos.length) * 2 * Math.PI;
        const radius = 200;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.4; // flatten to ellipse
        return (
          <div
            key={logo.name}
            className="absolute flex items-center justify-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <span
              className="font-mono text-xs px-2 py-1 rounded border"
              style={{
                color: logo.color,
                borderColor: `${logo.color}44`,
                background: `${logo.color}11`,
              }}
            >
              {logo.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
