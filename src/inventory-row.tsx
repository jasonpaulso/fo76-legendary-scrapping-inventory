import React, { useEffect } from 'react'
import { InventoryItem, StarRating } from './types'
import EffectSelector from './effect-selector'

interface InventoryRowProps {
  data: InventoryItem
  updateData: (id: number, newData: Partial<InventoryItem>) => void
  isLast: boolean
  addNewRow: () => void
}

const InventoryRow: React.FC<InventoryRowProps> = ({ data, updateData, isLast, addNewRow }) => {
  const handleEffectChange = <T extends StarRating>(star: T, effect: string | null) => {
    updateData(data.id, { effects: { ...data.effects, [star]: effect } })
  }

  useEffect(() => {
    if (isLast && Object.values(data.effects).some(Boolean)) {
      addNewRow()
    }
  }, [data, isLast, addNewRow])

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      {(['1-star', '2-star', '3-star'] as const).map((star) => (
        <EffectSelector
          key={star}
          star={star}
          selectedEffect={data.effects[star] ?? null}
          onSelect={(effect) => handleEffectChange(star, effect)}
        />
      ))}
    </div>
  )
}

export default InventoryRow
