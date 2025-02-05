'use client'
import React, {useState} from 'react';
import TextArea from "@/UI/Inputs/TextArea/TextArea";
import TypeSelector from "@/UI/Selector/TypeSelector/TypeSelector";
import GreenMatteButton from "@/UI/Buttons/GreenMateButton/GreenMatteButton";
import {SubmitHandler, useForm} from "react-hook-form";
import {TypePost} from "@/api/post/types/Post";
import {userStore} from "@/store/userStore";
import {createPostApi, CreatePostResponse} from "@/api/post/create-post-api";
import {useRouter} from "next/navigation";
const Page = () => {
    interface CreatePost{
        title: string,
        body: string,
        type: TypePost,
    }
    const {token, profile} = userStore(state => state)
    const { register, handleSubmit, setError, formState:{ errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const router = useRouter()
    const onSubmit:SubmitHandler<CreatePost> = async (data) => {
        if (!isLoading){
            setIsLoading(true)
            const response = await createPostApi({
                token: token?.token ? token.token : '',
                title: data.title,
                body: data.body,
                type: data.type as TypePost
            })
            if (response.code === 201){
                const responsePost = response as CreatePostResponse
                setSuccess('Create successfully')
                console.log(responsePost)
                router.push(`/post/${responsePost.post.key}`)
            } else {
                setError('title', {
                    type: 'text',
                    message: 'Network Error',
                })
            }
            setIsLoading(false)
        }
    }

    return (
        <main className={'bg-neutral-900'}>
            <div className={'px-[20px] md:px-[40px] xl:px-[80px] max-w-[1920px] mx-auto'}>
                <form onSubmit={handleSubmit(onSubmit)}
                      className={'flex flex-col gap-[20px] text-white mx-auto p-[35px] pt-[45px] bg-neutral-800 rounded-[10px]'}>
                    <span className={'mx-auto text-white text-h3'}>Created Post</span>
                    <TextArea {...register("title", {required: 'Title field is required'})} className={'w-full'}
                              nameField={'Title:'}></TextArea>
                    <TextArea {...register("body", {required: 'Body field is required'})}
                              className={'min-h-[200px] w-full'} nameField={'Body:'}></TextArea>
                    <TypeSelector register={register} name={'type'} required={'Type field is required'}
                                  disabledOptions={{
                                      public: false,
                                      private: !profile,
                                      link: false
                                  }} selectOption={'none'}/>
                    <span className={`text-h7 mx-auto font-m duration-500 h-[30px] ${success ? 'text-green-600' : errors.title || errors.body || errors.type ? 'text-red-600' : isLoading ? 'text-yellow-400 opacity-100' : ''}`}>
                        {errors.title ? String(errors.title?.message) : errors.body ? String(errors.body?.message) : errors.type ? String(errors.type?.message) : success ? 'Success create Post' : isLoading ? 'Сreating...' : ''}
                    </span>
                    <GreenMatteButton type={'submit'}
                                      className={'mt-[20px] w-[200px] !py-[15px] mx-auto bg-neutral-950'}>Create</GreenMatteButton>
                </form>
            </div>
        </main>
    );
};

export default Page;