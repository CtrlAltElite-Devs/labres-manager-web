import AppSidebar from "@/components/containers/app-sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <SidebarInset className="mb-4 mt-15 mr-4 ">{children}</SidebarInset>
      <div className="absolute right-4 top-4">
        <ModeToggle />
       </div>
    </SidebarProvider>
  )
}
