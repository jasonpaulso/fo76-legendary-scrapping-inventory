import React, { useState, useEffect, useRef } from 'react'
import { InventoryItem, StarRating } from './types'
import InventoryRow from './inventory-row'
import InventoryTable from './inventory-table'

const InventoryRecorder: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([{ id: 0, effects: {} }])
  const [nextId, setNextId] = useState(1)
  const [selectedForDeletion, setSelectedForDeletion] = useState<number[]>([])
  const [filterText, setFilterText] = useState('')
  const selectorRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  const updateInventoryRow = (id: number, newData: Partial<InventoryItem>) => {
    setInventory(inventory.map((item) => (item.id === id ? { ...item, ...newData } : item)))
  }

  const addNewRow = () => {
    setInventory([...inventory, { id: nextId, effects: {} }])
    setNextId(nextId + 1)
  }

  const deleteRow = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter((item) => item.id !== id))
      setSelectedForDeletion(selectedForDeletion.filter((itemId) => itemId !== id))
    }
  }

  const deleteSelectedItems = () => {
    if (window.confirm('Are you sure you want to delete the selected items?')) {
      setInventory(inventory.filter((item) => !selectedForDeletion.includes(item.id)))
      setSelectedForDeletion([])
    }
  }

  const toggleItemSelection = (id: number) => {
    setSelectedForDeletion((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  const filterInventory = (items: InventoryItem[]) => {
    return items.filter((item) =>
      Object.values(item.effects).some(
        (effect) => effect && effect.toLowerCase().includes(filterText.toLowerCase())
      )
    )
  }

  const sortForOptimalScrapping = (items: InventoryItem[]) => {
    const desirabilityScores: { [key: string]: number } = {
      UNY: 5,
      AP: 4,
      WWR: 3, // Example scores
      // Add more scores here
    }

    return items.sort((a, b) => {
      const aScore = Object.values(a.effects).reduce(
        (sum, effect) => sum + (effect ? desirabilityScores[effect] || 0 : 0),
        0
      )
      const bScore = Object.values(b.effects).reduce(
        (sum, effect) => sum + (effect ? desirabilityScores[effect] || 0 : 0),
        0
      )
      return aScore - bScore // Sort from least to most desirable for scrapping
    })
  }

  useEffect(() => {
    if (selectorRef.current) {
      selectorRef.current.scrollTop = selectorRef.current.scrollHeight
    }
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight
    }
  }, [inventory])

  return (
    <div
      style={{
        display: 'flex',
        maxHeight: '100vh',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          maxHeight: '100vh',
        }}
        ref={selectorRef}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Effect Selector</h2>
        {inventory.map((row, index) => (
          <InventoryRow
            key={row.id}
            data={row}
            updateData={updateInventoryRow}
            isLast={index === inventory.length - 1}
            addNewRow={addNewRow}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f0f0f0',
          overflowY: 'auto',
          maxHeight: '100vh',
        }}
        ref={tableRef}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Inventory Table</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Filter effects..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button onClick={deleteSelectedItems}>Delete Selected</button>
        </div>
        <InventoryTable
          inventory={sortForOptimalScrapping(filterInventory(inventory))}
          selectedForDeletion={selectedForDeletion}
          toggleItemSelection={toggleItemSelection}
          deleteRow={deleteRow}
        />
      </div>
    </div>
  )
}

export default InventoryRecorder
