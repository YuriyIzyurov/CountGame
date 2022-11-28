import {enableStaticRendering} from "mobx-react-lite";
import {BottlesGameStore} from "../store/store";
import React, {createContext, useContext} from "react";

enableStaticRendering(typeof window === "undefined");

let clientStore: BottlesGameStore;

export const BottlesGameContext = createContext<BottlesGameStore | null>(null);
BottlesGameContext.displayName = "BottlesGameContext"

export const useStore = () => {
    const data = useContext(BottlesGameContext);
    if (!data) {
        throw new Error("Using store outside of context");
    }
    return data;
};


/*export const useStore = <T>(context: React.Context<T | null>): T => {
    const data = useContext(context);
    if (!data) {
        throw new Error("Using store outside of context");
    }
    return data;
};*/
export const StoreProvider = ({children}) => {
    const store = initStore()
    return <BottlesGameContext.Provider value={store}>{children}</BottlesGameContext.Provider>
}

const initStore = (initData = null) => {
    const store = clientStore ?? new BottlesGameStore();
    if (initData) store.hydrate(initData);

    if (typeof window === "undefined") return store;
    if (!clientStore) clientStore = store;
    return store;
};








