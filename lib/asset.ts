/**
 * Prefix a public asset path with the deployment basePath.
 *
 * GitHub Pages serves project sites from `/<repo>`, so `next.config.ts` sets
 * `basePath`. Next rewrites its own `/_next/*` URLs automatically, but with
 * `images.unoptimized` the `src` we hand to next/image is emitted verbatim —
 * which 404s once the site is under a sub-path. Verified against the export:
 * the `/_next/static/*` URLs were prefixed while `/assets/*` were not.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE}${path}`;
}
