import { site, siteUrl } from "./site";

/** schema.org description of the tool, for search engines. Built only from constants. */
export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.fullName,
  alternateName: "pcskit",
  description: site.description,
  url: siteUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  softwareVersion: site.version,
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  downloadUrl: site.npm,
  codeRepository: site.repo,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: "KNIHAL", url: "https://github.com/KNIHAL" },
};

/** Serialises JSON-LD safely for an inline script (a "<" can never close the tag). */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
