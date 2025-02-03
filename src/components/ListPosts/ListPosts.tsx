'use client'
import React, {useEffect, useRef, useState} from 'react';
import {PostWithoutProfile} from "@/api/post/types/Post";
import Link from "next/link";
import {GetPostsResponse, getPostsUserApi} from "@/api/post/get-posts-user-api";
import {userStore} from "@/store/userStore";
import {getPostsUserByUsernameApi, GetPublicPostsResponse} from "@/api/post/get-posts-user-by-username-api";
interface ListPostsProps {
    username?: string;
    limit?: number;
}
const ListPosts = ({username, limit = 10}: ListPostsProps) => {
    const {token} = userStore(state => state);
    const observerRef = useRef(null);

    const [countPosts, setCountPosts] = useState(10)
    const [posts, setPosts] = useState<PostWithoutProfile[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const LoadPosts = async () => {
        if (!isLoading) {
            setIsLoading(true);
            if (username){
                const response = await getPostsUserByUsernameApi({
                    limit: limit,
                    page: page,
                    username: username
                })
                if (response.code === 200) {
                    const newPosts = response as GetPublicPostsResponse
                    setPosts([
                        ...posts,
                        ...newPosts.posts.posts,
                    ])
                    setCountPosts(newPosts.posts.total)
                    setPage(page + 1)
                }
            } else if (token?.token){
                const response = await getPostsUserApi({
                    token: token?.token,
                    limit: limit,
                    page: page,
                })
                if (response.code === 200) {
                    const newPosts = response as GetPostsResponse
                    setPosts([
                        ...posts,
                        ...newPosts.posts.posts,
                    ])
                    setCountPosts(newPosts.posts.total)
                    setPage(page + 1)
                }
            }
            setIsLoading(false);
        }
    }

    const observer = new IntersectionObserver(
        async ([entry]) => {
            if (entry.isIntersecting && countPosts/10 >= page) {
                await LoadPosts();
                console.log(posts)
            }
        },
    );
    useEffect(() => {
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [countPosts, page, posts]);

    return (
        <ul className={`flex flex-col text-h9 gap-y-[5px] text-white`}>
            {posts.map((post: PostWithoutProfile, index: number) => {
                return (
                    <Link className={'break-all hover:text-lightGray w-full flex justify-between bg-neutral-900 py-[5px] px-[10px] rounded-[30px]'} href={`/post/${post.key}`} key={post.key}><span>{index+1}) {post.title}</span><span className={'text-nowrap'}>{post.type}</span></Link>
                )
            })}
            {isLoading && <p>Loading more posts...</p>}
            <div className={`mx-auto text-h6 ${posts.length > 0 ? '' : 'mt-[10px]'}`} ref={observerRef}>{posts.length > 0 ? '': 'No have Post'}</div>
        </ul>
    );
};

export default ListPosts;