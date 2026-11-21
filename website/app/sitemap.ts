import type { MetadataRoute } from "next";
import type { PageMapItem } from "nextra";
import { getPageMap } from "nextra/page-map";
import { siteUrl } from "@/lib/site";

/** Collects the route of every docs page (folders only recurse; a folder is not a page). */
function collectRoutes(items: readonly PageMapItem[]): string[] {
  const routes: string[] = [];
  for (const item of items) {
    if ("children" in item) routes.push(...collectRoutes(item.children));
    else if ("route" in item && typeof item.route === "string") routes.push(item.route);
  }
  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docsRoutes = collectRoutes(await getPageMap("/docs"));
  const routes = Array.from(new Set(["/", ...docsRoutes]));
  return routes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    changeFrequency: route === "/" ? "monthly" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
