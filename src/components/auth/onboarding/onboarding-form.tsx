"use client";

import { DatePicker } from "@/components/date-pickers/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingDots from "@/components/ui/loading-animation";
import { IdentifyStatus } from "@/enums/index.enums";
import { useSendVerificationEmail } from "@/services/auth/email/send-verification-email";
import { useIdentifyStep2 } from "@/services/auth/identify/identify-step2";
import { useAuthStore } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createOnboardingForm = z.object({
	dob: z.date(),
	lastName: z.string().nonempty(),
});

type OnboardingFormData = z.infer<typeof createOnboardingForm>;

export default function OnboardingForm() {
	const { mutate, isPending } = useIdentifyStep2();
	const {mutate: sendVerification, isPending: isSendingVerification } = useSendVerificationEmail();
	const { pid } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (!pid) router.replace("/sign-in");
	}, [pid, router]);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<OnboardingFormData>({
		resolver: zodResolver(createOnboardingForm),
		mode: "onChange",
		defaultValues: {
			dob: new Date(),
			lastName: "",
		},
	});

	const onSubmit = (data: OnboardingFormData) => {
		mutate(
			{
				pid: pid!,
				dob: data.dob,
				lastname: data.lastName,
			},
			{
				onSuccess: (data) => {
                    const { status, message, payload } = data;

                    if(status === IdentifyStatus.NOT_FOUND) {
                        toast.error(message);
                        return;
                    }

                    if(status === IdentifyStatus.NEEDS_EMAIL) {
                        toast.info(message);
						router.replace("/register-email")
                        return;
                    }

                    if(status === IdentifyStatus.EMAIL_REGISTERED) {
                        toast.info(message);
						sendVerification({
							email: payload!.email,
							pid: pid!
						}, {
							onSuccess: () => {
								sessionStorage.setItem("userEmail", payload!.email);
								router.replace("/verify-email")
							},
							onError: () => {
								toast.error("Something went wrong, please try again later.")
							}
						})
                        return;
                    }
                },
			}
		);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="sm:min-w-md mx-auto px-2"
		>
			<div className="mb-6">
				<Label
					htmlFor="dateOfBirth"
					className="text-sm px-1 text-gray-600 dark:text-primary mb-1.5 ml-0.5"
				>
					Date of Birth
				</Label>
				<Controller
					control={control}
					name="dob"
					render={({ field }) => (
						<DatePicker
							id="dateOfBirth"
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				{errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
			</div>
			<div className="mb-6">
				<Label
					htmlFor="lastName"
					className="text-sm px-1 text-gray-600 dark:text-primary mb-1.5 ml-0.5"
				>
					Last Name
				</Label>
				<Input
					id="lastName"
					className="h-12 mb-2 px-4 border border-primary focus:outline-none focus:border-primary-500 focus:ring-0 rounded-full"
					placeholder="Enter your Last name"
					{...register("lastName")}
				/>
				{errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
			</div>

			{!(isPending || isSendingVerification) ? (
				<Button
					type="submit"
					disabled={!isValid}
					className={`h-12 rounded-full px-12 w-full transition-colors ${
						isValid ? "bg-primary text-on-primary" : "bg-gray-300 text-white cursor-not-allowed"
					}`}
				>
					Continue
				</Button>
			) : (
				<LoadingDots
					className="text-on-primary"
					size="md"
				/>
			)}
		</form>
	);
}
