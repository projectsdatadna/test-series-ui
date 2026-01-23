/**
 * Logger utility for development and production
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
} as const;

type LogLevel = keyof typeof LOG_LEVELS;

class Logger {
  private minLevel: number = LOG_LEVELS.INFO;

  constructor(minLevel: LogLevel = 'INFO') {
    this.minLevel = LOG_LEVELS[minLevel];
  }

  private log(level: LogLevel, message: string, data?: unknown) {
    if (LOG_LEVELS[level] >= this.minLevel) {
      const timestamp = new Date().toISOString();
      const style = this.getStyle(level);
      
      if (data) {
        console.log(`%c[${timestamp}] ${level}:`, style, message, data);
      } else {
        console.log(`%c[${timestamp}] ${level}:`, style, message);
      }
    }
  }

  private getStyle(level: LogLevel): string {
    const styles: Record<LogLevel, string> = {
      DEBUG: 'color: #888; font-weight: bold;',
      INFO: 'color: #0066cc; font-weight: bold;',
      WARN: 'color: #ff9900; font-weight: bold;',
      ERROR: 'color: #cc0000; font-weight: bold;',
    };
    return styles[level];
  }

  debug(message: string, data?: unknown) {
    this.log('DEBUG', message, data);
  }

  info(message: string, data?: unknown) {
    this.log('INFO', message, data);
  }

  warn(message: string, data?: unknown) {
    this.log('WARN', message, data);
  }

  error(message: string, data?: unknown) {
    this.log('ERROR', message, data);
  }
}

export const logger = new Logger();
