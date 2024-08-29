type StarRating = '1-star' | '2-star' | '3-star'

type EffectWithAbbreviation = {
  abbr: string
  name: string
}

type Effects = {
  [K in StarRating]: EffectWithAbbreviation[]
}

const effects: Effects = {
  '1-star': [
    { abbr: 'ARI', name: "Aristocrat's" },
    { abbr: 'ASS', name: "Assassin's" },
    { abbr: 'AS', name: 'Auto Stim' },
    { abbr: 'BOL', name: 'Bolstering' },
    { abbr: 'CHA', name: 'Chameleon' },
    { abbr: 'CLO', name: 'Cloaking' },
    { abbr: 'EXT', name: "Exterminator's" },
    { abbr: 'GS', name: "Ghoul Slayer's" },
    { abbr: 'H', name: "Hunter's" },
    { abbr: 'LS', name: 'Life Saving' },
    { abbr: 'M', name: "Mutant's" },
    { abbr: 'MS', name: "Mutant Slayer's" },
    { abbr: 'N', name: 'Nocturnal' },
    { abbr: 'OE', name: "Overeater's" },
    { abbr: 'R', name: 'Regenerating' },
    { abbr: 'TRO', name: "Troubleshooter's" },
    { abbr: 'UNY', name: 'Unyielding' },
    { abbr: 'VAN', name: "Vanguard's" },
    { abbr: 'W', name: 'Weightless' },
    { abbr: 'Z', name: "Zealot's" },
  ],
  '2-star': [
    { abbr: '+1A', name: 'Agility +1' },
    { abbr: '+1C', name: 'Charisma +1' },
    { abbr: '+1E', name: 'Endurance +1' },
    { abbr: '+1I', name: 'Intelligence +1' },
    { abbr: '+1L', name: 'Luck +1' },
    { abbr: '+1P', name: 'Perception +1' },
    { abbr: '+1S', name: 'Strength +1' },
    { abbr: 'AP', name: 'Powered' },
    { abbr: 'PR', name: "Poisoner's" },
    { abbr: 'RR', name: 'HazMat' },
    { abbr: 'FR', name: 'Fireproof' },
    { abbr: 'CR', name: 'Warming' },
    { abbr: 'GLU', name: 'Glutton' },
    { abbr: 'HAR', name: 'Hardy' },
    { abbr: 'ANT', name: 'Antiseptic' },
  ],
  '3-star': [
    { abbr: '50F', name: "Acrobat's" },
    { abbr: 'SENT', name: "Sentinel's" },
    { abbr: 'CAV', name: "Cavalier's" },
    { abbr: 'SAFE', name: "Safecracker's" },
    { abbr: 'DIVE', name: "Diver's" },
    { abbr: 'DOC', name: "Doctor's" },
    { abbr: 'DISS', name: 'Dissipating' },
    { abbr: 'WWR', name: 'Reduced weapon weight' },
    { abbr: 'FDC', name: 'Reduced food/drink/chem weight' },
    { abbr: 'AWR', name: 'Reduced ammo weight' },
    { abbr: 'JWR', name: 'Reduced junk weight' },
    { abbr: 'SNEAK', name: 'Improved sneaking' },
    { abbr: 'BURN', name: 'Burning' },
    { abbr: 'BLOCK', name: "Defender's" },
    { abbr: 'DUR', name: 'Durability' },
    { abbr: 'ELEC', name: 'Electrified' },
    { abbr: 'FROZ', name: 'Frozen' },
    { abbr: 'LIMB', name: 'Reduced limb damage' },
    { abbr: 'TOX', name: 'Toxic' },
  ],
}

type InventoryItem = {
  id: number
  effects: {
    [K in StarRating]?: string | null // Stores the abbreviation
  }
}

export { effects }
export type { StarRating, EffectWithAbbreviation, Effects, InventoryItem }
