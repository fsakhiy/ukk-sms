"use server"

import {getServerSession} from "next-auth";
import prisma from '@/components/db/prisma'
import LoginButton from "@/components/web-component/LoginButton";

export default async function StudentHomePage() {

    const userData = await getServerSession()

    if(userData) {
        const userDataFromDB = await prisma.user.findUnique({
            where: {
                username: userData.user.name
            },
        })

        const studentData = await prisma.student.findUnique({
            where: {
                // @ts-ignore
                id: userDataFromDB.studentId
            },
            include: {
                classroom: true
            }
        })

        const presenceData = await prisma.studentPresence.findFirst({
            where: {
                effectiveDate: {
                    equals: new Date()
                },
                // @ts-ignore
                studentId: studentData.id
            }
        })

        console.log(presenceData)

        return (
            <div className={'flex flex-col gap-5 p-10'}>
                <h1 className={'font-bold text-3xl'}>{studentData.name} - {studentData.classroom.name}</h1>
                <div>

                    {presenceData ? presenceData.status : 'tidak ada kbm untuk hari ini'}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <LoginButton />
            </div>
        )
    }
}