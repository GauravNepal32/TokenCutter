import { CreateAPI } from '@/components/Global/CreateAPI'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const loading = () => {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">API</h1>
                <CreateAPI createKey={''} />
            </div>

            <div className="animate-pulse">
                <div className="h-4 bg-slate-600 mt-3 mb-6 rounded"></div>
                <div className="h-4 bg-slate-500 mb-6 rounded"></div>
                <div className="h-4 bg-slate-600 mb-6 rounded"></div>
                <div className="h-4 bg-slate-500 mb-6 rounded"></div>
                <div className="h-4 bg-slate-600 mb-6 rounded"></div>
            </div>

            <div className="border relative border-dashed bg-emerald-800 p-5 rounded-lg">
                <h3 className="text-2xl font-bold tracking-tight mb-3">
                    Understand the working of TokenCutter
                </h3>
                <Link className={buttonVariants({ variant: 'outline' })} href={'/docs'}>
                    See Docs
                </Link>
                {/* <Image className='absolute right-0 -top-7' src={'/docs.png'} width={200} height={200} alt={'Astronuat'} /> */}
            </div>
        </main>

    )
}

export default loading