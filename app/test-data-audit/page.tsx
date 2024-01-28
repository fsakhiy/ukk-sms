import TestForm from "@/components/web-component/testForm";
import prisma from "@/components/db/prisma";
import { DataTableType, columns } from "@/app/test-data-audit/columns";
import { DataTable } from "@/app/test-data-audit/data-table";

export default async function testDataAuditPage () {



    const data = await prisma.dummyTable.findMany({
        where: {
            isDeleted: false
        },

    })

    const auditData = await prisma.auditLog.findMany({
        where: {
            tableName: "DummyTable",
            actionType: "CREATE",
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
        <div className={'p-5 min-h-screen'}>
            <div className={'font-bold text-3xl text-center'}>
                audit logging test
            </div>
            <TestForm />

            <br/>
            <div className={'p-5'}>
                <DataTable columns={columns} data={modifiedData} />
            </div>
        </div>
    )
}