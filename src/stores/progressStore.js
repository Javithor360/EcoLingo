import {create} from 'zustand';

const useProgressStore = create((set, get) => ({
        progress: typeof localStorage !== 'undefined'
            ? JSON.parse(localStorage.getItem('lessonProgress') || '{}')
            : {},

        initializeStore: () => {
            if (typeof window !== 'undefined') {
                const stored = localStorage.getItem('lessonProgress');
                if (stored) {
                    set({progress: JSON.parse(stored)});
                }
            }
        },

        completeQuestion: (lessonId, questionId, selectedOption) => {
            set((state) => {
                // Get the current lesson progress or initialize it
                const currentProgress = state.progress[lessonId] || {
                    completedQuestions: [],
                    selectedAnswers: {},
                    isCompleted: false,
                };

                // Update the progress object with the new values
                const newProgress = {
                    ...state.progress,
                    [lessonId]: {
                        ...currentProgress,
                        completedQuestions: [...new Set([...currentProgress.completedQuestions, questionId])],
                        selectedAnswers: {
                            ...currentProgress.selectedAnswers,
                            [questionId]: selectedOption, // Almacena la opción seleccionada
                        },
                    },
                };

                // Update the local storage
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('lessonProgress', JSON.stringify(newProgress));
                }

                return {progress: newProgress};
            })
        },

        completeLesson: (lessonId) => {
            set((state) => {
                const newProgress = {
                    ...state.progress,
                    [lessonId]: {
                        ...state.progress[lessonId],
                        isCompleted: true
                    }
                };

                // Update the local storage
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('lessonProgress', JSON.stringify(newProgress));
                }

                return {progress: newProgress};
            });
        },

        isQuestionUnlocked: (lessonId, questionId) => {
            // Get the current state
            const state = get();
            const lessonProgress = state.progress[lessonId];

            // If the lesson progress is not defined, return true only if the question is the first one
            if (!lessonProgress) return questionId === 0;

            // If the lesson progress is defined, return the previous question is completed
            if (questionId === 0) return true;
            return lessonProgress.completedQuestions.includes(questionId - 1);
        },

        areAllQuestionsCompleted: (lessonId, totalQuestions) => {
            const state = get();
            const lessonProgress = state.progress[lessonId];
            if (!lessonProgress) return false;
            return lessonProgress.completedQuestions?.length === totalQuestions;
        },

        isLessonCompleted: (lessonId) => {
            const state = get();
            return state.progress[lessonId]?.isCompleted || false;
        },

        getSelectedAnswer: (lessonId, questionId) => {
            const state = get();
            return state.progress[lessonId]?.selectedAnswers?.[questionId] || null;
        },
    })
);

export default useProgressStore;