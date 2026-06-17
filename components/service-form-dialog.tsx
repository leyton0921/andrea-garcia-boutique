"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImagePlus } from "lucide-react"
import { SERVICE_CATEGORIES } from "@/lib/constants"
import type { Service } from "@/lib/db/schema"
import { createService, updateService } from "@/app/actions/services"

export function ServiceFormDialog({
  open,
  onOpenChange,
  service,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  service?: Service | null
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState(service?.category ?? "")
  const [available, setAvailable] = useState(service?.available ?? true)
  const [preview, setPreview] = useState<string | null>(service?.imageUrl ?? null)
  const fileRef = useRef<HTMLInputElement>(null)

  const isEdit = Boolean(service)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.set("category", category)
    formData.set("available", available ? "true" : "false")
    if (service?.imageUrl) formData.set("existingImage", service.imageUrl)

    try {
      if (isEdit && service) {
        await updateService(service.id, formData)
        toast.success("Servicio actualizado")
      } else {
        await createService(formData)
        toast.success("Servicio agregado")
      }
      onOpenChange(false)
      router.refresh()
    } catch {
      toast.error("Ocurrió un error. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-light">
            {isEdit ? "Editar servicio" : "Agregar servicio"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Foto</Label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="relative flex aspect-video w-40 items-center justify-center overflow-hidden rounded-sm border border-dashed border-border bg-muted transition-colors hover:border-foreground"
            >
              {preview ? (
                <Image src={preview || "/placeholder.svg"} alt="Vista previa" fill className="object-cover" />
              ) : (
                <span className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
                  <ImagePlus className="size-6" />
                  Subir foto
                </span>
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input id="name" name="name" required defaultValue={service?.name} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio (COP) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="any"
                required
                defaultValue={service?.price}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="durationMinutes">Duración (min)</Label>
              <Input
                id="durationMinutes"
                name="durationMinutes"
                type="number"
                min="0"
                defaultValue={service?.durationMinutes ?? ""}
                placeholder="60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={service?.description ?? ""}
            />
          </div>

          <div className="flex items-center justify-between rounded-sm border border-border p-3">
            <div>
              <p className="text-sm font-medium">Disponible</p>
              <p className="text-xs text-muted-foreground">
                Visible en la página de servicios
              </p>
            </div>
            <Switch checked={available} onCheckedChange={setAvailable} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Agregar servicio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
