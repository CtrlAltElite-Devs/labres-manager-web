"use client";

import { Spinner } from "@/components/ui/spinner"; // your Shadcn spinner

export default function LoadingPage() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Spinner className="w-12 h-12 text-primary" />
		</div>
	);
}
