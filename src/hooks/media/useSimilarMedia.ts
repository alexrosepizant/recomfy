import { useMemo } from 'react';
import { Media } from '../../types/media';

interface SimilarityScore {
  media: Media;
  score: number;
}

export function useSimilarMedia(currentMedia: Media, availableMedia: Media[]) {
  const similarMedia = useMemo(() => {
    // Calculate similarity scores for each media item
    const scoredMedia: SimilarityScore[] = availableMedia
      .filter(media => media.id !== currentMedia.id)
      .map(media => ({
        media,
        score: calculateSimilarityScore(currentMedia, media)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Get top 6 most similar items

    return scoredMedia.map(item => item.media);
  }, [currentMedia, availableMedia]);

  return similarMedia;
}

function calculateSimilarityScore(media1: Media, media2: Media): number {
  let score = 0;

  // Type match (highest weight)
  if (media1.type === media2.type) {
    score += 0.4;
  }

  // Genre similarity (medium weight)
  const genreOverlap = media1.genres.filter(genre => 
    media2.genres.includes(genre)
  ).length;
  score += (genreOverlap / Math.max(media1.genres.length, media2.genres.length)) * 0.3;

  // Rating similarity (lower weight)
  const ratingDiff = Math.abs(media1.rating - media2.rating);
  score += (1 - ratingDiff / 5) * 0.2;

  // Release year similarity (lowest weight)
  const yearDiff = Math.abs(media1.releaseYear - media2.releaseYear);
  score += (1 - Math.min(yearDiff / 10, 1)) * 0.1;

  return score;
}