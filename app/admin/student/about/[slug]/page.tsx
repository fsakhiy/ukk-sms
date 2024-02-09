"use server"
import prisma from '@/components/db/prisma'

export default async function Page({ params }: { params: { slug: string } }) {
    // return <div>My Post: {params.slug}</div>
    const studentData = await prisma.student.findUnique({
        where: {
            id: +params.slug
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
               <h1 className={'font-bold text-3xl'}>Murid - {studentData.name}</h1>
            </div>
        )
    }
}