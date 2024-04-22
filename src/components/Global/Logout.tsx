import React from 'react'
import { Button } from '../ui/button'
import { logout } from '@/lib/auth'
import { LogOut } from 'lucide-react'
const Logout = () => {
    return (
        <form action={logout}>
            <button
                className='flex items-center  gap-3 rounded-lg px-3 py-2  transition-all hover:text-red-600 font-bold w-full'
            >
                <LogOut className='w-4 h-4' />
                Logout</button>
        </form>
    )
}

export default Logout