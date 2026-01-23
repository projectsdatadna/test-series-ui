/**
 * Vite environment variables type definitions
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_API_URL?: string;
      VITE_DEBUG?: string;
    }
  }
}

export {};
