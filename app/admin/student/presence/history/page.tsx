"use server"

import prisma from "@/components/db/prisma"
import {columns, studentPresenceTableType} from "@/app/admin/student/presence/columns";
import {parsePresenceStatus} from "@/components/sharedFunction/functions";
import {DataTableWODelete} from "@/components/web-component/DataTableWODelete";
export default async function StudentPresenceHistory() {
    const studentPresence = await prisma.studentPresence.findMany({
        include: {
            student: {
                include: {
                    classroom: true
                }
            }
        },
        orderBy: {
            effectiveDate: 'asc'
        }
    })
    const studentPresenceTableData: studentPresenceTableType[] = []

    studentPresence.map((data, index) => {
        studentPresenceTableData.push({
            id: index,
            name: data.student.name,
            classroom: data.student.classroom.name,
            effectiveDate: data.effectiveDate.toDateString(),
            status: parsePresenceStatus(data.status),
            logTime: data.logTime?.toTimeString() ?? ''
        })
    })

    return (
        <div className={'p-10'}>
            <h1 className={'font-bold text-3xl'}>Data Riwayat Presensi Semua Murid</h1>

            <div>
                <DataTableWODelete columns={columns} data={studentPresenceTableData} />
            </div>
        </div>
    )
}