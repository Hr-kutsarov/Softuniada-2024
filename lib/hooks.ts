import { create } from 'zustand';

// login/register/recover forms into one component, conditionally rendered with this hook

interface prioritySwitcherProps {
    state: string;
    step: string;
    setLogin: () => void;
    setRegister: () => void;
    setRecover: () => void;
    setStep: (el: string) => void;
}

export const authStateHandler = create<prioritySwitcherProps>((set) => ({
    state: 'login',
    step: '1',
    setLogin: () => set({ state: 'login'}),
    setRegister: () => set({ state: 'register'}),
    setRecover: () => set({ state: 'recover'}),
    setStep: ( el ) => set({ step: el })
})
)

