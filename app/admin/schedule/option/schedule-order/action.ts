"use server"

import {z} from "zod";
import {scheduleOrderSchema} from "@/app/admin/schedule/option/schedule-order/CreationForm";
import prisma from "@/components/db/prisma"
import {Day} from "@prisma/client";
import {revalidatePath} from "next/cache";

async function DummyHandler(ids: number[]) {
    const dataDeletion = await prisma.scheduleOrderMasterOption.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    revalidatePath('/admin/schedule/option/schedule-order')
}

async function CreateNewScheduleOrderAction(values: z.infer<typeof scheduleOrderSchema>) {
    const startTime = values.startTime.split(":")
    const startTimeParsed = new Date(1970, 1, 1, (+startTime[0]), +startTime[1], 0, 0)
    const endTime = values.endTime.split(":")
    const endTimeParsed = new Date(1970, 1, 1,(+endTime[0]), +endTime[1], 0, 0)


    const scheduleOrder = await prisma.scheduleOrderMasterOption.create({
        data: {
            name: values.name,
            day: values.day as Day,
            startTime: startTimeParsed,
            endTime: endTimeParsed
        }
    })

    revalidatePath('/admin/schedule/option/schedule-order')
}

export { DummyHandler, CreateNewScheduleOrderAction }