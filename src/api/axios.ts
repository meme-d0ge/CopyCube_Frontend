'use client'
import axios from "axios";
export const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});
