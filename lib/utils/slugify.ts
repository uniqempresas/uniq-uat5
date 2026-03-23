// lib/utils/slugify.ts

/**
 * Convert a string to a URL-friendly slug
 * @param text - Text to slugify
 * @returns Slugified string
 * 
 * @example
 * slugify("Tech Solutions Ltda") // returns "tech-solutions-ltda"
 * slugify("Beleza & Estilo") // returns "beleza-estilo"
 * slugify("Maria's Café") // returns "marias-cafe"
 */
export function slugify(text: string): string {
  if (!text) return '';

  // Convert to lowercase
  let slug = text.toLowerCase();

  // Replace special characters with their Latin equivalents
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Replace spaces and special chars with hyphens
  slug = slug.replace(/[^\w\s-]/g, '');

  // Replace multiple spaces with single hyphen
  slug = slug.replace(/\s+/g, '-');

  // Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  // Replace multiple hyphens with single hyphen
  slug = slug.replace(/-+/g, '-');

  return slug;
}

/**
 * Generate a unique slug from a name
 * @param name - Base name
 * @param existingSlugs - Array of existing slugs to check for uniqueness
 * @param suffix - Optional suffix to add
 * @returns Unique slug
 */
export function generateUniqueSlug(
  name: string,
  existingSlugs: string[] = [],
  suffix?: string
): string {
  let baseSlug = slugify(name);
  
  if (suffix) {
    baseSlug = `${baseSlug}-${suffix}`;
  }

  // If slug doesn't exist, return it
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  // Find a unique suffix
  let counter = 1;
  let newSlug = `${baseSlug}-${counter}`;
  
  while (existingSlugs.includes(newSlug)) {
    counter++;
    newSlug = `${baseSlug}-${counter}`;
  }

  return newSlug;
}

/**
 * Extract slug from URL path
 * @param path - URL path
 * @returns Extracted slug
 */
export function extractSlugFromPath(path: string): string {
  // Remove leading/trailing slashes
  const cleanPath = path.replace(/^\/|\/$/g, '');
  
  // Get the last segment
  const segments = cleanPath.split('/');
  return segments[segments.length - 1] || '';
}

/**
 * Validate if a string is a valid slug
 * @param slug - String to validate
 * @returns True if valid slug
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  
  // Slug should only contain lowercase letters, numbers, and hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}
