/**
 * Format a date string or year to a consistent format
 */
export function formatYear(date: string | number | undefined): number {
  if (!date) return 0;
  
  if (typeof date === 'number') {
    return date;
  }

  try {
    return new Date(date).getFullYear();
  } catch (error) {
    console.error('Error parsing date:', error);
    return 0;
  }
}