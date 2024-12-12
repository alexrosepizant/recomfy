export const ERROR_MESSAGES = {
  api: {
    401: 'Authentication failed. Please check your API key.',
    403: 'Access forbidden. Please check your permissions.',
    404: 'The requested content was not found.',
    429: 'Too many requests. Please try again later.',
    503: 'Service temporarily unavailable. Please try again later.',
    default: 'An unexpected error occurred. Please try again later.',
  },
  validation: {
    required: 'This field is required',
    invalid: 'Invalid value provided',
    network: 'Network error. Please check your connection.',
  },
  media: {
    notFound: 'Media not found',
    loadError: 'Failed to load media content',
    invalidId: 'Invalid media ID format',
  },
} as const;

export function getErrorMessage(key: keyof typeof ERROR_MESSAGES, subKey?: string): string {
  const messages = ERROR_MESSAGES[key];
  return typeof messages === 'string' ? messages : (subKey && messages[subKey]) || messages.default;
}