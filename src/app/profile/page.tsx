'use client'
import React, {useEffect, useState} from 'react';
import {userStore} from "@/store/userStore";
import Image from "next/image";
import {useRouter} from "next/navigation";
import BlueMatteButton from "@/UI/Buttons/BlueMatteButton/BlueMatteButton";
import ExitButton from "@/UI/Buttons/ExitButton/ExitButton";
import ListItems from "@/components/ListItems/ListItems";
import {logoutApi} from "@/api/auth/logout-api";
import GreenMatteButton from "@/UI/Buttons/GreenMateButton/GreenMatteButton";
import TextInput from "@/UI/Inputs/TextInput/TextInput";
import TextArea from "@/UI/Inputs/TextArea/TextArea";
import {SubmitHandler, useForm} from "react-hook-form";
import {ApiError} from "@/api/apiUtils";
import {patchProfileApi} from "@/api/profile/patch-profile-api";
import {getProfileApi, GetProfileResponse} from "@/api/profile/get-profile-api";
import ListPosts from "@/components/ListPosts/ListPosts";

interface UpdateProfileData {
    displayName: string;
    description: string;
    avatar: FileList;
}
const ProfilePage = () => {
    const {profile, loadingProfile, setProfile, initialized, clearAll} = userStore(state => state);
    const {token} = userStore(state => state);

    const {register, handleSubmit} = useForm<UpdateProfileData>({mode:'onSubmit'})
    const router = useRouter()
    
    const [exitSuccess, setExitSuccess] = useState('')
    const [exitError, setExitError] = useState('')

    const [editSuccess, setEditSuccess] = useState('')
    const [editError, setEditError] = useState('')

    const [modeEditor, setModeEditor] = useState(false)
    const [fileUrl, setFileUrl] = useState('');

    const [openList, setOpenList] = useState(false)

    const Exit = async ()=>{
        const response = await logoutApi()
        if (response.code === 200){
            setExitSuccess('Successfully logout')
            setTimeout(()=>{
                router.push('/login')
                clearAll()
            }, 1000)
        } else if (response.code === 400){
            const apiError = response as ApiError
            setExitError(apiError.message)
        } else{
            setExitError('Network Error')
        }
    }
    const toggleEditorMode = async () => {
        setEditError('')
        setEditSuccess('')
        setExitSuccess('')
        setExitSuccess('')

        setModeEditor(!modeEditor)
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            const fileUrl = URL.createObjectURL(selectedFile);
            setFileUrl(fileUrl);
        }
    };
    const onSubmit:SubmitHandler<UpdateProfileData> = async (data) => {
        setEditError('')
        setEditSuccess('')
        console.log(data)
        if (token){
            const response = await patchProfileApi({
                token: token.token,
                avatar: data.avatar.item(0),
                displayName: data.displayName,
                description: data.description,
            });
            if (response.code === 200){
                const profileResponse = await getProfileApi({
                    token: token.token,
                })
                if (response.code === 200){
                    const newProfile = profileResponse as GetProfileResponse
                    setProfile({ profile: newProfile.profile })
                    setEditSuccess('Successfully updated')
                    setTimeout(toggleEditorMode, 1000)
                }
            }
        }
    }

    useEffect(() => {
        if (initialized && !loadingProfile && !profile){
            router.push('/login');
        }
    }, [initialized, loadingProfile, profile]);
    if (initialized) {
        if (loadingProfile) {
            return (
                <main className={'bg-neutral-900'}>
                    <div className={'px-[20px] md:px-[40px] xl:px-[80px] max-w-[1920px] mx-auto'}>
                        <div
                            className={'bg-neutral-800 px-[10px] md:px-[20px] py-[35px] rounded-[30px] flex flex-col text-h7 font-m text-white gap-[5px] max-w-[700px] w-[100%] mx-auto mt-[5px]'}>
                            <div className={'animate-pulse rounded-[50%] bg-neutral-900 mx-auto w-[225px] h-[225px]'}/>
                            <span className={'animate-pulse bg-neutral-900 rounded-[20px] h-[45px]'}></span>
                            <span className={'animate-pulse bg-neutral-900 rounded-[20px] h-[45px]'}></span>
                            <span className={'animate-pulse bg-neutral-900 rounded-[20px] h-[45px]'}></span>
                            <span className={'animate-pulse bg-neutral-900 rounded-[20px] h-[45px]'}></span>
                            <span className={'animate-pulse bg-neutral-900 rounded-[20px] h-[45px]'}></span>
                            <div className={'flex justify-between mt-[20px] px-[30px]'}>
                                <BlueMatteButton>Change</BlueMatteButton>
                                <ExitButton className={'text-h10'}>Logout</ExitButton>
                            </div>
                        </div>
                    </div>
                </main>
            )
        } else if (profile) {
            return (
                <main className={'bg-neutral-900'} >
                    <div className={'px-[20px] md:px-[40px] xl:px-[80px] max-w-[1920px] mx-auto'}>
                        <div
                            className={'bg-neutral-800 px-[10px] py-[35px] md:px-[20px] rounded-[30px] min-h-[680px] flex flex-col text-h7 font-m text-white gap-[15px] max-w-[700px] w-full mx-auto mt-[5px]'}>
                            <div className={'mx-auto relative'}>
                                <label htmlFor="avatar-input"
                                       className={`${modeEditor ? "after:text-h8 after:bg-neutral-950 after:top-0 after:bottom-0 after:left-0 after:right-0 after:opacity-0 after:absolute after:z-10 after:rounded-[50%] after:content-['upload'] after:text-center after:flex after:flex-col after:justify-center after:hover:text-h6 after:font-m after:hover:opacity-70 after:duration-700" : ''}`}></label>
                                <Image priority
                                       className={`rounded-[50%] border-[2px] relative border-neutral-950 w-[150px] h-[150px] sm:w-[225px] sm:h-[225px]`}
                                       width={225} height={225}
                                       src={modeEditor ? (fileUrl ? fileUrl : (profile?.avatar ? profile.avatar : String(process.env.NEXT_PUBLIC_DEFAULT_AVATAR))) : (profile?.avatar ? profile.avatar : String(process.env.NEXT_PUBLIC_DEFAULT_AVATAR))}
                                       alt={'user-avatar'}/>
                            </div>
                            {modeEditor ?
                                <form onSubmit={handleSubmit(onSubmit)}
                                      className={'flex flex-col gap-[10px] items-center w-full'}>
                                    <input {...register("avatar")} onChange={handleFileChange} id={'avatar-input'}
                                           className={'absolute w-0 h-0'} type="file"/>
                                    <TextInput {...register("displayName")} defaultValue={profile.displayName} classNameDiv={'max-w-[400px] w-full'} className={'w-full'} nameField={'Display name'}></TextInput>
                                    <TextArea {...register("description")} defaultValue={profile.description} classNameDiv={'max-w-[400px] w-full'} className={'w-full'} nameField={'Description'}></TextArea>

                                    <span className={`duration-700 font-m ${editSuccess ? 'text-green-600' : editError ? 'text-red-600' : ''}`}>{editSuccess ? editSuccess : editError ? editError : ''}</span>
                                    <div className={'flex justify-around mt-[20px] w-full gap-[10px]'}>
                                        <BlueMatteButton className={'w-[110px] h-[45px]'} onClick={toggleEditorMode}>← Back</BlueMatteButton>
                                        <GreenMatteButton type={'submit'} className={'w-[110px] h-[45px]'}>Change</GreenMatteButton>
                                    </div>
                                </form> :
                                <>
                                    <ListItems className={'text-h9'} items={[
                                        {
                                            key: '1',
                                            keyData: 'Display name:',
                                            keyCustom: {
                                                className: 'break-all mt-[10px] sm:mt-[0] bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-t-[20px]  sm:rounded-l-[20px] sm:rounded-r-[0]'
                                            },

                                            valueData: profile.displayName,
                                            valueCustom: {
                                                className: 'break-all bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-b-[20px] sm:rounded-r-[20px] sm:rounded-l-[0]'
                                            },
                                        },
                                        {
                                            key: '2',
                                            keyData: 'Username:',
                                            keyCustom: {
                                                className: 'break-all mt-[10px] sm:mt-[0] bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-t-[20px]  sm:rounded-l-[20px] sm:rounded-r-[0]'
                                            },
                                            valueData: profile.username,
                                            valueCustom: {
                                                className: 'break-all bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-b-[20px] sm:rounded-r-[20px] sm:rounded-l-[0]'
                                            },
                                        },
                                        {
                                            key: '3',
                                            keyData: 'Description:',
                                            keyCustom: {
                                                className: 'break-all mt-[10px] sm:mt-[0] bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-t-[20px]  sm:rounded-l-[20px] sm:rounded-r-[0]'
                                            },
                                            valueData: profile.description ? profile.description : 'the author is very lazy and didn\'t leave a descriptio',
                                            valueCustom: {
                                                className: 'break-all bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-b-[20px] sm:rounded-r-[20px] sm:rounded-l-[0]'
                                            },
                                        },
                                        {
                                            key: '4',
                                            keyData: 'Create Date:',
                                            keyCustom: {
                                                className: 'break-all mt-[10px] sm:mt-[0] bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-t-[20px]  sm:rounded-l-[20px] sm:rounded-r-[0]'
                                            },
                                            valueData: profile.CreateDate,
                                            valueCustom: {
                                                className: 'break-all bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-b-[20px] sm:rounded-r-[20px] sm:rounded-l-[0]'
                                            },
                                        },
                                        {
                                            key: '5',
                                            keyData: 'Update Date:',
                                            keyCustom: {
                                                className: 'break-all mt-[10px] sm:mt-[0] bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-t-[20px]  sm:rounded-l-[20px] sm:rounded-r-[0]'
                                            },
                                            valueData: profile.UpdateDate,
                                            valueCustom: {
                                                className: 'break-all bg-neutral-900 py-[7.5px] pl-[15px] pr-[10px] rounded-b-[20px] sm:rounded-r-[20px] sm:rounded-l-[0]'
                                            },
                                        }
                                    ]}></ListItems>
                                    <div className={'flex justify-between mt-[20px] px-[30px]'}>
                                        <BlueMatteButton className={'w-[110px] h-[45px]'} onClick={toggleEditorMode}>Change</BlueMatteButton>
                                        <span className={`duration-700 font-m ${exitSuccess ? 'text-green-600' : exitError ? 'text-red-600' : ''}`}>{exitSuccess ? exitSuccess : exitError ? exitError : ''}</span>
                                        <ExitButton onClick={Exit} className={'text-h10'}>Logout</ExitButton>
                                    </div>
                                </>
                            }
                            <button onClick={() => {
                                setOpenList(!openList)
                            }} className={`text-lightGray hover:text-white text-[20px] cursor-pointer mx-auto relative after:absolute after:top-[25px] after:right-[50%] after:left-[50%] p-[7.5px] pb-[12.5px] ${openList ? "after:content-['↑']" : "after:content-['↓']"}`}>My
                                posts
                            </button>
                            {openList ? <ListPosts></ListPosts> : <></>}
                        </div>
                    </div>
                </main>
            );
}}};

export default ProfilePage;