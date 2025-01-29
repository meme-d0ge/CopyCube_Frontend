'use client'
import {Profile} from "@/store/userStore";
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";


export interface GetProfileRequest {
    token: string;
}
export interface GetProfileResponse {
    code: number;
    profile: Profile;
}

export const getProfileApi = async (request: GetProfileRequest): Promise<GetProfileResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.get(`${ApiEndpoint.Profile}`, {
            headers: {Authorization:`Bearer ${request.token}`},
        });
        return {
            code: response.status,
            profile: response.data,
        } as GetProfileResponse;
    } catch (error) {
        return getErrorMessage(error);
    }
};