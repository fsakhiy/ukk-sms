"use server"

import {z} from "zod";
import {subjectFormSchema} from "@/app/admin/subject/creationForm";
import prisma from '@/components/db/prisma'
import {getServerSession} from "next-auth";
import {revalidatePath} from "next/cache";

async function createNewSubject(values: z.infer<typeof subjectFormSchema>) {
    const userData = await getServerSession()

    const subject = await prisma.subject.create({
        data: {
            name: values.name
        },
        select: {
            id: true
        }
    })

    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userData.user.name
        }
    })

    const auditLog = await prisma.auditLog.create({
        data: {
            tableName: "Subject",
            actionType: "CREATE",
            dataId: subject.id,
            // @ts-ignore
            userId: userDataFromDB.id
        }
    })

    revalidatePath('/admin/subject')
}

async function deleteSubjectData(ids: number[]) {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userData.user.name
        }
    })

    const subjectData = await prisma.subject.updateMany({
        where: {
            id: {
                in: ids
            }
        },
        data: {
            isDeleted: true
        }
    })

    ids.map(async (id) => {
        const auditInsertion = await prisma.auditLog.create({
            data: {
                actionType: "DELETE",
                tableName: "Subject",
                // @ts-ignore
                userId: userDataFromDB.id,
                dataId: id
            }
        })
    })

    revalidatePath('/admin/subject')
}

export { createNewSubject, deleteSubjectData }