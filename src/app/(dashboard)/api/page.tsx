import { CreateAPI } from '@/components/Global/CreateAPI'
import React from 'react'
import Image from 'next/image';
import { validateRequest } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { generateId } from "lucia";
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { format } from 'date-fns'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cookies } from 'next/headers';
import { ManageAPI } from '@/components/Global/ManageAPI';

const page = async () => {
    async function createKey(formData: FormData) {
        "use server";
        const prisma = new PrismaClient();
        const { user } = await validateRequest()
        if (!user) {
            return { title: "Invalid User request" };
        }
        const apiKey = crypto.randomUUID();
        const rawData = {
            name: formData.get("name")?.toString() ?? ""
        }
        const hasedKey = await bcrypt.hash(apiKey, 10);

        const newAPIRecord = await prisma.aPIRecord.create({
            data: {
                id: generateId(15),
                name: rawData.name,
                userId: user?.id ?? '',
                hasedAPI: hasedKey,
                createAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        })
        cookies().set(newAPIRecord.id, apiKey, {
            expires: 60
        })
        revalidatePath('/api')
        return { data: apiKey }
    }

    const getAPIData = async ({ userId }: { userId: string }) => {
        const prisma = new PrismaClient();
        const data = await prisma.aPIRecord.findMany({
            where: {
                userId: userId
            }
        })
        return data
    }
    const { user } = await validateRequest()
    if (!user) {
        redirect('/login')
    }
    const apiData = await getAPIData({ userId: user.id })
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">API</h1>
                <CreateAPI createKey={createKey} />
            </div>
            <div
                className="flex p-6 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
                {(!apiData || apiData.length < 1) ?
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            You have no API Key
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            You can start as soon as you create a API Key.
                        </p>
                    </div>
                    :
                    <>
                        <Table>
                            <TableCaption>A list of your API Key.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[160px]">Name</TableHead>
                                    <TableHead>Key</TableHead>
                                    <TableHead>Create At</TableHead>
                                    <TableHead className="text-right">Last Used</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {apiData.map((x, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{x.name}</TableCell>
                                        <TableCell className='flex items-center'>{cookies().get(x.id)?.value ?? "************"} {" "}
                                            <ManageAPI createKey={createKey} keyData={x} /></TableCell>
                                        <TableCell>{format(x.createAt, 'yyyy-MM-dd')}</TableCell>
                                        <TableCell className="text-right">{format(x.updatedAt, 'yyyy-MM-dd')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                }

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

export default page