"use server"

import {z} from "zod";
import {studentFormSchema} from "@/app/admin/student/CreationForm";
import prisma from '@/components/db/prisma'
import {getServerSession} from "next-auth";
import {revalidatePath} from "next/cache";
import * as bcrypt from 'bcrypt'
import {inngest} from "@/components/inngest/client";

async function createNewStudent(values: z.infer<typeof studentFormSchema>) {
    const sessionData = await getServerSession()

    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: sessionData.user.name
        }
    })

    const studentData = await prisma.student.create({
        data: {
            name: values.name,
            schoolNumber: values.nis,
            nationalSchoolNumber: values.nisn,
            classroomId: +values.classroom
        },
        select: {
            id: true
        }
    })

    const uniqueUsername = (values.name.split(" ")[0]) + (Math.random() * 9000 + 1000).toFixed().toString().padStart(4, '0')
    const defaultPassword = await bcrypt.hash("12345", 12)

    const userData = await prisma.user.create({
        data: {
            username: uniqueUsername,
            studentId: studentData.id,
            password: defaultPassword,
            role: "STUDENT",
            accountType: "STUDENT"
        },
        select: {
            id: true
        }
    })

    const studentAuditData = await prisma.auditLog.create({
        data: {
            tableName: "Student",
            actionType: "CREATE",
            // @ts-ignore
            userId: userDataFromDB.id,
            dataId: studentData.id
        }
    })

    const userAuditData = await prisma.auditLog.create({
        data: {
            tableName: "User",
            actionType: "CREATE",
            // @ts-ignore
            userId: userDataFromDB.id,
            dataId: userData.id
        }
    })

    const studentScheduleGeneration = await inngest.send({
        name: "admin/student.schedule.generate",
        data: {
            studentId: studentData.id,
            classroomId: +values.classroom,
            period: {
                startFrom: new Date(),
                endIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            }
        }
    })

    revalidatePath('/admin/student')
    revalidatePath('/admin/class/about/*')
}

async function deleteStudentData(ids: number[]) {
    const userData = await getServerSession()

    const studentData = await prisma.student.updateMany({
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
                tableName: "Student",
                // @ts-ignore
                userId: userDataFromDB.id,
                dataId: id
            }
        })
    })
    revalidatePath('/admin/student')
    revalidatePath('/admin/class/about/*')
}

export { createNewStudent, deleteStudentData }