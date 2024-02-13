"use server"

import prisma from "@/components/db/prisma";
import {revalidatePath} from "next/cache";

const deletionHandler = async (ids: number[]) => {
    const deleteStudent = await prisma.student.updateMany({
        where: {
            id: {
                in: ids
            }
        },
        data: {
            isDeleted: true
        }
    })

    revalidatePath(`/admin/class/about/${params.slug}`)
}

export { }