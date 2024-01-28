import TestForm from "@/components/web-component/testForm";
import prisma from "@/components/db/prisma";

export default async function testDataAuditPage () {
    const data = await prisma.dummyTable.findMany()

    return (
        <div>
            welcome to test page used for testing audit logging
            <br/>
            <TestForm />

            <br/>
            <div>
                <ul>
                    {data.map((eachData) => (
                        <li>{eachData.first}, {eachData.second}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}