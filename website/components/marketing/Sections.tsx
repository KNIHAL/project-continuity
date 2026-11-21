import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { demo } from "@/lib/media";
import { site } from "@/lib/site";
import { InstallCommand } from "./InstallCommand";
import { SpotlightCard } from "./SpotlightCard";
import { TamperDemo } from "./TamperDemo";
import { Terminal, type TerminalLine } from "./Terminal";

function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="sec" aria-labelledby={`${id}-title`}>
      <div className="mk-container">
        <Reveal>
          <header className="sec__head">
            <p className="mk-eyebrow">{eyebrow}</p>
            <h2 id={`${id}-title`} className="sec__title">
              {title}
            </h2>
            {lede ? <p className="sec__lede">{lede}</p> : null}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* Problem ---------------------------------------------------------------- */

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The problem"
      title={
        <>
          The summary you get is written by the agent that <em>just ran out of room.</em>
        </>
      }
      lede="That is exactly the part you cannot trust. It may say tests pass when they never ran, or forget the file it was halfway through editing."
    >
      <div className="versus">
        <Reveal className="versus__col">
          <article className="panel panel--muted">
            <h3 className="panel__title">What the agent wrote</h3>
            <p className="quote">
              &ldquo;All tests pass. The exporter is done. Only the docs are left.&rdquo;
            </p>
            <p className="panel__foot">Confident, unchecked, and gone with the session.</p>
          </article>
        </Reveal>
        <Reveal className="versus__col" delay={0.1}>
          <article className="panel panel--accent">
            <h3 className="panel__title">What PCS recorded</h3>
            <ul className="facts">
              <li>
                <span className="tag" data-level="reported">
                  reported by claude
                </span>
                <span>Exporter is done</span>
              </li>
              <li>
                <span className="tag" data-level="verified">
                  verified
                </span>
                <span>Last test run exited 1 (PCS ran it)</span>
              </li>
              <li>
                <span className="tag" data-level="verified">
                  verified
                </span>
                <span>src/cli/export.ts changed after that run</span>
              </li>
              <li>
                <span className="tag" data-level="inferred">
                  inferred
                </span>
                <span>Session was interrupted</span>
              </li>
            </ul>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}

/* Evidence model --------------------------------------------------------- */

const levels = [
  {
    level: "verified",
    meaning: "PCS observed it itself",
    example: "git state, file hashes, a test run PCS executed with its exit code",
  },
  {
    level: "reported",
    meaning: "A person or agent claimed it",
    example: "“task done”, “next step is X”",
  },
  {
    level: "inferred",
    meaning: "Derived from other facts",
    example: "“the session was interrupted”",
  },
] as const;

export function Evidence() {
  return (
    <Section
      id="evidence"
      eyebrow="The evidence model"
      title={
        <>
          Never trust an agent&rsquo;s &ldquo;done&rdquo;. <em>Keep the source of every fact.</em>
        </>
      }
      lede="PCS records each fact with where it came from, so the next agent knows which lines are solid."
    >
      <div className="grid grid--3">
        {levels.map((item, i) => (
          <Reveal key={item.level} delay={i * 0.08}>
            <SpotlightCard className="level">
              <span className="tag tag--lg" data-level={item.level}>
                {item.level}
              </span>
              <h3 className="card__title">{item.meaning}</h3>
              <p className="card__text">{item.example}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="rule">
          A task counts as <strong>verified</strong> only when a passing test run that PCS executed
          is linked to it, and only while the code still matches the state that run saw.
        </p>
      </Reveal>
    </Section>
  );
}

/* Handoff flow ----------------------------------------------------------- */

const stopped: TerminalLine[] = [
  { kind: "cmd", text: "pcs session start --agent claude" },
  { kind: "cmd", text: 'pcs note add task "Add the --json flag to the exporter"' },
  { kind: "cmd", text: "pcs test --task <task-id> -- npm test" },
  { kind: "dim", text: "PCS runs the command and records exit code, duration and output" },
  { kind: "cmd", text: 'pcs note add next "Wire the flag in src/cli/export.ts"' },
  { kind: "cmd", text: "pcs session end --reason limit" },
  { kind: "cmd", text: "pcs handoff" },
  { kind: "out", text: "wrote .pcs/HANDOFF.md" },
];

const pickedUp: TerminalLine[] = [
  { kind: "cmd", text: "pcs resume --agent cursor" },
  { kind: "dim", text: "handoff checked against the evidence log" },
  {
    kind: "out",
    text: "code unchanged since the handoff",
    tag: { level: "verified", label: "verified" },
  },
  {
    kind: "out",
    text: "Done: Add the --json flag to the exporter",
    tag: { level: "verified", label: "verified" },
  },
  {
    kind: "out",
    text: "Next: Wire the flag in src/cli/export.ts",
    tag: { level: "reported", label: "reported by claude" },
  },
];

const steps = [
  {
    title: "Work as usual",
    text: "Agents connect over MCP, or Claude Code hooks start and end sessions for you.",
  },
  {
    title: "PCS records evidence",
    text: "Sessions, snapshots from git, and test runs PCS executes itself, in a hash-chained log.",
  },
  {
    title: "The session ends",
    text: "Token limit, new chat or a switch of tools. PCS writes the handoff, or rebuilds it from the log if the agent died first.",
  },
  {
    title: "The next agent resumes",
    text: "Resume checks the handoff against the evidence, warns if the code moved, and prints a brief where every line carries its level.",
  },
];

export function Flow() {
  return (
    <Section
      id="how-it-works"
      eyebrow="A handoff, step by step"
      title={
        <>
          From a dead session to a <em>trusted brief</em> in one command.
        </>
      }
    >
      <ol className="steps">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.07}>
            <li className="step">
              <span className="step__n" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="card__title">{step.title}</h3>
              <p className="card__text">{step.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="terms">
        <Terminal title="Agent A: hits its limit" lines={stopped} />
        <Terminal
          title="Agent B: picks up, in any tool"
          lines={pickedUp}
          caption="Output abbreviated. With MCP connected, agents call pcs_resume and pcs_handoff themselves."
        />
      </div>
    </Section>
  );
}

/* Optional demo (hidden until a real recording exists) ------------------- */

export function Demo() {
  if (!demo.video) return null;
  return (
    <Section id="demo" eyebrow="See it in action" title="Watch a real handoff.">
      <Reveal>
        <video
          className="demo"
          src={demo.video}
          poster={demo.poster ?? undefined}
          controls
          preload="none"
          playsInline
        >
          <track kind="captions" />
        </video>
      </Reveal>
    </Section>
  );
}

/* Tamper-evident log ----------------------------------------------------- */

export function Integrity() {
  return (
    <Section
      id="integrity"
      eyebrow="Tamper-evident history"
      title={
        <>
          Try to rewrite the past. <em>PCS notices.</em>
        </>
      }
      lede="Events are stored in an append-only SHA-256 hash chain. pcs verify detects edits, deletions and reordering. A signed anchor kept outside the project also detects truncation and a full rewrite."
    >
      <Reveal>
        <TamperDemo />
      </Reveal>
    </Section>
  );
}

/* Features --------------------------------------------------------------- */

const features = [
  {
    title: "Handoffs you can trust",
    text: "Original task, completed work, work in progress, files touched, test results with the output of failing runs, open problems, next steps and do-not-touch notes.",
  },
  {
    title: "Audit export",
    text: "pcs export writes the log as JSON or Markdown that can be checked without PCS.",
  },
  {
    title: "Secrets stay out",
    text: "Redaction runs before anything is stored. Files flagged sensitive, such as keys and .env, are listed by name and never read.",
  },
  {
    title: "Works with your agents",
    text: "An MCP server for any MCP client, Claude Code hooks, and instruction blocks for CLAUDE.md, AGENTS.md and Cursor rules.",
  },
  {
    title: "Always on, if you want",
    text: "A background watcher snapshots the repo as files change and flags stalled sessions. pcs autostart starts it at login.",
  },
  {
    title: "Many repos",
    text: "pcs workspace lists all your projects. Each keeps its own log, so one repo never affects another.",
  },
  {
    title: "Read-only dashboard",
    text: "Sessions, tasks with their evidence, notes, test runs and the event timeline, served on 127.0.0.1 only.",
  },
  {
    title: "No network, no telemetry",
    text: "Everything lives in a git-excluded, owner-only .pcs folder inside your project.",
  },
];

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="What you get"
      title={
        <>
          Built like infrastructure, <em>runs like a utility.</em>
        </>
      }
    >
      <div className="grid grid--4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 4) * 0.06}>
            <SpotlightCard>
              <h3 className="card__title">{f.title}</h3>
              <p className="card__text">{f.text}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* Clients ---------------------------------------------------------------- */

const clients = [
  {
    name: "Claude Desktop",
    command: "pcs connect claude-desktop",
    note: "Quit the app fully and reopen it.",
  },
  {
    name: "Cursor",
    command: "pcs connect cursor",
    note: "Per project, or --global for all projects.",
  },
  {
    name: "Claude Code",
    command: "pcs connect claude-code",
    note: "Add pcs hooks install so sessions start and end by themselves.",
  },
];

export function Clients() {
  return (
    <Section
      id="clients"
      eyebrow="Works with your agents"
      title={
        <>
          One command per app. <em>--remove undoes it.</em>
        </>
      }
      lede="pcs connect writes the PCS MCP server into the app's config. It keeps your other servers and never overwrites a file it cannot parse."
    >
      <div className="grid grid--3">
        {clients.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08}>
            <SpotlightCard>
              <h3 className="card__title">{c.name}</h3>
              <p className="cmd-inline">
                <span aria-hidden="true">$ </span>
                <code>{c.command}</code>
              </p>
              <p className="card__text">{c.note}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="sec__more">
          <Link href="/docs/guides/connecting-agents">Full connection guide &rarr;</Link>
        </p>
      </Reveal>
    </Section>
  );
}

/* Security --------------------------------------------------------------- */

const security = [
  "Local only: no network access and no telemetry.",
  "Data lives in .pcs/ inside your project, git-excluded and owner-only (POSIX modes, Windows ACLs).",
  "Git runs read-only through a hardened adapter: no repo-defined commands, timeouts, validated hashes.",
  "Commands are argument arrays, never shell strings. pcs test can be limited to an allowlist.",
  "Untrusted text is sanitized before it reaches the terminal, markdown or the dashboard.",
  "Policy files can only tighten defaults. The global file is the trusted one.",
];

const limits = [
  "The hash chain proves changes only if you keep the anchor or an export somewhere else.",
  "Redaction is pattern based, so add your own rules for your secrets.",
  "Reported claims are labelled, not proven.",
];

export function Security() {
  return (
    <Section
      id="security"
      eyebrow="Security model"
      title={
        <>
          Built defensively, because it reads <em>text it does not trust.</em>
        </>
      }
      lede="Repositories and agent output are untrusted input. PCS treats them that way."
    >
      <div className="split">
        <Reveal>
          <ul className="checks">
            {security.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <aside className="panel panel--note">
            <h3 className="panel__title">Honest limits</h3>
            <ul className="limits">
              {limits.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="panel__foot">
              <a
                href={`${site.repo}/blob/main/docs/DECISIONS.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the reasoning &rarr;
              </a>
            </p>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}

/* Final call to action --------------------------------------------------- */

export function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="mk-container">
        <Reveal>
          <div className="cta__box">
            <h2 id="cta-title" className="sec__title">
              The next agent should never start from zero.
            </h2>
            <p className="sec__lede">
              Install PCS, run pcs init in your repo, and connect an agent.
            </p>
            <InstallCommand command={site.installCommand} />
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
                Star on GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
