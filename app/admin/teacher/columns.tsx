"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Info} from "lucide-react";

export type TeacherDataType = {
    id: number,
    name: string,
    subject: string,
    username: string,
    createdBy: string,
    createdAt: Date,
}

export const columns: ColumnDef<TeacherDataType>[] = [
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
        cell: ({ row     }) => (
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
        header: "Nama Guru"
    },
    {
        accessorKey: "subject",
        header: "Mata Pelajaran"
    },
    {
        accessorKey: "username",
        header: "Username"
    },
    {
        accessorKey: "createdBy",
        header: "Dibuat Oleh"
    },
    {
        accessorKey: "createdAt",
        header: "Waktu Pembuatan"
    },
    {
        id: "goToDetail",
        header: 'Actions',
        cell: ({ row }) => (
            <Link  href={`/admin/teacher/about/${row.original.id}`}>
                <Button
                    variant={'secondary'}
                    // onClick={() => { row. }}

                >
                    <Info className={'mr-2 h-4 w-4'} />
                    detail
                </Button>
            </Link>
        )
    }
]