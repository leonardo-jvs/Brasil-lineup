'use client'

import { useState } from 'react'
import { AppStep, FormationKey, XIEntry } from '@/lib/types'
import { Player } from '@/lib/types'
import StepBar from '@/components/StepBar'
import Step1Convocacao from '@/components/Step1Convocacao'
import Step2Escalacao from '@/components/Step2Escalacao'
import Step3Compartilhar from '@/components/Step3Compartilhar'

export type ConvocadosMap = Record<string, Player>
export type XIMap = Record<string, XIEntry>

export default function HomePage() {
  const [step, setStep] = useState<AppStep>(1)
  const [convocados, setConvocados] = useState<ConvocadosMap>({})
  const [xi, setXI] = useState<XIMap>({})
  const [captain, setCaptain] = useState<string | null>(null)
  const [formation, setFormation] = useState<FormationKey>('4-3-3')
  const [coach, setCoach] = useState('')

  function goStep(n: AppStep) {
    setStep(n)
  }

  function addConvocado(key: string, player: Player) {
    setConvocados((prev) => ({ ...prev, [key]: player }))
  }

  function removeConvocado(key: string) {
    setConvocados((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
    setXI((prev) => {
      const next = { ...prev }
      const xiKey = Object.keys(next).find((k) => next[k].convKey === key)
      if (xiKey) {
        if (captain === xiKey) setCaptain(null)
        delete next[xiKey]
      }
      return next
    })
  }

  function handleSetFormation(f: FormationKey) {
    setFormation(f)
    setXI({})
    setCaptain(null)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-[#009C3B] flex items-center justify-center text-2xl flex-shrink-0">
            🇧🇷
          </div>
          <div>
            <h1 className="text-xl font-medium text-gray-900">Minha Seleção</h1>
            <p className="text-sm text-gray-500">Monte sua convocação para a Copa do Mundo 2026</p>
          </div>
        </div>

        {/* Steps */}
        <StepBar currentStep={step} onStepClick={goStep} />

        {/* Step 1 */}
        {step === 1 && (
          <Step1Convocacao
            convocados={convocados}
            onAdd={addConvocado}
            onRemove={removeConvocado}
            onNext={() => goStep(2)}
          />
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Step2Escalacao
            convocados={convocados}
            xi={xi}
            setXI={setXI}
            captain={captain}
            setCaptain={setCaptain}
            formation={formation}
            setFormation={handleSetFormation}
            onBack={() => goStep(1)}
            onNext={() => goStep(3)}
          />
        )}

        {/* Step 3 */}
        {step === 3 && (
          <Step3Compartilhar
            convocados={convocados}
            xi={xi}
            captain={captain}
            formation={formation}
            coach={coach}
            setCoach={setCoach}
            onBack={() => goStep(2)}
          />
        )}
      </div>
    </main>
  )
}
