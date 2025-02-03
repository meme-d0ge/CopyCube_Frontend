'use client'
import axios from "axios";
import {userStore} from "@/store/userStore";
import {refreshApi, RefreshResponse} from "@/api/auth/refresh-api";
export const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});
instance.interceptors.response.use(
    async (response) => {
        // console.log(response)
        return Promise.resolve(response);
    },
    async (error) => {
        // console.log(error);
        const originalRequest = error.config;
        const userState = userStore.getState

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            userState().setToken({loadingToken: true});
            const response = await refreshApi()
            if (response.code === 200){
                const newToken = response as RefreshResponse
                userState().setToken({token: newToken.token});
                originalRequest.headers['Authorization'] = `Bearer ${newToken.token.token}`;
                return axios(originalRequest)
            } else if (response.code === 403) {
                userState().clearAll()
            }
            userState().setToken({loadingToken: false});
        } else if (error.response.status === 403) {
            userState().clearAll()
        }

        return Promise.reject(error);
    }
);
