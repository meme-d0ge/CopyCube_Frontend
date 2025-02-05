import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['storage.yandexcloud.net'],
    },
};
export default nextConfig;
