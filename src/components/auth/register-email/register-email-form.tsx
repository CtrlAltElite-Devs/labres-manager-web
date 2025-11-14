"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingDots from "@/components/ui/loading-animation";
import { useSendVerificationEmail } from "@/services/auth/email/send-verification-email";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const emailRegistrationSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
});

type EmailRegistrationData = z.infer<typeof emailRegistrationSchema>;

export default function RegisterEmailForm() {
	const { mutate, isPending } = useSendVerificationEmail();
	const { pid } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (!pid) router.replace("/sign-in");
	}, [pid, router]);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<EmailRegistrationData>({
		resolver: zodResolver(emailRegistrationSchema),
		mode: "onChange",
		defaultValues: { email: "" },
	});

	const onSubmit = (data: EmailRegistrationData) => {
		mutate(
			{ 
				pid: pid!,
				email: data.email 
			},
			{
				onSuccess: (response) => {
					toast.success(response.message);
					sessionStorage.setItem("userEmail", data.email);
					router.push("/verify-email");
				},
				onError: (error) => {
					if(error instanceof AxiosError){
						toast.error(error.response?.data.message);
					} else {
						toast.error(error.message);
					}
				},
			}
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="sm:min-w-md mx-auto px-2">
			<div className="mb-6">
				<Input
					id="email"
					type="email"
					placeholder="juan@example.com"
					className="h-12 mb-2 px-4 border border-primary focus:outline-none focus:border-primary-500 focus:ring-0 rounded-full"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
				)}
			</div>
			
			{!isPending ? (
				<Button
					type="submit"
					disabled={!isValid || isPending}
					className={`h-12 rounded-full px-12 w-full transition-colors ${
						isValid && !isPending
							? "bg-primary text-on-primary"
							: "bg-gray-300 text-white cursor-not-allowed"
					}`}
				>
					Send Verification Code
				</Button>
			): 
				<LoadingDots
					className="text-on-primary"
					size="md"
				/>
			}
		</form>
	);
}
