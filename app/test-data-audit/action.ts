"use server"
import prisma from "@/components/db/prisma";
import { Prisma } from "@prisma/client";

interface DummyData {
    first: string;
    second: string;
}

export default async function createDummyData({first, second}: DummyData): Promise<Boolean> {

    try {
        const submitData = await prisma.dummyTable.create({
            data: {
                first: first,
                second: second
            }
        })
    } catch (e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            return false
        }
    }

    return true
}