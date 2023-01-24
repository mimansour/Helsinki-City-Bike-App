import React from 'react'
import { Column, Table as ReactTable } from '@tanstack/react-table'

function TableFilter({
  column,
  headerId,
}: {
  column: Column<any, any>
  headerId: string
}) {
  const columnFilterValue = column.getFilterValue()

  return (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      id={headerId}
      className="pl-2 w-36 text-sm font-normal text-gray-900 border shadow rounded-lg border-gray-300 focus:ring-amber-700 focus:border-amber-700 focus:outline-none focus:border-2"
    />
  )
}

export default TableFilter
