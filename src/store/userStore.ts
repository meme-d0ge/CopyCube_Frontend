'use client'
import {create} from "zustand/react";
import {getProfileApi, GetProfileResponse} from "@/api/profile/get-profile-api";
import {refreshApi, RefreshResponse} from "@/api/auth/refresh-api";

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
    CreateDate: string;
    UpdateDate: string;
}
export interface Token {
    token: string,
    iat: number,
    exp: number
}

export interface setProfile{
    loadingProfile?: boolean;
    errorProfile?: string;
    profile?: Profile;
}
export interface setToken{
    loadingToken?: boolean;
    errorToken?: string;
    token?: Token;
}
export interface setUser{
    loadingUser?: boolean;
    errorUser?: string;
    user?: User;
}

export interface StoreState {
    user: User | null;
    loadingUser: boolean;
    errorUser: string | null;
    setUser: (profile: setUser) => void;

    profile: Profile | null;
    loadingProfile: boolean;
    errorProfile: string | null;
    setProfile: (profile: setProfile) => void;

    token: Token | null;
    loadingToken: boolean;
    errorToken: string | null;
    setToken: (token: setToken) => void;

    clearAll: () => void
    initialized: boolean;
    timeInitialized: number;
    initialize: () => Promise<void>;
}

export const userStore = create<StoreState>()(
    (set) => ({
        user: null,
        loadingUser: false,
        errorUser: null,
        setUser: (user: setUser) => set({
            ...user
        }),
////
        profile: null,
        loadingProfile: false,
        errorProfile: null,
        setProfile: (profile) => set({
            ...profile
        }),
////
        token: null,
        loadingToken: false,
        errorToken: null,
        setToken: (token) => set({
            ...token
        }),
////
        clearAll: () => {
            set({
                user: null,
                profile: null,
                token: null,
            })
        },
        initialized: false,
        timeInitialized: 0,
        initialize: async () => {
            const timeStart = Date.now()

            const responseRefresh = await refreshApi()
            if (responseRefresh.code === 200) {
                set({loadingProfile: true});
                const token = responseRefresh as RefreshResponse
                set({
                    token: token.token,
                })
                const response = await getProfileApi({
                    token: token.token.token,
                })
                if (response.code === 200) {
                    const profile = response as GetProfileResponse;
                    set({
                        profile: profile.profile
                    })
                }
                set({loadingProfile: false});
            }

            const timeEnd = Date.now()
            set({
                initialized: true,
                timeInitialized: (timeEnd - timeStart),
            })
        }
    }));