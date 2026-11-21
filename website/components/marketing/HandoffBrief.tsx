"use client";

import { m } from "motion/react";

type Level = "verified" | "reported" | "inferred";

type Row = { level: Level; tag: string; text: string; note?: string };
type Group = { title: string; rows: Row[] };

const groups: Group[] = [
  {
    title: "Completed",
    rows: [
      {
        level: "verified",
        tag: "verified",
        text: "Add the --json flag to the exporter",
        note: "passing run #14 (npm test, exit 0), code unchanged since",
      },
      {
        level: "reported",
        tag: "reported by claude",
        text: "Update the export docs",
        note: "no test run linked",
      },
    ],
  },
  {
    title: "Open problems",
    rows: [
      {
        level: "inferred",
        tag: "inferred",
        text: "Session ended without a handoff",
        note: "interrupted at the token limit",
      },
    ],
  },
  {
    title: "Next",
    rows: [
      {
        level: "reported",
        tag: "reported by claude",
        text: "Wire the flag in src/cli/export.ts, then update the tests",
      },
    ],
  },
  {
    title: "Do not touch",
    rows: [
      {
        level: "verified",
        tag: "verified",
        text: ".env",
        note: "flagged sensitive: listed by name, never read",
      },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.55 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

/** An illustrative handoff brief. Every line carries its evidence level, exactly the idea PCS sells. */
export function HandoffBrief() {
  return (
    <figure className="brief" aria-label="Example handoff brief">
      <div className="brief__bar">
        <span className="brief__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="brief__file">.pcs/HANDOFF.md</span>
        <span className="brief__badge">example</span>
      </div>
      <m.div className="brief__body" variants={list} initial="hidden" animate="show">
        {groups.map((group) => (
          <section key={group.title} className="brief__group">
            <m.h3 variants={item} className="brief__title">
              {group.title}
            </m.h3>
            <ul className="brief__rows">
              {group.rows.map((row) => (
                <m.li key={row.text} variants={item} className="brief__row">
                  <span className="tag" data-level={row.level}>
                    {row.tag}
                  </span>
                  <span className="brief__text">
                    {row.text}
                    {row.note ? <span className="brief__note">{row.note}</span> : null}
                  </span>
                </m.li>
              ))}
            </ul>
          </section>
        ))}
      </m.div>
    </figure>
  );
}
