import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { ServiceList } from "@/components/service-list"
import { getPublicServices } from "@/app/actions/services"

export const dynamic = "force-dynamic"

export default async function ServiciosPage() {
  const services = await getPublicServices()

  return (
    <main className="min-h-screen">
      <SiteNavbar />

      <section className="border-b border-border/60 bg-sidebar text-sidebar-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-sidebar-primary">
            Nails Spa
          </p>
          <h1 className="mt-4 font-heading text-4xl font-light tracking-wide md:text-5xl">
            Pestañas · Uñas · Cejas
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-sidebar-foreground/70">
            Realza tu belleza con nuestros servicios profesionales. Elige tu
            servicio favorito y agenda tu cita por WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <ServiceList services={services} />
      </section>

      <SiteFooter />
    </main>
  )
}
