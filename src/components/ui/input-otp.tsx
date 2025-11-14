"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function InputOTP({
	className,
	containerClassName,
	...props
}: React.ComponentProps<typeof OTPInput> & {
	containerClassName?: string;
}) {
	return (
		<OTPInput
			data-slot="input-otp"
			containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
			className={cn("disabled:cursor-not-allowed", className)}
			{...props}
		/>
	);
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-group"
			className={cn("flex items-center", className)}
			{...props}
		/>
	);
}

function InputOTPSlot({
	index,
	className,
	...props
}: React.ComponentProps<"div"> & { index: number }) {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
	const totalSlots = inputOTPContext?.slots.length ?? 0;

	// Determine rounding
	const isFirst = index === 0;
	const isLast = index === totalSlots - 1;

	return (
		<div
			data-slot="input-otp-slot"
			data-active={isActive}
			className={cn(
				// Size & layout
				"h-12 w-12 flex items-center justify-center relative text-lg font-medium",

				// Base border + shadow
				"border border-primary shadow-xs",

				// Focus-like styles
				"data-[active=true]:border-primary-500 data-[active=true]:ring-[3px] data-[active=true]:ring-primary/50",

				// Rounded corner logic
				isFirst && "rounded-l-xl",
				isLast && "rounded-r-xl",
				!isFirst && !isLast && "rounded-none",

				// Error states
				"aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20",

				// Transitions
				"transition-all duration-200",

				className
			)}
			{...props}
		>
			{char}

			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="animate-caret-blink bg-foreground h-6 w-[2px] duration-1000" />
				</div>
			)}
		</div>
	);
}


function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-otp-separator"
			role="separator"
			{...props}
		>
			<MinusIcon />
		</div>
	);
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
