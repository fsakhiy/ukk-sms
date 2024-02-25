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

const logToClassNew = async (studentId: number, classId: number, classCode: string) => {
    const classDetail = await prisma.studentClassPresence.findUnique({
        where: {
            id: classId
        },
        include: {
            classes: true
        }
    })

    console.log(classDetail?.classes.classCode)

    if(classCode != classDetail?.classes.classCode) {
        throw new Error(`kode ${classCode} salah`)
    }

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

export { logToClass, logToClassNew }