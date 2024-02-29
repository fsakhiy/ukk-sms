"use server"
import prisma from '@/components/db/prisma'
import {TeacherSettingForm} from "@/components/ui/teacher/teacherAccountSettings";

export default async function TeacherAboutPage({ params }: { params: { slug: string } }) {
    // return <div>My Post: {params.slug}</div>
    const teacherData = await prisma.teacher.findUnique({
        where: {
            id: +params.slug
        },
        include: {
            user: true,
        }
    })

    if(!teacherData) {
        return (
            <div className={'p-10'}>
                <h1 className={'font-bold text-3xl'}>Data guru tidak ditemukan</h1>
            </div>
        )
    } else {
        return (
            <div className={'p-10'}>
                <h1 className={'font-bold text-3xl'}>Guru - {teacherData.name}</h1>
                <TeacherSettingForm id={teacherData.user?.id ?? 0} username={teacherData.user?.username ?? 'tidak ada'} />
            </div>
        )
    }
}