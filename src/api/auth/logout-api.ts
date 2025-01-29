'use client'
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface LogoutResponse {
    code: number;
    success: boolean;
}

export const logoutApi = async (): Promise<LogoutResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.delete(`${ApiEndpoint.LogoutAuth}`);
        return {
            code: response.status,
            success: response.data.success,
        } as LogoutResponse;
    } catch (error) {
        return getErrorMessage(error);
    }
};