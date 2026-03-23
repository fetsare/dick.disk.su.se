export function generateSlugFromName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    // Replace one or more whitespace characters with a single dash
    .replace(/\s+/g, '-')
    // Normalize accented characters (e.g. å, ä, ö) to their base form where possible
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remove any remaining characters that are not letters, numbers, or dashes
    .replace(/[^a-z0-9-]/g, '')
    // Collapse multiple dashes
    .replace(/-+/g, '-')
    // Trim leading/trailing dashes
    .replace(/^-+|-+$/g, '');
}
