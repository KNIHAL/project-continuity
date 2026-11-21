import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

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

export default function HomePage() {
  return (
    <section className="mk-hero">
      <div className="mk-container">
        <Reveal>
          <p className="mk-eyebrow">
            v{site.version} &middot; Local-first &middot; {site.license}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mk-h1">
            Your AI agent stopped. The next one picks up <em>exactly where it left off.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mk-lede">
            PCS is a local-first CLI and MCP server that hands work from one AI coding agent to the
            next. It rebuilds what actually happened from git and recorded evidence, and never takes
            an agent&rsquo;s &ldquo;done&rdquo; on trust.
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
          <p className="mk-cmd">
            <span className="mk-cmd__prompt" aria-hidden="true">
              $
            </span>
            <code>{site.installCommand}</code>
          </p>
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
    </section>
  );
}
