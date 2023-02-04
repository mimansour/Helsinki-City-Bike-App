import React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import TableFilter from './TableFilter'
import { Station } from '@prisma/client'
import Pagination from './Pagination'
import ArrowIconButton from 'components/general/ArrowIconButton'

export default function StationsTable({
  data,
  columns,
}: {
  data: Station[]
  columns: ColumnDef<Station, string>[]
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable<Station>({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <table className="text-left text-gray-500 md:min-w-[32rem] table-fixed shadow-sm mb-4">
        <thead className="text-gray-700 uppercase bg-neutral-100 md:text-base text-xs">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        <div className="flex flex-row md:justify-between gap-x-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <ArrowIconButton
                            ariaLabel={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            canSort={header.column.getCanSort()}
                          />
                        </div>

                        {header.column.getCanFilter() ? (
                          <TableFilter
                            column={header.column}
                            headerId={header.id}
                          />
                        ) : null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="bg-white border-b md:text-base text-xs">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        onPreviousPageClick={() => table.previousPage()}
        canPreviousPage={!table.getCanPreviousPage()}
        onNextPageClick={() => table.nextPage()}
        canNextPage={!table.getCanNextPage()}
      >
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {`${table.getState().pagination.pageIndex + 1} of 
            ${table.getPageCount()}`}
          </strong>
        </span>
      </Pagination>
    </div>
  )
}

export { createColumnHelper }
