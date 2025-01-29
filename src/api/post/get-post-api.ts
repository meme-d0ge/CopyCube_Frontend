'use client'
import {Post} from "@/api/post/types/Post";
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface GetPostRequest {
    token: string | null;
    key: string;
}
export interface GetPostResponse {
    code: number;
    post: Post;
}
export const getPostApi = async (request: GetPostRequest): Promise<GetPostResponse | ApiError> => {
    try {
        const headers = request.token ? {headers: {Authorization: `Bearer ${request.token}`}} : {};
        const response: AxiosResponse = await instance.get(`${ApiEndpoint.Post}/${request.key}`, headers);
        return {
            code: response.status,
            post: response.data,
        };
    } catch (error) {
        return getErrorMessage(error);
    }
}