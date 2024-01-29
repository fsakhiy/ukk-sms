import TestForm from "@/components/web-component/testForm";
import prisma from "@/components/db/prisma";
import { DataTableType, columns } from "@/app/test-data-audit/columns";
import { DataTable } from "@/app/test-data-audit/data-table";
import {restoreDummyData} from "@/app/test-data-audit/action";

export default async function testDataAuditPage () {



    const data = await prisma.dummyTable.findMany({
        where: {
            isDeleted: true
        },

    })

    const auditData = await prisma.auditLog.findMany({
        where: {
            tableName: "DummyTable",
            actionType: "DELETE",
        },
        select: {
            user: true,
            dataId: true
        }
    })


    const modifiedData: DataTableType[] = []
    data.map((eachData) => (
        modifiedData.push({
            id: eachData.id,
            firstData: eachData.first,
            secondData: eachData.second,
            createdAt: eachData.createdAt,
            // @ts-ignore
            createdBy: auditData.find((data) => data.dataId === eachData.id).user.username
            // createdBy: "test user"
        })
    ))

    return (
        <div className={'p-5 min-h-screen space-y-5'}>
            <div className={'font-bold text-3xl text-center'}>
                audit logging test trash bin
            </div>

            {/*<TestForm />*/}

            <div className={'p-5'}>
                <DataTable columns={columns} data={modifiedData} text={'restore'} handler={restoreDummyData} />
            </div>
        </div>
    )
}