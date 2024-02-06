"use server"

import CreateStudentForm, {ClassroomDataType} from "@/app/admin/student/CreationForm";
import prisma from '@/components/db/prisma'
import CreateScheduleForm from "@/app/admin/schedule/CreationForm";
import {DataTable} from "@/components/web-component/DataTable";
import {columns} from "@/app/admin/schedule/columns";
import {deleteSchedule} from "@/app/admin/schedule/action";

export default async function StudentPage() {

    const modifiedClassrooms: ClassroomDataType[] = []
    const classrooms = await prisma.classroom.findMany()
    classrooms.map((classroom) => {
        modifiedClassrooms.push({
            classroomId: classroom.id,
            name: classroom.name
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
                    {/*<DataTable columns={columns} data={modifiedData} handler={deleteSchedule}/>*/}
                </div>
            </div>

        </div>
    )
}