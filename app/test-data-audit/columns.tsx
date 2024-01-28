"use client"

import { ColumnDef } from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";

export type DataTableType = {
    id: number,
    firstData: string,
    secondData: string,
    createdBy: string,
    createdAt: Date
}

export const columns: ColumnDef<DataTableType>[] = [
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
    },
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "firstData",
        header: "First Data"
    },
    {
        accessorKey: "secondData",
        header: "Second Data"
    },
    {
        accessorKey: "createdBy",
        header: "Created By"
    },
    {
        accessorKey: "createdAt",
        header: "Created At"
    },
]