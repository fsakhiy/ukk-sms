"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";

export type ScheduleOrderDataTableType = {
    id: number,
    name: string,
    startTime: string,
    endTime: string,
}

export const columns: ColumnDef<ScheduleOrderDataTableType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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