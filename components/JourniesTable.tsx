import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table'
import arrowIcon from '../public/arrow.svg'
import Image from 'next/image'

export default function JourniesTable<T extends {}>({
  data,
  columns,
  onSorting,
}: {
  data: T[]
  columns: ColumnDef<T, any>[]
  onSorting: (headerId: string) => void
}) {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table className="text-left text-gray-500 shadow-sm">
        <thead className="text-gray-700 uppercase bg-neutral-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3"
                  >
                    <div className="flex flex-row justify-between">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <button
                        data-test-id={header.id}
                        onClick={() => onSorting(header.id)}
                      >
                        <Image
                          alt=""
                          src={arrowIcon}
                          className="w-3 h-3 ml-2"
                        />
                      </button>
                    </div>
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
    </div>
  )
}

export { createColumnHelper }
