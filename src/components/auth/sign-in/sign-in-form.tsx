"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckPidV1 } from "@/services/auth/check-pid/check-pid-v1";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import LoadingDots from "@/components/ui/loading-animation";
import { toast } from "sonner";

const pidForm = z.object({
    pid: z.string()
})

type PidFormData = z.infer<typeof pidForm>;

export default function SignInForm(){
    const { mutate: checkPid, isPending } = useCheckPidV1();
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
        checkPid({...values }, {
            onSuccess: (data) => {
                const { hasPassword, hasPid, pid } = data;
                if(!hasPid){
                    toast.error("Patient Identification Not Found")
                    return;
                }
                
                setPid(pid)

                if(!hasPassword){
                    router.replace("/register");
                    return;
                }

                toast.success("Patient Identification Found");
                router.replace("/password");
            },
            onError: () => {
                toast.error("Sorry we cannot process your request right now.")
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
                <Button type="submit" className="bg-primary text-on-primary h-12 rounded-full px-12 w-full hover:cursor-pointer" disabled={!pid} >
                    Continue
                </Button>
            ):
                <LoadingDots className="text-on-primary" size="md"/>
            }

        </form>
    )
}
