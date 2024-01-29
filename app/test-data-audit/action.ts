"use server"
import prisma from "@/components/db/prisma";
import {revalidatePath} from "next/cache";
import {pathIsRelative} from "next/dist/build/webpack/plugins/jsconfig-paths-plugin";

export async function createDummyData(formData: FormData) {
    const firstData = formData.get("first")
    const secondData = formData.get("second")

    const data = await prisma.dummyTable.create({
        data: {
            first: firstData as string,
            second: secondData as string
        },
        select: {
            id: true
        }
    })

    const createdByData = await prisma.auditLog.create({
        data: {
            actionType: "CREATE",
            tableName: "DummyTable",
            userId: 1,
            dataId: data.id
        }
    })

    revalidatePath('/test-data-audit')
}

export async function deleteDummyData(keys: number[]) {
    const updateData = await prisma.dummyTable.updateMany({
        where: {
            id: {
                in: keys
            }
        },
        data: {
            isDeleted: true
        }
    })

    for(const key of keys) {
        const createLogData = await prisma.auditLog.create({
            data: {dataId: key, actionType: "DELETE", userId: 1, tableName: "DummyTable"}
        })
    }

    revalidatePath('/test-data-audit')
}

export async function restoreDummyData(keys: number[]) {
    const updateData = await prisma.dummyTable.updateMany({
        where: {
            id: {
                in: keys
            }
        },
        data: {
            isDeleted: false
        }
    })

    for(const key of keys) {
        const createLogData = await prisma.auditLog.create({
            data: {dataId: key, actionType: "CREATE", userId: 1, tableName: "DummyTable"}
        })
    }

    revalidatePath('/test-data-audit/trash')

}