"use server"

import CreateStudentForm, {ClassroomDataType} from "@/app/admin/student/CreationForm";
import prisma from '@/components/db/prisma'
import CreateScheduleForm from "@/app/admin/schedule/CreationForm";
import {DataTable} from "@/components/web-component/DataTable";
import {columns} from "@/app/admin/student/columns";
import {deleteSchedule} from "@/app/admin/schedule/action";
import {StudentDataTableType} from "@/app/admin/student/columns";
import {deleteStudentData} from "@/app/admin/student/action";

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
            dataId: true
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
            // @ts-ignore
            createdBy: auditData.find((data) => data.dataId === student.id).user.username,
            createdAt: student.createdAt
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
                    <DataTable columns={columns} data={modifiedStudentData} handler={deleteStudentData}/>
                </div>
            </div>

        </div>
    )
}