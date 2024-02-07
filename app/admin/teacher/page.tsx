"use server"

import {DataTable} from "@/components/web-component/DataTable";
import CreateSubjectForm from "@/app/admin/subject/creationForm";
import prisma from '@/components/db/prisma'


export default async function SubjectPage () {
    const teacherData = await prisma.teacher.findMany()


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
                </div>
            </div>

        </div>
    )
}