'use client'
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {Token} from "@/store/userStore";
import {ApiEndpoint} from "@/api/api";

export interface RefreshResponse {
    code: number;
    token: Token;
}

export const refreshApi = async (): Promise<RefreshResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.get(`${ApiEndpoint.RefreshAuth}`);
        return {
            code: response.status,
            token: response.data,
        } as RefreshResponse;
    } catch (error) {
        return getErrorMessage(error);
    }
};