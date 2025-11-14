import RegisterEmailForm from "@/components/auth/register-email/register-email-form";

export default function RegisterEmailPage() {
	return (
        <div className="border-2 border-primary/40 p-8 rounded-2xl shadow-md bg-surface-container-lowest/80">
            <h1 className="text-primary text-3xl font-bold">Email Registration</h1>
            <p className="text-gray-500 mb-12">Please enter your email</p>
            <RegisterEmailForm/>
        </div>
    )
}
