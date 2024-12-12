import { FEATURE_CONFIG } from '../config';

export function normalizeYear(year: number): number {
  const currentYear = new Date().getFullYear();
  const { range, min, max } = FEATURE_CONFIG.yearNormalization;
  const normalized = (year - (currentYear - range)) / range;
  return Math.max(min, Math.min(max, normalized));
}

export function normalizeRating(rating: number): number {
  const { min, max } = FEATURE_CONFIG.ratingNormalization;
  const normalized = rating / 10;
  return Math.max(min, Math.min(max, normalized));
}

export function normalizeScore(score: number): number {
  return Math.max(0, Math.min(1, score));
}