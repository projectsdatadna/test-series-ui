/**
 * Environment variables validation
 */

export function getEnv(key: string, defaultValue?: string): string {
  const value = import.meta.env[`VITE_${key}`] ?? defaultValue;
  if (!value) {
    console.warn(`Environment variable VITE_${key} is not set`);
  }
  return value ?? '';
}
