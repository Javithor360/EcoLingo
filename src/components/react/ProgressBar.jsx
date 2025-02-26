import React, {useEffect, useState} from "react";
import useProgressStore from "../../stores/progressStore.js";

export default function ProgressBar({lessonId, totalQuestions = 0}) {
    // Progress store - suscribirse directamente al estado
    const {
        isQuestionCompleted,
        initializeStore,
        progress // Necesitamos suscribirnos a progress para detectar cambios
    } = useProgressStore();

    // Progreso de lectura basado en scroll
    const [readProgress, setReadProgress] = useState(0);
    // Progreso de lectura basado en preguntas
    const [questionProgress, setQuestionProgress] = useState(0);
    const [confiImage, setConfiImage] = useState('/images/confi/Simple1.png');

    useEffect(() => {
        initializeStore();

        // Función para calcular el progreso del scroll
        const calculateReadProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const readPercentage = (scrollTop / docHeight) * 100 + 2;
            setReadProgress(Math.min(readPercentage, 100));
        };

        // Agregar listener para el scroll
        window.addEventListener("scroll", calculateReadProgress);

        // Llamar inicialmente para establecer el valor cuando se monta el componente
        calculateReadProgress();

        // Limpieza del listener al desmontar
        return () => {
            window.removeEventListener("scroll", calculateReadProgress);
        };
    }, []);

    // Este useEffect ahora depende de 'progress' para ejecutarse cuando cambie el store
    useEffect(() => {
        let completedCount = 0;

        for (let i = 0; i < totalQuestions; i++) {
            if (isQuestionCompleted(lessonId, i)) {
                completedCount++;
            }
        }

        // Calculate percentage
        let percentage = (completedCount / (totalQuestions + 1)) * 100;
        setQuestionProgress(percentage);

        if(readProgress > 97 && completedCount === totalQuestions) {
          setQuestionProgress(100)
        }

        // Update Confi image based on progress
        if (percentage === 0) {
            setConfiImage("/images/confi/Simple1.png");
        } else if (percentage < 33.33) {
            setConfiImage("/images/confi/Happy1.png");
        } else if (percentage < 66.67) {
            setConfiImage("/images/confi/Happy2.png");
        } else if (percentage >= 66.67) {
            setConfiImage("/images/confi/Shout1.png");
        }
    }, [lessonId, totalQuestions, isQuestionCompleted, progress, readProgress]); // Añadir 'progress' como dependencia

    return (
        <div className="sticky bg-white rounded-2xl flex gap-4 w-11/12 mt-2 shadow mx-auto px-4 top-2.5 z-50">
            <div className="left-0 w-10/12 my-auto rounded-full h-2.5 bg-gray-300 ">
                {/* Progreso de lectura (gris) */}
                <div
                    className="top-0 left-0 h-2.5 bg-blue-300 rounded-full transition-all z-100"
                    style={{width: `${readProgress}%`}}
                />
                {/* Progreso de preguntas (azul más fuerte) */}
                <div
                    className="top-0 left-0 h-2.5 bg-blue-600 rounded-full transition-all -mt-2.5"
                    style={{width: `${questionProgress}%`}}
                />
            </div>

            <img width={40} className="my-auto py-2 " src={confiImage} alt="Palomita Blanca Confi"/>
        </div>
    );
}