"use server"

import {revalidatePath} from "next/cache";
import prisma from '@/components/db/prisma'

const logToClass = async (studentId: number, classId: number) => {
    const presenceData = await prisma.studentClassPresence.update({
        where: {
            id: classId
        },
        data: {
            logTime: new Date(),
            status: 'ON_TIME'
        }
    })

    revalidatePath('/student/class')
}

export { logToClass }