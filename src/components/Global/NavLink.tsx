'use client'
import React from 'react'
import Link from "next/link"
import {
    CodeXml,
    Home,
    LineChart,
    Package,
    Settings,
    ShoppingCart,
    Users,
} from "lucide-react"

import { usePathname } from 'next/navigation'
import Logout from "./Logout"

const NavLink = () => {
    const pathname = usePathname()
    const navItem = [
        {
            _id: 1,
            name: 'Dashboard',
            link: '/dashboard',
            icon: <Home className="h-4 w-4" />
        },
        {
            _id: 2,
            name: 'API',
            link: '/api',
            icon: <CodeXml className="h-4 w-4" />
        },
        {
            _id: 3,
            name: 'Setting',
            link: '/setting',
            icon: <Settings className="h-4 w-4" />
        },
    ]
    return (
        <>
            {navItem.map((item, index: number) => (
                <Link
                    key={index}
                    href={item.link}
                    className={`flex items-center  gap-3 ${pathname === item.link ? 'text-primary bg-muted font-semibold' : ''} rounded-lg px-3 py-2  transition-all hover:text-primary`}
                >
                    {item.icon}
                    {item.name}
                </Link>
            ))}
        </>
    )
}

export default NavLink