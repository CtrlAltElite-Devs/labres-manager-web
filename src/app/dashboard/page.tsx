import DeleteAllResultsButton from "@/components/results/dev-components/delete-all-results-button";
import LabResultsTable from "@/components/results/lab-results-table";

export default function DashboardPage() {
  return (
    <div className="w-full ">
      <div className="border rounded-lg overflow-hidden">
        <LabResultsTable />
      </div>
      <div className="mt-8">
        <DeleteAllResultsButton/>
      </div>
    </div>
  )
}
