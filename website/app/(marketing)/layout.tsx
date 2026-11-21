import type { ReactNode } from "react";
import { Footer } from "@/components/marketing/Footer";
import { Header } from "@/components/marketing/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./marketing.css";
import "./landing.css";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mk">
      <a className="mk-skip" href="#main">
        Skip to content
      </a>
      <MotionProvider>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </MotionProvider>
    </div>
  );
}
