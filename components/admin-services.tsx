"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Sparkles, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { ServiceFormDialog } from "@/components/service-form-dialog"
import { formatPrice } from "@/components/product-card"
import { deleteService } from "@/app/actions/services"
import type { Service } from "@/lib/db/schema"

export function AdminServices({ services }: { services: Service[] }) {
  const router = useRouter()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [deleting, setDeleting] = useState<Service | null>(null)
  const [loading, setLoading] = useState(false)

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(service: Service) {
    setEditing(service)
    setFormOpen(true)
  }

  async function confirmDelete() {
    if (!deleting) return
    setLoading(true)
    try {
      await deleteService(deleting.id)
      toast.success("Servicio eliminado")
      setDeleting(null)
      router.refresh()
    } catch {
      toast.error("No se pudo eliminar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-light tracking-wide">
            Servicios
          </h1>
          <p className="mt-1 text-sm font-light text-muted-foreground">
            {services.length} {services.length === 1 ? "servicio" : "servicios"}
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-2 size-4" />
          Agregar
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-border py-20 text-center">
          <Sparkles className="mx-auto size-10 text-muted-foreground" />
          <p className="mt-4 font-heading text-xl">Aún no tienes servicios</p>
          <p className="mt-1 text-sm font-light text-muted-foreground">
            Agrega tu primer servicio para mostrarlo en tu spa.
          </p>
          <Button className="mt-6" onClick={openNew}>
            <Plus className="mr-2 size-4" />
            Agregar servicio
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex gap-4 overflow-hidden rounded-sm border border-border bg-card p-4"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-sm bg-muted">
                {service.imageUrl ? (
                  <Image src={service.imageUrl || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Sparkles className="size-6" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium leading-snug">{service.name}</p>
                  {!service.available ? (
                    <Badge variant="secondary">Oculto</Badge>
                  ) : null}
                </div>
                <p className="text-xs text-muted-foreground">{service.category}</p>
                <div className="mt-1 flex items-center gap-3">
                  <span className="font-heading text-lg font-semibold">
                    {formatPrice(service.price)}
                  </span>
                  {service.durationMinutes ? (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {service.durationMinutes} min
                    </span>
                  ) : null}
                </div>
                <div className="mt-auto flex gap-2 pt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => openEdit(service)}
                  >
                    <Pencil className="mr-1 size-3.5" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent text-destructive hover:text-destructive"
                    onClick={() => setDeleting(service)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ServiceFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        service={editing}
      />

      <Dialog open={Boolean(deleting)} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Eliminar servicio</DialogTitle>
            <DialogDescription>
              ¿Seguro que quieres eliminar &quot;{deleting?.name}&quot;? Esta
              acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
