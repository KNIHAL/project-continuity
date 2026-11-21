"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand/Logo";
import { site } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="mk-header" data-scrolled={scrolled}>
      <div className="mk-container mk-header__inner">
        <Link href="/" className="mk-brand" aria-label="PCS, home">
          <Brand />
        </Link>
        <nav aria-label="Primary" className="mk-nav">
          <Link href="/docs" className="mk-nav__link">
            Docs
          </Link>
          <a
            href={site.npm}
            className="mk-nav__link mk-nav__link--hide-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </a>
          <a
            href={site.repo}
            className="mk-btn mk-btn--ghost mk-btn--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
