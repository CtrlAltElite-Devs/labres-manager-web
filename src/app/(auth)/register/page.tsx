import RegisterForm from "@/components/auth/register/register-form";

export default function RegisterPage() {
    return (
        <div className="border-2 border-primary/40 p-8 rounded-2xl shadow-md bg-surface-container-lowest/80">
            <div className="space-y-2 mb-12">
                <h1 className="text-primary text-3xl font-bold">Create Password</h1>
                <p className="text-gray-500">Secure your Account</p>
            </div>
            <RegisterForm/>
        </div>
    )
}
