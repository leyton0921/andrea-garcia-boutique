"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = String(formData.get("email"))
    const password = String(formData.get("password"))
    const name = String(formData.get("name") ?? "")

    try {
      if (mode === "sign-up") {
        const { error } = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0],
        })
        if (error) throw new Error(error.message)
      } else {
        const { error } = await authClient.signIn.email({ email, password })
        if (error) throw new Error(error.message)
      }
      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocurrió un error. Intenta de nuevo.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {mode === "sign-up" ? (
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input id="name" name="name" placeholder="Andrea Garcia" />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="tucorreo@ejemplo.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Mínimo 8 caracteres"
        />
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? "Procesando..."
          : mode === "sign-up"
            ? "Crear cuenta"
            : "Iniciar sesión"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {mode === "sign-up" ? (
          <>
            <Link href="/sign-in" className="font-medium text-foreground underline underline-offset-4">
              Inicia sesión
            </Link>
          </>
        ) : (
          <>
            <Link href="/sign-up" className="font-medium text-foreground underline underline-offset-4">
              Crea tu cuenta
            </Link>
          </>
        )}
      </p>
    </form>
  )
}
