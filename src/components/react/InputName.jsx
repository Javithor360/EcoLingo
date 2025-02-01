import {Icon} from "@iconify/react";
import {useForm} from "react-hook-form";
import useUserStore from "../../stores/userStore.js";

const nameValidations = {
    required: "Tu nombre es requerido",
    minLength: {
        value: 4,
        message: "Coloca nombre y apellido"
    },
    pattern: {
        value: /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)$/,
        message: "Ingresa: Primer nombre y primer apellido."
    }
};


export default function InputName({ onNameSubmit = null }) {
    const {setName} = useUserStore();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            fullName: ''
        }
    });

    const onSubmit = (data) => {
        setName(data.fullName);
        if (onNameSubmit) onNameSubmit();
    };

    return (
        <form className="flex md:flex-nowrap flex-wrap gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full">
                <input
                    {...register("fullName", nameValidations)}
                    placeholder="Tu nombre y apellido aquí"
                    className={`input flex-grow p-2 border rounded ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    autoComplete="off"
                />
                {errors.fullName && (
                    <span className=" text-center md:text-left text-red-500 text-sm mt-4">
                        {errors.fullName.message}
                    </span>
                )}
            </div>

            <button
                className="btn px-4 w-full md:w-auto bg-blue-600 text-white hover:bg-blue-700 transition-colors p-2 rounded flex items-center justify-center gap-2"
                type="submit"
            >
                <span className="md:hidden block">Guardar</span>
                <Icon icon="material-symbols:save-as" width="24" height="24"/>
            </button>
        </form>
    );
}