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
import arrowIcon from '../public/arrow.svg'
import Image from 'next/image'
import chevronRight from '../public/right-chevron.svg'

export default function StationsTable<T extends {}>({
  data,
  columns,
}: {
  data: T[]
  columns: ColumnDef<T, any>[]
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable<T>({
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
      <table className="text-left text-gray-500 min-w-[32rem] table-fixed shadow-lg">
        <thead className="text-sm text-gray-700 uppercase bg-gray-100">
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
                        <div className="flex flex-row justify-between">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {
                            <a
                              href="#"
                              data-test-id={header.id}
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              <Image
                                alt=""
                                src={arrowIcon}
                                className="w-3 h-3 mt-1"
                              />
                            </a>
                          }
                        </div>

                        {header.column.getCanFilter() ? (
                          <div>
                            <TableFilter
                              column={header.column}
                              headerId={header.id}
                            />
                          </div>
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
            <tr key={row.id} className="bg-white border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex flex-row justify-center gap-2">
        <button
          className="p-2"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Image
            alt=""
            src={chevronRight}
            data-test-id="chevronLeft"
            className="w-6 h-6 hover:-translate-x-1 transition rotate-180"
          />
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          className="p-2"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <Image
            alt=""
            src={chevronRight}
            data-test-id="chevronRight"
            className="w-6 h-6 hover:translate-x-1 transition"
          />
        </button>
      </div>
    </div>
  )
}

export { createColumnHelper }
