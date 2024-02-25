"use server"

import prisma from '@/components/db/prisma'
import {getServerSession} from "next-auth";
import {columns, StudentScheduleDataType} from "@/app/student/schedule/columns";
import {DataTableWODelete} from "@/components/web-component/DataTableWODelete";

export default async function StudentSchedulePage() {
    const userData = await getServerSession()

    const userDataFromDB = await prisma.user.findUnique({
        where: {
            username: userData?.user?.name ?? undefined
        },
        include: {
            student: {
                include: {
                    classroom: true
                }
            }
        }
    })

    const mainSchedule = await prisma.mainSchedule.findFirst({
        where: {
            classroomId: userDataFromDB?.student?.classroomId
        }
    })

    const schedule = await prisma.classesDetail.findMany({
        where: {
            mainScheduleId: mainSchedule?.id
        },
        include: {
            subject: {
                include: {
                    teacher: true
                }
            },
            scheduleOrder: true
        },
        orderBy: {
            scheduleOrder: {
                startTime: 'asc',
                // day: 'asc'
            }
        }
    })

    const scheduleMonday: StudentScheduleDataType[] = []
    const scheduleTuesday: StudentScheduleDataType[] = []
    const scheduleWednesday: StudentScheduleDataType[]= []
    const scheduleThursday: StudentScheduleDataType[] = []
    const scheduleFriday: StudentScheduleDataType[]= []

    schedule.map((detail, index) => {
        switch(detail.scheduleOrder.day) {
            case 'MONDAY':
                scheduleMonday.push({
                    id: index,
                    subject: detail.subject.name,
                    startTime: detail.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: detail.scheduleOrder.endTime.toTimeString().split(' ')[0]
                })
                break;
            case 'TUESDAY':
                scheduleTuesday.push({
                    id: index,
                    subject: detail.subject.name,
                    startTime: detail.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: detail.scheduleOrder.endTime.toTimeString().split(' ')[0]
                })
                break;
            case 'WEDNESDAY':
                scheduleWednesday.push({
                    id: index,
                    subject: detail.subject.name,
                    startTime: detail.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: detail.scheduleOrder.endTime.toTimeString().split(' ')[0]
                })
                break;
            case 'THURSDAY':
                scheduleThursday.push({
                    id: index,
                    subject: detail.subject.name,
                    startTime: detail.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: detail.scheduleOrder.endTime.toTimeString().split(' ')[0]
                })
                break;
            case 'FRIDAY':
                scheduleFriday.push({
                    id: index,
                    subject: detail.subject.name,
                    startTime: detail.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: detail.scheduleOrder.endTime.toTimeString().split(' ')[0]
                })
                break;


            default:
                break;
        }
    })

    return (
        <div className={'pr-5 pl-5 pt-10 pb-10 lg:pr-10 lg:pl-10 flex flex-col gap-10'}>
            <h1 className={'font-bold text-3xl'}>Jadwal Pembelajaran - {userDataFromDB?.student?.classroom.name}</h1>
            <div>
                <p className={'font-bold text-xl'}>Senin</p>
                <DataTableWODelete columns={columns} data={scheduleMonday} />
            </div>
            <div>
                <p className={'font-bold text-xl'}>Selasa</p>
                <DataTableWODelete columns={columns} data={scheduleTuesday}  />
            </div>
            <div>
                <p className={'font-bold text-xl'}>Rabu</p>
                <DataTableWODelete columns={columns} data={scheduleWednesday}  />
            </div>
            <div>
                <p className={'font-bold text-xl'}>Kamis</p>
                <DataTableWODelete columns={columns} data={scheduleThursday}  />
            </div>
            <div>
                <p className={'font-bold text-xl'}>Jumat</p>
                <DataTableWODelete columns={columns} data={scheduleFriday}  />
            </div>
        </div>
    )
}