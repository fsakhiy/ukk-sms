"use server"

import prisma from '@/components/db/prisma'
import {getServerSession} from "next-auth";
import ClassInformation from "@/components/ui/teacher/ClassInformation";

export default async function TeacherHomePage() {
    const userSession = await getServerSession()
    const userData = await prisma.user.findUnique({
        where: {
            accountType: "TEACHER",
            username: userSession?.user?.name ?? ''
        },
        include: {
            teacher: {
                include: {
                    Subject: true
                }
            }
        }
    })

    const classesDetail = await prisma.classes.findMany({
        where: {
            classesDetail: {
                subject: {
                    teacher: {
                        id: userData?.teacher?.id
                    }
                }
            },
            effectiveDate: new Date()
        },
        include: {
            classesDetail: {
                include: {
                    mainSchedule: {
                        include: {
                            classroom: true
                        }
                    },
                    subject: true,
                    scheduleOrder: true
                }
            },
            StudentClassPresence: {
                include: {
                    student: true
                }
            }
        }
    })

    return (
        // <div className={'pt-10 pb-10 pr-3 pl-3 lg:pr-10 lg:pl-10'}>
        <div className={'pt-10 pb-10 pr-3 pl-3 lg:pr-10 lg:pl-10 flex flex-col items-center w-full'}>
            <div className={"max-w-lg w-full flex flex-col gap-5" }>
                <div className={'flex'}>
                    <h1 className={'font-bold text-3xl'}>Selamat Datang, {userData?.teacher?.name}</h1>
                </div>

                {classesDetail.length === 0 ?
                    <p>tidak ada kbm hari ini</p> :

                    <div className={'flex flex-col'}>
                        <p className={'font-bold text-xl'}>Jadwal KBM Hari Ini</p>
                        {classesDetail.map((detail) => (
                            <ClassInformation key={detail.id} id={detail.id} subject={detail.classesDetail.subject.name} classroom={detail.classesDetail.mainSchedule.classroom.name} startTime={detail.classesDetail.scheduleOrder.startTime} endTime={detail.classesDetail.scheduleOrder.endTime} classCode={detail.classCode} />
                        ))}
                    </div>
                }

            </div>

        </div>
    )
}