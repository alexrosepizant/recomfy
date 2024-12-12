/**
 * Sanitize error objects to ensure they can be cloned
 */
export function sanitizeError(error: unknown): Error {
  if (error instanceof Error) {
    // Create a new error with only clonable properties
    return new Error(error.message);
  }
  
  if (typeof error === 'string') {
    return new Error(error);
  }
  
  return new Error('An unknown error occurred');
}

/**
 * Format error message for display
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Check if an error is a specific type
 */
export function isApiError(error: unknown): boolean {
  return error instanceof Error && 'status' in error;
}