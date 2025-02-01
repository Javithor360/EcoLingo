import {useState, useEffect} from "react";
import useProgressStore from "../../stores/progressStore.js";

const feedbackMessages = {
    correct: ['¡Excelente! 🎉', '¡Buen trabajo! 👍', '¡Correcto! 🎯'],
    incorrect: ['Intenta de nuevo... 😢', 'Sigue intentándolo 💪', 'Casi lo logras 🧐'],
};

const getRandomMessage = (type) => {
    const messages = feedbackMessages[type];
    return messages[Math.floor(Math.random() * messages.length)];
};

export default function Question({lessonId, questionData}) {
    const {completeQuestion, isQuestionUnlocked, initializeStore, getSelectedAnswer} = useProgressStore();
    const [feedback, setFeedback] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isStoreInitialized, setIsStoreInitialized] = useState(false);

    useEffect(() => {
        initializeStore(); // Initialize the store
        setIsLoaded(true); // Set the component as loaded
    }, []);

    useEffect(() => {
        // Get previus selected answer
        const savedAnswer = getSelectedAnswer(lessonId, questionData.id);
        if (savedAnswer !== null) {
            setSelectedOption(savedAnswer);
            setFeedback('Ya respondiste esta pregunta correctamente. 🎉');
        }
    }, [isStoreInitialized, lessonId, questionData.id, getSelectedAnswer]);


    const isUnlocked = isQuestionUnlocked(lessonId, questionData.id);

    const handleAnswer = (isCorrect, optionIndex) => {
        if (isCorrect) {
            setFeedback(getRandomMessage('correct'));
            completeQuestion(lessonId, questionData.id, optionIndex);
            setSelectedOption(optionIndex);
        } else {
            setFeedback(getRandomMessage('incorrect'));
        }
    };

    // Mostrar un skeleton loader mientras se carga el estado
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
};