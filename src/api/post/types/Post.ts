import {ProfileUser} from "@/api/profile/types/ProfileUser";

export interface Post {
    key: string,
    body: string,
    type: TypePost,
    profile: ProfileUser | null,
    created: string,
    updated: string,
}
export interface PostWithoutProfile {
    key: string,
    body: string,
    type: TypePost,
    created: string,
    updated: string,
}

export interface PublicPosts {
    total: number,
    page: number,
    limit: number,
    posts: Post[];
}
export interface PostsUser{
    total: number,
    page: number,
    limit: number,
    posts: PostWithoutProfile[];
}
export enum TypePost {
    private = "private",
    public = "public",
    link = "link",
}
