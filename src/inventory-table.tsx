import React, { useState, useEffect } from 'react'
import { InventoryItem, StarRating } from './types'

type SortKey = 'stars' | '1-star' | '2-star' | '3-star'

interface InventoryTableProps {
  inventory: InventoryItem[]
  selectedForDeletion: number[]
  toggleItemSelection: (id: number) => void
  deleteRow: (id: number) => void
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  inventory,
  selectedForDeletion,
  toggleItemSelection,
  deleteRow,
}) => {
  const [sortedInventory, setSortedInventory] = useState(inventory)
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey
    direction: 'ascending' | 'descending'
  }>({ key: 'stars', direction: 'ascending' })

  useEffect(() => {
    setSortedInventory(inventory)
  }, [inventory])

  const calculateStars = (item: InventoryItem): number => {
    return Object.values(item.effects).filter(Boolean).length
  }

  const sortBy = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })

    const sorted = [...sortedInventory].sort((a, b) => {
      if (key === 'stars') {
        const aStars = calculateStars(a)
        const bStars = calculateStars(b)
        return direction === 'ascending' ? aStars - bStars : bStars - aStars
      } else {
        const aEffect = a.effects[key] || ''
        const bEffect = b.effects[key] || ''
        return direction === 'ascending'
          ? aEffect.localeCompare(bEffect)
          : bEffect.localeCompare(aEffect)
      }
    })

    setSortedInventory(sorted)
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Select</th>
          <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Delete</th>
          <th
            onClick={() => sortBy('stars')}
            style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}
          >
            Stars {sortConfig.key === 'stars' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
          </th>
          {(['1-star', '2-star', '3-star'] as const).map((star) => (
            <th
              key={star}
              onClick={() => sortBy(star)}
              style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}
            >
              {star} {sortConfig.key === star && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedInventory.map((item) => (
          <tr key={item.id}>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              <input
                type="checkbox"
                checked={selectedForDeletion.includes(item.id)}
                onChange={() => toggleItemSelection(item.id)}
              />
            </td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              <button onClick={() => deleteRow(item.id)}>Delete</button>
            </td>
            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              {calculateStars(item)}
            </td>
            {(['1-star', '2-star', '3-star'] as const).map((star) => (
              <td key={star} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {item.effects[star] || ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InventoryTable
