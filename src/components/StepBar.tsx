import { AppStep } from '@/lib/types'

interface Props {
  currentStep: AppStep
  onStepClick: (step: AppStep) => void
}

const STEPS = [
  { n: 1 as AppStep, label: '1. Convocação' },
  { n: 2 as AppStep, label: '2. Escalação' },
  { n: 3 as AppStep, label: '3. Compartilhar' },
]

export default function StepBar({ currentStep, onStepClick }: Props) {
  return (
    <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-200">
      {STEPS.map((s, i) => {
        const isActive = s.n === currentStep
        const isDone = s.n < currentStep
        return (
          <button
            key={s.n}
            onClick={() => onStepClick(s.n)}
            className={[
              'flex-1 py-3 text-sm text-center transition-colors cursor-pointer',
              i > 0 ? 'border-l border-gray-200' : '',
              isActive ? 'bg-[#009C3B] text-white font-medium' : '',
              isDone ? 'bg-green-50 text-[#009C3B]' : '',
              !isActive && !isDone ? 'bg-white text-gray-500 hover:bg-gray-50' : '',
            ].join(' ')}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
