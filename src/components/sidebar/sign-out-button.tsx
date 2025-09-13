"use client";

import { useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLogOut } from "@/services/auth/logout-user/logout-user-v1";


export default function SignOutButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { clearAuth } = useAuthStore();
    const { mutate } = useLogOut();
    const router = useRouter();
    const client = useQueryClient();

    const handleClick = () => {
        setIsOpen(true);
    }

    const handleContinue = async () => {
        // await fetch("/api/logout", {method: "POST"});
        mutate(undefined, {
            onSettled: () => {
                clearAuth();
                client.removeQueries();
                toast.success("Successfully Logged out");
                router.replace("/sign-in");
                router.refresh();
            }
        })
    }

    return (
        <>
            <div className="w-full bg-transparent text-left flex gap-2 items-center hover:cursor-pointer hover:bg-accent rounded-md px-2 py-2 text-sm"
                onClick={handleClick}
            >
                Sign Out
            </div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want log out?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="hover:cursor-pointer">
                            Cancel
                        </AlertDialogCancel>
                        <Button 
                            onClick={handleContinue} 
                            className="text-white bg-destructive hover:bg-destructive/80 hover:cursor-pointer"
                        >
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
