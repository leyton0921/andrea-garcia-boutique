import Link from "next/link"
import { Shirt, Sparkles, ArrowRight } from "lucide-react"
import { getProducts } from "@/app/actions/products"
import { getServices } from "@/app/actions/services"

export const dynamic = "force-dynamic"

export default async function AdminHomePage() {
  const [products, services] = await Promise.all([
    getProducts(),
    getServices(),
  ])

  const availableProducts = products.filter((p) => p.available).length
  const availableServices = services.filter((s) => s.available).length

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10">
      <h1 className="font-heading text-3xl font-light tracking-wide">
        Bienvenida, Andrea
      </h1>
      <p className="mt-2 text-sm font-light text-muted-foreground">
        Gestiona tu boutique y tus servicios de spa desde aquí.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <StatCard
          icon={<Shirt className="size-5" />}
          label="Prendas"
          total={products.length}
          available={availableProducts}
          href="/admin/ropa"
        />
        <StatCard
          icon={<Sparkles className="size-5" />}
          label="Servicios"
          total={services.length}
          available={availableServices}
          href="/admin/servicios"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/ropa"
          className="flex items-center justify-between rounded-sm border border-border bg-card p-6 transition-colors hover:border-foreground"
        >
          <div>
            <p className="font-heading text-xl">Gestionar ropa</p>
            <p className="text-sm font-light text-muted-foreground">
              Agregar, editar o eliminar prendas
            </p>
          </div>
          <ArrowRight className="size-5" />
        </Link>
        <Link
          href="/admin/servicios"
          className="flex items-center justify-between rounded-sm border border-border bg-card p-6 transition-colors hover:border-foreground"
        >
          <div>
            <p className="font-heading text-xl">Gestionar servicios</p>
            <p className="text-sm font-light text-muted-foreground">
              Agregar, editar o eliminar servicios
            </p>
          </div>
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  total,
  available,
  href,
}: {
  icon: React.ReactNode
  label: string
  total: number
  available: number
  href: string
}) {
  return (
    <Link
      href={href}
      className="rounded-sm border border-border bg-card p-6 transition-colors hover:border-foreground"
    >
      <div className="flex items-center gap-2 text-accent">
        {icon}
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-4 font-heading text-4xl font-semibold">{total}</p>
      <p className="mt-1 text-sm font-light text-muted-foreground">
        {available} disponibles
      </p>
    </Link>
  )
}
