"use server"

import CreateStudentForm, {ClassroomDataType} from "@/app/admin/student/CreationForm";
import prisma from '@/components/db/prisma'
import {columns} from "@/app/admin/student/columns";
import {StudentDataTableType} from "@/app/admin/student/columns";
import {deleteStudentData} from "@/app/admin/student/action";
import {DataTableWSearch} from "@/components/web-component/DataTableWSearch";

export default async function StudentPage() {

    const modifiedClassrooms: ClassroomDataType[] = []
    const classrooms = await prisma.classroom.findMany()
    classrooms.map((classroom) => {
        modifiedClassrooms.push({
            classroomId: classroom.id,
            name: classroom.name
        })
    })

    const studentData = await prisma.student.findMany({
        include: {
            classroom: true
        },
        where: {
            isDeleted: false
        }
    })
    const modifiedStudentData: StudentDataTableType[] = []

    const auditData = await prisma.auditLog.findMany({
        where: {
            tableName: "Student",
            actionType: "CREATE"
        },
        select: {
            user: true,
            dataId: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const studentUser = await prisma.user.findMany({
        where: {
            accountType: "STUDENT"
        }
    })


    studentData.map((student) => {
        modifiedStudentData.push({
            id: student.id,
            name: student.name,
            classroom: student.classroom.name,
            username: studentUser.find((data) => data.studentId === student.id)?.username ?? 'user tidak ditemukan',
            createdBy: auditData.find((data) => data.dataId === student.id)?.user.username ?? 'user tidak ditemukan',
            createdAt: auditData.find((data) => data.dataId === student.id)?.createdAt ?? new Date('1/1/1970')
        })
    })

    return (
        <div className={'p-10 w-full flex flex-col space-y-5 justify-center items-center'}>

            <div className={'flex w-full items-center space-x-5'}>
                <div className={'font-bold text-3xl'}>
                    Data Murid Sekolah
                </div>
                <div>
                    <CreateStudentForm classrooms={modifiedClassrooms}/>
                </div>
            </div>

            <div className={'w-full'}>
                <div className={'w-full'}>
                    <DataTableWSearch
                        columns={columns}
                        data={modifiedStudentData}
                        handler={deleteStudentData}
                        searchKey={'name'}
                        searchPlaceholder={'Cari nama siswa...'}
                    />
                </div>
            </div>

        </div>
    )
}