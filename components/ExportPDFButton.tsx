'use client'

import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PlanPDFDocument, getPDFFileName } from './PlanPDF'
import type { Plan, PlanInput } from '@/types'

interface ExportPDFButtonProps {
  plans: Plan[]
  input: PlanInput
}

export default function ExportPDFButton({ plans, input }: ExportPDFButtonProps) {
  const [generatedAt] = useState(() => new Date())
  const fileName = getPDFFileName(input, generatedAt)

  return (
    <PDFDownloadLink
      document={<PlanPDFDocument plans={plans} input={input} generatedAt={generatedAt} />}
      fileName={fileName}
      className="inline-block"
    >
      {({ loading, error }) => {
        if (error) {
          return (
            <span className="text-xs text-red-500 font-medium">Error al generar PDF</span>
          )
        }

        return (
          <button
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
              loading
                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-wait'
                : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 shadow-sm'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin flex-shrink-0" />
                <span>Preparando PDF...</span>
              </>
            ) : (
              <>
                <span className="text-base">📄</span>
                <span>Exportar Day Board</span>
              </>
            )}
          </button>
        )
      }}
    </PDFDownloadLink>
  )
}
