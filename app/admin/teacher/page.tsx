"use server"

import {DataTable} from "@/components/web-component/DataTable";
import prisma from '@/components/db/prisma'
import CreateTeacherForm, {SubjectDataType} from "@/app/admin/teacher/creationForm";
import {columns, TeacherDataType} from "@/app/admin/teacher/columns";
import {deleteTeacherData} from "@/app/admin/teacher/action";


export default async function SubjectPage () {
    const teacherData = await prisma.teacher.findMany({
        where: {
            isDeleted: false
        },
        include: {
            Subject: true
        }
    })
    const modifiedTeacherData: TeacherDataType[] = []

    const auditLog = await prisma.auditLog.findMany({
        where: {
            actionType: "CREATE",
            tableName: "Teacher"
        },
        select: {
            user: true,
            dataId: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const teacherUser = await prisma.user.findMany({
        where: {
            accountType: "TEACHER"
        }
    })

    teacherData.map((teacher) => {
        modifiedTeacherData.push({
            id: teacher.id,
            name: teacher.name,
            subject: teacher.Subject.name,
            username: teacherUser.find((data) => data.teacherId === teacher.id)?.username ?? 'user tidak ditemukan',
            // @ts-ignore
            createdBy: auditLog.find((data) => data.dataId === teacher.id).user.username ,
            createdAt: teacher.createdAt
        })
    })

    const subjectData = await prisma.subject.findMany()
    const modifiedSubjectData: SubjectDataType[] = []
    subjectData.map((subject) => {
        modifiedSubjectData.push({
            subjectId: subject.id,
            name: subject.name
        })
    })

    return (
        <div className={'p-10 w-full flex flex-col space-y-5 justify-center items-center'}>

            <div className={'flex w-full items-center space-x-5'}>
                <h1 className={'font-bold text-3xl'}>
                    Data Guru Mata Pelajaran
                </h1>
                <div>
                    {/*<CreateStudentForm classrooms={modifiedClassrooms}/>*/}
                    <CreateTeacherForm subjects={modifiedSubjectData} />
                </div>
            </div>

            <div className={'w-full'}>
                <div className={'w-full'}>
                    {/*<DataTable columns={columns} data={modifiedStudentData} handler={deleteStudentData}/>*/}
                    <DataTable columns={columns} data={modifiedTeacherData} handler={deleteTeacherData} />
                </div>
            </div>

        </div>
    )
}