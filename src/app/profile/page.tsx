'use client'
import React from 'react';
import {userStore} from "@/store/userStore";
import Image from "next/image";
import {useRouter} from "next/navigation";
import MatteButton from "@/UI/Buttons/MatteButton/MatteButton";
import ExitButton from "@/UI/Buttons/ExitButton/ExitButton";
import ListItems from "@/components/ListItems/ListItems";

const ProfilePage = () => {
    const {profile, loadingProfile, initialized} = userStore(state => state);
    const router = useRouter()
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
                                <MatteButton>Change</MatteButton>
                                <ExitButton className={'text-h10'}>Logout</ExitButton>
                            </div>
                        </div>
                    </div>
                </main>
            )
        } else if (profile) {
            return (
                <main className={'bg-neutral-900'}>
                    <div className={'px-[20px] md:px-[40px] xl:px-[80px] max-w-[1920px] mx-auto'}>
                        <div className={'bg-neutral-800 px-[10px] py-[35px] md:px-[20px] rounded-[30px] flex flex-col text-h7 font-m text-white gap-[15px] max-w-[700px] w-full mx-auto mt-[5px]'}>
                            <Image priority className={'rounded-[50%] border-neutral-950 border-4 mx-auto w-[150px] h-[150px] sm:w-[225px] sm:h-[225px]'} width={225} height={225} src={profile?.avatar ? profile.avatar : String(process.env.NEXT_PUBLIC_DEFAULT_AVATAR)} alt={'user-avatar'}/>

                            <ListItems className={'md:text-h7 text-h9'} items={[
                                {
                                    key: '1',
                                    keyData: 'Display name:',
                                    valueData: profile.displayName,
                                },
                                {
                                    key: '2',
                                    keyData: 'Username:',
                                    valueData: profile.username,
                                },
                                {
                                    key: '3',
                                    keyData: 'Description:',
                                    valueData: profile.description ? profile.description : 'the author is very lazy and didn\'t leave a descriptio',
                                },
                                {
                                    key: '4',
                                    keyData: 'Create Date:',
                                    valueData: profile.CreateDate,
                                },
                                {
                                    key: '5',
                                    keyData: 'Update Date:',
                                    valueData: profile.UpdateDate,
                                }
                            ]}></ListItems>
                            <div className={'flex justify-between mt-[20px] px-[30px]'}>
                                <MatteButton>Change</MatteButton>
                                <ExitButton className={'text-h10'}>Logout</ExitButton>
                            </div>
                        </div>
                    </div>
                </main>
            );
        } else {
            router.push('/login');
            return (
                <></>
            )
        }
    }
};

export default ProfilePage;