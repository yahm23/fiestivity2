import React, { ReactNode } from "react";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { ModeToggle } from "../modeToggle";

interface Props {
    children?: ReactNode
}


export default function LayoutGeneral ({children, ...props}: Props) {
    const {user} = useUser();
    return (
        <>
            <Head>
                <title>Create T3 App Testing</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen">
                <div className="flex min-h-screen flex-col items-center justify-center bg-background">
                    <ModeToggle/>
                { user ? 
                    <p>Layout Logged in</p>
                    :
                    <p>Layout General</p>
                }
                {children}
                </div>
            </main>
        </>
    );
}
