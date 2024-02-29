"use server"

import {z} from "zod";
import {formSchema} from "@/components/ui/admin/LateSetting";
import prisma from '@/components/db/prisma'
import {revalidatePath} from "next/cache";

const changeLateSetting = async (values: z.infer<typeof formSchema>) => {
    const newTime = new Date(new Date().setHours(+values.time.split(":")[0], +values.time.split(":")[1], 0, 0))

    const lateSetting = await prisma.latePresenceMasterOption.update({
        where: {
            id: 1
        },
        data: {
            lateTime: newTime
        }
    })

    revalidatePath('/admin/student/presence/option')
}

export {changeLateSetting}