import LabResultsTable from "@/components/results/lab-results-table";

export default function DashboardPage() {
  return (
    <div className="w-full ">
      <div className="border rounded-lg overflow-hidden">
        <LabResultsTable />
      </div>
    </div>
  )
}
