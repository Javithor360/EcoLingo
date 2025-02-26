import { useState, useEffect } from 'react';
import useProgressStore from '../../stores/progressStore.js';

export default function LessonForm({ lessonId, formsUrl, totalQuestions }) {
    const { areAllQuestionsCompleted } = useProgressStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const isUnlocked = areAllQuestionsCompleted(lessonId, totalQuestions);

    if (!isUnlocked) {
        return (
            <div className="my-8 p-8 bg-base-200 rounded-lg shadow-md border border-base-300 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <span className="text-2xl">🧐</span>
                </div>
                <h3 className="text-xl font-bold text-center text-base-content mb-2">Continúa tu aprendizaje</h3>
                <p className="text-center font-medium text-base-content/80">
                    Completa todas las preguntas de la lección para desbloquear el cuestionario final.
                </p>
                {/*<div className="mt-4 w-full max-w-xs bg-base-300 rounded-full h-2">*/}
                {/*    <div className="bg-primary h-2 rounded-full" style={{ width: `${Math.floor((areAllQuestionsCompleted(lessonId, totalQuestions-1) ? totalQuestions-1 : 0) / totalQuestions * 100)}%` }}></div>*/}
                {/*</div>*/}
            </div>
        );
    }

    return (
        <div className="my-8 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg border border-green-200 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-bounce">
                <span className="text-3xl">🎉</span>
            </div>
            <h3 className="text-2xl font-bold text-center text-green-800 mb-3">¡Felicitaciones!</h3>
            <p className="text-center text-lg text-gray-700 mb-6 max-w-md">
                Has completado esta lección. Estás listo para continuar con el cuestionario final.
            </p>
            <a
                href={formsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-teal-700 bg-white btn-lg gap-2 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
                <span>Ir al cuestionario ➜</span>
            </a>
            <p className="mt-4 text-sm text-center text-gray-500">El cuestionario se abrirá en una nueva ventana</p>
        </div>
    );
}