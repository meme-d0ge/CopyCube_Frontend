'use client'
import {PostsUser} from "@/api/post/types/Post";
import {ApiError, getErrorMessage} from "@/api/apiUtils";
import {AxiosResponse} from "axios";
import {instance} from "@/api/axios";
import {ApiEndpoint} from "@/api/api";

export interface GetPublicPostsRequest {
    username: string;
    limit: number;
    page: number;
}
export interface GetPublicPostsResponse {
    code: number;
    posts: PostsUser;
}
export const getPostsUserByUsernameApi = async (request: GetPublicPostsRequest): Promise<GetPublicPostsResponse | ApiError> => {
    try {
        const response: AxiosResponse = await instance.get(`${ApiEndpoint.UserPosts}/${request.username}`, {
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