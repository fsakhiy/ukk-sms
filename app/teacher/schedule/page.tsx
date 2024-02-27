"use server"

import prisma from '@/components/db/prisma'
import {getServerSession} from "next-auth";
import {parseScheduleDay} from "@/components/sharedFunction/functions";
import {columns, TeacherScheduleDataType} from "@/app/teacher/schedule/columns";
import {DataTableWODelete} from "@/components/web-component/DataTableWODelete";

export default async function TeacherSchedulePage() {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            username: userData?.user?.name ?? ''
        },
        include: {
            teacher: true
        }
    })

    const scheduleData = await prisma.classesDetail.findMany({
        where: {
            subject: {
                teacher: {
                    id: userDataFromDB?.teacher?.id
                }
            }
        },
        include: {
            subject: true,
            scheduleOrder: true,
            mainSchedule: {
                include: {
                    classroom: true
                }
            }
        },
        orderBy: {
            scheduleOrder: {
                day: 'asc'
            }
        }
    })

    const scheduleMonday: TeacherScheduleDataType[] = []
    const scheduleTuesday: TeacherScheduleDataType[] = []
    const scheduleWednesday: TeacherScheduleDataType[] = []
    const scheduleThursday: TeacherScheduleDataType[] = []
    const scheduleFriday: TeacherScheduleDataType[] = []

    scheduleData.map((data) => {
        switch (data.scheduleOrder.day) {
            case "MONDAY":
                scheduleMonday.push({
                    id: data.id,
                    classroom: data.mainSchedule.classroom.name,
                    subject: data.subject.name,
                    startTime: data.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: data.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrderName: data.scheduleOrder.name
                })
                break;

            case "TUESDAY":
                scheduleTuesday.push({
                    id: data.id,
                    classroom: data.mainSchedule.classroom.name,
                    subject: data.subject.name,
                    startTime: data.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: data.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrderName: data.scheduleOrder.name
                })
                break;

            case "WEDNESDAY":
                scheduleWednesday.push({
                    id: data.id,
                    classroom: data.mainSchedule.classroom.name,
                    subject: data.subject.name,
                    startTime: data.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: data.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrderName: data.scheduleOrder.name
                })
                break;

            case "THURSDAY":
                scheduleThursday.push({
                    id: data.id,
                    classroom: data.mainSchedule.classroom.name,
                    subject: data.subject.name,
                    startTime: data.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: data.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrderName: data.scheduleOrder.name
                })
                break;

            case "FRIDAY":
                scheduleFriday.push({
                    id: data.id,
                    classroom: data.mainSchedule.classroom.name,
                    subject: data.subject.name,
                    startTime: data.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: data.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrderName: data.scheduleOrder.name
                })
                break;

            default:
                break;
        }
    })

    return (
        // <div className={'pr-5 pl-5 pt-10 pb-10 lg:pr-10 lg:pl-10 flex flex-col gap-10'}>
        <div className={'pt-10 pb-10 pr-3 pl-3 lg:pr-10 lg:pl-10 flex flex-col items-center w-full'}>
            <div className={'w-full max-w-lg flex flex-col gap-5'}>
                <h1 className={'font-bold text-3xl'}>Jadwal Pengajaran</h1>
                <div>
                    <p className={'font-bold text-xl'}>Senin</p>
                    <DataTableWODelete columns={columns} data={scheduleMonday}/>
                </div>
                <div>
                    <p className={'font-bold text-xl'}>Selasa</p>
                    <DataTableWODelete columns={columns} data={scheduleTuesday}/>
                </div>
                <div>
                    <p className={'font-bold text-xl'}>Rabu</p>
                    <DataTableWODelete columns={columns} data={scheduleWednesday}/>
                </div>
                <div>
                    <p className={'font-bold text-xl'}>Kamis</p>
                    <DataTableWODelete columns={columns} data={scheduleThursday}/>
                </div>
                <div>
                    <p className={'font-bold text-xl'}>Jumat</p>
                    <DataTableWODelete columns={columns} data={scheduleFriday}/>
                </div>
            </div>
        </div>
    )
}