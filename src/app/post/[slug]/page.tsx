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
import FireflyLoader from "@/UI/Loaders/FireflyLoader/FireflyLoader";
const Page = () => {
    const userState = userStore(state => state)
    const pathname = usePathname().split('/post/');
    const { register, handleSubmit, setError, formState:{ errors } } = useForm<PatchPosts>();

    interface PatchPosts{
        body: string,
        type: string,
    }
    const {token} = userStore(state => state)
    const [success, setSuccess] = useState('')
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
                setError('body', {
                    type: 'text',
                    message: 'Error updating post',
                })
            }
            setIsLoading(false)
        }
    }


    const [errorStatus, setErrorStatus] = useState(0)
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
                setPost(post.post)
                setLoading(false)
            } else if (response.code === 404) {
                setErrorStatus(404)

                setLoading(false)
            } else if (response.code === 403) {
                setErrorStatus(403)
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
            <div className={'text-white absolute top-0 bottom-0 left-0 right-0 h-screen flex flex-col justify-center items-center gap-y-[30px]'}>
                <FireflyLoader></FireflyLoader>
                <span className={'text-yellow-400 font-b'}>Loading...</span>
            </div>
        );
    } else if (post) {
        return (
            <main className={'bg-neutral-900'}>
                <div className={'px-[20px] md:px-[40px] xl:px-[80px] max-w-[1920px] mx-auto'}>
                    <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-[20px] text-white mx-auto p-[35px] pt-[45px] bg-neutral-800 rounded-[10px]'}>
                        <TextArea disabled={true} className={'w-full'} defaultValue={post.title} nameField={'Title:'}></TextArea>
                        <TextArea {...register("body", {required:'Body field is required'})} disabled={!isOwner} className={'min-h-[200px] w-full'} defaultValue={post.body} nameField={'Body:'}></TextArea>

                        <TypeSelector register={register} name={'type'} required={'Type field is required'} disabledOptions={{
                            public: !isOwner,
                            private: !isOwner,
                            link: !isOwner
                        }} selectOption={post.type}/>
                        {isOwner && (
                            <>
                                <span className={`text-h7 mx-auto font-m duration-500 h-[30px] ${success ? 'text-green-600' : errors.body || errors.type ? 'text-red-600' : isLoading ? 'text-yellow-400 opacity-100' : ''}`}>
                                    {errors.body ? String(errors.body?.message) : errors.type ? String(errors.type?.message) : success ? 'Success update Post' : isLoading ? '' : ''}
                                </span>
                                <GreenMatteButton type={'submit'}
                                                  className={'mt-[20px] w-[200px] !py-[15px] mx-auto bg-neutral-950'}>Update
                                    Post</GreenMatteButton>
                            </>
                        )}
                    </form>
                </div>
            </main>
        );
    } else if (errorStatus === 404) {
        return (
            <div className={'sm:text-h3 text-h5 text-white absolute top-0 bottom-0 left-0 right-0 h-screen flex flex-col justify-center items-center'}>
                <p className={'text-red-600 font-b'}>Post not Found</p>
            </div>
        )
    } else if (errorStatus === 403) {
        return (
            <div className={'sm:text-h3 text-h5 text-white absolute top-0 bottom-0 left-0 right-0 h-screen flex flex-col justify-center items-center'}>
                <p className={'text-red-600 font-b'}>Forbidden</p>
            </div>
        )
    }
};

export default Page;