"use server"
import prisma from "@/components/db/prisma";
import {revalidatePath} from "next/cache";

export async function createDummyData(formData: FormData) {
    const firstData = formData.get("first")
    const secondData = formData.get("second")

    const data = await prisma.dummyTable.create({
        data: {
            first: firstData as string,
            second: secondData as string
        }
    })

    revalidatePath('/test-data-audit')
}