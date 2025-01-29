'use client'
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface DeletePostRequest {
    token: string;
    key: string;
}
export interface DeletePostResponse {
    code: number;
    success: boolean;
}
export const deletePostApi = async (request: DeletePostRequest): Promise<DeletePostResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.delete(`${ApiEndpoint.Post}/${request.key}`, {
            headers: {Authorization: `Bearer ${request.token}`}
        });
        return {
            code: response.status,
            success: response.data.success,
        };

    } catch (error) {
        return getErrorMessage(error);
    }
}