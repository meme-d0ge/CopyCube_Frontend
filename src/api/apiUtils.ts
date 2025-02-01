'use client'
import axios from "axios";
export interface ApiError{
    code: number;
    message: string;
}
export const getErrorMessage = (error: unknown): ApiError => {
    if (axios.isAxiosError(error)) {
        return {
            code: error.status || 500,
            message: error.response?.data?.message || error.message || 'Axios error'
        };
    }
    if (error instanceof Error) {
        return {
            code: 0,
            message: error.message || 'General error'
        };
    }
    return {
        code: 0,
        message: 'Unknown error'
    };
};