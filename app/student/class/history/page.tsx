"use server"

import {columns, StudentClassPresenceDataTableType} from "@/app/student/class/history/columns";
import {getServerSession} from "next-auth";
import prisma from "@/components/db/prisma";
import {parsePresenceStatus, parseScheduleDay} from "@/components/sharedFunction/functions";
import {DataTableWODelete} from "@/components/web-component/DataTableWODelete";

export default async function StudentClassPresenceHistory () {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            username: userData?.user?.name || ""
        },
        include: {
            student: true
        }
    })

    const classInfo = await prisma.studentClassPresence.findMany({
        where: {
            studentId: userDataFromDB?.student?.id
        },
        include: {
            classes: true
        },
        orderBy: {
            effectiveDate: 'asc'
        }
    })


    const classDetail = await prisma.classesDetail.findMany({
        include: {
            subject: true,
            scheduleOrder: true
        }
    })

    const finalClassPresenceData: StudentClassPresenceDataTableType[] = []
    classInfo.map((info, index) => {
        finalClassPresenceData.push({
            id: index,
            date: info.effectiveDate,
            subject: classDetail.find((detail) => detail.id === info.classes.classesDetailId)?.subject.name ?? "data pelajaran tidak ditemukan",
            day: parseScheduleDay(classDetail.find((detail) => detail.id === info.classes.classesDetailId)?.scheduleOrder.day as string),
            scheduleOrder: classDetail.find((detail) => detail.id === info.classes.classesDetailId)?.scheduleOrder.name ?? "data tidak ditemukan",
            status: parsePresenceStatus(info.status)
        })
    })

    return(
        <div className={'p-10 w-full flex flex-col'}>
            <h1 className={'font-bold text-3xl'}>Riwayat Presensi</h1>
            <DataTableWODelete columns={columns} data={finalClassPresenceData} />
        </div>
    )
}