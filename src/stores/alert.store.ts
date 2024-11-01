import { TAlert } from "@/types";
import { create } from "zustand";

type State = TAlert;
type Action = {
    showAlert: (state: Pick<State, "title" | "type" | "translationKey" | "rootTranslationKey">) => void;
    hideAlert: () => void;
};
const initialState: State = {
    show: false,
    title: '',
    type: "info"
}
const useAlertStore = create<State & Action>((set) => ({
    ...initialState,
    showAlert(state) {
        set(() => ({
            show: true,
            title: state.title,
            type: state.type,
            translationKey: state.translationKey,
            rootTranslationKey: state.rootTranslationKey
        }));
    },
    hideAlert() {
        set(() => ({
            ...initialState
        }));
    }
}));

export default useAlertStore;