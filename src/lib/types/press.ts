import type { Timestamp } from 'firebase/firestore';

/**
 * Press Coverage Item Type
 * Supports both articles and videos
 */
export interface PressItem {
  id?: string;
  type: 'article' | 'video';
  title: string;
  description: string;
  publishedDate: string; // YYYY-MM-DD or YYYY-MM format
  category: string; // Main categories or custom "Other" value
  tags: string[];
  isActive: boolean; // Show/hide toggle for frontend

  // Article-specific fields
  slug?: string; // Auto-generated URL-friendly identifier
  link?: string; // External article URL
  image?: string; // Article image URL

  // Video-specific fields
  youtubeUrl?: string; // Full YouTube URL
  youtubeId?: string; // Extracted ID (e.g., "dQw4w9WgXcQ")

  // Metadata
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  firestoreTimestamp?: Timestamp;
}

/**
 * Firestore-extended Press Item (includes required id)
 */
export interface FirestorePressItem extends PressItem {
  id: string;
}

/**
 * Category color mapping for press items
 */
export const categoryColors: Record<string, string> = {
  'Flood Relief': 'bg-orange-custom',
  'Religious Service': 'bg-navy',
  'Profile': 'bg-purple-600',
  'COVID Relief': 'bg-red-600',
  // Default for "Other" categories
  'default': 'bg-gray-600'
};

/**
 * Main press categories (for dropdown)
 */
export const mainCategories = [
  'Flood Relief',
  'Religious Service',
  'Profile',
  'COVID Relief'
];

/**
 * Helper function to generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .substring(0, 100); // Limit length
}

/**
 * Helper function to extract YouTube video ID from URL
 * Supports multiple YouTube URL formats
 */
export function extractYoutubeId(url: string): string | null {
  if (!url) return null;

  // Standard youtube.com/watch?v=VIDEO_ID
  const standardMatch = url.match(/(?:youtube\.com\/watch\?v=)([^&]+)/);
  if (standardMatch) return standardMatch[1];

  // Short youtu.be/VIDEO_ID
  const shortMatch = url.match(/(?:youtu\.be\/)([^?]+)/);
  if (shortMatch) return shortMatch[1];

  // Embed youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/(?:youtube\.com\/embed\/)([^?]+)/);
  if (embedMatch) return embedMatch[1];

  // Live youtube.com/live/VIDEO_ID
  const liveMatch = url.match(/(?:youtube\.com\/live\/)([^?]+)/);
  if (liveMatch) return liveMatch[1];

  return null;
}

/**
 * Get YouTube thumbnail URL
 */
export function getYoutubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Get YouTube embed URL
 */
export function getYoutubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

/**
 * Validate YouTube URL format
 */
export function isValidYoutubeUrl(url: string): boolean {
  return extractYoutubeId(url) !== null;
}
