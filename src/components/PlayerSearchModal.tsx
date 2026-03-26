'use client'

import { useState, useEffect, useRef } from 'react'
import { Player, PosKey } from '@/lib/types'
import { POS_NAMES, getInitials } from '@/lib/constants'
import { SUGGESTIONS, SuggestedPlayer } from '@/lib/suggestions'

interface Props {
  posKey: PosKey
  onSelect: (player: Player) => void
  onClose: () => void
}

function suggestedToPlayer(s: SuggestedPlayer): Player {
  return { id: s.id, name: s.name, nickname: s.nickname, club: s.club, position: s.position, age: s.age }
}

export default function PlayerSearchModal({ posKey, onSelect, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Player[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const suggestions = SUGGESTIONS[posKey] || []

  useEffect(() => {
    if (showSearch) setTimeout(() => inputRef.current?.focus(), 100)
  }, [showSearch])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (query.length < 2) { setResults([]); setSearched(false); return }
    setLoading(true)
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/players?q=${encodeURIComponent(query)}&position=${encodeURIComponent(POS_NAMES[posKey])}`
        )
        const data = await res.json()
        setResults(data.players || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
        setSearched(true)
      }
    }, 500)
  }, [query, posKey])

  function renderPlayerRow(p: Player, key: string) {
    return (
      <button
        key={key}
        onClick={() => onSelect(p)}
        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-green-50 border-b border-gray-50 last:border-0 text-left transition-colors"
      >
        <div className="w-9 h-9 rounded-full bg-[#FFDF00] flex items-center justify-center font-medium text-xs text-green-800 flex-shrink-0 overflow-hidden">
          {p.photo
            ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
            : getInitials(p.nickname || p.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{p.nickname || p.name}</p>
          <p className="text-xs text-gray-500">{p.club} · {p.age} anos</p>
        </div>
        <span className="text-xs bg-green-50 text-[#009C3B] px-2 py-0.5 rounded-full flex-shrink-0">
          {p.position}
        </span>
      </button>
    )
  }

  return (
    <div className="bg-black/40 rounded-xl p-6 mb-6">
      <div className="bg-white rounded-xl p-5 max-w-md mx-auto">
        <h2 className="text-base font-medium text-gray-900 mb-1">
          Adicionar {POS_NAMES[posKey]}
        </h2>

        {!showSearch ? (
          <>
            {/* Sugestões rápidas */}
            <p className="text-xs text-gray-400 mb-3">Sugestões para esta posição</p>
            <div className="border border-gray-100 rounded-lg overflow-hidden mb-4">
              {suggestions.map((s) => renderPlayerRow(suggestedToPlayer(s), s.id))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSearch(true)}
                className="flex-1 py-2 text-sm border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#009C3B] hover:text-[#009C3B] transition-colors"
              >
                Buscar outro jogador...
              </button>
              <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Campo de busca */}
            <p className="text-xs text-gray-400 mb-3">Digite o nome para buscar</p>
            <div className="relative mb-3">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Pedro, Savinho, Gabriel..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#009C3B] focus:ring-2 focus:ring-green-100"
                autoComplete="off"
              />
              {loading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 spin text-gray-400 text-sm">⟳</span>
              )}
            </div>

            {query.length < 2 && (
              <p className="text-xs text-gray-400 mb-3">Digite ao menos 2 letras para buscar</p>
            )}

            {results.length > 0 && (
              <div className="border border-gray-100 rounded-lg overflow-hidden mb-4 max-h-52 overflow-y-auto">
                {results.map((p, i) => renderPlayerRow(p, p.id || String(i)))}
              </div>
            )}

            {searched && results.length === 0 && !loading && (
              <p className="text-sm text-gray-400 text-center py-4 mb-3">
                Nenhum jogador encontrado
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => { setShowSearch(false); setQuery(''); setResults([]) }}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                ← Sugestões
              </button>
              <button onClick={onClose} className="ml-auto px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
