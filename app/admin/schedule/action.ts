"use server"

import prisma from '@/components/db/prisma'

import {z} from "zod";
import {scheduleFormSchema} from "@/app/admin/schedule/CreationForm";
import {revalidatePath} from "next/cache";
import {getServerSession} from "next-auth";

async function createNewSchedule(values: z.infer<typeof scheduleFormSchema>) {

    const userData = await getServerSession()
    // console.log(classroomData)

    const schedule = await prisma.mainSchedule.create({
        data: {
            name: values.name,
            classroomId: +values.classroom,
            startPeriod: values.startDate,
            endPeriod: values.endDate
        }, select: {
            id: true
        }
    })

    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userData.user.name
        }
    })

    const auditData = await prisma.auditLog.create({
        data: {
            tableName: "Schedule",
            dataId: schedule.id,
            actionType: "CREATE",
            // @ts-ignore
            userId: userDataFromDB.id
        }
    })

    revalidatePath('/admin/schedule')
}

async function deleteSchedule(ids: number[]){
    const userData = await getServerSession()

    await prisma.mainSchedule.updateMany({
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
                tableName: "Schedule",
                // @ts-ignore
                userId: userDataFromDB.id,
                dataId: id
            }
        })
    })
    revalidatePath('/admin/schedule')

}

export { createNewSchedule, deleteSchedule }