import React, { ReactNode } from "react";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import { ModeToggle } from "../modeToggle";

interface Props {
    children?: ReactNode,
    title?: string,
    desc?: string
}

const defaultProps: Props = {
    title: '',
    desc: 'Fiestivity default desc'
  };


function LayoutGeneral ({children, ...props}: Props) {
    const {user} = useUser();
    const title = props.title;
    const desc = props.desc;

    return (
        <>
            <Head>
                <title>Fiestivity {(title === '')? ('| ' + title ) : ''}</title>
                <meta name="description" content={desc} />
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

LayoutGeneral.defaultProps = defaultProps;
export default LayoutGeneral;