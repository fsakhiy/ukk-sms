"use server"

import {revalidatePath} from "next/cache";
import prisma from '@/components/db/prisma'
import {isTimeValid} from "@/components/sharedFunction/functions";

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
            classes: {
                include: {
                    classesDetail: {
                        include: {
                            scheduleOrder: true
                        }
                    }
                }
            }
        }
    })

    if(classCode != classDetail?.classes.classCode) {
        throw new Error(`kode ${classCode} salah`)
    }

    const presenceData = await prisma.studentClassPresence.update({
        where: {
            id: classId
        },
        data: {
            logTime: new Date(),
            status: isTimeValid(new Date(), classDetail?.classes.classesDetail.scheduleOrder.endTime ?? new Date()) ? 'ON_TIME' : 'LATE'
        }
    })

    revalidatePath('/student/class')

}

export { logToClass, logToClassNew }