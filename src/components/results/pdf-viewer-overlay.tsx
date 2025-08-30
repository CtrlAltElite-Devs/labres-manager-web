"use client"

import { useState, useEffect } from "react"
import { X, Loader2, AlertCircle, RefreshCwIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { TestResultDto, useGetIndividualResult } from "@/services/result/get-result/get-result-v1"
import { LabResult } from "@/types"
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useQueryClient } from "@tanstack/react-query"


interface PdfViewerOverlayProps {
  isOpen: boolean
  onClose: () => void
  resultId: string
  resultInfo?: LabResult
}

export function PdfViewerOverlay({ isOpen, onClose, resultId, resultInfo }: PdfViewerOverlayProps) {
  const [pdfData, setPdfData] = useState<TestResultDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const { data, isLoading, refetch, isRefetching } = useGetIndividualResult(resultId);
  const client = useQueryClient();


  useEffect(() => {
    if (data) {
      setPdfData({id: data.id, base64Pdf: data.base64Pdf})
    }
  }, [data])

  const handleRefresh = () => {
    client.invalidateQueries({
      queryKey: ['test-results', resultId]
    })
  }

  const topBarRefresh = () => {
    refetch();
  }
  
  
  const handleClose = () => {
    setPdfData(null)
    setError(null)
    setZoom(100)
    setRotation(0)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background backdrop-blur-sm">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-surface border-b px-6 py-4">
          <div className="flex items-center gap-4">
            <h2 className="hidden md:inline-block text-xs md:text-xl font-semibold">
              Lab Result Viewer
            </h2>
            {resultInfo && (
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{resultInfo.testName}</Badge>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {new Date(resultInfo.testDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="outline" size="sm" onClick={topBarRefresh}>
              <RefreshCwIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-surface">
          {(isLoading || isRefetching) && (
            <div className="flex h-full items-center justify-center">
              <Card className="p-8 bg-background">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-lg font-medium">Loading Test Result...</p>
                  <p className="text-sm text-muted-foreground">Please wait while we fetch your lab result</p>
                </div>
              </Card>
            </div>
          )}

          {error && (
            <div className="flex h-full items-center justify-center">
              <Card className="p-8 max-w-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                  <p className="text-lg font-medium">Failed to Load PDF</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                  <Button onClick={handleRefresh} variant="outline">
                    Try Again
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {pdfData && !isLoading && !error && (
            <div className="h-full overflow-auto">
              <div className="flex justify-center h-full">
                <div
                  className="bg-background shadow-lg rounded-lg overflow-hidden h-full w-full"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transformOrigin: "center top",
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  <iframe
                    src={`data:application/pdf;base64,${pdfData.base64Pdf}`}
                    className="w-full h-full border-0"
                    title="Lab Result PDF"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
