import { ICartItem } from "./cart";

export type ICallback = () => void;

export interface IStore {
    cart: Array<ICartItem>;
    callbacks: Array<ICallback>;
    getInstance: () => IStore;
    triggerCallbacks: () => void;
    getCart: () => Array<ICartItem>;
    sync: () => void;
    find: (id: number) => ICartItem | undefined;
    add: (cartItem: ICartItem) => void;
    increase: (id : number, qty: number) => void;
    reduce: (id : number) => void;
    remove: (id: number) => void;
    empty: () => void;
    getCount: () => number;
    registerCallback: (fn: () => void) => void;
}

