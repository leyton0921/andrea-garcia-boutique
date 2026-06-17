import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { whatsappLink } from "@/lib/constants"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteNavbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-sidebar text-sidebar-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-xs font-light uppercase tracking-[0.3em] text-sidebar-primary">
              Boutique & Nails Spa
            </p>
            <h1 className="mt-6 font-heading text-5xl font-light leading-tight tracking-wide text-balance md:text-6xl">
              Estilo y belleza en un solo lugar
            </h1>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-sidebar-foreground/70">
              Ropa americana cuidadosamente seleccionada y servicios de spa para
              pestañas, uñas y cejas. Descubre la experiencia Andrea Garcia.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                render={<Link href="/ropa" />}
                size="lg"
                className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
              >
                Ver Boutique <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
              
                render={<Link href="/servicios" />}
                size="lg"
                variant="outline"
                className="border-sidebar-foreground/30 bg-transparent text-sidebar-foreground hover:bg-sidebar-foreground/10"
              >
                Ver Servicios
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/vestidos-hero.png"
              alt="Moda Andrea Garcia"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Dos líneas de negocio */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <BusinessCard
            image="/vestidos-hero.png"
            tag="Boutique"
            icon={<ShoppingBag className="size-5" />}
            title="Ropa Americana"
            description="Prendas únicas, originales y de marca a precios increíbles. Renueva tu clóset con piezas seleccionadas."
            href="/ropa"
            cta="Explorar catálogo"
          />
          <BusinessCard
            image="/hero-spa.png"
            tag="Nails Spa"
            icon={<Sparkles className="size-5" />}
            title="Pestañas · Uñas · Cejas"
            description="Realza tu belleza natural con nuestros servicios profesionales. Agenda tu cita de forma rápida y sencilla."
            href="/servicios"
            cta="Ver servicios"
          />
        </div>
      </section>

      {/* Banner CTA */}
      <section className="border-y border-border/60 bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center">
          <h2 className="font-heading text-3xl font-light tracking-wide text-balance md:text-4xl">
            ¿Lista para verte y sentirte increíble?
          </h2>
          <p className="max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            Escríbenos por WhatsApp y con gusto te asesoramos con tu compra o tu
            cita en el spa.
          </p>
          <Button
            size="lg"
            render={
              <a
                href={whatsappLink(
                  "Hola Andrea, quiero más información sobre tus productos y servicios.",
                )}
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            Escríbenos por WhatsApp
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function BusinessCard({
  image,
  tag,
  icon,
  title,
  description,
  href,
  cta,
}: {
  image: string
  tag: string
  icon: React.ReactNode
  title: string
  description: string
  href: string
  cta: string
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-center gap-2 text-accent">
          {icon}
          <span className="text-xs font-medium uppercase tracking-widest">
            {tag}
          </span>
        </div>
        <h3 className="mt-4 font-heading text-3xl font-light tracking-wide">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted-foreground">
          {description}
        </p>
        <span className="mt-6 inline-flex items-center text-sm font-medium uppercase tracking-widest">
          {cta}
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
