/**
 * orbit3d.ts — 3D orbit animation engine
 *
 * Positions logo elements along tilted elliptical orbits using
 * requestAnimationFrame. Logos pass in front of and behind the
 * headshot with depth-driven z-index, opacity, and scale.
 *
 * Only touches transform, opacity, and zIndex — all compositor-
 * friendly properties, zero layout thrashing.
 */

interface OrbitRing {
  radius: number;
  tilt: number;       // radians — tilt angle from vertical
  speed: number;      // radians per second
  logos: { baseAngle: number; element: HTMLElement }[];
}

interface OrbitConfig {
  rings: OrbitRing[];
  headshot: HTMLElement;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Compute and apply one frame of positions for all logos.
 * Exported so reduced-motion can call it once at t=0.
 */
export function applyPositions(rings: OrbitRing[], elapsed: number): void {
  for (const ring of rings) {
    for (const logo of ring.logos) {
      const angle = logo.baseAngle + elapsed * ring.speed;

      const x = ring.radius * Math.cos(angle);
      const y = ring.radius * Math.sin(angle) * Math.sin(ring.tilt);
      const z = ring.radius * Math.sin(angle) * Math.cos(ring.tilt);

      // zNorm: 0 = fully behind, 1 = fully in front
      const zNorm = (z / ring.radius + 1) / 2;
      const opacity = lerp(0.3, 1.0, zNorm);
      const scale = lerp(0.5, 1.35, zNorm);

      const el = logo.element;
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.zIndex = z > 0 ? '15' : '5';
    }
  }
}

/**
 * Create and return start/stop controls for the orbit animation.
 */
export function createOrbitAnimation(config: OrbitConfig) {
  let rafId: number | null = null;
  let startTime: number | null = null;

  function tick(now: number) {
    if (startTime === null) startTime = now;
    const elapsed = (now - startTime) / 1000;

    applyPositions(config.rings, elapsed);
    rafId = requestAnimationFrame(tick);
  }

  return {
    start() {
      if (rafId !== null) return; // already running
      rafId = requestAnimationFrame(tick);
    },
    stop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        startTime = null;
      }
    },
  };
}

/**
 * Build the ring configuration from DOM elements.
 *
 * Expects logo elements with:
 *   data-ring="inner|middle|outer"
 *   data-index="0|1|2"
 *
 * Ring parameters:
 *   Inner:  r=130px, tilt=45°, period=10s
 *   Middle: r=195px, tilt=70°, period=16s
 *   Outer:  r=260px, tilt=88°, period=24s
 */
export function buildRingsFromDOM(container: HTMLElement): OrbitRing[] {
  const DEG = Math.PI / 180;
  const TAU = Math.PI * 2;

  const ringDefs = {
    inner:  { radius: 130, tilt: 45 * DEG, period: 10 },
    middle: { radius: 195, tilt: 70 * DEG, period: 16 },
    outer:  { radius: 260, tilt: 88 * DEG, period: 24 },
  };

  const rings: OrbitRing[] = [];

  for (const [name, def] of Object.entries(ringDefs)) {
    const elements = container.querySelectorAll<HTMLElement>(`[data-ring="${name}"]`);
    if (elements.length === 0) continue;

    const logos = Array.from(elements).map((el, i) => ({
      baseAngle: (i / elements.length) * TAU,
      element: el,
    }));

    rings.push({
      radius: def.radius,
      tilt: def.tilt,
      speed: TAU / def.period, // radians per second
      logos,
    });
  }

  return rings;
}
