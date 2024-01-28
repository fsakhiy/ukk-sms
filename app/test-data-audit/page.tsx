import TestForm from "@/components/web-component/testForm";
import prisma from "@/components/db/prisma";
import { DataTableType, columns } from "@/app/test-data-audit/columns";
import { DataTable } from "@/app/test-data-audit/data-table";

export default async function testDataAuditPage () {



    const data = await prisma.dummyTable.findMany()

    const modifiedData: DataTableType[] = []
    data.map((eachData) => (
        modifiedData.push({
            id: eachData.id,
            firstData: eachData.first,
            secondData: eachData.second,
            createdAt: eachData.createdAt
        })
    ))

    return (
        <div>
            welcome to test page used for testing audit logging
            <br/>
            <TestForm />

            <br/>
            <div className={'p-5'}>
                <DataTable columns={columns} data={modifiedData} />
            </div>
        </div>
    )
}