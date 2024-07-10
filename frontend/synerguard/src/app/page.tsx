import React from "react";
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mt-8">Welcome to SynerGuard</h1>
            </div>
        </>
    );
}