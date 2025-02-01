import { create } from 'zustand';

const useProgressStore = create((set, get) => ({
    progress: typeof localStorage !== 'undefined'
        ? JSON.parse(localStorage.getItem('lessonProgress') || '{}')
        : {},

    initializeStore: () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('lessonProgress');
            if (stored) {
                set({ progress: JSON.parse(stored) });
            }
        }
    },

    completeQuestion: (lessonId, questionId) => {
        set((state) => {
            const newProgress = {
                ...state.progress,
                [lessonId]: {
                    lastCompletedQuestion: questionId,
                }
            };

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('lessonProgress', JSON.stringify(newProgress));
            }

            return { progress: newProgress };
        });
    },

    isQuestionUnlocked: (lessonId, questionId) => {
        const state = get();
        const lessonProgress = state.progress[lessonId];

        // Primera pregunta siempre desbloqueada
        if (questionId === 0) return true;

        // Si no hay progreso, solo la primera pregunta está desbloqueada
        if (!lessonProgress) return false;

        // Una pregunta está desbloqueada si la anterior fue completada
        return lessonProgress.lastCompletedQuestion >= questionId - 1;
    },

    areAllQuestionsCompleted: (lessonId, totalQuestions) => {
        const state = get();
        const lessonProgress = state.progress[lessonId];

        if (!lessonProgress) return false;
        return lessonProgress.lastCompletedQuestion === totalQuestions - 1;
    },

    isQuestionCompleted: (lessonId, questionId) => {
        const state = get();
        const lessonProgress = state.progress[lessonId];

        if (!lessonProgress) return false;
        return questionId <= lessonProgress.lastCompletedQuestion;
    }
}));

export default useProgressStore;