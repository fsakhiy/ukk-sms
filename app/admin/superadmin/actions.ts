"use server"

import prisma from '@/components/db/prisma'
import {revalidatePath} from "next/cache";

async function deleteAdmin(ids: number[]) {
    const deleteAdmin = await prisma.user.deleteMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    revalidatePath('/admin/superadmin')
}

export { deleteAdmin }