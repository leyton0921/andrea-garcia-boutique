import { AdminProducts } from "@/components/admin-products"
import { getProducts } from "@/app/actions/products"

export const dynamic = "force-dynamic"

export default async function AdminRopaPage() {
  const products = await getProducts()
  return <AdminProducts products={products} />
}
