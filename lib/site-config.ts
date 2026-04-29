export const siteConfig = {
  title: "Alzheimer's Disease: Understanding the Causes",
  description:
    "A cinematic, evidence-based scrollytelling presentation on the causes of Alzheimer's disease — from amyloid plaques to environmental toxins.",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};

export function resolveRoute(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const { basePath } = siteConfig;
  if (!basePath) return normalized;
  if (normalized === "/") return basePath;
  if (normalized.startsWith(basePath)) return normalized;
  return `${basePath}${normalized}`;
}
