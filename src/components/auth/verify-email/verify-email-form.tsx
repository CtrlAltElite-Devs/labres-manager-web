"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyEmail } from "@/services/auth/email/verify-email";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingDots from "@/components/ui/loading-animation";
import { useUserStore } from "@/stores/user";

const FormSchema = z.object({
	code: z.string().min(4, {
		message: "Your one-time password must be 4 characters.",
	}),
});

export function VerifyEmailForm() {
	const { mutate, isPending } = useVerifyEmail();
	const [email, setEmail] = useState("");
    const router = useRouter()
	const { pid } = useUserStore();

    useEffect(() => {
		if (!pid) router.replace("/sign-in");
	}, [pid, router]);

	useEffect(() => {
		const storedEmail = sessionStorage.getItem("userEmail");
		if (storedEmail) {
			setEmail(storedEmail);
		} else {
            router.replace("/sign-in")
        }
	}, [router]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			code: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		mutate({
		    pid: pid!,
		    code: data.code,
		    email: email,
		}, {
            onSuccess: (response) => {
                toast.success(response.message);
                router.replace("/register")
            },
            onError: (err) => {
                toast.success(err.message);
            }
        })
	}

	return (
		<div className="flex flex-col items-center justify-centerw-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full max-w-xs space-y-6 text-center"
				>
					<FormField
						control={form.control}
						name="code"
						render={({ field }) => (
							<FormItem className="flex flex-col items-center">
								<FormControl>
									<InputOTP
										maxLength={4}
										{...field}
									>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormDescription className="mt-4">Please enter the one-time password sent to <strong>{email}</strong>.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

                    {!isPending ? (
                        <Button
                            type="submit"
                            className="bg-primary text-on-primary h-12 rounded-full px-12 w-full hover:cursor-pointer"
                        >
                            Submit
                        </Button>
                    ): 
                        <LoadingDots className="text-on-primary" size="md"/>
                    }
				</form>
			</Form>
		</div>
	);
}
