import React from 'react'
import type{ UserResource } from "@clerk/types";
import ProfileImage from './profileImage';
import { ModeToggle } from './mode-toggle';

interface Props {
    user?: UserResource
}

const NavMenu = (props: Props) => {
    const user = props.user;
    return (
        <div className="w-full bg-primary-foreground"> 
            <div className="max-w-5xl mx-auto flex flex-row items-center justify-between py-2">
                <ModeToggle/>

                {
                    user ? 
                    <>
                        <div className="flex flex-row items-center justify-between">
                            <p>Profile</p>
                            <ProfileImage/>
                        </div>
                    </>
                    :
                    <p>Log in </p>
                }
            </div>
        </div>
    )
}

export default NavMenu