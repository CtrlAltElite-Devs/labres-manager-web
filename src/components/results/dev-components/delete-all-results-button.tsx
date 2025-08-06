"use client";

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteAllResults } from '@/services/result/dev-features/delete-all-results';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import { toast } from 'sonner';

export default function DeleteAllResultsButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: deleteAll } = useDeleteAllResults();
    const client = useQueryClient();

    const handleClick = () => {
        setIsOpen(true);
    }  

    const handleContinue = () => {
        deleteAll(void 0,{
            onSuccess: (data) => {
                toast("Records Deleted", {
                    description: data,
                });

                client.invalidateQueries({
                    queryKey: ["test-results"]
                })
            },
            onSettled: () => {
                setIsOpen(false);
            }
        })
    }

    return (
        <>
            <Button className="bg-destructive hover:bg-destructive/80 hover:cursor-pointer" onClick={handleClick}>
                Delete all Results
            </Button>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This is a developer feature that deletes all your test results.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <Button 
                            onClick={handleContinue} 
                            className="bg-destructive hover:bg-destructive/80 hover:cursor-pointer"
                        >
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
