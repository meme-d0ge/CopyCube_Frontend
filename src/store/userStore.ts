'use client'
import {create} from "zustand/react";

export interface User {
    id: number;
    username: string;
    createDate: string;
    updateDate: string;
}
export interface Profile {
    username: string;
    displayName: string;
    description: string;
    avatar: string;
    createDate: string;
    updateDate: string;
}
export interface Token {
    token: string,
    iat: number,
    exp: number
}

export interface StoreState {
    user: User | null;
    loadingUser: boolean;
    errorUser: string | null;

    profile: Profile | null;
    loadingProfile: boolean;
    errorProfile: string | null;


    token: Token | null;
    loadingToken: boolean;
    errorToken: string | null;


    initialized: boolean;
    initialize: () => Promise<void>;
}

export const userStore = create<StoreState>()(
    (set, get) => ({
        user: null,
        loadingUser: false,
        errorUser: null,

        profile: null,
        loadingProfile: false,
        errorProfile: null,

        token: null,
        loadingToken: false,
        errorToken: null,

        initialized: false,
        initialize: async () => {

        }
    }));