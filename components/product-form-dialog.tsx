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
import { CLOTHING_CATEGORIES } from "@/lib/constants"
import type { Product } from "@/lib/db/schema"
import { createProduct, updateProduct } from "@/app/actions/products"

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState(product?.category ?? "")
  const [available, setAvailable] = useState(product?.available ?? true)
  const [preview, setPreview] = useState<string | null>(product?.imageUrl ?? null)
  const fileRef = useRef<HTMLInputElement>(null)

  const isEdit = Boolean(product)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.set("category", category)
    formData.set("available", available ? "true" : "false")
    if (product?.imageUrl) formData.set("existingImage", product.imageUrl)

    try {
      if (isEdit && product) {
        await updateProduct(product.id, formData)
        toast.success("Prenda actualizada")
      } else {
        await createProduct(formData)
        toast.success("Prenda agregada")
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
            {isEdit ? "Editar prenda" : "Agregar prenda"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Imagen */}
          <div className="space-y-2">
            <Label>Foto</Label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="relative flex aspect-[3/4] w-32 items-center justify-center overflow-hidden rounded-sm border border-dashed border-border bg-muted transition-colors hover:border-foreground"
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
            <Input id="name" name="name" required defaultValue={product?.name} />
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
                defaultValue={product?.price}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Talla</Label>
              <Input id="size" name="size" defaultValue={product?.size ?? ""} placeholder="S, M, L, 30..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {CLOTHING_CATEGORIES.map((c) => (
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
              defaultValue={product?.description ?? ""}
            />
          </div>

          <div className="flex items-center justify-between rounded-sm border border-border p-3">
            <div>
              <p className="text-sm font-medium">Disponible</p>
              <p className="text-xs text-muted-foreground">
                Visible en el catálogo público
              </p>
            </div>
            <Switch checked={available} onCheckedChange={setAvailable} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Agregar prenda"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
