"use server"
import prisma from "@/components/db/prisma";
import {revalidatePath} from "next/cache";
import {getServerSession} from "next-auth";


async function createNewClass(name: string) {
    const userData  = await getServerSession()

    const dataInsertion = await prisma.classroom.create({
        data: {
            name: name
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

    const auditInsertion = await prisma.auditLog.create({
        data: {
            actionType: "CREATE",
            tableName: "Classroom",
            // @ts-ignore
            userId: userDataFromDB.id,
            dataId: dataInsertion.id
        }
    })

    revalidatePath('/admin/class')
}

async function deleteClassroom(ids: number[]) {
    const userData = await getServerSession()

    await prisma.classroom.updateMany({
        where: {
            id: {
                in: ids
            }
        },
        data: {
            isDeleted: true
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
                actionType: "DELETE",
                tableName: "Classroom",
                // @ts-ignore
                userId: userDataFromDB.id,
                dataId: id
            }
        })
    })
    revalidatePath('/admin/class')
}

async function restoreClassroom(ids: number[]) {
    const userData = await getServerSession()

    await prisma.classroom.updateMany({
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
                tableName: "Classroom",
                // @ts-ignore
                userId: userDataFromDB.id,
                dataId: id
            }
        })
    })
    revalidatePath('/admin/class/trash')
}

export { createNewClass, deleteClassroom, restoreClassroom}
