import React from 'react'
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";

const Banner = async () => {
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/login");
    }
    return (
        <div className='bg-green-800 py-3 text-center font-semibold'>{user.username} DownToken is currently under demo phase</div>
    )
}

export default Banner