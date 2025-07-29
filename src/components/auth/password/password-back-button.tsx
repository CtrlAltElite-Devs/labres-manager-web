"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";


export default function PasswordBackButton() {
    const router = useRouter();
    const { setPid } = useAuthStore();

    const handleBackToSignIn = () => {
        setPid(undefined);
        router.replace("/sign-in");
    }

    return (
        <Button className="bg-primary/20 text-primary hover:text-on-primary shadow-none text-sm mb-12 hover:cursor-pointer rounded-full"
            onClick={handleBackToSignIn}
        >
            <ArrowLeftIcon className="px-0"/>
            Back
        </Button>
    )
}

