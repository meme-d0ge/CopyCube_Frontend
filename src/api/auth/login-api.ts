'use client'
import {Token, User} from "@/store/userStore";
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    code: number;
    user: User;
    token: Token
}

export const loginApi = async (request: LoginRequest): Promise<LoginResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.post(`${ApiEndpoint.LoginAuth}`, {
            username: request.username,
            password: request.password,
        });
        return {
            code: response.status,
            user: response.data.user,
            token: response.data.accessToken,
        } as LoginResponse;
    } catch (error) {
        return getErrorMessage(error);
    }
};