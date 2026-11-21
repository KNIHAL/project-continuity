"use client";

import type { PointerEvent, ReactNode } from "react";

/** A card with a soft highlight that follows the pointer. Purely visual: no state, no re-render. */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div className={`card ${className}`.trim()} onPointerMove={onPointerMove}>
      {children}
    </div>
  );
}
