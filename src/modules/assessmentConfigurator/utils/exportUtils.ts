/**
 * Export utilities for PDF generation
 */

import { api } from '../../../utils/api';
import { mockPaperData } from '../mocks';

export interface ExportOptions {
  filename: string;
  title?: string;
  subject?: string;
  duration?: number;
  totalMarks?: number;
  institutionName?: string;
}

/**
 * Export document as PDF using Puppeteer (Server-Side)
 * Provides exact CSS styling + selectable text
 * Requires backend server running on port 3001
 */
export const exportToPDFWithPuppeteer = async (
  _elementId: string,
  options: ExportOptions,
  paperData?: {
    mcqQuestions: Array<Record<string, any>>;
    shortAnswerQuestions: Array<Record<string, any>>;
    examDetails: Record<string, any>;
    totalMarks: number;
  },
  showAnswers: boolean = true
): Promise<void> => {
  try {
    // Use mock data if not provided
    const mockData = paperData || mockPaperData.data;

    // Build complete HTML with title at top (100% width)
    let html = `
      <div style="width: 100%; background-color: white; padding: 3rem; font-family: 'Georgia', 'Times New Roman', serif; color: #1f2937;">
        <!-- Title Section (100% width) -->
        <div style="width: 100%; text-align: center; border-bottom: 2px solid rgba(15, 23, 42, 0.1); padding-bottom: 1rem; margin-bottom: 1.5rem;">
          ${options.institutionName ? `<p style="font-size: 0.75rem; font-weight: 600; margin: 0 0 0.5rem 0; color: #475569;">${options.institutionName}</p>` : ''}
          <h1 style="font-size: 1.25rem; font-weight: 700; text-transform: uppercase; margin: 0 0 0.25rem 0;">
            ${options.title || 'Assessment Paper'}
          </h1>
          <h2 style="font-size: 0.75rem; font-style: italic; font-weight: 600; margin: 0;">
            ${options.subject || 'Subject'}
          </h2>
          <div style="display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; border-top: 1px solid rgba(15, 23, 42, 0.1); padding-top: 0.75rem;">
            <span>Duration: ${options.duration || 180} mins</span>
            <span>Total Marks: ${options.totalMarks || 0}</span>
            <span>Questions: ${(mockData.mcqQuestions?.length || 0) + (mockData.shortAnswerQuestions?.length || 0)}</span>
          </div>
        </div>

        <!-- MCQ Section -->
        ${mockData.mcqQuestions && mockData.mcqQuestions.length > 0 ? `
          <div style="margin-bottom: 2rem;">
            <h3 style="font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-style: italic; border-bottom: 1px solid rgba(15, 23, 42, 0.1); padding-bottom: 0.25rem; margin: 0 0 1rem 0; font-size: 0.875rem;">
              Section A: Multiple Choice Questions
            </h3>
            ${mockData.mcqQuestions.map((question: Record<string, any>) => `
              <div style="position: relative; margin-bottom: 1.5rem; page-break-inside: avoid;">
                <p style="font-weight: 600; padding-right: 2rem; margin: 0 0 0.5rem 0; font-size: 0.8rem;">
                  ${question.questionNumber}. ${question.question || 'Question not available'}
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-left: 1rem;">
                  <p style="margin: 0; font-size: 0.75rem;">(A) ${question.options?.A || 'Option not available'}</p>
                  <p style="margin: 0; font-size: 0.75rem;">(B) ${question.options?.B || 'Option not available'}</p>
                  <p style="margin: 0; font-size: 0.75rem;">(C) ${question.options?.C || 'Option not available'}</p>
                  <p style="margin: 0; font-size: 0.75rem;">(D) ${question.options?.D || 'Option not available'}</p>
                </div>
                ${showAnswers ? `
                  <div style="margin-top: 0.75rem; padding: 0.75rem; background-color: rgba(37, 99, 235, 0.05); border-left: 4px solid #2563eb; border-radius: 0.25rem;">
                    <p style="font-weight: 700; font-size: 0.625rem; text-transform: uppercase; color: #2563eb; margin: 0 0 0.25rem 0;">
                      Correct Answer: (${question.correctAnswer || 'N/A'})
                    </p>
                    <p style="font-size: 0.75rem; font-style: italic; line-height: 1.25; margin: 0;">
                      ${question.explanation || 'Explanation not available'}
                    </p>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Short Answer Section -->
        ${mockData.shortAnswerQuestions && mockData.shortAnswerQuestions.length > 0 ? `
          <div style="margin-bottom: 2rem;">
            <h3 style="font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-style: italic; border-bottom: 1px solid rgba(15, 23, 42, 0.1); padding-bottom: 0.25rem; margin: 0 0 1rem 0; font-size: 0.875rem;">
              Section B: Short Answer Questions
            </h3>
            ${mockData.shortAnswerQuestions.map((question: Record<string, any>) => `
              <div style="position: relative; margin-bottom: 1.5rem; page-break-inside: avoid;">
                <p style="font-weight: 600; padding-right: 2rem; margin: 0 0 0.5rem 0; font-size: 0.8rem;">
                  ${question.questionNumber}. ${question.question || 'Question not available'} (${question.marksAllocated || 0} marks)
                </p>
                ${showAnswers ? `
                  <div style="margin-top: 0.75rem; padding: 0.75rem; background-color: rgba(37, 99, 235, 0.05); border-left: 4px solid #2563eb; border-radius: 0.25rem;">
                    <p style="font-weight: 700; font-size: 0.625rem; text-transform: uppercase; color: #2563eb; margin: 0 0 0.25rem 0;">
                      Expected Answer:
                    </p>
                    <p style="font-size: 0.75rem; font-style: italic; line-height: 1.25; margin: 0 0 0.5rem 0;">
                      ${question.expectedAnswer || 'Answer not available'}
                    </p>
                    ${question.keyPoints && question.keyPoints.length > 0 ? `
                      <div style="margin-top: 0.5rem; font-size: 0.75rem;">
                        <strong style="display: block; margin-bottom: 0.25rem; color: #2563eb; font-weight: 700;">Key Points:</strong>
                        <ul style="margin: 0.25rem 0 0 1rem; padding-left: 0;">
                          ${question.keyPoints.map((point: string) => `
                            <li style="margin: 0.25rem 0; list-style-type: disc;">${point || 'Point not available'}</li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

    // CSS for PDF rendering
    const css = `
      /* Reset and Base Styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body {
        width: 100%;
        height: auto;
      }

      body {
        font-family: 'Georgia', 'Times New Roman', serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #1f2937;
        background-color: white;
        line-height: 1.5;
      }

      /* Page Styles */
      [data-page] {
        background-color: white;
        margin: 0;
        width: 100%;
        min-height: 842px;
        padding: 3rem;
        font-family: 'Georgia', 'Times New Roman', serif;
        border: none;
        position: relative;
        overflow: hidden;
        page-break-after: always;
        break-after: page;
      }

      [data-page]:last-child {
        page-break-after: avoid;
        break-after: avoid;
      }

      /* Print Styles */
      @page {
        size: A4;
        margin: 0;
        padding: 0;
      }

      @media print {
        * {
          margin: 0;
          padding: 0;
        }

        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background: white;
        }

        body {
          background: white;
        }

        p, span, div, li {
          color: #000;
          background-color: transparent;
          font-family: Arial, sans-serif;
        }

        * {
          transform: none;
        }

        ul, ol {
          margin-left: 5mm;
          color: #000;
        }

        li {
          margin-bottom: 1mm;
          color: #000;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        tr {
          page-break-inside: avoid;
          break-inside: avoid;
        }

        td, th {
          border: 1px solid #000;
          padding: 2mm;
          color: #000;
        }
      }
    `;

    // Send to backend using api utility
    const blob = await api.post<Blob>(
      'http://localhost:3001/pdf/generate-pdf',
      {
        html,
        css,
        filename: sanitizeFilename(options.filename),
        institutionName: options.institutionName,
      },
      {
        responseType: 'blob',
      }
    );

    // Download PDF
    const url = URL.createObjectURL(blob as any);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizeFilename(options.filename)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    throw error;
  }
};

/**
 * Sanitize filename to remove special characters
 */
const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 50);
};
