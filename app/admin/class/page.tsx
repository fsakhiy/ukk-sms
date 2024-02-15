"use server"
import CreateClassForm, {ScheduleOrderDataType, SubjectDataType} from "@/app/admin/class/CreationForm";
import prisma from '@/components/db/prisma'
import {DataTable} from "@/components/web-component/DataTable";
import {ClassroomDataTableType, columns} from "@/app/admin/class/columns";
import {deleteClassroom} from "@/app/admin/class/action";
import NewClassCreationForm, {ScheduleData, SubjectData} from "@/app/admin/class/CreationFormNew";


export default async function ClassPage () {
    const classroomData = await prisma.classroom.findMany({
        where: {
            isDeleted: false
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

    const subjects = await prisma.subject.findMany()
    const modifiedSubjects: SubjectDataType[] = []

    subjects.map((subject) => {
        modifiedSubjects.push({
            subjectId: subject.id,
            name: subject.name
        })
    })


    const scheduleOrderData = await prisma.scheduleOrderMasterOption.findMany({
        orderBy: {
            day: 'asc'
        }
    })

    const scheduleData: ScheduleData[] = []

    scheduleOrderData.map((subject) => {
        scheduleData.push({
            id: subject.id,
            name: subject.name,
            day: subject.day
        })
    })

    const subjectData: SubjectData[] = []
    subjects.map((subject) => {
        subjectData.push({
            id: subject.id,
            name: subject.name
        })
    })

    const scheduleOrder: ScheduleOrderDataType[] = [{id: 1, name: 'test', day: 'MONDAY', startPeriod: new Date(), endPeriod: new Date()}]

    return (
        <div className={'p-10 w-full flex flex-col space-y-5'}>

            <div className={'flex items-center w-full space-x-5'}>
                <div className={'font-bold text-3xl'}>
                    Data Kelas
                </div>
                    {/*<CreateClassForm subjects={modifiedSubjects} scheduleOrder={scheduleOrder} />*/}
                {/*<div className={'border p-5 rounded-lg'}>*/}
                {/*</div>*/}
                <NewClassCreationForm scheduleData={scheduleData} subjectData={subjectData} />
            </div>


            <div className={'w-full'}>
                <div className={'w-full'}>
                    <DataTable columns={columns} data={modifiedData} handler={deleteClassroom} />
                </div>
            </div>

        </div>
    )
}