"use client";

import { useEffect, useRef, useState } from "react";

export function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied (insecure context, permissions). The command stays selectable.
    }
  }

  return (
    <div className="mk-cmd">
      <span className="mk-cmd__prompt" aria-hidden="true">
        $
      </span>
      <code>{command}</code>
      <button type="button" className="mk-cmd__copy" onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="mk-sr" role="status">
        {copied ? "Install command copied to clipboard" : ""}
      </span>
    </div>
  );
}
