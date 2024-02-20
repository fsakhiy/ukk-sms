"use server"

import prisma from '@/components/db/prisma'
import {revalidatePath} from "next/cache";

async function doDailyPresence(studentId: number) {
    const dailyPresenceData = await prisma.studentPresence.update({
        where: {
            effectiveDate_studentId: {
                effectiveDate: new Date(),
                studentId: studentId
            }
        },
        data: {
            logTime: new Date(),
            status: ((new Date().getHours()) >= 7 ? "LATE" : "ON_TIME")
        }
    })

    revalidatePath('/student/')
}

export { doDailyPresence }