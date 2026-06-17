import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { AuthForm } from "@/components/auth-form"

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect("/admin")

  return (
    <main className="flex min-h-screen items-center justify-center bg-sidebar px-4 text-sidebar-foreground">
      <div className="w-full max-w-md rounded-sm border border-sidebar-border bg-card p-8 text-card-foreground shadow-xl">
        <div className="mb-8 text-center">
          <Link href="/" className="font-heading text-3xl font-semibold tracking-wide">
            Andrea Garcia
          </Link>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Panel de administración
          </p>
        </div>
        <AuthForm mode="sign-in" />
      </div>
    </main>
  )
}
