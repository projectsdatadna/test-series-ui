/**
 * Pagination utilities for splitting questions into A4 pages
 * A4 page height: 297mm (11.69 inches)
 * Usable height with margins: ~750px
 */

export interface PageContent {
  pageNumber: number;
  mcqQuestions: any[];
  shortAnswerQuestions: any[];
  hasHeader: boolean;
}

const ESTIMATED_QUESTION_HEIGHT = 120; // pixels per question
const ESTIMATED_MCQ_HEIGHT = 100; // pixels per MCQ
const PAGE_HEIGHT = 750; // usable height in pixels
const HEADER_HEIGHT = 150; // header height

export const paginateQuestions = (
  mcqQuestions: any[] = [],
  shortAnswerQuestions: any[] = [],
  includeHeader: boolean = true
): PageContent[] => {
  const pages: PageContent[] = [];
  let currentPageMcqs: any[] = [];
  let currentPageShortAnswers: any[] = [];
  let currentPageHeight = includeHeader ? HEADER_HEIGHT : 0;
  let pageNumber = 1;

  // Process MCQ questions
  for (const mcq of mcqQuestions) {
    const questionHeight = ESTIMATED_MCQ_HEIGHT;

    if (currentPageHeight + questionHeight > PAGE_HEIGHT && currentPageMcqs.length > 0) {
      // Save current page and start new one
      pages.push({
        pageNumber,
        mcqQuestions: currentPageMcqs,
        shortAnswerQuestions: currentPageShortAnswers,
        hasHeader: pageNumber === 1,
      });
      pageNumber++;
      currentPageMcqs = [];
      currentPageShortAnswers = [];
      currentPageHeight = 0;
    }

    currentPageMcqs.push(mcq);
    currentPageHeight += questionHeight;
  }

  // Process short answer questions
  for (const shortAnswer of shortAnswerQuestions) {
    const questionHeight = ESTIMATED_QUESTION_HEIGHT;

    if (currentPageHeight + questionHeight > PAGE_HEIGHT && (currentPageMcqs.length > 0 || currentPageShortAnswers.length > 0)) {
      // Save current page and start new one
      pages.push({
        pageNumber,
        mcqQuestions: currentPageMcqs,
        shortAnswerQuestions: currentPageShortAnswers,
        hasHeader: pageNumber === 1,
      });
      pageNumber++;
      currentPageMcqs = [];
      currentPageShortAnswers = [];
      currentPageHeight = 0;
    }

    currentPageShortAnswers.push(shortAnswer);
    currentPageHeight += questionHeight;
  }

  // Add remaining content
  if (currentPageMcqs.length > 0 || currentPageShortAnswers.length > 0) {
    pages.push({
      pageNumber,
      mcqQuestions: currentPageMcqs,
      shortAnswerQuestions: currentPageShortAnswers,
      hasHeader: pageNumber === 1,
    });
  }

  return pages.length > 0 ? pages : [];
};
