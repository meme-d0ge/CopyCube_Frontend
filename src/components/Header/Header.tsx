import Link from "next/link";
import AuthMenu from "@/components/AuthMenu/AuthMenu";
import React from "react";

export default function Header() {
    return (
        <div>
            <div className={'px-[25px] h-[70px] w-[100%]'}></div>
            <header className={'fixed top-0 left-0 right-0 px-[25px] h-[80px] w-[100%] font-m bg-neutral-900 items-center flex gap-[15px] justify-between'}>
                <nav className={'flex gap-[20px]'}>
                    <Link className={'text-lightGray hover:text-white'} href={'/post'}>Create Post</Link>
                    <Link className={'text-lightGray hover:text-white'} href={'/public'}>Public Posts</Link>
                </nav>
                <AuthMenu/>
            </header>
        </div>
    )
}