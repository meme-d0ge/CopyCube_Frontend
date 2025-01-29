'use client'

import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ProfileUser} from "@/api/profile/types/ProfileUser";
import {ApiEndpoint} from "@/api/api";

export interface GetProfileByUsernameRequest {
    username: string;
}
export interface GetProfileByUsernameResponse {
    code: number;
    profile: ProfileUser;
}

export const getProfileByUsernameApi = async (request: GetProfileByUsernameRequest): Promise<GetProfileByUsernameResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.get(`${ApiEndpoint.Profile}/${request.username}`);
        return {
            code: response.status,
            profile: response.data,
        } as GetProfileByUsernameResponse;
    } catch (error) {
        return getErrorMessage(error);
    }
};