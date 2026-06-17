"use client"

import { useMemo, useState } from "react"
import type { Service } from "@/lib/db/schema"
import { ServiceCard } from "@/components/service-card"
import { cn } from "@/lib/utils"

export function ServiceList({ services }: { services: Service[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    services.forEach((s) => s.category && set.add(s.category))
    return ["Todos", ...Array.from(set)]
  }, [services])

  const [active, setActive] = useState("Todos")

  const filtered =
    active === "Todos"
      ? services
      : services.filter((s) => s.category === active)

  if (services.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-border py-24 text-center">
        <p className="font-heading text-2xl font-light">
          Pronto publicaremos nuestros servicios
        </p>
        <p className="mt-2 text-sm font-light text-muted-foreground">
          Vuelve pronto o escríbenos por WhatsApp para más información.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition-colors",
              active === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}
