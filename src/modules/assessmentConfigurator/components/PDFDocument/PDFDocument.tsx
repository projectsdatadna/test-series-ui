import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Register Helvetica as fallback (built-in font in PDF)
// Note: @react-pdf/renderer has built-in support for standard fonts
// We'll use Helvetica which is always available in PDFs

// Create styles using the StyleSheet API - matching exact preview styles
const styles = StyleSheet.create({
  document: {
    backgroundColor: '#FFFFFF',
  },
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 48, // 3rem = 48pt
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#1f2937',
  },
  header: {
    marginBottom: 24, // 1.5rem
    paddingBottom: 16, // 1rem
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(15, 23, 42, 0.1)',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 18, // 1.125rem
    fontWeight: 'bold',
    marginBottom: 4, // 0.25rem
    color: '#1f2937',
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: 12, // 0.75rem
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#1f2937',
    fontStyle: 'italic',
  },
  headerMeta: {
    fontSize: 8, // 0.625rem
    color: '#1f2937',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16, // 1rem
    paddingTop: 12, // 0.75rem
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.1)',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.1,
  },
  metaItem: {
    marginRight: 20,
  },
  section: {
    marginBottom: 24, // 1.5rem
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 11, // 0.6875rem
    fontWeight: 'bold',
    marginBottom: 16, // 1rem
    textDecoration: 'underline',
    color: '#1f2937',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontStyle: 'italic',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.1)',
    paddingBottom: 4,
  },
  questionItem: {
    marginBottom: 16, // 1rem
    marginLeft: 0,
  },
  questionText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8, // 0.5rem
    color: '#1f2937',
    paddingRight: 32,
  },
  optionsContainer: {
    marginLeft: 16, // 1rem
    marginBottom: 8, // 0.5rem
  },
  optionText: {
    fontSize: 10,
    marginBottom: 8, // 0.5rem
    color: '#1f2937',
  },
  answerBox: {
    marginTop: 12, // 0.75rem
    marginLeft: 0,
    paddingLeft: 12, // 0.75rem
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    borderRadius: 4,
  },
  answerLabel: {
    fontSize: 8, // 0.625rem
    fontWeight: 'bold',
    marginBottom: 4, // 0.25rem
    color: '#2563EB',
    textTransform: 'uppercase',
  },
  answerText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#2563EB',
    marginBottom: 4,
    lineHeight: 1.25,
  },
  keyPoints: {
    fontSize: 10,
    marginTop: 4,
    marginLeft: 16,
    color: '#1f2937',
  },
  keyPointItem: {
    fontSize: 10,
    marginBottom: 4, // 0.25rem
    marginLeft: 16,
    color: '#1f2937',
  },
});

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

export interface PDFDocumentProps {
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

export const PDFDocument: React.FC<PDFDocumentProps> = ({
  title,
  subject,
  topic,
  duration,
  totalMarks,
  totalQuestions,
  mcqQuestions,
  shortAnswerQuestions,
  showAnswers,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>
            {subject} - {topic}
          </Text>
          <View style={styles.headerMeta}>
            <Text style={styles.metaItem}>Duration: {duration} mins</Text>
            <Text style={styles.metaItem}>Total Marks: {totalMarks}</Text>
            <Text style={styles.metaItem}>Questions: {totalQuestions}</Text>
          </View>
        </View>

        {/* MCQ Section */}
        {mcqQuestions && mcqQuestions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section A: Multiple Choice Questions</Text>
            {mcqQuestions.map((question) => (
              <View key={question.questionNumber} style={styles.questionItem}>
                <Text style={styles.questionText}>
                  {question.questionNumber}. {question.question}
                </Text>
                <View style={styles.optionsContainer}>
                  <Text style={styles.optionText}>(A) {question.options.A}</Text>
                  <Text style={styles.optionText}>(B) {question.options.B}</Text>
                  <Text style={styles.optionText}>(C) {question.options.C}</Text>
                  <Text style={styles.optionText}>(D) {question.options.D}</Text>
                </View>
                {showAnswers && (
                  <View style={styles.answerBox}>
                    <Text style={styles.answerLabel}>
                      Correct Answer: ({question.correctAnswer})
                    </Text>
                    <Text style={styles.answerText}>{question.explanation}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Short Answer Section */}
        {shortAnswerQuestions && shortAnswerQuestions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section B: Short Answer Questions</Text>
            {shortAnswerQuestions.map((question) => (
              <View key={question.questionNumber} style={styles.questionItem}>
                <Text style={styles.questionText}>
                  {question.questionNumber}. {question.question} ({question.marksAllocated} marks)
                </Text>
                {showAnswers && (
                  <View style={styles.answerBox}>
                    <Text style={styles.answerLabel}>Expected Answer:</Text>
                    <Text style={styles.answerText}>{question.expectedAnswer}</Text>
                    {question.keyPoints && question.keyPoints.length > 0 && (
                      <View style={styles.keyPoints}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Key Points:</Text>
                        {question.keyPoints.map((point, idx) => (
                          <Text key={idx} style={styles.keyPointItem}>
                            • {point}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
