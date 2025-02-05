'use client'
import React, {useEffect, useState} from 'react';
import {usePathname} from "next/navigation";
import {userStore} from "@/store/userStore";
import {getProfileByUsernameApi, GetProfileByUsernameResponse} from "@/api/profile/get-profile-by-username-api";
import {ProfileUser} from "@/api/profile/types/ProfileUser";
import ListItems from "@/components/ListItems/ListItems";
import Image from "next/image";
import ListPosts from "@/components/ListPosts/ListPosts";
import FireflyLoader from "@/UI/Loaders/FireflyLoader/FireflyLoader";
const Page = () => {
    const userState = userStore(state => state)
    const pathname = usePathname().split('/profile/');
    const [profile, setProfile] = useState<ProfileUser>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [openList, setOpenList] = useState(false)

    useEffect(() => {
        const fethcData = async () => {
            const response = await getProfileByUsernameApi({
                username: String(pathname[pathname.length - 1]),
            })
            if (response.code === 200) {
                const profile = response as GetProfileByUsernameResponse
                setProfile(profile.profile)
                setLoading(false)
            } else if (response.code === 404) {
                setError('Post Not Found')
                setLoading(false)
            }
        }
        fethcData()
    }, [userState.initialized]);
    if (loading) {
        return (
            <div
                className={'text-white absolute top-0 bottom-0 left-0 right-0 h-screen flex flex-col justify-center items-center gap-y-[30px]'}>
                <FireflyLoader></FireflyLoader>
                <span className={'text-yellow-400 font-b'}>Loading Profile...</span>
            </div>
        );
    } else if (profile && !error) {
        return (
            <main className={'bg-neutral-900'}>
                <div className={'px-[20px] md:px-[40px] xl:px-[80px] max-w-[1920px] mx-auto mt-[20px] '}>
                    <div
                        className={'bg-neutral-800 px-[10px] py-[35px] md:px-[20px] rounded-[30px] flex flex-col text-h7 font-m text-white gap-[15px] max-w-[700px] w-full mx-auto mt-[5px]'}>
                        <Image priority
                               className={`rounded-[50%] border-[2px] relative border-neutral-950 w-[150px] h-[150px] sm:w-[225px] sm:h-[225px] mx-auto`}
                               width={225} height={225}
                               src={profile?.avatar ? profile.avatar : String(process.env.NEXT_PUBLIC_DEFAULT_AVATAR)}
                               alt={'user-avatar'}/>
                        <ListItems className={'text-h9'} items={[
                            {
                                key: '1',
                                keyData: 'Username:',
                                valueData: profile.username,
                            },
                            {
                                key: '2',
                                keyData: 'Display name:',
                                valueData: profile.displayName,
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
                        ]}></ListItems>
                        <button onClick={() => {
                            setOpenList(!openList)
                        }}
                                className={`text-lightGray hover:text-white text-[20px] cursor-pointer mx-auto relative after:absolute after:top-[25px] after:right-[50%] after:left-[50%] p-[7.5px] pb-[12.5px] ${openList ? "after:content-['↑']" : "after:content-['↓']"}`}>User's
                            posts
                        </button>
                        {openList ? <ListPosts username={`${profile.username}`}></ListPosts> : ''}
                    </div>
                </div>
            </main>
        );
    } else {
        return (
            <div className={'text-white'}>
                <p>{error}</p>
            </div>
        )
    }
};

export default Page;