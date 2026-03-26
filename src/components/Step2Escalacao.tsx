'use client'

import { useState } from 'react'
import { FormationKey } from '@/lib/types'
import { FORMATIONS, FORMATION_KEYS, POS_NAMES, getTotalSlots } from '@/lib/constants'
import { ConvocadosMap, XIMap } from '@/app/page'
import Field from './Field'

interface Props {
  convocados: ConvocadosMap
  xi: XIMap
  setXI: React.Dispatch<React.SetStateAction<XIMap>>
  captain: string | null
  setCaptain: (k: string | null) => void
  formation: FormationKey
  setFormation: (f: FormationKey) => void
  onBack: () => void
  onNext: () => void
}

type CtxMenu = { slotIdx: number; convKey: string } | null

export default function Step2Escalacao({
  convocados, xi, setXI, captain, setCaptain,
  formation, setFormation, onBack, onNext,
}: Props) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [ctxMenu, setCtxMenu] = useState<CtxMenu>(null)

  const rows = FORMATIONS[formation]
  const totalSlots = getTotalSlots(formation)
  const filledCount = Object.keys(xi).length
  const hasGK = (() => {
    let idx = 0
    for (const row of rows) {
      for (const pos of row) {
        const k = Object.keys(xi).find((k) => xi[k].slotIdx === idx)
        if (pos === 'GK' && k) return true
        idx++
      }
    }
    return false
  })()

  // Mensagens de validação
  const warnings: string[] = []
  if (filledCount > 0 && !hasGK) warnings.push('Nenhum goleiro escalado')
  if (filledCount > 0 && filledCount < totalSlots) warnings.push(`${totalSlots - filledCount} posição(ões) sem jogador`)
  if (filledCount === totalSlots && !captain) warnings.push('Defina um capitão clicando em um jogador')
  const isComplete = filledCount === totalSlots && !!captain

  function handleSlotClick(slotIdx: number, convKey: string | null) {
    setCtxMenu(null)
    if (convKey) {
      setCtxMenu({ slotIdx, convKey })
    } else {
      setSelectedSlot(slotIdx)
    }
  }

  function assignPlayer(convKey: string) {
    if (selectedSlot === null) return
    setXI((prev) => {
      const next = { ...prev }
      // Remove jogador que já estava neste slot
      Object.keys(next).forEach((k) => {
        if (next[k].slotIdx === selectedSlot) {
          if (captain === k) setCaptain(null)
          delete next[k]
        }
      })
      next[convKey] = { slotIdx: selectedSlot, convKey }
      return next
    })
    setSelectedSlot(null)
  }

  function handleSetCaptain(convKey: string) {
    setCaptain(convKey)
    setCtxMenu(null)
  }

  function handleChangePlayer(slotIdx: number, convKey: string) {
    setXI((prev) => {
      const next = { ...prev }
      if (captain === convKey) setCaptain(null)
      delete next[convKey]
      return next
    })
    setSelectedSlot(slotIdx)
    setCtxMenu(null)
  }

  function handleRemoveFromXI(convKey: string) {
    setXI((prev) => {
      const next = { ...prev }
      if (captain === convKey) setCaptain(null)
      delete next[convKey]
      return next
    })
    setCtxMenu(null)
  }

  return (
    <div>
      {/* Formações */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {FORMATION_KEYS.map((f) => (
          <button
            key={f}
            onClick={() => { setFormation(f); setSelectedSlot(null); setCtxMenu(null) }}
            className={[
              'px-3 py-1.5 rounded-full text-sm border transition-colors',
              formation === f
                ? 'bg-[#009C3B] text-white border-[#009C3B]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#009C3B]',
            ].join(' ')}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Validação */}
      {isComplete ? (
        <div className="flex items-center gap-2 bg-green-50 border border-[#009C3B] rounded-lg px-3 py-2.5 mb-4 text-sm text-green-800">
          <span>✓</span> Time completo com capitão definido!
        </div>
      ) : warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg px-3 py-2.5 mb-4 text-sm text-yellow-800">
          <span className="mr-2">⚠</span>
          {warnings.join(' · ')}
        </div>
      )}

      {/* Campo */}
      <div className="relative mb-4">
        <Field
          convocados={convocados}
          xi={xi}
          captain={captain}
          formation={formation}
          onSlotClick={handleSlotClick}
          selectedSlot={selectedSlot}
        />

        {/* Menu contextual */}
        {ctxMenu && (
          <div
            className="absolute bg-white border border-gray-200 rounded-lg shadow-md py-1 z-50 min-w-[160px]"
            style={{ top: 60, left: '50%', transform: 'translateX(-50%)' }}
          >
            <button
              onClick={() => handleSetCaptain(ctxMenu.convKey)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              {captain === ctxMenu.convKey ? '✓ Capitão definido' : 'Definir como capitão'}
            </button>
            <button
              onClick={() => handleChangePlayer(ctxMenu.slotIdx, ctxMenu.convKey)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
            >
              Trocar jogador
            </button>
            <button
              onClick={() => handleRemoveFromXI(ctxMenu.convKey)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-500"
            >
              Remover da escalação
            </button>
            <button
              onClick={() => setCtxMenu(null)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-gray-400 border-t border-gray-100 mt-1"
            >
              Fechar
            </button>
          </div>
        )}
      </div>

      {/* Painel de atribuição */}
      {selectedSlot !== null && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Escolha o jogador para esta posição:</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(convocados).length === 0 ? (
              <p className="text-sm text-gray-400">Convoque jogadores no passo 1 primeiro</p>
            ) : (
              Object.entries(convocados).map(([key, p]) => {
                const alreadyOther = Object.values(xi).some(
                  (v) => v.convKey === key && v.slotIdx !== selectedSlot
                )
                return (
                  <button
                    key={key}
                    onClick={() => assignPlayer(key)}
                    className={[
                      'px-3 py-1.5 rounded-full text-xs border transition-colors',
                      alreadyOther
                        ? 'bg-[#FFDF00] border-[#009C3B] text-gray-800 font-medium'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-[#009C3B] hover:text-[#009C3B]',
                    ].join(' ')}
                  >
                    {p.nickname || p.name}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Dica */}
      <p className="text-xs text-gray-400 mb-4">
        Clique num jogador escalado para definir capitão ou trocar
      </p>

      {/* Navegação */}
      <div className="flex gap-3">
        <button onClick={onBack} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
          ← Voltar
        </button>
        <button
          onClick={onNext}
          disabled={filledCount < 11}
          className="ml-auto px-4 py-2 text-sm bg-[#009C3B] text-white rounded-lg disabled:opacity-40 hover:bg-green-800 transition-colors"
        >
          Ver compartilhável →
        </button>
      </div>
    </div>
  )
}
