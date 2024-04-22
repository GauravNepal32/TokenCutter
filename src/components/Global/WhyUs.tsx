'use client'
import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { HoverCard } from './HoverCard'
import Image from 'next/image'

const WhyUs = () => {
    return (
        <div className="my-10 overflow-hidden">
            <h1 className="text-3xl font-bold text-center my-10">Why use DownToken?</h1>
            <div className=" container grid grid-cols-6 gap-1">
                <div className="col-span-2 my-auto  flex flex-col gap-y-3">
                    <HoverCard className="">
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">Resource Management</CardTitle>
                                <div className="text-slate-500 text-sm">
                                    With our solution, token usage can decrease by more than 30%
                                </div>
                            </CardHeader>
                        </Card>
                    </HoverCard>
                    <HoverCard className="">
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="text-xl">Flexibility</CardTitle>
                                <div className="text-slate-500 text-sm">
                                    Ability to select accuracy to cost-optimization
                                </div>
                            </CardHeader>
                        </Card>
                    </HoverCard>
                    <HoverCard className="">
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="text-xl">Optimization</CardTitle>
                                <div className="text-slate-500 text-sm">
                                    Ability to select accuracy to cost-optimization
                                </div>
                            </CardHeader>
                        </Card>
                    </HoverCard>
                    <HoverCard className="">
                        <Card className="">
                            <CardHeader>
                                <CardTitle className="text-xl">Collaboration</CardTitle>
                                <div className="text-slate-500 text-sm">
                                    Ability to select accuracy to cost-optimization
                                </div>
                            </CardHeader>
                        </Card>
                    </HoverCard>
                </div>
                <div className="col-span-4 mt-10 rounded-xl shadow-xl shadow-emerald-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem] overflow-hidden">
                    <Image className='w-full overflow-hidden' src={'/prompt-editor.webp'} alt='dashboard' width={1200} height={1200} />
                </div>
            </div>
        </div>
    )
}

export default WhyUs