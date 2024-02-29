"use server"

import prisma from '@/components/db/prisma'
import {getServerSession} from "next-auth";
import InformationCounter from "@/components/ui/teacher/Counter";

export default async function AdminHomePage() {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            username: userData?.user?.name ?? ''
        }
    })

    return (
        <div className={'p-10 flex flex-col'}>
            <div>
                <h1 className={'font-bold text-3xl'}>
                    Selamat datang, {userData?.user?.name}
                </h1>
            </div>

            <div className={'flex flex-row gap-2'}>
            </div>
        </div>
    )
}