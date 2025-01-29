'use client'
import {Post, TypePost} from "@/api/post/types/Post";
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface PatchPostRequest {
    token: string;
    key: string;
    body: string | null;
    type: TypePost | null;
}
export interface PatchPostResponse {
    code: number;
    post: Post;
}
export const patchPostApi = async (request: PatchPostRequest): Promise<PatchPostResponse | ApiError> => {
    try {
        const {token, key, ...data} = request
        const newData = Object.fromEntries(Object.entries(data).filter(([value]) => value !== null))
        console.log(newData)

        const response: AxiosResponse = await instance.patch(`${ApiEndpoint.Post}/${key}`, {
            ...newData,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return {
            code: response.status,
            post: response.data,
        };
    } catch (error) {
        return getErrorMessage(error);
    }
}