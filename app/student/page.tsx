"use server"

import {getServerSession} from "next-auth";
import prisma from '@/components/db/prisma'
import LoginButton from "@/components/web-component/LoginButton";
import StudentDailyPresence from "@/components/ui/student/presence";
import {StudentPresnceStatus} from "@prisma/client";
import {doDailyPresence} from "@/app/student/action";
import Image from "next/image";
import time from "@/components/svg/time.svg"

export default async function StudentHomePage() {

    const userData = await getServerSession()

    if (userData) {
        const userDataFromDB = await prisma.user.findUnique({
            where: {
                // @ts-ignore
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
            <div className={'flex flex-col gap-5 items-center w-full mt-auto max-h-fit '}>
                <div className="max-w-lg">
                    <div className={'p-5'}>
                        <Image src={time} alt={''} className={'w-full'}/>
                        <h1 className={'font-bold text-3xl'}>{studentData?.name} - {studentData?.classroom?.name}</h1>
                    </div>
                    <div className={'flex w-full flex-col justify-end items-center flex-grow border-t-2 p-5 max-w-lg'}>

                        {presenceData ?
                            <StudentDailyPresence studentId={studentData?.id ?? 0} name={studentData?.name}
                                                  status={presenceData?.status as StudentPresnceStatus}
                                                  presenceTime={presenceData.logTime} handler={doDailyPresence}/>
                            :
                            'tidak ada kbm untuk hari ini'}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <LoginButton/>
            </div>
        )
    }
}