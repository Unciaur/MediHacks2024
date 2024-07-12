'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/app/components/Navbar";

const GetStartedPage = () => {
    const router = useRouter()

    const handleGetStartedClick = () => {
        router.push('/synerguard');
    };

    useEffect(() => {
        router.prefetch('/synerguard')
    }, [router]);

    return (
        <>
            <div className={"bg-gradient-radial from-[#5656b7] to-[#000000] h-screen w-screen fixed top-0 left-0 z-[1] bg-dynamic-gradient bg-[length:200%_200%] animate-gradientFlow"}>
                <Navbar />
                <div className="font-inter flex flex-col justify-center items-center h-screen noScrollBar">
                    <p className="text-center mt-[-50px] mb-2.5 text-6xl text-white">
                        Welcome to SynerGuard
                    </p>
                    <p className="text-center mb-5 text-xl text-white">
                        Press the button below to begin your journey
                    </p>
                    <button onClick={handleGetStartedClick} className="bg-blue-500 text-white py-2.5 px-5 rounded-full border-none cursor-pointer">
                        Get Started
                    </button>
                </div>
            </div>
        </>
    );
};

export default GetStartedPage;