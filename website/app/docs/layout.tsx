import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import type { ReactNode } from "react";
import { Brand } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import "nextra-theme-docs/style.css";

export default async function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <Layout
      navbar={<Navbar logo={<Brand />} logoLink="/" projectLink={site.repo} />}
      pageMap={await getPageMap("/docs")}
      docsRepositoryBase={`${site.repo}/tree/main/website`}
      footer={
        <Footer>
          {site.license} &copy; {new Date().getFullYear()} KNIHAL. {site.tagline}
        </Footer>
      }
      editLink="Edit this page on GitHub"
      sidebar={{ defaultMenuCollapseLevel: 1 }}
    >
      {children}
    </Layout>
  );
}
