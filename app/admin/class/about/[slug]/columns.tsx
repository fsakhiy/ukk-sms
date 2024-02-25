"use client"

import {ColumnDef} from "@tanstack/table-core";
import {Checkbox} from "@/components/ui/checkbox";

export type StudentDataInClassroom = {
    id: number,
    name: string,
    username: string,
    createdBy: string,
    createdAt: Date,
}

export type ClassDataInClassroom = {
    id: number,
    subject: string,
    day: string,
    scheduleOrder: string
}

export const columns: ColumnDef<StudentDataInClassroom>[] = [
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
        header: "Nama Siswa"
    },
    {
        accessorKey: "username",
        header: "Username Akun Siswa"
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

export const subjectColumn: ColumnDef<ClassDataInClassroom>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "subject",
        header: "Mata Pelajaran"
    },
    {
        accessorKey: "day",
        header: "hari"
    },
    {
        accessorKey: "scheduleOrder",
        header: "Jam Ke"
    }
]