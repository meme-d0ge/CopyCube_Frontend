'use client'
import { instance } from "@/api/axios";
import { AxiosResponse } from "axios";
import { User } from "@/store/userStore";
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {ApiEndpoint} from "@/api/api";

export interface RegisterRequest {
    username: string;
    password: string;
    displayName: string;
}
export interface RegisterResponse {
    code: number;
    user: User;
}

export const registerApi = async (request: RegisterRequest): Promise<RegisterResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.post(`${ApiEndpoint.User}`, {
            username: request.username,
            password: request.password,
            displayName: request.displayName,
        });
        return {
            code: response.status,
            user: response.data,
        } as RegisterResponse;
    } catch (error) {
        return getErrorMessage(error);
    }
};