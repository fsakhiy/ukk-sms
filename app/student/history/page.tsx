"use server"

import {getServerSession} from "next-auth";
import prisma from '@/components/db/prisma'
import {parsePresenceStatus} from "@/components/sharedFunction/functions";
import {columns, DailyStudentPresenceDataTableType} from "@/app/student/history/columns";
import {DataTableWODelete} from "@/components/web-component/DataTableWODelete";

export default async function StudentDailyPresenceHistory() {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userData.user.name
        },
        include: {
            student: true
        }
    })

    const dailyPresenceData = await prisma.studentPresence.findMany({
        where: {
            // @ts-ignore
            studentId: userDataFromDB.studentId
        },
        orderBy: {
            effectiveDate: 'asc'
        }
    })

    const presenceDataModified: DailyStudentPresenceDataTableType[] = []
    dailyPresenceData.map((data, index) => {
        presenceDataModified.push({
            id: index + 1,
            date: data.effectiveDate.toDateString(),
            status: parsePresenceStatus(data.status),
            logTime: data.logTime?.toTimeString().split(' ')[0] ?? ''
        })
    })

    return (
        <div className={'pl-5 lg:pl-10 pr-5 lg:pr-10 pt-10 flex flex-col'}>
            <h1 className={'font-bold text-3xl'}>Data Presensi - {userDataFromDB?.student.name}</h1>
            <div>

            </div>
            <div>
                <DataTableWODelete columns={columns} data={presenceDataModified} />
            </div>
        </div>
    )
}