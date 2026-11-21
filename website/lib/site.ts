const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Canonical origin of the site. Set NEXT_PUBLIC_SITE_URL once a custom domain exists. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (productionHost ? `https://${productionHost}` : "http://localhost:3000")
).replace(/\/$/, "");

export const site = {
  name: "PCS",
  fullName: "PCS: Project Continuity System",
  tagline: "Your AI agent stopped. The next one picks up exactly where it left off.",
  description:
    "PCS is a local-first CLI and MCP server that hands work from one AI coding agent to the next, with every fact labelled verified, reported or inferred.",
  version: "0.1.0",
  license: "Apache-2.0",
  packageName: "@knihal/pcskit",
  installCommand: "npm install -g @knihal/pcskit",
  repo: "https://github.com/KNIHAL/pcskit",
  npm: "https://www.npmjs.com/package/@knihal/pcskit",
} as const;
