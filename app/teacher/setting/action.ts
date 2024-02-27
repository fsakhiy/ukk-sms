"use server"

import prisma from '@/components/db/prisma'
import * as bcrypt from "bcrypt";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {formSchema} from "@/components/ui/teacher/teacherAccountSettings";

async function updateUserInformation(userId: number, values: z.infer<typeof formSchema>) {
    const userData = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            username: values.username,
            password: await bcrypt.hash(values.password, 12)
        }
    })

    revalidatePath('/teacher/setting')
}

export { updateUserInformation }