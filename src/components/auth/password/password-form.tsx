"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUser } from "@/services/auth/login-user/login-user-v2";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/ui/loading-animation";
import { toast } from "sonner";
import { AxiosError } from "axios";

const passwordForm = z.object({
  pid: z.string().nonempty("PID is required"),
  password: z.string().min(1, "Password is required"),
});

type PasswordFormData = z.infer<typeof passwordForm>;

export default function PasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, isPending, isSuccess } = useLoginUser();
    const { pid, setAuth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if(!pid) router.replace("/sign-in");
    }, [pid, router])

    const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordForm),
            defaultValues: {
                pid: pid,
                password: "",
            },
    });

    const password = watch("password");

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = (data: PasswordFormData) => {
        mutate({
            ...data
        }, {
            onSuccess: (data) => {
                setAuth(data);
                router.replace("/dashboard");
                toast.success("Successfully logged in.");
            },
            onError: (error) => {
                if(error instanceof AxiosError){
                    if(error.status === 403){
                        toast.error(`Invalid Credentials`);
                        return;
                    }
                }
                toast.error("Sorry, we cannot process your request right now.")
            }
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:min-w-md">
            {/* PID (readonly) */}
            <div>
                <Input
                    className="mb-1 h-12 px-4 border border-primary focus:outline-none focus:border-primary-500 focus:ring-0 rounded-full"
                    readOnly
                    disabled
                    {...register("pid")}
                />
                {errors.pid && <p className="text-red-500 text-sm">{errors.pid.message}</p>}
            </div>

            {/* Password input */}
            <div>
                <Input
                    className="h-12 px-4 border border-primary focus:outline-none focus:border-primary-500 focus:ring-0 rounded-full text-primary"
                    placeholder="Enter your password"
                    autoFocus
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Show password checkbox */}
            <div className="flex items-start gap-3 mb-4 ml-2">
                <Checkbox
                    id="togglePassword"
                    className="text-on-primary border-primary"
                    onCheckedChange={toggleShowPassword}
                />
                <Label htmlFor="togglePassword" className="text-gray-600">
                    Show Password
                </Label>
            </div>

            {/* Submit button */}
            {!isPending ? (
                <Button type="submit" className="bg-primary text-on-primary h-12 rounded-full px-12 w-full hover:cursor-pointer" disabled={!password || isSuccess}>
                    Sign In
                </Button>
            ): (
                <LoadingDots className="text-on-primary" size="md"/>
            ) }
        </form>
    );
}
