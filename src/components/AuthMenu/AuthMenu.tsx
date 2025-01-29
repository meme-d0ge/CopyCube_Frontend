'use client'
import Link from "next/link";

export default function AuthMenu() {
    return (
        <nav>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'}>Register</Link>
        </nav>
    )
}
