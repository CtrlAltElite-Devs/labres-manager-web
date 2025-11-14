import { VerifyEmailForm } from "@/components/auth/verify-email/verify-email-form";

export default function VerifyEmailPage() {
	return (
        <div className="border-2 border-primary/40 p-8 rounded-2xl shadow-md bg-surface-container-lowest/80 text-center">
            <h1 className="text-primary text-3xl font-bold">Verify Email</h1>
            <p className="text-gray-500 mb-12">We&apos;ve sent a code to your email.</p>
            <VerifyEmailForm/>
        </div>
    )
}

