import { create } from "zustand";

type State = { show: boolean };

type Action = {
    showAlert: () => void;
    hideAlert: () => void;
};
const initialState: State = {
    show: false,

}
const usePendingAlertStore = create<State & Action>((set) => ({
    ...initialState,
    showAlert() {
        set(() => ({
            show: true,
        }));
    },
    hideAlert() {
        set(() => ({
            ...initialState
        }));
    }
}));

export default usePendingAlertStore;