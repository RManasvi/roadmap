'use client'

import { PHASES } from '@/lib/types'

interface PhaseCompleteModalProps {
  phaseNumber: 1 | 2 | 3 | 4
  isOpen: boolean
  onClose: () => void
}

export function PhaseCompleteModal({ phaseNumber, isOpen, onClose }: PhaseCompleteModalProps) {
  if (!isOpen) return null

  const currentPhase = PHASES.find(p => p.phase === phaseNumber)
  const nextPhase = PHASES.find(p => p.phase === (phaseNumber + 1) as any)

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0D0D1A] border border-[#1E1E2E] rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <p className="text-4xl mb-4">🎉</p>
          <h2 className="text-3xl font-bold text-white mb-2">
            Phase {phaseNumber} Complete!
          </h2>
          <div
            className="h-1 w-20 mx-auto rounded-full mb-6"
            style={{ backgroundColor: currentPhase?.color }}
          ></div>
          <p className="text-gray-300 mb-6">
            Congratulations! You&apos;ve completed {currentPhase?.label}. You&apos;re making incredible progress!
          </p>

          {nextPhase && (
            <div className="bg-[#1A1A2E] rounded-lg p-4 mb-6 text-left">
              <p className="text-xs text-gray-400 mb-2">NEXT PHASE</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-12 rounded"
                  style={{ backgroundColor: nextPhase.color }}
                ></div>
                <div>
                  <p className="font-semibold text-white">{nextPhase.label}</p>
                  <p className="text-xs text-gray-400">{nextPhase.totalDays} days ahead</p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full px-6 py-2 rounded-lg bg-[#00D4FF] text-black font-semibold hover:bg-[#00E5FF] transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
