'use client'

import { useState } from 'react'
import { Player, PosKey } from '@/lib/types'
import { POS_GROUPS, POS_ICONS, POS_NAMES, getInitials } from '@/lib/constants'
import { ConvocadosMap } from '@/app/page'
import PlayerSearchModal from './PlayerSearchModal'

interface Props {
  convocados: ConvocadosMap
  onAdd: (key: string, player: Player) => void
  onRemove: (key: string) => void
  onNext: () => void
}

interface ModalTarget {
  key: string
  pos: PosKey
}

export default function Step1Convocacao({ convocados, onAdd, onRemove, onNext }: Props) {
  const [modalTarget, setModalTarget] = useState<ModalTarget | null>(null)
  const total = Object.keys(convocados).length

  function openModal(key: string, pos: PosKey) {
    if (convocados[key]) return
    if (total >= 26) return
    setModalTarget({ key, pos })
  }

  function handleSelect(player: Player) {
    if (!modalTarget) return
    onAdd(modalTarget.key, player)
    setModalTarget(null)
  }

  return (
    <div>
      {/* Modal de busca (inline, não fixed) */}
      {modalTarget && (
        <PlayerSearchModal
          posKey={modalTarget.pos}
          onSelect={handleSelect}
          onClose={() => setModalTarget(null)}
        />
      )}

      {/* Counter bar */}
      <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 mb-6">
        <span className="text-sm text-gray-700">
          Convocados:{' '}
          <span className="font-medium text-[#009C3B]">{total}</span>/26
        </span>
        <button
          onClick={onNext}
          disabled={total < 11}
          className="px-4 py-2 text-sm bg-[#009C3B] text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 transition-colors"
        >
          Escalar time →
        </button>
      </div>

      {/* Grupos de posição */}
      {Object.entries(POS_GROUPS).map(([group, { slots, pos }]) => (
        <div key={group} className="mb-6">
          <p className="text-xs font-medium text-[#009C3B] uppercase tracking-wider mb-2">
            {group}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {Array.from({ length: slots }).map((_, i) => {
              const key = `${group}_${i}`
              const player = convocados[key]
              const disabled = total >= 26 && !player

              return (
                <button
                  key={key}
                  onClick={() => openModal(key, pos)}
                  disabled={disabled}
                  className={[
                    'relative flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all text-center',
                    player
                      ? 'border-[#009C3B] bg-green-50'
                      : 'border-dashed border-gray-300 bg-white hover:border-[#009C3B]',
                    disabled ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer',
                  ].join(' ')}
                >
                  {/* Botão remover */}
                  {player && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onRemove(key) }}
                      className="absolute top-1 right-1.5 text-red-400 hover:text-red-600 text-sm leading-none"
                    >
                      ×
                    </button>
                  )}

                  {/* Ícone / Iniciais */}
                  <div
                    className={[
                      'w-9 h-9 rounded-full flex items-center justify-center',
                      player
                        ? 'bg-[#FFDF00] text-xs font-medium text-green-800'
                        : 'bg-gray-100 border border-dashed border-gray-300 text-lg',
                    ].join(' ')}
                  >
                    {player ? getInitials(player.nickname || player.name) : POS_ICONS[pos]}
                  </div>

                  {/* Label */}
                  <span
                    className={[
                      'text-xs leading-tight',
                      player ? 'text-green-800 font-medium' : 'text-gray-500',
                    ].join(' ')}
                  >
                    {player ? (player.nickname || player.name) : POS_NAMES[pos]}
                  </span>

                  {/* Clube */}
                  {player && (
                    <span className="text-[10px] text-[#009C3B] leading-none truncate max-w-full">
                      {player.club}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
