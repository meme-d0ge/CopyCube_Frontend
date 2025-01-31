'use client'
import {create} from "zustand/react";
import {refreshApi, RefreshResponse} from "@/api/auth/refresh-api";
import {getProfileApi, GetProfileResponse} from "@/api/profile/get-profile-api";

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
    timeInitialized: number;
    initialize: () => Promise<void>;
}

export const userStore = create<StoreState>()(
    (set) => ({
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
        timeInitialized: 0,
        initialize: async () => {
            const timeStart = Date.now()
            set({
                loadingProfile: true,
                loadingToken: true,
            })
            const token = await refreshApi()
            if (token.code === 200) {
                const newToken = token as RefreshResponse
                const profile = await getProfileApi({
                    token: newToken.token.token,
                })
                if (profile.code === 200) {
                    const newProfile = profile as GetProfileResponse;
                    set({
                        token: newToken.token,
                        profile: newProfile.profile,
                    })
                } else {
                    set({
                        token: newToken.token,
                    })
                }
            }
            const timeEnd = Date.now()
            set({
                initialized: true,
                timeInitialized: (timeEnd - timeStart),
                loadingProfile: false,
                loadingToken: false,
            })
        }
    }));