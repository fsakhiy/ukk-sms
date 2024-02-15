"use server"
import prisma from "@/components/db/prisma";
import {revalidatePath} from "next/cache";
import {getServerSession} from "next-auth";
import {ClassCreationData} from "@/app/admin/class/CreationFormNew";
import {inngest} from "@/components/inngest/client";


async function createNewClass(name: string) {
    const userData  = await getServerSession()

    const dataInsertion = await prisma.classroom.create({
        data: {
            name: name
        },
        select: {
            id: true,
            name: true
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

    const schedule = await prisma.mainSchedule.create({
        data: {
            name: dataInsertion.name,
            classroomId: dataInsertion.id,
        },
        select: {
            id: true
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

async function CreateClassAndSchedule(data: ClassCreationData ) {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userData.user.name
        }
    })

    const scheduleData = await prisma.scheduleOrderMasterOption.findMany()
    const subjectData = await prisma.subject.findMany()

    const finalData = [{}]

    data.scheduleData.map((data) => {
        const schedule = scheduleData.find((schedule) => schedule.id === data.id)

        finalData.push({
            subject: subjectData.find((subject) => subject.id === +data.selectedValue)?.name,
            className: `${schedule?.name} - ${schedule?.day}`,
            startTime: schedule?.startTime.toTimeString(),
            endTime: schedule?.endTime.toTimeString()
        })
    })


    const classroomCreation = await prisma.classroom.create({
        data: {
            name: data.className,
        },
        select: {
            id: true
        }
    })

    const classroomAuditLog = await prisma.auditLog.create({
        data: {
            actionType: "CREATE",
            dataId: classroomCreation.id,
            tableName: "Classroom",
            // @ts-ignore
            userId: userDataFromDB.id
        }
    })

    const mainScheduleCreation = await prisma.mainSchedule.create({
        data: {
            name: `${data.className} - schedule`,
            classroomId: classroomCreation.id,
        },
        select: {
            id: true
        }
    })

    const mainScheduleAuditLog = await prisma.auditLog.create({
        data: {
            actionType: "CREATE",
            dataId: mainScheduleCreation.id,
            tableName: "MainSchedule",
            // @ts-ignore
            userId: userDataFromDB.id
        }
    })

    const classDetailsArray = data.scheduleData.map(async (submittedData) => {
        const classDetailCreation = await prisma.classesDetail.create({
            data: {
                mainScheduleId: mainScheduleCreation.id,
                subjectId: +submittedData.selectedValue,
                scheduleOrderId: submittedData.id
            },
            select: {
                id: true,
                scheduleOrder: true
            }
        })

        return { id: classDetailCreation.id, scheduleOrder: classDetailCreation.scheduleOrder.day }
    })

    await inngest.send({
        name: "admin/class.detail.create",
        data: {
            period: {
                startFrom: new Date(),
                endIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            },
            classDetail: await Promise.all(classDetailsArray)
        }
    })

    revalidatePath('/admin/class')
}

export { createNewClass, deleteClassroom, restoreClassroom, CreateClassAndSchedule}
