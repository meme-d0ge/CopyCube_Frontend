'use client'
import React, {useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {getPostApi, GetPostResponse} from "@/api/post/get-post-api";
import {userStore} from "@/store/userStore";
import {Post, TypePost} from "@/api/post/types/Post";
import axios from "axios";
import GreenMatteButton from "@/UI/Buttons/GreenMateButton/GreenMatteButton";
import TextArea from "@/UI/Inputs/TextArea/TextArea";
import TypeSelector from "@/UI/Selector/TypeSelector/TypeSelector";
import {SubmitHandler, useForm} from "react-hook-form";
import {patchPostApi, PatchPostResponse} from "@/api/post/patch-post-api";
const Page = () => {
    const userState = userStore(state => state)
    const pathname = usePathname().split('/post/');
    const { register, handleSubmit } = useForm();

    interface PatchPosts{
        body: string,
        type: string,
    }
    const {token} = userStore(state => state)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit:SubmitHandler<PatchPosts> = async (data) => {
        if (token && post && !isLoading){
            setIsLoading(true)
            const response = await patchPostApi({
                token: token.token,
                key: post.key,
                body: data.body,
                type: data.type as TypePost
            })
            if (response.code === 200){
                const responsePost = response as PatchPostResponse
                setSuccess('Updated successfully')
                router.push(`/post/${responsePost.post.key}`)
            } else {
                setError('Error updating post')
            }
            setIsLoading(false)
        }
    }

    const [post, setPost] = useState<Post>()
    const [loading, setLoading] = useState(true)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getPostApi({
                token: userState.token?.token ? userState.token.token : null,
                key: String(pathname[pathname.length - 1]),
            })
            if (response.code === 200) {
                const post = response as GetPostResponse
                const postData = await axios.get(post.post.body, {method: 'OPTIONS'})
                post.post.body = postData.data
                console.log(post.post)
                setPost(post.post)
                setLoading(false)
            } else if (response.code === 404) {
                console.log(response)
                setError('Post Not Found')
                setLoading(false)
            } else if (response.code === 403) {
                setError('Forbidden')
                setLoading(false)
            }
        }
        if (userState.initialized){
            fetchData()
        }
    }, [userState.initialized]);
    useEffect(() => {
        if (userState.profile?.username && userState.profile?.username === post?.profile?.username){
            setIsOwner(true)
        }
    }, [post]);
    if (loading) {
        return (
            <div className={'text-white'}>
                <span>Loading Post...</span>
            </div>
        );
    } else if (post && !error) {
        return (
            <main className={'bg-neutral-900'}>
                <div className={'px-[20px] md:px-[40px] xl:px-[80px] max-w-[1920px] mx-auto'}>
                    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-[20px] text-white mx-auto p-[35px] pt-[45px] bg-neutral-800 rounded-[10px]'}>
                        <TextArea disabled={true} className={'w-full'} defaultValue={post.title} nameField={'Title:'}></TextArea>
                        <TextArea {...register("body")} disabled={!isOwner} className={'min-h-[200px] w-full'} defaultValue={post.body} nameField={'Body:'}></TextArea>

                        <TypeSelector register={register} name={'type'} disabledOptions={{
                            public: !isOwner,
                            private: !isOwner,
                            link: !isOwner
                        }} selectOption={post.type}/>


                        {isOwner && (
                            <>
                                <span className={`text-h7 mx-auto font-m ${success ? 'text-green-600' : error ? 'text-red-600' : isLoading ? 'text-yellow-400' : ''}`}>{success ? success : error ? error : isLoading ? 'Loading...' : ''}</span>
                                <GreenMatteButton type={'submit'} className={'mt-[20px] w-[200px] !py-[15px] mx-auto bg-neutral-950'}>Update Post</GreenMatteButton>
                            </>
                        )}
                    </form>
                </div>
            </main>
        );} else {
        return (
            <div className={'text-white'}>
                <p>{error}</p>
            </div>
        )}
 };

    export default Page;