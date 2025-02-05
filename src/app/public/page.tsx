'use client'
import React from 'react';
import dynamic from "next/dynamic";
const ListPublicPosts = dynamic(() => import("@/components/ListPublicPosts/ListPublicPosts"), {
    ssr: false,
});
const Page = () => {
    return (
        <main className={'bg-neutral-900'}>
            <div className={'px-[20px] md:px-[40px] xl:px-[80px] max-w-[1920px] mx-auto'}>
                <div className={'flex flex-col gap-[20px] text-white mx-auto p-[10px] sm:p-[35px] pt-[45px] bg-neutral-800 rounded-[10px]'}>
                    <ListPublicPosts></ListPublicPosts>
                </div>
            </div>
        </main>
    );
};

export default Page;