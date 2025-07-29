import { ModeToggle } from "@/components/ui/mode-toggle"

export default function AuthLayout({children} : Readonly<{children: React.ReactNode}>) {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-4">
      {children}
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
    </div>
  )
}
