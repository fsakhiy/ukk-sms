"use server"

import {DataTable} from "@/components/web-component/DataTable";
import CreateSubjectForm from "@/app/admin/subject/creationForm";
import prisma from '@/components/db/prisma'
import {columns, SubjectDataType} from "@/app/admin/subject/columns";
import {deleteSubjectData} from "@/app/admin/subject/action";


export default async function SubjectPage () {

    const modifiedData: SubjectDataType[] = []
    const subjectData = await prisma.subject.findMany({
        where: {
            isDeleted: false
        },
        include: {
            teacher: true
        }
    })
    const teachersData = []

    const auditData = await prisma.auditLog.findMany({
        where: {
            actionType: "CREATE",
            tableName: "Subject"
        },
        select: {
            user: true,
            dataId: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    subjectData.map((subject) => {
        modifiedData.push({
            id: subject.id,
            name: subject.name,
            teacher: subject?.teacher?.name ?? '',
            // @ts-ignore
            createdBy: auditData.find((data) => data.dataId === subject.id).user.username,
            createdAt: subject.createdAt
        })
    })

    return (
        <div className={'p-10 w-full flex flex-col space-y-5 justify-center items-center'}>

            <div className={'flex w-full items-center space-x-5'}>
                <h1 className={'font-bold text-3xl'}>
                    Data Mata Pelajaran
                </h1>
                <div>
                    {/*<CreateStudentForm classrooms={modifiedClassrooms}/>*/}
                    <CreateSubjectForm />
                </div>
            </div>

            <div className={'w-full'}>
                <div className={'w-full'}>
                    {/*<DataTable columns={columns} data={modifiedStudentData} handler={deleteStudentData}/>*/}
                    <DataTable columns={columns} data={modifiedData} handler={deleteSubjectData} />
                </div>
            </div>

        </div>
    )
}