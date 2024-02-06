"use server"
import CreateScheduleForm, {ClassroomDataType} from "@/app/admin/schedule/CreationForm";
import prisma from "@/components/db/prisma"
import {columns, ScheduleDataTableType} from "@/app/admin/schedule/columns";
import {DataTable} from "@/components/web-component/DataTable";
import {deleteSchedule} from "@/app/admin/schedule/action";

export default async function SchedulePage() {


    const classroomsData = await prisma.classroom.findMany({
        where: {
            isDeleted: false
        }
    })
    const classroomsDataFiltered: ClassroomDataType[] = []
    classroomsData.map((classroom) => {
        classroomsDataFiltered.push({
            classroomId: classroom.id,
            name: classroom.name
        })
    })

    const schedules = await prisma.mainSchedule.findMany({
        where: {
            isDeleted: false
        },
        include: {
            classroom: true
        }
    })
    const auditData = await prisma.auditLog.findMany({
        where: {
            tableName: "Schedule",
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

    const modifiedData: ScheduleDataTableType[] = []
    schedules.map((eachData) => {
        modifiedData.push({
            id: eachData.id,
            name: eachData.name,
            classroom: eachData.classroom.name,
            startDate: eachData.startPeriod,
            endDate: eachData.endPeriod,
            // @ts-ignore
            createdBy: auditData.find((data) => data.dataId === eachData.id).user.username,
            createdAt: eachData.createdAt
        })
    })

    return (
        <div className={'p-10 w-full flex flex-col space-y-5 justify-center items-center'}>

            <div className={'flex w-full items-center space-x-5'}>
                <div className={'font-bold text-3xl'}>
                    Data Jadwal Sekolah
                </div>
                <div>
                    <CreateScheduleForm classrooms={classroomsDataFiltered} />
                </div>
            </div>

            <div className={'w-full'}>
                <div className={'w-full'}>
                    <DataTable columns={columns} data={modifiedData} handler={deleteSchedule} />
                </div>
            </div>

        </div>
    )
}