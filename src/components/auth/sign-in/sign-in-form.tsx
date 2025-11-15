"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/ui/loading-animation";
import { toast } from "sonner";
import { useIdentifyStep1 } from "@/services/auth/identify/identify-step1";
import { IdentifyStatus } from "@/enums/index.enums";
import { useUserStore } from "@/stores/user";

const pidForm = z.object({
    pid: z.string()
})

type PidFormData = z.infer<typeof pidForm>;

export default function SignInForm(){
    const {mutate: identifyStep1, isPending: isPendingIdentifyStep1} = useIdentifyStep1();
    const router = useRouter();
    // const { setPid } = useAuthStore();
    const { setPid } = useUserStore();


    const { handleSubmit, watch, register } = useForm<PidFormData>({
        resolver: zodResolver(pidForm),
        defaultValues: {
            pid:""
        }
    })

    const pid = watch("pid");

    const onSubmit = (values: PidFormData ) => {
        identifyStep1({...values }, {
            onSuccess: (data) => {
                const { status, message, payload } = data;
                
                if(status === IdentifyStatus.NOT_FOUND) {
                    toast.error(message);
                    return;
                }

                setPid(payload!.pid);

                if(status === IdentifyStatus.NEEDS_ONBOARDING){
                    // toast.info(message);
                    router.push("/onboarding");
                    return;
                }

                if(status === IdentifyStatus.READY_TO_LOGIN){
                    // toast.success(message);
                    router.replace("/password");
                }
            },
            onError: (err) => {
                console.error(err);
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
            {!isPendingIdentifyStep1 ? (
                <Button type="submit" className="bg-primary text-on-primary h-12 rounded-full px-12 w-full hover:cursor-pointer" disabled={!pid} >
                    Continue
                </Button>
            ):
                <LoadingDots className="text-on-primary" size="md"/>
            }

        </form>
    )
}
