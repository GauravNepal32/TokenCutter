import { Braces } from 'lucide-react'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import { ToggleTheme } from './ToggleTheme'
import Link from 'next/link'
import { validateRequest } from '@/lib/auth'
import User from './User'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'


const Navbar = async () => {
    const { user } = await validateRequest()
    return (
        <div className='py-3 container flex items-center justify-between'>
            <div className='flex'>
                <span className='font-bold text-xl ml-2'>
                    <Image className='' src={'/logowhite.svg'} width={100} height={100} alt='Logo' />
                </span>
            </div>
            <div className="flex gap-3">
                <div className="">
                    <ToggleTheme />
                </div>
                {!user ?
                    <Link href={'/dashboard'} className={buttonVariants({ variant: 'default' })}>
                        Try Now
                    </Link>
                    : <>
                        <Link href={'/dashboard'}>
                            {/* <User username={user.username} image={user.image} /> */}
                            <Avatar>
                                <AvatarImage src={`${user.image}`} />
                                <AvatarFallback>{user.username}</AvatarFallback>
                            </Avatar>
                        </Link>
                    </>
                }
            </div>
        </div >
    )
}

export default Navbar