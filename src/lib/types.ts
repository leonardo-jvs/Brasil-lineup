export interface Player {
  id: string
  name: string
  nickname?: string
  club: string
  position: string
  age: number
  photo?: string
  nationality?: string
}

export interface ConvocadoSlot {
  key: string       // ex: "Atacantes_0"
  group: string     // ex: "Atacantes"
  pos: PosKey       // ex: "CA"
  player?: Player
}

export type PosKey = 'GK' | 'LAT' | 'Z' | 'VOL' | 'MC' | 'CA'

export interface XIEntry {
  slotIdx: number
  convKey: string
}

export type FormationKey = '4-3-3' | '4-4-2' | '3-5-2' | '4-2-3-1'

export interface FreePiece {
  pos: PosKey
  xPct: number
  yPct: number
  convKey: string | null
  slotIdx: number
}

export type AppStep = 1 | 2 | 3
