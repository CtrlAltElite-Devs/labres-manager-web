import LabResultsTable from "@/components/results/lab-results-table";

export default function DashboardPage() {
  return (
    <div className="w-full ">
      {/* <h3>Sample rani</h3> */}
      <div className="border rounded-lg overflow-hidden">
        <LabResultsTable />
      </div>
    </div>
  )
}
