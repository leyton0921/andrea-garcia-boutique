import Image from "next/image"
import { ShoppingBag, MessageCircle } from "lucide-react"
import { whatsappLink } from "@/lib/constants"
import type { Product } from "@/lib/db/schema"
import { Badge } from "@/components/ui/badge"

function formatPrice(price: string) {
  const n = Number(price)
  if (Number.isNaN(n)) return price
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n)
}

export function ProductCard({ product }: { product: Product }) {
  const message = `Hola Andrea, me interesa esta prenda: ${product.name}${
    product.size ? ` (Talla ${product.size})` : ""
  } - ${formatPrice(product.price)}`

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <ShoppingBag className="size-10" />
          </div>
        )}
        {product.category ? (
          <Badge className="absolute left-3 top-3 bg-background/90 text-foreground hover:bg-background/90">
            {product.category}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-medium leading-snug">
          {product.name}
        </h3>
        {product.size ? (
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
            Talla {product.size}
          </p>
        ) : null}
        {product.description ? (
          <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        ) : null}

        <div className="mt-4 flex items-center justify-between">
          <span className="font-heading text-2xl font-semibold">
            {formatPrice(product.price)}
          </span>
        </div>

        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-4" />
          Comprar
        </a>
      </div>
    </div>
  )
}

export { formatPrice }
