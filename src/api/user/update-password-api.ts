'use client'
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface UpdatePasswordRequest {
    token: string;
    password: string;
    newPassword: string;
}
export interface UpdatePasswordResponse {
    success: boolean;
}

export const updatePasswordApi = async (request: UpdatePasswordRequest): Promise<UpdatePasswordResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.patch(`${ApiEndpoint.User}`,
            {password: request.password, newPassword: request.newPassword},
            {
                headers: {
                    Authorization: `Bearer ${request.token}`,
                },
            }
        );
        return {
            success: response.data.success,
        } as UpdatePasswordResponse;
    } catch (error) {
        return getErrorMessage(error);
    }
};