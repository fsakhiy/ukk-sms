"use server"

import prisma from '@/components/db/prisma'
import {getServerSession} from "next-auth";
import {revalidatePath} from "next/cache";

async function recoverStudentData(ids: number[]) {
    const userData = await getServerSession()

    const studentData = await prisma.student.updateMany({
        where: {
            id: {
                in: ids
            }
        },
        data: {
            isDeleted: false
        }
    })

    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userData.user.name
        }
    })

    ids.map(async (id) => {
        const auditInsertion = await prisma.auditLog.create({
            data: {
                actionType: "CREATE",
                tableName: "Student",
                // @ts-ignore
                userId: userDataFromDB.id,
                dataId: id
            }
        })
    })
    revalidatePath('/admin/student/trash')
    // revalidatePath('/admin/class/about/*')
}

export {recoverStudentData}