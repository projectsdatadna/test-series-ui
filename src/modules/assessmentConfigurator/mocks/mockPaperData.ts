/**
 * Mock data for testing assessment paper preview and export functionality
 */

export const mockPaperData = {
  success: true,
  data: {
    examDetails: {
      duration: 180,
      totalQuestions: 20,
      subject: 'Science',
      topic: '1. The Ever-Evolving World of Science',
      difficultyLevel: 'balanced',
    },
    mcqQuestions: [
      {
        questionNumber: 1,
        question: 'What is science primarily described as in the text?',
        options: {
          A: 'A collection of facts',
          B: 'A way of thinking that welcomes curiosity',
          C: 'A set of mathematical formulas',
          D: 'A list of scientific discoveries',
        },
        correctAnswer: 'B',
        explanation:
          'The text describes science as a process and a way of thinking that welcomes curiosity, asks questions, and is open to the unknown.',
        difficulty: 'medium',
      },
      {
        questionNumber: 2,
        question: 'According to the text, how did early humans measure time?',
        options: {
          A: 'Using digital watches',
          B: 'By observing clock towers',
          C: 'By observing shadows of objects in the Sun',
          D: 'Using electric clocks',
        },
        correctAnswer: 'C',
        explanation:
          'The text mentions that long before electric clocks, early humans observed the shadows of objects in the Sun to tell time.',
        difficulty: 'easy',
      },
      {
        questionNumber: 3,
        question: 'What essential life processes are mentioned as common to animals?',
        options: {
          A: 'Thinking and dreaming',
          B: 'Eating, breathing, and blood circulation',
          C: 'Walking and talking',
          D: 'Sleeping and playing',
        },
        correctAnswer: 'B',
        explanation:
          'The text highlights eating, breathing, and blood circulation as essential life processes for animal survival.',
        difficulty: 'medium',
      },
      {
        questionNumber: 4,
        question: 'What phenomenon occurs due to the Earth and Moon casting shadows?',
        options: {
          A: 'Rainbows',
          B: 'Earthquakes',
          C: 'Eclipses',
          D: 'Volcanic eruptions',
        },
        correctAnswer: 'C',
        explanation:
          'The text mentions that the Earth and Moon casting shadows leads to the fascinating phenomenon of eclipses.',
        difficulty: 'medium',
      },
      {
        questionNumber: 5,
        question: 'What changes can occur when things are heated?',
        options: {
          A: 'Objects become invisible',
          B: 'Colors change randomly',
          C: 'Changes can happen faster or be irreversible',
          D: 'Objects start rotating',
        },
        correctAnswer: 'C',
        explanation:
          'The text discusses that some changes happen or happen faster when things are heated, and some changes cannot be reversed.',
        difficulty: 'hard',
      },
      {
        questionNumber: 6,
        question: 'What natural process is described involving water from seas to rain?',
        options: {
          A: 'Water filtering',
          B: 'Water purification',
          C: 'Water cycle with evaporation and rain',
          D: 'Water compression',
        },
        correctAnswer: 'C',
        explanation:
          'The text describes water evaporating from seas with heat from the Sun and falling as rain.',
        difficulty: 'easy',
      },
      {
        questionNumber: 7,
        question: 'What is emphasized about scientific discoveries in the text?',
        options: {
          A: 'They are always final',
          B: 'They are disconnected from each other',
          C: 'They are interconnected across different fields',
          D: 'They require no further questioning',
        },
        correctAnswer: 'C',
        explanation:
          'The text highlights that scientific ideas in one area often inspire discoveries in another and are interconnected.',
        difficulty: 'medium',
      },
      {
        questionNumber: 8,
        question: 'What is the significance of understanding light according to the text?',
        options: {
          A: 'It helps create shadow puppets',
          B: 'It provides a deep understanding of the universe',
          C: 'It only helps us see at home',
          D: 'It is only useful for telling time',
        },
        correctAnswer: 'B',
        explanation:
          'The text states that asking questions about light has given us a very deep understanding of the universe.',
        difficulty: 'hard',
      },
      {
        questionNumber: 9,
        question: 'What approach to learning is encouraged in the text?',
        options: {
          A: 'Memorizing facts',
          B: 'Passive reading',
          C: 'Asking questions and exploring',
          D: 'Avoiding experiments',
        },
        correctAnswer: 'C',
        explanation:
          'The text emphasizes asking questions, exploring, doing hands-on experiments, and thinking like a scientist.',
        difficulty: 'medium',
      },
      {
        questionNumber: 10,
        question: 'How do plants get their food according to the text?',
        options: {
          A: 'By buying it from stores',
          B: "The text doesn't specify",
          C: 'By asking other plants',
          D: 'By consuming animals',
        },
        correctAnswer: 'B',
        explanation:
          'While the text mentions plants need food to grow, it does not specify exactly how they obtain it.',
        difficulty: 'easy',
      },
    ],
    shortAnswerQuestions: [
      {
        questionNumber: 1,
        question: 'Explain how science is described as a process of thinking in the text.',
        expectedAnswer:
          'Science is described as a way of thinking that welcomes curiosity, asks questions, and is open to the unknown. It involves exploring, performing experiments, and challenging existing knowledge.',
        keyPoints: [
          'Welcomes curiosity',
          'Asks questions',
          'Open to the unknown',
          'Involves exploration and experiments',
        ],
        difficulty: 'medium',
        marksAllocated: 3,
      },
      {
        questionNumber: 2,
        question: 'Describe the water cycle as mentioned in the text.',
        expectedAnswer:
          'Water evaporates from seas with heat from the Sun, falls as rain, and may trickle down into the ground, potentially ending up far away from its origin.',
        keyPoints: [
          'Evaporation from seas',
          'Heat from the Sun',
          'Falling as rain',
          'Potential ground absorption',
        ],
        difficulty: 'easy',
        marksAllocated: 3,
      },
      {
        questionNumber: 3,
        question: 'What essential life processes are common to animals, according to the text?',
        expectedAnswer:
          'Animals need to eat, breathe, and have blood circulate nutrients from food all over the body to survive and grow.',
        keyPoints: ['Eating', 'Breathing', 'Blood circulation of nutrients'],
        difficulty: 'medium',
        marksAllocated: 3,
      },
      {
        questionNumber: 4,
        question: 'How do changes in materials occur when heated, based on the text?',
        expectedAnswer:
          'Some changes happen faster or become irreversible when heated. Examples include ice melting, fruits ripening, and rocks breaking.',
        keyPoints: [
          'Changes can happen faster',
          'Some changes are irreversible',
          'Examples of heat-related changes',
        ],
        difficulty: 'hard',
        marksAllocated: 3,
      },
      {
        questionNumber: 5,
        question: 'Explain how early humans measured time, as discussed in the text.',
        expectedAnswer:
          "Long before electric clocks, early humans observed the shadows of objects in the Sun and used the position of shadows to tell time.",
        keyPoints: [
          "Used shadows of objects",
          "Observed Sun's position",
          'Determined time before modern clocks',
        ],
        difficulty: 'easy',
        marksAllocated: 3,
      },
      {
        questionNumber: 6,
        question: 'What is the significance of light in understanding the universe, according to the text?',
        expectedAnswer:
          'Asking questions about light has provided a deep understanding of the universe, revealing phenomena like eclipses and the movements of celestial bodies.',
        keyPoints: [
          'Provides deep understanding of universe',
          'Reveals celestial phenomena',
          'Goes beyond everyday observations',
        ],
        difficulty: 'hard',
        marksAllocated: 3,
      },
      {
        questionNumber: 7,
        question: 'How are scientific discoveries described as interconnected in the text?',
        expectedAnswer:
          'Scientific ideas in one area often inspire discoveries in another or help ask questions in different fields, showing the interconnected nature of scientific knowledge.',
        keyPoints: [
          'Ideas inspire discoveries in other areas',
          'Help ask questions across fields',
          'Interconnected knowledge',
        ],
        difficulty: 'medium',
        marksAllocated: 3,
      },
      {
        questionNumber: 8,
        question: 'Describe the approach to learning science recommended in the text.',
        expectedAnswer:
          'Learning science involves curiosity, asking questions, performing experiments, exploring, and thinking like a scientist. Each experiment can lead to more questions and discoveries.',
        keyPoints: [
          'Curiosity-driven learning',
          'Asking questions',
          'Hands-on experiments',
          'Continuous exploration',
        ],
        difficulty: 'medium',
        marksAllocated: 3,
      },
      {
        questionNumber: 9,
        question: 'How do the movements of Earth, Moon, and Sun impact life, as mentioned in the text?',
        expectedAnswer:
          'These movements create phenomena like day and night, eclipses, and have consequences for life on our planet, showcasing the interconnectedness of celestial bodies.',
        keyPoints: [
          'Create day and night',
          'Cause eclipses',
          'Impact life on Earth',
        ],
        difficulty: 'hard',
        marksAllocated: 3,
      },
      {
        questionNumber: 10,
        question: 'What is the metaphorical significance of the butterfly and paper plane in the text?',
        expectedAnswer:
          'They represent how learning takes flight when curiosity leads the way, symbolizing the freedom and exploration inherent in scientific discovery.',
        keyPoints: [
          'Learning takes flight with curiosity',
          'Symbolize freedom of exploration',
          'Inspire scientific thinking',
        ],
        difficulty: 'easy',
        marksAllocated: 3,
      },
    ],
    answerKey: {
      mcqAnswers: [
        {
          questionNumber: 1,
          answer: 'B',
          explanation: 'Science as a process of curious thinking',
        },
        {
          questionNumber: 2,
          answer: 'C',
          explanation: 'Observing shadows to measure time',
        },
        {
          questionNumber: 3,
          answer: 'B',
          explanation: 'Essential life processes for animals',
        },
        {
          questionNumber: 4,
          answer: 'C',
          explanation: 'Eclipses from celestial shadows',
        },
        {
          questionNumber: 5,
          answer: 'C',
          explanation: 'Changes accelerated or made irreversible by heat',
        },
        {
          questionNumber: 6,
          answer: 'C',
          explanation: 'Water cycle with evaporation and rain',
        },
        {
          questionNumber: 7,
          answer: 'C',
          explanation: 'Interconnected scientific discoveries',
        },
        {
          questionNumber: 8,
          answer: 'B',
          explanation: 'Light provides universe understanding',
        },
        {
          questionNumber: 9,
          answer: 'C',
          explanation: 'Exploratory and questioning approach',
        },
        {
          questionNumber: 10,
          answer: 'B',
          explanation: 'No specific method of plant food acquisition mentioned',
        },
      ],
      shortAnswerAnswers: [
        {
          questionNumber: 1,
          answer:
            'Science is a process of thinking that encourages curiosity, questioning, and exploration of the unknown through experiments and discovery.',
          keyPoints: [
            'Curiosity-driven approach',
            'Questioning existing knowledge',
            'Experimental methodology',
          ],
        },
        {
          questionNumber: 2,
          answer:
            'The water cycle involves water evaporating from seas due to solar heat, transforming into rain, and potentially infiltrating the ground, demonstrating a continuous natural process.',
          keyPoints: ['Solar heat drives evaporation', 'Rain formation', 'Ground absorption'],
        },
      ],
    },
  },
};

/**
 * Hook to use mock data for testing
 */
export const useMockPaperData = () => {
  return mockPaperData.data;
};
