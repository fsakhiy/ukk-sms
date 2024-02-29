"use server"

import prisma from "@/components/db/prisma"
import {columns, studentPresenceTableType} from "@/app/admin/student/presence/columns";
import {parsePresenceStatus} from "@/components/sharedFunction/functions";
import {DataTableWODeleteWSearch} from "@/components/web-component/DataTableWODeleteWSearch";

export default async function Presence () {
    const studentPresence = await prisma.studentPresence.findMany({
        where: {
            effectiveDate: {
                equals: new Date(new Date().setDate(23))
            }
        },
        include: {
            student: {
                include: {
                    classroom: true
                }
            }
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
            <h1 className={'font-bold text-3xl'}>Data Presensi Semua Murid Hari Ini</h1>

            <div>
                <DataTableWODeleteWSearch columns={columns} data={studentPresenceTableData} searchPlaceholder={'Cari siswa...'} searchKey={'name'} />
            </div>
        </div>
    )
}