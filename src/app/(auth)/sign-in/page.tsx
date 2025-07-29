import SignInForm from "@/components/auth/sign-in/sign-in-form";

export default function SignInPage() {
    return (
        <div className="border-2 border-primary/40 p-8 rounded-2xl shadow-md bg-surface-container-lowest/80">
            <h1 className="text-primary text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 mb-12">Please enter your PID to continue</p>
            <SignInForm/>
            <p className="mt-8 text-sm text-center text-primary hover:underline hover:cursor-pointer">Forgot your PID?</p>
        </div>
    ) 
}
