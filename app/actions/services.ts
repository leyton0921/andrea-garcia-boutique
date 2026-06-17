"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { service } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { put } from "@vercel/blob"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

// Público: lista todos los servicios disponibles
export async function getPublicServices() {
  return db
    .select()
    .from(service)
    .where(eq(service.available, true))
    .orderBy(desc(service.createdAt))
}

// Admin: lista todos los servicios del usuario
export async function getServices() {
  const userId = await getUserId()
  return db
    .select()
    .from(service)
    .where(eq(service.userId, userId))
    .orderBy(desc(service.createdAt))
}

export async function createService(formData: FormData) {
  const userId = await getUserId()

  const imageUrl = await uploadImageIfPresent(formData.get("image"))
  const duration = formData.get("durationMinutes")

  await db.insert(service).values({
    userId,
    name: String(formData.get("name") ?? ""),
    description: String(formData.get("description") ?? ""),
    price: String(formData.get("price") ?? "0"),
    category: String(formData.get("category") ?? ""),
    durationMinutes: duration ? Number(duration) : null,
    available: formData.get("available") === "on" || formData.get("available") === "true",
    imageUrl: imageUrl ?? null,
  })

  revalidatePath("/admin/servicios")
  revalidatePath("/servicios")
}

export async function updateService(id: number, formData: FormData) {
  const userId = await getUserId()

  const imageUrl = await uploadImageIfPresent(formData.get("image"))
  const existingImage = String(formData.get("existingImage") ?? "")
  const duration = formData.get("durationMinutes")

  await db
    .update(service)
    .set({
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? ""),
      price: String(formData.get("price") ?? "0"),
      category: String(formData.get("category") ?? ""),
      durationMinutes: duration ? Number(duration) : null,
      available: formData.get("available") === "on" || formData.get("available") === "true",
      imageUrl: imageUrl ?? (existingImage || null),
    })
    .where(and(eq(service.id, id), eq(service.userId, userId)))

  revalidatePath("/admin/servicios")
  revalidatePath("/servicios")
}

export async function deleteService(id: number) {
  const userId = await getUserId()
  await db
    .delete(service)
    .where(and(eq(service.id, id), eq(service.userId, userId)))
  revalidatePath("/admin/servicios")
  revalidatePath("/servicios")
}

async function uploadImageIfPresent(file: FormDataEntryValue | null) {
  if (!file || typeof file === "string") return null
  if (file.size === 0) return null
  const blob = await put(`servicios/${Date.now()}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  })
  return blob.url
}
