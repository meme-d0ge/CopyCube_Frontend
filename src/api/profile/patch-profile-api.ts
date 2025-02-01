'use client'

import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface PatchProfileRequest {
    token: string;
    avatar: File | null;
    displayName: string | null;
    description: string | null;
}
export interface PatchProfileResponse {
    code: number;
    success: true;
}

export const patchProfileApi = async (request: PatchProfileRequest): Promise<PatchProfileResponse | ApiError> => {
    try {
        const formData = new FormData();
        if (request.avatar){
            formData.append("avatar", request.avatar);
        }
        if (request.displayName) {
            formData.append("displayName", request.displayName);
        }
        if (request.description) {
            formData.append("description", request.description);
        }

        const response: AxiosResponse = await instance.patch(`${ApiEndpoint.Profile}`, formData, {
            headers: {
                Authorization:`Bearer ${request.token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return {
            code: response.status,
            success: response.data.success,
        } as PatchProfileResponse;
    } catch (error) {
        return getErrorMessage(error);
    }
};