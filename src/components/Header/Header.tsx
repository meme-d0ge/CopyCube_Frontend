import Link from "next/link";
import AuthMenu from "@/components/AuthMenu/AuthMenu";

export default function Header() {
    return (
        <header>
            <Link href={'/post'}>Create Post</Link>
            <Link href={'/public'}>Public Posts</Link>
            <AuthMenu/>
        </header>
    )
}