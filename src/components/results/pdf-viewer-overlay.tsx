"use client"

import { useState, useEffect } from "react"
import { X, Download, ZoomIn, ZoomOut, RotateCw, Loader2, AlertCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { TestResultDto } from "@/services/result/get-result"
import { LabResult } from "@/types"


interface PdfViewerOverlayProps {
  isOpen: boolean
  onClose: () => void
  resultId: string
  resultInfo?: LabResult
}

const dummyPdfBase64 = "JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihMYWIgUmVzdWx0IFBERikgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAyNDUgMDAwMDAgbiAKMDAwMDAwMDMxNiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQxMAolJUVPRg=="

export function PdfViewerOverlay({ isOpen, onClose, resultId, resultInfo }: PdfViewerOverlayProps) {
  const [pdfData, setPdfData] = useState<TestResultDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (isOpen && resultId) {
      fetchPdfData()
    }
  }, [isOpen, resultId])

  const fetchPdfData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Replace this with your actual API endpoint
      // const response = await fetch(`/api/lab-results/${resultId}/pdf`)

      // if (!response.ok) {
      //   throw new Error("Failed to fetch PDF data")
      // }

      // const data: TestResultDto = await response.json()
      setPdfData({id: resultId, base64Pdf: dummyPdfBase64});
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!pdfData) return

    const byteCharacters = atob(pdfData.base64Pdf)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: "application/pdf" })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `lab-result-${resultId}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)

  const handleClose = () => {
    setPdfData(null)
    setError(null)
    setZoom(100)
    setRotation(0)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-white border-b px-6 py-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Lab Result Viewer</h2>
            {resultInfo && (
              <div className="flex items-center gap-2">
                <Badge variant="outline">{resultInfo.testName}</Badge>
                <span className="text-sm text-muted-foreground">
                  {new Date(resultInfo.testDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {pdfData && (
              <>
                <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
                <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleRotate}>
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
              Close
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-gray-100">
          {isLoading && (
            <div className="flex h-full items-center justify-center">
              <Card className="p-8">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-lg font-medium">Loading PDF...</p>
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
                  <Button onClick={fetchPdfData} variant="outline">
                    Try Again
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {pdfData && !isLoading && !error && (
            <div className="h-full overflow-auto p-4">
              <div className="flex justify-center">
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transformOrigin: "center top",
                    transition: "transform 0.2s ease-in-out",
                  }}
                >
                  <iframe
                    src={`data:application/pdf;base64,${pdfData.base64Pdf}`}
                    className="w-[800px] h-[1000px] border-0"
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
