"use server"

import {ClassroomDataType} from "@/app/admin/student/CreationForm";
import prisma from "@/components/db/prisma";
import {columns, StudentDataTableType} from "@/app/admin/student/columns";
import {DataTable} from "@/components/web-component/DataTable";
import {recoverStudentData} from "@/app/admin/student/trash/action";

export default async function StudentTrashPage() {
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
            isDeleted: true
        }
    })
    const modifiedStudentData: StudentDataTableType[] = []

    const auditData = await prisma.auditLog.findMany({
        where: {
            tableName: "Student",
            actionType: "DELETE"
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
            // @ts-ignore
            createdBy: auditData.find((data) => data.dataId === student.id).user.username,
            // @ts-ignore
            createdAt: auditData.find((data) => data.dataId === student.id)?.createdAt,
            // createdAt: student.createdAt
        })
    })

    return (
        <div className={'p-10'}>
            <div>
                <h1 className={'font-bold text-3xl'}>
                    Sampah - Murid
                </h1>
            </div>
            <div>
                <DataTable columns={columns} data={modifiedStudentData} handler={recoverStudentData} />
            </div>
        </div>
    )
}