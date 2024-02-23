"use server"

import {getServerSession} from "next-auth";
import prisma from "@/components/db/prisma"
import {parsePresenceStatus, parseScheduleDay} from "@/components/sharedFunction/functions";
import ClassInformation from "@/components/ui/student/classInformation";

export default async function ClassPresence() {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            username: userData?.user?.name || ""
        },
        include: {
            student: true
        }
    })

    const mainSchedule = await prisma.mainSchedule.findFirst({
        where: {

            classroomId: userDataFromDB?.student?.classroomId
        },
        include: {
            classroom: true,
        }
    })

    const studentPresenceToday = await prisma.studentClassPresence.findMany({
        where: {
            effectiveDate: {
                equals: new Date()
            },
            studentId: userDataFromDB?.student?.id,
        },
        include: {
            classes: {
                include: {
                    classesDetail: {
                        include: {
                            scheduleOrder: true,
                            mainSchedule: true,
                            subject: {
                                include: {
                                    teacher: true
                                }
                            }
                        }
                    }
                }
            },
        }
    })

    return (
        <div className={'pt-10 pr-5 pl-5 lg:pr-10 lg:pl-10 flex flex-col gap-10'}>
            {/*hello {userData?.user?.name}*/}
            <div className={'flex flex-col'}>
                <h1 className={'font-bold text-3xl'}>Jadwal Pelajaran Hari Ini</h1>
                <p className={'font-bold text-xl'}>{mainSchedule?.classroom.name}</p>
            </div>

            <div className={'flex flex-col gap-3'}>
                {studentPresenceToday.map((detail) => (
                    <ClassInformation key={detail.id} id={detail.id} teacher={detail.classes.classesDetail.subject.teacher[0].name} startFrom={detail.classes.classesDetail.scheduleOrder.startTime} endIn={detail.classes.classesDetail.scheduleOrder.endTime} name={detail.classes.classesDetail.subject.name} presenceStatus={parsePresenceStatus(detail.status)} />
                ))}
            </div>

        </div>
    )
}