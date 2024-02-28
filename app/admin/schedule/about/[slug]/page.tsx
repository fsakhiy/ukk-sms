"use server"

import prisma from "@/components/db/prisma"
import {columns, ScheduleDetailDataType} from "@/app/admin/schedule/about/[slug]/columns";
import {DataTableWODelete} from "@/components/web-component/DataTableWODelete";

export default async function AboutSchedule({ params }: { params: { slug: string } }) {
    const scheduleData = await prisma.mainSchedule.findUnique({
        where: {
            id: +params.slug
        },
        include: {
            classroom: true,
            ClassesDetail: {
                include: {
                    subject: {
                        include: {
                            teacher: true
                        }
                    },
                    scheduleOrder: true
                }
            }
        }
    })

    const mondayData: ScheduleDetailDataType[] = []
    const tuesdayData: ScheduleDetailDataType[] = []
    const wednesdayData: ScheduleDetailDataType[] = []
    const thursdayData: ScheduleDetailDataType[] = []
    const fridayData: ScheduleDetailDataType[] = []


    scheduleData?.ClassesDetail.map((schedule) => {
        switch (schedule.scheduleOrder.day) {

            case('MONDAY'):
                mondayData.push({
                    id: schedule.id,
                    subject: schedule.subject.name,
                    teacher: schedule.subject.teacher?.name ?? 'tidak ada guru pengampu',
                    startTime: schedule.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: schedule.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrder: schedule.scheduleOrder.name
                })
                break;
            case('TUESDAY'):
                tuesdayData.push({
                    id: schedule.id,
                    subject: schedule.subject.name,
                    teacher: schedule.subject.teacher?.name ?? 'tidak ada guru pengampu',
                    startTime: schedule.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: schedule.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrder: schedule.scheduleOrder.name
                })
                break;
            case('WEDNESDAY'):
                wednesdayData.push({
                    id: schedule.id,
                    subject: schedule.subject.name,
                    teacher: schedule.subject.teacher?.name ?? 'tidak ada guru pengampu',
                    startTime: schedule.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: schedule.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrder: schedule.scheduleOrder.name
                })
                break;
            case('THURSDAY'):
                thursdayData.push({
                    id: schedule.id,
                    subject: schedule.subject.name,
                    teacher: schedule.subject.teacher?.name ?? 'tidak ada guru pengampu',
                    startTime: schedule.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: schedule.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrder: schedule.scheduleOrder.name
                })
                break;
            case('FRIDAY'):
                fridayData.push({
                    id: schedule.id,
                    subject: schedule.subject.name,
                    teacher: schedule.subject.teacher?.name ?? 'tidak ada guru pengampu',
                    startTime: schedule.scheduleOrder.startTime.toTimeString().split(' ')[0],
                    endTime: schedule.scheduleOrder.endTime.toTimeString().split(' ')[0],
                    scheduleOrder: schedule.scheduleOrder.name
                })
                break;
        }

    })

    return (
        <div className={'p-10 flex flex-col gap-10'}>
            <div className={'flex flex-col'}>
                <h1 className={'font-bold text-3xl'}>
                    Detail Jadwal
                </h1>
                <p className={'font-bold'}>
                    {scheduleData?.name} - {scheduleData?.classroom.name}
                </p>
            </div>

            <div className={'flex flex-col gap-5'}>

                <div className={'flex flex-col'}>
                    <p className={'font-bold text-xl'}>Senin</p>
                    <div>
                        <DataTableWODelete columns={columns} data={mondayData} />
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    <p className={'font-bold text-xl'}>Selasa</p>
                    <div>
                        <DataTableWODelete columns={columns} data={tuesdayData} />
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    <p className={'font-bold text-xl'}>Rabu</p>
                    <div>
                        <DataTableWODelete columns={columns} data={wednesdayData} />
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    <p className={'font-bold text-xl'}>Kamis</p>
                    <div>
                        <DataTableWODelete columns={columns} data={thursdayData} />
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    <p className={'font-bold text-xl'}>Jumat</p>
                    <div>
                        <DataTableWODelete columns={columns} data={fridayData} />
                    </div>
                </div>
            </div>

        </div>
    )
}