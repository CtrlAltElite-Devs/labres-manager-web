"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Table, TableHead, TableHeader, TableRow } from "../ui/table"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { generateDummyResults } from "@/utils/generate-dummy-results"
import LabResultsTableBody from "./lab-results-table-body"
import type { LabResult } from "@/types"
import { PaginationControls } from "./pagination-controls"

export default function LabResultsTable() {
  const [dummyResults, setDummyResults] = useState<LabResult[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 10

  useEffect(() => {
    setDummyResults(generateDummyResults("USERPID"))
  }, [])

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return dummyResults

    return dummyResults.filter(
      (result) =>
        result.testName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [dummyResults, searchTerm])

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage)
  const startIndex = (currentPage - 1) * resultsPerPage
  const paginatedResults = filteredResults.slice(startIndex, startIndex + resultsPerPage)

  return (
    <Card className="border-0 shadow-sm  bg-surface-container-lowest/80">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Your Lab Results</CardTitle>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        {searchTerm && (
          <div className="text-sm text-muted-foreground">
            {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} found
            {filteredResults.length !== dummyResults.length && <span> out of {dummyResults.length} total</span>}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0 m-4">
        <div className="border rounded-lg overflow-hidden">
          {filteredResults.length !== 0 && (
          <Table>
            <TableHeader className="">
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Test</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="text-right font-semibold">Download</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <LabResultsTableBody results={paginatedResults} />
          </Table>
          )}
        </div>

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            startIndex={startIndex}
            resultsPerPage={resultsPerPage}
            totalResults={filteredResults.length}
          />
        )}

        {filteredResults.length === 0 && searchTerm && (
          <div className="text-center py-12 text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <Search className="h-8 w-8 opacity-50" />
              <p>No results found for &quot;{searchTerm}&quot;</p>
              <p className="text-sm">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
