import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Droplets } from "lucide-react";

export function TableSkeleton() {
	const rows = Array.from({ length: 5 }); // number of skeleton rows

	return (
		<div className="border rounded-lg overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow className="bg-muted/50">
						<TableHead className="font-semibold">Test</TableHead>
						<TableHead className="font-semibold">Date</TableHead>
						<TableHead className="text-right font-semibold">Download</TableHead>
						<TableHead className="text-right font-semibold">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rows.map((_, idx) => (
						<TableRow key={idx}>
							{/* Test Name */}
							<TableCell>
								<div className="flex items-center gap-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted animate-pulse">
										<Droplets className="h-4 w-4 text-muted-foreground opacity-50" />
									</div>
									<div className="flex-1 space-y-2">
										<div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
									</div>
								</div>
							</TableCell>

							{/* Test Date */}
							<TableCell>
								<div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
								<div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
							</TableCell>

							{/* Download Button */}
							<TableCell className="text-right">
								<div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full inline-block animate-pulse mr-3"></div>
							</TableCell>

							{/* View Button */}
							<TableCell className="text-right">
								<div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse inline-block"></div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
