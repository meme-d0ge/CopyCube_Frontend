'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Post} from "@/api/post/types/Post";
import {getPublicPostsApi, GetPublicPostsResponse} from "@/api/post/get-public-posts";
import Image from "next/image";
import ListItems from "@/components/ListItems/ListItems";
import {useRouter} from "next/navigation";

const ListPublicPosts = ({limit = 10}) => {
    const observerRef = useRef(null);
    const [countPosts, setCountPosts] = useState(10)
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const LoadPosts = async () => {
        if (!isLoading) {
            setIsLoading(true);
            const response = await getPublicPostsApi({
                limit: limit,
                page: page,
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
        }
        setIsLoading(false);
    }
    const observer = new IntersectionObserver(
        async ([entry]) => {
            if (entry.isIntersecting && countPosts/10 >= page - 1) {
                await LoadPosts();
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
        <>
            <ListItems classNameItem={'text-white hover:text-lightGray'} items={[
                ...(posts.map((post: Post) => {
                    return (
                        {
                            key: post.key,
                            keyData: post.profile?.username ?
                                <div onClick={(event) => {
                                    event.stopPropagation()
                                    router.push(`/profile/${post.profile?.username}`)
                                }}
                                     className={'bg-neutral-950 px-[10px] py-[5px] rounded-[10px] hover:opacity-75 sm:max-w-[250px] flex flex-row items-center gap-x-[10px]'}>
                                    <Image priority className={`rounded-[50%]`} width={50} height={50}
                                           src={post?.profile?.avatar ? post.profile.avatar : String(process.env.NEXT_PUBLIC_DEFAULT_AVATAR)}
                                           alt={'avatar-owner'}
                                    />
                                    <span className={'break-all'}>{post.profile.displayName}</span>
                                </div> : post.profile?.deleted ?
                                    <div
                                        className={'bg-neutral-950 px-[10px] py-[5px] rounded-[10px] sm:max-w-[250px] flex flex-row items-center gap-x-[10px]'}>
                                        <Image priority
                                               className={`rounded-[50%] border-[2px] relative border-neutral-950 grayscale`}
                                               width={50} height={50}
                                               src={post?.profile?.avatar ? post.profile.avatar : String(process.env.NEXT_PUBLIC_DEFAULT_AVATAR)}
                                               alt={'avatar-owner'}/>
                                        <span className={'line-through break-all'}>{post.profile.displayName}</span>
                                    </div> :
                                    <div
                                        className={'bg-neutral-950 px-[10px] py-[5px] rounded-[10px] sm:max-w-[250px] flex flex-row items-center gap-x-[10px]'}>
                                        <Image priority
                                               className={`rounded-[50%] border-[2px] relative border-neutral-950`}
                                               width={50} height={50}
                                               src={String(process.env.NEXT_PUBLIC_ANONYMOUS_AVATAR)}
                                               alt={'avatar-owner'}/>
                                        <span
                                            className={'break-all'}>{post.profile?.displayName ? '' : 'Anonymous'}</span>
                                    </div>,
                            keyCustom: {
                                className: 'break-all mt-[10px] sm:mt-[0] bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-t-[20px]  sm:rounded-l-[20px] sm:rounded-r-[0] cursor-pointer',
                                onClick: () => {
                                    router.push(`/post/${post.key}`)
                                }
                            },

                            valueData: <span className={'break-all'}>{post.title}</span>,
                            valueCustom: {
                                className: 'break-all bg-neutral-900 sm:py-[7.5px] py-[15px] pl-[15px] pr-[10px] rounded-b-[20px] sm:rounded-r-[20px] sm:rounded-l-[0] cursor-pointer  flex flex-row justify-center items-center',
                                onClick: () => {
                                    router.push(`/post/${post.key}`)
                                }
                            }
                        }
                    );
                }))
            ]}/>
            {isLoading && <p>Loading more posts...</p>}
            <div className={`mx-auto text-h6 ${posts.length > 0 ? '' : 'mt-[10px]'}`}
                 ref={observerRef}>{posts.length > 0 ? '' : 'No have Post'}</div>
        </>
    );
};

export default ListPublicPosts;