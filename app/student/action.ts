"use server"

import prisma from '@/components/db/prisma'
import {revalidatePath} from "next/cache";
import {isTimeValid} from "@/components/sharedFunction/functions";

async function doDailyPresence(studentId: number) {
    const lateTime = await prisma.latePresenceMasterOption.findUnique({
        where: {
            id: 1
        }
    })

    const dailyPresenceData = await prisma.studentPresence.update({
        where: {
            effectiveDate_studentId: {
                effectiveDate: new Date(),
                studentId: studentId
            }
        },
        data: {
            logTime: new Date(),
            status: isTimeValid(new Date(), lateTime?.lateTime ?? new Date()) ? 'ON_TIME' : 'LATE'
        }
    })

    revalidatePath('/student/')
}

export { doDailyPresence }