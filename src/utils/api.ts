import { AxiosError } from 'axios';
import { sanitizeError, formatErrorMessage } from './errors';

interface ApiErrorOptions {
  throwError?: boolean;
  defaultValue?: any;
}

export function handleApiError(
  context: string,
  error: unknown,
  options: ApiErrorOptions = { throwError: false }
): never | any {
  const sanitizedError = sanitizeError(error);
  const errorMessage = formatErrorMessage(sanitizedError);
  
  // Log the error with context
  console.error(context + ':', {
    message: errorMessage,
    status: isAxiosError(error) ? error.response?.status : undefined,
    data: isAxiosError(error) ? error.response?.data : undefined,
  });

  if (options.throwError) {
    throw sanitizedError;
  }

  return options.defaultValue ?? [];
}

export function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof Error && 'isAxiosError' in error;
}

export function getErrorStatus(error: unknown): number | undefined {
  if (isAxiosError(error)) {
    return error.response?.status;
  }
  return undefined;
}