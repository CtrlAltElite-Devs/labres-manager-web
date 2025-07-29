"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { FileText, LogOut, TestTube } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";

export default function AppSidebar() {
  const { clearAuth } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/logout", {method: "POST"});
    clearAuth();
    router.replace("/sign-in");
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="">
      <SidebarHeader className="bg-surface-container-lowest/80">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className=""
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-white">
                <TestTube className="size-4" />
              </div>
              <div className="grid flex-1 leading-tight">
                <span className="truncate font-semibold">Lab Results</span>
                <span className="truncate text-xs">Manager</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-surface-container-lowest/80">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive tooltip="Lab Results">
                    <a href="/dashboard">
                      <FileText className="size-4" />
                      <span>Lab Results</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-surface-container-lowest/80">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
              <LogOut className="size-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
