'use client'
import Link from "next/link";
import {userStore} from "@/store/userStore";
import Image from 'next/image';


export default function AuthMenu() {
    const {profile, loadingProfile} = userStore(state => state);
    if (loadingProfile) {
        return (
            <div className={'w-[200px] h-[65px] box-border flex gap-[10px] items-center bg-neutral-950 px-[10px] py-[5px] rounded-[30px] animate-pulse'}>
                <div className={'w-[50px] h-[50px] rounded-[50%] bg-deepBlack animate-pulse'}></div>
                <div className={'w-[70px] h-[25px] rounded-[10px] bg-deepBlack animate-pulse'}> </div>
            </div>
        )
    } else if (profile){
        return (
            <Link href={'/profile'} className={'w-[200px] h-[65px] box-border flex gap-[15px] items-center bg-neutral-950 px-[10px] py-[5px] rounded-[30px] font-b hover:bg-opacity-50 text-white'}>
                <Image className={'rounded-[50%] border-white border-[1.95px]'} src={profile.avatar?profile?.avatar:String(process.env.NEXT_PUBLIC_DEFAULT_AVATAR)} width={50} height={50} alt={'avatar'} />
                <span className={'truncate'}>{profile.username}</span>
            </Link>
        )
    } else {
        return (
            <nav className={'flex gap-[20px] font-m '}>
                <Link className={'text-lightGray hover:text-white'} href={'/login'}>Login</Link>
                <Link className={'text-lightGray hover:text-white'} href={'/register'}>Register</Link>
            </nav>
        )
    }
}
