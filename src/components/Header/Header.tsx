import Link from "next/link";
import AuthMenu from "@/components/AuthMenu/AuthMenu";
import React from "react";

export default function Header() {
    return (
        <div>
            <header className={'fixed top-0 left-0 right-0 bg-neutral-900'}>
                <div className={'px-[20px] md:px-[40px] xl:px-[80px] h-[80px] font-m items-center flex gap-[15px] justify-between max-w-[1920px] mx-auto'}>
                    <nav className={'flex gap-[20px]'}>
                        <Link className={'text-lightGray hover:text-white'} href={'/post'}>Create Post</Link>
                        <Link className={'text-lightGray hover:text-white'} href={'/public'}>Public Posts</Link>
                    </nav>
                    <AuthMenu/>
                </div>
            </header>
            <div className={'px-[25px] h-[80px] w-[100%]'}></div>
        </div>
    )
}