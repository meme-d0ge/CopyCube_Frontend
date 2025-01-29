'use client'
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface DeleteUserRequest {
    token: string;
    password: string;
}
export interface DeleteUserResponse {
    success: boolean;
}

export const deleteUserApi = async (request: DeleteUserRequest): Promise<DeleteUserResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.delete(`${ApiEndpoint.User}`, {
            data:{password: request.password},
            headers: {
                Authorization: `Bearer ${request.token}`,
            },
        });
        return {
            success: response.data.success,
        } as DeleteUserResponse;
    } catch (error) {
        return getErrorMessage(error);
    }
};