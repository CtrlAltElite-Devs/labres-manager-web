import { create } from "zustand"

interface GlobalState {
    hasTestResults: boolean,
    setHasTestResults: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()(
    (set) => ({
        hasTestResults: false,
        setHasTestResults: (value) => set({hasTestResults: value})
    })
)