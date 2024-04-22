import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const Footer = () => {
    return (
        <div className='border-t mt-10 py-5'>
            <div className="container">
                <span className='text-primary text-xl font-bold'>
                    <Image className='' src={'/mix.svg'} width={100} height={100} alt='Logo' />

                </span>
                <div className="flex gap-5 mt-4">
                    <Link className='font-normal text-sm' href={'/privacy'}>Privacy Policy</Link>
                    <Link className='font-normal text-sm' href={'/privacy'}>Terms & Conditions</Link>
                </div>
                <div className="mt-4 text-[13px]">
                    Share your queries at <span className='text-primary underline'>
                        customer@downtoken.com
                    </span>
                </div>
                <div className="mt-5">
                    <div className="text-[14px] text-slate-400">
                        Copyright &copy; 2024 | All rights reserved
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer