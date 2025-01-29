'use client'
import {Post, TypePost} from "@/api/post/types/Post";
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface CreatePostRequest {
    token: string | null;
    title: string;
    body: string;
    type: TypePost;
}
export interface CreatePostResponse {
    code: number;
    post: Post;
}
export const createPostApi = async (request: CreatePostRequest): Promise<CreatePostResponse | ApiError> => {
    try {
        const headers = request.token ? {headers: {Authorization: `Bearer ${request.token}`}} : {};
        const response: AxiosResponse = await instance.post(`${ApiEndpoint.Post}`,
            {
                title: request.title,
                body: request.title,
                type: request.type,
            }, headers
        );
        return {
            code: response.status,
            post: response.data,
        };

    } catch (error) {
        return getErrorMessage(error);
    }
}