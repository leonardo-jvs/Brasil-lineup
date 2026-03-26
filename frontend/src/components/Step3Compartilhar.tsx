'use client'

import { useState, useRef } from 'react'
import { FormationKey } from '@/lib/types'
import { FORMATIONS, getInitials } from '@/lib/constants'
import { ConvocadosMap, XIMap } from '@/app/page'

interface Props {
  convocados: ConvocadosMap
  xi: XIMap
  captain: string | null
  formation: FormationKey
  coach: string
  setCoach: (v: string) => void
  onBack: () => void
}

export default function Step3Compartilhar({
  convocados, xi, captain, formation, coach, setCoach, onBack,
}: Props) {
  const [copied, setCopied] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const rows = FORMATIONS[formation]

  function getShareText() {
    let idx = 0
    const lines: string[] = []
    rows.forEach((row) => {
      row.forEach((pos) => {
        const k = Object.keys(xi).find((k) => xi[k].slotIdx === idx)
        const p = k ? convocados[k] : null
        if (p) lines.push(`${p.nickname || p.name}${k === captain ? ' (C)' : ''} - ${pos}`)
        idx++
      })
    })
    return `🇧🇷 Minha Seleção para a Copa 2026!\nFormação: ${formation}\n${coach ? `Técnico: ${coach}\n` : ''}${lines.join('\n')}`
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getShareText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      alert(getShareText())
    }
  }

  async function handleSaveImage() {
    if (!cardRef.current) return
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true, backgroundColor: '#1a5c2a' })
      const link = document.createElement('a')
      link.download = 'minha-selecao.png'
      link.href = canvas.toDataURL()
      link.click()
    } catch {
      alert('Erro ao salvar imagem. Use a opção de copiar.')
    }
  }

  const capData = captain ? convocados[captain] : null

  // Calcula posições no campo para o SVG
  function getFieldPositions() {
    const positions: { x: number; y: number; convKey: string | null }[] = []
    let idx = 0
    rows.forEach((row, ri) => {
      const yPct = 10 + (ri / (rows.length - 1)) * 80
      row.forEach((_, ci) => {
        const xPct = row.length === 1 ? 50 : 10 + (ci / (row.length - 1)) * 80
        const k = Object.keys(xi).find((k) => xi[k].slotIdx === idx) || null
        positions.push({ x: xPct, y: yPct, convKey: k })
        idx++
      })
    })
    return positions
  }

  const fieldPositions = getFieldPositions()

  return (
    <div>
      {/* Input do técnico */}
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-gray-500 whitespace-nowrap">Técnico:</label>
        <input
          type="text"
          value={coach}
          onChange={(e) => setCoach(e.target.value)}
          placeholder="Seu nome"
          maxLength={30}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#009C3B]"
        />
      </div>

      {/* Card compartilhável */}
      <div
        ref={cardRef}
        style={{ background: 'linear-gradient(160deg, #0a3d1a 0%, #1a6b32 50%, #0d4f22 100%)', borderRadius: 20, overflow: 'hidden', padding: '20px 16px 16px' }}
      >
        {/* Header com bandeira */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          {/* Bandeira do Brasil SVG */}
          <svg width="48" height="34" viewBox="0 0 48 34" style={{ borderRadius: 4, flexShrink: 0 }}>
            <rect width="48" height="34" fill="#009C3B"/>
            <polygon points="24,3 45,17 24,31 3,17" fill="#FFDF00"/>
            <circle cx="24" cy="17" r="8" fill="#002776"/>
            <path d="M16.5,14.5 Q24,12 31.5,15" stroke="white" strokeWidth="1.2" fill="none"/>
          </svg>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 16, letterSpacing: 0.3 }}>Minha Seleção</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Copa do Mundo 2026</div>
          </div>
          <div style={{ background: '#FFDF00', color: '#1a5c1a', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 99 }}>
            {formation}
          </div>
        </div>

        {/* Campo SVG */}
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
          <svg
            viewBox="0 0 320 420"
            style={{ width: '100%', display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gramado com faixas */}
            {Array.from({ length: 7 }).map((_, i) => (
              <rect key={i} x="0" y={i * 60} width="320" height="60"
                fill={i % 2 === 0 ? '#2d7a35' : '#2a7232'}/>
            ))}

            {/* Bordas do campo */}
            <rect x="8" y="8" width="304" height="404" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" rx="4"/>

            {/* Linha do meio */}
            <line x1="8" y1="210" x2="312" y2="210" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
            {/* Círculo central */}
            <circle cx="160" cy="210" r="44" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
            <circle cx="160" cy="210" r="3" fill="rgba(255,255,255,0.6)"/>

            {/* Área de gol inferior */}
            <rect x="88" y="360" width="144" height="52" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
            <rect x="120" y="388" width="80" height="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            {/* Goleira */}
            <rect x="134" y="406" width="52" height="10" fill="rgba(255,255,255,0.15)" rx="2"/>

            {/* Área de gol superior */}
            <rect x="88" y="8" width="144" height="52" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>

            {/* Marcas de pênalti */}
            <circle cx="160" cy="352" r="2.5" fill="rgba(255,255,255,0.5)"/>

            {/* Jogadores */}
            {fieldPositions.map((pos, i) => {
              const p = pos.convKey ? convocados[pos.convKey] : null
              const isCap = pos.convKey === captain
              const cx = (pos.x / 100) * 304 + 8
              const cy = (pos.y / 100) * 404 + 8

              return (
                <g key={i}>
                  {/* Sombra */}
                  <ellipse cx={cx} cy={cy + 26} rx="14" ry="4" fill="rgba(0,0,0,0.25)"/>
                  {/* Círculo da camisa */}
                  <circle cx={cx} cy={cy} r="18"
                    fill={p ? '#FFDF00' : 'rgba(255,255,255,0.15)'}
                    stroke={p ? '#fff' : 'rgba(255,255,255,0.3)'}
                    strokeWidth={p ? 2 : 1.5}
                    strokeDasharray={p ? 'none' : '4 3'}
                  />
                  {/* Número / Iniciais */}
                  {p ? (
                    <text x={cx} y={cy + 5} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1a5c1a">
                      {getInitials(p.nickname || p.name)}
                    </text>
                  ) : (
                    <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.4)">+</text>
                  )}
                  {/* Braçadeira de capitão */}
                  {isCap && (
                    <circle cx={cx + 13} cy={cy - 13} r="7" fill="#cc8800" stroke="#fff" strokeWidth="1.5"/>
                  )}
                  {isCap && (
                    <text x={cx + 13} y={cy - 10} textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff">C</text>
                  )}
                  {/* Nome do jogador */}
                  {p && (
                    <text x={cx} y={cy + 32} textAnchor="middle" fontSize="8.5" fill="#fff" fontWeight="600"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                      {(p.nickname || p.name).split(' ')[0].slice(0, 9)}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {capData && (
              <span style={{ background: 'rgba(255,255,255,0.12)', color: '#FFDF00', fontSize: 11, padding: '3px 10px', borderRadius: 99 }}>
                ©️ {(capData.nickname || capData.name).split(' ')[0]}
              </span>
            )}
            {coach && (
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>
                por {coach}
              </span>
            )}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>minhaselecao.vercel.app</span>
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={onBack} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
          ← Editar
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-sm bg-[#FFDF00] text-gray-900 font-medium rounded-lg hover:bg-yellow-300 transition-colors"
        >
          {copied ? '✓ Copiado!' : 'Copiar lista'}
        </button>
        <button
          onClick={handleSaveImage}
          className="px-4 py-2 text-sm bg-[#009C3B] text-white rounded-lg hover:bg-green-800 transition-colors"
        >
          Salvar imagem
        </button>
      </div>
    </div>
  )
}
