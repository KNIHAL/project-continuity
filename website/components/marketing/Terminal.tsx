"use client";

import { m } from "motion/react";

export type TerminalLine = {
  kind: "cmd" | "out" | "dim";
  text: string;
  /** Optional evidence tag rendered at the end of the line. */
  tag?: { level: "verified" | "reported" | "inferred"; label: string };
};

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
};

const line = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
};

export function Terminal({
  title,
  lines,
  caption,
}: {
  title: string;
  lines: TerminalLine[];
  caption?: string;
}) {
  return (
    <figure className="term">
      <div className="term__bar">
        <span className="brief__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term__title">{title}</span>
      </div>
      <m.div
        className="term__body"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      >
        {lines.map((l, i) => (
          <m.div
            // Lines are static and never reorder, so the index is a stable key here.
            key={i}
            variants={line}
            className="term__line"
            data-kind={l.kind}
          >
            {l.kind === "cmd" ? (
              <span className="term__prompt" aria-hidden="true">
                ${" "}
              </span>
            ) : null}
            <span className="term__text">{l.text}</span>
            {l.tag ? (
              <span className="tag tag--inline" data-level={l.tag.level}>
                {l.tag.label}
              </span>
            ) : null}
          </m.div>
        ))}
      </m.div>
      {caption ? <figcaption className="term__caption">{caption}</figcaption> : null}
    </figure>
  );
}
