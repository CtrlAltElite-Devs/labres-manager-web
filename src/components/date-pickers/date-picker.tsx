"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function formatDate(date: Date | undefined) {
	if (!date) return "";
	return date.toLocaleDateString("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
}

function isValidDate(date: Date | undefined) {
	return !!date && !isNaN(date.getTime());
}

export interface DatePickerProps {
	id?: string;
	label?: string;
	placeholder?: string;
	value?: Date; // controlled value
	defaultValue?: Date; // uncontrolled initial value
	onChange?: (date: Date | undefined) => void;
}

export function DatePicker({ id = "date", label, placeholder = "June 01, 2025", value, defaultValue, onChange }: DatePickerProps) {
	const isControlled = value !== undefined;

	const [open, setOpen] = React.useState(false);
	const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultValue);

	const date = isControlled ? value : internalDate;
	const [month, setMonth] = React.useState<Date | undefined>(date);
	const [textValue, setTextValue] = React.useState(formatDate(date));

	React.useEffect(() => {
		if (value) {
			setTextValue(formatDate(value));
			setMonth(value);
		}
	}, [value]);

	const handleChange = (newDate: Date | undefined) => {
		if (!isControlled) {
			setInternalDate(newDate);
		}

		setTextValue(formatDate(newDate));
		onChange?.(newDate);
	};

  function fixTimezone(date: Date | undefined) {
    if (!date) return undefined;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
  }

	return (
		<div className="flex flex-col gap-3">
      {label && (
        <Label
          htmlFor={id}
          className="px-1 text-gray-600 dark:text-primary"
        >
          {label}
        </Label>
      )}

			<div className="relative flex gap-2">
				<Input
					id={id}
					value={textValue}
					placeholder={placeholder}
					className="h-12 px-4 bg-background border border-primary focus:outline-none focus:border-primary-500 focus:ring-0 rounded-full text-primary font-bold"
					onChange={(e) => {
						const newDate = new Date(e.target.value);
						setTextValue(e.target.value);

						if (isValidDate(newDate)) {
							handleChange(fixTimezone(newDate));
							setMonth(newDate);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "ArrowDown") {
							e.preventDefault();
							setOpen(true);
						}
					}}
				/>

				<Popover
					open={open}
					onOpenChange={setOpen}
				>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="absolute top-1/2 right-4 size-6 -translate-y-1/2"
						>
							<CalendarIcon className="size-4 text-on-primary-fixed-variant dark:text-primary" />
							<span className="sr-only">Select date</span>
						</Button>
					</PopoverTrigger>

					<PopoverContent
						className="w-auto overflow-hidden p-0"
						align="end"
						alignOffset={-8}
						sideOffset={10}
					>
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							month={month}
							onMonthChange={setMonth}
							onSelect={(newDate) => {
								handleChange(fixTimezone(newDate));
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
