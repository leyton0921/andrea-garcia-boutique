"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { product } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { put } from "@vercel/blob"

async function getUserId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user)
    throw new Error("Unauthorized")

  return session.user.id
}

// Público: lista todos los productos disponibles
export async function getPublicProducts() {
  return db
    .select()
    .from(product)
    .where(eq(product.available, true))
    .orderBy(desc(product.createdAt))
}

// Admin: lista todos los productos del usuario
export async function getProducts() {
  const userId = await getUserId()
  return db
    .select()
    .from(product)
    .where(eq(product.userId, userId))
    .orderBy(desc(product.createdAt))
}

export async function createProduct(formData: FormData) {
  const userId = await getUserId()

  const imageUrl = await uploadImageIfPresent(formData.get("image"))

  await db.insert(product).values({
    userId,
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    price: String(formData.get("price") ?? "0"),
    category: String(formData.get("category") ?? ""),
    size: String(formData.get("size") ?? ""),
    available: formData.get("available") === "on" || formData.get("available") === "true",
    imageUrl: imageUrl ?? null,
  })

  revalidatePath("/admin/ropa")
  revalidatePath("/ropa")
}

export async function updateProduct(id: number, formData: FormData) {
  const userId = await getUserId()

  const imageUrl = await uploadImageIfPresent(formData.get("image"))
  const existingImage = String(formData.get("existingImage") ?? "")

  await db
    .update(product)
    .set({
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? ""),
      price: String(formData.get("price") ?? "0"),
      category: String(formData.get("category") ?? ""),
      size: String(formData.get("size") ?? ""),
      available: formData.get("available") === "on" || formData.get("available") === "true",
      imageUrl: imageUrl ?? (existingImage || null),
    })
    .where(and(eq(product.id, id), eq(product.userId, userId)))

  revalidatePath("/admin/ropa")
  revalidatePath("/ropa")
}

export async function deleteProduct(id: number) {
  const userId = await getUserId()
  await db
    .delete(product)
    .where(and(eq(product.id, id), eq(product.userId, userId)))
  revalidatePath("/admin/ropa")
  revalidatePath("/ropa")
}

async function uploadImageIfPresent(file: FormDataEntryValue | null) {
  if (!file || typeof file === "string") return null
  if (file.size === 0) return null
  const blob = await put(`productos/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  })
  return blob.url
}
