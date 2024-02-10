"use server"

import prisma from '@/components/db/prisma'
import {columns, ScheduleOrderDataTableType} from "@/app/admin/schedule/option/schedule-order/columns";
import {DataTable} from "@/components/web-component/DataTable";
import {DummyHandler} from "@/app/admin/schedule/option/schedule-order/action";

export default async function ScheduleOrderMasterOptionPage() {
    const optionDetail = await prisma.scheduleOrderMasterOption.findMany()
    const optionDetailModified: ScheduleOrderDataTableType[] = []

    optionDetail.map((detail) => {
        optionDetailModified.push({
            id: detail.id,
            name: detail.name,
            startTime: detail.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
            endTime: detail.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
        })
    })

    return (
        <div className={'p-10 flex flex-col'}>
            <div >
                <h1 className={'font-bold text-3xl'}>Opsi Urutan Jadwal</h1>
            </div>
            <div>
                <DataTable columns={columns} data={optionDetailModified} handler={DummyHandler} />
            </div>
        </div>
    )
}