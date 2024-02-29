"use server"

import prisma from '@/components/db/prisma'
import {z} from "zod";
import {teacherFormSchema} from "@/app/admin/teacher/creationForm";
import {getServerSession} from "next-auth";
import {revalidatePath} from "next/cache";
import * as bcrypt from "bcrypt";

async function createNewTeacher(values: z.infer<typeof teacherFormSchema>) {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userData.user.name
        }
    })

    const teacherData = await prisma.teacher.create({
        data: {
            name: values.name,
            subjectId: +values.subject
        },
        select: {
            id: true
        }
    })

    const teacherAuditData = await prisma.auditLog.create({
        data: {
            actionType: "CREATE",
            tableName: "Teacher",
            dataId: teacherData.id,
            // @ts-ignore
            userId: userDataFromDB.id
        }
    })

    const uniqueUsername = (values.name.split(" ")[0].toLowerCase()) + (Math.random() * 90 + 10).toFixed().toString().padStart(2, '0')
    const defaultPassword = await bcrypt.hash("12345", 12)

    const userForTeacher = await prisma.user.create({
        data: {
            username: uniqueUsername,
            password: defaultPassword,
            teacherId: teacherData.id,
            role: "TEACHER",
            accountType: "TEACHER"
        },
        select: {
            id: true
        }
    })

    const userAuditData = await prisma.auditLog.create({
        data: {
            actionType: "CREATE",
            tableName: "User",
            // @ts-ignore
            userId: userDataFromDB.id,
            dataId: userForTeacher.id
        }
    })

    revalidatePath('/admin/teacher')
}

async function deleteTeacherData(ids: number[]) {
    const userData = await getServerSession()
    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userData.user.name
        }
    })

    const teacherData = await prisma.teacher.updateMany({
        where: {
            id: {
                in: ids
            }
        },
        data: {
            isDeleted: true
        }
    })

    ids.map(async (id) => {
        const auditInsertion = prisma.auditLog.create({
            data: {
                actionType: "DELETE",
                tableName: "Teacher",
                dataId: id,
                // @ts-ignore
                userId: userDataFromDB.id
            }
        })
    })

    revalidatePath('/admin/teacher')
}

export { createNewTeacher, deleteTeacherData }