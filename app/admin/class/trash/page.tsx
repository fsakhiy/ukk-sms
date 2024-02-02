"use server"
import CreateClassForm from "@/app/admin/class/CreationForm";
import prisma from '@/components/db/prisma'
import {DataTable} from "@/components/web-component/DataTable";
import {ClassroomDataTableType, columns} from "@/app/admin/class/columns";
import {restoreClassroom} from "@/app/admin/class/action";


export default async function ClassPage () {
    const classroomData = await prisma.classroom.findMany({
        where: {
            isDeleted: true
        }
    })

    const auditData = await prisma.auditLog.findMany({
        where: {
            tableName: "Classroom",
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

    const modifiedData: ClassroomDataTableType[] = []

    classroomData.map((eachData) => (
        modifiedData.push({
            id: eachData.id,
            name: eachData.name,
            createdAt: eachData.createdAt,
            // @ts-ignore
            createdBy: auditData.find((data) => data.dataId === eachData.id).user.username
            // createdBy:
        })
    ))

    return (
        <div className={'p-10 w-full flex flex-col space-y-5 justify-center items-center'}>

            <div className={'flex w-full items-center space-x-5'}>
                <div className={'font-bold text-3xl'}>
                    Data Kelas (trash)
                </div>
                <div className={''}>
                    {/*<CreateClassForm />*/}
                </div>
            </div>

            <div className={'w-full'}>
                <div className={'w-full'}>
                    <DataTable columns={columns} data={modifiedData} handler={restoreClassroom} />
                </div>
            </div>

        </div>
    )
}