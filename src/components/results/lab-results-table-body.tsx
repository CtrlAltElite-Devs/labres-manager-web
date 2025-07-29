"use client";

import { LabResult } from "@/types";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Eye, Droplets, Microscope, Download } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { PdfViewerOverlay } from "./pdf-viewer-overlay";

interface Props {
  results: LabResult[]
}

export default function LabResultsTableBody({results}: Props) {
  const [selectedResult, setSelectedResult] = useState<{ id: string; info: LabResult } | null>(null)

  const handleViewPdf = (result: LabResult) => {
    setSelectedResult({ id: result.id, info: result })
    console.log('viewing: ', JSON.stringify(result, null, 2));
  }

  const handleClosePdfViewer = () => {
    setSelectedResult(null)
  }

  const handleDownload = (resultId: string) => {
    alert(`Download PDF for result ID: ${resultId}`)
  }

  return (
    <TableBody>
      {results.length === 0 ? (
         <TableRow>
         <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
           <div className="flex flex-col items-center gap-2">
             <Microscope className="h-8 w-8 opacity-50" />
             <p>No results found</p>
           </div>
         </TableCell>
       </TableRow>
      ): (
        results.map(result => (
          <LabResultRow
            key={result.id}
            result={result}
            handleViewPdf={handleViewPdf}
          />
        ))
      )}

       <PdfViewerOverlay
          isOpen={!!selectedResult}
          onClose={handleClosePdfViewer}
          resultId={selectedResult?.id || ""}
          resultInfo={selectedResult?.info}
      />
    </TableBody>
  )
}

interface LabResultRowProps {
  result: LabResult
  handleViewPdf: (result: LabResult) => void
}

function LabResultRow({result, handleViewPdf}: LabResultRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium leading-none">{result.testName}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="font-medium">{format(new Date(result.testDate), "MMM dd, yyyy")}</p>
        <p className="text-sm text-muted-foreground">{format(new Date(result.testDate), "h:mm a")}</p>
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => alert(`Download report for ${result.id}`)}
          className="gap-2 mr-3"
        >
          <Download className="h-4 w-4" />

        </Button>
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="outline" size="sm"
          onClick={() => handleViewPdf(result)}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          View
        </Button>
      </TableCell>
    </TableRow>
  )
}
