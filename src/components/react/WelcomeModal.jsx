// components/react/WelcomeModal.jsx
import {useEffect, useState} from 'react';
import useUserStore from "../../stores/userStore.js";
import InputName from "./InputName.jsx";

export default function WelcomeModal() {
    const { initializeStore } = useUserStore();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        initializeStore();
        if (!localStorage.getItem("userName")) {
            setShowModal(true);
        }
    }, []);

    const handleNameSubmit = () => {
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h2 className="text-2xl font-bold text-center mb-4">¡Bienvenid@!</h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Antes de continuar... Dinos, cómo te llamas? 🤔
                </p>

                <InputName onNameSubmit={handleNameSubmit} />

                <hr className="mt-4 mb-4" />

                <a
                    href="/"
                    className="w-full btn px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    Volver a Inicio
                </a>

            </div>
        </div>
    );
}