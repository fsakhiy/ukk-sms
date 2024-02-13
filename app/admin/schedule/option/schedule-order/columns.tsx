"use client"

import {ColumnDef} from "@tanstack/table-core";

export type ScheduleOrderDataTableType = {
    id: number,
    name: string,
    startTime: string,
    endTime: string,
}

export const columns: ColumnDef<ScheduleOrderDataTableType>[] = [
    {
        accessorKey: "id",
        header: "id"
    },
    {
        accessorKey: "name",
        header: "nama jam pelajaran"
    },
    {
        accessorKey: "startTime",
        header: "Waktu Jam Pelajaran Dimulai"
    },
    {
        accessorKey: "endTime",
        header: "Waktu Jam Pelajaran Selesai"
    }
]