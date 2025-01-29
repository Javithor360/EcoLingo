import {create} from 'zustand'

const useUserStore = create((set) => ({
    name: "",

    initializeStore: () => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            set({ name: storedName });
        }
    },

    setName: (name) => {
        localStorage.setItem('userName', name);
        set({ name });
    }
}))

export default useUserStore;