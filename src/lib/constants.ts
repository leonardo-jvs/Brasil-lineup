import { FormationKey, PosKey } from './types'

export const POS_GROUPS: Record<string, { slots: number; pos: PosKey }> = {
  Goleiros:  { slots: 3, pos: 'GK' },
  Laterais:  { slots: 5, pos: 'LAT' },
  Zagueiros: { slots: 4, pos: 'Z' },
  Volantes:  { slots: 4, pos: 'VOL' },
  Meias:     { slots: 3, pos: 'MC' },
  Atacantes: { slots: 7, pos: 'CA' },
}

export const POS_ICONS: Record<PosKey, string> = {
  GK: '🧤',
  LAT: '🏃',
  Z: '🛡️',
  VOL: '⚙️',
  MC: '🎯',
  CA: '⚡',
}

export const POS_NAMES: Record<PosKey, string> = {
  GK: 'Goleiro',
  LAT: 'Lateral',
  Z: 'Zagueiro',
  VOL: 'Volante',
  MC: 'Meia',
  CA: 'Atacante',
}

export const FORMATIONS: Record<FormationKey, PosKey[][]> = {
  '4-3-3':   [['CA','CA','CA'],['MC','MC','MC'],['LAT','Z','Z','LAT'],['GK']],
  '4-4-2':   [['CA','CA'],['MC','MC','MC','MC'],['LAT','Z','Z','LAT'],['GK']],
  '3-5-2':   [['CA','CA'],['MC','MC','VOL','MC','MC'],['Z','Z','Z'],['GK']],
  '4-2-3-1': [['CA'],['MC','MC','MC'],['VOL','VOL'],['LAT','Z','Z','LAT'],['GK']],
}

export const FORMATION_KEYS: FormationKey[] = ['4-3-3', '4-4-2', '3-5-2', '4-2-3-1']

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getTotalSlots(formation: FormationKey): number {
  return FORMATIONS[formation].reduce((acc, row) => acc + row.length, 0)
}
