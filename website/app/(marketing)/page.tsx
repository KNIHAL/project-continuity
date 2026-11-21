import type { Metadata } from "next";
import Link from "next/link";
import { HandoffBrief } from "@/components/marketing/HandoffBrief";
import { InstallCommand } from "@/components/marketing/InstallCommand";
import {
  Clients,
  Cta,
  Demo,
  Evidence,
  Features,
  Flow,
  Integrity,
  Problem,
  Security,
} from "@/components/marketing/Sections";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";
import { jsonLdString, softwareJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: site.fullName },
  description: site.description,
  alternates: { canonical: "/" },
};

const levels = [
  { level: "verified", meaning: "PCS observed it itself" },
  { level: "reported", meaning: "A person or agent claimed it" },
  { level: "inferred", meaning: "Derived from other facts" },
] as const;

function Hero() {
  return (
    <section className="mk-hero" aria-labelledby="hero-title">
      <div className="mk-hero__glow" aria-hidden="true" />
      <div className="mk-container mk-hero__grid">
        <div>
          <Reveal>
            <p className="mk-eyebrow">
              v{site.version} &middot; Local-first &middot; {site.license}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 id="hero-title" className="mk-h1">
              Your AI agent stopped. The next one picks up <em>exactly where it left off.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mk-lede">
              PCS is a local-first CLI and MCP server that hands work from one AI coding agent to
              the next. It rebuilds what actually happened from git and recorded evidence, and never
              takes an agent&rsquo;s &ldquo;done&rdquo; on trust.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mk-actions">
              <Link href="/docs" className="mk-btn mk-btn--primary">
                Read the docs
              </Link>
              <a
                href={site.repo}
                className="mk-btn mk-btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <InstallCommand command={site.installCommand} />
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mk-legend" aria-label="Evidence levels">
              {levels.map((item) => (
                <li key={item.level} className="mk-chip" data-level={item.level}>
                  <span className="mk-chip__dot" aria-hidden="true" />
                  <span className="mk-chip__name">{item.level}</span>
                  <span className="mk-chip__meaning">{item.meaning}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="mk-hero__visual">
          <HandoffBrief />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(softwareJsonLd) }}
      />
      <Hero />
      <Problem />
      <Evidence />
      <Flow />
      <Demo />
      <Integrity />
      <Features />
      <Clients />
      <Security />
      <Cta />
    </>
  );
}
