"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";

export type ScheduleDataTableType = {
    id: number,
    name: string,
    classroom: string,
    startDate: Date,
    endDate: Date,
    createdBy: string,
    createdAt: Date
}

export const columns: ColumnDef<ScheduleDataTableType>[] = [
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
        header: "Id"
    },
    {
        accessorKey: "name",
        header: "Nama"
    },
    {
        accessorKey: "classroom",
        header: "Kelas"
    },
    {
        accessorKey: "startDate",
        header: "Tanggal Mulai"
    },
    {
        accessorKey: "endDate",
        header: "Tanggal Selesai"
    },
    {
        accessorKey: "createdBy",
        header: "Dibuat Oleh"
    },
    {
        accessorKey: "createdAt",
        header: "Waktu Pembuatan"
    }
]