import {useEffect, useState} from 'react';
import useUserStore from "../../stores/userStore.js";
import InputName from "./InputName.jsx";

export default function GrettingName() {
    const {name, initializeStore} = useUserStore();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        initializeStore();
        setIsLoaded(true);
    }, []);

    return (
        <div className={`py-4 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {name ? (
                <>
                    <h2 className="m-0">Bienvenid@, <strong>{name}</strong> 👋</h2>
                    <a href="/lessons" className="btn mt-6 hover:text-white font-bold uppercase bg-blue-700 text-white w-full animate-bounce">
                         Comenzar... 🚀
                    </a>
                </>
            ) : (
                <div className="w-full text-center animate-fade-up my-5">
                    <h3 className="font-bold py-4">¿Cómo te llamas? 👀</h3>
                    <InputName/>
                </div>
            )
            }

            <hr className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-0 my-8"/>

        </div>
    )
        ;
};