import { LabResult } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PdfState {
    selected: LabResult | null;
    setSelected: (value: LabResult) => void;
    clearSelected: () => void;
}

export const usePdfStore = create<PdfState>()(
    persist(
        (set) => ({
            selected: null,
            setSelected: (value) => set({selected: value}),
            clearSelected: () => set({selected: null})
        })
    ,{
        name: 'pdf',
        storage: createJSONStorage(() => localStorage)
    })
)
