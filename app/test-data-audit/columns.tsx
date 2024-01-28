"use client"

import { ColumnDef } from "@tanstack/table-core";

export type DataTableType = {
    id: number,
    firstData: string,
    secondData: string,
    createdAt: Date
}

export const columns: ColumnDef<DataTableType>[] = [
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
        accessorKey: "createdAt",
        header: "Created At"
    },
]