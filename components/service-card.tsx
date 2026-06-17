import Image from "next/image"
import { Sparkles, MessageCircle, Clock } from "lucide-react"
import { whatsappLink } from "@/lib/constants"
import type { Service } from "@/lib/db/schema"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/components/product-card"

export function ServiceCard({ service }: { service: Service }) {
  const message = `Hola Andrea, quiero agendar una cita para: ${service.name} - ${formatPrice(
    service.price,
  )}`

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card md:flex-row">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted md:aspect-auto md:w-48 md:shrink-0">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl || "/placeholder.svg"}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full min-h-40 items-center justify-center text-muted-foreground">
            <Sparkles className="size-10" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            {service.category ? (
              <Badge variant="secondary" className="mb-2">
                {service.category}
              </Badge>
            ) : null}
            <h3 className="font-heading text-2xl font-medium leading-snug">
              {service.name}
            </h3>
          </div>
          <span className="font-heading text-2xl font-semibold whitespace-nowrap">
            {formatPrice(service.price)}
          </span>
        </div>

        {service.description ? (
          <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
            {service.description}
          </p>
        ) : null}

        <div className="mt-4 flex items-center gap-4">
          {service.durationMinutes ? (
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              <Clock className="size-3.5" />
              {service.durationMinutes} min
            </span>
          ) : null}
        </div>

        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90 md:w-auto md:self-start"
        >
          <MessageCircle className="size-4" />
          Agendar cita
        </a>
      </div>
    </div>
  )
}
