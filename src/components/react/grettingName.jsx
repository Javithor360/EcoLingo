import { useEffect, useState } from 'react';
import useUserStore from "../../stores/userStore.js";

export default function GrettingName() {
    const {name, setName, initializeStore} = useUserStore();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        initializeStore();
        setIsLoaded(true);
    }, []);

    return (
        <div className={`p-4 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {name ? (
                <h1 className="m-0">Bienvenido, <strong>{name}</strong> 👋</h1>
            ) : (
                <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    onBlur={(e) => setName(e.target.value)}
                    className="p-2 border rounded"
                />
            )}
        </div>
    );
};