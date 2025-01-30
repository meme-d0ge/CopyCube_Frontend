'use client'
import React, {useState} from "react";
import TextInput from "@/UI/Inputs/TextInput/TextInput";
import MatteButton from "@/UI/Buttons/MatteButton/MatteButton";
import {SubmitHandler, useForm} from "react-hook-form";
import {loginApi} from "@/api/auth/login-api";
import {ApiError} from "@/api/apiUtils";
import {userStore} from "@/store/userStore";
interface LoginData {
    username: string;
    password: string;
}
export default function LoginPage() {
    const {register, handleSubmit, setError, formState:{ errors }} = useForm<LoginData>({mode:'onTouched'})
    const {initialize} = userStore(state => state);
    const [success, setSuccess] = useState(false)
    const onSubmit:SubmitHandler<LoginData> = async (data) => {
        const response = await loginApi({
            username: data.username,
            password: data.password,
        })
        if (response.code === 201) {
            setSuccess(true)
            initialize()
        } else if (response.code === 400) {
            const responseError = response as ApiError
            setSuccess(false)
            setError('username', {
                type: 'text',
                message: responseError.message,
            })
        } else {
            setError('username', {
                type: 'text',
                message: 'Network Error',
            })
        }
    }
    return (
        <main className='px-[25px]'>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-[20px] justify-center items-center text-white'}>
                <h4 className={'text-h4 text-white font-m'}>Login</h4>
                <span className={`h-[30px] text-h7 transition-opacity: duration-500 font-m 
                    ${errors.username || errors.password?
                        `text-red-600 opacity-100`:success?
                        'text-green-600 opacity-100': 'opacity-0'
                    }`}>
                    {errors.username || errors.password?
                        errors.username?.message || errors.password?.message:
                            success?'Successful login':''
                    }
                </span>
                <TextInput {...register("username", { required: 'Username field is required' })} type={'text'} nameField={'Userame'}/>
                <TextInput {...register("password", { required: 'Password field is required' })} type={'password'} nameField={'Password'}/>
                <MatteButton type="submit" className={'mt-[20px] w-[150px]'}>Login</MatteButton>
            </form>
        </main>
    );
}
