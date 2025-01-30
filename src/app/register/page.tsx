'use client'
import React, {useState} from 'react';
import TextInput from "@/UI/Inputs/TextInput/TextInput";
import MatteButton from "@/UI/Buttons/MatteButton/MatteButton";
import {SubmitHandler, useForm} from "react-hook-form";
import {ApiError} from "@/api/apiUtils";
import {registerApi} from "@/api/user/register-user-api";

interface RegistrationData {
    displayName: string;
    username: string;
    password: string;
}
const RegisterPage = () => {
    const {register, handleSubmit, setError, formState:{ errors }} = useForm<RegistrationData>({
        mode: 'onBlur',
    })
    const [success, setSuccess] = useState(false)
    const onSubmit:SubmitHandler<RegistrationData> = async (data) => {
        const response = await registerApi({
            username: data.username,
            displayName: data.displayName,
            password: data.password,
        })
        if (response.code === 201) {
            setSuccess(true)
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
            <form onSubmit={handleSubmit(onSubmit)}
                  className={'flex flex-col gap-y-[20px] justify-center items-center'}>
                <h4 className={'text-h4 text-white font-m'}>Registration</h4>

                <span className={`h-[30px] text-h7 transition-opacity: duration-500 font-m 
                    ${errors.displayName || errors.username || errors.password ?
                    `text-red-600 opacity-100` : success ?
                        'text-green-600 opacity-100' : 'opacity-0'
                }`}>
                    {errors.displayName || errors.username || errors.password ?
                        errors.displayName?.message || errors.username?.message || errors.password?.message:
                        success ? 'Successful registration' : ''
                    }
                </span>

                <TextInput {...register("displayName", {required: 'Display name field is required'})} type={'text'} nameField={'Display name'}/>
                <TextInput {...register("username", {required: 'Username is required'})} type={'text'} nameField={'Userame'}/>
                <TextInput {...register("password", {required: 'Password field is required'})} type={'password'} nameField={'Password'}/>
                <MatteButton type='submit' className={'mt-[10px] w-[150px]'}>Registry</MatteButton>
            </form>
        </main>
    );
};

export default RegisterPage;