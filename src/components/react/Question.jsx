import { useState, useEffect } from "react";
import getRandomMessage from "../../utils/getRandomMessage.js";
import useProgressStore from "../../stores/progressStore.js";


const getCorrectOptionIndex = (options) => {
    return options.findIndex(option => option.correct);
};

export default function Question({ lessonId, questionData }) {
    const { completeQuestion, isQuestionUnlocked, initializeStore, isQuestionCompleted } = useProgressStore();
    const [feedback, setFeedback] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        initializeStore();
        setIsLoaded(true);

        // Si la pregunta ya está completada, mostrar la respuesta correcta
        if (isQuestionCompleted(lessonId, questionData.id)) {
            const correctIndex = getCorrectOptionIndex(questionData.options);
            setSelectedOption(correctIndex);
            setFeedback('Ya respondiste esta pregunta correctamente. 🎉');
        }
    }, [lessonId, questionData.id, questionData.options]);

    const isUnlocked = isQuestionUnlocked(lessonId, questionData.id);

    const handleAnswer = (isCorrect, optionIndex) => {
        if (isCorrect) {
            setFeedback(getRandomMessage('correct'));
            completeQuestion(lessonId, questionData.id);
            setSelectedOption(optionIndex);
        } else {
            setFeedback(getRandomMessage('incorrect'));
        }
    };

    if (!isLoaded) {
        return (
            <div className="my-4 p-4 border rounded animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`my-4 p-4 border rounded transition-opacity duration-300 ${!isUnlocked ? 'opacity-50' : ''}`}>
            <h3 className="text-lg font-bold mb-3">{questionData.text}</h3>
            <div className="space-y-2">
                {questionData.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option.correct, index)}
                        className={`w-full p-2 text-left border rounded hover:bg-gray-100 ${
                            selectedOption === index ? 'bg-green-100 border-green-500' : ''
                        }`}
                        disabled={!isUnlocked || selectedOption !== null}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
            {feedback && (
                <p className="mt-3 text-center font-medium">{feedback}</p>
            )}
        </div>
    );
}