import React, { useEffect } from 'react';
import { initSkillsCarousel } from '../lib/animations';

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
  useEffect(() => {
    // Small delay ensures GSAP/Lenis from BaseLayout is initialized
    // and the DOM has fully painted before we measure scrollWidth
    const timer = setTimeout(() => {
      initSkillsCarousel('#skills-section', '#skills-track');
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="skills-track"
      className="flex gap-6 flex-col md:flex-row"
      style={{ willChange: 'transform' }}
    >
      {skills.map((skill) => (
        <div
          key={skill.category}
          className="flex-shrink-0 w-full md:w-80 p-8 rounded-card border border-border bg-surface hover:border-accent/40 transition-colors duration-300"
        >
          <div className="text-2xl mb-4 text-accent">{skill.icon}</div>
          <h3 className="font-display text-xl text-text mb-6">
            {skill.category}
          </h3>
          <ul className="space-y-3 list-none m-0 p-0">
            {skill.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 font-body text-sm text-muted"
              >
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
