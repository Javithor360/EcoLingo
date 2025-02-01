import { useState, useEffect } from 'react';
import useProgressStore from '../../stores/progressStore.js';

export default function LessonForm({ lessonId, formsUrl, totalQuestions }) {
    const { areAllQuestionsCompleted } = useProgressStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Marca que el componente se está ejecutando en el cliente
    }, []);

    if (!isClient) {
        return null;
    }

    const isUnlocked = areAllQuestionsCompleted(lessonId, totalQuestions);

    if (!isUnlocked) {
        return (
            <div className="my-4 p-4 bg-gray-100 rounded opacity-50">
                <p className="text-center">Completa todas las preguntas para acceder al cuestionario final</p>
            </div>
        );
    }

    return (
        <div className="my-4 p-4 bg-green-100 rounded">
            <h3 className="text-lg font-bold mb-2">¡Felicitaciones! 🎉</h3>
            <p className="mb-3">Has completado todas las preguntas. Ahora puedes acceder al cuestionario final.</p>
            <a
                href={formsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Ir al cuestionario
            </a>
        </div>
    );
}