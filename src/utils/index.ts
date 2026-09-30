/**
 * Shared utility functions
 */

export function classNames(...classes: Array<string | boolean | undefined | null>): string {
  return classes.filter(Boolean).join(' ');
}

export function formatTimestamp(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  }).format(date);
}
