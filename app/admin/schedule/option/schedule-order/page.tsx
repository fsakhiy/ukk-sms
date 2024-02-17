"use server"

import prisma from '@/components/db/prisma'
import {columns, ScheduleOrderDataTableType} from "@/app/admin/schedule/option/schedule-order/columns";
import {DataTable} from "@/components/web-component/DataTable";
import {DummyHandler} from "@/app/admin/schedule/option/schedule-order/action";
import CreateNewScheduleOrder from "@/app/admin/schedule/option/schedule-order/CreationForm";

export default async function ScheduleOrderMasterOptionPage() {
    const optionDetail = await prisma.scheduleOrderMasterOption.findMany()

    const optionDetailMonday: ScheduleOrderDataTableType[] = []
    const optionDetailTuesday: ScheduleOrderDataTableType[] = []
    const optionDetailWednesday: ScheduleOrderDataTableType[] = []
    const optionDetailThursday: ScheduleOrderDataTableType[] = []
    const optionDetailFriday: ScheduleOrderDataTableType[] = []

    optionDetail.map((detail) => {
        switch (detail.day) {
            case "MONDAY":
                optionDetailMonday.push({
                    id: detail.id,
                    name: detail.name,
                    startTime: detail.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                    endTime: detail.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                })
                break
            case "TUESDAY":
                optionDetailTuesday.push({
                    id: detail.id,
                    name: detail.name,
                    startTime: detail.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                    endTime: detail.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                })
                break
            case "WEDNESDAY":
                optionDetailWednesday.push({
                    id: detail.id,
                    name: detail.name,
                    startTime: detail.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                    endTime: detail.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                })
                break
            case "THURSDAY":
                optionDetailThursday.push({
                    id: detail.id,
                    name: detail.name,
                    startTime: detail.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                    endTime: detail.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                })
                break
            case "FRIDAY":
                optionDetailFriday.push({
                    id: detail.id,
                    name: detail.name,
                    startTime: detail.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                    endTime: detail.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
                })
                break
        }
    })

    return (
        <div className={'p-10 flex flex-col space-y-10'}>
            <div className={'flex gap-3 items-center'}>
                <h1 className={'font-bold text-3xl'}>Opsi Urutan Jadwal</h1>
                <CreateNewScheduleOrder />
            </div>
            <div className={'flex flex-col space-y-5'}>
                <div>
                    <h2 className={'font-bold text-xl'}>Hari Senin</h2>
                    <DataTable columns={columns} data={optionDetailMonday} handler={DummyHandler}/>
                </div>
                <div>
                    <h2 className={'font-bold text-xl'}>Hari Selasa</h2>
                    <DataTable columns={columns} data={optionDetailTuesday} handler={DummyHandler}/>
                </div>
                <div>
                    <h2 className={'font-bold text-xl'}>Hari Rabu</h2>
                    <DataTable columns={columns} data={optionDetailWednesday} handler={DummyHandler}/>
                </div>
                <div>
                    <h2 className={'font-bold text-xl'}>Hari Kamis</h2>
                    <DataTable columns={columns} data={optionDetailThursday} handler={DummyHandler}/>
                </div>
                <div>
                    <h2 className={'font-bold text-xl'}>Hari Jumat</h2>
                    <DataTable columns={columns} data={optionDetailFriday} handler={DummyHandler}/>
                </div>
            </div>
        </div>
    )
}