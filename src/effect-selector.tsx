import { StarRating, effects } from './types'

interface EffectSelectorProps<T extends StarRating> {
  star: T
  selectedEffect: string | null
  onSelect: (effect: string | null) => void
}

function EffectSelector<T extends StarRating>({
  star,
  selectedEffect,
  onSelect,
}: EffectSelectorProps<T>) {
  return (
    <select
      value={selectedEffect || ''}
      onChange={(e) => onSelect(e.target.value || null)}
      style={{ width: '100%', padding: '5px', marginRight: '5px' }}
    >
      <option value="">Select {star} effect</option>
      {effects[star].map((effect) => (
        <option key={effect.abbr} value={effect.abbr}>{`${effect.abbr} - ${effect.name}`}</option>
      ))}
    </select>
  )
}

export default EffectSelector
