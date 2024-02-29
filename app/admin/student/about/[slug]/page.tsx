"use server"
import prisma from '@/components/db/prisma'
import {StudentSettingForm} from "@/components/ui/student/studentAccountSettings";

export default async function Page({ params }: { params: { slug: string } }) {
    // return <div>My Post: {params.slug}</div>
    const studentData = await prisma.student.findUnique({
        where: {
            id: +params.slug
        },
        include: {
            classroom: true,
            user: true
        }
    })

    if(!studentData) {
        return (
            <div className={'p-10'}>
                <h1 className={'font-bold text-3xl'}>Data murid tidak ditemukan</h1>
            </div>
        )
    } else {
        return (
            <div className={'p-10'}>
                <h1 className={'font-bold text-3xl'}>Murid - {studentData.name} - {studentData.classroom.name}</h1>
                <StudentSettingForm id={studentData?.user?.id ?? 0} username={studentData.user?.username ?? 'tidak ada'} />
            </div>
        )
    }
}