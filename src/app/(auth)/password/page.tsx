import PasswordBackButton from "@/components/auth/password/password-back-button";
import PasswordForm from "@/components/auth/password/password-form";

export default function PasswordPage() {
    return (
        <div className="border-2 border-primary/40 p-8 rounded-2xl shadow-md bg-surface-container-lowest/80 mx-2">
            <PasswordBackButton/>
            <h1 className="text-primary text-3xl font-bold mb-2">Enter Password</h1>
            <p className="text-gray-500 mb-12">Welcome back! Please enter your password</p>
            <PasswordForm/>
            <p className="mt-8 text-sm text-center text-primary hover:underline hover:cursor-pointer">Forgot your password?</p>
        </div>
    )
}
