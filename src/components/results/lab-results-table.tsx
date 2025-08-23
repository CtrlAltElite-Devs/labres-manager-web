"use client"

import { useEffect, useMemo, useState } from "react"
import { RefreshCwIcon, Search } from "lucide-react"
import { Table, TableHead, TableHeader, TableRow } from "../ui/table"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import LabResultsTableBody from "./lab-results-table-body"
import type { LabResult } from "@/types"
import { PaginationControls } from "./pagination-controls"
import { useGetResults } from "@/services/result/get-results/get-results-v1"
import { Button } from "../ui/button"
import { useGlobalStore } from "@/stores/global"

export default function LabResultsTable() {
  const [results, setResults] = useState<LabResult[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const { data, refetch, isLoading, isRefetching } = useGetResults();
  const { setHasTestResults } = useGlobalStore();
  const resultsPerPage = 10

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if(data){
      setResults(data);
    }
  }, [data])

  useEffect(() => {
    setHasTestResults(results.length > 0);
  }, [results, setHasTestResults])

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return results

    return results.filter(
      (result) =>
        result.testName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [results, searchTerm])

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
        <div className="flex justify-between">
          <div className="relative max-w-sm grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <Button className="text-on-primary hover:cursor-pointer" onClick={() => refetch()}>
              <RefreshCwIcon/>
              <span>Refresh</span>
            </Button>
          </div>
        </div>
        {searchTerm && (
          <div className="text-sm text-muted-foreground">
            {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} found
            {filteredResults.length !== results.length && <span> out of {results.length} total</span>}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0 m-4">
        {(isRefetching || isLoading) ? (
          <div className="text-gray-700">
            Refreshing...
          </div>
        ) 
        : (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  )
}
