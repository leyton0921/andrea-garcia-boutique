"use client"

import { useMemo, useState } from "react"
import type { Product } from "@/lib/db/schema"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"

export function ProductCatalog({ products }: { products: Product[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => p.category && set.add(p.category))
    return ["Todos", ...Array.from(set)]
  }, [products])

  const [active, setActive] = useState("Todos")

  const filtered =
    active === "Todos"
      ? products
      : products.filter((p) => p.category === active)

  if (products.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-border py-24 text-center">
        <p className="font-heading text-2xl font-light">
          Pronto tendremos nuevas prendas
        </p>
        <p className="mt-2 text-sm font-light text-muted-foreground">
          Vuelve pronto para ver nuestro catálogo actualizado.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
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

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
