import {enableStaticRendering} from "mobx-react-lite";
import {NumbersGameStore} from "../store/store";
import React, {createContext, useContext} from "react";

enableStaticRendering(typeof window === "undefined");

let clientStore: NumbersGameStore;

export const NumbersGameContext = createContext<NumbersGameStore | null>(null);
NumbersGameContext.displayName = "NumbersGameContext"

export const useStore = () => {
    const data = useContext(NumbersGameContext);
    if (!data) {
        throw new Error("Using store outside of context");
    }
    return data;
};

export const StoreProvider = ({children}) => {
    const store = initStore()
    return <NumbersGameContext.Provider value={store}>{children}</NumbersGameContext.Provider>
}

const initStore = (initData = null) => {
    const store = clientStore ?? new NumbersGameStore();
    if (initData) store.hydrate(initData);

    if (typeof window === "undefined") return store;
    if (!clientStore) clientStore = store;
    return store;
};








