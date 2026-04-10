/**
 * SkillsCarousel — React island
 *
 * Apple-style horizontal scroll section. As the user scrolls vertically,
 * skill cards slide in horizontally (GSAP ScrollTrigger pin + horizontal tween).
 *
 * Desktop: pinned horizontal scroll
 * Mobile: vertical card stack
 *
 * TODO: Wire up GSAP ScrollTrigger pinning.
 *       The pin logic lives in src/lib/animations.ts — call initSkillsCarousel()
 *       from a useEffect here after the component mounts.
 */

import React from 'react';

const skills = [
  {
    category: 'Data Platform Architecture',
    icon: '◈',
    items: [
      'Data-as-a-Service platform design',
      'Data Mesh enablement',
      'Medallion / lakehouse architecture',
      'Data contracts & governance',
      'Schema evolution & SCD Type 2',
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    icon: '⬡',
    items: [
      'AWS (Lambda, EC2, S3, DynamoDB, IAM)',
      'GCP (BigQuery)',
      'Kubernetes (ArgoCD, Helm)',
      'Docker & containerization',
      'LocalStack for local dev',
    ],
  },
  {
    category: 'Transformation & Modeling',
    icon: '△',
    items: [
      'dbt Core & dbt Cloud',
      'Advanced SQL (window functions, CTEs)',
      'Delta Lake, Apache Hive',
      'Data quality testing',
      'dbt docs & lineage',
    ],
  },
  {
    category: 'Pipelines & Orchestration',
    icon: '⊙',
    items: [
      'Apache Airflow',
      'Python data pipelines',
      'Event-driven architectures',
      'Apache Ranger (access control)',
      'GitHub Actions CI/CD',
    ],
  },
  {
    category: 'Developer Tooling',
    icon: '⌘',
    items: [
      'Internal CLI tools & automation',
      'Policy as Code',
      'dbt test UI & reporting APIs',
      'OpenAPI / FastAPI services',
      'Infrastructure as Code (SAM/Terraform)',
    ],
  },
  {
    category: 'AI / ML Engineering',
    icon: '✦',
    items: [
      'Claude API & tool use',
      'LangChain / LangGraph agents',
      'Composable agent frameworks',
      'Prompt engineering',
      'AI-assisted development workflows',
    ],
  },
];

export default function SkillsCarousel() {
  return (
    <div
      id="skills-track"
      className="flex gap-6 md:flex-row flex-col"
    >
      {skills.map((skill) => (
        <div
          key={skill.category}
          className="flex-shrink-0 w-80 p-8 rounded-card border border-border bg-surface hover:border-accent/40 transition-colors duration-300"
          style={{ minWidth: '320px' }}
        >
          <div className="text-2xl mb-4 text-accent">{skill.icon}</div>
          <h3 className="font-display text-xl text-text mb-6">
            {skill.category}
          </h3>
          <ul className="space-y-3 list-none m-0 p-0">
            {skill.items.map((item) => (
              <li key={item} className="flex items-start gap-2 font-body text-sm text-muted">
                <span className="text-accent mt-0.5 flex-shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
