"use server"

import {z} from "zod";
import {studentFormSchema} from "@/app/admin/student/CreationForm";
import prisma from '@/components/db/prisma'
import {getServerSession} from "next-auth";
import {revalidatePath} from "next/cache";

async function createNewStudent(values: z.infer<typeof studentFormSchema>) {
    const userData = await getServerSession()

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

    const userDataFromDB = await prisma.user.findUnique({
        where: {
            // @ts-ignore
            username: userData.user.name
        }
    })

    const auditData = await prisma.auditLog.create({
        data: {
            tableName: "Student",
            actionType: "CREATE",
            // @ts-ignore
            userId: userDataFromDB.id,
            dataId: studentData.id
        }
    })

    revalidatePath('/admin/student')
}

export { createNewStudent }