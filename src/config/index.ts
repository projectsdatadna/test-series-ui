/**
 * Application Configuration
 */

export const APP_NAME = 'Data DNA';
export const APP_VERSION = '1.0.0';
export const ENV = import.meta.env.MODE;
export const IS_PRODUCTION = ENV === 'production';
export const IS_DEVELOPMENT = ENV === 'development';

/**
 * API Configuration
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
export const API_TIMEOUT = 30000;

/**
 * Feature Flags
 */
export const FEATURES = {
  ANALYTICS: !IS_DEVELOPMENT,
  DEBUG_MODE: IS_DEVELOPMENT,
};
