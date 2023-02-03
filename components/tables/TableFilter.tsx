import React from 'react'
import { Column } from '@tanstack/react-table'
import { Station } from '@prisma/client'

function TableFilter({
  column,
  headerId,
}: {
  column: Column<Station, unknown>
  headerId: string
}) {
  const columnFilterValue = column.getFilterValue() as string

  return (
    <input
      type="text"
      value={columnFilterValue ?? ''}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={'Search...'}
      aria-label={`search ${headerId}`}
      className="pl-2 w-36 text-sm font-normal text-gray-900 border shadow rounded-lg border-gray-300 focus:ring-amber-700 focus:border-amber-700 focus:outline-none focus:border-2"
    />
  )
}

export default TableFilter
