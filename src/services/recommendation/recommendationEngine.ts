import { Media, UserPreferences } from '../../types/media';

export class RecommendationEngine {
  calculateSimilarity(userPreferences: UserPreferences, media: Media): number {
    let score = 0;
    
    // Basic scoring based on genres
    const matchingGenres = media.genres.filter(genre => 
      userPreferences.favoriteGenres.includes(genre)
    );
    
    score += (matchingGenres.length / userPreferences.favoriteGenres.length) * 0.4;
    
    // Rating score
    if (media.rating >= userPreferences.minimumRating) {
      score += 0.3;
    }
    
    // Preferred media type
    if (userPreferences.mediaTypes.includes(media.type)) {
      score += 0.3;
    }
    
    return score;
  }

  getRecommendations(
    userPreferences: UserPreferences,
    availableMedia: Media[],
    limit: number = 10
  ): Media[] {
    const scoredMedia = availableMedia
      .map(media => ({
        media,
        score: this.calculateSimilarity(userPreferences, media)
      }))
      .filter(({ media }) => 
        !userPreferences.excludedGenres.some(genre => 
          media.genres.includes(genre)
        )
      )
      .sort((a, b) => b.score - a.score);

    return scoredMedia
      .slice(0, limit)
      .map(({ media }) => media);
  }
}