import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { ProductCatalog } from "@/components/product-catalog"
import { getPublicProducts } from "@/app/actions/products"

export const dynamic = "force-dynamic"

export default async function RopaPage() {
  const products = await getPublicProducts()

  return (
    <main className="min-h-screen">
      <SiteNavbar />

      <section className="border-b border-border/60 bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">
            Boutique
          </p>
          <h1 className="mt-4 font-heading text-4xl font-light tracking-wide md:text-5xl">
            Ropa Americana
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            Prendas seleccionadas, únicas y de calidad. Escríbenos por WhatsApp
            para reservar la tuya antes de que se agote.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <ProductCatalog products={products} />
      </section>

      <SiteFooter />
    </main>
  )
}
