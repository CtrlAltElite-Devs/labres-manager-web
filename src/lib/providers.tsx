"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { queryClient } from "./react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ThemeProvider } from "@/components/theme-provider"

export default function AppProvider({ children }: { children: ReactNode }) {
	const [client] = useState(queryClient);
	return (
		<QueryClientProvider client={client}>
			<ReactQueryStreamedHydration>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</ReactQueryStreamedHydration>
		</QueryClientProvider>
	);
}
