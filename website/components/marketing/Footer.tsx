import Link from "next/link";
import { Brand } from "@/components/brand/Logo";
import { site } from "@/lib/site";

const projectLinks = [
  { label: "Source code", href: site.repo },
  { label: "npm package", href: site.npm },
  { label: "Changelog", href: `${site.repo}/blob/main/CHANGELOG.md` },
  { label: "Releases", href: `${site.repo}/releases` },
];

const communityLinks = [
  { label: "Report a bug", href: `${site.repo}/issues/new/choose` },
  { label: "Contributing", href: `${site.repo}/blob/main/CONTRIBUTING.md` },
  { label: "Security policy", href: `${site.repo}/blob/main/SECURITY.md` },
  { label: "Code of conduct", href: `${site.repo}/blob/main/CODE_OF_CONDUCT.md` },
];

function ExternalList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="mk-footer__list">
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="mk-footer">
      <div className="mk-container mk-footer__grid">
        <div className="mk-footer__about">
          <Brand />
          <p>{site.tagline}</p>
        </div>
        <nav aria-label="Documentation">
          <h2 className="mk-footer__title">Documentation</h2>
          <ul className="mk-footer__list">
            <li>
              <Link href="/docs">Introduction</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Project">
          <h2 className="mk-footer__title">Project</h2>
          <ExternalList links={projectLinks} />
        </nav>
        <nav aria-label="Community">
          <h2 className="mk-footer__title">Community</h2>
          <ExternalList links={communityLinks} />
        </nav>
      </div>
      <div className="mk-container mk-footer__legal">
        <span>
          {site.license} licensed. Local-first: no network access, no telemetry in the tool.
        </span>
        <span>&copy; {new Date().getFullYear()} KNIHAL</span>
      </div>
    </footer>
  );
}
