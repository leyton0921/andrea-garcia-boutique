import { AdminServices } from "@/components/admin-services"
import { getServices } from "@/app/actions/services"

export const dynamic = "force-dynamic"

export default async function AdminServiciosPage() {
  const services = await getServices()
  return <AdminServices services={services} />
}
