"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckPid } from "@/services/auth/check-pid";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import LoadingDots from "@/components/ui/loading-animation";

const pidForm = z.object({
    pid: z.string()
})

type PidFormData = z.infer<typeof pidForm>;

export default function SignInForm(){
    const { mutate, isPending, isSuccess } = useCheckPid();
    const router = useRouter();
    const { setPid } = useAuthStore();


    const { handleSubmit, watch, register } = useForm<PidFormData>({
        resolver: zodResolver(pidForm),
        defaultValues: {
            pid:""
        }
    })

    const pid = watch("pid");

    const onSubmit = (values: PidFormData ) => {
        console.log(values);
        mutate({...values }, {
            onSuccess: (data) => {
                const { hasPassword, hasPid, pid } = data;
                if(!hasPid){
                    alert("Invalid PID");
                    return;
                }

                if(!hasPassword){
                    router.replace("/register");
                }

                setPid(pid)

                router.replace("/password");
            }
        })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                className="mb-6 h-12 px-4 border border-primary focus:outline-none focus:border-primary-500 focus:ring-0 rounded-full"
                placeholder="Enter your PID"
                {...register("pid")}
            />
            {!isPending ? (
                <Button type="submit" className="bg-primary text-on-primary h-12 rounded-full px-12 w-full" disabled={!pid || isSuccess} >
                    Continue
                </Button>
            ):
                <LoadingDots className="text-on-primary" size="md"/>
            }

        </form>
    )
}
