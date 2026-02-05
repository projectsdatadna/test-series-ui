export interface MCQQuestion {
  questionNumber: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  explanation: string;
}

export interface ShortAnswerQuestion {
  questionNumber: number;
  question: string;
  marksAllocated: number;
  expectedAnswer: string;
  keyPoints: string[];
}

export interface WordDocumentProps {
  title: string;
  subject: string;
  topic: string;
  duration: number;
  totalMarks: number;
  totalQuestions: number;
  mcqQuestions: MCQQuestion[];
  shortAnswerQuestions: ShortAnswerQuestion[];
  showAnswers: boolean;
}

/**
 * Generate HTML content for Word document
 */
export const generateWordDocumentHTML = (props: WordDocumentProps): string => {
  const {
    title,
    subject,
    topic,
    duration,
    totalMarks,
    totalQuestions,
    mcqQuestions,
    shortAnswerQuestions,
    showAnswers,
  } = props;

  const styles = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Calibri', 'Arial', sans-serif;
        line-height: 1.6;
        color: #000;
        background-color: #fff;
      }
      
      .document {
        max-width: 8.5in;
        margin: 0 auto;
        padding: 1in;
        background-color: #fff;
      }
      
      .header {
        border-bottom: 2px solid #000;
        margin-bottom: 1.5in;
        padding-bottom: 0.5in;
        text-align: center;
      }
      
      .header-title {
        font-size: 24pt;
        font-weight: bold;
        margin-bottom: 0.2in;
        color: #000;
      }
      
      .header-subtitle {
        font-size: 16pt;
        font-weight: bold;
        margin-bottom: 0.2in;
        color: #000;
      }
      
      .header-meta {
        font-size: 11pt;
        color: #333;
        display: flex;
        justify-content: center;
        gap: 1in;
        flex-wrap: wrap;
      }
      
      .meta-item {
        margin: 0.1in 0.5in;
      }
      
      .section {
        margin-bottom: 0.5in;
        margin-top: 0.3in;
      }
      
      .section-title {
        font-size: 13pt;
        font-weight: bold;
        margin-bottom: 0.2in;
        text-decoration: underline;
        color: #000;
      }
      
      .question-item {
        margin-bottom: 0.4in;
        page-break-inside: avoid;
      }
      
      .question-text {
        font-size: 11pt;
        font-weight: bold;
        margin-bottom: 0.15in;
        color: #000;
      }
      
      .options-container {
        margin-left: 0.3in;
        margin-bottom: 0.2in;
      }
      
      .option-text {
        font-size: 11pt;
        margin-bottom: 0.1in;
        color: #000;
      }
      
      .answer-box {
        margin-top: 0.2in;
        margin-left: 0.3in;
        padding-left: 0.2in;
        border-left: 3px solid #2563EB;
        background-color: #f0f4ff;
        padding: 0.2in;
      }
      
      .answer-label {
        font-size: 10pt;
        font-weight: bold;
        margin-bottom: 0.1in;
        color: #000;
      }
      
      .answer-text {
        font-size: 10pt;
        font-style: italic;
        color: #2563EB;
        margin-bottom: 0.1in;
      }
      
      .key-points {
        font-size: 10pt;
        margin-top: 0.1in;
        margin-left: 0.2in;
        color: #000;
      }
      
      .key-point-item {
        font-size: 10pt;
        margin-bottom: 0.05in;
        margin-left: 0.2in;
        color: #000;
      }
      
      .key-points-title {
        font-weight: bold;
        margin-bottom: 0.05in;
      }
      
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        .document {
          max-width: 100%;
          margin: 0;
          padding: 1in;
        }
      }
    </style>
  `;

  const headerHTML = `
    <div class="header">
      <div class="header-title">${title}</div>
      <div class="header-subtitle">${subject} - ${topic}</div>
      <div class="header-meta">
        <div class="meta-item"><strong>Duration:</strong> ${duration} mins</div>
        <div class="meta-item"><strong>Total Marks:</strong> ${totalMarks}</div>
        <div class="meta-item"><strong>Questions:</strong> ${totalQuestions}</div>
      </div>
    </div>
  `;

  const mcqSectionHTML =
    mcqQuestions && mcqQuestions.length > 0
      ? `
    <div class="section">
      <div class="section-title">Section A: Multiple Choice Questions</div>
      ${mcqQuestions
        .map(
          (question) => `
        <div class="question-item">
          <div class="question-text">${question.questionNumber}. ${question.question}</div>
          <div class="options-container">
            <div class="option-text">(A) ${question.options.A}</div>
            <div class="option-text">(B) ${question.options.B}</div>
            <div class="option-text">(C) ${question.options.C}</div>
            <div class="option-text">(D) ${question.options.D}</div>
          </div>
          ${
            showAnswers
              ? `
            <div class="answer-box">
              <div class="answer-label">Correct Answer: (${question.correctAnswer})</div>
              <div class="answer-text">${question.explanation}</div>
            </div>
          `
              : ''
          }
        </div>
      `
        )
        .join('')}
    </div>
  `
      : '';

  const shortAnswerSectionHTML =
    shortAnswerQuestions && shortAnswerQuestions.length > 0
      ? `
    <div class="section">
      <div class="section-title">Section B: Short Answer Questions</div>
      ${shortAnswerQuestions
        .map(
          (question) => `
        <div class="question-item">
          <div class="question-text">${question.questionNumber}. ${question.question} (${question.marksAllocated} marks)</div>
          ${
            showAnswers
              ? `
            <div class="answer-box">
              <div class="answer-label">Expected Answer:</div>
              <div class="answer-text">${question.expectedAnswer}</div>
              ${
                question.keyPoints && question.keyPoints.length > 0
                  ? `
                <div class="key-points">
                  <div class="key-points-title">Key Points:</div>
                  ${question.keyPoints
                    .map(
                      (point) => `
                    <div class="key-point-item">• ${point}</div>
                  `
                    )
                    .join('')}
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }
        </div>
      `
        )
        .join('')}
    </div>
  `
      : '';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      ${styles}
    </head>
    <body>
      <div class="document">
        ${headerHTML}
        ${mcqSectionHTML}
        ${shortAnswerSectionHTML}
      </div>
    </body>
    </html>
  `;

  return html;
};
