"use server"
import CreateClassForm from "@/app/admin/class/CreationForm";
import prisma from '@/components/db/prisma'

export default async function ClassPage () {
    const classroomData = await prisma.classroom.findMany

    return (
        <div className={'p-10 w-full flex flex-col space-y-5 justify-center items-center'}>
            <div className={'font-bold text-3xl'}>
                Data Kelas
            </div>
                
            <CreateClassForm />
            <div>
                this is gonna be data table
            </div>

        </div>
    )
}