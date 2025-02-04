'use client'
import React, {useEffect, useRef, useState} from 'react';
import {PostWithoutProfile} from "@/api/post/types/Post";
import {GetPostsResponse, getPostsUserApi} from "@/api/post/get-posts-user-api";
import {userStore} from "@/store/userStore";
import {getPostsUserByUsernameApi, GetPublicPostsResponse} from "@/api/post/get-posts-user-by-username-api";
import ListItems from "@/components/ListItems/ListItems";
import {useRouter} from "next/navigation";
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
    const router = useRouter();

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
            if (entry.isIntersecting && countPosts/10 >= page - 1) {
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
            <ListItems className={'!grid-cols-[auto, 100px]'} items={[
                ...(posts.map((post: PostWithoutProfile, index: number) => {
                        return ({
                            key: post.key,
                            keyData: `${index+1}) ${post.title}`,
                            keyCustom: {
                                className: 'break-all mt-[10px] sm:mt-[0] bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-t-[20px]  sm:rounded-l-[20px] sm:rounded-r-[0] cursor-pointer',
                                onClick: () => {
                                    router.push(`/post/${post.key}`)
                                }
                            },
                            valueData: post.type,
                            valueCustom:{
                                className: 'break-all bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-b-[20px] sm:rounded-r-[20px] sm:rounded-l-[0] cursor-pointer text-end',
                                onClick: () => {
                                    router.push(`/post/${post.key}`)
                                }
                            }
                        });
                    }))
            ]}/>
            {isLoading && <p>Loading more posts...</p>}
            <div className={`mx-auto text-h6 ${posts.length > 0 ? '' : 'mt-[10px]'}`} ref={observerRef}>{posts.length > 0 ? '' : 'No have Post'}</div>
        </ul>
    );
};

export default ListPosts;