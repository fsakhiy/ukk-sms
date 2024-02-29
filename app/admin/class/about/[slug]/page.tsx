"use server"
import prisma from "@/components/db/prisma"
import Link from "next/link";
import {Button} from "@/components/ui/button";
import CreateStudentForm, {ClassroomDataType} from "@/app/admin/student/CreationForm";
import {
    ClassDataInClassroom,
    columns,
    StudentDataInClassroom,
    subjectColumn
} from "@/app/admin/class/about/[slug]/columns";
import {DataTable} from "@/components/web-component/DataTable";
import {deleteStudentData} from "@/app/admin/student/action";
import {DataTableWODelete} from "@/components/web-component/DataTableWODelete";

export default async function AboutClassroom({ params }: { params: { slug: string } }) {
    const classroomData = await prisma.classroom.findUnique({
        where: {
            id: +params.slug
        }
    })

    if(!classroomData) {
        return (
            <div className={'p-10'}>
                <h1 className={'font-bold text-3xl'}>
                    data kelas tidak ditemukan
                </h1>
                <div>
                    <Link href={'/admin/classroom'} className={'text-blue-600 hover:text-blue-800 underline'}>cari semua data kelas</Link>
                </div>
            </div>
        )
    } else {
        const studentsData = await prisma.student.findMany({
            where: {
                classroomId: +params.slug,
                isDeleted: false
            }
        })

        const classroom = await prisma.classroom.findMany()
        const modifiedClassroom: ClassroomDataType[] = []
        classroom.map((classroom) => {
            modifiedClassroom.push({
                classroomId: classroom.id,
                name: classroom.name
            })
        })

        const studentUser = await prisma.user.findMany()

        const modifiedStudentData: StudentDataInClassroom[] = []

        const auditData = await prisma.auditLog.findMany({
            where: {
                actionType: "CREATE",
                tableName: "Student",
            },
            select: {
                user: true,
                dataId: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })


        studentsData.map((student) => {
            modifiedStudentData.push({
                id: student.id,
                name: student.name,
                username: studentUser.find((user) => user.studentId === student.id)?.username ?? 'pengguna tidak ditemukan',
                // @ts-ignore
                createdBy: auditData.find((audit) => audit.dataId === student.id).user.username,
                createdAt: student.createdAt
            })
        })

        const mainScheduleData = await prisma.mainSchedule.findFirst({
            where: {
                classroomId: classroomData.id
            },
        })

        const classDetailData = await prisma.classesDetail.findMany({
            where: {
                mainScheduleId: mainScheduleData?.id
            },
            include: {
                scheduleOrder: true,
                subject: true
            }
        })

        const scheduleDataForTable: ClassDataInClassroom[] = []
        classDetailData.map((data, index) => {
            scheduleDataForTable.push({
                id: index,
                subject: data.subject.name,
                day: data.scheduleOrder.day,
                scheduleOrder: data.scheduleOrder.name
            })
        })

        return (
            <div className={'p-10 flex w-full flex-col space-y-5'}>
                <div className={'flex items-center space-x-3'}>
                    <h1 className={'font-bold text-3xl'}>Data Kelas - {classroomData.name}</h1>
                    <Link href={'/admin/class'}>
                        <Button variant={'outline'}>
                            lihat semua data
                        </Button>
                    </Link>
                    <CreateStudentForm classrooms={modifiedClassroom} />
                </div>
                <div>
                    <h2 className={'font-semibold text-xl'}>Daftar Siswa:</h2>

                    <div>
                        <DataTable columns={columns} data={modifiedStudentData} handler={deleteStudentData} />
                    </div>

                    <h2 className={'font-semibold text-xl'}>Data jadwal kelas:</h2>
                    <div>

                        <DataTableWODelete columns={subjectColumn} data={scheduleDataForTable} />

                        {/*<ul>*/}
                        {/*    {classDetailData.map((data) => (*/}
                        {/*        <li key={data.id}>{data.subject.name} - {data.scheduleOrder.day} - {data.scheduleOrder.name}</li>*/}
                        {/*    ))}*/}
                        {/*</ul>*/}
                    </div>

                    <div className={'flex flex-col'}>
                        <span>
                            mau menambah data murid baru? <Link href={'/admin/student'} className={'text-blue-600 hover:text-blue-800 underline'}>Klik Disini!</Link>
                        </span>
                        <span>
                            mau melihat data yang dihapus? <Link href={'/admin/student/trash'} className={'text-blue-600 hover:text-blue-800 underline'}>pergi kesini!</Link>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}