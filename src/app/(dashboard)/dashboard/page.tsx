import Image from "next/image"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const Dashboard = () => {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no API Key
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can start as soon as you create a API Key.
                    </p>
                    <Link href={'/api'} className={cn(buttonVariants({ variant: 'default' }), "mt-4")}>Create API</Link>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;