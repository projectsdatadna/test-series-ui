declare module 'html-to-docx' {
  export function htmlToDocx(options: {
    html: string;
    options?: {
      table?: { width?: number };
      margins?: {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
    };
  }): Promise<Blob>;
}
