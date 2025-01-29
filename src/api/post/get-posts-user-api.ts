'use client'
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {PostsUser} from "@/api/post/types/Post";
import {ApiEndpoint} from "@/api/api";

export interface GetPublicPostsRequest {
    token: string,
    limit: number;
    page: number;
}
export interface GetPublicPostsResponse {
    code: number;
    posts: PostsUser;
}
export const getPostsUserApi = async (request: GetPublicPostsRequest): Promise<GetPublicPostsResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.get(`${ApiEndpoint.UserPosts}`, {
            params: {
                limit: request.limit,
                page: request.page,
            },
            headers: {
                Authorization: `Bearer ${request.token}`,
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