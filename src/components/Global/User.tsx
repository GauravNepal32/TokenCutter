import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { logout } from '@/lib/auth'
import Logout from './Logout'

const User = ({ username, image }: { username: string, image: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>

            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[270px] right-20'>
                <DropdownMenuLabel>{username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Setting</DropdownMenuItem>
                <DropdownMenuItem>
                    <>
                        <Logout />
                    </>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>



    )
}

export default User