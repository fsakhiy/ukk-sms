"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import React from "react";

import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/toaster";
import {toast} from "@/components/ui/use-toast";
import {Trash2} from "lucide-react";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    handler: (data: number[]) => Promise<void>
    searchKey: string,
    searchPlaceholder: string,
}

export function DataTableWSearch<TData, TValue>({
                                             columns,
                                             data,
                                             handler,
    searchKey,
    searchPlaceholder
                                         }: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            rowSelection,
            columnFilters,
        }
    })

    // const selectedData = table.getFilteredSelectedRowModel().rows.map(obj => +obj.id)

    const handleDataDeletion = async () => {

        const dataSelected: { [key: number]: boolean} = rowSelection
        const allKey: number[] = []
        for(const key in dataSelected) {
            // @ts-ignore
            allKey.push(data[key].id)
        }

        await handler(allKey)

        toast({description: "data deleted"})
        // console.log(allKey)

    }

    return (
        <div className={'space-y-5'}>
            <Toaster/>

            <div className="flex items-center py-4">
                <Input
                    placeholder={searchPlaceholder}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border ">
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
                                    tidak ada hasil.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className={'flex'}>
                <div className="flex-1 text-sm text-muted-foreground justify-normal items-center">
                    {table.getFilteredSelectedRowModel().rows.length} dari{" "}
                    {table.getFilteredRowModel().rows.length} baris terpilih.
                </div>
                {/*<div className={'justify-end items-center'}>*/}
                <div className="flex items-center justify-end space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Sebelumnya
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Selanjutnya
                    </Button>
                    {table.getFilteredSelectedRowModel().rows.length != 0 ?
                        <Button
                            variant="destructive"
                            size={'sm'}
                            onClick={handleDataDeletion}
                        >

                            <Trash2 className={'mr-2 h-4 w-4'}/>
                            Hapus
                        </Button>
                        :
                        <Button
                            variant="destructive"
                            disabled
                            size={'sm'}
                            onClick={handleDataDeletion}
                        >
                            <Trash2 className={'mr-2 h-4 w-4'}/>
                            Hapus
                        </Button>
                    }
                </div>
                {/*</div>*/}
            </div>
        </div>
    )
}
