import nextra from "nextra";

const withNextra = nextra({
  // Docs live in website/content and are served under /docs, so "/" stays a custom landing page.
  contentDirBasePath: "/docs",
  defaultShowCopyCode: true,
});

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

export default withNextra({
  reactStrictMode: true,
  poweredByHeader: false,
  // website/ is its own package inside the pcskit repo; do not infer the repo root as the workspace.
  turbopack: { root: import.meta.dirname },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
});
