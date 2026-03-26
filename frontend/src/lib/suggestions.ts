import { PosKey } from './types'

export interface SuggestedPlayer {
  id: string
  name: string
  nickname: string
  club: string
  position: string
  age: number
}

export const SUGGESTIONS: Record<PosKey, SuggestedPlayer[]> = {
  GK: [
    { id: 's-gk1', name: 'Alisson Becker', nickname: 'Alisson', club: 'Liverpool', position: 'Goleiro', age: 31 },
    { id: 's-gk2', name: 'Ederson Moraes', nickname: 'Ederson', club: 'Manchester City', position: 'Goleiro', age: 30 },
    { id: 's-gk3', name: 'Bento', nickname: 'Bento', club: 'Al-Qadsiah', position: 'Goleiro', age: 25 },
  ],
  LAT: [
    { id: 's-lat1', name: 'Danilo', nickname: 'Danilo', club: 'Juventus', position: 'Lateral', age: 33 },
    { id: 's-lat2', name: 'Éder Militão', nickname: 'Militão', club: 'Real Madrid', position: 'Lateral', age: 26 },
    { id: 's-lat3', name: 'Yan Couto', nickname: 'Yan Couto', club: 'Braga', position: 'Lateral', age: 22 },
    { id: 's-lat4', name: 'Renan Lodi', nickname: 'Renan Lodi', club: 'Olympique', position: 'Lateral', age: 26 },
  ],
  Z: [
    { id: 's-z1', name: 'Marquinhos', nickname: 'Marquinhos', club: 'PSG', position: 'Zagueiro', age: 30 },
    { id: 's-z2', name: 'Gabriel Magalhães', nickname: 'Gabriel', club: 'Arsenal', position: 'Zagueiro', age: 26 },
    { id: 's-z3', name: 'Bremer', nickname: 'Bremer', club: 'Juventus', position: 'Zagueiro', age: 27 },
    { id: 's-z4', name: 'Lucas Beraldo', nickname: 'Beraldo', club: 'PSG', position: 'Zagueiro', age: 20 },
  ],
  VOL: [
    { id: 's-vol1', name: 'Casemiro', nickname: 'Casemiro', club: 'Man. United', position: 'Volante', age: 32 },
    { id: 's-vol2', name: 'Bruno Guimarães', nickname: 'Bruno G.', club: 'Newcastle', position: 'Volante', age: 27 },
    { id: 's-vol3', name: 'André', nickname: 'André', club: 'Fulham', position: 'Volante', age: 23 },
    { id: 's-vol4', name: 'Gerson', nickname: 'Gerson', club: 'Flamengo', position: 'Volante', age: 27 },
  ],
  MC: [
    { id: 's-mc1', name: 'Lucas Paquetá', nickname: 'Paquetá', club: 'West Ham', position: 'Meia', age: 27 },
    { id: 's-mc2', name: 'Raphinha', nickname: 'Raphinha', club: 'Barcelona', position: 'Meia', age: 27 },
    { id: 's-mc3', name: 'Rodrygo', nickname: 'Rodrygo', club: 'Real Madrid', position: 'Meia', age: 23 },
  ],
  CA: [
    { id: 's-ca1', name: 'Neymar Jr.', nickname: 'Neymar', club: 'Al-Hilal', position: 'Atacante', age: 32 },
    { id: 's-ca2', name: 'Vinícius Júnior', nickname: 'Vini Jr.', club: 'Real Madrid', position: 'Atacante', age: 24 },
    { id: 's-ca3', name: 'Rodrygo', nickname: 'Rodrygo', club: 'Real Madrid', position: 'Atacante', age: 23 },
    { id: 's-ca4', name: 'Endrick', nickname: 'Endrick', club: 'Real Madrid', position: 'Atacante', age: 18 },
    { id: 's-ca5', name: 'Richarlison', nickname: 'Richarlison', club: 'Tottenham', position: 'Atacante', age: 27 },
  ],
}
