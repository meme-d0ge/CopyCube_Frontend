'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Post} from "@/api/post/types/Post";
import Link from "next/link";
import {getPublicPostsApi, GetPublicPostsResponse} from "@/api/post/get-public-posts";
import Image from "next/image";

const ListPublicPosts = ({limit = 10}) => {
    const observerRef = useRef(null);
    const [countPosts, setCountPosts] = useState(10)
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

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
        <ul className={`flex flex-col text-h9 gap-y-[15px] text-white`}>
            {posts.map((post: Post) => {
                return (
                    <Link className={'break-all hover:text-lightGray w-full flex bg-neutral-900 py-[10px] px-[10px] rounded-[30px] items-center'} href={`/post/${post.key}`} key={post.key}>
                        <Image priority className={`rounded-[50%] border-[2px] relative border-neutral-950`} width={50} height={50}
                               src={post?.profile?.avatar ? post.profile.avatar : String(process.env.NEXT_PUBLIC_ANONYMOUS_AVATAR)}
                               alt={'avatar-owner'}/>
                        <span className={'mx-auto'}>{post.title}</span>
                    </Link>
                )
            })}
            {isLoading && <p>Loading more posts...</p>}
            <div className={`mx-auto text-h6 ${posts.length > 0 ? '' : 'mt-[10px]'}`}
                 ref={observerRef}>{posts.length > 0 ? '' : 'No have Post'}</div>
        </ul>
    );
};

export default ListPublicPosts;