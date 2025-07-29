"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schema
const createPasswordForm = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreatePasswordFormData = z.infer<typeof createPasswordForm>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreatePasswordFormData>({
    resolver: zodResolver(createPasswordForm),
    mode: "onChange", // makes `isValid` update in real-time
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: CreatePasswordFormData) => {
    console.log("✅ Password set:", data);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-md w-full mx-auto px-2">

      <div className="space-y-6 mb-8">
        {/* Password */}
        <div>
          <Input
            {...register("password")}
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            className="h-12 px-4 border border-primary focus:outline-none focus:border-primary-500 focus:ring-0 rounded-full text-primary"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Input
            {...register("confirmPassword")}
            placeholder="Confirm your password"
            type={showPassword ? "text" : "password"}
            className="h-12 px-4 border border-primary focus:outline-none focus:border-primary-500 focus:ring-0 rounded-full text-primary"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Show Password Toggle */}
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
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className={`h-12 rounded-full px-12 w-full transition-colors ${
          isValid
            ? "bg-primary text-on-primary"
            : "bg-gray-300 text-white cursor-not-allowed"
        }`}
      >
        Continue
      </Button>
    </form>
  );
}
