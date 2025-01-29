'use client'
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {PublicPosts} from "@/api/post/types/Post";
import {ApiEndpoint} from "@/api/api";

export interface GetPublicPostsRequest {
    limit: number;
    page: number;
}
export interface GetPublicPostsResponse {
    code: number;
    posts: PublicPosts;
}
export const getPublicPostsApi = async (request: GetPublicPostsRequest): Promise<GetPublicPostsResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.get(`${ApiEndpoint.PublicPosts}`, {
            params: {
                limit: request.limit,
                page: request.page,
            }
        });
        return {
            code: response.status,
            posts: response.data,
        };
    } catch (error) {
        return getErrorMessage(error);
    }
}