export const DEFAULT_TOUR_SLUG = "eid-tropical-getaway";

export function toTourSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildTourDetailHref(title?: string, fallbackSlug = DEFAULT_TOUR_SLUG): string {
  if (!title) {
    return `/tour-detail/${fallbackSlug}`;
  }

  const slug = toTourSlug(title);
  return `/tour-detail/${slug || fallbackSlug}`;
}
