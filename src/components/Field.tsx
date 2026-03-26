'use client'

import { useState, useRef } from 'react'
import { FormationKey, PosKey } from '@/lib/types'
import { FORMATIONS, POS_NAMES, getInitials } from '@/lib/constants'
import { ConvocadosMap, XIMap } from '@/app/page'

interface Props {
  convocados: ConvocadosMap
  xi: XIMap
  captain: string | null
  formation: FormationKey
  onSlotClick: (slotIdx: number, convKey: string | null) => void
  selectedSlot: number | null
}

export default function Field({ convocados, xi, captain, formation, onSlotClick, selectedSlot }: Props) {
  const rows = FORMATIONS[formation]

  return (
    <div className="relative w-full bg-[#2d6a2d] rounded-xl overflow-hidden" style={{ height: 420 }}>
      {/* Linhas do campo SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 420" preserveAspectRatio="none">
        <line x1="60" y1="210" x2="540" y2="210" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
        <circle cx="300" cy="210" r="50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <rect x="200" y="370" width="200" height="55" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <rect x="240" y="390" width="120" height="35" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      </svg>

      {/* Peças no campo */}
      <div className="absolute inset-0">
        {rows.map((row, ri) => {
          const topPct = 8 + (ri / (rows.length - 1)) * 84
          let slotIdx = rows.slice(0, ri).reduce((a, r) => a + r.length, 0)

          return (
            <div
              key={ri}
              className="absolute left-0 right-0 flex justify-center gap-2.5 items-center"
              style={{ top: `${topPct}%`, transform: 'translateY(-50%)' }}
            >
              {row.map((pos: PosKey) => {
                const si = slotIdx++
                const convKey = Object.keys(xi).find((k) => xi[k].slotIdx === si) || null
                const player = convKey ? convocados[convKey] : null
                const isCap = convKey === captain
                const isSel = selectedSlot === si

                return (
                  <button
                    key={si}
                    onClick={() => onSlotClick(si, convKey)}
                    className="flex flex-col items-center gap-1 cursor-pointer min-w-[56px]"
                  >
                    <div
                      className={[
                        'relative w-11 h-11 rounded-full flex items-center justify-center font-medium text-xs transition-all',
                        player
                          ? 'bg-[#FFDF00] border-2 border-white text-green-800'
                          : 'bg-white/10 border-2 border-dashed border-white/40 text-white/50 text-lg',
                        isSel ? 'ring-2 ring-white' : '',
                      ].join(' ')}
                    >
                      {player ? getInitials(player.nickname || player.name) : '+'}

                      {/* Braçadeira de capitão */}
                      {isCap && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center border border-white leading-none">
                          C
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-center leading-tight max-w-[64px]"
                      style={{ color: player ? '#fff' : 'rgba(255,255,255,0.7)', fontWeight: player ? 500 : 400 }}
                    >
                      {player
                        ? (player.nickname || player.name).split(' ')[0]
                        : POS_NAMES[pos] || pos}
                    </span>
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
