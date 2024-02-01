"use server"
import prisma from "@/components/db/prisma";

async function createNewClass(name: string) {
    const dataInsertion = await prisma.classroom.create({
        data: {
            name: name
        }
    })
}

export default createNewClass