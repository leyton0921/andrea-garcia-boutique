"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Shirt } from "lucide-react"
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
import { ProductFormDialog } from "@/components/product-form-dialog"
import { formatPrice } from "@/components/product-card"
import { deleteProduct } from "@/app/actions/products"
import type { Product } from "@/lib/db/schema"

export function AdminProducts({ products }: { products: Product[] }) {
  const router = useRouter()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(product: Product) {
    setEditing(product)
    setFormOpen(true)
  }

  async function confirmDelete() {
    if (!deleting) return
    setLoading(true)
    try {
      await deleteProduct(deleting.id)
      toast.success("Prenda eliminada")
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
          <h1 className="font-heading text-3xl font-light tracking-wide">Ropa</h1>
          <p className="mt-1 text-sm font-light text-muted-foreground">
            {products.length} {products.length === 1 ? "prenda" : "prendas"}
          </p>
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-2 size-4" />
          Agregar
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-border py-20 text-center">
          <Shirt className="mx-auto size-10 text-muted-foreground" />
          <p className="mt-4 font-heading text-xl">Aún no tienes prendas</p>
          <p className="mt-1 text-sm font-light text-muted-foreground">
            Agrega tu primera prenda para mostrarla en el catálogo.
          </p>
          <Button className="mt-6" onClick={openNew}>
            <Plus className="mr-2 size-4" />
            Agregar prenda
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-sm border border-border bg-card"
            >
              <div className="relative aspect-[3/4] bg-muted">
                {product.imageUrl ? (
                  <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Shirt className="size-8" />
                  </div>
                )}
                {!product.available ? (
                  <Badge variant="secondary" className="absolute left-2 top-2">
                    Oculta
                  </Badge>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="font-medium leading-snug">{product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {product.category}
                  {product.size ? ` · Talla ${product.size}` : ""}
                </p>
                <p className="mt-1 font-heading text-lg font-semibold">
                  {formatPrice(product.price)}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => openEdit(product)}
                  >
                    <Pencil className="mr-1 size-3.5" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent text-destructive hover:text-destructive"
                    onClick={() => setDeleting(product)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editing}
      />

      <Dialog open={Boolean(deleting)} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Eliminar prenda</DialogTitle>
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
