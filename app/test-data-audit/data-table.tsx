"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import React from "react";
import toast, {Toaster} from "react-hot-toast";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    text: string
    handler: (data: number[]) => Promise<void>
}

export function DataTable<TData, TValue>({
    columns,
    data,
    handler,
    text
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection
        }
    })

    const handleDataDeletion = () => {
        // console.log(rowSelection)

        const dataSelected: { [key: number]: boolean } = rowSelection
        const allKey: number[] = []
        for(const key in dataSelected) {
            // @ts-ignore
            allKey.push(data[key].id)
        }

        // deleteDummyData(allKey)
        handler(allKey)
        toast('data successfully deleted')
    }

    return (
        <div>
            <Toaster />
            <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
                {table.getRowModel().rows?.length ?
                    <Button
                        variant="destructive"
                        size={'sm'}
                        onClick={handleDataDeletion}
                    >
                        {text}
                    </Button>
                    :
                    <Button
                        variant="destructive"
                        disabled
                        size={'sm'}
                        onClick={handleDataDeletion}
                    >
                        {text}
                    </Button>
                }

            </div>
        </div>
    )
}
