import { ERROR_MESSAGES } from './messages';

export function validateApiKey(key: string | undefined): string | null {
  if (!key) {
    return ERROR_MESSAGES.validation.required;
  }

  if (typeof key !== 'string' || key.trim().length === 0) {
    return ERROR_MESSAGES.validation.invalid;
  }

  return null;
}

export function validateMediaId(id: string | undefined): string | null {
  if (!id) {
    return ERROR_MESSAGES.media.invalidId;
  }

  const [type, actualId] = id.split('-');
  if (!type || !actualId || !['movie', 'series', 'book'].includes(type)) {
    return ERROR_MESSAGES.media.invalidId;
  }

  return null;
}