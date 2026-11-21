"use client";

import { m } from "motion/react";
import { useEffect, useState } from "react";

type Provenance = "verified" | "reported";
type Ev = { type: string; provenance: Provenance; payload: string };

const EVENTS: Ev[] = [
  { type: "session.started", provenance: "verified", payload: "agent: claude" },
  { type: "task.added", provenance: "reported", payload: "Add the --json flag" },
  { type: "test.run", provenance: "verified", payload: "npm test, exit 1" },
  { type: "note.added", provenance: "reported", payload: "next: fix the failing test" },
  { type: "session.ended", provenance: "verified", payload: "reason: limit" },
];

const TAMPER_INDEX = 2;
const TAMPERED_PAYLOAD = "npm test, exit 0";
const GENESIS = "0".repeat(64);

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Simplified from PCS: hash = sha256(JSON.stringify([prev_hash, type, provenance, payload])).
function material(prev: string, e: Ev): string {
  return JSON.stringify([prev, e.type, e.provenance, e.payload]);
}

type Result = { stored: string[]; recomputed: string[] };

async function compute(shown: Ev[]): Promise<Result> {
  const stored: string[] = [];
  let prev = GENESIS;
  for (const e of EVENTS) {
    const h = await sha256(material(prev, e));
    stored.push(h);
    prev = h;
  }
  const recomputed: string[] = [];
  for (const [i, e] of shown.entries()) {
    recomputed.push(await sha256(material(stored[i - 1] ?? GENESIS, e)));
  }
  return { stored, recomputed };
}

const short = (hash: string) => `${hash.slice(0, 8)}…`;

export function TamperDemo() {
  const [tampered, setTampered] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [unsupported, setUnsupported] = useState(false);

  const shown = EVENTS.map((e, i) =>
    tampered && i === TAMPER_INDEX ? { ...e, payload: TAMPERED_PAYLOAD } : e,
  );

  useEffect(() => {
    let cancelled = false;
    const run = tampered
      ? EVENTS.map((e, i) => (i === TAMPER_INDEX ? { ...e, payload: TAMPERED_PAYLOAD } : e))
      : EVENTS;
    compute(run)
      .then((r) => {
        if (!cancelled) setResult(r);
      })
      .catch(() => {
        if (!cancelled) setUnsupported(true);
      });
    return () => {
      cancelled = true;
    };
  }, [tampered]);

  const badIndex = result ? result.recomputed.findIndex((h, i) => h !== result.stored[i]) : -1;
  const intact = badIndex === -1;

  return (
    <div className="tamper">
      <div className="tamper__controls">
        <button
          type="button"
          className="mk-btn mk-btn--ghost mk-btn--sm"
          aria-pressed={tampered}
          onClick={() => setTampered((v) => !v)}
        >
          {tampered ? "Restore event 3" : "Rewrite event 3: make the failing test pass"}
        </button>
        <span className="tamper__hint">Real SHA-256, computed in your browser.</span>
      </div>

      <ol className="chain" aria-label="Hash-chained event log">
        {shown.map((e, i) => {
          const bad = !intact && i === badIndex;
          return (
            <m.li
              key={e.type}
              className="block"
              data-state={bad ? "bad" : "ok"}
              animate={bad ? { x: [0, -5, 5, -3, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="block__id">#{i + 1}</span>
              <span className="block__type">{e.type}</span>
              <span className="block__payload">{e.payload}</span>
              <span className="tag tag--inline" data-level={e.provenance}>
                {e.provenance}
              </span>
              <span className="block__hash">
                hash {result ? short(result.stored[i] ?? "") : "········"}
              </span>
              {bad && result ? (
                <span className="block__now">now {short(result.recomputed[i] ?? "")}</span>
              ) : null}
            </m.li>
          );
        })}
      </ol>

      <div className="term term--result" aria-live="polite">
        <div className="term__body">
          <div className="term__line" data-kind="cmd">
            <span className="term__prompt" aria-hidden="true">
              ${" "}
            </span>
            <span className="term__text">pcs verify</span>
          </div>
          {unsupported ? (
            <div className="term__line" data-kind="dim">
              <span className="term__text">
                This demo needs the Web Crypto API (a secure context).
              </span>
            </div>
          ) : intact ? (
            <div className="term__line" data-kind="out">
              <span className="term__text">log intact: {EVENTS.length} events, chain verified</span>
              <span className="tag tag--inline" data-level="verified">
                exit 0
              </span>
            </div>
          ) : (
            <div className="term__line" data-kind="out">
              <span className="term__text">
                integrity failure: event {badIndex + 1} does not match its recorded hash
              </span>
              <span className="tag tag--inline" data-level="danger">
                exit 2
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
