export const NETWORK_CONFIG = {
  hiddenLayers: [10, 5],
  training: {
    iterations: 1000,
    errorThresh: 0.005,
    log: true,
    logPeriod: 100,
  },
} as const;

export const FEATURE_CONFIG = {
  yearNormalization: {
    range: 50, // Years before/after current year to consider
    min: -1,
    max: 1,
  },
  ratingNormalization: {
    min: 0,
    max: 1,
  },
} as const;