/**
 * Validate an API key exists and has the correct format
 */
export function validateApiKey(key: string | undefined, service: string): boolean {
  if (!key) {
    console.error(`${service} API key is missing`);
    return false;
  }

  if (typeof key !== 'string' || key.trim().length === 0) {
    console.error(`Invalid ${service} API key format`);
    return false;
  }

  return true;
}